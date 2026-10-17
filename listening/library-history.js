import {EXPOSURE_KEY,historyLedger,markSeen,select,shuffle,isCurrent,makeForm} from './engine.js';
const ledger=()=>{try{return historyLedger(JSON.parse(localStorage.getItem(EXPOSURE_KEY)||'{}'));}catch{return {};}};
export const selectListening=(pool,count)=>select(pool.filter(isCurrent),count,ledger());
export const prepareListening=items=>items.map(x=>isCurrent(x)?shuffle(x):x);
export function seeListening(item){localStorage.setItem(EXPOSURE_KEY,JSON.stringify(markSeen(ledger(),item)));}
export function listeningRehearsal(bank){const f=makeForm(bank,Date.now(),{exposures:ledger()});return [...f.router,...f.upper];}
