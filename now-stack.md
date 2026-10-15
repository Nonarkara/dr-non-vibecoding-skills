# Now stack

Recorded 2026-10-13. This is how the owner's machines, assistants, hosts, memory, and rules fit together.

The standing contract agents already follow is [`agent-instructions/MASTER.md`](agent-instructions/MASTER.md). This page is the map. That file is the rule. [`machine-routing.md`](machine-routing.md) is the decision table. [`stack-gaps.md`](stack-gaps.md) is the list of holes and the catalog tools that fit them. Sources are in [`docs/credits-now-stack.md`](docs/credits-now-stack.md).

Numbers below are either the owner's wording or a file in this repo. A figure from the toolbox is dated. Nothing here was re-checked on the live machines.

## Machines

Two Macs. Each one has a fixed job.

| Machine | What it is | What it is for |
|---|---|---|
| M5 Max MacBook Pro, 128 GB | The main machine. The lid closes. | Dev, heavy builds, tests, video, and any new or larger local model. |
| M3 Air, 256 GB disk | Always on. The local-model skill in this repo records it as 16 GB of memory, which is why it swaps. | Services that have to stay up: FloodDash's backend, Non Writer and Non Meet on local models, OpenClaw and Hermes as backup assistants, Ollama. |

The M3 deploy gate, in the owner's words: swap under 6 GB, and free disk above 25 GB. No heavy builds on the M3. No dev servers, no model downloads, no `npm install` sprees, no `docker`.

Check both before you add any load, including a "quick" command that installs something:

```bash
sysctl vm.swapusage
df -h /System/Volumes/Data
```

[`always-on-services`](skills/always-on-services/SKILL.md) already recorded the failure mode: a disk check of `/` stayed green while the service died, because on macOS the data volume is `/System/Volumes/Data`. Use that path. The standing contract also names `df -h /`. Prefer the data volume. If either check fails the gate, stop. Do not "just this once."

FloodDash's launchd jobs stay up. Do not restart, rebuild, or deploy them unless you state the reason first, curl health before and after, and have a rollback. The label pattern in the contract is `com.flooddash.*`.

Ollama on the M3 is the runtime Non Writer and Non Meet already use. The toolbox entry checked 9 Oct 2026 names `gemma3:4b` for that pair. [`local-ai-fabric`](skills/local-ai-fabric/SKILL.md) names `gemma3n:e4b` as the M3's small model. This page did not run `ollama ps`. Do not treat either string as the live process list. The rule that does not depend on the name: do not pull a new or larger model on the M3. New models go on the M5. Bots and coding agents use a free cloud key first. They do not start a second Ollama on the M3 for themselves.

Ollama's API on port 11434 has no authentication by default (toolbox security note, MIT, checked 9 Oct 2026). Do not publish that port and do not put it on a public tunnel.

A large cold file goes to the 8 TB drive the contract names (`/Volumes/Data`), not the M3's internal disk.

## Assistants

Three kinds of helper. They do not share a write path.

**Grok Bot** is a set of specialist bots. The ones named for this page:

| Bot | Job |
|---|---|
| Git | History, status, what is open, what landed. |
| Play/Crash | Testing: click the thing, see if it falls over. |
| Space | System health: swap, disk, is the always-on machine in trouble. |
| Scrape | Pages that have no API. |
| Voice | Talk to a system by voice. |

There are more specialists than this table. Do not invent a name for one that was not given. A specialist reads and checks. A change to a repository still leaves as a branch and a pull request.

**Otto** briefs from Calendar and GitHub. A briefing is read-only. Otto does not commit, merge, or deploy.

**Cloud coding agents** do the repo writes. They work on a branch, push, and open a pull request. They do not merge. They do not push to `main`. If `git status` shows edits they did not make, those files belong to someone else. Build from the merged tree on `origin/main`.

**OpenClaw and Hermes** are the backup assistants already running on the M3. They are for when the main coding agent is down. They are not a second build machine. The same swap and disk gate applies before they are asked to do anything heavier than a short reply.

## Hosts and bills

Three places code can run once it leaves the laptop. None of them has a hard stop that matches the way people imagine a spending cap.

**Cloudflare Workers and Pages** host the public edge: static frontends, small APIs, cron. Pages stays up when the Mac sleeps. Live data from the M3 can go stale, and that stale state has to be labeled. The account has no hard spending limit. A budget email arrives after usage. It does not turn the meter off. [`cf-runaway-cost`](skills/cf-runaway-cost/SKILL.md) is the guard: loop caps, a kill switch, backoff, no Worker that fetches itself, no Durable Object alarm set to "now". Usage caps and alerts are required on anything that can bill (Workers AI, Queues, cron, alarms, KV, D1, R2). Shipping the default budget mail and calling the account protected is a failed review.

**Google** is free tier only. No card attached. If a console or a command asks for a card, stop. [`google-cloud-run`](skills/google-cloud-run/SKILL.md) is the scale-to-zero path when a job truly needs it, with `min-instances` at 0. Do not raise that to keep a container warm.

