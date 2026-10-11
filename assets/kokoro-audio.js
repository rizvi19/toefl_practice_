// Optional recordings and a loopback helper. No change to activity/progress data.
const manifestURL=new URL('../audio/generated/manifest.json',import.meta.url);
const helper='http://127.0.0.1:8766';
export async function checkKokoroConnection(){
  try{
    const response=await fetch(helper+'/api/kokoro/status',{signal:AbortSignal.timeout(5000)});
    const info=await response.json();
    if(!response.ok||info.service!=='toefl-kokoro')throw new Error('Wrong helper');
    return info.pilot_only?'Helper connected in pilot-only mode. Restart with --allow-generation.':'Kokoro helper connected. Missing Listening audio will generate when you press Play.';
  }catch{return 'Cannot connect. Start the local helper and allow this site’s local connection if your browser asks. Browser speech remains available.';}
}
async function manifest(){
  return fetch(manifestURL,{cache:'no-store',signal:AbortSignal.timeout(5000)})
    .then(r=>r.ok?r.json():{recordings:{}}).catch(()=>({recordings:{}}));
}
export async function resolveListeningAudio(item,settings={},onProgress=()=>{}){
  if(item.audio)return {url:new URL(item.audio,document.baseURI).href,label:'Recorded narration'};
  const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(item.script)))).map(x=>x.toString(16).padStart(2,'0')).join('');
  const entry=(await manifest()).recordings?.[item.id];
  if(entry&&/^audio\/generated\/[A-Za-z0-9_-]+\.mp3$/.test(entry.path)){
    if(digest===entry.script_sha256)return {url:new URL(entry.path,document.baseURI).href,label:'Kokoro American English'};
  }
  if(settings.audioMode==='kokoro-browser'){
    try{
      const {browserKokoroAudio}=await import('./browser-kokoro.js?v=1');
      return await browserKokoroAudio(item,digest,onProgress);
    }catch(error){
      console.warn('Browser Kokoro:',error);
      return {fallback:true,label:'Kokoro could not load · using browser English voice'};
    }
  }
  if(settings.audioMode==='kokoro'){
    try{
      const response=await fetch(helper+'/api/kokoro/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:item.id,script_sha256:digest}),signal:AbortSignal.timeout(180000)});
      if(response.ok){
        const entry=await response.json();
        if(entry.script_sha256===digest&&entry.url===`/toefl_practice_/audio/generated/${item.id}.mp3`)
          return {url:helper+entry.url,label:'Kokoro American English · local'};
      }
    }catch{/* Missing helper/recording retains browser narration. */}
    return {fallback:true,label:'Kokoro unavailable · using browser English voice'};
  }
  return null;
}
