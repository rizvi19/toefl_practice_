// Mark release recordings as bundled so an optional helper never evicts them.
import fs from 'node:fs';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';
const bank=JSON.parse(fs.readFileSync('listening/bank.json','utf8')).items;
const path='audio/generated/manifest.json',manifest=JSON.parse(fs.readFileSync(path,'utf8'));
let n=0;
for(const item of bank){if(item.audio)continue;const entry=manifest.recordings[item.id];assert(entry,item.id+' missing');assert.equal(entry.script_sha256,createHash('sha256').update(item.script).digest('hex'),item.id+' stale');assert.equal(fs.statSync(entry.path).size,entry.bytes);entry.bundled=true;n++;}
assert.equal(n,173);fs.writeFileSync(path,JSON.stringify(manifest,null,2)+'\n');console.log('Sealed 173 script-matched bundled Kokoro recordings.');
