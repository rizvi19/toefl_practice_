import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import * as core from '../simulator/core.js';import {evaluationText} from '../simulator/evaluation.js';
const catalog=JSON.parse(fs.readFileSync('simulator/last-day/index.json')),forms=catalog.map(x=>JSON.parse(fs.readFileSync('simulator/'+x.path.slice(2))));
const words=t=>(t.match(/[\p{L}\p{N}]+(?:['’][\p{L}]+)*/gu)||[]).length;
test('five original full forms have 50/47/12/11 items and all task types with distinct material',()=>{
 assert.equal(forms.length,5);const ids=new Set(),sources=new Set();
 for(const f of forms){assert.equal(f.adaptive,false);assert.equal(f.stages.length,9);assert.equal(f.audioLeadInSeconds,3);assert.equal(f.repeatLeadInSeconds,3);
  for(const [section,expected] of [['Reading',50],['Listening',47],['Writing',12],['Speaking',11]])assert.equal(core.count(f.stages.filter(s=>s.section===section).flatMap(s=>s.items)),expected,f.id+' '+section);
  const sourceIds=new Set();for(const q of f.stages.flatMap(s=>s.items)){assert(!ids.has(q.id));ids.add(q.id);if(q.type==='choice'){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(Number.isInteger(q.answer));assert(q.explanation.length>20);assert(core.grade(q,q.answer)[0].correct);}
   if(q.type==='cloze'){const gaps=q.pieces.filter(p=>typeof p==='object');assert.equal(gaps.length,10);for(const p of gaps)assert(/^[a-z]+$/i.test(p.answer),'Only letters belong in a cloze gap');const text=q.pieces.map(p=>typeof p==='string'?p:p.pre+p.answer).join('');assert(words(text)>=70&&words(text)<=100);assert(!sources.has(text));sources.add(text);}
   if(q.passage&&!sourceIds.has(q.stimulusId)){const wc=words(q.passage);assert(wc>=(q.task==='academic-passage'?185:15)&&wc<=(q.task==='academic-passage'?225:150),q.id+' '+wc);assert(!sources.has(q.passage));sources.add(q.passage);sourceIds.add(q.stimulusId);}
   if(q.type==='sentence'){assert(q.chunks.length>=6&&q.chunks.length<=9);assert.equal(new Set(q.correct).size,q.correct.length);assert(core.grade(q,q.correct)[0].correct);assert(!core.grade(q,Array(q.correct.length).fill(null))[0].correct);for(const alt of q.alternatives||[])assert(core.grade(q,alt)[0].correct);}
  }
  const stimuli=new Map(f.stages.flatMap(s=>s.items).filter(q=>q.stimulus).map(q=>[q.stimulus.id,q.stimulus]));assert.equal(stimuli.size,40);
  for(const a of stimuli.values()){assert(!sources.has(a.script),a.id);sources.add(a.script);const wc=words(a.script.replace(/^(Woman|Man):\s*/gm,''));if(a.kind==='conversation')assert(wc>=35&&wc<=100);if(a.kind==='announcement')assert(wc>=40&&wc<=85);if(a.kind==='academic-talk')assert(wc>=175&&wc<=250);assert(a.preparedPath.endsWith(a.id+'.mp3'));}
 }
});
test('Listening and Repeat lead-ins are untimed, enforced before playback, and not repeated for grouped questions',()=>{
 const f=forms[0],s=core.createAttempt(f,{mode:'practice',scope:'Listening'});s.audioReady={};s.status='directions';core.beginStage(f,s,1000);core.startIntroducedTask(s,1000);assert.equal(s.deadline,null);assert(core.beginLeadIn(f,s,1000));assert.equal(core.leadInRemaining(s,2000),2);assert.equal(s.deadline,null);assert.equal(core.audioStarted(f,s,3999),false);assert(core.audioStarted(f,s,4000));assert.equal(s.deadline,24000);core.audioEnded(f,s,7000);assert.equal(core.secondsLeft(s,7000),17);
 s.index=12;core.enterQuestion(f,s,10000);core.startIntroducedTask(s,10000);core.beginLeadIn(f,s,10000);core.audioStarted(f,s,13000);assert.equal(s.deadline,null);core.audioEnded(f,s,45000);assert.equal(s.deadline,65000);core.next(f,s,'next',46000);assert.equal(s.phase,'answer');assert.equal(core.beginLeadIn(f,s,46000),false);assert.equal(s.deadline,66000);
 const r=core.createAttempt(f,{mode:'practice',scope:'repeat'});r.status='directions';r.audioReady={};core.beginStage(f,r,1000);core.beginLeadIn(f,r,1000);assert.equal(r.deadline,null);core.audioStarted(f,r,4000);core.audioEnded(f,r,7000);assert.equal(r.phase,'beep');assert.equal(r.deadline,null);core.recordingStarted(f,r,7100);assert.equal(r.deadline,15100);
});
test('reload during a lead-in restarts the pause without spending response time',()=>{
 const f=forms[0],s=core.createAttempt(f,{mode:'practice',scope:'repeat'});s.status='directions';s.audioReady={};core.beginStage(f,s,1000);core.startIntroducedTask(s,1000);core.beginLeadIn(f,s,1000);core.recover(f,s,2000);assert.equal(s.phase,'await-audio');assert.equal(s.deadline,null);assert.equal(s.leadInUntil,undefined);assert(core.beginLeadIn(f,s,5000));assert.equal(s.leadInUntil,8000);
});
test('evaluation export includes the new original questions, sources, keys and transcription limits',()=>{
 const f=forms[0],s=core.createAttempt(f);const packet=evaluationText(f,s);assert(packet.includes(f.title));assert(packet.includes(f.stages[0].items[2].passage));assert(packet.includes(f.stages[8].items[0].question));assert(packet.includes('KEY / MARK'));assert(packet.includes('original audio'));assert(packet.includes('not an official'));
});
test('all 200 released clips match their final script and file hash',()=>{
 const path='simulator/last-day/audio-manifest.json';assert(fs.existsSync(path));const m=JSON.parse(fs.readFileSync(path));for(const f of forms)for(const a of new Map(f.stages.flatMap(s=>s.items).filter(q=>q.stimulus).map(q=>[q.stimulus.id,q.stimulus])).values()){const r=m.recordings[a.id];assert(r,a.id+' is missing');assert.equal(r.scriptHash,crypto.createHash('sha256').update(a.script).digest('hex'),a.id);const bytes=fs.readFileSync('simulator/'+r.path.slice(2));assert.equal(bytes.length,r.bytes);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),r.audioHash);assert(r.duration>0&&r.rms>.001);}
});

test('subsection directions preserve exact Reading budget, including navigation and reload',()=>{
 const f=forms[0],s=core.createAttempt(f,{mode:'practice',scope:'Reading'});s.audioReady={};s.status='directions';core.beginStage(f,s,1000);assert.equal(s.phase,'task-directions');assert.equal(s.deadline,null);assert.equal(s.pausedTaskMilliseconds,1140000);core.recover(f,s,90000);core.startIntroducedTask(s,100000);assert.equal(s.deadline,1240000);s.index=1;core.next(f,s,'next',110000);assert.equal(s.phase,'task-directions');assert.equal(s.pausedTaskMilliseconds,1130000);core.startIntroducedTask(s,200000);assert.equal(s.deadline,1330000);core.go(f,s,3,210000);assert.equal(s.phase,'question');core.go(f,s,4,220000);assert.equal(s.phase,'task-directions');assert.equal(s.pausedTaskMilliseconds,1110000);
});

test('the complete scoring packet contains every question, all four guide rubrics and the 1–6 method',()=>{
 const f=forms[0],s=core.createAttempt(f),packet=evaluationText(f,s);for(const q of core.selectedQuestions(f,s))assert(packet.includes(q.id),q.id);for(const text of ['p. 208','p. 217','p. 232','p. 240','HOLISTIC TASK RUBRIC, 0–5','EACH RESPONSE 0–5','5.25','5.125','0.5','NOT ASSESSABLE','REQUIRED FEEDBACK FORMAT','PRACTICE ESTIMATE','speaking-rubrics.pdf','writing-rubrics.pdf'])assert(packet.includes(text),text);assert(packet.includes('Do NOT multiply a task score by 1.2'));assert(packet.includes('confidence'));
});
