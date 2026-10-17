"""Create reproducible site/source archives without Git history or private references."""
from pathlib import Path
import hashlib
import sys
import zipfile

root = Path(__file__).resolve().parents[1]
destination = Path(sys.argv[1] if len(sys.argv) > 1 else 'release').resolve()
if destination == root or root in destination.parents:
    raise SystemExit('Choose an output directory outside the repository.')
destination.mkdir(parents=True, exist_ok=True)
common = ['index.html', 'library.html', 'README.md', 'VERIFICATION.md', 'example-bank.json', 'LICENSE.txt', 'PUBLISHING.txt',
          'THIRD_PARTY_NOTICES.md', 'assets', 'audio', 'collections', 'docs', 'exam', 'reading', 'listening']
source = common + ['package.json', 'package-lock.json',
                   'tests', 'tools', '.github']
checksums = []
for kind, entries in [('Pages', common), ('Editable', source)]:
    archive = destination / f'TOEFL_Studio_{kind}_Reading222_Items1400_Listening200_Questions450.zip'
    paths = set()
    for entry in entries:
        path = root / entry
        paths.update([path] if path.is_file() else path.rglob('*'))
    with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as output:
        for path in sorted(paths):
            if not path.is_file() or any(part in ['__pycache__', 'screenshots'] for part in path.parts):
                continue
            if path.name.endswith(('.partial.mp3', '.tmp')):
                continue
            info = zipfile.ZipInfo(path.relative_to(root).as_posix(), (2026, 10, 17, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            output.writestr(info, path.read_bytes(), compresslevel=9)
    with zipfile.ZipFile(archive) as output:
        assert output.testzip() is None
        assert {'reading/engine.js', 'reading/library-bank.js', 'reading/bank.json',
                'listening/engine.js', 'listening/library-bank.js', 'listening/bank.json',
                'exam/bank.json', 'example-bank.json', 'index.html', 'library.html'} <= set(output.namelist())
        output.extractall(destination / f'extracted-{kind.lower()}')
    checksums.append(f'{hashlib.sha256(archive.read_bytes()).hexdigest()}  {archive.name}')
    print(f'Verified {archive.name}: {archive.stat().st_size:,} bytes')
(destination / 'SHA256SUMS.txt').write_text('\n'.join(checksums) + '\n', encoding='utf8')
