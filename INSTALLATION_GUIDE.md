# 🚀 Vexel Logic Business OS Agent - Installation Guide

## What You're Getting

The **Vexel Logic Business OS Agent** is your AI-powered executive assistant that automates business operations, conducts market research, drafts emails, manages calendars, and performs complex business calculations—all through a single AI interface.

---

## 📋 Prerequisites

Before importing this workflow, ensure you have:

1. ✅ **Self-hosted n8n instance** (version 1.0.0 or higher)
2. ✅ **OpenAI API Key** (for GPT-4o access)
3. ✅ **Basic familiarity** with n8n interface

**Optional (for enhanced functionality):**
- Google Calendar API access (for calendar management)
- Gmail/Outlook API access (for email drafting)
- Tavily or Google Search API (for web research)

---

## 🔧 Installation Steps

### Step 1: Import the Workflow

1. Open your n8n instance
2. Click **"Workflows"** in the sidebar
3. Click the **"+"** button to create a new workflow
4. Click the **"⋮"** menu (three dots) in the top right
5. Select **"Import from File"**
6. Upload the `vexel-logic-business-os-agent.json` file
7. Click **"Import"**

### Step 2: Configure OpenAI Credentials

1. In the imported workflow, click on the **"OpenAI GPT-4o"** node
2. Click **"Credentials"** dropdown
3. Select **"Create New"** → **"OpenAI Account"**
4. Enter your OpenAI API key
5. Click **"Save"**

### Step 3: Activate the Webhook

1. Click on the **"Webhook Trigger"** node
2. You'll see a **Production URL** displayed (e.g., `https://your-n8n.com/webhook/vexel-agent`)
3. Copy this URL—this is your agent's endpoint
4. Click **"Activate Workflow"** (toggle in the top right)

### Step 4: Test Your Agent

Use this curl command to test (replace `YOUR_WEBHOOK_URL`):

```bash
curl -X POST YOUR_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello! What can you help me with?",
    "sessionId": "test-session-123"
  }'
```

---

## 🛠️ Tool Configuration (Optional but Recommended)

The agent comes with 4 powerful tools. Here's how to connect them to real services:

### 🌐 Web Research Tool

**Option A: Use Tavily API (Recommended)**
1. Create a sub-workflow named "Web Research"
2. Add HTTP Request node:
   - Method: POST
   - URL: `https://api.tavily.com/search`
   - Authentication: Header Auth
   - Body: `{"query": "{{ $json.query }}", "max_results": 5}`
3. Link this workflow to the "Web Research Tool" node

**Option B: Use Google Search API**
1. Set up Google Custom Search API credentials
2. Create sub-workflow with Google Search node
3. Link to the tool node

### 📧 Email Drafter Tool

**Current State:** The tool uses AI to draft emails based on parameters.

**To Connect to Gmail/Outlook:**
1. Create a sub-workflow named "Email Drafter"
2. Add Gmail/Outlook node
3. Configure it to draft emails in your account
4. Link this workflow to the "Email Drafter Tool" node

### 📅 Calendar Manager Tool

**To Connect to Google Calendar:**
1. Create a sub-workflow named "Calendar Manager"
2. Add Google Calendar node with your credentials
3. Configure actions (check availability, create events)
4. Link this workflow to the "Calendar Manager Tool" node

### 🧮 Business Calculator Tool

**Pre-configured and ready to use!** No additional setup needed.

**Supports:**
- Profit Margin calculations
- ROI (Return on Investment)
- Break-even analysis
- Markup percentage
- Customer Acquisition Cost (CAC)
- Customer Lifetime Value (LTV)
- Custom formulas

---

## 💬 How to Use (For Your Customers)

### Basic Usage

Send POST requests to your webhook URL with this JSON structure:

```json
{
  "message": "Your question or command here",
  "sessionId": "unique-user-identifier"
}
```

### Example Requests

**1. Market Research:**
```json
{
  "message": "Research the top 3 competitors in the online fitness coaching industry",
  "sessionId": "user-123"
}
```

