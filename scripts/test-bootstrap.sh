#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEST_ROOT="$(mktemp -d)"
trap 'rm -rf "$TEST_ROOT"' EXIT
PROJECT="$TEST_ROOT/audit-fixture"

# Simulate a first-time Git user: bootstrap must finish even without identity,
# signing keys, hooks, package managers, or network access.
env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null \
  "$ROOT/setup.sh" --init-project "$PROJECT" \
  --name "Audit Fixture" \
  --desc "Cross-agent bootstrap verification." \
  --stack "Static HTML" \
  --url "https://example.com" \
  --port 3000 \
  --axiom-design --no-services --yes >/dev/null

required=(
  CLAUDE.md AGENTS.md GEMINI.md .gitignore .env.example index.html
  scripts/deploy.sh scripts/verify.sh scripts/secrets-audit.sh
  scripts/database.py design/tokens.css README.md docs/components.html scripts/start.sh
)
for file in "${required[@]}"; do
  test -f "$PROJECT/$file"
done

! grep -E '<command>|<Project>|<names only|npm run|launchctl' "$PROJECT/AGENTS.md" "$PROJECT/CLAUDE.md"
grep -q 'Static HTML/JS' "$PROJECT/AGENTS.md"
grep -q 'Requested future stack: Static HTML' "$PROJECT/AGENTS.md"
test ! -f "$PROJECT/package.json"
bash -n "$PROJECT/scripts/start.sh"

# Paths, display names, descriptions and re-runs must not corrupt contracts or HTML.
SPECIAL="$TEST_ROOT/new parent/special project"
"$ROOT/setup.sh" --init-project "$SPECIAL" --name 'Research & <Design> / Lab' \
  --desc 'A | B & C' --stack 'Next.js + TypeScript' --no-services --yes >/dev/null
grep -q 'Research &amp; &lt;Design&gt; / Lab' "$SPECIAL/index.html"
grep -q 'Live URL: not deployed' "$SPECIAL/AGENTS.md"
grep -q 'No framework or dependencies have been installed' "$SPECIAL/AGENTS.md"
printf '\nUser-owned sentence.\n' >> "$SPECIAL/AGENTS.md"
"$ROOT/setup.sh" --init-project "$SPECIAL" --yes --no-services >/dev/null
grep -q 'User-owned sentence' "$SPECIAL/AGENTS.md"

"$ROOT/scripts/new-project.sh" "$TEST_ROOT/sibling" --stack none >/dev/null
test -f "$TEST_ROOT/sibling/index.html"
! grep -q '<command>' "$TEST_ROOT/sibling/AGENTS.md"

test -d "$PROJECT/.git"
! git -C "$PROJECT" rev-parse --verify HEAD >/dev/null 2>&1
(cd "$PROJECT"; bash scripts/verify.sh >/dev/null)
bash "$PROJECT/scripts/secrets-audit.sh" "$PROJECT" >/dev/null
(
  cd "$PROJECT"
  python3 scripts/database.py init >/dev/null
  python3 scripts/database.py stats >/dev/null
)

echo "OK: first-time-user bootstrap generated contracts, security, database, design, and dashboard"
