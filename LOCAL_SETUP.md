# 🖥️ Local Development Setup Guide

## Quick Start - Run Everything Locally

### 🎯 What You'll Test

1. **Landing Page** - The sales website
2. **Backend API** - Payment processing & email delivery
3. **Customer Dashboard** - Download portal
4. **n8n Workflows** - AI automation tools

---

## ⚡ Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

This installs all required packages (Express, Stripe, Nodemailer, etc.)

---

## ⚙️ Step 2: Configure Environment (Test Mode)

Create a `.env` file in the `backend/` folder:

```bash
# Stripe TEST Keys (get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_KEY
STRIPE_PUBLIC_KEY=pk_test_YOUR_TEST_KEY
STRIPE_WEBHOOK_SECRET=whsec_test_YOUR_SECRET

# Fake Price IDs for testing (or create test products in Stripe)
STRIPE_PRICE_STARTER=price_test_starter
STRIPE_PRICE_PROFESSIONAL=price_test_professional
STRIPE_PRICE_ENTERPRISE=price_test_enterprise

# Email (use a test Gmail or skip for now)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-test-email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM="Vexel Logic Test <test@vexellogic.com>"

# Local URLs
SITE_URL=http://localhost:3000
PORT=3000

# Optional
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Don't have Stripe keys?** That's okay! The site will still work, just the checkout won't process.

---

## 🚀 Step 3: Start Backend Server

```bash
# In the backend/ folder
npm start
```

**You should see:**
```
🚀 Vexel Logic API running on port 3000
📧 Email configured: Yes/No
💳 Stripe configured: Yes/No
```

**Test it:** Open browser to http://localhost:3000

---

## 🌐 Step 4: Open Frontend (Landing Page)

**Option 1: Simple (Just open the file)**
```bash
# In Windows Explorer, double-click:
landing-page/index.html
```

**Option 2: With a local server (better for testing)**
```bash
# Install a simple server (one-time only)
npm install -g http-server

# Run in landing-page folder
cd landing-page
http-server -p 8080
```

Then open: http://localhost:8080

---

## ✅ Step 5: Test Everything

### Test 1: Landing Page Loads
- Open `landing-page/index.html` in browser
- All sections should display
- Pricing cards visible
- FAQ accordion works

### Test 2: Backend API Works
- Open: http://localhost:3000/api/health
- Should return: `{"status":"ok"}`

### Test 3: Customer Dashboard
- Open: `landing-page/dashboard.html?email=test@test.com`
- Should show dashboard (won't have data yet)

### Test 4: Stripe Checkout (if configured)
- Click "Get Professional" on landing page
- Should redirect to Stripe checkout
- Use test card: `4242 4242 4242 4242`

---

## 🧪 Test Data

### Stripe Test Cards
```
SUCCESS: 4242 4242 4242 4242
DECLINE: 4000 0000 0000 0002
3D SECURE: 4000 0025 0000 3155
```

Any future date for expiry, any CVC

---

## 🐛 Troubleshooting

### "Port 3000 already in use"
```bash
# Change PORT in .env to 3001
PORT=3001

# Or kill process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "Module not found"
```bash
cd backend
npm install
```

### "Cannot GET /"
That's normal! The backend is API-only. Use:
- http://localhost:3000/api/health
- Frontend is separate (landing-page/index.html)

---

## 🔧 Update Frontend to Use Local Backend

Edit `landing-page/script.js`:

```javascript
const CONFIG = {
    stripePublicKey: 'pk_test_YOUR_KEY', // Your test key
    apiEndpoint: 'http://localhost:3000/api', // Local backend
    analyticsId: 'G-XXXXXXXXXX'
};
```

---

## 🎯 What Each Part Does

### Backend (`backend/server.js`)
- **Port 3000** - API server
- Handles Stripe payments
- Sends emails
- Generates download links
- Manages customers

### Frontend (`landing-page/`)
- **index.html** - Main sales page
- **dashboard.html** - Customer portal
- **styles.css** - All styling
- **script.js** - Stripe integration, forms

### n8n Workflows (`n8n-subworkflows/`)
- Import these into your n8n instance
- They work independently
- Connect to the main workflow

---

## 🚀 Quick Test Workflow

```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Serve frontend (optional)
cd landing-page
http-server -p 8080

# Browser 1: Frontend
http://localhost:8080

# Browser 2: Backend health check
http://localhost:3000/api/health

# Browser 3: Dashboard
http://localhost:8080/dashboard.html?email=test@test.com
```

---

## 💡 Pro Tips

1. **Use Stripe Test Mode** - Never use live keys locally
2. **Chrome DevTools** - Check console for errors (F12)
3. **Network Tab** - See API requests
4. **Check Backend Logs** - Server terminal shows all requests

---

## 🎨 Making Changes

### Update Landing Page
1. Edit `landing-page/index.html`
2. Refresh browser (Ctrl+F5)

### Update Backend
1. Edit `backend/server.js`
2. Restart server (Ctrl+C, then `npm start`)

### Update Styling
1. Edit `landing-page/styles.css`
2. Refresh browser

---

## 📊 What to Look For

### Landing Page ✅
- All sections load
- Pricing cards display
- Forms submit
- Links work
- Mobile responsive

### Backend API ✅
- Server starts without errors
- `/api/health` returns OK
- Email configuration shows (if configured)
- Stripe connection shows (if configured)

### Integration ✅
- Clicking "Get Started" opens Stripe checkout
- Email capture form works
- No console errors

---

## 🎯 Next Steps

Once everything works locally:
1. ✅ Test complete purchase flow
2. ✅ Verify email delivery
3. ✅ Check customer dashboard
4. 🚀 Deploy to production (Vercel + Railway)

---

**Ready to start? Run these commands:**

```bash
# 1. Install backend
cd backend
npm install

# 2. Start backend
npm start

# 3. Open frontend in browser
# Just double-click: landing-page/index.html
```

**You'll see the complete system running! 🎉**

