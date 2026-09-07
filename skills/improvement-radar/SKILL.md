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

## The procedure — weekly, 30 minutes, automated fetch + human verdict

### 1. Sources (small fixed list — never the whole internet)

| Source | Fetch | Why |
|---|---|---|
| GitHub trending + `cooler333/cool-claude-code` landscape | `gh api` / RSS | Who actually ships; star velocity, not stars |
| Hacker News front + `/ask` | `https://hn.algolia.com/api/v1/search?tags=front_page` | Practitioner pain before it becomes a pack |
| Release notes of the 10 tools you run | RSS (`reference/free-apis.md` pattern) | Upstream drift that breaks adapters |
| The 5 repos you already stole from | `gh release list` | v2/v3 rewrites are the highest-yield reads |

Four sources. A fifth is added only when a month passes with zero verdicts from the current four — the list is load-bearing, not decorative.

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
