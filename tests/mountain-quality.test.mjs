import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {test} from "node:test";
const decode=(path)=>JSON.parse(readFileSync(new URL("../mountain/"+path, import.meta.url),"utf8"));
const groups=[decode("parts-1-5.json"),decode("parts-6-10.json")];
const parts=groups.flatMap(x=>x.parts);
const kinds={words:35,phrases:15,grammars:5,roots:8,traps:8};
test("ten fully authored parts with expected coverage",()=>{
 assert.equal(parts.length,10);
 assert.deepEqual(parts.map(x=>x.id),[1,2,3,4,5,6,7,8,9,10]);
 for(const p of parts){
  for(const [kind,count] of Object.entries(kinds))assert.equal(p[kind]?.length,count,"Part "+p.id+" "+kind);
  assert.ok(p.title&&p.focus);
 }
});
test("all 710 entries have unique stable IDs and meaningful fields",()=>{
 const ids=new Set();
 for(const p of parts)for(const kind of Object.keys(kinds))for(const entry of p[kind]){
  assert.ok(!ids.has(entry.id),"Duplicate "+entry.id);ids.add(entry.id);
  for(const value of Object.values(entry))assert.ok(typeof value==="string"&&value.trim().length>0,"Missing field in "+entry.id);
  if(kind==="grammars")assert.notEqual(entry.correct,entry.incorrect);
  if(kind==="traps")assert.notEqual(entry.correct,entry.incorrect);
 }
 assert.equal(ids.size,710);
});
test("site integration files contain Mountain navigation and assets",()=>{
 const root=(f)=>readFileSync(new URL("../"+f,import.meta.url),"utf8");
 for(const f of ["index.html","library.html"])assert.match(root(f),/mountain\.html/);
 assert.match(root("mountain.html"),/mountain\/app\.js/);
 assert.match(root("mountain.html"),/mountain\/style\.css/);
 assert.match(root("mountain\/app.js"),/parts-1-5\.json/);
 assert.match(root("mountain\/app.js"),/parts-6-10\.json/);
});