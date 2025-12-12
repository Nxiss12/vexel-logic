import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 20,
  duration: '30s',
};

export default function () {
  const res = http.get(`${__ENV.BASE_URL || 'http://localhost:3000'}/healthz`);
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
