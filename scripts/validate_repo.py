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
# The badge in the README is the inventory. These surfaces restate the same
# count in prose, and each one has drifted at least once, in two generations
# (the deck said 69 in its body and 169 in its headline while the tree held
# 184). A gate that only reads the badge cannot see any of that, so the deck's
# own line — "the counts are deliberate, the validator enforces them" — was
# false. These are the surfaces the check now reads.
#
# Dated records are deliberately excluded: docs/lessons/ and docs/relay/ record
# what the repo held on the day they were written, and a stale number there is
# a receipt, not a lie.
COUNT_SURFACE_FILES = (
    "README.md",
    "AGENTS.md",
    "BLUEPRINT.md",
    "QUICKSTART.md",
    "INFOGRAPHICS.md",
)
COUNT_SURFACE_DIRS = ("docs/deck",)

# A count claim is a bare number immediately followed by a word that names a
# shape of this collection, with nothing before it — because "~20 skills" and
# "1-2 skills" are thresholds and "35+ book-derived skills" is somebody else's
# collection. A number sitting behind a comparison word is a threshold too, so
# "more than 33 skills" is not a claim about the collection.
#
# The four shape words take two digits or more: a one-digit number in that form
# is a threshold ("load more than 3 skills"). Every other form below names the
# collection outright, so a single digit is still a count. Each form below is a
# way this repo actually writes the number; each names its label.
_NOT_A_THRESHOLD = (
    "(?<!than )(?<!past )(?<!over )(?<!under )(?<!fewer )(?<!less )(?<!least )"
    "(?<!more )(?<!up to )(?<!only )(?<!just )(?<!at least )"
)
COUNT_CLAIM_PATTERNS = (
    (re.compile(rf"{_NOT_A_THRESHOLD}(?<![\w~+<>=-])(\d{{2,}})\s+(skills|playbooks|references|templates)\b"), None),
    (re.compile(rf"{_NOT_A_THRESHOLD}(?<![\w~+<>=-])(\d+)\s+skill\s+(?:descriptions|files)\b"), "skills"),
    (re.compile(rf"{_NOT_A_THRESHOLD}(?<![\w~+<>=-])(\d+)\s+numbered\s+playbooks\b"), "playbooks"),
    (re.compile(rf"{_NOT_A_THRESHOLD}(?<![\w~+<>=-])(\d+)\s+`SKILL\.md`\s+files\b"), "skills"),
    (re.compile(rf"{_NOT_A_THRESHOLD}(?<![\w~+<>=-])(\d+)\s+narratives\b"), "playbooks"),
    (re.compile(rf"{_NOT_A_THRESHOLD}(?<![\w~+<>=-])(\d+)\s+docs\b"), "references"),
    (re.compile(rf"{_NOT_A_THRESHOLD}(?<![\w~+<>=-])(\d+)\s+drop-ins\b"), "templates"),
    (re.compile(rf"{_NOT_A_THRESHOLD}(?<![\w~+<>=-])(\d+)\s+answers\b"), "skills"),
    (re.compile(r"load all (\d+) on every task"), "skills"),
)



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


def validate_counts(errors: list[str], skill_count: int) -> tuple[int, int, int]:
    playbooks = sorted((ROOT / "playbooks").glob("[0-9][0-9]-*.md"))
    playbook_count = len(playbooks)
    reference_count = len(list((ROOT / "reference").glob("*.md")))
    template_count = len(list((ROOT / "templates").iterdir()))
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


def count_claims(text: str) -> list[tuple[int, str, int]]:
    """Every count this collection states in prose: (number, label, line number)."""
    claims: list[tuple[int, str, int]] = []
    for index, line in enumerate(text.splitlines(), start=1):
        for pattern, fixed_label in COUNT_CLAIM_PATTERNS:
            for match in pattern.finditer(line):
                number = int(match.group(1))
                label = fixed_label or match.group(2)
                claims.append((number, label, index))
    return claims


def count_surfaces() -> list[Path]:
    surfaces = [ROOT / name for name in COUNT_SURFACE_FILES]
    for directory in COUNT_SURFACE_DIRS:
        surfaces.extend(sorted((ROOT / directory).glob("*.md")))
    return [path for path in surfaces if path.exists()]


def validate_prose_counts(errors: list[str], counts: dict[str, int]) -> int:
    """A surface that states the collection's size has to state it right."""
    checked = 0
    for path in count_surfaces():
        text = path.read_text(encoding="utf-8")
        for number, label, line in count_claims(text):
            checked += 1
            expected = counts.get(label)
            if expected is None:
                continue
            if number != expected:
                fail(
                    errors,
                    f"{path.relative_to(ROOT)}:{line}: says '{number} {label}' "
                    f"but the repo holds {expected} {label}",
                )
    return checked


def validate_playbook_index(errors: list[str], playbooks: list[Path]) -> None:
    """The README's playbook list must be the whole set, in order, numbered right."""
    readme = README.read_text(encoding="utf-8")
    listed = re.findall(r"(?m)^\s*(\d+)\.\s*\[([^\]]+)\]\((playbooks/[^)]+)\)", readme)
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



def validate_markdown_lists(errors: list[str]) -> int:
    """A list item that swallows the next one loses a line from every reader.

    A missing newline between two bullets is invisible in the diff of a busy
    file and fatal to the document: the second item renders as trailing text
    inside the first. The contract files are read by agents, not by people
    skimming, so the structure has to be right.
    """
    pattern = re.compile(r"^\s*[-*]\s.*[a-z0-9.,;:)]\s*[-*]\s+\[")
    checked = 0
    for path in sorted(ROOT.rglob("*.md")):
        if ".git" in path.parts:
            continue
        checked += 1
        for index, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
            if pattern.match(line):
                fail(
                    errors,
                    f"{path.relative_to(ROOT)}:{index}: a list item runs into the next one",
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
    playbook_count, reference_count, template_count = validate_counts(
        errors, len(skill_dirs)
    )
    prose_claims = validate_prose_counts(
        errors,
        {
            "skills": len(skill_dirs),
            "playbooks": playbook_count,
            "references": reference_count,
            "templates": template_count,
        },
    )
    validate_playbook_index(
        errors, sorted((ROOT / "playbooks").glob("[0-9][0-9]-*.md"))
    )
    validate_hygiene(errors)
    markdown_files = validate_markdown_lists(errors)
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
