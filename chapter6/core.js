export const KEY='toefl-chapter6-v1';
export const clock=seconds=>`${Math.floor(Math.max(0,seconds)/60).toString().padStart(2,'0')}:${Math.max(0,seconds)%60<10?'0':''}${Math.max(0,seconds)%60}`;
export const budget=(stage,mode)=>mode==='chapter'?(stage.chapterSeconds??stage.seconds):stage.seconds;
export const itemCount=items=>items.reduce((n,q)=>n+(q.count||1),0);
export const SECTIONS=['Reading','Listening','Writing','Speaking'];
export function scoreSummary(scores={}){const values=SECTIONS.map(name=>scores[name]);if(!values.every(n=>typeof n==='number'&&n>=1&&n<=6&&Number.isInteger(n*2)))return null;const average=values.reduce((a,b)=>a+b,0)/4;return {average,overall:Math.round(average*2)/2};}
export function answered(q,a){return q.type==='cloze'?q.pieces.filter(p=>typeof p==='object').filter((p,i)=>String(a?.[i]||'').trim()).length:q.type==='sentence'?(a?.length?1:0):q.type==='speaking'?(a?.recorded?1:0):(String(a??'').trim()?1:0);}
export function createSession(name,mode,startStage=0){return {version:1,id:crypto.randomUUID(),name:name||'Practice',mode,stage:startStage,index:0,ready:true,startedAt:Date.now(),deadline:null,answers:{},flags:{},played:{},notes:{},completed:[],events:[],speaking:null,finishedAt:null};}
export function startStage(s,bank,now=Date.now()){s.ready=false;s.index=0;s.deadline=bank.stages[s.stage].seconds?now+budget(bank.stages[s.stage],s.mode)*1000:null;}
export function remaining(s,now=Date.now()){return s.deadline===null?null:Math.max(0,Math.ceil((s.deadline-now)/1000));}
export function advanceStage(s,bank,reason='submitted',now=Date.now()){s.completed.push({stage:s.stage,reason,at:now});s.events.push({type:reason,stage:s.stage,at:now});s.stage++;s.index=0;s.ready=true;s.deadline=null;s.speaking=null;if(s.stage>=bank.stages.length){s.finishedAt=now;s.ready=false;}}
export function canMove(q,s){return !q.media||s.played[q.media]==='complete';}
export function validateSession(s,bank){
 const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
 if(!(s&&s.version===1&&typeof s.id==='string'&&typeof s.name==='string'&&typeof s.ready==='boolean'&&['official','chapter'].includes(s.mode)&&Number.isInteger(s.stage)&&s.stage>=0&&s.stage<=bank.stages.length&&object(s.answers)&&object(s.played)&&object(s.notes)&&object(s.flags)&&Array.isArray(s.events)&&Array.isArray(s.completed)&&Number.isInteger(s.index)&&s.index>=0&&(s.stage===bank.stages.length||s.index<bank.stages[s.stage].items.length)&&(s.deadline===null||Number.isFinite(s.deadline))))return false;
 const questions=new Map(bank.stages.flatMap(st=>st.items.map(q=>[q.id,q])));
 if(s.scores!==undefined&&(!object(s.scores)||!Object.entries(s.scores).every(([name,n])=>SECTIONS.includes(name)&&typeof n==='number'&&n>=1&&n<=6&&Number.isInteger(n*2))))return false;
 return Object.entries(s.answers).every(([id,a])=>{const q=questions.get(id);if(!q)return false;if(q.type==='choice')return Number.isInteger(a)&&a>=0&&a<4;if(q.type==='cloze')return object(a)&&Object.entries(a).every(([i,v])=>/^\d$/.test(i)&&typeof v==='string'&&v.length<=20);if(q.type==='sentence')return Array.isArray(a)&&new Set(a).size===a.length&&a.every(i=>Number.isInteger(i)&&i>=0&&i<q.chunks.length);if(q.type==='essay')return typeof a==='string'&&a.length<=250000;return object(a)&&(!('recorded' in a)||typeof a.recorded==='boolean');});
}
