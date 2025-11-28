# Vexel Logic: Scaling & Operations Playbook
## From 0 to 500+ Clients - Systems, Processes & Infrastructure

**Version:** 1.0  
**Last Updated:** November 2025  
**Owner:** Benedict Anokye-Davies

---

## 🎯 MISSION STATEMENT

Build a scalable, profitable automation business that runs smoothly at 10 clients or 1,000 clients.

**Core Principle:** Automate everything that doesn't require human judgment. Systematize everything that does.

---

## 📊 SCALING STAGES OVERVIEW

| Stage | Clients | MRR | Team Size | Key Focus |
|-------|---------|-----|-----------|-----------|
| **Bootstrap** | 1-10 | £1-3k | Solo founder | Product-market fit |
| **Launch** | 10-25 | £3-10k | 1-2 people | Repeatable sales |
| **Scale** | 25-100 | £10-40k | 3-5 people | Systems & delegation |
| **Growth** | 100-500 | £40-200k | 8-15 people | Team leadership |

We'll build systems for **all stages from day 1**, but activate them as needed.

---

## 🏗️ PART 1: TECHNICAL INFRASTRUCTURE

### Core Technology Stack

#### **1. Website & Marketing**
- **Hosting:** Vercel or Netlify (£0-20/mo)
  - Auto-scaling
  - Global CDN
  - 99.9% uptime SLA
  
- **Domain:** vexellogic.com (Cloudflare DNS)
  - DNSSEC enabled
  - CDN for speed
  - DDoS protection

- **CMS:** No CMS needed (static site is faster)
  - Blog: Markdown files + build script
  - Updates: Git push → auto-deploy

#### **2. Customer Data & CRM**
- **CRM:** HubSpot (Free → £45/mo)
  - All leads in one place
  - Email sequences automated
  - Deal pipeline visualization
  
- **Alternative (self-hosted):** Supabase + custom dashboard
  - Already integrated in index.html
  - Full control over data
  - UK hosting available

**Data Schema:**
```
Clients Table:
- id, business_name, contact_name, email, phone
- plan_tier, mrr, signup_date, last_payment
- health_score (calculated), churn_risk (boolean)

Tools_Active Table:
- client_id, tool_name, activated_date, usage_count

Support_Tickets Table:
- client_id, subject, status, priority, assigned_to
```

#### **3. Payments & Billing**
- **Primary:** Stripe (2.9% + 20p per transaction)
  - Subscription management built-in
  - Automatic retries for failed payments
  - Invoices generated automatically
  
- **Direct Debit (UK):** GoCardless (1% capped at £2)
  - Lower fees for larger clients
  - Preferred by UK businesses
  - Better retention (harder to cancel)

**Billing Automation:**
1. New signup → Stripe subscription created
2. 3 days before renewal → reminder email
3. Payment fails → retry 3x over 7 days
4. Still failed → pause account + email
5. 14 days → cancel subscription + offboard

#### **4. Tool Hosting & Delivery**
**Current Setup:** Static HTML files (simple, fast)

**For Custom Builds:**
- **Hosting:** Railway or Render (£5-50/mo)
- **Database:** Supabase PostgreSQL (£25/mo for 10GB)
- **File Storage:** S3-compatible (Backblaze B2, 0.005/GB)

**Deployment Process:**
1. Build tool using `vexel_architect.py`
2. Test locally
3. Git push to main branch
4. Auto-deploy to production
5. Client receives access email

#### **5. Monitoring & Uptime**
- **Uptime Monitor:** UptimeRobot (free for 50 monitors)
  - Check every 5 minutes
  - Alert via SMS if down
  - Status page: status.vexellogic.com

- **Error Tracking:** Sentry (free tier)
  - JavaScript errors caught
  - Stack traces logged
  - Slack notifications for critical errors

- **Analytics:** Plausible or Simple Analytics
  - Privacy-friendly (GDPR compliant)
  - Real-time dashboard
  - No cookie banner needed

---

## 🔧 PART 2: OPERATIONAL SYSTEMS

### Customer Lifecycle Management

#### **Stage 1: Lead Capture**
**Goal:** Never lose a lead due to slow response

**System:**
- Form submission → Slack notification (instant)
- Auto-reply email within 60 seconds
- Add to HubSpot CRM automatically
- If submitted outside business hours → "We'll respond first thing tomorrow"

