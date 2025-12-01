# 🚀 Vexel Logic - Missed Call Recovery Bot

## 🎯 What This Does
Automatically texts back dental patients when you miss their call. Works 24/7, responds in 30 seconds, and logs everything in a live dashboard.

---

## ⚡ Quick Start

### 1. Prerequisites
- Twilio account (free trial or £3/mo)
- Supabase account (free tier)
- Railway.app account (free tier)

### 2. Setup (30 minutes)
See **[SETUP-GUIDE.md](./SETUP-GUIDE.md)** for detailed instructions.

**TLDR:**
1. Get Twilio phone number + credentials
2. Create Supabase database (run `database-schema.sql`)
3. Deploy to Railway with environment variables
4. Connect Twilio webhooks
5. Test it!

---

## 💰 Cost
- **Trial:** £0 (free Twilio trial + free Railway)
- **Production:** £3/month (£1 phone + ~£2 SMS)
- **You Charge:** £149/month
- **Your Profit:** £146/month per customer

---

## 📊 Features
- ✅ Instant SMS response (< 30 seconds)
- ✅ Live dashboard with stats
- ✅ Customer response tracking
- ✅ Auto-refresh every 10 seconds
- ✅ GDPR compliant
- ✅ UK phone numbers
- ✅ Dental practice-specific messaging

---

## 🛠️ Tech Stack
- **Backend:** Node.js + Express
- **SMS/Voice:** Twilio
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Railway.app
- **Frontend:** Vanilla HTML/CSS/JS

---

## 📁 File Structure
```
missed-call-bot/
├── server.js              # Main bot logic
├── package.json           # Dependencies
├── railway.json           # Railway config
├── env.template           # Environment variables template
├── database-schema.sql    # Supabase database setup
├── SETUP-GUIDE.md         # Complete setup instructions
├── README.md              # This file
└── public/
    └── index.html         # Admin dashboard
```

---

## 🔧 Environment Variables
```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+44XXXXXXXXXX
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
BUSINESS_NAME=Your Dental Practice Name
PORT=3000
```

---

## 📞 API Endpoints

### Webhooks (Twilio calls these)
- `POST /webhook/missed-call` - Handles missed calls
- `POST /webhook/sms-reply` - Handles customer SMS responses

### Dashboard API
- `GET /api/stats` - Get overall statistics
- `GET /api/missed-calls` - Get list of missed calls (last 30 days)
- `GET /api/responses` - Get customer SMS responses

### Health
- `GET /health` - Check if bot is running

---

## 🎨 Customization

### Change SMS Message
Edit `server.js` line 38:
```javascript
body: `Your custom message here`,
```

### Change Auto-Reply
Edit `server.js` line 94:
```javascript
twiml.message("Your custom auto-reply");
```

### Add Email Alerts
```bash
npm install nodemailer
```
Then add email logic in the webhook handler.

---

## 🧪 Testing Locally

### 1. Install dependencies
```bash
cd missed-call-bot
npm install
```

### 2. Create `.env` file
```bash
cp env.template .env
# Edit .env with your credentials
```

### 3. Start server
```bash
npm start
```

### 4. Test webhooks with ngrok
```bash
ngrok http 3000
# Use ngrok URL in Twilio webhook settings
```

---

## 🚀 Deploy to Production

### Railway (Recommended - Free)
1. Push code to GitHub
2. Connect Railway to your repo
3. Add environment variables
4. Auto-deploys on every push

### Alternative: Render.com (Also Free)
1. Create new Web Service
2. Connect GitHub repo
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add environment variables

---

## 📈 Monitoring

### Check Logs
- **Railway:** Click service → Logs
- **Twilio:** Console → Monitor → Logs → Errors

### Common Issues
- **SMS not sending:** Check Twilio balance
- **No calls logged:** Check webhook URL
- **Dashboard shows 0:** Check Supabase credentials

---

## 🎉 What Customer Gets
- ✅ 24/7 missed call coverage
- ✅ Instant patient engagement
- ✅ Live dashboard access
- ✅ 64% call recovery rate (industry average)
- ✅ Professional, automated system

---

## 📞 Support
Built by **Vexel Logic** for dental practices.

**Need help?**
- Check `SETUP-GUIDE.md`
- Review Railway logs
- Test webhooks with Postman

---

## 📜 License
MIT License - Use this for your customers, white-label it, charge whatever you want.

---

**NOW GO CLOSE THAT CUSTOMER.** 💰🚀


