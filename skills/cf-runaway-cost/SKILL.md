---
name: cf-runaway-cost
description: >-
  Fail a Workers change that can bill without a cap: alarm, self-call,
  storage write, fast poll, or paid binding. Use when reviewing Cloudflare
  Workers or Durable Objects.
license: MIT
---

# Cloudflare runaway cost

> A Durable Object alarm that schedules itself for "now" keeps running after you close the laptop. Cloudflare will email you. It will not turn the meter off.

บิล Cloudflare ไม่มีปุ่มหยุดที่จำนวนเงิน นาฬิกาปลุกของ Durable Object ที่สั่งให้ตัวเองทำงานทันที จะวนจนกว่าใบแจ้งหนี้มาถึง รีวิวที่ไม่ผ่านเกณฑ์ด้านล่างนี้ให้ตีกลับ

A **Worker** is a small program Cloudflare runs when a request, a cron, or a queue message arrives. A **Durable Object** is one named copy of that program with its own storage and, if you ask, one alarm. An **alarm** wakes that object at a time you set. A **binding** is a named handle in config (`env.KV`, `env.BUCKET`, `env.AI`) that connects the program to a product Cloudflare charges for.

## The bill this comes from

On 6 Oct 2026, @shmily7 reported that a test project nobody was using had run up a Cloudflare bill. He said a Codex commit on 29 Aug 2026 wrote a Durable Object alarm, the bug sat quiet for weeks, and a checkpoint refresh woke it on 23 Sep 2026. He paid **US$10,811.41** on 8 Oct 2026. He had left the default **US$10** budget notice in place and had not added more.

Cloudflare support, in a ticket he posted on 9 Oct 2026, said `alarm()` was calling `setAlarm(Date.now())`. That time is already in the past by the time the call runs, so the platform treats it as "run again immediately" — about 600 times a second in their account of this bug. Support said the cost was SQLite rows read and written. In that same ticket, a Durable Object that merely stays awake was a few dollars a month in duration. Support said a refund of **US$10,701.41** for Durable Objects charges from 23 Sep through 6 Oct had been processed, and that the money had not arrived yet when he posted.

Two facts from Cloudflare's own docs, checked the same week:

