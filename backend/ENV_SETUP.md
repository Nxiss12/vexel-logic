# Environment Variables Setup Guide

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Stripe Configuration (for product sales - optional if only doing service bookings)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_PRICE_STARTER=price_your_starter_price_id
STRIPE_PRICE_PROFESSIONAL=price_your_professional_price_id
STRIPE_PRICE_ENTERPRISE=price_your_enterprise_price_id

# Email Configuration (REQUIRED for consultation bookings)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
ADMIN_EMAIL=admin@vexellogic.com

# Session Secret
SESSION_SECRET=your-random-secret-key-here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

## Priority Setup (Consultation Booking System)

**For the consultation booking system to work, you MUST configure:**

1. **SMTP_USER** - Your Gmail address (or other email provider)
2. **SMTP_PASS** - Your Gmail app-specific password
3. **ADMIN_EMAIL** - Email where consultation requests will be sent

### Gmail App Password Setup:

1. Go to your Google Account settings
2. Security → 2-Step Verification (enable if not already)
3. App passwords → Generate new app password
4. Select "Mail" and "Other (Custom name)"
5. Copy the 16-character password
6. Use this as your `SMTP_PASS`

## Optional: Stripe Setup (Only needed if selling n8n workflow products)

If you want to sell the n8n workflow as a product (legacy feature):

1. Create a Stripe account
2. Get your secret key from Dashboard
3. Create products and prices in Stripe
4. Copy the price IDs to the env file

## Testing Locally

For quick testing without full setup, see `QUICK_TEST_SETUP.md`

## Production Deployment

For production (Railway, Heroku, Vercel, etc.), add these as environment variables in your hosting platform's dashboard.

## Security Notes
- Never commit `.env` file to version control
- Use strong random strings for secrets
- Rotate keys regularly
- Use environment-specific configurations
