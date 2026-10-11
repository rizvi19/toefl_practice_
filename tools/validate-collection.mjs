#!/usr/bin/env node
// 2026 Complete the Words: audit ETS-described 70–100 word, 10-sequence pattern.
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const root=process.cwd();
const read=p=>fs.readFileSync(root+"/"+p,"utf8");
const sandbox={window:{}};
vm.runInNewContext(read("collections/academic-topics-additional.js"),sandbox,{timeout:10000});
vm.runInNewContext(read("collections/complete-words-200.js"),sandbox,{timeout:20000});
const ext=sandbox.window.__TOEFL_CTW_200_EXT__;
const patched=sandbox.window.__TOEFL_CTW_REVISED__;
const bundle=read("assets/index-0Qc6vs45.js");
const page=read("index.html");
const oldMatch=bundle.match(/Dg=JSON\.parse\((['"])(.*?)\1\),xi=/s);
assert(oldMatch,"Original full form is still embedded");
const originals=JSON.parse(vm.runInNewContext(oldMatch[1]+oldMatch[2]+oldMatch[1]));
assert.equal(originals.length,60,"Original full form retains its 60 activity screens");
const originalWords=originals.filter(x=>x.type==="complete-words");
assert.equal(originalWords.length,3,"Exactly 3 existing Complete the Words exercises");
const originalsById=new Map(originals.map(x=>[x.id,x]));
assert.deepEqual(Object.keys(patched).sort(),originalWords.map(x=>x.id).sort(),"Original IDs preserved");
const modifiedOriginal=originalWords.map(x=>({...x,...patched[x.id]}));
const all=[...modifiedOriginal,...ext];
assert.equal(ext.length,197,"Add 197 extra passages to 3 original");
assert.equal(all.length,200,"Exactly 200 complete activities");
assert.equal(new Set(all.map(x=>x.id)).size,200,"Unique stable IDs");
assert.equal(new Set(all.map(x=>x.title)).size,200,"No duplicate activity names");
assert(ext.every((x,i)=>x.id==="ctw26-ext-"+String(i+1).padStart(3,"0")));
assert(!ext.some(x=>originalsById.has(x.id)),"Do not reuse existing IDs");
const countWords=t=>(t.match(/\b[A-Za-z]+(?:['’][A-Za-z]+)?\b/g)||[]).length;
const func=new Set("a an the and as at be been being but by can did do does for from had has have he her hers him his how if in into is it its may might more most not of on or our out over she so some than that their them there these they this those through to under until up was were what when where which while who will with would you your".split(" "));
const rounded={Easy:0,Medium:0,Hard:0,Mixed:0};
let grams=0,totalMissingLetters=0,smallest=999,largest=0;
let worst=[];
for(const item of all){
 assert.equal(item.type,"complete-words",item.id);
 const pieces=item.pieces;
 assert(Array.isArray(pieces)&&pieces.length===21,item.id+" must have ten blanks alternating with eleven strings");
 const blanks=pieces.filter(x=>typeof x==="object");
 assert.equal(blanks.length,10,item.id);
 assert(blanks.every(x=>typeof x.explanation==="string"&&x.explanation.length>=100),"Missing meaningful contextual explanation "+item.id);
 const passage=pieces.map(x=>typeof x==="string"?x:x.pre+x.answer+(x.post||"")).join("");
 const wc=countWords(passage);smallest=Math.min(smallest,wc);largest=Math.max(largest,wc);
 assert(wc>=70&&wc<=100,item.id+" out of official 70–100 range: "+wc);
 const firstSentence=passage.split(". ")[0]+".";
 assert.equal(pieces[0].startsWith(firstSentence),true,"Complete intact opening sentence "+item.id);
 assert.equal(pieces[0].indexOf("." )>=0,true,"No blank in first sentence "+item.id);
 assert(pieces[0].length<passage.length/2,"Blanks must begin after short initial context, not at end "+item.id);
 let selectedTokens=0;
 for(let i=0;i<10;i++){
   const b=pieces[i*2+1],pre=b.pre,answer=b.answer;
   assert(/^[A-Za-z]+$/.test(pre)&&/^[A-Za-z]+$/.test(answer),item.id);
   const complete=pre+answer;
   assert(complete.length>=2&&pre.length===Math.ceil(complete.length/2)&&answer.length===Math.floor(complete.length/2),item.id+" half word rule");
   assert(b.explanation.includes("“"+complete+"”")&&b.explanation.includes("“"+answer+"”"),item.id+" explanation must identify correct exact spelling");
   totalMissingLetters+=answer.length;
   if(func.has(complete.toLowerCase()))selectedTokens++;
 }
 assert(selectedTokens>=1&&selectedTokens<=8,item.id+" include both grammar words and academic content");
 grams+=selectedTokens;
 rounded[item.difficulty]=(rounded[item.difficulty]||0)+1;
 assert(passage.indexOf("\n")===-1,item.id);
}
assert.equal(Object.values(rounded).reduce((a,b)=>a+b,0),200);
assert(page.includes('./collections/academic-topics-additional.js'));
assert(page.includes('./collections/complete-words-200.js'));
assert(page.indexOf("academic-topics-additional.js")<page.indexOf("complete-words-200.js"));
assert(bundle.includes("...xi.items,...CTW,...o.custom"),"Shared library retains imports");
assert(bundle.includes("__TOEFL_CTW_REVISED__"),"Original form revised in place");
assert(bundle.includes("__TOEFL_CTW_200_EXT__"),"New bank exposed publicly");
assert(bundle.includes("Browse all 200 passages"));
assert(bundle.includes('const nr="toefl-studio-v1"'),"Existing progress remains compatible");
assert(bundle.includes('onClick:()=>pe(xi.items,"exam"'),"Full practice form remains separate");
for(const f of ["assets/index-DLay_trC.css","audio/repeat-1.wav","docs/format-and-sources.html"]) assert(fs.existsSync(root+"/"+f),f);
console.log(JSON.stringify({result:"PASS",newAdditional:ext.length,revisedOriginal:3,totalCompleteWords:all.length,wordsPerPassage:[smallest,largest],sequences:all.length*10,missingLetters:totalMissingLetters,functionWordSequences:grams,otherFullFormScreens:originals.length,allLibraryActivities:originals.length+ext.length,difficulty:rounded,audioFiles:fs.readdirSync(root+"/audio").length},null,2));
