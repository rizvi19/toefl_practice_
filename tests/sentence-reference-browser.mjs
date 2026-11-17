import {dropSentenceTile} from './sentence-test-actions.mjs';
import {chromium} from 'playwright';import assert from 'node:assert/strict';
const base=process.env.TEST_URL||'http://127.0.0.1:4177/toefl_practice_/',key='toefl-sentence-practice-v2';
const browser=await chromium.launch({headless:true,channel:process.platform==='win32'?'msedge':'chrome'}),page=await browser.newPage({reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto(base+'sentence-practice.html');await page.locator('#collection').selectOption('tst');await page.getByRole('button',{name:'Start next unseen question →',exact:true}).click();
 const ids=new Set();
 for(let n=0;n<30;n++){
  const c=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)).current,key);assert(c.q.id.startsWith('tst-2026-'));assert(!ids.has(c.q.id));ids.add(c.q.id);
  const order=c.q.chunks.map((_,i)=>i);
  if(c.q.sourceNumber===10){const twins=order.filter(i=>c.q.chunks[i]==='she');[order[twins[0]],order[twins[1]]]=[order[twins[1]],order[twins[0]]];}
  for(const token of order)await dropSentenceTile(page,page.locator(`[data-sentence-bank] [data-sentence-token="${token}"]`));
  await page.getByRole('button',{name:'Check sentence',exact:true}).click();assert.equal(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)).current.correct,key),true,c.q.id);
  assert((await page.locator('.explanation').innerText()).includes('TST Prep'));for(const note of c.q.sourceNotes)assert((await page.locator('.explanation').innerText()).includes(note));
  await page.getByRole('button',{name:'Next unseen question →',exact:true}).click();
 }
 assert.equal(ids.size,30);assert((await page.locator('.empty').innerText()).includes('exhausted'));await page.reload();assert((await page.locator('.empty').innerText()).includes('exhausted'));
 const context=await browser.newContext(),timed=await context.newPage();timed.on('pageerror',e=>errors.push(e.message));await timed.goto(base+'writing.html');await timed.locator('#mode').selectOption('sentence');await timed.locator('#sentence-pool').selectOption('tst');await timed.getByRole('button',{name:'Start Writing Test →',exact:true}).click();const s=await timed.evaluate(()=>JSON.parse(localStorage.getItem('toefl-writing-2026-v1')).session);assert(s.form.sentences.every(q=>q.bankVersion===3));assert.equal(s.budgets.sentence,360);assert.deepEqual(errors,[]);console.log('PASS all 30 PDF exercises, identical tile acceptance, correction/source notes, no repeats, reload exhaustion and a six-minute timed TST block');
}finally{await browser.close();}
