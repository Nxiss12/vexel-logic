# Vexel Logic - CTO Onboarding Guide

Welcome to Vexel Logic. This document will bring you up to speed on everything you need to know about our business, technical architecture, current progress, and roadmap.

---

## Table of Contents

1. [Business Overview](#1-business-overview)
2. [Technical Architecture](#2-technical-architecture)
3. [Project Structure](#3-project-structure)
4. [Current Development Status](#4-current-development-status)
5. [Key Files Reference](#5-key-files-reference)
6. [Tools Catalog](#6-tools-catalog)
7. [Database Schema](#7-database-schema)
8. [Development Roadmap](#8-development-roadmap)
9. [Getting Started](#9-getting-started)
10. [Contacts & Access](#10-contacts--access)

---

## 1. Business Overview

### What is Vexel Logic?

Vexel Logic is a **UK-focused B2B SaaS company** providing business automation tools for small and medium enterprises (SMEs). We help service-based businesses recover lost revenue, eliminate manual admin, and scale operations through intelligent automation.

### The Problem We Solve

UK small businesses face critical operational challenges:

| Problem | Impact | Our Solution |
|---------|--------|--------------|
| Missed calls during jobs | 40% of leads lost | Missed Call Bot - auto-texts in 30 seconds |
| Manual scheduling | 8+ hours/week wasted | Meeting Scheduler Plus |
| Poor online reviews | 23% fewer customers | Review Engine - automated requests |
| Scattered communications | Missed messages | Unified Inbox |
| Manual invoicing | Cash flow issues | Invoice Generator |

**Key Stat:** The average UK SME loses £20,000-£50,000 annually to these inefficiencies.

### Target Market

**Primary:** "Owen the Overwhelmed Plumber"
- Solo tradesperson or 2-3 person team
- Revenue: £50,000-£150,000
- Budget: £100-£300/month
- Channels: Facebook, Google search, local networking

**Secondary:** "Sarah the Scaling Salon Owner"
- Service business with 5-10 staff
- Revenue: £200,000-£500,000
- Budget: £300-£700/month
- Channels: Instagram, industry events, referrals

### Revenue Model

| Offering | Price | Description |
|----------|-------|-------------|
| Individual Tools | £49-£299/month | Single tool subscription |
| Starter Package | £249/month | 3 core tools |
| Growth Package | £497/month | 5 tools + support |
| Scale Package | £697/month | 10 tools + priority support |
| Enterprise | £1,000+/month | Custom selection |

### Financial Targets

| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Customers | 50 | 200 | 500 |
| MRR | £15,000 | £60,000 | £150,000 |
| ARR | £180,000 | £720,000 | £1.8M |

---

## 2. Technical Architecture

### Stack Overview

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND                             │
│  HTML5 + TailwindCSS + Vanilla JavaScript               │
│  (Static files, no build process)                       │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                     HOSTING                              │
│  Vercel (auto-deploys from GitHub)                      │
│  URL: vexellogic.com                                    │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                     BACKEND                              │
│  Supabase (PostgreSQL + Auth + REST API)                │
│  - Database for leads, customers, usage                 │
│  - Row Level Security enabled                           │
│  - Real-time subscriptions available                    │
└─────────────────────────────────────────────────────────┘
```

### Why This Stack?

1. **No Build Process:** Pure HTML/CSS/JS means zero complexity. Open in browser = working app.
2. **TailwindCSS via CDN:** Rapid UI development, consistent design system.
3. **Supabase:** Firebase alternative with PostgreSQL. Free tier generous for MVP.
4. **Vercel:** Free hosting, automatic deployments, SSL included.

### Design System

All tools follow a consistent brand:

```javascript
// Tailwind Config (embedded in each tool)
colors: {
    brand: {
        dark: '#020305',      // Page background
        navy: '#0b0f19',      // Panel backgrounds
        panel: '#111625',     // Card backgrounds
        accent: '#FBC02D',    // Yellow accent (CTAs, highlights)
        light: '#e2e8f0',     // Text color
        dim: '#64748b',       // Secondary text
        success: '#10B981',   // Green (positive states)
        danger: '#EF4444'     // Red (alerts, errors)
    }
}
```

---

## 3. Project Structure

```
Vexel project/
│
├── index.html                    # Main website/landing page
├── privacy-policy.html           # Legal page
├── terms-of-service.html         # Legal page
├── CTO-ONBOARDING.md            # This document
├── START-HERE.md                # Entry point for business operations
├── README.md                    # Project overview
│
├── LAUNCH/                      # Launch & sales materials
│   ├── Week-1-Actions.md        # Deployment checklist
│   ├── Week-2-4-Marketing.md    # Customer acquisition plan
│   ├── Quick-Setup-Guide.md     # Technical setup guide
│   ├── Sales-Playbook.md        # How to sell
│   ├── Supabase-Setup-Guide.md  # Database setup with SQL
│   ├── BUSINESS-PLAN-1-PAGE.md  # Executive summary
│   └── BUSINESS-PLAN-DETAILED.md# Full business plan
│
├── PRODUCT/                     # The actual product
│   ├── tools/                   # All 51+ automation tools
│   │   ├── index.html          # Tools marketplace
│   │   ├── CATALOG.md          # Complete tool list
│   │   ├── *.html              # Individual tools
│   │   └── marketing_tools/    # Marketing-specific tools
│   ├── scripts/                # Tool generator scripts
│   ├── Tool-Generator.md       # How to build new tools
│   └── Website-Updates.md      # How to update the site
│
├── OPERATIONS/                  # Running the business
│   ├── Customer-Onboarding.md  # New client process
│   ├── Pricing-Guide.md        # Pricing decisions
│   └── Support-Guide.md        # Customer support
│
├── RESOURCES/                   # Marketing & automation
│   ├── ai_agent/               # LinkedIn automation scripts
│   ├── marketing_assets/       # Ready-to-post content
│   └── Email-Templates.md      # Sales email templates
│
└── STRATEGY-VAULT/             # Archived strategic docs
    ├── docs/                   # 20+ strategy documents
    └── README.md               # When to read these
```

**Important:** The `STRATEGY-VAULT/` folder contains extensive strategic analysis (SWOT, PESTLE, Porter's Five Forces, etc.). These are for long-term planning, NOT daily operations. Focus on `LAUNCH/` and `PRODUCT/` for now.

---

## 4. Current Development Status

### Completed

| Component | Status | Notes |
|-----------|--------|-------|
| Main Website | ✅ Done | `index.html` - responsive, modern design |
| Tool Marketplace | ✅ Done | Dynamic tool loading with categories |
| 51+ Automation Tools | ✅ Done | Fully functional HTML tools |
| Business Plans | ✅ Done | 1-page and detailed versions |
| Database Schema | ✅ Done | SQL in `Supabase-Setup-Guide.md` |
| Design System | ✅ Done | Consistent brand across all tools |
| Documentation | ✅ Done | Comprehensive guides in `LAUNCH/` |

### Tools Built by Category

| Category | Count | Examples |
|----------|-------|----------|
| Automation | 13 | Missed Call Bot, Auto-Responder Pro, Task Automation Engine |
| Marketing | 32+ | Review Engine, Content Calendar, Landing Page Builder |
| Sales | 10 | CRM Lite, Pipeline Manager, Proposal Generator |
| Operations | 5 | Unified Inbox, Project Tracker, Inventory Tracker |
| Finance | 5 | Invoice Generator, Expense Tracker, P&L Tracker |
| Customer Success | 1 | Customer Health Dashboard |

### Not Yet Implemented

| Component | Priority | Notes |
|-----------|----------|-------|
| Supabase Integration | High | Tools work standalone, need to connect to DB |
| User Authentication | High | Supabase Auth ready, needs frontend integration |
| Payment Processing | Medium | Stripe integration for subscriptions |
| Customer Dashboard | Medium | Central hub for customers to access their tools |
| API Layer | Low | For third-party integrations |
| Mobile App | Low | Future consideration |

---

## 5. Key Files Reference

### Must-Know Files

| File | Purpose |
|------|---------|
| `index.html` | Main website, product showcase, lead capture |
| `PRODUCT/tools/index.html` | Tools marketplace |
| `PRODUCT/tools/CATALOG.md` | Complete list of all tools |
| `LAUNCH/Supabase-Setup-Guide.md` | Database schema and setup SQL |
| `LAUNCH/BUSINESS-PLAN-DETAILED.md` | Full business plan |

### Website Entry Points

| URL Path | File | Description |
|----------|------|-------------|
| `/` | `index.html` | Landing page |
| `/PRODUCT/tools/` | `PRODUCT/tools/index.html` | Tool marketplace |
| `/PRODUCT/tools/[tool].html` | Various | Individual tool pages |

---

## 6. Tools Catalog

### Automation Tools

| Tool | File | Status |
|------|------|--------|
| Auto-Responder Pro | `auto_responder_pro.html` | Complete |
| Backup Automator | `backup_automator.html` | Complete |
| Data Entry Bot | `data_entry_bot.html` | Complete |
| Document Auto-Filer | `document_auto_filer.html` | Complete |
| Email Filter Pro | `email_filter_pro.html` | Complete |
| Follow-Up Reminder | `follow_up_reminder.html` | Complete |
| Meeting Notes Transcriber | `meeting_notes_transcriber.html` | Complete |
| Meeting Scheduler Plus | `meeting_scheduler_plus.html` | Complete |
| Missed Call Bot | `missed_call_bot.html` | Complete |
| Report Generator | `report_generator.html` | Complete |
| Task Automation Engine | `task_automation_engine.html` | Complete |

### Sales Tools

| Tool | File | Status |
|------|------|--------|
| AI Receptionist | `ai_receptionist.html` | Complete |
| Call Logger | `call_logger.html` | Complete |
| Commission Calculator | `commission_calculator.html` | Complete |
| CRM Lite | `crm_lite.html` | Complete |
| Database Reactivator | `database_reactivator.html` | Complete |
| Pipeline Manager | `pipeline_manager.html` | Complete |
| Proposal Generator | `proposal_generator.html` | Complete |
| Referral Tracker | `referral_tracker.html` | Complete |

### Finance Tools

| Tool | File | Status |
|------|------|--------|
| Expense Tracker | `expense_tracker.html` | Complete |
| Invoice Generator | `invoice_generator.html` | Complete |
| Profit & Loss Tracker | `profit_loss_tracker.html` | Complete |
| Quote Calculator | `quote_calculator.html` | Complete |

### Marketing Tools (in `marketing_tools/` subfolder)

Over 30 tools including:
- Content Calendar
- A/B Test Manager
- Landing Page Builder
- Competitor Monitor
- Blog Post Generator
- Social Proof Widget
- UTM Builder
- Survey Builder
- And more...

---

## 7. Database Schema

The database is designed for Supabase (PostgreSQL). Full SQL is in `LAUNCH/Supabase-Setup-Guide.md`.

### Core Tables

```sql
-- Leads from website
leads (
    id UUID PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    company TEXT,
    source TEXT,
    status TEXT DEFAULT 'new',
    selected_tools JSONB,
    estimated_value NUMERIC
)

-- Paying customers
customers (
    id UUID PRIMARY KEY,
    business_name TEXT,
    contact_name TEXT,
    email TEXT UNIQUE,
    plan_tier TEXT,
    monthly_price NUMERIC,
    mrr NUMERIC,
    health_score INTEGER,
    churn_risk BOOLEAN
)

-- Tool usage tracking
tools_usage (
    id UUID PRIMARY KEY,
    customer_id UUID REFERENCES customers,
    tool_name TEXT,
    usage_count INTEGER,
    last_used TIMESTAMP
)

-- Support tickets
support_tickets (
    id UUID PRIMARY KEY,
    customer_id UUID REFERENCES customers,
    subject TEXT,
    status TEXT DEFAULT 'open',
    priority TEXT
)

-- ROI calculator results
calculator_results (
    id UUID PRIMARY KEY,
    missed_calls_per_week INTEGER,
    average_job_value NUMERIC,
    annual_lost_revenue NUMERIC,
    recoverable_revenue NUMERIC
)
```

### Row Level Security

All tables have RLS enabled with permissive policies for the MVP phase. Will need to be tightened for production.

---

## 8. Development Roadmap

### Phase 1: Foundation (COMPLETE)
- [x] Website design and development
- [x] 51+ tools built
- [x] Business plans created
- [x] Database schema designed
- [x] Documentation complete

### Phase 2: Backend Integration (NEXT)
- [ ] Connect tools to Supabase for data persistence
- [ ] Implement lead capture form → database
- [ ] Add analytics tracking
- [ ] Set up environment variables in Vercel

### Phase 3: Authentication
- [ ] Implement Supabase Auth
- [ ] User registration flow
- [ ] Login/logout functionality
- [ ] Password reset

### Phase 4: Customer Dashboard
- [ ] Central hub for customers
- [ ] Tool access management
- [ ] Usage statistics
- [ ] Billing overview

### Phase 5: Payments
- [ ] Stripe integration
- [ ] Subscription management
- [ ] Invoice generation
- [ ] Usage-based billing (optional)

### Phase 6: Scale
- [ ] API for third-party integrations
- [ ] White-label solution
- [ ] Mobile app
- [ ] AI-powered features

---

## 9. Getting Started

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/[your-repo]/vexel-logic.git
   cd vexel-logic
   ```

2. **Open in browser:**
   ```bash
   # No build process needed - just open the file
   open index.html
   # Or use a local server for better dev experience
   npx serve .
   ```

3. **Make changes:**
   - Edit HTML/CSS/JS directly
   - Changes are instant (just refresh browser)

### Deployment

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Vercel auto-deploys:**
   - Connected to GitHub repo
   - Every push to `main` triggers deployment
   - Live in ~30 seconds

### Adding a New Tool

1. Copy an existing tool HTML file as template
2. Update the content and functionality
3. Add entry to `PRODUCT/tools/CATALOG.md`
4. Update `index.html` toolFileMap if needed
5. Push to deploy

---

## 10. Contacts & Access

### Team

| Role | Name | Email |
|------|------|-------|
| Founder/CEO | Benedict Anokye-Davies | benanokye577@gmail.com |
| CTO | [Your Name] | [Your Email] |

### Access Needed

| Service | Purpose | How to Get Access |
|---------|---------|-------------------|
| GitHub | Code repository | Request invite from Founder |
| Vercel | Hosting/deployment | Request team invite |
| Supabase | Database | Request project access |
| Domain Registrar | DNS management | Credentials from Founder |

### Key URLs

| Resource | URL |
|----------|-----|
| Live Website | https://vexellogic.com (or Vercel URL) |
| GitHub Repo | [Request from Founder] |
| Supabase Dashboard | https://app.supabase.com |
| Vercel Dashboard | https://vercel.com |

---

## Quick Reference Card

```
WHAT WE DO:     Business automation tools for UK SMEs
TARGET:         Trades, healthcare, professional services
PRICING:        £49-£697/month
STACK:          HTML + Tailwind + Supabase + Vercel
TOOLS BUILT:    51+
CURRENT PHASE:  Development complete, backend integration next
PRIORITY:       Supabase integration → Auth → Payments
```

---

## Questions?

- Check `START-HERE.md` for business operations overview
- Check `LAUNCH/` folder for all launch-related materials
- For strategic analysis, see `STRATEGY-VAULT/docs/`

Welcome to the team!

---

*Document created: November 2024*
*Last updated: November 2024*


