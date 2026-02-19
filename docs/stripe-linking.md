# Stripe Checkout → App Linking

How paid users on the marketing website (`calvora.nl`) get unlocked in the app (`app.calvora.nl`).

## Required Environment Variables

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_…` or `sk_live_…`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `PRICE_ZZP_MONTHLY` | Stripe Price ID for ZZP plan |
| `PRICE_PRO_MONTHLY` | Stripe Price ID for Pro plan |
| `PRICE_ENTERPRISE_MONTHLY` | Stripe Price ID for Enterprise plan |
| `NEXT_PUBLIC_SITE_URL` | Base URL of this website (e.g. `https://calvora.nl`) |

Both the marketing website and the app must use keys from the **same Stripe account and mode** (both test or both live). Mixing test/live keys will cause webhook signature mismatches and session lookups to fail.

## Webhook Configuration

In the Stripe Dashboard → Developers → Webhooks, add an endpoint:

- **URL:** `https://app.calvora.nl/api/billing/stripe/webhook`
- **Events to subscribe to:**
  - `checkout.session.completed`
  - `checkout.session.async_payment_succeeded`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `customer.subscription.paused`
  - `customer.subscription.resumed`

The `checkout.session.async_payment_succeeded` event is required for iDEAL and other asynchronous payment methods where the payment confirmation arrives after the checkout session completes.

## Flow

```
User on calvora.nl/prijzen
  ↓  (optionally arrived with ?uid=<firebaseUid>&email=<email>)
POST /api/stripe/checkout  { plan, uid?, email? }
  ↓
Stripe Checkout Session created with:
  - client_reference_id = firebaseUid (if available)
  - metadata.firebaseUid = firebaseUid (if available)
  - subscription_data.metadata.firebaseUid = firebaseUid (if available)
  - customer_email = email (if available)
  ↓
User completes payment on Stripe
  ↓
Redirect to /betaling/succes?session_id=cs_xxx
  ↓
"Inloggen" button links to:
  https://app.calvora.nl/login?session_id=cs_xxx
  ↓
App claims the session on login via:
  POST https://app.calvora.nl/api/billing/stripe/claim-session
```

### Linking strategies (app-side, in priority order)

1. **Direct UID match** — `client_reference_id` / `metadata.firebaseUid` on the checkout session matches a Firebase user.
2. **Session claim at login** — User logs in via `/login?session_id=…`, app calls `claim-session` to link the Stripe customer to the Firebase user.
3. **Email fallback** — `customer_email` on the Stripe customer matches the Firebase user's email.

## Test vs Live Key Alignment

- Test keys start with `sk_test_` / `pk_test_`
- Live keys start with `sk_live_` / `pk_live_`
- The server logs the key prefix (first 7 chars) on every checkout session creation for debugging — full keys are never logged.
- When switching to production, update all environment variables on both the website and the app simultaneously.
