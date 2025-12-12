Runbook: Missed Call Bot

Health checks
- Liveness: GET /healthz -> 200
- Basic status: GET /health -> JSON status

If service is unhealthy
1. Check Render logs
2. Check recent deploys and roll back to previous stable release
3. SSH into container (if available) and run `npm run migrate` and check envs
4. Restart service

Backups & Restore
- Database backups: configure via managed DB provider
- To restore from dump:
  - `psql $DATABASE_URL < dump.sql`

Rolling back a migration
- Revert migration SQL and re-run `npm run migrate` on a safe branch

Emergency contact: ben@vexellogic.com

Local troubleshooting:
- If Node is not available locally, run the service in Docker: `docker build -t vexel-missed-call-bot . && docker run -p 3000:3000 -e NODE_ENV=production -e PORT=3000 -e ADMIN_EMAIL=admin@vexellogic.com -e ADMIN_PASSWORD=password123 vexel-missed-call-bot`
