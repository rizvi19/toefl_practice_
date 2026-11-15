import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {moveSentenceTile} from '../assets/sentence-drag.js';
import * as chapter from '../chapter6/core.js';
import * as full from '../simulator/core.js';
import {responseText} from '../simulator/evaluation.js';
import {referenceSentences} from '../writing/reference.js';
import {gradeSentence,sentenceText} from '../writing/core.js';

test('all 30 supplied PDF tasks reconstruct their printed keys with fixed words and documented corrections',()=>{
  const normalize=s=>s.toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
  assert.equal(referenceSentences.length,30);
  for(const q of referenceSentences){
    const key=q.chunks.map((_,i)=>i);
    assert.equal(normalize(sentenceText(q,key)),normalize(q.sourceAnswer),q.id);
    assert.equal(gradeSentence(q,key),1,q.id);assert.equal(gradeSentence(q,key.map(()=>null)),0,q.id);
    assert(q.sourcePage>=3&&q.sourcePage<=13);assert(q.sourceKeyPage>=25&&q.sourceKeyPage<=26);
  }
  assert.deepEqual(referenceSentences.filter(q=>q.sourceNotes.length).map(q=>q.sourceNumber),[5,10]);
  const q=referenceSentences[9],key=q.chunks.map((_,i)=>i),twins=key.filter(i=>q.chunks[i]==='she');assert.equal(twins.length,2);[key[twins[0]],key[twins[1]]]=[key[twins[1]],key[twins[0]]];assert.equal(gradeSentence(q,key),1,'Identical supplied words can exchange places');
});

test('exact blank placement, swapping, replacement and return preserve token identity and holes',()=>{
  const original=[];
  const a=moveSentenceTile(original,4,5,2,3);assert.deepEqual(a,[null,null,null,2]);assert.deepEqual(original,[]);
  const b=moveSentenceTile(a,4,5,1,0);assert.deepEqual(b,[1,null,null,2]);
  const c=moveSentenceTile(b,4,5,2,0);assert.deepEqual(c,[2,null,null,1]);
  const d=moveSentenceTile(c,4,5,4,0);assert.deepEqual(d,[4,null,null,1]);
  assert.deepEqual(moveSentenceTile(d,4,5,4,'bank'),[null,null,null,1]);
  for(const [token,to] of [[-1,0],[5,0],[0,4],[0,-1],[0,'bank']])assert.equal(moveSentenceTile([],4,5,token,to),null);
  assert.equal(moveSentenceTile([1,1],4,5,2,0),null);
});
test('partial book answers survive validation, keep blanks in exports, and never earn full credit',()=>{
  const bank=JSON.parse(fs.readFileSync(new URL('../chapter6/bank.json',import.meta.url))),s=chapter.createSession('QA','official');
  const q=bank.stages.flatMap(s=>s.items).find(q=>q.type==='sentence');
  s.answers[q.id]=[null,0,...Array(q.suggested.length-2).fill(null)];assert(chapter.validateSession(s,bank));assert.equal(chapter.answered(q,s.answers[q.id]),1);assert.equal(chapter.answered(q,Array(q.suggested.length).fill(null)),0);
  s.answers[q.id]=[0,0];assert.equal(chapter.validateSession(s,bank),false);
  const form=JSON.parse(fs.readFileSync(new URL('../simulator/forms/original-02.json',import.meta.url))),attempt=full.createAttempt(form,{mode:'practice',scope:'Writing'}),item=full.current(form,attempt);
  const answer=Array(item.correct.length).fill(null);answer[2]=item.correct[2];attempt.answers[item.id]=answer;
  assert(full.validateAttempt(attempt,form));assert.equal(full.grade(item,answer)[0].correct,false);assert(responseText(item,answer).includes('_____'));assert(!responseText(item,answer).includes('undefined'));
  assert.equal(full.answered(item,Array(item.correct.length).fill(null)),0);
});
