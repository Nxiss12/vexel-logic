# Stripe Setup Guide

## Overview

Configure Stripe to accept payments for VexelLogic packages with the new pricing structure (setup fees + monthly subscriptions).

**Pricing Model:**
- Starter: £4,997 setup + £497/month subscription
- Professional: £12,997 setup + £997/month subscription
- Enterprise: Custom pricing

**Estimated Time:** 30-45 minutes

---

## Step 1: Create Stripe Account

1. Go to https://stripe.com/
2. Click "Sign Up"
3. Fill in business details:
   - Business name: VexelLogic Ltd
   - Country: United Kingdom
   - Industry: Business Support Services
4. Verify email
5. Complete identity verification (required for live payments)

---

## Step 2: Create Products & Prices

### Create Starter Package

1. Go to Stripe Dashboard → Products
2. Click "Add Product"
3. Fill in:

**Product Details:**
- Name: `Vexel Logic - Starter`
- Description: `Single-function optimization. 1 core intelligent automation system with ongoing support.`
- Image: Upload logo or product image (optional)

**Pricing:**
You need to create TWO prices for this product:

**Price 1: Setup Fee**
- Price: `£4,997`
- Billing: `One time`
- Price ID will be: `price_xxxxxxxxxxxxx` (copy this!)

Click "Add another price"

**Price 2: Monthly Subscription**
- Price: `£497`
- Billing: `Recurring - Monthly`
- Price ID will be: `price_yyyyyyyyyyy` (copy this!)

4. Click "Save Product"

### Create Professional Package

Repeat the process:

**Product Details:**
- Name: `Vexel Logic - Professional`
- Description: `Comprehensive workforce optimization. 3 integrated systems with dedicated success manager.`

**Price 1: Setup Fee**
- Price: `£12,997`
- Billing: `One time`
- Copy Price ID

**Price 2: Monthly Subscription**
- Price: `£997`
- Billing: `Recurring - Monthly`
- Copy Price ID

---

## Step 3: Get Your API Keys

### Test Mode Keys (Start Here)

1. In Stripe Dashboard, ensure you're in "Test Mode" (toggle in top right)
2. Go to Developers → API Keys
3. Copy:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`)

### Store Safely

Add to your password manager or environment variables (never commit to git!)

---

## Step 4: Create Checkout Sessions

You have two options for payment collection:

### Option A: Payment Links (Easiest - No Code)

1. Go to Products → Select "Starter"
2. Click "Create payment link"
3. Select BOTH prices (setup + subscription)
4. Configure:
   - Collect customer info: Yes
   - Collect billing address: Yes
   - After payment: Redirect to success URL
5. Copy the payment link

Repeat for Professional package.

**Use these links in:**
- Email proposals
- Sales conversations
- Website (if you add buy buttons)

### Option B: Checkout API (More Control - Requires Code)

Update `backend/server.js` with Stripe Checkout integration:

```javascript
// Add this endpoint to server.js

