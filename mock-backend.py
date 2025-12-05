#!/usr/bin/env python3
"""
Mock Backend Server for Vexel Logic AI Agent
Simulates n8n webhook responses with intelligent AI-like behavior
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import time
import random
from datetime import datetime
import re

class VexelAgentHandler(BaseHTTPRequestHandler):
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Accept')
        self.end_headers()
    
    def do_POST(self):
        """Handle POST requests from the frontend"""
        try:
            # Read request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Extract message
            message = data.get('message', data.get('chatInput', ''))
            session_id = data.get('sessionId', 'unknown')
            
            # Log request
            print(f"\n[{datetime.now().strftime('%H:%M:%S')}] 📨 Received: {message[:50]}...")
            
            # Generate intelligent response
            response_text = self.generate_response(message)
            
            # Simulate processing delay (realistic AI feel)
            time.sleep(1.5 + random.uniform(0.5, 1.5))
            
            # Build response
            response = {
                "success": True,
                "output": response_text,
                "response": response_text,
                "sessionId": session_id,
                "timestamp": datetime.now().isoformat(),
                "agent": "Vexel Logic Business OS",
                "model": "GPT-4o (Simulated)",
                "tokensUsed": random.randint(150, 800)
            }
            
            # Send response
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))
            
            print(f"[{datetime.now().strftime('%H:%M:%S')}] ✅ Sent response ({len(response_text)} chars)")
            
        except Exception as e:
            print(f"❌ Error: {e}")
            self.send_error(500, str(e))
    
    def generate_response(self, message):
        """Generate intelligent responses based on message content"""
        message_lower = message.lower()
        
        # Research queries
        if any(word in message_lower for word in ['research', 'compare', 'analyze', 'find', 'top', 'best']):
            return self.handle_research(message)
        
        # Email drafting
        elif any(word in message_lower for word in ['email', 'draft', 'write', 'compose', 'letter']):
            return self.handle_email_draft(message)
        
        # Calculations
        elif any(word in message_lower for word in ['calculate', 'roi', 'profit', 'revenue', 'cost', 'margin', 'break-even']):
            return self.handle_calculation(message)
        
        # Calendar/scheduling
        elif any(word in message_lower for word in ['schedule', 'calendar', 'meeting', 'appointment', 'book']):
            return self.handle_calendar(message)
        
        # Business strategy
        elif any(word in message_lower for word in ['strategy', 'plan', 'grow', 'improve', 'advice', 'recommend']):
            return self.handle_strategy(message)
        
        # General conversation
        else:
            return self.handle_general(message)
    
    def handle_research(self, message):
        """Handle research-related queries"""
        topics = {
            'project management': {
                'tools': ['Asana', 'Monday.com', 'ClickUp', 'Trello', 'Jira'],
                'features': ['Task tracking', 'Collaboration', 'Time tracking', 'Reporting', 'Integrations']
            },
            'crm': {
                'tools': ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM', 'Freshsales'],
                'features': ['Lead management', 'Sales pipeline', 'Email automation', 'Analytics', 'Mobile app']
            },
            'marketing': {
                'tools': ['Mailchimp', 'HubSpot Marketing', 'Marketo', 'ActiveCampaign', 'Constant Contact'],
                'features': ['Email campaigns', 'Automation', 'A/B testing', 'Analytics', 'CRM integration']
            }
        }
        
        # Detect topic
        topic_key = None
        for key in topics.keys():
            if key in message.lower():
                topic_key = key
                break
        
        if not topic_key:
            topic_key = 'project management'
        
        tools = topics[topic_key]['tools']
        features = topics[topic_key]['features']
        
        return f"""# 🔍 Research Results: Top {len(tools)} {topic_key.title()} Tools

Based on current market analysis, here are the leading solutions for remote teams:

## Tool Comparison

### 1. **{tools[0]}** ⭐⭐⭐⭐⭐
- **Pricing**: $10-24/user/month
- **Best for**: Enterprise teams, complex workflows
- **Key features**: {features[0]}, {features[1]}, advanced {features[3]}
- **Pros**: Highly customizable, robust integrations, excellent support
- **Cons**: Steeper learning curve, higher cost

### 2. **{tools[1]}** ⭐⭐⭐⭐½
- **Pricing**: $8-16/user/month
- **Best for**: Visual teams, marketing agencies
- **Key features**: Intuitive UI, {features[2]}, {features[4]}
- **Pros**: Beautiful interface, easy to adopt, great for collaboration
- **Cons**: Can get expensive with add-ons

### 3. **{tools[2]}** ⭐⭐⭐⭐
- **Pricing**: $5-12/user/month
- **Best for**: Small to medium teams, budget-conscious
- **Key features**: Flexible views, {features[0]}, real-time {features[1]}
- **Pros**: Excellent value, highly customizable, free tier available
- **Cons**: Limited advanced features on lower tiers

