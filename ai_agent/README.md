# 🤖 VEXEL GROWTH AGENT

## Autonomous AI Agent for Business Growth

An intelligent agent that automates outreach, content creation, and lead generation for Vexel Logic.

---

## 🚀 QUICK START

### 1. Install Dependencies (Optional)

```bash
cd ai_agent
pip install -r requirements.txt
```

**Note:** The agent works without any dependencies (has built-in fallbacks).

### 2. Set Up AI (Optional but Recommended)

Create a `.env` file:
```
OPENAI_API_KEY=your_key_here
```

Or set environment variable:
```bash
# Windows
set OPENAI_API_KEY=your_key_here

# Mac/Linux
export OPENAI_API_KEY=your_key_here
```

**Without AI key:** Uses pre-built templates (still very effective!)

### 3. Run the Agent

```bash
# Interactive mode (full dashboard)
python vexel_agent.py

# Or run automated tasks
python auto_runner.py --once
```

---

## 🎯 WHAT THE AGENT DOES

### 📊 Prospect Management
- Add and track potential clients
- Score prospects by industry/location fit
- Generate search queries for LinkedIn

### 📤 Outreach Generation
- AI-powered personalized messages
- LinkedIn connection requests
- LinkedIn DMs
- Cold emails
- 5-touch follow-up sequences

### 📝 Content Creation
- LinkedIn posts
- Twitter threads
- Topic-based content (missed calls, ROI, case studies)
- Auto-generated hashtags
- Week's worth of content at once

### 📈 Analytics & Tracking
- Daily metrics dashboard
- Response rate tracking
- Conversion metrics
- Activity history

---

## 💻 COMMANDS

### Interactive Mode (vexel_agent.py)

```
1. Add prospect        - Add a new lead manually
2. Generate outreach   - Create personalized message for a prospect
3. Generate content    - Create a social media post
4. View pending        - See all outreach waiting to be sent
5. View content        - See content queue
6. Week's content      - Generate 5 posts for the week
7. Follow-up sequence  - Create 5-touch sequence for a prospect
8. Export tasks        - Export today's tasks to markdown
9. Refresh             - Refresh dashboard
0. Exit                - Close agent
```

### Automated Mode (auto_runner.py)

```bash
# Run all daily tasks once
python auto_runner.py --once

# Run as background daemon (every 24 hours)
python auto_runner.py --daemon

# Generate batch content
python auto_runner.py --content 7

# Generate outreach for top prospects
python auto_runner.py --outreach 10

# Get LinkedIn search URLs
python auto_runner.py --linkedin

# Generate cold email campaign
python auto_runner.py --emails 5

# Generate testimonial posts
python auto_runner.py --testimonials
```

---

## 📁 FILES CREATED

When you run the agent, it creates:

```
ai_agent/
├── growth_agent.db           # SQLite database (all data)
├── automation_log.json       # Automation run history
├── daily_tasks_YYYY-MM-DD.md # Daily task export
├── email_campaign.md         # Cold email templates
└── testimonial_posts.md      # Social proof posts
```

---

## 🔄 DAILY WORKFLOW

### Morning (10 minutes)

1. Run the agent: `python vexel_agent.py`
2. Check the dashboard for today's tasks
3. Copy pending outreach and send on LinkedIn
4. Post today's content

### Throughout Day

1. Add new prospects you find on LinkedIn
2. The agent tracks everything in the database
3. Mark outreach as "sent" after doing it

### Evening (5 minutes)

1. Export tomorrow's tasks: `python auto_runner.py --once`
2. Review what worked
3. Plan tomorrow

---

## 🎯 OUTREACH TEMPLATES

The agent generates these types of messages:

### LinkedIn Connection Request
```
Hi [Name], I help UK [industry] businesses recover lost revenue 
from missed calls. Would love to connect!
```

### LinkedIn DM
```
Hey [Name]!

Thanks for connecting. Quick question - are you currently 
missing calls while on job sites?

I've been helping [industry] businesses recover an average 
of £4,200/month just from capturing those missed calls.

Would you be open to a quick 15-min chat?

Best,
Benedict
```

### Cold Email
```
Subject: Quick question about missed calls

Hi [Name],

Are you losing jobs because you can't answer calls while on site?

Most [industry] businesses lose £2k-4k/month to this problem.

We've built a simple system that texts back missed calls in 
30 seconds - and it recovers 64% of those leads.

Worth a 15-minute call? [Calendly link]

Benedict
Vexel Logic
```

---

## 📊 PROSPECT SCORING

The agent automatically scores prospects:

| Criteria | Score Boost |
|----------|-------------|
| Trades (plumber, electrician) | +30 |
| Healthcare (dental, physio) | +25 |
| Professional services | +20 |
| UK-based | +20 |
| Major city | +10 |

