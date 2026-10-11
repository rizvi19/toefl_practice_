#!/usr/bin/env node
// Independent validation for the shared 2026 Complete the Words collection.
// The site is static: its existing React production bundle is deliberately retained.
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
const root=process.cwd();
const bankSource=fs.readFileSync(root+"/collections/complete-words-100.js","utf8");
const page=fs.readFileSync(root+"/index.html","utf8");
const bundle=fs.readFileSync(root+"/assets/index-0Qc6vs45.js","utf8");
const sandbox={window:{}};vm.runInNewContext(bankSource,sandbox,{timeout:10000});
const items=sandbox.window.__TOEFL_CTW_100__;
assert.equal(items.length,100);
assert.equal(new Set(items.map(x=>x.id)).size,100);
assert.equal(new Set(items.map(x=>x.title)).size,100);
assert.equal(items.filter(x=>x.difficulty==="Hard").length>=20,true);
assert.equal(items.filter(x=>x.difficulty==="Easy").length>=20,true);
assert.equal(items.filter(x=>x.difficulty==="Medium").length>=20,true);
let allWords=0;
for(const [i,item] of items.entries()){
 assert.equal(item.id,"ctw26-ext-"+String(i+1).padStart(3,"0"));
 assert.equal(item.type,"complete-words");
 assert.equal(item.pack,"Complete the Words · Extended 100");
 assert.equal(item.pieces.filter(x=>typeof x==="object").length,10,item.id);
 assert.equal(item.pieces.length,21,item.id);
 assert.equal(item.pieces[0].includes("."),true,"Keep initial full context sentence: "+item.id);
 const full=item.pieces.map(x=>typeof x==="string"?x:x.pre+x.answer).join("");
 const words=full.match(/\b[A-Za-z]+\b/g)||[];
 assert.equal(words.length>=65&&words.length<=160,true,"Passage word count "+words.length+" "+item.id);
 assert.equal(full.split(".").length>=5,true,"At least four coherent sentences "+item.id);
 for(const p of item.pieces.filter(x=>typeof x==="object")){
  assert.match(p.pre,/^[A-Za-z]{2,}$/);
  assert.match(p.answer,/^[A-Za-z]{2,20}$/);
  assert.equal((p.pre+p.answer).length>=5,true);
  assert.equal(p.explanation.includes(p.pre+p.answer),true);
  assert.equal(p.explanation.length>=70,true);
  allWords++;
 }
}
assert.equal(allWords,1000);
assert.equal(page.includes("./collections/complete-words-100.js"),true);
assert.equal(page.includes("./assets/index-0Qc6vs45.js"),true);
assert.equal(bundle.includes("...xi.items,...CTW,...o.custom"),true);
assert.equal(bundle.includes('const nr="toefl-studio-v1"'),true);
assert.equal(bundle.includes('onClick:()=>pe(xi.items,"exam"'),true);
assert.equal(bundle.includes("Complete the Words — Extended 100"),true);
// Read the original embedded question bank, rather than counting strings in React UI.
const match=bundle.match(/Dg=JSON\.parse\((['"])(.*?)\1\),xi=/s);
if(!match)throw Error("Cannot locate the immutable original bank");
const original=JSON.parse(vm.runInNewContext(match[1]+match[2]+match[1]));
assert.equal(original.length,120);
const oldIds=new Set(original.map(x=>x.id));
assert.equal(oldIds.size,120);
assert.equal(items.some(x=>oldIds.has(x.id)),false);
assert.equal(original.filter(x=>x.type==="complete-words").length,10);
for(const [dir,sample] of [["assets","assets/index-DLay_trC.css"],["audio","audio/repeat-1.wav"],["docs","docs/format-and-sources.html"]]){
 assert.equal(fs.existsSync(root+"/"+dir),true);
 assert.equal(fs.existsSync(root+"/"+sample),true);
}
console.log(JSON.stringify({status:"PASS",originalForm:original.length,newActivities:items.length,newMissingSequences:allWords,totalLibrary:original.length+items.length,audioFiles:fs.readdirSync("audio").length,difficultyCounts:Object.fromEntries(["Easy","Medium","Hard","Mixed"].map(x=>[x,items.filter(y=>y.difficulty===x).length]))},null,2));
