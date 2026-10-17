import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';
import {validate} from '../listening/quality.mjs';import {TYPES} from '../listening/constants.js';
const root=process.env.SITE_ROOT||'.',read=p=>fs.readFileSync(`${root}/${p}`,'utf8'),bank=JSON.parse(read('listening/bank.json'));
assert.equal(bank.bankVersion,'listening-2026-v2');assert.equal(bank.items.length,200);assert.deepEqual(validate(bank.items),[]);
for(const type of TYPES)assert.equal(bank.items.filter(x=>x.type===type).length,50);
assert.equal(bank.items.reduce((n,x)=>n+x.questions.length,0),450);
const c={};vm.runInNewContext(read('listening/library-bank.js'),c);assert.deepEqual(JSON.parse(JSON.stringify(c.__TOEFL_LISTENING_V2__)),bank.items);
assert.deepEqual(JSON.parse(read('exam/bank.json')).items.filter(x=>TYPES.includes(x.type)),bank.items);
const manifest=JSON.parse(read('audio/generated/manifest.json'));let missing=0;const files=new Set(),digests=new Set();
for(const x of bank.items){if(x.audio){assert(fs.existsSync(`${root}/${x.audio}`));continue;}const entry=manifest.recordings[x.id];if(!entry){missing++;continue;}assert.equal(entry.script_sha256,createHash('sha256').update(x.script).digest('hex'),x.id+' stale audio');assert(fs.existsSync(`${root}/${entry.path}`));const raw=fs.readFileSync(`${root}/${entry.path}`),digest=createHash('sha256').update(raw).digest('hex');assert.equal(raw.length,entry.bytes,x.id+' recording byte size');assert(!files.has(entry.path),'reused recording path');files.add(entry.path);assert(!digests.has(digest),'duplicate recording content');digests.add(digest);assert(entry.duration_seconds>0&&entry.bytes>1000);if(x.type==='conversation')assert.deepEqual(new Set(entry.voices),new Set(['af_heart','am_michael']));}
if(!process.argv.includes('--allow-missing-audio')){
 assert.equal(missing,0,'Every current activity requires matched recorded audio');
 const audit=JSON.parse(read('docs/LISTENING_AUDIO_AUDIT.json'));assert.equal(audit.activities,200);assert.deepEqual(audit.pending,[]);assert.equal(audit.newKokoroMP3s,173);assert.equal(new Set(audit.recordings.map(x=>x.id)).size,200);
 for(const x of bank.items){const entry=manifest.recordings[x.id];if(!x.audio)assert.equal(entry.bundled,true,x.id+' release recording is not protected from cache eviction');const row=audit.recordings.find(r=>r.id===x.id);assert(row,x.id+' not decoded in audio audit');assert.equal(row.path,x.audio||entry.path);const raw=fs.readFileSync(`${root}/${row.path}`);assert.equal(row.bytes,raw.length);assert.equal(row.sha256,createHash('sha256').update(raw).digest('hex'),x.id+' changed since full audio decode');assert(row.peak_dbfs>-40&&row.mean_dbfs>-60);}
}
console.log(`PASS: 200 distinct Listening activities / 450 keys; 50 per task; evidence and option rationales valid; library and section banks agree; ${missing} recordings pending.`);
