# 🚀 GitHub Setup & Deployment Guide

## ✅ Step 1: Create GitHub Repository

### Option A: Using GitHub Website (Recommended for Beginners)

1. **Go to GitHub:** https://github.com/new
2. **Repository Name:** `VexelLogic` (or your preferred name)
3. **Description:** "Complete AI Business Automation Platform - Production-ready e-commerce system"
4. **Visibility:** 
   - **Public** - If you want to share/showcase
   - **Private** - If keeping it confidential
5. **DON'T initialize** with README, .gitignore, or license (we already have these!)
6. **Click "Create repository"**

### Option B: Using GitHub CLI

```bash
gh repo create VexelLogic --public --source=. --remote=origin --push
```

---

## ✅ Step 2: Push to GitHub

After creating the repository on GitHub, you'll see instructions. Use these commands:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/VexelLogic.git

# Push your code
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### If you prefer SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/VexelLogic.git
git branch -M main
git push -u origin main
```

---

## ✅ Step 3: Rename README for GitHub

GitHub looks for `README.md` in the root, so let's use the GitHub-specific one:

```bash
# In your VexelLogic folder
mv README.md README_PRODUCT.md
mv README_GITHUB.md README.md
git add .
git commit -m "Update README for GitHub"
git push
```

This will make the professional GitHub README show up on your repository page.

---

## ✅ Step 4: Deploy Frontend (Choose One)

### Option A: Vercel (Easiest - Free Tier Available)

1. **Go to:** https://vercel.com/signup
2. **Sign up** with your GitHub account
3. **Import Project:**
   - Click "Add New" → "Project"
   - Select your VexelLogic repository
   - **Root Directory:** Select `landing-page`
   - Click "Deploy"
4. **Done!** Your site is live at `yourproject.vercel.app`

**Custom Domain:** Add your domain in Vercel settings

### Option B: Netlify (Also Easy - Free Tier)

1. **Go to:** https://app.netlify.com/signup
2. **Connect** GitHub account
3. **New Site from Git:**
   - Choose your VexelLogic repo
   - **Base directory:** `landing-page`
   - Click "Deploy site"
4. **Live!** at `yoursite.netlify.app`

### Option C: GitHub Pages (Free but Limited)

```bash
# Create gh-pages branch
git checkout -b gh-pages

