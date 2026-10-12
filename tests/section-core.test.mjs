import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {makeForm,count,screens,newSession,moduleItems,go,respond,moveModule,report,budgets,routeFor,estimatedBand,remaining} from '../exam/core.js';
const bank=JSON.parse(fs.readFileSync('exam/bank.json','utf8')).items;
const solution=x=>x.type==='complete-words'?{blanks:Object.fromEntries(x.pieces.filter(p=>typeof p==='object').map((p,i)=>[i,p.answer]))}:{choices:Object.fromEntries(x.questions.map((q,i)=>[i,q.answer]))};
test('100 forms for both sections match the blueprint totals and never repeat IDs',()=>{
 for(const section of ['Reading','Listening'])for(let seed=1;seed<=100;seed++){
  const f=makeForm(bank,section,seed),total=xs=>xs.reduce((n,x)=>n+count(x),0);
  assert.equal(total(f.router),section==='Reading'?35:32);assert.equal(total(f.upper),15);assert.equal(total(f.lower),15);
  const ids=[...f.router,...f.upper,...f.lower].map(x=>x.id);assert.equal(new Set(ids).size,ids.length);
  assert(f.upper.some(x=>x.type===(section==='Reading'?'academic-passage':'academic-talk')));
  assert(!f.lower.some(x=>x.type===(section==='Reading'?'academic-passage':'academic-talk')));
  if(section==='Listening')for(const route of ['upper','lower']){const items=[...f.router,...f[route]],n=t=>items.filter(x=>x.type===t).reduce((n,x)=>n+count(x),0);assert(n('choose-response')>=15&&n('choose-response')<=19);assert.equal(n('conversation'),10);assert(n('announcement')>=6&&n('announcement')<=10);assert(n('academic-talk')>=8&&n('academic-talk')<=16);}
 }
 assert.deepEqual(makeForm(bank,'Reading',1),makeForm(bank,'Reading',1));assert.notDeepEqual(makeForm(bank,'Reading',1),makeForm(bank,'Reading',2));
});
test('reading navigation is confined to current module; words are individually graded',()=>{
 let s=newSession(bank,'Reading',25,1);const first=s.form.router[0];s=respond(s,first.id,solution(first));assert.equal(s.responses[first.id].blanks[0],solution(first).blanks[0]);s=go(s,1);s=go(s,0);assert.equal(s.index,0);
 s.responses=Object.fromEntries(s.form.router.map(x=>[x.id,solution(x)]));s=moveModule(s);assert.equal(s.route,'upper');assert.equal(s.module,2);assert.equal(s.index,0);assert.equal(go(s,-1),s);assert(!moduleItems(s).some(x=>x.id===first.id));assert.equal(respond(s,first.id,{}),s);
 s.transition=false;s.responses={...s.responses,...Object.fromEntries(moduleItems(s).map(x=>[x.id,solution(x)]))};const r=report(s);assert.deepEqual(r.stats,{correct:50,total:50});assert.equal(r.estimate,6);
});
test('listening only advances one question after complete playback; locks previous answers',()=>{
 let s=newSession(bank,'Listening',29,2),list=screens(moduleItems(s),'Listening'),item=list[0].item;
 assert.equal(go(s,1),s);assert.equal(respond(s,item.id,solution(item)),s);s.audio[item.id]='complete';s=respond(s,item.id,solution(item));s=go(s,1);assert.equal(s.index,1);assert.equal(go(s,0),s);assert.equal(go(s,3),s);assert.equal(respond(s,item.id,{}),s);
 const conv=list.findIndex(x=>x.item.type==='conversation');assert.equal(list[conv].item.id,list[conv+1].item.id);assert.deepEqual(list[conv].indices,[0]);assert.deepEqual(list[conv+1].indices,[1]);
});
test('module timers scale, discard unused time and keep running through reload',()=>{
 assert.deepEqual(budgets('Reading',25),{first:1050,upper:450,lower:450});assert.deepEqual(budgets('Reading',30),{first:1260,upper:540,lower:540});assert.deepEqual(budgets('Listening',29),{first:1080,upper:660,lower:420});
 const s=newSession(bank,'Listening',29,2,1000);assert.equal(remaining(JSON.parse(JSON.stringify(s)),11000),1070);const second=moveModule(s,10000,true);assert.equal(second.route,'lower');assert.equal(second.deadline,430000);assert.deepEqual(second.expired,[1]);assert.equal(second.transition,true);assert.equal(remaining(second,500000),0);
 assert.throws(()=>newSession(bank,'Reading',NaN));assert.throws(()=>newSession(bank,'Reading',1));
});
test('practice routing threshold and half bands are explicit; incomplete attempts get no estimate',()=>{
 assert.equal(routeFor({correct:7,total:10}),'upper');assert.equal(routeFor({correct:6,total:10}),'lower');assert.equal(estimatedBand({correct:0,total:50}),1);assert.equal(estimatedBand({correct:40,total:50}),5);assert.equal(estimatedBand({correct:35,total:50}),4.5);
 const s=newSession(bank,'Reading',25,3),r=report(s,'abandoned');assert.equal(r.estimate,null);assert.equal(r.stats.total,35);
});
