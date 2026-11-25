#!/usr/bin/env bash
# Poison-proof static deploy with content-level verification.
#
# Why this exists:
#   A deploy tool reporting success means the ORIGIN has new bytes. It says nothing
#   about what a human receives. Edge nodes converge independently, and HTML and each
#   asset are separate cache entries.
#
#   The dangerous case: an edge node has new HTML but stale bytes for app.js. The first
#   request for the NEW ?v= key caches those stale bytes UNDER IT. That key is now
#   permanently poisoned — new HTML running old JS, with every version check passing.
#
#   Verifying naively is what causes this. So: verify the canonical alias FIRST, and
#   probe asset CONTENT through throwaway &probe=N keys that nobody will request again.
#
# Adapt PROJECT / CANONICAL / CUSTOM / the deploy command / the probed assets.
# Exit codes: 2 canonical never converged · 3 custom lagging · 4 asset content mismatch

set -euo pipefail
cd "$(dirname "$0")/.."

PROJECT="${PAGES_PROJECT:?Set PAGES_PROJECT explicitly}"
CANONICAL="${PAGES_CANONICAL:?Set PAGES_CANONICAL explicitly}" # converges first
CUSTOM="${PAGES_CUSTOM:?Set PAGES_CUSTOM explicitly}"
ROOT="${PAGES_ROOT:?Set PAGES_ROOT to an audited asset-only directory}"

need() { command -v "$1" >/dev/null || { echo "missing: $1" >&2; exit 1; }; }
need python3; need git; need npx; need curl; need grep

# Validate names before reading file contents or invoking an upload-capable tool.
# A Git ignore file does not protect an asset-directory upload.
python3 - "$ROOT" "$CANONICAL" "$CUSTOM" <<'PY'
from pathlib import Path
import os
import sys
from urllib.parse import urlsplit

def refuse(message):
    sys.exit('FAIL: ' + message)

for address in sys.argv[2:]:
    url = urlsplit(address)
    if (url.scheme != 'https' or not url.hostname or url.username or url.password
            or url.path not in ('', '/') or url.query or url.fragment):
        refuse('deploy hosts must be credential-free HTTPS origins')

relative = Path(sys.argv[1])
if relative.is_absolute() or '..' in relative.parts or not relative.parts:
    refuse('PAGES_ROOT must be a non-root relative asset directory without traversal')
current = Path.cwd()
for part in relative.parts:
    current /= part
    if current.is_symlink():
        refuse('asset root must not contain symlinks')
root = current.resolve()
if root == Path.cwd().resolve() or not root.is_dir():
    refuse('asset root must be an existing subdirectory, never the repository root')

private = {'.git', '.aws', '.ssh', '.npmrc', '.dev.vars'}
def unsafe(name):
    lower = name.lower()
    return (lower in private or lower.startswith('.git.')
            or lower.startswith('.dev.vars.')
            or (lower.startswith('.env') and lower != '.env.example')
            or lower in {'id_rsa', 'id_ed25519', 'credentials', 'credentials.json', 'secrets.json'}
            or lower.endswith(('.pem', '.key', '.p12', '.pfx', '.sqlite', '.sqlite3', '.db')))

if any(unsafe(part) for part in relative.parts):
    refuse('private component in asset root')
def walk_error(error):
    refuse('cannot inspect complete asset tree')
for directory, folders, files in os.walk(root, followlinks=False, onerror=walk_error):
    for name in folders + files:
        entry = Path(directory) / name
        if entry.is_symlink() or unsafe(name):
            refuse('private file/component or symlink in asset tree; inspect names locally')
        if not entry.is_dir() and not entry.is_file():
            refuse('asset tree contains a non-regular file')
PY

# This validates attestations, not security itself. Reviewer must inspect receipts.
# Copy both security templates into the project and collect real evidence first.
REVISION=$(git rev-parse --verify HEAD)
python3 scripts/security_release.py docs/security-controls.json --release --commit "$REVISION"

versions_on() { curl -fsS --max-time 20 "$1/" | grep -oE 'v=[0-9]+(\.[0-9]+)+' | sort -u; }

EXPECTED=$(grep -oE 'v=[0-9]+(\.[0-9]+)+' "$ROOT/index.html" | sort -u | head -1 || true)
[[ -n "${EXPECTED}" ]] || { echo "No ?v= version found in $ROOT/index.html" >&2; exit 1; }
echo "── Expected asset version: ${EXPECTED}"

echo "── Deploying $ROOT/ → '${PROJECT}'"
npx wrangler pages deploy "$ROOT" --project-name "${PROJECT}" \
  --commit-hash "$REVISION"

wait_for_html() {  # $1=host  $2=label
  local got
  for i in $(seq 1 36); do
    got=$(versions_on "$1" || true)
    if printf '%s\n' "${got}" | grep -qx "${EXPECTED}"; then
      echo "   $2 OK (${EXPECTED}) after ${i}×5s"; return 0
    fi
    echo "   … $2 attempt ${i}: got [${got//$'\n'/, }] — sleep 5s"; sleep 5
  done
  return 1
}

echo "── Waiting for canonical alias ${CANONICAL}"
if ! wait_for_html "${CANONICAL}" "canonical"; then
  echo "FAIL: canonical never showed ${EXPECTED}" >&2
  echo "Do NOT probe ${CUSTOM} yet — that can poison the new ?v= key." >&2
  exit 2
fi

echo "── Waiting for custom domain ${CUSTOM} (safe now that canonical is live)"
if ! wait_for_html "${CUSTOM}" "custom"; then
  echo "WARN: custom domain still lagging behind ${EXPECTED}." >&2
  echo "Canonical is correct — leave custom alone; it will catch up." >&2
  echo "Do not curl new ?v= URLs on ${CUSTOM} until it matches." >&2
  exit 3
fi

# ── Asset-content probe ───────────────────────────────────────────────────────
# The HTML check above is necessary but NOT sufficient — assets are separate cache
# entries and converge on their own schedule. Verify actual CONTENT (md5 vs the local
# tree) using throwaway `&probe=N` keys: a stale probe can only poison a key nobody
# will ever request again. Require 3 consecutive matches — edge nodes are plural, so
# one good response might just be one good node.
md5_of() { md5 -q "$@" 2>/dev/null || md5sum "$@" | cut -d' ' -f1; }

probe_asset() {  # $1=host  $2=path relative to $ROOT
  local want got i streak=0
  want=$(md5_of "$ROOT/$2")
  for i in $(seq 1 24); do
    got=$(curl -fsS --max-time 20 "$1/$2?${EXPECTED}&probe=$i" | md5_of /dev/stdin || true)
    if [[ -n "${got}" && "${got}" == "${want}" ]]; then
      streak=$((streak+1))
      if [[ ${streak} -ge 3 ]]; then echo "   $2 converged on $1 (probe ${i})"; return 0; fi
    else
      streak=0
      echo "   … $2 probe ${i}: stale edge — sleep 5s"; sleep 5
    fi
  done
  echo "FAIL: $2 never converged on $1 — do NOT request its real ?${EXPECTED} key" >&2
  return 1
}

echo "── Probing asset content (throwaway cache keys)"
probe_asset "${CANONICAL}" "js/main.js"     || exit 4   # one JS + one CSS covers
probe_asset "${CUSTOM}"    "js/main.js"     || exit 4   # both asset pipelines
probe_asset "${CUSTOM}"    "css/layout.css" || exit 4

echo "── Deploy verified: ${EXPECTED} on ${CANONICAL} and ${CUSTOM} (HTML + asset content)"
