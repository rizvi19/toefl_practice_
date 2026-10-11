/* Unofficial 2026 TOEFL Reading: 200 complete academic passages, 5 questions each.
 * Original exposition with topic-specific vocabulary, inference and paraphrase targets.
 * All eight ETS-described question families appear across the bank.
 */
(function(){
"use strict";
const topics=window.__TOEFL_ACADEMIC_TOPICS__;
const extra=[...(window.__TOEFL_ACADEMIC_EXPANSIONS_FIRST__||[]),...(window.__TOEFL_ACADEMIC_EXPANSIONS_SECOND__||[])];
const guidance=window.__TOEFL_ACADEMIC_GUIDANCE__;
if(topics?.length!==50||extra.length!==50||guidance?.length!==50)throw Error("Academic dossier count mismatch");
const wc=s=>(s.match(/\b[A-Za-z]+(?:['’-][A-Za-z]+)*\b/g)||[]).length;
function sentences(s){return (s.match(/[^.!?]+[.!?](?:\s|$)/g)||[]).map(x=>x.trim()).filter(Boolean);}
const labels=["A","B","C","D"];
const strategy={
 "Factual":"Find information that is actually stated; a plausible outside fact is insufficient.",
 "Negative Factual":"Three options are explicitly supported; find the sole contradicted or unsupported one.",
 "Vocabulary":"Substitute each meaning into the sentence and use its local context.",
 "Select the Sentence":"Scan the four labeled sentences for the exact information requested, allowing paraphrases.",
 "Sentence Simplification":"Preserve the original sentence's main proposition and cause, contrast or condition.",
 "Reference":"Identify the grammatical antecedent and read the previous sentences.",
 "Inference":"Draw a modest logical conclusion from the stated evidence; avoid exaggeration.",
 "Rhetorical Purpose":"Explain why the author included the information in the larger argument.",
 "Insert Text":"Check both sentences around each gap and follow cohesive words and references."
};
function q(stem,correct,other,type,ground,wrong,seed){
 if(typeof correct!=="string"||!correct||other.length!==3)throw Error("Question format error "+stem);
 const opts=[correct,...other];
 if(new Set(opts).size!==4)throw Error("Duplicated options "+stem);
 const cut=seed%4,options=opts.slice(cut).concat(opts.slice(0,cut));
 return {stem,options,answer:options.indexOf(correct),questionType:type,
 explanation:"Question type: "+type+". "+ground+" Other options fail because "+wrong+". Strategy: "+strategy[type]};
}
const bank=[];
for(let i=0;i<50;i++){
 const [title,area,story]=topics[i],basic=story.split("|"),[expTitle,extension,term,meaning,falseClaim]=extra[i];
 if(title!==expTitle)throw Error("Academic topic alignment "+title+" / "+expTitle);
 const ext=sentences(extension);
 if(ext.length<5)throw Error("Expected expository multi-sentence detail "+title+" "+ext.length);
 let at=ext.findIndex(x=>new RegExp("\\b"+term+"\\b","i").test(x));
 if(at<0)throw Error("Vocabulary word absent "+term+" in "+title);
 const g=guidance[i],inference=g.inference,paraphrase=g.simplification;
 if(!inference||!paraphrase)throw Error("Missing authored conceptual guidance "+title);
 for(let v=0;v<4;v++){
  // Variants are full, related reading sets; omit one secondary core detail in
  // later variants so the expository passages and evidence targets are not identical.
  const selected=basic.filter((_,j)=>v===0||j!==[99,2,4,6][v]);
  const p1=selected.join(" ");
  let p2=extension,extraInfo={},format="expository";
  if(v===0||v===2){
   const targetIndex=(i+v)%4,inserted=ext[targetIndex],rem=ext.filter((_,j)=>j!==targetIndex);
   // The four marked gaps appear in chronological text order; choosing the
   // missing sentence's original gap restores the coherent paragraph.
   let marked=[];
   for(let j=0;j<rem.length;j++){
     if(j<4)marked.push("["+labels[j]+"]");
     marked.push(rem[j]);
   }
   p2=marked.join(" ");
   extraInfo={inserted,insertAnswer:targetIndex,preceding:targetIndex>0?ext[targetIndex-1]:"the topic sentence of this paragraph",following:ext[targetIndex+1]||"the following detail"};
   format="insert-marker";
  }else{
   // Four marked original sentences; the vocabulary sentence is the target.
   const start=Math.min(Math.max(at-((i+v)%4),0),ext.length-4);
   let marked=ext.map((s,j)=>j>=start&&j<start+4?"["+labels[j-start]+"] "+s:s);
   p2=marked.join(" ");
   extraInfo={sentenceAnswer:at-start,sentenceText:ext[at],sentenceStart:start};
   format="sentence-selection";
  }
  const passage=p1+"\n\n"+p2;
  const number=i*4+v+1,words=wc(passage);
  if(words<170||words>235)throw Error("Academic passage word length "+number+" "+words);
  const textType="academic-passage";
  const facts=[basic[1],basic[2],basic[3],basic[4]].filter(s=>selected.includes(s));
  if(facts.length<3)throw Error("Insufficient factual evidence "+title+" "+v);
  const qMain=()=>q("Which of the following is explicitly reported in the passage about "+title.toLowerCase()+"?",basic[1],
   [falseClaim,"The passage concludes that this subject has no measurable consequences in any setting.","Researchers have established that every region follows exactly the same conditions."],
   "Factual","The passage specifically states: “"+basic[1]+"”","the alternatives introduce sweeping unsupported claims or contradict the text",i+v);
  const wrongVoc=[extra[(i+8)%50][3],extra[(i+19)%50][3],extra[(i+36)%50][3]];
  const qVocab=()=>q('The word “'+term+'” in paragraph 2 is closest in meaning to',meaning,wrongVoc,
   "Vocabulary","In context, “"+term+"” means "+meaning+". The relevant sentence is: “"+ext[at]+"”","other definitions do not fit the word's function in this passage",i+v+1);
  const trueStatements=[basic[0],basic[1],ext[0]];
  const qNegative=()=>q("All of the following statements are supported by the passage EXCEPT",falseClaim,trueStatements,
   "Negative Factual","The text does not support “"+falseClaim+"”; the passage qualifies its claims rather than establishing that absolute conclusion.","the other three statements repeat ideas explicitly presented in the text",i+v+3);
  const qInf=()=>q("Which conclusion is most strongly supported by the evidence in the passage?",inference,[
    "One observation is enough to establish the same result for every location and period.",
    falseClaim,
    "The subject can no longer be studied with new observations or competing explanations."
   ],"Inference","The author's evidence and qualifications support this limited conclusion: “"+inference+"”","they require unjustified universal assumptions or dismiss evidence the author discusses",i+v+2);
  const qPurpose=()=>q("Why does the author add the discussion beginning “"+ext[0].slice(0,52).replace(/[,.!?]$/,"")+"…”?",
    "To qualify the broader introduction with a concrete mechanism, limitation or condition",
    ["To announce that researchers have unanimously abandoned this subject",
     "To switch permanently to an unrelated topic not examined in the passage",
     "To claim that all prior observations are necessarily fraudulent"],
    "Rhetorical Purpose","The paragraph deepens the first paragraph's broad account by examining specific evidence, constraints and interpretations relevant to "+title.toLowerCase()+".","the paragraph remains on topic and makes no claim of total scientific abandonment or fraud",i+v+1);
  const simplifyWrong=[falseClaim,inference,ext[ext.length-1]];
  const qSimplify=()=>q("Which option best expresses the essential meaning of this sentence from paragraph 2? “"+ext[0]+"”",
    paraphrase,simplifyWrong,"Sentence Simplification","The paraphrase preserves the main relationship and qualification: “"+paraphrase+"”","one choice contradicts the text, while the others describe different ideas without preserving this sentence's meaning",i+v+3);
  const qReference=()=>q('In the final discussion, what does the phrase “this evidence” most naturally refer to?',
    "the observations, comparisons and limitations described just before it",
    ["a new experiment that the passage has not introduced","only the title printed above the passage","an unrelated instruction issued to campus staff"],
    "Reference","The phrase points back to the evidence and supporting details already discussed in paragraph 2.","none of the distractors is a plausible antecedent in the academic discussion",i+v+1);
  let referenceLine=" This evidence needs to be evaluated in light of the limitations described above.";
  if(v===1||v===3){
    // The referent is explicit in the preceding exposition but not in the question.
    p2+=referenceLine;
  }
  const qSelect=()=>q("Identify the labeled sentence in paragraph 2 that discusses the term “"+term+"” in its academic context.",
    "Sentence "+labels[extraInfo.sentenceAnswer],labels.filter((_,j)=>j!==extraInfo.sentenceAnswer).map(x=>"Sentence "+x),
    "Select the Sentence","Sentence "+labels[extraInfo.sentenceAnswer]+" is: “"+extraInfo.sentenceText+"” Its wording and context establish how “"+term+"” is being used.","the other three labeled sentences address other details in the paragraph",i+v+2);
  const qInsert=()=>q('Where would this sentence best fit in paragraph 2? “'+extraInfo.inserted+'”',
    "Position "+labels[extraInfo.insertAnswer],labels.filter((_,j)=>j!==extraInfo.insertAnswer).map(x=>"Position "+x),
    "Insert Text","Position "+labels[extraInfo.insertAnswer]+" restores the original idea sequence. The preceding idea is “"+extraInfo.preceding+"”; the following sentence is “"+extraInfo.following+"”","the other gaps separate ideas that are less directly connected to the inserted sentence's topic, antecedents or logical transition",i+v+1);
  const layouts=[
    [qMain,qVocab,qInf,qPurpose,qInsert],
    [qNegative,qReference,qSimplify,qSelect,qVocab],
    [qMain,qInf,qVocab,qInsert,qNegative],
    [qPurpose,qSimplify,qReference,qSelect,qMain]
  ];
  const questions=layouts[v].map(build=>build());
  const actualPassage=p1+"\n\n"+p2;
  if(wc(actualPassage)<170||wc(actualPassage)>245)throw Error("Academic final length "+title+" "+wc(actualPassage));
  bank.push({
    id:"academic26-"+String(number).padStart(3,"0"),
    type:textType,title:"Academic "+String(number).padStart(3,"0")+" — "+title+" ("+["Processes","Evidence","Applications","Interpretation"][v]+")",
    difficulty:["Medium","Hard","Mixed","Easy"][(i+v)%4],
    topic:area,pack:"Read an Academic Passage · 200",
    passage:actualPassage,questions,seconds:330,
    studyAnnotation:{format,sourceTopic:title}
  });
 }
}
if(bank.length!==200||bank.some(item=>item.questions.length!==5))throw Error("Academic activities not complete");
Object.defineProperty(window,"__TOEFL_ACADEMIC_200__",{value:bank,configurable:false});
})();
