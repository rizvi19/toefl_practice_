import fs from 'node:fs';
import crypto from 'node:crypto';
import {clozes,daily,academics} from '../simulator/last-day/reading.mjs';
import {responses,conversations,announcements} from '../simulator/last-day/listening.mjs';
import {talks} from '../simulator/last-day/talks.mjs';
import {writing,emails,discussions,speaking} from '../simulator/last-day/productive.mjs';
import {timing} from '../simulator/config.js';
const folder='simulator/last-day/forms';fs.mkdirSync(folder,{recursive:true});
function shuffle(values,id){let seed=parseInt(crypto.createHash('sha256').update(id).digest('hex').slice(0,8),16);const next=()=>{seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;return (seed>>>0)/4294967296;},a=[...values];for(let j=a.length-1;j>0;j--){const k=Math.floor(next()*(j+1));[a[j],a[k]]=[a[k],a[j]];}return a;}
function choices(activity,prefix,properties){return activity.qs.map((q,i)=>{const id=prefix+'-q'+(i+1),order=shuffle([0,1,2,3],id);return {id,type:'choice',prompt:q.stem,options:order.map(j=>q.options[j]),answer:order.indexOf(q.answer),explanation:q.explanation,skill:q.skill,...properties};});}
function cloze(text,id){const split=text.split(/\{([^|{}]+)\|([^{}]+)\}/),pieces=[];for(let j=0;j<split.length;j+=3){pieces.push(split[j]);if(j+1<split.length)pieces.push({pre:split[j+1],answer:split[j+2]});}if(pieces.filter(p=>typeof p==='object').length!==10)throw Error('Cloze needs ten gaps: '+id);return {id,type:'cloze',task:'complete-words',title:'Complete the Words',pieces,count:10,skill:'vocabulary in context'};}
const titles=['Places and Evidence','Learning and Change','Making Connections','Working Together','Choices and Information'],catalog=[];
for(let i=0;i<5;i++){
 const id='last-day-'+String(i+1).padStart(2,'0');
 const readActivity=(a,key,task)=>choices(a,key,{task,title:a.title,passage:a.text,documentType:task==='daily-life'?'notice':'academic',stimulusId:key});
 const stim=(a,key,kind)=>({id:key,kind,title:a.title||kind,script:a.script,preparedPath:`./last-day/media/${key}.mp3`,manifestPath:'./last-day/audio-manifest.json'});
 function listening(module){const part=module===1,base=id+'-l'+module,items=[];
  for(const [j,row] of responses[i].slice(part?0:12,part?12:17).entries()){const key=base+'-response'+(j+1),activity={qs:[{stem:'Choose the best response.',options:row.slice(1),answer:0,explanation:'The keyed reply addresses the speaker’s intention in this exchange: '+row[0],skill:'pragmatic response'}]};items.push(...choices(activity,key,{task:'response',title:'Listen and Choose a Response',stimulus:stim({script:row[0]},key,'response')}));}
  for(const [kind,bank,start,end] of [['conversation',conversations,part?0:3,part?3:5],['announcement',announcements,part?0:2,part?2:4],['academic-talk',talks,part?0:2,part?2:3]])for(const [j,a] of bank[i].slice(start,end).entries()){const key=base+'-'+kind+(j+1);items.push(...choices(a,key,{task:kind,title:a.title,stimulus:stim(a,key,kind)}));}return items;
 }
 const stages=[
 {id:'reading-1',section:'Reading',label:'Module 1',seconds:1140,review:true,items:[cloze(clozes[i][0],id+'-r1-c1'),cloze(clozes[i][1],id+'-r1-c2'),...daily[i].flatMap((a,j)=>readActivity(a,id+'-r1-d'+j,'daily-life')),...academics[i].slice(0,2).flatMap((a,j)=>readActivity(a,id+'-r1-a'+j,'academic-passage'))]},
 {id:'reading-2',section:'Reading',label:'Module 2',seconds:540,review:true,items:[cloze(clozes[i][2],id+'-r2-c1'),...readActivity(academics[i][2],id+'-r2-a1','academic-passage')]},
 {id:'listening-1',section:'Listening',label:'Module 1',items:listening(1)},
 {id:'listening-2',section:'Listening',label:'Module 2',items:listening(2)},
 {id:'sentences',section:'Writing',label:'Build a Sentence',seconds:360,review:true,items:writing[i].map((q,j)=>{const key=id+'-w'+(j+1),chunks=shuffle([...q.solution,...q.extra?[q.extra]:[]],key);return {id:key,type:'sentence',task:'build-sentence',title:'Build a Sentence',prompt:q.prompt,frame:q.frame,chunks,solution:q.solution,correct:q.solution.map((c,k)=>chunks.map((v,i)=>v===c?i:-1).filter(i=>i>=0)[q.solution.slice(0,k).filter(v=>v===c).length]),explanation:q.explanation,alternatives:q.acceptedOrders?.map(order=>order.map(k=>chunks.indexOf(q.solution[k])))};})},
 {id:'email',section:'Writing',label:'Write an Email',seconds:420,items:[{id:id+'-w11',type:'essay',task:'email',title:'Write an Email',...emails[i]}]},
 {id:'discussion',section:'Writing',label:'Academic Discussion',seconds:600,items:[{id:id+'-w12',type:'essay',task:'discussion',title:'Write for an Academic Discussion',...discussions[i]}]},
 {id:'repeat',section:'Speaking',label:'Listen and Repeat',context:speaking[i].context,items:speaking[i].repeat.map((script,j)=>({id:id+'-s'+(j+1),type:'speaking',task:'repeat',title:'Listen and Repeat',prompt:'Listen and repeat once.',target:script,responseSeconds:timing.repeat[j],stimulus:stim({script},id+'-repeat'+(j+1),'repeat')}))},
 {id:'interview',section:'Speaking',label:'Take an Interview',context:speaking[i].interviewContext,items:speaking[i].interview.map((script,j)=>({id:id+'-s'+(j+8),type:'speaking',task:'interview',title:'Take an Interview',prompt:'Answer the interviewer’s question.',question:script,responseSeconds:45,stimulus:stim({script},id+'-interview'+(j+1),'interview')}))}
 ];
 for(const st of stages){let n=st.section==='Writing'&&st.id!=='sentences'?st.id==='email'?11:12:st.id==='interview'?8:1;for(const q of st.items){q.number=n;n+=q.count||1;q.testId=id;q.difficulty='mixed practice';}}
 const form={id,version:1,title:`Last Day Mock ${String(i+1).padStart(2,'0')} · ${titles[i]}`,description:'Original fixed mixed-difficulty practice modeled on the guide’s task types and content ranges.',original:true,adaptive:false,collection:'last-day',taskIntroductions:true,baseCount:120,audioLeadInSeconds:3,repeatLeadInSeconds:3,stages};
 fs.writeFileSync(`${folder}/${id}.json`,JSON.stringify(form,null,2)+'\n');catalog.push({id,title:form.title,path:`./last-day/forms/${id}.json`,version:1,original:true});
}
fs.writeFileSync('simulator/last-day/index.json',JSON.stringify(catalog,null,2)+'\n');console.log('Built five new 120-item Last Day mocks.');
