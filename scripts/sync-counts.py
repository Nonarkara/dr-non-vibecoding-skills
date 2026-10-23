#!/usr/bin/env python3
"""Mechanically synchronize current count surfaces, then run the authority validator.

The counts live on more surfaces than the badge: the README's four-shapes table,
the tree description, AGENTS.md, the deck and the infographic companion all
state the collection's size in prose. Those numbers drifted for two generations
— the deck said 69 in its body and 169 in its headline while the tree held 184
— because nothing checked them. `scripts/validate_repo.py` now reads them, and
this tool rewrites them.

One definition of "a count claim" is shared: the pattern table lives in the
validator, and this tool imports it, so the writer and the checker can never
disagree about what counts as a count.
"""
from pathlib import Path
import importlib.util
import re
import runpy

root = Path(__file__).resolve().parent.parent

# Load the validator as a module so both tools read the same pattern table.
spec = importlib.util.spec_from_file_location(
    "validate_repo", root / "scripts" / "validate_repo.py"
)
validate_repo = importlib.util.module_from_spec(spec)
spec.loader.exec_module(validate_repo)

counts = {
    "skills": len(list((root / "skills").glob("*/SKILL.md"))),
    "playbooks": len(list((root / "playbooks").glob("[0-9][0-9]-*.md"))),
    "references": len(list((root / "reference").glob("*.md"))),
    "templates": len(list((root / "templates").iterdir())),
}


def sync_claims(text: str) -> str:
    """Rewrite every count claim in the text to the number the repo actually holds."""
    for pattern, fixed_label in validate_repo.COUNT_CLAIM_PATTERNS:

        def rewrite(match, fixed_label=fixed_label):
            label = fixed_label or match.group(2)
            truth = counts.get(label)
            if truth is None:
                return match.group(0)
            start = match.start(1) - match.start(0)
            end = match.end(1) - match.start(0)
            return match.group(0)[:start] + str(truth) + match.group(0)[end:]

        text = pattern.sub(rewrite, text)
    return text


for path in validate_repo.count_surfaces():
    original = path.read_text(encoding="utf-8")
    updated = sync_claims(original)
    if updated != original:
        path.write_text(updated, encoding="utf-8")
        print(f"sync-counts: {path.relative_to(root)}")

# The badge fragments, the mermaid label and the bootstrap's expected count live
# in forms the pattern table does not name, so they keep their own handling.
for name in ("README.md", "AGENTS.md", "QUICKSTART.md", "BLUEPRINT.md"):
    file = root / name
    text = file.read_text(encoding="utf-8")
    for label, count in counts.items():
        text = re.sub(rf'\*\*\d+ {label}\*\*', f'**{count} {label}**', text)
        text = re.sub(rf'(?<=")\d+ {label}(?=")', f'{count} {label}', text)
        text = re.sub(rf'{label}-\d+-', f'{label}-{count}-', text)
        title = label.capitalize()
        text = re.sub(rf'\[!\[{title}: \d+\]', f'[![{title}: {count}]', text)
    if name == "QUICKSTART.md":
        text = re.sub(r'expect \d+', f'expect {counts["skills"]}', text)
    if name == "BLUEPRINT.md":
        text = re.sub(r'(wc -l` → )\d+', rf'\g<1>{counts["skills"]}', text)
    if name == "AGENTS.md":
        text = re.sub(r'load all \d+ on every task', f'load all {counts["skills"]} on every task', text)
    file.write_text(text, encoding="utf-8")

runpy.run_path(str(root / "scripts" / "validate_repo.py"), run_name="__main__")
