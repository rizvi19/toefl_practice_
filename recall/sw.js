const CACHE='toefl-recall-shell-v2';
const FILES=['./index.html','./style.css?v=2','./lab.js?v=2','./views.js','./mountain-views.js','./mountain-engine.js','./engine.js','./storage.js','./schema.js','./audio.js','./icon.svg','./manifest.webmanifest','./data/master_bank.json','./data/activities.json','./data/source_report.json','../simulator/speech.js','../simulator/storage.js','../assets/browser-kokoro.js'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('toefl-recall-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 const url=new URL(event.request.url),base=new URL('./',self.location.href),allowed=url.href.startsWith(base.href)||FILES.some(f=>new URL(f,base).href===url.href);
 if(!allowed)return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const response=await fetch(event.request);if(response.ok)await cache.put(event.request,response.clone());return response;}catch{const saved=await cache.match(event.request);if(saved)return saved;if(event.request.mode==='navigate')return cache.match(new URL('./index.html',self.location.href));return new Response('This optional file is not cached. Connect to the internet to prepare audio.',{status:503,headers:{'Content-Type':'text/plain'}});}})());
});
