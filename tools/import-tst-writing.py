"""Import the user's TST Prep PDF. Requires pypdf and Poppler pdftotext.
Usage: python tools/import-tst-writing.py path/to/the.pdf
Only the 30 Build a Sentence tasks are imported; the other task types are separate.
"""
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
import unicodedata
from pypdf import PdfReader

source = Path(sys.argv[1])
reader = PdfReader(source)
normalize = lambda s: ' '.join(unicodedata.normalize('NFKC', s).replace('\u2019', "'").split())
key_text = '\n'.join(reader.pages[i].extract_text() for i in [24, 25])
keys = {int(n): normalize(t) for n, t in re.findall(r'^\s*(\d+)\.\s+(.+)$', key_text, re.M) if int(n) <= 30}
assert len(keys) == 30
text = subprocess.run(['pdftotext', '-layout', '-f', '3', '-l', '13', str(source), '-'], capture_output=True, check=True).stdout.decode('utf-8')
questions = []
for page, part in enumerate(unicodedata.normalize('NFKC', text).split('\f'), 3):
    for match in re.finditer(r'^\s*(\d+)\.\s*\n(.*?)(?=^\s*\d+\.\s*\n|\Z)', part, re.S | re.M):
        number = int(match[1])
        lines = [normalize(line) for line in match[2].splitlines() if normalize(line) and not re.fullmatch(r'\d+', normalize(line))]
        index = next(i for i, line in enumerate(lines) if '_____' in line)
        context, frame = ' '.join(lines[:index]), lines[index]
        pool = normalize(' '.join(lines[index+1:])).split(' / ')
        original_frame, original_pool, notes = frame, list(pool), []
        if number == 5:
            frame = frame.replace('_____.', '_____ _____.')
            notes.append('Source correction: one missing blank was added after the fixed word delayed; the printed answer key needs seven supplied chunks.')
        if number == 10:
            frame = frame.replace('_____?', '_____ _____?')
            pool.append('she')
            notes.append('Source correction: a second she tile and one blank were added. Both subjects are needed for the sentence in the printed key.')
        segments, answer = re.split(r'_{3,}', frame), keys[number]
        clean = lambda value: normalize(value).lower()

        def solve(i, position, used, order):
            fixed = clean(segments[i])
            rest = clean(answer)[position:].lstrip()
            position = len(clean(answer)) - len(rest)
            if not rest.startswith(fixed):
                return None
            position += len(fixed)
            if i == len(segments)-1:
                return order if not clean(answer)[position:].strip() else None
            rest = clean(answer)[position:].lstrip()
            position = len(clean(answer)) - len(rest)
            for token, phrase in enumerate(pool):
                p = clean(phrase)
                if token not in used and rest.startswith(p) and (len(rest) == len(p) or not rest[len(p)].isalnum()):
                    result = solve(i+1, position+len(p), used | {token}, order+[token])
                    if result is not None:
                        return result
            return None

        order = solve(0, 0, set(), [])
        assert order is not None, (number, frame, pool, answer)
        fixed = [{'after': i, 'text': segments[i].strip()} for i in range(1, len(segments)-1) if segments[i].strip()]
        ending = segments[-1].strip()
        suffix = (' ' if ending and ending[0].isalnum() else '') + ending
        questions.append({'id': f'tst-2026-s{number:02}', 'sourceNumber': number, 'context': context, 'prefix': segments[0].strip(), 'chunks': [pool[t].lower() for t in order], 'suffix': suffix, 'extra': [t.lower() for i, t in enumerate(pool) if i not in order], 'fixedInsertions': fixed, 'sourceFrame': original_frame, 'sourcePool': original_pool, 'sourceAnswer': answer, 'sourcePage': page, 'sourceKeyPage': 25 if number <= 20 else 26, 'sourceNotes': notes})
assert len(questions) == 30
document = {'title': 'TST Prep Free Writing Practice 2026', 'sourceUrl': 'https://media.tstprep.com/freebies/2026/toefl-writing-100-questions-freebie-2026.pdf', 'sha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'questions': questions}
target = Path(__file__).resolve().parents[1] / 'writing/tst-source.js'
target.write_text('// Extracted from the user-supplied PDF; source defects are recorded per item.\nexport default ' + json.dumps(document, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
print('Imported all 30 Build a Sentence tasks; corrected source defects in items 5 and 10.')
