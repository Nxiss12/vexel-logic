# 🚀 n8n Setup Guide for Vexel Logic

## Overview
This guide will walk you through deploying n8n to Railway.app for both internal automation and customer-facing workflows.

---

## 📋 Prerequisites

- [x] Railway.app account (free tier)
- [x] GitHub account
- [x] Supabase project (existing)
- [x] Twilio account (existing)
- [x] Email service (SendGrid or Resend)
- [x] Calendly account

---

## 🏗️ Deployment Options

### Option 1: Railway.app (Recommended for Production)
- **Cost:** Free tier (500 hours/month) or $5/mo
- **Pros:** Managed PostgreSQL, auto-scaling, HTTPS
- **Cons:** Requires credit card for free tier

### Option 2: Local Development (Testing Only)
- **Cost:** Free
- **Pros:** Full control, instant testing
- **Cons:** Not accessible for webhooks

---

## 🚀 OPTION 1: Deploy to Railway.app

### Step 1: Prepare Repository

```bash
# From your Vexel project root
cd n8n-automation

# Initialize git if not already done
git init
git add .
git commit -m "Initial n8n automation setup"

# Push to GitHub (create new repo: vexel-n8n-automation)
git remote add origin https://github.com/YOUR_USERNAME/vexel-n8n-automation.git
git push -u origin main
```

---

### Step 2: Create Railway Project

1. Go to https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select `vexel-n8n-automation`
4. Railway will detect the project

---

### Step 3: Add PostgreSQL Database

1. In Railway dashboard, click "+ New"
2. Select "Database" → "PostgreSQL"
3. Railway auto-creates `DATABASE_URL`
4. n8n will automatically connect

---

### Step 4: Configure Environment Variables

In Railway → Settings → Variables, add:

#### Core n8n Settings:
```
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=YOUR_SECURE_PASSWORD
N8N_ENCRYPTION_KEY=YOUR_32_CHAR_HEX_KEY
N8N_HOST=your-app.railway.app
N8N_PORT=5678
N8N_PROTOCOL=https
WEBHOOK_URL=https://your-app.railway.app
GENERIC_TIMEZONE=Europe/London
```

**Generate encryption key:**
```bash
# On Mac/Linux:
openssl rand -hex 32

# On Windows (PowerShell):
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

#### Supabase:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
```

#### Twilio:
```
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

#### Email (Choose SendGrid OR Resend):
```
SENDGRID_API_KEY=SG.xxxxx
# OR
RESEND_API_KEY=re_xxxxx

EMAIL_FROM=ben@vexellogic.com
EMAIL_FROM_NAME=Vexel Logic
```

#### Calendly:
```
CALENDLY_API_KEY=your_api_key
```

#### Slack (Optional):
```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxxxx
```

#### OpenAI (Optional - for AI workflows):
```
OPENAI_API_KEY=sk-xxxxx
```

---

### Step 5: Deploy

1. Railway will auto-deploy after adding variables
2. Wait 2-3 minutes for build
3. Click "Generate Domain" to get public URL
4. Access n8n at: `https://your-app.railway.app`

---

### Step 6: Login to n8n

1. Go to your Railway URL
2. Login with:
   - Username: `admin` (or what you set)
   - Password: (what you set in env vars)

---

### Step 7: Import Workflows

1. In n8n dashboard, click "Workflows" → "Import from File"
2. Import workflows from `n8n-automation/workflows/internal/`:
   - `trial-onboarding.json`
   - `customer-monitoring.json`
   - `revenue-reporting.json`

---

## 🧪 OPTION 2: Local Development Setup

### Step 1: Install Docker Desktop

**Windows:**
1. Download from https://www.docker.com/products/docker-desktop/
2. Install and restart
3. Open Docker Desktop

**Mac:**
```bash
brew install --cask docker
```

---

### Step 2: Setup Environment

```bash
cd n8n-automation
cp .env.template .env

# Edit .env with your credentials
notepad .env  # Windows
nano .env     # Mac/Linux
```

---

### Step 3: Start n8n

```bash
docker-compose up -d
```

**Check status:**
```bash
docker-compose ps
```

