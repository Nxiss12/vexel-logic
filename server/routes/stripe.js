const express = require('express');
const stripeLib = (() => {
  try {
    return require('stripe')(process.env.STRIPE_SECRET_KEY);
  } catch (e) {
    return null;
  }
})();
const { db } = require('../lib/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// For non-webhook routes we can use JSON
router.post('/create-checkout-session', authenticateToken, async (req, res) => {
  if (!stripeLib) return res.status(503).json({ error: 'Stripe not configured' });
  try {
    const { priceId, successUrl, cancelUrl } = req.body;
    const userId = req.user.userId;

    let user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    user = user.rows[0];

    let customerId = user.stripe_customer_id;
    if (!customerId) {
      const customer = await stripeLib.customers.create({
        email: user.email,
        metadata: { userId: user.id }
      });
      customerId = customer.id;
      await db.query('UPDATE users SET stripe_customer_id = $1 WHERE id = $2', [customerId, userId]);
    }

    const session = await stripeLib.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { userId: user.id }
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook: must use raw body for Stripe signature
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      if (!stripeLib) throw new Error('Stripe not configured');
      if (webhookSecret) {
        event = stripeLib.webhooks.constructEvent(req.body, sig, webhookSecret);
      } else {
        // If no webhook secret provided, attempt to parse body
        event = JSON.parse(req.body.toString());
      }
    } catch (err) {
      console.error('Webhook signature verification failed or parsing error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed':
          // TODO: handle checkout session completed (store subscription/customer info)
          console.log('checkout.session.completed', event.data.object.id);
          break;
        // handle subscription events, etc.
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
      res.json({ received: true });
    } catch (error) {
      console.error('Webhook handler error:', error);
      res.status(500).send('Webhook handler failed');
    }
  }
);

module.exports = router;
