---
name: browser-as-t
description: >-
  For UI, layout, routing, and client state, verification is exercising the
  flow in a real browser — click, type, submit, navigate — not a screenshot
  and not curl of the HTML shell. Use when the change is user-visible.
  Skip for pure docs, license, or server-only diffs with no rendered surface.
license: MIT
inspired-by:
  - https://github.com/garrytan/gstack
  - https://github.com/vercel-labs/agent-skills
---

# Browser as T

> A screenshot is appearance. T is behaviour.

Playbook 10 made this a desk law. gstack's `/qa` opens a real browser. Vercel's web-design skill reminds you that keyboard, focus, and touch exist. This skill is the civic-studio compression: **if a human uses it with a pointer or a thumb, curl is not enough.**

[`ship-discipline`](../ship-discipline/SKILL.md) still owns CPDT. This skill is the T when the deliverable is a screen.

---

## When it fires

The change touches any of: layout, CSS, routing, client state, forms, maps, drawers, language toggle, empty/error/loading states, hit targets.

Then T is:

1. Open the **deployed** URL (or the preview that will become it). Localhost only if there is no deployable host — and then say **unverified on the edge**.
2. Exercise the flow the way a person would. Click. Type. Submit. Navigate away and back.
3. Check every route that **shares** the state, data, or component you touched.
4. Hunt regressions. The usual failure is "works on the page I edited, broken on the one that reads the same store."
5. If layout changed, hit-test at **1280 / 768 / 375**. Overlap, clipped type, unreachable controls.

A single render screenshot of the happy path is **not** this list.

---

## What curl still owns

Static proof that **new bytes** arrived — version string, md5, "FRESH" stamp — remains [`deploy-verification`](../deploy-verification/SKILL.md). Use both: curl proves the edge; the browser proves the human path.

Service workers: if a SW can serve last week, the browser check must not trust a cached shell. Block SW or hard-reload once, then re-run the flow.

---

## Civic extras (not a 100-rule audit)

Steal the *jobs* from Vercel web-design, not the vendor checklist:

- Keyboard can reach the control a flood operator would hit
- Focus is visible
- Error and stale states are labelled (`honest-envelope`), not a silent blank map
- Thai/English toggle still switches the surface you just shipped
- Touch targets work at 375 — mayors use phones

Do not "fix" the design system to match Tailwind defaults while you are in here. That is [`anti-regression`](../anti-regression/SKILL.md).

---

## The test

You performed the user path after the deploy, on the URL a human would open, at at least one desktop and one mobile width, and you can name what you clicked. If you only looked at a PNG, T did not run.
