import test from 'node:test';
import assert from 'node:assert/strict';
import {sentences} from '../writing/content.js';
import {emails,discussions,formTitles} from '../writing/prompts.js';
import {DEFAULTS,TASKS,chooseForm,createSession,startTask,closeTask,remaining,placeToken,gradeSentence,sentenceText,sentenceScore,wordCount,feedbackPacket} from '../writing/core.js';
const form=i=>({id:i,title:formTitles[i],sentences:sentences[i],email:emails[i],discussion:discussions[i]});
test('12 original complete forms with 120 unique sentence keys and developed writing prompts',()=>{
 assert.equal(sentences.length,12);assert.equal(emails.length,12);assert.equal(discussions.length,12);
 const ids=new Set(),answers=new Set(),contexts=new Set();
 for(const set of sentences){assert.equal(set.length,10);for(const q of set){assert(!ids.has(q.id));ids.add(q.id);assert(q.chunks.length>=3&&q.chunks.length<=7);assert.equal(new Set([...q.chunks,...q.extra]).size,q.chunks.length+q.extra.length);assert(q.context.length>25);assert(q.explanation.length>70);assert(['.','?'].includes(q.suffix));const answer=sentenceText(q,q.chunks.map((_,i)=>i));assert(!answers.has(answer),answer);answers.add(answer);assert(!contexts.has(q.context),q.context);contexts.add(q.context);}}
 for(const p of emails){assert.equal(p.bullets.length,3);assert(wordCount(p.scenario)>=50);assert(p.to&&p.subject&&p.review);}
 for(const p of discussions){assert(wordCount(p.question)>=50);assert.equal(p.students.length,2);for(const s of p.students)assert(wordCount(s.text)>=30);assert(p.course&&p.professor&&p.review);}
});
test('all keys earn exactly one; blanks, reordered chunks and unused distractors earn zero',()=>{
 for(const q of sentences.flat()){
  const correct=q.chunks.map((_,i)=>i);assert.equal(gradeSentence(q,correct),1);assert.equal(gradeSentence(q,[]),0);assert.equal(gradeSentence(q,correct.map(()=>null)),0);assert.equal(gradeSentence(q,[...correct].reverse()),0);
  if(q.extra.length)assert.equal(gradeSentence(q,[q.chunks.length,...correct.slice(1)]),0);
 }
 const s=createSession(form(0),'full',DEFAULTS,1000);for(const q of s.form.sentences)s.responses.sentence[q.id]=q.chunks.map((_,i)=>i);assert.equal(sentenceScore(s),10);
});
test('placement prevents duplication, overflow, invalid tokens and changes at expiry',()=>{
 const s=createSession(form(0),'full',DEFAULTS,1000),q=s.form.sentences[0];assert(placeToken(s,q.id,0,1001));assert(!placeToken(s,q.id,0,1002));assert(!placeToken(s,q.id,-1,1002));assert(!placeToken(s,q.id,999,1002));
 for(let i=1;i<q.chunks.length;i++)assert(placeToken(s,q.id,i,1003));assert.equal(gradeSentence(q,s.responses.sentence[q.id]),1);assert(!placeToken(s,q.id,q.chunks.length,1004));assert(!placeToken(s,s.form.sentences[1].id,0,s.deadline));
});
test('independent task clocks, refresh persistence, locking, timeout and untimed transitions',()=>{
 let s=createSession(form(0),'full',DEFAULTS,1000);assert.equal(remaining(s,1000),300);assert.equal(remaining(s,s.deadline),0);s=JSON.parse(JSON.stringify(s));assert.equal(s.deadline,301000);
 closeTask(s,'submitted',s.deadline+9999);assert.equal(s.timing.sentence.reason,'timeout');assert.equal(s.timing.sentence.usedSeconds,300);assert.equal(s.status,'ready');assert.equal(s.deadline,null);assert(!placeToken(s,s.form.sentences[0].id,0,999999));
 startTask(s,999999);assert.equal(remaining(s,999999),420);s.responses.email='A saved email.';closeTask(s,'submitted',1009999);assert.equal(s.timing.email.usedSeconds,10);assert.equal(s.status,'ready');assert.equal(s.responses.email,'A saved email.');
 startTask(s,2000000);assert.equal(remaining(s,2000000),600);closeTask(s,'submitted',2005000);assert.equal(s.status,'complete');assert.equal(s.reason,'timeout');assert.equal(s.timing.academic.usedSeconds,5);
});
test('individual practice, early ending, frozen prompts and input validation',()=>{
 for(const t of TASKS){const f=form(1),s=createSession(f,t,DEFAULTS,1000);assert.deepEqual(s.tasks,[t]);closeTask(s,'abandoned',2000);assert.equal(s.status,'complete');assert.equal(s.reason,'abandoned');s.form.title='changed';assert.notEqual(f.title,s.form.title);}
 assert.throws(()=>createSession(form(0),'bad'));assert.throws(()=>createSession(form(0),'full',{...DEFAULTS,email:0}));
});
test('fresh selection uses every form once, then lowest count and oldest exposure',()=>{
 const ledger={},seen=new Set();for(let t=1;t<=12;t++){const i=chooseForm(12,ledger,()=>.5);assert(!seen.has(i));seen.add(i);ledger[i]={count:1,last:t};}assert.equal(chooseForm(12,ledger),[...seen][0]);ledger[[...seen][0]].count=2;assert.equal(chooseForm(12,ledger),[...seen][1]);
});
test('separate feedback packets include full prompts, own response, timing and task-specific rubric advice',()=>{
 const s=createSession(form(0),'full',DEFAULTS,1000);s.responses.email='EMAIL UNIQUE RESPONSE';s.responses.academic='DISCUSSION UNIQUE RESPONSE';
 const e=feedbackPacket(s,'email',2000),a=feedbackPacket(s,'academic',2000);
 assert(e.includes(s.form.email.scenario));for(const p of s.form.email.bullets)assert(e.includes(p));assert(e.includes('EMAIL UNIQUE RESPONSE'));assert(!e.includes('DISCUSSION UNIQUE RESPONSE'));assert(e.includes('7:00'));assert(e.includes('Do not invent a minimum word requirement'));
 assert(a.includes(s.form.discussion.question));for(const p of s.form.discussion.students)assert(a.includes(p.text));assert(a.includes('DISCUSSION UNIQUE RESPONSE'));assert(!a.includes('EMAIL UNIQUE RESPONSE'));assert(a.includes('10:00'));assert(a.includes('0–5'));assert(a.includes('not started'));
 assert.equal(wordCount("It's a well-planned test, with 120 items."),7);assert.equal(wordCount('  \n'),0);
});
