# 07 — PROOF

> **A green badge can answer the wrong question.** Green ≠ true. Tests prove correctness; the browser/curl proves existence.

The page is two horizontal flows, side by side. The top is what a green CI badge actually means. The bottom is the four steps you have to do to be sure. The two are not the same.

![PROOF — ship discipline + wrong-green](../../infographics/pages/page-07.png)

---

## The wrong-green path

The four boxes in the top row are the path a "shipped" feature takes. Every box can be green while the user sees stale bytes.

| Step | What it says | What it actually proves |
|---|---|---|
| **TEST** | `npm test ✓` | The code, run locally, passes the test suite. Proves nothing about what the user will see. |
| **UPLOAD** | "files copied" | The new bytes are in the deploy bucket. The CDN is still serving the old ones. |
| **CDN** | "old JS cached" | The CDN is doing its job — caching. The fact that the cache is now serving yesterday's bytes is not a CI failure; it is a CDN doing what a CDN does. |
| **USER** | "stale bytes" | The user sees the previous version. Your green test, your green upload, your green CDN — and the user is on the wrong page. |

The chain is four greens, zero truths. The failure is in the **gap** between the third box and the fourth. A test passing is not a deploy. A deploy is not a delivery. A delivery is not a user seeing the new thing.

The skill that names this is [`wrong-green`](../../skills/wrong-green/SKILL.md). The pattern is "the health check is green, but it measures the wrong thing." The fix is to name the right thing and check that.

## The proof chain

The bottom row is the four steps that actually prove the new bytes reached a real user. Every step is a verb a human or a script runs, with a named observation.

| Step | The command | The observation | What it proves |
|---|---|---|---|
| **COMMIT** | `git commit -m "<type>(<scope>): <sentence>"` | `git log -1` shows the new commit | The change is in source control with a message that names the change. |
| **PUSH** | `git push` | `git ls-remote origin main` returns the commit SHA | The remote has the change. Local green is no longer a private claim. |
| **DEPLOY** | the one scripted command — never remembered | The deploy script's log shows the build succeeded and the cache-bust header was set | The delivery path ran. Not "the script ran" — the bytes were placed where the CDN will pick them up. |
| **TEST LIVE** | `curl <the real URL> \| grep <the new thing>` | The grep matches in the actual served HTML/JS | A real human (or a script pretending to be one) on the real host is seeing the new thing. |

The four are the **CPDT** loop from [`ship-discipline`](../../skills/ship-discipline/SKILL.md): Commit, Push, Deploy, Test. The difference between a wrong-green claim and a real "done" is whether the fourth step happened.

The deploy-verification skill ([`deploy-verification`](../../skills/deploy-verification/SKILL.md)) is what makes TEST LIVE work when the CDN is lying. The poison-proof probe in `templates/deploy-pages.sh` md5-checks a real asset through throwaway cache keys — the same script that once let a patched XSS fix sit un-served in production for hours (see [playbook 06 — War stories](../../playbooks/06-war-stories.md)).

## "Tests prove correctness. The browser/curl proves existence."

The line at the bottom of the page is the whole page in one sentence. There are two failure classes and two tools:

- **Correctness failures** — the code does the wrong thing. The tool is the test suite. A passing test means the code does what you thought it should do.
- **Existence failures** — the user does not see the new thing at all. The tool is the browser or curl against the real URL. A grep that matches means the bytes are there.

A green test suite does not address existence. A green curl does not address correctness. You need both, and you need them **named separately**, because the temptation is to collapse them into "it works" and lose the distinction.

The skill [`browser-as-t`](../../skills/browser-as-t/SKILL.md) is the corollary: a screenshot is appearance, T is behaviour. The browser is the existence tool. The test is the correctness tool. They are not interchangeable.

## What to do with this

- **Every release, both paths must run.** The test suite (correctness) and the curl/browser probe (existence). If only one ran, the report says which one — `result-honesty` is the discipline.
- **If a "shipped" feature is not in the user's hand, the deploy is unverified.** Do not say "done" until the fourth green.
- **If the fourth green takes more than 30 seconds, the deploy script is not poison-proof.** The script is the product. Rewrite it.
- **Add a deliberately-bad probe to the deploy script's smoke test.** Introduce a known-bad pattern (a `console.log("MARKER")` with a unique string, for example), run the script, see the marker in the curl output, then remove the marker and re-run. The test is the difference between a green badge and a real answer.

## Pairs with

- **Before → [05 — MAP](05-map.md).** The map is the categories. The proof is the gate that protects the categories from drift.
- **After → [08 — DESIGN DNA](08-dna.md).** The proof is the existence test. The DNA is the design test. Both have to be green for "shipped" to mean anything.
- **Skills:** [`ship-discipline`](../../skills/ship-discipline/SKILL.md) (CPDT in command form), [`deploy-verification`](../../skills/deploy-verification/SKILL.md) (the poison-proof probe), [`wrong-green`](../../skills/wrong-green/SKILL.md) (the failure pattern), [`browser-as-t`](../../skills/browser-as-t/SKILL.md) (the existence tool when the change is user-visible).
- **Templates:** [`templates/deploy-pages.sh`](../../templates/deploy-pages.sh) is the deploy script that makes the third step real.
- **Playbook:** [06 — War stories](../../playbooks/06-war-stories.md) § "the poisoned edge" is the incident that gave the deploy-verification skill its name.

**Source.** The wrong-green flow is distilled from [`skills/wrong-green/SKILL.md`](../../skills/wrong-green/SKILL.md). The proof chain is the CPDT loop from [`skills/ship-discipline/SKILL.md`](../../skills/ship-discipline/SKILL.md) with the existence step reinforced by [`skills/deploy-verification/SKILL.md`](../../skills/deploy-verification/SKILL.md).
