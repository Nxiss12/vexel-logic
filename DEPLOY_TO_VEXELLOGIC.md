# 🚀 Deploy Service-Based Landing Page to vexellogic.com

## ✅ What's Ready

Your new service-based landing page with Options 1 & 2 (Starter £2,997 & Growth £6,997) has been:
- ✅ Built and tested locally
- ✅ Committed to Git
- ✅ Pushed to GitHub: `https://github.com/Nxiss12/vexel-logic` (branch: `service-launch-v2`)

## 🎯 Deployment Options

### Option 1: Deploy to Vercel (Recommended - Free)

#### Step 1: Log into Vercel
1. Go to https://vercel.com/login
2. Log in with your GitHub account

#### Step 2: Import Your Repository
1. Click "Add New..." → "Project"
2. Select `vexel-logic` repository
3. Select branch: `service-launch-v2`
4. **Root Directory:** Set to `landing-page`
5. Click "Deploy"

#### Step 3: Connect Your Domain
1. After deployment, go to Project Settings → Domains
2. Add domain: `vexellogic.com`
3. Add domain: `www.vexellogic.com`
4. Vercel will show you DNS records to add

#### Step 4: Update DNS (in Squarespace or wherever your domain is)
1. Go to your domain registrar (looks like Squarespace)
2. Update DNS records as Vercel instructs:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
3. Wait 5-60 minutes for DNS propagation

**Done!** Your site will be live at vexellogic.com

---

### Option 2: Quick Test Deploy (GitHub Pages)

If you want to see it live immediately while setting up Vercel:

```powershell
# 1. Copy service-based.html to index.html for GitHub Pages
Copy-Item landing-page\service-based.html landing-page\index.html

# 2. Commit and push
git add landing-page/index.html
git commit -m "Add index for GitHub Pages"
git push origin service-launch-v2

# 3. Enable GitHub Pages
# - Go to: https://github.com/Nxiss12/vexel-logic/settings/pages
# - Source: Deploy from branch
# - Branch: service-launch-v2
# - Folder: /landing-page
# - Save

# Your site will be live at:
# https://nxiss12.github.io/vexel-logic/
```

---

### Option 3: Replace Current Squarespace Site

If vexellogic.com is on Squarespace and you want to replace it:

#### Method A: Export and Upload to Squarespace
1. In Squarespace, go to Pages
2. Add new "Code" block
3. Copy entire contents of `landing-page/service-based.html`
4. Paste into code block
5. Publish

#### Method B: Point Domain Away from Squarespace
1. Cancel Squarespace
2. Follow Vercel deployment (Option 1 above)
3. Update DNS to point to Vercel

---

## 🔧 What About the Backend (Consultation Form)?

The landing page works standalone, but the consultation form needs the backend to send emails.

### For Now (Without Backend):
The form will show an error when submitted. Options:
1. **Use Typeform:** Replace form with Typeform embed
2. **Use Google Forms:** Link to Google Form
3. **Manual collection:** Add "Email us at: hello@vexellogic.com"

### To Enable Full Form (With Email):
Deploy backend to Railway:

1. Go to https://railway.app
2. Log in with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select `vexel-logic` → `backend` folder
5. Add environment variables:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-gmail-app-password
   ADMIN_EMAIL=your-email@gmail.com
   SESSION_SECRET=random-string-123
   ```
6. Deploy
7. Copy Railway URL (e.g., `https://your-app.railway.app`)
8. Update `service-based.html` line 908:
   ```javascript
   // Change from:
   const response = await fetch('http://localhost:3000/api/book-consultation', {
   
   // To:
   const response = await fetch('https://your-app.railway.app/api/book-consultation', {
   ```
9. Redeploy frontend

---

## 📋 Quick Deploy Checklist

- [ ] Push code to GitHub (DONE ✅)
- [ ] Log into Vercel
- [ ] Import repository (branch: service-launch-v2)
- [ ] Set root directory to `landing-page`
- [ ] Deploy
- [ ] Add custom domain vexellogic.com
- [ ] Update DNS records
- [ ] Test site at vexellogic.com
- [ ] (Optional) Deploy backend to Railway
- [ ] (Optional) Update API endpoint in HTML

---

## 🆘 Need Help?

**Can't access Vercel?**
- Use GitHub Pages (Option 2) for immediate preview

**Domain not working?**
- DNS can take up to 48 hours (usually 5-60 minutes)
- Check DNS propagation: https://www.whatsmydns.net/

**Form not working?**
- Expected until backend is deployed
- Use Typeform or Google Forms as temporary solution

**Current Squarespace site:**
- You can keep it running while testing the new version on a subdomain
- Or replace it entirely with Vercel

---

## 🎯 Recommended Path

1. **Deploy to Vercel** (5 minutes)
2. **Test on Vercel subdomain** (e.g., vexel-logic-xyz.vercel.app)
3. **If you like it:** Connect vexellogic.com
4. **Deploy backend to Railway** (10 minutes)
5. **Update API endpoint** in HTML
6. **Redeploy** to Vercel

Your service-based page will be live!

---

## Files Location

- **Main page:** `landing-page/service-based.html`
- **Backend:** `backend/server.js`
- **GitHub:** Branch `service-launch-v2`

---

**Need me to walk you through any of these steps?** Let me know which deployment method you prefer!


