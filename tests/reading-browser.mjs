import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {KEY} from '../exam/core.js';
import {EXPOSURE_KEY,PRESETS,layoutCount} from '../reading/engine.js';
const browser=await chromium.launch({headless:true,channel:process.platform==='win32'?'msedge':undefined});
const page=await browser.newPage({viewport:{width:1440,height:1050}}),errors=[],failed=[];
page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});page.on('dialog',d=>d.accept());
const url=process.env.TEST_URL||'http://127.0.0.1:4177/toefl_practice_/';
const button=name=>page.getByRole('button',{name,exact:true});
const state=()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),KEY);
const ledger=()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),EXPOSURE_KEY);
const end=async()=>{await button('End test').click();await page.getByRole('dialog').getByRole('button',{name:'End attempt',exact:true}).click();await button('← Section tests').click();};
fs.mkdirSync('tests/screenshots',{recursive:true});
try{
 await page.goto(url);await button('Take Reading Test').click();assert.equal(await page.locator('#minutes').inputValue(),'30');assert.equal(await page.locator('#first-minutes').inputValue(),'21');
 for(const preset of Object.keys(PRESETS)){await page.locator('#reading-preset').selectOption(preset);const c=PRESETS[preset];assert.equal(await page.locator('#reading-level').inputValue(),c.level);assert.equal(await page.locator('#reading-route').inputValue(),c.route);assert((await page.locator('#reading-total').innerText()).includes(String(layoutCount(c.router))));}
 await page.locator('#reading-preset').selectOption('advanced-3');await page.screenshot({path:'tests/screenshots/reading-setup-desktop.png',fullPage:true});await button('Start Reading Test →').click();let s=(await state()).session;assert.equal(s.form.preset,'advanced-3');assert(s.form.router.every(x=>x.level==='advanced'));
 const first=s.form.router[0].id;assert.equal((await ledger())[first].count,1);assert.equal(Object.keys(await ledger()).length,1);await button('Next →').click();await button('← Back').click();assert.equal((await ledger())[first].count,1);await page.reload();await button('Resume test').click();assert.equal((await ledger())[first].count,1);await end();
 const r=(await state()).history[0];assert.equal(r.estimate,null);assert.equal(r.seenIds.length,2);await page.reload();assert.equal(Object.keys(await ledger()).length,2,'Hidden modules and unvisited screens must not become exposures after reload');
 await button('Take Reading Test').click();await page.locator('#reading-preset').selectOption('advanced-3');await button('Start Reading Test →').click();s=(await state()).session;assert(!r.seenIds.includes(s.form.router[0].id));await end();
 await button('Take Reading Test').click();await page.locator('#reading-preset').selectOption('intermediate-2');await page.locator('.layout-editor summary').click();await page.locator('[data-layout="router"][data-variant="short"]').fill('2');await page.locator('[data-layout="router"][data-variant="short"]').dispatchEvent('change');assert.equal(await page.locator('#reading-preset').inputValue(),'custom');await page.locator('#first-minutes').fill('15');await button('Start Reading Test →').click();s=(await state()).session;assert.equal(s.time.first,900);assert.equal(s.form.config.router.short,2);assert.equal(s.form.config.route,'lower');assert(s.form.router.every(x=>x.level==='intermediate'));await end();
 await page.setViewportSize({width:390,height:844});await button('Take Reading Test').click();await page.locator('#reading-preset').selectOption('adaptive');await page.screenshot({path:'tests/screenshots/reading-setup-mobile.png',fullPage:true});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await button('Start Reading Test →').click();await page.screenshot({path:'tests/screenshots/reading-test-mobile.png',fullPage:true});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await end();
 // A library exposure shares the ledger with section tests, and is not counted twice on reload.
 await page.setViewportSize({width:1440,height:1050});await page.goto(new URL('library.html',url).href);await page.getByRole('button',{name:/Practice library/i}).first().click();await button('Random · Daily Life').click();let item=await page.evaluate(()=>JSON.parse(localStorage.getItem('toefl-studio-v1')).session.items[0]);assert.equal((await ledger())[item.id].count,1);await page.reload();await page.getByRole('button',{name:/Resume session/}).click();assert.equal((await ledger())[item.id].count,1);
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);console.log('PASS: all presets, custom counts and module timing, editor levels, exposure-on-view only, reload, repeat avoidance, shared library history, mobile setup/test without overflow.');
}catch(error){console.error(JSON.stringify({errors,failed,url:page.url(),body:(await page.locator('body').innerText()).slice(0,1200)}));await page.screenshot({path:'tests/screenshots/reading-browser-failure.png',fullPage:true});throw error;}finally{await browser.close();}
