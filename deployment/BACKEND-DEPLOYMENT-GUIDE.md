# Backend Deployment Guide

## Overview

Deploy the VexelLogic backend API to Railway.app (recommended) or Render.com to handle consultation form submissions, email notifications, and future Stripe integrations.

**Current Backend:** `backend/server.js`  
**Updated Pricing:** ✅ Already updated to new structure  
**Deployment Target:** Railway.app (easiest) or Render.com  
**Estimated Time:** 20-30 minutes

---

## Option 1: Deploy to Railway.app (Recommended)

### Why Railway?
- Free tier includes $5/month credit
- Automatic HTTPS
- Easy environment variables
- GitHub integration
- Great for Node.js apps

### Step 1: Sign Up

1. Go to https://railway.app/
2. Click "Login" → "Login with GitHub"
3. Authorize Railway to access your GitHub

### Step 2: Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `vexel-logic` repository
4. Select branch: `service-launch-v2`
5. Railway will auto-detect it's a Node.js app

### Step 3: Configure Root Directory

1. In Railway dashboard, click your service
2. Go to "Settings"
3. Scroll to "Root Directory"
4. Set to: `backend`
5. Save changes

### Step 4: Set Environment Variables

1. In Railway, click "Variables" tab
2. Add the following variables:

```env
PORT=3000

# SMTP Configuration (Gmail Example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password

# Admin Email
ADMIN_EMAIL=hello@vexellogic.com

# Site Configuration
SITE_URL=https://vexellogic.com

# Session Secret (generate random string)
SESSION_SECRET=your-random-secret-here

# Stripe Keys (add these in Phase 2)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### How to Get Gmail App Password:

1. Go to https://myaccount.google.com/
2. Security → 2-Step Verification (enable if not already)
3. Security → App passwords
4. Select "Mail" and "Other"
5. Name it "VexelLogic Backend"
6. Copy the 16-character password
7. Use this as `SMTP_PASS`

### Step 5: Deploy

1. Railway will automatically deploy after you set variables
2. Wait 2-3 minutes for deployment
3. Check "Deployments" tab for status

### Step 6: Get Your Backend URL

1. In Railway dashboard, click "Settings"
2. Scroll to "Domains"
3. Click "Generate Domain"
4. You'll get a URL like: `vexel-logic-production.up.railway.app`
5. Copy this URL

### Step 7: Update Frontend

Update the API endpoint in your landing page:

1. Open `landing-page/index.html`
2. Find line ~1020 (in `submitConsultation` function)
3. Change:
   ```javascript
   const response = await fetch('http://localhost:3000/api/book-consultation', {
   ```
   To:
   ```javascript
   const response = await fetch('https://vexel-logic-production.up.railway.app/api/book-consultation', {
   ```
4. Commit and push to GitHub
5. Vercel will auto-deploy

### Step 8: Test

1. Go to your live site: https://vexel-logicv3.vercel.app/
2. Fill out the consultation form
3. Submit
4. Check your email (should receive confirmation)
5. Check admin email (should receive notification)

### Troubleshooting

**Problem: Deployment failed**
- Check Railway logs: Dashboard → Deployments → Click latest → View logs
- Common issue: Missing environment variables

**Problem: Form submits but no email**
- Check SMTP credentials are correct
- Try sending test email from Gmail to verify account works
- Check Railway logs for error messages

**Problem: CORS errors**
- Backend already has CORS enabled in server.js
- If issues persist, add your Vercel domain to CORS whitelist

---

## Option 2: Deploy to Render.com (Alternative)

### Step 1: Sign Up

1. Go to https://render.com/
2. Sign up with GitHub
3. Authorize Render

### Step 2: Create Web Service

1. Click "New +" → "Web Service"
2. Connect your `vexel-logic` repository
3. Configure:
   - Name: `vexellogic-backend`
   - Branch: `service-launch-v2`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: `Free`

### Step 3: Environment Variables

Add the same variables as Railway (see above)

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait 3-5 minutes for deployment
3. Get your URL from dashboard

### Step 5: Update Frontend & Test

Same as Railway steps 7-8

---

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port for server | `3000` |
| `SMTP_HOST` | Email server | `smtp.gmail.com` |
| `SMTP_PORT` | Email port | `587` |
| `SMTP_USER` | Email username | `hello@vexellogic.com` |
| `SMTP_PASS` | Email password/app password | `abcd efgh ijkl mnop` |
| `ADMIN_EMAIL` | Where to send notifications | `hello@vexellogic.com` |
| `SITE_URL` | Your website URL | `https://vexellogic.com` |
| `SESSION_SECRET` | Random string for sessions | `Asdf1234!@#$` |

### Optional Variables (Add Later)

| Variable | Description | When to Add |
|----------|-------------|-------------|
| `STRIPE_SECRET_KEY` | Stripe API key | When setting up payments |
| `STRIPE_PUBLIC_KEY` | Stripe public key | When setting up payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | When setting up payments |
| `DATABASE_URL` | PostgreSQL connection | If adding database later |

---

## Post-Deployment Checklist

- [ ] Backend deployed successfully
- [ ] Environment variables configured
- [ ] Backend URL copied
- [ ] Frontend updated with backend URL
- [ ] Frontend redeployed to Vercel
- [ ] Test form submission (end-to-end)
- [ ] Confirmation email received
- [ ] Admin notification email received
- [ ] Check Railway/Render logs (no errors)

---

## Monitoring & Maintenance

### Check Logs Regularly

**Railway:**
1. Dashboard → Your service
2. Click "Deployments"
3. Click latest deployment → "View Logs"

**Render:**
1. Dashboard → Your service
2. Click "Logs" tab

### Common Log Messages

**Good:**
```
Server running on port 3000
Email sent successfully to user@email.com
```

**Bad:**
```
Error: Invalid SMTP credentials
Error: Cannot connect to email server
```

### Weekly Maintenance

- Check logs for errors (5 min)
- Verify form submissions working
- Test email delivery
- Review Railway/Render usage (stay within free tier)

---

## Scaling Considerations

### When to Upgrade

**Railway Free Tier:**
- $5/month credit
- Good for ~500 requests/day
- Upgrade when: >1,000 form submissions/month

**Render Free Tier:**
- Spins down after 15 min of inactivity
- Slower cold starts
- Upgrade when: Need always-on performance

### Upgrade Costs

**Railway:**
- Pay as you go: $0.000231/GB-hour
- Estimate: ~$10-20/month for moderate traffic

**Render:**
- Starter: $7/month (always on, more resources)

---

## Security Best Practices

### Do's ✅
- Use environment variables (never hard code secrets)
- Use Gmail app passwords (not your main password)
- Enable 2FA on Railway/Render accounts
- Rotate secrets periodically
- Monitor logs for suspicious activity

### Don'ts ❌
- Don't commit `.env` file to git
- Don't share environment variables publicly
- Don't use same password for multiple services
- Don't ignore security update notifications

---

## Quick Reference Commands

### Local Testing (Before Deployment)

```bash
cd backend
npm install
node server.js
```

Test form: http://localhost:3000

### Check Backend Status

Visit: `https://your-backend-url.railway.app/api/health`

Should return:
```json
{"status": "ok", "timestamp": "2025-12-05T..."}
```

---

## Next Steps After Deployment

1. ✅ Backend deployed
2. ⏭️ Set up Stripe products (see STRIPE-SETUP-GUIDE.md)
3. ⏭️ Configure business email autoresponders (see EMAIL-INFRASTRUCTURE-GUIDE.md)
4. ⏭️ Deploy n8n for automation workflows (see N8N-SETUP-GUIDE.md)

---

**Need Help?**
- Railway Docs: https://docs.railway.app/
- Render Docs: https://render.com/docs/
- Node.js + Express: https://expressjs.com/

**Estimated Monthly Cost:** $0-10 (within free tiers)

