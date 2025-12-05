# Customer Support Chatbot System
# Vexel Logic Business OS

## Overview
This is a simple yet effective AI-powered customer support chatbot that can be embedded on your website or integrated into your customer dashboard.

---

## 🤖 Simple Chatbot Widget (HTML/CSS/JS)

### Embed Code for Your Website

```html
<!-- Add this before closing </body> tag -->
<div id="vexel-support-chat">
    <div id="chat-button" onclick="toggleChat()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" stroke-width="2"/>
        </svg>
    </div>
    
    <div id="chat-window" style="display: none;">
        <div id="chat-header">
            <span>Vexel Logic Support</span>
            <button onclick="toggleChat()">&times;</button>
        </div>
        <div id="chat-messages"></div>
        <div id="chat-input-area">
            <input type="text" id="chat-input" placeholder="Ask a question..." onkeypress="handleEnter(event)">
            <button onclick="sendSupportMessage()">Send</button>
        </div>
    </div>
</div>

<style>
    #vexel-support-chat {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    
    #chat-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #b026ff, #00f3ff);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(176, 38, 255, 0.4);
        transition: transform 0.3s;
    }
    
    #chat-button:hover {
        transform: scale(1.1);
    }
    
    #chat-window {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 380px;
        height: 500px;
        background: #0a0a12;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        flex-direction: column;
    }
    
    #chat-header {
        padding: 20px;
        background: linear-gradient(135deg, #b026ff, #00f3ff);
        border-radius: 12px 12px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        font-weight: 600;
    }
    
    #chat-header button {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
    }
    
    #chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .chat-message {
        padding: 12px 16px;
        border-radius: 12px;
        max-width: 80%;
        word-wrap: break-word;
    }
    
    .chat-message.user {
        background: rgba(176, 38, 255, 0.2);
        align-self: flex-end;
        color: white;
    }
    
    .chat-message.bot {
        background: rgba(0, 243, 255, 0.1);
        align-self: flex-start;
        color: #e0e0e0;
    }
    
    .chat-message.bot a {
        color: #00f3ff;
        text-decoration: underline;
    }
    
    #chat-input-area {
        padding: 15px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        gap: 10px;
    }
    
    #chat-input {
        flex: 1;
        padding: 10px 15px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        color: white;
        font-size: 14px;
    }
    
    #chat-input-area button {
        padding: 10px 20px;
        background: linear-gradient(135deg, #b026ff, #00f3ff);
        border: none;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        cursor: pointer;
    }
    
    .typing-indicator {
        display: flex;
        gap: 5px;
        padding: 12px 16px;
    }
    
    .typing-indicator span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #00f3ff;
        animation: typing 1.4s infinite;
    }
    
    .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
    .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes typing {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-10px); }
    }
</style>

<script>
    const SUPPORT_API = '/api/support/chat'; // Your support endpoint
    
    let chatHistory = [];
    
    function toggleChat() {
        const window = document.getElementById('chat-window');
        const button = document.getElementById('chat-button');
        
        if (window.style.display === 'none') {
            window.style.display = 'flex';
            button.style.display = 'none';
            
            // Initial greeting if first time
            if (chatHistory.length === 0) {
                addBotMessage("Hi! 👋 I'm your Vexel Logic support assistant. How can I help you today?");
                showQuickReplies();
            }
        } else {
            window.style.display = 'none';
            button.style.display = 'flex';
        }
    }
    
    function showQuickReplies() {
        const quickReplies = [
            "How do I install the workflow?",
            "I need help with setup",
            "Having trouble with OpenAI key",
            "How do I use a specific tool?",
            "Talk to a human"
        ];
        
        const container = document.getElementById('chat-messages');
        const repliesDiv = document.createElement('div');
        repliesDiv.style.cssText = 'display: flex; flex-direction: column; gap: 8px; margin-top: 10px;';
        
        quickReplies.forEach(reply => {
            const btn = document.createElement('button');
            btn.textContent = reply;
            btn.style.cssText = 'padding: 8px 12px; background: rgba(176, 38, 255, 0.1); border: 1px solid #b026ff; border-radius: 8px; color: white; cursor: pointer; font-size: 13px;';
            btn.onclick = () => sendSupportMessage(reply);
            repliesDiv.appendChild(btn);
        });
        
        container.appendChild(repliesDiv);
    }
    
    async function sendSupportMessage(message) {
        if (!message) {
            message = document.getElementById('chat-input').value.trim();
        }
        
        if (!message) return;
        
        // Add user message
        addUserMessage(message);
        document.getElementById('chat-input').value = '';
        
        // Show typing indicator
        const typingId = showTypingIndicator();
        
        try {
            const response = await fetch(SUPPORT_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: message,
                    history: chatHistory.slice(-5) // Last 5 messages for context
                })
            });
            
            const data = await response.json();
            
            removeTypingIndicator(typingId);
            addBotMessage(data.response);
            
            // Store in history
            chatHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: data.response }
            );
            
        } catch (error) {
            removeTypingIndicator(typingId);
            addBotMessage("Sorry, I'm having trouble connecting. Please email support@vexellogic.com or try again.");
        }
    }
    
    function addUserMessage(text) {
        const container = document.getElementById('chat-messages');
        const msg = document.createElement('div');
        msg.className = 'chat-message user';
        msg.textContent = text;
        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
    }
    
    function addBotMessage(text) {
        const container = document.getElementById('chat-messages');
        const msg = document.createElement('div');
        msg.className = 'chat-message bot';
        msg.innerHTML = text; // Allow HTML for links
        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
    }
    
    function showTypingIndicator() {
        const container = document.getElementById('chat-messages');
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typing-' + Date.now();
        indicator.innerHTML = '<span></span><span></span><span></span>';
        container.appendChild(indicator);
        container.scrollTop = container.scrollHeight;
        return indicator.id;
    }
    
    function removeTypingIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) indicator.remove();
    }
    
    function handleEnter(event) {
        if (event.key === 'Enter') {
            sendSupportMessage();
        }
    }
</script>
```

