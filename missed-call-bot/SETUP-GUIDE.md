# 🚀 Vexel Logic Missed Call Bot - Complete Setup Guide

## 📋 What You're Building
A fully automated system that:
1. ✅ Detects missed calls from dental patients
2. ✅ Sends instant SMS text-back (within 30 seconds)
3. ✅ Captures patient responses
4. ✅ Shows everything in a live dashboard

---

## 💰 Cost Breakdown

### Option A: FREE TRIAL (Demo Mode)
- **Cost:** £0
- **Limitations:** 
  - Can only text verified numbers
  - "Sent from Twilio trial" branding in messages
  - Good for: Testing and showing the customer

### Option B: PRODUCTION (Real Customers)
- **Monthly Cost:** ~£3/month
  - Twilio Phone Number: £1/month
  - SMS (50 texts): £2/month (£0.04 each)
- **You Charge Customer:** £149/month
- **Your Profit:** £146/month (4,867% ROI)

---

## 🛠️ Setup Steps (30 Minutes)

### STEP 1: Create Twilio Account (5 min)

1. **Go to:** https://www.twilio.com/try-twilio
2. **Sign up** with email (free trial - £15 credit)
3. **Verify your phone number**
4. **Get a UK phone number:**
   - Dashboard → Phone Numbers → Buy a Number
   - Filter: UK (+44)
   - Capabilities: Voice + SMS
   - **Cost:** £1/month (or FREE on trial)
5. **Save these credentials:**
   ```
   Account SID: ACxxxxxxxxxxxxxxxxx
   Auth Token: xxxxxxxxxxxxxxxxx
   Phone Number: +44XXXXXXXXXX
   ```

---

### STEP 2: Create Supabase Database (5 min)

1. **Go to:** https://supabase.com
2. **Sign up** (free tier - no credit card)
3. **Create New Project:**
   - Name: `vexel-missed-call-bot`
   - Database Password: (save this!)
   - Region: UK West (London)
4. **Run Database Setup:**
   - Go to: SQL Editor (left sidebar)
   - Copy the contents of `database-schema.sql`
   - Click "Run"
5. **Save these credentials:**
   ```
   Project URL: https://xxxxx.supabase.co
   anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   (Find these in: Settings → API)

---

### STEP 3: Deploy to Railway.app (FREE) (10 min)

1. **Go to:** https://railway.app
2. **Sign up** with GitHub (free tier - 500 hours/month)
3. **Create New Project:**
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Connect your GitHub account
   - Select this repository
4. **Set Environment Variables:**
   - Click on your service → Variables
   - Add these:
   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxx
   TWILIO_PHONE_NUMBER=+44XXXXXXXXXX
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   BUSINESS_NAME=Your Dental Practice Name
   ```
5. **Deploy:**
   - Railway will auto-deploy
   - Wait 2-3 minutes
   - Your bot URL: `https://xxxxx.railway.app`

---

### STEP 4: Connect Twilio Webhooks (5 min)

1. **Go to Twilio:** Phone Numbers → Manage → Active Numbers
2. **Click your phone number**
3. **Scroll to "Voice Configuration":**
   - When a call comes in: Webhook
   - URL: `https://YOUR-RAILWAY-URL.railway.app/webhook/missed-call`
   - HTTP POST
   - Call Status Changes: ✅ Enable
4. **Scroll to "Messaging Configuration":**
   - When a message comes in: Webhook
   - URL: `https://YOUR-RAILWAY-URL.railway.app/webhook/sms-reply`
   - HTTP POST
5. **Click "Save"**

---

### STEP 5: Test It! (5 min)

