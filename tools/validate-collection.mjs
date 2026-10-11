#!/usr/bin/env node
// Validate each released question bank and ETS-described activity format.
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
const read=p=>fs.readFileSync(p,"utf8");
const root=process.cwd(),win={};
for(const path of [
 "collections/academic-topics-additional.js",
 "collections/complete-words-200.js",
 "collections/daily-life-scenarios.js",
 "collections/daily-life-vocabulary.js",
 "collections/daily-life-200.js",
 "collections/academic-expansions-first.js",
 "collections/academic-expansions-second.js",
 "collections/academic-question-guidance.js",
 "collections/academic-vocab-distractors.js",
 "collections/academic-200.js"
 ])vm.runInNewContext(read(root+"/"+path),{window:win},{timeout:30000});
const CTW=win.__TOEFL_CTW_200_EXT__,DL=win.__TOEFL_DAILY_200__,AC=win.__TOEFL_ACADEMIC_200__;
const bundle=read(root+"/assets/index-0Qc6vs45.js"),html=read(root+"/index.html");
const match=bundle.match(/Dg=JSON\.parse\((['"])(.*?)\1\),(?:READING_ORIGINAL_TAGS=|xi=)/s);
assert(match,"Original full practice form must remain in bundle");
const original=JSON.parse(vm.runInNewContext(match[1]+match[2]+match[1]));
assert.equal(original.length,60);
const oldIds=new Set(original.map(x=>x.id));
assert.equal(oldIds.size,60);
const oldCount=t=>original.filter(x=>x.type===t).length;
assert.equal(oldCount("complete-words"),3);
assert.equal(oldCount("daily-life"),5);
assert.equal(oldCount("academic-passage"),2);
assert.equal(CTW.length+oldCount("complete-words"),200);
assert.equal(DL.length+oldCount("daily-life"),200);
assert.equal(AC.length+oldCount("academic-passage"),200);
assert.equal(CTW.length,197);
assert.equal(DL.length,195);
assert.equal(AC.length,198);
const allNew=[...CTW,...DL,...AC];
assert.equal(allNew.length,590);
assert.equal(new Set(allNew.map(x=>x.id)).size,590);
assert(allNew.every(x=>!oldIds.has(x.id)));
const count=s=>(s.match(/\b[A-Za-z]+(?:['’-][A-Za-z]+)*\b/g)||[]).length;
const skills={};
const counts={};
let totalQuestions=0,low=1e5,high=0,dlMin=1e5,dlMax=0,acadMin=1e5,acadMax=0;
function verifyQuestion(q,id){
 assert(typeof q.stem==="string"&&q.stem.length>18,id);
 assert(Array.isArray(q.options)&&q.options.length===4,id+" has four options");
 assert(q.options.every(x=>typeof x==="string"&&x.length>=3),id);
 assert.equal(new Set(q.options).size,4,id+" unique answer options");
 assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,id+" answer key");
 assert(q.explanation?.startsWith("Question type: "+q.questionType),id+" answer type explanation");
 assert(q.explanation.length>=100,id+" substantive feedback");
 skills[q.questionType]=(skills[q.questionType]||0)+1;
 totalQuestions++;
}
for(const [index,item] of DL.entries()){
 assert.equal(item.id,"daily26-"+String(index+1).padStart(3,"0"));
 assert.equal(item.type,"daily-life");
 assert(item.questions.length===2||item.questions.length===3);
 const words=count(item.passage);dlMin=Math.min(dlMin,words);dlMax=Math.max(dlMax,words);
 assert(words>=15&&words<=150,item.id+" daily words "+words);
 assert(item.format&&item.topic&&item.pack);
 item.questions.forEach(q=>{
   verifyQuestion(q,item.id);
   if(q.questionType==="Vocabulary"){
     const w=q.stem.match(/“([^”]+)”/)?.[1];
     assert(w&&new RegExp("\\b"+w+"\\b","i").test(item.passage),item.id+" vocabulary must be in passage: "+w);
   }
   if(q.questionType==="Negative Factual"){
     const right=q.options[q.answer];
     assert(!item.passage.includes(right),item.id+" negative factual choice cannot be stated");
   }
 });
 counts[item.difficulty]=(counts[item.difficulty]||0)+1;
}
for(const [index,item] of AC.entries()){
 assert.equal(item.id,"academic26-"+String(index+1).padStart(3,"0"));
 assert.equal(item.type,"academic-passage");
 assert.equal(item.questions.length,5);
 const words=count(item.passage);acadMin=Math.min(acadMin,words);acadMax=Math.max(acadMax,words);
 assert(words>=145&&words<=245,item.id+" academic words "+words);
 assert(item.passage.includes("\n\n"),item.id+" two expository paragraphs");
 item.questions.forEach(q=>{
   verifyQuestion(q,item.id);
   if(q.questionType==="Vocabulary"){
     const w=q.stem.match(/“([^”]+)”/)?.[1];
     assert(w&&new RegExp("\\b"+w+"\\b","i").test(item.passage),item.id+" vocabulary must be in passage "+w);
   }
   if(q.questionType==="Insert Text"||q.questionType==="Select the Sentence"){
     assert(["[A]","[B]","[C]","[D]"].every(x=>item.passage.includes(x)),item.id+" must show four labeled options");
     assert(q.options.every(x=>/^(Position|Sentence) [A-D]$/.test(x)),item.id+" location options");
   }
   if(q.questionType==="Reference")assert(/This evidence/i.test(item.passage),item.id+" reference context");
 });
 counts[item.difficulty]=(counts[item.difficulty]||0)+1;
}
for(const item of [...original.filter(x=>x.type==="complete-words").map(x=>({...x,...win.__TOEFL_CTW_REVISED__[x.id]})),...CTW]){
 const b=item.pieces.filter(x=>typeof x==="object");
 assert.equal(b.length,10,item.id+" ten fixed ending sequences");
 const full=item.pieces.map(x=>typeof x==="string"?x:x.pre+x.answer+(x.post||"")).join("");
 const w=count(full);low=Math.min(low,w);high=Math.max(high,w);
 assert(w>=70&&w<=100,item.id+" cloze length "+w);
 assert(item.pieces[0].includes("."),item.id+" full first sentence");
 assert(b.every(x=>x.pre.length===Math.ceil((x.pre+x.answer).length/2)),item.id+" half word");
}
const required=["Factual","Negative Factual","Vocabulary","Select the Sentence","Sentence Simplification","Reference","Inference","Rhetorical Purpose","Insert Text"];
assert(required.every(x=>skills[x]>0),"Missing a question type "+JSON.stringify(skills));
const supported=[
 "collections/complete-words-200.js",
 "collections/daily-life-200.js",
 "collections/academic-200.js",
 "assets/index-0Qc6vs45.js",
 "audio/repeat-1.wav",
 "docs/OFFICIAL_FORMAT_200_README.md"
];
for(const p of supported)assert(fs.existsSync(root+"/"+p),p+" must exist");
assert(html.includes('./collections/academic-200.js'));
assert(bundle.includes("...CTW,...DAILY,...ACADEMIC,...o.custom"));
assert(bundle.includes('const nr="toefl-studio-v1"'));
assert(bundle.includes('onClick:()=>pe(xi.items,"exam"'));
assert(bundle.includes("Random · Academic Passage"));
assert(bundle.includes("Reading rehearsal · 50 questions"));
console.log(JSON.stringify({
 result:"PASS",originalFullForm:original.length,
 counts:{CompleteTheWords:CTW.length+3,ReadInDailyLife:DL.length+5,ReadAnAcademicPassage:AC.length+2},
 newQuestionCount:totalQuestions,questionTypes:skills,
 wordCounts:{cloze:[low,high],daily:[dlMin,dlMax],academic:[acadMin,acadMax]},
 difficulties:counts,originalIDsPreserved:true,
 sharedReadingBuiltIn:600,wholeLibrary:original.length+allNew.length,
 audioCount:fs.readdirSync(root+"/audio").length
},null,2));
