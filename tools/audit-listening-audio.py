"""Decode every active recording and record reproducible integrity/volume evidence."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess

root=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser(description=__doc__)
p.add_argument('--ffmpeg',default=shutil.which('ffmpeg'))
p.add_argument('--allow-pending',action='store_true',help='Audit completed files while recording generation continues.')
args=p.parse_args()
if not args.ffmpeg:p.error('Supply the path to an existing FFmpeg executable.')
bank=json.loads((root/'listening/bank.json').read_text(encoding='utf8'))['items']
manifest=json.loads((root/'audio/generated/manifest.json').read_text(encoding='utf8'))['recordings']
rows=[];pending=[]
for x in bank:
    entry=manifest.get(x['id'])
    if not x.get('audio') and not entry:
        assert args.allow_pending,x['id']+' recording is missing'
        pending.append(x['id']);continue
    rel=x.get('audio') or entry['path'];path=root/rel
    if not x.get('audio'):
        assert entry['script_sha256']==hashlib.sha256(x['script'].encode()).hexdigest(),x['id']
        assert entry['bytes']==path.stat().st_size,x['id']
    result=subprocess.run([args.ffmpeg,'-hide_banner','-nostats','-i',str(path),'-af','volumedetect','-f','null','-'],capture_output=True,text=True,check=True)
    log=result.stderr
    mean=float(re.search(r'mean_volume: ([-\d.]+) dB',log)[1])
    peak=float(re.search(r'max_volume: ([-\d.]+) dB',log)[1])
    assert peak>-40 and mean>-60,(x['id'],'silent or unusually quiet',mean,peak)
    rows.append({'id':x['id'],'path':rel,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'bytes':path.stat().st_size,'mean_dbfs':mean,'peak_dbfs':peak})
report={'method':'FFmpeg full decode plus volumedetect; peak > -40 dBFS, mean > -60 dBFS; new script SHA-256 and byte sizes checked. This checks file integrity and non-silence, not human pronunciation or accent quality.','activities':len(rows),'newKokoroMP3s':sum(not x.get('audio') for x in bank)-len(pending),'pending':pending,'recordings':rows}
(root/'docs/LISTENING_AUDIO_AUDIT.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf8',newline='\n')
print(f'PASS: {len(rows)} completed recordings decode and pass non-silence checks; {len(pending)} pending.')
