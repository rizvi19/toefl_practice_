import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {count,grade} from '../simulator/core.js';
const read=p=>JSON.parse(fs.readFileSync(p)),hash=v=>crypto.createHash('sha256').update(v).digest('hex');
const catalog=read('simulator/last-day/index.json'),manifest=read('simulator/last-day/audio-manifest.json');
assert.equal(catalog.length,5);assert.equal(manifest.engine,'kokoro-native-q4-prepared-v1');
const sources=new Set(),ids=new Set(),clips=new Set(),report=[];
for(const entry of catalog){
 const form=read('simulator/'+entry.path.slice(2)),items=form.stages.flatMap(s=>s.items),stimuli=new Map(items.filter(q=>q.stimulus).map(q=>[q.stimulus.id,q.stimulus]));
 const sections=Object.fromEntries(['Reading','Listening','Writing','Speaking'].map(name=>[name,count(form.stages.filter(s=>s.section===name).flatMap(s=>s.items))]));
 assert.deepEqual(sections,{Reading:50,Listening:47,Writing:12,Speaking:11});assert.equal(stimuli.size,40);
 const answers=[0,0,0,0];
 for(const q of items){assert(!ids.has(q.id));ids.add(q.id);if(q.type==='choice'){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(grade(q,q.answer)[0].correct);answers[q.answer]++;}if(q.type==='sentence')assert(grade(q,q.correct)[0].correct);}
 let bytes=0,seconds=0;
 for(const a of stimuli.values()){
  assert(!sources.has(a.script),a.id+' repeats another prompt');sources.add(a.script);assert(!clips.has(a.id));clips.add(a.id);
  const rec=manifest.recordings[a.id];assert(rec,'Missing audio: '+a.id);assert.equal(rec.engine,manifest.engine);assert.equal(rec.scriptHash,hash(a.script),a.id+' stale script');assert.equal(rec.path,a.preparedPath);
  const data=fs.readFileSync('simulator/'+rec.path.slice(2));assert.equal(data.length,rec.bytes);assert.equal(hash(data),rec.audioHash,a.id+' damaged audio');assert(rec.duration>0&&rec.rms>.001);
  bytes+=rec.bytes;seconds+=rec.duration;
 }
 report.push({id:form.id,sections,audioClips:stimuli.size,audioBytes:bytes,audioSeconds:Math.round(seconds),choiceKeyDistribution:answers});
}
assert.equal(clips.size,200);assert.equal(Object.keys(manifest.recordings).length,200);
const result={collection:'Last Day Prep',forms:report,items:600,verifiedKokoroClips:200,engine:manifest.engine,checks:['Section counts and unique question IDs','Four distinct options and keyed answers','Canonical sentence answers','Exact prompt-to-audio SHA-256, byte count and non-silent signal','All 200 prepared clips present'],limitations:'Original editorial practice matched to guide task types and text ranges; difficulty is not statistically calibrated by ETS.'};
fs.writeFileSync('docs/LAST_DAY_AUDIT.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
