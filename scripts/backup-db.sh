#!/usr/bin/env bash
set -euo pipefail

# Dump DATABASE_URL to backups/ directory
if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL not set"; exit 1
fi

mkdir -p backups
OUT=backups/backup-$(date +%F-%H%M%S).sql.gz

echo "Dumping database to $OUT"
pg_dump "$DATABASE_URL" | gzip > "$OUT"

echo "Dump complete: $OUT"
