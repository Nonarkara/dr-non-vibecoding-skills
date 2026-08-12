# Stack Decisions

What I actually reach for, and the honest reason. Not a survey — a set of defaults that have survived six months of daily contact with production.

---

## The decision tree

| Need | Choice | Why this one |
|---|---|---|
| Web app with API routes, SSR, dynamic data | **Next.js** + TypeScript + Tailwind | Ubiquitous, deploys everywhere, agents know it cold |
| Static site, fast build | **Vite** + React + TS | No framework tax when you don't need SSR |
| Something that must be *instantly* debuggable | **Plain Node + Express, zero build** | No build step means no build-step failure mode. Underrated. |
| Database (default) | **Postgres** (Supabase or self-hosted) | Boring, correct, well-understood by every agent |
| Database (embedded / high-write) | **SQLite** (WAL mode) | One file, no server, comfortable past 1 GB |
| Public URL without a VPS | **Cloudflare Tunnel** | No open ports, no static IP, free TLS |
| Static hosting | **Cloudflare Pages** | Free, global, decoupled from your machine being awake |
| Process supervision (macOS) | **launchd** | Native, survives reboot, restarts on crash |
| Maps | **Leaflet** (simple) / **Deck.gl + MapLibre** (heavy) | Leaflet first — most map requirements are simpler than they look |
| Package manager (Node) | **pnpm** | Content-addressable store saves GBs across 20 projects |
| Local LLM fallback | **Ollama** | Not frontier quality; an outage or a plane doesn't stop the day |

---

## The principle underneath

**Boring, decoupled, and locally debuggable beats clever and integrated.**

Every choice above optimises for the same thing: when it breaks at 2am, can I understand it alone, in one terminal, without a dashboard I have to log into?

That's why plain Node with no build step earns a real slot. When something is on fire, "edit the file, restart the service" is a much better position than "figure out why the bundler is caching."

---

## Free tiers are usually the correct answer

Not because I'm cheap. Because free tiers force scope discipline and remove a whole category of "is this worth the money" deliberation from every decision.

Sixty-plus production-grade data sources, most requiring no key at all: Open-Meteo, USGS, NASA EONET/FIRMS, GDELT, World Bank, IMF, ReliefWeb, Nominatim, Overpass, Frankfurter, UN Data, UNHCR. Government and intergovernmental agencies are legally obligated to publish much of this. Full catalog: [free-apis.md](free-apis.md).

> If you can't build it on $25/month, you're overcomplicating it.

---

## Choices I'd defend hardest

**SQLite over a hosted DB for ingest-heavy local services.** A 1.2 GB database with WAL, growing 10–30 MB/day, on a laptop, doing continuous ingest. Zero operational overhead. The failure mode is disk, not the database — and disk is a problem you'd have anyway.

**Static frontend fully decoupled from the backend.** The frontend ships in seconds and stays up when the laptop sleeps. Only live data goes stale, and the UI says so. Graceful degradation as an architectural property rather than a code path.

**A catch-all API proxy with no route list.** The Pages Function catches everything under `/api/*` and forwards it. Adding an endpoint requires no frontend deploy. This deletes an entire class of "I added the endpoint but forgot the route" bug, permanently.

**Mock data in every project.** `src/lib/api/mock.ts` — the app renders fully with zero API keys. Onboarding is instant, upstream outages degrade instead of break, and the demo always works.

---

## Choices I'd revisit

**Postgres per-project when SQLite would do.** A few dashboards run a Postgres instance for datasets that would fit comfortably in a file. That's operational surface I'm paying for out of habit.

**Too many launchd jobs.** 110 is past the point where I can hold them in my head. It works, but the next iteration wants a single supervisor with a real inventory rather than 110 independent plists and a directory listing.

**Scaffold-by-copy for the dashboard family.** Copying a working dashboard to start the next city is genuinely fast for the first three. By the eleventh, a fix has to be applied eleven times and half the READMEs carry the wrong city name. *Copy-paste is fine for the first three instances* — after that, extract the scaffold. I extracted mine later than I should have.

---

## The rule that governs all of it

> **The best stack is the one that ships.** Not the one that scales, not the one that's elegant, not the one that impresses peers.

Don't add a tool until you've felt the pain of not having it. Don't keep a tool that isn't earning its keep.
