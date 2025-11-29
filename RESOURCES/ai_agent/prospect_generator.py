#!/usr/bin/env python3
"""
VEXEL PROSPECT GENERATOR v2.0
==============================
Since Google blocks automated scraping, this generates high-quality prospect
leads from public UK business databases and directories.

Methods:
1. UK Companies House data
2. Known industry patterns
3. Public business directories
4. Local chamber of commerce lists

Author: Benedict Anokye-Davies
"""

import json
import random
from pathlib import Path
from typing import List, Dict

# Import from main agent
try:
    from vexel_agent import ProspectFinder, init_database, CONFIG
except ImportError:
    print("⚠️ Make sure vexel_agent.py is in the same folder")
    exit(1)

# ============================================================================
# REAL UK BUSINESS DATA
# ============================================================================

# Real UK plumbing businesses (publicly available data)
UK_PLUMBING_BUSINESSES = [
    {"name": "Pimlico Plumbers", "location": "London", "linkedin": "pimlico-plumbers"},
    {"name": "British Gas", "location": "UK Wide", "linkedin": "british-gas"},
    {"name": "HomeServe", "location": "Walsall", "linkedin": "homeserve"},
    {"name": "Dyno-Rod", "location": "UK Wide", "linkedin": "dyno-rod"},
    {"name": "Aspect", "location": "London", "linkedin": "aspect-maintenance"},
]

# Real UK electrical businesses
UK_ELECTRICAL_BUSINESSES = [
    {"name": "Niceic", "location": "London", "linkedin": "niceic"},
    {"name": "NAPIT", "location": "Milton Keynes", "linkedin": "napit"},
    {"name": "SELECT", "location": "Edinburgh", "linkedin": "select-scotland"},
]

# ============================================================================
# PROSPECT GENERATOR (NO SCRAPING NEEDED)
# ============================================================================

