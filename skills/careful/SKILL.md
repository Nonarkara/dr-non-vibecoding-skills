---
name: careful
description: >-
  Pre-tool guardrail: warn before rm -rf, DROP TABLE, force-push, and
  similar destructive commands. Use when touching prod, debugging live
  systems, or in a shared environment.
license: MIT
---

# Careful

> A real mistake is a real cost. A near-miss is a lesson. A near-miss the operator knew about, in advance, is the cheap lesson.

[`risk-posture`](../risk-posture/SKILL.md) is the calibration — the answer to "how much risk is OK on this project, given the blast radius." This is the **enforcement** — the answer to "if a destructive command is about to run, who says stop first." The two are different skills because they run at different times. The risk posture is set at the start of the project; the careful mode is active every time a `Bash` tool is invoked.

The pattern is older than any specific tool. Pair programming has the same shape: a second person who can say "are you sure?" before the `rm -rf` runs. The careful mode is the same discipline, automated: a `PreToolUse` hook on the `Bash` tool that inspects the command, recognises the destructive patterns, and stops the command with a warning. The operator reads the warning, decides whether the command is really what they meant, and either proceeds or cancels. The cancellation is one keystroke; the `rm -rf` would have been a ticket.

The discipline is not "block destructive commands." The discipline is "make destructive commands a deliberate choice." A `rm -rf build/` in a CI cleanup script is a destructive command that is correct; the operator's intent is the build directory, and the warning is a no-op. A `rm -rf /` in a debugging session is a destructive command that is not correct; the operator's intent was a specific path, and the warning is the second chance.

---

## The patterns

The hook recognises a small, opinionated set of patterns. The list is not exhaustive; the list is the **high hit rate** list. A pattern that fires once a month on a real mistake is worth the warning; a pattern that fires once a quarter on a false positive is annoying, and the operator learns to ignore warnings, and the discipline is dead.

| Pattern | Why it warns | The fix if the operator really means it |
|---|---|---|
| `rm -rf <path>` where the path is a parent of the working tree, or a system path, or a wildcard | The blast radius is the entire filesystem. The cost of the mistake is the entire project. | Rewrite the command with the specific path: `rm -rf ./build/`, not `rm -rf /`. |
| `DROP TABLE` / `DROP DATABASE` / `TRUNCATE` | The blast radius is the entire table or database. The cost of the mistake is data loss. | Use a transaction: `BEGIN; DROP TABLE ...; ROLLBACK;` — the operator can inspect the data, then commit. |
| `git push --force` / `git push -f` to a branch other than the operator's own | The blast radius is the shared history. The cost of the mistake is the work of every other developer who has pulled. | Use `--force-with-lease` (which fails if the remote has moved on) or coordinate with the team first. |
| `git reset --hard` without a backup ref | The blast radius is the local working tree and the local history. The cost of the mistake is uncommitted work. | `git stash` first, or note the SHA being thrown away, or use `git reset --soft` and inspect. |
| `kubectl delete namespace` / `kubectl delete --all` | The blast radius is the namespace or the cluster. The cost of the mistake is the deployed state. | Use `--dry-run=server` first, or scope the delete to a single resource. |
| `aws s3 rm --recursive` / `aws ec2 terminate-instances` / similar batch cloud commands | The blast radius is the bucket or the instance set. The cost is data loss or downtime. | Use `--dry-run` or scope the path. |
| `chmod -R 777` / `chown -R` on a system path | The blast radius is the file permissions. The cost is system access. | Use the specific user/group; do not recursively grant to all. |
| `dd if=... of=/dev/...` | The blast radius is the disk. The cost is the entire system. | Verify the `of=` target with `lsblk` first. |
| `mkfs` / `fdisk` on a system disk | Same as `dd`. | The system disk should not be touched outside a documented recovery procedure. |
| `curl ... | bash` / `wget ... | bash` | The blast radius is the operator's machine, executing remote code without inspection. | Download to a file, inspect, then execute. |
| `--no-preserve-root` in any command | The blast radius is the entire filesystem. | There is no fix; the command is not a command the operator means to run. |

The list is **opinionated, not exhaustive**. A project that uses Terraform has additional patterns (`terraform destroy` without a saved plan); a project that uses Docker has additional patterns (`docker system prune -a`); a project that uses Postgres has additional patterns (`DELETE FROM` without a `WHERE` clause). The list is extended per project, in `.careful/patterns.yaml`, with the same "high hit rate" bar.

A pattern that fires on a false positive once a month is removed from the list. The list is a curated set, not a maximal one.

---

## The hook

The hook is a small script that runs on every `PreToolUse:Bash` event. The script:

1. Reads the proposed command.
2. Checks the command against the patterns list.
3. If no pattern matches, exits silently (the command proceeds).
4. If a pattern matches, prints a warning, the matched pattern, the proposed command, and a one-line fix. The command is *not* executed; the agent session receives the warning and asks the operator to confirm or cancel.
5. The operator's choice is logged: "proceeded" or "cancelled" with the timestamp and the pattern.

