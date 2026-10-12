#!/usr/bin/env bash
# Prove the findings gate validates findings.json and maps confirmed
# records to file:line plus the observed result.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GATE="$ROOT/scripts/security-audit-findings-gate.sh"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cat > "$TMP/findings.json" <<'EOF'
[
  {
    "verdict": "confirmed",
    "fingerprint": "src-handler-missing-check",
    "title": "Missing ownership check",
    "description": "An attacker can reach an operation without the intended ownership check.",
    "root_cause": "handle omits the ownership check before changing the object.",
    "intended_behavior": "Only the object's owner can change it.",
    "trace": [
      {
        "kind": "entrypoint",
        "file": "src/handler.c",
        "line": 10,
        "scope": "handle",
        "description": "Attacker data reaches the operation."
      },
      {
        "kind": "sink",
        "file": "src/store.c",
        "line": 30,
        "scope": "write",
        "description": "The object is changed."
      }
    ],
    "evidence": [
      {
        "file": "src/store.c",
        "line": 30,
        "description": "The write happens without an ownership check."
      },
      {
        "file": "src/handler.c",
        "line": 10,
        "description": "The public operation accepts another user's identifier."
      }
    ],
    "conditions": [],
    "execution": {
      "attacker_perspective": "An unprivileged remote user with their own account.",
      "payloads": ["An object identifier owned by another user."],
      "instructions": ["Submit the identifier through the public operation."],
      "observed_result": "The other user's object changes."
    },
    "remediation": {
      "strategy": "Check ownership before the state change."
    },
    "severity": {
      "likelihood": {
        "score": "medium",
        "reason": "The operation is directly reachable."
      },
      "impact": {
        "score": "medium",
        "reason": "The attacker changes one protected object."
      },
      "overall_severity": "medium"
    },
    "confidence": {
      "score": "high",
      "reason": "The source path and result were reproduced."
    }
  }
]
EOF

out="$("$GATE" "$TMP/findings.json")"
printf '%s\n' "$out" | grep -F 'src/handler.c:10 — observed result: The other user'"'"'s object changes.' >/dev/null
printf '%s\n' "$out" | grep -F 'src/store.c:30 — observed result: The other user'"'"'s object changes.' >/dev/null
# file order, then line order
first="$(printf '%s\n' "$out" | grep -F ' — observed result:' | head -n 1)"
case "$first" in
  src/handler.c:10\ —\ observed\ result:*) ;;
  *) printf 'expected handler.c first, got: %s\n' "$first" >&2; exit 1 ;;
esac

mkdir -p "$TMP/nested/run-1"
cp "$TMP/findings.json" "$TMP/nested/run-1/findings.json"
"$GATE" "$TMP/nested" | grep -F 'src/handler.c:10 — observed result:' >/dev/null

mkdir -p "$TMP/empty"
empty_out="$("$GATE" "$TMP/empty")"
printf '%s\n' "$empty_out" | grep -F 'no findings.json' >/dev/null

mkdir -p "$TMP/bad"
printf '%s\n' '[{}]' > "$TMP/bad/findings.json"
if "$GATE" "$TMP/bad/findings.json" >/dev/null 2>&1; then
  printf 'expected invalid findings.json to fail the gate\n' >&2
  exit 1
fi

printf 'ok: security-audit findings gate\n'
