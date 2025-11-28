#!/usr/bin/env python3
"""
VEXEL GROWTH AGENT v1.0
========================
Autonomous AI agent for business outreach, lead generation, and content creation.
Built with GOD MODE principles: Challenge → Build → Synthesize

Author: Benedict Anokye-Davies
Purpose: Internal tool to grow Vexel Logic business
"""

import os
import json
import sqlite3
import random
import datetime
from pathlib import Path
from typing import List, Dict, Optional
import time

# Load environment variables from .env file
try:
    from dotenv import load_dotenv
    env_path = Path(__file__).parent / ".env"
    if env_path.exists():
        load_dotenv(env_path)
        print("✅ Loaded API key from .env file")
except ImportError:
    pass  # dotenv not installed, will use system env vars

# Try importing optional dependencies
try:
    from openai import OpenAI
    HAS_OPENAI = True
except ImportError:
    HAS_OPENAI = False

try:
    from rich.console import Console
    from rich.table import Table
    from rich.panel import Panel
    from rich.progress import Progress, SpinnerColumn, TextColumn
    from rich.prompt import Prompt, Confirm
    from rich.markdown import Markdown
    HAS_RICH = True
except ImportError:
    HAS_RICH = False
    
# Fallback console
console = Console() if HAS_RICH else None

# ============================================================================
# CONFIGURATION
# ============================================================================

CONFIG = {
    "business_name": "Vexel Logic",
    "founder_name": "Benedict Anokye-Davies",
    "calendly_link": "https://calendly.com/benanokye577/vexel-demo-revenue-recovery-audit",
    "linkedin_profile": "https://www.linkedin.com/in/benedict-anokye-davies/",
    "website": "https://nxiss12.github.io/vexel-logic/",
    "email": "benanokye577@gmail.com",
    "target_industries": ["plumbing", "electrical", "hvac", "dental", "physiotherapy", "legal", "accounting"],
    "target_locations": ["UK", "London", "Manchester", "Birmingham", "Leeds", "Bristol", "Nottingham"],
    "value_propositions": [
        "Recover £4,200/month from missed calls",
        "64% missed call recovery rate",
        "4.2★ to 4.9★ Google rating in 8 weeks",
        "Save 20+ hours/week on admin",
        "150+ automation tools",
        "48-hour setup",
        "39:1 ROI on average"
    ],
    "pain_points": [
        "Missing calls while on job sites",
        "Low Google review ratings",
        "Too many messaging apps to check",
        "Manual admin taking hours",
        "Lost revenue from slow follow-ups",
        "Competitors getting jobs you should have won"
    ]
}

DATABASE_PATH = Path(__file__).parent / "growth_agent.db"

# ============================================================================
# DATABASE SETUP
# ============================================================================

