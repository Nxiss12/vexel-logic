# 🔌 Integration Examples - Vexel Logic Business OS

This document provides ready-to-use code snippets for integrating the Vexel Logic Business OS Agent into your applications, websites, and tools.

---

## 📋 Prerequisites

Before using these examples, you need:
1. Your webhook URL (from the n8n workflow)
2. Optional: Your API key (if you added authentication)

**Example webhook URL:** `https://your-n8n-instance.com/webhook/vexel-agent`

---

## 🌐 Web / JavaScript Integration

### Basic Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
    <title>AI Assistant</title>
</head>
<body>
    <div id="chat-container">
        <div id="messages"></div>
        <input type="text" id="user-input" placeholder="Ask me anything...">
        <button onclick="sendMessage()">Send</button>
    </div>

    <script>
        const WEBHOOK_URL = 'https://your-n8n-instance.com/webhook/vexel-agent';
        const SESSION_ID = 'user-' + Date.now(); // Unique per user

        async function sendMessage() {
            const input = document.getElementById('user-input');
            const message = input.value.trim();
            
            if (!message) return;

            // Display user message
            displayMessage('user', message);
            input.value = '';

            try {
                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Optional: Add authentication
                        // 'X-API-Key': 'your-secret-key'
                    },
                    body: JSON.stringify({
                        message: message,
                        sessionId: SESSION_ID
                    })
                });

                const data = await response.json();
                
                if (data.success) {
                    displayMessage('assistant', data.response);
                } else {
                    displayMessage('error', 'Error: ' + data.message);
                }
            } catch (error) {
                displayMessage('error', 'Failed to connect to AI assistant');
                console.error(error);
            }
        }

        function displayMessage(sender, text) {
            const messagesDiv = document.getElementById('messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            messageDiv.textContent = text;
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        // Allow Enter key to send
        document.getElementById('user-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
    </script>

    <style>
        #chat-container {
            max-width: 600px;
            margin: 50px auto;
            font-family: Arial, sans-serif;
        }
        #messages {
            height: 400px;
            overflow-y: auto;
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 10px;
        }
        .message {
            margin: 10px 0;
            padding: 8px;
            border-radius: 5px;
        }
        .message.user {
            background: #007bff;
            color: white;
            text-align: right;
        }
        .message.assistant {
            background: #f1f1f1;
            color: #333;
        }
        .message.error {
            background: #ff4444;
            color: white;
        }
        #user-input {
            width: 80%;
            padding: 10px;
        }
        button {
            width: 18%;
            padding: 10px;
            background: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }
    </style>
</body>
</html>
```

---

### React Integration

```jsx
import React, { useState, useEffect, useRef } from 'react';

const VexelAssistant = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const sessionId = useRef(`user-${Date.now()}`);
    
    const WEBHOOK_URL = 'https://your-n8n-instance.com/webhook/vexel-agent';

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-API-Key': 'your-secret-key' // Optional
                },
                body: JSON.stringify({
                    message: input,
                    sessionId: sessionId.current
                })
            });

            const data = await response.json();
            
            if (data.success) {
                setMessages(prev => [...prev, {
                    sender: 'assistant',
                    text: data.response
                }]);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                sender: 'error',
                text: 'Failed to get response from AI assistant'
            }]);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="assistant-container">
            <div className="messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                {loading && <div className="loading">Thinking...</div>}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask me anything..."
                    disabled={loading}
                />
                <button onClick={sendMessage} disabled={loading}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default VexelAssistant;
```

---

## 🐍 Python Integration

### Simple Python Script

```python
import requests
import json

class VexelAssistant:
    def __init__(self, webhook_url, api_key=None):
        self.webhook_url = webhook_url
        self.api_key = api_key
        self.session_id = f"python-session-{id(self)}"
    
    def ask(self, message):
        """Send a message to the AI assistant"""
        headers = {
            'Content-Type': 'application/json'
        }
        
        # Add authentication if provided
        if self.api_key:
            headers['X-API-Key'] = self.api_key
        
        payload = {
            'message': message,
            'sessionId': self.session_id
        }
        
        try:
            response = requests.post(
                self.webhook_url,
                headers=headers,
                json=payload,
                timeout=30
            )
            response.raise_for_status()
            
            data = response.json()
            
            if data.get('success'):
                return data.get('response')
            else:
                raise Exception(f"API Error: {data.get('message')}")
                
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            return None

