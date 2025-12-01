# 🚀 GitHub Repository Setup Guide

## Overview

Your Vexel Logic project is split into **2 GitHub repositories** for security and organization:

1. **`vexel-logic-website`** (PUBLIC) - Marketing website
2. **`vexel-logic-automation`** (PRIVATE) - n8n workflows & automation

---

## 🔐 **WHY 2 REPOS?**

### **Security:**
- Customers can't see your workflow code
- API keys and credentials stay private
- Customer data never exposed

### **Deployment:**
- Website → Vercel (auto-deploy from public repo)
- Automation → Railway (manual deploy from private repo)

### **Portfolio:**
- Public website repo showcases your work
- Private automation repo protects your IP

---

## 📁 **REPO 1: vexel-logic-website (PUBLIC)**

### **What's Included:**
```
vexel-logic-website/
├── index.html
├── vexel-logic-pro.html
├── pro-dashboard.html
├── pro-workflow-request.html
├── growth-engine.html
├── admin-assassin.html
├── reputation-defender.html
├── tradesmen.html
├── dental.html
├── legal.html
├── partners.html
├── privacy-policy.html
├── terms-of-service.html
├── assets/
│   └── logo-icon.svg
├── sitemap.xml
├── robots.txt
├── .gitignore
└── README.md
```

### **What's Excluded:**
- ❌ `n8n-automation/` (private repo)
- ❌ `missed-call-bot/` (private repo)
- ❌ `.env` files
- ❌ Customer data

### **GitHub URL:**
`https://github.com/Nxiss12/vexel-logic-website`

### **Vercel Deployment:**
1. Connect Vercel to this repo
2. Auto-deploy on every push to `main`
3. Live at: `https://vexellogic.com`

---

## 🔒 **REPO 2: vexel-logic-automation (PRIVATE)**

### **What's Included:**
```
vexel-logic-automation/
├── n8n-automation/
│   ├── README.md
│   ├── docker-compose.yml
│   ├── railway.json
│   ├── .env.template
│   ├── workflows/
│   │   ├── internal/
│   │   │   ├── trial-onboarding.json
│   │   │   └── customer-monitoring.json
│   │   └── customer-templates/
│   │       ├── plumber-lead-to-booking.json
│   │       ├── dentist-patient-journey.json
│   │       └── solicitor-client-onboarding.json
│   ├── docs/
│   │   ├── SETUP_GUIDE.md
│   │   └── WORKFLOW_LIBRARY.md
│   └── customer-workflows/
│       └── (customer-specific workflows - gitignored)
├── missed-call-bot/
│   ├── server.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── railway.json
│   └── .env.template
├── .gitignore
└── README.md
```

### **What's Excluded:**
- ❌ HTML website files (public repo)
- ❌ `.env` files (NEVER commit!)
- ❌ `node_modules/`
- ❌ Customer workflow data
- ❌ Database files

### **GitHub URL:**
`https://github.com/Nxiss12/vexel-logic-automation`

### **Railway Deployment:**
1. Connect Railway to this repo
2. Manual deploy (or Railway CLI)
3. Environment variables set in Railway dashboard

---

## 🚀 **SETUP INSTRUCTIONS:**

### **Step 1: Create GitHub Repos**

**On GitHub.com:**

1. Go to: https://github.com/new
2. Create **Repo 1:**
   - Name: `vexel-logic-website`
   - Visibility: **Public**
   - Description: "Vexel Logic - Business Automation Platform for UK SMEs"
   - ✅ Add README
   - Click "Create repository"

3. Create **Repo 2:**
   - Go to: https://github.com/new
   - Name: `vexel-logic-automation`
   - Visibility: **Private** ⚠️
   - Description: "Vexel Logic - Internal Automation & Workflows (PRIVATE)"
   - ✅ Add README
   - Click "Create repository"

---

### **Step 2: Split Your Local Project**

**In your terminal:**

```powershell
# You're currently in: C:\Users\Nxiss\OneDrive\Desktop\Vexel project

# Create a backup first!
cd ..
cp -r "Vexel project" "Vexel project BACKUP"

# Go back to project
cd "Vexel project"

# Remove current remote (we'll add 2 new ones)
git remote remove origin
```

---

### **Step 3: Setup Website Repo (Public)**