def init_database():
    """Initialize SQLite database for tracking prospects and activities."""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Prospects table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS prospects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            company TEXT,
            industry TEXT,
            location TEXT,
            linkedin_url TEXT,
            email TEXT,
            phone TEXT,
            source TEXT,
            status TEXT DEFAULT 'new',
            score INTEGER DEFAULT 0,
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_contacted TIMESTAMP,
            next_followup TIMESTAMP
        )
    ''')
    
    # Outreach activities table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            prospect_id INTEGER,
            activity_type TEXT,
            content TEXT,
            platform TEXT,
            status TEXT DEFAULT 'pending',
            scheduled_at TIMESTAMP,
            completed_at TIMESTAMP,
            response TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (prospect_id) REFERENCES prospects(id)
        )
    ''')
    
    # Content queue table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS content_queue (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content_type TEXT,
            platform TEXT,
            content TEXT,
            hashtags TEXT,
            status TEXT DEFAULT 'draft',
            scheduled_at TIMESTAMP,
            posted_at TIMESTAMP,
            engagement_score INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Daily metrics table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS metrics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date DATE UNIQUE,
            prospects_added INTEGER DEFAULT 0,
            outreach_sent INTEGER DEFAULT 0,
            responses_received INTEGER DEFAULT 0,
            demos_booked INTEGER DEFAULT 0,
            content_posted INTEGER DEFAULT 0,
            connections_made INTEGER DEFAULT 0
        )
    ''')
    
    conn.commit()
    conn.close()
    return True

# ============================================================================
# AI ENGINE
# ============================================================================

class AIEngine:
    """AI-powered content and message generation."""
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.client = None
        
        if HAS_OPENAI and self.api_key:
            try:
                self.client = OpenAI(api_key=self.api_key)
            except:
                pass
    
    def generate(self, prompt: str, max_tokens: int = 500) -> str:
        """Generate content using AI or fallback to templates."""
        if self.client:
            try:
                response = self.client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[
                        {"role": "system", "content": "You are a B2B sales and marketing expert for Vexel Logic, a UK business automation platform. Write concise, persuasive content that drives action."},
                        {"role": "user", "content": prompt}
                    ],
                    max_tokens=max_tokens,
                    temperature=0.7
                )
                return response.choices[0].message.content.strip()
            except Exception as e:
                print(f"AI generation failed: {e}")
        
        # Fallback to template-based generation
        return self._template_generate(prompt)
    
    def _template_generate(self, prompt: str) -> str:
        """Template-based generation when AI is unavailable."""
        if "linkedin connection" in prompt.lower():
            return self._generate_linkedin_connection()
        elif "linkedin message" in prompt.lower() or "dm" in prompt.lower():
            return self._generate_linkedin_dm()
        elif "email" in prompt.lower():
            return self._generate_cold_email()
        elif "post" in prompt.lower() or "content" in prompt.lower():
            return self._generate_social_post()
        else:
            return self._generate_generic_outreach()
    
    def _generate_linkedin_connection(self) -> str:
        templates = [
            "Hi {name}, I help UK {industry} businesses recover lost revenue from missed calls. Would love to connect!",
            "Hey {name}! Noticed you're in {industry} - I've helped similar businesses recover £4k+/month. Let's connect!",
            "Hi {name}, I build automation systems for UK {industry} businesses. Always keen to connect with fellow professionals!",
            "{name} - Love what you're doing in {industry}. I help businesses like yours save 20+ hrs/week on admin. Connect?",
            "Hi {name}! I'm Benedict from Vexel Logic. We help UK trades recover missed revenue. Great to connect!"
        ]
        return random.choice(templates)
    
    def _generate_linkedin_dm(self) -> str:
        templates = [
            """Hey {name}!

Thanks for connecting. Quick question - are you currently missing calls while on job sites?

I've been helping {industry} businesses recover an average of £4,200/month just from capturing those missed calls.

Would you be open to a quick 15-min chat to see if we could do the same for you?

No pitch - just want to understand your situation.

Best,
Benedict""",
            """Hi {name},

Noticed you've been in {industry} for a while. Impressive!

Quick question: How do you handle calls when you're busy with clients?

I ask because we've helped 20+ UK businesses recover £3k-5k/month they were losing to missed calls.

Happy to share how it works if you're curious?

Benedict
Vexel Logic""",
            """{name} - thanks for the connection!

Random thought: Did you know the average {industry} business misses 5-8 calls per week?

At £800/job average, that's £2k+/week walking out the door.

We've built a system that texts back in 30 seconds and recovers 64% of those calls.

Interested in seeing the numbers for your business?

Benedict"""
        ]
        return random.choice(templates)
    
    def _generate_cold_email(self) -> str:
        templates = [
            """Subject: Quick question about missed calls

Hi {name},

I'll keep this short.

Are you losing jobs because you can't answer calls while on site?

Most {industry} businesses lose £2k-4k/month to this problem without realizing it.

We've built a simple system that texts back missed calls in 30 seconds - and it recovers 64% of those leads.

Worth a 15-minute call to see if it could work for you?

Here's my calendar if you're interested: {calendly}

Best,
Benedict
Vexel Logic

P.S. - One of our plumber clients recovered £4,200 in the first month. Happy to share how.""",
            """Subject: {company} - losing revenue to missed calls?

{name},

I've been helping UK {industry} businesses solve a problem you might have:

→ Missing calls while working
→ Calling back "later" (which never happens)
→ Competitors getting jobs that should be yours

The fix is simple: Auto-text missed calls in 30 seconds.

Result: 64% recovery rate. Average £4k/month recovered.

If this sounds relevant, grab 15 mins here: {calendly}

If not, no worries - just thought it might help.

Benedict
Founder, Vexel Logic"""
        ]
        return random.choice(templates)
    
    def _generate_social_post(self) -> str:
        templates = [
            """🔴 The math most UK businesses don't do:

Missed calls per week: 5-8 (average)
Average job value: £800
Close rate: 35%

Weekly loss: £1,400-£2,240
Annual loss: £72,800-£116,480

The fix? Text back in 30 seconds.
Recovery rate: 64%

That's £46k-74k/year recovered.

From a £99/month tool.

Who's doing this math for their business?

#BusinessAutomation #UKBusiness #SME""",
            """I audited 20 UK service businesses last month.

The #1 revenue leak?

Not marketing.
Not pricing.
Not competition.

Missed calls.

Average: 6 per week.
Average job: £800.
Average loss: £87k/year.

The businesses that text back in 30 seconds?
They recover 64% of those calls.

Simple fix. Massive impact.

#RevenueRecovery #Automation""",
            """Why I built Vexel Logic:

Watched a brilliant electrician lose his business.

Not because he was bad at his job.
Because he was TOO good.

Too busy to answer calls.
Too tired to chase reviews.
Too overwhelmed to follow up.

His 4.1★ rating didn't reflect his 5★ work.

Now we automate all of that.

#FounderStory #Automation #UKBusiness""",
            """Plumbers of LinkedIn:

You're probably losing £2,400/month.

Here's the math:
• 6 missed calls/week
• £800 average job
• 35% close rate
• = £6,720/month in potential revenue

You can't answer every call when you're under someone's sink.

But you CAN text back automatically.

Comment "AUDIT" for a free revenue diagnostic.

#Plumber #TradesBusiness #UKTrades"""
        ]
        return random.choice(templates)
    
    def _generate_generic_outreach(self) -> str:
        return """Hi {name},

I help UK {industry} businesses recover lost revenue from missed calls and automate their admin.

Would you be open to a quick conversation about how this might help {company}?

Best,
Benedict
Vexel Logic"""

# ============================================================================
# PROSPECT FINDER
# ============================================================================

class ProspectFinder:
    """Find and score potential prospects."""
    
    def __init__(self, db_path: Path = DATABASE_PATH):
        self.db_path = db_path
    
    def add_prospect(self, 
                     name: str,
                     company: str = None,
                     industry: str = None,
                     location: str = None,
                     linkedin_url: str = None,
                     email: str = None,
                     source: str = "manual") -> int:
        """Add a new prospect to the database."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Calculate initial score
        score = self._calculate_score(industry, location)
        
        cursor.execute('''
            INSERT INTO prospects (name, company, industry, location, linkedin_url, email, source, score)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (name, company, industry, location, linkedin_url, email, source, score))
        
        prospect_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        # Update daily metrics
        self._update_metric('prospects_added')
        
        return prospect_id
    
    def _calculate_score(self, industry: str, location: str) -> int:
        """Score prospect based on ideal customer profile."""
        score = 50  # Base score
        
        # Industry match
        if industry:
            industry_lower = industry.lower()
            if any(ind in industry_lower for ind in ['plumb', 'electric', 'hvac', 'heat']):
                score += 30  # High-value trades
            elif any(ind in industry_lower for ind in ['dental', 'physio', 'health']):
                score += 25  # Healthcare
            elif any(ind in industry_lower for ind in ['legal', 'account', 'consult']):
                score += 20  # Professional services
        
        # Location match
        if location:
            location_lower = location.lower()
            if 'uk' in location_lower or 'united kingdom' in location_lower:
                score += 20
            if any(city in location_lower for city in ['london', 'manchester', 'birmingham']):
                score += 10
        
        return min(score, 100)  # Cap at 100
    
    def get_prospects(self, status: str = None, min_score: int = 0, limit: int = 50) -> List[Dict]:
        """Get prospects filtered by status and score."""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        query = "SELECT * FROM prospects WHERE score >= ?"
        params = [min_score]
        
        if status:
            query += " AND status = ?"
            params.append(status)
        
        query += " ORDER BY score DESC, created_at DESC LIMIT ?"
        params.append(limit)
        
        cursor.execute(query, params)
        results = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        return results
    
    def update_status(self, prospect_id: int, status: str, notes: str = None):
        """Update prospect status."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        if notes:
            cursor.execute(
                "UPDATE prospects SET status = ?, notes = ?, last_contacted = ? WHERE id = ?",
                (status, notes, datetime.datetime.now(), prospect_id)
            )
        else:
            cursor.execute(
                "UPDATE prospects SET status = ?, last_contacted = ? WHERE id = ?",
                (status, datetime.datetime.now(), prospect_id)
            )
        
        conn.commit()
        conn.close()
    
    def _update_metric(self, metric_name: str, value: int = 1):
        """Update daily metrics."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        today = datetime.date.today().isoformat()
        
        cursor.execute(f'''
            INSERT INTO metrics (date, {metric_name}) VALUES (?, ?)
            ON CONFLICT(date) DO UPDATE SET {metric_name} = {metric_name} + ?
        ''', (today, value, value))
        
        conn.commit()
        conn.close()
    
    def generate_prospect_list(self, count: int = 10) -> List[Dict]:
        """Generate a list of ideal prospect profiles to search for."""
        prospects = []
        
        industries = CONFIG["target_industries"]
        locations = CONFIG["target_locations"]
        
        titles = [
            "Owner", "Director", "Managing Director", "Founder",
            "Business Owner", "MD", "CEO", "Operations Manager"
        ]
        
        for _ in range(count):
            industry = random.choice(industries)
            location = random.choice(locations)
            title = random.choice(titles)
            
            search_query = f"{title} {industry} {location}"
            
            prospects.append({
                "search_query": search_query,
                "industry": industry,
                "location": location,
                "title": title,
                "platform": "LinkedIn"
            })
        
        return prospects

