# 🔧 Vexel Logic Business OS - Technical Documentation

## Architecture Overview

This document provides technical details for developers who want to understand, modify, or extend the Vexel Logic Business OS Agent workflow.

---

## 📐 Workflow Architecture

```
┌─────────────────┐
│  Webhook Trigger│ (Entry Point)
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│         AI Agent Brain                   │
│  ┌───────────────────────────────────┐  │
│  │   System Prompt (Core Directive)   │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │   Language Model (GPT-4o)         │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │   Memory (Window Buffer)          │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │   Tools (Function Calling)        │  │
│  │   ├─ Web Research                 │  │
│  │   ├─ Email Drafter                │  │
│  │   ├─ Calendar Manager             │  │
│  │   └─ Business Calculator          │  │
│  └───────────────────────────────────┘  │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────┐
│ Respond Webhook │ (Response)
└─────────────────┘
```

---

## 🧩 Node Breakdown

### 1. Webhook Trigger Node

**Type:** `n8n-nodes-base.webhook`  
**Version:** 2

**Configuration:**
```json
{
  "httpMethod": "POST",
  "path": "vexel-agent",
  "options": {
    "responseMode": "responseNode"
  }
}
```

**Expected Input Format:**
```json
{
  "message": "string (required) - The user's query",
  "sessionId": "string (optional) - Session identifier for memory"
}
```

**Alternative Input Formats Supported:**
- `body.query` - Alternative to `message`
- `query` - For GET requests (though POST is recommended)

**Response Mode:** 
- Uses `responseNode` to allow async processing before responding
- Response is handled by the "Respond to Webhook" node

---

### 2. AI Agent Brain Node

**Type:** `@n8n/n8n-nodes-langchain.agent`  
**Version:** 1.7  
**Agent Type:** Conversational Agent

**Key Parameters:**
```json
{
  "agent": "conversationalAgent",
  "promptType": "define",
  "text": "={{ $json.body.message || $json.body.query || $json.query }}",
  "hasOutputParser": true,
  "options": {
    "systemMessage": "<SYSTEM_PROMPT>"
  }
}
```

**System Prompt Strategy:**
- Defines agent personality (professional, logic-driven)
- Sets core directives (efficiency, growth mindset)
- Lists capabilities for user transparency
- Instructs agent to ask for clarification when uncertain

**Output:**
- Returns `output` field containing the AI's text response
- Maintains conversation context via memory node
- Can trigger multiple tool calls in a single interaction

---

### 3. OpenAI GPT-4o Language Model

**Type:** `@n8n/n8n-nodes-langchain.lmChatOpenAi`  
**Version:** 1

**Configuration:**
```json
{
  "model": "gpt-4o",
  "options": {
    "temperature": 0.7,
    "maxTokens": 2000
  }
}
```

**Parameter Rationale:**
- **Model:** GPT-4o (optimized balance of speed & intelligence)
- **Temperature:** 0.7 (creative but not random - good for business contexts)
- **Max Tokens:** 2000 (allows detailed responses without excessive API costs)

**Alternative Models:**
- `gpt-4-turbo` - Faster, slightly less capable
- `gpt-4` - More expensive, marginally better reasoning
- Claude 3.5 Sonnet - Can substitute with Anthropic credentials

**Connection Type:** `ai_languageModel`

---

### 4. Conversation Memory Node

**Type:** `@n8n/n8n-nodes-langchain.memoryBufferWindow`  
**Version:** 1.3

**Configuration:**
```json
{
  "sessionIdType": "customKey",
  "sessionKey": "={{ $json.body.sessionId || 'default-session' }}",
  "contextWindowLength": 10
}
```

**How It Works:**
- Stores last 10 messages per session
- Session isolation via `sessionId` parameter
- Falls back to "default-session" if no sessionId provided
- Memory persists across workflow executions

**Memory Structure:**
```javascript
Session: "user-123" {
  messages: [
    { role: "user", content: "What's my profit margin?" },
    { role: "assistant", content: "I'll need your revenue and costs..." },
    // ... up to 10 messages
  ]
}
```

**Production Considerations:**
- For high-traffic scenarios, consider Redis-backed memory
- Implement session expiration (e.g., 24 hours)
- Monitor memory storage growth

**Connection Type:** `ai_memory`

---

### 5. Tool Nodes

#### A. Web Research Tool

