#!/usr/bin/env bash
# Fork this stack and make it yours — without stealing the credit or the war stories.
#
# Three tiers, and the difference between them is the whole point:
#
#   TIER 1  YOURS          identity, tokens, contracts, install text, plugin manifests
#                          → rewritten to your name, handle, practice, accent
#   TIER 2  ATTRIBUTION    LICENSE, NOTICE.md, CONTRIBUTORS.md
#                          → never touched, and verified intact afterward
#   TIER 3  INHERITED      playbooks/, docs/lessons/, docs/relay/, dr-non-golden-rules
#                          → kept verbatim, banner added. Someone else's incidents.
#                            Cite them. Do not restate them in the first person.
#
# Usage:
#   scripts/make-it-mine.sh --name "Jane Doe" --handle janedoe \
#       --practice "Studio Rain" --accent "#3b82f6" --repo my-vibe-stack
#   scripts/make-it-mine.sh ... --apply        # actually write (default is dry-run)
#   scripts/make-it-mine.sh ... --keep-urls    # keep upstream live URLs (rarely right)
#
# Dry-run by default. Re-runnable. Reverse with `git checkout .` before committing.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

NAME=""; HANDLE=""; PRACTICE=""; ACCENT=""; REPO=""; APPLY=0; KEEP_URLS=0

# Upstream identity. Change these only if you are re-forking an already-forked tree.
UP_SHORT="Dr Non"          # display name in prose
UP_SLUG="dr-non"           # slug in paths, plugin ids, repo names
UP_FULL="Non Arkaraprasertkul"
UP_HANDLE="Nonarkara"
UP_PRACTICE="Axiom X Co., Ltd."
UP_ACCENT="#f59e0b"
UP_DOMAIN="nonarkara.org"

TIER2=(LICENSE NOTICE.md CONTRIBUTORS.md)
TIER3_PATHS=(playbooks docs/lessons docs/relay skills/dr-non-golden-rules)

die() { printf 'make-it-mine: %s\n' "$1" >&2; exit 1; }

while [ $# -gt 0 ]; do
  case "$1" in
    --name)     NAME="${2:-}"; shift 2 ;;
    --handle)   HANDLE="${2:-}"; shift 2 ;;
    --practice) PRACTICE="${2:-}"; shift 2 ;;
    --accent)   ACCENT="${2:-}"; shift 2 ;;
    --repo)     REPO="${2:-}"; shift 2 ;;
    --apply)    APPLY=1; shift ;;
    --keep-urls) KEEP_URLS=1; shift ;;
    -h|--help)  sed -n '2,27p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) die "unknown option: $1 (try --help)" ;;
  esac
done

[ -n "$NAME" ]   || die "--name is required, e.g. --name \"Jane Doe\""
[ -n "$HANDLE" ] || die "--handle is required, e.g. --handle janedoe"
: "${PRACTICE:=$NAME}"
: "${ACCENT:=$UP_ACCENT}"
: "${REPO:=${HANDLE}-vibe-coding-stack}"

case "$ACCENT" in \#[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]) ;; *)
  die "--accent must be a 6-digit hex colour like #3b82f6" ;;
esac

# A display short-name derived from the full name: "Jane Doe" → "Jane".
SHORT="${NAME%% *}"
SLUG="$(printf '%s' "$HANDLE" | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9' '-' | sed 's/^-//;s/-$//')"
[ -n "$SLUG" ] || die "--handle must contain letters or digits"

is_tier2() { local f="${1#./}"; for t in "${TIER2[@]}"; do [ "$f" = "$t" ] && return 0; done; return 1; }
is_tier3() { local f="${1#./}"; for t in "${TIER3_PATHS[@]}"; do case "$f" in "$t"/*|"$t") return 0 ;; esac; done; return 1; }

# Files we are willing to rewrite at all.
mapfile -t CANDIDATES < <(
  git ls-files '*.md' '*.sh' '*.json' '*.css' '*.template' '*.yml' 2>/dev/null \
  || find . -path ./.git -prune -o -type f \( -name '*.md' -o -name '*.sh' -o -name '*.json' -o -name '*.css' -o -name '*.template' -o -name '*.yml' \) -print
)

changed=0; banner3=0
skipped2=0; for t2 in "${TIER2[@]}"; do [ -e "$t2" ] && skipped2=$((skipped2 + 1)); done

# Any real file or directory whose NAME carries the upstream slug is protected:
# this script renames text, never paths, so rewriting those tokens would turn
# every link to them into a 404. Derived from the tree so it stays correct as
# files are added. These are also, not by coincidence, the artifacts that carry
# someone else's name on purpose — their golden rules, their prompting style,
# their war stories. A fork keeps them and writes its own alongside.
mapfile -t PROTECTED < <(
  find . -path ./.git -prune -o \( -type f -o -type d \) -name "*${UP_SLUG}*" -print 2>/dev/null \
    | sed 's|.*/||' | sed 's|\.md$||' | sort -u
)

