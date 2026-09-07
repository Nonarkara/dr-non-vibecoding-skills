#!/usr/bin/env bash
# Install Dr Non's skills to every host you actually use.
# Idempotent: safe to re-run after a pull. Verifies counts per host.
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

expected="$(ls -1 "$SKILLS_SRC" | wc -l | tr -d ' ')"

install_host() {
  local label="$1" dest="$2"
  if [[ $DRY_RUN -eq 1 ]]; then
    echo "would install $expected skills → $dest  ($label)"
    return
  fi
  mkdir -p "$dest"
  # Use rsync if available (preserves but overwrites), else cp -R
  if command -v rsync >/dev/null 2>&1; then
    rsync -a --delete "$SKILLS_SRC"/ "$dest"/
  else
    rm -rf "$dest"/* 2>/dev/null || true
    cp -R "$SKILLS_SRC"/* "$dest"/
  fi
  local got
  got="$(ls -1 "$dest" 2>/dev/null | wc -l | tr -d ' ')"
  if [[ "$got" != "$expected" ]]; then
    echo "WARN: $label has $got skills after install (expected $expected)" >&2
  else
    echo "OK: $label — $got skills → $dest"
  fi
}

do_all() {
  # Only install to cursor/.agents if we're inside a project or the dir already exists
  install_host "claude"   "$HOME/.claude/skills"
  install_host "codex"    "$HOME/.agents/skills"
  # Antigravity reads ~/.agents/skills (Codex path) plus ~/.gemini/antigravity/skills if present
  if [[ -d "$HOME/.gemini" ]] || [[ $WANT_ANTIGRAVITY -eq 1 ]]; then
    install_host "antigravity" "$HOME/.gemini/antigravity/skills"
  fi
  if [[ -d "$HOME/.hermes" ]] || [[ $WANT_HERMES -eq 1 ]]; then
    install_host "hermes" "$HOME/.hermes/skills"
  fi
  if [[ -d "$HOME/.config/opencode" ]] || [[ $WANT_OPENCODE -eq 1 ]]; then
    install_host "opencode" "$HOME/.config/opencode/skills"
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
  [[ $WANT_CLAUDE -eq 1 ]] && install_host "claude" "$HOME/.claude/skills"
  [[ $WANT_CODEX -eq 1 ]] && install_host "codex" "$HOME/.agents/skills"
  [[ $WANT_ANTIGRAVITY -eq 1 || $WANT_GEMINI -eq 1 ]] && install_host "antigravity" "$HOME/.gemini/antigravity/skills"
  [[ $WANT_CURSOR -eq 1 ]] && install_host "cursor" ".cursor/skills"
  [[ $WANT_HERMES -eq 1 ]] && install_host "hermes" "$HOME/.hermes/skills"
  [[ $WANT_OPENCODE -eq 1 ]] && install_host "opencode" "$HOME/.config/opencode/skills"
fi

if [[ $DRY_RUN -eq 1 ]]; then
  echo "dry-run: no files changed (expected $expected skills)"
else
  echo "done — expected $expected skills per host. Verify with: ls ~/.claude/skills | wc -l"
fi
