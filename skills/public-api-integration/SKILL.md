---
name: public-api-integration
description: Select, probe, proxy, and integrate free public APIs and open datasets for zero-friction dashboards. Use when building client-side apps without backend or API costs.
license: MIT
---

# Public API & Open Dataset Integration

This skill guides agents and builders in selecting, vetting, probing, and integrating zero-friction public APIs and open datasets. It enables building live, data-dense client applications and dashboards without backend servers or SaaS subscriptions.

Quota labels in [`reference/free-apis.md`](../../reference/free-apis.md) are snapshots. Before implementation, record the first-party docs URL, license/terms, observed CORS headers, rate-limit headers, and `checked_at`. “No key” is authentication posture, not an uptime promise.

---

## 1. The Decision Ladder for External Data

Before adding an external data source or asking for API credentials, climb this ladder:

```
1. Is there a first-party public endpoint (e.g. USGS or World Bank)?
   └─ YES → Verify actual auth, terms, attribution and limits; public is not unrestricted.
2. Is the data static or slowly changing (< 1 update per month)?
   └─ YES → Download flat Parquet, GeoJSON, or CSV into assets/data/. No live network dep.
3. Does the actual GET allow the intended browser origin under CORS?
   └─ NO → Prefer an allowed static snapshot; otherwise design a bounded fixed-upstream proxy.
4. Does the API require an authenticated key with billing liability?
   └─ YES → Terminate key server-side or edge worker. NEVER embed in client HTML/JS.
```

---

## 2. Pre-Flight Verification Probes

Never write application fetch code before proving the endpoint in terminal. Verify status, latency, CORS, and response shape:

```bash
# 1. Probe Status, Latency, and CORS Header
curl -fsS --max-time 10 -D - -o /dev/null -H 'Origin: https://your-app.example' \
  'https://api.frankfurter.app/latest?from=USD&to=EUR'

# 2. Inspect Payload Shape
curl -fsS --max-time 10 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=5.0&limit=1' | jq '.features[0].properties'
```

An explicit matching origin can work; wildcard is not required and cannot authorize
credentialed requests. Confirm the real browser flow, including preflight where
needed; HEAD alone is not proof. See [CORS guidance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS).
A proxy needs a fixed upstream allowlist, validated parameters, time/byte bounds,
cache/rate limits and no credential forwarding. Never accept arbitrary target URLs
or bypass a provider ban; use [cloudflare-security](../cloudflare-security/SKILL.md).

---

## 3. The Resilient Client-Side Fetch Pattern (TTL + bounded stale fallback)

Free public APIs can experience transient throttling (HTTP 429) or maintenance downtime. Never let an API error crash the interface.

Copy the shipped [fetch helper](assets/fetch-with-fallback.mjs) into your project.
It requires a payload validator, bounds time/response size/stale age, protects
optional storage and returns explicit unavailable/error metadata. It is **not**
SWR or a circuit breaker: fresh cache returns without revalidation. Cache only
public non-sensitive JSON. Fetch age is not provider observation age; preserve
provider dates and apply a separate domain freshness policy.

```javascript
import {fetchWithFallback} from './fetch-with-fallback.mjs';
const result = await fetchWithFallback('fx-v1',
  'https://api.frankfurter.app/latest?from=USD&to=EUR', {
    validate: d => d?.base === 'USD' && d?.amount === 1
      && Number.isFinite(d?.rates?.EUR) && d.rates.EUR > 0
      && typeof d.date === 'string',
  });
// Render result.source, result.fetchedAt and the provider observation date.
// result.data === null is unavailable, never an invented zero reading.
```

---

## 4. Curated Canonical Zero-Auth Endpoints

| Domain | Provider | Endpoint Pattern |
|---|---|---|
| **Weather & Forecast** | Open-Meteo | `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true` |
| **Seismic & Natural Disasters** | USGS Earthquakes | `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude={mag}` |
| **Currency & FX** | Frankfurter (ECB) | `https://api.frankfurter.app/latest?from={base}&to={targets}` |
| **Global Indicators** | World Bank | `https://api.worldbank.org/v2/country/{country}/indicator/{id}?format=json&mrv=5` |
| **Geocoding & Places** | Local fixture or deliberately chosen provider | No generic public Nominatim default; see policy below |
| **Open Knowledge** | Wikimedia REST | `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/today` |
| **Tech Trends** | Hacker News Algolia | `https://hn.algolia.com/api/v1/search?tags=front_page` |

See [`reference/free-apis.md`](../../reference/free-apis.md) and [`reference/public-datasets.md`](../../reference/public-datasets.md) for full catalogues and signup-free sources.

Checked 2026-10-24: [OSMF policy](https://operations.osmfoundation.org/policies/nominatim/)
restricts generic geocoding integrations by vibe-coding platforms. Do not generate
one automatically. Deliberate developer choice must account for application-wide
limits, attribution, caching, switchability and no autocomplete. Start with a
local places fixture. [Open-Meteo's free service](https://open-meteo.com/en/terms)
is non-commercial, rate-limited and requires attribution, not unrestricted access.

---

## 5. Security & Secret Hygiene

- **Rule 1: Zero Private Secrets in Frontend**:
  Never put a paid OpenAI, Anthropic, or Stripe secret key into client HTML or JS files. If an API key is required, only include keys scoped to read-only public data without billing liability (e.g. Mapbox public token).
- **Rule 2: User-Agent Courtesy**:
  Follow provider identification rules. Set descriptive User-Agent server-side;
  browser code cannot set every restricted header. Never put private locations,
  credentials or personal identifiers in provider queries or public logs.
- **Rule 3: Honest Status Display**:
  Display an honest status badge on every live widget (`LIVE`, `STALE`, or `OFFLINE`) with timestamp of the last successful data fetch. Never present cached or dummy data as real-time without an indicator.

## Executable proof

`node scripts/test-public-fetch.mjs` exercises corrupt/blocked/quota-limited storage,
malformed cache timestamps, expired data, payload schemas, HTTP 429, timeout and
response size without contacting a provider. Installation retains the helper.
The previous inline helper's corrupt-cache and blocked-storage failures were
reproduced on 2026-10-19; a timestamp-coercion flaw was found by independent review.
The recovered implementation was retested on 2026-10-24. Live provider health,
browser CORS and domain-specific freshness remain separate checks.
