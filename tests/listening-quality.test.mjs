import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {execFileSync} from 'node:child_process';
import {validate} from '../listening/quality.mjs';import {TYPES} from '../listening/constants.js';
import {PRESETS,makeForm,markSeen,historyLedger,shuffle,feedback,layoutCount,select} from '../listening/engine.js';
import {newSession,moveModule,report,grade,count,go,respond,canAdvanceListening} from '../exam/core.js';import {randomFor} from '../reading/engine.js';
const bank=JSON.parse(fs.readFileSync('listening/bank.json','utf8')).items,all=JSON.parse(fs.readFileSync('exam/bank.json','utf8')).items;
const solution=x=>({choices:Object.fromEntries(x.questions.map((q,i)=>[i,q.answer]))});
test('every Listening activity has unique grounded questions, four reasoned choices and correct task size',()=>{
 assert.deepEqual(validate(bank),[]);assert.equal(bank.length,200);assert.equal(bank.reduce((n,x)=>n+count(x),0),450);
 for(const type of TYPES){const group=bank.filter(x=>x.type===type);assert.equal(group.length,50);assert.equal(group.filter(x=>x.level==='advanced').length,25);}
 for(const x of bank)assert(grade(x,solution(x)).every(r=>r.correct));
 for(const type of ['Main Idea','Factual','Inference','Purpose','Method','Attitude'])assert(bank.some(x=>x.questions.some(q=>q.questionType===type)));
});
test('Listening validation rejects near scripts, exact questions, unsupported evidence, and invalid keys',()=>{
 const a=bank.find(x=>x.type==='conversation'),b=structuredClone(a);b.id='another';assert(validate([a,b]).some(x=>x.includes('duplicate script')));b.script+=' A new final sentence.';assert(validate([a,b]).some(x=>x.includes('near duplicate')));
 b.questions[0].evidence='Not in this dialogue';b.questions[1].answer=8;assert(validate([b]).some(x=>x.includes('evidence absent')));assert(validate([b]).some(x=>x.includes('invalid answer key')));
});
test('600 Listening forms preserve 32+15 and task ranges with strict levels and no repeated families',()=>{
 for(const preset of Object.keys(PRESETS))for(let seed=0;seed<200;seed++){
  const f=makeForm(bank,seed,{preset}),items=[...f.router,...f.upper,...f.lower];assert.deepEqual(['router','upper','lower'].map(m=>f[m].reduce((n,x)=>n+count(x),0)),[32,15,15]);assert.equal(new Set(items.map(x=>x.id)).size,items.length);assert.equal(new Set(items.map(x=>x.family)).size,items.length);
  if(f.config.level!=='mixed')assert(items.every(x=>x.level===f.config.level));
  for(const route of ['upper','lower']){const played=[...f.router,...f[route]],counts=Object.fromEntries(TYPES.map(t=>[t,played.filter(x=>x.type===t).reduce((n,x)=>n+count(x),0)]));assert(counts['choose-response']>=15&&counts['choose-response']<=19);assert.equal(counts.conversation,10);assert(counts.announcement>=6&&counts.announcement<=10);assert(counts['academic-talk']>=8&&counts['academic-talk']<=16);}
  if(seed===0)assert.deepEqual(f,makeForm(bank,seed,{preset}));
 }
});
test('Listening option shuffle preserves the answer and every attached option rationale',()=>{
 const positions=new Set();for(const x of bank)for(let seed=0;seed<25;seed++){const s=shuffle(x,randomFor(seed));s.questions.forEach((q,i)=>{const authored=x.questions[i];assert.equal(q.options[q.answer],authored.options[authored.answer]);q.options.forEach((o,j)=>assert.equal(q.rationales[j],authored.rationales[authored.options.indexOf(o)]));positions.add(q.answer);});assert(grade(s,solution(s)).every(r=>r.correct));}assert.equal(positions.size,4);
});
test('unheard eligible stimuli precede repeats; the retained ledger survives trimmed reports and exhaustion',()=>{
 let ledger={},heard=new Set();for(let attempt=0;attempt<2;attempt++){const f=makeForm(bank,attempt,{exposures:ledger});for(const x of [...f.router,...f.upper]){assert(!heard.has(x.id),'repeat before eligible pool exhaustion');heard.add(x.id);ledger=markSeen(ledger,x,attempt+1);}}
 assert.deepEqual(historyLedger(ledger,[]),ledger);const pool=bank.filter(x=>x.type==='announcement');const full=Object.fromEntries(pool.map((x,i)=>[x.id,{count:1,lastSeen:i}]));assert.equal(select(pool,1,full,randomFor(2))[0].id,pool[0].id);assert.equal(makeForm(bank,8,{exposures:Object.fromEntries(bank.map((x,i)=>[x.id,{count:1,lastSeen:i}]))}).selection.reusedIds.length,40);
 assert.deepEqual(historyLedger({},[{listeningVersion:'listening-2026-v2',seenIds:[bank[0].id],finishedAt:5}]),{[bank[0].id]:{count:1,lastSeen:5}});assert.deepEqual(historyLedger({},[{attempts:[{item:bank[0]}]}]),{});
});
test('Listening presets, custom timing and score feedback use the actual selected denominator',()=>{
 for(const preset of Object.keys(PRESETS)){let s=newSession(all,'Listening',29,5,Date.now(),{preset});s.responses=Object.fromEntries(s.form.router.map(x=>[x.id,solution(x)]));s=moveModule(s);assert.equal(s.route,preset==='intermediate'?'lower':'upper');s.responses={...s.responses,...Object.fromEntries(s.form[s.route].map(x=>[x.id,solution(x)]))};const r=report(s);assert.deepEqual(r.stats,{correct:47,total:47});assert.equal(r.estimate,6);assert.equal(r.feedback.unanswered,0);assert.equal(Object.values(r.feedback.tasks).reduce((n,x)=>n+x.total,0),47);}
 const config=structuredClone(PRESETS.adaptive);config.router=[6,2,2,1];config.route='lower';const s=newSession(all,'Listening',29,7,Date.now(),{preset:'custom',config,firstMinutes:16});assert.equal(s.time.first,960);assert.equal(layoutCount(s.form.config.router),18);assert.equal(report(s).estimate,null);assert.equal(report(s,'abandoned').estimate,null);
 const f=feedback([{item:bank[0],results:grade(bank[0],{})}]);assert.equal(f.unanswered,1);assert.equal(f.focus[0].missed,1);assert.throws(()=>makeForm(bank,1,{preset:'unknown'}));config.router[0]=.5;assert.throws(()=>makeForm(bank,1,{preset:'custom',config}));
});
test('Reading bank and frozen original full-form source remain unchanged from the release baseline',()=>{
 const previous=JSON.parse(execFileSync('git',['show','e23943f:exam/bank.json'],{encoding:'utf8',maxBuffer:15e6})).items;assert.deepEqual(all.filter(x=>!TYPES.includes(x.type)),previous.filter(x=>!TYPES.includes(x.type)));
 const src=fs.readFileSync('assets/index-0Qc6vs45.js','utf8'),old=execFileSync('git',['show','e23943f:assets/index-0Qc6vs45.js'],{encoding:'utf8',maxBuffer:15e6});const pattern=/Dg=JSON\.parse\((['"])(.*?)\1\),(?:READING_ORIGINAL_TAGS=|xi=)/s;assert.equal(src.match(pattern)[2],old.match(pattern)[2]);
});

test('current Listening requires completed audio and a valid answer before advancing; legacy sessions stay compatible',()=>{
 const s=newSession(all,'Listening',29,82),x=s.form.router[0];
 assert.equal(canAdvanceListening(s),false);assert.equal(go(s,1),s);
 s.audio[x.id]='complete';assert.equal(canAdvanceListening(s),false);assert.equal(go(s,1),s);
 const invalid=respond(s,x.id,{choices:{0:9}});assert.equal(canAdvanceListening(invalid),false);
 const ready=respond(s,x.id,{choices:{0:0}});assert.equal(canAdvanceListening(ready),true);assert.equal(go(ready,1).index,1);assert.equal(go(ready,2),ready);
 const legacy=structuredClone(s);delete legacy.form.listeningVersion;assert.equal(canAdvanceListening(legacy),true);
});

test('Listening avoids a dominant shortest/longest-answer cue in each task pool',()=>{
 for(const type of TYPES){const questions=bank.filter(x=>x.type===type).flatMap(x=>x.questions);let shortest=0,longest=0;
  for(const q of questions){const n=q.options[q.answer].length,others=q.options.filter((_,i)=>i!==q.answer).map(x=>x.length);shortest+=Number(others.every(x=>n<x));longest+=Number(others.every(x=>n>x));}
  assert(shortest/questions.length<=.5,type+' shortest-answer cue');assert(longest/questions.length<=.5,type+' longest-answer cue');
 }
});

test('mixed Listening feedback reconciles correct, missed, unanswered and task/skill counts',()=>{
 const sample=TYPES.map(t=>bank.find(x=>x.type===t));let index=0,correct=0,unanswered=0;
 const attempts=sample.map(item=>{const choices={};item.questions.forEach((q,i)=>{const k=index++%3;if(k===0){choices[i]=q.answer;correct++;}else if(k===1)choices[i]=(q.answer+1)%4;else unanswered++;});return {item,results:grade(item,{choices})};});
 const f=feedback(attempts),sum=group=>Object.values(group).reduce((n,x)=>n+x.total,0),right=group=>Object.values(group).reduce((n,x)=>n+x.correct,0);
 assert.equal(sum(f.tasks),9);assert.equal(sum(f.skills),9);assert.equal(right(f.tasks),correct);assert.equal(right(f.skills),correct);assert.equal(f.unanswered,unanswered);assert(f.focus.every(x=>x.missed>0&&x.missed<=x.total));
});

test('all pre-existing WAV and pilot MP3 bytes remain unchanged',()=>{
 const paths=execFileSync('git',['ls-tree','-r','--name-only','e23943f','--','audio'],{encoding:'utf8'}).trim().split('\n').filter(p=>/\.(wav|mp3)$/.test(p));assert.equal(paths.filter(p=>p.endsWith('.wav')).length,38);
 for(const path of paths)assert(fs.readFileSync(path).equals(execFileSync('git',['show','e23943f:'+path],{maxBuffer:15e6})),path+' changed');
});
