#!/usr/bin/env bash
# Fixture gate for scripts/cf_runaway_cost_check.py.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHECK="$ROOT/scripts/cf_runaway_cost_check.py"
FIX="$ROOT/scripts/fixtures/cf-runaway-cost"
fail=0

expect_rule() {
  local path="$1"
  local rule="$2"
  local out
  if out="$(python3 "$CHECK" "$path" 2>&1)"; then
    echo "FAIL: $path should have been flagged ($rule)"
    fail=1
    return
  fi
  if ! grep -q ": ${rule}:" <<<"$out"; then
    echo "FAIL: $path did not report $rule"
    echo "$out"
    fail=1
  fi
}

expect_clean() {
  local path="$1"
  local out
  if ! out="$(python3 "$CHECK" "$path" 2>&1)"; then
    echo "FAIL: $path should have passed"
    echo "$out"
    fail=1
  fi
}

expect_rule "$FIX/bad-alarm-now.ts" alarm-immediate
expect_rule "$FIX/bad-alarm-bare.ts" alarm-uncapped
expect_rule "$FIX/bad-alarm-bare.ts" alarm-from-fetch
expect_rule "$FIX/bad-self-fetch.ts" self-host
expect_rule "$FIX/bad-fanout.ts" fanout-uncapped
expect_rule "$FIX/bad-kv-loop.ts" storage-uncapped
expect_rule "$FIX/bad-d1-loop.ts" storage-uncapped
expect_rule "$FIX/bad-poll.ts" poll-fast
expect_rule "$FIX/bad-ws.ts" ws-accept
expect_rule "$FIX/bad-worker-config/wrangler.toml" worker-config
expect_rule "$FIX/bad-paid-binding/wrangler.toml" paid-binding

expect_clean "$FIX/good-alarm.ts"
expect_clean "$FIX/good-fetch-alarm.ts"
expect_clean "$FIX/good-self-fetch.ts"
expect_clean "$FIX/good-fanout.ts"
expect_clean "$FIX/good-kv-limit.ts"
expect_clean "$FIX/good-d1-batch.ts"
expect_clean "$FIX/good-poll-fast.ts"
expect_clean "$FIX/good-poll-slow.ts"
expect_clean "$FIX/good-ws.ts"
expect_clean "$FIX/good-worker-config/wrangler.toml"
expect_clean "$FIX/good-paid-binding/wrangler.toml"

# The paid-binding fail fixture already has cpu_ms and observability, so it
# must not also trip the config rule.
paid_out="$(python3 "$CHECK" "$FIX/bad-paid-binding/wrangler.toml" 2>&1 || true)"
if grep -q ": worker-config:" <<<"$paid_out"; then
  echo "FAIL: bad-paid-binding should fail on the binding only"
  echo "$paid_out"
  fail=1
fi

python3 - <<PY
from pathlib import Path
snippet = """async alarm() {
  if (this.env.ALARMS_DISABLED === "1") return;
  const n = ((await this.ctx.storage.get<number>("alarmRuns")) ?? 0) + 1;
  if (n > MAX_ALARM_RUNS) { console.error("alarm cap hit"); await this.ctx.storage.deleteAlarm(); return; }
  await this.ctx.storage.put("alarmRuns", n);
  try { await this.work(); await this.ctx.storage.put("alarmRuns", 0); }
  finally {
    if (await this.hasPendingWork() && !(await this.ctx.storage.getAlarm()))
      await this.ctx.storage.setAlarm(Date.now() + Math.min(2 ** n * 1000, 3_600_000));
  }
}"""
root = Path("$ROOT")
skill = (root / "skills/cf-runaway-cost/SKILL.md").read_text(encoding="utf-8")
fixture = (root / "scripts/fixtures/cf-runaway-cost/good-alarm.ts").read_text(encoding="utf-8")
if snippet not in skill:
    raise SystemExit("reference alarm() snippet missing from the skill")
dedented = "\n".join(line[2:] if line.startswith("  ") else line for line in fixture.splitlines())
if snippet not in dedented:
    raise SystemExit("reference alarm() snippet missing from the good fixture")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "cf-runaway-cost fixture check failed"
  exit 1
fi

echo "OK: cf-runaway-cost grep flagged every bad fixture and passed every guard"
