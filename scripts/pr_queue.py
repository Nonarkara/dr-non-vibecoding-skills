#!/usr/bin/env python3
"""Read-only open-PR digest. python3 scripts/pr_queue.py <owner>

Uses `gh api graphql`. Does not merge, comment, label, close, or approve.
"""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys

# Omitted from the digest. Kept here so a pasted run does not repeat the name.
SKIP_REPOS = frozenset({"hikikikomori-love-plus"})

PAGE_SIZE = 20
MAX_PAGES = 5
MAX_SHOWN = 30
TARGET_LINES = 300
TARGET_FILES = 10
HARD_LINES = 600
HARD_FILES = 20
TITLE_WIDTH = 48

SECTIONS = (
    "What changed",
    "Why",
    "How verified",
    "Risk tier",
    "Look here first",
    "Not done",
)

OWNER_RE = re.compile(r"^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$")
RISK_LABEL = re.compile(r"(?i)^risk[:/_-][ \t]*(low|med|medium|high)$")
HEADING = {name: re.compile(rf"(?im)^[ \t]*(?:#{{1,6}}[ \t]+|\*\*)?{re.escape(name)}\b") for name in SECTIONS}
NEXT_HEADING = re.compile(r"(?im)^[ \t]*#{1,6}[ \t]+")
HIGH_SEGMENTS = frozenset({
    "auth", "oauth", "authentication", "authorization", "secret", "secrets",
    "credentials", "stripe", "payment", "payments", "billing", "checkout",
    "migration", "migrations", "deploy",
})

QUERY = (
    "query($q: String!, $cursor: String) { search(query: $q, type: ISSUE, first: %d, after: $cursor) {"
    " issueCount pageInfo { hasNextPage endCursor } nodes { ... on PullRequest {"
    " number title body url isDraft additions deletions changedFiles reviewDecision"
    " repository { name nameWithOwner } labels(first: 20) { nodes { name } }"
    " files(first: 100) { nodes { path } } statusCheckRollup { state } } } } }"
) % PAGE_SIZE


def usage() -> str:
    return "usage: python3 scripts/pr_queue.py <owner>"


def valid_owner(owner: str) -> bool:
    return bool(OWNER_RE.fullmatch(owner))


def path_is_high(path: str) -> bool:
    low = path.replace("\\", "/").lower()
    if "flooddash" in low:
        return True
    if ".github/workflows" in low or low.endswith(".gitlab-ci.yml") or "/.circleci/" in f"/{low}":
        return True
    base = low.rsplit("/", 1)[-1]
    if base in {"firestore.rules", "storage.rules"}:
        return True
    return any(seg in HIGH_SEGMENTS for seg in low.split("/") if seg)


def label_tier(names: list[str]) -> str | None:
    order = {"low": 0, "med": 1, "high": 2}
    alias = {"low": "low", "med": "med", "medium": "med", "high": "high"}
    found: str | None = None
    for name in names:
        match = RISK_LABEL.match(name.strip())
        if not match:
            continue
        tier = alias[match.group(1).lower()]
        if found is None or order[tier] > order[found]:
            found = tier
    return found


def missing_sections(body: str) -> list[str]:
    return [name for name, pattern in HEADING.items() if not pattern.search(body)]


def how_verified_has_evidence(body: str) -> bool:
    match = HEADING["How verified"].search(body)
    if not match:
        return False
    rest = body[match.end() :]
    nxt = NEXT_HEADING.search(rest)
    chunk = rest[: nxt.start()] if nxt else rest
    if re.search(r"https?://", chunk):
        return True
    if re.search(r"\b[0-9a-f]{7,40}\b", chunk, re.I):
        return True
    return "`" in chunk


def combine_tier(label: str | None, paths_high: bool, paths_partial: bool) -> str:
    tier = label or "low"
    if paths_high:
        return "high"
    if paths_partial and tier == "low":
        return "med"
    return tier


def check_word(state: str | None) -> str:
    return {
        "SUCCESS": "green",
        "FAILURE": "red",
        "ERROR": "error",
        "PENDING": "pending",
        "EXPECTED": "expected",
    }.get((state or "").upper(), "none")


def gh_graphql(query: str, variables: dict[str, object]) -> dict[str, object]:
    if shutil.which("gh") is None:
        print("pr_queue: gh is not on PATH", file=sys.stderr)
        raise SystemExit(1)
    proc = subprocess.run(
        ["gh", "api", "graphql", "--input", "-"],
        input=json.dumps({"query": query, "variables": variables}),
        capture_output=True,
        text=True,
        check=False,
    )
    if proc.returncode != 0:
        detail = (proc.stderr or proc.stdout or "gh failed").strip()
        print(f"pr_queue: gh api graphql failed ({proc.returncode}): {detail}", file=sys.stderr)
        raise SystemExit(1)
    try:
        payload = json.loads(proc.stdout)
    except json.JSONDecodeError as exc:
        print(f"pr_queue: gh returned non-JSON: {exc}", file=sys.stderr)
        raise SystemExit(1) from exc
    if payload.get("errors"):
        print(f"pr_queue: graphql errors: {payload['errors']}", file=sys.stderr)
        raise SystemExit(1)
    return payload


