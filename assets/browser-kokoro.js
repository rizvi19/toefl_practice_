// Separate, bounded cache: existing progress and microphone recordings are untouched.
const DB='toefl-kokoro-generated-v1',LIMIT=20_000_000;
let worker,serial=0;const jobs=new Map();
function openDB(){return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore('audio',{keyPath:'id'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
async function cached(id,sha){
  try{const db=await openDB();try{return await new Promise(resolve=>{const r=db.transaction('audio').objectStore('audio').get(id);r.onsuccess=()=>resolve(r.result?.sha===sha?r.result:null);r.onerror=()=>resolve(null)})}finally{db.close()}}catch{return null}
}
async function save(entry){
  try{const db=await openDB();try{await new Promise((resolve,reject)=>{const tx=db.transaction('audio','readwrite'),store=tx.objectStore('audio');store.put(entry);const r=store.getAll();r.onsuccess=()=>{const rows=r.result.sort((a,b)=>a.created-b.created);let used=rows.reduce((n,x)=>n+x.blob.size,0);for(const x of rows){if(used<=LIMIT)break;if(x.id!==entry.id){store.delete(x.id);used-=x.blob.size}}};tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)})}finally{db.close()}}catch{/* Playback works even if browser storage is unavailable. */}
}
function generate(item,onProgress){
  if(!worker){
    worker=new Worker(new URL('./browser-kokoro-worker.js?v=1',import.meta.url));
    worker.onmessage=({data})=>{const job=jobs.get(data.job);if(!job)return;if(data.type==='progress'){job.progress(data.message);return}clearTimeout(job.timer);jobs.delete(data.job);data.type==='done'?job.resolve(data):job.reject(new Error(data.message))};
    worker.onerror=()=>{for(const job of jobs.values()){clearTimeout(job.timer);job.reject(new Error('Browser Kokoro could not start'))}jobs.clear();worker.terminate();worker=null};
  }
  return new Promise((resolve,reject)=>{const job=++serial;const timer=setTimeout(()=>{const pending=jobs.get(job);if(pending){jobs.delete(job);reject(new Error('Kokoro took too long. Try a shorter activity or another browser.'))}},600000);jobs.set(job,{resolve,reject,timer,progress:onProgress});worker.postMessage({job,id:item.id,type:item.type,script:item.script})})
}
export async function browserKokoroAudio(item,sha,onProgress=()=>{}){
  let entry=await cached(item.id,sha);
  if(!entry){
    const result=await generate(item,onProgress);
    entry={id:item.id,sha,blob:new Blob([result.mp3],{type:'audio/mpeg'}),created:Date.now(),duration:result.duration,seconds:result.seconds,voices:result.voices};
    await save(entry);
  }
  return {url:URL.createObjectURL(entry.blob),label:'Kokoro American English · browser',release:true,details:{bytes:entry.blob.size,duration:entry.duration,seconds:entry.seconds,voices:entry.voices}};
}
