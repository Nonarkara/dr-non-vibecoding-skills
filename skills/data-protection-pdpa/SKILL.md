---
name: data-protection-pdpa
description: >-
  Design so personal data is not collected, and handle what remains under Thai
  PDPA and GDPR. Use before shipping cameras, bots, logins, or sensor feeds.
license: MIT
---

# Data Protection — PDPA and GDPR

> The cheapest personal data to protect is the personal data you never collected. Every rule below is a fallback for what survives that first decision.

[`risk-posture`](../risk-posture/SKILL.md) already states the strategy in one
line: *a system that never holds personal data cannot leak personal data, so I
never have to slow down to protect it.* That is correct and it is the highest-value
move available. This skill exists because several things in this practice **do**
collect personal data whether the architecture wanted to or not:

- [`home-cctv-grid`](../home-cctv-grid/SKILL.md) and [`itic-cctv-integration`](../itic-cctv-integration/SKILL.md) — camera footage of identifiable people, and any face or plate is likely **sensitive** data
- [`messaging-gateway`](../messaging-gateway/SKILL.md) — Telegram and Line user IDs, phone numbers, message contents
- [`auth-entitlement`](../auth-entitlement/SKILL.md) — emails, billing identifiers, IP addresses in logs
- Any sensor or civic feed precise enough to identify a household

**Not legal advice.** This is engineering practice that keeps a small operator out
of the obvious trouble. Thailand's PDPA (B.E. 2562) has been in force since June
2022, is closely modelled on GDPR, and carries administrative fines plus criminal
liability for some misuse of sensitive data. Anything with real exposure — public
cameras, health data, children, a business with EU users — gets checked against
current PDPC guidance and a lawyer, not against this file.

---

## The rule

Decide what you are collecting and why **before** you write the schema. Personal
data with no named purpose and no deletion date is a liability you are storing on
purpose.

---

## The procedure

### 1. Delete the category, not the risk

Work down this list and stop at the first line you can live with. Each step down
costs more forever.

| Move | Example | What it removes |
|---|---|---|
| **Do not collect** | Show air quality by district; never ask for an address | The entire obligation |
| **Collect anonymously** | No account; a client-side preference key | Identifiability |
| **Aggregate at the edge** | The camera emits `people_count: 4`, the frame never leaves the device | Sensitive data, in the place it was created |
| **Pseudonymise** | A random `user_id`, with the phone number in one table you can drop | Blast radius, not the obligation |
| **Collect and protect** | Email and billing id for a paying customer | Nothing — you now owe everything below |

The third row is the one people skip. On-device aggregation is the difference
between operating a camera network and operating a surveillance database, and it
is usually a smaller engineering job than the compliance it avoids.

### 2. Write the register before the schema

One table, in the repo, kept current. It is required of many controllers under
both regimes, and — more usefully — it is the only artifact that makes the next
four decisions obvious.

```markdown
| What | Why (lawful basis) | Where | Who can read | Retention | Deleted by |
|---|---|---|---|---|---|
| Line user id | consent — to deliver the alert they subscribed to | Postgres `subs` | me, the bot | until unsubscribe + 30d | nightly job `purge_subs` |
| Camera frames | legitimate interest — property security | device only, never uploaded | nobody remotely | 7 days | device ring buffer |
| Email, stripe_customer_id | contract — to deliver the paid service | Postgres `users` | me | account life + 90d | `purge_closed_accounts` |
```

If you cannot fill the **Why** column with one of the recognised bases — consent,
contract, legal obligation, vital interests, legitimate interest, public task —
you are not allowed to collect it. "It might be useful later" is not a basis.

If you cannot fill **Deleted by** with the name of something that actually runs,
your retention period is fiction.

### 3. Consent is only consent when refusing is free

Where consent is your basis it must be freely given, specific, informed, and as
easy to withdraw as to give. Pre-ticked boxes, bundled consent, and "accept to
continue" on a public information service are not consent. Record *when* and *to
what version of the notice* it was given, because you will be asked to show it.

For cameras in a place people can walk into, the practical minimum is **visible
signage at the boundary** saying who is recording, why, and how to contact them.
An unmarked camera pointed at a public footpath is the single easiest way for a
civic project to become a news story.

### 4. Build the subject rights as endpoints, not as a promise

Access, rectification, erasure, restriction, portability, objection, and
withdrawal of consent are rights with a response deadline, not a support policy.
Build them as ordinary functions on day one, while there are three tables:

```
GET  /me/data      → everything you hold about this subject, machine-readable
POST /me/erase     → deletes it, cascades, and returns what could not be deleted and why
```

Retrofitting erasure into a system with backups, caches, analytics, and a message
queue is the expensive version, and it arrives on a clock.

**Erasure has honest limits**, and they belong in the response: an immutable
backup, a legally-required invoice, an aggregate that cannot be disaggregated.
Say so per [`honest-envelope`](../honest-envelope/SKILL.md); do not claim a
deletion you did not perform.

### 5. Know your 72 hours

A breach that risks people's rights is notifiable to the regulator within **72
hours** of becoming aware, and to the affected people where the risk is high.
That clock starts on *awareness*, not on the fix, so the work has to already
exist: who decides it is a breach, what gets written down, where the register is,
who is contacted. One page, in the repo, next to the wake list from
[`observability-budget`](../observability-budget/SKILL.md).

Rotate the credential first, per
[`production-spine`](../production-spine/SKILL.md) — then start writing.

### 6. Know where it physically is

Cross-border transfer has rules under both regimes. A "free tier in `us-central1`"
is a transfer decision that somebody made without noticing. Pick the region
deliberately — [`google-cloud-run`](../google-cloud-run/SKILL.md) deploys to
`asia-southeast1` in this practice for latency, and that also happens to be the
easier answer here. Write the region in the register.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Collecting "just in case it is useful later" | No lawful basis, and it converts a maybe-feature into a definite liability |
| Full-resolution frames uploaded so the model can run in the cloud | Aggregate on the device; the frame is the sensitive part |
| Consent bundled into "accept to use this site" | Not freely given, so it is not consent, so you have no basis |
| A retention period with no job that enforces it | Fiction, and worse than none because you wrote it down |
| Erasure implemented as `deleted = true` | The data is still there. Say what you actually did |
| Emails or phone numbers in application logs | Logs get shipped, cached, and shared far more casually than databases |
| An unmarked camera on a public boundary | Signage is the cheapest control you will ever install |
| Copying this file as your compliance position | It is engineering practice, not legal advice, and it does not know your case |

---

## The test

Point at one person's row in your database and answer four questions without
opening code: why do you have it, who can read it, when does it disappear, and
what happens if they ask you today to delete it. If any answer requires
investigation, the register is missing or stale — and that is the artifact both
regimes ask for first.
