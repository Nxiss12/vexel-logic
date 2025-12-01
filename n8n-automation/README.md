# 🤖 Vexel Logic n8n Automation Hub

## Overview

This directory contains n8n workflow automation for both:
1. **Internal Operations** - Automate Vexel Logic business processes
2. **Customer Workflows** - Pre-built templates for Vexel Logic Pro customers

---

## 🏗️ Architecture

```
n8n Instance (Railway.app)
    ↓
Connects to:
├── Calendly (Trial bookings)
├── Supabase (Customer data)
├── Twilio (SMS/Calls)
├── SendGrid/Resend (Emails)
├── Slack (Notifications)
└── Customer Systems (via webhooks)
```

---

## 📁 Directory Structure

```
n8n-automation/
├── README.md                          # This file
├── docker-compose.yml                 # Local development setup
├── railway.json                       # Railway deployment config
├── .env.template                      # Environment variables template
├── workflows/
│   ├── internal/
│   │   ├── trial-onboarding.json     # Auto-onboard trial users
│   │   ├── customer-monitoring.json   # Health checks & alerts
│   │   ├── revenue-reporting.json     # Weekly stats emails
│   │   └── support-triage.json        # Auto-categorize support emails
│   └── customer-templates/
│       ├── plumber-lead-to-booking.json
│       ├── dentist-patient-journey.json
│       ├── solicitor-client-onboarding.json
│       └── generic-missed-call-recovery.json
└── docs/
    ├── SETUP_GUIDE.md                 # How to deploy n8n
    ├── WORKFLOW_LIBRARY.md            # Customer workflow catalog
    └── API_INTEGRATION.md             # How customers connect their tools
```

---

## 🚀 Quick Start (Local Development)

### 1. Install Docker
```bash
# Windows: Download Docker Desktop
# https://www.docker.com/products/docker-desktop/
```

### 2. Clone & Setup
```bash
cd n8n-automation
cp .env.template .env
# Edit .env with your credentials
```

### 3. Start n8n
```bash
docker-compose up -d
```

### 4. Access n8n
```
http://localhost:5678
```

---

## ☁️ Production Deployment (Railway.app)

### Why Railway?
- ✅ Free tier (500 hours/month)
- ✅ Same platform as missed call bot
- ✅ Easy environment variables
- ✅ Automatic HTTPS
- ✅ PostgreSQL database included

### Deploy Steps:
1. Push this folder to GitHub
2. Connect Railway to repo
3. Add environment variables
4. Deploy!

**Detailed guide:** `docs/SETUP_GUIDE.md`

---

## 🔧 Internal Workflows (Option 1)

### 1. Trial User Onboarding
**Trigger:** Calendly webhook (7-day trial booking)

**Actions:**
- Create Supabase customer record
- Send welcome email with setup instructions
- Notify Slack: "New trial: [Name] - [Business Type]"
- Schedule 48-hour setup call reminder
- Add to Google Sheet tracking

**Time Saved:** 30 min/customer

---

### 2. Customer Health Monitoring
**Trigger:** Cron (runs every 6 hours)

**Actions:**
- Query Supabase for all active customers
- Check missed call recovery rates
- Identify inactive customers (0 calls in 7 days)
- Send proactive "Is everything working?" email
- Alert Slack if recovery rate drops below 50%

**Churn Prevention:** Catch issues before cancellation

---

### 3. Revenue Reporting
**Trigger:** Cron (Monday 9am)

**Actions:**
- Pull weekly stats from Supabase
- Calculate total calls recovered across all customers
- Generate revenue impact report
- Email to ben@vexellogic.com
- Post summary to Slack

**Visibility:** Know your numbers without manual work

---

### 4. Support Email Triage
**Trigger:** Email to ben@vexellogic.com

**Actions:**
- AI analyzes email content
- Categorize: Bug / Setup Question / Feature Request / Urgent
- If bug → Create GitHub issue
- If setup → Send knowledge base article
- If urgent → SMS notification
- All others → Add to support queue

**Response Time:** Instant acknowledgment

---

## 🎁 Customer Workflows (Option 2 - Vexel Logic Pro)

### Pre-built Templates for Customers:

#### 1. **Plumber's Lead-to-Booking**
```
Missed Call → SMS Reply → Check Calendar → Send Booking Link → 
Add to Calendar → Send Reminders → Job Complete → Request Review
```

**Customer Benefit:** 85% booking rate (vs 64% call recovery)

---

#### 2. **Dentist's Patient Journey**
```
New Patient → Send Intake Forms → Schedule Appointment → 
Reminders → Post-Visit Review Request → Auto-post 5-star reviews
```

**Customer Benefit:** 3x more Google reviews

---

#### 3. **Solicitor's Client Onboarding**
```
New Client → Create Drive Folder → Send Welcome Pack → 
Schedule Consultation → Set Case Milestones → Auto-invoice → 
Payment Reminders
```

**Customer Benefit:** 10+ hours/week saved

---

## 💰 Pricing Strategy

### Standard Tiers (Existing):
- **Starter:** £149/mo + £697 setup
- **Professional:** £249/mo + £697 setup

### NEW - Vexel Logic Pro:
- **Pro:** £349/mo + £697 setup
- Includes: All 3 modules + Custom Workflow Builder + 5 pre-built templates

**Revenue Impact:** £100/mo extra × 20 customers = **+£2,000/mo**

---

## 🔐 Security & Compliance

### Data Handling:
- ✅ All customer data encrypted at rest
- ✅ Webhook endpoints use authentication tokens
- ✅ n8n credentials stored in Railway environment (not in code)
- ✅ GDPR compliant (data processed in UK/EU)

### Customer Workflows:
- ✅ Customers control their own data
- ✅ We provide templates, they connect their tools
- ✅ No Vexel Logic access to customer workflow data

---

## 📊 Success Metrics

### Internal Automation:
- Time saved per week: **10-15 hours**
- Customer onboarding time: **30 min → 5 min**
- Churn rate: **-20%** (proactive monitoring)

### Customer-Facing Product:
- Target adoption: **30% of Pro tier customers**
- Average workflows per customer: **3-5**
- Customer satisfaction: **+25%** (more value)

---

## 🛠️ Tech Stack

- **n8n:** Workflow automation platform
- **Railway.app:** Hosting (PostgreSQL + n8n instance)
- **Supabase:** Customer database
- **Twilio:** SMS/Call handling
- **Calendly:** Booking webhooks
- **SendGrid/Resend:** Email sending
- **Slack:** Internal notifications

---

## 📚 Next Steps

1. **Deploy n8n to Railway** → `docs/SETUP_GUIDE.md`
2. **Build first workflow** → `workflows/internal/trial-onboarding.json`
3. **Test with real trial user** → Validate automation
4. **Create Pro product page** → `vexel-logic-pro.html`
5. **Launch to 5 pilot customers** → Gather feedback
6. **Full rollout** → Add to pricing page

---

## 🆘 Support

**Questions?** Email ben@vexellogic.com

**n8n Community:** https://community.n8n.io/
**n8n Docs:** https://docs.n8n.io/

---

**Built with ⚡ by Vexel Logic**

