// @ts-check
/** @typedef {import('./types.js').LearningItem} LearningItem */
/** @typedef {import('./types.js').CardState} CardState */
/** @typedef {import('./types.js').Settings} Settings */
/** @typedef {import('./types.js').StudySession} StudySession */
/** @typedef {import('./types.js').QueueEntry} QueueEntry */
/** @typedef {import('./types.js').RecallEvent} RecallEvent */
export const DIRECTIONS=/** @type {const} */(['situation','meaning','cloze','register','error','transfer']);
/** @param {unknown} value */
export const normalize=value=>String(value??'').normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/[‐‑–]/g,'-').replace(/\bi'm\b/g,'i am').replace(/\bi’d\b/g,'i would').replace(/\bi'd\b/g,'i would').replace(/\bthat's\b/g,'that is').replace(/\blet's\b/g,'let us').replace(/[.…!?;,"“”]/g,'').replace(/\s+/g,' ').trim();
/** @param {string} id @returns {CardState} */
export const newCard=id=>({id,seen:0,lapses:0,streak:0,due:0,recognize:0,retrieve:0,use:0,successContexts:[],repairContexts:[],recovering:false,latencies:[],lastAt:0,favorite:false,deprioritized:false});
/** @param {string} seed */
export function random(seed){let x=2166136261;for(const c of seed)x=Math.imul(x^c.charCodeAt(0),16777619);return ()=>{x+=0x6D2B79F5;let t=x;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
/** @template T @param {T[]} values @param {string} seed @returns {T[]} */
export function shuffle(values,seed){const out=[...values],rng=random(seed);for(let i=out.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
/** @param {StudySession} s @param {number} grade @param {number} now */
export function advanceStudy(s,grade,now=Date.now()){
 if(s.finished)return;const current=s.queue[s.index];
 for(const pending of s.pending){pending.afterIds??=[];if(pending.id!==current.id&&!pending.afterIds.includes(current.id))pending.afterIds.push(current.id);}
 s.history.push(current.id);s.attempts[current.id]=(s.attempts[current.id]||0)+1;
 if(grade<=1&&s.attempts[current.id]<3&&s.queue.length+s.pending.length<s.max){const rng=random(s.id+current.id+s.attempts[current.id]);s.pending.push({id:current.id,direction:current.direction==='situation'?'cloze':'situation',context:'repair-'+s.attempts[current.id]+'-'+(current.direction==='situation'?'cloze':'situation'),repeat:true,afterIds:[],wait:3+Math.floor(rng()*3)});}
 s.index++;
 const eligible=s.pending.findIndex(p=>(p.afterIds?.length||0)>=(p.wait||3));
 if(eligible>=0){const [repair]=s.pending.splice(eligible,1);s.queue.splice(s.index,0,repair);}
 s.finished=s.index>=s.queue.length;delete s.answerLatency;delete s.promptedRetry;s.revealed=false;s.typed='';s.feedback=null;s.cardStarted=now;
}
/** @param {string} a @param {string} b */
export function distance(a,b){const row=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let previous=row[0];row[0]=i;for(let j=1;j<=b.length;j++){const old=row[j];row[j]=Math.min(row[j]+1,row[j-1]+1,previous+(a[i-1]===b[j-1]?0:1));previous=old;}}return row[b.length];}
/** @param {LearningItem} item @param {string} text @param {string} direction */
export function checkRecall(item,text,direction='situation'){
 const answer=normalize(text),targets=(direction==='cloze'?[item.clozeAnswer]:direction==='error'?[item.errorAnswer||item.goodExample]:item.acceptedForms).map(normalize);
 if(targets.includes(answer))return {correct:true,kind:'correct',message:'Target recalled. Check the word partners, then rate how easily it came to mind.'};
 const near=targets.map(t=>({t,d:distance(answer,t)})).sort((a,b)=>a.d-b.d)[0];
 if(answer&&near.d<=Math.max(1,Math.floor(near.t.length*.12)))return {correct:false,kind:'form',message:`Close, but the form needs repair. Compare with “${direction==='cloze'?item.clozeAnswer:item.canonicalForm}”.`};
 const synonyms={V12:['extremely valuable','very valuable','priceless'],V10:['helpful','favorable','favourable'],V06:['able to recover','tough'],V01:['helpful','useful'],V14:['satisfaction'],C03:['compare the advantages and disadvantages'],C01:['without thinking','without preparation']}[item.id]||[];
 if(synonyms.includes(answer))return {correct:false,kind:'synonym',message:'Communicatively appropriate, but not the target phrase. Keep the target due and recall its exact form.'};
 return {correct:false,kind:answer?'recall':'blank',message:answer?'Not the target form. Compare the answer and repair the phrase. A different valid synonym may communicate your meaning, but is not automatically graded as target recall.':'No answer entered. Reveal the target or try a response first.'};
}
/** @param {LearningItem} item @param {string} text @param {string} context */
export function checkSentence(item,text,context){
 const n=normalize(text),words=n.split(/\s+/).filter(Boolean),issues=[],notes=[];
 const bad=[[/\bconducive\s+(?:for|in|at)\b/i,'Use conducive to + noun/-ing.'],[/\bimpact\s+(?:in|at|to)\b/i,'For the noun pattern, use an impact on something.'],[/\brole\s+on\b/i,'Use play a role in + noun/-ing.'],[/\badvantage\s+(?:from|in|on)\b/i,'Use take advantage of + opportunity.'],[/\bcontribute[sd]?\s+(?:for|in)\b/i,'Use contribute to + noun/-ing.'],[/\binterested\s+(?:on|at)\b/i,'Use interested in.'],[/\bcapable\s+(?:to|for)\b/i,'Use capable of + noun/-ing.'],[/\bdiscuss(?:ed|ing)?\s+about\b/i,'Discuss a topic, without about.'],[/\b(?:informations|feedbacks)\b/i,'Information and feedback are uncountable.'],[/\bdespite\s+of\b/i,'Use despite + noun/-ing, without of.'],[/\bappreciate\s+if\b/i,'Use I would appreciate it if.'],[/\bprioriti[sz]e\s+on\b/i,'Prioritize takes a direct object.'],[/\bbetween\b[^.!?]{1,70}\bto\b/i,'Check the pair: between A and B.'],[/\bprevent\w*\s+(?:me|him|her|them|us|someone)\s+to\b/i,'Prevent someone from + -ing.']];
 for(const [pattern,message] of bad)if(/** @type {RegExp} */(pattern).test(text))issues.push(/** @type {string} */(message));
 const phrasePresent=item.acceptedForms.some(form=>{const f=normalize(form);return f&&!f.includes(' / ')&&!f.includes(' x ')&&(' '+n+' ').includes(' '+f+' ');});
 // Object-insertion variants: take travel time into account; bridge the gap between A and B.
 const inserted=item.id==='B01'?/\btak(?:e|es|ing)|\btook/.test(n)&&/\binto account\b/.test(n):item.id==='C05'?/\bbridg(?:e|es|ed|ing) the gap between\b/.test(n)&&/\band\b/.test(n):normalize(item.canonicalForm)==='put into practice'?/\bput(?:s|ting)?(?: [a-z]+){1,8} into practice\b/.test(n):normalize(item.canonicalForm)==='not only but also'?/\bnot only\b.+\bbut also\b/.test(n):false;
 if(!phrasePresent&&!inserted)issues.push('The target or an explicit accepted form was not found. Check spelling and word order.');
 if(['C05','C10'].includes(item.id)&&(phrasePresent||inserted)&&!/\bbetween\b.+\band\b/i.test(text))issues.push('For this pattern practice, name both sides: between A and B.');
 if(words.length<7)issues.push('Add a complete idea with a specific detail, rather than only a word group.');
 if([item.goodExample,...item.sourceRefs.map(r=>r.example)].some(ex=>normalize(ex)===n))issues.push('This repeats the supplied example. Create a new situation to show transfer.');
 if((['C01','C02'].includes(item.id)&&context!=='interview')||(item.register==='email'&&context!=='email'))issues.push('Check register: this expression is primarily '+(item.register==='spoken'?'conversational. Use a less casual alternative here.':'an email/request phrase. Choose an appropriate communicative situation.'));
 if(context==='interview'&&['C06','C18','B12'].includes(item.id))notes.push('This wording is formal. In a short personal answer, consider a simpler alternative if it sounds forced.');
 if(/\bresearch (?:shows|proves|suggests)|\bstudies (?:show|prove|suggest)|\d+%/i.test(text))notes.push('Identify a real source for a research/statistical claim, or frame it as your own observation.');
 return {passed:issues.length===0,issues,notes,disclaimer:'Limited form and register checks only. They cannot fully judge grammar, meaning or naturalness. Confirm those yourself or request feedback.'};
}
/** @param {LearningItem} item @param {QueueEntry} entry */
export function promptFor(item,entry){switch(entry.direction){case 'meaning':return 'Which expression means: '+item.meaning+'?';case 'cloze':return item.clozeSentence;case 'register':return `Choose the best register for this expression: “${item.canonicalForm}”.`;case 'error':return 'Repair this '+item.wrongExampleKind+': '+item.wrongExample;case 'transfer':return item.transferPrompt;default:return entry.repeat?'New context: '+item.transferPrompt+' First recall the target expression.':item.scenarioPrompt;}}
/** @param {RecallEvent[]} events */
export function metrics(events){const types={};for(const e of events)if(e.errorType)types[e.errorType]=(types[e.errorType]||0)+1;const contexts={};for(const e of events){const key=e.mode||'flashcards';const c=contexts[key]||{good:0,total:0};c.total++;if(e.grade>=2)c.good++;contexts[key]=c;}return {errors:types,contexts};}
