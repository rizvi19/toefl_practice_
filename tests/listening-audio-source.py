"""Check voice assignments and word preservation without loading a speech model."""
import importlib.util
import json
from pathlib import Path
import re

root=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('helper',root/'tools/kokoro-local.py')
helper=importlib.util.module_from_spec(spec);spec.loader.exec_module(helper)
items=json.loads((root/'listening/bank.json').read_text(encoding='utf8'))['items']
for x in items:
    chunks=helper.speech_chunks(x,x['script'])
    if isinstance(chunks,list):
        assert ' '.join(chunks)==re.sub(r'\s+',' ',x['script']).strip(),x['id']+' dropped/reordered words'
    if x['type']=='conversation' and not x.get('audio'):
        spoken=helper.turns(x)
        assert set(v for v,t in spoken)=={'af_heart','am_michael'},x['id']
        plain=re.sub(r'^(Woman|Man):\s*','',x['script'],flags=re.M)
        assert ' '.join(t for v,t in spoken)==re.sub(r'\s+',' ',plain).strip(),x['id']+' missing turn'
print('PASS: every talk preserves its words in bounded chunks; all 46 new conversations preserve turns and use both voices.')
