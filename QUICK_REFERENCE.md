# ⚡ Vexel Logic Business OS - Quick Reference Card

**Print this page for instant reference!**

---

## 🔗 Your Webhook URL

```
https://your-n8n-instance.com/webhook/vexel-agent
```

**Replace with your actual URL after importing the workflow**

---

## 📤 Request Format

### Basic Request

```bash
POST https://your-n8n-instance.com/webhook/vexel-agent
Content-Type: application/json

{
  "message": "Your question here",
  "sessionId": "unique-user-id"
}
```

### With Authentication

```bash
POST https://your-n8n-instance.com/webhook/vexel-agent
Content-Type: application/json
X-API-Key: your-secret-key

{
  "message": "Your question here",
  "sessionId": "unique-user-id"
}
```

---

## 📥 Response Format

```json
{
  "success": true,
  "response": "AI's answer here",
  "sessionId": "unique-user-id",
  "timestamp": "2025-12-04T10:30:00.000Z",
  "agent": "Vexel Logic Business OS"
}
```

---

## 🎯 Quick Commands Cheat Sheet

### 💰 Business Calculations

| What You Want | Example Command |
|---------------|----------------|
| **Profit Margin** | `"Calculate profit margin with revenue $50,000 and costs $32,000"` |
| **ROI** | `"What's my ROI if I invest $10,000 and gain $15,000?"` |
| **Break-Even** | `"Break-even point with $50,000 fixed costs, $100 price, $40 variable cost"` |
| **Markup** | `"Calculate markup if my cost is $20 and selling price is $35"` |
| **CAC** | `"What's my customer acquisition cost with $5,000 ad spend and 25 customers?"` |
| **LTV** | `"Calculate lifetime value: $100 avg purchase, 3x/year, 5 years"` |

### 🔍 Market Research

| What You Want | Example Command |
|---------------|----------------|
| **Competitor Analysis** | `"Research top 5 competitors in [industry]"` |
| **Market Trends** | `"What are the biggest trends in [industry] for 2025?"` |
| **Pricing Research** | `"What do competitors charge for [product/service]?"` |
| **Customer Pain Points** | `"What are common complaints about [product category]?"` |

### 📧 Email Drafting

| What You Want | Example Command |
|---------------|----------------|
| **Sales Outreach** | `"Draft sales email to [role] at [company] about [product]"` |
| **Follow-Up** | `"Write follow-up email for prospect who requested demo last week"` |
| **Customer Reply** | `"Draft response to customer asking about [feature/issue]"` |
| **Partnership** | `"Write partnership proposal email to [company]"` |

### 📅 Calendar Management

| What You Want | Example Command |
|---------------|----------------|
| **Check Availability** | `"Am I free on December 15th at 2 PM?"` |
| **Find Time Slots** | `"Find three 1-hour slots next week with 30-min buffer"` |
| **Book Meeting** | `"Schedule 90-min meeting on Dec 20 at 10 AM with john@example.com"` |

### 🧠 Strategic Advice

| What You Want | Example Command |
|---------------|----------------|
| **Growth Strategy** | `"Suggest 3 growth strategies for my [business type] at $2M revenue"` |
| **Cost Optimization** | `"How can I reduce operational costs without hurting quality?"` |
| **Pricing Strategy** | `"Should I charge $X or $Y for my product? Why?"` |
| **Hiring Decision** | `"Should I hire a salesperson at $60K with $5K deals and 40% margin?"` |

---

## 🚀 Copy-Paste Code Examples

### JavaScript (Fetch)

```javascript
fetch('YOUR_WEBHOOK_URL', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Your question',
    sessionId: 'user-123'
  })
})
.then(res => res.json())
.then(data => console.log(data.response));
```

### Python

```python
import requests

response = requests.post(
    'YOUR_WEBHOOK_URL',
    json={
        'message': 'Your question',
        'sessionId': 'user-123'
    }
)
print(response.json()['response'])
```

### cURL

```bash
curl -X POST YOUR_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"message":"Your question","sessionId":"user-123"}'
```

---

## 🔥 Power User Tips

### 1. Chain Multiple Questions (Same Session)

```
Request 1: "Research pricing for premium coffee subscriptions"
Request 2: "Now calculate what our pricing should be with 40% margin"
Request 3: "Draft an email announcing this new pricing"
```

**Pro Tip:** Use the same `sessionId` so it remembers context!

### 2. Be Specific with Numbers

❌ Bad: `"Calculate my profit"`  
✅ Good: `"Calculate profit margin with revenue $100,000 and costs $65,000"`

### 3. Provide Context

❌ Bad: `"Draft an email"`  
✅ Good: `"Draft a sales email to a SaaS CTO about API monitoring, focus on cost savings, keep it under 150 words"`

### 4. Use Business Terminology

The agent understands:
- ROI, CAC, LTV, COGS, MRR, ARR
- Profit margin, markup, break-even
- Funnel, conversion rate, churn
- MQL, SQL, pipeline

### 5. Ask for Alternatives

```
"Give me 3 different approaches to..."
"What are pros and cons of..."
"Compare option A vs option B"
```

---

## 🎨 Session ID Best Practices

| Scenario | Recommended Session ID Format |
|----------|------------------------------|
| **Website Chat** | `web-[user-id]-[date]` |
| **Mobile App** | `mobile-[device-id]-[date]` |
| **API Integration** | `api-[client-id]-[timestamp]` |
| **Testing** | `test-[feature]-[date]` |
| **Anonymous Users** | `anon-[ip-hash]-[timestamp]` |

**Example:** `web-user789-20251204`

