export type Register='spoken'|'academic'|'email'|'mixed';
export interface LearningItem {
 id:string;canonicalForm:string;aliases:string[];acceptedForms:string[];itemType:'word'|'collocation'|'discourse marker'|'formal email phrase';meaning:string;
 grammarPattern:string;prepositions:string[];register:Register;tags:string[];priorityTier:'A'|'B';memoryFamily:string;original:boolean;
 goodExample:string;errorAnswer?:string;wrongExample:string;wrongExampleKind:string;commonError:string;clozeSentence:string;clozeAnswer:string;
 scenarioPrompt:string;transferPrompt:string;mnemonic:string;notes:string;interviewExample:string|null;emailExample:string|null;academicExample:string|null;
 storyIds?:string[];collocations?:string[];sourceRefs:{sourceFile:string;sourceId:string;originalForm:string;sourceLabel:string;csvRecord?:number;physicalPage?:number;printedPage?:number;editorial?:boolean;example:string;grammarNote?:string}[];
}
export type Grade=0|1|2|3;
export type Direction='situation'|'meaning'|'cloze'|'register'|'error'|'transfer';
export type Evidence='recognize'|'retrieve'|'use'|'repair';
export interface CardState {id:string;seen:number;lapses:number;streak:number;due:number;recognize:number;retrieve:number;use:number;successContexts:string[];retrievalContexts?:string[];repairContexts:string[];recovering:boolean;latencies:number[];lastAt:number;favorite:boolean;deprioritized:boolean;lastGrade?:number;updatedAt?:number;customTags?:string[];}
export interface RecallEvent {id:string;itemId:string;at:number;grade:Grade;evidence:Evidence;context:string;mode:string;latency:number;errorType:string;selfReported:boolean;}
export interface Settings {version:1|2;groupSize?:number;roundSize?:number;mountainKind?:string;mountainLevels?:Record<string,number>;completedLevels?:Record<string,number[]>;load?:40|60|90;weakest:string;accent:string;timezone:string;newPerDay?:number;startedAt:number;theme:string;audioEngine:string;asrModel:string;rate:number;}
export interface QueueEntry {id:string;direction:Direction;context:string;repeat:boolean;afterIds?:string[];wait?:number;}
export interface StudySession {id:string;version:1;queue:QueueEntry[];pending:QueueEntry[];index:number;history:string[];attempts:Record<string,number>;max:number;finished:boolean;startedAt:number;revealed:boolean;cardStarted:number;answerLatency?:number;promptedRetry?:boolean;typed:string;feedback:object|null;mountain?:{kind:string;summit:number;groupSize:number;poolSize:number;fullPool:boolean}|null;}
