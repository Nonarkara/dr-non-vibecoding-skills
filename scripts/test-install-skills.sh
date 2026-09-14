#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEST_ROOT="$(mktemp -d)"
trap 'rm -rf "$TEST_ROOT"' EXIT

mkdir -p "$TEST_ROOT/.claude/skills/third-party-sentinel"
printf '%s\n' 'keep me' > "$TEST_ROOT/.claude/skills/third-party-sentinel/SKILL.md"

DR_NON_INSTALL_ROOT="$TEST_ROOT" "$ROOT/scripts/install-skills.sh" --claude >/dev/null

test -f "$TEST_ROOT/.claude/skills/third-party-sentinel/SKILL.md"
test -f "$TEST_ROOT/.claude/skills/karpathy-guidelines/SKILL.md"

expected="$(find "$ROOT/skills" -mindepth 2 -maxdepth 2 -name SKILL.md | wc -l | tr -d ' ')"
installed=0
for skill_dir in "$ROOT"/skills/*; do
  [[ -f "$skill_dir/SKILL.md" ]] || continue
  skill_name="$(basename "$skill_dir")"
  [[ -f "$TEST_ROOT/.claude/skills/$skill_name/SKILL.md" ]] && installed=$((installed + 1))
done

test "$installed" = "$expected"
echo "OK: installer preserved an unrelated skill and installed $installed stack skills"
