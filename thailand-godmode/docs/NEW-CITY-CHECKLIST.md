# New city checklist

Run `node scripts/new-city.mjs "<City Name>"` first — it does step 1 for you.

- [ ] **1. Scaffold the config.** `configs/cities/<slug>.city.json` exists,
      copied from `_template.city.json`, `slug`/`nameTh`/`nameEn`/`region`
      filled in.
- [ ] **2. Harvest data.go.th.** `node scripts/fetch-datagoth.mjs "<City Name>"
      "<ชื่อจังหวัด>"` — dumps every dataset whose title/tags/organization
      mention the city, in both scripts. Review the output, keep what's
      relevant in the config's `dataGoThQueries` array (the harvester re-runs
      these at build time, this isn't a one-off dump).
- [ ] **3. Flood/water stations.** Find the province's RID telemetry station
      IDs (or the equivalent local irrigation authority) and its bank-level
      references. Fill `hydrology.stations[]`. If none are publicly
      telemetered, leave the array empty — the cook layer must degrade to
      `unavailable`, never invent a station.
- [ ] **4. Air quality stations.** Air4Thai station IDs for the province,
      `airQuality.stations[]`. Same rule: empty is honest, invented is not.
- [ ] **5. Geometry.** Corridors/zones/marine points relevant to *this*
      province's actual operational concerns (a landlocked province has no
      marine points — don't copy Phuket's). Map center + default zoom per
      corridor.
- [ ] **6. Downstream travel times.** If the flood coupling is to say
      anything about *when* a district needs to act, `hydrology.downstream[]`
      needs each district's travel time from the relevant gauge/dam, in
      hours. Missing data here means the release/lag couplings degrade to a
      hedge sentence, not silence.
- [ ] **7. CCTV.** Confirm ITIC/Longdo camera coverage exists for the
      province's road network (`camera.longdo.com/feed/?command=json`,
      filtered by bounding box). Most provinces have at least highway
      coverage even without local coverage.
- [ ] **8. Social listening keywords.** Thai and English spellings of the
      city/province name, plus any well-known local nicknames, in
      `socialListening.keywords[]`. Transliteration is not stable — list
      variants rather than assume one spelling.
- [ ] **9. Brand palette.** Province flag colors + one or two seasonal/local
      motifs (a festival, a crop, a craft), run through
      `packages/design/palette.ts` — verify contrast, verify the status ramp
      is untouched.
- [ ] **10. Deploy.** Per `docs/ZERO-BAHT-STACK.md`. Confirm every module
      renders with zero API keys configured (the scenario/reference floor) 
      before adding any real key.
- [ ] **11. Gate.** Run whatever test suite the consuming app has (the
      Lopburi build's pattern: `test:cook`, `test:layers`, `test:alloc`,
      `test:ui`, `tsc -b`, `build`) before calling the city "live."
