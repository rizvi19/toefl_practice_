export const wordCount=s=>(s.replace(/\[[A-D]\]/g,'').match(/\b[A-Za-z]+(?:['’-][A-Za-z]+)*\b/g)||[]).length;
export const fullText=x=>x.pieces?x.pieces.map(p=>typeof p==='string'?p:p.pre+p.answer+(p.post||'')).join(''):x.passage;
// A reproducible editorial rubric, not CEFR or psychometric calibration.
export function complexity(x){const text=fullText(x).replace(/\[[A-D]\]/g,''),words=text.match(/\b[A-Za-z]+\b/g)||[],sentences=text.split(/[.!?]+/).filter(s=>/[a-z]/i.test(s)).length||1;const averageSentenceWords=words.length/sentences,longWordShare=words.filter(w=>w.length>=8).length/(words.length||1),reasoningQuestions=(x.questions||[]).filter(q=>['Inference','Reference','Purpose','Insert Text','Sentence Simplification','Select the Sentence'].includes(q.questionType)).length;return {averageSentenceWords:Number(averageSentenceWords.toFixed(2)),longWordShare:Number(longWordShare.toFixed(3)),reasoningQuestions,score:Number((averageSentenceWords+40*longWordShare+2*reasoningQuestions).toFixed(3))};}
export const normalize=s=>s.toLowerCase().replace(/\[[a-d]\]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
export function shingles(s,n=5){const words=normalize(s).split(' ');return new Set(words.slice(0,1-n).map((_,i)=>words.slice(i,i+n).join(' ')));}
export function similarity(a,b){const intersection=[...a].filter(x=>b.has(x)).length;return intersection/(a.size+b.size-intersection||1);}
export function validateReading(items){
  const errors=[],ids=new Set(),texts=new Map(),questions=new Map(),sets=[];
  const fail=(id,s)=>errors.push(`${id}: ${s}`);
  for(const x of items){
    if(ids.has(x.id))fail(x.id,'duplicate ID');ids.add(x.id);
    if(!['advanced','intermediate'].includes(x.level)||!x.family)fail(x.id,'level/family metadata missing');
    const text=fullText(x),n=wordCount(text),key=normalize(text);
    if(texts.has(key))fail(x.id,`duplicate passage of ${texts.get(key)}`);texts.set(key,x.id);
    const bounds=x.type==='complete-words'?[70,100]:x.variant==='short'?[30,85]:x.type==='academic-passage'?[140,220]:[70,170];
    if(n<bounds[0]||n>bounds[1])fail(x.id,`length ${n} outside ${bounds}`);
    sets.push([x.id,shingles(text)]);
    if(x.type==='complete-words'){
      const blanks=x.pieces.filter(p=>typeof p==='object');
      if(blanks.length!==10)fail(x.id,'requires ten deletions');
      if(typeof x.pieces[0]!=='string'||!x.pieces[0].includes('. '))fail(x.id,'opening sentence must be intact');
      for(const p of blanks){if(!/^[a-z]+$/i.test(p.pre+p.answer)||!p.answer||p.post)fail(x.id,'invalid second-half deletion');if(p.pre.length!==Math.ceil((p.pre+p.answer).length/2))fail(x.id,'not second-half deletion');if(!text.includes(p.evidence))fail(x.id,'missing cloze evidence');}
    }else{
      const count=x.type==='academic-passage'?5:x.variant==='short'?2:3;
      if(x.questions?.length!==count)fail(x.id,`requires ${count} questions`);
      for(const q of x.questions||[]){
        if(q.options?.length!==4||new Set(q.options.map(normalize)).size!==4)fail(x.id,'requires four distinct options');
        if(!Number.isInteger(q.answer)||q.answer<0||q.answer>3)fail(x.id,'invalid answer key');
        if(!q.evidence||!text.includes(q.evidence))fail(x.id,`evidence absent: ${q.stem}`);
        if(!q.questionType||!q.explanation?.includes(q.evidence)||q.explanation.length<65)fail(x.id,'explanation requires passage evidence and reasoning');
        const signature=normalize(q.stem)+'|'+q.options.map(normalize).sort().join('|');
        if(questions.has(signature))fail(x.id,`duplicate question of ${questions.get(signature)}`);questions.set(signature,x.id);
        if(q.questionType==='Reference'){const phrase=q.stem.match(/[“](.*?)[”]/)?.[1];if(phrase&&!text.toLowerCase().includes(phrase.toLowerCase()))fail(x.id,'reference phrase absent');}
      }
    }
  }
  for(let i=0;i<sets.length;i++)for(let j=i+1;j<sets.length;j++)if(similarity(sets[i][1],sets[j][1])>=0.28)fail(sets[j][0],`near-duplicate passage of ${sets[i][0]}`);
  return errors;
}
