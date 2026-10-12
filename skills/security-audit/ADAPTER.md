# Adapter — this stack's binding

Vendored from [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) at commit `c1c8a8c1471069fb0e188eeaff69b8e8db6564a8`. MIT. Copyright (c) 2025-2026 Cloudflare, Inc. Their notice is [LICENSE](LICENSE) in this folder.

The six phases in [SKILL.md](SKILL.md) stay Cloudflare's workflow. This file binds that workflow to this stack. Four rules.

Two local edits keep the file loadable here. `license: MIT` is in the frontmatter, because `make validate` requires it. The `description` is shortened to this repo's 180-character cap. The operating-modes section in `SKILL.md` still says when guidance mode is enough and when the full workflow runs.

> ผลที่ยืนยันต้องมีไฟล์กับบรรทัด และสิ่งที่สังเกตได้จริง

## 1. Confirmed findings map to file:line plus the observed result

A `confirmed` record already carries `evidence[].file`, `evidence[].line`, and `execution.observed_result`. Before you report it, print one line per evidence location, in file then line order:

```text
src/handler.c:10 — observed result: The other user's object changes.
```

[`scripts/security-audit-adapt-evidence.cjs`](../../scripts/security-audit-adapt-evidence.cjs) prints those lines. A confirmed finding with no file, no positive line, or no observed result is not reportable. `needs_validation` and `rejected` stay in `findings.json`. They do not get this line.

## 2. Resource exhaustion and operator spend go through cf-runaway-cost

When the unit is resource exhaustion, availability, or operator spend — the classes in [RESOURCE-EXHAUSTION-AND-AVAILABILITY.md](RESOURCE-EXHAUSTION-AND-AVAILABILITY.md), including paid API, quota, queue, and worker cost — the hunter and both verifiers also follow [`cf-runaway-cost`](../cf-runaway-cost/SKILL.md).

On a tree that contains a Worker or a Durable Object, run this from a clone of this stack:

```bash
python3 scripts/cf_runaway_cost_check.py <target>
```

A confirmed finding in this class on that tree cites the missing guard and puts the script output, or the absent guard, in the observed result. The guards are a run cap, exponential backoff of at least one second, a kill-switch env var, `getAlarm()` before `setAlarm`, a fan-out cap, a batched or rate-limited storage write, a poll interval of at least 10 seconds, `limits.cpu_ms` plus observability, WebSocket hibernation, or a named budget alert for a new paid binding. The companion file still covers amplification that is not Cloudflare spend. Do not stress a live or shared service. The upstream rule stands: unknown deployed caps stay `needs_validation`.

## 3. Phase 3 and phase 5 use adversarial-review

Phase 3 (candidate validation) and phase 5 (independent record verification) are a fresh verifier, not the hunter. Load [`adversarial-review`](../adversarial-review/SKILL.md): a new context, the candidate and the source, blind to the hunter's argument, executable evidence, stop when a new flaw cannot be confirmed.

The task text is the candidate-verifier prompt and the phase 5 record checks in [VALIDATION-AND-REPORTING.md](VALIDATION-AND-REPORTING.md). `adversarial-review` is who runs that text. A `quick` profile still merges the two passes into one fresh verifier, as that file says. Every other profile keeps them separate. A material phase 5 replacement gets another fresh adversarial-review pass.

## 4. Gate every findings.json

Before a findings file counts as a result, run:

```bash
scripts/security-audit-findings-gate.sh path/to/findings.json
```

The gate runs [`validate-findings.cjs`](validate-findings.cjs) on every `findings.json` it is given, then prints the file:line lines for confirmed records. A directory argument is searched for `findings.json` (`.git` and `node_modules` skipped). A tree with no `findings.json` exits 0. A validator failure or an unmappable confirmed finding exits 1.

Phase 4 and every phase 5 replacement still run `validate-coverage-ledger.cjs` as [SKILL.md](SKILL.md) requires. This gate is the findings half, and it is mandatory for any `findings.json` this stack keeps.
