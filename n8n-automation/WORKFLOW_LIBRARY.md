# 🛠️ Vexel Logic Pro - Workflow Library

## Overview

This document contains **business-specific workflows** we build for Pro customers. Each workflow is tailored to solve real problems for UK SMEs in specific industries.

---

## 📋 **PLUMBERS & HEATING ENGINEERS**

### 1. **Auto-Invoice After Job Complete**
**Problem:** Spending 15-20 minutes per job creating and sending invoices manually.

**Workflow:**
```
Job marked "Complete" in your system
    ↓
Extract job details (customer, services, materials, hours)
    ↓
Create invoice in Xero/QuickBooks
    ↓
Send invoice via email to customer
    ↓
Log invoice number in Google Sheet
    ↓
Send you Slack notification: "Invoice #123 sent to [Customer]"
```

**Time Saved:** 15 min/job × 20 jobs/month = **5 hours/month**

---

### 2. **Urgent Job Alert (Emergency Callouts)**
**Problem:** Missing high-value emergency jobs because you don't see the inquiry fast enough.

**Workflow:**
```
Customer inquiry received (form/SMS/call)
    ↓
Check for urgent keywords: "emergency", "leak", "burst pipe", "no heating"
    ↓
IF URGENT:
    → Send SMS to your phone immediately
    → Send Slack notification with customer details
    → Auto-reply to customer: "Emergency received. Calling you in 5 minutes."
    → Mark as "Priority" in your CRM
```

**Result:** Respond to emergencies within **5 minutes** (vs 2+ hours)

---

### 3. **Overdue Payment Reminder (Auto-Chase)**
**Problem:** Chasing late payments manually every week.

**Workflow:**
```
Check Xero/QuickBooks daily at 9am
    ↓
Find invoices overdue by 7+ days
    ↓
Send polite reminder email to customer:
    "Hi [Name], just a friendly reminder that invoice #123 (£450) 
     is now 7 days overdue. Pay here: [link]"
    ↓
If still unpaid after 14 days:
    → Send stronger reminder
    → Notify you on Slack: "Invoice #123 now 14 days overdue"
```

**Result:** Reduce overdue invoices by **60%**

---

### 4. **Job Booking Confirmation (Auto-Schedule)**
**Problem:** Back-and-forth emails to confirm job times.

**Workflow:**
```
Customer books job via Calendly/website
    ↓
Add job to Google Calendar
    ↓
Send confirmation email with:
    - Date & time
    - Your photo & van details
    - "What to expect" guide
    ↓
Send SMS reminder 24 hours before job
    ↓
Send SMS reminder 1 hour before job
```

**Result:** **95% show-up rate** (vs 80% without reminders)

---

### 5. **Materials Reorder Alert**
**Problem:** Running out of common materials mid-job.

**Workflow:**
```
Check Google Sheet (materials inventory) daily
    ↓
IF any item below threshold (e.g., < 5 units):
    → Send email: "Low stock alert: Copper pipes (3 left)"
    → Add to shopping list in Google Sheets
    → (Optional) Auto-order from supplier via API
```

**Result:** Never run out of materials mid-job

---

## 🦷 **DENTISTS & MEDICAL PRACTICES**

### 1. **New Patient Onboarding**
**Problem:** Manually sending intake forms and booking first appointments.

**Workflow:**
```
New patient inquiry received
    ↓
Send welcome email with:
    - Link to intake forms (Google Forms/Typeform)
    - Practice policies (PDF)
    - Available appointment slots (Calendly)
    ↓
When forms submitted:
    → Create patient record in your system
    → Send confirmation email
    → Notify receptionist on Slack
```

**Time Saved:** 20 min/patient → **10 hours/month**

---

### 2. **Appointment Reminder Sequence**
**Problem:** 15-20% no-show rate costing £1,000s/month.

**Workflow:**
```
Appointment booked
    ↓
7 days before: Send email reminder
    ↓
24 hours before: Send SMS reminder
    ↓
2 hours before: Send final SMS reminder
    ↓
If patient cancels:
    → Offer slot to waitlist patients automatically
```

**Result:** Reduce no-shows to **<5%**

---

### 3. **Post-Appointment Review Request**
**Problem:** Only getting 1-2 Google reviews per month.

**Workflow:**
```
Appointment marked "Complete"
    ↓
Wait 2 hours (patient has left practice)
    ↓
Send SMS: "Hi [Name], thanks for visiting today! 
          How was your experience? [5-star rating link]"
    ↓
IF 5 stars:
    → Send Google review link
    → Auto-post to practice Facebook page
    ↓
IF <4 stars:
    → Send private feedback form
    → Alert practice manager (don't post publicly)
```

