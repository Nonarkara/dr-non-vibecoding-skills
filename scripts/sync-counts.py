#!/usr/bin/env python3
"""Mechanically synchronize current count surfaces, then run the authority validator."""
from pathlib import Path
import re
import runpy

root = Path(__file__).resolve().parent.parent
counts = {
    'skills': len(list((root/'skills').glob('*/SKILL.md'))),
    'playbooks': len(list((root/'playbooks').glob('[0-9][0-9]-*.md'))),
    'references': len(list((root/'reference').glob('*.md'))),
    'templates': len(list((root/'templates').iterdir()))
}
for name in ('README.md', 'AGENTS.md', 'QUICKSTART.md', 'BLUEPRINT.md'):
    file = root/name
    text = file.read_text()
    for label, count in counts.items():
        text = re.sub(rf'\*\*\d+ {label}\*\*', f'**{count} {label}**', text)
        text = re.sub(rf'(?<=")\d+ {label}(?=")', f'{count} {label}', text)
        text = re.sub(rf'{label}-\d+-', f'{label}-{count}-', text)
        title = label.capitalize()
        text = re.sub(rf'\[!\[{title}: \d+\]', f'[![{title}: {count}]', text)
    if name == 'QUICKSTART.md':
        text = re.sub(r'expect \d+', f'expect {counts["skills"]}', text)
    if name == 'BLUEPRINT.md':
        text = re.sub(r'(wc -l` → )\d+', rf'\g<1>{counts["skills"]}', text)
    if name == 'AGENTS.md':
        text = re.sub(r'load all \d+ on every task', f'load all {counts["skills"]} on every task', text)
    file.write_text(text)
runpy.run_path(str(root/'scripts/validate_repo.py'), run_name='__main__')