**Type:** `@n8n/n8n-nodes-langchain.toolWorkflow`  
**Version:** 1.1

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "query": {
      "type": "string",
      "description": "The search query for web research"
    },
    "depth": {
      "type": "string",
      "enum": ["basic", "advanced"],
      "description": "How deep to search",
      "default": "basic"
    }
  },
  "required": ["query"]
}
```

**Implementation Notes:**
- Currently placeholder - requires sub-workflow connection
- Recommended: Tavily API for AI-optimized search results
- Alternative: Google Custom Search JSON API
- Return format: JSON with `results` array containing title, snippet, url

**Example Sub-Workflow:**
```javascript
// HTTP Request Node
POST https://api.tavily.com/search
Headers: { "Authorization": "Bearer YOUR_API_KEY" }
Body: {
  "query": "{{ $json.query }}",
  "max_results": 5,
  "search_depth": "{{ $json.depth }}"
}
```

#### B. Email Drafter Tool

**Type:** `@n8n/n8n-nodes-langchain.toolWorkflow`

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "emailType": {
      "type": "string",
      "enum": ["sales_outreach", "customer_reply", "partnership", "follow_up", "general"]
    },
    "recipientInfo": { "type": "string" },
    "keyPoints": { "type": "string" },
    "tone": {
      "type": "string",
      "enum": ["formal", "friendly", "persuasive"],
      "default": "professional"
    }
  },
  "required": ["emailType", "keyPoints"]
}
```

**Implementation Options:**

1. **AI-Only (Current):** Agent generates email based on parameters
2. **Gmail Integration:** Sub-workflow with Gmail node to save drafts
3. **Template System:** Pre-defined templates + AI customization

**Enhancement Ideas:**
- Add A/B testing variants
- Include spam score analysis
- Suggest optimal send times

#### C. Calendar Manager Tool

**Type:** `@n8n/n8n-nodes-langchain.toolWorkflow`

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "action": {
      "type": "string",
      "enum": ["check_availability", "book_meeting", "find_slots"]
    },
    "date": { "type": "string", "description": "YYYY-MM-DD format" },
    "startTime": { "type": "string", "description": "HH:MM format" },
    "duration": { "type": "number", "default": 60 },
    "title": { "type": "string" },
    "attendees": { "type": "string" }
  },
  "required": ["action", "date"]
}
```

**Google Calendar Integration Example:**
```javascript
// Sub-workflow nodes:
1. Switch Node (on action type)
2. Google Calendar - List Events (for check_availability)
3. Google Calendar - Create Event (for book_meeting)
4. Function Node - Parse availability logic
```

**Availability Logic:**
```javascript
// Pseudo-code for find_slots
const events = getCalendarEvents(date);
const workingHours = { start: 9, end: 17 };
const buffer = 30; // minutes

function findAvailableSlots(events, duration, buffer) {
  // Algorithm to find gaps between meetings
  // Return array of { start, end } time slots
}
```

#### D. Business Calculator Tool

**Type:** `@n8n/n8n-nodes-langchain.toolCode`  
**Version:** 1

**Supported Calculations:**

| Type | Formula | Input Parameters |
|------|---------|------------------|
| profit_margin | ((Revenue - Cost) / Revenue) × 100 | revenue, cost |
| roi | ((Gain - Investment) / Investment) × 100 | gain, investment |
| break_even | Fixed Costs / (Price - Variable Cost) | fixedCosts, price, variableCost |
| markup | ((Selling Price - Cost) / Cost) × 100 | sellingPrice, cost |
| cac | Total Spend / New Customers | marketingSpend, newCustomers |
| ltv | (Avg Purchase × Frequency) × Lifespan | averagePurchaseValue, purchaseFrequency, customerLifespan |
| custom | eval(expression) | expression |

**Code Structure:**
```javascript
const calculationType = $input.item.json.calculationType;
const values = $input.item.json.values || {};

switch(calculationType) {
  case 'profit_margin':
    // Calculation logic
    return { json: { result, formula, details } };
  // ... other cases
}
```

**Security Note:**
- `custom` calculation type uses `eval()` - **DANGEROUS**
- Recommended: Remove in production or sanitize input
- Alternative: Use math.js library for safe expression parsing

**Connection Type:** `ai_tool` (all tools)

---

### 6. Respond to Webhook Node

**Type:** `n8n-nodes-base.respondToWebhook`  
**Version:** 1.1

**Configuration:**
```json
{
  "respondWith": "json",
  "responseBody": "={{ JSON_STRUCTURE }}"
}
```

**Response Structure:**
```json
{
  "success": true,
  "response": "<AI's text output>",
  "sessionId": "<session identifier>",
  "timestamp": "<ISO 8601 timestamp>",
  "agent": "Vexel Logic Business OS"
}
```

**Expression Breakdown:**
```javascript
{
  success: true,
  response: $json.output,  // From AI Agent node
  sessionId: $('Webhook Trigger').item.json.body.sessionId || 'default-session',
  timestamp: new Date().toISOString(),
  agent: "Vexel Logic Business OS"
}
```

**Alternative Response Formats:**

**Plain Text:**
```json
{
  "respondWith": "text",
  "responseBody": "={{ $json.output }}"
}
```

**Error Handling:**
```json
{
  "success": false,
  "error": "{{ $json.error }}",
  "message": "An error occurred processing your request"
}
```

---

## 🔗 Connection Flow

```
Webhook Trigger → AI Agent Brain → Respond to Webhook
                      ↓
                  ┌───┴───┐
                  │       │
              Language  Memory
               Model      │
                  │       │
              ┌───┴───────┴───┐
              │                │
          Tools (4x)      Session Store
