let client = null;

async function ping() {
  if (process.env.REDIS_URL) {
    try {
      const redis = require('redis');
      if (!client) {
        client = redis.createClient({ url: process.env.REDIS_URL });
        client.on('error', () => {});
        await client.connect();
      }
      return client.ping();
    } catch (err) {
      // ignore and fallthrough
    }
  }
  return Promise.resolve('PONG');
}

module.exports = { ping };
