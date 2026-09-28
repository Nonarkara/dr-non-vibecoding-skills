# The zero-baht stack

Every piece of this toolkit runs on a free tier. "Free tier" is scope
discipline, not a compromise — see
`dr-non-vibecoding-skills/skills/free-api-keys` and `reference/free-apis.md`
for the full catalog this draws from. Quotas are volatile; the rule is
**verify today's terms before building around one**, record `checked_at` in
the city's own data catalog, and never let a paid tier be a silent
requirement for the dashboard to render at all.

## Hosting / build / deploy

| Layer | Choice | Why | Cost |
|---|---|---|---|
| Compute | Cloudflare Workers (`@opennextjs/cloudflare`) | Generous free tier, edge, already the Lopburi reference deploy | $0 |
| Static/CDN | Cloudflare Pages / R2 for simplified geo layers | Range-requested, no tile server to keep alive | $0 |
| Database (optional) | Supabase free tier, or none | Every module must degrade gracefully with `DATABASE_URL` unset — see `packages/core/src/cache.ts` tiers | $0 |
| Cache | In-process TTL map (this repo's `cache.ts`), or Cloudflare KV / Upstash Redis free tier for multi-instance | $0 |
| LLM (RAG/chat, optional) | Groq → Cerebras → OpenRouter fall-through, per `free-api-keys` skill | $0 |

## Data sources (all free, no Thai baht)

| Domain | Source | Auth |
|---|---|---|
| Weather/climate | Open-Meteo (forecast + historical + AQI) | none |
| Air quality | Air4Thai (Thai PCD), OpenAQ | none / free key |
| Flood/water | RID (Royal Irrigation Dept) public gauges, TMD | none |
| Traffic/CCTV | ITIC/Longdo public feeds (`event.longdo.com`, `camera.longdo.com`) | none |
| Basemaps | OSM, ESRI World Imagery, CartoDB, Longdo Map (free key) | none / free key |
| Satellite/EO | NASA GIBS/FIRMS/POWER, Copernicus CDSE STAC, GISTDA disaster API | none / free key |
| Open data | data.go.th (Thailand's CKAN open-data portal) | none |
| Orbital/air traffic | OpenSky, Celestrak | none |
| News/social | GDELT, RSS feeds (Bangkok Post, etc.) | none |

Full catalog with endpoints and probes:
`dr-non-vibecoding-skills/reference/free-apis.md` and
`dr-non-vibecoding-skills/reference/public-datasets.md`.

## The discipline

1. **Never pay for what is free.** Check the free tier before entering a
   card anywhere.
2. **Every module has a floor.** No API key present → the module serves
   `scenario` or `reference` tier, never a broken page.
3. **Cache aggressively, always keep last-good.** An upstream 429/500 is not
   your dashboard's outage.
4. **Rotate on 429, at the caller layer, not the prompt layer.**
5. **Record `checked_at` on every source in the city's data catalog** so a
   free-tier change is a known risk, not a surprise outage.