```

**Connection Types in n8n:**
- `main` - Primary data flow (blue lines)
- `ai_languageModel` - LLM connection (purple)
- `ai_memory` - Memory connection (purple)
- `ai_tool` - Tool connections (purple)

---

## 🛠️ Customization Guide

### Adding New Tools

**Step 1:** Create a new tool node
```javascript
// Add after existing tools
{
  "parameters": {
    "name": "myCustomTool",
    "description": "What this tool does",
    "workflowId": { "__rl": true, "value": "...", "mode": "id" },
    "specifyInputSchema": true,
    "inputSchema": "{...JSON Schema...}"
  },
  "type": "@n8n/n8n-nodes-langchain.toolWorkflow"
}
```

**Step 2:** Create sub-workflow

**Step 3:** Connect tool to AI Agent Brain
```json
{
  "connections": {
    "My Custom Tool": {
      "ai_tool": [
        [{ "node": "AI Agent Brain", "type": "ai_tool", "index": 0 }]
      ]
    }
  }
}
```

### Modifying the System Prompt

**Location:** AI Agent Brain node → `options.systemMessage`

**Best Practices:**
- Keep under 500 tokens (cost efficiency)
- Use numbered lists for directives
- Explicitly list capabilities
- Set clear tone guidelines
- Include error handling instructions

**Testing Prompts:**
```bash
# Test logic compliance
"Should I manually copy-paste 100 records?"  # Expect: Automation suggestion

# Test growth focus
"Analyze our $100K revenue"  # Expect: Growth recommendations

# Test tone
"How do I improve margins?"  # Expect: Concise, data-driven answer
```

### Changing the Language Model

**To use Claude instead of GPT-4o:**

1. Replace OpenAI node with Anthropic node:
```json
{
  "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
  "parameters": {
    "model": "claude-3-5-sonnet-20241022",
    "options": {
      "temperature": 0.7,
      "maxTokens": 2000
    }
  }
}
```

2. Update credentials

3. Connection remains the same (ai_languageModel)

**Model Comparison:**

| Model | Cost/1M tokens | Speed | Business Reasoning | Code Generation |
|-------|---------------|-------|-------------------|-----------------|
| GPT-4o | $5 | Fast | Excellent | Excellent |
| GPT-4 Turbo | $10 | Very Fast | Excellent | Excellent |
| Claude 3.5 Sonnet | $3 | Fast | Excellent | Excellent |
| GPT-3.5 Turbo | $0.50 | Fastest | Good | Good |

---

## 🔐 Security Considerations

### 1. Authentication

**Add webhook authentication:**
```json
{
  "parameters": {
    "authentication": "headerAuth",
    "options": {
      "headerAuth": {
        "name": "X-API-Key",
        "value": "YOUR_SECRET_KEY"
      }
    }
  }
}
```

**Implement in client:**
```javascript
fetch(webhookUrl, {
  headers: { 'X-API-Key': 'YOUR_SECRET_KEY' }
})
```

### 2. Rate Limiting

**Option A: n8n Rate Limit (Pro feature)**

**Option B: Cloudflare in front of n8n**

**Option C: Custom rate limit node:**
```javascript
// Add before AI Agent
const redis = require('redis');
const clientIp = $('Webhook Trigger').item.json.headers['x-forwarded-for'];
const key = `rate_limit:${clientIp}`;

// Implement sliding window rate limit
```

### 3. Input Sanitization

**Add validation node before AI Agent:**
```javascript
const userInput = $json.body.message;

// Check for prompt injection attempts
const blacklist = ['ignore previous', 'disregard', 'new instructions'];
const isSafe = !blacklist.some(term => userInput.toLowerCase().includes(term));

if (!isSafe) {
  throw new Error('Invalid input detected');
}

return { json: { validated: true, message: userInput } };
```

### 4. API Key Protection

**Never expose in client-side code:**
- Use backend proxy
- Rotate keys monthly
- Monitor usage quotas

---

## 📊 Monitoring & Analytics

### Key Metrics to Track

```javascript
// Add logging node before Respond to Webhook
{
  timestamp: new Date().toISOString(),
  sessionId: $('Webhook Trigger').item.json.body.sessionId,
  query: $('Webhook Trigger').item.json.body.message,
  responseTime: Date.now() - startTime,
  tokensUsed: $json.usage?.total_tokens,
  toolsCalled: $json.toolCalls?.map(t => t.name),
  success: true
}

