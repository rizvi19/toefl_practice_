import {VERSION} from './constants.js';
export {VERSION,TYPES,COUNTS} from './constants.js';
export const words=s=>(s.replace(/^(?:Woman|Man|Student|Professor|Librarian|Coordinator|Staff member):\s*/gm,'').match(/\b[A-Za-z]+(?:['’-][A-Za-z]+)*\b/g)||[]).length;
export const q=(questionType,stem,options,evidence,reason,reject)=>({questionType,stem,options,answer:0,evidence,rationales:[reason,...reject],explanation:`Question type: ${questionType}. Correct: ${options[0]}. Evidence: “${evidence}” ${reason} ${reject.map((why,i)=>`“${options[i+1]}” is incorrect: ${why}`).join(' ')}`});
export const item=(id,type,title,script,questions,extra={})=>({id,type,title,script,questions,topic:title,family:id,seconds:type==='choose-response'?35:type==='academic-talk'?240:115,pack:'Listening 2026 · Original practice',listeningVersion:VERSION,...extra});
export const response=(n,title,speechAct,script,options,reason,reject)=>item(`l2-r${String(n).padStart(3,'0')}`,'choose-response',title,script,[q('Response Appropriateness','Choose the best response.',options,script,reason,reject)],{speechAct});
export const conversation=(n,title,script,questions)=>item(`l2-c${String(n).padStart(3,'0')}`,'conversation',title,script,questions);
export const announcement=(n,title,script,questions)=>item(`l2-n${String(n).padStart(3,'0')}`,'announcement',title,script,questions);
export const talk=(n,title,script,questions)=>item(`l2-t${String(n).padStart(3,'0')}`,'academic-talk',title,script,questions);
