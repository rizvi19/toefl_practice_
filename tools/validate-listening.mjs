#!/usr/bin/env node
import fs from "node:fs";
import assert from "node:assert/strict";
import vm from "node:vm";
const root=process.env.SITE_ROOT||".";
const win={};
const files=[
 "academic-topics-additional.js","complete-words-200.js",
 "daily-life-scenarios.js","daily-life-vocabulary.js","daily-life-200.js",
 "academic-expansions-first.js","academic-expansions-second.js",
 "academic-question-guidance.js","academic-vocab-distractors.js","academic-200.js",
 "listening-campus-cases.js","listening-200.js"
];
for(const name of files){
 const s=fs.readFileSync(root+"/collections/"+name,"utf8");
 vm.runInNewContext(s,{window:win},{timeout:40000,filename:name});
}
const src=fs.readFileSync(root+"/assets/index-0Qc6vs45.js","utf8");
const baseMatch=src.match(/Dg=JSON\.parse\((['"])(.*?)\1\),(?:READING_ORIGINAL_TAGS=|xi=)/s);
assert(baseMatch,"Original unaltered exam bank must remain available");
const base=JSON.parse(vm.runInNewContext(baseMatch[1]+baseMatch[2]+baseMatch[1]));
const newGroups=win.__TOEFL_LISTENING_EXTENDED__;
const required={"choose-response":200,"conversation":200,"announcement":200,"academic-talk":200};
const expectedNew={"choose-response":185,"conversation":196,"announcement":196,"academic-talk":196};
const questions={"choose-response":1,"conversation":2,"announcement":2,"academic-talk":4};
const ranges={"choose-response":[5,75],"conversation":[35,100],"announcement":[35,85],"academic-talk":[145,250]};
const wordCount=s=>(s.match(/\b[A-Za-z]+(?:['’-][A-Za-z]+)*\b/g)||[]).length;
const kinds={},stats={},all=[];
for(const [type,expected] of Object.entries(required)){
 const old=base.filter(x=>x.type===type),added=newGroups[type];
 assert.equal(added.length,expectedNew[type],type+" count of new complete activities");
 assert.equal(old.length+added.length,expected,type+" total count");
 let low=9999,high=0,level={};
 for(const x of added){
  assert.equal(x.type,type);
  assert.equal(x.questions.length,questions[type],x.id+" exact per-task question count");
  assert(typeof x.script==="string"&&x.script.length>=20,x.id+" listening transcript");
  const w=wordCount(x.script);
  low=Math.min(w,low);high=Math.max(w,high);
  assert(w>=ranges[type][0]&&w<=ranges[type][1],x.id+" "+type+" length "+w+" words");
  if(type==="conversation")assert(/Woman:/.test(x.script)&&/Man:/.test(x.script),x.id+" real two-speaker script");
  for(const [j,q] of x.questions.entries()){
   assert(q.stem&&q.options.length===4&&q.explanation&&q.questionType,x.id+" question "+j);
   assert(new Set(q.options).size===4,x.id+" unique answer choices");
   assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,x.id+" index");
   assert(q.explanation.startsWith("Question type: "+q.questionType),x.id+" type explanation");
   assert(q.explanation.includes("Choice ")&&q.explanation.includes("Strategy:"),x.id+" option-specific feedback and strategy");
   kinds[q.questionType]=(kinds[q.questionType]||0)+1;
  }
  level[x.difficulty]=(level[x.difficulty]||0)+1;
  all.push(x);
 }
 stats[type]={total:expected,added:added.length,scriptWords:[low,high],levels:level,gradedQuestions:expected*questions[type]};
}
for(const t of ["Main Idea","Factual","Inference","Purpose","Method","Attitude","Response Appropriateness"])
 assert(kinds[t]>0,"missing guide question type "+t);
assert.equal(all.length,773);
assert.equal(new Set(all.map(x=>x.id)).size,all.length);
assert(all.every(x=>!base.some(b=>b.id===x.id)),"No historical question IDs overwritten");
assert.equal(base.length,60);
assert.equal(base.filter(x=>["choose-response","conversation","announcement","academic-talk"].includes(x.type)).length,27);
const html=fs.readFileSync(root+"/index.html","utf8");
assert(html.includes("./collections/listening-200.js"),"Listening source loaded on website");
assert(src.includes("...LISTENING"),"Integrated shared library");
assert(src.includes('const nr="toefl-studio-v1"'),"Original storage key unchanged");
assert(src.includes('onClick:()=>pe(xi.items,"exam"'),"Original full practice form retained");
const modules=[8,4,4,2,3,1,1,2],counts=[1,2,2,4,1,2,2,4];
assert.equal(modules.slice(0,4).reduce((s,n,i)=>s+n*counts[i],0),32);
assert.equal(modules.slice(4).reduce((s,n,i)=>s+n*counts[i],0),15);
console.log(JSON.stringify({
 test:"PASS",baseScreens:base.length,newListeningActivities:all.length,
 allListeningActivities:800,totalListeningQuestions:1800,
 chapter3Skills:kinds,byType:stats,
 fullListeningMock:{module1:32,module2:15,total:47},savedStorage:"toefl-studio-v1"
},null,2));
