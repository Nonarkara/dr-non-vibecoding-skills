# Relay ledger

Append-only. One leg per agent turn. A leg may not open until the previous one
has a verdict. Protocol: `skills/agent-relay/SKILL.md`. Tooling: `scripts/relay.sh`.

**Standing constraints — every leg reads this block before its first edit.**

- Design owner for this chain: Dr Non. No leg changes `axiom-design-core`, `design-dna`, or the token values in `templates/design-tokens.css.template`.
- No invented numbers, benchmarks, statistics, or incidents. Every incident row in `README.md` names something that actually happened; if you cannot cite it, do not add the row. This constraint has already been violated once in this chain — see leg 02's verdict on leg 01.
- Counts (`skills` / `playbooks` / `references` / `templates`) appear on eleven surfaces. `make validate` is the only authority; never hand-edit one surface.
- Co-author trailers use a real address or the short `Agent:` form. See `reference/commit-conventions.md`.
- One leg deploys or pushes, at the end of its own turn. Never two.


## Leg 01 · antigravity-gemini · 2026-09-09T12:29:37Z · CLOSED
- Scope: skills/, README.md, CATALOG.md, AGENTS.md, docs/deck/
- Landed: commit 2af5775 added skills/google-cloud-run and skills/stripe-checkout-billing
- Landed: README.md gained the Thinker to Doer manifesto, two mermaid mental models, and a codebase tour
- Landed: count surfaces reconciled to 71/13/7/12 across README, CATALOG, AGENTS, QUICKSTART, BLUEPRINT, INFOGRAPHICS, deck
- Open: Cloud Run cold-start latency is claimed but unmeasured
- Open: the production spine hosts and charges but does not identify a user or notice its own death
- Closed: 2026-09-09T12:29:37Z

## Leg 02 · claude · 2026-09-09T12:29:37Z · CLOSED
- Scope: skills/, playbooks/, scripts/, templates/, README.md, AGENTS.md, CATALOG.md, reference/commit-conventions.md
- Verdict on leg 01: correct — Cloud Run free-tier figures were swapped against the vendor page and against reference/hosting-matrix.md in this same repo (skills/google-cloud-run/SKILL.md:12)
- Verdict on leg 01: correct — cold-start claim of 'milliseconds' contradicted reference/hosting-matrix.md's own '<2s' (skills/google-cloud-run/SKILL.md:11)
- Verdict on leg 01: reject — invented statistic '99% of vibe-coded projects evaporate within a week' (README.md:31) — CONTRIBUTING.md bans invented benchmark numbers
- Verdict on leg 01: confirm — Stripe raw-body rule is correct and is the real trap; verified against skills/stripe-checkout-billing/SKILL.md:22-35
- Verdict on leg 01: confirm — count reconciliation across 11 surfaces was complete; make validate passed on 71/13/7/12 before this leg changed it
- Landed: skills/agent-relay + playbooks/14-the-relay.md + scripts/relay.sh + templates/RELAY.md.template — the relay protocol, tested end to end
- Landed: skills/auth-entitlement, skills/observability-budget, skills/restore-drill close the spine between hosting and money
- Landed: reference/commit-conventions.md now bans fabricated co-author addresses; commit 2af5775 used antigravity@google.com, which nobody owns
- Open: no restore drill has ever been run against any project in this practice — restore-drill has no receipt behind it yet
- Open: agent-relay ships without a war story of its own beyond this leg; it needs a second chain before it earns the playbook's confidence
- Closed: 2026-09-09T12:29:48Z