**SLA:** <10 minutes to first human response

#### **Stage 2: Sales Process**
**Goal:** Consistent, repeatable demos that close 30%+

**Demo Script (30 min):**
```
1. Intro (2 min)
   - Who you are
   - Quick company overview
   - Set expectations

2. Discovery (8 min)
   - "Tell me about your current setup"
   - "What's the biggest time-sink right now?"
   - "How many leads do you lose per month?"
   
3. ROI Calculator (5 min)
   - Use built-in calculator tool
   - Show THEIR numbers
   - "This is costing you £X/year"

4. Solution Demo (10 min)
   - Show 3 tools max (don't overwhelm)
   - Focus on their pain points
   - Use real examples from their industry

5. Close (5 min)
   - "We can have you live by Friday"
   - Pricing: Show value first, price second
   - Handle objections (see script below)
   - Ask for the sale: "Shall we get started?"
```

**Objection Handling:**
| Objection | Response |
|-----------|----------|
| "Too expensive" | "Compared to the £23k/year you're losing? This pays for itself in 3 weeks." |
| "Need to think about it" | "What specifically do you need to think about? Let's work through it now." |
| "Not sure if it works for us" | "That's why we offer a 7-day trial. Test it with real customers, cancel if it doesn't work." |
| "Too busy to implement" | "We do the setup. You just give us 30 minutes for training. Live in 48 hours." |

#### **Stage 3: Onboarding**
**Goal:** Get client to "first win" within 7 days

**Day 0 (Signup Day):**
- Welcome email with next steps
- Calendar invite for kickoff call (within 48 hours)
- Access credentials sent
- Assign Customer Success Manager

**Day 1 (Kickoff Call - 45 min):**
- Audit current systems
- Identify top 3 pain points
- Configure first tool together
- Set success metrics

**Day 3 (Check-in Email):**
- "How's it going?"
- Link to video tutorials
- Offer to schedule support call

**Day 7 (First Win):**
- Generate ROI report
- "You've saved X hours and recovered £Y"
- Ask for feedback
- Request testimonial (if positive)

**Day 30 (Review Call - 30 min):**
- Review metrics
- Identify next tools to activate
- Address any concerns
- Confirm they're seeing ROI

#### **Stage 4: Ongoing Success**
**Goal:** Keep churn below 5%, maximize lifetime value

**Monthly Activities:**
- Send ROI report (automated)
- Monitor usage (flag accounts with <10 uses/month)
- Quarterly business review for Pro+ clients

**Health Scoring Algorithm:**
```
Health Score = 
  (30 × Tool Usage Score) +
  (25 × Payment Success) +
  (20 × Support Ticket Resolution Time) +
  (15 × Feature Adoption) +
  (10 × NPS Score)

Red Flag Triggers:
- Health score < 50
- Zero logins in 14 days
- 2+ failed payment attempts
- NPS score < 6
- Support ticket open > 7 days
```

**Churn Prevention Playbook:**
1. Red flag detected → Alert CSM
2. CSM reaches out within 24 hours
3. "I noticed you haven't been using [tool]. Is everything okay?"
4. Offer: Free training call, tool swap, discount (last resort)
5. If cancellation requested → Exit interview + win-back offer

#### **Stage 5: Expansion & Upsells**
**Goal:** Grow revenue per customer by 20% annually

**Upsell Triggers:**
- Client hits usage limit → Email suggesting upgrade
- 90 days on Growth plan → Offer Professional trial
- 5+ support tickets/month → "Need dedicated support? Upgrade to Enterprise"

**Cross-Sell Opportunities:**
- Using Missed Call Bot → Suggest Review Engine
- High email volume → Pitch Email Campaign Builder
- Manual invoicing → Offer Invoice Generator

---

## 👥 PART 3: TEAM & DELEGATION

### Hiring Roadmap

#### **Hire #1: Customer Success Specialist (Month 4 or 10 clients)**
**Salary:** £28-32k + 5% of retained MRR  
**KPIs:**
- Onboard 100% of new clients within 7 days
- Keep churn below 5%
- NPS score > 8

**Responsibilities:**
- Client onboarding calls
- Support tickets
- Monthly check-ins
- Churn prevention

