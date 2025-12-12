#!/usr/bin/env bash
set -euo pipefail
BASE=${1:-http://localhost:3000}

echo "1) Attempt login with default creds"
TOKEN=$(curl -s -X POST "$BASE/api/login" -H "Content-Type: application/json" -d '{"email":"admin@vexellogic.com","password":"password123"}' | jq -r .token)
if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
  echo "Login failed"; exit 2;
fi

echo "Got token: ${TOKEN:0:8}..."

echo "2) Submit workflow request"
curl -s -X POST "$BASE/api/workflow-request" \
  -H "Content-Type: application/json" \
  -d '{"workflow_name":"Smoke Test","description":"Test insert","trigger":"manual","tools":"test","actions":"1","email":"test@example.com"}' | jq

echo "3) List workflow requests (requires token)"
curl -s -X GET "$BASE/api/workflow-requests" -H "Authorization: Bearer $TOKEN" | jq '.items | length'

echo "SMOKE TESTS COMPLETED"
