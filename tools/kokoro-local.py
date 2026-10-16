"""Reuse an existing Kokoro installation: selected IDs, or a loopback practice server."""
import argparse, hashlib, json, os, re, shutil, subprocess, threading, time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
PILOT='conversation26-001'
PREFIX='/toefl_practice_/'
MANIFEST=ROOT/'audio/generated/manifest.json'
ALLOWED_ORIGINS={'https://rizvi19.github.io','http://127.0.0.1:8766','http://localhost:8766'}

def catalog():
    portable=ROOT/'listening-catalog.json'
    if portable.is_file():return {x['id']:x for x in json.loads(portable.read_text(encoding='utf-8'))}
    node=shutil.which('node')
    if not node:raise RuntimeError('Existing Node.js not found; supply it on PATH. No installation attempted.')
    result=subprocess.run([node,str(ROOT/'tools/extract-listening.mjs'),str(ROOT)],capture_output=True,text=True,encoding='utf-8',check=True)
    return {x['id']:x for x in json.loads(result.stdout)}

def turns(item):
    if item['type']!='conversation':return [('af_heart',item['script'].strip())]
    result=[]
    for line in item['script'].splitlines():
        if not line.strip():continue
        match=re.fullmatch(r'\s*(Woman|Man):\s*(.+)',line)
        if not match:raise ValueError('Unknown conversation role in '+item['id']+'; inspect before generating.')
        result.append(('af_heart' if match[1]=='Woman' else 'am_michael',match[2]))
    return result

class Engine:
    def __init__(self,installation,ffmpeg,cache_mb):
        self.home=installation;self.ffmpeg=ffmpeg;self.cache_bytes=int(cache_mb*1e6)
        self.items=catalog();self.pipeline=None;self.voices={};self.lock=threading.Lock()
    def load(self):
        if self.pipeline:return
        os.environ.update(HF_HUB_OFFLINE='1',TRANSFORMERS_OFFLINE='1',HF_HUB_DISABLE_TELEMETRY='1')
        import torch
        from kokoro import KModel,KPipeline
        if torch.version.cuda is not None:raise RuntimeError('Expected existing CPU-only PyTorch')
        torch.set_num_threads(4);torch.set_num_interop_threads(1)
        folder=self.home if (self.home/'config.json').is_file() else self.home/'models/kokoro'
        model=KModel(repo_id='hexgrad/Kokoro-82M',config=str(folder/'config.json'),model=str(folder/'kokoro-v1_0.pth')).to('cpu').eval()
        self.pipeline=KPipeline(lang_code='a',model=model,repo_id='hexgrad/Kokoro-82M',device='cpu')
        for voice in ('af_heart','am_michael'):
            self.voices[voice]=torch.load(folder/'voices'/f'{voice}.pt',map_location='cpu',weights_only=True)
    def manifest(self):
        return json.loads(MANIFEST.read_text(encoding='utf-8')) if MANIFEST.exists() else {'version':1,'recordings':{}}
    def generate(self,id,force=False):
        with self.lock:
            item=self.items[id];digest=hashlib.sha256(item['script'].encode()).hexdigest()
            data=self.manifest();existing=data['recordings'].get(id)
            if not force and existing and existing['script_sha256']==digest and (ROOT/existing['path']).is_file():return existing
            if shutil.disk_usage(ROOT).free<100_000_000:raise RuntimeError('Less than 100 MB free; generation stopped')
            started=time.perf_counter();self.load();loaded=time.perf_counter()
            import numpy as np
            parts=[];sr=24000
            spoken=turns(item)
            for voice,text in spoken:
                for result in self.pipeline(text,voice=self.voices[voice],speed=0.95):
                    parts.append(result.audio.numpy());parts.append(np.zeros(int(sr*0.12),dtype=np.float32))
                parts.append(np.zeros(int(sr*(0.32 if item['type']=='conversation' else 0.18)),dtype=np.float32))
            audio=np.concatenate(parts);peak=float(np.abs(audio).max())
            if not np.isfinite(audio).all() or peak<0.01:raise RuntimeError('Invalid/silent Kokoro audio')
            audio=(audio*(0.9/peak)).astype('<f4')
            path=ROOT/'audio/generated'/f'{id}.mp3';path.parent.mkdir(parents=True,exist_ok=True)
            temp=path.with_suffix('.partial.mp3')
            subprocess.run([str(self.ffmpeg),'-hide_banner','-loglevel','error','-y','-f','f32le','-ar',str(sr),'-ac','1','-i','pipe:0','-codec:a','libmp3lame','-b:a','48k','-ar',str(sr),'-ac','1','-map_metadata','-1',str(temp)],input=audio.tobytes(),check=True)
            subprocess.run([str(self.ffmpeg),'-v','error','-i',str(temp),'-f','null','-'],check=True)
            temp.replace(path)
            entry={'path':path.relative_to(ROOT).as_posix(),'script_sha256':digest,'voices':list(dict.fromkeys(v for v,t in spoken)), 'duration_seconds':len(audio)/sr,'bytes':path.stat().st_size,'generation_seconds':time.perf_counter()-loaded,'load_seconds':loaded-started,'created_at':time.time(),'format':'MP3 mono 24 kHz 48 kbps'}
            data['recordings'][id]=entry
            # Evict only generator-owned MP3s recorded in this manifest; preserve pilot and original WAVs.
            used=sum(x['bytes'] for x in data['recordings'].values())
            for key,old in sorted(list(data['recordings'].items()),key=lambda x:x[1]['created_at']):
                if used<=self.cache_bytes:break
                if key in (PILOT,id):continue
                candidate=ROOT/'audio/generated'/f'{key}.mp3'
                if old['path']!=candidate.relative_to(ROOT).as_posix():continue
                candidate.unlink(missing_ok=True);used-=old['bytes'];del data['recordings'][key]
            temp_manifest=MANIFEST.with_suffix('.tmp');temp_manifest.write_text(json.dumps(data,indent=2),encoding='utf-8');temp_manifest.replace(MANIFEST)
            print(json.dumps({'id':id,**entry}),flush=True)
            return entry