### 4. **{tools[3]}** ⭐⭐⭐⭐
- **Pricing**: Free - $10/user/month
- **Best for**: Simple projects, small teams
- **Key features**: Kanban boards, {features[1]}, basic {features[3]}
- **Pros**: Intuitive, great free plan, quick setup
- **Cons**: Limited functionality for complex projects

### 5. **{tools[4]}** ⭐⭐⭐½
- **Pricing**: $7-14/user/month
- **Best for**: Software development teams
- **Key features**: Agile workflows, sprint planning, developer tools
- **Pros**: Powerful for dev teams, excellent issue tracking
- **Cons**: Overkill for non-technical teams

## 📊 Recommendation

**For most remote teams**, I recommend starting with **{tools[2]}** due to its:
- Best price-to-value ratio
- Flexible customization options
- Strong feature set without overwhelming complexity

**Budget**: ~$200-400/month for a team of 20-30 people

Would you like me to provide implementation guidance or integration recommendations?"""

    def handle_email_draft(self, message):
        """Handle email drafting requests"""
        # Detect email type
        if 'sales' in message.lower() or 'pitch' in message.lower():
            email_type = 'sales'
        elif 'follow' in message.lower() or 'followup' in message.lower():
            email_type = 'followup'
        else:
            email_type = 'professional'
        
        if email_type == 'sales':
            return """# ✉️ Professional Sales Email Draft

**Subject Line Options:**
1. "Reduce operational costs by 40% with [Your Product]"
2. "Quick question about [Their Company]'s expense management"
3. "How [Similar Company] saved $50K in 6 months"

---

**Email Body:**

Hi [First Name],

I noticed that [Their Company] recently [specific achievement/news]. Congratulations on that milestone!

I'm reaching out because we help companies in [their industry] streamline their expense management processes. Our clients typically see:

- **40% reduction** in manual data entry time
- **$50K+ annual savings** through better cost visibility
- **Same-day** expense report processing (vs. 5-7 days average)

**Quick example:** [Similar Company] was processing 500+ monthly expense reports manually. After implementing our solution, they:
- Reduced processing time from 40 hours/week to 8 hours/week
- Caught $12K in duplicate expenses in the first month
- Improved employee satisfaction scores by 35%

**Would you be open to a 15-minute call** next Tuesday or Wednesday to explore if this could help [Their Company] achieve similar results?

No pressure—if timing isn't right, I'm happy to send over a case study for future reference.

Best regards,  
[Your Name]  
[Title] | [Company]  
📞 [Phone] | 📧 [Email]

---

**Key Points:**
- Opens with personalization
- Focuses on specific, quantifiable benefits
- Uses social proof (similar company example)
- Low-pressure call-to-action
- Offers alternative (case study) if not ready

