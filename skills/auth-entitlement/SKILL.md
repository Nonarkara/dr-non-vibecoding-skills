---
name: auth-entitlement
description: >-
  Join identity to billing so access is derived server-side from webhooks, not
  from the client. Use when adding login, paid tiers, or gated routes.
license: MIT
---

# Auth and Entitlement

> The redirect back from checkout is a hint. The webhook is a fact. Anything that grants access from a hint can be granted by typing a URL.

[`google-cloud-run`](../google-cloud-run/SKILL.md) hosts it. [`stripe-checkout-billing`](../stripe-checkout-billing/SKILL.md) charges for it. This skill is the seam between them — **who is this, and what have they paid for** — and it is the seam where solo-built products leak, because the leak is invisible until someone finds it.

Two separate questions, and collapsing them is the bug:

- **Identity** — which account is making this request. Answered by a session.
- **Entitlement** — what that account is allowed to do right now. Answered by a row your server owns.

---

## The rule

Entitlement is a server-side row fed only by verified billing webhooks. The client is never asked, the redirect is never trusted, and the check happens at the route boundary — not in the UI.

---

## The procedure

### 1. Do not operate a password store

Use an OIDC provider or a managed auth service. A password table is a permanent liability with a breach-notification obligation attached, and it earns you nothing a user wants. If you must have one, you have chosen an operations job; price it.

What the session cookie needs, every time:

```
HttpOnly; Secure; SameSite=Lax; Path=/; Domain=.example.org
```

The leading dot on `Domain` is where this fails in production. A session set on the canonical deploy host does not travel to the custom domain, so `auth()` returns null on the next request and the user is silently logged out on the live URL while localhost works perfectly. Verify with a real header trace on the live host, never a local one:

```bash
curl -si https://example.org/api/session -b "session=<token>" | grep -i '^set-cookie\|^HTTP/'
```

### 2. Join the user to the customer exactly once

The join is written at checkout and never re-derived from an email address. Emails change; they are not identity.

```
users(id, email, created_at)
billing_customers(user_id UNIQUE, stripe_customer_id UNIQUE)
entitlements(user_id, tier, status, current_period_end, updated_at, source_event_id)
```

Pass `client_reference_id: user.id` into the Checkout session. The webhook comes back with it, and that is the only moment the join is safe to write.

### 3. Derive entitlement from events, never from the app

Only the webhook handler writes `entitlements`. Every write records `source_event_id` so a replayed event is a no-op — Stripe retries, and it will retry the one you handled badly.

| Event | Entitlement effect |
|---|---|
| `checkout.session.completed` | Write the join, set tier active to `current_period_end` |
| `customer.subscription.updated` | Re-read tier and period end from the object; never diff it yourself |
| `invoice.payment_failed` | Enter dunning — keep access to the end of the paid period, flag the account |
| `customer.subscription.deleted` | Expire at `current_period_end`, not on receipt — they paid for that time |
| Chargeback / fraud signal | Revoke immediately; this is the one instant cutoff |

Cancelling at receipt instead of period end is theft of paid time, and it produces support mail you will answer personally.

### 4. Check at the boundary

```
route handler → session? → entitlement row? → status active and period_end > now? → serve
```

Hiding a button is not access control. Neither is a client-side redirect, a feature flag in the bundle, or an unguessable URL. The check runs server-side on every protected request, including the API routes your own frontend calls.

### 5. Fail closed, and say so honestly

If the entitlement store is unreachable, deny and show a real error. Do not fall back to "assume paid" for availability — that is a free tier with extra steps. Do not fall back to "assume unpaid" silently either; a paying customer who sees a paywall with no explanation files a chargeback. Per [`honest-envelope`](../honest-envelope/SKILL.md), the surface says which it is.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Granting on the `/success?paid=true` redirect | Anyone can type that URL. The redirect is a hint |
| Reading the tier from a JWT claim the client can refresh | The client controls when it refreshes; entitlement is the server's row |
| Matching user to customer by email | Emails change and collide across providers; the join is by id, written once |
| Instant cutoff on cancellation | They paid to the end of the period. Expire at `current_period_end` |
| Checking entitlement only in the UI | The API is the product; the UI is a client of it |
| Rolling your own password store to save a dependency | You bought a breach obligation to avoid an OIDC config |
| Trusting a webhook without signature verification | Then your entitlement table is a public write endpoint |

---

## The test

Log in as an account that has never paid, then `curl` the paid endpoint directly with that session cookie and no browser. If it returns data, you have a paywall, not an entitlement. Then replay the same webhook event twice and confirm the second one changes nothing.
