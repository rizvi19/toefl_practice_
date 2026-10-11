import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import {chromium} from "playwright";

const root=process.env.SITE_ROOT||".",win={};
for(const file of [
"academic-topics-additional.js","complete-words-200.js","daily-life-scenarios.js",
"daily-life-vocabulary.js","daily-life-200.js","academic-expansions-first.js",
"academic-expansions-second.js","academic-question-guidance.js","academic-200.js"
])vm.runInNewContext(fs.readFileSync(root+"/collections/"+file,"utf8"),{window:win});
const first=win.__TOEFL_CTW_200_EXT__[0],daily=win.__TOEFL_DAILY_200__[0],academic=win.__TOEFL_ACADEMIC_200__[0];
const browser=await chromium.launch({headless:true});
const page=await browser.newPage();
page.setDefaultTimeout(18000);
const errors=[],failed=[];
page.on("pageerror",x=>errors.push(x.message));
page.on("response",r=>{if(r.status()>=400)failed.push(r.status()+" "+r.url())});
const url="http://127.0.0.1:4177/toefl_practice_/";
await page.goto(url,{waitUntil:"networkidle"});
const enter=async()=>{await page.getByRole("button",{name:/Practice library/i}).first().click();};
await enter();
await page.getByRole("heading",{name:/Reading practice · 200 in each task/i}).waitFor();

// Complete the Words: 200 items, 10 fixed word endings, persistence and 10/10 grade.
await page.getByRole("button",{name:"Browse 200 Complete the Words"}).click();
let rows=page.locator(".activity-row");
assert.equal(await rows.count(),200);
await rows.nth(3).getByRole("button",{name:/Practice/}).click();
assert.equal(await page.locator(".word-group").count(),10);
const answers=first.pieces.filter(x=>typeof x==="object");
assert.equal(await page.locator(".letter-slot").count(),answers.reduce((n,x)=>n+x.answer.length,0));
await page.locator(".letter-slot").first().fill(answers[0].answer[0]);
await page.waitForFunction(({id,letter})=>{
try{return JSON.parse(localStorage.getItem("toefl-studio-v1")).session?.responses?.[id]?.blanks?.[0]?.[0]===letter}
catch{return false}
},{id:first.id,letter:answers[0].answer[0]});
await page.reload({waitUntil:"networkidle"});
await page.getByRole("button",{name:/Resume session/i}).click();
assert.equal(await page.locator(".letter-slot").first().inputValue(),answers[0].answer[0]);
for(let w=0;w<10;w++){
 const slots=page.locator(".word-group").nth(w).locator("input");
 for(let k=0;k<answers[w].answer.length;k++)await slots.nth(k).fill(answers[w].answer[k]);
}
await page.getByRole("button",{name:/Check answers/i}).click();
await page.getByText("10 / 10 correct").waitFor();
await page.getByRole("button",{name:/Finish & see report/i}).click();

// Daily Life: 200 full items and answer feedback includes question type.
await enter();
await page.getByRole("button",{name:"Browse 200 Daily Life"}).click();
rows=page.locator(".activity-row");
assert.equal(await rows.count(),200);
await rows.nth(5).getByRole("button",{name:/Practice/}).click();
assert.equal(await page.locator(".questions fieldset").count(),daily.questions.length);
for(let j=0;j<daily.questions.length;j++)
 await page.locator(".questions fieldset").nth(j).locator('input[type="radio"][value="'+daily.questions[j].answer+'"]').check({force:true});
await page.getByRole("button",{name:/Check answers/i}).click();
await page.getByText(daily.questions.length+" / "+daily.questions.length+" correct").waitFor();
assert((await page.locator(".answer-review").innerText()).includes("Question type:"));
await page.getByRole("button",{name:/Finish & see report/i}).click();

// Academic: two-paragraph ~200-word activity with five question types.
await enter();
await page.getByRole("button",{name:"Browse 200 Academic Passages"}).click();
rows=page.locator(".activity-row");
assert.equal(await rows.count(),200);
await rows.nth(2).getByRole("button",{name:/Practice/}).click();
assert.equal(await page.locator(".questions fieldset").count(),5);
const text=await page.locator(".reading-passage").innerText();
assert(text.includes("[A]")&&text.includes("[B]")&&text.includes("[C]")&&text.includes("[D]"));
for(let j=0;j<academic.questions.length;j++)
 await page.locator(".questions fieldset").nth(j).locator('input[type="radio"][value="'+academic.questions[j].answer+'"]').check({force:true});
await page.getByRole("button",{name:/Check answers/i}).click();
await page.getByText("5 / 5 correct").waitFor();
assert((await page.locator(".answer-review").innerText()).includes("Question type:"));
await page.getByRole("button",{name:/Finish & see report/i}).click();

// Three independent random selectors keep the specified Reading type.
await enter();
await page.getByRole("button",{name:"Random · Daily Life"}).click();
const t=await page.evaluate(()=>JSON.parse(localStorage.getItem("toefl-studio-v1")).session.items[0].type);
assert.equal(t,"daily-life");
await page.getByRole("button",{name:/Finish session/i}).click();
await page.getByRole("dialog",{name:"Finish this session?"}).getByRole("button",{name:"Continue"}).click();

// Optional combined Reading sequence of 35 + 15 graded answers (non-adaptive).
await enter();
await page.getByRole("button",{name:/Reading rehearsal · 50 questions/i}).click();
const session=await page.evaluate(()=>JSON.parse(localStorage.getItem("toefl-studio-v1")).session);
assert.equal(session.items.length,8);
assert.deepEqual(session.items.map(x=>x.type),[
 "complete-words","complete-words","daily-life","daily-life",
 "academic-passage","academic-passage","complete-words","academic-passage"
 ]);
const questions=x=>x.type==="complete-words"?10:x.questions.length;
assert.equal(session.items.reduce((n,x)=>n+questions(x),0),50);
assert.equal(session.items.slice(0,6).reduce((n,x)=>n+questions(x),0),35);
assert.equal(session.items.slice(6).reduce((n,x)=>n+questions(x),0),15);
await page.getByRole("button",{name:/Finish session/i}).click();
await page.getByRole("dialog",{name:"Finish this session?"}).getByRole("button",{name:"Continue"}).click();

// Original full form is separate and keeps all 60 original activity screens.
await enter();
await page.getByRole("button",{name:/Full practice form/i}).click();
assert((await page.locator(".practice-toolbar").innerText()).includes("60"));
for(const f of ["audio/repeat-1.wav","docs/format-and-sources.html"]){
 const response=await page.request.get(url+f);
 assert.equal(response.status(),200,f+" at repository subpath");
}
assert.equal(errors.length,0,"JavaScript errors: "+errors.join("; "));
assert.equal(failed.length,0,"HTTP failures: "+failed.join("; "));
await browser.close();
console.log(JSON.stringify({browser:"PASS",readingActivities:600,dailyGrade:daily.questions.length+"/"+daily.questions.length,academicGrade:"5/5",clozeGrade:"10/10",random:"PASS",fullReading:"35+15 questions",originalForm:"60 screens",storage:"PASS",subpath:"PASS"}));
