---
name: improvement-radar
description: >-
  Run a weekly watchdog that finds cloneable repos and turns them into steal-map
  verdicts. Use when keeping a stack excellent without doomscrolling or vendoring packs.
license: MIT
---

# Improvement Radar

> Dr Non with you at all times is not a person — it is a weekly job that reads the ecosystem and writes verdicts: Steal, Feedstock, or Refuse.

[`playbooks/11-the-2026-steal-map.md`](../../playbooks/11-the-2026-steal-map.md) is the receipt ledger (three harvests, every verdict with a reason). This skill is the *watchdog that keeps it current*: scrape news about systems you could clone, score them against behaviour change, and file the verdict where the next session will find it — so excellence arrives via results, not via vibes.

Influences: `playbooks/11-the-2026-steal-map.md` (verdict format), [`ux-archaeology`](../ux-archaeology/SKILL.md) (mine patterns, not pixels), [`data-catalog`](../data-catalog/SKILL.md) (catalogue once), [`lesson-residue`](../lesson-residue/SKILL.md) (close the loop), [`obsidian-mcp-forge`](../obsidian-mcp-forge/SKILL.md) (inbox).

---

## The rule

No verdict without a behaviour change. Stars, demos, and threads are signals to *read*, never reasons to *install*. The radar files verdicts; humans (or a monthly review) promote them.

---

## Steal and improve — the practice this skill automates

The weekly procedure below is the schedule. This is the judgment underneath it, kept
close to verbatim because it is the operational core, the same way `staff-swarm`
keeps its founding mental model in the author's own words:

> "When I see interesting GitHub repos, I ask Claude or any agents to study them
> first. When it fits with our stack, I just bring them in. If I can't bring them
> in directly, I bring the ideas of them in — steal the idea and improve the
> codebase based on the languages of the computation that we use. Sometimes I
> just use the same techniques to get things that are in the public domain, like
> cameras and other things that I can grab easily, and put them into the
> projects."

Three branches, one instinct — study first, then decide which of these applies:

| Branch | When | What happens |
|---|---|---|
| **Bring it in directly** | It fits the stack as-is, and the licence permits it | Vendor the dependency or the file. Attribution stays intact; see [`reference/commit-conventions.md`](../../reference/commit-conventions.md). This is routine in **project** repos built with this practice. |
| **Steal the idea, reimplement** | The source is a different language or stack, or the fit is close but not exact | Port the *technique*, not the file. Reimplement in the target project's own language and idioms — a Python rate-limiter's algorithm becomes a Bash one; a React state-machine pattern becomes a Svelte store. The algorithm crosses the boundary; the code does not. |
| **Same technique, applied to data instead of code** | The target isn't a repo at all — a public camera feed, a government open-data portal, a satellite archive | The reconnaissance instinct is identical: find it, read what it actually offers, decide fit, integrate. See [`deep-scraping`](../deep-scraping/SKILL.md) (the technique), [`data-catalog`](../data-catalog/SKILL.md) (record it once), [`free-apis.md`](../../reference/free-apis.md), [`home-cctv-grid`](../home-cctv-grid/SKILL.md), and [`satellite-change-watch`](../satellite-change-watch/SKILL.md) (the instances). |

**This meta-repo is the one place all three branches narrow to one.** A curated
skill collection cannot vendor other people's `SKILL.md` packs wholesale —
[`skill-writing`](../skill-writing/SKILL.md) and
[`playbooks/11-the-2026-steal-map.md`](../../playbooks/11-the-2026-steal-map.md)
hold that line deliberately, and it is the *reimplement* branch every time here.
Do not read that as the general rule. In an actual project — a dashboard, a
control tower, a scraper — "bring it in directly" is the default when it fits,
and reimplementation is the fallback, not the other way around. Confusing the
meta-repo's stricter local rule with the general practice is the single most
likely way an agent misreads this skill.

**Data is available; the insight is in the layering, not the invention.** The
second half of the same instinct, in the author's words:

