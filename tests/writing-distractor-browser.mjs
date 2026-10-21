import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {advanced,EXPOSURE_KEY} from '../writing/advanced.js';
import {KEY as WRITING,createSession} from '../writing/core.js';
import {emails,discussions} from '../writing/prompts.js';
const KEY='toefl-sentence-practice-v2',base=process.env.TEST_URL||'http://127.0.0.1:4177/toefl_practice_/';
const browser=await chromium.launch({headless:true,channel:process.platform==='win32'?'msedge':undefined});
const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[],failed=[];
page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
const button=name=>page.getByRole('button',{name,exact:true}),token=i=>page.locator(`[data-action="place"][data-token="${i}"]`);
const state=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);
const url=new URL('sentence-practice.html',base).href,q=advanced.find(q=>q.id==='wa-embedded-wh-05');
fs.mkdirSync('tests/screenshots',{recursive:true});
try{
 await page.goto(url);
 // A prior saved attempt keeps its original segmentation and answer indices.
 const old={...q,chunks:['why','the proposal','that we submitted','has not','been reviewed'],extra:[],explanation:'Earlier saved explanation'};
 const current={q:old,answer:[0,null,null,null,null],order:[4,0,2,1,3],checked:false,started:Date.now()};
 await page.evaluate(({key,exposure,q,current})=>{
  localStorage.setItem(key,JSON.stringify({version:2,current,options:{level:'mixed',topic:'all'},results:[]}));
  localStorage.setItem(exposure,JSON.stringify({[q.id]:{first:1000}}));
 },{key:KEY,exposure:EXPOSURE_KEY,q,current});await page.reload();
 assert.equal(await page.locator('.sentence-slot').count(),5);assert.deepEqual((await state()).current,current);
 for(let i=1;i<old.chunks.length;i++)await token(i).click();await button('Check sentence').click();assert((await state()).current.correct);
 // Deliberate retry uses the revised seven-slot item, preserving the old result and seen history.
 await button('Try this sentence again').click();assert.equal(await page.locator('.sentence-slot').count(),7);assert.equal(await page.locator('.tile-bank button').count(),8);
 for(const text of await page.locator('.tile-bank button').allTextContents())assert.equal(text,text.toLowerCase());
 assert.equal(await page.locator('.explanation').count(),0);assert((await page.locator('.sentence-task .helper').innerText()).includes('may be unused'));
 assert(!(await page.locator('body').innerText()).includes(q.extraExplanation));
 // Choose have instead of has, reload mid-answer, then receive zero with a targeted explanation.
 const wrong=q.chunks.map((_,i)=>i===3?q.chunks.length:i);
 for(let i=0;i<wrong.length;i++){await token(wrong[i]).click();if(i===3){await page.reload();assert.equal((await state()).current.answer[3],q.chunks.length);}}
 await button('Check sentence').click();assert.equal((await state()).current.correct,false);
 assert((await page.locator('.explanation').innerText()).includes('0/1'));assert((await page.locator('.explanation').innerText()).includes(q.extraExplanation));
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.screenshot({path:'tests/screenshots/writing-distractor-feedback-mobile.png',fullPage:true});
 await button('Try this sentence again').click();for(let i=0;i<q.chunks.length;i++)await token(i).click();await button('Check sentence').click();
 assert((await state()).current.correct);assert.equal(await token(q.chunks.length).innerText(),'have');
 assert.equal((await state()).results.length,3);assert.deepEqual((await state()).results[0].q,old);
 assert.deepEqual(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),EXPOSURE_KEY),{[q.id]:{first:1000}});
 // The same revised item and extra-tile rationale work in a timed Writing report.
 const form={id:0,title:'Distractor regression',sentences:[q,...advanced.filter(x=>x.id!==q.id).slice(0,9)],email:emails[0],discussion:discussions[0]};
 const session=createSession(form,'sentence');
 await page.evaluate(({key,session})=>localStorage.setItem(key,JSON.stringify({version:1,session,history:[],exposure:{}})),{key:WRITING,session});
 await page.goto(new URL('writing.html',base).href);await button('Resume Writing test').click();
 assert((await page.locator('.sentence-task .helper').first().innerText()).includes('may be unused'));
 for(const i of wrong)await token(i).click();await button('End test').click();await page.getByRole('dialog').getByRole('button',{name:'End attempt',exact:true}).click();
 const report=page.locator('.review-task').first();await report.locator('summary').click();assert((await report.innerText()).includes('0/1'));assert((await report.innerText()).includes(q.extraExplanation));
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 console.log('PASS distractors: lowercase 7-slot/8-tile item; wrong extra survives reload and earns zero; correct retry earns one; specific rationale in focused and timed feedback; old frozen question/result and encounter ledger preserved; mobile no overflow.');
}finally{await browser.close();}
