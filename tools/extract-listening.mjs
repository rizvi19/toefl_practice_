// The helper uses the exact published Listening catalog, never retired templates.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export function listeningCatalog(root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')){
 const bank=JSON.parse(fs.readFileSync(path.join(root,'listening/bank.json'),'utf8'));
 if(bank.bankVersion!=='listening-2026-v2'||bank.items.length!==200)throw Error('Expected current Listening v2 bank');
 return bank.items.map(x=>({id:x.id,type:x.type,title:x.title,script:x.script,originalAudio:x.audio||null}));
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(JSON.stringify(listeningCatalog(process.argv[2])));
