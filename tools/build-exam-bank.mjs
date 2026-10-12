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
const types=['complete-words','daily-life','academic-passage','choose-response','conversation','announcement','academic-talk'];
const items=[...original.filter(x=>types.includes(x.type)).map(x=>({...x,...(window.__TOEFL_CTW_REVISED__[x.id]||{})})),...window.__TOEFL_CTW_200_EXT__,...window.__TOEFL_DAILY_200__,...window.__TOEFL_ACADEMIC_200__,...Object.values(window.__TOEFL_LISTENING_EXTENDED__).flat()];
assert.equal(items.length,1400);
assert.equal(new Set(items.map(x=>x.id)).size,1400);
for(const type of types)assert.equal(items.filter(x=>x.type===type).length,200);
fs.writeFileSync('exam/bank.json',JSON.stringify({version:1,provenance:'Existing independently authored practice bank; no uploaded publisher exercises or ETS items.',items}));
console.log('Exam bank: 1,400 independent activities; 200 per task type.');
