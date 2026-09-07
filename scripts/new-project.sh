#!/usr/bin/env bash
# Scaffold a new project the Dr Non way — no AI required.
# Creates the project contract, .gitignore, .env.example, lessons folder,
# deploy script, and optionally a workspace Tier-1 index.
#
# Usage:
#   scripts/new-project.sh <project-name> [--stack next|vite|python|none] [--workspace] [--force]
#   scripts/new-project.sh my-dash --stack next
#   scripts/new-project.sh ../my-api --stack python --workspace
#
# What it creates (inside <project>/):
#   CLAUDE.md              from templates/CLAUDE.md.template
#   AGENTS.md              from templates/AGENTS.md.template  (mirror)
#   .gitignore             from templates/gitignore.template
#   .env.example           from templates/env.example.template
#   docs/lessons/.gitkeep  + docs/lessons/README.md stub
#   scripts/deploy.sh      from templates/deploy-pages.sh (executable)
#   (workspace) CLAUDE.md / AGENTS.md at workspace root if --workspace
#
# After scaffold: fills the one-line project header, substitutes <app>/<host>/<PORT>,
# and prints exact next commands. Does NOT install deps or start a dev server.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATES="$ROOT/templates"

usage() {
  cat <<'USAGE'
Usage: scripts/new-project.sh <project-path> [--stack next|vite|python|none] [--workspace] [--force]
  <project-path>  directory to create (relative or absolute; will be created)
  --stack         next (default) | vite | python | none (docs-only)
  --workspace     also create/update workspace Tier-1 index at parent (~/Projects/CLAUDE.md style)
  --force         overwrite existing files if project dir already exists
USAGE
}

PROJECT=""
STACK="next"
WORKSPACE=0
FORCE=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --stack) STACK="${2:-}"; shift 2 ;;
    --workspace) WORKSPACE=1; shift ;;
    --force) FORCE=1; shift ;;
    --yes|-y) FORCE=1; shift ;; # compat with setup.sh --yes
    --help|-h) usage; exit 0 ;;
    --*) echo "unknown flag: $1" >&2; usage >&2; exit 1 ;;
    *) if [[ -z "$PROJECT" ]]; then PROJECT="$1"; shift; else echo "unexpected arg: $1" >&2; usage >&2; exit 1; fi ;;
  esac
done

if [[ -z "$PROJECT" ]]; then usage >&2; exit 1; fi