// Send to analytics service (Posthog, Mixpanel, etc.)
```

### Cost Tracking

**Estimate per request:**
```
Average input: 200 tokens
Average output: 500 tokens
GPT-4o cost: $5 per 1M tokens

Per request: $0.0035
1000 requests: $3.50
```

---

## 🚀 Performance Optimization

### 1. Reduce Token Usage

**Technique:** Summarize long memories
```javascript
// Replace Window Buffer with custom summarization
if (messageHistory.length > 10) {
  const summary = await summarizeHistory(messageHistory);
  return [summary, ...messageHistory.slice(-5)];
}
```

### 2. Cache Frequent Queries

**Technique:** Add cache layer before AI
```javascript
const queryHash = hash($json.body.message);
const cached = await redis.get(queryHash);

if (cached && cacheAge < 3600) {
  return { json: { output: cached, cached: true } };
}
```

### 3. Parallel Tool Calls

GPT-4o supports parallel function calling - the agent automatically optimizes this.

**Example:**
```
User: "Research competitors AND draft an email"
Agent: Calls webResearch + emailDrafter simultaneously (not sequentially)
```

---

## 🐛 Debugging

### Common Issues

**1. "Workflow not triggering"**
```bash
# Check webhook URL is correct
curl -X POST https://your-n8n.com/webhook/vexel-agent \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}'

# Check n8n logs
docker logs n8n
```

**2. "AI not calling tools"**
- Verify tool descriptions are clear
- Check JSON schemas are valid
- Ensure tools are connected via ai_tool connection type

**3. "Memory not persisting"**
- Confirm sessionId is consistent across requests
- Check memory node is connected
- Verify n8n database is writable

### Debug Mode

**Add debug node after each step:**
```json
{
  "type": "n8n-nodes-base.function",
  "parameters": {
    "functionCode": "console.log('DEBUG:', JSON.stringify($input.all(), null, 2)); return $input.all();"
  }
}
```

---

## 📦 Deployment Checklist

- [ ] OpenAI/Anthropic credentials configured
- [ ] Webhook URL copied and saved
- [ ] Workflow activated
- [ ] Test request sent successfully
- [ ] Tool sub-workflows created (optional but recommended)
- [ ] Authentication added (production)
- [ ] Rate limiting configured (production)
- [ ] Monitoring/logging enabled
- [ ] Backup workflow exported
- [ ] Team trained on usage

---

## 🔄 Version History

**v1.0.0** (December 2025)
- Initial release
- 4 core tools (Web Research, Email, Calendar, Calculator)
- GPT-4o language model
- Window buffer memory (10 messages)
- Basic webhook trigger/response

**Planned Features:**
- v1.1: Redis-backed memory for scale
- v1.2: Built-in analytics dashboard
- v1.3: Multi-language support
- v2.0: Visual workflow builder UI

---

## 🤝 Contributing

This workflow is designed to be customized. Common customizations:

1. **Industry-Specific Tools**
   - Healthcare: HIPAA-compliant patient lookup
   - Legal: Contract analysis
   - Real Estate: MLS integration

2. **Integration Packs**
   - CRM: Salesforce, HubSpot
   - Analytics: Google Analytics, Mixpanel
   - Communication: Slack, Teams

3. **Prompt Templates**
   - Save common queries as templates
   - Create role-based system prompts

---

## 📚 Additional Resources

- **n8n Documentation:** https://docs.n8n.io
- **LangChain JS Docs:** https://js.langchain.com
- **OpenAI Function Calling:** https://platform.openai.com/docs/guides/function-calling
- **JSON Schema Validator:** https://www.jsonschemavalidator.net

---

## 💡 Advanced Use Cases

### 1. Multi-Agent System

Create specialized agents for different departments:
- Sales Agent (focused on outreach)
- Finance Agent (focused on calculations)
- Research Agent (focused on data gathering)

Route to appropriate agent based on query classification.

### 2. Human-in-the-Loop

Add approval step before executing certain actions:
```javascript
if (action === 'book_meeting' && attendees.includes('CEO')) {
  await sendApprovalRequest();
  waitForApproval();
}
```

### 3. Workflow Chaining

Output of one agent becomes input to another:
```
User Query → Research Agent → Analysis Agent → Report Generator
```

---

**Built with ❤️ for the n8n community**

*This documentation is maintained alongside the workflow. Last updated: December 2025*






