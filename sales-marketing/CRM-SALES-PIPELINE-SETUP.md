# CRM & Sales Pipeline Setup Guide

## Overview

A well-structured CRM and sales pipeline is critical for tracking leads, managing relationships, and forecasting revenue. This guide provides everything needed to set up your sales system.

**Recommended Tool:** HubSpot (Free tier) or Notion (if budget-conscious)

---

## Pipeline Stages

### Stage 1: Lead
**Definition:** Contact has shown interest but not yet qualified

**Entry Criteria:**
- Filled out website form
- Responded to LinkedIn message
- Downloaded lead magnet
- Referred by existing contact

**Activities:**
- Initial outreach (if inbound)
- Send value-first content
- Qualify against ICP criteria

**Expected Duration:** 1-3 days

**Exit Criteria:**
- Qualified and call booked → Move to "Qualified"
- Not a fit → Move to "Disqualified"
- No response after 3 touchpoints → Move to "Nurture"

---

### Stage 2: Qualified
**Definition:** Lead meets ICP criteria and consultation call is booked

**Entry Criteria:**
- Company size: 10-100 employees
- Clear automation need
- Budget authority confirmed or implied
- Call scheduled

**Activities:**
- Send pre-call questionnaire
- Research company (LinkedIn, website, Crunchbase)
- Prepare custom talking points
- Confirm call 24 hours before

**Expected Duration:** 3-7 days (from qualification to call)

**Exit Criteria:**
- Call completed → Move to "Discovery"
- No-show (after 2 reschedules) → Move to "Disqualified"

---

### Stage 3: Discovery
**Definition:** Initial consultation call completed, assessing fit

**Entry Criteria:**
- Strategic assessment call completed
- Pain points identified
- Rough scope discussed

**Activities:**
- Send follow-up email with call summary
- Create custom ROI projection
- Draft initial proposal outline
- Schedule proposal presentation call (if needed)

**Expected Duration:** 1-3 days

**Exit Criteria:**
- Proposal requested → Move to "Proposal"
- Not ready/not a fit → Move to "Nurture" or "Disqualified"

---

### Stage 4: Proposal
**Definition:** Custom proposal sent, awaiting decision

**Entry Criteria:**
- Proposal document created and sent
- Client has reviewed or is reviewing

**Activities:**
- Follow up 48 hours after sending
- Answer questions
- Schedule closing call if needed
- Address objections
- Offer pilot pricing (if applicable)

**Expected Duration:** 3-7 days

**Exit Criteria:**
- Verbal agreement → Move to "Closing"
- Needs more time/info → Stay in "Proposal"
- Declined → Move to "Lost"

---

### Stage 5: Closing
**Definition:** Agreement reached, finalizing contracts and payment

**Entry Criteria:**
- Client has agreed verbally or in writing
- Ready to sign contract

**Activities:**
- Send contract for signature
- Send invoice/payment link (50% deposit)
- Schedule kickoff call
- Send welcome email with onboarding materials

**Expected Duration:** 2-5 days

**Exit Criteria:**
- Contract signed + payment received → Move to "Won"
- Client backs out → Move to "Lost"

---

### Stage 6: Won
**Definition:** Client signed and paid, project starting

**Entry Criteria:**
- Contract signed
- 50% deposit received
- Kickoff call scheduled

**Activities:**
- Internal project kickoff
- Add to implementation tracker
- Send client welcome pack
- Begin Phase 1 (Strategic Assessment)

**This deal stays in "Won" - add to separate implementation tracker**

---

### Stage 7: Lost
**Definition:** Deal did not close

**Entry Criteria:**
- Client declined
- Budget not available
- Timing not right
- Chose competitor

**Activities:**
- Request feedback on why we lost
- Add to nurture campaign for future follow-up
- Document learnings

**Lost Reason Categories:**
- Budget
- Timing
- Not a fit
- Competitor
- No decision/ghosted

---

### Stage 8: Disqualified
**Definition:** Does not meet ICP criteria

**Entry Criteria:**
- Company too small (<10 employees)
- No clear automation need
- No budget authority
- Outside target market

**Activities:**
- Send polite "not a fit right now" email
- Offer free resources
- Connect on LinkedIn for future

---

### Stage 9: Nurture
**Definition:** Qualified but not ready now

**Entry Criteria:**
- Meets ICP criteria
- Has the need
- But timing is off (6+ months out)

