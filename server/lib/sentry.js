let Sentry = {
  Handlers: {
    requestHandler: () => (req, res, next) => next(),
    tracingHandler: () => (req, res, next) => next(),
    errorHandler: () => (err, req, res, next) => next(err)
  }
};

function initSentry() {
  if (process.env.SENTRY_DSN) {
    try {
      const sentry = require('@sentry/node');
      sentry.init({ dsn: process.env.SENTRY_DSN });
      Sentry = sentry;
    } catch (err) {
      // If @sentry/node isn't installed, keep the noop Sentry
      console.warn('Sentry not available; skipping initialization');
    }
  }
}

module.exports = { initSentry, Sentry };
