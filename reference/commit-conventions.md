# Commit Conventions

My commit messages read like sentences a colleague would say. That's deliberate, and it pays back more than any other documentation habit I have.

---

## The format

```
<type>(<scope>): <what changed, and why, in plain language>
```

Types: `feat` `fix` `docs` `refactor` `test` `chore` `perf` `ci` `data` `ops` `polish` `harden` `debug` `remove`

The last several aren't standard. They earn their place:

- **`data:`** — a scheduled cache or dataset refresh, no code change. Keeps automated commits visibly separate from human ones. (`data: cron cache refresh 2026-08-11`)
- **`ops:`** — infrastructure: backups, watchdogs, log rotation, launchd.
- **`harden:`** — security tightening that isn't fixing a specific reported bug.
- **`polish:`** — visual refinement with no behaviour change.
- **`debug:`** — temporary instrumentation. Its presence in history is a *reminder to remove it*, and the removal commit follows.

---

## Write the sentence, not the label

Compare:

```
fix: button position
```

against what I actually shipped:

```
fix(ux): dock the locate FAB under the zoom control — it overlapped the
legend at every viewport size and was unclickable behind the legend button
(found by hit-testing every interactive element at 1280/768/375)
```

The second one tells you the symptom, the scope, and **how it was found** — which is the part that makes the technique repeatable. Six months later, that message is the only surviving record of why hit-testing entered my workflow.

More real ones:

```
fix(ops): flood collection dead 36 days, archive growing quadratically

fix(soccer): rehearsal caught both Manchester clubs going missing

fix(podcast): fact guard — the first real episode invented a senator

fix(cycle-rollover): the Q3 fix was correct and left three screens
showing nothing

fix(sheets-snapshot): the debouncer I shipped could starve, overlap, and lie

chore: bump 3.8.13->3.8.14 — custom-domain edge poisoned old bytes under
the 3.8.13 key for emergency.js; fresh key + probe-first verification
```

Each names a **symptom** and a **consequence**. That's what you search for later — you never remember the function name, you remember "the thing that showed nothing after rollover."

---

## Admit what the commit is really doing

Some of my most useful messages are confessions:

```
fix: the Q3 fix was correct and left three screens showing nothing
chore: audit + unify other agents' work, ship as 3.8.8
feat: Research in Progress tab — reviewed, fixed 3 real issues, shipped as 3.8.9
checkpoint before checking out soccer.example.org
chore: checkpoint before quality quarantine (restore point)
```

Two patterns worth stealing:

**Checkpoint commits before risky operations.** Explicitly labelled as restore points. Costs nothing, and it means "try the dangerous thing" is a decision you can make in two seconds.

**"Reviewed, fixed N real issues, shipped as X"** for accepting another agent's work. Not "merged". The honest verb is *reviewed and corrected*. See [multi-agent](../playbooks/04-multi-agent-and-worktrees.md).

---

## Version bumps carry their reason

```
chore: bump to v3.8.20 (cache escape — research.js had new content but
the edge was serving stale bytes; old content 1,450/3,042 still showing,
version bump forces fresh URL)
```

A bare "bump version" commit is noise. A bump *with its reason* is an incident record, and it's how I can reconstruct the [poisoned edge incident](../playbooks/06-war-stories.md#the-poisoned-edge-2026-08-09) precisely.

---

## Docs commits pair with feature commits

```
feat(citizen): v3.8.22 — first-time tutorial overlay + shortcut
docs(CHANGELOG): v3.8.22 — first-time tutorial overlay + shortcut
```

Two commits, same version, same session. The feature ships; the changelog records it. Keeping them separate means `git log -- CHANGELOG.md` is a clean, human-readable release history without any tooling.

---

## Attribution

Turn off automatic "Generated with…" vendor trailers. Not out of pride — because your commit history should read as **decisions you own**. You chose to ship it, you reviewed the diff, you're responsible for it. Marketing trailers add nothing and blur that.

Name the *agent* so the rest of the fleet can see who wrote what, and stop silently overwriting each other:

```
Co-Authored-By: Cursor <cursoragent@cursor.com>
```

or the short form used across this practice: `Agent: cursor` / `Agent: antigravity` / `Agent: glm-2.5`. Never strip another agent's trailer. The brain that reads history cannot see ghosts.

**The address has to be real.** `Co-Authored-By: Antigravity <antigravity@google.com>` looks like attribution and is a fabricated one — nobody owns that mailbox, and git will carry it forever in a history you cannot rewrite once it is pushed. Use the vendor's documented agent address, a `noreply` address you can point at, or the short `Agent:` form above, which claims no mailbox at all. When in doubt, the short form.

### Relay trailers

When more than one agent works a repo in sequence, three extra trailer keys make the chain reconstructable from `git log` alone, with no ledger file present. `scripts/relay.sh handoff` prints them. See [`agent-relay`](../skills/agent-relay/SKILL.md).

```
Relay-Leg: 07
Relay-Agent: claude
Relay-Reviewed: 06 — 2 corrected, 1 confirmed
Relay-Open: cold-start latency claim unmeasured
```

`Relay-Reviewed` is the load-bearing one: it is the record that this leg ruled on the previous leg rather than simply adding to it. A relay commit without it is a second author, not a second reader.

```bash
git log --format='%(trailers:key=Relay-Reviewed,valueonly)' | grep -c .   # legs that actually ruled
```

**All trailers go in one final block, with no blank line between them.** Git's
trailer parser only reads the *last* paragraph of the message. Split the relay
trailers from the `Co-Authored-By` block with a blank line and the relay ones stop
being trailers — they become ordinary body text, and every `%(trailers:key=…)`
query above silently returns nothing. This is easy to get wrong and produces no
error; the check is `git log -1 --format='%(trailers)'` on the commit you just
made.

---

## Why any of this matters

`git log --oneline -50` should be a readable account of what happened to your project. Mine is. That means:

- I can reconstruct any incident without a ticket system.
- An agent reading recent history learns the project's actual concerns, not just its file structure.
- Writing the message forces me to confirm I understand the fix — which has caught more than one "fix" that wasn't.

The commit message is the cheapest documentation you will ever write, and the only kind that's guaranteed to still be there in a year.