**Result:** **3x more Google reviews** (6-8/month)

---

### 4. **Insurance Claim Automation**
**Problem:** Spending hours submitting insurance claims manually.

**Workflow:**
```
Treatment completed
    ↓
Extract patient details + treatment codes
    ↓
Auto-fill insurance claim form
    ↓
Submit to insurance portal (or email)
    ↓
Log claim number in patient record
    ↓
Track claim status (check every 7 days)
    ↓
Notify when claim approved/rejected
```

**Time Saved:** 30 min/claim × 40 claims/month = **20 hours/month**

---

### 5. **Patient Birthday Greetings**
**Problem:** Forgetting to engage with patients between appointments.

**Workflow:**
```
Check patient database daily
    ↓
Find patients with birthdays today
    ↓
Send personalized SMS:
    "Happy Birthday [Name]! 🎉 From all of us at [Practice Name]. 
     Here's 20% off your next hygiene appointment: [link]"
```

**Result:** Increase patient loyalty & rebooking rate

---

## ⚖️ **SOLICITORS & LAW FIRMS**

### 1. **New Client Onboarding**
**Problem:** Manually setting up client files and sending engagement letters.

**Workflow:**
```
New client signed up
    ↓
Create folder in Google Drive:
    - Client Name
    - Case Number
    - Subfolders: Documents, Correspondence, Invoices
    ↓
Send engagement letter via email (DocuSign for signature)
    ↓
Add client to case management system
    ↓
Schedule initial consultation (Calendly link)
    ↓
Send welcome pack with:
    - What to expect
    - Documents needed
    - Your contact details
```

**Time Saved:** 45 min/client → **15 hours/month**

---

### 2. **Case Milestone Reminders**
**Problem:** Missing court deadlines or client follow-ups.

**Workflow:**
```
Case created with key dates (court hearing, filing deadline, etc.)
    ↓
7 days before deadline:
    → Email reminder to assigned solicitor
    → Slack notification
    ↓
3 days before deadline:
    → Stronger reminder
    → Add to daily task list
    ↓
1 day before deadline:
    → Urgent alert (SMS + email)
```

**Result:** **Zero missed deadlines**

---

### 3. **Auto-Invoice for Time Tracking**
**Problem:** Forgetting to bill for all hours worked.

**Workflow:**
```
End of week (Friday 5pm)
    ↓
Pull time entries from time tracking system
    ↓
Group by client
    ↓
Generate draft invoice in Xero
    ↓
Send to partner for approval
    ↓
Once approved:
    → Send invoice to client
    → Log in case management system
```

**Result:** Capture **100% of billable hours**

---

### 4. **Document Generation (Contracts, Letters)**
**Problem:** Manually drafting similar documents repeatedly.

**Workflow:**
```
Trigger: "Generate [Document Type]" button clicked
    ↓
Pull client details from CRM
    ↓
Auto-fill template (Word/Google Docs)
    ↓
Save to client folder in Google Drive
    ↓
Send to client for review
    ↓
Track when document opened/signed
```

**Time Saved:** 20 min/document × 30 docs/month = **10 hours/month**

---

### 5. **Client Communication Log**
**Problem:** Losing track of client conversations across email, phone, SMS.

**Workflow:**
```
ANY client communication (email, SMS, call log)
    ↓
Auto-log in case management system:
    - Date & time
    - Communication type
    - Summary (AI-generated from email/transcript)
    - Next action required
    ↓
Weekly summary sent to case owner:
    "This week you communicated with 12 clients. 
     3 require follow-up this week."
```

**Result:** Never miss a client follow-up

---

## 🏗️ **BUILDERS & CONTRACTORS**

### 1. **Quote to Invoice Pipeline**
**Problem:** Losing track of quotes, forgetting to follow up.

**Workflow:**
```
Quote sent to customer
    ↓
Wait 3 days
    ↓
IF no response:
    → Send follow-up email: "Hi [Name], just checking if you 
       had any questions about the quote?"
    ↓
IF quote accepted:
    → Create job in project management system
    → Add to Google Calendar
    → Send confirmation email
    ↓
When job complete:
    → Auto-generate invoice from quote
    → Send to customer
```

**Result:** **40% higher quote acceptance rate**

---

### 2. **Site Photo Documentation**
**Problem:** Forgetting to take before/after photos for insurance/disputes.

**Workflow:**
```
Job started (marked in your system)
    ↓
Send SMS reminder: "Don't forget to take BEFORE photos!"
    ↓
Customer uploads photos via link (Google Drive/Dropbox)
    ↓
When job complete:
    → Send SMS: "Take AFTER photos now"
    → Auto-create before/after comparison
    → Save to job folder
```

