import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {newSession,KEY} from '../exam/core.js';
import {EXPOSURE_KEY} from '../listening/engine.js';
const url=process.env.TEST_URL||'http://127.0.0.1:4177/toefl_practice_/';
const all=JSON.parse(fs.readFileSync('exam/bank.json','utf8')).items;
const manifest=JSON.parse(fs.readFileSync('audio/generated/manifest.json','utf8')).recordings;
const browser=await chromium.launch({headless:true,channel:process.platform==='win32'?'msedge':undefined});
const page=await browser.newPage(),errors=[],results=[];
page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>{
 window.__media=[];window.__tts=0;const Native=window.Audio;
 window.Audio=function(...args){const a=new Native(...args);for(const event of ['playing','ended','error'])a.addEventListener(event,()=>window.__media.push({event,src:a.src,duration:a.duration,time:a.currentTime,rate:a.playbackRate}));return a;};
 const speak=speechSynthesis.speak.bind(speechSynthesis);speechSynthesis.speak=u=>{window.__tts++;speak(u);};
});
const button=name=>page.getByRole('button',{name,exact:true});
try{
 await page.goto(url);await page.getByRole('heading',{name:'One section. Full focus.'}).waitFor();
 for(const id of ['l2-r016','l2-c005','l2-n005','l2-t005']){
  const item=all.find(x=>x.id===id),s=newSession(all,'Listening',29,71);s.form.router[0]=item;s.audioMode='recorded';
  await page.evaluate(({s,key})=>localStorage.setItem(key,JSON.stringify({version:1,session:s,history:[]})),{s,key:KEY});
  await page.reload();await button('Resume test').click();await button('Play audio once').click();
  await page.waitForFunction(()=>window.__media.some(x=>x.event==='playing'));
  assert.equal(await page.locator('[data-q]').count(),0);assert.equal(await button('Next →').isDisabled(),true);
  await page.waitForFunction(()=>window.__media.some(x=>x.event==='ended'),null,{timeout:150000});
  await page.locator('[data-q]').first().waitFor();
  const data=await page.evaluate(()=>({media:window.__media,tts:window.__tts})),ended=data.media.find(x=>x.event==='ended');
  assert.equal(data.tts,0);assert(!data.media.some(x=>x.event==='error'));assert.equal(ended.rate,1);
  assert(ended.src.endsWith('/'+manifest[id].path));assert(Math.abs(ended.duration-manifest[id].duration_seconds)<.2);assert(ended.time>=ended.duration-.1);
  assert.equal(await button('Play audio once').count(),0);assert.equal(await button('Next →').isDisabled(),true);
  await page.locator(`[data-q="0"][value="${item.questions[0].answer}"]`).check();await button('Next →').click();
  if(item.questions.length>1){assert.equal(await button('Play audio once').count(),0);assert.equal(await page.locator('[data-q="1"]').count(),4);assert.equal(await button('Next →').isDisabled(),true);}
  const exposure=await page.evaluate(({key,id})=>JSON.parse(localStorage.getItem(key))[id],{key:EXPOSURE_KEY,id});assert.equal(exposure.count,1);
  console.log('PASS: native normal-speed recording',id);results.push({id,duration:ended.duration,nativeAudio:true,ttsCalls:0,onePlayGate:true});
 }
 assert.deepEqual(errors,[]);console.log(JSON.stringify({result:'PASS',recordings:results,errors},null,2));
}finally{await browser.close();}