## Leg 03 · claude · 2026-09-09T17:15:11Z · CLOSED
- Scope: skills/, playbooks/, HANDSHAKE.md, docs/lessons/
- Note: same agent as leg 02 — self-review, decorrelation lost
- Verdict on leg 02: confirm — relay protocol and tooling behaved as written when re-entered from a cold prompt; scripts/relay.sh status/check both correct (docs/relay/RELAY.md)
- Verdict on leg 02: correct — relay.sh accepted a same-agent consecutive leg with no warning — decorrelation is the skill's load-bearing rule and the tool did not enforce it (scripts/relay.sh cmd_open)
- Landed: HANDSHAKE.md — one paste, no install, works in any agent; the most portable artifact in the repo
- Landed: skills/prompt-like-dr-non + playbooks/15-how-dr-non-prompts.md — nine prompt patterns distilled from the record, with the failure mode of misreading each
- Landed: skills/accessible-by-default, data-protection-pdpa, geospatial-core, deep-scraping — four zero-coverage gaps confirmed by grep (WCAG, PDPA, EPSG, robots.txt all returned 0 hits across 75 skills)
- Landed: scripts/relay.sh now warns on a same-agent consecutive leg; docs/lessons/2026-09-09-the-gap-audit.md carries the ranked unbuilt list
- Open: the city-instance contract (5 control towers, Yala work living inside the NST repo) needs a director decision on where spine ends and instance begins — not an agent's call
- Open: non-scrape and 97 other repos were not opened; deep-scraping was written from doctrine, not from that code, and should be corrected against it
- Open: every virality claim in this leg is reasoning with no receipts — nothing here has gone viral
- Closed: 2026-09-09T17:25:34Z

## Leg 04 · claude · 2026-09-09T17:44:04Z · CLOSED
- Scope: scripts/make-it-mine.sh, FORK.md, setup.sh, Makefile, README.md
- Note: same agent as leg 03 — self-review, decorrelation lost
- Verdict on leg 03: confirm — leg 03's artifacts all validate and the ledger is intact; make test green (docs/relay/RELAY.md)
- Landed: scripts/make-it-mine.sh — three-tier fork tool, dry-run by default; tested on a throwaway copy where the fork validates green (80 skills, 842 links, attribution intact)
- Landed: FORK.md + setup.sh --make-it-mine + make make-it-mine; README carries the fork path next to the install path
- Landed: four bugs found by testing on a copy: the script rewrote itself mid-run (bash re-reads a running script), the tier-3 banner broke YAML frontmatter, slug rewriting broke links to dr-non-named paths, and a blind rename handed the forker Dr Non's biography
- Open: no third party has actually forked this; make-it-mine is verified against a synthetic Jane Doe run, not a real fork
- Closed: 2026-09-09T17:48:58Z

## Leg 05 · claude · 2026-09-09T17:51:28Z · CLOSED
- Scope: merge origin/main, count surfaces
- Note: same agent as leg 04 — self-review, decorrelation lost
- Verdict on leg 04: confirm — leg 04 shipped green: GitHub Actions run 38 job validate succeeded on 9e6bcbe, and FORK.md was read back from the remote at that SHA
- Landed: merged origin/main (a824b49) into the PR branch; 5 conflicts, all count surfaces, resolved to this branch's structure
- Landed: counts recomputed to the true post-merge numbers: 88 skills, 15 playbooks, 7 references, 13 templates; make validate green with 964 local links
- Open: cso (main) and appsec-stack (existing) both own 'audit this codebase for security'; learn (main) overlaps lesson-residue and power-of-hindsight. CATALOG's own rule calls a shared decision a catalog bug — not resolved here, because collapsing another leg's skills is churn
- Closed: 2026-09-09T17:52:29Z

## Leg 06 · claude · 2026-09-09T17:55:18Z · CLOSED
- Scope: scripts/make-it-mine.sh input escaping
- Note: same agent as leg 05 — self-review, decorrelation lost
- Verdict on leg 05: correct — make-it-mine.sh passed user input straight into sed: a '|' in --name/--practice/--repo hit the delimiter and aborted the run, and '&' is a replacement metacharacter that expands to the whole match (scripts/make-it-mine.sh apply_subs)
- Landed: scripts/make-it-mine.sh escapes sed metacharacters in every user-supplied value; verified with --practice 'A|B Studio' and --name 'Ben & Jerry', both forks validate green at 88 skills
- Landed: make-it-mine re-tested against the merged 88-skill tree: file count unchanged 185→185, all 8 of main's new skills intact with valid frontmatter, attribution intact
- Open: origin/main is still at a824b49 (79 skills, 13 playbooks); the 89-skill Founder Tier reported by the next agent is unpushed local work, so the count conflict it warns about does not exist on the remote yet
- Closed: 2026-09-09T17:55:43Z

