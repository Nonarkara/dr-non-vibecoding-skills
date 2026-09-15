---
name: godmode-social-listening
description: Scrape, tag, and display public mentions of a Thai city — news + RSS + GDELT, never authenticated social-platform scraping. Use when building a social-listening box for a city dashboard.
license: MIT
---

# Godmode Social Listening

## What "scrape" means here, precisely

Public RSS feeds and GDELT's Doc API — not authenticated scraping of a
social platform. Two reasons: platform terms of service generally prohibit
it, and GDELT's news index already covers a large share of what a keyword
box would otherwise need platform-specific scraping to reach — see
`dr-non-vibecoding-skills/reference/free-apis.md`'s News & Media and
Conflict & Geopolitics sections.

## The mechanism

`../../thailand-godmode/packages/connectors/social-listening/scraper.ts`:

- `searchGdeltForKeyword(keyword)` — one call per keyword (transliteration
  variance means a single clever query misses spellings; run each keyword
  in the city config's `socialListening.keywords[]` separately and de-dupe
  by URL).
- `fetchSocialListening(keywords)` — runs the whole list, de-duped, newest
  first.
- `parseRssItems(xml, source)` — a minimal, dependency-free RSS 2.0 parser
  for the local/regional feeds a city config adds beyond the national
  defaults (`socialListening.rssFeeds[]`).

## The honesty rule

Every mention is labelled with its **real source domain** and **published
timestamp** — never presented as generic "social sentiment" when it's
actually a specific news wire's article. `toneToSentiment()` buckets
GDELT's own tone score into positive/neutral/negative/unknown; this is
GDELT's tone metric surfaced transparently, not a trained classifier's
output presented as ground truth. Say which it is if a UI ever needs to
explain the sentiment badge.

## Failure handling

One keyword's request failing must not break the whole box — the connector
already returns `[]` for that keyword rather than throwing. Keep that
pattern if you extend it; a social-listening box that goes blank because
one query timed out is worse than one that quietly shows fewer results.

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Authenticated scraping of a social platform | Terms-of-service risk, and GDELT already covers most of the same ground for free |
| One "clever" GDELT query with OR'd keywords | Transliteration variance — run each keyword separately, de-dupe by URL |
| Presenting GDELT tone as "AI sentiment analysis" | It's a documented tone metric, not a trained classifier — say so |
| Letting a dead RSS feed 404 silently drop from the box with no signal | Log it, keep the last-good items with an age, same discipline as any other cached source |