# Values arrive from the command line and go into a sed replacement, where `&`
# expands to the whole match, `|` is our delimiter, and `\` escapes. A name like
# "Ben & Jerry" or a practice like "A|B Studio" is ordinary, not hostile.
esc() { printf '%s' "$1" | sed -e 's/[\\|&]/\\&/g'; }

apply_subs() {
  local sedargs=() i=0 tok
  local e_name e_practice e_short e_slug e_handle e_handle_lc e_accent e_repo
  e_name="$(esc "$NAME")";         e_practice="$(esc "$PRACTICE")"
  e_short="$(esc "$SHORT")";       e_slug="$(esc "$SLUG")"
  e_handle="$(esc "$HANDLE")";     e_accent="$(esc "$ACCENT")"
  e_repo="$(esc "$REPO")"
  e_handle_lc="$(esc "$(printf '%s' "$HANDLE" | tr '[:upper:]' '[:lower:]')")"
  # 1. Mask protected tokens so the slug rewrite cannot touch them.
  for tok in "${PROTECTED[@]}"; do
    sedargs+=(-e "s|${tok}|\x01P${i}\x01|g"); i=$((i + 1))
  done
  # 2. Repo name first, so it is not half-rewritten by the slug rule.
  sedargs+=(-e "s|${UP_SLUG}-vibecoding-skills|${e_repo}|g")
  # 3. Identity, longest match first.
  sedargs+=(
    -e "s|${UP_FULL}|${e_name}|g"
    -e "s|${UP_PRACTICE}|${e_practice}|g"
    -e "s|${UP_SHORT}|${e_short}|g"
    -e "s|${UP_SLUG}|${e_slug}|g"
    -e "s|${UP_HANDLE}|${e_handle}|g"
    -e "s|$(printf '%s' "$UP_HANDLE" | tr '[:upper:]' '[:lower:]')|${e_handle_lc}|g"
    -e "s|${UP_ACCENT}|${e_accent}|gI"
  )
  # 4. Unmask.
  i=0
  for tok in "${PROTECTED[@]}"; do
    sedargs+=(-e "s|\x01P${i}\x01|${tok}|g"); i=$((i + 1))
  done
  sed "${sedargs[@]}"
}

strip_urls() {
  if [ "$KEEP_URLS" -eq 1 ]; then cat; else
    # Upstream's live services are not yours. Point them at a placeholder.
    sed -e "s/[a-z0-9.-]*\.${UP_DOMAIN}/example.org/g"
  fi
}

TIER3_BANNER_MARK="<!-- inherited-from-upstream -->"

for f in "${CANDIDATES[@]}"; do
  [ -f "$f" ] || continue
  # Never rewrite this script. Bash re-reads a running script from disk (which
  # corrupts execution mid-run), and it holds the upstream constants a re-fork
  # would need.
  case "${f#./}" in scripts/make-it-mine.sh) continue ;; esac
  if is_tier2 "$f"; then continue; fi
  if is_tier3 "$f"; then
    case "$f" in *.md) ;; *) continue ;; esac
    grep -qF "$TIER3_BANNER_MARK" "$f" && continue
    banner3=$((banner3 + 1))
    if [ "$APPLY" -eq 1 ]; then
      tmp="$(mktemp)"
      # A SKILL.md opens with YAML frontmatter; anything above it breaks parsing.
      # Insert after the closing delimiter, or at the top when there is none.
      after=0
      if [ "$(head -1 "$f")" = "---" ]; then
        after="$(awk 'NR>1 && /^---[[:space:]]*$/ {print NR; exit}' "$f")"
        [ -n "$after" ] || after=0
      fi
      {
        [ "$after" -gt 0 ] && head -n "$after" "$f"
        printf '%s\n' "$TIER3_BANNER_MARK"
        printf '> **Inherited, not lived.** This document records %s'"'"'s incidents and\n' "$UP_SHORT"
        printf '> reasoning, kept verbatim from the upstream stack. It is evidence you can\n'
        printf '> learn from and cite — it is not your experience. Do not rewrite it into\n'
        printf '> the first person. Add your own war stories in new files beside it.\n\n'
        tail -n "+$((after + 1))" "$f"
      } > "$tmp" && mv "$tmp" "$f"
    fi
    continue
  fi
  # Tier 1
  new="$(apply_subs < "$f" | strip_urls)"
  if [ "$new" != "$(cat "$f")" ]; then
    changed=$((changed + 1))
    [ "$APPLY" -eq 1 ] && printf '%s' "$new" > "$f"
    [ "$APPLY" -eq 0 ] && printf '  would rewrite  %s\n' "$f"
  fi
