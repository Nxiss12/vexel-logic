#!/usr/bin/env python3
"""
VEXEL GROWTH AGENT - AUTOMATED RUNNER
======================================
Runs autonomous growth tasks on a schedule.
Can be run as a background service or cron job.

Usage:
    python auto_runner.py --once     # Run once and exit
    python auto_runner.py --daemon   # Run continuously
    python auto_runner.py --daily    # Run daily task generator
"""

import argparse
import datetime
import json
import time
from pathlib import Path

# Import from main agent
from vexel_agent import (
    VexelGrowthAgent, 
    init_database, 
    CONFIG,
    DATABASE_PATH
)

# ============================================================================
# AUTOMATED TASKS
# ============================================================================

class AutomatedRunner:
    """Run growth tasks automatically."""
    
    def __init__(self):
        init_database()
        self.agent = VexelGrowthAgent()
        self.log_path = Path(__file__).parent / "automation_log.json"
        self.load_log()
    
    def load_log(self):
        """Load the automation log."""
        if self.log_path.exists():
            with open(self.log_path, 'r') as f:
                self.log = json.load(f)
        else:
            self.log = {"runs": [], "last_run": None}
    
    def save_log(self):
        """Save the automation log."""
        with open(self.log_path, 'w') as f:
            json.dump(self.log, f, indent=2, default=str)
    
    def run_daily_tasks(self):
        """Run all daily automated tasks."""
        print("\n" + "="*60)
        print("🤖 AUTOMATED DAILY TASKS")
        print(f"   Started: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("="*60)
        
        results = {
            "timestamp": datetime.datetime.now().isoformat(),
            "tasks": {}
        }
        
        # Task 1: Generate daily content
        print("\n📝 Generating daily content...")
        try:
            content = self.agent.content_engine.generate_post(
                platform="linkedin",
                topic=None  # Random topic
            )
            results["tasks"]["content_generated"] = True
            print(f"   ✅ Created {content['platform']} post: {content['topic']}")
        except Exception as e:
            results["tasks"]["content_generated"] = False
            print(f"   ❌ Error: {e}")
        
        # Task 2: Generate search targets
        print("\n🔍 Generating prospect search list...")
        try:
            prospects = self.agent.prospect_finder.generate_prospect_list(10)
            results["tasks"]["search_list"] = [p['search_query'] for p in prospects]
            print(f"   ✅ Generated {len(prospects)} search targets")
            for p in prospects[:5]:
                print(f"      • {p['search_query']}")
        except Exception as e:
            results["tasks"]["search_list"] = []
            print(f"   ❌ Error: {e}")
        
        # Task 3: Check for pending follow-ups
        print("\n📤 Checking pending outreach...")
        try:
            pending = self.agent.outreach_manager.get_pending_outreach(20)
            results["tasks"]["pending_outreach"] = len(pending)
            print(f"   📬 {len(pending)} messages waiting to be sent")
        except Exception as e:
            print(f"   ❌ Error: {e}")
        
        # Task 4: Generate daily briefing
        print("\n📊 Generating daily briefing...")
        try:
            metrics = self.agent.dashboard.get_metrics(7)
            results["tasks"]["metrics"] = metrics
            print(f"   Last 7 days:")
            print(f"      Prospects: {metrics.get('total_prospects', 0) or 0}")
            print(f"      Outreach: {metrics.get('total_outreach', 0) or 0}")
            print(f"      Response rate: {metrics.get('response_rate', 0)}%")
        except Exception as e:
            print(f"   ❌ Error: {e}")
        
        # Task 5: Export daily tasks
        print("\n📋 Exporting today's task list...")
        try:
            self.agent._export_tasks()
            results["tasks"]["export_success"] = True
        except Exception as e:
            results["tasks"]["export_success"] = False
            print(f"   ❌ Error: {e}")
        
        # Log the run
        self.log["runs"].append(results)
        self.log["last_run"] = results["timestamp"]
        self.save_log()
        
        print("\n" + "="*60)
        print("✅ DAILY TASKS COMPLETED")
        print("="*60)
        
        return results
    
    def run_content_batch(self, count: int = 7):
        """Generate a batch of content for the week."""
        print("\n" + "="*60)
        print(f"🤖 GENERATING {count} CONTENT PIECES")
        print("="*60)
        
        topics = ["missed_calls", "reviews", "automation", "case_study", "roi", "pain_point", "founder_story"]
        platforms = ["linkedin", "linkedin", "twitter", "linkedin", "twitter", "linkedin", "linkedin"]
        
        generated = []
        
        for i in range(min(count, len(topics))):
            print(f"\n📝 Generating post {i+1}/{count}...")
            try:
                content = self.agent.content_engine.generate_post(
                    platform=platforms[i],
                    topic=topics[i]
                )
                generated.append(content)
                print(f"   ✅ {content['platform']}: {content['topic']}")
            except Exception as e:
                print(f"   ❌ Error: {e}")
        
        print(f"\n✅ Generated {len(generated)} pieces of content")
        return generated
    
    def run_outreach_for_prospects(self, limit: int = 10):
        """Generate outreach for top prospects."""
        print("\n" + "="*60)
        print(f"🤖 GENERATING OUTREACH FOR TOP {limit} PROSPECTS")
        print("="*60)
        
        # Get top prospects
        prospects = self.agent.prospect_finder.get_prospects(status="new", min_score=50, limit=limit)
        
        if not prospects:
            print("\n⚠️ No new prospects found. Add some first!")
            return []
        
        generated = []
        
        for prospect in prospects:
            print(f"\n📤 Creating outreach for {prospect['name']}...")
            try:
                outreach = self.agent.outreach_manager.create_outreach(
                    prospect_id=prospect['id'],
                    activity_type="linkedin_connection",
                    platform="LinkedIn"
                )
                generated.append(outreach)
                print(f"   ✅ Created LinkedIn connection request")
            except Exception as e:
                print(f"   ❌ Error: {e}")
        
        print(f"\n✅ Generated {len(generated)} outreach messages")
        return generated
    
    def run_daemon(self, interval_hours: int = 24):
        """Run as a background daemon."""
        print("\n" + "="*60)
        print("🤖 STARTING DAEMON MODE")
        print(f"   Interval: Every {interval_hours} hours")
        print("   Press Ctrl+C to stop")
        print("="*60)
        
        try:
            while True:
                self.run_daily_tasks()
                
                next_run = datetime.datetime.now() + datetime.timedelta(hours=interval_hours)
                print(f"\n⏰ Next run: {next_run.strftime('%Y-%m-%d %H:%M')}")
                print("   Sleeping...")
                
                time.sleep(interval_hours * 3600)
        
        except KeyboardInterrupt:
            print("\n\n👋 Daemon stopped by user")

# ============================================================================
# LINKEDIN SEARCH HELPER
# ============================================================================

def generate_linkedin_searches():
    """Generate LinkedIn search URLs for finding prospects."""
    print("\n" + "="*60)
    print("🔍 LINKEDIN SEARCH URLS")
    print("="*60)
    
    industries = CONFIG["target_industries"]
    locations = ["United Kingdom", "London", "Manchester", "Birmingham"]
    titles = ["Owner", "Director", "Managing Director", "Founder"]
    
    searches = []
    
    for industry in industries[:4]:
        for title in titles[:2]:
            for location in locations[:2]:
                # LinkedIn search URL format
                query = f"{title} {industry}"
                search_url = f"https://www.linkedin.com/search/results/people/?keywords={query.replace(' ', '%20')}&origin=GLOBAL_SEARCH_HEADER"
                
                searches.append({
                    "query": f"{title} {industry} in {location}",
                    "url": search_url
                })
    
    print("\nCopy these URLs and paste into LinkedIn:\n")
    
    for i, search in enumerate(searches[:10], 1):
        print(f"{i}. {search['query']}")
        print(f"   {search['url']}\n")
    
    return searches

# ============================================================================
# EMAIL CAMPAIGN GENERATOR
# ============================================================================

def generate_email_campaign(num_emails: int = 5):
    """Generate a cold email campaign."""
    print("\n" + "="*60)
    print(f"📧 GENERATING {num_emails} COLD EMAILS")
    print("="*60)
    
    init_database()
    agent = VexelGrowthAgent()
    
    emails = []
    
    subjects = [
        "Quick question about missed calls",
        "{company} - losing revenue to missed calls?",
        "The math that changes everything",
        "15 mins to recover £4k/month?",
        "Your competitors are doing this..."
    ]
    
    for i in range(num_emails):
        print(f"\n📧 Generating email {i+1}...")
        
        # Generate email body
        content = agent.ai.generate(f"Generate cold email #{i+1} about missed call recovery")
        
        email = {
            "subject": subjects[i % len(subjects)],
            "body": content,
            "cta": CONFIG["calendly_link"]
        }
        
        emails.append(email)
        
        print(f"   Subject: {email['subject']}")
    
    # Export to file
    export_path = Path(__file__).parent / "email_campaign.md"
    
    with open(export_path, 'w', encoding='utf-8') as f:
        f.write("# Cold Email Campaign\n\n")
        for i, email in enumerate(emails, 1):
            f.write(f"## Email {i}\n\n")
            f.write(f"**Subject:** {email['subject']}\n\n")
            f.write(f"```\n{email['body']}\n```\n\n")
            f.write(f"**CTA:** {email['cta']}\n\n---\n\n")
    
    print(f"\n✅ Campaign exported to: {export_path}")
    
    return emails

# ============================================================================
# SOCIAL PROOF GENERATOR
# ============================================================================

def generate_testimonial_posts():
    """Generate posts based on client testimonials."""
    print("\n" + "="*60)
    print("⭐ GENERATING TESTIMONIAL POSTS")
    print("="*60)
    
    testimonials = [
        {
            "name": "James M.",
            "business": "Plumber, Nottingham",
            "quote": "Paid for itself in 3 days when I closed a £2,400 job I would have missed.",
            "metric": "£4,200/month recovered"
        },
        {
            "name": "Sarah K.",
            "business": "Dental Practice, Leeds",
            "quote": "Our Google rating went from 4.2 to 4.9 stars in 8 weeks.",
            "metric": "4.2★ → 4.9★"
        },
        {
            "name": "David L.",
            "business": "Legal Services, London",
            "quote": "Saved 6 hours per week on admin. The unified inbox alone is worth it.",
            "metric": "20+ hours/week saved"
        },
        {
            "name": "Mike T.",
            "business": "Electrician, Manchester",
            "quote": "I didn't think I was missing that many calls. The data was a wake-up call.",
            "metric": "8 calls/week recovered"
        }
    ]
    
    posts = []
    
    for t in testimonials:
        post = f'''What our clients say:

💬 "{t['quote']}"

— {t['name']}, {t['business']}

📊 Result: {t['metric']}

Not promises. Real results.

Want to see what we can do for YOUR business?
📅 Free audit: {CONFIG['calendly_link']}

#ClientResults #UKBusiness #Testimonial #BusinessAutomation'''
        
        posts.append(post)
        print(f"\n--- Post for {t['name']} ---")
        print(post[:200] + "...")
    
    # Export
    export_path = Path(__file__).parent / "testimonial_posts.md"
    
    with open(export_path, 'w', encoding='utf-8') as f:
        f.write("# Testimonial Posts\n\n")
        for i, post in enumerate(posts, 1):
            f.write(f"## Post {i}\n\n```\n{post}\n```\n\n---\n\n")
    
    print(f"\n✅ Exported to: {export_path}")
    
    return posts

# ============================================================================
# MAIN
# ============================================================================

def main():
    parser = argparse.ArgumentParser(description="Vexel Growth Agent - Automated Runner")
    
    parser.add_argument("--once", action="store_true", help="Run daily tasks once and exit")
    parser.add_argument("--daemon", action="store_true", help="Run as background daemon")
    parser.add_argument("--content", type=int, metavar="N", help="Generate N content pieces")
    parser.add_argument("--outreach", type=int, metavar="N", help="Generate outreach for N prospects")
    parser.add_argument("--linkedin", action="store_true", help="Generate LinkedIn search URLs")
    parser.add_argument("--emails", type=int, metavar="N", help="Generate N cold emails")
    parser.add_argument("--testimonials", action="store_true", help="Generate testimonial posts")
    
    args = parser.parse_args()
    
    runner = AutomatedRunner()
    
    if args.once:
        runner.run_daily_tasks()
    elif args.daemon:
        runner.run_daemon()
    elif args.content:
        runner.run_content_batch(args.content)
    elif args.outreach:
        runner.run_outreach_for_prospects(args.outreach)
    elif args.linkedin:
        generate_linkedin_searches()
    elif args.emails:
        generate_email_campaign(args.emails)
    elif args.testimonials:
        generate_testimonial_posts()
    else:
        # Default: show help
        parser.print_help()
        print("\n" + "="*60)
        print("QUICK START:")
        print("  python auto_runner.py --once         # Run daily tasks")
        print("  python auto_runner.py --content 7    # Generate week of content")
        print("  python auto_runner.py --linkedin     # Get search URLs")
        print("  python auto_runner.py --emails 5     # Generate email campaign")
        print("="*60)

if __name__ == "__main__":
    main()

