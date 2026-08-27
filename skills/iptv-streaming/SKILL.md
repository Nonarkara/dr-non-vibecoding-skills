---
name: iptv-streaming
description: Aggregating real broadcast channels into one player — the four-source registry pattern (direct CDN, public catalog, tokenized third-party mirror, official-link-only) and the server-side HLS proxy that solves CORS/token-gating without faking a stream. Use when building a channel aggregator, or wiring any third-party HLS source that gates on session tokens or origin checks.
license: MIT
---

# IPTV Streaming

The real, working core of the NSP (National Streaming Platform) prototype — a policy-grounded aggregator for ~21 Thai digital-TV channels, live at `nsp2.nonarkara.org`. The reusable part isn't the Thailand-specific channel list; it's the sourcing-honesty pattern and the manifest-proxy technique.

## The four-source registry — never fake a channel that has no stream

Every channel entry declares which of four source types it actually is, and the UI behaves differently for each:

| Source type | What it means | UI behavior |
|---|---|---|
| `DIRECT` | Broadcaster's own CDN, first-party | Play directly |
| `IPTV_ORG` | Public catalog (the open-source IPTV-org project) | Play directly, credit the catalog |
| `ADINTREND` (or any tokenized mirror) | Third-party mirror, session-token gated | Play through the manifest proxy (below) |
| `OFFICIAL_ONLY` | No public stream exists yet | **No player.** A CTA linking out to the broadcaster's own site. |

That fourth row is the load-bearing one: a channel with no real source gets an honest outbound link, never a fake or broken player. This is `honest-envelope`'s conservation law applied to a media catalog — every channel is a real stream, a real link-out, or absent; never a confident placeholder.

## The manifest-proxy pattern — for any token-gated third-party HLS source

A real, working CORS/token workaround, not a hack that happens to work today. When an upstream `.m3u8` is gated by a session token and an origin/iframe check the browser can't satisfy directly:

1. **Server-side manifest fetch.** The backend requests the upstream `.m3u8`, not the browser.
2. **Rewrite every segment URI** in the manifest to point at your own `/segment` proxy route, so the browser only ever talks to your origin.
3. **Manage the session token server-side** — an IP-bound cookie with a short TTL (the reference implementation uses ~6 minutes), refreshed transparently. The browser never sees the upstream's token or triggers its `top.location` iframe-bounce check, because the browser never talks to the upstream at all.

```
Browser → your /manifest route → [server fetches real .m3u8, rewrites segment URIs,
                                    manages session cookie] → rewritten manifest
Browser → your /segment route  → [server proxies the actual video chunk] → video data
```
This generalizes beyond broadcast TV: any third-party HLS source with token-gating, referrer checks, or short-lived signed URLs is a candidate for the same proxy shape — the browser talks only to your server, your server holds the session state.

## What this is not

Not a scraper, not a stream ripper — every `DIRECT` and `IPTV_ORG` source is a broadcaster's own public CDN or an established open catalog, and the manifest proxy exists to solve a technical CORS problem for one gated mirror, not to bypass paywalls generally. The `OFFICIAL_ONLY` category exists specifically so the registry never has to pretend a paywalled or unavailable channel is playable.

## Where it lives

`consulting/nsp2/lib/channels.ts` (the registry) and `consulting/nsp2/app/broadcaster/adintrend/stream/route.ts` (the manifest proxy) are the reference implementation. `consulting/nsp-prototype` is an earlier skin sharing the same EPG/analytics/Emergency-Warning-System backend — check both share one Prisma schema before assuming they're fully independent.
