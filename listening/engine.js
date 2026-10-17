import {VERSION,TYPES,COUNTS} from './constants.js';
import {randomFor} from '../reading/engine.js';
export const EXPOSURE_KEY='toefl-listening-exposure-v2';
export const PRESETS={
 adaptive:{name:'Adaptive practice · 47 items',level:'mixed',route:'adaptive',router:[10,3,4,2],upper:[5,2,1,1],lower:[9,2,1,0]},
 advanced:{name:'Advanced practice · fixed upper route',level:'advanced',route:'upper',router:[10,3,4,2],upper:[5,2,1,1],lower:[9,2,1,0]},
 intermediate:{name:'Intermediate practice · fixed lower route',level:'intermediate',route:'lower',router:[10,3,4,2],upper:[5,2,1,1],lower:[9,2,1,0]}
};
export const layoutCount=counts=>counts.reduce((n,x,i)=>n+x*COUNTS[TYPES[i]],0);
export const isCurrent=x=>x?.listeningVersion===VERSION;
export function validateConfig(config){
 if(!config||!['mixed','advanced','intermediate'].includes(config.level)||!['adaptive','upper','lower'].includes(config.route))throw Error('Choose a valid Listening level and route.');
 for(const name of ['router','upper','lower']){const a=config[name];if(!Array.isArray(a)||a.length!==4||a.some(x=>!Number.isInteger(x)||x<0||x>20)||layoutCount(a)<5||layoutCount(a)>60)throw Error('Use whole activity counts of 0–20, with 5–60 items per module.');}
 return config;
}
export function historyLedger(raw={},history=[]){const out={};for(const [id,e] of Object.entries(raw||{}))if(Number.isInteger(e?.count)&&e.count>0&&Number.isFinite(e.lastSeen)&&e.lastSeen>=0)out[id]={count:e.count,lastSeen:e.lastSeen};
 for(const r of history)if(r.listeningVersion===VERSION)for(const id of r.seenIds||[])if(!out[id])out[id]={count:1,lastSeen:r.finishedAt||0};return out;}
export const markSeen=(ledger,item,now=Date.now())=>({...ledger,[item.id]:{count:(ledger[item.id]?.count||0)+1,lastSeen:now}});
export function select(pool,count,ledger={},random=Math.random){const out=[];pool=[...pool];while(out.length<count&&pool.length){const min=Math.min(...pool.map(x=>ledger[x.id]?.count||0));let eligible=pool.filter(x=>(ledger[x.id]?.count||0)===min);if(min){const oldest=Math.min(...eligible.map(x=>ledger[x.id]?.lastSeen||0));eligible=eligible.filter(x=>(ledger[x.id]?.lastSeen||0)===oldest);}const chosen=eligible[Math.floor(random()*eligible.length)];out.push(chosen);pool=pool.filter(x=>x.id!==chosen.id);}return out;}
export function shuffle(item,random=Math.random){const out=structuredClone(item);out.questions=out.questions.map(q=>{const order=[0,1,2,3];for(let i=3;i>0;i--){const j=Math.floor(random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}return {...q,options:order.map(i=>q.options[i]),rationales:order.map(i=>q.rationales[i]),answer:order.indexOf(q.answer)};});return out;}
export function makeForm(bank,seed=Date.now(),options={}){const preset=options.preset||'adaptive';if(preset!=='custom'&&!PRESETS[preset])throw Error('Unknown Listening preset.');const config=validateConfig(structuredClone(options.config||PRESETS[preset])),random=randomFor(seed),ledger=historyLedger(options.exposures,options.history),used=new Set(),families=new Set(),reused=[];
 const module=(counts,level)=>TYPES.flatMap((type,i)=>{const pool=bank.filter(x=>isCurrent(x)&&x.type===type&&!used.has(x.id)&&!families.has(x.family)&&(level==='mixed'||x.level===level)),chosen=select(pool,counts[i],ledger,random);if(chosen.length!==counts[i])throw Error(`Not enough distinct ${level} ${type} activities for all modules. Reduce counts or choose Mixed.`);return chosen.map(x=>{used.add(x.id);families.add(x.family);if(ledger[x.id]?.count)reused.push(x.id);return shuffle(x,random);});});
 const router=module(config.router,config.level),upper=module(config.upper,config.level==='mixed'?'advanced':config.level),lower=module(config.lower,config.level==='mixed'?'intermediate':config.level);
 return {seed,router,upper,lower,listeningVersion:VERSION,preset,config,selection:{reusedIds:reused,historyAvailable:Object.keys(ledger).length>0}};
}
export const route=(form,stats)=>form.config.route==='adaptive'?(stats.total&&stats.correct/stats.total>=.7?'upper':'lower'):form.config.route;
export function feedback(attempts){const tasks={},skills={};let unanswered=0;for(const a of attempts){tasks[a.item.type]??={correct:0,total:0};a.results.forEach((r,i)=>{const skill=a.item.questions[i].questionType;skills[skill]??={correct:0,total:0};for(const group of [tasks[a.item.type],skills[skill]]){group.total++;group.correct+=Number(r.correct);}if(!r.given||r.given==='Unanswered')unanswered++;});}
 const focus=Object.entries(skills).filter(([,v])=>v.correct<v.total).sort((a,b)=>(b[1].total-b[1].correct)-(a[1].total-a[1].correct)).slice(0,3).map(([name,v])=>({name,missed:v.total-v.correct,total:v.total}));
 return {tasks,skills,unanswered,focus,model:'local-listening-accuracy-v1',notice:'Local estimated practice score only: 1 + 5 × accuracy, rounded to 0.5. The scale matches 2026 reporting; the conversion, routing and editorial levels have no ETS calibration. This is not a validated TOEFL or CEFR prediction.'};
}