**Best Time to Send:** Tuesday-Thursday, 10-11 AM or 2-3 PM (recipient's time zone)

Would you like me to adjust the tone or focus on different benefits?"""
        
        else:
            return """# ✉️ Professional Email Draft

**Subject:** [Regarding our discussion / Follow-up]

Hi [Name],

Thank you for taking the time to connect. I wanted to follow up on our conversation about [topic].

As discussed, here are the key next steps:

1. **[Action item 1]** - Timeline: [Date]
2. **[Action item 2]** - Owner: [Person]
3. **[Action item 3]** - Deliverable: [What]

I've also attached [relevant document/resource] that addresses the questions you raised about [specific topic].

**Proposed next meeting:** [Date/Time options]

Please let me know if you have any questions or if I can provide additional information.

Looking forward to our continued collaboration.

Best regards,  
[Your Name]

---

**Tips for this email:**
- Clear, professional tone
- Action-oriented with specific next steps
- Includes attachment reference
- Proposes concrete next meeting time

Would you like me to adjust the formality level or add specific details?"""

    def handle_calculation(self, message):
        """Handle business calculations"""
        # Extract numbers from message
        numbers = re.findall(r'\$?(\d+(?:,\d{3})*(?:\.\d{2})?)', message)
        
        if len(numbers) >= 2:
            try:
                num1 = float(numbers[0].replace(',', ''))
                num2 = float(numbers[1].replace(',', ''))
                
                if 'roi' in message.lower():
                    roi = ((num2 - num1) / num1) * 100
                    return f"""# 📊 ROI Calculation Results

**Investment Details:**
- Initial Investment: ${num1:,.2f}
- Expected/Actual Return: ${num2:,.2f}

## Results

### Return on Investment (ROI): **{roi:.2f}%**

**Interpretation:**
{'✅ **Excellent ROI!**' if roi > 100 else '✅ **Positive return**' if roi > 0 else '⚠️ **Negative return**'} 
{f'For every $1 invested, you gained ${(num2/num1):.2f}' if roi > 0 else 'Investment did not break even yet'}

### Break-Even Analysis
- Profit/Loss: ${(num2 - num1):,.2f}
- Break-even multiple: {(num2/num1):.2f}x

### Additional Metrics
- **Payback Period**: {(num1/((num2-num1)/12)):.1f} months (estimated)
- **Annual ROI**: {(roi/12):.2f}% per month

## Recommendations

{'1. **Scale this investment** - ROI above 50% is exceptional' if roi > 50 else '1. **Monitor performance** - ensure ROI trends remain positive' if roi > 0 else '1. **Review strategy** - consider optimization or exit'}
2. **Track these KPIs** going forward:
   - Customer acquisition cost
   - Lifetime value
   - Churn rate
   - Monthly recurring revenue

Would you like me to project this ROI over different time periods or calculate other financial metrics?"""
                
                elif 'profit' in message.lower() or 'margin' in message.lower():
                    margin = ((num2 - num1) / num2) * 100
                    return f"""# 💰 Profit Margin Analysis

**Financial Data:**
- Revenue: ${num2:,.2f}
- Costs: ${num1:,.2f}

## Results

### Profit Margin: **{margin:.2f}%**
### Gross Profit: **${(num2 - num1):,.2f}**

**Benchmark Comparison:**
{'✅ **Excellent margins!**' if margin > 40 else '✅ **Healthy margins**' if margin > 20 else '⚠️ **Below industry average**'}

{f'Your {margin:.1f}% margin is {"significantly" if margin > 40 else "moderately"} above the industry standard of 15-25% for most businesses.' if margin > 25 else f'Industry standard is typically 20-25%. Consider cost optimization strategies to improve from your current {margin:.1f}%.'}

### Profitability Insights
- For every $100 in revenue, you keep ${margin:.2f}
- Cost ratio: {(num1/num2*100):.1f}% of revenue

## Recommendations to Improve Margins

1. **Cost Reduction Targets:**
   - Reduce costs by 10%: Margin would increase to {((num2 - num1*0.9) / num2) * 100:.2f}%
   - Reduce costs by 20%: Margin would increase to {((num2 - num1*0.8) / num2) * 100:.2f}%

2. **Revenue Growth Strategy:**
   - Increase prices by 5%: Margin would be {((num2*1.05 - num1) / (num2*1.05)) * 100:.2f}%
   - Focus on high-margin products

Would you like a detailed cost reduction roadmap or pricing strategy analysis?"""
            
            except ValueError:
                pass
        
        # Default calculation response
        return """# 🧮 Business Calculator Ready

I can help you calculate:

### Financial Metrics
- **ROI (Return on Investment)**: Measure investment profitability
- **Profit Margin**: Revenue vs. cost analysis
- **Break-Even Point**: When you'll start making profit
- **CAC (Customer Acquisition Cost)**: Cost per customer
- **LTV (Lifetime Value)**: Long-term customer value

### Example Queries:
- "Calculate ROI if I invest $10,000 and get $15,000 back"
- "What's my profit margin if revenue is $100,000 and costs are $60,000?"
- "Calculate break-even: fixed costs $50K, price $100, variable cost $40"

**Please provide the specific numbers** and which calculation you'd like me to perform!"""

    def handle_calendar(self, message):
        """Handle calendar and scheduling requests"""
        return """# 📅 Calendar Management

I can help you with scheduling! Here's what I found:

## Available Time Slots (This Week)

### Tuesday, December 10
- 🟢 **10:00 AM - 11:00 AM** (Recommended - morning peak productivity)
- 🟢 **2:00 PM - 3:00 PM** (Good - post-lunch slot)

### Wednesday, December 11
- 🟢 **9:00 AM - 10:00 AM** (Recommended - start of day)
- 🟢 **3:00 PM - 4:00 PM** (Good - afternoon slot)

### Thursday, December 12
- 🟢 **11:00 AM - 12:00 PM** (Recommended - late morning)
- 🟢 **4:00 PM - 5:00 PM** (Available - end of day)

## Meeting Optimization

**Recommended:**
- **Best slot**: Tuesday 10 AM (highest response rate, 73%)
- **Duration**: 45-60 minutes (with 15-min buffer)
- **Format**: Video call (Zoom/Teams/Google Meet)

### Meeting Agenda Template:
1. **Introduction** (5 min)
2. **Main Discussion** (30 min)
3. **Q&A** (10 min)
4. **Next Steps** (10 min)
5. **Buffer time** (5 min)

## Automated Invite

Would you like me to:
1. ✅ Block these times on your calendar
2. ✅ Send calendar invites to attendees
3. ✅ Add video conference link
4. ✅ Include meeting prep documents

**Note:** *This is a simulated response. In production, this would integrate with Google Calendar, Outlook, or your calendar system.*

Which time slot works best for you?"""

    def handle_strategy(self, message):
        """Handle business strategy queries"""
        return """# 💡 Business Strategy Analysis

Great question! Let me provide a comprehensive strategic framework.

## Current Situation Analysis

Based on typical business challenges, here's a strategic approach:

### 1️⃣ **Market Position Assessment**

**Key Questions:**
- What's your unique value proposition?
- Who are your top 3 competitors?
- What's your current market share?

**SWOT Quick Analysis:**
- **Strengths**: Identify your core competencies
- **Weaknesses**: Where are you losing customers?
- **Opportunities**: Untapped markets, new technologies
- **Threats**: Competitive pressures, market changes

### 2️⃣ **Growth Strategy Framework**

**Three Proven Growth Levers:**

**A. Customer Acquisition**
- Reduce CAC by 30% through targeted marketing
- Implement referral program (typically 25-50% cheaper than paid ads)
- Optimize conversion funnel (small improvements = big impact)

**B. Revenue Optimization**
- Value-based pricing strategy
- Upsell/cross-sell to existing customers (5x easier than new sales)
- Introduce premium tier (+30-40% revenue potential)

**C. Operational Excellence**
- Automate repetitive tasks (free up 20-30% of time)
- Streamline workflows (reduce costs by 15-25%)
- Implement data-driven decision making

### 3️⃣ **90-Day Action Plan**

**Month 1: Foundation**
- Week 1-2: Conduct customer interviews (identify pain points)
- Week 3-4: Analyze competitor positioning

**Month 2: Optimization**
- Week 5-6: Launch A/B tests on key metrics
- Week 7-8: Implement quick wins from customer feedback

**Month 3: Scale**
- Week 9-10: Roll out successful experiments
- Week 11-12: Measure results, refine strategy

### 4️⃣ **Key Metrics to Track**

| Metric | Current | Target (90 days) |
|--------|---------|------------------|
| Revenue Growth | Baseline | +15-20% |
| Customer Acquisition Cost | Baseline | -20% |
| Customer Lifetime Value | Baseline | +25% |
| Net Promoter Score | Baseline | +10 points |

## Immediate Next Steps

1. **This Week**: Identify your #1 growth bottleneck
2. **This Month**: Test 3 solutions to that bottleneck
3. **This Quarter**: Double down on what works, cut what doesn't

**Would you like me to dive deeper into any specific area?**
- Detailed market analysis
- Competitive positioning strategy
- Financial modeling and projections
- Marketing strategy and tactics"""

    def handle_general(self, message):
        """Handle general queries"""
        return f"""# 👋 Hello! I'm Your Business AI Assistant

Thank you for reaching out! I'm here to help you with:

## 🎯 My Capabilities

### 1. **Market Research** 🔍
Research competitors, analyze market trends, compare products and services

### 2. **Email Drafting** ✉️
Create professional emails for sales, partnerships, customer service, and more

### 3. **Business Calculations** 📊
Calculate ROI, profit margins, break-even points, CAC, LTV, and other key metrics

### 4. **Calendar Management** 📅
Schedule meetings, find optimal time slots, manage availability

### 5. **Strategic Planning** 💡
Develop business strategies, growth plans, and operational improvements

## 💬 Your Message
> "{message[:100]}{'...' if len(message) > 100 else ''}"

I understood your query as a general question. Could you please:

- **Be more specific** about what you'd like help with
- **Provide context** or relevant details
- **Ask a question** related to my capabilities above

## 📝 Example Queries

Try asking me:
- "Research the top 5 CRM tools and compare their pricing"
- "Draft a sales email about our project management software"
- "Calculate ROI if I spend $5000 on ads and get $12000 in revenue"
- "Help me plan a growth strategy for my SaaS business"

**How can I assist you today?** 🚀"""

    def log_message(self, format, *args):
        """Suppress default logging"""
        pass


def run_server(port=8888):
    """Start the mock backend server"""
    server_address = ('', port)
    httpd = HTTPServer(server_address, VexelAgentHandler)
    
    print("=" * 70)
    print("🚀 VEXEL LOGIC MOCK BACKEND SERVER")
    print("=" * 70)
    print(f"\n✅ Server running on: http://localhost:{port}")
    print(f"📡 Webhook URL: http://localhost:{port}/webhook/vexel-agent")
    print("\n🔧 Configure your frontend with this webhook URL")
    print("\n⏹️  Press Ctrl+C to stop the server\n")
    print("=" * 70)
    print("\n📊 Waiting for requests...\n")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n👋 Server stopped. Goodbye!")
        httpd.shutdown()


if __name__ == '__main__':
    run_server(8888)

