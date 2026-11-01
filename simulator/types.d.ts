export type Section='Reading'|'Listening'|'Writing'|'Speaking';
export type Phase='directions'|'question'|'await-audio'|'prompt'|'answer'|'recovery'|'beep'|'recording'|'saving'|'saved'|'mic-error'|'save-error'|'transcription';
export interface Stimulus{id:string;kind:string;title:string;script:string}
export interface Question{id:string;number:number;type:'cloze'|'choice'|'sentence'|'essay'|'speaking';task:string;count?:number;stimulus?:Stimulus;answer?:number;options?:string[];scored?:boolean;responseSeconds?:number;pieces?:(string|{pre:string;answer:string})[];correct?:number[];chunks?:string[];solution?:string[];passage?:string;explanation?:string}
export interface Stage{id:string;section:Section;label:string;seconds?:number;review?:boolean;items?:Question[];branches?:{lower:Question[];higher:Question[]}}
export interface Form{id:string;version:number;title:string;original:boolean;adaptive?:boolean;stages:Stage[]}
export interface Attempt{version:1;id:string;formId:string;formVersion:number;mode:'full'|'practice';status:'preparing'|'directions'|'exam'|'processing'|'complete';phase:Phase;stage:number;index:number;plan:number[];deadline:number|null;answers:Record<string,unknown>;routes:Partial<Record<Section,{branch:'lower'|'higher';stats:{correct:number;total:number};threshold:number}>>;played:Record<string,string>;completed:unknown[];events:unknown[];finishedAt:number|null}