---

## 🔧 Backend Support API (Node.js/Express)

Add this to your `backend/server.js`:

```javascript
// Support chatbot endpoint
app.post('/api/support/chat', async (req, res) => {
    try {
        const { message, history } = req.body;
        
        // Build context from history
        const context = history.map(h => `${h.role}: ${h.content}`).join('\n');
        
        // Knowledge base responses
        const knowledgeBase = {
            'install': 'To install: 1) Download your package from the dashboard, 2) Extract the ZIP, 3) Open n8n, 4) Import the JSON file, 5) Add your OpenAI API key. Full guide: <a href="/docs/installation">Installation Guide</a>',
            'openai': 'To add your OpenAI API key: Click the "OpenAI GPT-4o" node → Credentials → Create New → Paste your key from platform.openai.com. Need help? <a href="/docs/openai-setup">OpenAI Setup Guide</a>',
            'tools': 'The Business Calculator works immediately! Other tools (Web Research, Email, Calendar) can be connected to real APIs. See: <a href="/docs/tools">Tool Configuration Guide</a>',
            'webhook': 'Your webhook URL is in the "Webhook Trigger" node. Copy it and use it in your applications. Test with: <code>curl -X POST YOUR_URL -d \'{"message":"test"}\'</code>',
            'human': 'I\'ll connect you with a human! Email support@vexellogic.com or use the contact form. We typically respond within 24 hours.'
        };
        
        // Simple keyword matching (you can replace with AI for smarter responses)
        let response = null;
        const lowerMessage = message.toLowerCase();
        
        for (const [keyword, answer] of Object.entries(knowledgeBase)) {
            if (lowerMessage.includes(keyword)) {
                response = answer;
                break;
            }
        }
        
        // If no match, use AI (optional)
        if (!response) {
            // Call OpenAI or use predefined response
            response = `I'm here to help! For detailed assistance, check our <a href="/docs">Documentation</a> or email support@vexellogic.com. Common topics:<br>
            - <a href="/docs/installation">Installation Guide</a><br>
            - <a href="/docs/troubleshooting">Troubleshooting</a><br>
            - <a href="/docs/use-cases">Use Cases</a>`;
        }
        
        res.json({ response });
    } catch (error) {
        console.error('Support chat error:', error);
        res.status(500).json({ response: 'Sorry, something went wrong. Please email support@vexellogic.com' });
    }
});
```

---

## 🎨 Alternative: Use Existing Chat Services

Instead of building custom, integrate with:

### 1. Intercom
```html
<script>
  window.intercomSettings = {
    app_id: "YOUR_INTERCOM_APP_ID"
  };
  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/YOUR_APP_ID';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
</script>
```

### 2. Crisp Chat
```html
<script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="YOUR_WEBSITE_ID";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>
```

### 3. Zendesk Chat
```html
<script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=YOUR_KEY"></script>
```

---

## 📚 Support Knowledge Base Structure

Create these help articles:

### Priority 1 (Most Common)
1. **Installation Guide** - Step-by-step workflow import
2. **OpenAI API Setup** - How to get and add API key
3. **First Test Query** - Verify it's working
4. **Troubleshooting Common Errors** - Top 10 issues

### Priority 2
5. **Tool Configuration** - Connecting Tavily, Gmail, Calendar
6. **Use Case Examples** - Copy-paste queries
7. **Integration Code** - Website, Python, etc.
8. **Best Practices** - Tips for better results

### Priority 3
9. **Advanced Customization** - Adding tools, modifying prompts
10. **API Cost Management** - Tracking and optimizing
11. **Security Setup** - Authentication, rate limiting
12. **Industry Variants** - Healthcare, Legal, Real Estate

---

## 🤖 Advanced: AI-Powered Support Bot

For a smarter bot, use OpenAI to power responses:

```javascript
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/support/chat', async (req, res) => {
    const { message, history } = req.body;
    
    const systemPrompt = `You are a helpful customer support agent for Vexel Logic Business OS. 

Your knowledge base:
- Product: n8n workflow with AI agent (GPT-4o) and 4 tools
- Installation: Import JSON → Add OpenAI key → Activate
- Common issues: Missing API key, workflow not activated, wrong URL
- Tools: Web Research (Tavily), Email Drafter, Calendar Manager, Business Calculator
- Pricing: Starter ($99), Professional ($199), Enterprise ($499)

Be concise, helpful, and always provide links to documentation when relevant.
If you don't know something, direct them to support@vexellogic.com`;
    
    const messages = [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: message }
    ];
    
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
    });
    
    res.json({ response: completion.choices[0].message.content });
});
```

---

## 📊 Support Metrics to Track

Monitor these KPIs:
- **Resolution Rate** - % of questions answered without human intervention
- **Response Time** - Average time to first response
- **Customer Satisfaction** - Post-chat survey ratings
- **Top Issues** - Most common questions (improve docs for these)
- **Escalation Rate** - % that need human support

---

## 🎯 Support Automation Rules

**Auto-responses for common scenarios:**

1. **"How do I install?"** → Link to installation guide + video
2. **"Not working"** → Troubleshooting checklist
3. **"Refund"** → Link to refund policy + offer help first
4. **"Upgrade"** → Show pricing comparison + benefits
5. **"Feature request"** → Thank them, add to roadmap tracker

---

**Created for Vexel Logic Business OS**
**Version 1.0 - December 2025**

