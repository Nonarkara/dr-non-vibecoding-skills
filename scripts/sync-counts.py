#!/usr/bin/env python3
"""Mechanically synchronize the current count surfaces, then run the authority.

The counts live on more surfaces than the badge: the README's four-shapes table,
the tree map, AGENTS.md, the deck and the ecosystem reference all state the
collection's size in prose. Those numbers drifted for two generations — the
deck said 69 in its body and 169 in its headline while the tree held 184 —
because nothing checked them. `scripts/validate_repo.py` now reads them, and
this tool rewrites them.

Two things are shared with the validator, so the writer and the checker cannot
disagree:

- the pattern table that decides what a count claim is, and
- `collection_counts()`, the one function that says how many of each shape the
  repo holds.

The writer only rewrites count surfaces. A count claim in a skill file is
still checked by the gate, but it is the author's sentence to fix: this tool
cannot know whether "33 skills" is somebody else's collection.
"""
from pathlib import Path
import importlib.util
import re
import runpy
import sys

root = Path(__file__).resolve().parent.parent

# Load the validator as a module so both tools read the same definitions.
spec = importlib.util.spec_from_file_location(
    "validate_repo", root / "scripts" / "validate_repo.py"
)
validate_repo = importlib.util.module_from_spec(spec)
spec.loader.exec_module(validate_repo)

counts = validate_repo.collection_counts()

# A number on a line that is not part of a count claim, minus the ones that
# cannot be a count: a table index (01), a percentage (65%), a year (2026), a
# number inside a link target. What is left could be a count the gate cannot
# read, and a line holding one of those must not be rewritten underneath it.
#
# Inline code is NOT masked: "The 184 skills are not `169` things to memorise"
# is exactly the sentence this rule exists to stop, and the number hides in
# backticks because that is how this repo writes things.
_LINK_TARGET = re.compile(r"\]\([^)]*\)")
_URL = re.compile(r"https?://\S+")
_NUMBER = re.compile(r"(?<![\w~+=.-])(\d{2,})(?![\w-])")
# The word after the number may sit behind a closing backtick or quote: the
# number in "`169` things" is a count, and the backtick is only punctuation.
_WORD_AFTER = re.compile(r"^[`'\"’”)\]]*\s*[A-Za-z][\w-]*")


def _blank(match: re.Match[str]) -> str:
    return " " * len(match.group(0))


def unreadable_numbers(line: str) -> list[str]:
    """Numbers on the line that the gate does not read as a count claim."""
    spans = [(m.start(), m.end()) for m in validate_repo.COUNT_CLAIM_PATTERN.finditer(line)]
    rest = line
    for start, end in reversed(spans):
        rest = rest[:start] + " " * (end - start) + rest[end:]
    rest = _LINK_TARGET.sub(_blank, rest)
    rest = _URL.sub(_blank, rest)
    numbers: list[str] = []
    for match in _NUMBER.finditer(rest):
        number = match.group(1)
        if number.startswith("0"):
            continue
        if match.end() < len(rest) and rest[match.end()] == "%":
            continue
        if re.fullmatch(r"(19|20)\d\d", number):
            continue
        if not _WORD_AFTER.match(rest[match.end() : match.end() + 30]):
            continue
        numbers.append(number)
    return numbers


def rewrite_verb(match: re.Match[str], fixed_label: str) -> str:
    truth = counts.get(fixed_label)
    if truth is None:
        return match.group(0)
    return match.group(0).replace(match.group(1), str(truth))


def sync_claims(text: str, relative: str) -> tuple[str, list[str], list[str]]:
    """Rewrite every count claim to the number the repo actually holds.

    A line that holds a claim and another number the gate cannot read is left
    alone: rewriting one number and leaving the other is how a sentence ends
    up holding two generations of the same count. The writer refuses the line
    and says so, and the gate fails on it, and the author rewrites the
    sentence. Fenced code is rewritten too — the README's tree map and its
    mermaid graph are inside a fence and both state the collection's size.

    Every change is reported: file, line, old number, new number. The writer
    makes a number true; it does not know what the sentence meant, so the
    author has to see what it did.
    """
    refused: list[str] = []
    written: list[str] = []
    pieces: list[str] = []
    for index, line in enumerate(text.splitlines(keepends=True), start=1):
        if validate_repo.COUNT_CLAIM_PATTERN.search(line):
            unreadable = unreadable_numbers(line)
            if unreadable:
                refused.append(
                    f"{relative}:{index} holds {', '.join(unreadable)} next to a count "
                    f"claim — rewrite the sentence"
                )
                pieces.append(line)
                continue
        pieces.append(rewrite_line(line, relative, index, written))
    return "".join(pieces), refused, written


