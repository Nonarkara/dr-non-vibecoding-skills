#!/usr/bin/env python3
"""Validate the repository's skill, link, count, and plugin invariants."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
SKILLS = ROOT / "skills"
README = ROOT / "README.md"
AGENTS = ROOT / "AGENTS.md"
CATALOG = ROOT / "CATALOG.md"
PLUGIN = ROOT / ".codex-plugin" / "plugin.json"
CODEX_MARKETPLACE = ROOT / ".agents" / "plugins" / "marketplace.json"
CLAUDE_PLUGIN = ROOT / ".claude-plugin" / "plugin.json"
CLAUDE_MARKETPLACE = ROOT / ".claude-plugin" / "marketplace.json"
# Discovery budget scales with the collection. The intent is "descriptions stay
# scannable per skill", not a fixed ceiling — a constant sized for 43 skills goes
# silently stale the next time one is added.
DESCRIPTION_BUDGET_PER_SKILL = 151
MAX_DESCRIPTION_LENGTH = 180
MAX_SKILL_NAME_LENGTH = 64
ALLOWED_FRONTMATTER_KEYS = {"name", "description", "license", "allowed-tools", "metadata"}

# --- Prose counts -------------------------------------------------------------
# The badge in the README is the inventory. Other places restate the same count
# in prose, and each one has drifted at least once, in two generations (the
# deck said 69 in its body and 169 in its headline while the tree held 184).
# A gate that only reads the badge cannot see any of that, so the deck's own
# line — "the counts are deliberate, the validator enforces them" — was false.
#
# The first version of this gate read the four shape words only, and only in
# the five files the README badge sits next to. An independent review showed it
# missing the README's own tree diagram ("# 169 modular agent capabilities"),
# four deck pages, and three skill files outside the list — every one of them
# stale, and all of them invisible to `make validate`. So the rule is now
# broader on both axes: one definition of a count claim, and that definition
# read on every live file in the repo.
#
# Dated records are deliberately excluded: docs/lessons/, docs/relay/ and
# JOURNAL.md record what the repo held on the day they were written, and a
# stale number there is a receipt, not a lie.
COUNT_SURFACE_FILES = (
    "README.md",
    "AGENTS.md",
    "BLUEPRINT.md",
    "QUICKSTART.md",
    "INFOGRAPHICS.md",
    "CONTRIBUTING.md",
    "reference/stack-ecosystem.md",
)
COUNT_SURFACE_DIRS = ("docs/deck",)

DATED_RECORD_DIRS = ("docs/lessons", "docs/relay")
DATED_RECORD_FILES = ("JOURNAL.md",)

# The words this repo uses for its four shapes, and the shape each one names.
# A count claim is a number followed — within two adjectives — by one of these.
# The list is the repo's own vocabulary, not a generic dictionary: it has to
# catch "16 narrative war stories" and "184 `SKILL.md` files" as well as the
# plain "184 skills", or the README's own tree map stays unreadable to the
# gate that is supposed to police it.
SHAPE_ALIASES = {
    "war stories": "playbooks",
    "scaffolding files": "templates",
    "`skill.md` files": "skills",
    "skill.md files": "skills",
    "skill files": "skills",
    "skill descriptions": "skills",
    "numbered playbooks": "playbooks",
    "narratives": "playbooks",
    "capabilities": "skills",
    "blueprints": "references",
    "drop-ins": "templates",
    "docs": "references",
    "skills": "skills",
    "playbooks": "playbooks",
    "references": "references",
    "templates": "templates",
}

# A number behind a comparison word is a threshold, not a claim about the
# collection: "more than 33 skills", "past 160 skills", "at most 20 skills".
_NOT_A_THRESHOLD = (
    "(?<!than )(?<!past )(?<!over )(?<!under )(?<!fewer )(?<!less )(?<!least )"
    "(?<!more )(?<!up to )(?<!only )(?<!just )(?<!at least )(?<!at most )"
    "(?<!below )(?<!roughly )(?<!around )(?<!about )(?<!no more than )"
    "(?<!beyond )(?<!above )(?<!nearly )(?<!some )(?<!approximately )(?<!exactly )"
)

# A number owned by something else is not the total either: "its 25 skills"
# belongs to a skill, "47 more skills" is a difference. The possessives sit
# before the number, the deltas after it, and both are exclusions.
_NOT_A_POSSESSIVE = (
    "(?<!its )(?<!their )(?<!our )(?<!your )(?<!my )(?<!his )(?<!her )"
    "(?<!these )(?<!those )(?<!any )(?<!such )"
)
_NOT_A_DELTA = "(?!(?:more|other|others|extra|additional|per)\\s)"

# A year is not a count. "The 2026 skills catalogue" is a date wearing a
# noun, and the writer rewriting it to "The 184 skills catalogue" is the kind
# of sentence nobody wants in a repository.
_NOT_A_YEAR = "(?!(?:19|20)\\d\\d\\b)"

_ALIAS_PATTERN = "|".join(
    # The docs publish the escaped form — \`SKILL.md\` files — as often as the
    # plain one, and the gate has to read both or the repo's own canonical
    # example is the one form it cannot see.
    re.escape(alias).replace(r"\ ", r"\s+").replace("`", r"\\?`")
    for alias in sorted(SHAPE_ALIASES, key=len, reverse=True)
)

# Two digits is the floor. A one-digit number in this shape is a local thing —
# "3 docs", "2 drop-ins" — and never the size of a collection that holds
# hundreds. It is not a threshold; it is just not this collection.
#
# "N per something" is a rate, not a total: "20 docs per folder" is not a
# claim that the repo holds twenty references.
COUNT_CLAIM_PATTERN = re.compile(
    rf"{_NOT_A_THRESHOLD}{_NOT_A_POSSESSIVE}(?<![\w~+<>=-]){_NOT_A_YEAR}"
    rf"(\d{{1,3}}(?:,\d{{3}})+|\d{{2,}})[*_`]*\s+{_NOT_A_DELTA}"
    rf"(?:[A-Za-z][\w-]*\s+){{0,2}}(?P<alias>{_ALIAS_PATTERN})\b(?!\.[A-Za-z])"
    rf"(?!\s+per\b)",
    re.IGNORECASE,
)

# A count inside quotation marks is somebody else's sentence. The repo cannot
# rewrite what another author wrote, and the author cannot rewrite a quoted
# collection's size into this repo's size — so a quoted count is not a claim.
QUOTED_SPAN = re.compile(r"\"[^\"]*\"|“[^”]*”")

# Two forms the repo uses that name the collection without naming a shape word
# next to the number. Both are quoted in the deck; both are counts.
VERB_CLAIM_PATTERNS = (
    (re.compile(r"load all (\d{2,})\b"), "skills"),
    (re.compile(r"scan all (\d{2,})\b"), "skills"),
)


def alias_label(alias: str) -> str | None:
    """The shape a matched alias names, or None when it names none."""
    key = re.sub(r"\s+", " ", alias.strip().lower()).replace("\\", "")
    return SHAPE_ALIASES.get(key)


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def frontmatter_description(frontmatter: str) -> str | None:
    match = re.search(
        r"(?m)^description:\s*(?:(?:[>|]-?)\s*\n(?P<block>(?:[ \t]+[^\n]*(?:\n|$))+)|(?P<single>[^\n]+)$)",
        frontmatter,
    )
    if not match:
        return None
    if match.group("single") is not None:
        return match.group("single").strip().strip("'\"")
    return " ".join(line.strip() for line in match.group("block").splitlines()).strip()


def validate_skills(errors: list[str]) -> tuple[list[Path], int]:
    skill_dirs = sorted(path for path in SKILLS.iterdir() if path.is_dir())
    names: dict[str, Path] = {}
    description_chars = 0

    for skill_dir in skill_dirs:
        skill_file = skill_dir / "SKILL.md"
        if not skill_file.is_file():
            fail(errors, f"{skill_dir.relative_to(ROOT)}: missing SKILL.md")
            continue

        text = skill_file.read_text(encoding="utf-8")
        if not text.startswith("---\n"):
            fail(errors, f"{skill_file.relative_to(ROOT)}: missing YAML frontmatter")
            continue

        end = text.find("\n---\n", 4)
        if end == -1:
            fail(errors, f"{skill_file.relative_to(ROOT)}: unclosed YAML frontmatter")
            continue

        frontmatter = text[4:end]
        top_level_keys = set(
            re.findall(r"(?m)^([A-Za-z][A-Za-z0-9-]*):(?:\s|$)", frontmatter)
        )
        unexpected_keys = top_level_keys - ALLOWED_FRONTMATTER_KEYS
        if unexpected_keys:
            fail(
                errors,
                f"{skill_file.relative_to(ROOT)}: unsupported frontmatter keys: "
                f"{', '.join(sorted(unexpected_keys))}",
            )
        name_match = re.search(
            r"(?m)^name:\s*['\"]?([a-z0-9-]+)['\"]?\s*$", frontmatter
        )
        if not name_match:
            fail(errors, f"{skill_file.relative_to(ROOT)}: missing valid name")
            continue

        name = name_match.group(1)
        if name != skill_dir.name:
            fail(
                errors,
                f"{skill_file.relative_to(ROOT)}: name '{name}' does not match folder",
            )
        if len(name) > MAX_SKILL_NAME_LENGTH:
            fail(
                errors,
                f"{skill_file.relative_to(ROOT)}: name is {len(name)} characters; "
                f"maximum is {MAX_SKILL_NAME_LENGTH}",
            )
        if name in names:
            fail(
                errors, f"duplicate skill name '{name}': {names[name]} and {skill_file}"
            )
        names[name] = skill_file

        description = frontmatter_description(frontmatter)
        if not description:
            fail(errors, f"{skill_file.relative_to(ROOT)}: missing description")
        else:
            description_chars += len(description)
            if len(description) > MAX_DESCRIPTION_LENGTH:
                fail(
                    errors,
                    f"{skill_file.relative_to(ROOT)}: description is {len(description)} "
                    f"characters; maximum is {MAX_DESCRIPTION_LENGTH}",
                )
            if not re.search(r"\bUse\b", description):
                fail(
                    errors,
                    f"{skill_file.relative_to(ROOT)}: description needs an explicit use trigger",
                )
            single_line_description = re.search(
                r"(?m)^description:\s*([^>|'\"\n][^\n]*)$", frontmatter
            )
            if single_line_description and ": " in single_line_description.group(1):
                fail(
                    errors,
                    f"{skill_file.relative_to(ROOT)}: unquoted ': ' makes YAML frontmatter invalid; "
                    "use a block description",
                )

        if not re.search(r"(?m)^license:\s*MIT\s*$", frontmatter):
            fail(
                errors, f"{skill_file.relative_to(ROOT)}: missing MIT license metadata"
            )

        if "[TODO:" in frontmatter:
            fail(
                errors,
                f"{skill_file.relative_to(ROOT)}: unfinished frontmatter placeholder",
            )

    budget = DESCRIPTION_BUDGET_PER_SKILL * len(skill_dirs)
    if description_chars > budget:
        fail(
            errors,
            f"skill descriptions: {description_chars} description characters exceed "
            f"the {budget}-character discovery budget "
            f"({DESCRIPTION_BUDGET_PER_SKILL} x {len(skill_dirs)} skills)",
        )

    return skill_dirs, description_chars


def local_target(raw_target: str) -> str | None:
    target = raw_target.strip()
    if not target or target.startswith(
        ("#", "http://", "https://", "mailto:", "data:")
    ):
        return None
    if target.startswith("<") and target.endswith(">"):
        target = target[1:-1]
    target = target.split(" ", 1)[0]
    return unquote(target.split("#", 1)[0])


def without_fenced_code(text: str) -> str:
    """Remove examples before scanning prose links and HTML attributes."""
    lines: list[str] = []
    closing_fence: str | None = None
    for line in text.splitlines():
        fence = re.match(r"^[ \t]*(`{3,}|~{3,})", line)
        if closing_fence is None and fence:
            closing_fence = fence.group(1)
            continue
        if closing_fence is not None:
            if re.match(rf"^[ \t]*{re.escape(closing_fence)}[ \t]*$", line):
                closing_fence = None
            continue
        lines.append(line)
    return "\n".join(lines)


def validate_links(errors: list[str]) -> int:
    markdown_files = sorted(
        path for path in ROOT.rglob("*.md") if ".git" not in path.parts
    )
    markdown_link = re.compile(r"!?\[[^\]]*\]\(([^)]+)\)")
    html_source = re.compile(r"(?:src|href)=[\"']([^\"']+)[\"']")
    checked = 0

    for document in markdown_files:
        text = without_fenced_code(document.read_text(encoding="utf-8"))
        for match in list(markdown_link.finditer(text)) + list(
            html_source.finditer(text)
        ):
            target = local_target(match.group(1))
            if target is None:
                continue
            checked += 1
            resolved = (document.parent / target).resolve()
            try:
                resolved.relative_to(ROOT)
            except ValueError:
                fail(
                    errors,
                    f"{document.relative_to(ROOT)}: local link escapes repo: {target}",
                )
                continue
            if not resolved.exists():
                fail(
                    errors,
                    f"{document.relative_to(ROOT)}: missing local target: {target}",
                )

    return checked


def read_json(errors: list[str], path: Path) -> dict[str, object] | None:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        fail(errors, f"{path.relative_to(ROOT)}: cannot read valid JSON: {exc}")
        return None
    if not isinstance(value, dict):
        fail(errors, f"{path.relative_to(ROOT)}: root must be a JSON object")
        return None
    return value


def validate_plugin(errors: list[str]) -> None:
    manifest = read_json(errors, PLUGIN)
    if manifest is None:
        return

    required = ("name", "version", "description", "author", "skills", "interface")
    for field in required:
        if not manifest.get(field):
            fail(errors, f"{PLUGIN.relative_to(ROOT)}: missing '{field}'")

    skill_path = manifest.get("skills")
    if isinstance(skill_path, str):
        resolved = (ROOT / skill_path).resolve()
        if resolved != SKILLS.resolve():
            fail(
                errors,
                f"{PLUGIN.relative_to(ROOT)}: skills path must resolve to ./skills/",
            )

    if re.search(r"\[TODO:[^\]]*\]", PLUGIN.read_text(encoding="utf-8")):
        fail(errors, f"{PLUGIN.relative_to(ROOT)}: unfinished scaffold placeholder")

    packaging: dict[Path, dict[str, object]] = {}
    for path in (CODEX_MARKETPLACE, CLAUDE_PLUGIN, CLAUDE_MARKETPLACE):
        payload = read_json(errors, path)
        if payload is None:
            continue
        packaging[path] = payload
        if re.search(r"\[TODO:[^\]]*\]", path.read_text(encoding="utf-8")):
            fail(errors, f"{path.relative_to(ROOT)}: unfinished scaffold placeholder")

    codex_marketplace = packaging.get(CODEX_MARKETPLACE)
    if codex_marketplace is not None:
        entries = codex_marketplace.get("plugins")
        matching = (
            [
                entry
                for entry in entries
                if isinstance(entry, dict) and entry.get("name") == manifest.get("name")
            ]
            if isinstance(entries, list)
            else []
        )
        if len(matching) != 1:
            fail(
                errors,
                f"{CODEX_MARKETPLACE.relative_to(ROOT)}: plugin entry is missing",
            )
        else:
            entry = matching[0]
            source = entry.get("source")
            policy = entry.get("policy")
            if (
                not isinstance(source, dict)
                or source.get("source") != "url"
                or not source.get("url")
            ):
                fail(
                    errors,
                    f"{CODEX_MARKETPLACE.relative_to(ROOT)}: expected a Git URL source",
                )
            if (
                not isinstance(policy, dict)
                or not policy.get("installation")
                or not policy.get("authentication")
            ):
                fail(
                    errors,
                    f"{CODEX_MARKETPLACE.relative_to(ROOT)}: incomplete install policy",
                )
            if not entry.get("category"):
                fail(errors, f"{CODEX_MARKETPLACE.relative_to(ROOT)}: missing category")

    claude_plugin = packaging.get(CLAUDE_PLUGIN)
    if claude_plugin is not None:
        if claude_plugin.get("name") != manifest.get("name"):
            fail(
                errors,
                f"{CLAUDE_PLUGIN.relative_to(ROOT)}: name must match Codex plugin",
            )
        if claude_plugin.get("version") != manifest.get("version"):
            fail(
                errors,
                f"{CLAUDE_PLUGIN.relative_to(ROOT)}: version must match Codex plugin",
            )
        if claude_plugin.get("skills") != "./skills/":
            fail(
                errors,
                f"{CLAUDE_PLUGIN.relative_to(ROOT)}: skills path must be './skills/'",
            )

    claude_marketplace = packaging.get(CLAUDE_MARKETPLACE)
    if claude_marketplace is not None:
        entries = claude_marketplace.get("plugins")
        matching = (
            [
                entry
                for entry in entries
                if isinstance(entry, dict) and entry.get("name") == manifest.get("name")
            ]
            if isinstance(entries, list)
            else []
        )
        if len(matching) != 1:
            fail(
                errors,
                f"{CLAUDE_MARKETPLACE.relative_to(ROOT)}: plugin entry is missing",
            )
        elif matching[0].get("version") != manifest.get("version"):
            fail(
                errors,
                f"{CLAUDE_MARKETPLACE.relative_to(ROOT)}: version must match plugin manifests",
            )


def validate_counts(
    errors: list[str], counts: dict[str, int]
) -> tuple[int, int, int]:
    """The badge, the alt text, the mermaid label and the two command lines."""
    playbooks = sorted((ROOT / "playbooks").glob("[0-9][0-9]-*.md"))
    playbook_count = counts["playbooks"]
    reference_count = counts["references"]
    template_count = counts["templates"]
    skill_count = counts["skills"]
    readme = README.read_text(encoding="utf-8")
    agents = AGENTS.read_text(encoding="utf-8")

    numbers: dict[int, Path] = {}
    for playbook in playbooks:
        number = int(playbook.name[:2])
        if number in numbers:
            fail(
                errors,
                f"duplicate playbook number {number:02d}: "
                f"{numbers[number].relative_to(ROOT)} and {playbook.relative_to(ROOT)}",
            )
        numbers[number] = playbook
    expected_numbers = list(range(1, playbook_count + 1))
    if sorted(numbers) != expected_numbers:
        fail(errors, f"playbooks: expected numbering 01-{playbook_count:02d}")

    expected_badges = (
        f"skills-{skill_count}-",
        f"playbooks-{playbook_count}-",
        f"templates-{template_count}-",
    )
    for badge in expected_badges:
        if badge not in readme:
            fail(errors, f"README.md: expected badge fragment '{badge}'")

    expected_alts = (
        f"[![Skills: {skill_count}]",
        f"[![Playbooks: {playbook_count}]",
        f"[![Templates: {template_count}]",
    )
    for alt in expected_alts:
        if alt not in readme:
            fail(errors, f"README.md: expected badge alt '{alt}'")

    expected_counts = (
        (skill_count, "skills"),
        (playbook_count, "playbooks"),
        (reference_count, "references"),
        (template_count, "templates"),
    )
    for count, label in expected_counts:
        phrase = f"**{count} {label}**"
        if phrase not in readme:
            fail(errors, f"README.md: expected current count phrase '{phrase}'")
        if phrase not in agents:
            fail(errors, f"AGENTS.md: expected current count phrase '{phrase}'")

    mermaid_refs = f'R["{reference_count} refs"]'
    if mermaid_refs not in readme:
        fail(errors, f"README.md: expected mermaid count '{mermaid_refs}'")

    quickstart = (ROOT / "QUICKSTART.md").read_text(encoding="utf-8")
    expect_match = re.search(r"expect\s+(\d+)", quickstart)
    if expect_match and int(expect_match.group(1)) != skill_count:
        fail(
            errors,
            f"QUICKSTART.md: expected 'expect {skill_count}', "
            f"found 'expect {expect_match.group(1)}'",
        )

    blueprint = (ROOT / "BLUEPRINT.md").read_text(encoding="utf-8")
    wc_match = re.search(r"wc -l[`\s)]*.*?→\s*(\d+)", blueprint)
    if wc_match and int(wc_match.group(1)) != skill_count:
        fail(
            errors,
            f"BLUEPRINT.md: expected skill count {skill_count} after wc -l, "
            f"found {wc_match.group(1)}",
        )

    return playbook_count, reference_count, template_count


def collection_counts() -> dict[str, int]:
    """The four counts, computed one way.

    `scripts/sync-counts.py` imports this. An earlier version of the writer
    counted `skills/*/SKILL.md` while the validator counted skill directories,
    so a half-written skill folder made the writer a no-op while the checker
    demanded a number the writer could not produce.
    """
    return {
        "skills": len(
            [
                path
                for path in (ROOT / "skills").iterdir()
                if path.is_dir() and (path / "SKILL.md").is_file()
            ]
        ),
        "playbooks": len(list((ROOT / "playbooks").glob("[0-9][0-9]-*.md"))),
        "references": len(list((ROOT / "reference").glob("*.md"))),
        "templates": len(list((ROOT / "templates").iterdir())),
    }


def count_claims(text: str) -> list[tuple[int, str, int]]:
    """Every count this collection states in prose: (number, label, line number).

    Fenced code is read too. The README's tree map and its mermaid graph are
    both inside a fence, and both state the collection's size — the first
    version of this gate skipped fences, so the tree map under the badge was
    the one place on the page the gate could not see.

    A count inside quotation marks is skipped: it is somebody else's sentence,
    and this repo does not get to rewrite what another author wrote.
    """
    claims: list[tuple[int, str, int]] = []
    for index, line in enumerate(text.splitlines(), start=1):
        quoted = [(match.start(), match.end()) for match in QUOTED_SPAN.finditer(line)]
        for match in COUNT_CLAIM_PATTERN.finditer(line):
            if any(start <= match.start(1) < end for start, end in quoted):
                continue
            label = alias_label(match.group("alias"))
            if label is None:
                continue
            claims.append((int(match.group(1).replace(",", "")), label, index))
        for pattern, label in VERB_CLAIM_PATTERNS:
            for match in pattern.finditer(line):
                claims.append((int(match.group(1)), label, index))
    return claims


def count_surfaces() -> list[Path]:
    """Files whose counts are the collection's own — the ones the writer owns."""
    surfaces = [ROOT / name for name in COUNT_SURFACE_FILES]
    for directory in COUNT_SURFACE_DIRS:
        surfaces.extend(sorted((ROOT / directory).glob("*.md")))
    return [path for path in surfaces if path.exists()]