## Leg 07 · claude · 2026-09-16T10:10:35Z · CLOSED
- Scope: CI-red fixes; skills/route-dont-scan; playbooks/11
- Note: same agent as leg 06 — self-review, decorrelation lost
- Verdict on leg 06: confirm — leg 06's escaping fix survives byte-identical on current main (diff 79ab932:make-it-mine.sh vs origin/main:make-it-mine.sh is empty); re-tested against the 167-skill tree with --name 'A|B Studio & Co' and a double --apply run, both clean
- Landed: no relay leg was opened for any of the ~79 skills added on main between leg 06 and today (a824b49..8f44699) — the protocol lapsed for a week of direct pushes; not something this leg corrects, only records
- Landed: main's CI was red at HEAD (8f44699, run 86): 6 skill descriptions over the 180-char budget and stale count surfaces (160 vs true 167). Fixed mechanically as a prerequisite before adding anything.
- Open: cso vs appsec-stack and learn vs lesson-residue/power-of-hindsight are still both present and unresolved — CATALOG.md's own rule calls a shared trigger a catalog bug. Not resolved here: collapsing another author's skills is churn, per this skill's own anti-pattern table.
- Landed: scripts/repo-map.sh — zero-dependency structural map (directory tree, god-files by cross-reference count, grep-pattern symbol index). Tested against this actual repo: 10s, 850 files, 167K output. Two real bugs found and fixed while dogfooding: pipefail+head SIGPIPE aborted the whole script silently, and the god-files basename match degenerated to nonsense on a repo where every skill file is literally named SKILL.md (fixed twice — dirname/basename still collided against a 35-skill books pipeline sharing chapters/ch01.md; full relative path is the actual fix)
- Landed: skills/route-dont-scan/SKILL.md extended with 'Build the map once' — cites graphify's own worked-example numbers (71.5x/5.4x/~1x by corpus, not the marketing-average 71x), refuses it as a default dependency per this repo's zero-runtime-dependency ethos, names it as an optional CLI upgrade for real call-graph work
- Landed: playbooks/11-the-2026-steal-map.md gained a Sixth Harvest entry for graphify, and a pre-existing mojibake typo (dual-write硬化) was fixed in passing
- Open: repo-map.sh's symbol extraction is grep-pattern only, untested against a real non-markdown codebase in this session (this repo is almost entirely .md/.sh) — the .ts/.py/.go patterns are written but not dogfooded against a populated code repo
- Closed: 2026-09-16T10:16:59Z

## Leg 08 · claude · 2026-09-16T10:26:06Z · CLOSED
- Scope: skills/improvement-radar, skills/couple-dont-silo, skills/godmode-cook-and-couple, catalog overlap audit
- Note: same agent as leg 07 — self-review, decorrelation lost
- Verdict on leg 07: confirm — leg 07's repo-map.sh, route-dont-scan extension, and CI-red fixes all still hold — dogfooded again today via make test / ./setup.sh --audit, all green, no regressions from today's edits
- Landed: skills/couple-dont-silo — new skill, the data-layering-for-insight principle generalized from godmode-cook-and-couple, grounded in the author's own verbatim words
- Landed: skills/improvement-radar extended with the 'steal and improve' doctrine in the author's own words (three branches: vendor directly, port the idea cross-language, or apply the same discovery instinct to open data)
- Landed: retracted leg 05's two overlap flags (cso/appsec-stack, learn/lesson-residue+power-of-hindsight) after reading all five skills in full — both pairs are legitimately differentiated, each with an explicit 'what this is not' section already anticipating the confusion. Nothing merged; the flag was wrong.
- Landed: checked public-api-integration against data-catalog/deep-scraping on suspicion of a third overlap — also a false alarm, genuinely different scope (decision ladder + SWR fetch pattern + endpoint table vs. cataloguing discipline vs. no-API scraping)
- Open: 44 skills from a books-to-skill pipeline have mixed quality: some well-shaped, some with auto-generated ID suffixes in the folder name (e.g. -1e5bhwu, -lhoitu) and content that reads as a knowledge summary rather than an operational trigger. Not touched — over a quarter of the collection, the author's own deliberate pipeline, disposition is the author's call
- Closed: 2026-09-16T10:26:18Z

