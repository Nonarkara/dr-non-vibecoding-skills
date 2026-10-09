#!/usr/bin/env python3
"""Grep tripwire for the cf-runaway-cost review rule.

Point it at a Worker project. Exit 1 when a pattern is present without the
guard the skill names. Exit 0 when nothing matched. It does not run the code.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

SUFFIXES = {".ts", ".tsx", ".js", ".mjs", ".cjs", ".toml", ".json", ".jsonc"}
WRANGLER_NAMES = {"wrangler.toml", "wrangler.json", "wrangler.jsonc"}

ALARM_NOW = re.compile(r"setAlarm\(\s*Date\.now\(\)\s*\)")
KILL_SWITCH = re.compile(r"ALARMS_DISABLED|env\.[A-Z0-9_]*(?:DISABLED|KILL)")
BACKOFF_BASE = re.compile(r"2\s*\*\*|Math\.pow\(\s*2")
BACKOFF_FLOOR = re.compile(r"(?<![\d_])(?:1000|1_000)(?![\d_])")
BACKOFF_CAP = re.compile(r"Math\.min|3_600_000|3600000")
SELF_HOST = re.compile(
    r"fetch\s*\(\s*request\.url"
    r"|fetch\s*\(\s*new\s+Request\s*\(\s*request\.url"
    r"|fetch\s*\(\s*new\s+URL\s*\([^)]*request\.url"
)
LOOP = re.compile(r"\bfor\s*\(|\bwhile\s*\(|\.forEach\s*\(|\.map\s*\(")
FANOUT_CAP = re.compile(r"MAX_|FANOUT|\.slice\s*\(|\bpageSize\b")
STORAGE_PUT = re.compile(
    r"env\.[A-Za-z0-9_]+\.put\s*\(|\bKV\.put\s*\(|\bR2\.put\s*\(|\bbucket\.put\s*\("
)
STORAGE_GUARD = re.compile(r"ratelimits|\.limit\s*\(|\.batch\s*\(")
POLL_DELAY = re.compile(
    r"set(?:Interval|Timeout)\s*\([\s\S]*?,\s*(\d[\d_]*)\s*\)"
)
PAID_BINDING = re.compile(
    r"durable_objects|r2_buckets|new_sqlite_classes|\bnew_classes\b"
    r"|\[\[queues|\"queues\"\s*:|^\[ai\]\s*$",
    re.M,
)
BUDGET_WORD = re.compile(r"budget|billable-usage|usage alert", re.I)
WS_ACCEPT = re.compile(
    r"\b(?:server|ws|webSocket|websocket|socket)\.accept\s*\("
)


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        print("usage: python3 scripts/cf_runaway_cost_check.py <file-or-dir>", file=sys.stderr)
        return 2
    root = Path(argv[1])
    if not root.exists():
        print(f"{root}: not found", file=sys.stderr)
        return 2
    findings: list[str] = []
    for path in iter_files(root):
        text = path.read_text(encoding="utf-8", errors="replace")
        findings.extend(check_text(path, text))
    if findings:
        print("\n".join(findings))
        return 1
    print("ok: no cf-runaway-cost findings")
    return 0


def iter_files(root: Path):
    if root.is_file():
        if root.suffix in SUFFIXES:
            yield root
        return
    for path in sorted(root.rglob("*")):
        if not path.is_file() or path.suffix not in SUFFIXES:
            continue
        if "node_modules" in path.parts or ".git" in path.parts:
            continue
        yield path


def check_text(path: Path, text: str) -> list[str]:
    findings: list[str] = []
    check_alarms(path, text, findings)
    check_self_host(path, text, findings)
    check_fanout(path, text, findings)
    check_storage(path, text, findings)
    check_poll(path, text, findings)
    check_worker_config(path, text, findings)
    check_websocket(path, text, findings)
    return findings


def emit(findings: list[str], path: Path, text: str, pattern: str, rule: str, message: str) -> None:
    findings.append(f"{path}:{line_of(text, pattern)}: {rule}: {message}")


def line_of(text: str, pattern: str) -> int:
    rx = re.compile(pattern)
    for index, line in enumerate(text.splitlines(), 1):
        if rx.search(line):
            return index
    return 1


def method_body(text: str, name: str) -> str:
    match = re.search(rf"async\s+{name}\s*\(", text)
    if not match:
        return ""
    rest = text[match.end() :]
    nxt = re.search(r"\n\s*async\s+\w+\s*\(", rest)
    return rest[: nxt.start()] if nxt else rest


def check_alarms(path: Path, text: str, findings: list[str]) -> None:
    if "setAlarm" not in text:
        return
    if ALARM_NOW.search(text):
        emit(
            findings,
            path,
            text,
            r"setAlarm\(\s*Date\.now\(\)\s*\)",
            "alarm-immediate",
            "setAlarm(Date.now()) runs again immediately",
        )
    fetch_body = method_body(text, "fetch")
    if "setAlarm" in fetch_body and "getAlarm" not in fetch_body:
        emit(
            findings,
            path,
            text,
            r"setAlarm",
            "alarm-from-fetch",
            "setAlarm inside fetch needs a getAlarm() check first",
        )
    missing: list[str] = []
    if not KILL_SWITCH.search(text):
        missing.append("kill-switch env var")
    has_cap = "MAX_ALARM_RUNS" in text or (
        "alarmRuns" in text and "deleteAlarm" in text
    )
    if not has_cap:
        missing.append("run cap")
    if not (BACKOFF_BASE.search(text) and BACKOFF_FLOOR.search(text) and BACKOFF_CAP.search(text)):
        missing.append("exponential backoff with a 1s floor")
    if "getAlarm" not in text:
        missing.append("getAlarm() check")
    if missing:
        emit(
            findings,
            path,
            text,
            r"setAlarm",
            "alarm-uncapped",
            "setAlarm is missing " + ", ".join(missing),
        )


def check_self_host(path: Path, text: str, findings: list[str]) -> None:
    if SELF_HOST.search(text):
        emit(
            findings,
            path,
            text,
            r"fetch\s*\(\s*(?:new\s+(?:Request|URL)\s*\(\s*)?request\.url",
            "self-host",
            "Worker fetches its own request URL",
        )


def check_fanout(path: Path, text: str, findings: list[str]) -> None:
    scheduled = re.search(r"\bscheduled\s*\(", text)
    sends = re.search(r"\.send\s*\(", text)
    if not scheduled and not sends:
        return
    if not LOOP.search(text):
        return
    if not re.search(r"fetch\s*\(|getByName|idFromName|\.send\s*\(", text):
        return
    if FANOUT_CAP.search(text):
        return
    emit(
        findings,
        path,
        text,
        r"scheduled|\.send\s*\(",
        "fanout-uncapped",
        "cron or queue fans out in a loop with no cap",
    )


def has_storage_write(text: str) -> bool:
    if STORAGE_PUT.search(text):
        return True
    return ".prepare(" in text and re.search(r"\.run\s*\(", text) is not None


def check_storage(path: Path, text: str, findings: list[str]) -> None:
    if not has_storage_write(text):
        return
    on_request = re.search(r"async\s+fetch\s*\(", text) is not None
    if not on_request and not LOOP.search(text):
        return
    if STORAGE_GUARD.search(text):
        return
    emit(
        findings,
        path,
        text,
        r"\.put\s*\(|\.run\s*\(",
        "storage-uncapped",
        "KV, D1, or R2 write per request or in a loop, with no batch and no ratelimits binding",
    )


def check_poll(path: Path, text: str, findings: list[str]) -> None:
    if not re.search(r"fetch\s*\(|workers\.dev|WebSocket", text):
        return
    too_fast = False
    for match in POLL_DELAY.finditer(text):
        delay = int(match.group(1).replace("_", ""))
        if delay < 10_000:
            too_fast = True
            break
    if not too_fast:
        return
    paused = re.search(r"document\.hidden|visibilityState", text) is not None
    backs_off = re.search(r"backoff|Math\.min|Math\.pow|\*\s*2", text) is not None
    if paused and backs_off:
        return
    emit(
        findings,
        path,
        text,
        r"set(?:Interval|Timeout)",
        "poll-fast",
        "polling under 10s against a Worker without a hidden-tab pause and backoff",
    )


def is_worker_config(path: Path, text: str) -> bool:
    if path.name not in WRANGLER_NAMES:
        return False
    return re.search(r"compatibility_date|\bmain\b|\"name\"|^name\s*=", text, re.M) is not None


def observability_disabled(text: str) -> bool:
    match = re.search(r"observability", text, re.I)
    if not match:
        return True
    window = text[match.start() : match.start() + 400]
    return re.search(r"enabled\s*[:=]\s*false", window) is not None


def has_budget(path: Path, text: str) -> bool:
    if BUDGET_WORD.search(text):
        return True
    for name in ("BUDGET.md", "budget.md", "budget-alert.md"):
        sibling = path.parent / name
        if sibling.is_file() and BUDGET_WORD.search(sibling.read_text(encoding="utf-8", errors="replace")):
            return True
    return False


def check_worker_config(path: Path, text: str, findings: list[str]) -> None:
    if not is_worker_config(path, text):
        return
    if "cpu_ms" not in text or observability_disabled(text):
        emit(
            findings,
            path,
            text,
            r"name|compatibility_date|main",
            "worker-config",
            "Worker config needs limits.cpu_ms and observability enabled",
        )
    if PAID_BINDING.search(text) and not has_budget(path, text):
        emit(
            findings,
            path,
            text,
            r"durable_objects|r2_buckets|queues|\[ai\]|new_sqlite_classes|new_classes",
            "paid-binding",
            "new Durable Object, Queue, Workers AI, or R2 binding with no budget alert",
        )


def check_websocket(path: Path, text: str, findings: list[str]) -> None:
    if WS_ACCEPT.search(text):
        emit(
            findings,
            path,
            text,
            r"\b(?:server|ws|webSocket|websocket|socket)\.accept\s*\(",
            "ws-accept",
            "use acceptWebSocket(), not accept(), on a Durable Object WebSocket",
        )


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