---

### Step 4: Access n8n

Open browser: http://localhost:5678

Login with credentials from `.env`

---

### Step 5: Test Workflows

1. Import workflows from `workflows/internal/`
2. Click "Execute Workflow" to test
3. Check logs in Docker:
   ```bash
   docker-compose logs -f n8n
   ```

---

## 🔗 Connect External Services

### Calendly Webhooks

1. Go to Calendly → Integrations → Webhooks
2. Add webhook URL:
   ```
   https://your-app.railway.app/webhook/calendly
   ```
3. Select events: `invitee.created`, `invitee.canceled`
4. Copy signing key to `CALENDLY_WEBHOOK_SECRET`

---

### Supabase Integration

n8n will connect to Supabase using the credentials in env vars.

**Test connection:**
1. In n8n, create new workflow
2. Add "Supabase" node
3. Configure with your credentials
4. Test query: `SELECT * FROM missed_calls LIMIT 1`

---

### Twilio Integration

**For SMS sending:**
1. In n8n, add "Twilio" node
2. Credentials auto-loaded from env vars
3. Test: Send SMS to your phone

---

### Email Integration (SendGrid)

1. Get API key from SendGrid dashboard
2. Add to env vars: `SENDGRID_API_KEY`
3. In n8n, add "SendGrid" node
4. Test: Send email to yourself

---

## 🧪 Test Your First Workflow

### Trial User Onboarding Test

1. Import `workflows/internal/trial-onboarding.json`
2. Click "Execute Workflow"
3. Use test data:
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "phone": "+447123456789",
     "business_type": "Plumber"
   }
   ```
4. Check:
   - [ ] Supabase record created
   - [ ] Welcome email sent
   - [ ] Slack notification (if configured)

---

## 🔐 Security Best Practices

### 1. Change Default Password
```
N8N_BASIC_AUTH_PASSWORD=use_a_strong_password_here
```

### 2. Secure Webhook Endpoints
Add authentication tokens to webhook URLs:
```
https://your-app.railway.app/webhook/calendly?token=YOUR_SECRET_TOKEN
```

### 3. Rotate Encryption Key
Generate new key every 6 months:
```bash
openssl rand -hex 32
```

### 4. Enable 2FA (n8n Cloud only)
If using n8n Cloud, enable 2FA in account settings.

---

## 📊 Monitoring & Logs

### Railway Logs
```
Railway Dashboard → Your Project → Logs
```

### n8n Execution Logs
```
n8n Dashboard → Executions
```

### Set Up Alerts
1. In Railway, go to Settings → Notifications
2. Add email for deployment failures
3. Add Slack webhook for errors

---

## 🆘 Troubleshooting

### Issue: n8n won't start
**Solution:** Check Railway logs for errors
```
Railway Dashboard → Logs
```

Common issues:
- Missing `N8N_ENCRYPTION_KEY`
- Invalid database connection
- Port already in use (local)

---

### Issue: Webhooks not working
**Solution:** Check webhook URL is public
```
Test: curl https://your-app.railway.app/webhook-test
```

Ensure:
- Railway domain is generated
- HTTPS is enabled
- No firewall blocking

---

### Issue: Database connection failed
**Solution:** Verify PostgreSQL is running
```
Railway Dashboard → Database → Check status
```

Check env vars:
- `DATABASE_URL` is set (Railway auto-injects)
- Or manual config: `DB_POSTGRESDB_*` variables

---

## 🎉 Next Steps

1. ✅ n8n deployed and accessible
2. ✅ Workflows imported
3. ✅ External services connected
4. ➡️ **Build your first automation** (see `trial-onboarding.json`)
5. ➡️ **Create customer templates** (see `WORKFLOW_LIBRARY.md`)
6. ➡️ **Launch Vexel Logic Pro** (see main README)

---

## 📚 Resources

- **n8n Docs:** https://docs.n8n.io/
- **Railway Docs:** https://docs.railway.app/
- **n8n Community:** https://community.n8n.io/
- **Vexel Logic Support:** ben@vexellogic.com

---

**Ready to automate? Let's build your first workflow!** 🚀

