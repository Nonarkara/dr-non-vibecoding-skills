#!/usr/bin/env bash
# Fixture gate for scripts/pr_queue.py. No network. A fake gh serves two pages.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
QUEUE="$ROOT/scripts/pr_queue.py"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

python3 - "$TMP" <<'PY'
import json, pathlib, sys
tmp = pathlib.Path(sys.argv[1])

def pr(number, title, paths, changed, add, dele, labels, body, **kw):
    repo = kw.get("repo", "demo/app")
    state = kw.get("state", "SUCCESS")
    return {
        "number": number, "title": title, "body": body,
        "url": f"https://example.com/{repo}/pull/{number}",
        "isDraft": kw.get("draft", False), "additions": add, "deletions": dele,
        "changedFiles": changed, "reviewDecision": kw.get("review", "REVIEW_REQUIRED"),
        "repository": {"name": repo.split("/")[-1], "nameWithOwner": repo},
        "labels": {"nodes": [{"name": label} for label in labels]},
        "files": {"nodes": [{"path": path} for path in paths]},
        "statusCheckRollup": None if state is None else {"state": state},
    }

verified = "`python3 scripts/test-pr-queue.sh` passed.\nsha abcdef1\nhttps://example.com/pr/1\n"
ok = (
    "## What changed\nOne line.\n## Why\nThe sentence was wrong.\n## How verified\n"
    + verified
    + "## Risk tier\nlow\n## Look here first\nREADME.md\n## Not done\nNo deploy.\n"
)
no_section = ok.replace("## How verified\n" + verified, "")
no_evidence = ok.replace("## How verified\n" + verified, "## How verified\nlooks good\n")
rows = [
    (1, "fix typo", ["README.md"], 1, 20, 2, ["risk:low"], ok, {}),
    (2, "fix login", ["src/auth/session.ts"], 1, 10, 1, ["risk:low"], ok, {}),
    (3, "wip copy", ["README.md"], 1, 4, 0, ["risk:low"], ok, {"draft": True}),
    (4, "missing section", ["README.md"], 1, 8, 1, ["risk:low"], no_section, {}),
    (5, "huge diff", ["README.md"], 1, 500, 200, ["risk:low"], ok, {}),
    (9, "do-not-print-this-private-pr", ["README.md"], 1, 1, 0, ["risk:low"], ok, {"repo": "acme/hikikikomori-love-plus"}),
    (6, "declared high", ["README.md"], 1, 3, 0, ["risk:high"], ok, {}),
    (7, "checks pending", ["README.md"], 1, 6, 1, ["risk:low"], ok, {"state": "PENDING"}),
    (8, "a bit wide", ["a.md", "b.md", "c.md", "d.md"], 4, 250, 80, ["risk:low"], ok, {}),
    (10, "flood pin", ["apps/flooddash/map.ts"], 1, 12, 2, [], ok, {}),
    (11, "bare verified", ["README.md"], 1, 5, 0, ["risk:low"], no_evidence, {}),
    (12, "needs changes", ["README.md"], 1, 9, 1, ["risk:low"], ok, {"review": "CHANGES_REQUESTED"}),
    (13, "medium label", ["README.md"], 1, 7, 1, ["risk:med"], ok, {}),
    (14, "unseen files", ["README.md"], 8, 15, 1, ["risk:low"], ok, {}),
    (15, "add note", ["docs/note.md"], 1, 11, 0, ["risk:low"], ok, {}),
    (16, "author bio", ["src/author/note.ts"], 1, 14, 1, ["risk:low"], ok, {}),
]
built = [pr(*row[:8], **row[8]) for row in rows]

def dump(nodes, cursor, more):
    return {"data": {"search": {"issueCount": 16, "pageInfo": {"hasNextPage": more, "endCursor": cursor}, "nodes": nodes}}}

