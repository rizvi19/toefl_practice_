import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {newSession,KEY} from '../exam/core.js';
const url=process.env.TEST_URL||'http://127.0.0.1:4177/toefl_practice_/';
const bank=JSON.parse(fs.readFileSync('exam/bank.json','utf8')).items;
const browser=await chromium.launch({headless:true,channel:process.platform==='win32'?'msedge':undefined});
const page=await browser.newPage(),errors=[];
page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
const fixture=()=>{const s=newSession(bank,'Listening',29,17);s.form.router[0]=bank.find(x=>x.id==='response-01');s.audioMode='recorded';return s;};
try{
 await page.addInitScript(()=>{window.__events=[];window.__tts=0;const native=window.Audio;window.Audio=function(...args){const audio=new native(...args);for(const event of ['playing','ended','error'])audio.addEventListener(event,()=>window.__events.push({event,duration:audio.duration,src:audio.src}));return audio;};const speak=window.speechSynthesis.speak.bind(window.speechSynthesis);window.speechSynthesis.speak=u=>{window.__tts++;speak(u);};});
 await page.goto(url);await page.getByRole('heading',{name:'One section. Full focus.'}).waitFor();
 const s=fixture();await page.evaluate(({s,key})=>localStorage.setItem(key,JSON.stringify({version:1,session:s,history:[]})),{s,key:KEY});await page.reload();await page.getByRole('button',{name:'Resume test',exact:true}).click();await page.getByRole('button',{name:'Play audio once',exact:true}).click();await page.waitForFunction(()=>window.__events.some(x=>x.event==='playing'));assert.equal(await page.locator('[data-q]').count(),0);await page.waitForFunction(()=>window.__events.some(x=>x.event==='ended'),null,{timeout:30000});await page.locator('[data-q]').first().waitFor();const media=await page.evaluate(()=>({events:window.__events,tts:window.__tts}));assert.equal(media.tts,0);assert(media.events.some(x=>x.event==='ended'&&x.duration>0));assert.equal(await page.getByRole('button',{name:'Play audio once',exact:true}).count(),0);
 // Reload during audio is explicitly an interrupted recovery; it never unlocks questions early.
 const recovery=fixture();recovery.audio['response-01']='playing';await page.evaluate(({s,key})=>localStorage.setItem(key,JSON.stringify({version:1,session:s,history:[]})),{s:recovery,key:KEY});await page.reload();await page.getByRole('button',{name:'Resume test',exact:true}).click();assert.equal(await page.locator('[data-q]').count(),0);await page.getByRole('button',{name:'Retry interrupted audio'}).waitFor();assert.equal(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).session.audioInterrupted,KEY),true);
 await page.getByRole('button',{name:'Retry interrupted audio'}).click();await page.locator('[data-q]').first().waitFor({timeout:30000});
 // A recording load failure offers a recoverable voice retry, not a falsely completed playback.
 await page.route('**/audio/response-01.wav',route=>route.abort());const failing=fixture();await page.evaluate(({s,key})=>localStorage.setItem(key,JSON.stringify({version:1,session:s,history:[]})),{s:failing,key:KEY});await page.reload();await page.getByRole('button',{name:'Resume test',exact:true}).click();await page.getByRole('button',{name:'Play audio once'}).click();await page.waitForFunction(key=>JSON.parse(localStorage.getItem(key)).session.audio['response-01']==='error',KEY);assert.equal(await page.locator('[data-q]').count(),0);assert.equal(await page.getByRole('button',{name:'Next →',exact:true}).isDisabled(),true);assert((await page.locator('#audio-status').innerText()).includes('Retry uses a browser English voice'));
 assert.deepEqual(errors,[]);console.log(JSON.stringify({result:'PASS',recorded:media.events,reloadRecovery:'flagged and blocked until audio completes',loadFailure:'no questions unlocked; retry switches to speech',ttsCallsForRecording:0},null,2));
}finally{await browser.close();}