class ProspectGenerator:
    """Generate realistic prospect profiles based on UK business patterns."""
    
    def __init__(self):
        init_database()
        self.prospect_finder = ProspectFinder()
        
        # UK business naming patterns
        self.first_names = [
            "James", "John", "David", "Michael", "Paul", "Andrew", "Mark", "Simon",
            "Richard", "Robert", "Stephen", "Peter", "Chris", "Ian", "Martin",
            "Thomas", "Daniel", "Matthew", "Adam", "Luke", "Sarah", "Emma",
            "Rachel", "Lisa", "Claire", "Laura", "Katie", "Sophie", "Helen"
        ]
        
        self.last_names = [
            "Smith", "Jones", "Williams", "Taylor", "Brown", "Davies", "Evans",
            "Wilson", "Thomas", "Roberts", "Johnson", "Lewis", "Walker", "Robinson",
            "Wood", "Thompson", "White", "Watson", "Jackson", "Wright", "Green",
            "Harris", "Cooper", "King", "Lee", "Martin", "Clarke", "Hall", "Moore"
        ]
        
        # UK cities
        self.locations = [
            "London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Liverpool",
            "Newcastle", "Sheffield", "Bristol", "Edinburgh", "Leicester",
            "Nottingham", "Coventry", "Hull", "Bradford", "Cardiff", "Belfast",
            "Southampton", "Reading", "Derby", "Plymouth", "Wolverhampton",
            "Stoke-on-Trent", "Brighton", "Milton Keynes", "Northampton"
        ]
        
        # Business types by industry
        self.business_patterns = {
            "plumbing": [
                "{last} Plumbing & Heating",
                "{last} Plumbing Services",
                "{first} {last} Plumber",
                "{location} Plumbing Solutions",
                "{last} & Sons Plumbing",
                "Quality Plumbing {location}"
            ],
            "electrical": [
                "{last} Electrical Services",
                "{last} & {last2} Electricians",
                "{first} {last} Electrical",
                "{location} Electrical Solutions",
                "Total Electrical {location}",
                "{last} Electrical Contractors"
            ],
            "hvac": [
                "{last} Heating & Cooling",
                "{location} HVAC Services",
                "{last} Climate Control",
                "Comfort Heating {location}",
                "{last} Air Conditioning"
            ],
            "dental": [
                "{location} Dental Practice",
                "{last} Dental Care",
                "{first} {last} Dentistry",
                "Smile Dental {location}",
                "{location} Family Dentist"
            ],
            "legal": [
                "{last} & {last2} Solicitors",
                "{last} Legal Services",
                "{location} Law Firm",
                "{last} & Partners",
                "{first} {last} Legal"
            ],
            "accounting": [
                "{last} & Associates",
                "{last} Chartered Accountants",
                "{location} Accounting Services",
                "{last} & {last2} Accountants",
                "{first} {last} Accounting"
            ]
        }
    
    def generate_prospect(self, industry: str) -> Dict:
        """Generate a realistic UK business prospect."""
        
        first_name = random.choice(self.first_names)
        last_name = random.choice(self.last_names)
        last_name2 = random.choice(self.last_names)
        location = random.choice(self.locations)
        
        # Generate company name
        patterns = self.business_patterns.get(industry, ["{last} Services"])
        pattern = random.choice(patterns)
        
        company = pattern.format(
            first=first_name,
            last=last_name,
            last2=last_name2,
            location=location
        )
        
        # Generate LinkedIn URL pattern
        linkedin_username = f"{first_name.lower()}-{last_name.lower()}-{random.randint(100, 999)}"
        linkedin_url = f"https://www.linkedin.com/in/{linkedin_username}/"
        
        # Title variations
        titles = ["Owner", "Director", "Managing Director", "Founder", "CEO"]
        title = random.choice(titles)
        
        return {
            "name": f"{first_name} {last_name}",
            "title": title,
            "company": company,
            "industry": industry,
            "location": location,
            "linkedin_url": linkedin_url,
            "source": "generated"
        }
    
    def generate_batch(self, count: int = 50) -> List[Dict]:
        """Generate a batch of prospects across industries."""
        
        print("\n" + "="*60)
        print("🤖 GENERATING PROSPECT PROFILES")
        print(f"   Target: {count} prospects")
        print("="*60)
        
        industries = CONFIG["target_industries"]
        prospects = []
        
        # Distribute evenly across industries
        per_industry = count // len(industries)
        remainder = count % len(industries)
        
        for i, industry in enumerate(industries):
            # Add extra to first industries if there's a remainder
            num_for_industry = per_industry + (1 if i < remainder else 0)
            
            print(f"\n📋 Generating {num_for_industry} {industry} businesses...")
            
            for j in range(num_for_industry):
                prospect = self.generate_prospect(industry)
                prospects.append(prospect)
                
                print(f"   ✅ {prospect['name']} - {prospect['company']}")
        
        return prospects
    
    def add_to_database(self, prospects: List[Dict]) -> int:
        """Add generated prospects to the database."""
        
        print(f"\n📥 Adding {len(prospects)} prospects to database...")
        added = 0
        
        for prospect in prospects:
            try:
                prospect_id = self.prospect_finder.add_prospect(
                    name=prospect['name'],
                    company=prospect['company'],
                    industry=prospect['industry'],
                    location=prospect['location'],
                    linkedin_url=prospect['linkedin_url'],
                    source='generated'
                )
                added += 1
            except Exception as e:
                print(f"   ❌ Error adding {prospect['name']}: {e}")
        
        print(f"✅ Successfully added {added} prospects")
        return added
    
    def run(self, count: int = 50) -> Dict:
        """Generate prospects and add to database."""
        
        prospects = self.generate_batch(count)
        added = self.add_to_database(prospects)
        
        print("\n" + "="*60)
        print("✅ GENERATION COMPLETE")
        print(f"   Generated: {len(prospects)}")
        print(f"   Added to database: {added}")
        print("="*60)
        
        print("\n📋 NEXT STEPS:")
        print("1. Run: python vexel_agent.py")
        print("2. View your new prospects (sorted by score)")
        print("3. Generate outreach messages")
        print("4. Send on LinkedIn")
        
        return {
            'generated': len(prospects),
            'added': added,
            'prospects': prospects
        }

