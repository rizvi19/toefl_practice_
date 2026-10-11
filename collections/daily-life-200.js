/* Independently written, unofficial 2026 Read in Daily Life practice.
 * Each record is one complete practical text plus 2 or 3 multiple-choice questions.
 * The four formats are independently readable versions of each campus situation.
 */
(function(){
"use strict";
const events=window.__TOEFL_DAILY_SCENARIOS__;
const vocabLines=window.__TOEFL_DAILY_VOCAB_SENTENCES__;
if(!Array.isArray(events)||events.length!==50||vocabLines.length!==50)throw Error("Daily Life scenarios are incomplete");
const formats=["Email","Campus notice","Discussion thread","Instructions"];
const wordCount=s=>(s.match(/\b[A-Za-z]+(?:['’-][A-Za-z]+)*\b/g)||[]).length;
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const strategy={
 "Factual":"Locate the requested fact, allowing for paraphrases, and reject details from elsewhere.",
 "Negative Factual":"Verify each choice against explicit information; NOT asks for the sole unsupported statement.",
 "Vocabulary":"Read the word's immediate context to determine its intended meaning.",
 "Reference":"Identify who the instruction addresses using surrounding context.",
 "Inference":"Use only conclusions tightly supported by the stated conditions.",
 "Rhetorical Purpose":"Explain why the writer included that detail, not simply what it says."
};
function question(stem,correct,wrong,type,support,reject,key){
 let options=[correct,...wrong],n=key%4;
 if(options.length!==4||new Set(options).size!==4)throw Error("Duplicate answer choices in "+stem);
 options=options.slice(n).concat(options.slice(0,n));
 return {stem,options,answer:options.indexOf(correct),questionType:type,explanation:"Question type: "+type+". "+support+" The distractors fail because "+reject+". Strategy: "+strategy[type]};
}
const out=[];
for(let i=0;i<events.length;i++){
 const [title,place,time,action,cutoff,requirement,exception,alternative,benefit,term,meaning,falseClaim]=events[i],vocab=vocabLines[i];
 if(!vocab.toLowerCase().includes(term.toLowerCase()))throw Error("Vocab context does not contain target "+term);
 const actionC=cap(action);
 const texts=[
  "To: Campus participants\nFrom: Student Programs Office\nSubject: "+title+"\n\nHello everyone,\nThe "+title.toLowerCase()+" is scheduled for "+time+" at "+place+". Please "+action+" no later than "+cutoff+". Participants should "+requirement+". "+vocab+" The activity will "+benefit+". If "+exception+", please "+alternative+". We would rather hear about an issue early than discover it when the session begins.\nThank you,\nStudent Programs Office",
  title.toUpperCase()+" — CAMPUS NOTICE\nWhere: "+place+"\nWhen: "+time+"\nRegistration cutoff: "+cutoff+"\n\nTo take part, "+action+". Before arriving, "+requirement+". The activity aims to "+benefit+". "+vocab+" Special circumstances: if "+exception+", "+alternative+". Staff encourage participants to read these details before making plans. Updates will be posted through the office that issued this notice.",
  "CAMPUS COMMUNITY THREAD\nMaya (9:10): Has anyone heard about "+title.toLowerCase()+"?\nLuis (9:14): Yes. It's at "+place+" on "+time+". The goal is to "+benefit+".\nMaya (9:16): How do we join?\nLuis (9:18): "+actionC+" by "+cutoff+". Also, "+requirement+".\nPriya (9:21): What if "+exception+"?\nLuis (9:23): The organizers say you should "+alternative+".\nPriya (9:25): Good to know. "+vocab,
  "HOW TO PARTICIPATE — "+title.toUpperCase()+"\n1. Check the venue ("+place+") and schedule ("+time+") before making travel plans.\n2. "+actionC+" by "+cutoff+".\n3. Prepare for the session: "+requirement+".\n4. If "+exception+", "+alternative+".\n\nWhy join? You can "+benefit+". "+vocab+" The instructions help participants arrive prepared and reduce avoidable delays. Read the special-circumstances note before contacting staff."
 ];
 for(let v=0;v<4;v++){
  const passage=texts[v],wc=wordCount(passage);
  if(wc<15||wc>150)throw Error("Daily text length "+title+" v"+v+" words "+wc);
  // Distractors are independent campus requirements/deadlines, never borrowed from this text.
  const other=(field,steps)=>steps.map(d=>events[(i+d)%events.length][field]).filter(x=>x!==events[i][field]).slice(0,3);
  const wrongActions=other(3,[9,19,31,47,3]),wrongRequirements=other(5,[11,23,39,6,7]),wrongCutoffs=other(4,[7,21,36,44,13]);
  const wrongMeanings=[events[(i+13)%50][10],events[(i+29)%50][10],events[(i+41)%50][10]];
  const q={
   action:()=>question("What action is required to take part?",action,wrongActions,"Factual","The instructions specifically say to "+action+".","the other actions are not stated as the participation step",i+v),
   cutoff:()=>question("What is the cutoff for the required action?",cutoff,wrongCutoffs,"Factual","The deadline is explicitly given as "+cutoff+".","those alternatives are not this event's deadline",i+v+1),
   requirement:()=>question("Which preparation is required for this activity?",requirement,wrongRequirements,"Factual","The text tells participants to "+requirement+".","the other preparations do not appear as requirements",i+v+2),
   negative:()=>question("All the following statements are supported by the text EXCEPT",falseClaim,["The activity takes place at "+place+".","Participants should "+action+".","The purpose is to "+benefit+"."],"Negative Factual","The text does not state or imply that "+falseClaim.toLowerCase(),"the other three statements accurately restate the place, action, and purpose",i+v+3),
   vocab:()=>question('The word “'+term+'” in the text is closest in meaning to',meaning,wrongMeanings,"Vocabulary","In context, “"+term+"” means "+meaning+". The clue is: “"+vocab+"”","other meanings describe unrelated words and do not fit the sentence",i+v+1),
   ref:()=>question('Who is addressed by the instruction to “'+action+'”?',"prospective participants in the activity",["only the organizers issuing the message","equipment suppliers who will not attend","members of a previous graduating class"],"Reference","The instruction addresses readers considering participation, not the staff organizing it.","the other groups are not the intended audience of the request",i+v+2),
   infer:()=>question("Which conclusion about participation difficulties is most strongly supported?","at least one alternative procedure can be requested when a difficulty arises",["any difficulty automatically cancels the activity for everyone","participants must ignore the stated alternative arrangements","all alternative arrangements require a mandatory fee"],"Inference","The condition “"+exception+"” is followed by an instruction to "+alternative+", implying that a way to seek assistance exists.","none of the sweeping claims is established by the condition and response",i+v+3),
   purpose:()=>question("Why does the message explain what to do if "+exception+"?","to clarify how someone may handle a special circumstance",["to announce that the entire event is permanently canceled","to demonstrate that staff are refusing all requests","to change the academic purpose of the announced event"],"Rhetorical Purpose","The conditional statement is guidance for a possible problem, not the main purpose of the event.","the other purposes are not expressed by the exception note",i+v)
  };
  const layouts=[[q.action,q.vocab,q.negative],[q.requirement,q.infer,q.ref],[q.purpose,q.vocab,q.cutoff],[q.negative,q.infer,q.requirement]];
  const questions=layouts[v].slice(0,i%5===0?2:3).map(fn=>fn());
  const n=i*4+v+1;
  out.push({id:"daily26-"+String(n).padStart(3,"0"),type:"daily-life",title:"Daily Life "+String(n).padStart(3,"0")+" — "+title+" ("+formats[v]+")",format:formats[v],difficulty:["Easy","Medium","Hard","Mixed"][(i+v)%4],topic:title,pack:"Read in Daily Life · 200",passage,questions,seconds:questions.length===2?120:165});
 }
}
if(out.length!==200||out.some(x=>x.questions.length<2||x.questions.length>3))throw Error("Daily activity count mismatch");
Object.defineProperty(window,"__TOEFL_DAILY_200__",{value:out.slice(0,195),configurable:false});
})();
