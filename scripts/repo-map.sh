#!/usr/bin/env bash
# Build a structural map of a directory once, so routing stops re-scanning it.
# Zero dependencies beyond bash, find, grep, awk — no LLM, no network, no
# third-party package. See skills/route-dont-scan/SKILL.md "Build the map once".
#
# This is deliberately the cheap version: grep-pattern symbol extraction, not
# an AST. It answers "where roughly is X, and what does this tree look like"
# in under a second on a thousand-file repo. It does not answer "what calls
# what" — for a real call graph, a tool like graphify (tree-sitter AST) is the
# honest upgrade; see the citation in route-dont-scan. Don't confuse the two.
#
# Usage:
#   scripts/repo-map.sh [DIR]              # writes DIR/REPO_MAP.md (default: cwd)
#   scripts/repo-map.sh [DIR] --stdout      # print instead of writing
#   scripts/repo-map.sh [DIR] --max-depth N # directory tree depth (default: 3)

set -euo pipefail

DIR="."
STDOUT=0
MAXDEPTH=3
for arg in "$@"; do
  case "$arg" in
    --stdout) STDOUT=1 ;;
    --max-depth) : ;;  # handled below
    --max-depth=*) MAXDEPTH="${arg#*=}" ;;
    -h|--help) sed -n '2,14p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) [ -d "$arg" ] && DIR="$arg" ;;
  esac
done
DIR="$(cd "$DIR" && pwd)"
OUT="$DIR/REPO_MAP.md"

# Prune the usual noise. Anything under these never gets walked or counted.
PRUNE=( -path '*/.git' -o -path '*/node_modules' -o -path '*/.next' -o \
        -path '*/dist' -o -path '*/build' -o -path '*/.venv' -o \
        -path '*/__pycache__' -o -path '*/.turbo' -o -path '*/coverage' )

now() { date -u +"%Y-%m-%dT%H:%M:%SZ"; }

emit() {
  local ts; ts="$(now)"
  local total_files total_dirs
  total_files="$(find "$DIR" \( "${PRUNE[@]}" \) -prune -o -type f -print 2>/dev/null | wc -l | tr -d ' ')"
  total_dirs="$(find "$DIR" \( "${PRUNE[@]}" \) -prune -o -type d -print 2>/dev/null | wc -l | tr -d ' ')"

  echo "# Repo Map — $(basename "$DIR")"
  echo
  echo "Generated $ts by \`scripts/repo-map.sh\`. Grep-pattern extraction, not an AST —"
  echo "read this before scanning; re-read the actual file before editing it. Zero LLM"
  echo "tokens to build. Re-run after a structural change; it does not watch."
  echo
  echo "**$total_files files, $total_dirs directories** (after pruning build/vendor noise)."
  echo
  echo "---"
  echo
  echo "## Directory tree (depth $MAXDEPTH)"
  echo
  echo '```'
  find "$DIR" -maxdepth "$MAXDEPTH" \( "${PRUNE[@]}" \) -prune -o -print 2>/dev/null \
    | sed "s|^$DIR||" | grep -v '^$' | sort \
    | awk -F/ '{
        indent=""
        for (i=2; i<NF; i++) indent = indent "  "
        n = split($0, parts, "/")
        print indent parts[n]
      }' | head -400 || true
  echo '```'
  echo

  echo "## God files (most-referenced basenames — a proxy, not a call graph)"
  echo
  echo "Counts how often each file's basename is mentioned in every other file's text."
  echo "Cheap and noisy (string match, not an import resolver) but the top of this list"
  echo "is reliably \"the thing everything else assumes you've read.\""
  echo
  find "$DIR" \( "${PRUNE[@]}" \) -prune -o -type f \
    \( -name '*.md' -o -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' \
       -o -name '*.py' -o -name '*.go' -o -name '*.sh' -o -name '*.json' \) -print 2>/dev/null \
    > /tmp/repo-map-files.$$ || true
  {
    while IFS= read -r f; do
      base="$(basename "$f")"
      [ "$base" = "REPO_MAP.md" ] && continue
      # Match on the full relative path, not the basename. Two collisions in
      # testing proved any fixed-depth prefix still isn't safe: this repo
      # names every skill file identically ("SKILL.md"), and a generated
      # books-to-skill pipeline gives ~35 skills an identical
      # chapters/ch01.md..ch05.md substructure — a 2-segment key still
      # collides across all of them. The full relative path is unique by
      # construction, and it is still what a real cross-link contains (this
      # repo writes links as skills/<name>/SKILL.md, the full path).
      key="${f#$DIR/}"
      cnt="$(grep -rl --include='*.md' --include='*.ts' --include='*.tsx' --include='*.js' \
             --include='*.py' --include='*.go' --include='*.sh' -F -- "$key" "$DIR" 2>/dev/null \
             | grep -vc -F -- "$f" || true)"
      [ "${cnt:-0}" -gt 0 ] && printf '%d\t%s\n' "$cnt" "${f#$DIR/}"
    done < /tmp/repo-map-files.$$
  } | sort -rn | head -20 | awk -F'\t' '{printf "- **%s** — referenced from %s other files\n", $2, $1}' || true
  rm -f /tmp/repo-map-files.$$
  echo

  echo "## Symbols per file (top-level declarations, grep patterns per language)"
  echo
  echo "Not scope-aware — a match inside a string or comment is a false positive,"
  echo "and a nested/class-method declaration is not walked. It is enough to answer"
  echo "\"which file defines X\" without opening every file to check."
  echo
  find "$DIR" \( "${PRUNE[@]}" \) -prune -o -type f \
    \( -name '*.md' -o -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' \
       -o -name '*.py' -o -name '*.go' -o -name '*.sh' \) -print 2>/dev/null | sort \
  | while IFS= read -r f; do
      rel="${f#$DIR/}"
      case "$f" in
        *.md)
          syms="$(grep -n '^#\{1,3\} ' "$f" 2>/dev/null | sed 's/^\([0-9]*\):#* /\1: /' | head -12 || true)"
          ;;
        *.py)
          syms="$(grep -nE '^(class|def|async def) ' "$f" 2>/dev/null | head -30 || true)"
          ;;
        *.go)
          syms="$(grep -nE '^func ' "$f" 2>/dev/null | head -30 || true)"
          ;;
        *.sh)
          syms="$(grep -nE '^[a-zA-Z_][a-zA-Z0-9_]*\(\)' "$f" 2>/dev/null | head -30 || true)"
          ;;
        *.ts|*.tsx|*.js|*.jsx)
          syms="$(grep -nE '^(export )?(default )?(async )?(function|class|const|interface|type) ' "$f" 2>/dev/null | head -30 || true)"
          ;;
        *) syms="" ;;
      esac
      [ -n "$syms" ] || continue
      echo "### \`$rel\`"
      echo '```'
      echo "$syms"
      echo '```'
      echo
    done
}

if [ "$STDOUT" -eq 1 ]; then
  emit
else
  emit > "$OUT"
  echo "repo-map: wrote $(wc -l < "$OUT" | tr -d ' ') lines to $OUT"
fi