---

## ⏱️ Expected Response Times

| Query Type | Typical Response Time |
|------------|----------------------|
| Simple calculation | 2-3 seconds |
| Email draft | 3-5 seconds |
| Short research | 5-10 seconds |
| Complex analysis | 10-15 seconds |

**If slower:** Check your OpenAI API status or n8n logs

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| **No response** | Check workflow is activated in n8n |
| **"Auth failed"** | Verify OpenAI API key is valid |
| **Timeout** | Increase client timeout to 30+ seconds |
| **Generic response** | Add more context to your question |
| **Memory not working** | Use consistent sessionId across requests |

---

## 💰 Cost Calculator

| Usage Level | Monthly Queries | Estimated Cost |
|-------------|-----------------|----------------|
| **Light** | 500 | ~$2 |
| **Medium** | 2,000 | ~$8 |
| **Heavy** | 10,000 | ~$40 |
| **Enterprise** | 50,000 | ~$200 |

**Cost per query:** $0.003-0.005 (less than half a cent!)

---

## 📊 Quality Checklist

Before deploying to production:

- [ ] Tested 5+ queries of each type
- [ ] Verified sessionId memory works
- [ ] Confirmed authentication (if enabled)
- [ ] Set up error logging
- [ ] Configured rate limiting
- [ ] Added loading states in UI
- [ ] Created user-friendly error messages
- [ ] Documented for your team

---

## 🔐 Security Checklist

- [ ] Webhook uses HTTPS (not HTTP)
- [ ] API key stored in environment variable
- [ ] Rate limiting enabled
- [ ] Input validation added
- [ ] CORS configured (if browser-based)
- [ ] Session IDs don't expose PII
- [ ] Logs don't contain sensitive data

---

## 📚 Documentation Links

| Document | What's Inside |
|----------|---------------|
| **README.md** | Overview, quick start |
| **INSTALLATION_GUIDE.md** | Step-by-step setup |
| **BUSINESS_USE_CASES.md** | Real examples with ROI |
| **TECHNICAL_DOCUMENTATION.md** | Architecture deep-dive |
| **EXAMPLE_INTEGRATIONS.md** | Code for 10+ platforms |

---

## 🆘 Support Resources

1. **Check logs:** n8n execution logs show errors
2. **Read docs:** 99% of questions answered in documentation
3. **n8n Community:** community.n8n.io
4. **OpenAI Status:** status.openai.com
5. **Vendor Support:** [Your support channel]

---

## 🎯 Common Mistakes to Avoid

| ❌ Mistake | ✅ Fix |
|-----------|--------|
| Different sessionId each time | Use consistent session IDs per user |
| Vague questions | Include specific numbers and context |
| 2-second timeout | Set 30+ second timeouts |
| Hardcoded API keys | Use environment variables |
| No error handling | Always catch and display errors |
| Testing in production | Use test sessionIds first |

---

## 🚀 Workflow Activation Checklist

**Before going live:**

1. ✅ Import workflow into n8n
2. ✅ Add OpenAI credentials
3. ✅ Click "Activate" toggle
4. ✅ Copy webhook URL
5. ✅ Test with cURL
6. ✅ Add authentication (optional)
7. ✅ Configure rate limiting
8. ✅ Set up monitoring
9. ✅ Train your team
10. ✅ Launch! 🎉

---

## 💡 Example One-Liners

Copy-paste these for instant results:

```
"Calculate ROI: invested $25,000, gained $40,000"

"Research top 3 email marketing tools and compare pricing"

"Draft thank-you email to customer who just purchased"

"Am I available for a 2-hour meeting on Dec 10th?"

"Suggest 5 ways to reduce customer churn in SaaS"

"Calculate break-even with $100K fixed costs, $50 price, $20 variable cost"

"What are the top trends in remote work for 2025?"

"Draft sales email to enterprise CTO about our security solution"
```

---

## 🎨 Terminal Quick Test

```bash
# Set your webhook URL
export WEBHOOK_URL="https://your-n8n-instance.com/webhook/vexel-agent"

# Test calculation
curl -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"message":"Calculate profit margin with revenue $100,000 and costs $70,000","sessionId":"test"}'

# Expected: ~30% profit margin
```

---

## 📱 Mobile Testing

```javascript
// Quick mobile test (paste in browser console)
fetch('YOUR_WEBHOOK_URL', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Test from mobile',
    sessionId: 'mobile-test-' + Date.now()
  })
})
.then(r => r.json())
.then(d => alert(d.response));
```

---

## 🏆 Success Metrics to Track

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Response Time** | < 5 sec | Monitor webhook logs |
| **Success Rate** | > 95% | Count 200 responses |
| **User Satisfaction** | > 4/5 | Post-interaction survey |
| **Cost per Query** | < $0.01 | OpenAI dashboard |
| **Queries per User** | > 5/month | Track by sessionId |

---

## 🎁 Bookmark These URLs

- n8n Docs: https://docs.n8n.io
- OpenAI Status: https://status.openai.com
- Your Webhook: `[Write it here]`
- Your n8n Instance: `[Write it here]`

---

## 📞 Emergency Contacts

| Issue | Contact |
|-------|---------|
| n8n Not Responding | Check server status / restart |
| OpenAI Errors | status.openai.com |
| Workflow Questions | TECHNICAL_DOCUMENTATION.md |
| Integration Help | EXAMPLE_INTEGRATIONS.md |

---

**Print this page and keep it at your desk! 🖨️**

**Version:** 1.0.0 | **Last Updated:** Dec 4, 2025 | **Built by Vexel Logic**