> "Data is available. It is just that the person understands how to layer
> different datasets that sometimes look like they're not remotely related to
> each other, and then realizes that there are insights that you can see from
> there. That is usually the reason why and how a lot of people came up with
> interesting projects, ideas, and products, rather than just trying to invent
> things from scratch."

That is a distinct skill from this one — studying and porting *technique* is not
the same move as combining *existing public data* for a new reading. See
[`couple-dont-silo`](../couple-dont-silo/SKILL.md).

---

## The procedure — weekly, 30 minutes, automated fetch + human verdict

### 1. Sources (small fixed list — never the whole internet)

| Source | Fetch | Why |
|---|---|---|
| GitHub trending + `cooler333/cool-claude-code` landscape | `gh api` / RSS | Who actually ships; star velocity, not stars |
| Hacker News front + `/ask` | `https://hn.algolia.com/api/v1/search?tags=front_page` | Practitioner pain before it becomes a pack |
| Release notes of the 10 tools you run | RSS (`reference/free-apis.md` pattern) | Upstream drift that breaks adapters |
| The 5 repos you already stole from | `gh release list` | v2/v3 rewrites are the highest-yield reads |

Four sources. A fifth is added only when a month passes with zero verdicts from the current four — the list is load-bearing, not decorative. Open-data discovery (a public camera feed, a government portal) is deliberately **not** a fifth row here — it runs on project need, not a weekly clock, and belongs to the branch table above, not this cadence.

### 2. Score — behaviour change or it is noise

For each candidate, answer in one line each:

1. What does an agent *do differently* after this? (If nothing — Refuse.)
2. Is it a method or a pack? (Packs get mined for one paragraph, never vendored — see [`skill-writing`](../skill-writing/SKILL.md).)
3. Does a current skill already own the trigger? (If yes — extend, file a Feedstock note, no new folder.)
4. What would we delete to keep the count stable? (New folders cost discovery budget — validator enforces `151 × skills`.)

### 3. File the verdict (the artifact)

One file per candidate in the radar inbox — Obsidian `Clones/` if the forge exists, else `docs/radar/`:

```markdown
---
type: radar-verdict
updated: 2026-09-08
repo: owner/name — 12k★, +800/wk
verdict: Steal | Feedstock | Refuse
---

# owner/name — one-line what it is

## Behaviour change
<what an agent does differently, or "none">

## Where it lands
<existing skill + paragraph, or "new skill proposal" with receipt>

## Refused because (if Refuse)
<reason a future agent must not re-litigate>
```

Verdict meanings match the steal map: **Steal** = paragraph or skill with receipt; **Feedstock** = corpus for [`ux-archaeology`](../ux-archaeology/SKILL.md) to mine; **Refuse** = recorded so nobody re-proposes it.

### 4. Monthly promotion (where shepherding happens)

Once a month, 20 minutes: read the inbox newest-first, promote at most **one** Steal into the tree (skill paragraph or new folder with a war-story receipt), move acted-on files to `Knowledge/`, delete Refused-with-reason after logging the reason in the steal map's refusal list. The cap of one is the discipline — the radar that promotes five things a month is a pack vendor with extra steps.

Cost guardrails: `gh api` unauthenticated is 60 req/hr — set `GH_TOKEN` (Keychain, never in the note) or cache to a local JSON; HN Algolia API is free; never scrape HTML when an API/RSS exists.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Daily radar | Weekly is the cadence that survives; daily becomes doomscrolling with a script |
| Auto-install on stars | Stars measure demos; behaviour change measures value — the steal map refused trending-chasing explicitly |
| Verdict without a landing spot | "Interesting" with no skill to extend is a bookmark, not a verdict |
| Promoting >1/month | Discovery budget + review load — excellence via one proven result at a time |
| Silent verdicts | A verdict nobody reads is noise — inbox is read at session start via `list_inbox` |

---

## The test

After one month: 4 weekly inbox files exist, each with a verdict + landing spot, and at most one promotion landed with a receipt. Open the steal map — the new row cites the radar file. That is Dr Non in the loop: watching, scoring, and shepherding toward excellent via result.
