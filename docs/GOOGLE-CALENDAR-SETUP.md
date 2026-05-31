# Google Calendar integration — setup & security design

Per-doctor "Connect Google Calendar". When a doctor is connected, each new
booking creates an event on **their** Google Calendar (blocking that slot) with
the appointment details. The doctor's Google identity/token is admin-only and
**never** shown in the customer UI.

## What you must create (only you can — these are your Google credentials)

1. **Google Cloud project** → https://console.cloud.google.com → New Project ("Om Sai Dental").
2. **Enable the Google Calendar API**: APIs & Services → Library → "Google Calendar API" → Enable.
3. **OAuth consent screen**: External, app name "Om Sai Dental Admin", add your
   email as a test user (and the doctors' emails). Scopes: `.../auth/calendar.events`.
4. **OAuth client ID** (Web application):
   - Authorized redirect URI:
     `https://om-sai-dental.codejatraa.workers.dev/admin/integrations/google/callback`
     (add your custom domain's equivalent later)
   - Copy the **Client ID** and **Client Secret**.
5. **An app encryption key** for the token-at-rest (generate, keep secret):
   `openssl rand -base64 32`

Hand me (or set as Worker secrets — do NOT paste secrets in chat; use
`wrangler secret put`):

| Secret | Source |
|--------|--------|
| `GOOGLE_OAUTH_CLIENT_ID` | step 4 |
| `GOOGLE_OAUTH_CLIENT_SECRET` | step 4 |
| `GOOGLE_OAUTH_REDIRECT_URI` | the URI in step 4 |
| `TOKEN_ENCRYPTION_KEY` | step 5 (`openssl rand -base64 32`) |

> ⚠ None of these are `NEXT_PUBLIC_*`. They are server-only Worker secrets,
> readable only by server actions/route handlers.

## Security design (how the token is kept safe)

- **Connect flow:** admin clicks "Connect Google" on a doctor → server route
  starts OAuth (offline access, consent) → Google redirects to the callback →
  server exchanges the code for a **refresh token**.
- **At rest:** the refresh token is **AES-256-GCM encrypted** with
  `TOKEN_ENCRYPTION_KEY` *before* being stored. The DB only ever holds ciphertext.
- **Where:** a new table `practitioner_google` (one row per doctor):
  `practitioner_id`, `google_email`, `refresh_token_enc` (bytea/text ciphertext),
  `calendar_id`, `connected_at`.
  - **RLS:** `select`/`all` **only** `is_admin()`. No `anon`/customer access.
    `refresh_token_enc` is never selected by any customer-facing query and never
    returned to the browser — decryption happens only inside a server action that
    is about to call Google.
  - The customer UI joins to `practitioners` only (name, photo, bio) — it has no
    visibility into `practitioner_google` at all.
- **In transit / logs:** tokens are never logged, never put in URLs, never sent
  to the client. Booking → a server action decrypts the token in-memory, calls
  the Calendar API, discards it.
- **Revoke:** admin "Disconnect" deletes the row (and optionally revokes at Google).

## Booking → calendar event

On a successful booking for a connected doctor, a server step inserts a Calendar
event (start/end from the appointment, summary "Appointment — {patient}", the
patient's contact in the description, status busy → blocks the slot). Failures
are non-fatal to the booking (logged, retried) so a calendar hiccup never loses a
real booking.

## Status

- [ ] You: create the Google Cloud project + OAuth client + encryption key (above)
- [ ] You: set the 4 Worker secrets via `wrangler secret put`
- [ ] Me: build the connect/callback routes, `practitioner_google` table + RLS,
      AES-GCM encrypt/decrypt helper, and the booking→event step
- [ ] Me: run the `security-review` skill over the credential-handling code
- [ ] Both: smoke-test a real booking lands on the doctor's calendar
