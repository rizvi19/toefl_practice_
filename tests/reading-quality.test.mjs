import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateReading,fullText,shingles,similarity} from '../reading/quality.mjs';
import {PRESETS,makeReadingForm,markSeen,mergeHistory,variantOf,layoutCount,feedback,randomFor,shuffleOptions} from '../reading/engine.js';
import {count,grade,newSession,moveModule,report} from '../exam/core.js';
const items=JSON.parse(fs.readFileSync('reading/bank.json','utf8')).items;
const full=JSON.parse(fs.readFileSync('exam/bank.json','utf8')).items;
const solution=x=>x.pieces?{blanks:Object.fromEntries(x.pieces.filter(p=>typeof p==='object').map((p,i)=>[i,p.answer]))}:{choices:Object.fromEntries(x.questions.map((q,i)=>[i,q.answer]))};
test('all 1,400 Reading items have valid keys, evidence, lengths, IDs, and unique content',()=>{
 assert.deepEqual(validateReading(items),[]);assert.equal(items.length,222);assert.equal(items.reduce((n,x)=>n+count(x),0),1400);
 assert.deepEqual(Object.fromEntries(['complete-words','short','long','text-chain','academic'].map(v=>[v,items.filter(x=>variantOf(x)===v).length])),{'complete-words':100,short:30,long:30,'text-chain':30,academic:32});
 for(const x of items)assert(grade(x,solution(x)).every(r=>r.correct));
 const types=new Set(items.flatMap(x=>x.questions?.map(q=>q.questionType)||[]));for(const t of ['Factual','Negative Factual','Vocabulary','Reference','Inference','Purpose','Select the Sentence','Sentence Simplification','Insert Text'])assert(types.has(t));
});
test('validator rejects duplicated/near-duplicated content, wrong keys and absent evidence',()=>{
 const one=items.find(x=>x.variant==='long'),clone=structuredClone(one);clone.id='different-id';clone.family='another-family';
 assert(validateReading([one,clone]).some(x=>x.includes('duplicate passage')));
 clone.passage+=' One added sentence.';assert(validateReading([one,clone]).some(x=>x.includes('near-duplicate')));
 clone.questions[0].answer=7;clone.questions[1].evidence='not in this text';assert(validateReading([clone]).some(x=>x.includes('invalid answer key')));assert(validateReading([clone]).some(x=>x.includes('evidence absent')));
});
test('all screenshot presets and adaptive/custom structures are deterministic and bounded',()=>{
 const expected={'adaptive':[35,15,15],'advanced-1':[33,15,15],'advanced-2':[20,15,15],'advanced-3':[23,15,15],'intermediate-1':[30,15,15],'intermediate-2':[23,15,15]};
 for(const preset of Object.keys(PRESETS))for(let seed=0;seed<100;seed++){
  const f=makeReadingForm(items,seed,{preset});assert.deepEqual(['router','upper','lower'].map(n=>f[n].reduce((a,x)=>a+count(x),0)),expected[preset]);
  const selected=[...f.router,...f.upper,...f.lower];assert.equal(new Set(selected.map(x=>x.id)).size,selected.length);assert.equal(new Set(selected.map(x=>x.family)).size,selected.length);
  if(f.config.level!=='mixed')assert(selected.every(x=>x.level===f.config.level));
  if(seed===0)assert.deepEqual(f,makeReadingForm(items,seed,{preset}));
 }
 const config=structuredClone(PRESETS.adaptive);config.router.academic=4;const f=makeReadingForm(items,8,{preset:'custom',config});assert.equal(layoutCount(f.config.router),50);
 config.router.short=-1;assert.throws(()=>makeReadingForm(items,8,{preset:'custom',config}));
 config.router.short=1.5;assert.throws(()=>makeReadingForm(items,8,{preset:'custom',config}));
 assert.throws(()=>makeReadingForm(items,8,{preset:'missing'}));
});
test('shuffling every MCQ preserves its correct text and permits every answer position',()=>{
 const positions=new Set();for(const item of items.filter(x=>x.questions))for(let seed=0;seed<20;seed++){
  const shuffled=shuffleOptions(item,randomFor(seed));shuffled.questions.forEach((q,i)=>{assert.equal(q.options[q.answer],item.questions[i].options[item.questions[i].answer]);positions.add(q.answer);});assert(grade(shuffled,solution(shuffled)).every(x=>x.correct));
 }assert.deepEqual([...positions].sort(),[0,1,2,3]);
});
test('new attempts prefer unseen texts, survive result trimming, and rotate on exhaustion',()=>{
 let ledger={},seen=new Set();
 for(let attempt=1;attempt<=5;attempt++){const f=makeReadingForm(items,attempt,{exposures:ledger});for(const x of [...f.router,...f.upper]){assert(!seen.has(x.id),`repeated before pool exhaustion: ${x.id}`);seen.add(x.id);ledger=markSeen(ledger,x,attempt);}}
 assert.deepEqual(mergeHistory(ledger,[]),ledger);
 const all=Object.fromEntries(items.map((x,i)=>[x.id,{count:1,lastSeen:i+1}]));const f=makeReadingForm(items,50,{exposures:all});assert(f.selection.reusedIds.length>0);
 const firstCtw=items.find(x=>x.variant==='complete-words');assert.equal(f.router[0].id,firstCtw.id);
 assert.equal(mergeHistory({bad:{count:NaN,lastSeen:null}})['bad'],undefined);
 // Unchosen Module 2 is not an exposure; saved session/visible-screen tests cover recording.
 const single=markSeen({},f.router[0],1);assert.equal(Object.keys(single).length,1);
});
test('score and feedback use actual item totals, fixed routing, exact grading, and no partial estimate',()=>{
 for(const preset of Object.keys(PRESETS)){
  let s=newSession(full,'Reading',30,14,Date.now(),{preset});s.responses=Object.fromEntries(s.form.router.map(x=>[x.id,solution(x)]));s=moveModule(s);assert.equal(s.route,PRESETS[preset].route==='lower'?'lower':'upper');s.responses={...s.responses,...Object.fromEntries(s.form[s.route].map(x=>[x.id,solution(x)]))};const r=report(s);assert.equal(r.stats.total,layoutCount(PRESETS[preset].router)+15);assert.equal(r.stats.correct,r.stats.total);assert.equal(r.estimate,6);assert.equal(r.feedback.unanswered,0);assert.equal(Object.values(r.feedback.tasks).reduce((n,x)=>n+x.total,0),r.stats.total);
 }
 const s=newSession(full,'Reading',30,4,Date.now());assert.equal(report(s,'abandoned').estimate,null);assert.equal(report(s).estimate,null);assert.equal(feedback([{item:s.form.router[0],results:grade(s.form.router[0],{})}]).unanswered,10);
 const word=s.form.router[0],p=word.pieces.find(x=>typeof x==='object');assert.equal(grade(word,{blanks:{0:p.answer.toUpperCase()}})[0].correct,true);assert.equal(grade(word,{blanks:{0:'x'+p.answer}})[0].correct,false);
 assert.throws(()=>newSession(full,'Reading',30,4,Date.now(),{firstMinutes:30}));
});
test('mixed performance feedback reconciles missed, unanswered and per-skill totals',()=>{
 const daily=items.find(x=>x.variant==='long'),academic=items.find(x=>x.type==='academic-passage');
 const dailyResponse={choices:{0:daily.questions[0].answer,1:(daily.questions[1].answer+1)%4}};
 const academicResponse=solution(academic);delete academicResponse.choices[2];
 const attempts=[{item:daily,results:grade(daily,dailyResponse)},{item:academic,results:grade(academic,academicResponse)}];
 const f=feedback(attempts);assert.equal(f.tasks.long.total,3);assert.equal(f.tasks.long.correct,1);assert.equal(f.tasks.academic.total,5);assert.equal(f.tasks.academic.correct,4);assert.equal(f.unanswered,2);
 assert.equal(Object.values(f.skills).reduce((n,x)=>n+x.total,0),8);assert.equal(Object.values(f.skills).reduce((n,x)=>n+x.correct,0),5);assert(f.focus.every(x=>x.missed>0));assert(f.notice.includes('No ETS item calibration'));
});
