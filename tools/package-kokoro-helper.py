"""Rebuild the portable helper with the exact current public Listening catalog."""
import json
from pathlib import Path
import sys
import zipfile

root=Path(__file__).resolve().parents[1]
bank=json.loads((root/'listening/bank.json').read_text(encoding='utf8'))
assert bank['bankVersion']=='listening-2026-v2' and len(bank['items'])==200
catalog=[{k:x[k] for k in ['id','type','title','script']}|{'originalAudio':x.get('audio')} for x in bank['items']]
files={
    'Launch-Kokoro.cmd':(root/'tools/Launch-Kokoro.cmd').read_text(encoding='utf8').replace('\n','\r\n').encode('utf8'),
    'tools/kokoro-local.py':(root/'tools/kokoro-local.py').read_text(encoding='utf8').encode('utf8'),
    'listening-catalog.json':(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n').encode('utf8'),
    'README.txt':b'Current Listening v2: 200 activities; all have bundled website recordings. The helper is optional for missing/changed audio.\nSetup: https://rizvi19.github.io/toefl_practice_/docs/kokoro.html\nRun Launch-Kokoro.cmd with your existing Kokoro Python, model and FFmpeg. No installation or downloads occur. Keep the helper running. Only requested audio generates. Refresh this catalog when published scripts change.\n',
}
target=root/'docs/Kokoro-Local-Helper.zip'
if '--check' in sys.argv:
    with zipfile.ZipFile(target) as z:
        assert z.testzip() is None
        assert set(z.namelist())==set(files)
        for name,raw in files.items():assert z.read(name)==raw,name+' stale in portable helper'
    print('PASS: portable helper contents match the current source and 200-script catalog.')
    raise SystemExit(0)
with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as z:
    for name,raw in sorted(files.items()):
        info=zipfile.ZipInfo(name,(2026,10,17,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED
        info.external_attr=0o644<<16;z.writestr(info,raw)
with zipfile.ZipFile(target) as z:
    assert z.testzip() is None
    assert json.loads(z.read('listening-catalog.json'))==catalog
print('PASS: current 200-script portable helper, no models/installers/publisher references.')