# Normalize: allow bare name (creates under current dir) or path
if [[ "$PROJECT" != /* && "$PROJECT" != ./* && "$PROJECT" != ../* ]]; then
  PROJECT="./$PROJECT"
fi
PROJECT_ABS="$(cd "$(dirname "$PROJECT")" 2>/dev/null && pwd)/$(basename "$PROJECT")"
PROJECT_NAME="$(basename "$PROJECT_ABS")"
# Derive host/port/label from project name (kebab → label, safe port)
SAFE_LABEL="$(echo "$PROJECT_NAME" | tr -cd 'a-zA-Z0-9-' | tr '[:upper:]' '[:lower:]' | sed 's/^-*//;s/-*$//')"
[[ -z "$SAFE_LABEL" ]] && SAFE_LABEL="myapp"
# Deterministic but not colliding port: 3000 + hash
PORT="3$(printf '%s' "$SAFE_LABEL" | cksum | cut -d' ' -f1 | tail -c 4 | tr -cd '0-9' | head -c 3)"
[[ -z "$PORT" ]] && PORT="3000"
HOST_EXAMPLE="${SAFE_LABEL}.example.org"

if [[ -e "$PROJECT_ABS" && $FORCE -eq 0 ]]; then
  echo "exists: $PROJECT_ABS (use --force to overwrite scaffold files)" >&2
  exit 1
fi
mkdir -p "$PROJECT_ABS"

copy_template() {
  local src="$1" dest="$2"
  if [[ -f "$dest" && $FORCE -eq 0 ]]; then
    echo "skip (exists): $dest — use --force to overwrite"
  else
    cp "$src" "$dest"
    echo "wrote $dest"
  fi
}

# — project contract (both mirrors, since new projects should work with any agent) —
copy_template "$TEMPLATES/CLAUDE.md.template" "$PROJECT_ABS/CLAUDE.md"
copy_template "$TEMPLATES/AGENTS.md.template" "$PROJECT_ABS/AGENTS.md"
# Substitute the obvious placeholders so the file isn't pure brackets
for f in "$PROJECT_ABS/CLAUDE.md" "$PROJECT_ABS/AGENTS.md"; do
  if [[ -f "$f" ]]; then
    # Only substitute the top header and the obvious app/host/port tokens; leave other brackets for the human.
    sed -i '' "s|<Project>|$PROJECT_NAME|g; s|<project>|$PROJECT_NAME|g; s|com\.myapp|com.${SAFE_LABEL}|g; s|myapp\.example\.org|${HOST_EXAMPLE}|g; s|api-myapp|api-${SAFE_LABEL}|g; s|localhost:8340|localhost:${PORT}|g; s|\"myapp\"|\"${SAFE_LABEL}\"|g" "$f" 2>/dev/null \
    || sed -i "s|<Project>|$PROJECT_NAME|g; s|<project>|$PROJECT_NAME|g; s|com\.myapp|com.${SAFE_LABEL}|g; s|myapp\.example\.org|${HOST_EXAMPLE}|g; s|api-myapp|api-${SAFE_LABEL}|g; s|localhost:8340|localhost:${PORT}|g; s|\"myapp\"|\"${SAFE_LABEL}\"|g" "$f"
  fi
done

# — .gitignore & .env.example —
copy_template "$TEMPLATES/gitignore.template" "$PROJECT_ABS/.gitignore"
copy_template "$TEMPLATES/env.example.template" "$PROJECT_ABS/.env.example"

# — lessons —
mkdir -p "$PROJECT_ABS/docs/lessons"
[[ -f "$PROJECT_ABS/docs/lessons/.gitkeep" ]] || : > "$PROJECT_ABS/docs/lessons/.gitkeep"
if [[ ! -f "$PROJECT_ABS/docs/lessons/README.md" ]]; then
  cat > "$PROJECT_ABS/docs/lessons/README.md" <<'LESSONS'
# Lessons

One file per hard session: `YYYY-MM-DD-<slug>.md` from `templates/lesson.md.template`.

End each file with **one line for the next agent** — a principle, not a summary.
LESSONS
  echo "wrote $PROJECT_ABS/docs/lessons/README.md"
fi

# — deploy script —
mkdir -p "$PROJECT_ABS/scripts"
copy_template "$TEMPLATES/deploy-pages.sh" "$PROJECT_ABS/scripts/deploy.sh"
chmod +x "$PROJECT_ABS/scripts/deploy.sh" 2>/dev/null || true
# Patch deploy defaults
if [[ -f "$PROJECT_ABS/scripts/deploy.sh" ]]; then
  sed -i '' "s|PROJECT=\"myapp\"|PROJECT=\"${SAFE_LABEL}\"|; s|myapp\.pages\.dev|${SAFE_LABEL}.pages.dev|; s|myapp\.example\.org|${HOST_EXAMPLE}|" "$PROJECT_ABS/scripts/deploy.sh" 2>/dev/null \
  || sed -i "s|PROJECT=\"myapp\"|PROJECT=\"${SAFE_LABEL}\"|; s|myapp\.pages\.dev|${SAFE_LABEL}.pages.dev|; s|myapp\.example\.org|${HOST_EXAMPLE}|" "$PROJECT_ABS/scripts/deploy.sh"
fi

# — verify gate (single source: templates/verify.sh.template) —
mkdir -p "$PROJECT_ABS/scripts"
if [[ ! -f "$PROJECT_ABS/scripts/verify.sh" ]]; then
  cp "$TEMPLATES/verify.sh.template" "$PROJECT_ABS/scripts/verify.sh"
  chmod +x "$PROJECT_ABS/scripts/verify.sh"
  echo "wrote $PROJECT_ABS/scripts/verify.sh"
fi

# — minimal project README if none exists —
if [[ ! -f "$PROJECT_ABS/README.md" ]]; then
  cat > "$PROJECT_ABS/README.md" <<README
# $PROJECT_NAME

> One sentence: what it is and who it's for.

## Run

\`\`\`bash
npm run dev          # or: pnpm dev / python -m app
\`\`\`

## Contract

See \`CLAUDE.md\` (or \`AGENTS.md\` for non-Claude agents) — anti-regression, exact commands, gotchas.

## Deploy

\`\`\`bash
./scripts/deploy.sh
\`\`\`

See \`skills/deploy-verification\` for what "verified" means.
README
  echo "wrote $PROJECT_ABS/README.md"
fi

# — git init if not already a repo —
if [[ ! -d "$PROJECT_ABS/.git" ]]; then
  (cd "$PROJECT_ABS" && git init -q && git add -A && git commit -qm "chore: scaffold $PROJECT_NAME from dr-non-vibecoding-skills templates" || true)
  echo "git inited at $PROJECT_ABS"
fi

# — workspace Tier-1 if requested —
if [[ $WORKSPACE -eq 1 ]]; then
  WS_ROOT="$(dirname "$PROJECT_ABS")"
  for tmpl in "workspace-CLAUDE.md.template:CLAUDE.md" "workspace-AGENTS.md.template:AGENTS.md"; do
    SRC="${tmpl%%:*}"; DEST="${tmpl##*:}"
    if [[ ! -f "$WS_ROOT/$DEST" ]]; then
      cp "$TEMPLATES/$SRC" "$WS_ROOT/$DEST"
      echo "wrote $WS_ROOT/$DEST (workspace Tier-1 — fill in the project index table)"
    else
      echo "exists: $WS_ROOT/$DEST — add a row for $PROJECT_NAME manually"
    fi
  done
fi

cat <<NEXT

Done.

Project:  $PROJECT_ABS
Stack:    $STACK  (scaffold the actual app next: npx create-next-app / npm create vite / etc.)
Port:     $PORT   Host: $HOST_EXAMPLE

Next:
  1. Fill in $PROJECT_ABS/CLAUDE.md (and AGENTS.md) — one sentence + anti-regression list.
  2. Copy $PROJECT_ABS/.env.example → .env and fill secrets (never commit .env).
  3. Scaffold the app for --stack $STACK, then wire exact commands into CLAUDE.md per skills/agent-memory.
  4. Verify install:  ls ~/.claude/skills | wc -l   (expect $(ls -1 "$ROOT/skills" 2>/dev/null | wc -l | tr -d ' '))
     Or:  scripts/install-skills.sh --dry-run

NEXT
