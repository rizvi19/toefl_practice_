/* Independent TOEFL 2026 Listening practice inspired by the task mechanics in
 * Chapter 3 of the ETS Pocket Guide, not copied from ETS questions or recordings.
 * Counts are TOTAL including original full-form questions, so we add:
 * Response 185, Conversation 196, Announcement 196, Academic Talk 196.
 * Educational browser TTS is used for newly authored scripts; no fake MP3s.
 */
(function(){
"use strict";
const cases=window.__TOEFL_LISTENING_CAMPUS_CASES__,campus=window.__TOEFL_DAILY_SCENARIOS__,rationales=window.__TOEFL_LISTENING_RATIONALES__;
const topics=window.__TOEFL_ACADEMIC_TOPICS__;
const expansions=[...(window.__TOEFL_ACADEMIC_EXPANSIONS_FIRST__||[]),...(window.__TOEFL_ACADEMIC_EXPANSIONS_SECOND__||[])];
const guidance=window.__TOEFL_ACADEMIC_GUIDANCE__;
if([cases?.length,campus?.length,rationales?.length,topics?.length,expansions.length,guidance?.length].some(n=>n!==50))throw Error("Listening dossiers must contain 50 entries each");
const count=s=>(s.match(/\b[A-Za-z]+(?:['’-][A-Za-z]+)*\b/g)||[]).length;
const sentence=s=>(s.match(/[^.!?]+[.!?](?:\s|$)/g)||[]).map(x=>x.trim()).filter(Boolean);
const capitalize=s=>s[0].toUpperCase()+s.slice(1);
const methods={
 "Main Idea":"Identify the whole message; a detail mentioned in passing is not the central point.",
 "Factual":"Locate a stated detail and reject changes in time, location, or requirement.",
 "Inference":"Draw a modest conclusion from the evidence; do not assume unstated guarantees.",
 "Purpose":"Identify why this information is mentioned at that point in the exchange.",
 "Method":"Recognize how the speaker explains an idea, such as comparison, warning or example.",
 "Attitude":"Connect the speaker's wording and tone with their evaluation or uncertainty.",
 "Response Appropriateness":"Identify whether the first speaker is requesting information, seeking help, or expressing a feeling; choose a socially natural reply."
};
function question(stem,correct,wrong,type,evidence,whyWrong,seed){
 if(typeof correct!=="string"||wrong.length!==3||whyWrong.length!==3)throw Error("Invalid candidate options "+stem);
 const entries=[{text:correct,why:null},...wrong.map((text,i)=>({text,why:whyWrong[i]}))];
 if(new Set(entries.map(x=>x.text)).size!==4)throw Error("Repeated choice: "+stem);
 const offset=seed%4,opts=entries.slice(offset).concat(entries.slice(0,offset));
 const answer=opts.findIndex(x=>x.text===correct);
 return {
  stem,options:opts.map(x=>x.text),answer,questionType:type,
  explanation:"Question type: "+type+". Correct: "+correct+". "+evidence+" "+
   opts.map((x,j)=>x.why?"Choice "+("ABCD"[j])+" is incorrect: "+x.why:"").filter(Boolean).join(" ")+
   " Strategy: "+methods[type]
 };
}
const response=[],conversation=[],announcement=[],academic=[];
function sampleOther(i,field,avoid){
 return [...Array(49)].map((_,k)=>campus[(i+k+1)%50][field]).find(x=>x!==avoid);
}
for(let i=0;i<50;i++){
 const [title,place,when,action,cutoff,requirement,exception,alternative,benefit,term,meaning,falseClaim]=campus[i];
 const [concern,reassurance,twist,feeling]=cases[i];
 const others=[campus[(i+7)%50],campus[(i+19)%50],campus[(i+32)%50]];
 const fn=(type,k,script,questionList,seconds,extra={})=>({
  id:type+"26-"+String(i*4+k+1).padStart(3,"0"),type,title:({
   "choose-response":"Everyday reply",
   "conversation":"Campus conversation",
   "announcement":"Campus announcement"
  })[type]+" "+String(i*4+k+1).padStart(3,"0")+" — "+title+" · "+["Details","Change","Meaning","Decision"][k],
  topic:title,pack:"Listening Chapter 3 · 200",difficulty:["Easy","Medium","Hard","Mixed"][(i+2*k)%4],
  script,questions:questionList,seconds,...extra
 });
 const prompts=[
  "Excuse me, where are we supposed to meet for the "+title.toLowerCase()+"?",
  "Honestly, "+concern+" I'm not sure I'll manage the "+title.toLowerCase()+".",
  "I'm interested in "+title.toLowerCase()+", but what if "+exception+"?",
  "I'm afraid I might miss the deadline to "+action+". Do you think I should just turn up anyway?"
 ];
 const correctResponse=[
  "At "+place+". That's the venue shown in the notice.",
  "That sounds difficult. It would be worth checking the arrangements with the organizers.",
  "The notice says you should "+alternative+".",
  "I'd ask the organizers first rather than assume there's still space."
 ];
 const responseWrongs=[
  ["At "+others[0][1]+".","I know the registration deadline, but not where we meet.","I think the place changed, though I can't say where."],
  ["Well, the event sounds interesting, so there can't be any problem.","You could just ignore the preparation requirement.","Did you remember to submit the event form last week?"],
  ["That probably means the entire event is canceled for everyone.","It's fine to ignore the special-arrangement instructions.","You should only worry about the main event's starting time."],
  ["Sure, deadlines are never enforced, so just show up.","You could wait until after the event to ask if you can join.","Maybe the building's opening hours are different on weekends."]
 ];
 const responseWhy=[
  ["That is a plausible but different venue.","It discusses a cutoff rather than answering the question about where to meet.","It expresses uncertainty and never gives a usable location."],
  ["Interest in an activity does not eliminate the expressed scheduling problem.","The requirement should not be disregarded without checking.","It asks about an administrative detail without acknowledging the immediate concern."],
  ["The contingency does not amount to canceling the event for everyone.","The speaker should follow rather than ignore the published alternative.","Knowing the start time does not resolve the specified exception."],
  ["There is no basis for ignoring a published cutoff.","Waiting until afterward is unlikely to resolve uncertainty about joining.","Opening hours do not establish whether late registration is accepted."]
 ];
 const responseEvidences=[
  "The question asks for the meeting location of "+title+"; the event is at "+place+".",
  "The speaker expresses difficulty ('"+concern+"'), so a sympathetic, practical reply is most natural.",
  "The stated contingency is that if "+exception+", participants should "+alternative+".",
  "The speaker is implicitly asking what to do if a cutoff is missed; contacting staff is responsible, while arrival without registration is uncertain."
 ];
 for(let v=0;v<4;v++){
  const q=question("Choose the most natural response.",correctResponse[v],responseWrongs[v],"Response Appropriateness",responseEvidences[v],responseWhy[v],i+v);
  response.push(fn("choose-response",v,prompts[v],[q],36,{speechAct:["information request","expression of concern","conditional inquiry","indirect request for advice"][v]}));
 }
 const convTexts=[
  "Woman: Did you hear about "+title.toLowerCase()+"?\n"+
  "Man: It's at "+place+" on "+when+". They hope to "+benefit+".\n"+
  "Woman: "+concern+"\n"+
  "Man: "+reassurance+"\n"+
  "Woman: How do we sign up?\n"+
  "Man: "+capitalize(action)+" by "+cutoff+".",
  "Man: I thought "+title.toLowerCase()+" would be simple, but "+concern.toLowerCase()+"\n"+
  "Woman: That sounds frustrating. "+reassurance+"\n"+
  "Man: I was about to give up. "+feeling+"\n"+
  "Woman: Why not check with staff first?\n"+
  "Man: You're right. I'd rather ask than assume I can't join.",
  "Woman: Why so many rules for "+title.toLowerCase()+"?\n"+
  "Man: The notice says to "+requirement+".\n"+
  "Woman: But isn't the aim to "+benefit+"?\n"+
  "Man: Sure. "+rationales[i]+"\n"+
  "Woman: Oh, that explains the rule.\n"+
  "Man: And if "+exception+", you can "+alternative+".",
  "Man: Are you going to "+title.toLowerCase()+"?\n"+
  "Woman: I'd like to; it should "+benefit+".\n"+
  "Man: Remember to "+action+" by "+cutoff+".\n"+
  "Woman: Yes, and we must "+requirement+".\n"+
  "Man: "+concern+"\n"+
  "Woman: Perhaps this helps: "+reassurance+"\n"+
  "Man: So a complication isn't necessarily a cancellation."
 ];
 // Each conversation is one complete 2-speaker situation, followed by exactly two MCQs.
 const mainCorrect="They are discussing arrangements and a possible difficulty with "+title.toLowerCase()+".";
 const mainWrong=[
  "They are evaluating the scientific research behind "+others[0][0].toLowerCase()+".",
  "They are disputing the university's decision to permanently close "+place+".",
  "They are comparing the prices of three competing commercial services."
 ];
 const mainWhy=[
  "That topic belongs to a different campus event and is not the main problem.",
  "No permanent closure is discussed.",
  "The exchange does not compare three commercial providers."
 ];
 const qConv=[
  [
   question("What is the main topic of the conversation?",mainCorrect,mainWrong,"Main Idea",
    "Both speakers focus on "+title.toLowerCase()+" and what someone needs to do to attend.",mainWhy,i),
   question("According to the man, what should interested students do?",""+capitalize(action)+" by "+cutoff+".",[
    "Wait until the event has ended to contact the organizer.",
    "Ask the university to cancel the event.",
    "Register at the location of "+others[1][0].toLowerCase()+"."
   ],"Factual","The man states both the required action and its cutoff.",
   ["The man gives an earlier action, not a post-event instruction.","No cancellation request is made.","The other event has a different location and registration process."],i+1)
  ],
  [
   question("What does the man's response suggest he is likely to do next?","Contact organizers instead of giving up without asking.",[
    "Stop attending university events for the whole semester.",
    "Assume the event no longer exists.",
    "Ignore the concern because he already knows every arrangement."
   ],"Inference","After hearing the possible arrangement, he says he would rather ask than make a bad assumption.",
   ["Nothing suggests he is giving up on all events.","The activity is not described as canceled.","He explicitly says he needs confirmation."],i+2),
   question("How does the man feel toward the end of the conversation?","Relieved and willing to seek clarification.",[
    "Certain that the organizers deliberately misled him.",
    "Completely indifferent to participating.",
    "Annoyed with the woman for trying to help."
   ],"Attitude","His comment 'That makes a difference' and his intention to ask indicate relief and renewed interest.",
   ["No accusation is made.","He is still interested enough to contact staff.","He acknowledges rather than rejects her advice."],i+3)
  ],
  [
   question("Why does the man mention the practical reason for the instructions?","To correct the impression that the requirement is pointless.",[
    "To announce that the activity has been canceled.",
    "To persuade the woman to ignore the requirement.",
    "To change the subject to a different university."
   ],"Purpose","He responds directly to the woman's complaint by explaining the rationale: "+rationales[i],
   ["No cancellation is announced.","He defends rather than dismisses the instruction.","They continue discussing the same activity."],i+1),
   question("How does the man explain the requirement?","By identifying its practical purpose and then discussing an exception.",[
    "By listing names of people who broke the rules.",
    "By reading a historical research study unrelated to the event.",
    "By refusing to explain any part of the instructions."
   ],"Method","He explains why the instruction exists and then gives a conditional alternative.",
   ["No violators are named.","No external historical study is cited.","He clearly gives a reason and an alternative."],i+2)
  ],
  [
   question("What important deadline do the speakers mention?",cutoff,[...new Set([...others.map(row=>row[4]),...campus.map(row=>row[4])].filter(value=>value!==cutoff))].slice(0,3),"Factual","The man says he needs to "+action+" by "+cutoff+".",
   ["This is a different event's deadline.","This deadline belongs to another campus activity.","The conversation does not say that cutoff."],i+2),
   question("What can be inferred about the man's view of participation difficulties?","He now recognizes that a difficulty does not necessarily rule out taking part.",[
    "He believes every issue results in the permanent cancellation of campus activities.",
    "He plans to ignore all instructions because they are too strict.",
    "He thinks the event is only for professional staff."
   ],"Inference","His final remark contrasts a practical complication with complete cancellation.",
   ["That is an extreme conclusion not suggested by his remark.","He wants to check, not disregard, instructions.","Nothing limits the event to professional staff."],i+3)
  ]
 ];
 for(let v=0;v<4;v++){
  const w=count(convTexts[v]);
  if(w>100||w<45)throw Error("Conversation word count "+title+" variant "+v+" = "+w);
  conversation.push(fn("conversation",v,convTexts[v],qConv[v],150,{format:"two-speaker dialogue"}));
 }
 const annTexts=[
  "Hello, students. Here's a reminder about "+title.toLowerCase()+". It takes place "+when+" at "+place+". The goal is to "+benefit+". To join, "+action+" by "+cutoff+". And remember to "+requirement+". Please read the notice before arriving, so you have the information you need.",
  "An update about "+title.toLowerCase()+": "+twist+" The event is planned for "+when+" at "+place+". If "+exception+", please "+alternative+". Check the updated notice rather than assuming the usual arrangements will work. We appreciate your flexibility.",
  "Interested in "+title.toLowerCase()+"? It's a chance to "+benefit+". "+feeling+" To participate, "+action+" before "+cutoff+". Please also "+requirement+". These steps help the session run smoothly. We're looking forward to seeing you at "+place+".",
  "A clarification about "+title.toLowerCase()+": registration closes "+cutoff+", but the event itself takes place "+when+". Don't confuse the two. Meet at "+place+". Remember to "+requirement+". If "+exception+", please "+alternative+". Contacting staff early allows time for arrangements."
 ];
 const qAnn=[
  [
   question("What is the main purpose of the announcement?","To explain how students can participate in "+title.toLowerCase()+".",[
    "To report that "+title.toLowerCase()+" has been permanently discontinued.",
    "To ask students to evaluate an unrelated course.",
    "To advertise a commercial product instead of a campus activity."
   ],"Main Idea","The speaker identifies the event, purpose, place, and registration steps.",
   ["The event is explicitly scheduled.","No course evaluation is discussed.","The subject is an organized campus activity."],i),
   question("Where is the activity scheduled to take place?",place,[others[0][1],others[1][1],others[2][1]],"Factual",
    "The announcer explicitly gives the location: "+place+".",
    ["That venue belongs to another event.","That location is not mentioned here.","The announcement uses a different venue."],i+1)
  ],
  [
   question("How does the announcer help students deal with possible participation problems?","By naming a specific situation and explaining the alternative procedure.",[
    "By promising that there will never be any schedule changes.",
    "By listing the university's entire history of earlier activities.",
    "By telling students to disregard organizers' instructions."
   ],"Method","The speaker states a condition, '"+exception+"', then advises listeners to "+alternative+".",
   ["The talk requests flexibility rather than guaranteeing conditions.","No historical catalogue appears.","Listeners are specifically asked to consult the notice."],i+3),
   question("What can reasonably be inferred about someone who encounters the mentioned difficulty?","They should seek the specified arrangement rather than assume participation is impossible.",[
    "They will definitely receive a cash payment.",
    "They should attend without informing anyone.",
    "The event will automatically be canceled for all students."
   ],"Inference","The contingency instruction provides a practical next step for students affected by the problem.",
   ["No payment is described.","The speaker instructs affected students to make contact.","A problem for one student is not described as canceling the event."],i+2)
  ],
  [
   question("Why does the announcer describe the participation steps as intended to keep the session manageable?","To reassure interested students that requirements are practical rather than exclusionary.",[
    "To explain why all inexperienced students will be rejected.",
    "To warn that university officials have closed the venue permanently.",
    "To claim that the activity has no educational value."
   ],"Purpose","The positive invitation is paired with a reassurance about why preparation rules exist.",
   ["The message invites newcomers.","The activity is scheduled at an available venue.","The speaker describes an educational or community benefit."],i+1),
   question("What is the announcer's attitude toward prospective participants?","Encouraging and welcoming while emphasizing preparation.",[
    "Openly hostile toward all first-time visitors.",
    "Indifferent to whether anyone attends.",
    "Convinced that participants should ignore the instructions."
   ],"Attitude","The speaker highlights benefits, looks forward to welcoming people and explains preparation requirements.",
   ["The wording is welcoming, not hostile.","The repeated invitation indicates interest in attendance.","The preparation advice is explicitly important."],i+2)
  ],
  [
   question("What does the speaker clarify about the event's timing?","The registration deadline and the actual activity time are different.",[
    "The announced registration deadline has been canceled altogether.",
    "The event is permanently moved to an unspecified future date.",
    "The activity will take place at the registration cutoff."
   ],"Factual","The announcement explicitly contrasts the cutoff "+cutoff+" with the event on "+when+".",
   ["The cutoff is given as valid.","The speaker still provides a planned date and time.","Two separate times are distinguished."],i+2),
   question("What can be inferred about why students should contact staff early?","Staff may need time to arrange support for special circumstances.",[
    "They must pay a fine before a staff member will answer.",
    "Staff will refuse to consider any accessibility question.",
    "The event has already finished and the doors are closed."
   ],"Inference","The speaker says advance checks give staff time to respond to circumstances.",
   ["No fine is mentioned.","Special arrangements are expressly invited.","The event is upcoming in the fictional context."],i+3)
  ]
 ];
 for(let v=0;v<4;v++){
  const w=count(annTexts[v]);if(w>85||w<48)throw Error("Announcement word count "+title+" variant "+v+" = "+w);
  announcement.push(fn("announcement",v,annTexts[v],qAnn[v],135,{format:"campus announcement"}));
 }
}
// Academic spoken texts: 50 concept dossiers × 4 complementary emphases.
// Each complete talk has four questions, contextual evidence and an attitude cue.
// No ETS passages are included; original academic reading dossiers supply background.
for(let i=0;i<50;i++){
 const [title,area,narrative]=topics[i];
 const [otherTitle,detail,term,meaning,falseClaim]=expansions[i];
 if(title!==otherTitle)throw Error("Academic topic mismatch "+title);
 const core=narrative.split("|");
 const info=sentence(detail);
 const inference=guidance[i].inference;
 if(core.length!==8||info.length<5||!inference)throw Error("Academic evidence incomplete "+title);
 for(let v=0;v<4;v++){
  const coreIDs=[[0,1,2,3,5,7],[0,1,3,4,6,7],[0,2,3,4,5,7],[0,1,2,4,6,7]][v];
  const start=[
   "Let me open with a question about "+title.toLowerCase()+". How can we tell what is really happening? ",
   "Here's something that can be easy to overlook when studying "+title.toLowerCase()+". ",
   "Imagine you have been asked to investigate "+title.toLowerCase()+". What would count as convincing evidence? ",
   "Today I want to reconsider a common assumption about "+title.toLowerCase()+". "
  ][v];
  const connectors=[
   "So, what evidence should we examine? ",
   "Now, let's consider why that explanation is incomplete. ",
   "Here's a useful way to test that idea. ",
   "But notice a limitation of that first explanation. "
  ][v];
  const closing=[
   "The important thing is to connect the underlying process to observations, rather than memorize a single example.",
   "I find the evidence interesting, but I wouldn't treat one isolated result as the last word.",
   "That is why researchers compare multiple observations before turning a plausible explanation into a confident claim.",
   "It's a promising area of study, although careful interpretation matters more than an impressive-sounding conclusion."
  ][v];
  const facts=coreIDs.map(j=>core[j]).join(" ");
  const script=start+facts+" "+connectors+detail+" "+closing;
  const w=count(script);
  if(w<145||w>250)throw Error("Academic talk length "+title+" variant "+v+" = "+w);
  const firstFact=core[1];
  const mainCorrect="How researchers explain "+title.toLowerCase()+" using observations and qualified interpretations.";
  const mainWrong=[
   "The one specific detail that "+core[1].replace(/[.]$/,"").toLowerCase()+".",
   "Why every scientific interpretation of "+title.toLowerCase()+" has now been rejected.",
   "The isolated observation that "+info[0].replace(/[.]$/,"").toLowerCase()+"."
  ];
  const qMain=()=>question("What is the main focus of the talk?",mainCorrect,mainWrong,"Main Idea",
   "The speaker develops a process or phenomenon, illustrates evidence, and warns against overgeneralization.",
   ["That is a supporting detail rather than the overall explanatory focus.","The speaker treats the evidence as useful, not entirely discredited.","That example is important but cannot summarize the whole discussion."],i+v);
  const qFact=()=>question("Which point does the speaker make about "+title.toLowerCase()+"?",firstFact,[
    falseClaim,
    "The same process always produces identical outcomes without regard to conditions.",
    "Researchers can determine every cause from a single observation."
   ],"Factual","The talk states: '"+firstFact+"' This supports the correct claim without overstating it.",
   ["That absolute statement is not supported by the discussion.","The talk describes conditions or comparisons, not universal identical outcomes.","The talk emphasizes checking evidence rather than one observation proving every cause."],i+v+1);
  const qInference=()=>question("What is most reasonable to infer from the talk?",inference,[
   "All competing explanations have been conclusively disproven.",
   falseClaim,
   "Researchers can stop collecting evidence because the question is permanently settled."
  ],"Inference","The examples and limitations suggest the modest conclusion: '"+inference+"'",
  ["The speaker acknowledges uncertainty.","That assertion conflicts with the passage's qualifications.","The final discussion expressly supports further investigation."],i+v+2);
  const qMethod=()=>question("How does the lecturer make the topic more understandable?",
   "By giving a general explanation, then adding evidence and an important qualification.",[
    "By listing historical dates without relating any observations to a mechanism.",
    "By presenting two opposing speakers without reaching an explanation.",
    "By giving a definition alone, with no examples or qualifications."
   ],"Method","The structure moves from a broad mechanism through supporting details to limits on interpretation.",
   ["The talk explains interacting conditions rather than presenting a chronology.","Only one lecturer speaks and develops a connected account.","The lecturer provides evidence and cautions beyond an initial definition."],i+v+3);
  const example=info[Math.min(v,info.length-1)];
  const qPurpose=()=>question("Why does the lecturer include the discussion that begins '"+example.slice(0,54).replace(/[,.!?]$/,"")+"…'?",
   "To develop the central explanation with a specific piece of evidence or limitation.",[
    "To establish an exception-free rule that the whole field must follow.",
    "To argue that future comparisons are unnecessary once a single example is known.",
    "To shift from scientific interpretation to the personal history of a researcher."
   ],"Purpose","The highlighted part belongs to the evidence and limitations in the lecturer's second explanation, clarifying the mechanism rather than changing subjects.",
   ["The lecturer repeatedly emphasizes limits rather than universal rules.","The lecturer advocates comparing evidence rather than stopping investigation.","The passage remains focused on interpretation, not someone's personal life."],i+v+2);
  const qAttitude=()=>question("What attitude does the lecturer express toward the evidence?",
   "Interested in the findings, but cautious about conclusions that go beyond them.",[
    "Disappointed that the field has never produced useful observations.",
    "Absolutely certain that one example answers every remaining question.",
    "Uninterested in whether explanations can be tested at all."
   ],"Attitude","The lecturer's closing says '"+closing+"' This reflects interest combined with reasonable scientific caution.",
   ["The speaker explicitly treats the findings as informative.","The conclusion calls for context and further tests.","The lecture emphasizes evidence rather than indifference."],i+v+1);
  const layouts=[
   [qMain,qFact,qPurpose,qInference],
   [qFact,qMethod,qAttitude,qMain],
   [qMain,qMethod,qInference,qAttitude],
   [qPurpose,qFact,qInference,qMethod]
  ];
  const questions=layouts[v].map(fn=>fn()),number=i*4+v+1;
  academic.push({
   id:"talk26-"+String(number).padStart(3,"0"),type:"academic-talk",
   title:"Academic Talk "+String(number).padStart(3,"0")+" — "+title+" · "+["Mechanism","Evidence","Interpretation","Limitations"][v],
   topic:area,pack:"Listening Chapter 3 · 200",difficulty:["Easy","Medium","Hard","Mixed"][(i+v+1)%4],
   script,questions,seconds:360,format:"short academic talk"
  });
 }
}
// The preexisting 15, 4, 4 and 4 original-form activities remain intact.
// Sliced counts: 185 new Responses, 196 new Conversations/Announcements/Talks.
const extended={
 "choose-response":response.slice(0,185),
 "conversation":conversation.slice(0,196),
 "announcement":announcement.slice(0,196),
 "academic-talk":academic.slice(0,196)
};
for(const [type,expected] of Object.entries({"choose-response":185,"conversation":196,"announcement":196,"academic-talk":196}))
 if(extended[type].length!==expected)throw Error(type+" activity count mismatch");
Object.defineProperty(window,"__TOEFL_LISTENING_EXTENDED__",{value:extended,configurable:false});
})();