def live_files() -> list[Path]:
    """Every markdown file that states the repo's size today."""
    files: list[Path] = []
    for path in sorted(ROOT.rglob("*.md")):
        relative = path.relative_to(ROOT)
        if any(part in {".git", "node_modules", ".venv"} for part in relative.parts):
            continue
        text = str(relative)
        if any(text.startswith(f"{directory}/") for directory in DATED_RECORD_DIRS):
            continue
        if text in DATED_RECORD_FILES:
            continue
        files.append(path)
    return files


def validate_prose_counts(errors: list[str], counts: dict[str, int]) -> int:
    """A live file that states the collection's size has to state it right.

    This reads every live file, not only the surfaces the writer owns. A count
    in a skill file is a count the reader will act on, and three skill files
    carried stale numbers for years because the gate never looked there.
    """
    checked = 0
    for path in live_files():
        text = path.read_text(encoding="utf-8")
        seen: set[tuple[int, str, int]] = set()
        for number, label, line in count_claims(text):
            checked += 1
            expected = counts.get(label)
            if expected is None:
                continue
            if number == expected:
                continue
            key = (number, label, line)
            if key in seen:
                # "Do not scan all 184 skills" is one count read two ways.
                continue
            seen.add(key)
            fail(
                errors,
                f"{path.relative_to(ROOT)}:{line}: says '{number} {label}' "
                f"but the repo holds {expected} {label} — write the number, or "
                f"write it so it cannot be read as the collection's size "
                f"(a hyphenated compound, a threshold, or another collection)",
            )
    return checked


