---
name: public-api-integration
description: Select, probe, proxy, and integrate free public APIs and open datasets for zero-friction dashboards. Use when building client-side apps without backend or API costs.
license: MIT
---

# Public API & Open Dataset Integration

This skill guides agents and builders in selecting, vetting, probing, and integrating zero-friction public APIs and open datasets. It enables building live, data-dense client applications and dashboards without backend servers or SaaS subscriptions.

---

## 1. The Decision Ladder for External Data

Before adding an external data source or asking for API credentials, climb this ladder:

```
1. Is the data published by a public institution (USGS, World Bank, Open-Meteo, ECB)?
   └─ YES → Use zero-auth HTTPS REST endpoint directly. No API key needed.
2. Is the data static or slowly changing (< 1 update per month)?
   └─ YES → Download flat Parquet, GeoJSON, or CSV into assets/data/. No live network dep.
3. Does the API lack CORS headers (`Access-Control-Allow-Origin: *`)?
   └─ YES → Deploy a 5-line Cloudflare Worker proxy or cache edge.
4. Does the API require an authenticated key with billing liability?
   └─ YES → Terminate key server-side or edge worker. NEVER embed in client HTML/JS.
```

---

## 2. Pre-Flight Verification Probes

Never write application fetch code before proving the endpoint in terminal. Verify status, latency, CORS, and response shape:

```bash
# 1. Probe Status, Latency, and CORS Header
curl -s -I "https://api.frankfurter.app/latest?from=USD&to=EUR" | grep -E -i "HTTP/|access-control-allow-origin"

# 2. Inspect Payload Shape
curl -s "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=5.0" | jq '.features[0].properties'
```

If `access-control-allow-origin` is missing or not `*`, a browser running client-side JavaScript will block the request. Use an edge proxy (Cloudflare Worker) or a local dev proxy.

---

## 3. The Resilient Client-Side Fetch Pattern (SWR + Circuit Breaker)

Free public APIs can experience transient throttling (HTTP 429) or maintenance downtime. Never let an API error crash the interface.

Implement Stale-While-Revalidate with `localStorage`:

```javascript
async function fetchWithFallback(cacheKey, url, ttlMs = 300000) {
  const cached = localStorage.getItem(cacheKey);
  const now = Date.now();

  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      // Return cached immediately if fresh
      if (now - parsed.timestamp < ttlMs) {
        return { data: parsed.data, source: 'cache', isFresh: true };
      }
    } catch (e) {
      localStorage.removeItem(cacheKey);
    }
  }

  // Attempt live network fetch
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: now }));
    return { data, source: 'network', isFresh: true };
  } catch (err) {
    // Graceful degradation: serve stale cache if available
    if (cached) {
      const parsed = JSON.parse(cached);
      return { data: parsed.data, source: 'stale-cache', error: err.message, isFresh: false };
    }
    throw err;
  }
}
```

---

## 4. Curated Canonical Zero-Auth Endpoints

| Domain | Provider | Endpoint Pattern |
|---|---|---|
| **Weather & Forecast** | Open-Meteo | `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true` |
| **Seismic & Natural Disasters** | USGS Earthquakes | `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude={mag}` |
| **Currency & FX** | Frankfurter (ECB) | `https://api.frankfurter.app/latest?from={base}&to={targets}` |
| **Global Indicators** | World Bank | `https://api.worldbank.org/v2/country/{country}/indicator/{id}?format=json&mrv=5` |
| **Geocoding & Places** | Nominatim (OSM) | `https://nominatim.openstreetmap.org/search?q={query}&format=json` |
| **Open Knowledge** | Wikimedia REST | `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/today` |
| **Tech Trends** | Hacker News Algolia | `https://hn.algolia.com/api/v1/search?tags=front_page` |

See [`reference/free-apis.md`](../../reference/free-apis.md) and [`reference/public-datasets.md`](../../reference/public-datasets.md) for full catalogues and signup-free sources.

---

## 5. Security & Secret Hygiene

- **Rule 1: Zero Private Secrets in Frontend**:
  Never put a paid OpenAI, Anthropic, or Stripe secret key into client HTML or JS files. If an API key is required, only include keys scoped to read-only public data without billing liability (e.g. Mapbox public token).
- **Rule 2: User-Agent Courtesy**:
  When querying academic and civic APIs (Nominatim, OpenAlex, Wikimedia), include a descriptive `User-Agent` identifying your app or contact email.
- **Rule 3: Honest Status Display**:
  Display an honest status badge on every live widget (`LIVE`, `STALE`, or `OFFLINE`) with timestamp of the last successful data fetch. Never present cached or dummy data as real-time without an indicator.
