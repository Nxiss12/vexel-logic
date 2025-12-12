<!--
  TOMS-IMPROVEMENTS.md
  A running log of improvements, changes, and actions taken in partnership with the assistant.
  This file is automatically appended to by a git hook (see `.husky/post-commit`).
-->

# Tom's Improvements

Created: 2025-12-12

This document records important changes, decisions, and tasks performed in the repository while working with the assistant.

## Current snapshot

- Branch: `release/auto-deploy`
- Key areas completed: auth hardening (JWT + refresh rotation), Stripe webhook & checkout integration, SendGrid notifications, Twilio webhook protection and retry queue, DB migrations and backup helper, Dockerfile, CI workflows for staging and production, smoke tests, Sentry integration, admin UI pagination and request management, multiple docs updates (DEPLOY, RUNBOOK, READMEs).

## How entries are recorded

- After each commit, a Husky `post-commit` hook runs `scripts/log-improvement.sh` which appends the latest commit metadata and changed files to this file and commits that change automatically. Commits that update this file are tagged with a message that starts with `docs: update TOMS-IMPROVEMENTS` and are ignored by the hook to avoid recursion.

---

## Entries (auto-generated)

<!-- New entries appended here by `scripts/log-improvement.sh` -->
