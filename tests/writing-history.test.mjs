import test from 'node:test';
import assert from 'node:assert/strict';
import {practicedQuestions,filterPracticed} from '../writing/practice-history.js';
import {advanced} from '../writing/advanced.js';
test('history includes every seen item, skipped items and repeated attempts without duplicating questions',()=>{
 const [q,a,b]=advanced,seen={[q.id]:{first:1},[a.id]:{first:2},[b.id]:{first:3}};
 const results=[{q,answer:[],correct:false,checkedAt:4},{q,answer:q.chunks.map((_,i)=>i),correct:true,checkedAt:5}];
 const entries=practicedQuestions(advanced,seen,results);assert.equal(entries.length,3);assert.equal(entries[0].q.id,q.id);assert.equal(entries[0].attempts,2);assert.equal(entries[0].status,'correct');assert.equal(entries[1].status,'unchecked');assert.equal(entries[1].q.id,b.id);assert.equal(entries[0].latest.checkedAt,5);
 assert.equal(filterPracticed(entries,{status:'unchecked'}).length,2);assert.equal(filterPracticed(entries,{search:'embedded WH'}).length,3);assert.equal(filterPracticed(entries,{search:'1',status:'correct'}).length,1);assert.equal(filterPracticed(entries,{status:'incorrect'}).length,0);
 assert.equal(practicedQuestions(advanced,{}).length,0);assert.equal(practicedQuestions(advanced,Object.fromEntries(advanced.map(q=>[q.id,{first:1}]))).length,500);
});
test('finished timed answers join focused history; in-progress timed answers stay hidden',()=>{
 const q=advanced[0],seen={[q.id]:{first:1}},timed={form:{sentences:[q,advanced[1]]},responses:{sentence:{[q.id]:q.chunks.map((_,i)=>i)}},timing:{sentence:{finishedAt:10}}};
 let entries=practicedQuestions(advanced,seen,[],[timed]);assert.equal(entries.length,1);assert.equal(entries[0].status,'correct');assert.equal(entries[0].latest.source,'timed');
 entries=practicedQuestions(advanced,seen,[{q,answer:[],correct:false,checkedAt:11}],[timed]);assert.equal(entries[0].status,'incorrect');assert.equal(entries[0].attempts,2);
 delete timed.timing.sentence.finishedAt;assert.equal(practicedQuestions(advanced,seen,[],[timed])[0].status,'unchecked');
});
