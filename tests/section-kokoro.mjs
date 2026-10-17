// No model downloads in CI: mocked helper, real native audio decoding/playback.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {newSession,KEY} from '../exam/core.js';
const url=process.env.TEST_URL||'http://127.0.0.1:4177/toefl_practice_/';
const bank=JSON.parse(fs.readFileSync('exam/bank.json','utf8')).items;
const item=bank.find(x=>x.id==='l2-r016'),sha=createHash('sha256').update(item.script).digest('hex');
const browser=await chromium.launch({headless:true,channel:process.platform==='win32'?'msedge':undefined});
const page=await browser.newPage(),errors=[];let delay=0,requests=0;
page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>{
 window.__audio=[];window.__speech=0;const Native=window.Audio;
 window.Audio=function(...args){const a=new Native(...args);for(const e of ['playing','ended','error'])a.addEventListener(e,()=>window.__audio.push(e));return a;};
 const speak=window.speechSynthesis.speak.bind(window.speechSynthesis);window.speechSynthesis.speak=u=>{window.__speech++;speak(u);};
});
await page.route('http://127.0.0.1:8766/**',async route=>{
 const headers={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Methods':'GET, POST, OPTIONS'};
 if(route.request().method()==='OPTIONS'){await route.fulfill({status:204,headers});return;}
 if(route.request().url().endsWith('/api/kokoro/status')){await route.fulfill({headers,json:{service:'toefl-kokoro',version:2,ready:true,pilot_only:false}});return;}
 if(route.request().url().endsWith('/api/kokoro/generate')){
  const body=route.request().postDataJSON();assert.equal(body.id,item.id);assert.equal(body.script_sha256,sha);requests++;
  if(delay)await new Promise(r=>setTimeout(r,delay));
  await route.fulfill({headers,json:{script_sha256:sha,url:`/toefl_practice_/audio/generated/${item.id}.mp3`}});return;
 }
 await route.fulfill({headers,contentType:'audio/wav',body:fs.readFileSync('audio/response-01.wav')});
});
try{
 await page.route('**/audio/generated/manifest.json',route=>route.fulfill({json:{recordings:{}}}));
 await page.goto(url);await page.getByRole('button',{name:'Take Listening Test',exact:true}).click();
 assert.equal(await page.locator('#audio-mode').inputValue(),'kokoro-browser','New visitors have browser Kokoro');
 await page.locator('#audio-mode').selectOption('kokoro');
 await page.getByRole('button',{name:'Check local Kokoro',exact:true}).click();await page.getByText('Kokoro helper connected.',{exact:false}).waitFor();
 await page.getByRole('button',{name:'Check sound',exact:true}).click();await page.waitForFunction(()=>!document.querySelector('#start').disabled);
 assert.match(await page.locator('#check-status').innerText(),/Kokoro American English · local/);
 assert.equal(await page.evaluate(()=>window.__speech),0);
 await page.reload();await page.getByRole('button',{name:'Take Listening Test',exact:true}).click();assert.equal(await page.locator('#audio-mode').inputValue(),'kokoro');
 const s=newSession(bank,'Listening',29,17);s.form.router[0]=item;s.audioMode='kokoro';s.deadline=Date.now()+11000;
 await page.evaluate(({key,s})=>localStorage.setItem(key,JSON.stringify({version:1,session:s,history:[]})),{key:KEY,s});
 await page.reload();await page.getByRole('button',{name:'Resume test',exact:true}).click();delay=12000;
 await page.getByRole('button',{name:'Play audio once',exact:true}).click();
 await page.waitForTimeout(11500);
 assert.equal(await page.locator('[data-q]').count(),0,'Preparation never unlocks questions');
 assert.equal(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).session.module,KEY),1,'Preparation does not expire the module');
 await page.waitForFunction(()=>window.__audio.includes('playing'));
 assert.equal(await page.locator('[data-q]').count(),0,'Questions stay hidden during native playback');
 await page.locator('[data-q]').first().waitFor({timeout:15000});
 assert.equal(await page.getByRole('button',{name:'Play audio once',exact:true}).count(),0,'No replay after completion');
 assert.equal(await page.getByRole('button',{name:/transcript/i}).count(),0);
 assert.equal(await page.evaluate(()=>window.__speech),0);
 await page.locator('[data-q]').first().check();await page.getByRole('button',{name:'Next →',exact:true}).click();
 assert.equal(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).session.index,KEY),1,'Activity completes normally');
 assert.equal(requests,2,'Only sound check and current activity requested');assert.deepEqual(errors,[]);
 console.log('PASS: browser/local Kokoro choices; real sound check; saved preference; actual ID/script hash; native audio completion gate; no replay/transcript; setup excluded from timer; normal answer/save.');
}finally{await browser.close();}
