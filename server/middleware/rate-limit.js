const LRU = require('lru-cache');

// Simple in-memory rate limiter for auth endpoints. Keyed by IP.
const opts = { max: 5000, ttl: 1000 * 60 * 5 };
const store = new LRU(opts);

function authRateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress || 'global';
  let entry = store.get(ip) || { count: 0, last: Date.now() };
  if (Date.now() - entry.last > 60 * 1000) {
    entry.count = 0;
    entry.last = Date.now();
  }
  entry.count += 1;
  store.set(ip, entry);
  if (entry.count > 20) {
    res.status(429).json({ error: 'Too many requests' });
    return;
  }
  next();
}

module.exports = { authRateLimiter };
