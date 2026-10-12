#!/usr/bin/env bash
# Run validate-findings.cjs on every findings.json, then map confirmed
# records to file:line plus observed result.
#
# Usage:
#   scripts/security-audit-findings-gate.sh path/to/findings.json
#   scripts/security-audit-findings-gate.sh path/to/audit-run-dir
#
# A directory is searched for files named findings.json. .git and
# node_modules are skipped. No findings.json means there is nothing to
# check and the gate exits 0. Any validator or mapping failure exits 1.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VALIDATOR="$ROOT/skills/security-audit/validate-findings.cjs"
MAPPER="$ROOT/scripts/security-audit-adapt-evidence.cjs"

if [ "$#" -lt 1 ]; then
  printf 'Usage: %s <findings.json | directory> [...]\n' "$0" >&2
  exit 2
fi

collect() {
  local path="$1"
  if [ -d "$path" ]; then
    find -P "$path" \
      \( -name .git -o -name node_modules \) -prune -o \
      -type f -name findings.json -print
  elif [ -f "$path" ]; then
    printf '%s\n' "$path"
  else
    printf 'security-audit gate: not a file or directory: %s\n' "$path" >&2
    return 1
  fi
}

list="$(mktemp)"
trap 'rm -f "$list"' EXIT
status=0
for arg in "$@"; do
  collect "$arg" >> "$list" || status=1
done
if [ "$status" -ne 0 ]; then
  exit 1
fi
mapfile -t FILES < "$list"

if [ "${#FILES[@]}" -eq 0 ]; then
  printf 'security-audit gate: no findings.json to check\n'
  exit 0
fi

fail=0
for file in "${FILES[@]}"; do
  [ -n "$file" ] || continue
  printf 'security-audit gate: %s\n' "$file"
  if ! node "$VALIDATOR" "$file"; then
    fail=1
    continue
  fi
  if ! node "$MAPPER" "$file"; then
    fail=1
  fi
done

exit "$fail"