def fetch_nodes(owner: str) -> tuple[list[dict[str, object]], int, int, bool]:
    query = f"is:open is:pr archived:false owner:{owner}"
    cursor: str | None = None
    seen: set[str] = set()
    nodes: list[dict[str, object]] = []
    total = 0
    calls = 0
    truncated = False
    while calls < MAX_PAGES:
        payload = gh_graphql(QUERY, {"q": query, "cursor": cursor})
        calls += 1
        search = (payload.get("data") or {}).get("search") or {}
        if calls == 1:
            total = int(search.get("issueCount") or 0)
        for node in search.get("nodes") or []:
            if isinstance(node, dict) and node.get("repository"):
                nodes.append(node)
        info = search.get("pageInfo") or {}
        if not info.get("hasNextPage"):
            break
        cursor = info.get("endCursor")
        if not cursor or cursor in seen:
            truncated = True
            break
        seen.add(cursor)
    else:
        truncated = True
    return nodes, total, calls, truncated


def classify(node: dict[str, object]) -> dict[str, object] | None:
    repo = node.get("repository") or {}
    name = str(repo.get("name") or "")
    if name in SKIP_REPOS:
        return None
    full = str(repo.get("nameWithOwner") or name)
    labels = [
        str(item.get("name") or "")
        for item in ((node.get("labels") or {}).get("nodes") or [])
        if isinstance(item, dict)
    ]
    paths = [
        str(item.get("path") or "")
        for item in ((node.get("files") or {}).get("nodes") or [])
        if isinstance(item, dict)
    ]
    changed = int(node.get("changedFiles") or 0)
    additions = int(node.get("additions") or 0)
    deletions = int(node.get("deletions") or 0)
    lines = additions + deletions
    partial = changed > len(paths)
    high = any(path_is_high(path) for path in paths)
    labelled = label_tier(labels)
    tier = combine_tier(labelled, high, partial)
    body = str(node.get("body") or "")
    missing = missing_sections(body)
    evidence = how_verified_has_evidence(body)
    state = (node.get("statusCheckRollup") or {}) if isinstance(node.get("statusCheckRollup"), dict) else {}
    check_state = state.get("state") if isinstance(state, dict) else None
    check = check_word(str(check_state) if check_state else None)
    draft = bool(node.get("isDraft"))
    review = str(node.get("reviewDecision") or "")
    oversize = lines > HARD_LINES or changed > HARD_FILES
    wide = (not oversize) and (lines > TARGET_LINES or changed > TARGET_FILES)
    ready = (
        tier == "low"
        and check == "green"
        and not draft
        and not oversize
        and not missing
        and evidence
        and review != "CHANGES_REQUESTED"
    )
    if draft:
        mark = "DRAFT"
    elif ready:
        mark = "BATCH"
    else:
        mark = "HUMAN"
    flags: list[str] = []
    if missing:
        flags.append("missing:" + "+".join(missing))
    if "How verified" not in missing and not evidence:
        flags.append("no-evidence")
    if oversize:
        flags.append("oversize")
    elif wide:
        flags.append("wide")
    if partial:
        flags.append("paths-partial")
    if review == "CHANGES_REQUESTED":
        flags.append("changes-requested")
    if high and labelled and labelled != "high":
        flags.append(f"label={labelled}")
    title = " ".join(str(node.get("title") or "").split())
    if len(title) > TITLE_WIDTH:
        title = title[: TITLE_WIDTH - 1] + "…"
    return {
        "mark": mark,
        "risk": tier,
        "check": check,
        "files": changed,
        "add": additions,
        "dele": deletions,
        "repo": full,
        "number": int(node.get("number") or 0),
        "title": title,
        "flags": flags,
    }


def render_row(row: dict[str, object]) -> str:
    size = f"{row['files']}f +{row['add']}-{row['dele']}"
    flags = "  " + " ".join(row["flags"]) if row["flags"] else ""
    return (
        f"{row['mark']:<5} {row['risk']:<4} {row['check']:<7} {size:<14} "
        f"{row['repo']}#{row['number']}  {row['title']}{flags}"
    )


def main(argv: list[str]) -> int:
    if len(argv) != 2 or argv[1] in {"-h", "--help"}:
        print(usage(), file=sys.stderr if len(argv) != 2 else sys.stdout)
        return 0 if len(argv) == 2 else 2
    owner = argv[1]
    if not valid_owner(owner):
        print(usage(), file=sys.stderr)
        print(f"pr_queue: owner must be a GitHub user or org, got {owner!r}", file=sys.stderr)
        return 2
    nodes, total, calls, truncated = fetch_nodes(owner)
    skipped = 0
    rows: list[dict[str, object]] = []
    for node in nodes:
        row = classify(node)
        if row is None:
            skipped += 1
        else:
            rows.append(row)
    rows.sort(key=lambda row: ({"BATCH": 0, "HUMAN": 1, "DRAFT": 2}[str(row["mark"])], str(row["repo"]), int(row["number"])))
    counts = {mark: sum(1 for row in rows if row["mark"] == mark) for mark in ("BATCH", "HUMAN", "DRAFT")}
    shown = rows[:MAX_SHOWN]
    print(
        f"pr-queue owner={owner} search={total} fetched={len(nodes)} skipped={skipped} "
        f"batch={counts['BATCH']} human={counts['HUMAN']} draft={counts['DRAFT']} "
        f"shown={len(shown)} api_calls={calls} truncated={'yes' if truncated else 'no'}"
    )
    if not rows:
        print("no open pull requests")
        return 0
    print("MARK  RISK CHECK   SIZE           PR")
    for row in shown:
        print(render_row(row))
    hidden = len(rows) - len(shown)
    if hidden:
        print(f"… {hidden} more open pull requests not shown")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