**GitHub Actions** has a budget. The standing contract states a hard $10 cap and says to keep workflows cheap: path filters, caches, no matrix sprawl. Billing can block the workflows entirely. A missing check is not a green check. Run the repo's local validator and paste the output. Do not write "CI passed" when the Action did not run.

## Memory

Long-term memory is the Obsidian brain, reached by the filesystem MCP in [`obsidian-mcp-forge`](skills/obsidian-mcp-forge/SKILL.md). Markdown in the vault is the record. The SQLite index is disposable. One machine writes at night. The other reads. Secrets stay out of the vault. A lesson that has no evidence does not get captured.

The same lesson, when it is safe to publish, also goes in `docs/lessons/` in the repo. The private vault is not copied into this tree.

## Choosing a building block

The open-source toolbox is the owner's catalog of tools, services, and reference sites. The copy used for [`stack-gaps.md`](stack-gaps.md) says 135 full entries plus 50 lighter SaaS entries, cards checked through 12 Oct 2026 (ICT). The entries cited there are marked checked 9 Oct 2026 (JST). The catalog is not vendored in this repo. Entries name live repos, and this tree stays free of that list.

How to use it:

1. Name the need in one line.
2. Read the Need Index. Prefer a better status: ADOPTED, then ADOPT, then TRIAL, then LATER, then REFERENCE. SKIP-for-now stays out unless the new work matches that entry's own "use it when" line.
3. Read the full entry: what it is for, what it is not for, where it may run, the security note.
4. Self-hosted tools go on the M5 or a cloud agent, behind localhost or Cloudflare Access, with the default admin login changed. They do not go on the M3.
5. Propose the tool. Ask before installing anything self-hosted, anything that needs an API key, or anything that writes itself into every agent.

ADOPTED means it is already in use. ADOPT means use it now and the setup is planned or under way. A marketing number on a card is not a measurement. Verify the live repo before quoting stars or prices.

## Design

UI uses [Palette](https://github.com/Nonarkara/palette) (MIT). The repo describes itself as a brutalist, multilingual exhibition of Sanzo Wada's colour combinations. In product code the tokens come from Palette (`tokens.css` or the repo's token file). Do not hardcode hex in components. The standing contract's exception is a categorical map swatch in a preset.

Palette is the ban list as well as the palette. No AI design slop: no indigo or violet "AI" gradient, no glass, no glow, no three identical cards, no hero sentence that would fit another product if you swapped the noun, no fake-live ticker. The enforceable form is [`design-dna`](skills/design-dna/SKILL.md), [`no-design-tells`](skills/no-design-tells/SKILL.md), and section 8 of the standing contract. A dark page still needs a real reference for the flow. That gap is in [`stack-gaps.md`](stack-gaps.md).

## Proof of done (Non-Bluff)

"Done" without evidence is not done. Every done carries a receipt a person can re-check:

- a CI run, or the local command and its output when CI did not run;
- a merged commit SHA;
- a live URL, with the check that fetched it;
- a passing test, with the command and the pass count.

If the receipt does not cover the claim, the status is partial. The missing check goes in the unverified bucket of [`result-honesty`](skills/result-honesty/SKILL.md). Localhost is not a deliverable ([`ship-discipline`](skills/ship-discipline/SKILL.md)).

An open pull request, [#13](https://github.com/Nonarkara/dr-non-vibecoding-skills/pull/13), proposes a `non-bluff` skill and a verifier. It is not merged. This page does not add a second copy.

## Git, when more than one agent is in the tree

- Do not `git reset --hard`.
- Do not `git stash`.
- Do not amend a commit you did not author.
- Do not `git checkout --`, `git clean -fd`, rebase someone else's branch, or force-push a shared branch.
- If `git status` shows changes you did not make, leave those files alone and say so.
- Branch from the merged tree on `origin/main`. One topic per pull request.
- Merge waits for the owner. An agent does not merge its own pull request.

[`careful`](skills/careful/SKILL.md) warns on destructive commands in general. The list above is the multi-agent case. Stashing "to be safe" throws away the other person's uncommitted work just as hard as a reset.

Open pull requests [#13](https://github.com/Nonarkara/dr-non-vibecoding-skills/pull/13), [#18](https://github.com/Nonarkara/dr-non-vibecoding-skills/pull/18), and [#19](https://github.com/Nonarkara/dr-non-vibecoding-skills/pull/19) were open while this page was written. New work here is new files, plus short links in files those pull requests do not edit. `CREDITS.md` belongs to #13, which is why the sources for this page live in [`docs/credits-now-stack.md`](docs/credits-now-stack.md).

## Alerts

Page a person only for an outage longer than 10 minutes. A shorter blip stays in the log. The wake list in [`observability-budget`](skills/observability-budget/SKILL.md) is where each service writes its own threshold, the action, and the hour. A single 5xx is already on that skill's ignore list. An alert that names no action gets deleted.

## Credit

Borrowed code, copy, data, images, and design get a name and a link. The table for this page is [`docs/credits-now-stack.md`](docs/credits-now-stack.md). [`NOTICE.md`](NOTICE.md) points at it. Do not paste a licence that does not belong in an MIT tree. AGPL stays out of a public product unless the owner says otherwise.
