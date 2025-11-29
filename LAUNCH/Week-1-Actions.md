# Week 1: Deploy & Go Live

**Goal:** Get your website live on the internet in 5 days.

---

## Day 1: Deploy to Vercel

### ✅ Task: Deploy Your Website

**Time:** 5 minutes

**Steps:**

1. **Go to Vercel:**
   - Visit: https://vercel.com
   - Click "Sign Up" (use your GitHub account for easy setup)

2. **Import Your Project:**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Authorize Vercel to access your GitHub
   - Select your `vexel-logic` repository

3. **Configure Deployment:**
   - **Framework Preset:** Select "Other" (it's a static site)
   - **Root Directory:** Leave as `./`
   - **Build Command:** Leave blank
   - **Output Directory:** Leave blank
   - Click "Deploy"

4. **Wait 1-2 minutes for deployment**

5. **Access your live site:**
   - Vercel will show you the URL (something like `vexel-logic.vercel.app`)
   - Click to view your live website!

**Expected Result:** Your website is live, fast, and auto-deploys on every git push!

**Pro tip:** Vercel is faster than GitHub Pages and includes analytics!

---

## Day 2: Test All Tools

### ✅ Task: Verify Everything Works

**Time:** 30 minutes

**Checklist:**

- [ ] Homepage loads with all styles
- [ ] Calculator works (try the revenue calculator)
- [ ] Tool catalog opens: `/tools/index.html`
- [ ] Marketing tools accessible: `/tools/marketing_tools/index.html`
- [ ] All 21 tools open and display correctly
- [ ] Forms are responsive (test on mobile using Chrome DevTools)
- [ ] No console errors (press F12 → Console tab)

**Test URLs:**
- Homepage: `https://nxiss12.github.io/vexel-logic/`
- Tools: `https://nxiss12.github.io/vexel-logic/tools/index.html`
- Marketing: `https://nxiss12.github.io/vexel-logic/tools/marketing_tools/index.html`

---

## Day 3: Set Up Demo Booking

### ✅ Task: Connect Calendly for Demos

**Time:** 15 minutes

**Steps:**

1. **Create Calendly account:**
   - Go to: https://calendly.com
   - Sign up (free plan is fine)

2. **Create event type:**
   - Event name: "Vexel Logic Demo"
   - Duration: 30 minutes
   - Location: Zoom/Google Meet

3. **Get your Calendly link:**
   - Example: `https://calendly.com/your-username/vexel-demo`

4. **Update your website:**
   - Open `index.html`
   - Find all "Book Free Demo" buttons
   - Replace `https://calendly.com/vexellogic/demo` with your link

5. **Test it:**
   - Click a demo button on your live site
   - Verify Calendly opens correctly

---

## Day 4: Set Up Analytics (Optional but Recommended)

### ✅ Task: Install Google Analytics

**Time:** 10 minutes

**Steps:**

1. **Create GA4 account:**
   - Go to: https://analytics.google.com
   - Create new property for your website

2. **Get tracking code:**
   - Copy your Measurement ID (looks like: `G-XXXXXXXXXX`)

3. **Add to website:**
   - Open `index.html`
   - Find the `<head>` section
   - Add this code:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

4. **Commit and push:**
   ```powershell
   git add index.html
   git commit -m "Add Google Analytics"
   git push
   ```

5. **Verify:** Check real-time reports in Google Analytics

---

## Day 5: Local Testing Setup

### ✅ Task: Run Website Locally for Development

**Time:** 5 minutes

**Why:** Test changes before pushing to production

**Method 1: Python (Recommended)**

```powershell
# Navigate to project
cd "C:\Users\Nxiss\OneDrive\Desktop\Vexel project"

# Start server
python -m http.server 8000

# Open browser to: http://localhost:8000
```

**Method 2: VS Code Live Server**

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Auto-opens at `http://127.0.0.1:5500`

**Method 3: Just Open File**

- Double-click `index.html`
- Opens in browser (some features may not work)

---

## End of Week 1 Checklist

Before moving to Week 2, confirm:

- [ ] ✅ Website is live at Vercel URL
- [ ] ✅ All tools load without errors
- [ ] ✅ Calendly is connected and working
- [ ] ✅ Can test locally before pushing changes
- [ ] ✅ Analytics tracking (optional)

**Your Vercel URL:** Write it here: `_________________________.vercel.app`

---

## Troubleshooting

### "Deployment failed"
- Check that `index.html` is in root folder
- Look at deployment logs in Vercel dashboard
- Make sure there are no build errors

### "404 Not Found"
- Clear browser cache (Ctrl+Shift+R)
- Check the URL Vercel gave you
- Wait 2-3 minutes after first deployment

### "Styles not loading"
- Check browser console (F12) for errors
- Verify internet connection (CDN resources)
- Try different browser

### "Calendly not opening"
- Check that link is correct in `index.html`
- Test link directly in browser
- Make sure event is active in Calendly

---

## Next Steps

**Week 1 Complete?** 🎉

Move to: [Week-2-4-Marketing.md](Week-2-4-Marketing.md)

**Need help?**
- Check: [Quick-Setup-Guide.md](Quick-Setup-Guide.md)
- Email: benanokye577@gmail.com

