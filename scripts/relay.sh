#!/usr/bin/env bash
# Agent relay — hand work between agents through commits, with a baton and a ledger.
# Zero dependencies beyond bash, awk, and git. See skills/agent-relay/SKILL.md.
#
# Usage:
#   scripts/relay.sh open <agent-id> [--scope "paths"]     take the baton, start a leg
#   scripts/relay.sh verdict confirm|correct|reject "note" rule on the previous leg
#   scripts/relay.sh landed "fact"                         record a verifiable fact
#   scripts/relay.sh open-question "question"              record a question, no preferred answer
#   scripts/relay.sh handoff                               close the leg, print commit trailers
#   scripts/relay.sh trailers [leg]                        print trailers (defaults to the last leg)
#   scripts/relay.sh status                                who holds the baton, convergence count
#   scripts/relay.sh check                                 validate the ledger; non-zero on error
#
# The ledger defaults to docs/relay/RELAY.md under the git root.
# Override with RELAY_LEDGER=path or --ledger path (must come before the command).

set -euo pipefail

LEDGER="${RELAY_LEDGER:-}"
if [ "${1:-}" = "--ledger" ]; then [ -n "${2:-}" ] || { echo "relay: --ledger needs a path" >&2; exit 1; }; LEDGER="$2"; shift 2; fi
if [ -z "$LEDGER" ]; then
  ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
  LEDGER="$ROOT/docs/relay/RELAY.md"
fi

now()  { date -u +"%Y-%m-%dT%H:%M:%SZ"; }
die()  { printf 'relay: %s\n' "$1" >&2; exit 1; }

ensure_ledger() {
  [ -f "$LEDGER" ] && return 0
  mkdir -p "$(dirname "$LEDGER")"
  cat > "$LEDGER" <<'HDR'
# Relay ledger

Append-only. One leg per agent turn. A leg may not open until the previous one
has a verdict. Protocol: `skills/agent-relay/SKILL.md`.

HDR
}

# Emits: "<leg> <agent> <state>" for the last leg, or nothing.
last_leg() {
  [ -f "$LEDGER" ] || return 0
  awk -F' · ' '/^## Leg /{ n=$1; sub(/^## Leg /,"",n); leg=n; agent=$2; state=$4 }
       END{ if (leg != "") print leg, agent, state }' "$LEDGER"
}

require_open() {
  local info leg state
  info="$(last_leg)"
  [ -n "$info" ] || die "no leg open — run: relay.sh open <agent-id>"
  leg="$(echo "$info" | awk '{print $1}')"
  state="$(echo "$info" | awk '{print $NF}')"
  [ "$state" = "OPEN" ] || die "leg $leg is closed — run: relay.sh open <agent-id>"
  echo "$leg"
}

# Append a bullet to the currently open leg (i.e. at end of file).
append_line() { printf '%s\n' "$1" >> "$LEDGER"; }

