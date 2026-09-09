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