## Leg 09 · claude · 2026-09-16T10:37:37Z · CLOSED
- Scope: library-of-human-wisdom discovery wiring
- Note: same agent as leg 08 — self-review, decorrelation lost
- Verdict on leg 08: confirm — leg 08's additions (couple-dont-silo, improvement-radar extension, retractions) all validate and are unchanged
- Landed: verified library-of-human-wisdom router against its own claims: 44/44 book folders referentially match reference/library/README.md's index (zero orphans, zero phantom entries), all 6 claimed hero illustrations exist on disk, chapters/ are local (no fragile live-URL dependency for core content)
- Landed: the real gap was discovery, not content: zero of the 7 skills that most naturally fire before a human-judgment moment (design-thinking-vibecoding, dr-non-golden-rules, cognition-first, ninja-innovation, director-not-typer, axiom-design-core, no-ai-tells) cross-linked to the router — it was only reachable via CATALOG/AGENTS/README browsing. Added one precise cross-link to each, at the exact decision point, not a restructure
- Open: the streak converged at leg 08 per the tool's own stop rule; this leg continued anyway because it was new directed work (an explicit integration request), not another audit pass. Worth noting so the next agent doesn't read 'streak: 2' as permission to keep auditing indefinitely
- Closed: 2026-09-16T10:37:37Z

## Leg 10 · claude · 2026-09-16T11:33:09Z · CLOSED
- Scope: book-pipeline skill renames
- Note: same agent as leg 09 — self-review, decorrelation lost
- Verdict on leg 09: confirm — leg 09's cross-links (all 7) still validate and hold through this leg's edits
- Landed: renamed 37 book-pipeline skills to strip leaked auto-generated ID suffixes (e.g. self-managed-project-mastery-100-days-of-writing-1e5bhwu -> self-managed-project-mastery-100-days-of-writing). No collisions among the 37, all under the 64-char limit.
- Landed: found and fixed a real duplicate the rename surfaced: design-by-writing-100-day-reflection-engine already existed as a clean, deliberately-curated skill (183 lines, explicit provenance note about what was stripped from the raw pipeline output); a raw, unrefined -ziojx2 duplicate (257 lines, auto-generated-metadata style) collided on rename. Kept the curated version, removed the raw duplicate. This is the one case my initial collision check missed — it only checked the 37 renamed slugs against each other, not against the other 131 pre-existing skills.
- Landed: verified end to end: make test green at 167 skills (168 minus the removed duplicate), zero broken links, zero name/folder mismatches, bootstrap dry-run confirms 167
- Open: 9 of the 37 renamed skills had frontmatter already saying the clean name while their folder still carried the suffix, predating this session -- root cause not chased down, but the fix (folder now matches frontmatter) resolves it regardless of how it got there
- Closed: 2026-09-16T11:33:09Z

## Leg 11 · claude · 2026-09-19T16:37:34Z · CLOSED
- Scope: playbooks/11, skills/agent-relay, external-tools recommendation
- Note: same agent as leg 10 — self-review, decorrelation lost
- Verdict on leg 10: confirm — leg 10's book-skill renames still hold; make test green
- Landed: studied chaseai-yt/claudex-loop in full (README, SKILL.md, 420-line runner.py, runtime.md, VALIDATION.md, 23 tests) — real, MIT, tested, rigorous: SHA256 plan/diff hash-binding invalidates stale approvals automatically; reviewer leg is tool-permission sandboxed (Claude: Read/Glob/Grep only, empty MCP config; Codex: read-only sandbox_mode), not just instructed to read cold
- Landed: playbooks/11 Seventh Harvest entry: recommend the tool directly for project work (one plugin-install line, solves the user's stated manual-copy-paste workflow today) rather than vendoring it into this zero-dependency meta-repo (needs two full CLI accounts — a real runtime dependency this repo doesn't carry, and it's someone else's actively-developed tool)
- Landed: ported the two ideas that are genuinely superior to agent-relay's honor-system discipline: hash-bound verdicts (a Relay-Reviewed trailer citing a diff a leg never re-read is now a named anti-pattern) and tool-sandboxing recommendation for the cold-read leg where the harness supports it
- Landed: scripts/relay.sh check now warns (not hard-fails) on any verdict citing a commit hash that is no longer an ancestor of HEAD — tested against a real diverged branch (warns correctly) and a real ancestor (silent, correctly)
- Open: the hash-staleness check is a warning, not a gate — deliberately, since retrofitting hash citation onto ~40 existing verdict lines in this repo's own ledger was out of scope for this leg and would be pure churn against already-closed legs
- Closed: 2026-09-19T16:39:20Z
