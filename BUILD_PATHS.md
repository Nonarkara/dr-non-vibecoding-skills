# Start with the result, not the tool list

Pick one path. Tell your agent who needs it, what decision it supports, and what
must remain private. A clone supplies instructions and runnable local examples;
it does not provision an agent, backend, identity provider or cloud security.

| I want… | First runnable result | Next boundary |
|---|---|---|
| A useful website | `./setup.sh --init-project ../my-app --yes --no-services`; open `../my-app/index.html` | [Composition](skills/bauhaus-human-design/SKILL.md), [contextual type](skills/bringhurst-contextual-type/SKILL.md), [Palette](skills/wada-colour-chords/SKILL.md) |
| A protected operation, bot or API | Start with the static Demo and describe the server-side action before implementing it | [API contracts](skills/api-design/SKILL.md), [identity](skills/auth-entitlement/SKILL.md), [security release](playbooks/17-security-from-source-to-edge.md) |
| Raw observations turned into a useful judgement | Run the [cooked-data example](examples/cooked-data/README.md): `python3 examples/cooked-data/cook.py examples/cooked-data/observations.json` | [Cook and couple](skills/godmode-cook-and-couple/SKILL.md), [source contracts](skills/data-catalog/SKILL.md) |
| A map, satellite comparison or city model | Inspect the cooked example's GeoJSON, source and observation times | [Geospatial](skills/geospatial-core/SKILL.md), [3D](skills/map-3d-city/SKILL.md), [satellite comparisons](skills/satellite-change-watch/SKILL.md) |

The cooker produces GeoJSON, not a rendered map application. Satellite images,
3D geometry, change detection, accounts and ingestion jobs need implementation
and source/licence checks. Do not call an old image “live” or infer a cause from
two differently dated or cloud-covered images. Keep 2D useful without 3D/WebGL.

## A prompt anyone can use

> Build [result] for [person] so they can [decision]. Start with a local Demo.
> Keep existing content. Use the relevant skills, not the whole catalogue.
> Record each attempt, its evidence and the next safe alternative in
> docs/execution.md. Do not publish, spend, enable services or change accounts
> without approval. Show what works and what remains unverified.

The scaffold is static HTML/JS even when `--stack` names a future framework.
Nothing installs React, Next.js, FastAPI, Cloudflare, Claude security plugins,
Strix, models or credentials automatically. See [Quickstart](QUICKSTART.md).

## Failure is useful evidence

| Symptom | Safe response |
|---|---|
| 401/403 or a consent challenge | Stop that route; check authorized access with the operator. Never change identity, rotate accounts or extract browser cookies to evade it. |
| 429 | Respect Retry-After; cap attempts, elapsed time and spend. Use an already approved equivalent source only when terms and privacy permit it. |
| Timeout, 5xx or offline | Bounded retry, labelled last-good data, or a clearly marked local fixture. Never silently replace current observations with fixtures. |
| Missing credential/tool/budget | Mark blocked, name the minimum needed authority, keep unrelated local work moving. Tool installation is a separate permission boundary. |
| Invalid data or conflicting observations | Quarantine the record; preserve source and reason. Unknown is not zero or normal. |

The [public-fetch helper](skills/public-api-integration/assets/fetch-with-fallback.mjs)
is an optional bounded-fetch building block, not permission to contact arbitrary
hosts or a server-side URL proxy. Local fixtures keep the Demo usable offline;
they do not satisfy a live-data or production gate.

## Before anyone relies on it

- Draw only architecture that exists; use [diagram-design](skills/diagram-design/SKILL.md).
- Apply [anti-slop](skills/anti-slop-design/SKILL.md), a subject-specific
  [composition brief](skills/bauhaus-human-design/assets/composition-brief.md),
  contextual type and semantic Palette roles. An attractive screenshot is not a task test.
- Exercise keyboard, phone, error and empty states. Thai/Chinese fluency, real
  older-user usability and independent visual review remain unverified until performed.
- Security starts unverified: negative-test identity, input, data, edge and agent
  boundaries. Strix is for explicitly authorized isolated targets, never an automatic scan.
- Record commit, command, result and evidence; distinguish Demo, Pilot and Production.
  A checked box or passed inventory cannot certify safety.