def validate_playbook_index(errors: list[str], playbooks: list[Path]) -> None:
    """The README's playbook list must be the whole set, in order, numbered right."""
    readme = README.read_text(encoding="utf-8")
    listed = re.findall(
        r"(?m)^\s*(\d+)\.\s*\[([^\]]+)\]\((playbooks/[^)]+)\)", playbook_section(readme)
    )
    if not listed:
        fail(errors, "README.md: no numbered playbook list found")
        return
    for position, (number, _title, target) in enumerate(listed, start=1):
        if int(number) != position:
            fail(
                errors,
                f"README.md: playbook list entry {position} is numbered {number}",
            )
    paths = [target for _number, _title, target in listed]
    for playbook in playbooks:
        relative = f"playbooks/{playbook.name}"
        if relative not in paths:
            fail(errors, f"README.md: playbook list is missing {relative}")
    if len(paths) != len(set(paths)):
        fail(errors, "README.md: playbook list repeats an entry")


def playbook_section(readme: str) -> str:
    """The Playbooks section of the README, and nothing else.

    The first version of this check scanned the whole README, so a numbered
    link to a playbook anywhere else in the file was read as a playbook entry
    and produced a message about entry 1 being numbered 18. The list lives in
    one section; read that one.
    """
    match = re.search(r"(?mi)^##\s+playbooks\b", readme)
    if not match:
        return readme
    rest = readme[match.end() :]
    next_heading = re.search(r"(?m)^##\s+", rest)
    return rest[: next_heading.start()] if next_heading else rest


