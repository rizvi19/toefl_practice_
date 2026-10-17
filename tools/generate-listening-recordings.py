"""Use the existing local Kokoro installation; bounded serial batches release memory.

No dependencies, model, system settings or installed helper files are modified.
Run with D:/LocalTTS/venv/Scripts/python.exe on the author's Windows machine.
"""
import argparse
import importlib.util
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--worker', nargs='+')
parser.add_argument('--batch-size', type=int, default=4)
parser.add_argument('--threads', type=int, default=4)
parser.add_argument('--kokoro-home',type=Path,default=Path(os.environ.get('KOKORO_HOME','D:/LocalTTS')))
parser.add_argument('--ffmpeg',type=Path,default=Path(os.environ.get('FFMPEG_EXE',shutil.which('ffmpeg') or str(Path.home()/'AppData/Local/Programs/Stremio/ffmpeg.exe'))))
args = parser.parse_args()
if not 1 <= args.batch_size <= 20 or not 1 <= args.threads <= 4:
    parser.error('Use batch size 1–20 and threads 1–4.')

if args.worker:
    spec = importlib.util.spec_from_file_location('local_audio', root / 'tools/kokoro-local.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    engine = module.Engine(args.kokoro_home, args.ffmpeg, 200)
    engine.load()
    import torch
    torch.set_num_threads(args.threads)
    for activity_id in args.worker:
        engine.generate(activity_id)
else:
    bank = json.loads((root / 'listening/bank.json').read_text(encoding='utf8'))['items']
    recordings = json.loads((root / 'audio/generated/manifest.json').read_text(encoding='utf8'))['recordings']
    import hashlib
    pending = [x['id'] for x in bank if not x.get('audio') and (
        x['id'] not in recordings or recordings[x['id']]['script_sha256'] != hashlib.sha256(x['script'].encode()).hexdigest()
        or not (root / recordings[x['id']]['path']).is_file())]
    print(f'Preparing {len(pending)} missing/stale recordings in serial batches.', flush=True)
    for start in range(0, len(pending), args.batch_size):
        command = [sys.executable, __file__, '--threads', str(args.threads), '--kokoro-home',str(args.kokoro_home),'--ffmpeg',str(args.ffmpeg),'--worker', *pending[start:start + args.batch_size]]
        result = subprocess.run(command, cwd=root)
        if result.returncode:
            raise SystemExit('A batch failed. Completed recordings are preserved; rerun to resume.')
    print('All current Listening recordings are prepared.', flush=True)