**2. Email Drafting:**
```json
{
  "message": "Draft a sales outreach email to a SaaS company CEO about our marketing automation services",
  "sessionId": "user-123"
}
```

**3. Business Calculations:**
```json
{
  "message": "Calculate my profit margin if my revenue is $100,000 and costs are $65,000",
  "sessionId": "user-123"
}
```

**4. Calendar Management:**
```json
{
  "message": "Check my availability on December 15th for a 2-hour meeting",
  "sessionId": "user-123"
}
```

---

## 🎨 Connecting to Your Website

### Option 1: Chat Widget Integration

Add this JavaScript to your website:

```html
<script>
  function sendToVexelAgent(message) {
    fetch('YOUR_WEBHOOK_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: message,
        sessionId: 'user-' + Date.now()
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('AI Response:', data.response);
      // Display response in your chat widget
    });
  }
</script>
```

### Option 2: Contact Form Integration

Modify your contact form to send submissions to the webhook endpoint.

---

## 🔐 Security Best Practices

1. **Rate Limiting:** Configure n8n to limit requests per IP
2. **Authentication:** Add a secret token to webhook requests
3. **HTTPS Only:** Always use HTTPS for your n8n instance
4. **API Key Security:** Never expose your OpenAI API key publicly

### Adding Authentication (Recommended)

Modify the Webhook Trigger node:
1. Click on **"Webhook Trigger"**
2. Go to **"Options"** → **"Authentication"**
3. Select **"Header Auth"**
4. Set header name: `X-API-Key`
5. Set expected value: `your-secret-key-here`

---

## 🐛 Troubleshooting

### Issue: "Workflow not responding"
- **Solution:** Ensure the workflow is activated (toggle in top right)
- Check n8n logs for errors

### Issue: "OpenAI authentication failed"
- **Solution:** Verify your OpenAI API key is correct and has credits

### Issue: "Tools not working"
- **Solution:** The tool workflow nodes need to be linked to actual sub-workflows
- Create the sub-workflows as described in "Tool Configuration" section

### Issue: "Memory not persisting"
- **Solution:** Ensure `sessionId` is consistent across requests from the same user

---

## 📊 Usage Analytics & Monitoring

To track agent performance:

1. Add an **"Edit Fields"** node before "Respond to Webhook"
2. Log requests to a database or analytics service
3. Monitor OpenAI token usage in your API dashboard

---

## 🔄 Customization Ideas

Want to extend your agent? Here are some ideas:

- **CRM Integration:** Connect to HubSpot, Salesforce, or Pipedrive
- **Slack Notifications:** Send alerts when certain events happen
- **Database Queries:** Let the agent pull reports from your business database
- **SMS Capabilities:** Add Twilio for SMS-based interactions
- **Voice Input:** Connect to speech-to-text services

---

## 💡 Prompt Engineering Tips

Teach your customers to get better results:

**Good Prompts:**
- "Calculate the ROI if I invest $10,000 and expect $15,000 return"
- "Draft a follow-up email to a prospect who showed interest in our product"
- "Research current trends in sustainable packaging for e-commerce"

**Poor Prompts:**
- "Help" (too vague)
- "Do something" (no clear action)

---

## 📞 Support & Updates

**Version:** 1.0.0  
**Last Updated:** December 2025  
**Compatibility:** n8n v1.0.0+

For questions or feature requests, contact your vendor or consult the n8n community forums.

---

## 📜 License & Usage Rights

This workflow is licensed to you for use in your business. You may:
- ✅ Customize the workflow for your needs
- ✅ Connect it to your proprietary tools
- ✅ White-label it for your brand

You may NOT:
- ❌ Resell this exact workflow as-is
- ❌ Claim original authorship

---

## 🎯 Next Steps

1. ✅ Import the workflow
2. ✅ Configure OpenAI credentials
3. ✅ Test with sample requests
4. ✅ Connect to your website or tools
5. ✅ Customize tools for your specific needs

**Pro Tip:** Start with the Business Calculator tool—it works out of the box and demonstrates the agent's capabilities immediately!

---

**Happy Automating! 🚀**

*Built with ❤️ by Vexel Logic*