def validate_markdown_structure(errors: list[str]) -> int:
    """A list item or a table row that swallows the next one loses a line.

    A missing newline between two bullets is invisible in the diff of a busy
    file and fatal to the document: the second item renders as trailing text
    inside the first. The same defect in a table row is worse, because a reader
    sees one row with extra cells instead of two rows. The contract files are
    read by agents, not by people skimming, so the structure has to be right.

    Fenced code is skipped: a shell one-liner can hold `||`, and a code block
    can show a markdown list that is only a list inside the block.
    """
    bullet = re.compile(r"^\s*[-*]\s+.*[.!]\s*-\s+")
    checked = 0
    for path in sorted(ROOT.rglob("*.md")):
        if ".git" in path.parts:
            continue
        checked += 1
        in_fence = False
        for index, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
            stripped = line.strip()
            if stripped.startswith("```") or stripped.startswith("~~~"):
                in_fence = not in_fence
                continue
            if in_fence:
                continue
            if bullet.match(line):
                fail(
                    errors,
                    f"{path.relative_to(ROOT)}:{index}: a list item runs into the next one",
                )
            elif stripped.startswith("|") and "||" in stripped:
                fail(
                    errors,
                    f"{path.relative_to(ROOT)}:{index}: two table rows share one line",
                )
    return checked


