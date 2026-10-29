import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {budget,itemCount,answered,createSession,startStage,remaining,advanceStage,canMove,validateSession} from '../chapter6/core.js';
const bank=JSON.parse(fs.readFileSync(new URL('../chapter6/bank.json',import.meta.url)));
test('complete fixed form has 120 items and the source media mapping',()=>{
 assert.deepEqual(bank.stages.map(s=>itemCount(s.items)),[35,15,32,15,10,1,1,7,4]);
 const ids=bank.stages.flatMap(s=>s.items.map(q=>q.id));assert.equal(new Set(ids).size,ids.length);
 const media=JSON.parse(fs.readFileSync(new URL('../chapter6/media-manifest.json',import.meta.url)));
 assert.equal(media.length,46);for(const m of media)assert.equal(fs.statSync(new URL('../chapter6/media/'+m.file,import.meta.url)).size,m.bytes);
 for(const s of bank.stages)for(const q of s.items){if(q.media)assert(media.some(m=>m.file===q.media));if(q.options)assert.equal(q.options.length,4);if(q.type==='cloze')assert.equal(q.pieces.filter(p=>typeof p==='object').length,10);}
 assert.deepEqual(bank.stages[2].items.slice(12,14).map(q=>q.media),['track-65.mp3','track-65.mp3']);
 assert.deepEqual(bank.stages[7].items.map(q=>q.responseSeconds),[8,8,10,10,10,12,12]);
 assert(bank.stages[8].items.every(q=>q.responseSeconds===45));
});
test('separate official and chapter allocations, fixed deadlines and module locks',()=>{
 const s=createSession('Candidate','official');startStage(s,bank,1000);assert.equal(s.deadline,1261000);assert.equal(remaining(s,61000),1200);assert.equal(remaining(s,2000000),0);
 advanceStage(s,bank,'timeout',2000000);assert.equal(s.stage,1);assert.equal(s.ready,true);assert.equal(s.deadline,null);assert.equal(s.completed[0].reason,'timeout');
 assert.deepEqual(bank.stages.slice(0,4).map(st=>budget(st,'official')),[1260,540,1080,660]);
 assert.deepEqual(bank.stages.slice(0,4).map(st=>budget(st,'chapter')),[1200,540,1080,540]);
 assert(validateSession(s,bank));assert(!validateSession({...s,index:9999},bank));
});
test('a first-option answer counts and listening is gated by completed playback',()=>{
 const q=bank.stages[2].items[0],s=createSession('Candidate','official');assert.equal(answered(q,0),1);assert(!canMove(q,s));s.played[q.media]='playing';assert(!canMove(q,s));s.played[q.media]='complete';assert(canMove(q,s));assert.equal(answered(bank.stages[0].items[0],{0:'ieve',1:'line'}),2);
});
