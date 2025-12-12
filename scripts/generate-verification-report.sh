#!/usr/bin/env bash
set -euo pipefail
BASE=${1:-http://localhost:3000}
OUT=${2:-verification-report.md}

echo "# Verification Report" > "$OUT"
echo "Base URL: $BASE" >> "$OUT"

echo "\n## Health Check" >> "$OUT"
HTTP=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/healthz")
if [ "$HTTP" = "200" ]; then echo "- /healthz: OK" >> "$OUT"; else echo "- /healthz: FAIL ($HTTP)" >> "$OUT"; fi

echo "\n## Smoke Tests" >> "$OUT"
if ./missed-call-bot/test-smoke.sh "$BASE"; then echo "- Smoke tests: OK" >> "$OUT"; else echo "- Smoke tests: FAIL" >> "$OUT"; fi

if command -v docker >/dev/null 2>&1; then
  echo "\n## k6 Load Test" >> "$OUT"
  if docker run --rm -v "$PWD:/src" -w /src/missed-call-bot loadimpact/k6 run /src/missed-call-bot/loadtest.js; then
    echo "- k6: OK" >> "$OUT";
  else
    echo "- k6: FAIL" >> "$OUT";
  fi
else
  echo "\n## k6 Load Test" >> "$OUT"
  echo "- k6: SKIPPED (docker not available)" >> "$OUT"
fi

# Append to TOMS-IMPROVEMENTS
git add "$OUT"
git commit -m "docs: add verification report for $BASE" || true

echo "Verification report written to $OUT"; cat "$OUT"