# ============================================================================
# OUTREACH MANAGER
# ============================================================================

class OutreachManager:
    """Manage outreach campaigns and follow-ups."""
    
    def __init__(self, db_path: Path = DATABASE_PATH):
        self.db_path = db_path
        self.ai = AIEngine()
    
    def create_outreach(self, 
                        prospect_id: int, 
                        activity_type: str, 
                        platform: str,
                        scheduled_at: datetime.datetime = None) -> Dict:
        """Create an outreach activity for a prospect."""
        
        # Get prospect details
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM prospects WHERE id = ?", (prospect_id,))
        prospect = dict(cursor.fetchone())
        conn.close()
        
        # Generate personalized content
        prompt = f"Generate a {activity_type} for {platform} to {prospect['name']} at {prospect['company']} in the {prospect['industry']} industry."
        content = self.ai.generate(prompt)
        
        # Personalize the content
        content = content.format(
            name=prospect['name'].split()[0] if prospect['name'] else "there",
            company=prospect['company'] or "your company",
            industry=prospect['industry'] or "your industry",
            calendly=CONFIG['calendly_link']
        )
        
        # Save to database
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        if not scheduled_at:
            scheduled_at = datetime.datetime.now()
        
        cursor.execute('''
            INSERT INTO activities (prospect_id, activity_type, content, platform, scheduled_at)
            VALUES (?, ?, ?, ?, ?)
        ''', (prospect_id, activity_type, content, platform, scheduled_at))
        
        activity_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return {
            "id": activity_id,
            "prospect": prospect,
            "type": activity_type,
            "platform": platform,
            "content": content,
            "scheduled_at": scheduled_at
        }
    
    def get_pending_outreach(self, limit: int = 20) -> List[Dict]:
        """Get pending outreach activities."""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT a.*, p.name, p.company, p.industry 
            FROM activities a
            JOIN prospects p ON a.prospect_id = p.id
            WHERE a.status = 'pending'
            ORDER BY a.scheduled_at ASC
            LIMIT ?
        ''', (limit,))
        
        results = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        return results
    
    def mark_completed(self, activity_id: int, response: str = None):
        """Mark an activity as completed."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE activities 
            SET status = 'completed', completed_at = ?, response = ?
            WHERE id = ?
        ''', (datetime.datetime.now(), response, activity_id))
        
        conn.commit()
        conn.close()
        
        # Update metrics
        self._update_metric('outreach_sent')
        if response:
            self._update_metric('responses_received')
    
    def generate_followup_sequence(self, prospect_id: int) -> List[Dict]:
        """Generate a 5-touch follow-up sequence for a prospect."""
        sequence = []
        
        touchpoints = [
            ("linkedin_connection", "LinkedIn", 0),
            ("linkedin_dm", "LinkedIn", 2),
            ("email", "Email", 4),
            ("linkedin_dm", "LinkedIn", 7),
            ("email", "Email", 14)
        ]
        
        base_date = datetime.datetime.now()
        
        for activity_type, platform, days_offset in touchpoints:
            scheduled_at = base_date + datetime.timedelta(days=days_offset)
            outreach = self.create_outreach(
                prospect_id=prospect_id,
                activity_type=activity_type,
                platform=platform,
                scheduled_at=scheduled_at
            )
            sequence.append(outreach)
        
        return sequence
    
    def _update_metric(self, metric_name: str, value: int = 1):
        """Update daily metrics."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        today = datetime.date.today().isoformat()
        
        cursor.execute(f'''
            INSERT INTO metrics (date, {metric_name}) VALUES (?, ?)
            ON CONFLICT(date) DO UPDATE SET {metric_name} = {metric_name} + ?
        ''', (today, value, value))
        
        conn.commit()
        conn.close()

# ============================================================================
# CONTENT ENGINE
# ============================================================================

class ContentEngine:
    """Generate and manage social media content."""
    
    def __init__(self, db_path: Path = DATABASE_PATH):
        self.db_path = db_path
        self.ai = AIEngine()
    
    def generate_post(self, 
                      platform: str = "linkedin",
                      topic: str = None,
                      post_type: str = "value") -> Dict:
        """Generate a social media post."""
        
        topics = {
            "missed_calls": "Write about the cost of missed calls for UK businesses",
            "reviews": "Write about the importance of Google reviews for local businesses",
            "automation": "Write about how automation saves time for business owners",
            "case_study": "Write a mini case study about a plumber who recovered revenue",
            "pain_point": "Write about a common pain point for trades businesses",
            "roi": "Write about the ROI of business automation",
            "founder_story": "Write a personal story about why you built this business"
        }
        
        if not topic:
            topic = random.choice(list(topics.keys()))
        
        prompt = topics.get(topic, topic)
        content = self.ai.generate(prompt)
        
        # Generate hashtags
        hashtags = self._generate_hashtags(topic, platform)
        
        # Save to database
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO content_queue (content_type, platform, content, hashtags, status)
            VALUES (?, ?, ?, ?, 'draft')
        ''', (post_type, platform, content, hashtags))
        
        content_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return {
            "id": content_id,
            "platform": platform,
            "topic": topic,
            "content": content,
            "hashtags": hashtags,
            "status": "draft"
        }
    
    def _generate_hashtags(self, topic: str, platform: str) -> str:
        """Generate relevant hashtags."""
        base_tags = ["#BusinessAutomation", "#UKBusiness", "#SME"]
        
        topic_tags = {
            "missed_calls": ["#LeadGeneration", "#RevenueRecovery", "#CustomerService"],
            "reviews": ["#GoogleReviews", "#OnlineReputation", "#5StarService"],
            "automation": ["#WorkSmarter", "#Efficiency", "#TimeManagement"],
            "case_study": ["#CaseStudy", "#Results", "#TradesBusiness"],
            "pain_point": ["#BusinessGrowth", "#Entrepreneurship", "#SmallBusiness"],
            "roi": ["#ROI", "#Investment", "#BusinessStrategy"],
            "founder_story": ["#FounderStory", "#Entrepreneur", "#StartupLife"]
        }
        
        tags = base_tags + topic_tags.get(topic, [])
        
        if platform == "twitter":
            return " ".join(tags[:5])  # Twitter limit
        
        return " ".join(tags)
    
    def get_content_queue(self, status: str = None, limit: int = 20) -> List[Dict]:
        """Get content from the queue."""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        if status:
            cursor.execute(
                "SELECT * FROM content_queue WHERE status = ? ORDER BY created_at DESC LIMIT ?",
                (status, limit)
            )
        else:
            cursor.execute(
                "SELECT * FROM content_queue ORDER BY created_at DESC LIMIT ?",
                (limit,)
            )
        
        results = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        return results
    
    def mark_posted(self, content_id: int):
        """Mark content as posted."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE content_queue 
            SET status = 'posted', posted_at = ?
            WHERE id = ?
        ''', (datetime.datetime.now(), content_id))
        
        conn.commit()
        conn.close()
    
    def generate_week_content(self) -> List[Dict]:
        """Generate a week's worth of content."""
        content_plan = []
        
        # Monday - Problem awareness
        content_plan.append(self.generate_post(platform="linkedin", topic="missed_calls"))
        
        # Tuesday - Twitter thread
        content_plan.append(self.generate_post(platform="twitter", topic="pain_point"))
        
        # Wednesday - Case study
        content_plan.append(self.generate_post(platform="linkedin", topic="case_study"))
        
        # Thursday - Quick tip
        content_plan.append(self.generate_post(platform="twitter", topic="automation"))
        
        # Friday - ROI focus
        content_plan.append(self.generate_post(platform="linkedin", topic="roi"))
        
        return content_plan

# ============================================================================
# DASHBOARD
# ============================================================================

class Dashboard:
    """Display daily tasks and metrics."""
    
    def __init__(self, db_path: Path = DATABASE_PATH):
        self.db_path = db_path
        self.prospect_finder = ProspectFinder(db_path)
        self.outreach_manager = OutreachManager(db_path)
        self.content_engine = ContentEngine(db_path)
    
    def get_daily_tasks(self) -> Dict:
        """Get today's tasks and priorities."""
        tasks = {
            "outreach_pending": self.outreach_manager.get_pending_outreach(10),
            "content_to_post": self.content_engine.get_content_queue("draft", 5),
            "hot_prospects": self.prospect_finder.get_prospects(min_score=70, limit=10),
            "new_prospects_to_find": self.prospect_finder.generate_prospect_list(10)
        }
        
        return tasks
    
    def get_metrics(self, days: int = 7) -> Dict:
        """Get metrics for the last N days."""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        start_date = (datetime.date.today() - datetime.timedelta(days=days)).isoformat()
        
        cursor.execute('''
            SELECT 
                SUM(prospects_added) as total_prospects,
                SUM(outreach_sent) as total_outreach,
                SUM(responses_received) as total_responses,
                SUM(demos_booked) as total_demos,
                SUM(content_posted) as total_content
            FROM metrics
            WHERE date >= ?
        ''', (start_date,))
        
        result = dict(cursor.fetchone())
        conn.close()
        
        # Calculate conversion rates
        if result['total_outreach'] and result['total_outreach'] > 0:
            result['response_rate'] = round((result['total_responses'] or 0) / result['total_outreach'] * 100, 1)
        else:
            result['response_rate'] = 0
        
        return result
    
    def display(self):
        """Display the dashboard."""
        if not HAS_RICH:
            print("\n" + "="*60)
            print("VEXEL GROWTH AGENT - DAILY DASHBOARD")
            print("="*60)
            self._display_simple()
            return
        
        console.clear()
        console.print(Panel.fit(
            "[bold yellow]🤖 VEXEL GROWTH AGENT[/bold yellow]\n"
            "[dim]Autonomous Business Growth System[/dim]",
            border_style="yellow"
        ))
        
        # Metrics
        metrics = self.get_metrics()
        metrics_table = Table(title="📊 Last 7 Days", show_header=True)
        metrics_table.add_column("Metric", style="cyan")
        metrics_table.add_column("Value", style="green", justify="right")
        
        metrics_table.add_row("Prospects Added", str(metrics.get('total_prospects', 0) or 0))
        metrics_table.add_row("Outreach Sent", str(metrics.get('total_outreach', 0) or 0))
        metrics_table.add_row("Responses", str(metrics.get('total_responses', 0) or 0))
        metrics_table.add_row("Response Rate", f"{metrics.get('response_rate', 0)}%")
        metrics_table.add_row("Demos Booked", str(metrics.get('total_demos', 0) or 0))
        
        console.print(metrics_table)
        console.print()
        
        # Today's tasks
        tasks = self.get_daily_tasks()
        
        # Pending outreach
        if tasks['outreach_pending']:
            outreach_table = Table(title="📤 Pending Outreach", show_header=True)
            outreach_table.add_column("ID", style="dim", width=4)
            outreach_table.add_column("Name", style="cyan")
            outreach_table.add_column("Company", style="white")
            outreach_table.add_column("Type", style="yellow")
            outreach_table.add_column("Platform", style="blue")
            
            for item in tasks['outreach_pending'][:5]:
                outreach_table.add_row(
                    str(item['id']),
                    item.get('name', 'N/A'),
                    item.get('company', 'N/A'),
                    item.get('activity_type', 'N/A'),
                    item.get('platform', 'N/A')
                )
            
            console.print(outreach_table)
            console.print()
        
        # Content to post
        if tasks['content_to_post']:
            content_table = Table(title="📝 Content Ready to Post", show_header=True)
            content_table.add_column("ID", style="dim", width=4)
            content_table.add_column("Platform", style="blue")
            content_table.add_column("Preview", style="white", max_width=50)
            
            for item in tasks['content_to_post'][:3]:
                preview = item.get('content', '')[:50] + "..." if len(item.get('content', '')) > 50 else item.get('content', '')
                content_table.add_row(
                    str(item['id']),
                    item.get('platform', 'N/A'),
                    preview
                )
            
            console.print(content_table)
            console.print()
        
        # Search suggestions
        console.print(Panel(
            "[bold]🔍 Today's Search Targets[/bold]\n\n" +
            "\n".join([f"• {p['search_query']}" for p in tasks['new_prospects_to_find'][:5]]),
            title="LinkedIn Search",
            border_style="blue"
        ))
    
    def _display_simple(self):
        """Simple display without rich library."""
        metrics = self.get_metrics()
        tasks = self.get_daily_tasks()
        
        print("\n📊 LAST 7 DAYS:")
        print(f"  Prospects: {metrics.get('total_prospects', 0) or 0}")
        print(f"  Outreach: {metrics.get('total_outreach', 0) or 0}")
        print(f"  Responses: {metrics.get('total_responses', 0) or 0}")
        print(f"  Response Rate: {metrics.get('response_rate', 0)}%")
        
        print("\n📤 PENDING OUTREACH:")
        for item in tasks['outreach_pending'][:5]:
            print(f"  • {item.get('name', 'N/A')} - {item.get('activity_type', 'N/A')}")
        
        print("\n🔍 SEARCH TODAY:")
        for p in tasks['new_prospects_to_find'][:5]:
            print(f"  • {p['search_query']}")

# ============================================================================
# MAIN AGENT CONTROLLER
# ============================================================================

class VexelGrowthAgent:
    """Main controller for the growth agent."""
    
    def __init__(self):
        init_database()
        self.prospect_finder = ProspectFinder()
        self.outreach_manager = OutreachManager()
        self.content_engine = ContentEngine()
        self.dashboard = Dashboard()
        self.ai = AIEngine()
    
    def run_interactive(self):
        """Run the agent in interactive mode."""
        while True:
            self.dashboard.display()
            
            print("\n" + "="*60)
            print("COMMANDS:")
            print("  1. Add prospect")
            print("  2. Generate outreach")
            print("  3. Generate content")
            print("  4. View pending outreach")
            print("  5. View content queue")
            print("  6. Generate week's content")
            print("  7. Create follow-up sequence")
            print("  8. Export today's tasks")
            print("  9. Refresh dashboard")
            print("  0. Exit")
            print("="*60)
            
            choice = input("\nEnter command: ").strip()
            
            if choice == "1":
                self._add_prospect_interactive()
            elif choice == "2":
                self._generate_outreach_interactive()
            elif choice == "3":
                self._generate_content_interactive()
            elif choice == "4":
                self._view_outreach()
            elif choice == "5":
                self._view_content()
            elif choice == "6":
                self._generate_week_content()
            elif choice == "7":
                self._create_sequence_interactive()
            elif choice == "8":
                self._export_tasks()
            elif choice == "9":
                continue
            elif choice == "0":
                print("\n👋 Agent shutting down. Go close some deals!")
                break
            else:
                print("Invalid command. Try again.")
    
    def _add_prospect_interactive(self):
        """Add a prospect interactively."""
        print("\n--- ADD PROSPECT ---")
        name = input("Name: ").strip()
        company = input("Company: ").strip()
        industry = input("Industry: ").strip()
        location = input("Location: ").strip()
        linkedin = input("LinkedIn URL: ").strip()
        email = input("Email (optional): ").strip()
        
        if name:
            prospect_id = self.prospect_finder.add_prospect(
                name=name,
                company=company or None,
                industry=industry or None,
                location=location or None,
                linkedin_url=linkedin or None,
                email=email or None
            )
            print(f"\n✅ Prospect added with ID: {prospect_id}")
        else:
            print("\n❌ Name is required.")
    
    def _generate_outreach_interactive(self):
        """Generate outreach for a prospect."""
        print("\n--- GENERATE OUTREACH ---")
        prospect_id = input("Prospect ID: ").strip()
        
        if not prospect_id.isdigit():
            print("Invalid ID")
            return
        
        print("\nType: 1) LinkedIn Connection  2) LinkedIn DM  3) Email")
        type_choice = input("Choose type: ").strip()
        
        types = {"1": "linkedin_connection", "2": "linkedin_dm", "3": "email"}
        platforms = {"1": "LinkedIn", "2": "LinkedIn", "3": "Email"}
        
        activity_type = types.get(type_choice, "linkedin_dm")
        platform = platforms.get(type_choice, "LinkedIn")
        
        outreach = self.outreach_manager.create_outreach(
            prospect_id=int(prospect_id),
            activity_type=activity_type,
            platform=platform
        )
        
        print(f"\n{'='*60}")
        print(f"GENERATED {activity_type.upper()} for {platform}")
        print(f"{'='*60}")
        print(outreach['content'])
        print(f"{'='*60}")
    
    def _generate_content_interactive(self):
        """Generate social content interactively."""
        print("\n--- GENERATE CONTENT ---")
        print("Platform: 1) LinkedIn  2) Twitter")
        platform_choice = input("Choose: ").strip()
        platform = "linkedin" if platform_choice == "1" else "twitter"
        
        print("\nTopic: 1) Missed Calls  2) Reviews  3) Automation  4) Case Study  5) ROI  6) Random")
        topic_choice = input("Choose: ").strip()
        
        topics = {
            "1": "missed_calls", "2": "reviews", "3": "automation",
            "4": "case_study", "5": "roi", "6": None
        }
        topic = topics.get(topic_choice)
        
        content = self.content_engine.generate_post(platform=platform, topic=topic)
        
        print(f"\n{'='*60}")
        print(f"GENERATED {platform.upper()} POST")
        print(f"{'='*60}")
        print(content['content'])
        print(f"\n{content['hashtags']}")
        print(f"{'='*60}")
    
    def _view_outreach(self):
        """View pending outreach."""
        outreach = self.outreach_manager.get_pending_outreach(20)
        
        print(f"\n{'='*60}")
        print("PENDING OUTREACH")
        print(f"{'='*60}")
        
        for item in outreach:
            print(f"\n[{item['id']}] {item.get('name', 'N/A')} - {item.get('company', 'N/A')}")
            print(f"    Type: {item['activity_type']} | Platform: {item['platform']}")
            print(f"    Content: {item['content'][:100]}...")
        
        print(f"\n{'='*60}")
    
    def _view_content(self):
        """View content queue."""
        content = self.content_engine.get_content_queue(limit=10)
        
        print(f"\n{'='*60}")
        print("CONTENT QUEUE")
        print(f"{'='*60}")
        
        for item in content:
            print(f"\n[{item['id']}] {item['platform'].upper()} - {item['status']}")
            print(f"    {item['content'][:100]}...")
        
        print(f"{'='*60}")
    
    def _generate_week_content(self):
        """Generate a week's worth of content."""
        print("\n⏳ Generating week's content...")
        content = self.content_engine.generate_week_content()
        
        print(f"\n✅ Generated {len(content)} pieces of content!")
        for item in content:
            print(f"  • {item['platform']}: {item['topic']}")
    
    def _create_sequence_interactive(self):
        """Create a follow-up sequence."""
        print("\n--- CREATE FOLLOW-UP SEQUENCE ---")
        prospect_id = input("Prospect ID: ").strip()
        
        if not prospect_id.isdigit():
            print("Invalid ID")
            return
        
        print("\n⏳ Generating 5-touch sequence...")
        sequence = self.outreach_manager.generate_followup_sequence(int(prospect_id))
        
        print(f"\n✅ Created {len(sequence)} touchpoints!")
        for i, item in enumerate(sequence, 1):
            print(f"  {i}. {item['type']} via {item['platform']} - {item['scheduled_at'].strftime('%Y-%m-%d')}")
    
    def _export_tasks(self):
        """Export today's tasks to a file."""
        tasks = self.dashboard.get_daily_tasks()
        
        output = []
        output.append("# TODAY'S GROWTH TASKS")
        output.append(f"# Generated: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
        
        output.append("## 🔍 LINKEDIN SEARCHES TO DO")
        for p in tasks['new_prospects_to_find']:
            output.append(f"- [ ] Search: {p['search_query']}")
        
        output.append("\n## 📤 OUTREACH TO SEND")
        for item in tasks['outreach_pending']:
            output.append(f"- [ ] {item.get('name', 'N/A')} ({item['activity_type']})")
            output.append(f"      {item['content'][:200]}...")
        
        output.append("\n## 📝 CONTENT TO POST")
        for item in tasks['content_to_post']:
            output.append(f"- [ ] {item['platform'].upper()}")
            output.append(f"      {item['content'][:200]}...")
        
        # Save to file
        export_path = Path(__file__).parent / f"daily_tasks_{datetime.date.today().isoformat()}.md"
        with open(export_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(output))
        
        print(f"\n✅ Tasks exported to: {export_path}")

# ============================================================================
# MAIN ENTRY POINT
# ============================================================================

def main():
    """Main entry point."""
    print("\n" + "="*60)
    print("🤖 VEXEL GROWTH AGENT v1.0")
    print("="*60)
    print("\nInitializing systems...")
    
    agent = VexelGrowthAgent()
    
    print("✅ Database initialized")
    print("✅ AI Engine ready")
    print("✅ Prospect Finder ready")
    print("✅ Outreach Manager ready")
    print("✅ Content Engine ready")
    print("\n🚀 Agent ready for action!")
    
    agent.run_interactive()

if __name__ == "__main__":
    main()

