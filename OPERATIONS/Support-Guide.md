# Support Guide

**How to help Vexel Logic customers when they need assistance.**

---

## Support Philosophy

**Goal:** Solve problems fast, make customers feel heard.

**Rule:** Respond fast, solve right (not fast).

---

## Response Time SLAs

| Priority | Response Time | Resolution Time |
|----------|--------------|-----------------|
| **Critical** (system down) | <2 hours | <4 hours |
| **High** (feature broken) | <4 hours | <24 hours |
| **Normal** (question) | <24 hours | <48 hours |
| **Low** (feature request) | <48 hours | Log for roadmap |

---

## Support Channels

### 1. Email (Primary)

**Address:** support@vexellogic.com (or your email)

**Best for:**
- General questions
- Non-urgent issues
- Feature requests

### 2. In-App Chat (If Implemented)

**Best for:**
- Quick questions
- Troubleshooting

### 3. Phone (Emergency Only)

**For Professional & Enterprise plans only**

**Best for:**
- System down
- Urgent configuration help

---

## Common Issues & Solutions

### Issue: "Missed Call Bot Not Working"

**Troubleshooting steps:**

1. **Check phone number:**
   - Is it verified in Twilio?
   - Is it in correct format?

2. **Check SMS credits:**
   - Twilio balance sufficient?

3. **Check automation:**
   - Is webhook configured?
   - Is automation enabled?

**Solution template:**
```
Hi [Name],

Checked your account. Issue is: [specific problem]

Fixed: [what you did]

Please test by: [instructions]

Let me know if it's working now!

Best,
Benedict
```

---

### Issue: "Not Receiving Notifications"

**Check:**
1. Email/SMS settings in account
2. Notification preferences
3. Spam/junk folder
4. Phone number correct

**Solution:**
- Re-verify contact info
- Send test notification
- Check with them live

---

### Issue: "Can't Log In"

**Common causes:**
- Wrong email address
- Password forgotten
- Account suspended (payment issue)

**Solutions:**
1. Send password reset link
2. Verify email address
3. Check payment status
4. Manually reset if needed

---

### Issue: "Tool Not Loading"

**Troubleshooting:**
1. Check browser (recommend Chrome)
2. Clear cache (Ctrl+Shift+R)
3. Check internet connection
4. Try incognito mode
5. Check tool URL is correct

**If still broken:**
- Check server logs
- Test tool yourself
- Fix or escalate

---

### Issue: "Want to Cancel"

**IMPORTANT:** Don't just process cancellation. Find out why!

**Response:**
```
Hi [Name],

Sorry to hear you want to cancel. 
Before I process that, can I ask what's not working?

I'd love to fix it if possible.

If you're set on canceling, no problem - 
just let me know and I'll process it today.

Best,
Benedict
```

**Common reasons & solutions:**
- "Too expensive" → Show ROI, offer discount
- "Not using it" → Schedule training call
- "Too complicated" → Offer setup help
- "Not working" → Fix the issue!

---

## Email Templates

### Initial Response

```
Subject: Re: [Their Subject]

Hi [Name],

Thanks for reaching out!

I'm looking into [their issue] now. 
I'll have an update for you within [timeframe].

In the meantime, [any immediate workaround if applicable].

Best,
Benedict
```

---

### Resolution

```
Subject: Re: [Their Subject] - RESOLVED

Hi [Name],

Good news - issue is fixed!

PROBLEM: [What was wrong]
SOLUTION: [What you did]
NEXT STEPS: [If any]

Please confirm it's working on your end.

Sorry for the inconvenience!

Best,
Benedict
```

---

### Escalation (Can't Fix Immediately)

```
Subject: Re: [Their Subject] - Update

Hi [Name],

Update on your issue:

CURRENT STATUS: [Where you're at]
WORKING ON: [What you're doing]
ETA: [When you'll have solution]

I'll update you by [specific time] even if not fully resolved yet.

Thanks for your patience!

Best,
Benedict
```