app.post('/api/create-checkout-session', async (req, res) => {
    const { package_type, email, name } = req.body;
    
    // Define price IDs (from Step 2)
    const priceIds = {
        starter: {
            setup: 'price_xxxxxxxxxxxxx', // Your actual Starter setup price ID
            monthly: 'price_yyyyyyyyyyy'  // Your actual Starter monthly price ID
        },
        professional: {
            setup: 'price_xxxxxxxxxxxxx', // Your actual Professional setup price ID
            monthly: 'price_yyyyyyyyyyy'  // Your actual Professional monthly price ID
        }
    };
    
    const prices = priceIds[package_type];
    
    if (!prices) {
        return res.status(400).json({ error: 'Invalid package type' });
    }
    
    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            payment_method_types: ['card'],
            line_items: [
                {
                    price: prices.setup,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.SITE_URL}/`,
            metadata: {
                customer_name: name,
                package: package_type,
            },
        });
        
        res.json({ sessionId: session.id, url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

---

## Step 5: Set Up Webhooks

Webhooks notify your backend when payments succeed, subscriptions renew, etc.

### Create Webhook Endpoint

1. Go to Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-backend-url.railway.app/api/webhook/stripe`
4. Description: "VexelLogic payment notifications"
5. Events to send:
   - `checkout.session.completed`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.deleted`
6. Click "Add endpoint"

### Get Webhook Signing Secret

1. Click on your new webhook
2. Copy the "Signing secret" (starts with `whsec_...`)
3. Add to Railway environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### Add Webhook Handler to Backend

```javascript
// Add this to server.js

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.post('/api/webhook/stripe', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
        return res.sendStatus(400);
    }
    
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log(`Payment successful for ${session.customer_email}`);
            
            // TODO: Send welcome email, create client record, etc.
            // await sendWelcomeEmail(session.customer_email);
            // await createClientRecord(session);
            
            break;
            
        case 'invoice.paid':
            // Subscription payment successful
            console.log('Subscription payment received');
            break;
            
        case 'invoice.payment_failed':
            // Subscription payment failed
            console.log('Subscription payment failed');
            // TODO: Send payment failure email
            break;
            
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    
    res.json({received: true});
});
```

---

## Step 6: Add Stripe Keys to Backend

### Update Railway Environment Variables

1. Go to Railway dashboard
2. Click "Variables"
3. Add:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLIC_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
4. Backend will automatically redeploy

---

## Step 7: Test Payments

### Use Stripe Test Cards

**Successful Payment:**
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

**Declined Payment:**
```
Card Number: 4000 0000 0000 0002
```

### Testing Workflow

1. Create a test payment link or checkout session
2. Use test card to complete payment
3. Check:
   - Payment appears in Stripe Dashboard (Payments tab)
   - Webhook fires (check Railway logs)
   - Email sent to customer (if configured)

---

## Step 8: Go Live (When Ready)

### Before Switching to Live Mode:

- [ ] Test payments working perfectly
- [ ] Webhook handling implemented
- [ ] Email notifications working
- [ ] Identity verification complete in Stripe
- [ ] Business bank account connected

### Switch to Live Mode:

1. In Stripe Dashboard, toggle from "Test Mode" to "Live Mode"
2. Go to Developers → API Keys
3. Copy **Live** keys:
   - Publishable key (`pk_live_...`)
   - Secret key (`sk_live_...`)
4. Update Railway environment variables with live keys
5. Recreate webhook for live mode (same process as test)
6. Test with small real payment

---

## Pricing Reference

### Starter Package
- **Setup Fee:** £4,997 (one-time)
- **Monthly Fee:** £497/month (recurring)
- **Stripe Price IDs:**
  - Setup: `price_starter_setup`
  - Monthly: `price_starter_monthly`

### Professional Package
- **Setup Fee:** £12,997 (one-time)
- **Monthly Fee:** £997/month (recurring)
- **Stripe Price IDs:**
  - Setup: `price_professional_setup`
  - Monthly: `price_professional_monthly`

### Enterprise Package
- **Custom Pricing:** Send invoice manually or use Stripe Invoicing
- Process: Custom quote → Manual invoice → Bank transfer or Stripe invoice link

---

## Payment Collection Workflow

### Option 1: Two-Step (Recommended for Pilots)

**Step 1: Setup Fee**
- Send payment link for setup fee (50% or 100%)
- Collect payment before starting work
- Confirms commitment

**Step 2: Monthly Subscription**
- After project delivery (Day 30), send subscription link
- Or set up subscription at start with 3-month trial for pilots

### Option 2: One-Step (For Production)

- Collect setup fee + start subscription immediately
- Subscription begins after setup fee is paid
- Pilot customers: Use coupon code for "3 months free"

---

## Stripe Coupons for Pilots

### Create 50% Off Coupon

1. Go to Products → Coupons
2. Click "Create coupon"
3. Configure:
   - Name: `PILOT50`
   - Discount: `50% off`
   - Duration: `Once` (applies to setup fee only)
   - Redemptions: Limited to 5
4. Save and share code with pilot customers

### Create 3 Months Free Subscription

1. Create coupon:
   - Name: `PILOT3MONTHS`
   - Discount: `100% off`
   - Duration: `Repeating - 3 months`
   - Applies to: Subscription products only
2. Apply when setting up subscriptions for pilot customers

---

## Troubleshooting

### Problem: Webhook not firing

**Check:**
- Webhook URL is correct (https://your-backend.railway.app/api/webhook/stripe)
- Webhook signing secret is correct in environment variables
- Endpoint is accessible (test with curl or Postman)

**Solution:**
- Use Stripe CLI to test locally: `stripe listen --forward-to localhost:3000/api/webhook/stripe`

### Problem: Payment succeeded but no email sent

**Check:**
- Webhook handler is processing `checkout.session.completed` event
- Email sending code is implemented
- SMTP credentials are correct
- Check Railway logs for errors

### Problem: Card declined in test mode

**Solution:**
- Use correct test card: 4242 4242 4242 4242
- If testing decline, use: 4000 0000 0000 0002

---

## Security Best Practices

### Do's ✅
- Always use environment variables for API keys
- Verify webhook signatures
- Use HTTPS for all payment pages
- Implement proper error handling
- Log all payment events

### Don'ts ❌
- Never expose secret keys in frontend code
- Never skip webhook signature verification
- Never store full card numbers
- Never process payments without SSL
- Never use test keys in production

---

## Stripe Dashboard Overview

### Key Sections

**Payments:**
- View all payments (successful and failed)
- Issue refunds
- Export payment data

**Customers:**
- View all customers
- See payment history per customer
- Manage subscriptions

**Subscriptions:**
- Active subscriptions
- Pause or cancel subscriptions
- Update billing

**Products:**
- Manage your products and pricing
- Create new products/prices
- Update descriptions

**Developers:**
- API keys
- Webhooks
- Logs (see all API requests)
- Events (see all webhook events)

---

## Monthly Costs

### Stripe Fees

**Standard:**
- 1.5% + 20p per successful card charge (UK)

**Example:**
- Starter setup (£4,997): Fee = £95.76
- Starter monthly (£497): Fee = £9.66/month
- Professional setup (£12,997): Fee = £194.96
- Professional monthly (£997): Fee = £19.16/month

**Total fee: ~2-2.5% of revenue**

### Reducing Fees

- High volume? Contact Stripe for custom pricing
- ACH/bank transfer: Lower fees but slower
- Annual billing: Reduces per-transaction fees

---

## Next Steps

1. ✅ Stripe account created
2. ✅ Products and pricing configured
3. ✅ API keys obtained
4. ✅ Webhook set up
5. ⏭️ Test payments with test cards
6. ⏭️ Implement payment collection in proposals
7. ⏭️ Go live when ready

---

**Resources:**
- Stripe Docs: https://stripe.com/docs
- Stripe API Reference: https://stripe.com/docs/api
- Test Cards: https://stripe.com/docs/testing
- Webhooks Guide: https://stripe.com/docs/webhooks

**Estimated Setup Time:** 30-45 minutes
**Monthly Cost:** ~2% of revenue in fees

