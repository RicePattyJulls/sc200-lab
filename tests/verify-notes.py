"""Offline verification against the private source; never copies its text into the site."""
from pathlib import Path
import argparse
import hashlib
import json
import subprocess

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('source', nargs='?', type=Path,
                    default=Path(__file__).resolve().parents[2] / 'SC-200.md')
args = parser.parse_args()
project = Path(__file__).resolve().parents[1]
metadata = json.loads(subprocess.check_output([
    'node', '-e',
    "global.SC={};require('./notes-source');console.log(JSON.stringify({source:SC.notesSource,sections:SC.noteSections}));"
], cwd=project, text=True))
raw = args.source.read_bytes()
assert hashlib.sha256(raw).hexdigest() == metadata['source']['sha256'], 'El documento difiere de la revisión registrada'
lines = raw.decode().splitlines(keepends=True)
assert len(lines) == metadata['source']['lineCount']
for key, section in metadata['sections'].items():
    start, end = section['lines']
    excerpt = ''.join(lines[start - 1:end]).encode()
    assert hashlib.sha256(excerpt).hexdigest() == section['sha256'], key
print(f"PASS: documento original intacto; {len(metadata['sections'])} referencias de sección verificadas sin red.")