#### Test 1: Missed Call
1. Call your Twilio number from your phone
2. Let it ring (don't answer)
3. Hang up after 10 seconds
4. **You should receive an SMS within 30 seconds:**
   > "Hi! We just missed your call at Your Dental Practice. We're with a patient right now. What can we help with? Reply here or call back anytime. 😊"

#### Test 2: Check Dashboard
1. Open: `https://YOUR-RAILWAY-URL.railway.app`
2. You should see:
   - Total Missed Calls: 1
   - Your phone number listed
   - SMS sent: ✅

#### Test 3: Reply
1. Reply to the SMS: "I need a check-up"
2. Refresh dashboard
3. You should see:
   - Total Responses: 1
   - Your message displayed

---

## 🎯 Give This to Your Customer

### For Dental Practice Setup:

**Option 1: Call Forwarding (Simplest)**
1. Customer sets "Call Forwarding on No Answer" on their practice phone
2. Forward to: Your Twilio Number
3. Done! Missed calls auto-text

**Option 2: Replace Main Number**
1. Use Twilio number as main practice number
2. Twilio forwards calls to their mobile
3. All missed calls auto-captured

**Option 3: Dual Number**
1. Keep current number
2. Advertise Twilio number as "24/7 Emergency Line"
3. Best for: After-hours coverage

---

## 📊 What Customer Sees

**Dashboard Access:**
- URL: `https://YOUR-RAILWAY-URL.railway.app`
- Shows:
  - Total missed calls (last 30 days)
  - Total patient responses
  - Recovery rate (%)
  - Live feed of activity
- Auto-refreshes every 10 seconds

---

## 💡 Customization Options

### Change SMS Message:
Edit `server.js` line 38:
```javascript
body: `Hi! We just missed your call at ${BUSINESS_NAME}. We're with a patient right now. What can we help with? Reply here or call back anytime. 😊`,
```

### Change Auto-Reply:
Edit `server.js` line 94:
```javascript
twiml.message("Thanks for your message! We'll call you back within 30 minutes. For emergencies, call us directly. 🦷");
```

### Add Email Notifications:
1. Install: `npm install nodemailer`
2. Add email send logic in webhook handler
3. Email dentist every time there's a missed call

---

## 🚨 Troubleshooting

### "SMS not sending"
- ✅ Check Twilio balance (free trial has £15 credit)
- ✅ Verify phone number format: +44XXXXXXXXXX (no spaces)
- ✅ Check webhook URL is correct in Twilio dashboard

### "Dashboard shows 0 calls"
- ✅ Check Railway logs: Click service → Logs
- ✅ Verify Supabase credentials are correct
- ✅ Make sure database schema ran successfully

### "Twilio says 'Trial Account'"
- This is normal for free trial
- To remove: Upgrade Twilio to paid (£10 minimum top-up)
- Cost stays the same (£1/mo + £0.04/SMS)

---

## 📈 Upgrade to Production

When customer approves:

1. **Upgrade Twilio:**
   - Dashboard → Upgrade Account
   - Add payment method
   - Top up £10 (lasts ~3 months for typical dental practice)

2. **Remove "Trial" Branding:**
   - Automatically removed when upgraded
   - Messages now 100% professional

3. **Monitor Usage:**
   - Twilio Dashboard → Usage
   - Set alerts at £5, £8, £10

---

## 💰 Pricing Your Customer

**Recommended Pricing:**
- Setup Fee: £697 (one-time)
- Monthly: £149/month
- Includes: Unlimited missed calls, SMS, dashboard access, support

**Your Costs:**
- Setup: £0 (your time)
- Monthly: £3 (Twilio + Railway free tier)
- **Profit:** £146/month per customer

---

## 🎉 YOU'RE DONE!

Your customer now has:
- ✅ Automated missed call recovery
- ✅ Instant SMS text-back
- ✅ Live dashboard
- ✅ Patient response tracking
- ✅ Professional, GDPR-compliant system

**Next Step:** Show them the dashboard and watch the "wow" reaction. 🚀

---

## 📞 Support

If you get stuck:
1. Check Railway logs (most issues show there)
2. Check Twilio logs (Debugger → Error Logs)
3. Test with Postman (hit your webhook URLs manually)

**Common fixes:**
- Restart Railway service: Settings → Restart
- Re-save Twilio webhooks
- Verify all environment variables are set


