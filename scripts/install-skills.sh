#!/usr/bin/env bash
# Install Dr Non's skills to every host you actually use.
# Idempotent and additive: safe to re-run after a pull. Updates this stack's
# skill folders without deleting skills installed from other repositories.
#
# Usage:
#   scripts/install-skills.sh              # all detected hosts
#   scripts/install-skills.sh --claude     # only Claude Code
#   scripts/install-skills.sh --codex --cursor
#   scripts/install-skills.sh --dry-run    # print what would happen
#
# Hosts:
#   claude  →  ~/.claude/skills/
#   codex   →  ~/.agents/skills/   (Codex / ChatGPT desktop)
#   cursor  →  .cursor/skills/     (project-local; pass --cursor from inside a project)
#   antigravity → .agents/skills/  (same path as Codex; counted once)
#   hermes  →  ~/.hermes/skills/
#   opencode → ~/.config/opencode/skills/

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS_SRC="$ROOT/skills"
INSTALL_ROOT="${DR_NON_INSTALL_ROOT:-$HOME}"
DRY_RUN=0
WANT_ALL=1
WANT_CLAUDE=0; WANT_CODEX=0; WANT_CURSOR=0; WANT_HERMES=0; WANT_OPENCODE=0; WANT_GEMINI=0; WANT_ANTIGRAVITY=0

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --claude) WANT_CLAUDE=1; WANT_ALL=0 ;;
    --codex) WANT_CODEX=1; WANT_ALL=0 ;;
    --cursor) WANT_CURSOR=1; WANT_ALL=0 ;;
    --hermes) WANT_HERMES=1; WANT_ALL=0 ;;
    --opencode) WANT_OPENCODE=1; WANT_ALL=0 ;;
    --gemini|--antigravity) WANT_GEMINI=1; WANT_ANTIGRAVITY=1; WANT_ALL=0 ;;
    --all) WANT_ALL=1 ;;
    --help|-h) echo "Usage: $0 [--claude] [--codex] [--cursor] [--gemini] [--antigravity] [--hermes] [--opencode] [--all] [--dry-run]"; exit 0 ;;
    *) echo "unknown flag: $arg (try --help)" >&2; exit 1 ;;
  esac
done

expected="$(find "$SKILLS_SRC" -mindepth 2 -maxdepth 2 -name SKILL.md | wc -l | tr -d ' ')"

install_host() {
  local label="$1" dest="$2"
  if [[ $DRY_RUN -eq 1 ]]; then
    echo "would install $expected skills → $dest  ($label)"
    return
  fi
  mkdir -p "$dest"
  # Never mirror with --delete here. These are shared host directories and may
  # contain Garry Tan, Karpathy, company, or personal skills owned by the user.
  if command -v rsync >/dev/null 2>&1; then
    rsync -a "$SKILLS_SRC"/ "$dest"/
  else
    cp -R "$SKILLS_SRC"/* "$dest"/
  fi
  local installed=0 total=0 skill_dir skill_name
  for skill_dir in "$SKILLS_SRC"/*; do
    [[ -f "$skill_dir/SKILL.md" ]] || continue
    skill_name="$(basename "$skill_dir")"
    [[ -f "$dest/$skill_name/SKILL.md" ]] && installed=$((installed + 1))
  done
  total="$(find "$dest" -mindepth 2 -maxdepth 2 -name SKILL.md 2>/dev/null | wc -l | tr -d ' ')"
  if [[ "$installed" != "$expected" ]]; then
    echo "WARN: $label has $installed/$expected Dr Non skills after install" >&2
  else
    echo "OK: $label — $installed Dr Non skills ready ($total total; unrelated skills preserved) → $dest"
  fi
}

do_all() {
  # Only install to cursor/.agents if we're inside a project or the dir already exists
  install_host "claude"   "$INSTALL_ROOT/.claude/skills"
  install_host "codex"    "$INSTALL_ROOT/.agents/skills"
  # Antigravity reads ~/.agents/skills (Codex path) plus ~/.gemini/antigravity/skills if present
  if [[ -d "$INSTALL_ROOT/.gemini" ]] || [[ $WANT_ANTIGRAVITY -eq 1 ]]; then
    install_host "antigravity" "$INSTALL_ROOT/.gemini/antigravity/skills"
  fi
  if [[ -d "$INSTALL_ROOT/.hermes" ]] || [[ $WANT_HERMES -eq 1 ]]; then
    install_host "hermes" "$INSTALL_ROOT/.hermes/skills"
  fi
  if [[ -d "$INSTALL_ROOT/.config/opencode" ]] || [[ $WANT_OPENCODE -eq 1 ]]; then
    install_host "opencode" "$INSTALL_ROOT/.config/opencode/skills"
  fi
  # cursor is project-local; only do it when requested or when .cursor exists / we're in a project with .git
  if [[ $WANT_CURSOR -eq 1 ]] || [[ -d ".cursor" ]] || [[ -d ".git" && -w . ]]; then
    # If caller is the skills repo itself, don't pollute it; skip cursor unless explicitly asked.
    if [[ "$PWD" != "$ROOT" ]] || [[ $WANT_CURSOR -eq 1 ]]; then
      install_host "cursor" ".cursor/skills"
    fi
  fi
}

if [[ $WANT_ALL -eq 1 ]]; then
  do_all
else
  [[ $WANT_CLAUDE -eq 1 ]] && install_host "claude" "$INSTALL_ROOT/.claude/skills"
  [[ $WANT_CODEX -eq 1 ]] && install_host "codex" "$INSTALL_ROOT/.agents/skills"
  [[ $WANT_ANTIGRAVITY -eq 1 || $WANT_GEMINI -eq 1 ]] && install_host "antigravity" "$INSTALL_ROOT/.gemini/antigravity/skills"
  [[ $WANT_CURSOR -eq 1 ]] && install_host "cursor" ".cursor/skills"
  [[ $WANT_HERMES -eq 1 ]] && install_host "hermes" "$INSTALL_ROOT/.hermes/skills"
  [[ $WANT_OPENCODE -eq 1 ]] && install_host "opencode" "$INSTALL_ROOT/.config/opencode/skills"
fi

if [[ $DRY_RUN -eq 1 ]]; then
  echo "dry-run: no files changed (expected $expected skills)"
else
  echo "done — expected $expected skills per host. Verify with: ls ~/.claude/skills | wc -l"
fi
