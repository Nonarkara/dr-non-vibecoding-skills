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
DESCRIPTION_BUDGET = 6500
MAX_DESCRIPTION_LENGTH = 180


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

        if not re.search(r"(?m)^license:\s*MIT\s*$", frontmatter):
            fail(
                errors, f"{skill_file.relative_to(ROOT)}: missing MIT license metadata"
            )

        if "[TODO:" in frontmatter:
            fail(
                errors,
                f"{skill_file.relative_to(ROOT)}: unfinished frontmatter placeholder",
            )

    if description_chars > DESCRIPTION_BUDGET:
        fail(
            errors,
            f"skill descriptions: {description_chars} description characters exceed "
            f"the {DESCRIPTION_BUDGET}-character discovery budget",
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

    return playbook_count, reference_count, template_count


def validate_hygiene(errors: list[str]) -> None:
    for junk in ROOT.rglob(".DS_Store"):
        if ".git" not in junk.parts:
            fail(
                errors,
                f"{junk.relative_to(ROOT)}: remove OS metadata from the repository",
            )


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
    validate_hygiene(errors)
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
        f"OK: {len(skill_dirs)} skills ({description_chars}/{DESCRIPTION_BUDGET} description chars), "
        f"{playbook_count} playbooks, {reference_count} references, {template_count} templates, "
        f"{checked_links} local links, plugin packaging, repository hygiene, AGENTS.md budget"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
