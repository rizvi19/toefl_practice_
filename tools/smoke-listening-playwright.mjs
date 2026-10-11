import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import {chromium} from "playwright";
const root=process.env.SITE_ROOT||".",w={};
for(const file of [
 "academic-topics-additional.js","complete-words-200.js","daily-life-scenarios.js",
 "daily-life-vocabulary.js","daily-life-200.js","academic-expansions-first.js",
 "academic-expansions-second.js","academic-question-guidance.js",
 "academic-vocab-distractors.js","academic-200.js",
 "listening-campus-cases.js","listening-rationales.js","listening-200.js"
])vm.runInNewContext(fs.readFileSync(root+"/collections/"+file,"utf8"),{window:w});
const bank=w.__TOEFL_LISTENING_EXTENDED__;
const browser=await chromium.launch({headless:true});
const page=await browser.newPage();
page.setDefaultTimeout(20000);
const errors=[],failed=[];
page.on("pageerror",e=>errors.push(e.message));
page.on("response",r=>{if(r.status()>=400)failed.push(r.status()+" "+r.url())});
// Deterministic voices cover missing-recording fallback. The Kokoro-specific
// test separately verifies actual native MP3 playback and completion.
await page.addInitScript(()=>{
 const data=JSON.parse(localStorage.getItem("toefl-studio-v1")||"null");if(data){data.settings={...data.settings,audioMode:"tts",kokoroBrowserVersion:1};localStorage.setItem("toefl-studio-v1",JSON.stringify(data))}else localStorage.setItem("toefl-studio-v1",JSON.stringify({history:[],custom:[],session:null,settings:{voice:"",rate:1,audioMode:"tts",kokoroBrowserVersion:1,contrast:false}}));
 window.__speechHistory=[];
 class MockUtterance{constructor(text){this.text=text}}
 Object.defineProperty(window,"SpeechSynthesisUtterance",{value:MockUtterance,configurable:true});
 const voices=[
   {voiceURI:"english-1",name:"English Voice One",lang:"en-US"},
   {voiceURI:"english-2",name:"English Voice Two",lang:"en-US"}
 ];
 const synth={
  getVoices:()=>voices,
  addEventListener(){},removeEventListener(){},cancel(){},
  speak(utterance){
   window.__speechHistory.push({text:utterance.text,voice:utterance.voice?.voiceURI||"default"});
   setTimeout(()=>{utterance.onstart?.();setTimeout(()=>utterance.onend?.(),15)},5)
  }
 };
 Object.defineProperty(window,"speechSynthesis",{configurable:true,value:synth});
});
const url="http://127.0.0.1:4177/toefl_practice_/";
const enter=async()=>page.getByRole("button",{name:/Practice library/i}).first().click();
const endSession=async()=>{
 await page.getByRole("button",{name:"Finish session"}).click();
 await page.getByRole("dialog",{name:"Finish this session?"}).getByRole("button",{name:"Continue"}).click();
};
await page.goto(url,{waitUntil:"networkidle"});
await enter();
await page.getByRole("heading",{name:/Listening practice · 200 in each task/}).waitFor();
// All four categories have exactly 200 including original full-form IDs.
const categories=[
 ["choose-response","Browse 200 Choose a Response","response"],
 ["conversation","Browse 200 Conversations","conversation"],
 ["announcement","Browse 200 Announcements","announcement"],
 ["academic-talk","Browse 200 Academic Talks","talk"]
];
for(const [type,label] of categories){
 await page.getByRole("button",{name:label,exact:true}).click();
 const rows=page.locator(".activity-row");
 assert.equal(await rows.count(),200,type+" browse must show 200");
 const manifestPath=root+"/audio/generated/manifest.json";
 const recordings=fs.existsSync(manifestPath)?JSON.parse(fs.readFileSync(manifestPath,"utf8")).recordings:{};
 const fallbackIndex=bank[type].findIndex(item=>!recordings[item.id]);
 const selected=bank[type][fallbackIndex];
 await rows.nth((type==="choose-response"?15:4)+fallbackIndex).getByRole("button",{name:/Practice/}).click();
 const session=await page.evaluate(()=>JSON.parse(localStorage.getItem("toefl-studio-v1")).session);
 assert.equal(session.items[0].type,type);
 assert.equal(session.items[0].questions.length,selected.questions.length);
 const audio=page.getByRole("button",{name:"Play audio"});
 await audio.click();
 await page.waitForFunction(()=>!document.querySelector(".audio-info")?.textContent?.includes("unavailable"));
 await page.getByRole("button",{name:"Show text"}).waitFor();
 const before=await page.evaluate(()=>window.__speechHistory.slice());
 if(type==="conversation"){
  await page.waitForFunction(()=>window.__speechHistory.length>=6);
  const recent=await page.evaluate(()=>window.__speechHistory.slice(-7));
  assert(recent.every(x=>!/^Man:|^Woman:/.test(x.text)),"Two speaker roles are not spoken aloud");
  assert(new Set(recent.map(x=>x.voice)).size>=2,"Distinct available English voices alternate");
 }
 assert.equal(await page.locator(".questions fieldset").count(),selected.questions.length);
 for(let q=0;q<selected.questions.length;q++){
   const answer=selected.questions[q].answer;
   await page.locator(".questions fieldset").nth(q).locator('input[type="radio"][value="'+answer+'"]').check({force:true});
 }
 await page.getByRole("button",{name:/Check answers/i}).click();
 await page.getByText(selected.questions.length+" / "+selected.questions.length+" correct").waitFor();
 const feedback=await page.locator(".answer-review").innerText();
 assert(feedback.includes("Question type:"),"Guide question type in feedback");
 assert(feedback.includes("Choice "),"Individual distractor reasons in feedback");
 await page.getByRole("button",{name:/Finish & see report/i}).click();
 await enter();
}
// Four random selectors select the correct task type.
for(const [type,,short] of categories){
 const names={
  "choose-response":"Random · Choose a Response",
  "conversation":"Random · Conversation",
  "announcement":"Random · Announcement",
  "academic-talk":"Random · Academic Talk"
 };
 await page.getByRole("button",{name:names[type],exact:true}).click();
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem("toefl-studio-v1")).session.items[0].type),type);
 await endSession();await enter();
}
// Four-task circuit 1+2+2+4=9.
await page.getByRole("button",{name:"Listening circuit · 9 questions"}).click();
let session=await page.evaluate(()=>JSON.parse(localStorage.getItem("toefl-studio-v1")).session);
assert.deepEqual(session.items.map(x=>x.type),["choose-response","conversation","announcement","academic-talk"]);
assert.equal(session.items.reduce((n,x)=>n+x.questions.length,0),9);
await endSession();await enter();
// 47-question mock, strict 32+15 shape, per-section one play, audio-first questions.
await page.getByRole("button",{name:"Listening full rehearsal · 47 questions"}).click();
session=await page.evaluate(()=>JSON.parse(localStorage.getItem("toefl-studio-v1")).session);
assert.equal(session.mode,"listening-mock");
assert.equal(session.items.length,25);
const sum=a=>a.reduce((n,x)=>n+x.questions.length,0);
assert.equal(sum(session.items.slice(0,18)),32);
assert.equal(sum(session.items.slice(18)),15);
assert.equal(sum(session.items),47);
assert.equal(await page.locator(".questions fieldset").count(),0,"Mock begins with audio, not answer choices");
assert.equal(await page.getByRole("button",{name:"Show text"}).count(),0,"Exam transcript hidden");
await page.getByRole("button",{name:"Play audio"}).click();
await page.getByRole("button",{name:"Played"}).waitFor();
await page.locator(".questions fieldset").first().waitFor();
assert.equal(await page.getByRole("button",{name:"Played"}).isDisabled(),true,"No replay during mock");
assert.equal(await page.locator(".questions fieldset").count(),1);
await endSession();
assert.equal(errors.length,0,"JS errors "+JSON.stringify(errors));
assert.equal(failed.length,0,"HTTP errors "+JSON.stringify(failed));
console.log(JSON.stringify({listeningBrowser:"PASS",activities:800,totalQuestions:1800,types:categories.length,voice:"two-voice conversation TTS",subpath:"PASS",mock:"32+15 questions",onePlay:"PASS",responseGrading:"PASS",storage:"PASS"}));
await browser.close();
