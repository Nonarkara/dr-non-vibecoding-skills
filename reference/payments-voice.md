# Payments & Voice

Money in, voice out — the two integrations a solo business adds last, because both create obligations (refunds, per-character bills) that free tiers do not.

---

## Stripe (payments)

Use Checkout, not a hand-rolled card form — PCI scope stays with Stripe.

```bash
# Create a Checkout Session (server-side, secret key server-side only)
curl https://api.stripe.com/v1/checkout/sessions \
  -u "$STRIPE_SECRET_KEY:" \
  -d "payment_method_types[0]=card" \
  -d "line_items[0][price]=price_XXX" \
  -d "line_items[0][quantity]=1" \
  -d mode=payment \
  -d success_url="https://myapp.example.org/success?session_id={CHECKOUT_SESSION_ID}" \
  -d cancel_url="https://myapp.example.org/pricing"
```

Rules:

1. **Webhook verifies server-side, always.** `stripe-signature` header against the endpoint secret before touching fulfillment — see `production-spine` gate 5. Unverified webhooks are donation buttons for attackers.
2. **Test mode first, separate keys.** `sk_test_` vs `sk_live_`; the live key lives in Keychain + host env, never in `.env` files or notes.
3. **Public endpoint + paid key = auth + rate limit in front** (`production-spine` gate 2). The price ID is public; the secret key never leaves the server.
4. Fulfillment is idempotent — Stripe retries webhooks; a retried `checkout.session.completed` must not double-provision.

## Voice (ElevenLabs vs local)

| Need | Pick | Why |
|---|---|---|
| Audiobook / client-facing narration at scale | **ElevenLabs** ([docs](https://elevenlabs.io/docs)) — voice ID + API key, per-character billing | Professional consistency, many trained voices, no GPU babysitting — but a meter that runs while you sleep |
| Free, local, private, your own GPU | **f5-tts-mlx** — see `voice-clone-podcast` | Zero marginal cost, ~20s reference clip, flat unemotional reference; the two quality gates (coverage-for-omission, ceiling-for-invention) are load-bearing |
| Needs a specific trained voice you already have | Either — ElevenLabs voice library or a local fine-tune | Decide on cost: per-character forever vs render-time once |

Rules:

1. **Local first until quality gates the sale.** Ship the audiobook pipeline on f5-tts-mlx; move a title to ElevenLabs when a listener — not a spec sheet — rejects the local take.
2. **Voice IDs and API keys are secrets** (`ELEVENLABS_API_KEY` in Keychain/host env). Sample MP3s are assets; the key is not.
3. **Never clone a real person's voice without explicit consent.** Synthetic house voices for internal systems need no consent and avoid the entire category — prefer them for assistants and alerts.
4. Cost guardrail: set ElevenLabs usage alerts before the first paid render; per-character billing surprises solo builders exactly once.
