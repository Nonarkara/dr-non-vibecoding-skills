---
name: deep-scraping
description: >-
  Extract data from sites without an API, politely and repeatably, storing raw
  before parsed. Use when a needed feed exists only as a web page.
license: MIT
---

# Deep Scraping

> Store the page, then parse the page. Every scraper that parses in the same step it fetches has to re-fetch the whole site the first time a selector changes — and selectors always change.

[`data-catalog`](../data-catalog/SKILL.md) records an adapter once so it is never rebuilt. [`free-apis`](../../reference/free-apis.md) is the list of sources that already have an API. This skill is for the case both of those hand off: **the data exists, the page renders it, and there is no API.**

Which, for civic and Thai-language sources, is most of them.

---

## The rule

Check for an API first, store raw responses before parsing, and go no faster than a human reading the site. Two of those three are politeness; all three are what makes the scraper still work in six months.

---

## The procedure

### 1. Do not scrape it if you do not have to

In order, stop at the first hit:

1. **A documented API.** Obvious, and skipped constantly.
2. **An undocumented JSON endpoint.** Open the network tab. A page that renders a table is usually calling something that returns that table as JSON. Scraping the rendered HTML when a JSON endpoint exists is choosing the brittle path on purpose.
3. **A bulk download.** Agencies publish CSV and shapefile dumps that nobody links prominently.
4. **The page itself.** Only now.

Step 2 is where most of the wins are, and it converts a fragile DOM scrape into a stable adapter for [`data-catalog`](../data-catalog/SKILL.md).

### 2. Read the rules before the HTML

Check `robots.txt` and the terms of use, and honour them. This is not only ethics: a project that gets its IP range blocked loses the source permanently, and civic work depends on relationships with the agencies publishing the data.

Hard lines regardless of what a site allows: **never scrape behind a login you agreed not to automate, never scrape personal data you have no basis to hold** (see [`data-protection-pdpa`](../data-protection-pdpa/SKILL.md)), and never route around a block. A 403 is an answer.

Identify yourself. A real user-agent with a contact URL turns "some bot hammering us" into "someone we can email", and that email is how you keep the source.

```
User-Agent: axiomx-civic-monitor/1.0 (+https://example.org/about-our-data; contact@example.org)
```

### 3. Fetch and parse in two separate stages

The load-bearing structure of the whole skill:

```
fetch  →  raw/<source>/<YYYY-MM-DD>/<url-hash>.html   (+ status, headers, fetched_at)
parse  →  parsed/<source>/<YYYY-MM-DD>.jsonl          (from raw, never from the network)
```

Because selectors rot. When the site changes its markup — and it will, without notice — you fix the parser and re-run it over raw you already have, in seconds, offline, for free. If fetch and parse are one step, that same change costs a full re-crawl and you have lost every page that has since been deleted.

Raw storage is also the only honest provenance: when a number on your dashboard is disputed, you can produce the page it came from, on the date it said it.

### 4. Go slowly, on purpose

One request at a time, one to three seconds apart, with jitter. Exponential backoff on 429 and 5xx, and a hard stop after a few consecutive failures rather than a retry loop that turns into a denial-of-service you did not intend.

Crawl **incrementally**: keep the `ETag` or `Last-Modified` per URL and send `If-None-Match`. A 304 costs the site almost nothing and costs you almost nothing, which is what makes a daily crawl sustainable instead of rude.

Nightly, off-peak, from one machine. A scraper that finishes in six hours and nobody notices beats one that finishes in four minutes and gets blocked.

### 5. Reach for a browser last

`curl` and an HTML parser handle most pages. A headless browser costs ten to a hundred times the resources and breaks in different ways.

Use one only when the content genuinely requires JavaScript — and check step 1.2 again first, because a JS-rendered table is the strongest possible signal that a JSON endpoint exists. When you do need it, block images, fonts, and media; you want the DOM, not the pixels.

### 6. Parse defensively, and let it fail loudly

Anchor selectors on stable things — `id`, `data-*`, a table header's text — never on generated class names or `nth-child` chains that encode today's layout.

Validate every record before it is stored, per [`production-spine`](../production-spine/SKILL.md)'s boundary rule. Then:

**A scraper that silently returns zero rows is worse than one that crashes.** Assert a plausible row count and fail the run when it drops off a cliff. A parser returning `[]` after a redesign will otherwise quietly empty your dashboard while every health check stays green — which is [`wrong-green`](../wrong-green/SKILL.md), and it is the characteristic way scrapers die.

Alert on it through the one channel from [`observability-budget`](../observability-budget/SKILL.md), and keep serving the last good parse, labelled with its age, per [`honest-envelope`](../honest-envelope/SKILL.md).

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Parsing during the fetch | The first selector change costs a full re-crawl, and deleted pages are gone |
| Headless browser as the default tool | 10–100× the cost, and it usually means you missed the JSON endpoint |
| Parallel workers to "finish faster" | This is how you get blocked, and the block is usually permanent |
| Retrying a 403 with a different user-agent | Routing around a refusal. A 403 is an answer |
| Selectors like `div > div:nth-child(3)` | Encodes today's layout; breaks on any redesign |
| A scraper that returns `[]` without failing | Empties the dashboard while every check stays green |
| Scraping a login-walled source you agreed not to automate | Contractual and legal exposure, for data you can usually ask for |
| No `fetched_at` on stored rows | The number is unciteable and its age is unknowable |

---

## The test

Change one selector to something wrong and re-run the parse stage alone. It should fail loudly, in seconds, without touching the network — and you should be able to fix it and re-derive the full history from raw. If fixing a selector requires re-crawling the site, fetch and parse are still fused.
