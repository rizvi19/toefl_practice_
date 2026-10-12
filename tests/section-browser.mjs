import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {screens,moduleItems,KEY} from '../exam/core.js';
const url=process.env.TEST_URL||'http://127.0.0.1:4177/toefl_practice_/';
const browser=await chromium.launch({headless:true,channel:process.platform==='win32'?'msedge':undefined});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
await context.addInitScript(()=>{
 window.__speech=[];window.__hold=false;window.__pending=[];
 const voices=[{voiceURI:'English-A',lang:'en-US',name:'English A'},{voiceURI:'English-B',lang:'en-GB',name:'English B'}];
 class Utterance{constructor(text){this.text=text;}}
 Object.defineProperty(window,'SpeechSynthesisUtterance',{configurable:true,value:Utterance});
 Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{getVoices:()=>voices,addEventListener(){},cancel(){window.__pending=[];},speak(u){window.__speech.push({text:u.text,voice:u.voice?.voiceURI});setTimeout(()=>{u.onstart?.();if(window.__hold)window.__pending.push(u);else setTimeout(()=>u.onend?.(),2);},2);}}});
});
const page=await context.newPage(),errors=[],failed=[];
page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(`${r.status()} ${r.url()}`);});
page.on('dialog',d=>d.accept());
const button=name=>page.getByRole('button',{name,exact:true});
const state=()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),KEY);
const session=async()=> (await state()).session;
const start=async section=>{await button(`Take ${section} Test`).click();if(section==='Listening'){await page.locator('#audio-mode').selectOption('tts');await button('Check sound').click();await page.waitForFunction(()=>!document.querySelector('#start').disabled);}await button(`Start ${section} Test →`).click();};
const answerScreen=async(correct=true)=>{
 const s=await session(),screen=screens(moduleItems(s),s.section)[s.index],item=screen.item;
 if(item.type==='complete-words'){
  if(correct){const blanks=item.pieces.filter(p=>typeof p==='object');for(let b=0;b<blanks.length;b++)for(let i=0;i<blanks[b].answer.length;i++)await page.locator(`[data-blank="${b}"][data-slot="${i}"]`).fill(blanks[b].answer[i]);}
 }else{
  if(s.section==='Listening'&&s.audio[item.id]!=='complete'){await button('Play audio once').click();await page.locator('[data-q]').first().waitFor();}
  const indices=screen.indices||item.questions.map((q,i)=>i);
  if(correct)for(const q of indices)await page.locator(`[data-q="${q}"][value="${item.questions[q].answer}"]`).check();
 }
 const label=s.index===screens(moduleItems(s),s.section).length-1?s.module===1?'Submit Module 1':'Finish test':'Next →';await button(label).click();
 if(label!=='Next →')await page.getByRole('dialog').getByRole('button',{name:label,exact:true}).click();
};
fs.mkdirSync('tests/screenshots',{recursive:true});
try{
 await page.goto(url);await page.getByRole('heading',{name:'One section. Full focus.'}).waitFor();
 await page.screenshot({path:'tests/screenshots/desktop-home.png',fullPage:true});
 await button('Take Reading Test').click();assert.equal(await page.locator('#minutes').inputValue(),'25');await page.locator('#minutes').fill('30');assert((await page.locator('#time-plan').innerText()).includes('21:00'));await button('Start Reading Test →').click();assert.equal((await session()).time.first,1260);
 const first=(await session()).form.router[0];await page.locator('[data-blank="0"][data-slot="0"]').fill('x');await button('Next →').click();await button('← Back').click();assert.equal(await page.locator('[data-blank="0"][data-slot="0"]').inputValue(),'x');
 await button('☆ Mark for review').click();await button('Review module').click();assert.equal(await page.locator('[data-jump="0"]').getAttribute('class'),'marked');await page.locator('[data-jump="1"]').click();assert.equal((await session()).index,1);await button('← Back').click();
 const prior=(await session()).deadline;await page.reload();await button('Resume test').click();assert.equal((await session()).deadline,prior);assert.equal(await page.locator('[data-blank="0"][data-slot="0"]').inputValue(),'x');
 await page.screenshot({path:'tests/screenshots/desktop-reading.png',fullPage:true});
 while((await session())?.module===1)await answerScreen();assert.equal((await session()).route,'upper');assert.equal((await session()).transition,true);await button('Continue to Module 2 →').click();assert.equal(await button('← Back').isDisabled(),true);assert((await page.locator('.module-line').innerText()).includes('Module 1 locked'));
 while(await session())await answerScreen();let result=(await state()).history[0];assert.equal(result.stats.correct,50);assert.equal(result.estimate,6);assert.equal(result.attempts[0].item.id,first.id);await page.getByRole('heading',{name:'Your Reading review'}).waitFor();await page.screenshot({path:'tests/screenshots/desktop-results.png',fullPage:true});await page.locator('#wrong-only').check();assert.equal(await page.locator('.review-task').count(),0);
 await button('← Section tests').click();await start('Listening');assert.equal((await session()).time.first,1080);assert.equal(await page.locator('[data-q]').count(),0);assert.equal(await button('Next →').isDisabled(),true);assert.equal(await page.getByRole('button',{name:'Back',exact:true}).count(),0);assert.equal(await page.getByText('Listening transcript',{exact:true}).count(),0);
 await page.evaluate(()=>window.__hold=true);await button('Play audio once').click();await page.waitForFunction(()=>window.__pending.length>0);assert.equal(await button('Playing…').isDisabled(),true);assert.equal(await button('Next →').isDisabled(),true);await page.evaluate(()=>{window.__hold=false;window.__pending.shift().onend();});await page.locator('[data-q]').first().waitFor();assert.equal(await page.getByRole('button',{name:'Play audio once',exact:true}).count(),0);await page.screenshot({path:'tests/screenshots/desktop-listening.png',fullPage:true});
 while((await session())?.module===1)await answerScreen();assert.equal((await session()).route,'upper');await button('Continue to Module 2 →').click();while(await session())await answerScreen();result=(await state()).history[0];assert.equal(result.stats.correct,47);assert.equal(result.estimate,6);const speech=await page.evaluate(()=>window.__speech);assert(speech.some(x=>x.voice==='English-A'));assert(speech.some(x=>x.voice==='English-B'));assert(!speech.some(x=>/^(Man|Woman):/.test(x.text)));await page.locator('.review-task').first().locator('summary').click();await page.getByRole('heading',{name:'Listening transcript'}).first().waitFor();
 // Lower route, abandoned attempt, both module expiries and local result export.
 await button('← Section tests').click();await start('Reading');
 await page.evaluate(key=>{const d=JSON.parse(localStorage.getItem(key));d.session.deadline=Date.now()-100;localStorage.setItem(key,JSON.stringify(d));},KEY);await page.reload();await page.waitForFunction(key=>JSON.parse(localStorage.getItem(key)).session.module===2,KEY);if(await button('Resume test').count())await button('Resume test').click();assert.equal((await session()).route,'lower');assert.deepEqual((await session()).expired,[1]);await button('Continue to Module 2 →').click();await button('Help').click();assert.equal(await page.getByRole('dialog').count(),1);
 await page.evaluate(key=>{const d=JSON.parse(localStorage.getItem(key));d.session.deadline=Date.now()-100;localStorage.setItem(key,JSON.stringify(d));},KEY);await page.reload();await page.getByRole('heading',{name:'Your Reading review'}).waitFor();result=(await state()).history[0];assert.equal(result.reason,'timeout');assert.equal(result.estimate,1);assert.equal(result.stats.total,50);assert.deepEqual(result.expired,[1,2]);
 const download=page.waitForEvent('download');await button('Download result').click();assert((await download).suggestedFilename().includes('Reading'));
 await button('← Section tests').click();await start('Reading');await button('End test').click();await page.getByRole('dialog').getByRole('button',{name:'End attempt'}).click();assert.equal((await state()).history[0].estimate,null);
 await button('← Section tests').click();await start('Reading');await page.evaluate(key=>{const d=JSON.parse(localStorage.getItem(key));d.session.deadline=Date.now()-3600000;localStorage.setItem(key,JSON.stringify(d));},KEY);await page.reload();await page.getByRole('heading',{name:'Your Reading review'}).waitFor();assert.equal((await state()).session,null);assert.deepEqual((await state()).history[0].expired,[1,2]);
 await button('← Section tests').click();await page.setViewportSize({width:390,height:844});await page.screenshot({path:'tests/screenshots/mobile-home.png',fullPage:true});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await start('Reading');await page.screenshot({path:'tests/screenshots/mobile-reading.png',fullPage:true});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 console.log(JSON.stringify({result:'PASS',reading:'50/50 upper route, slots, Back, Review, flags, persistence',listening:'47/47, one play, hidden choices until completion, two voice conversation, no Back/replay',timers:'custom minutes, lower route, two expiries, reload preserves deadline',review:'scores, transcripts, mistake filter, downloaded JSON, incomplete has no estimate',responsive:'390px and 1440px, no overflow',errors,failed},null,2));
}finally{await browser.close();}