```powershell
# Copy website .gitignore
cp .gitignore-website .gitignore

# Add website remote
git remote add website https://github.com/Nxiss12/vexel-logic-website.git

# Stage only website files
git add *.html assets/ sitemap.xml robots.txt .gitignore

# Commit
git commit -m "Initial commit: Vexel Logic website"

# Push to website repo
git push website main
```

---

### **Step 4: Setup Automation Repo (Private)**

```powershell
# Copy automation .gitignore
cp .gitignore-automation .gitignore

# Add automation remote
git remote add automation https://github.com/Nxiss12/vexel-logic-automation.git

# Stage only automation files
git add n8n-automation/ missed-call-bot/ .gitignore

# Commit
git commit -m "Initial commit: Vexel Logic automation (PRIVATE)"

# Push to automation repo
git push automation main
```

---

### **Step 5: Set Default Remote (Website)**

```powershell
# Set website as default remote (for Vercel)
git remote add origin https://github.com/Nxiss12/vexel-logic-website.git

# Verify remotes
git remote -v
```

**You should see:**
```
origin      https://github.com/Nxiss12/vexel-logic-website.git (fetch)
origin      https://github.com/Nxiss12/vexel-logic-website.git (push)
website     https://github.com/Nxiss12/vexel-logic-website.git (fetch)
website     https://github.com/Nxiss12/vexel-logic-website.git (push)
automation  https://github.com/Nxiss12/vexel-logic-automation.git (fetch)
automation  https://github.com/Nxiss12/vexel-logic-automation.git (push)
```

---

## 🔄 **DAILY WORKFLOW:**

### **When You Update the Website:**
```powershell
# Make changes to HTML files
git add *.html
git commit -m "Update homepage pricing"
git push origin main  # or just: git push
```
**Result:** Vercel auto-deploys to https://vexellogic.com

---

### **When You Update Automation:**
```powershell
# Make changes to n8n workflows
git add n8n-automation/
git commit -m "Add new plumber workflow"
git push automation main
```
**Result:** Manually deploy to Railway (or use Railway CLI)

---

### **When You Update Both:**
```powershell
# Update website
git add *.html
git commit -m "Update Pro dashboard"
git push origin main

# Update automation
git add n8n-automation/
git commit -m "Add dashboard API endpoint"
git push automation main
```

---

## 🔐 **SECURITY CHECKLIST:**

### **Before Pushing to GitHub:**

- [ ] **NEVER commit `.env` files**
- [ ] **NEVER commit API keys or passwords**
- [ ] **NEVER commit customer data**
- [ ] **NEVER commit database files**
- [ ] Check `.gitignore` is working: `git status`
- [ ] Automation repo is **PRIVATE** ⚠️

### **Double-Check:**
```powershell
# See what will be committed
git status

# See what's being ignored
git status --ignored
```

---

## 🆘 **TROUBLESHOOTING:**

### **Problem: Accidentally committed `.env` file**

**Solution:**
```powershell
# Remove from git (keeps local file)
git rm --cached .env

# Add to .gitignore
echo ".env" >> .gitignore

# Commit
git commit -m "Remove .env from git"
git push
```

**⚠️ IMPORTANT:** Change all passwords/API keys in that `.env` file!

---

### **Problem: Pushed to wrong repo**

**Solution:**
```powershell
# Check which remote you pushed to
git remote -v

# Push to correct remote
git push website main  # for website
git push automation main  # for automation
```

---

### **Problem: Want to make automation repo public**

**DON'T DO THIS!** Your customers will see workflow code and leave.

If you must, first:
1. Remove all customer-specific workflows
2. Remove all `.env.template` files with real values
3. Review every file for sensitive data
4. Change all API keys and passwords

---

## 📊 **REPO STATS:**

### **Website Repo (Public):**
- **Size:** ~5 MB (HTML + assets)
- **Files:** ~20 HTML files
- **Deployments:** Auto (Vercel)
- **Visibility:** Public (good for portfolio!)

### **Automation Repo (Private):**
- **Size:** ~2 MB (workflows + docs)
- **Files:** ~30 workflow files
- **Deployments:** Manual (Railway)
- **Visibility:** Private (protects IP!)

---

## 🎯 **NEXT STEPS:**

1. ✅ Create 2 GitHub repos (public + private)
2. ✅ Split your local project
3. ✅ Push to both repos
4. ✅ Connect Vercel to website repo
5. ✅ Connect Railway to automation repo
6. ✅ Test deployments

---

**Need help? Run the commands below and I'll guide you through it!**

