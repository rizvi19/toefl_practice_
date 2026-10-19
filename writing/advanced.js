import {groups} from './advanced-source.js';
import {KEY as WRITING_KEY} from './core.js?v=writing2';
export const topics=groups.map(({id,title,rule,trap})=>({id,title,rule,trap}));
export const advanced=groups.flatMap((g,group)=>g.rows.map((line,i)=>{
  const [context,prefix,chunks,suffix,analysis,extra='']=line.split('|');
  return {id:`wa-${g.id}-${String(i+1).padStart(2,'0')}`,context,prefix,chunks:chunks.split(' / ').map(t=>t.toLowerCase()),suffix,extra:extra?[extra.toLowerCase()]:[],level:i<4?'medium':'hard',topic:g.id,topicTitle:g.title,analysis,rule:g.rule,trap:g.trap,explanation:`${analysis} ${g.rule} Common trap: ${g.trap}`,bankVersion:2};
}));
export const EXPOSURE_KEY='toefl-sentence-exposure-v2';
export function readExposure(storage=globalThis.localStorage){
  // Fail closed: unreadable history must not silently start repeating old questions.
  const raw=storage.getItem(EXPOSURE_KEY);if(!raw)return {};
  const value=JSON.parse(raw);if(!value||typeof value!=='object'||Array.isArray(value)||Object.values(value).some(x=>!Number.isFinite(x?.first)))throw Error('Sentence history could not be read. Export your browser data before resetting it.');return value;
}
export function markExposure(id,storage=globalThis.localStorage,now=Date.now()){
  const seen=readExposure(storage);if(!seen[id]){seen[id]={first:now};storage.setItem(EXPOSURE_KEY,JSON.stringify(seen));}return seen;
}
export function activeWritingIds(storage=globalThis.localStorage){try{const s=JSON.parse(storage.getItem(WRITING_KEY)||'null')?.session;if(s?.tasks?.[s.stage]!=='sentence')return [];return s.form?.sentences?.filter(q=>q.bankVersion===2).map(q=>q.id)||[];}catch{return [];}}
export function eligibleQuestions({level='mixed',topic='all',exclude=[]}={},seen={}){const blocked=new Set(exclude);return advanced.filter(q=>!seen[q.id]&&!blocked.has(q.id)&&(level==='mixed'||q.level===level)&&(topic==='all'||q.topic===topic));}
export function selectQuestions(options={},seen={},count=10,random=Math.random){
  const pool=eligibleQuestions(options,seen),groupsByTopic=new Map();
  for(const q of pool){if(!groupsByTopic.has(q.topic))groupsByTopic.set(q.topic,[]);groupsByTopic.get(q.topic).push(q);}
  const mix=a=>{const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[r[i],r[j]]=[r[j],r[i]];}return r;};
  const queues=mix([...groupsByTopic.values()]).map(mix),result=[];
  // Round robin gives different grammar families before drawing a second from one family.
  while(result.length<count&&queues.some(a=>a.length))for(const queue of queues){if(queue.length&&result.length<count)result.push(queue.pop());}
  return result;
}
