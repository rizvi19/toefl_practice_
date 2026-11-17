"""Render all Last Day prompts with Kokoro, sequentially and with bounded ONNX memory.
Usage: python tools/render-last-day-audio.py model.onnx voices.bin
Requires kokoro-onnx, onnxruntime, numpy and lameenc. Model files stay outside the repo.
"""
from pathlib import Path
import hashlib
import json
import re
import sys
import time
import lameenc
import numpy as np
import onnxruntime as ort
from kokoro_onnx import Kokoro

root = Path(__file__).resolve().parents[1]
folder = root / 'simulator/last-day'
media = folder / 'media'
media.mkdir(exist_ok=True)
manifest_path = folder / 'audio-manifest.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8')) if manifest_path.exists() else {'engine': 'kokoro-native-q4-prepared-v1', 'model': 'Kokoro-82M v1.0 Q4', 'sampleRate': 24000, 'recordings': {}}
manifest['engine'] = 'kokoro-native-q4-prepared-v1'
manifest['model'] = 'Kokoro-82M v1.0 Q4'
options = ort.SessionOptions()
options.intra_op_num_threads = 4
options.inter_op_num_threads = 1
options.enable_cpu_mem_arena = False
options.enable_mem_pattern = False
options.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
session = ort.InferenceSession(sys.argv[1], sess_options=options, providers=['CPUExecutionProvider'])
engine = Kokoro.from_session(session, sys.argv[2])
stimuli = {}
for path in sorted((folder / 'forms').glob('*.json')):
    form = json.loads(path.read_text(encoding='utf-8'))
    for stage in form['stages']:
        for question in stage['items']:
            stimulus = question.get('stimulus')
            if stimulus:
                stimuli[stimulus['id']] = stimulus
started = time.monotonic()
for number, (identity, stimulus) in enumerate(stimuli.items(), 1):
    script = stimulus['script']
    script_hash = hashlib.sha256(script.encode()).hexdigest()
    target = media / (identity + '.mp3')
    old = manifest['recordings'].get(identity)
    if old and old.get('engine') == manifest['engine'] and old['scriptHash'] == script_hash and target.exists() and hashlib.sha256(target.read_bytes()).hexdigest() == old['audioHash']:
        print(f'{number}/{len(stimuli)} cached {identity}', flush=True)
        continue
    turns = []
    if stimulus['kind'] == 'conversation':
        for line in script.splitlines():
            speaker, text = line.split(':', 1)
            turns.append(('af_heart' if speaker.strip() == 'Woman' else 'am_michael', text.strip()))
    else:
        male = stimulus['kind'] in ['interview', 'academic-talk'] and int(re.search(r'\d+$', identity)[0]) % 2 == 0
        turns = [('am_michael' if male else 'af_heart', script)]
    parts = []
    for voice, text in turns:
        # Bound decoder memory. Prefer sentence/clause boundaries, never truncate text.
        chunks = []
        for sentence in re.split(r'(?<=[.!?;])\s+', text):
            words = sentence.split()
            while len(words) > 18:
                stops = [j for j in range(7, 18) if words[j-1].endswith((',', ':'))]
                cut = stops[-1] if stops else 18
                chunks.append(' '.join(words[:cut]))
                words = words[cut:]
            if words:
                chunks.append(' '.join(words))
        assert ' '.join(chunks).split() == text.split(), identity
        for chunk in chunks:
            samples, rate = engine.create(chunk, voice=voice, speed=1.0, lang='en-us', trim=False)
            assert rate == 24000 and np.isfinite(samples).all() and len(samples) > 500, identity
            parts.extend([samples, np.zeros(int(rate * 0.10), dtype=np.float32)])
        parts.append(np.zeros(int(24000 * (0.28 if len(turns) > 1 else 0.10)), dtype=np.float32))
    audio = np.concatenate(parts)
    peak = float(np.abs(audio).max())
    rms = float(np.sqrt(np.mean(audio * audio)))
    assert peak > .01 and rms > .001, identity
    duration = len(audio) / 24000
    word_count = len(re.findall(r"[\w]+(?:['’][\w]+)*", re.sub(r'(?m)^(Woman|Man):\s*', '', script)))
    assert max(.7, word_count * .14) < duration < word_count * 1.2 + 5, (identity, duration, word_count)
    pcm = (np.clip(audio * (.90 / peak), -1, 1) * 32767).astype(np.int16)
    encoder = lameenc.Encoder()
    encoder.set_bit_rate(64)
    encoder.set_in_sample_rate(24000)
    encoder.set_channels(1)
    encoder.set_quality(2)
    data = encoder.encode(pcm.tobytes()) + encoder.flush()
    target.write_bytes(data)
    manifest['recordings'][identity] = {'path': './last-day/media/' + target.name, 'engine': manifest['engine'], 'scriptHash': script_hash, 'audioHash': hashlib.sha256(data).hexdigest(), 'duration': round(duration, 3), 'bytes': len(data), 'rms': round(rms, 5), 'words': word_count, 'voices': sorted(set(voice for voice, _ in turns))}
    manifest_path.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    print(f'{number}/{len(stimuli)} rendered {identity}: {duration:.1f}s, elapsed {time.monotonic()-started:.0f}s', flush=True)
print('All Kokoro prompts rendered and checked.', flush=True)
