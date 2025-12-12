## Release Candidate Checklist

- [ ] Review diffs in `release/auto-deploy`
- [ ] Confirm Env variables set in staging (see DEPLOY.md)
- [ ] Confirm `STAGING_URL` and `RENDER_*` secrets exist in repo
- [ ] Run CI staging deploy and verify smoke tests pass
- [ ] Review `verification-report.md` artifact (checks: /healthz, smoke, k6)
- [ ] Verify Sentry received test errors (check for `/debug-sentry`)
- [ ] Confirm webhooks configured in Twilio and Stripe with correct endpoints
- [ ] Run manual signup / checkout flow and confirm webhook handling
- [ ] When ready, use `Deploy Production` workflow to promote to production

**Notes:** Add any manual testing results here.
