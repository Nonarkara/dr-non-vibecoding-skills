---
name: browser-use
description: Use when an agent must drive a real browser to fill a form, navigate a flow, or complete a multi-step user journey. Pairs with browser-as-t.
license: MIT
---

# Browser Use

> The browser is the most universal client on the planet. Every form, every checkout, every account flow assumes a human is on the other end. The discipline of *agent-driven browser interaction* is the discipline of teaching a machine to act as that human, safely, observably, and with a paper trail.

This skill is the *decision logic* for an agent that needs to *act through* a real browser — fill a form, click through a flow, scrape a page, test an interaction, or complete a multi-step user journey. It is the **interaction** layer. The existing [`browser-as-t`](../browser-as-t/SKILL.md) is the **verification** layer (the agent verifies a change with a browser). The two stack: the agent *interacts* with one skill, the agent *verifies* with the other.

**Provenance:** distilled from three converging practices — the Anthropic `computer-use` capability (the model that uses a real browser as its I/O surface), the Volcengine OpenViking discipline of *context-aware action selection* (the agent knows what is on the page before acting on it), and the repo's own [`browser-as-t`](../browser-as-t/SKILL.md) and [`human-walkthrough`](../human-walkthrough/SKILL.md) (the agent behaves as one of three personas walking through a real browser).

---

## When to use this skill

Load `browser-use` before any of these:

- An agent needs to fill a form (signup, login, checkout, contact).
- An agent needs to navigate a multi-step flow (onboarding, KYC, application).
- An agent needs to scrape a page where no API is available and the data is not in any structured source.
- An agent needs to test an interaction (a click, a hover, a drag) and confirm the result.
- An agent needs to complete a user journey end-to-end (sign up, verify email, log in, perform action, log out).

Do **not** use this skill for:

- Pure verification of a known-good state (use `browser-as-t`).
- Page scraping where an API exists (use `deep-scraping` + the API).
- Workflows the agent can complete via a CLI / MCP / direct API (faster, more reliable).
- Authenticated flows where a session token is available (use the token, not the browser).

---

## The 7 moves in order

When the agent is about to act through a real browser, the first move is *not* to click. The first move is to **name the goal, the safety floor, and the evidence trail**.

### 1. Name the goal in one sentence

> "Fill the sign-up form with these 4 fields and submit, then verify the welcome page renders."

> "Click through the 3-step onboarding flow, taking a screenshot after each step."

> "Scrape the top 10 product cards from the search results page and return the name, price, and URL of each."

The goal is the *contract*. The agent's job is to satisfy the contract and produce the evidence. If the agent cannot name the goal in one sentence, the goal is not clear enough to act on.

### 2. Name the safety floor

Before the agent touches the page, name the *boundaries*:

- **What the agent is allowed to do** (read, click, fill, submit, navigate).
- **What the agent is not allowed to do** (delete, pay, send, sign, publish).
- **What the agent should abort on** (a captcha, a 2FA challenge, a payment prompt, a "delete account" link).
- **What to do on abort** (screenshot, log, return the abort state to the human).

The safety floor is the *constraint* layer. The model decides what to do; the safety floor decides what is *allowed*.

### 3. Verify the page is what the agent expects

Before clicking, the agent should *read* the page:

- What is the current URL? Is it the page the agent expected?
- What are the visible elements? Is the form actually present?
- What is the page state? Is the page still loading, or is it stable?

This is the [`obsidian-mcp-forge`](../obsidian-mcp-forge/SKILL.md) discipline applied to the browser: *read before write*. A page that is not what the agent expected is a *signal*, not a *failure*; the agent's job is to detect the signal and report it, not to click through the surprise.

### 4. Use the right primitive for the right action

The browser has many primitives; each is right for a different action:

- **Read** (text, attributes, content): the agent extracts what is on the page. Use a stable selector (a `data-testid`, an `aria-label`, a unique class). Never use position-based selectors (`:nth-child(2)`) — they break on layout changes.
- **Click** (links, buttons, radios): the agent activates a single element. Confirm the element is interactive (not disabled, not hidden).
- **Type / fill** (text inputs, textareas): the agent enters text. *Clear the field first* (the agent's input may not be the only thing in the field).
- **Select** (dropdowns, checkboxes): the agent sets the value, not the text. Confirm the post-state.
- **Submit / navigate** (forms, links): the agent commits the action. *Screenshot the page before and after*.
- **Wait** (for a specific element, for a specific text): the agent waits for the page to settle. The wait is the safety floor; clicking on a still-loading page is the most common agent failure.

### 5. Take the screenshot before and after

Every load-bearing action gets a screenshot before and a screenshot after. The before-screenshot is the *evidence the page was the expected page*; the after-screenshot is the *evidence the action did what was expected*.

This is the [`narrative-companion-surfaces`](../narrative-companion-surfaces/SKILL.md) discipline applied to the browser: *show the work*. A claim that "I filled the form" without a screenshot is a claim, not evidence.

### 6. Verify the result against the goal

After the action, the agent reads the result:

- Did the page state change in the expected way?
- Is the post-condition met (the welcome page is rendered, the form is submitted, the data is returned)?
- If the result is not the expected, *the agent reports the discrepancy* — does not retry blindly.

The retry is a discipline: a *bounded* retry (2-3 attempts with the same approach) is the right move when the page state is unstable. A *blind* retry is the wrong move when the goal is unmet; the right move is to report and let the human decide.

### 7. Leave the page in a known state

After the action, the agent should leave the page in a *known state*:

- If the action was a flow (sign up, log in), the agent should know what the post-flow page looks like.
- If the action was a scrape, the agent should know what the next page is.
- If the action was a test, the agent should know whether to leave the page open or close it.

A page in an unknown state is a *trap for the next agent*. The discipline is the same as the discipline of *leaving a campsite cleaner than you found it*: the next agent (or the next human) should not have to clean up after the previous one.

---

## The corollary disciplines

### 1. The captcha / 2FA / payment abort

If the page presents a captcha, a 2FA challenge, a payment prompt, a "delete" link, or any action that requires *human judgment the agent does not have*, the agent **aborts**. The abort state is screenshot, log, return. The agent does not bypass the captcha with a service (illegal on most sites), does not guess the 2FA code, does not enter a payment instrument.

The skill: "the agent's authority ends where human authority begins."

### 2. The slow-page wait

The most common agent failure is clicking on a still-loading page. The fix is *explicit waits*:

- Wait for a specific element to be visible (`wait_for_selector` in Playwright).
- Wait for a specific text to be present.
- Wait for the network to be idle (no pending requests for 500ms).

A wait is not a pause; the wait is a *commitment* to a specific page state. Without the wait, the agent is acting on a *probable* page, not a *known* page.

### 3. The stable selector discipline

The agent should use **stable selectors**, not position-based ones:

- **`data-testid`**: the test-attribute, the most stable selector.
- **`aria-label`**: the accessible name, stable across redesigns.
- **`role` + name**: the semantic role + accessible name, also stable.
- **Unique class / id**: stable, but may change with refactors.

A selector like `:nth-child(2)` is *positional*; it breaks when the page layout changes. The agent should not depend on positions.

### 4. The frame / shadow DOM / iframe

Modern pages nest UI inside frames, iframes, and shadow DOMs. The agent must *enter the frame* before interacting with the element. The discipline:

- Detect the frame / shadow root.
- Switch to the frame / shadow root.
- Interact.
- Switch back.

The agent should not "click the button" if the button is inside a frame; the click will land on the parent document, not the frame.

### 5. The data-testid convention

When the agent controls the page (e.g., the agent's own product), the agent should *add* `data-testid` attributes to the load-bearing elements. The convention:

- `data-testid="submit-form"` for the form's submit button.
- `data-testid="search-input"` for the search input.
- `data-testid="result-card-{n}"` for nth result card.

The convention is the *contract* between the agent and the page. The page declares what is clickable; the agent clicks by name.

### 6. The session persistence

If the agent needs to maintain a session across multiple actions:

- Use a *named* session (cookie jar in Playwright).
- Save the session state after each load-bearing action.
- Restore the session state when the agent re-enters.

The session is the agent's *continuity*. A session lost between actions is a session the agent must rebuild; that is wasted time and a fragile contract.

### 7. The "don't act on the surprise"

The agent's discipline when the page is not what was expected:

- **Stop.** Do not click through the surprise.
- **Screenshot.** The screenshot is the evidence the page is not what was expected.
- **Report.** The agent returns the surprise to the human: the expected URL, the actual URL, the visible element, the screenshot.

A surprise is a signal the agent's mental model is wrong. Acting on the surprise is acting on a wrong model. The right move is to *report* and let the human update the model.

---

## What this skill is *not*

- It is not a substitute for [`browser-as-t`](../browser-as-t/SKILL.md). `browser-as-t` is verification (the agent confirms a change with a browser); this skill is interaction (the agent acts through the browser). The two stack.
- It is not a substitute for an API. If an API exists, the API is faster, more reliable, and more testable than the browser. The browser is the fallback for when the API does not exist.
- It is not a way to bypass auth. If the page is behind a login, the agent needs a session; the session is the *contract*, not the bypass.
- It is not a way to bypass the human on a captcha / 2FA / payment. The agent's authority ends where human authority begins. The abort is the right move.

## Pairs with

- [`browser-as-t`](../browser-as-t/SKILL.md) — the verification layer. The agent interacts with this skill, the agent verifies with that skill.
- [`human-walkthrough`](../human-walkthrough/SKILL.md) — the multi-persona user test. The persona walks through the *user's* path; the agent here walks through the *operator's* path. The two stack for end-to-end coverage.
- [`obsidian-mcp-forge`](../obsidian-mcp-forge/SKILL.md) — the read-before-write discipline, applied to the browser. The agent reads the page before acting on the page.
- [`narrative-companion-surfaces`](../narrative-companion-surfaces/SKILL.md) — the show-the-work discipline. A screenshot before and after is the browser's "show the work."
- [`wrong-green`](../wrong-green/SKILL.md) — test the failure the user cares about. The browser is the surface where most false-greens are caught.
- [`result-honesty`](../result-honesty/SKILL.md) — succeeded / failed / skipped / unverified. The browser action is *succeeded* only if the screenshot confirms the post-state.
- [`cognition-first`](../cognition-first/SKILL.md) — design for the human who shows up. The agent here is one of the humans who shows up; the discipline is the same.

## Check

A "browser-use" action is *ready* to run when:

- The goal is named in one sentence.
- The safety floor is named (what is allowed, what is not, what to abort on, what to do on abort).
- The page is verified to be the expected page (URL, visible elements, page state).
- The right primitive is chosen for the right action (read vs click vs fill vs submit).
- The screenshot is taken before and after the load-bearing action.
- The result is verified against the goal.
- The page is left in a known state.
- The captcha / 2FA / payment abort is in place and tested.
- The stable selectors (`data-testid`, `aria-label`, `role` + name) are used, not position-based.
- The frame / shadow DOM / iframe is detected and entered before interaction.
- The session is persisted if the action spans multiple steps.
- The surprise is reported, not acted on.
