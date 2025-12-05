# Environment Variables

Copy this file to `.env` and fill in your actual values.

```bash
cp .env.example .env
```

## Required Configuration

### Stripe
- Get your API keys from: https://dashboard.stripe.com/apikeys
- Create products and prices in Stripe Dashboard
- Set up webhook endpoint for payment confirmations

### Email (SMTP)
- For Gmail: Enable 2FA and create an App Password
- For SendGrid/Mailgun: Use their SMTP credentials
- Test email delivery before going live

### Site URL
- Development: http://localhost:3000
- Production: Your actual domain

## Security Notes
- Never commit `.env` file to version control
- Use strong random strings for secrets
- Rotate keys regularly
- Use environment-specific configurations

