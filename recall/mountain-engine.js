// @ts-check
import {random,DIRECTIONS,advanceStudy as advanceBase,newCard,normalize} from './engine.js';
export {normalize,checkRecall,checkSentence,distance,promptFor,metrics,newCard,shuffle,random,DIRECTIONS} from './engine.js';
/** @typedef {import('./types.js').LearningItem} LearningItem */
/** @typedef {import('./types.js').CardState} CardState */
/** @typedef {import('./types.js').Settings} Settings */
/** @typedef {import('./types.js').StudySession} StudySession */
/** @typedef {import('./types.js').RecallEvent} RecallEvent */
/** @param {LearningItem[]} bank @param {number} groupSize @param {string} kind */
export function groupsFor(bank,groupSize=20,kind='all'){const pool=bank.filter(q=>kind==='words'?q.itemType==='word':kind==='expressions'?q.itemType!=='word':true),groups=[];for(let i=0;i<pool.length;i+=groupSize)groups.push({number:groups.length+1,items:pool.slice(i,i+groupSize)});return groups;}
/** @param {CardState|undefined} s */
export function weight(s){let w=!s?.seen?7:s.lastGrade===0?12:s.lastGrade===1?5:s.lapses&&s.streak<3?Math.max(2,7-s.streak*2):1;if(s?.favorite)w*=1.25;if(s?.deprioritized)w*=.35;return w;}
/** @param {CardState|undefined} s */
export function status(s){if(!s?.seen)return 'Unread';if(s.lastGrade===0||s.lapses&&!s.recovering)return 'Needs repair';if(s.retrieve>=3&&s.use>=1&&s.streak>=3&&(s.retrievalContexts?.length||0)>=2)return 'Consistent';return s.recovering?'Recovering':'Learning';}
/** @param {CardState|undefined} s */
export const ready=s=>Boolean(s&&s.retrieve>=2&&s.use>=1&&(s.retrievalContexts?.length||0)>=2&&s.streak>=2&&(!s.lapses||s.recovering));
/** @param {LearningItem[]} bank @param {Record<string,CardState>} cards @param {Settings} settings @param {number} now @param {{filter?:string,direction?:string,ids?:string[],limit?:number,fullPool?:boolean,seed?:string}} options @returns {StudySession} */
export function createStudy(bank,cards,settings,now=Date.now(),options={}){
 const kind=settings.mountainKind||'all',groups=groupsFor(bank,settings.groupSize||20,kind),summit=Math.max(1,Math.min(groups.length,settings.mountainLevels?.[kind]||1)),filter=options.filter||'mountain';let pool;
 if(options.ids)pool=bank.filter(q=>options.ids.includes(q.id));
 else if(filter==='mountain')pool=groups.slice(0,summit).flatMap(g=>g.items);
 else pool=bank.filter(q=>filter==='unread'?!cards[q.id]?.seen:filter==='difficult'?status(cards[q.id])==='Needs repair':filter==='original'?q.original:filter==='words'?q.itemType==='word':filter==='expressions'?q.itemType!=='word':filter==='favorite'?cards[q.id]?.favorite:true);
 const rng=random(options.seed||crypto.randomUUID()),ordered=pool.map(item=>({item,score:-Math.log(Math.max(.000001,rng()))/weight(cards[item.id])})).sort((a,b)=>a.score-b.score).map(x=>x.item);
 const selected=ordered.slice(0,options.fullPool?ordered.length:options.limit||settings.roundSize||20),queue=selected.map((item,i)=>({id:item.id,direction:DIRECTIONS.includes(/** @type {any} */(options.direction))?/** @type {import('./types.js').Direction} */(options.direction):DIRECTIONS[i%6],context:'prompt-'+(options.direction||DIRECTIONS[i%6]),repeat:false}));
 return {id:crypto.randomUUID(),version:1,queue,pending:[],index:0,history:[],attempts:{},max:queue.length+Math.floor(queue.length*2/3),finished:queue.length===0,startedAt:now,revealed:false,cardStarted:now,typed:'',feedback:null,mountain:filter==='mountain'?{kind,summit,groupSize:settings.groupSize||20,poolSize:pool.length,fullPool:Boolean(options.fullPool)}:null};
}
/** @param {StudySession} s @param {number} grade @param {number} now */
export function advanceStudy(s,grade,now=Date.now()){advanceBase(s,grade,now);}
/** @param {CardState|undefined} previous @param {RecallEvent} event @param {string} _timezone @returns {CardState} */
export function applyReview(previous,event,_timezone='Asia/Dhaka'){
 const s=structuredClone(previous||newCard(event.itemId));s.seen++;s.lastAt=event.at;s.lastGrade=event.grade;s.due=0;s.latencies=[...s.latencies,event.latency].slice(-30);
 if(event.grade===0){s.lapses++;s.streak=0;s.repairContexts=[];s.recovering=false;}
 else if(event.grade===1)s.streak=0;
 else{s.streak++;if(event.evidence!=='repair'){s[event.evidence]++;s.successContexts=[...new Set([...s.successContexts,event.context])];}if(event.evidence==='retrieve')s.retrievalContexts=[...new Set([...(s.retrievalContexts||[]),event.context])];if(s.lapses&&event.evidence==='retrieve'){s.repairContexts=[...new Set([...s.repairContexts,event.context])];s.recovering=s.repairContexts.length>=2;}}
 return s;
}
/** @param {StudySession} session @param {Settings} settings @param {LearningItem[]} bank */
export function completeRound(session,settings,bank){const m=session.mountain;if(!session.finished||!m?.fullPool)return false;settings.completedLevels??={};settings.completedLevels[m.kind]=[...new Set([...(settings.completedLevels[m.kind]||[]),m.summit])];const count=groupsFor(bank,m.groupSize,m.kind).length;settings.mountainLevels??={};settings.mountainLevels[m.kind]=Math.min(count,m.summit+1);return true;}