**Score 70+** = Hot prospect (prioritize)  
**Score 50-69** = Warm prospect  
**Score <50** = Cold prospect

---

## 🔗 LINKEDIN AUTOMATION

### What You Need to Do Manually:
1. Send connection requests (agent generates the message)
2. Send DMs (agent generates the content)
3. Accept connections
4. Respond to replies

### What the Agent Does:
1. Generates all message content
2. Tracks who you've contacted
3. Schedules follow-ups
4. Creates the search queries

### LinkedIn Search URLs

Run:
```bash
python auto_runner.py --linkedin
```

Generates ready-to-click URLs like:
```
https://www.linkedin.com/search/results/people/?keywords=Owner%20plumbing&origin=GLOBAL_SEARCH_HEADER
```

---

## 📧 EMAIL CAMPAIGNS

Generate a cold email sequence:

```bash
python auto_runner.py --emails 5
```

Creates `email_campaign.md` with 5 ready-to-send emails.

---

## 🗄️ DATABASE STRUCTURE

### Prospects Table
- name, company, industry, location
- linkedin_url, email, phone
- score, status, notes
- created_at, last_contacted, next_followup

### Activities Table
- prospect_id, activity_type, content
- platform, status
- scheduled_at, completed_at, response

### Content Queue
- content_type, platform, content
- hashtags, status
- scheduled_at, posted_at

### Metrics
- Daily: prospects_added, outreach_sent, responses_received, demos_booked

---

## 🚀 ADVANCED: RUN AS SCHEDULED TASK

### Windows Task Scheduler

1. Open Task Scheduler
2. Create Basic Task
3. Trigger: Daily at 8:00 AM
4. Action: Start a program
   - Program: `python`
   - Arguments: `auto_runner.py --once`
   - Start in: `C:\path\to\ai_agent`

### Mac/Linux Cron

```bash
# Edit crontab
crontab -e

# Add line (runs at 8 AM daily)
0 8 * * * cd /path/to/ai_agent && python auto_runner.py --once
```

---

## 💡 GOD MODE FEATURES

### 1. The Compounding Machine
Every prospect you add gets:
- Automatic scoring
- Personalized outreach generated
- Follow-up sequence scheduled
- Analytics tracked

### 2. The Content Factory
One command generates:
- Week's worth of posts
- Hashtags included
- Ready to copy/paste

### 3. The Data Advantage
Everything is tracked:
- Who you contacted
- What message you sent
- When they responded
- Conversion rates

### 4. The Time Machine
Export tomorrow's tasks tonight:
- Know exactly what to do
- No thinking required
- Pure execution

---

## 🎯 DAILY TARGETS

| Activity | Daily Target |
|----------|--------------|
| Connection requests | 10-20 |
| DMs sent | 5-10 |
| Posts published | 1-2 |
| Replies responded | All |

**Weekly Goal:** 2-5 demo calls booked

---

## ⚠️ IMPORTANT NOTES

### LinkedIn Limits
- ~100 connection requests/week
- ~150 messages/week
- Too many = temporary restriction

### Best Practices
- Personalize where possible
- Respond to all replies within 24 hours
- Don't spam - quality over quantity
- Track what works and double down

### What This Agent CAN'T Do
- Create social media accounts (need to do manually)
- Actually send messages (need to copy/paste)
- Bypass platform limits
- Guarantee responses

### What It DOES Do
- Generate all content for you
- Track everything in a database
- Score and prioritize prospects
- Create follow-up sequences
- Export ready-to-execute task lists

---

## 🏆 SUCCESS METRICS

Track these weekly:

| Metric | Good | Great |
|--------|------|-------|
| Connection requests sent | 50 | 100 |
| Connections accepted | 20% | 30%+ |
| DMs sent | 30 | 50 |
| DM response rate | 10% | 20%+ |
| Demos booked | 2 | 5+ |

---

## 🔧 TROUBLESHOOTING

### "No module named 'openai'"
- Agent works without it (uses templates)
- Or install: `pip install openai`

### "No module named 'rich'"
- Agent works without it (simpler display)
- Or install: `pip install rich`

### Database locked
- Close any other Python processes
- Delete `growth_agent.db` to reset

### AI not generating
- Check OPENAI_API_KEY is set
- Falls back to templates (still works!)

---

## 📈 SCALING UP

Once you're comfortable:

1. **Hire a VA** - Give them the exported task lists
2. **Add more industries** - Edit CONFIG in vexel_agent.py
3. **Automate further** - Schedule the daemon to run 24/7
4. **Track ROI** - Use the metrics to prove what works

---

**Built with GOD MODE v2.0**  
*"Automate the boring. Focus on closing."*

🚀 **Now go grow that business!**