(tmp / "page1.json").write_text(json.dumps(dump(built[:14], "page2", True)), encoding="utf-8")
(tmp / "page2.json").write_text(json.dumps(dump(built[14:], None, False)), encoding="utf-8")
(tmp / "gh").write_text(
    "#!/usr/bin/env python3\nimport json,os,pathlib,sys\n"
    "assert sys.argv[1:]==['api','graphql','--input','-'], sys.argv[1:]\n"
    "cur=(json.load(sys.stdin).get('variables') or {}).get('cursor')\n"
    "base=pathlib.Path(os.environ['FIXTURE_DIR'])\n"
    "sys.stdout.write((base/('page2.json' if cur else 'page1.json')).read_text())\n",
    encoding="utf-8",
)
(tmp / "gh-fail").write_text(
    "#!/usr/bin/env python3\nimport sys\nsys.stdin.read()\nprint('bad credentials', file=sys.stderr)\nraise SystemExit(1)\n",
    encoding="utf-8",
)
(tmp / "gh").chmod(0o755)
(tmp / "gh-fail").chmod(0o755)
PY

set +e
out="$(PATH="$TMP:$PATH" FIXTURE_DIR="$TMP" python3 "$QUEUE" demoowner 2>"$TMP/err")"
code=$?
python3 "$QUEUE" >/dev/null 2>"$TMP/usage.txt"
usage_code=$?
python3 "$QUEUE" 'not a user' >/dev/null 2>"$TMP/bad.txt"
bad_code=$?
mkdir -p "$TMP/failbin"
cp "$TMP/gh-fail" "$TMP/failbin/gh"
chmod +x "$TMP/failbin/gh"
PATH="$TMP/failbin:$PATH" python3 "$QUEUE" demoowner >"$TMP/fail.out" 2>"$TMP/fail.err"
fail_code=$?
set -e
printf '%s\n' "$out" >"$TMP/out.txt"

python3 - "$TMP/out.txt" "$TMP/fail.err" "$code" "$usage_code" "$bad_code" "$fail_code" <<'PY'
import pathlib, sys
out, err, code, usage_code, bad_code, fail_code = sys.argv[1:]
text = pathlib.Path(out).read_text(encoding="utf-8")
needles = [
    "pr-queue owner=demoowner search=16 fetched=16 skipped=1 batch=4 human=10 draft=1 shown=15 api_calls=2 truncated=no",
    "BATCH low  green   1f +20-2       demo/app#1  fix typo",
    "BATCH low  green   4f +250-80     demo/app#8  a bit wide  wide",
    "BATCH low  green   1f +14-1       demo/app#16  author bio",
    "HUMAN high green   1f +10-1       demo/app#2  fix login  label=low",
    "DRAFT low  green   1f +4-0        demo/app#3  wip copy",
    "missing:How verified",
    "HUMAN low  green   1f +500-200    demo/app#5  huge diff  oversize",
    "HUMAN high green   1f +3-0        demo/app#6  declared high",
    "HUMAN low  pending 1f +6-1        demo/app#7  checks pending",
    "HUMAN high green   1f +12-2       demo/app#10  flood pin",
    "demo/app#11  bare verified  no-evidence",
    "demo/app#12  needs changes  changes-requested",
    "HUMAN med  green   1f +7-1        demo/app#13  medium label",
    "HUMAN med  green   8f +15-1       demo/app#14  unseen files  paths-partial",
]
missing = [item for item in needles if item not in text]
hidden = [item for item in ("do-not-print-this-private-pr", "hikikikomori-love-plus") if item in text]
codes = {
    "digest": (int(code), 0),
    "usage": (int(usage_code), 2),
    "owner": (int(bad_code), 2),
    "gh": (int(fail_code), 1),
}
bad_codes = {name: got for name, (got, want) in codes.items() if got != want}
if "bad credentials" not in pathlib.Path(err).read_text(encoding="utf-8"):
    bad_codes["gh-text"] = "missing"
if missing or hidden or bad_codes:
    print("FAIL", {"missing": missing, "hidden": hidden, "codes": bad_codes})
    print(text)
    raise SystemExit(1)
print("ok: pr_queue fixtures")
PY