cmd_open() {
  local agent="${1:-}" scope="unscoped"
  [ -n "$agent" ] || die "usage: relay.sh open <agent-id> [--scope \"paths\"]"
  shift
  while [ $# -gt 0 ]; do
    case "$1" in
      --scope) scope="${2:-}"; shift 2 ;;
      *) die "unknown option: $1" ;;
    esac
  done
  ensure_ledger
  local info prev state next
  info="$(last_leg)"
  if [ -n "$info" ]; then
    state="$(echo "$info" | awk '{print $NF}')"
    prev="$(echo "$info" | awk '{print $1}')"
    [ "$state" = "CLOSED" ] || die "leg $prev is still OPEN, held by $(echo "$info" | awk '{print $2}') — one baton at a time"
    next=$((10#$prev + 1))
  else
    prev=""; next=1
  fi
  printf '\n## Leg %02d · %s · %s · OPEN\n' "$next" "$agent" "$(now)" >> "$LEDGER"
  append_line "- Scope: $scope"
  printf 'relay: leg %02d open · %s · scope: %s\n\n' "$next" "$agent" "$scope"
  if [ -n "$prev" ]; then
    cat <<COLD
Cold read first — this ordering is the protocol:
  1. git log --oneline -5   then read the DIFF of leg $prev, not its summary
  2. write findings down    file, line, what is wrong
  3. only then read leg $prev's Landed/Open lines in $LEDGER
  4. relay.sh verdict confirm|correct|reject "<note with a line reference>"
COLD
  else
    echo "First leg — nothing to rule on. Record Landed facts as you go."
  fi
}

cmd_verdict() {
  local kind="${1:-}" note="${2:-}"
  case "$kind" in confirm|correct|reject) ;; *) die "usage: relay.sh verdict confirm|correct|reject \"note\"" ;; esac
  [ -n "$note" ] || die "a verdict needs a note with a line reference"
  local leg prev
  leg="$(require_open)"
  prev=$((10#$leg - 1))
  [ "$prev" -ge 1 ] || die "leg $leg is the first leg — there is nothing to rule on"
  append_line "- Verdict on leg $(printf '%02d' "$prev"): $kind — $note"
  echo "relay: recorded $kind on leg $(printf '%02d' "$prev")"
}

cmd_landed()   { local leg; leg="$(require_open)"; [ -n "${1:-}" ] || die "usage: relay.sh landed \"verifiable fact\""; append_line "- Landed: $1"; echo "relay: landed recorded on leg $leg"; }
cmd_question() { local leg; leg="$(require_open)"; [ -n "${1:-}" ] || die "usage: relay.sh open-question \"question\""; append_line "- Open: $1"; echo "relay: open question recorded on leg $leg"; }

# Print the Relay-* commit trailers for a leg. Verdicts are summarised by count;
# the detail stays in the ledger. One Relay-Open line per open question.
emit_trailers() {
  awk -v want="$1" -F' · ' '
    /^## Leg /{ n=$1; sub(/^## Leg /,"",n); cur=n; agent[cur]=$2 }
    cur==want && /^- Verdict on leg /{
      prev=$0; sub(/^- Verdict on leg /,"",prev); sub(/:.*$/,"",prev)
      if ($0 ~ /: correct — /)      corrected++
      else if ($0 ~ /: reject — /)  rejected++
      else if ($0 ~ /: confirm — /) confirmed++
    }
    cur==want && /^- Open: /{ o=$0; sub(/^- Open: /,"",o); opens[++oc]=o }
    END{
      printf "Relay-Leg: %s\n", want
      printf "Relay-Agent: %s\n", agent[want]
      if (prev != "") {
        parts=""
        if (corrected) parts = corrected " corrected"
        if (rejected)  parts = (parts=="" ? "" : parts ", ") rejected " rejected"
        if (confirmed) parts = (parts=="" ? "" : parts ", ") confirmed " confirmed"
        printf "Relay-Reviewed: %s — %s\n", prev, parts
      }
      for (i=1; i<=oc; i++) printf "Relay-Open: %s\n", opens[i]
    }' "$LEDGER"
}

cmd_trailers() {
  local leg="${1:-}"
  if [ -z "$leg" ]; then
    leg="$(last_leg | awk '{print $1}')"
    [ -n "$leg" ] || die "no legs in $LEDGER"
  fi
  emit_trailers "$leg"
}

cmd_handoff() {
  local leg; leg="$(require_open)"
  local verdicts; verdicts="$(awk -v want="$leg" -F' · ' '
    /^## Leg /{ n=$1; sub(/^## Leg /,"",n); cur=n }
    cur==want && /^- Verdict on leg /{ c++ } END{ print c+0 }' "$LEDGER")"
  if [ "$((10#$leg))" -gt 1 ] && [ "$verdicts" -eq 0 ]; then
    die "leg $leg has no verdict on leg $(printf '%02d' $((10#$leg - 1))) — silence is not confirmation"
  fi
  append_line "- Closed: $(now)"
  # Flip the header state for this leg from OPEN to CLOSED.
  awk -v want="$leg" -F' · ' 'BEGIN{OFS=" · "}
    /^## Leg /{ n=$1; sub(/^## Leg /,"",n); if (n==want && $4=="OPEN") { $4="CLOSED" } }
    { print }' "$LEDGER" > "$LEDGER.tmp" && mv "$LEDGER.tmp" "$LEDGER"
  echo "relay: leg $leg closed. Paste these trailers into the commit message:"
  echo
  emit_trailers "$leg"
}

cmd_status() {
  [ -f "$LEDGER" ] || { echo "relay: no ledger at $LEDGER"; return 0; }
  echo "relay: ledger $LEDGER"
  awk -F' · ' '/^## Leg /{ n=$1; sub(/^## Leg /,"",n); printf "  leg %s  %-22s %-8s %s\n", n, $2, $4, $3 }' "$LEDGER"
  # Convergence: trailing legs whose verdicts are all "confirm".
  local streak; streak="$(awk -F' · ' '
    /^## Leg /{ legs++; corrections[legs]=0; ruled[legs]=0 }
    /^- Verdict on leg /{ ruled[legs]=1; if ($0 !~ / confirm — /) corrections[legs]=1 }
    END{ s=0; for (i=legs; i>=2; i--) { if (ruled[i] && corrections[i]==0) s++; else break } print s }' "$LEDGER")"
  echo "  zero-correction streak: $streak (converged at 2 — stop the relay)"
}

cmd_check() {
  # No ledger means no relay is running — nothing to validate, not a failure.
  [ -f "$LEDGER" ] || { echo "relay: no ledger at $LEDGER — no relay running"; return 0; }
  local errors=0 out
  out="$(awk -F' · ' '
    /^## Leg /{
      n=$1; sub(/^## Leg /,"",n); legs++; num[legs]=n; agent[legs]=$2; state[legs]=$4; ruled[legs]=0
      if (legs>1 && state[legs-1]=="OPEN") printf "leg %s opened while leg %s was still OPEN\n", n, num[legs-1]
      if (legs+0 != n+0) printf "leg %s is out of sequence (expected %02d)\n", n, legs
    }
    /^- Verdict on leg /{ ruled[legs]=1 }
    END{
      for (i=2; i<=legs; i++) if (state[i]=="CLOSED" && !ruled[i]) printf "leg %s closed without a verdict on leg %s\n", num[i], num[i-1]
      if (legs>0 && state[legs]=="OPEN") printf "leg %s is still open (held by %s)\n", num[legs], agent[legs]
    }' "$LEDGER")"
  if [ -n "$out" ]; then
    printf '%s\n' "$out" >&2
    errors=1
  else
    echo "relay: ledger OK"
  fi
  return "$errors"
}

case "${1:-}" in
  open)          shift; cmd_open "$@" ;;
  verdict)       shift; cmd_verdict "$@" ;;
  landed)        shift; cmd_landed "${1:-}" ;;
  open-question) shift; cmd_question "${1:-}" ;;
  handoff)       cmd_handoff ;;
  trailers)      shift; cmd_trailers "${1:-}" ;;
  status)        cmd_status ;;
  check)         cmd_check ;;
  ""|-h|--help)  sed -n '2,16p' "$0" | sed 's/^# \{0,1\}//' ;;
  *)             die "unknown command: $1 (try --help)" ;;
esac