---

## Feature Requests

**Process:**

1. **Thank them:**
   "Great idea! Thanks for the suggestion."

2. **Understand the need:**
   "What problem would this solve for you?"

3. **Log it:**
   Add to feature request list

4. **Set expectations:**
   "I've added this to our roadmap. 
   Can't promise a timeline, but I'll let you know 
   if we build it."

**Don't:**
- Promise specific dates
- Say "we'll definitely build this"
- Dismiss without understanding

---

## Bug Reports

**Process:**

1. **Reproduce the bug:**
   Try to make it happen yourself

2. **Document:**
   - What they were doing
   - What happened
   - What should have happened
   - Browser/device

3. **Prioritize:**
   - Critical: Fix immediately
   - High: Fix within week
   - Medium: Add to sprint
   - Low: Log for later

4. **Update customer:**
   Let them know when fixed

---

## Angry Customers

**How to handle:**

1. **Acknowledge their frustration:**
   "I understand this is really frustrating."

2. **Don't make excuses:**
   "You're right, this shouldn't have happened."

3. **Take ownership:**
   "I'm going to fix this personally."

4. **Provide timeline:**
   "I'll have this resolved by [specific time]."

5. **Follow up:**
   Check in after resolution

6. **Consider compensation:**
   If appropriate, offer credit/discount

---

## Refund Requests

**30-Day Money-Back Guarantee**

**Process:**

1. **Ask why** (try to fix if possible)

2. **If they insist:**
   ```
   "No problem, I'll process your refund today.
   
   You'll see it in 5-7 business days.
   
   Sorry it didn't work out. Best of luck!"
   ```

3. **Process refund in Stripe**

4. **Note reason in CRM**

---

## Proactive Support

**Don't wait for problems:**

### Monthly Check-Ins

Send to all customers:
```
Subject: Quick check-in

Hi [Name],

How's everything going with Vexel Logic?

YOURMONTHLY NUMBERS:
- [Key metric 1]
- [Key metric 2]
- [Key metric 3]

Any questions or issues? Let me know!

Best,
Benedict
```

### Usage Alerts

**If customer hasn't logged in for 14 days:**
```
Subject: Haven't seen you in a while

Hi [Name],

Noticed you haven't logged in for a couple weeks.

Everything okay? 

Need any help getting more value from the tools?

Best,
Benedict
```

---

## Support Metrics to Track

**Weekly:**
- Total tickets
- Average response time
- Average resolution time
- Open tickets
- Customer satisfaction score

**Target metrics:**
- Response time: <4 hours average
- Resolution time: <24 hours average
- CSAT score: >4.5/5

---

## Escalation to You (Founder)

**When to escalate:**
- Major bug affecting multiple customers
- Customer threatening to leave
- Legal/compliance issue
- Security concern
- Payment dispute >£500

---

## Knowledge Base (Future)

**Build FAQ page with:**
- How to set up each tool
- Common issues & fixes
- Video tutorials
- Contact information

**Goal:** Customers can self-serve 50% of issues

---

## After Hours

**Set expectations:**
```
"Support hours: Mon-Fri, 9am-6pm GMT
Response within 24 hours on business days.

For emergencies: [emergency contact if applicable]
```

**Auto-responder:**
```
Subject: Support Request Received

Thank you for contacting Vexel Logic support.

We've received your message and will respond within 24 hours.

If this is urgent, please call: [phone if applicable]

Best,
Vexel Logic Team
```

---

## Tools for Support

**Recommended:**
- HubSpot (CRM + ticket tracking)
- Intercom (in-app chat)
- Loom (video responses)
- Calendly (schedule calls)

**Current (minimal setup):**
- Email (Gmail or custom)
- Google Sheets (track issues)
- Calendar (schedule calls)

---

**Remember:** Great support = customer retention. 

Every support interaction is a chance to build loyalty! 🚀

