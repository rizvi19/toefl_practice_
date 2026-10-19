import {gradeSentence} from './core.js?v=writing2';

// The encounter ledger outlives the recent timed-test reports. Keep every seen
// question visible even when its older score is no longer in those reports.
export function practicedQuestions(bank,seen,results=[],timed=[]){
  const attempts=new Map();
  const add=(id,attempt)=>{if(!attempts.has(id))attempts.set(id,[]);attempts.get(id).push(attempt);};
  for(const r of results)if(r.q?.id&&Number.isFinite(r.checkedAt))add(r.q.id,{...r,source:'focused'});
  for(const s of timed){
    const at=s.timing?.sentence?.finishedAt;
    if(!Number.isFinite(at))continue;
    for(const q of s.form?.sentences||[])if(seen[q.id])add(q.id,{q,answer:s.responses?.sentence?.[q.id]||[],correct:Boolean(gradeSentence(q,s.responses?.sentence?.[q.id])),checkedAt:at,source:'timed'});
  }
  return bank.flatMap((q,i)=>{
    if(!seen[q.id])return [];
    const checked=(attempts.get(q.id)||[]).sort((a,b)=>b.checkedAt-a.checkedAt),latest=checked[0]||null;
    return [{q,number:i+1,firstSeen:seen[q.id].first,latest,attempts:checked.length,status:latest?(latest.correct?'correct':'incorrect'):'unchecked'}];
  }).sort((a,b)=>Math.max(b.firstSeen,b.latest?.checkedAt||0)-Math.max(a.firstSeen,a.latest?.checkedAt||0)||a.number-b.number);
}

export function filterPracticed(entries,{search='',status='all'}={}){
  const needle=search.trim().toLowerCase();
  return entries.filter(e=>(status==='all'||e.status===status)&&(!needle||`${e.number} ${e.q.context} ${e.q.topicTitle} ${e.q.level}`.toLowerCase().includes(needle)));
}