# Usage Example
if __name__ == "__main__":
    # Initialize the assistant
    assistant = VexelAssistant(
        webhook_url='https://your-n8n-instance.com/webhook/vexel-agent',
        api_key='your-secret-key'  # Optional
    )
    
    # Example 1: Market Research
    response = assistant.ask(
        "Research the top 3 competitors in the online education space"
    )
    print("Research Result:", response)
    
    # Example 2: Business Calculation
    response = assistant.ask(
        "Calculate profit margin if revenue is $50,000 and costs are $32,000"
    )
    print("Calculation:", response)
    
    # Example 3: Email Drafting
    response = assistant.ask(
        "Draft a follow-up email to a prospect who requested a demo last week"
    )
    print("Email Draft:", response)
```

### FastAPI Backend Integration

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import os

app = FastAPI()

WEBHOOK_URL = os.getenv('VEXEL_WEBHOOK_URL')
API_KEY = os.getenv('VEXEL_API_KEY')

class ChatRequest(BaseModel):
    message: str
    user_id: str

class ChatResponse(BaseModel):
    response: str
    session_id: str

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Proxy endpoint for Vexel AI Assistant"""
    
    headers = {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
    }
    
    payload = {
        'message': request.message,
        'sessionId': f"user-{request.user_id}"
    }
    
    try:
        response = requests.post(
            WEBHOOK_URL,
            headers=headers,
            json=payload,
            timeout=30
        )
        response.raise_for_status()
        data = response.json()
        
        if not data.get('success'):
            raise HTTPException(status_code=500, detail=data.get('message'))
        
        return ChatResponse(
            response=data['response'],
            session_id=data['sessionId']
        )
        
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=503, detail=f"AI service unavailable: {str(e)}")

# Run with: uvicorn filename:app --reload
```

---

## 🔗 Node.js / Express Integration

