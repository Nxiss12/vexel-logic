Runbook: Missed Call Bot

Health checks
- Liveness: GET /healthz -> 200
- Basic status: GET /health -> JSON status

If service is unhealthy
1. Check Render logs
2. Check recent deploys and roll back to previous stable release
3. SSH into container (if available) and run `npm run migrate` and check envs
4. Restart service
Local deploy & release verification
- Build and run with Docker:
  - `docker build -t vexel-missed-call-bot .`
  - `docker run -e NODE_ENV=production -e PORT=3000 -e ADMIN_EMAIL=admin@vexellogic.com -e ADMIN_PASSWORD=password123 -p 3000:3000 vexel-missed-call-bot`
- Run migrations locally inside container or image:
  - `docker run --rm -e DATABASE_URL="$DATABASE_URL" vexel-missed-call-bot npm run migrate`
- Run smoke tests against a running endpoint:
  - `./release.sh http://localhost:3000`

Backups & Restore
- Database backups: configure via managed DB provider
- To restore from dump:
  - `psql $DATABASE_URL < dump.sql`

Scheduled backups:
- Use `scripts/backup-db.sh` to create timestamped SQL dumps in the `backups/` directory.
- On Render, create a Scheduled Job that runs `bash ./scripts/backup-db.sh` and stores artifacts in a connected volume or external storage. Alternatively, run a cron on an external runner that has `DATABASE_URL` and S3 credentials and upload dumps offsite.

Rolling back a migration
- Revert migration SQL and re-run `npm run migrate` on a safe branch

Emergency contact: ben@vexellogic.com

Monitoring & Sentry
- Configure `SENTRY_DSN` in your service envs and `SENTRY_AUTH_TOKEN` as a repository secret to allow CI to create releases and upload source maps (if used).
- To test Sentry capture: hit `/debug-sentry` (this endpoint throws an error which should appear in Sentry). Use the Sentry UI to create alert rules (e.g., on error rate > 1% over 5m) and set email or Slack actions.

Performance & Load Testing
- A `k6` script exists at `missed-call-bot/loadtest.js`. You can run it locally with Docker:

```bash
docker run --rm -v "$PWD:/src" -w /src/missed-call-bot loadimpact/k6 run /src/missed-call-bot/loadtest.js
```

- In CI, the staging workflow runs `k6` after smoke tests when `STAGING_URL` is configured.

Verification Report
- Use `scripts/generate-verification-report.sh` to run the standard release checks and produce a `verification-report.md` summarizing results (created by CI or locally).

Local troubleshooting:
- If Node is not available locally, run the service in Docker: `docker build -t vexel-missed-call-bot . && docker run -p 3000:3000 -e NODE_ENV=production -e PORT=3000 -e ADMIN_EMAIL=admin@vexellogic.com -e ADMIN_PASSWORD=password123 vexel-missed-call-bot`