**Activities:**
- Add to long-term nurture sequence
- Send monthly value content
- Check in quarterly

---

## CRM Fields & Data Structure

### Contact Fields (People)

**Basic Information:**
- First Name
- Last Name
- Email
- Phone
- LinkedIn URL
- Title/Role
- Company

**Qualification Data:**
- Company Size (# employees)
- Monthly Revenue Range
- Industry
- Primary Pain Point
- Budget Authority (Yes/No/Unknown)
- Decision Timeline
- How They Found Us

**Engagement Tracking:**
- Lead Source (LinkedIn/Website/Referral/Other)
- First Contact Date
- Last Contact Date
- Number of Touchpoints
- Email Opens
- Link Clicks

**Notes & Tags:**
- ICP Fit Score (1-10)
- Tags (e.g., "Hot Lead", "Pilot Candidate", "Q1 Start")
- Notes field for qualitative info

---

### Company Fields (Organizations)

**Basic Information:**
- Company Name
- Website
- Industry
- Company Size
- Location
- LinkedIn Company Page

**Qualification Data:**
- Annual Revenue (estimate)
- Growth Stage (Startup/Scaleup/Enterprise)
- Tech Stack (known tools they use)
- Automation Maturity (None/Basic/Advanced)

**Relationship Data:**
- Primary Contact
- Secondary Contacts
- Referral Source
- Relationship Strength

---

### Deal Fields (Opportunities)

**Basic Information:**
- Deal Name (format: "[Company] - [Package] - [Month Year]")
- Amount (£)
- Package Type (Starter/Professional/Enterprise)
- Expected Close Date
- Probability (%)

**Proposal Details:**
- Automation Focus (Revenue/Operations/Customer Success/Executive)
- Specific Workflows Proposed
- ROI Projected (£/year)
- Time Savings Projected (hrs/week)

**Progress Tracking:**
- Stage
- Stage Entry Date
- Days in Current Stage
- Next Action
- Next Action Date

**Win/Loss Tracking:**
- Close Date (if won)
- Lost Date (if lost)
- Lost Reason (if lost)
- Competitor Name (if lost to competitor)

---

## CRM Setup: HubSpot (Free Tier)

### Step 1: Sign Up
1. Go to https://www.hubspot.com/
2. Sign up for free CRM
3. Complete basic company profile

### Step 2: Configure Pipeline
1. Go to Settings → Objects → Deals
2. Click "Pipelines"
3. Create "VexelLogic Sales Pipeline"
4. Add stages as documented above
5. Set probability for each stage:
   - Lead: 5%
   - Qualified: 10%
   - Discovery: 20%
   - Proposal: 50%
   - Closing: 80%
   - Won: 100%
   - Lost: 0%

### Step 3: Custom Properties
1. Go to Settings → Properties
2. Add custom fields as listed above
3. Organize into groups:
   - Qualification Info
   - Proposal Details
   - Win/Loss Analysis

### Step 4: Email Integration
1. Go to Settings → Email
2. Connect your business email (hello@vexellogic.com)
3. Enable email tracking
4. Set up templates

### Step 5: Forms Integration
1. Go to Marketing → Forms
2. Connect website consultation form
3. Set up automatic contact creation
4. Configure form notification emails

### Step 6: Import Contacts
1. Create CSV with existing contacts
2. Go to Contacts → Import
3. Map fields correctly
4. Import and verify

---

## CRM Setup: Notion (Budget Option)

### Template Structure

**Database 1: Contacts**
- Properties: Name, Email, Phone, Company, Title, Lead Source, ICP Score, Stage, Tags

**Database 2: Companies**
- Properties: Company Name, Website, Size, Industry, Revenue Range, Primary Contact (relation to Contacts)

**Database 3: Deals**
- Properties: Deal Name, Company (relation), Amount, Package, Stage, Expected Close, Probability, Next Action

**Database 4: Activities**
- Properties: Date, Type (Call/Email/Meeting), Contact (relation), Notes, Next Steps

**Views to Create:**
- **Kanban Board:** Group by Stage
- **Table View:** All deals with key fields
- **Calendar View:** By Expected Close Date
- **Hot Leads:** Filter for high probability deals

### Notion Template

```
VEXELLOGIC CRM
==============

📊 PIPELINE OVERVIEW
├─ Total Deals: [Formula]
├─ Pipeline Value: [Formula]
├─ Expected This Month: [Formula]
└─ Win Rate: [Formula]

📞 CONTACTS
[Database view - table]

🏢 COMPANIES
[Database view - gallery]

💰 DEALS (Pipeline View)
[Database view - kanban by Stage]

📋 ACTIVITIES
[Database view - timeline]

📈 REPORTS
├─ Deals Closed This Month: [Filter]
├─ Deals Lost This Month: [Filter]
└─ Conversion Rate by Stage: [Manual tracking]
```

---

## Sales Process Workflows

### Workflow 1: Inbound Lead (Website Form)

```
[Website Form Filled]
        ↓
[Auto-create Contact in CRM]
        ↓
[Create Deal in "Lead" stage]
        ↓
[Send Confirmation Email (automated)]
        ↓
[Notify You via Slack/Email]
        ↓
[You respond within 2 hours]
        ↓
[Qualification questions]
        ↓
[If qualified: Book call → Move to "Qualified"]
[If not: Move to "Disqualified"]
```

### Workflow 2: LinkedIn Outbound

```
[Send Connection Request]
        ↓
[Connection Accepts]
        ↓
[Create Contact in CRM - "Lead" stage]
        ↓
[Send Follow-up Message]
        ↓
[They respond with interest]
        ↓
[Qualify via LinkedIn messages]
        ↓
[Book call]
        ↓
[Create Deal → Move to "Qualified"]
```

### Workflow 3: Consultation Call → Proposal

```
[Call scheduled - Deal in "Qualified"]
        ↓
[Complete call]
        ↓
[Move to "Discovery"]
        ↓
[Send follow-up email within 24hrs]
        ↓
[Create custom proposal (1-2 days)]
        ↓
[Send proposal]
        ↓
[Move to "Proposal"]
        ↓
[Follow up after 48hrs if no response]
        ↓
[Answer questions / Handle objections]
        ↓
[Client agrees]
        ↓
[Move to "Closing"]
        ↓
[Send contract + invoice]
        ↓
[Signed + Paid]
        ↓
[Move to "Won"]
        ↓
[Schedule kickoff]
```

---

## Email Templates (HubSpot)

### Template 1: Consultation Confirmation

```
Subject: VexelLogic Consultation Confirmed – {{Date}}

Hi {{First Name}},

Excited for our conversation on {{Date}} at {{Time}}!

Calendar invite attached.

**Before the call, please think about:**
1. Which 2-3 team members spend the most time on repetitive tasks?
2. What specific tasks consume their time?
3. What you'd have them do instead if they had 15 extra hours/week?

This will help me tailor our conversation to {{Company}}'s specific needs.

**Meeting Link:** {{Meeting Link}}

Looking forward to it!

Best,
{{Your Name}}
VexelLogic
```

### Template 2: Post-Call Follow-Up

```
Subject: Great talking with you, {{First Name}}!

Hi {{First Name}},

Thanks for the great conversation today!

**Here's what we discussed:**
- {{Pain Point 1}}
- {{Pain Point 2}}
- {{Pain Point 3}}

**Next Steps:**
I'll prepare a custom proposal showing exactly how we can:
- Save {{Employee Name}} {{Hours}} hours/week
- {{Specific benefit discussed}}
- {{ROI projection}}

I'll send this over by {{Date}}.

In the meantime, here's a case study from a similar company: [Link]

Questions? Just reply to this email or text me at {{Phone}}.

Talk soon!

Best,
{{Your Name}}
```

### Template 3: Proposal Sent

```
Subject: {{Company}} – Employee Amplification Proposal

Hi {{First Name}},

Attached is your custom proposal for amplifying {{Company}}'s team productivity.

**Key Highlights:**
- Package: {{Package Name}}
- Investment: £{{Amount}}
- Projected ROI: £{{ROI per year}}
- Implementation: 30 days
- Guarantee: 15hrs/week minimum savings

**What's Inside:**
- Your specific pain points & how we solve them
- Workflows we'll automate
- Timeline and deliverables
- Pricing and ROI breakdown
- Case studies from similar companies

**Next Steps:**
Review and let me know if you have questions. Happy to jump on a 15-min call to walk through it.

Available for a quick call {{Day 1}} or {{Day 2}}?

Best,
{{Your Name}}

P.S. Pilot pricing (50% off) is only available until {{Date}}, so let me know soon if you want to lock that in!
```

### Template 4: Proposal Follow-Up (48 hours later)

```
Subject: Re: {{Company}} Proposal – Quick Question

Hi {{First Name}},

Wanted to check in – did you get a chance to review the proposal I sent over on {{Date}}?

I know you're busy, so if there's anything I can clarify or if you'd like to discuss any part of it, I'm here.

Also, quick reminder: Pilot pricing ends {{Date}}, so if you want to move forward at 50% off, now's the time.

Let me know if you have 15 minutes for a quick call this week?

Best,
{{Your Name}}
```

---

## Reporting & Metrics

### Daily Metrics
- New leads added
- Calls completed
- Proposals sent
- Deals closed

### Weekly Metrics
- Total pipeline value
- Number of deals in each stage
- Average days in each stage
- Win rate (deals closed / proposals sent)
- Lead → Qualified conversion rate
- Qualified → Proposal conversion rate

### Monthly Metrics
- Revenue closed
- Number of deals won/lost
- Lost reasons breakdown
- Average deal size
- Average sales cycle length
- Total pipeline coverage (pipeline value / monthly target)

### Dashboard Template

```
VEXELLOGIC SALES DASHBOARD
Month: December 2025
==========================

💰 REVENUE
├─ Closed This Month: £_______
├─ Target: £_______
├─ % of Target: ____%
└─ Projected (by month end): £_______

📊 PIPELINE HEALTH
├─ Total Pipeline Value: £_______
├─ Weighted Pipeline (by probability): £_______
├─ Deals in Pipeline: _____
├─ Average Deal Size: £_______
└─ Pipeline Coverage: ___x (pipeline / target)

🔄 CONVERSION RATES
├─ Lead → Qualified: ____%
├─ Qualified → Discovery: ____%
├─ Discovery → Proposal: ____%
├─ Proposal → Closing: ____%
├─ Closing → Won: ____%
└─ Overall Win Rate: ____%

⏱️ SALES VELOCITY
├─ Average Days in Lead: _____
├─ Average Days in Qualified: _____
├─ Average Days in Discovery: _____
├─ Average Days in Proposal: _____
├─ Total Sales Cycle: _____ days
└─ Target Cycle: 14 days

📈 MONTHLY ACTIVITY
├─ New Leads: _____
├─ Calls Completed: _____
├─ Proposals Sent: _____
├─ Deals Won: _____
└─ Deals Lost: _____

🎯 GOALS vs ACTUALS
├─ Target Deals This Month: _____
├─ Actual Deals Closed: _____
├─ Variance: _____
└─ Forecast for Next Month: _____
```

---

## Weekly Sales Routine

### Monday (Planning)
- Review pipeline
- Identify hot deals (>50% probability)
- Prioritize follow-ups
- Set weekly goals (# of calls, proposals, closes)

### Tuesday-Thursday (Execution)
- Outbound prospecting (LinkedIn - 20/day)
- Respond to inbound leads (<2hr response time)
- Consultation calls
- Follow-ups
- Proposal creation

### Friday (Analysis & Admin)
- Update all deal stages
- Send proposal follow-ups
- Review win/loss reasons
- Update forecasts
- Plan next week

---

## Lead Scoring System

**Score leads 1-10 based on fit:**

**Company Fit (max 5 points):**
- Size (10-100 employees): 2 points
- Industry (target industries): 1 point
- Growth stage (scaling): 1 point
- Budget availability: 1 point

**Need Fit (max 3 points):**
- Clear repetitive task problem: 1 point
- Quantifiable time waste: 1 point
- Urgency (wants to start soon): 1 point

**Engagement (max 2 points):**
- Responded quickly: 1 point
- Decision-maker involved: 1 point

**Scoring Interpretation:**
- 8-10: Hot lead - prioritize immediately
- 5-7: Warm lead - qualify and nurture
- 1-4: Cold lead - nurture or disqualify

---

## Next Steps

1. **Choose your CRM:** HubSpot (recommended) or Notion (budget)
2. **Set up pipeline:** Use stages documented above
3. **Add custom fields:** Capture qualification data
4. **Create email templates:** Save time on follow-ups
5. **Import existing contacts:** Get current leads into system
6. **Connect website form:** Automate lead capture
7. **Set up reports:** Track key metrics daily/weekly
8. **Test workflow:** Walk through lead → won process
9. **Train team:** If you hire help later

**Time to Set Up:** 2-3 hours  
**Maintenance:** 15-30 min/day for updates

---

**Document Version:** 1.0  
**Last Updated:** December 2025  
**Owner:** VexelLogic Sales Team

