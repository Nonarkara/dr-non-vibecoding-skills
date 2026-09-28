---
name: geo-citability
description: >-
  Check whether AI crawlers can reach and cite a page, then fix what blocks
  them. Use when a site ranks in Google but must also be citable by
  ChatGPT, Perplexity, or AI Overviews.
license: MIT
---

# GEO Citability

> Ranking and citability are two different questions. A page a search engine
> indexes perfectly can still be invisible to an answer engine that never
> executes its JavaScript and only ever sees one shot at the raw HTML.

[`reference/seo-geo-connectors.md`](../../reference/seo-geo-connectors.md) is
where the outside research on this topic was read and refused as a vendor
target — every GEO audit tool studied ships as a skill pack, and this repo
never installs a competitor's pack. This skill is the port: the checklist
shape, without the borrowed percentages.

---

## The rule

Before calling a page "AI-search-ready," actually fetch it the way an AI
crawler does — no browser, no JS execution — and read what comes back. A
claim based on how the page looks in a browser is not this skill; it's a
guess wearing this skill's name.

---

## The procedure

### 1. Crawlability — can the bot even get in

Most AI crawlers identify themselves by user agent and fetch once, without
executing JavaScript. Check what they actually receive:

```bash
curl -sA "GPTBot" "$URL" | head -c 2000
curl -sA "ClaudeBot" "$URL" | head -c 2000
curl -sA "PerplexityBot" "$URL" | head -c 2000
curl -s "$URL/robots.txt"
```

If the `curl` output is an empty shell (`<div id="root"></div>`) while the
browser shows full content, the page is client-rendered and invisible to
these crawlers regardless of Google ranking. Check `robots.txt` for an
explicit `Disallow` on any of these agents — a CDN or WAF default-deny rule
blocks AI crawlers by accident more often than on purpose.

### 2. Structured data — verify the output, not the library

A framework claiming to emit JSON-LD is not the same as JSON-LD reaching the
crawler. Pull the actual response (step 1's `curl`, not dev-tools-with-JS)
and check for `<script type="application/ld+json">` with the schema.org
types that fit the page (`Article`, `FAQPage`, `Organization`, `Product`).
Validate the JSON itself — a syntax error in JSON-LD is silently ignored by
every consumer, so a page can "have" structured data that nothing reads.

### 3. Quotable content — can an answer engine lift a fact cleanly

Answer engines quote short, self-contained, attributable claims — the
inverted-pyramid discipline journalism already uses. Check the page opens
with a direct-answer paragraph near the top (not buried after three
scroll-lengths of scene-setting), states facts as facts with a source, and
carries a byline and a date. This is the same discipline
[`no-ai-tells`](../no-ai-tells/SKILL.md) already asks for in prose — a page
so hedged and vague that a human skims past it is equally useless to a
model deciding what to cite.

### 4. Cite real numbers, or none

If the page (or this skill's own advice) claims a citation-rate lift from a
change — schema markup, faster load, whatever — that number came from
somewhere. Read the primary source before repeating it. This repo already
reverted one invented statistic; don't let a borrowed, unverified percentage
from an external tool's README become this repo's next one. State the
mechanism ("crawlable, so eligible to be read at all") over an unverified
number ("X% more citations").

### 5. Report a checklist, not a fabricated score

A single 0–100 number implies false precision unless every input to it is
itself a verified pass/fail. Report per-check results — crawlable: yes/no,
structured data: valid/invalid/absent, quotable lead: yes/no — the same
discipline [`dashboard-discipline`](../dashboard-discipline/SKILL.md) and
[`honest-envelope`](../honest-envelope/SKILL.md) already require: a number
on a dashboard needs an observable definition, or it doesn't ship.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Treating GEO as "the same checklist as SEO" | A search engine executes JS and indexes links; most AI crawlers fetch once, no JS — a page ranking #1 in Google can be a blank shell to an answer engine |
| Trusting dev-tools' rendered DOM as what the crawler sees | Dev tools show the post-JS page; `curl` with a bot user agent shows the actual bytes a non-JS crawler gets — check both |
| Repeating an external tool's citation-lift percentage as this repo's fact | Verify the primary source or state the mechanism instead — see rule 4 |
| Installing a GEO audit CLI/MCP pack from the reference catalog | Every one of them is a competing skill pack; port the rubric shape, refuse the install, per this repo's standing rule |
| A fabricated 0–100 citability score | Report the checklist that produced it, per [`dashboard-discipline`](../dashboard-discipline/SKILL.md) — a score with no visible inputs is decoration |
| Assuming Search Console data already covers this | GSC reports Google Search behaviour only — see [`reference/seo-geo-connectors.md`](../../reference/seo-geo-connectors.md) for where that data does and doesn't reach |

---

## The test

Given a URL, produce: the raw bytes a non-JS bot user agent actually
receives, whether `robots.txt` blocks any major AI crawler, whether valid
JSON-LD is present in that raw response, and one ranked fix — with no
percentage claimed that wasn't independently checked. If every finding
traces back to a `curl` command someone could re-run, the loop closed; if
any of it came from reasoning about how the page "should" render, it didn't.
