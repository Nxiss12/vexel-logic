#!/usr/bin/env python3
"""
VEXEL PROSPECT SCRAPER v1.0
===========================
Automatically finds prospects from public sources and adds them to the agent.

Methods:
1. Google Search for LinkedIn profiles (no login required)
2. LinkedIn public profiles scraping
3. Company directories
4. Industry lists

Author: Benedict Anokye-Davies
"""

import time
import json
import re
from pathlib import Path
from typing import List, Dict, Optional
from urllib.parse import quote_plus, urlencode

# Try importing dependencies
try:
    import requests
    from bs4 import BeautifulSoup
    HAS_SCRAPING = True
except ImportError:
    HAS_SCRAPING = False
    print("⚠️ Install scraping dependencies: pip install requests beautifulsoup4")

# Import from main agent
try:
    from vexel_agent import ProspectFinder, init_database, CONFIG
except ImportError:
    print("⚠️ Make sure vexel_agent.py is in the same folder")

# ============================================================================
# GOOGLE SEARCH FOR LINKEDIN PROFILES (SAFEST METHOD)
# ============================================================================

class ProspectScraper:
    """Scrape prospects from public sources."""
    
    def __init__(self):
        init_database()
        self.prospect_finder = ProspectFinder()
        self.session = requests.Session() if HAS_SCRAPING else None
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def search_google_for_linkedin(self, 
                                   industry: str, 
                                   location: str = "UK",
                                   title: str = "Owner",
                                   max_results: int = 10) -> List[Dict]:
        """
        Search Google for LinkedIn profiles.
        This is SAFE - no LinkedIn login required.
        """
        if not HAS_SCRAPING:
            print("❌ Install dependencies first: pip install requests beautifulsoup4")
            return []
        
        # Build Google search query
        query = f'site:linkedin.com/in {title} {industry} {location}'
        search_url = f"https://www.google.com/search?q={quote_plus(query)}&num={max_results}"
        
        print(f"🔍 Searching: {query}")
        
        try:
            response = self.session.get(search_url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            results = []
            
            # Find all search results
            for result in soup.select('div.g')[:max_results]:
                try:
                    # Get title (usually has name)
                    title_elem = result.select_one('h3')
                    if not title_elem:
                        continue
                    
                    name = title_elem.text.strip()
                    
                    # Get LinkedIn URL
                    link_elem = result.select_one('a')
                    if not link_elem or 'linkedin.com/in/' not in link_elem.get('href', ''):
                        continue
                    
                    linkedin_url = link_elem.get('href')
                    
                    # Clean URL
                    if '/url?q=' in linkedin_url:
                        linkedin_url = linkedin_url.split('/url?q=')[1].split('&')[0]
                    
                    # Get description
                    desc_elem = result.select_one('div.VwiC3b')
                    description = desc_elem.text if desc_elem else ""
                    
                    # Extract company from description
                    company = self._extract_company(description)
                    
                    results.append({
                        'name': name,
                        'company': company,
                        'industry': industry,
                        'location': location,
                        'linkedin_url': linkedin_url,
                        'description': description
                    })
                    
                    print(f"   ✅ Found: {name} - {company}")
                
                except Exception as e:
                    continue
            
            # Rate limiting
            time.sleep(2)  # Be nice to Google
            
            return results
        
        except Exception as e:
            print(f"❌ Error searching: {e}")
            return []
    
    def _extract_company(self, text: str) -> Optional[str]:
        """Extract company name from description."""
        # Common patterns
        patterns = [
            r'(?:at|@)\s+([A-Z][A-Za-z\s&]+?)(?:\s+[-|·•])',
            r'(?:Owner|Director|CEO|Founder)\s+(?:at|@)\s+([A-Z][A-Za-z\s&]+)',
            r'([A-Z][A-Za-z\s&]+?)\s+[-|·•]\s+LinkedIn'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text)
            if match:
                company = match.group(1).strip()
                # Clean up
                company = re.sub(r'\s+', ' ', company)
                if len(company) > 3 and len(company) < 50:
                    return company
        
        return None
    
    def add_to_database(self, prospects: List[Dict]) -> int:
        """Add scraped prospects to the agent database."""
        added = 0
        
        for prospect in prospects:
            try:
                prospect_id = self.prospect_finder.add_prospect(
                    name=prospect['name'],
                    company=prospect.get('company'),
                    industry=prospect.get('industry'),
                    location=prospect.get('location'),
                    linkedin_url=prospect.get('linkedin_url'),
                    source='auto_scraped'
                )
                added += 1
                print(f"   ✅ Added to database: {prospect['name']} (ID: {prospect_id})")
            except Exception as e:
                print(f"   ❌ Error adding {prospect['name']}: {e}")
        
        return added
    
    def auto_scrape_session(self, count: int = 50) -> Dict:
        """
        Run an automated scraping session.
        Finds {count} prospects across multiple industries.
        """
        print("\n" + "="*60)
        print("🤖 STARTING AUTO-SCRAPING SESSION")
        print(f"   Target: {count} prospects")
        print("="*60)
        
        industries = CONFIG["target_industries"]
        locations = ["UK", "London", "Manchester", "Birmingham"]
        titles = ["Owner", "Director", "Managing Director", "Founder"]
        
        all_prospects = []
        searches_done = 0
        
        # Calculate how many searches we need
        prospects_per_search = 10
        searches_needed = (count + prospects_per_search - 1) // prospects_per_search
        
        for i in range(searches_needed):
            # Rotate through industries, locations, titles
            industry = industries[i % len(industries)]
            location = locations[i % len(locations)]
            title = titles[i % len(titles)]
            
            print(f"\n🔍 Search {i+1}/{searches_needed}: {title} {industry} in {location}")
            
            prospects = self.search_google_for_linkedin(
                industry=industry,
                location=location,
                title=title,
                max_results=prospects_per_search
            )
            
            all_prospects.extend(prospects)
            searches_done += 1
            
            # Check if we have enough
            if len(all_prospects) >= count:
                break
            
            # Rate limiting between searches
            print(f"   ⏳ Waiting 3 seconds before next search...")
            time.sleep(3)
        
        # Add to database
        print(f"\n📊 Scraped {len(all_prospects)} prospects")
        print("📥 Adding to database...")
        
        added = self.add_to_database(all_prospects)
        
        print("\n" + "="*60)
        print("✅ SCRAPING SESSION COMPLETE")
        print(f"   Searches: {searches_done}")
        print(f"   Found: {len(all_prospects)}")
        print(f"   Added: {added}")
        print("="*60)
        
        return {
            'searches': searches_done,
            'found': len(all_prospects),
            'added': added,
            'prospects': all_prospects
        }

# ============================================================================
# UK BUSINESS DIRECTORIES SCRAPER
# ============================================================================

class UKBusinessScraper:
    """Scrape UK business directories for prospect data."""
    
    def __init__(self):
        self.session = requests.Session() if HAS_SCRAPING else None
        self.prospect_finder = ProspectFinder()
    
    def scrape_yell_uk(self, industry: str, location: str, max_pages: int = 3) -> List[Dict]:
        """
        Scrape Yell.com (UK business directory).
        Public data, no login required.
        """
        if not HAS_SCRAPING:
            return []
        
        print(f"🔍 Searching Yell.com: {industry} in {location}")
        
        prospects = []
        
        # Format query
        search_term = industry.replace(' ', '+')
        location_term = location.replace(' ', '+')
        
        for page in range(1, max_pages + 1):
            url = f"https://www.yell.com/ucs/UcsSearchAction.do?keywords={search_term}&location={location_term}&pageNum={page}"
            
            try:
                response = self.session.get(url, timeout=10)
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Find business listings
                listings = soup.select('div.businessCapsule--mainContent')
                
                for listing in listings:
                    try:
                        name_elem = listing.select_one('h2.businessCapsule--name')
                        if not name_elem:
                            continue
                        
                        company = name_elem.text.strip()
                        
                        # Get phone
                        phone_elem = listing.select_one('span.business--telephoneNumber')
                        phone = phone_elem.text.strip() if phone_elem else None
                        
                        # Get address
                        address_elem = listing.select_one('span.business--address--text')
                        address = address_elem.text.strip() if address_elem else location
                        
                        prospects.append({
                            'name': f"Owner of {company}",  # Placeholder
                            'company': company,
                            'industry': industry,
                            'location': address,
                            'phone': phone,
                            'source': 'yell.com'
                        })
                        
                        print(f"   ✅ Found: {company}")
                    
                    except Exception as e:
                        continue
                
                time.sleep(2)  # Rate limiting
            
            except Exception as e:
                print(f"   ❌ Error on page {page}: {e}")
                break
        
        return prospects

# ============================================================================
# CLI INTERFACE
# ============================================================================

def main():
    """Main CLI interface."""
    import argparse
    
    parser = argparse.ArgumentParser(description="Vexel Prospect Scraper - Auto-find prospects")
    
    parser.add_argument("--auto", type=int, metavar="N", help="Auto-scrape N prospects")
    parser.add_argument("--industry", type=str, help="Target industry")
    parser.add_argument("--location", type=str, default="UK", help="Target location")
    parser.add_argument("--title", type=str, default="Owner", help="Job title")
    
    args = parser.parse_args()
    
    if not HAS_SCRAPING:
        print("\n❌ Missing dependencies!")
        print("Install with: pip install requests beautifulsoup4")
        return
    
    scraper = ProspectScraper()
    
    if args.auto:
        # Automated session
        results = scraper.auto_scrape_session(count=args.auto)
        
        print("\n📋 NEXT STEPS:")
        print("1. Run: python vexel_agent.py")
        print("2. View the new prospects")
        print("3. Generate outreach for them")
        print("4. Send the messages on LinkedIn")
    
    elif args.industry:
        # Single search
        prospects = scraper.search_google_for_linkedin(
            industry=args.industry,
            location=args.location,
            title=args.title,
            max_results=10
        )
        
        added = scraper.add_to_database(prospects)
        print(f"\n✅ Added {added} prospects to database")
    
    else:
        parser.print_help()
        print("\n" + "="*60)
        print("QUICK START:")
        print("  python prospect_scraper.py --auto 50     # Auto-find 50 prospects")
        print("  python prospect_scraper.py --industry plumbing --location London")
        print("="*60)

if __name__ == "__main__":
    main()


