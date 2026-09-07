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
PLUGIN = ROOT / ".codex-plugin" / "plugin.json"


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def validate_skills(errors: list[str]) -> list[Path]:
    skill_dirs = sorted(path for path in SKILLS.iterdir() if path.is_dir())
    names: dict[str, Path] = {}

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
        name_match = re.search(r"(?m)^name:\s*['\"]?([a-z0-9-]+)['\"]?\s*$", frontmatter)
        if not name_match:
            fail(errors, f"{skill_file.relative_to(ROOT)}: missing valid name")
            continue

        name = name_match.group(1)
        if name != skill_dir.name:
            fail(errors, f"{skill_file.relative_to(ROOT)}: name '{name}' does not match folder")
        if name in names:
            fail(errors, f"duplicate skill name '{name}': {names[name]} and {skill_file}")
        names[name] = skill_file

        if not re.search(r"(?m)^description:\s*(?:\S|[>|]-?)", frontmatter):
            fail(errors, f"{skill_file.relative_to(ROOT)}: missing description")

    return skill_dirs


def local_target(raw_target: str) -> str | None:
    target = raw_target.strip()
    if not target or target.startswith(("#", "http://", "https://", "mailto:", "data:")):
        return None
    if target.startswith("<") and target.endswith(">"):
        target = target[1:-1]
    target = target.split(" ", 1)[0]
    return unquote(target.split("#", 1)[0])


def validate_links(errors: list[str]) -> int:
    markdown_files = sorted(path for path in ROOT.rglob("*.md") if ".git" not in path.parts)
    markdown_link = re.compile(r"!?\[[^\]]*\]\(([^)]+)\)")
    html_source = re.compile(r"(?:src|href)=[\"']([^\"']+)[\"']")
    checked = 0

    for document in markdown_files:
        text = document.read_text(encoding="utf-8")
        for match in list(markdown_link.finditer(text)) + list(html_source.finditer(text)):
            target = local_target(match.group(1))
            if target is None:
                continue
            checked += 1
            resolved = (document.parent / target).resolve()
            try:
                resolved.relative_to(ROOT)
            except ValueError:
                fail(errors, f"{document.relative_to(ROOT)}: local link escapes repo: {target}")
                continue
            if not resolved.exists():
                fail(errors, f"{document.relative_to(ROOT)}: missing local target: {target}")

    return checked


def validate_plugin(errors: list[str]) -> None:
    try:
        manifest = json.loads(PLUGIN.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        fail(errors, f"{PLUGIN.relative_to(ROOT)}: cannot read valid JSON: {exc}")
        return

    required = ("name", "version", "description", "author", "skills", "interface")
    for field in required:
        if not manifest.get(field):
            fail(errors, f"{PLUGIN.relative_to(ROOT)}: missing '{field}'")

    skill_path = manifest.get("skills")
    if isinstance(skill_path, str):
        resolved = (ROOT / skill_path).resolve()
        if resolved != SKILLS.resolve():
            fail(errors, f"{PLUGIN.relative_to(ROOT)}: skills path must resolve to ./skills/")

    if re.search(r"\[TODO:[^\]]*\]", PLUGIN.read_text(encoding="utf-8")):
        fail(errors, f"{PLUGIN.relative_to(ROOT)}: unfinished scaffold placeholder")


def validate_counts(errors: list[str], skill_count: int) -> int:
    playbook_count = len(list((ROOT / "playbooks").glob("[0-9][0-9]-*.md")))
    readme = README.read_text(encoding="utf-8")

    expected_badges = (
        f"skills-{skill_count}-",
        f"playbooks-{playbook_count}-",
    )
    for badge in expected_badges:
        if badge not in readme:
            fail(errors, f"README.md: expected badge fragment '{badge}'")

    if f"**{skill_count} skills**" not in readme:
        fail(errors, f"README.md: TL;DR skill count does not match {skill_count}")
    if f"**{playbook_count} playbooks**" not in readme:
        fail(errors, f"README.md: TL;DR playbook count does not match {playbook_count}")

    return playbook_count


def main() -> int:
    errors: list[str] = []
    skill_dirs = validate_skills(errors)
    checked_links = validate_links(errors)
    validate_plugin(errors)
    playbook_count = validate_counts(errors, len(skill_dirs))

    agents_size = (ROOT / "AGENTS.md").stat().st_size
    if agents_size > 32 * 1024:
        fail(errors, f"AGENTS.md: {agents_size} bytes exceeds Codex's default 32 KiB budget")

    if errors:
        print("Repository validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print(
        f"OK: {len(skill_dirs)} skills, {playbook_count} playbooks, "
        f"{checked_links} local links, plugin manifest, AGENTS.md budget"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