def rewrite_line(line: str, relative: str, index: int, written: list[str]) -> str:
    """Rewrite the claims on one line, recording what changed.

    A count inside quotation marks is somebody else's sentence. The writer
    leaves it alone: rewriting "Their repo lists "91 skills"" into "Their repo
    lists "184 skills"" would put a false sentence in the repository.
    """
    quoted = [(match.start(), match.end()) for match in validate_repo.QUOTED_SPAN.finditer(line)]

    def replace(match: re.Match[str]) -> str:
        if any(start <= match.start(1) < end for start, end in quoted):
            return match.group(0)
        label = validate_repo.alias_label(match.group("alias"))
        truth = counts.get(label) if label else None
        if truth is None:
            return match.group(0)
        old = match.group(1)
        if int(old.replace(",", "")) == truth:
            return match.group(0)
        written.append(f"{relative}:{index} '{old} {label}' → '{truth} {label}'")
        start = match.start(1) - match.start(0)
        end = match.end(1) - match.start(0)
        return match.group(0)[:start] + str(truth) + match.group(0)[end:]

    return validate_repo.COUNT_CLAIM_PATTERN.sub(replace, line)


changed: list[str] = []
refused: list[str] = []
written: list[str] = []
for path in validate_repo.count_surfaces():
    original = path.read_text(encoding="utf-8")
    updated, lines, edits = sync_claims(original, str(path.relative_to(root)))
    refused.extend(lines)
    written.extend(edits)
    if updated != original:
        path.write_text(updated, encoding="utf-8")
        changed.append(str(path.relative_to(root)))

# The badge fragments, the mermaid labels and the bootstrap's expected count live
# in forms the pattern table does not name, so they keep their own handling.
# Every other form goes through the pattern table, so the writer cannot rewrite
# a threshold or another collection's count that the table excludes.
def rewrite_specials(text: str, relative: str, written: list[str]) -> str:
    """The forms the pattern table does not name, rewritten and reported."""
    pieces: list[str] = []
    for index, line in enumerate(text.splitlines(keepends=True), start=1):
        updated = line
        for label, count in counts.items():
            # The badge fragment is "skills-184-"; "designskills-91-archive" is
            # somebody else's string and must not be rewritten.
            updated = re.sub(
                rf'(?<![\w-]){label}-(\d+)-', lambda m: f'{label}-{count}-', updated
            )
            title = label.capitalize()
            updated = re.sub(
                rf'\[!\[{title}: (\d+)\]', lambda m: f'[![{title}: {count}]', updated
            )
        updated = re.sub(r'\["(\d+) refs"\]', lambda m: f'["{counts["references"]} refs"]', updated)
        updated = re.sub(
            r'# expect (\d+)\b', lambda m: f'# expect {counts["skills"]}', updated
        )
        updated = re.sub(
            r'(wc -l` → )(\d+)', lambda m: f'{m.group(1)}{counts["skills"]}', updated
        )
        updated = re.sub(
            r'load all (\d+) on every task',
            lambda m: f'load all {counts["skills"]} on every task',
            updated,
        )
        if updated != line:
            old = re.findall(r"\d+", line)
            new = re.findall(r"\d+", updated)
            change = next(
                (f"'{a}' → '{b}'" for a, b in zip(old, new) if a != b),
                "form rewritten",
            )
            written.append(f"{relative}:{index} {change}")
            pieces.append(updated)
        else:
            pieces.append(line)
    return "".join(pieces)


for name in ("README.md", "AGENTS.md", "QUICKSTART.md", "BLUEPRINT.md"):
    file = root / name
    relative = str(file.relative_to(root))
    original = file.read_text(encoding="utf-8")
    updated = rewrite_specials(original, relative, written)
    if updated != original:
        file.write_text(updated, encoding="utf-8")
        if relative not in changed:
            changed.append(relative)

for line in written:
    print(f"sync-counts: {line}")
for line in refused:
    print(f"sync-counts: refused {line}", file=sys.stderr)

runpy.run_path(str(root / "scripts" / "validate_repo.py"), run_name="__main__")
