import {makeForm as makeListeningForm,route as listeningRoute,feedback as listeningFeedback} from '../listening/engine.js';
import {VERSION as LISTENING_VERSION} from '../listening/constants.js';
import {makeReadingForm,readingRoute,feedback,READING_VERSION} from '../reading/engine.js';
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
export function makeForm(bank,section,seed=Date.now(),options={}){
  if(section==='Reading')return makeReadingForm(bank,seed,options);
  if(section==='Listening')return makeListeningForm(bank,seed,options);
  throw Error('Unsupported section');
}
// A stimulus is kept intact; academic Reading and all Listening MCQs appear one at a time.
export function screens(items,section){let offset=0;return items.flatMap(item=>{const base=offset;offset+=count(item);if(item.type==='complete-words'||(section==='Reading'&&item.type==='daily-life'))return [{id:item.id,item,indices:null,start:base+1,end:offset}];return item.questions.map((q,i)=>({id:`${item.id}:${i}`,item,indices:[i],start:base+i+1,end:base+i+1}));});}
export function budgets(section,minutes){const total=Math.round(minutes*60);const first=Math.round(total*(section==='Reading'?21/30:18/29));return {first,upper:total-first,lower:section==='Reading'?total-first:Math.round((total-first)*7/11)};}
export function newSession(bank,section,minutes,seed=Date.now(),now=Date.now(),options={}){
  if(!Number.isFinite(minutes)||minutes<2||minutes>120)throw Error('Choose 2–120 minutes.');
  const form=makeForm(bank,section,seed,options),time=budgets(section,minutes);
  if(options.firstMinutes!==undefined){const first=Number(options.firstMinutes);if(!Number.isFinite(first)||first<=0||first>=minutes)throw Error('Module 1 time must be greater than zero and less than section time.');time.first=Math.round(first*60);time.upper=Math.round(minutes*60)-time.first;time.lower=section==='Reading'?time.upper:Math.round(time.upper*7/11);}
  return {version:VERSION,id:crypto.randomUUID(),section,minutes,form,time,module:1,index:0,route:null,responses:{},flags:{},audio:{},startedAt:now,deadline:now+time.first*1000,expired:[],transition:false};
}
export const moduleItems=s=>s.module===1?s.form.router:s.form[s.route];
export const remaining=(s,now=Date.now())=>Math.max(0,Math.ceil((s.deadline-now)/1000));
export const clock=n=>`${Math.floor(n/60).toString().padStart(2,'0')}:${(n%60).toString().padStart(2,'0')}`;
export function canAdvanceListening(s){if(s.section!=='Listening')return true;const current=screens(moduleItems(s),s.section)[s.index];if(s.audio[current.item.id]!=='complete')return false;if(s.form.listeningVersion!==LISTENING_VERSION)return true;return current.indices.every(i=>Number.isInteger(s.responses[current.item.id]?.choices?.[i])&&s.responses[current.item.id].choices[i]>=0&&s.responses[current.item.id].choices[i]<4);}
export function go(s,index){const list=screens(moduleItems(s),s.section);if(index<0||index>=list.length)return s;if(s.section==='Listening'){
  const screen=list[s.index];if(index!==s.index+1||!canAdvanceListening(s))return s;
}return {...s,index};}
export function respond(s,itemId,response){if(s.transition||remaining(s)===0)return s;const list=screens(moduleItems(s),s.section),current=list[s.index];if(current.item.id!==itemId)return s;if(s.section==='Listening'){
  if(s.audio[itemId]!=='complete')return s;
  const old=s.responses[itemId]||{},choices={...old.choices};
  for(const i of current.indices)if(Number.isInteger(response.choices?.[i]))choices[i]=response.choices[i];
  response={...old,choices};
}return {...s,responses:{...s.responses,[itemId]:response}};}
export function moveModule(s,now=Date.now(),expired=false){if(s.module!==1)return s;const stats=tally(s.form.router,s.responses),route=s.section==='Reading'&&s.form.readingVersion===READING_VERSION?readingRoute(s.form,stats):s.section==='Listening'&&s.form.listeningVersion===LISTENING_VERSION?listeningRoute(s.form,stats):routeFor(stats);return {...s,module:2,route,index:0,deadline:now+s.time[route]*1000,transition:true,expired:expired?[...s.expired,1]:s.expired};}
export function report(s,reason='completed',now=Date.now()){
  const items=[...s.form.router,...(s.route?s.form[s.route]:[])],stats=tally(items,s.responses);
  const attempts=items.map(item=>({item,response:s.responses[item.id]||{},results:grade(item,s.responses[item.id])}));
  const result={version:VERSION,id:s.id,section:s.section,startedAt:s.startedAt,finishedAt:now,minutes:s.minutes,seed:s.form.seed,reason,route:s.route,expired:s.expired,stats,estimate:reason==='abandoned'?null:estimatedBand(stats),modules:[tally(s.form.router,s.responses),s.route?tally(s.form[s.route],s.responses):null],attempts};
  if(s.section==='Reading'&&s.form.readingVersion===READING_VERSION){result.readingVersion=READING_VERSION;result.preset=s.form.preset;result.config=s.form.config;result.seenIds=Object.keys(s.seen||{});result.feedback=feedback(attempts);result.selection={...s.form.selection,reusedIds:s.form.selection.reusedIds.filter(id=>items.some(x=>x.id===id))};if(!s.route)result.estimate=null;}
  if(s.section==='Listening'&&s.form.listeningVersion===LISTENING_VERSION){result.listeningVersion=LISTENING_VERSION;result.preset=s.form.preset;result.config=s.form.config;result.seenIds=Object.keys(s.heard||{});result.feedback=listeningFeedback(attempts);result.selection={...s.form.selection,reusedIds:s.form.selection.reusedIds.filter(id=>items.some(x=>x.id===id))};if(!s.route)result.estimate=null;}
  return result;
}
