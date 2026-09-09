---
name: stripe-checkout-billing
description: Wire Stripe Checkout sessions, billing portal, and signature-verified webhooks for payments. Use when adding subscriptions or one-time purchases to an app.
license: MIT
---

# Stripe Checkout & Billing — The Monetization Spine

The difference between a weekend project and a real business is monetization. For solo builders and Thinker-to-Doers, building a custom billing engine is a fatal distraction.

Use Stripe's hosted surfaces:
- **Stripe Checkout:** Hosted payment UI (cards, Apple Pay, Google Pay, PromptPay). Zero PCI compliance liability.
- **Stripe Customer Portal:** Hosted subscription management (upgrades, downgrades, cancellations, invoices). Zero custom UI.
- **Signature-Verified Webhooks:** Real-time state synchronization with cryptographic verification and idempotency.

---

## The 3 Sacred Invariants

### 1. The Raw Body Rule (The #1 Agent Mistake)
Stripe webhooks require the raw, unparsed HTTP request buffer to verify HMAC signatures. If your framework or middleware parses the body as JSON *before* signature verification, the signature check **will always fail**.

```typescript
// Express / Node.js
import express from 'express';
import Stripe from 'stripe';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

// CRITICAL: Webhook route MUST use express.raw(), NOT express.json()
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle idempotent events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      await fulfillOrder(session.client_reference_id, session.customer as string);
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      await revokeAccess(sub.customer as string);
      break;
    }
  }

  res.json({ received: true });
});

// All OTHER routes can use express.json()
app.use(express.json());
```

### 2. Idempotency & Replay Defense
Stripe webhooks may be delivered multiple times. Store processed `event.id` in SQLite, Postgres, or Redis. If `event.id` is already marked completed, return `200 OK` immediately without re-fulfilling.

### 3. Separation of Test and Live Keys
- Never ship code that checks `NODE_ENV` to pick Stripe keys.
- Inject keys strictly from environment variables or Google Secret Manager:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_PUBLISHABLE_KEY`
  - `STRIPE_WEBHOOK_SECRET`
- Test keys begin with `sk_test_` / `pk_test_`. Live keys begin with `sk_live_` / `pk_live_`.

---

## Creating a Checkout Session (3-Line Core)

```typescript
export async function createCheckoutSession(userId: string, returnUrl: string) {
  return await stripe.checkout.sessions.create({
    mode: 'subscription', // or 'payment' for one-time
    payment_method_types: ['card'],
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    client_reference_id: userId,
    success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${returnUrl}?canceled=true`,
  });
}
```

---

## Creating a Customer Portal Session

When a customer clicks "Manage Subscription", do not build a billing UI. Generate a Stripe Customer Portal link:

```typescript
export async function createPortalSession(customerId: string, returnUrl: string) {
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}
```

---

## Verification via Stripe CLI

Never test webhooks blindly on production. Use the official Stripe CLI to forward events locally:

```bash
# 1. Forward events to local server
stripe listen --forward-to localhost:8080/webhook

# 2. Trigger a mock successful checkout
stripe trigger checkout.session.completed
```