def validate_hygiene(errors: list[str]) -> None:
    import subprocess
    # Only flag .DS_Store if it's tracked by git. macOS Finder auto-creates
    # .DS_Store on directory access, so a strict rglob check produces false
    # positives in local dev even when .gitignore is correct. The real check
    # is "did this file ever get committed?" — and that's `git ls-files`.
    try:
        tracked = subprocess.run(
            ["git", "ls-files"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=True,
        ).stdout.splitlines()
    except (subprocess.CalledProcessError, FileNotFoundError):
        tracked = []
    tracked_dots = {p for p in tracked if p.endswith(".DS_Store") or "/.DS_Store" in p}
    for junk in ROOT.rglob(".DS_Store"):
        if ".git" in junk.parts:
            continue
        rel = str(junk.relative_to(ROOT))
        if rel in tracked_dots or any(rel.endswith(t) or t.endswith(rel) for t in tracked_dots):
            fail(
                errors,
                f"{rel}: remove OS metadata from the repository",
            )


def validate_installer_safety(errors: list[str]) -> None:
    installer = (ROOT / "scripts" / "install-skills.sh").read_text(encoding="utf-8")
    destructive_patterns = (
        r"rsync[^\n]*--delete",
        r"rm\s+-rf[^\n]*\$dest",
    )
    for pattern in destructive_patterns:
        if re.search(pattern, installer):
            fail(
                errors,
                "scripts/install-skills.sh: global skill installation must preserve unrelated skills",
            )
    test_path = ROOT / "scripts" / "test-install-skills.sh"
    if not test_path.is_file():
        fail(errors, "scripts/test-install-skills.sh: missing additive-install regression test")
    bootstrap_test = ROOT / "scripts" / "test-bootstrap.sh"
    if not bootstrap_test.is_file():
        fail(errors, "scripts/test-bootstrap.sh: missing first-time-user bootstrap regression test")


def validate_catalog(errors: list[str], skill_dirs: list[Path]) -> None:
    catalog = CATALOG.read_text(encoding="utf-8")
    for skill_dir in skill_dirs:
        target = f"skills/{skill_dir.name}/SKILL.md"
        if target not in catalog:
            fail(errors, f"CATALOG.md: missing {target}")


def main() -> int:
    errors: list[str] = []
    skill_dirs, description_chars = validate_skills(errors)
    checked_links = validate_links(errors)
    validate_plugin(errors)
    # One count, one source. The writer (scripts/sync-counts.py) imports the
    # same function, so it can never disagree with the checker about what the
    # repo holds.
    counts = collection_counts()
    playbook_count, reference_count, template_count = validate_counts(errors, counts)
    prose_claims = validate_prose_counts(errors, counts)
    validate_playbook_index(
        errors, sorted((ROOT / "playbooks").glob("[0-9][0-9]-*.md"))
    )
    validate_hygiene(errors)
    markdown_files = validate_markdown_structure(errors)
    validate_installer_safety(errors)
    validate_catalog(errors, skill_dirs)

    agents_size = (ROOT / "AGENTS.md").stat().st_size
    if agents_size > 32 * 1024:
        fail(
            errors,
            f"AGENTS.md: {agents_size} bytes exceeds Codex's default 32 KiB budget",
        )

    if errors:
        print("Repository validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print(
        f"OK: {len(skill_dirs)} skills ({description_chars}/{DESCRIPTION_BUDGET_PER_SKILL * len(skill_dirs)} description chars), "
        f"{playbook_count} playbooks, {reference_count} references, {template_count} templates, "
        f"{checked_links} local links, {prose_claims} prose counts, {markdown_files} markdown files, "
        f"plugin packaging, repository hygiene, AGENTS.md budget"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
