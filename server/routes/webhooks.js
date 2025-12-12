const express = require('express');
let twilioLib = null;
try {
  twilioLib = require('twilio');
} catch (e) {
  // twilio not available in dev; we'll skip signature validation
}

let Queue = null;
let Redis = null;
let missedCallQueue = null;
try {
  Queue = require('bullmq').Queue;
  Redis = require('ioredis');
  const redisConnection = new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: null });
  missedCallQueue = new Queue('missed-calls', { connection: redisConnection });
} catch (e) {
  // If bullmq or redis isn't available, we'll provide a no-op queue that processes immediately
  missedCallQueue = {
    add: async (name, data, opts) => {
      // best-effort immediate processing
      const proc = require('../workers/missedCallProcessor');
      try {
        await proc.processMissedCall({ data });
        return { id: `local-${Date.now()}` };
      } catch (err) {
        console.error('Local missed call processing failed', err.message || err);
        throw err;
      }
    }
  };
}

const router = express.Router();

function validateTwilioRequest(req, res, next) {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioSignature = req.headers['x-twilio-signature'];
  if (!twilioSignature) return res.status(400).send('Missing Twilio signature');

  if (!twilioLib) {
    console.warn('Twilio library not installed; skipping signature validation');
    return next();
  }

  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const isValid = twilioLib.validateRequest(authToken, twilioSignature, url, req.body);

  if (!isValid) return res.status(403).send('Invalid Twilio signature');
  next();
}

router.post(
  '/twilio',
  express.urlencoded({ extended: false }),
  validateTwilioRequest,
  async (req, res) => {
    try {
      const { From, To, CallStatus, CallDuration, CallSid } = req.body;

      if (CallStatus === 'completed' || CallStatus === 'no-answer') {
        await missedCallQueue.add(
          'process-missed-call',
          {
            from: From,
            to: To,
            callStatus: CallStatus,
            callDuration: CallDuration || 0,
            callSid: CallSid
          },
          {
            jobId: CallSid,
            attempts: 3,
            backoff: { type: 'exponential', delay: 2000 }
          }
        );
      }

      res.status(200).send('OK');
    } catch (error) {
      console.error('Twilio webhook error:', error);
      res.status(500).send('Internal error');
    }
  }
);

module.exports = router;