def serve(engine,allow_generation):
    class Handler(SimpleHTTPRequestHandler):
        def __init__(self,*a,**kw):super().__init__(*a,directory=str(ROOT),**kw)
        def end_headers(self):
            origin=self.headers.get('Origin')
            if origin in ALLOWED_ORIGINS:
                self.send_header('Access-Control-Allow-Origin',origin);self.send_header('Vary','Origin')
                if self.headers.get('Access-Control-Request-Private-Network')=='true':self.send_header('Access-Control-Allow-Private-Network','true')
            self.send_header('Cache-Control','no-store');super().end_headers()
        def do_OPTIONS(self):
            if self.headers.get('Origin') not in ALLOWED_ORIGINS:self.send_error(403);return
            self.send_response(204);self.send_header('Access-Control-Allow-Methods','POST, OPTIONS');self.send_header('Access-Control-Allow-Headers','Content-Type');self.end_headers()
        def do_GET(self):
            if self.path.split('?')[0]== '/api/kokoro/status':
                self.send_response(200);self.send_header('Content-Type','application/json');self.end_headers();self.wfile.write(json.dumps({'service':'toefl-kokoro','version':2,'ready':(engine.home/'models/kokoro/kokoro-v1_0.pth').is_file() or (engine.home/'kokoro-v1_0.pth').is_file(),'pilot_only':not allow_generation,'pilot':PILOT}).encode());return
            if not self.path.startswith(PREFIX):self.send_error(404);return
            self.path=self.path[len(PREFIX)-1:];super().do_GET()
        def do_POST(self):
            if self.path!='/api/kokoro/generate':self.send_error(404);return
            if self.headers.get('Origin') not in ALLOWED_ORIGINS:self.send_error(403);return
            try:
                size=int(self.headers.get('Content-Length',0))
                if not 0<size<256 or self.headers.get('Content-Type')!='application/json':self.send_error(400);return
                request=json.loads(self.rfile.read(size));id=request['id']
                if id not in engine.items:self.send_error(404);return
                expected=hashlib.sha256(engine.items[id]['script'].encode()).hexdigest()
                if request.get('script_sha256',expected)!=expected:self.send_error(409,'Activity changed; update the helper catalog');return
                if engine.items[id]['originalAudio'] or (id!=PILOT and not allow_generation):self.send_error(409);return
                entry=engine.generate(id);entry={**entry,'url':PREFIX+entry['path']}
                self.send_response(200);self.send_header('Content-Type','application/json');self.end_headers();self.wfile.write(json.dumps(entry).encode())
            except Exception as exc:
                print('Generation failed:',exc,flush=True);self.send_error(500,'Generation failed; use browser narration')
    print('Kokoro helper: http://127.0.0.1:8766',flush=True)
    print('Open https://rizvi19.github.io/toefl_practice_/ and choose Settings > Kokoro (local helper)',flush=True)
    print('Generation scope: '+('selected activities on demand' if allow_generation else 'pilot only; other activities use existing audio/browser speech'),flush=True)
    ThreadingHTTPServer(('127.0.0.1',8766),Handler).serve_forever()

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--kokoro-home',type=Path,default=Path(os.environ.get('KOKORO_HOME','D:/LocalTTS')))
    p.add_argument('--ffmpeg',type=Path,default=Path(os.environ.get('FFMPEG_EXE',shutil.which('ffmpeg') or str(Path(os.environ.get('LOCALAPPDATA',str(Path.home()/'AppData/Local')))/'Programs/Stremio/ffmpeg.exe'))))
    p.add_argument('--id',action='append',default=[]);p.add_argument('--all',action='store_true')
    p.add_argument('--include-original',action='store_true');p.add_argument('--force',action='store_true')
    p.add_argument('--serve',action='store_true');p.add_argument('--allow-generation',action='store_true')
    p.add_argument('--cache-mb',type=float,default=20)
    args=p.parse_args()
    if args.cache_mb<=0:p.error('--cache-mb must be positive')
    if not args.ffmpeg.is_file():p.error('Existing FFmpeg executable not found; supply --ffmpeg')
    engine=Engine(args.kokoro_home,args.ffmpeg,args.cache_mb)
    if args.serve:
        if args.id or args.all:p.error('Do not combine --serve with batch selections')
        serve(engine,args.allow_generation);return
    selected=list(engine.items) if args.all else args.id
    if not selected:p.error('Select --id ACTIVITY_ID, --all, or --serve. No bulk generation by default.')
    if len(selected)!=len(set(selected)) or any(id not in engine.items for id in selected):p.error('Duplicate or unknown activity ID')
    for id in selected:
        if engine.items[id]['originalAudio'] and not args.include_original:continue
        engine.generate(id,args.force)

if __name__=='__main__':main()
