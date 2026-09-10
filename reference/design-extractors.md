# Design Extractors & Web Cloners

A catalog of the GitHub tools that extract design systems, components, or full pages from public URLs. None of them reverse-engineer proprietary backends, APIs, or private server logic — they work on the publicly rendered DOM, CSS, and assets. Use them to study a public design for inspiration, never to copy a proprietary asset wholesale. **Steal patterns, not pixels. Rebuild from the idea.** ([`skills/ux-archaeology/SKILL.md`](../skills/ux-archaeology/SKILL.md))

Last reviewed: 2026-09-10. Popularity and activity are the maintenance signal; the user-facing tool is whatever is most starred and most recently committed, not necessarily what's named in this table. Verify the latest state on each repo's page.

---

## Design System / Style Extractors

These analyze a live page (via headless browsers like Playwright) and output reusable tokens, Tailwind configs, CSS variables, Figma variables, or `DESIGN.md` files. The right tool is the one whose output format matches the next step in the workflow.

| Repository | Stars (~) | Output formats | Best for |
|---|---|---|---|
| [dembrandt/dembrandt](https://github.com/dembrandt/dembrandt) | 3.4k | W3C design tokens, Tailwind config, `DESIGN.md`, logo, colors, typography, spacing, borders, shadows, motion, components. Playwright-based, one command. | Fast, practical design-token extraction that drops straight into an [`axiom-design-core`](../skills/axiom-design-core/SKILL.md) or [`design-dna`](../skills/design-dna/SKILL.md) workflow. |
| [Manavarya09/design-extract](https://github.com/Manavarya09/design-extract) (CLI: `designlang`) | 3.4-4k | Tailwind, CSS vars, Figma, shadcn themes, AI-optimised markdown. Also extracts accessibility scores, responsive breakpoints, interaction states. | Comprehensive design-language reverse-engineering. The CLI form fits in a single command: `npx designlang <url>`. |
| [Max-Mogilski/Scrapstyle](https://github.com/Max-Mogilski/Scrapstyle) | smaller | AI-ready style guide (colors, typography, spacing, shadows). Browser-based or local. | Quick style guides for AI coding tools. Niche but fast. |
| [Mrassimo/html-style-extractor](https://github.com/Mrassimo/html-style-extractor) | smaller | Design tokens + cleaned HTML/CSS; AI prompt workflow for replication. | Style analysis + LLM-friendly reports. |

The two clear winners are **dembrandt** and **design-extract** for stars and breadth. Scrapstyle and html-style-extractor are useful but small; reference them when the bigger tools miss a niche.

## Website Cloners / Scrapers

These download HTML/CSS/JS/images for offline viewing or as a starting template. They capture the public frontend, not the full dynamic system. Be careful: a "clone" of a public site is fine for personal study, republishing or commercial reuse is not.

| Repository | Stars (~) | Key features | Best for |
|---|---|---|---|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 178k | Turns sites into clean markdown/structured data for AI. Handles JS rendering, crawl policies, structured extraction. | Broader data tools rather than pure design RE. Pair with [`data-catalog`](../skills/data-catalog/SKILL.md) when studying a competitor's information architecture. |
| [xroche/httrack](https://github.com/xroche/httrack) | 4.7k | Classic offline browser/website copier. Recursively downloads pages + assets, preserves link structure for local browsing. Mature (since 1998), cross-platform. | Offline personal study. Niche for the agent-skills workflow but reliable. |
| [hi5jeff/deepclonewebsite](https://github.com/hi5jeff/deepclonewebsite) | newer | Interactive login support, full multi-page offline rebuild + AI-generated docs (product structure, data model, API sketches, design system). Focuses on structure over content. | When you want both the design *and* an inferred data model from the same tool. |

The most useful here is **firecrawl** for AI-friendly structured data extraction; the others are more niche. HTTrack is reliable but old; deepclonewebsite is newer and less proven.

## What none of them do

Tools see what the browser renders: DOM, computed styles, public assets, network calls visible in DevTools. They **cannot** access server-side code, databases, private APIs, authentication logic, or proprietary algorithms. AI-assisted tools (deepclonewebsite and similar) may *infer* possible data models or API shapes from frontend patterns, but these are educated guesses, not accurate reverse-engineering.

The legal and ethical frame is the same as [`ux-archaeology`](../skills/ux-archaeology/SKILL.md): only use on sites you own, have permission for, or that allow it. Respect `robots.txt`, terms of service, and copyright. Cloning for personal study is generally fine; republishing or commercial reuse of someone else's design or assets is not.

## Quick recommendations

- **Want reusable design tokens for your own site?** Start with **dembrandt** (DESIGN.md output) or **design-extract / designlang** (Tailwind + Figma + shadcn).
- **Want a full offline frontend copy?** Use **HTTrack** for personal study or a modern Playwright-based cloner.
- **Want AI help rebuilding in React/Next?** Use **firecrawl** for the data, then a design-extract tool for the tokens, then [`ux-archaeology`](../skills/ux-archaeology/SKILL.md) to apply the patterns.
- **Want inferred data model + design from the same tool?** Try **deepclonewebsite**, but verify every inference before relying on it.

The pattern is: pick the tool whose output format matches the next step, never trust an inference, and always treat the output as a starting point, not a final product. The [`design-extract`](../skills/design-extract/SKILL.md) skill is the orchestrator.

## How the catalog is maintained

This file is a snapshot. When a tool's stars drop, when the last commit is older than six months, or when the project is archived, the entry is updated or removed. When a new tool surfaces with 1k+ stars and recent activity, it is added. The skill [`design-extract`](../skills/design-extract/SKILL.md) points here as the catalog; the skill is the workflow, the file is the data.