**Result:** **100% photo documentation** (vs 30% manual)

---

### 3. **Supplier Order Tracking**
**Problem:** Materials arriving late, delaying jobs.

**Workflow:**
```
Order placed with supplier
    ↓
Log order in Google Sheets:
    - Order number
    - Expected delivery date
    - Job it's for
    ↓
Check daily: Is delivery date approaching?
    ↓
IF delivery date passed:
    → Send alert: "Order #123 overdue from [Supplier]"
    → Auto-email supplier: "Checking on order status"
```

**Result:** Reduce delays by **50%**

---

### 4. **Customer Satisfaction Survey**
**Problem:** Not getting feedback to improve service.

**Workflow:**
```
Job marked "Complete"
    ↓
Wait 24 hours
    ↓
Send SMS: "Hi [Name], how did we do? [1-5 star rating]"
    ↓
IF 5 stars:
    → Request Google review
    → Ask for referrals: "Know anyone else who needs work done?"
    ↓
IF <4 stars:
    → Alert you immediately
    → Send apology + offer to fix issue
```

**Result:** Catch problems early, get more referrals

---

### 5. **Warranty Reminder (Follow-Up Jobs)**
**Problem:** Customers forgetting about warranty work = lost revenue.

**Workflow:**
```
Job completed with 1-year warranty
    ↓
11 months later:
    → Send email: "Hi [Name], your warranty expires in 1 month. 
       Need any touch-ups or additional work?"
    ↓
Offer discount on new work if booked before warranty expires
```

**Result:** **20% of customers book additional work**

---

## 🏋️ **GYMS & FITNESS STUDIOS**

### 1. **New Member Onboarding**
**Problem:** High churn in first 30 days due to lack of engagement.

**Workflow:**
```
New member signs up
    ↓
Day 1: Send welcome email with:
    - Class schedule
    - How to book classes
    - Intro offer (free PT session)
    ↓
Day 3: Send SMS: "Have you booked your first class yet?"
    ↓
Day 7: Send email: "Here are 3 beginner-friendly classes"
    ↓
Day 14: Check if they've attended 3+ classes
    ↓
IF NO:
    → Alert staff: "Member at risk of churn"
    → Send personal email from trainer
```

**Result:** Reduce 30-day churn by **40%**

---

### 2. **Class Booking Reminders**
**Problem:** 20% no-show rate for booked classes.

**Workflow:**
```
Member books class
    ↓
24 hours before: Send SMS reminder
    ↓
2 hours before: Send final reminder
    ↓
IF member cancels:
    → Offer spot to waitlist members
    ↓
IF member no-shows:
    → Send follow-up: "We missed you! Everything OK?"
```

**Result:** Reduce no-shows to **<5%**

---

### 3. **Membership Renewal Reminder**
**Problem:** Members forgetting to renew, leading to churn.

**Workflow:**
```
Membership expires in 7 days
    ↓
Send email: "Your membership expires soon! Renew now and 
            get 1 month free."
    ↓
IF not renewed after 3 days:
    → Send SMS reminder
    ↓
IF not renewed after 7 days (expired):
    → Send win-back offer: "We miss you! Come back with 50% off"
```

**Result:** Increase renewal rate by **30%**

---

## 🏠 **ESTATE AGENTS**

### 1. **New Property Listing Workflow**
**Problem:** Manually posting listings to multiple portals.

**Workflow:**
```
New property added to your system
    ↓
Auto-post to:
    - Rightmove
    - Zoopla
    - OnTheMarket
    - Your website
    - Facebook/Instagram
    ↓
Send email to matching buyers in your database
    ↓
Schedule viewings (Calendly link in email)
```

**Time Saved:** 30 min/listing × 20 listings/month = **10 hours/month**

---

### 2. **Viewing Follow-Up**
**Problem:** Forgetting to follow up with buyers after viewings.

**Workflow:**
```
Viewing completed
    ↓
Wait 2 hours
    ↓
Send SMS to buyer: "Hi [Name], what did you think of [Property]? 
                    Any questions?"
    ↓
IF interested:
    → Send brochure + mortgage calculator
    → Schedule second viewing
    ↓
IF not interested:
    → Ask for feedback
    → Send 3 similar properties
```

**Result:** **50% higher offer rate**

---

## 💡 **HOW TO REQUEST THESE WORKFLOWS**

1. Go to your [Pro Dashboard](pro-dashboard.html)
2. Click "Request Workflow"
3. Choose from this library OR describe your own
4. We'll build it within 48 hours!

---

**Built with ⚡ by Vexel Logic**

