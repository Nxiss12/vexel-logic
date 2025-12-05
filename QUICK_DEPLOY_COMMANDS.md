# ⚡ 2-MINUTE DEPLOY - Run These Commands

## Get Your Site Live in 2 Minutes

### Option 1: Deploy with Vercel CLI (Fastest)

```powershell
# 1. Install Vercel CLI (if not installed)
npm install -g vercel

# 2. Deploy (from project root)
cd landing-page
vercel --prod

# Follow prompts:
# - Set up and deploy? Yes
# - Link to existing project? No (or Yes if you have one)
# - Project name: vexel-logic
# - Directory to deploy: . (current directory)

# 3. Add your domain
vercel domains add vexellogic.com
```

**Your site will be live instantly!**

---

### Option 2: GitHub Pages (No signup needed)

```powershell
# From project root:

# 1. Make service-based.html the index
Copy-Item landing-page\service-based.html landing-page\index.html

# 2. Commit and push
git add landing-page/index.html
git commit -m "Deploy service-based page"
git push origin service-launch-v2

# 3. Go to GitHub and enable Pages:
# https://github.com/Nxiss12/vexel-logic/settings/pages
# - Branch: service-launch-v2
# - Folder: /landing-page
# - Save

# Live at: https://nxiss12.github.io/vexel-logic/
```

---

### Option 3: I'll Do It Via Web Interface

I need you to:

1. **Log into Vercel:** https://vercel.com/login (use GitHub)
2. **Screen share or describe what you see** so I can guide you through the UI

---

## Which One?

**Want it live fastest?** → Run Option 1 commands
**Don't want to install anything?** → Option 2 (GitHub Pages)
**Want me to guide you through the web UI?** → Option 3

Let me know which you prefer, or just run the commands above! 🚀


