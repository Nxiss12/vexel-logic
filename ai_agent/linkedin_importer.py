#!/usr/bin/env python3
"""
VEXEL LINKEDIN BULK IMPORTER v1.0
==================================
WORKS INSTANTLY - No scraping, no waiting, no failures.

YOU DO: Search LinkedIn, copy URLs
THIS DOES: Extract names, add to database, generate messages

Simple. Fast. Actually works.
"""

import re
from pathlib import Path
from typing import List, Dict

try:
    from vexel_agent import ProspectFinder, OutreachManager, init_database, CONFIG
except ImportError:
    print("❌ Run from ai_agent folder")
    exit(1)

class LinkedInBulkImporter:
    """Import prospects from LinkedIn URLs instantly."""
    
    def __init__(self):
        init_database()
        self.prospect_finder = ProspectFinder()
        self.outreach = OutreachManager()
    
    def extract_from_url(self, url: str, industry: str = None, location: str = "UK") -> Dict:
        """Extract prospect info from LinkedIn URL."""
        
        # Extract username from URL
        match = re.search(r'linkedin\.com/in/([^/\?]+)', url)
        if not match:
            return None
        
        username = match.group(1)
        
        # Convert username to name (best guess)
        # "john-smith-123" -> "John Smith"
        name_parts = username.split('-')
        # Remove numbers
        name_parts = [p for p in name_parts if not p.isdigit()]
        # Capitalize
        name = ' '.join([p.capitalize() for p in name_parts[:2]])  # First two parts
        
        return {
            'name': name,
            'linkedin_url': url,
            'industry': industry,
            'location': location
        }
    
    def bulk_import(self, urls: List[str], industry: str, location: str = "UK") -> List[int]:
        """Import multiple URLs at once."""
        
        print(f"\n{'='*60}")
        print(f"📥 IMPORTING {len(urls)} PROSPECTS")
        print(f"{'='*60}\n")
        
        prospect_ids = []
        
        for url in urls:
            url = url.strip()
            if not url or 'linkedin.com' not in url:
                continue
            
            prospect_data = self.extract_from_url(url, industry, location)
            if not prospect_data:
                continue
            
            # Add to database
            prospect_id = self.prospect_finder.add_prospect(
                name=prospect_data['name'],
                industry=industry,
                location=location,
                linkedin_url=url,
                source='linkedin_import'
            )
            
            prospect_ids.append(prospect_id)
            print(f"✅ Added: {prospect_data['name']} (ID: {prospect_id})")
        
        print(f"\n{'='*60}")
        print(f"✅ IMPORTED {len(prospect_ids)} PROSPECTS")
        print(f"{'='*60}\n")
        
        return prospect_ids
    
    def generate_outreach_for_all(self, prospect_ids: List[int]):
        """Generate outreach messages for all imported prospects."""
        
        print(f"📤 GENERATING OUTREACH FOR {len(prospect_ids)} PROSPECTS...\n")
        
        for prospect_id in prospect_ids:
            try:
                # Generate LinkedIn connection request
                outreach = self.outreach.create_outreach(
                    prospect_id=prospect_id,
                    activity_type='linkedin_connection',
                    platform='LinkedIn'
                )
                
                print(f"✅ Generated for ID {prospect_id}")
            except Exception as e:
                print(f"❌ Error for ID {prospect_id}: {e}")
        
        print(f"\n✅ All messages generated!")
        print(f"\nRun: python vexel_agent.py")
        print(f"Then: Command 4 (View pending outreach)")

def main():
    """Interactive import."""
    
    print("\n" + "="*60)
    print("🚀 LINKEDIN BULK IMPORTER")
    print("="*60)
    
    print("\n📋 HOW IT WORKS:")
    print("1. Search LinkedIn: 'Owner plumbing London'")
    print("2. Copy profile URLs (10-20 at once)")
    print("3. Paste them here")
    print("4. Get instant messages to send!")
    
    print("\n" + "-"*60)
    
    # Get industry
    print("\nWhat industry are these prospects?")
    print("(plumbing, electrical, hvac, dental, legal, accounting)")
    industry = input("Industry: ").strip().lower()
    
    if not industry:
        industry = "business"
    
    # Get location
    location = input("Location (default: UK): ").strip() or "UK"
    
    print("\n📝 PASTE LINKEDIN URLS (one per line, Enter twice when done):")
    print("-"*60)
    
    urls = []
    while True:
        line = input().strip()
        if not line:
            break
        urls.append(line)
    
    if not urls:
        print("\n❌ No URLs provided")
        return
    
    # Import
    importer = LinkedInBulkImporter()
    prospect_ids = importer.bulk_import(urls, industry, location)
    
    if not prospect_ids:
        print("\n❌ No valid LinkedIn URLs found")
        return
    
    # Ask if they want messages generated now
    generate = input("\n🤖 Generate outreach messages now? (y/n): ").lower()
    
    if generate == 'y':
        importer.generate_outreach_for_all(prospect_ids)

if __name__ == "__main__":
    main()


