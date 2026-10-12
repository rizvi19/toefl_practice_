// Execute the same collection scripts, in the same order, as index.html.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
export function listeningCatalog(root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')) {
  const html=fs.readFileSync(path.join(root,'library.html'),'utf8'),window={};
  for(const match of html.matchAll(/<script src="\.\/(collections\/[^"<>]+)"/g))
    vm.runInNewContext(fs.readFileSync(path.join(root,match[1]),'utf8'),{window},{timeout:30000});
  const src=fs.readFileSync(path.join(root,'assets/index-0Qc6vs45.js'),'utf8');
  const match=src.match(/Dg=JSON\.parse\((['"])(.*?)\1\),(?:READING_ORIGINAL_TAGS=|xi=)/s);
  if(!match)throw Error('Original activity bank not found; inspect the new bundle before generating.');
  const original=JSON.parse(vm.runInNewContext(match[1]+match[2]+match[1]));
  const types=['choose-response','conversation','announcement','academic-talk'];
  const bank=[...original.filter(x=>types.includes(x.type)),...Object.values(window.__TOEFL_LISTENING_EXTENDED__).flat()];
  if(bank.length!==800||new Set(bank.map(x=>x.id)).size!==800)throw Error('Expected 800 unique Listening IDs');
  return bank.map(x=>{
    if(typeof x.script!=='string'||!x.script.trim())throw Error('Missing script: '+x.id);
    return {id:x.id,type:x.type,title:x.title,script:x.script,originalAudio:x.audio||null};
  });
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))
  console.log(JSON.stringify(listeningCatalog(process.argv[2])));
