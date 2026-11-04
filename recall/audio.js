import {prepareAudio,preparedAudio,transcribeRecording} from '../simulator/speech.js';
let player,url,utterance,token=0;
export function stopAudio(){token++;player?.pause();player=null;if(url){URL.revokeObjectURL(url);url=null;}globalThis.speechSynthesis?.cancel();}
export async function preparePrompts(prompts,progress,signal){return prepareAudio({stages:[{items:prompts.map(p=>({stimulus:{id:p.id,kind:p.kind||'repeat',title:p.title||p.id,script:p.text}}))}]},progress,signal);}
export async function hear(text,settings,{id='recall-voice',kind='repeat',progress=()=>{},prepared=false}={}){stopAudio();const mine=token;if(settings.audioEngine==='device'){
 if(!('speechSynthesis'in window))throw Error('This browser has no device speech. Read the text or choose Kokoro online.');
 return new Promise((resolve,reject)=>{utterance=new SpeechSynthesisUtterance(text);utterance.lang=settings.accent;utterance.rate=settings.rate||1;utterance.voice=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase()===settings.accent.toLowerCase())||null;utterance.onend=resolve;utterance.onerror=e=>reject(Error(e.error==='not-allowed'?'Device voice playback was blocked. Use the text or retry after a click.':e.error));speechSynthesis.speak(utterance);});
 }
 const stimulus={id,kind,title:id,script:text};if(!prepared)await preparePrompts([{id,text,kind}],progress);if(mine!==token)throw new DOMException('Playback cancelled','AbortError');const entry=await preparedAudio(stimulus);if(mine!==token)throw new DOMException('Playback cancelled','AbortError');url=URL.createObjectURL(entry.blob);player=new Audio(url);player.playbackRate=settings.rate||1;
 return new Promise((resolve,reject)=>{player.onended=resolve;player.onerror=()=>reject(Error('Kokoro playback failed. No replacement voice was used.'));player.play().catch(reject);});
}
export {transcribeRecording};
export async function microphone(){if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)throw Error('Recording is unavailable. Use text practice; the same 45-second timer applies.');return navigator.mediaDevices.getUserMedia({audio:true});}
export function beginRecording(stream){const types=['audio/webm;codecs=opus','audio/mp4','audio/ogg;codecs=opus'],mime=types.find(t=>MediaRecorder.isTypeSupported(t)),r=new MediaRecorder(stream,mime?{mimeType:mime}:undefined),chunks=[];let complete;const done=new Promise((resolve,reject)=>{complete=resolve;r.onerror=e=>reject(Error(e.error?.message||'Recording interrupted'));});r.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};r.onstop=()=>complete(new Blob(chunks,{type:r.mimeType}));r.start(250);return {stop:()=>{if(r.state==='recording')r.stop();return done;},recorder:r};}
export async function beep(){const c=new AudioContext();await c.resume();await new Promise(resolve=>{const o=c.createOscillator(),g=c.createGain();g.gain.value=.07;o.frequency.value=880;o.connect(g).connect(c.destination);o.onended=resolve;o.start();o.stop(c.currentTime+.12);});await c.close();}
