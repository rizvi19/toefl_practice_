export const READING_VERSION='reading-2026-v2';
export const EXPOSURE_KEY='toefl-reading-exposure-v2';
export const VARIANTS=['complete-words','short','text-chain','long','academic'];
const layout=(c,s,l,t,a)=>({'complete-words':c,short:s,long:l,'text-chain':t,academic:a});
export const PRESETS={
  adaptive:{name:'Adaptive · 50 items',level:'mixed',route:'adaptive',router:layout(2,2,1,1,1),upper:layout(1,0,0,0,1),lower:layout(1,1,1,0,0)},
  'advanced-1':{name:'Advanced 1 · screenshot layout',level:'advanced',route:'upper',router:layout(2,1,1,1,1),upper:layout(1,0,0,0,1),lower:layout(1,1,1,0,0)},
  'advanced-2':{name:'Advanced 2 · screenshot layout',level:'advanced',route:'upper',router:layout(1,1,1,0,1),upper:layout(1,0,0,0,1),lower:layout(1,1,1,0,0)},
  'advanced-3':{name:'Advanced 3 · screenshot layout',level:'advanced',route:'upper',router:layout(1,1,1,1,1),upper:layout(1,0,0,0,1),lower:layout(1,1,1,0,0)},
  'intermediate-1':{name:'Intermediate 1 · screenshot layout',level:'intermediate',route:'lower',router:layout(2,1,1,0,1),upper:layout(1,0,0,0,1),lower:layout(1,1,1,0,0)},
  'intermediate-2':{name:'Intermediate 2 · screenshot layout',level:'intermediate',route:'lower',router:layout(1,1,2,0,1),upper:layout(1,0,0,0,1),lower:layout(1,1,1,0,0)}
};
export const variantOf=x=>x.type==='daily-life'?x.variant:x.type==='academic-passage'?'academic':'complete-words';
const weights={'complete-words':10,short:2,long:3,'text-chain':3,academic:5};
export const layoutCount=l=>VARIANTS.reduce((n,v)=>n+(l[v]||0)*weights[v],0);
export function validateConfig(config){
  if(!['mixed','intermediate','advanced'].includes(config.level)||!['adaptive','upper','lower'].includes(config.route))throw Error('Invalid Reading level or route.');
  for(const name of ['router','upper','lower']){
    const l=config[name];if(!l||VARIANTS.some(v=>!Number.isInteger(l[v])||l[v]<0||l[v]>4))throw Error('Choose 0–4 activities per task and module.');
    const n=layoutCount(l);if(n<5||n>60)throw Error('Each module must contain 5–60 items.');
  }return config;
}
export function randomFor(seed){return ()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
export function shuffle(array,random){const copy=[...array];for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
export function shuffleOptions(item,random){
  if(!item.questions)return structuredClone(item);
  return {...structuredClone(item),questions:item.questions.map(q=>{const order=shuffle([0,1,2,3],random);return {...q,options:order.map(i=>q.options[i]),answer:order.indexOf(q.answer)};})};
}
// Never drop old exposure entries when the short recent-results list is trimmed.
export function mergeHistory(exposures={},history=[]){const ledger={};for(const [id,e] of Object.entries(exposures||{}))if(id.startsWith('r2-')&&Number.isInteger(e?.count)&&e.count>0&&Number.isFinite(e.lastSeen)&&e.lastSeen>=0)ledger[id]={count:e.count,lastSeen:e.lastSeen};for(const r of history)for(const a of r.attempts||[]){const x=a.item;if(!x?.id?.startsWith('r2-'))continue;const viewed=Array.isArray(r.seenIds)?r.seenIds.includes(x.id):a.results?.some(y=>y.given&&y.given!=='Unanswered');if(!viewed)continue;const prev=ledger[x.id];if(!prev)ledger[x.id]={count:1,lastSeen:r.finishedAt||r.startedAt||0};}return ledger;}
export function markSeen(ledger,item,now){const prev=ledger[item.id]||{count:0,lastSeen:0};return {...ledger,[item.id]:{count:prev.count+1,lastSeen:now}};}
export function makeReadingForm(bank,seed=Date.now(),options={}){
  const preset=options.preset||'adaptive';if(!PRESETS[preset]&&preset!=='custom')throw Error('Unknown Reading preset.');
  const config=validateConfig(structuredClone(options.config||PRESETS[preset]));
  const random=randomFor(seed),used=new Set(),families=new Set(),ledger=mergeHistory(options.exposures,options.history),reused=[];
  function select(module,level){const out=[];for(const variant of VARIANTS)for(let i=0;i<module[variant];i++){
    let pool=bank.filter(x=>x.id.startsWith('r2-')&&variantOf(x)===variant&&!used.has(x.id)&&!families.has(x.family)&&(level==='mixed'||x.level===level));
    if(!pool.length)throw Error(`Insufficient distinct ${level} ${variant} activities for this structure.`);
    const min=Math.min(...pool.map(x=>ledger[x.id]?.count||0));pool=pool.filter(x=>(ledger[x.id]?.count||0)===min);
    // An unseen pool is random; once exhausted, start with the least recently seen.
    if(min>0){const oldest=Math.min(...pool.map(x=>ledger[x.id]?.lastSeen||0));pool=pool.filter(x=>(ledger[x.id]?.lastSeen||0)===oldest);}
    const item=pool[Math.floor(random()*pool.length)];used.add(item.id);families.add(item.family);if(min>0)reused.push(item.id);out.push(shuffleOptions(item,random));
  }return out;}
  const router=select(config.router,config.level),upper=select(config.upper,config.level==='mixed'?'advanced':config.level),lower=select(config.lower,config.level==='mixed'?'intermediate':config.level);
  return {seed,router,upper,lower,readingVersion:READING_VERSION,preset,config,selection:{reusedIds:reused,historyAvailable:Object.keys(ledger).length>0}};
}
export const readingRoute=(form,stats)=>form.config.route==='adaptive'?(stats.total&&stats.correct/stats.total>=0.7?'upper':'lower'):form.config.route;
export function feedback(attempts){
  const tasks={},skills={};let unanswered=0;
  for(const a of attempts){const task=variantOf(a.item);tasks[task]??={correct:0,total:0};a.results.forEach((r,i)=>{
    tasks[task].total++;tasks[task].correct+=Number(r.correct);
    const skill=a.item.questions?.[i]?.questionType||'Word form and context';skills[skill]??={correct:0,total:0};skills[skill].total++;skills[skill].correct+=Number(r.correct);
    if(!r.given||r.given==='Unanswered')unanswered++;
  });}
  const focus=Object.entries(skills).filter(([,s])=>s.correct<s.total).sort((a,b)=>(b[1].total-b[1].correct)-(a[1].total-a[1].correct)).slice(0,3).map(([name,s])=>({name,missed:s.total-s.correct,total:s.total}));
  return {tasks,skills,unanswered,focus,model:'local-accuracy-v1',notice:'Local estimated practice score: 1 + 5 × accuracy, rounded to 0.5. No ETS item calibration, equating, unscored items, or validated prediction. Do not infer CEFR or admission readiness.'};
}
