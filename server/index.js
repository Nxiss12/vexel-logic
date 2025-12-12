const express = require('express');
const cookieParser = require('cookie-parser');
const { db } = require('./lib/database');
const redisClient = require('./lib/redis');
const { initSentry, Sentry } = require('./lib/sentry');
const { logRequest } = require('./lib/logger');

initSentry();

const app = express();

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(cookieParser());
app.use(logRequest);

// Health and readiness
app.get('/api/healthz', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/ready', async (req, res) => {
  try {
    await db.query('SELECT 1');
    await redisClient.ping();
    res.status(200).json({
      status: 'ready',
      components: {
        db: 'ok',
        redis: 'ok'
      }
    });
  } catch (err) {
    res.status(503).json({
      status: 'not_ready',
      error: err.message
    });
  }
});

// Mount routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stripe', require('./routes/stripe'));
app.use('/api/webhooks', require('./routes/webhooks'));
app.use('/api/admin', require('./routes/admin'));

app.get('/api/test/sentry-error', () => {
  throw new Error('Test Sentry error');
});

app.use(Sentry.Handlers.errorHandler());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend listening on ${port}`);
});

module.exports = app;
