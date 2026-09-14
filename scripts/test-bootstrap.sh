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
  scripts/database.py design/tokens.css
)
for file in "${required[@]}"; do
  test -f "$PROJECT/$file"
done

test -d "$PROJECT/.git"
! git -C "$PROJECT" rev-parse --verify HEAD >/dev/null 2>&1
bash "$PROJECT/scripts/secrets-audit.sh" "$PROJECT" >/dev/null
(
  cd "$PROJECT"
  python3 scripts/database.py init >/dev/null
  python3 scripts/database.py stats >/dev/null
)

echo "OK: first-time-user bootstrap generated contracts, security, database, design, and dashboard"
