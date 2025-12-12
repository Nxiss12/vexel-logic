#!/usr/bin/env bash
set -euo pipefail
TARGET=${1:-${TARGET_URL:-}}
if [ -z "$TARGET" ]; then
  echo "Usage: $0 <target-url> or set TARGET_URL env var";
  exit 2;
fi

echo "Waiting for ${TARGET}/healthz to become available..."
for i in {1..30}; do
  if curl --silent --fail "$TARGET/healthz" >/dev/null 2>&1; then
    echo "Endpoint is healthy"
    break
  fi
  echo "Still waiting... ($i)"
  sleep 2
done

echo "Running smoke tests against $TARGET"
bash ./missed-call-bot/test-smoke.sh "$TARGET"

echo "Smoke tests finished"