- [Budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/) send email when account-wide usage crosses a dollar amount you set. They do not pause the account. The [15 Jun 2026 changelog](https://developers.cloudflare.com/changelog/post/2026-06-15-budget-alerts-default-on/) says the default is often $10 and that usage is processed once a day, so the mail arrives the next day.
- A hard spend cap that stops the service was not a setting you could turn on. On 8 Oct 2026, Ashley Peacock wrote that hard billing caps were "coming soon." The code guards below are the stop. The email is the notice that arrives after the damage.

Source for the amounts and the timeline: [Billflare's case page](https://billflare.dev/cases/shmily7-durable-object-alarm), which links the posts. Alarm behaviour: [Alarms](https://developers.cloudflare.com/durable-objects/api/alarms/).

## The rule

Fail the review when any pattern below is in the diff without its guard. "We will add a cap later" is a fail. A one-shot alarm still needs the four guards. This bill started as a checkpoint refresh.

### 1. `setAlarm`

Every `setAlarm` needs all four:

1. A **cap on runs**, stored in Durable Object storage, that stops scheduling after N and calls `deleteAlarm()`.
2. **Exponential backoff with a 1 second minimum.** `2 ** n * 1000` waits 1 second when `n` is 0. Longer is allowed. On this bill, support told the author to use at least 60 seconds, and 15 minutes for a refresh. A longer floor still passes.
3. A **kill-switch env var**. The reference name is `ALARMS_DISABLED`. `"1"` means return before any storage write.
4. **`getAlarm()` idempotency.** A Durable Object holds one alarm. `getAlarm()` answers "is one already set?" If it is, do not replace it. While `alarm()` is running, `getAlarm()` returns null unless this handler already called `setAlarm`. Check it before every `setAlarm`.

Two calls fail even if the other guards are present:

- `setAlarm(Date.now())` — that is "now", which fires again immediately.
- `setAlarm` from `fetch` without a `getAlarm()` check in that `fetch`. A request on every page view will stamp a new time over the one you already set.

`deleteAlarm()` inside `alarm()` is best-effort. The platform may still retry a thrown handler (its own retry starts at 2 seconds, up to 6 times). The cap and the env var are the stops you control.

`MAX_ALARM_RUNS` is your number. Fifty is a starting point you pick for a retry loop. Cloudflare did not publish that number. At one second apart, fifty runs is under a minute. At "now", fifty runs is a blink, which is why the delay matters as much as the count.

Reference guard. Copy it. Do not "simplify" the `finally` block away:

```ts
async alarm() {
  if (this.env.ALARMS_DISABLED === "1") return;
  const n = ((await this.ctx.storage.get<number>("alarmRuns")) ?? 0) + 1;
  if (n > MAX_ALARM_RUNS) { console.error("alarm cap hit"); await this.ctx.storage.deleteAlarm(); return; }
  await this.ctx.storage.put("alarmRuns", n);
  try { await this.work(); await this.ctx.storage.put("alarmRuns", 0); }
  finally {
    if (await this.hasPendingWork() && !(await this.ctx.storage.getAlarm()))
      await this.ctx.storage.setAlarm(Date.now() + Math.min(2 ** n * 1000, 3_600_000));
  }
}
```

What each line is doing, in order:

- If the kill switch is `"1"`, do nothing. Set that var when the bill looks wrong. Shipping the var change is a deploy; until it is live, take the Worker off its route.
- Read `alarmRuns`, add one. The count lives in Durable Object storage, so a restart keeps it.
- If the count is past the cap, log it, delete the alarm, and return. No new `setAlarm`.
- Store the new count before the work. A crash mid-work still counts.
- `work()` does the job. On success the count goes back to 0, so a healthy alarm can keep its daily job.
- `finally` runs on success and on failure. Schedule the next alarm only when there is still work **and** `getAlarm()` says nothing is set. The delay is `2^n` seconds, and never more than one hour (`3_600_000` milliseconds). In this function `n` starts at 1, so the first wait is 2 seconds. That is above the 1 second floor.

### 2. A Worker calling its own host, or a cron or queue that fans out with no cap

`fetch(request.url)` inside the same Worker turns one visitor into another billed request, which can call itself again. Each of those calls can still write storage. A cron (`scheduled`) or a queue producer that loops over every user, key, or row and calls `fetch`, `getByName`, or `queue.send` does the same thing on a clock.

Guard: do not fetch your own URL. If you must fan out, cap it in the code the reviewer can see (`slice`, a page size, a `MAX_FANOUT` you picked). Write the cap next to the loop.

### 3. KV, D1, or R2 writes on every request, or inside a loop

Each `put` is a billed write. A `fetch` handler that writes once per visitor, or a `for` loop of `KV.put` / `R2.put` / D1 `.run()`, is how a quiet app gets an ugly invoice.

Guard, either one:

- **Batch.** D1 has `db.batch([...])`. For KV and R2, write one object for the whole step.
- **A [rate-limit binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).** `[[ratelimits]]` in Wrangler, then `env.MY_RATE_LIMITER.limit({ key })` before the write. If `success` is false, return `429` and do not write.

### 4. Client polling faster than 10 seconds

A page that calls a Worker every 1–3 seconds bills one request per tab per interval, including the tab left open overnight.

Guard: poll at **10 seconds or slower**. If you have a reason to poll faster, the page has to do both of these:

- Stop while the tab is hidden (`document.hidden` or `document.visibilityState`).
- Back off after each quiet or failed response (`delay = Math.min(delay * 2, some ceiling)`).

### 5. A new Worker config with no CPU limit and no observability

`wrangler.toml` (or `wrangler.json` / `wrangler.jsonc`) for a new Worker needs both:

```toml
[limits]
cpu_ms = 30000

[observability]
enabled = true
```

`cpu_ms` is the ceiling you mean, in milliseconds. `30000` is an example. Pick a number you can explain. [Limits](https://developers.cloudflare.com/workers/wrangler/configuration/) is the config page. Observability is how you see a spike before the invoice. `enabled = false` does not count.

### 6. `accept()` on a Durable Object WebSocket

`server.accept()` keeps the Durable Object awake for the life of the socket. Use the hibernation call instead:

```ts
this.ctx.acceptWebSocket(server);
```

Docs: [WebSockets](https://developers.cloudflare.com/durable-objects/best-practices/websockets/).

### 7. A new paid binding with no budget alert

Durable Objects, Queues, Workers AI, and R2 are usage-priced. A new binding in Wrangler fails review unless the PR names a Cloudflare budget alert or a product usage notification that covers it. "We have the default $10 mail" failed this incident. The default is one low threshold, checked about once a day, and it does not stop spend.

## Set budget alerts on day one

Do this before the first deploy that can cost money. The clicks are **Manage Account → Billing → Billable Usage → Set Budget Alert**. The page is [Budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/).

- [ ] Add dollar alerts at your normal month, then at two amounts above it that you would actually open an email for. He wrote that a normal month for him was about US$100–300, and that he only had the default US$10 notice.
- [ ] Add a separate alert for each paid product you turn on (Workers, Durable Objects, R2, Queues, Workers AI) where Cloudflare offers a product usage notification. The dollar alert is the whole account. The product notification is one meter.
- [ ] Write the thresholds in the PR. A new Durable Object, Queue, Workers AI, or R2 binding with no sentence about an alert is a fail.
- [ ] Put `ALARMS_DISABLED = "0"` in the Worker vars on day one, and know how you set it to `"1"`.
- [ ] Remember the lag. Budget mail is not instant. A loop at hundreds of runs a second can finish a five-figure bill before the next day's email. The guards in the code are the stop.
- [ ] Do not plan on a hard spend cap. It was not a dashboard switch in October 2026.

## The grep check

From a clone of this stack, point it at the Worker project. The fixtures in this repo include samples that are supposed to fail:

```bash
python3 scripts/cf_runaway_cost_check.py path/to/worker
```

Exit `0` means the tripwire found nothing. Exit `1` means at least one pattern. The script searches text. It misses a cap that lives in another file, and it can flag a fast `setInterval` that never calls a Worker if that file also contains `fetch(`. A clean run still needs a person to point at the four alarm guards when `setAlarm` is in the diff. A finding fails the review until the diff shows the guard.

`make test` runs the fixture script [`scripts/test-cf-runaway-cost.sh`](../../scripts/test-cf-runaway-cost.sh).

## Anti-patterns

- `setAlarm(Date.now())`, or `Date.now() + 100`, because the work "should only take a moment".
- Deleting the `finally` block so a thrown `work()` quietly stops the schedule. The cap belongs there; so does the next delay.
- Treating the platform's 6 automatic retries as your cap. Those retries run when the handler throws. A handler that returns and calls `setAlarm` again starts a new alarm.
- A comment that says "rate limited" with no `[[ratelimits]]` binding and no `limit({ key })` call.
- Shipping the default $10 budget mail and calling the account protected.

## The test

Run the fixture script. It must flag every `bad-*` file and pass every `good-*` file. Then read one real `setAlarm` in the PR and point at the cap, the delay, the env var, and the `getAlarm()` check. If you cannot point at all four, the review fails.

## Connects to

- [`../code-slop-patterns/SKILL.md`](../code-slop-patterns/SKILL.md) — Rule 13 is this check
- [`../pr-slop-patterns/SKILL.md`](../pr-slop-patterns/SKILL.md) — the PR description has to name the guard
- [`../adversarial-review/SKILL.md`](../adversarial-review/SKILL.md) — cost is a review axis
- [`../slop-detect-stack/SKILL.md`](../slop-detect-stack/SKILL.md) — when to run it in the stack
- [`../observability-budget/SKILL.md`](../observability-budget/SKILL.md) — what should wake a person; the budget alert here is the dollar version
- [`../rate-limiting/SKILL.md`](../rate-limiting/SKILL.md) — the shape of a limit; the binding above is the Workers form
- [`../wrong-green/SKILL.md`](../wrong-green/SKILL.md) — a green deploy can leave the alarm running