### Express.js Backend

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const WEBHOOK_URL = process.env.VEXEL_WEBHOOK_URL;
const API_KEY = process.env.VEXEL_API_KEY;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    const { message, userId } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const response = await axios.post(
            WEBHOOK_URL,
            {
                message: message,
                sessionId: `user-${userId || 'anonymous'}`
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': API_KEY
                },
                timeout: 30000
            }
        );

        if (response.data.success) {
            res.json({
                response: response.data.response,
                sessionId: response.data.sessionId
            });
        } else {
            res.status(500).json({ error: response.data.message });
        }
    } catch (error) {
        console.error('AI Assistant Error:', error.message);
        res.status(503).json({ error: 'AI service unavailable' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

---

## 📱 Mobile Integration

### React Native

```jsx
import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, StyleSheet } from 'react-native';

const VexelAssistant = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    
    const WEBHOOK_URL = 'https://your-n8n-instance.com/webhook/vexel-agent';
    const SESSION_ID = `mobile-${Date.now()}`;

    const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages([...messages, { sender: 'user', text: input }]);
        const userMessage = input;
        setInput('');
        setLoading(true);

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    sessionId: SESSION_ID
                })
            });

            const data = await response.json();
            
            if (data.success) {
                setMessages(prev => [...prev, {
                    sender: 'assistant',
                    text: data.response
                }]);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                sender: 'error',
                text: 'Failed to connect'
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.messages}>
                {messages.map((msg, idx) => (
                    <View key={idx} style={[
                        styles.message,
                        msg.sender === 'user' ? styles.userMessage : styles.assistantMessage
                    ]}>
                        <Text style={styles.messageText}>{msg.text}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Ask me anything..."
                    editable={!loading}
                />
                <Button title="Send" onPress={sendMessage} disabled={loading} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    messages: { flex: 1 },
    message: { padding: 10, marginVertical: 5, borderRadius: 5 },
    userMessage: { backgroundColor: '#007bff', alignSelf: 'flex-end' },
    assistantMessage: { backgroundColor: '#f1f1f1', alignSelf: 'flex-start' },
    messageText: { color: '#333' },
    inputArea: { flexDirection: 'row', marginTop: 10 },
    input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, marginRight: 10 }
});

export default VexelAssistant;
```

---

## 🔧 cURL Examples

### Basic Request

```bash
curl -X POST https://your-n8n-instance.com/webhook/vexel-agent \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Calculate my ROI if I invest $10,000 and expect $15,000 return",
    "sessionId": "test-session-123"
  }'
```

### With Authentication

```bash
curl -X POST https://your-n8n-instance.com/webhook/vexel-agent \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secret-key" \
  -d '{
    "message": "Research competitors in the SaaS analytics space",
    "sessionId": "test-session-123"
  }'
```

### Response Example

```json
{
  "success": true,
  "response": "Based on your investment of $10,000 with an expected return of $15,000:\n\nReturn on Investment (ROI): 50%\n\nCalculation Details:\n- Initial Investment: $10,000\n- Expected Return: $15,000\n- Net Profit: $5,000\n- ROI Formula: ((Gain - Investment) / Investment) × 100\n- Result: ((15,000 - 10,000) / 10,000) × 100 = 50%\n\nThis is a strong ROI. For context, the S&P 500 averages ~10% annually, so a 50% return would be excellent if achievable in a year.",
  "sessionId": "test-session-123",
  "timestamp": "2025-12-04T10:30:00.000Z",
  "agent": "Vexel Logic Business OS"
}
```

---

## 🤖 Zapier Integration

### Trigger: Form Submission → AI Analysis

1. **Trigger:** New form submission (Google Forms, Typeform, etc.)
2. **Action:** Webhooks by Zapier
   - URL: Your webhook URL
   - Method: POST
   - Data:
     ```json
     {
       "message": "Analyze this customer feedback: {{form_response}}",
       "sessionId": "zapier-{{zap_meta_timestamp}}"
     }
     ```
3. **Action:** Send email with AI response (Gmail, Outlook)

---

## 🔗 Bubble.io Integration

### API Connector Setup

1. Go to **Plugins** → **API Connector**
2. Add new API: "Vexel AI"
3. Configure:
   - **Name:** Send Message
   - **Use as:** Action
   - **Data type:** JSON
   - **Request type:** POST
   - **URL:** `https://your-n8n-instance.com/webhook/vexel-agent`
   - **Headers:**
     - Content-Type: application/json
     - X-API-Key: `<your key>`
   - **Body:**
     ```json
     {
       "message": "<message>",
       "sessionId": "<sessionId>"
     }
     ```
4. Initialize call with test data
5. Use in workflows: **Schedule API Workflow** → Vexel AI - Send Message

---

## 📊 Google Sheets Integration

### Apps Script

```javascript
function askVexelAI(message) {
  const WEBHOOK_URL = 'https://your-n8n-instance.com/webhook/vexel-agent';
  const API_KEY = 'your-secret-key';
  
  const payload = {
    'message': message,
    'sessionId': 'google-sheets-' + new Date().getTime()
  };
  
  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'headers': {
      'X-API-Key': API_KEY
    },
    'payload': JSON.stringify(payload)
  };
  
  try {
    const response = UrlFetchApp.fetch(WEBHOOK_URL, options);
    const data = JSON.parse(response.getContentText());
    
    if (data.success) {
      return data.response;
    } else {
      return 'Error: ' + data.message;
    }
  } catch (error) {
    return 'Request failed: ' + error.toString();
  }
}

// Usage in sheet: =askVexelAI("Calculate profit margin with revenue " & A1 & " and cost " & B1)
```

---

## 🎯 WordPress Plugin Integration

### Simple PHP Integration

```php
<?php
/**
 * Plugin Name: Vexel AI Assistant
 * Description: Integrates Vexel Logic Business OS Agent
 */

function vexel_ai_query($message, $session_id = null) {
    $webhook_url = get_option('vexel_webhook_url');
    $api_key = get_option('vexel_api_key');
    
    if (!$session_id) {
        $session_id = 'wp-' . get_current_user_id() . '-' . time();
    }
    
    $body = json_encode(array(
        'message' => $message,
        'sessionId' => $session_id
    ));
    
    $args = array(
        'body' => $body,
        'headers' => array(
            'Content-Type' => 'application/json',
            'X-API-Key' => $api_key
        ),
        'timeout' => 30
    );
    
    $response = wp_remote_post($webhook_url, $args);
    
    if (is_wp_error($response)) {
        return array('success' => false, 'message' => $response->get_error_message());
    }
    
    $body = wp_remote_retrieve_body($response);
    return json_decode($body, true);
}

// Shortcode: [vexel_ai message="Your question here"]
add_shortcode('vexel_ai', function($atts) {
    $message = $atts['message'] ?? 'Hello';
    $result = vexel_ai_query($message);
    
    if ($result['success']) {
        return '<div class="vexel-response">' . esc_html($result['response']) . '</div>';
    } else {
        return '<div class="vexel-error">Error: ' . esc_html($result['message']) . '</div>';
    }
});
```

---

## 🔐 Security Best Practices

### 1. Use Environment Variables

**Never hardcode credentials in your code!**

```bash
# .env file
VEXEL_WEBHOOK_URL=https://your-n8n-instance.com/webhook/vexel-agent
VEXEL_API_KEY=your-secret-key
```

### 2. Rate Limiting (Express.js Example)

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/chat', limiter);
```

### 3. Input Validation

```javascript
function validateInput(message) {
    if (typeof message !== 'string') return false;
    if (message.length < 1 || message.length > 2000) return false;
    // Add more validation as needed
    return true;
}
```

---

## 🧪 Testing Your Integration

### Test Script (Node.js)

```javascript
const axios = require('axios');

async function testVexelAI() {
    const tests = [
        "Calculate ROI with $5000 investment and $7500 return",
        "Draft a welcome email for new customers",
        "What are the top trends in AI for 2025?",
    ];
    
    console.log('Testing Vexel AI Assistant...\n');
    
    for (let i = 0; i < tests.length; i++) {
        console.log(`Test ${i + 1}: ${tests[i]}`);
        
        try {
            const response = await axios.post(
                'https://your-n8n-instance.com/webhook/vexel-agent',
                {
                    message: tests[i],
                    sessionId: 'test-session'
                }
            );
            
            console.log('✓ Success:', response.data.response.substring(0, 100) + '...\n');
        } catch (error) {
            console.log('✗ Failed:', error.message, '\n');
        }
    }
}

testVexelAI();
```

---

## 📝 Complete Integration Checklist

- [ ] Webhook URL configured
- [ ] API key stored securely (if using authentication)
- [ ] Test request sent successfully
- [ ] Error handling implemented
- [ ] Rate limiting added (production)
- [ ] Session management working
- [ ] User feedback/loading states added
- [ ] Mobile responsive (if web)
- [ ] Logs/monitoring set up

---

## 💡 Pro Tips

1. **Session IDs:** Use consistent session IDs per user for conversation memory
2. **Timeouts:** Set 30-second timeouts (AI can take time to think)
3. **Error Messages:** Show user-friendly errors, log technical details
4. **Loading States:** Always show "thinking" indicators
5. **Caching:** Consider caching common queries to reduce API costs

---

## 🆘 Troubleshooting

### Issue: CORS Errors (Browser)

**Solution:** Add CORS proxy or use backend endpoint

```javascript
// Instead of calling webhook directly from frontend:
// Frontend → Your Backend → Webhook (no CORS issues)
```

### Issue: Timeout Errors

**Solution:** Increase timeout, add retry logic

```javascript
const response = await axios.post(url, data, { timeout: 60000 }); // 60 seconds
```

### Issue: Session Not Persisting

**Solution:** Ensure sessionId is consistent

```javascript
// Store in localStorage (web) or AsyncStorage (mobile)
const sessionId = localStorage.getItem('vexel-session') || generateNewSession();
```

---

**Ready to integrate? Pick the example that matches your tech stack and start building! 🚀**