**Job Description Template:**
```
Role: Customer Success Specialist
Location: Remote (UK-based preferred)
Salary: £30k + performance bonus

About Vexel Logic:
We build automation infrastructure for UK SMEs. Think "digital nervous system" for businesses.

You'll be:
- The friendly voice clients hear when they join
- The detective who spots and fixes issues before clients complain
- The strategist who helps clients get 10x ROI

Perfect for you if:
- You love solving puzzles
- You're obsessed with making customers successful
- You can explain tech to non-tech people
- You thrive on metrics and improvement

Apply: careers@vexellogic.com
```

#### **Hire #2: Sales Development Rep (Month 8 or £10k MRR)**
**Salary:** £25k + 10% commission on closed deals  
**KPIs:**
- 50 qualified leads/month
- 15 demos booked/month
- 30% close rate

**Responsibilities:**
- LinkedIn outreach
- Cold email campaigns
- Demo booking
- Lead qualification

#### **Hire #3: Junior Developer (Month 12 or £20k MRR)**
**Salary:** £35-40k  
**KPIs:**
- Ship 2 new tools/month
- Maintain 99.9% uptime
- Resolve bugs within 48 hours

**Responsibilities:**
- Custom tool builds
- Client-specific integrations
- Technical support escalation
- Tool maintenance

### Delegation Framework

**Founder Should Focus On:**
- Product strategy
- Key partnerships
- Enterprise sales (£10k+ ARR clients)
- Fundraising (if applicable)

**Delegate Everything Else:**
| Task | Delegate To | Timeline |
|------|-------------|----------|
| Client onboarding | CS Specialist | Month 4 |
| Support tickets | CS Specialist | Month 4 |
| Outbound prospecting | SDR | Month 8 |
| Tool customization | Developer | Month 12 |
| Content writing | Freelancer | Month 6 |
| Bookkeeping | Accountant | Month 1 |

---

## 📈 PART 4: FINANCIAL OPERATIONS

### Unit Economics (Target)

**Average Customer:**
- MRR: £400
- Gross margin: 85% (low COGS)
- CAC (Customer Acquisition Cost): £500
- Payback period: 1.25 months
- LTV (Lifetime Value): £9,600 (24 months × £400)
- LTV:CAC ratio: 19:1 (excellent)

**Break-Even Analysis:**
```
Fixed Costs (Monthly):
- Founder salary: £3,000 (minimum viable)
- Software subscriptions: £500
- Hosting: £200
- Total: £3,700/month

Break-even = £3,700 ÷ (£400 × 0.85) = 11 clients
```

**Once you hit 11 clients, every additional client is profit.**

### Pricing Strategy Evolution

**Year 1: Value-Based Pricing**
- Price based on problem solved, not cost to deliver
- Missed Call Bot: Saves £4k/month → charge £99/month (40:1 ROI)

**Year 2: Tiered Expansion**
- Introduce usage-based pricing for high-volume clients
- Add "Enterprise" tier with white-glove service

**Year 3: Industry-Specific Packages**
- "Vexel for Trades" (£349/mo)
- "Vexel for Healthcare" (£699/mo)
- Pre-configured for each vertical

### Cash Flow Management

**Rule 1: Annual Prepay Discount**
- Offer 20% off for annual prepay
- Improves cash flow
- Reduces churn (psychological sunk cost)

**Rule 2: Separate Operating & Growth Accounts**
- Operating: 3 months runway minimum
- Growth: Reinvest all profit above runway

**Rule 3: Negotiate Net 60 with Vendors**
- But collect from customers monthly
- Creates cash flow buffer

---

## 🛡️ PART 5: RISK MANAGEMENT

### Business Continuity

**What if the founder (you) gets hit by a bus?**

**Immediate Playbook:**
1. CS Specialist takes over client communication
2. Pause new sales
3. Emergency contact email sent to all clients
4. Developer maintains systems
5. Accountant has authority to pay bills

**Documentation Required:**
- [ ] All passwords in 1Password (shared vault)
- [ ] Runbook for common issues
- [ ] Client list with contact info
- [ ] Bank account access (trusted person)
- [ ] "If I die" letter with instructions

### Cybersecurity

**Minimum Security Standards:**
- 2FA on all critical accounts
- Quarterly password rotation
- Daily backups (test restores monthly)
- Employee security training
- Client data encrypted at rest

