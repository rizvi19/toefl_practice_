import fs from 'node:fs';
import assert from 'node:assert/strict';
const reading=JSON.parse(fs.readFileSync('reading/bank.json','utf8'));
const listening=JSON.parse(fs.readFileSync('listening/bank.json','utf8'));
const items=[...reading.items,...listening.items];
assert.equal(new Set(items.map(x=>x.id)).size,items.length);
fs.writeFileSync('exam/bank.json',JSON.stringify({version:1,readingVersion:reading.bankVersion,listeningVersion:listening.bankVersion,provenance:'Independent original practice; local estimates and editorial levels are uncalibrated.',items}));
console.log(`Exam bank: ${reading.items.length} preserved Reading and ${listening.items.length} distinct Listening activities.`);
