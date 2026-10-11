/* TOEFL Practice Studio: 2026 Complete the Words, original independently written practice.
 * Based on the description of the task in ETS Official Guide pocket edition pp. 51–53.
 * ETS does not endorse or author this bank. All complete texts are retained for checking.
 *
 * KEEP the existing IDs 'words-01' through 'words-03' and 'ctw26-ext-001' through
 * 'ctw26-ext-100' so browsers with previous history remain compatible.
 * The three originals stay in the separate full practice form.
 */
(function () {
"use strict";
const existingTopics = [["Wetlands and flood control","Environment","Coastal wetlands absorb part of the water pushed inland by severe storms.|Their dense vegetation slows moving water and helps sediment settle near the shore.|These habitats also provide feeding grounds for fish and migratory birds.|When wetlands are drained, nearby neighborhoods may experience more frequent flooding.|Restoration teams often plant native grasses after removing abandoned drainage channels.|Measuring water levels before and after restoration helps researchers evaluate progress.|Local residents can contribute observations about seasonal changes and wildlife sightings.|Protecting wetlands requires cooperation among landowners, scientists, and public agencies."],["Urban heat islands","Climate and cities","Concrete surfaces absorb sunlight and can make dense neighborhoods warmer than surrounding areas.|Dark roofs and limited shade intensify this effect during the afternoon.|Researchers compare temperatures on streets, rooftops, and nearby parks.|Trees lower surface temperatures by shading pavement and releasing moisture.|A single new park cannot solve the problem in every part of a city.|Planners therefore examine where vulnerable residents have the least access to shade.|Reflective roofing materials offer another strategy for reducing unwanted heat.|Long-term measurements show whether these investments improve daily comfort."],["Library access and learning","Education","Public libraries have gradually expanded beyond their traditional role of lending books.|Many branches now provide digital workshops and quiet spaces for remote study.|Students without reliable home internet can complete assignments using library computers.|Librarians teach visitors how to assess sources rather than trusting every online claim.|The demand for study rooms often increases shortly before university examinations.|Some communities extend opening hours during these particularly busy periods.|Surveys of visitors help staff decide which services should receive additional funding.|The central goal is equitable access to information and opportunities for learning."],["Pollinators in farmland","Biology","Many flowering crops depend on insects to transfer pollen between blossoms.|Different bee species visit flowers at different times of the day.|Farmers may support pollinators by planting flowering strips beside their fields.|Pesticide applications can harm beneficial insects when timing and dosage are poorly managed.|Researchers count flower visits to estimate how local habitats influence pollination.|Greater plant diversity may provide food even after the main crop has finished blooming.|Weather conditions also affect how frequently insects leave their nests.|Effective conservation considers both agricultural production and the needs of wildlife."],["Ancient pottery and trade","Archaeology","Archaeologists examine broken pottery to learn how earlier communities lived.|The shape of a vessel can suggest whether it stored water or prepared food.|Chemical analysis sometimes reveals the geographic source of the original clay.|Researchers compare decorative patterns found at settlements separated by great distances.|Similar designs may indicate trade, imitation, or shared cultural traditions.|A single fragment rarely provides enough evidence for a confident conclusion.|Excavation records document the location and depth of every important discovery.|Careful interpretation combines physical measurements with historical context."],["Ocean currents","Earth science","Ocean currents carry heat and nutrients across enormous distances.|Surface currents are influenced by prevailing winds and Earth's rotation.|Deep currents also respond to differences in water temperature and salinity.|Scientists deploy floating instruments to track movement below the waves.|Current patterns can influence fisheries and regional weather conditions.|A change in circulation may redistribute heat without warming every region equally.|Satellite measurements complement observations collected from research vessels.|Understanding these connections requires evidence from many seasons and locations."],["Spacing study sessions","Psychology","Students often remember information better when they review it on several separate days.|This method is called spaced practice rather than last-minute repetition.|A short retrieval quiz can reveal which concepts need additional attention.|Mistakes become useful when learners receive accurate feedback afterward.|Rest periods allow students to return to difficult material with renewed concentration.|The ideal schedule depends on how complex the topic is and when it will be tested.|Instructors can distribute small exercises throughout an academic term.|Consistent practice is usually more reliable than one exhausting study session."],["Satellite mapping","Geography","Satellites record images that reveal changes across forests, farms, and cities.|Sensors detect different wavelengths of light reflected by the ground.|Analysts compare images from several dates to identify newly cleared land.|Cloud cover can limit the usefulness of ordinary optical photographs.|Radar instruments may provide observations when skies are cloudy.|Field measurements are necessary to confirm what an image appears to show.|Public mapping projects help communities monitor environmental changes.|The strongest conclusions combine remote observations with local knowledge."],["Soil organisms","Ecology","Healthy soil contains fungi, bacteria, and many small animals.|These organisms break down dead material and release nutrients for plants.|Earthworms create channels that can improve the movement of water.|Frequent disturbance may reduce populations of some beneficial soil species.|Scientists collect samples to compare the biological activity of different fields.|Adding organic matter can provide food for organisms below the surface.|Moisture and temperature strongly influence how quickly decomposition occurs.|Soil management therefore involves living communities as well as minerals."],["Energy storage","Engineering","Solar panels generate electricity only when sunlight reaches their surfaces.|Batteries can store part of this energy for use after sunset.|Engineers evaluate storage systems according to efficiency, cost, and expected lifetime.|Some batteries lose capacity gradually after many charging cycles.|Large power networks may combine several storage technologies for different tasks.|Pumped storage moves water uphill when electricity is abundant and releases it later.|Reliable planning also considers safety, raw materials, and maintenance.|No single solution is ideal for every climate or electricity demand."],["Language change","Linguistics","Languages evolve as speakers adopt new expressions and pronunciation patterns.|Words can spread quickly through travel, entertainment, and digital communication.|Younger speakers sometimes use familiar terms in unexpected ways.|Linguists record conversations to observe variation rather than assuming one form is universal.|A pronunciation may be common in one region but unusual in another.|Changes usually emerge gradually through many everyday interactions.|Historical documents reveal how meanings and spellings have shifted over time.|Studying variation helps explain the connection between language and identity."],["Food preservation","Chemistry","People have preserved food for centuries by controlling moisture and temperature.|Drying reduces the water available to many microorganisms.|Refrigeration slows biological activity but does not make all foods safe forever.|Fermentation uses selected microbes to produce acids and other compounds.|Researchers monitor acidity and storage conditions when evaluating a preservation method.|Packaging must limit contamination while allowing appropriate transportation.|Different foods require different treatments because their chemical properties vary.|Clear instructions help consumers handle preserved products safely."],["Migration of marine animals","Marine biology","Some marine animals travel thousands of kilometers between feeding and breeding areas.|Researchers attach temporary tracking devices to study these journeys.|Recorded positions reveal how animals respond to ocean currents and temperature.|Migration routes may cross several countries' fishing zones.|Conservation measures are more effective when neighboring governments coordinate their efforts.|Shipping noise and artificial lighting can create additional challenges for certain species.|Tracking data should be interpreted with attention to sample size and equipment limitations.|These studies illuminate the connection between animal behavior and changing habitats."],["Museum conservation","Arts and culture","Museums preserve fragile objects so future visitors can study them.|Conservators first examine an artifact before attempting any treatment.|Bright light can damage pigments and delicate paper over time.|Controlled humidity reduces some risks associated with environmental fluctuations.|Staff document every intervention to distinguish original material from later repairs.|Digital photographs allow researchers to compare an object across many years.|A display must balance public access with the need for protection.|Conservation decisions depend on material science, history, and ethical judgment."],["Urban transport planning","Civic life","Transportation planners study how residents move between homes, schools, and workplaces.|Reliable buses can reduce the need for individual car journeys.|Frequency matters because a route is less useful when passengers wait too long.|Dedicated lanes sometimes improve travel times on congested roads.|Researchers assess accessibility for wheelchair users and people carrying heavy luggage.|Public consultations identify problems that traffic counts alone might miss.|Budgets require planners to choose among competing improvements.|Successful systems connect neighborhoods while limiting unnecessary environmental costs."],["Exoplanet detection","Astronomy","Astronomers search for planets orbiting stars far beyond our solar system.|Some planets are discovered when they briefly dim the light of their stars.|Repeated observations help distinguish real transits from random changes in brightness.|The size of the dimming provides clues about the planet's approximate diameter.|Other instruments measure the motion of stars influenced by planetary gravity.|Atmospheric studies are difficult because distant signals are extremely faint.|Scientists combine several methods before making strong claims about possible habitability.|Each new discovery expands the range of known planetary systems."],["Disaster warnings","Public safety","Early warning systems combine measurements with plans for communicating danger.|River sensors can detect a rapid rise in water level.|Forecast models estimate where flooding may occur in the coming hours.|A technically accurate warning is ineffective if residents never receive it.|Authorities therefore test mobile alerts, sirens, and community communication networks.|Messages must explain both the risk and the recommended action.|Practice drills help identify barriers faced by older adults and people with disabilities.|Preparedness depends on trust and clear communication as much as technology."],["Crop rotation","Agriculture","Farmers sometimes alternate crops to maintain productive soil over many seasons.|Legumes can increase available nitrogen through their relationship with certain bacteria.|Different root systems also affect soil structure and nutrient use.|Growing the same crop repeatedly may encourage particular pests to accumulate.|Agronomists compare harvest results before recommending a rotation schedule.|Local rainfall and market demand influence which crops are practical.|Rotation is most effective when combined with careful irrigation and soil monitoring.|The purpose is long-term stability rather than maximizing a single harvest."],["Recycling electronic devices","Technology and society","Discarded electronic devices contain metals, plastics, and valuable components.|Specialized facilities separate materials that can be processed again.|Some batteries require careful handling because damaged cells may catch fire.|Repairing a device can sometimes reduce waste more effectively than immediate replacement.|Collection programs make it easier for residents to return outdated equipment.|Designers can support recycling by using parts that are easier to disassemble.|Accurate labeling helps workers identify potentially hazardous materials.|Reducing electronic waste involves manufacturers, consumers, and public authorities."],["Music and sound waves","Physics","Musical instruments produce sound when parts of them vibrate.|The frequency of a vibration helps determine the pitch listeners perceive.|Amplitude is related to sound intensity, although perception also depends on context.|A guitar string produces several frequencies at the same time.|The instrument's shape influences which vibrations are amplified.|Musicians alter pitch by changing string length or tension.|Sound engineers use microphones and digital tools to record these patterns.|Understanding acoustics links artistic performance with physical measurement."],["Biodiversity corridors","Conservation","Roads and buildings can divide wildlife habitats into isolated fragments.|Small populations may struggle to find mates or seasonal food.|Ecological corridors connect separated areas through strips of suitable vegetation.|The design must reflect the needs of the species expected to use it.|Camera traps can reveal whether animals actually cross a restored corridor.|Some species require broad forest cover, while others travel along riverbanks.|Community cooperation matters when a corridor passes through privately owned land.|Conservation success depends on both habitat quality and long-term monitoring."],["Historical maps","History","Early maps reveal how people understood the places around them.|Some mapmakers emphasized trading ports while leaving inland areas less detailed.|Decorative symbols often reflected political interests as well as geographic knowledge.|Historians compare maps with travel diaries and administrative records.|A coastline drawn inaccurately does not necessarily mean the entire document lacks value.|The materials and language of a map offer clues about its intended audience.|Digital collections allow scholars to examine documents held in distant archives.|Maps are therefore evidence of historical perspectives, not simply navigation tools."],["Statistics in health studies","Research methods","Researchers use statistics to describe patterns in a sample of observations.|An average can summarize a dataset but may conceal extreme values.|A comparison between groups does not automatically establish a causal relationship.|Careful study design helps reduce the influence of confounding factors.|Confidence intervals communicate uncertainty around numerical estimates.|Transparent reports describe how participants were selected and measurements collected.|Replication tests whether similar findings appear under comparable conditions.|Responsible interpretation distinguishes strong evidence from an appealing explanation."],["Community gardens","Urban life","Community gardens turn unused land into spaces for growing plants together.|Residents may share tools, watering schedules, and harvest responsibilities.|Garden meetings create opportunities for neighbors from different backgrounds to cooperate.|Raised beds can help manage soil quality where the ground has been disturbed.|Organizers must plan for seasonal maintenance and access to water.|Some gardens donate a portion of their produce to local food programs.|Successful projects establish clear rules for using common resources.|Beyond food production, these spaces can support learning and social connection."],["Artificial intelligence in education","Human-centered computing","Educational software can provide practice questions tailored to a learner's recent mistakes.|However, automatic recommendations may be based on incomplete information.|Teachers need to understand why a system suggests particular activities.|Clear explanations can help students judge whether feedback is relevant.|Privacy safeguards are important when software collects learning records.|Schools should test accessibility before introducing a new digital platform.|Human instructors remain responsible for major decisions about assessment and support.|Useful technology complements careful teaching rather than replacing it."]];
const supplementaryTopics = window.__TOEFL_ADDITIONAL_TOPICS__ || [];
const topics = [...existingTopics, ...supplementaryTopics];
if (topics.length !== 50) throw Error("Expected 50 academic topics");
const oldRevisions = [["words-01","Learning through retrieval","Reviewing material repeatedly may create familiarity without proving that a student can recall it independently. When learners try to remember a concept without opening their notes, they practice reconstructing the information. This effort reveals gaps that passive rereading can hide. A short quiz is useful only when accurate feedback follows it. Students can then return to the ideas they missed and explain them in their own words. Over several study sessions, this cycle can support more durable understanding."],["words-02","A changing river","Rivers continually reshape their channels as water carries sediment downstream. During heavy rainfall, the stronger current moves particles that normally rest on the riverbed. When flow slows, much of this material settles along the banks. The repeated movement of sand and gravel can gradually alter a channel's position. Researchers compare measurements from different seasons to distinguish temporary changes from lasting patterns. These observations help communities evaluate flood risk and plan construction near active rivers."],["words-03","The value of repair","Repair workshops help communities extend the useful life of everyday household objects. At these events, volunteers show participants how to diagnose simple problems and replace damaged parts. The process can reduce waste while teaching practical skills. Some repairs take only a few minutes, but others require special tools or careful safety checks. Organizers may record which objects are most often repaired so they can plan future sessions. Sharing knowledge also makes neighbors less dependent on discarding items that could still be used."]];
const wordCount = text => (text.match(/\b[A-Za-z]+(?:['’][A-Za-z]+)?\b/g) || []).length;
const knownFunctionWords = new Set("a an the and as at be been being but by can did do does for from had has have he her hers him his how if in into is it its may might more most not of on or our out over she so some than that their them there these they this those through to under until up was were what when where which while who will with would you your".split(" "));
const grammar = {
  "a":"The indefinite article introduces a singular count noun.",
  "an":"The indefinite article introduces a noun phrase beginning with a vowel sound.",
  "the":"The definite article identifies a specific noun in the passage.",
  "and":"The conjunction adds a parallel idea or joins two elements.",
  "but":"The conjunction signals a contrast between ideas.",
  "or":"The conjunction links alternatives rather than combining both choices.",
  "of":"The preposition expresses a relationship between the surrounding nouns.",
  "in":"The preposition connects an event or item to its setting or context.",
  "on":"The preposition connects the action to a surface, topic or time.",
  "to":"The word links a verb to a destination, purpose or infinitive construction.",
  "for":"The preposition indicates a purpose, recipient or duration.",
  "with":"The preposition indicates association, accompanying conditions or means.",
  "by":"The preposition can identify an agent, method or position.",
  "from":"The preposition identifies a source, starting point or origin.",
  "at":"The preposition indicates a location, point or target.",
  "as":"The word establishes a comparison, role or simultaneous situation.",
  "is":"The present singular verb connects the subject to its description.",
  "are":"The present plural verb agrees with its subject.",
  "was":"The past singular verb agrees with its subject.",
  "were":"The past plural verb agrees with its subject.",
  "has":"The singular auxiliary or main verb agrees with its subject.",
  "have":"The plural auxiliary or main verb agrees with its subject.",
  "they":"The pronoun refers back to a plural noun previously established.",
  "their":"The possessive determiner refers to something belonging to a plural group.",
  "them":"The object pronoun refers back to people or things named earlier.",
  "these":"The demonstrative determiner points back to nearby plural items.",
  "this":"The demonstrative points to a specific previously mentioned idea.",
  "that":"The word links a subordinate clause or identifies a particular thing.",
  "which":"The relative pronoun introduces information about an earlier noun.",
  "when":"The conjunction identifies the time or condition of an event.",
  "while":"The conjunction shows simultaneous events or contrasts.",
  "because":"The conjunction introduces a reason for a result.",
  "although":"The conjunction establishes a contrast or concession.",
  "during":"The preposition identifies the time span of an activity.",
  "before":"The word establishes an earlier time or a required sequence.",
  "after":"The word establishes a later time or consequence.",
  "can":"The modal expresses ability or possibility before a base-form verb.",
  "may":"The modal expresses possibility rather than certainty.",
  "will":"The modal projects an expected or future event.",
  "should":"The modal introduces advice or a reasonable expectation.",
  "some":"The determiner indicates an unspecified quantity.",
  "many":"The determiner quantifies a plural group.",
  "more":"The comparative expresses a greater amount or degree.",
  "each":"The determiner highlights individual members of a group.",
  "both":"The determiner refers to two elements together.",
  "not":"The adverb negates the following claim.",
  "only":"The focusing adverb limits the claim to a particular case.",
  "also":"The adverb introduces an additional related point.",
  "often":"The adverb indicates frequency rather than one isolated event.",
  "than":"The comparison word links different degrees or quantities.",
  "over":"The preposition identifies a span, location or degree.",
  "into":"The preposition expresses movement or transition.",
  "under":"The preposition identifies lower location or a governing condition.",
  "other":"The adjective distinguishes one set from another.",
  "such":"The determiner introduces an example or type.",
  "most":"The determiner or adverb specifies a majority or highest degree."
};
function explain(word, sentence, pre, answer, topic) {
 const key=word.toLowerCase(), wordRole=grammar[key];
 const morphological=key.endsWith("ing") && key.length>5
   ? "The -ing ending fits the progressive or participial form in this sentence."
   : key.endsWith("ed") && key.length>4
   ? "The -ed ending is relevant to the verb form or derived adjective here."
   : key.endsWith("ly") && key.length>4
   ? "The -ly ending is commonly used for adverbs modifying actions or descriptions."
   : key.endsWith("tion") || key.endsWith("ment")
   ? "The noun ending identifies a process, result or concept."
   : "The academic context and surrounding words identify the required meaning.";
 const clue=sentence.length>170?sentence.slice(0,167)+"…":sentence;
 return "Complete “"+pre+"” as “"+word+"” in: “"+clue+"” "+
   (wordRole||morphological)+" The "+answer.length+" missing letter"+
   (answer.length===1?"":"s")+" are “"+answer+"”; the entire word has "+
   word.length+" letters. The passage topic is "+topic.toLowerCase()+".";
}
function buildPieces(paragraph, topic) {
 const end=paragraph.indexOf(". ");
 if(end<0)throw Error("Missing complete first sentence for "+topic);
 const prefix=paragraph.slice(0,end+2), body=paragraph.slice(end+2);
 const matches=[...body.matchAll(/\b[A-Za-z]+\b/g)]
   .filter(x=>x[0].length>=2 && /^[A-Za-z]+$/.test(x[0]))
   .map(x=>({word:x[0],pos:x.index+prefix.length}));
 if(matches.length<21)throw Error("Too few words after opening sentence: "+topic);
 // ETS describes the second half of approximately every second word in an
 // initial sequence after the complete first sentence, including function words.
 const candidates=[0,1].map(parity=>matches.filter((_,i)=>i%2===parity).slice(0,10));
 const functions=p=>p.filter(x=>knownFunctionWords.has(x.word.toLowerCase())).length;
 let selected=candidates[functions(candidates[1])>=functions(candidates[0])?1:0].slice();
 if(selected.length!==10)throw Error("Cannot find ten slots for "+topic);
 // Only rarely adjust a selection to maintain a realistic grammar/vocabulary mix.
 if(functions(selected)<2) {
   const other=matches.slice(0,25).filter(x=>knownFunctionWords.has(x.word.toLowerCase())&&!selected.includes(x));
   while(functions(selected)<2 && other.length) {
     const replacement=other.shift();
     const idx=selected.findIndex(x=>!knownFunctionWords.has(x.word.toLowerCase()));
     if(idx<0)break;
     selected[idx]=replacement;
   }
 }
 selected.sort((a,b)=>a.pos-b.pos);
 const pieces=[];let prior=0;
 for(const x of selected){
   pieces.push(paragraph.slice(prior,x.pos));
   const split=Math.ceil(x.word.length/2),pre=x.word.slice(0,split),answer=x.word.slice(split);
   const from=paragraph.lastIndexOf(". ",x.pos-2);
   const to=paragraph.indexOf(".",x.pos);
   const fullSentence=paragraph.slice(from<0?0:from+2,to<0?paragraph.length:to+1).trim();
   pieces.push({pre,answer,explanation:explain(x.word,fullSentence,pre,answer,topic)});
   prior=x.pos+x.word.length;
 }
 pieces.push(paragraph.slice(prior));
 return pieces;
}
const sentenceLists=[
 [1,2,3,4,5,6],
 [2,3,4,5,6,7],
 [1,3,4,5,6,7],
 [1,2,3,5,6,7]
];
const focus=["Processes","Evidence","Applications","Implications"];
const extended=[];
for(let t=0;t<topics.length;t++){
 const [title,area,narrative]=topics[t],sentences=narrative.split("|");
 if(sentences.length!==8)throw Error("Expected 8 original sentences in "+title);
 for(let variant=0;variant<4;variant++){
   if(extended.length===197)break;
   let sentenceIDs=[0,...sentenceLists[variant]];
   let paragraph=sentenceIDs.map(i=>sentences[i]).join(" ");
   if(wordCount(paragraph)<70){
     const remaining=[0,1,2,3,4,5,6,7].find(i=>!sentenceIDs.includes(i));
     if(remaining===undefined)throw Error("Cannot extend short passage "+title);
     sentenceIDs.splice(sentenceIDs.length-1,0,remaining);
     paragraph=sentenceIDs.map(i=>sentences[i]).join(" ");
   }
   const words=wordCount(paragraph);
   if(words<70||words>100)throw Error("Passage must be 70–100 words: "+title+" "+words);
   const n=extended.length+1;
   const difficulty=["Easy","Medium","Hard","Mixed"][(t+variant)%4];
   extended.push({
     id:"ctw26-ext-"+String(n).padStart(3,"0"),
     type:"complete-words",
     title:"CTW 2026 · "+String(n).padStart(3,"0")+" — "+title+" ("+focus[variant]+")",
     difficulty,pack:"Complete the Words · Official-format 200",
     topic:area,words,
     pieces:buildPieces(paragraph,title),
     seconds:difficulty==="Hard"?240:180
   });
 }
}
const revised={};
for(const [id,title,paragraph] of oldRevisions){
 const words=wordCount(paragraph);
 if(words<70||words>100)throw Error("Original revised passage outside length requirement: "+id);
 revised[id]={
   title,difficulty:"Mixed",pack:"Campus & discovery",
   pieces:buildPieces(paragraph,title),seconds:180
 };
}
if(extended.length!==197||Object.keys(revised).length!==3)throw Error("Expected 197 extended + 3 original");
if(new Set(extended.map(x=>x.id)).size!==197)throw Error("Duplicate IDs");
if(extended.some(x=>x.pieces.filter(p=>typeof p==="object").length!==10))throw Error("Not ten endings");
Object.defineProperty(window,"__TOEFL_ACADEMIC_TOPICS__",{value:topics,configurable:false});
Object.defineProperty(window,"__TOEFL_CTW_200_EXT__",{value:extended,configurable:false});
Object.defineProperty(window,"__TOEFL_CTW_REVISED__",{value:revised,configurable:false});
})();