**Incident Response Plan:**
1. Detect issue
2. Contain (take affected systems offline)
3. Investigate root cause
4. Notify affected clients within 24 hours
5. Fix vulnerability
6. Post-mortem document

### Legal Protection

**Required Documents:**
- [ ] Terms of Service (lawyer-reviewed)
- [ ] Privacy Policy (GDPR-compliant)
- [ ] Data Processing Agreement
- [ ] Client contracts (for custom work)
- [ ] Employee contracts (with IP assignment clause)

**Insurance:**
- Professional indemnity: £1M cover
- Cyber liability: £500k cover
- Public liability: £2M cover

**Cost:** ~£150/month for all three

---

## 📊 PART 6: METRICS & REPORTING

### Weekly Dashboard (Track in Google Sheets)

| Metric | This Week | Last Week | Change |
|--------|-----------|-----------|--------|
| **Revenue** |
| New MRR | | | |
| Churned MRR | | | |
| Net New MRR | | | |
| Total MRR | | | |
| **Sales** |
| Leads | | | |
| Demos booked | | | |
| Demos held | | | |
| Close rate % | | | |
| **Operations** |
| Active clients | | | |
| Avg health score | | | |
| Support tickets | | | |
| Avg resolution time | | | |

### Monthly Board Report (Even if you're solo)

**Revenue Section:**
- MRR growth chart
- Cohort retention curve
- Revenue by plan tier

**Customer Section:**
- New customers added
- Churn breakdown (why they left)
- NPS score trend

**Operations Section:**
- Support ticket volume
- System uptime %
- Feature releases

**Goals Section:**
- Last month's goals (hit or miss)
- This month's goals
- Blockers to address

---

## 🚀 PART 7: GROWTH EXPERIMENTS

### Monthly Innovation Budget: 10% of Revenue

**Example Experiments:**
1. **Partnership Test:** Pay 3 accountants £100 each to refer 1 client
2. **Content SEO:** Hire writer for 5 blog posts (£500)
3. **LinkedIn Ads:** £300 test budget
4. **Webinar Series:** "Automate Your Business in 30 Days" (free)
5. **Referral Incentive:** Double it for 1 month, measure impact

**Kill or Scale Decision:**
- Run for 30 days
- If ROI > 2:1 → scale up
- If ROI < 1:1 → kill immediately
- If 1:1-2:1 → optimize and re-test

---

## 🎯 PART 8: THE 1-YEAR ROADMAP

### Month 1-3: Survive
- Goal: 5 paying clients
- Focus: Do things that don't scale (manual onboarding, custom demos)
- Metric: Just don't quit

### Month 4-6: Systematize
- Goal: 15 clients
- Focus: Document everything, hire CS person
- Metric: Can you take a week off without chaos?

### Month 7-9: Scale
- Goal: 30 clients, £12k MRR
- Focus: Repeatable sales process, hire SDR
- Metric: 10 demos/month happening without you

### Month 10-12: Optimize
- Goal: 50 clients, £20k MRR
- Focus: Reduce churn, increase LTV, hire developer
- Metric: Profitable, sustainable, growing

---

## ✅ NEXT ACTIONS (Start Today)

### This Week:
- [ ] Set up HubSpot CRM
- [ ] Create Stripe account (test mode)
- [ ] Write first operational runbook
- [ ] Set up UptimeRobot monitoring
- [ ] Create 1Password shared vault

### This Month:
- [ ] Implement health scoring
- [ ] Build ROI report template
- [ ] Document onboarding process
- [ ] Create support ticket system
- [ ] Write employee handbook (even if solo)

### This Quarter:
- [ ] Hire Customer Success Specialist
- [ ] Achieve 10 active clients
- [ ] Hit £5k MRR
- [ ] Implement all Stage 1 systems

---

## 💬 CLOSING THOUGHTS

**Scaling is not about working harder. It's about building systems that work when you don't.**

Every hour you spend documenting processes today saves you 10 hours in 6 months.

**The goal isn't to be the best operator in your business. The goal is to build a business that operates without you.**

Now go build systems, not just software.

---

**Questions?**  
Email: benanokye577@gmail.com

**Let's scale this thing. 🚀**
