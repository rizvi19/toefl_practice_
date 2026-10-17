import {TYPES,COUNTS,words,VERSION} from './authoring.mjs';
export const normalize=s=>s.replace(/^(?:Woman|Man|Student|Professor|Librarian|Coordinator|Staff member):\s*/gm,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
export const shingles=s=>{const a=normalize(s).split(' ');return new Set(a.slice(0,-4).map((_,i)=>a.slice(i,i+5).join(' ')));};
export const similarity=(a,b)=>{const n=[...a].filter(x=>b.has(x)).length;return n/(a.size+b.size-n||1);};
export function validate(items){const errors=[],ids=new Set(),scripts=new Map(),signatures=new Map(),optionSets=new Map(),optionText=new Map(),sets=[];const fail=(id,s)=>errors.push(`${id}: ${s}`);
 for(const x of items){
  if(ids.has(x.id))fail(x.id,'duplicate ID');ids.add(x.id);
  if(!TYPES.includes(x.type)||x.listeningVersion!==VERSION||!x.family||!['intermediate','advanced'].includes(x.level))fail(x.id,'invalid type/version/family/level');
  const text=normalize(x.script);if(scripts.has(text))fail(x.id,`duplicate script of ${scripts.get(text)}`);scripts.set(text,x.id);sets.push([x,shingles(x.script)]);
  const range=x.type==='choose-response'?[3,23]:x.type==='academic-talk'?[145,250]:x.type==='announcement'?[40,85]:[45,100];const n=words(x.script);if(n<range[0]||n>range[1])fail(x.id,`script length ${n} outside ${range}`);
  if(x.questions?.length!==COUNTS[x.type])fail(x.id,'wrong task question count');
  if(x.type==='conversation'&&!x.audio){const turns=x.script.split('\n');if(turns.some(s=>! /^(Woman|Man): .+/.test(s))||!turns.some(s=>s.startsWith('Woman:'))||!turns.some(s=>s.startsWith('Man:')))fail(x.id,'requires two supported speaker roles');}
  for(const q of x.questions||[]){
   if(typeof q.stem!=='string'||!q.stem.trim()||!['Response Appropriateness','Main Idea','Factual','Inference','Purpose','Method','Attitude'].includes(q.questionType))fail(x.id,'invalid question stem/type');
   if(q.options?.length!==4||new Set(q.options.map(normalize)).size!==4)fail(x.id,'four distinct options required');
   for(const option of q.options||[]){const key=normalize(option);if(optionText.has(key))fail(x.id,`repeated option text of ${optionText.get(key)}`);optionText.set(key,x.id);}
   if(!Number.isInteger(q.answer)||q.answer<0||q.answer>3)fail(x.id,'invalid answer key');
   if(!q.evidence||!x.script.includes(q.evidence))fail(x.id,`evidence absent: ${q.stem}`);
   if(q.rationales?.length!==4||q.rationales.some(r=>typeof r!=='string'||r.length<12))fail(x.id,'each option needs a specific rationale');
   if(!q.explanation?.includes(q.evidence))fail(x.id,'answer review must include exact script evidence');
   const optionSet=q.options.map(normalize).sort().join('|');if(optionSets.has(optionSet))fail(x.id,`repeated complete option set of ${optionSets.get(optionSet)}`);optionSets.set(optionSet,x.id);
   const signature=normalize(q.stem)+'|'+optionSet;if(signatures.has(signature))fail(x.id,`duplicate question/options of ${signatures.get(signature)}`);signatures.set(signature,x.id);
  }
 }
 for(let i=0;i<sets.length;i++)for(let j=i+1;j<sets.length;j++){const [a,sa]=sets[i],[b,sb]=sets[j];if(Math.min(words(a.script),words(b.script))>=30&&similarity(sa,sb)>=.28)fail(b.id,`near duplicate script of ${a.id}`);}
 return errors;
}
