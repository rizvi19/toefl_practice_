export const VERSION=1;
export const KEY='toefl-section-tests-v1';
export const NAMES={'complete-words':'Complete the Words','daily-life':'Read in Daily Life','academic-passage':'Read an Academic Passage','choose-response':'Listen and Choose a Response','conversation':'Listen to a Conversation','announcement':'Listen to an Announcement','academic-talk':'Listen to an Academic Talk'};
export const count=x=>x.type==='complete-words'?x.pieces.filter(p=>typeof p==='object').length:x.questions.length;
export const norm=v=>String(v??'').trim().toLowerCase();
export function grade(item,response={}){
  if(item.type==='complete-words')return item.pieces.filter(p=>typeof p==='object').map((p,i)=>({label:`Word ${i+1}: ${p.pre}…${p.post||''}`,given:response.blanks?.[i]||'',answer:p.answer,complete:p.pre+p.answer+(p.post||''),correct:norm(response.blanks?.[i])===norm(p.answer),explanation:p.explanation||`The complete word is ${p.pre+p.answer+(p.post||'')}.`}));
  return item.questions.map((q,i)=>({label:q.stem,given:q.options[response.choices?.[i]]||'Unanswered',answer:q.options[q.answer],correct:response.choices?.[i]===q.answer,explanation:q.explanation}));
}
export function tally(items,responses){const rows=items.flatMap(x=>grade(x,responses[x.id]));return {correct:rows.filter(x=>x.correct).length,total:rows.length};}
export function answered(item,response={}){return item.type==='complete-words'?item.pieces.filter(p=>typeof p==='object').filter((p,i)=>(response.blanks?.[i]||'').length===p.answer.length).length:item.questions.filter((q,i)=>Number.isInteger(response.choices?.[i])).length;}
// Deliberately transparent, uncalibrated training rules. These are NOT ETS rules.
export const routeFor=stats=>stats.correct/stats.total>=0.7?'upper':'lower';
export const estimatedBand=stats=>Math.max(1,Math.min(6,Math.round((1+5*stats.correct/stats.total)*2)/2));
export function rng(seed){return ()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
export function makeForm(bank,section,seed=Date.now()){
  const random=rng(seed),used=new Set(),topics=new Set();
  function pick(type,n,level='mixed',size){
    let pool=bank.filter(x=>x.type===type&&!used.has(x.id)&&(!size||count(x)===size));
    const preferred=pool.filter(x=>level==='upper'?x.difficulty==='Hard':level==='lower'?['Easy','Medium'].includes(x.difficulty):true);
    if(preferred.length>=n)pool=preferred;
    const result=[];
    for(let i=0;i<n;i++){
      const fresh=pool.filter(x=>!topics.has(x.topic||x.title));
      const available=fresh.length?fresh:pool;
      const item=available[Math.floor(random()*available.length)];
      if(!item)throw Error(`Insufficient bank: ${type}`);
      used.add(item.id);topics.add(item.topic||item.title);pool=pool.filter(x=>x.id!==item.id);result.push(item);
    }return result;
  }
  let router,upper,lower;
  if(section==='Reading'){
    router=[...pick('complete-words',2),...pick('daily-life',2,'mixed',2),...pick('daily-life',2,'mixed',3),...pick('academic-passage',1)];
    upper=[...pick('complete-words',1,'upper'),...pick('academic-passage',1,'upper')];
    lower=[...pick('complete-words',1,'lower'),...pick('daily-life',1,'lower',2),...pick('daily-life',1,'lower',3)];
  }else if(section==='Listening'){
    router=[...pick('choose-response',10),...pick('conversation',3),...pick('announcement',4),...pick('academic-talk',2)];
    upper=[...pick('choose-response',5,'upper'),...pick('conversation',2,'upper'),...pick('announcement',1,'upper'),...pick('academic-talk',1,'upper')];
    lower=[...pick('choose-response',9,'lower'),...pick('conversation',2,'lower'),...pick('announcement',1,'lower')];
  }else throw Error('Unsupported section');
  return {seed,router,upper,lower};
}
// A stimulus is kept intact; academic Reading and all Listening MCQs appear one at a time.
export function screens(items,section){let offset=0;return items.flatMap(item=>{const base=offset;offset+=count(item);if(item.type==='complete-words'||(section==='Reading'&&item.type==='daily-life'))return [{id:item.id,item,indices:null,start:base+1,end:offset}];return item.questions.map((q,i)=>({id:`${item.id}:${i}`,item,indices:[i],start:base+i+1,end:base+i+1}));});}
export function budgets(section,minutes){const total=Math.round(minutes*60);const first=Math.round(total*(section==='Reading'?21/30:18/29));return {first,upper:total-first,lower:section==='Reading'?total-first:Math.round((total-first)*7/11)};}
export function newSession(bank,section,minutes,seed=Date.now(),now=Date.now()){
  if(!Number.isFinite(minutes)||minutes<2||minutes>120)throw Error('Choose 2–120 minutes.');
  const form=makeForm(bank,section,seed),time=budgets(section,minutes);
  return {version:VERSION,id:crypto.randomUUID(),section,minutes,form,time,module:1,index:0,route:null,responses:{},flags:{},audio:{},startedAt:now,deadline:now+time.first*1000,expired:[],transition:false};
}
export const moduleItems=s=>s.module===1?s.form.router:s.form[s.route];
export const remaining=(s,now=Date.now())=>Math.max(0,Math.ceil((s.deadline-now)/1000));
export const clock=n=>`${Math.floor(n/60).toString().padStart(2,'0')}:${(n%60).toString().padStart(2,'0')}`;
export function go(s,index){const list=screens(moduleItems(s),s.section);if(index<0||index>=list.length)return s;if(s.section==='Listening'){
  const screen=list[s.index];if(index!==s.index+1||s.audio[screen.item.id]!=='complete')return s;
}return {...s,index};}
export function respond(s,itemId,response){if(s.transition||remaining(s)===0)return s;const list=screens(moduleItems(s),s.section),current=list[s.index];if(current.item.id!==itemId)return s;if(s.section==='Listening'){
  if(s.audio[itemId]!=='complete')return s;
  const old=s.responses[itemId]||{},choices={...old.choices};
  for(const i of current.indices)if(Number.isInteger(response.choices?.[i]))choices[i]=response.choices[i];
  response={...old,choices};
}return {...s,responses:{...s.responses,[itemId]:response}};}
export function moveModule(s,now=Date.now(),expired=false){if(s.module!==1)return s;const route=routeFor(tally(s.form.router,s.responses));return {...s,module:2,route,index:0,deadline:now+s.time[route]*1000,transition:true,expired:expired?[...s.expired,1]:s.expired};}
export function report(s,reason='completed',now=Date.now()){
  const items=[...s.form.router,...(s.route?s.form[s.route]:[])],stats=tally(items,s.responses);
  return {version:VERSION,id:s.id,section:s.section,startedAt:s.startedAt,finishedAt:now,minutes:s.minutes,seed:s.form.seed,reason,route:s.route,expired:s.expired,stats,estimate:reason==='abandoned'?null:estimatedBand(stats),modules:[tally(s.form.router,s.responses),s.route?tally(s.form[s.route],s.responses):null],attempts:items.map(item=>({item,response:s.responses[item.id]||{},results:grade(item,s.responses[item.id])}))};
}