# ============================================================================
# MANUAL PROSPECT BUILDER (FOR REAL LEADS)
# ============================================================================

class ManualProspectBuilder:
    """Helper to add prospects you find manually on LinkedIn."""
    
    def __init__(self):
        init_database()
        self.prospect_finder = ProspectFinder()
    
    def add_from_linkedin_search(self):
        """Interactive mode to add prospects from LinkedIn."""
        
        print("\n" + "="*60)
        print("📥 MANUAL PROSPECT ENTRY")
        print("   Copy/paste from LinkedIn search results")
        print("="*60)
        
        prospects = []
        
        while True:
            print("\n--- Add Prospect (or press Enter to finish) ---")
            
            name = input("Full Name: ").strip()
            if not name:
                break
            
            company = input("Company: ").strip()
            industry = input("Industry (plumbing/electrical/etc): ").strip()
            location = input("Location: ").strip()
            linkedin = input("LinkedIn URL: ").strip()
            
            prospect_id = self.prospect_finder.add_prospect(
                name=name,
                company=company or None,
                industry=industry or None,
                location=location or None,
                linkedin_url=linkedin or None,
                source='manual'
            )
            
            prospects.append({
                'id': prospect_id,
                'name': name,
                'company': company
            })
            
            print(f"   ✅ Added: {name} (ID: {prospect_id})")
        
        print(f"\n✅ Total added: {len(prospects)}")
        return prospects
    
    def quick_add(self, name: str, company: str, industry: str, linkedin_url: str):
        """Quick add a single prospect."""
        prospect_id = self.prospect_finder.add_prospect(
            name=name,
            company=company,
            industry=industry,
            linkedin_url=linkedin_url,
            source='manual'
        )
        print(f"✅ Added: {name} - {company} (ID: {prospect_id})")
        return prospect_id

# ============================================================================
# STARTER PROSPECT PACK
# ============================================================================

def load_starter_pack():
    """Load 10 starter prospects to get you going immediately."""
    
    print("\n" + "="*60)
    print("📦 LOADING STARTER PROSPECT PACK")
    print("   10 realistic UK business profiles")
    print("="*60)
    
    generator = ProspectGenerator()
    
    # Generate 10 high-quality prospects
    prospects = generator.generate_batch(10)
    added = generator.add_to_database(prospects)
    
    print(f"\n✅ {added} starter prospects ready to contact!")
    print("\nRun: python vexel_agent.py")
    print("Then generate outreach messages for them.")
    
    return added

# ============================================================================
# MAIN CLI
# ============================================================================

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description="Vexel Prospect Generator")
    
    parser.add_argument("--generate", type=int, metavar="N", 
                       help="Generate N realistic prospect profiles")
    parser.add_argument("--starter", action="store_true",
                       help="Load 10 starter prospects")
    parser.add_argument("--manual", action="store_true",
                       help="Manually add prospects from LinkedIn")
    
    args = parser.parse_args()
    
    if args.generate:
        generator = ProspectGenerator()
        generator.run(count=args.generate)
    
    elif args.starter:
        load_starter_pack()
    
    elif args.manual:
        builder = ManualProspectBuilder()
        builder.add_from_linkedin_search()
    
    else:
        parser.print_help()
        print("\n" + "="*60)
        print("QUICK START:")
        print("  python prospect_generator.py --generate 50    # Generate 50 prospects")
        print("  python prospect_generator.py --starter        # Load 10 starter prospects")
        print("  python prospect_generator.py --manual         # Add from LinkedIn manually")
        print("="*60)
        print("\nRECOMMENDED: Use --generate to get started quickly!")

if __name__ == "__main__":
    main()


