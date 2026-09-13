---
name: webhooks-reliable
description: >-
  Receive third-party webhooks that don't lie to you — always 200 fast, then
  async process, with idempotency keys, signature verification, retries with
  exponential backoff + jitter, and a dead-letter queue. Load when wiring any
  third-party callback (Stripe, LINE, GitHub, custom), when retries are causing
  double-charge, or when a failing webhook can silently lose revenue.
license: MIT
---

# Webhooks — Reliable

> The webhook endpoint is the worst possible place to do real work. Return 200 in under 100 ms; do the actual processing in a worker.

Webhooks are the worst part of any integration. The sender can retry 1–10 times with no warning. The network can drop a payload that *arrived*. The sender's clock is wrong. The receiver is down. The receiver is up but its DB is locked. The signature is valid but the body is empty. Every one of these has bitten a real production system, and the recovery path is the same: **acknowledge fast, verify later, retry forever, dead-letter the failures**.

*See [`appsec-stack`](../appsec-stack/SKILL.md) for the verification side; this skill is the reliability side.*

---

## The core claim

The two halves of a webhook receiver are not the same code path. **Acknowledgement** is a 100 ms commitment to the sender — write to a durable queue, return 200. **Processing** is an async worker that reads from the queue, verifies, transforms, and writes to your system. They share almost nothing: no DB locks, no business logic, no third-party calls.

When you mix them — "I'll process in the handler so I can return the result synchronously" — every retry duplicates the work, every timeout loses the work, and every sender-side bug looks like a receiver-side bug. The fix is structural: two functions, one queue, one worker.

---

## When to load

- You're wiring a Stripe / LINE / GitHub / Shopify / any-third-party webhook.
- You received a complaint that a webhook "fired but didn't take effect."
- Retries are causing double-charge or duplicate notifications.
- You need to sign outgoing webhooks to your own customers.
- A webhook can silently lose revenue if it fails (payments, auth, billing).

---

## The moves

### Acknowledge in under 100 ms

```javascript
app.post('/webhooks/stripe', async (req, res) => {
  // 1. Persist raw body + headers to a durable queue (NOT the DB you
  //    care about — a queue is cheaper to roll back).
  // 2. Return 200 immediately.
  const jobId = await queue.push({
    rawBody: req.rawBody,
    headers: req.headers,
    receivedAt: Date.now()
  });
  res.status(200).json({ received: true, jobId });
  // Total elapsed: 5–20 ms. No DB writes to business tables. No third-party calls.
});
```

The endpoint exists to keep the sender from retrying. Everything else happens in the worker.

### Idempotency: deduplicate by `(sender, event_id)`

```sql
CREATE TABLE webhook_events (
  sender     TEXT NOT NULL,
  event_id   TEXT NOT NULL,
  received_at TIMESTAMP NOT NULL,
  processed_at TIMESTAMP,
  result     JSONB,
  PRIMARY KEY (sender, event_id)
);
```

If the sender retries (and they will), the worker hits the unique constraint on `(sender, event_id)`, sees the event was already processed, and skips. **Never trust a webhook delivery to be unique; always assume it has been seen before.**

### Verify the signature *before* you trust the body

For HMAC-signed webhooks (Stripe, GitHub, LINE):

```javascript
const expected = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET)
                       .update(rawBody).digest('hex');
const actual = req.headers['x-signature'];
if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(actual))) {
  return res.status(400).send('invalid signature');
}
```

**Use `timingSafeEqual`, never `===`** — string comparison leaks the prefix length and lets an attacker forge a signature byte-by-byte. See [`appsec-stack`](../appsec-stack/SKILL.md) for the full signature discipline.

### Exponential backoff + jitter, capped at N retries

```javascript
const backoffMs = (attempt) =>
  Math.min(2 ** attempt * 1000, 60_000) + Math.random() * 1000;
```

Jitter is not optional. Without it, a thundering herd of failed webhooks all retries at second 1, 2, 4, 8… — every retry storm synchronizes and kills the downstream. **Add 0–1000 ms of random jitter to every retry.** The cap matters: don't retry forever, ever.

### Dead-letter queue is the last resort, not the goal

If a webhook has retried 8 times and still failed, push it to a DLQ and *page a human*. Do not silently drop. Do not retry forever. The DLQ is where the operator looks at 3 AM when something is on fire. Make sure it exists, make sure it has an alert, and make sure the alert goes to a person, not a dashboard.

---

## The architecture

```mermaid
sequenceDiagram
  participant S as Sender (Stripe/LINE)
  participant E as /webhooks endpoint
  participant Q as Queue (durable)
  participant W as Worker
  participant DB as Your DB
  participant DLQ as Dead-letter queue

  S->>E: POST + signature
  Note over E: < 100 ms<br/>verify signature<br/>write raw body to queue
  E->>Q: push event
  E-->>S: 200 OK
  Note over W: async, eventually
  W->>Q: pop event
  W->>W: check (sender, event_id) idempotency
  alt new event
    W->>W: process
    W->>DB: write business result
    W->>DB: mark processed_at + result
  else duplicate
    W->>W: skip, already done
  end
  alt process fails
    W->>Q: schedule retry with jitter
  else max retries hit
    W->>DLQ: push
    DLQ-->>W: page on-call
  end
  style E fill:#0d2a1c,stroke:#00c896,color:#e8e8e8
  style W fill:#1a1a1a,stroke:#ffd000,color:#e8e8e8
  style DLQ fill:#2a1414,stroke:#e8002d,color:#e8e8e8
```

The endpoint and the worker are different processes — different scaling, different retry budgets, different failure modes. Keep them separate.

---

## Connects to

- [`../appsec-stack/SKILL.md`](../appsec-stack/SKILL.md) — signature verification, secret rotation, the seven-layer stack
- [`../data-catalog/SKILL.md`](../data-catalog/SKILL.md) — catalogue the webhook payload schema the same way you catalogue any source
- [`../rate-limiting/SKILL.md`](../rate-limiting/SKILL.md) — protect your own endpoints from being webhook-spammed
- [`../dual-write-resilience/SKILL.md`](../dual-write-resilience/SKILL.md) — the same primary-plus-fallback discipline applies to webhook processing
- [`../risk-posture/SKILL.md`](../risk-posture/SKILL.md) — every webhook is a trust boundary; classify which senders get the full ceremony vs the lightweight path

---

## For the full thing

The discipline is the same regardless of the sender (Stripe, LINE, GitHub, Shopify, custom). What changes is the signature scheme — that's per-sender. For the actual signature math, read the sender's docs; for the architectural pattern, this skill is the whole story.
