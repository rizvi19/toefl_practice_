// Runs only after Play for an activity needing audio. CPU WASM; one quantized model.
let tts,loading,TextSplitter,encoderReady=false,queue=Promise.resolve();
function turns(item){
  if(item.type!=='conversation'){const number=Number(item.id.match(/(\d+)$/)?.[1]);return [{voice:item.type==='academic-talk'&&number%2===0?'am_michael':'af_heart',text:item.script.trim()}];}
  return item.script.split(/\n+/).filter(x=>x.trim()).map(line=>{const m=line.match(/^\s*(Woman|Man):\s*(.+)$/);if(!m)throw Error('Conversation speaker labels are not supported');return {voice:m[1]==='Woman'?'af_heart':'am_michael',text:m[2]}});
}
async function load(progress){
  if(tts)return tts;
  if(!loading)loading=(async()=>{
    progress('Loading browser Kokoro · first use downloads about 118 MB');
    const {KokoroTTS,TextSplitterStream,env}=await import('./vendor/kokoro-1.2.1.web.js');
    TextSplitter=TextSplitterStream;
    env.wasmPaths='https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.5.1/dist/';
    return await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX',{dtype:'q8',device:'wasm',progress_callback:p=>{
      if(p.status==='progress'&&p.file?.endsWith('.onnx'))progress(`Downloading Kokoro model · ${Math.round(p.progress||0)}%`);
      else if(p.status==='done'&&p.file?.endsWith('.onnx'))progress('Preparing Kokoro voices…');
    }});
  })().catch(e=>{loading=null;throw e});
  tts=await loading;return tts;
}
async function run(item){
  const progress=message=>postMessage({job:item.job,type:'progress',message});
  const engine=await load(progress),started=performance.now(),parts=[],voices=new Set(),sr=24000;
  const spoken=turns(item);
  for(let i=0;i<spoken.length;i++){
    const turn=spoken[i];voices.add(turn.voice);progress(`Creating Kokoro audio · ${i+1} / ${spoken.length}`);
    // Stream splits long scripts at sentence boundaries so academic talks are not truncated.
    const text=new TextSplitter();text.push(turn.text);text.close();
    for await(const chunk of engine.stream(text,{voice:turn.voice,speed:0.95})){
      const data=chunk.audio.audio;if(!data?.length)throw Error('Kokoro returned no audio');
      parts.push(data);parts.push(new Float32Array(Math.round(sr*0.12)));
    }
    parts.push(new Float32Array(Math.round(sr*(item.type==='conversation'?0.32:0.18))));
  }
  progress('Saving Kokoro MP3…');
  const length=parts.reduce((n,p)=>n+p.length,0),audio=new Float32Array(length);let offset=0,peak=0;
  for(const part of parts){audio.set(part,offset);offset+=part.length;for(const sample of part){if(!Number.isFinite(sample))throw Error('Invalid Kokoro audio');peak=Math.max(peak,Math.abs(sample))}}
  if(peak<0.01)throw Error('Kokoro returned silent audio');
  const pcm=new Int16Array(length);for(let i=0;i<length;i++)pcm[i]=Math.round(Math.max(-1,Math.min(1,audio[i]*0.9/peak))*32767);
  if(!encoderReady){importScripts('./vendor/lame-1.2.1.min.js');encoderReady=true}
  const encoder=new lamejs.Mp3Encoder(1,sr,48),chunks=[];
  for(let i=0;i<pcm.length;i+=1152){const chunk=encoder.encodeBuffer(pcm.subarray(i,i+1152));if(chunk.length)chunks.push(new Uint8Array(chunk))}
  const tail=encoder.flush();if(tail.length)chunks.push(new Uint8Array(tail));
  const bytes=new Uint8Array(chunks.reduce((n,x)=>n+x.length,0));offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length}
  postMessage({job:item.job,type:'done',mp3:bytes.buffer,duration:length/sr,seconds:(performance.now()-started)/1000,voices:[...voices]},[bytes.buffer]);
}
onmessage=({data})=>{queue=queue.then(()=>run(data)).catch(e=>postMessage({job:data.job,type:'error',message:e.message||'Kokoro could not generate audio'}))};