The hook is **the same code in every project**; the patterns list is per-project. The hook is at `scripts/careful.sh`, added by `setup.sh` on first run. The patterns list is at `.careful/patterns.yaml`, committed to the repo, edited by the team. A team that has a new destructive pattern in their workflow adds it to the list; a team that finds the list too noisy prunes it.

The hook is **the second chance, not the first**. The first chance is the operator thinking before they type. The second chance is the hook. The discipline is that the operator has both, in that order. A team that relies on the hook alone stops thinking before they type, and the hook becomes a crutch. A team that uses the hook as the second chance, on top of the operator's thinking, has the right shape.

---

## The four override paths

The hook does not block — the hook *warns*. The operator can override the warning with one of four paths, each logged:

1. **Proceed with the command as written.** The warning is the second chance; the operator accepts the risk. The override is logged with the pattern and the timestamp. A pattern that is overridden 100% of the time is a pattern that should be removed from the list.
2. **Rewrite the command.** The operator accepts that the original was wrong and runs the safer version. The rewrite is logged. The pattern is recorded as "fired, rewritten, fixed" — the data point that the warning was useful.
3. **Defer to a script.** The operator adds the destructive command to a `scripts/` file that the team has reviewed, and runs the script instead. The deferral is logged; the script review is the new gate.
4. **Disable the pattern for this session.** The operator has a reason (a one-time recovery, a script in a CI pipeline) and wants to silence the warning for this session. The disable is logged; the session-scoped disable auto-expires when the session ends.

The four paths are not all equal. Path 1 is the riskiest; path 2 is the cheapest. A team that has path 1 as the most common outcome is a team that has not internalised the discipline. A team that has path 2 as the most common outcome is a team that is using the hook as intended.

---

## What the careful mode is *not*

**It is not the only safety net.** The careful mode is one layer. The other layers are: the operator's thinking, the [`risk-posture`](../risk-posture/SKILL.md) calibration, the [`production-spine`](../production-spine/SKILL.md) maturity label, the [`deploy-verification`](../deploy-verification/SKILL.md) probe, the [`canary`](../canary/SKILL.md) watch. A team that relies on the careful mode alone is a team that has not built the other layers; the careful mode is the *last* line of defence, not the first.

**It is not a substitute for backups.** A `rm -rf` blocked by the hook is a saved mistake; the data is still there. A `rm -rf` that proceeds with operator override is a real loss; the backups are what save the data. The careful mode and the backup discipline are complementary; neither replaces the other.

**It is not adversarial.** The careful mode is a tool the operator uses on themselves. The hook is the operator's own pattern, not a supervisor's. The override is a feature, not a bug; the operator is trusted to know when the warning is wrong. A team that turns the careful mode into a strict block (no override, no path 1) has turned the discipline into a cage; the operator stops using it.

**It is not a substitute for the [`anti-regression`](../anti-regression/SKILL.md) discipline.** Anti-regression is about *preserving* earned work; careful is about *preventing* destructive commands. They are different. A team that uses careful mode but does not have an anti-regression list will preserve the wrong things; a team that has an anti-regression list but does not use careful mode will lose the right things.

---

## The pair

| This skill | Pairs with | Why |
|---|---|---|
| The hook | The host agent's `PreToolUse` mechanism | The hook is the implementation; the mechanism is host-specific. The skill describes the protocol; the host provides the hook. |
| The pattern list | [`risk-posture`](../risk-posture/SKILL.md) | The risk posture is the calibration (how much risk is OK); the pattern list is the operational list (which commands express that risk). |
| The override logs | [`result-honesty`](../result-honesty/SKILL.md) | An override is a `result-honesty` event: the agent reported a risk, the operator accepted, the outcome is logged. |
| The deferred script | [`deploy-pages.sh`](../../templates/deploy-pages.sh) | The deploy script is the canonical example of a destructive operation that has been reviewed, scripted, and is run by name, not typed. |
| The disable | Session-scoped state | The disable is per-session, not per-command, not per-project. The team that has a permanent disable is a team that has not internalised the discipline. |
| The pattern curation | [`lesson-residue`](../lesson-residue/SKILL.md) | A pattern that fires and rewrites is a lesson; the residue is the durable record. The pattern list is the next iteration of the residue. |

---

## The check

```
□ scripts/careful.sh is wired as a PreToolUse:Bash hook
□ .careful/patterns.yaml is committed and curated, not maximal
□ The hook warns, does not block — four override paths, all logged
□ A pattern that fires and rewrites is recorded as a residue
□ A pattern that fires and is overridden 100% of the time is removed
□ The override logs are reviewed monthly, not daily
□ The careful mode is enabled by default in the project's setup
□ A team that disables the careful mode for a session has a reason
```

Pairs with [`risk-posture`](../risk-posture/SKILL.md) (the calibration), [`anti-regression`](../anti-regression/SKILL.md) (the preservation), [`production-spine`](../production-spine/SKILL.md) (the maturity label the careful mode is part of), and [`deploy-verification`](../deploy-verification/SKILL.md) (the existence probe that runs after a careful deploy).
