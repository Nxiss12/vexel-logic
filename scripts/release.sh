#!/usr/bin/env bash
set -euo pipefail

TARGET_URL="${TARGET_URL:-http://localhost:3000}"
SMOKE_TEST_USER="${SMOKE_TEST_USER:-admin@test.com}"
SMOKE_TEST_PASSWORD="${SMOKE_TEST_PASSWORD:-TestPass123!}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

TESTS_PASSED=0
TESTS_FAILED=0

log_pass() { echo -e "${GREEN}✓ $1${NC}"; TESTS_PASSED=$((TESTS_PASSED+1)); }
log_fail() { echo -e "${RED}✗ $1${NC}"; TESTS_FAILED=$((TESTS_FAILED+1)); }

test_http() {
  local name="$1"
  local method="$2"
  local path="$3"
  local expected="$4"
  local opts="${5:-}"

  echo -e "${YELLOW}Test: ${name}${NC}"
  local resp status
  resp=$(eval "curl -s -w '\n%{http_code}' -X ${method} ${opts} '${TARGET_URL}${path}'")
  status=$(echo "$resp" | tail -n1)
  body=$(echo "$resp" | head -n-1)

  if [ "$status" = "$expected" ]; then
    log_pass "${name} (status ${status})"
  else
    log_fail "${name} (expected ${expected}, got ${status})"
    echo "Body: $body"
  fi
}

echo "Running smoke tests against ${TARGET_URL}"

test_http "Healthz" GET "/api/healthz" 200
test_http "Ready" GET "/api/ready" 200

login_resp=$(curl -s -X POST "${TARGET_URL}/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${SMOKE_TEST_USER}\",\"password\":\"${SMOKE_TEST_PASSWORD}\"}")
access_token=$(echo "$login_resp" | grep -o '"accessToken":"[^"]*' | sed 's/"accessToken":"//')
refresh_token=$(echo "$login_resp" | grep -o '"refreshToken":"[^"]*' | sed 's/"refreshToken":"//')

if [ -n "${access_token:-}" ]; then
  log_pass "Login"
else
  log_fail "Login"
  echo "Body: $login_resp"
fi

AUTH_HEADER="-H 'Authorization: Bearer ${access_token}'"

test_http "Dashboard" GET "/api/dashboard" 200 "${AUTH_HEADER}"

workflow_body='{"profession":"plumber","name":"Smoke Test","email":"smoke@test.com","phone":"+15555551234","zipCode":"94102","message":"Smoke test workflow"}'
test_http "Create workflow" POST "/api/workflows" 201 "-H 'Content-Type: application/json' ${AUTH_HEADER} -d '${workflow_body}'"

test_http "Admin workflows list" GET "/api/admin/workflows?page=1&limit=10" 200 "${AUTH_HEADER}"

if [ -n "${STRIPE_SECRET_KEY:-}" ]; then
  stripe_body="{\"priceId\":\"${STRIPE_PRO_PRICE_ID:-price_test}\",\"successUrl\":\"${TARGET_URL}/success\",\"cancelUrl\":\"${TARGET_URL}/cancel\"}"
  test_http "Stripe checkout" POST "/api/stripe/create-checkout-session" 200 "-H 'Content-Type: application/json' ${AUTH_HEADER} -d '${stripe_body}'"
else
  echo -e "${YELLOW}Stripe test skipped (no STRIPE_SECRET_KEY)${NC}"
fi

twilio_form="From=%2B15555551234&To=%2B15555556789&CallStatus=completed&CallDuration=30&CallSid=SMOKETEST$(date +%s)"
test_http "Twilio webhook" POST "/api/webhooks/twilio" 200 "-H 'Content-Type: application/x-www-form-urlencoded' -d '${twilio_form}'"

test_http "Sentry test" GET "/api/test/sentry-error" 500

if [ -n "${refresh_token:-}" ]; then
  refresh_body="{\"refreshToken\":\"${refresh_token}\"}"
  test_http "Refresh token" POST "/api/auth/refresh" 200 "-H 'Content-Type: application/json' -d '${refresh_body}'"
fi

echo
echo "Smoke tests summary: ${GREEN}${TESTS_PASSED} passed${NC}, ${RED}${TESTS_FAILED} failed${NC}"

mkdir -p ./reports
cat > ./reports/smoke_summary.txt <<EOF
Target: ${TARGET_URL}
Passed: ${TESTS_PASSED}
Failed: ${TESTS_FAILED}
Timestamp: $(date -Iseconds)
EOF

if [ "$TESTS_FAILED" -gt 0 ]; then
  exit 1
fi
