import test from 'node:test';
import assert from 'node:assert/strict';
import {advanced,topics,EXPOSURE_KEY,readExposure,markExposure,eligibleQuestions,selectQuestions,activeWritingIds} from '../writing/advanced.js';
import {sentences} from '../writing/content.js';
import {groups} from '../writing/advanced-source.js';
import {distractors} from '../writing/distractors.js';
import {emails,discussions} from '../writing/prompts.js';
import {KEY,gradeSentence,tileLabel,sentenceText} from '../writing/core.js';
const storage=()=>{const data=new Map();return {getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};};
test('selective item-specific distractors preserve keys and reject wrong substitutions in every slot',()=>{
 const all=[...advanced,...sentences.flat()],ids=new Set(all.map(q=>q.id));
 assert(Object.keys(distractors).every(id=>ids.has(id)),'No orphaned distractor revisions');
 assert.equal(advanced.filter(q=>q.extra.length===1).length,123);
 assert.equal(advanced.filter(q=>q.extra.length===0).length,377);
 assert.equal(sentences.flat().filter(q=>q.extra.length===1).length,17);
 for(const q of all){
  assert(q.extra.length<=1,q.id);
  if(!q.extra.length)continue;
  assert(q.extraExplanation.length>65,q.id);assert(q.extraType,q.id);
  assert(q.explanation.includes(q.extraExplanation),q.id);
  assert.equal(q.extra[0],q.extra[0].toLowerCase(),q.id);
  const key=q.chunks.map((_,i)=>i);
  for(let slot=0;slot<key.length;slot++){const wrong=[...key];wrong[slot]=q.chunks.length;assert.equal(gradeSentence(q,wrong),0,q.id);}
 }
 for(const g of groups)for(const [i,row] of g.rows.entries()){
  const original=row.split('|')[2].split(' / ').join(' ').toLowerCase();
  const revised=advanced.find(q=>q.id===`wa-${g.id}-${String(i+1).padStart(2,'0')}`);
  assert.equal(revised.chunks.join(' ').toLowerCase(),original,revised.id);
 }
});
test('500 unique original questions across 50 complete grammar families, 200 medium and 300 hard',()=>{
 assert.equal(advanced.length,500);assert.equal(topics.length,50);assert.equal(advanced.filter(q=>q.level==='medium').length,200);assert.equal(advanced.filter(q=>q.level==='hard').length,300);
 const ids=new Set(),answers=new Set(),contexts=new Set();
 for(const q of advanced){assert(!ids.has(q.id));ids.add(q.id);assert(!contexts.has(q.context),q.context);contexts.add(q.context);assert(q.chunks.length>=3&&q.chunks.length<=7,q.id);assert.equal(new Set([...q.chunks,...q.extra]).size,q.chunks.length+q.extra.length,q.id);assert(q.suffix.match(/[.?]$/),q.id);assert(q.analysis.length>35,q.id);assert(q.rule.length>90,q.id);assert(q.trap.length>45,q.id);assert(q.explanation.includes(q.analysis));
  const key=q.chunks.map((_,i)=>i),text=sentenceText(q,key).toLowerCase();assert(!answers.has(text),q.id);answers.add(text);assert.equal(gradeSentence(q,key),1);assert.equal(gradeSentence(q,[...key].reverse()),0);assert.equal(gradeSentence(q,Array(key.length).fill(null)),0);if(q.extra.length)assert.equal(gradeSentence(q,[q.chunks.length,...key.slice(1)]),0);
 }
 for(const t of topics)assert.equal(advanced.filter(q=>q.topic===t.id).length,10);
 assert.equal(emails.length,24);assert.equal(discussions.length,24);assert.equal(new Set(emails.map(p=>p.scenario)).size,24);assert.equal(new Set(discussions.map(p=>p.question)).size,24);
});
test('lowercase bank labels for all 620 questions; sentence casing follows placement, not the key',()=>{
 for(const q of [...advanced,...sentences.flat()])for(let i=0;i<q.chunks.length+q.extra.length;i++)assert.equal(tileLabel(q,i),tileLabel(q,i).toLowerCase());
 const q=sentences[0][0];assert.equal(tileLabel(q,0),'can');assert.equal(tileLabel(q,0,0),'Can');assert.equal(tileLabel(q,0,1),'can');assert.equal(tileLabel(q,3,0),'A laptop');assert.equal(tileLabel(q,3),'a laptop');assert.equal(tileLabel(q,1),'i');assert.equal(tileLabel(q,1,2),'I');assert.equal(tileLabel({...q,prefix:'We asked'},0,0),'can');
});
test('unseen selection covers all 500 once, stays in filters and stops at exhaustion',()=>{
 const seen={},used=[];for(let i=0;i<50;i++){const block=selectQuestions({},seen,10,()=>.37);assert.equal(block.length,10);assert.equal(new Set(block.map(q=>q.id)).size,10);assert.equal(new Set(block.map(q=>q.topic)).size,10);for(const q of block){assert(!seen[q.id]);seen[q.id]={first:i};used.push(q.id);}}
 assert.equal(new Set(used).size,500);assert.deepEqual(selectQuestions({},seen,10),[]);assert.equal(eligibleQuestions({level:'hard'}).length,300);assert.equal(eligibleQuestions({topic:'mixed-conditional',level:'medium'}).length,4);
 const selected=selectQuestions({level:'hard',topic:'mixed-conditional'},{},10);assert.equal(selected.length,6);assert(selected.every(q=>q.topic==='mixed-conditional'&&q.level==='hard'));
});
test('encounter history persists without incrementing on revisits and reserves active timed items',()=>{
 const s=storage();assert.deepEqual(readExposure(s),{});markExposure(advanced[0].id,s,100);markExposure(advanced[0].id,s,200);assert.equal(readExposure(s)[advanced[0].id].first,100);assert.equal(eligibleQuestions({},readExposure(s)).length,499);
 s.setItem(KEY,JSON.stringify({session:{tasks:['sentence'],stage:0,form:{sentences:advanced.slice(0,10)}}}));const reserved=activeWritingIds(s);assert.equal(reserved.length,10);assert.equal(eligibleQuestions({exclude:reserved},readExposure(s)).length,490);
 s.setItem(EXPOSURE_KEY,'not-json');assert.throws(()=>readExposure(s));s.setItem(EXPOSURE_KEY,'[]');assert.throws(()=>readExposure(s));s.setItem(EXPOSURE_KEY,'{"a":0}');assert.throws(()=>readExposure(s));
});
test('no exact duplication or close lexical duplication in the 500-question expansion',()=>{
 const words=advanced.map(q=>new Set(sentenceText(q,q.chunks.map((_,i)=>i)).toLowerCase().match(/[a-z]+/g)));
 for(let i=0;i<words.length;i++)for(let j=i+1;j<words.length;j++){const a=words[i],b=words[j],overlap=[...a].filter(t=>b.has(t)).length;assert(overlap/(a.size+b.size-overlap)<=.7,`${advanced[i].id} / ${advanced[j].id}`);}
});
