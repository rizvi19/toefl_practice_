import {EXPOSURE_KEY,mergeHistory,markSeen,shuffleOptions} from './engine.js';
function ledger(){try{return mergeHistory(JSON.parse(localStorage.getItem(EXPOSURE_KEY)||'{}'));}catch{return {};}}
// Used only for Reading by the compiled practice-library adapter.
export function selectLibrary(pool,count){const exposures=ledger(),out=[];while(out.length<count&&pool.length){const min=Math.min(...pool.map(x=>exposures[x.id]?.count||0));let choices=pool.filter(x=>(exposures[x.id]?.count||0)===min);if(min>0){const oldest=Math.min(...choices.map(x=>exposures[x.id]?.lastSeen||0));choices=choices.filter(x=>(exposures[x.id]?.lastSeen||0)===oldest);}const item=choices[Math.floor(Math.random()*choices.length)];out.push(item);pool=pool.filter(x=>x.id!==item.id);}return out;}
export function prepareLibrary(items){return items.map(x=>x.id.startsWith('r2-')?shuffleOptions(x,Math.random):x);}
export function seeLibrary(item){const next=markSeen(ledger(),item,Date.now());localStorage.setItem(EXPOSURE_KEY,JSON.stringify(next));}