done

# A rename is not a biography. Any line that claims lived experience — a
# profession, a city, a fleet size — is now attached to a name that did not earn
# it, so blank it rather than transfer it.
neutralise_bio() {
  [ -f README.md ] || return 0
  local line
  line="**Author.** [${NAME}](https://github.com/${HANDLE}) (${HANDLE}) — <your practice, in one line: what you build and who for>."
  awk -v repl="$line" '/^\*\*Author\.\*\*/ { print repl; next } { print }' README.md > README.md.tmp \
    && mv README.md.tmp README.md
}

# Claims a rename cannot make true. The forker has to settle these by hand.
BIO_CLAIMS=("Bangkok" "urban anthropologist" "civic-studio" "Thai–English" "depa" "ASEAN")

report_bio_claims() {
  local f hits=()
  for f in README.md AGENTS.md QUICKSTART.md CLAUDE.md HANDSHAKE.md BLUEPRINT.md CATALOG.md; do
    [ -f "$f" ] || continue
    for c in "${BIO_CLAIMS[@]}"; do
      grep -qF "$c" "$f" && { hits+=("$f"); break; }
    done
  done
  [ ${#hits[@]} -eq 0 ] && return 0
  printf '\nmake-it-mine: these still claim a life you may not have — edit by hand:\n'
  printf '              %s\n' "${hits[@]}"
  printf '              (city, profession, language pair, institutions)\n'
}

# Attribution must survive. This is the check that makes the fork honest.
verify_attribution() {
  local bad=0
  for t in "${TIER2[@]}"; do
    [ -f "$t" ] || { printf 'make-it-mine: %s is missing — attribution must be kept\n' "$t" >&2; bad=1; continue; }
    grep -qF "$UP_FULL" "$t" || { printf 'make-it-mine: %s no longer credits %s\n' "$t" "$UP_FULL" >&2; bad=1; }
  done
  return "$bad"
}

echo
if [ "$APPLY" -eq 1 ]; then
  neutralise_bio
  verify_attribution || die "attribution check failed — restore LICENSE/NOTICE.md/CONTRIBUTORS.md"
  printf 'make-it-mine: rewrote %d files, banner-marked %d inherited docs, left %d attribution files untouched.\n' \
    "$changed" "$banner3" "$skipped2"
  cat <<NEXT

You are now ${SHORT} the Builder. Three things before you commit:

  1. make validate                     counts, links, plugin packaging
  2. git diff --stat                   read it. This script is a rename, not a judgement
  3. Add yourself to CONTRIBUTORS.md   under a new heading. Do not remove ${UP_FULL}

Then replace the inherited layer with your own over time:
  - playbooks/  are ${UP_SHORT}'s war stories. Yours go in new files beside them.
  - Every skill claims an incident. When you have your own, swap the claim.
  - A rule you have not paid for yet is a borrowed rule. That is fine. Say so.
NEXT
  report_bio_claims
else
  printf 'make-it-mine: DRY RUN — %d files would be rewritten, %d inherited docs banner-marked, %d attribution files untouched.\n' \
    "$changed" "$banner3" "$skipped2"
  printf '            name=%s  short=%s  handle=%s  slug=%s\n            practice=%s  accent=%s  repo=%s\n' \
    "$NAME" "$SHORT" "$HANDLE" "$SLUG" "$PRACTICE" "$ACCENT" "$REPO"
  [ "$KEEP_URLS" -eq 0 ] && printf '            upstream *.%s URLs → example.org (use --keep-urls to prevent)\n' "$UP_DOMAIN"
  printf '\n            Re-run with --apply to write.\n'
fi
