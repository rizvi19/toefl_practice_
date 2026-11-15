import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {KEY as WRITING} from '../writing/core.js';
import {KEY as CHAPTER,createSession} from '../chapter6/core.js';
import * as full from '../simulator/core.js';
const base=process.env.TEST_URL||'http://127.0.0.1:4177/toefl_practice_/',PRACTICE='toefl-sentence-practice-v2';
const browser=await chromium.launch({headless:true,channel:process.platform==='win32'?'msedge':'chrome'});
const errors=[],failed=[];
const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();
page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
const slot=i=>page.locator(`[data-sentence-slot="${i}"]`),pool=i=>page.locator(`[data-sentence-bank] [data-sentence-token="${i}"]`);
const read=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)).current,PRACTICE);
async function settled(){await page.locator('.sentence-drag-ghost').waitFor({state:'detached'});await page.waitForTimeout(30);}
async function drag(source,destination,{cancel=false,outside=false}={}){
  await source.scrollIntoViewIfNeeded();const a=await source.boundingBox();await destination.scrollIntoViewIfNeeded();const b=await destination.boundingBox();
  // Both are in view on desktop; touch coverage below also verifies small screens.
  const refreshed=await source.boundingBox();assert(a&&b&&refreshed);const x=refreshed.x+refreshed.width/2,y=refreshed.y+refreshed.height/2;
  await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+12,y-10,{steps:3});await page.locator('.sentence-drag-ghost').waitFor();
  await page.mouse.move(outside?10:b.x+b.width/2,outside?10:b.y+b.height/2,{steps:12});
  if(!outside&&!cancel)await page.locator('.sentence-drop-target').waitFor();
  if(cancel)await page.keyboard.press('Escape');
  await page.mouse.up();await settled();
}
async function expectAnswer(answer){await page.waitForFunction(({k,a})=>JSON.stringify(JSON.parse(localStorage.getItem(k)).current.answer)===JSON.stringify(a),{k:PRACTICE,a:answer});}
fs.mkdirSync('tests/screenshots',{recursive:true});
try{
  await page.goto(base+'sentence-practice.html');await page.getByRole('button',{name:'Start next unseen question →',exact:true}).click();let c=await read(),a=Array(c.q.chunks.length).fill(null);
  await drag(pool(0),slot(2));a[2]=0;await expectAnswer(a);
  await drag(pool(1),slot(0));a[0]=1;await expectAnswer(a);
  await drag(slot(2),slot(0));[a[0],a[2]]=[a[2],a[0]];await expectAnswer(a);
  await drag(slot(0),page.locator('[data-sentence-bank]'));a[0]=null;await expectAnswer(a);assert(await pool(0).isEnabled());
  await drag(pool(2),slot(1),{outside:true});await expectAnswer(a);
  await drag(pool(2),slot(1),{cancel:true});await expectAnswer(a);assert.equal(await page.locator('.sentence-drag-ghost').count(),0);
  await page.waitForTimeout(420);await slot(0).click();await pool(2).click();a[0]=2;await expectAnswer(a);await settled();
  await slot(0).focus();await page.keyboard.press('Alt+ArrowRight');[a[0],a[1]]=[a[1],a[0]];await expectAnswer(a);await settled();
  await page.reload();await expectAnswer(a);assert.equal(await slot(1).getAttribute('data-sentence-token'),'2');
  await page.getByRole('button',{name:'Clear sentence',exact:true}).click();
  for(let i=0;i<c.q.chunks.length;i++){await pool(i).click();await settled();}
  // A full board still permits replacing a word, including with a distractor.
  const spare=c.q.chunks.length<c.q.chunks.length+c.q.extra.length?c.q.chunks.length:null;
  if(spare!==null){await drag(pool(spare),slot(0));assert.equal((await read()).answer[0],spare);await drag(pool(0),slot(0));}
  await page.getByRole('button',{name:'Check sentence',exact:true}).click();assert((await read()).correct);assert.equal(await page.locator('[data-sentence-token]:not(:disabled)').count(),0);
  console.log('PASS exact-slot drag, swaps, bank return, cancellation, keyboard, reload, replacement, grading and checked-answer lock');

  await page.goto(base+'writing.html');await page.locator('#mode').selectOption('sentence');await page.locator('#sentence-pool').selectOption('original');await page.getByRole('button',{name:'Start Writing Test →',exact:true}).click();
  const deadline=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)).session.deadline,WRITING);
  await drag(pool(0),slot(3));await page.getByRole('button',{name:'Next →',exact:true}).click();await page.getByRole('button',{name:'← Back',exact:true}).click();assert.equal(await slot(3).getAttribute('data-sentence-token'),'0');
  assert.equal(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)).session.deadline,WRITING),deadline);
  await page.evaluate(k=>{const d=JSON.parse(localStorage.getItem(k));d.session.deadline=Date.now()+650;localStorage.setItem(k,JSON.stringify(d));},WRITING);await page.reload();
  await page.waitForTimeout(800);assert.equal(await page.locator('[data-sentence-board]').count(),0);assert.equal(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)).history.at(-1)?.reason,WRITING),'timeout');console.log('PASS timed Writing exact-slot persistence, navigation, unchanged timer and timeout lock');

  const chapter=createSession('Drag QA','official',4);chapter.ready=false;chapter.deadline=Date.now()+360000;
  await page.evaluate(({key,s})=>localStorage.setItem(key,JSON.stringify({session:s,history:[]})),{key:CHAPTER,s:chapter});await page.goto(base+'chapter6.html');await page.getByRole('button',{name:'Resume test',exact:true}).click();await drag(pool(0),slot(3));await page.reload();await page.getByRole('button',{name:'Resume test',exact:true}).click();assert.equal(await slot(3).getAttribute('data-sentence-token'),'0');assert.equal(await slot(0).getAttribute('data-sentence-token'),null);console.log('PASS Book Test slots with gaps survive resume');

  const form=JSON.parse(fs.readFileSync(new URL('../simulator/forms/original-02.json',import.meta.url))),attempt=full.createAttempt(form,{mode:'practice',scope:'Writing',untimed:true});attempt.status='directions';attempt.audioReady={engine:'fixture'};full.beginStage(form,attempt);
  await page.goto(base+'full-tests.html');await page.getByRole('heading',{name:/A complete test/}).waitFor();await page.evaluate(async s=>{const db=await import('./simulator/storage.js');await db.put('attempts',s.id,s);localStorage.setItem('toefl-full-active-v1',s.id);},attempt);await page.reload();await page.getByRole('button',{name:'Resume attempt',exact:true}).click();await drag(pool(0),slot(3));await page.reload();await page.getByRole('button',{name:'Resume attempt',exact:true}).click();assert.equal(await slot(3).getAttribute('data-sentence-token'),'0');await drag(slot(3),slot(0));assert.equal(await slot(0).getAttribute('data-sentence-token'),'0');console.log('PASS full simulator shares exact-slot drag and persisted gaps');

  // Native touch events through Chromium's input protocol, not synthetic DOM events.
  const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'}),mp=await mobile.newPage();mp.on('pageerror',e=>errors.push(e.message));await mp.goto(base+'sentence-practice.html');await mp.getByRole('button',{name:'Start next unseen question →',exact:true}).tap();
  const mobileSource=mp.locator('[data-sentence-bank] [data-sentence-token]').first(),mobileToken=Number(await mobileSource.getAttribute('data-sentence-token')),lastSlot=(await mp.locator('[data-sentence-slot]').count())-1;await mobileSource.scrollIntoViewIfNeeded();const src=await mobileSource.boundingBox(),dst=await mp.locator(`[data-sentence-slot="${lastSlot}"]`).boundingBox();assert(src&&dst&&src.y<844&&dst.y>0);
  const cdp=await mobile.newCDPSession(mp),x=src.x+src.width/2,y=src.y+src.height/2,tx=dst.x+dst.width/2,ty=dst.y+dst.height/2;
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});for(let i=1;i<=12;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+(tx-x)*i/12,y:y+(ty-y)*i/12}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await mp.waitForFunction(({k,i,t})=>JSON.parse(localStorage.getItem(k)).current.answer[i]===t,{k:PRACTICE,i:lastSlot,t:mobileToken});assert(await mp.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await mp.screenshot({path:'tests/screenshots/sentence-drag-mobile.png',fullPage:true});await mobile.close();
  assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);console.log('PASS native touch drag, reduced motion, mobile layout and zero page errors');
}finally{await browser.close();}
