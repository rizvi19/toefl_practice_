import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {fullText,normalize,shingles,similarity,validateReading} from '../reading/quality.mjs';
const baseCommit='b15a662f881feac44e99d325ad3800075b6b7ac6';
const baseline=JSON.parse(execFileSync('git',['show',`${baseCommit}:exam/bank.json`],{encoding:'utf8',maxBuffer:10e6})).items;
const current=JSON.parse(fs.readFileSync('exam/bank.json','utf8')).items;
const reading=x=>['complete-words','daily-life','academic-passage'].includes(x.type);
const fingerprint=a=>createHash('sha256').update(JSON.stringify(a)).digest('hex');
const originalNonReading=bundle=>{
 const m=bundle.match(/Dg=JSON\.parse\((['"])(.*?)\1\),(?:READING_ORIGINAL_TAGS=|xi=)/s);
 assert(m,'Original full-form data missing');
 return JSON.parse(vm.runInNewContext(m[1]+m[2]+m[1])).filter(x=>!reading(x));
};
const baselineOriginal=originalNonReading(execFileSync('git',['show',`${baseCommit}:assets/index-0Qc6vs45.js`],{encoding:'utf8',maxBuffer:10e6}));
const currentOriginal=originalNonReading(fs.readFileSync('assets/index-0Qc6vs45.js','utf8'));
assert.deepEqual(currentOriginal,baselineOriginal,'Original Listening/Writing/Speaking data changed');
assert.equal(fingerprint(current.filter(x=>!reading(x))),fingerprint(baseline.filter(x=>!reading(x))),'Listening data changed');
const summary=a=>{
 const passages=new Map(),stems=new Map(),options=new Map(),pairs=[];
 for(const x of a){const text=normalize(fullText(x));passages.set(text,(passages.get(text)||0)+1);for(const q of x.questions||[]){stems.set(q.stem,(stems.get(q.stem)||0)+1);const key=q.options.map(normalize).sort().join('|');options.set(key,(options.get(key)||0)+1);}}
 const sets=a.map(x=>shingles(fullText(x)));for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++){const score=similarity(sets[i],sets[j]);if(score>=.28)pairs.push({ids:[a[i].id,a[j].id],similarity:Number(score.toFixed(3))});}
 return {activities:a.length,scoredItems:a.reduce((n,x)=>n+(x.pieces?10:x.questions.length),0),exactDuplicateCopies:[...passages.values()].reduce((n,x)=>n+x-1,0),nearDuplicatePairs:pairs.length,nearDuplicateExamples:pairs.slice(0,8),mostRepeatedStems:[...stems].sort((a,b)=>b[1]-a[1]).slice(0,5),maxIdenticalOptionSetReuse:Math.max(0,...options.values())};
};
const report={baseCommit,method:'Lowercase alphanumeric normalization; exact passages and 5-word-shingle Jaccard >=0.28. Duplicate MCQs use stem plus unordered options. Mechanical checks cannot certify linguistic difficulty or rule out every semantic ambiguity.',baseline:summary(baseline.filter(reading)),current:summary(current.filter(reading)),listening:{activities:800,unchanged:true,sha256:fingerprint(current.filter(x=>!reading(x)))},validationErrors:validateReading(current.filter(reading))};
report.originalNonReading={activities:currentOriginal.length,unchanged:true,sha256:fingerprint(currentOriginal)};
assert.deepEqual(report.validationErrors,[]);
fs.writeFileSync('docs/READING_QUALITY_AUDIT.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
