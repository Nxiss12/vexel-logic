Render deployment guide

1) Create two services on Render
   - Service 1: `vexel-missed-call-bot-staging`
     - Type: Web Service
     - Environment: Docker
     - Branch: `release/auto-deploy`
     - Auto deploy: Enabled
     - Health check path: `/healthz`
     - Instance: Starter
     - Set env vars (use Environment tab -> Add Secret): copy values from `.env.example` and fill secrets

   - Service 2: `vexel-missed-call-bot-production`
     - Type: Web Service
     - Environment: Docker
     - Branch: `main`
     - Auto deploy: Disabled (manual deploys only)
     - Health check path: `/healthz`
     - Enable manual promotion from staging

2) Health checks and rollback
   - Use `/healthz` for liveness/readiness checks.
   - Configure "Rollback on failed deploy" in Render service settings.

3) Secrets
   - In Render dashboard, open Service -> Environment -> Add Secret
   - Add all keys listed in `.env.example` (do not commit secrets)

   - Stripe: ensure `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, and `STRIPE_PRICE_ID` are set. Create a recurring price in the Stripe Dashboard and copy its `price_...` id into `STRIPE_PRICE_ID`.

4) Databases & Migrations
   - Provide `DATABASE_URL` env var connected to your managed Postgres or Supabase.
   - Run migrations in staging: `npm run migrate` (or `node db/migrate.js`).
   - Set up backups via your DB provider (e.g., Render Postgres automatic backups); ensure retention policy.
   - To run manual backups, a helper script exists at `scripts/backup-db.sh`. You can run it in a cron job or Render Scheduled Job.

5) Webhooks
   - Configure Twilio webhooks to: `https://<your-backend>/webhook/missed-call` and `https://<your-backend>/webhook/sms-reply`
   - Configure Stripe webhook endpoint to `https://<your-backend>/webhook/stripe` and set `STRIPE_WEBHOOK_SECRET`.

   - Testing Stripe webhooks (recommended):
     - Install the Stripe CLI and run `stripe listen --forward-to https://<your-backend>/webhook/stripe`.
     - Trigger test events, e.g. `stripe trigger checkout.session.completed` to exercise the `checkout.session.completed` flow.

6) Health verification
   - After deploy, verify `/healthz`, `/api/stats` (requires login), and `/api/workflow-requests` (requires login).

