# Wrangler guards

Cloudflare will email you. It will not stop the meter. The account has no hard spending cap. The incident, with the date and the amount, is already written in [`cf-runaway-cost`](../../cf-runaway-cost/SKILL.md). Shipping the default budget mail and calling the account protected is a failed review.

No card on Cloudflare. No card on Google. Google stays on the free tier ([`google-cloud-run`](../../google-cloud-run/SKILL.md)). If a console asks for a card, stop.

Check all four before the Worker or Pages project ships:

1. **Loop guards.** The alarm cap, the backoff, the kill switch, and the `getAlarm()` check live in `cf-runaway-cost`. `setAlarm(Date.now())` fails the review. A Worker that fetches its own URL fails the review.
2. **Per-route rate limit.** Each public route has its own limit and answers 429 with `Retry-After`. The shape is [`rate-limiting`](../../rate-limiting/SKILL.md). One account-wide number is not a per-route limit.
3. **Usage cap.** Workers AI, Queues, KV, D1, R2, cron, and alarms each have a numeric cap in code and a kill switch. "We will add a cap later" fails the review.
4. **Spend alert.** Turn the notification on. Write the dollar amount in the pull request, and write that the email does not pause the account.

Secrets go in with `wrangler secret put NAME`. They do not go in `wrangler.toml`, `.dev.vars` committed to git, or the chat.

An outage pages a person only after it has been down for 10 minutes. A shorter blip stays in the log. The wake-list form is [`observability-budget`](../../observability-budget/SKILL.md).
