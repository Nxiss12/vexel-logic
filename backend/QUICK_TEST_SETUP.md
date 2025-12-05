# Quick Test Setup - Consultation Booking System

This guide helps you test the consultation booking system locally **without** full Stripe/email setup.

## Minimum Required Setup

1. **Create `.env` file in `backend` directory:**

```env
PORT=3000
NODE_ENV=development

# Email (REQUIRED - use your real Gmail for testing)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
ADMIN_EMAIL=your-email@gmail.com

# Optional - can leave blank for consultation booking
STRIPE_SECRET_KEY=
SESSION_SECRET=test-secret-123
FRONTEND_URL=http://localhost:3000
```

2. **Install dependencies:**
```bash
cd backend
npm install
```

3. **Start the server:**
```bash
npm start
```

Server will run on http://localhost:3000

4. **Open the landing page:**
```bash
# In new terminal from project root
cd landing-page
start service-based.html
```

Or manually open: `landing-page/service-based.html` in your browser.

## Testing the Flow

1. **Click any "Get Started" button**
2. **Fill out the consultation form**
3. **Submit**
4. **Check both emails:**
   - Customer receives confirmation with next steps
   - Admin receives lead notification with all details

## What Should Happen:

✅ Form submits successfully
✅ Customer gets beautiful confirmation email
✅ Admin gets alert with lead details
✅ Console logs the booking

## Troubleshooting

### "Failed to book consultation"
- Check your SMTP credentials in `.env`
- Verify Gmail App Password is correct
- Check server console for detailed error

### Email not sending
- Gmail: Must use App Password (not regular password)
- Must have 2FA enabled on Gmail
- Check spam folder

### "Cannot connect to server"
- Make sure backend is running on port 3000
- Check terminal for errors
- Try restarting: `Ctrl+C` then `npm start`

## Testing Without Real Email

If you want to test without email setup, temporarily modify `backend/server.js`:

In the `/api/book-consultation` endpoint, comment out the email sending parts:

```javascript
// await emailTransporter.sendMail({ ... });  // Comment these out
```

The API will still log the consultation to console.

## Next Steps

Once consultation booking works locally:

1. ✅ Test all 3 packages (Starter, Growth, Enterprise)
2. ✅ Test all 4 service types (Lead Gen, Revenue Recovery, etc.)
3. ✅ Verify email templates look good on mobile
4. ✅ Deploy to production (Vercel + Railway)

## Production Deployment

See `DEPLOYMENT_GUIDE.md` for full production setup with proper environment variables.
