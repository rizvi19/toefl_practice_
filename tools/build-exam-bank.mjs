import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync('library.html','utf8'),window={};
for(const match of html.matchAll(/<script src="\.\/(collections\/[^"<>]+)"/g))
  vm.runInNewContext(fs.readFileSync(match[1],'utf8'),{window},{timeout:30000});
const bundle=fs.readFileSync('assets/index-0Qc6vs45.js','utf8');
const match=bundle.match(/Dg=JSON\.parse\((['"])(.*?)\1\),(?:READING_ORIGINAL_TAGS=|xi=)/s);
assert(match,'Original independent bank exists');
const original=JSON.parse(vm.runInNewContext(match[1]+match[2]+match[1]));
const types=['choose-response','conversation','announcement','academic-talk'];
const listening=[...original.filter(x=>types.includes(x.type)),...Object.values(window.__TOEFL_LISTENING_EXTENDED__).flat()];
assert.equal(listening.length,800);
const reading=JSON.parse(fs.readFileSync('reading/bank.json','utf8'));
const items=[...reading.items,...listening];
assert.equal(new Set(items.map(x=>x.id)).size,items.length);
fs.writeFileSync('exam/bank.json',JSON.stringify({version:1,readingVersion:reading.bankVersion,provenance:reading.provenance,items}));
console.log(`Exam bank: ${reading.items.length} Reading and ${listening.length} unchanged Listening activities.`);
