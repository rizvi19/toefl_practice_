import assert from "node:assert/strict";
import {chromium} from "playwright";

const browser=await chromium.launch({headless:true,channel:process.platform==='win32'?'msedge':undefined});
const page=await browser.newPage();
page.setDefaultTimeout(15000);
const errors=[],failed=[];
page.on("pageerror",e=>errors.push(e.message));
page.on("response",r=>{if(r.status()>=400)failed.push(r.status()+" "+r.url())});
await page.addInitScript(()=>{
  const key="toefl-studio-v1";
  if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify({
    history:[],custom:[],session:null,
    settings:{voice:"",rate:1,audioMode:"tts",kokoroBrowserVersion:1,contrast:false}
  }));
});
const url="http://127.0.0.1:4177/toefl_practice_/library.html";
const session=()=>page.evaluate(()=>JSON.parse(localStorage.getItem("toefl-studio-v1")).session);
const library=()=>page.getByRole("button",{name:"Practice library"}).first().click();
const custom=()=>page.getByRole("spinbutton",{name:"Custom timer in minutes"});
const endSession=async()=>{
  await page.getByRole("button",{name:"Finish session"}).click();
  await page.getByRole("dialog",{name:"Finish this session?"}).getByRole("button",{name:"Continue"}).click();
};
try{
  await page.goto(url,{waitUntil:"networkidle"});
  await library();
  await custom().waitFor();
  await custom().fill("2.5");
  await page.getByRole("button",{name:"Listening circuit · 9 questions"}).click();
  let s=await session();
  assert.equal(s.customSeconds,150,"Custom 2.5-minute duration saved on session");
  assert.equal(s.mode,"study");
  assert(s.remaining<=150&&s.remaining>=145,"Starts at selected duration");
  assert.match(await page.locator(".timer").innerText(),/02:2[5-9]|02:30/);
  await page.getByRole("button",{name:/Check answers|Review response/i}).click();
  s=await session();
  assert.equal(s.submitted[s.items[0].id],true,"Study submission recorded");
  assert.equal(s.remaining,0,"Clock resets immediately after submission");
  assert.equal(await page.locator(".timer").getAttribute("aria-label"),"Timer stopped after submission");
  assert.match(await page.locator(".timer").innerText(),/Stopped/);
  assert.equal(await page.getByRole("button",{name:"Pause",exact:true}).count(),0,"No resume/pause on reviewed item");
  await page.waitForTimeout(1500);
  assert.equal((await session()).index,0,"Submitted study item must not expire and move itself");
  await page.getByRole("button",{name:/Save & continue/i}).click();
  s=await session();
  assert.equal(s.index,1,"Moves to next activity");
  assert.equal(s.customSeconds,150,"Custom duration persists across activities");
  assert(s.remaining>=145&&s.remaining<=150,"Next activity gets fresh custom timer");
  assert.match(await page.locator(".timer").innerText(),/02:2[5-9]|02:30/);
  await endSession();
  await library();

  // Bad durations are rejected rather than accidentally starting a default clock.
  await custom().fill("0.2");
  await page.getByRole("button",{name:"Random · Conversation"}).click();
  assert.match(await page.getByRole("status").first().innerText(),/between 0.5 and 240 minutes/);
  assert.equal((await page.evaluate(()=>JSON.parse(localStorage.getItem("toefl-studio-v1")).session)),null);
  await custom().fill("3");
  await page.getByRole("button",{name:"Listening full rehearsal · 47 questions"}).click();
  s=await session();
  assert.equal(s.mode,"listening-mock");
  assert.equal(s.customSeconds,180);
  assert.equal(s.remaining,180,"Custom session-wide mock limit");
  await endSession();
  await library();

  // Turning timed practice off must override the filled input.
  await page.getByRole("checkbox",{name:"Timed"}).uncheck();
  await page.getByRole("button",{name:"Random · Academic Talk"}).click();
  s=await session();
  assert.equal(s.timed,false);
  assert.equal(s.customSeconds,null);
  assert.match(await page.locator(".timer").innerText(),/Untimed/);
  await endSession();
  await library();

  // Default mode retains existing recommended limits.
  await page.getByRole("checkbox",{name:"Timed"}).check();
  await custom().fill("");
  await page.getByRole("button",{name:"Random · Choose a Response"}).click();
  s=await session();
  assert.equal(s.customSeconds,null);
  assert(s.remaining>0&&s.remaining<=s.items[0].seconds,"Default duration comes from activity");
  await endSession();
  assert.deepEqual(errors,[],"No browser errors");
  assert.deepEqual(failed,[],"No HTTP resource errors");
  console.log(JSON.stringify({customTimer:"PASS",minutes:2.5,submissionStops:"PASS",
    nextResets:"PASS",invalidInput:"PASS",rehearsal:"PASS",untimed:"PASS",default:"PASS"}));
}finally{await browser.close()}