# Copy landing page to root
cp -r landing-page/* .

# Commit and push
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

**Enable in GitHub Settings:**
- Go to repo → Settings → Pages
- Source: `gh-pages` branch
- Your site: `https://YOUR_USERNAME.github.io/VexelLogic/`

**Note:** GitHub Pages doesn't support backend API (Node.js)

---

## ✅ Step 5: Deploy Backend API

### Option A: DigitalOcean App Platform (Easiest)

1. **Go to:** https://cloud.digitalocean.com/apps
2. **Create App** → Connect GitHub
3. **Select:** VexelLogic repo
4. **Configure:**
   - **Source Directory:** `backend`
   - **Run Command:** `npm start`
   - **Environment Variables:** Add all from `.env`
5. **Deploy!**

**Cost:** ~$5-12/month

### Option B: Railway.app (Great Free Tier)

1. **Go to:** https://railway.app
2. **New Project** → Deploy from GitHub
3. **Select** VexelLogic repo
4. **Settings:**
   - **Root Directory:** `backend`
   - **Start Command:** `npm start`
   - **Add Environment Variables** (from .env)
5. **Deploy!**

**Free tier:** $5 credit/month

### Option C: Render (Free Tier Available)

1. **Go to:** https://render.com
2. **New** → Web Service
3. **Connect** GitHub repo
4. **Configure:**
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Add Env Variables**
5. **Create Web Service**

**Free tier with limitations**

### Option D: Traditional VPS (Most Control)

See `DEPLOYMENT_GUIDE.md` for full VPS setup instructions.

---

## ✅ Step 6: Configure Environment Variables

### For Backend Deployment

Add these environment variables in your hosting platform:

```bash
# Stripe (Get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (Create products first)
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PROFESSIONAL=price_...
STRIPE_PRICE_ENTERPRISE=price_...

# Email (Gmail or SendGrid)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM="Vexel Logic <support@vexellogic.com>"

# Site Configuration
SITE_URL=https://your-actual-domain.com
PORT=3000

# Optional
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### For Frontend

Update `landing-page/script.js`:

```javascript
const CONFIG = {
    stripePublicKey: 'pk_live_YOUR_ACTUAL_KEY', // Update this
    apiEndpoint: 'https://your-backend-url.com/api', // Your backend URL
    analyticsId: 'G-XXXXXXXXXX' // Your GA ID
};
```

---

## ✅ Step 7: Test Complete Flow

1. **Visit your deployed site:** `https://yoursite.vercel.app`
2. **Click "Get Professional"**
3. **Use Stripe test card:** `4242 4242 4242 4242`
4. **Check email** arrives
5. **Access dashboard** with purchase email
6. **Download files** work

**Switch to live mode** after testing!

---

## ✅ Step 8: Set Up Custom Domain (Optional)

### On Vercel:

1. Go to Project Settings → Domains
2. Add your domain (e.g., `vexellogic.com`)
3. Follow DNS instructions
4. Wait for SSL certificate (automatic)

### DNS Configuration:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21 (Vercel's IP)
```

**SSL:** Automatic with Vercel/Netlify!

---

## 🔄 Future Updates Workflow

### Making Changes

```bash
# 1. Make your changes
# 2. Test locally
# 3. Commit and push

git add .
git commit -m "Description of changes"
git push origin main

# Vercel/Netlify will auto-deploy!
```

### Backend Updates

```bash
# If using platform with Git integration (Railway, Render):
git push origin main  # Auto-deploys

# If using VPS:
ssh user@your-server
cd VexelLogic/backend
git pull
pm2 restart vexel-api
```

---

## 📊 Post-Deployment Checklist

- [ ] Frontend is live and loads properly
- [ ] Backend API is responding (`/api/health`)
- [ ] Stripe checkout works (test mode first)
- [ ] Emails are being sent
- [ ] Customer dashboard is accessible
- [ ] SSL certificate is active (https://)
- [ ] Analytics tracking is working
- [ ] All links work (no 404s)
- [ ] Mobile responsive
- [ ] Cross-browser tested

---

## 🐛 Common Issues

### Issue: Vercel "Build Failed"

**Solution:**
```bash
# Add vercel.json in landing-page/
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ]
}
```

### Issue: Backend "Module not found"

**Solution:**
Ensure `package.json` is in the backend directory and includes all dependencies.

### Issue: CORS Errors

**Solution:**
Update backend `server.js`:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

### Issue: Environment Variables Not Working

**Solution:**
Double-check they're added in your hosting platform's dashboard (not just in .env locally).

---

## 📈 Monitoring After Launch

### Free Tools:

1. **Google Analytics** - Traffic
2. **Stripe Dashboard** - Sales & revenue
3. **Vercel Analytics** - Performance
4. **UptimeRobot** - Downtime alerts (free 50 monitors)

### Set Up Alerts:

- Stripe: Enable email for successful payments
- Backend: Set up error logging (Sentry free tier)
- Frontend: Google Analytics real-time

---

## 🎯 Next Steps

1. **Launch!** - Go live with test mode
2. **Test thoroughly** - Complete 3-5 test purchases
3. **Switch to live** - Update Stripe keys
4. **Announce** - Social media, email list
5. **Monitor** - First 24 hours closely
6. **Iterate** - Fix issues, improve based on feedback

---

## 🆘 Need Help?

- **GitHub Issues:** Report bugs or ask questions
- **Documentation:** Check DEPLOYMENT_GUIDE.md
- **Community:** n8n forums, Stripe docs
- **Hosting Support:** Each platform has great docs

---

**You're ready to deploy! 🚀**

Follow these steps and you'll have a live, working product in 2-3 hours.

**Good luck with your launch!**

---

**Quick Deploy Summary:**
1. Push to GitHub ✓ (Already done!)
2. Deploy frontend on Vercel (5 minutes)
3. Deploy backend on Railway/Render (10 minutes)
4. Configure environment variables (5 minutes)
5. Test purchase flow (15 minutes)
6. Launch! (Priceless)

