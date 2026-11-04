"""Extract numbered entries and ruled vocabulary tables, without executing PDF text.
Requires pypdf and Poppler's pdftotext. Only re-run when the source PDF changes.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess
import tempfile
import xml.etree.ElementTree as ET
from pypdf import PdfReader

parser = argparse.ArgumentParser()
parser.add_argument('pdf', type=Path)
parser.add_argument('--output', type=Path, default=Path('recall/source/masterbook-extracted.json'))
args = parser.parse_args()
reader = PdfReader(args.pdf)

def clean(text):
    text = re.sub(r'[\u00ad\u2010-\u2011-]\s*\n\s*', '', text)
    return re.sub(r'\s+', ' ', text).strip()

with tempfile.TemporaryDirectory(prefix='toefl-vocabulary-') as temp:
    layout = Path(temp) / 'layout.txt'
    bbox = Path(temp) / 'bbox.html'
    subprocess.run(['pdftotext', '-layout', str(args.pdf), str(layout)], check=True)
    subprocess.run(['pdftotext', '-bbox-layout', str(args.pdf), str(bbox)], check=True)
    pages = layout.read_text(encoding='utf8').split('\f')
    expressions, families, vocabulary = [], [], []
    family = None
    entry = None
    for page_number, text in enumerate(pages, 1):
        if not 21 <= page_number <= 41:
            continue
        for line in text.splitlines():
            line = line.strip()
            if line.startswith(('TOEFL 2026 /', 'Task‐first study guide')):
                continue
            match = re.match(r'FAMILY\s+(\d+)\s*/\s*(.+)', line)
            if match:
                family = {'number': int(match[1]), 'name': clean(match[2]), 'physicalPage': page_number, 'printedPage': page_number - 3}
                families.append(family)
                entry = None
                continue
            match = re.match(r'#(\d+)\s+(.+?)\s+(ACADEMIC|CONVERSATIONAL|BOTH)\s*$', line)
            if match:
                entry = {'number': int(match[1]), 'term': match[2], 'register': match[3], 'familyNumber': family['number'], 'family': family['name'], 'meaning': '', 'example': '', 'physicalPage': page_number, 'printedPage': page_number - 3}
                expressions.append(entry)
            elif entry and line.startswith('Meaning:'):
                entry['meaning'] = line.removeprefix('Meaning:').strip()
            elif entry and line.startswith('Use:'):
                entry['example'] = line.removeprefix('Use:').strip()
            elif entry and line and not line.startswith('SITUATION TRIGGER'):
                field = 'example' if entry['example'] else 'meaning'
                entry[field] += '\n' + line
    for entry in expressions:
        for field in ['term', 'meaning', 'example']:
            entry[field] = clean(entry[field])

    ns = '{http://www.w3.org/1999/xhtml}'
    xml_pages = list(ET.parse(bbox).iter(ns + 'page'))
    for page_number, xml_page in enumerate(xml_pages, 1):
        words = [{'text': w.text or '', **{key: float(value) for key, value in w.attrib.items()}} for w in xml_page.iter(ns + 'word')]
        headers = [w for w in words if w['text'] == 'COLLOCATION' and all(any(v['text'] == name and abs(v['yMin']-w['yMin']) < 2 for v in words) for name in ['WORD','MEANING','EXAMPLE'])]
        if not headers:
            continue
        header_y = headers[0]['yMin']
        columns = []
        for heading in ['WORD', 'MEANING', 'COLLOCATION', 'EXAMPLE']:
            options = [w for w in words if w['text'] == heading and abs(w['yMin'] - header_y) < 2]
            if len(options) != 1:
                raise ValueError(f'Ambiguous table header on page {page_number}')
            columns.append(options[0]['xMin'] - 1)
        columns.append(float(xml_page.attrib['width']))
        height = float(reader.pages[page_number - 1].mediabox.height)
        horizontal, position = [], [0, 0]
        def operand(op, operands, cm, tm):
            if op == b'm':
                position[:] = [float(operands[0]) + cm[4], float(operands[1]) + cm[5]]
            if op == b'l':
                x, y = float(operands[0]) + cm[4], float(operands[1]) + cm[5]
                top = height - y
                if abs(y - position[1]) < .01 and abs(x - position[0]) > 400 and top > header_y + 8:
                    horizontal.append(round(top, 3))
        reader.pages[page_number - 1].extract_text(visitor_operand_before=operand)
        expected_rows = 12 if 42 <= page_number <= 45 else 15
        boundaries = [header_y + 9] + sorted(set(horizontal))[:expected_rows]
        if len(boundaries) != expected_rows + 1:
            raise ValueError(f'Missing ruled rows on page {page_number}')
        page_label = next((line.strip() for line in pages[page_number-1].splitlines() if re.match(r'(READING|LISTENING|WRITING|SPEAKING)\s*/|EXTRA TOPIC:', line.strip())), 'Vocabulary table')
        for row_number, (top, bottom) in enumerate(zip(boundaries, boundaries[1:]), 1):
            cells = []
            for left, right in zip(columns, columns[1:]):
                cell = [w for w in words if left <= w['xMin'] < right and top <= (w['yMin'] + w['yMax'])/2 < bottom]
                lines = {}
                for w in sorted(cell, key=lambda w: (round(w['yMin'], 1), w['xMin'])):
                    y = round(w['yMin'], 0)
                    lines.setdefault(y, []).append(w)
                cells.append(clean('\n'.join(' '.join(w['text'] for w in sorted(line, key=lambda w:w['xMin'])) for line in lines.values())))
            if not any(cells):
                continue
            if not all(cells) or len(cells[0]) > 40:
                raise ValueError(f'Invalid extracted row on page {page_number}: {cells}')
            vocabulary.append(dict(zip(['term', 'meaning', 'collocation', 'example'], cells)) | {'physicalPage': page_number, 'printedPage': page_number - 3, 'section': page_label, 'row': row_number})

assert len(expressions) == 220 and set(e['number'] for e in expressions) == set(range(1, 221)), 'Expression coverage mismatch'
assert len(families) == 30, 'Family coverage mismatch'
assert len(vocabulary) == 228, f'Vocabulary count mismatch: {len(vocabulary)}'
assert all(e['meaning'] and e['example'] for e in expressions), 'Empty expression field'
output = {'version': 1, 'sourceFile': args.pdf.name, 'sha256': hashlib.sha256(args.pdf.read_bytes()).hexdigest(), 'pages': len(reader.pages), 'expressions': expressions, 'families': families, 'vocabulary': vocabulary, 'audit': {'expectedExpressions': 220, 'parsedExpressions': len(expressions), 'expectedFamilies': 30, 'parsedFamilies': len(families), 'expectedVocabularyRecords': 228, 'parsedVocabularyRecords': len(vocabulary), 'uniqueVocabularyForms': len({v['term'].casefold() for v in vocabulary}), 'method': 'Poppler layout + word bounding boxes, with pypdf ruled-table row boundaries. Physical and printed pages retained.'}}
args.output.parent.mkdir(parents=True, exist_ok=True)
args.output.write_text(json.dumps(output, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
print(json.dumps(output['audit'], indent=2))
