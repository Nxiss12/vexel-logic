#!/usr/bin/env bash
set -euo pipefail
BASE=${1:-http://localhost:3000}

echo "Checking /healthz..."
HTTP=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/healthz")
if [ "$HTTP" != "200" ]; then
  echo "Health check failed: $HTTP"; exit 2; fi

echo "Running smoke tests..."
(cd missed-call-bot && ./test-smoke.sh $BASE)

echo "Triggering Sentry test endpoint (should 500)..."
set +e
curl -s -X GET "$BASE/debug-sentry" -I
set -e

echo "Release checks complete"
