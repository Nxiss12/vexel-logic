const twilioLib = (() => {
  try {
    return require('twilio')(process.env.TWILIO_AUTH_TOKEN, { accountSid: process.env.TWILIO_ACCOUNT_SID });
  } catch (e) {
    return null;
  }
})();

async function processMissedCall(job) {
  const data = job.data || job;
  console.log('Processing missed call:', data);

  if (twilioLib && process.env.TWILIO_FROM_NUMBER) {
    try {
      const to = data.from;
      const message = `Sorry we missed your call. Please reply to this message or call us back at ${process.env.TWILIO_FROM_NUMBER}`;
      await twilioLib.messages.create({ body: message, from: process.env.TWILIO_FROM_NUMBER, to });
      console.log('Sent follow-up SMS to', to);
    } catch (err) {
      console.error('Failed to send follow-up SMS:', err.message || err);
      throw err;
    }
  } else {
    console.log('Twilio not configured; skipping SMS send. Data:', data);
  }
}

module.exports = { processMissedCall };
