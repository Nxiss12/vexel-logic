// Vexel Logic - Missed Call Recovery Bot
// Built for: Dental Practice
// Cost: FREE (Twilio Trial) or £3/mo (Production)

const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Configuration (ENV VARIABLES - SET THESE IN RAILWAY/RENDER)
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-please';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@vexellogic.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';
const BUSINESS_NAME = process.env.BUSINESS_NAME || 'Our Dental Practice';

// Initialize Twilio & Supabase
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ==========================================
// MAIN BOT LOGIC: MISSED CALL HANDLER
// ==========================================

app.post('/webhook/missed-call', async (req, res) => {
    console.log('📞 Incoming call event:', req.body);

    const callStatus = req.body.CallStatus;
    const fromNumber = req.body.From;
    const toNumber = req.body.To;
    const callSid = req.body.CallSid;

    // Only trigger on "no-answer" or "busy"
    if (callStatus === 'no-answer' || callStatus === 'busy' || callStatus === 'failed') {
        console.log(`❌ Missed call detected from ${fromNumber}`);

        try {
            // Send automated SMS
            const message = await twilioClient.messages.create({
                body: `Hi! We just missed your call at ${BUSINESS_NAME}. We're with a patient right now. What can we help with? Reply here or call back anytime. 😊`,
                from: TWILIO_PHONE_NUMBER,
                to: fromNumber
            });

            console.log(`✅ SMS sent: ${message.sid}`);

            // Log to database
            const { data, error } = await supabase
                .from('missed_calls')
                .insert([
                    {
                        call_sid: callSid,
                        customer_phone: fromNumber,
                        business_phone: toNumber,
                        call_status: callStatus,
                        sms_sent: true,
                        sms_sid: message.sid,
                        timestamp: new Date().toISOString()
                    }
                ]);

            if (error) {
                console.error('❌ Database error:', error);
            } else {
                console.log('✅ Logged to database');
            }

        } catch (error) {
            console.error('❌ Error sending SMS:', error);
        }
    }

    // Respond to Twilio
    res.type('text/xml');
    res.send('<Response></Response>');
});

// ==========================================
// SMS RESPONSE HANDLER (Customer Replies)
// ==========================================

app.post('/webhook/sms-reply', async (req, res) => {
    console.log('💬 Incoming SMS:', req.body);

    const fromNumber = req.body.From;
    const messageBody = req.body.Body;
    const messageSid = req.body.MessageSid;

    // Log customer response
    const { data, error } = await supabase
        .from('customer_responses')
        .insert([
            {
                customer_phone: fromNumber,
                message: messageBody,
                message_sid: messageSid,
                timestamp: new Date().toISOString()
            }
        ]);

    if (error) {
        console.error('❌ Database error:', error);
    } else {
        console.log('✅ Customer response logged');
    }

    // Auto-reply (optional)
    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message("Thanks for your message! We'll call you back within 30 minutes. For emergencies, call us directly. 🦷");

    res.type('text/xml');
    res.send(twiml.toString());
});

// ==========================================
// ADMIN DASHBOARD API
// ==========================================

// Get all missed calls (last 30 days)
app.get('/api/missed-calls', authenticate, async (req, res) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await supabase
        .from('missed_calls')
        .select('*')
        .gte('timestamp', thirtyDaysAgo.toISOString())
        .order('timestamp', { ascending: false });

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json({ calls: data });
});

// Get customer responses
app.get('/api/responses', authenticate, async (req, res) => {
    const { data, error } = await supabase
        .from('customer_responses')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json({ responses: data });
});

// ==========================================
// AUTH: SIMPLE JWT LOGIN
// ==========================================

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });

    // Very small, env-driven admin auth (replace with real user store in production)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
        return res.json({ token });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
});

// Middleware to protect routes
function authenticate(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Missing token' });
    const parts = auth.split(' ');
    if (parts.length !== 2) return res.status(401).json({ error: 'Invalid auth header' });
    const token = parts[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

// ==========================================
// WORKFLOW REQUESTS API
// ==========================================

app.post('/api/workflow-request', async (req, res) => {
    const payload = req.body || {};

    // Try Supabase first
    try {
        if (SUPABASE_URL && SUPABASE_KEY) {
            const { data, error } = await supabase
                .from('workflow_requests')
                .insert([{ ...payload, timestamp: new Date().toISOString() }]);

            if (error) {
                console.error('Supabase insert error:', error);
                throw error;
            }

            return res.json({ ok: true, source: 'supabase', record: data[0] });
        }
    } catch (err) {
        console.warn('Supabase not configured or insert failed; falling back to file storage');
    }

    // Fallback to simple file-based storage
    try {
        const dataDir = path.join(__dirname, 'data');
        if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
        const file = path.join(dataDir, 'workflow_requests.json');
        let list = [];
        if (fs.existsSync(file)) {
            list = JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
        }
        const record = { id: list.length + 1, ...payload, timestamp: new Date().toISOString() };
        list.unshift(record);
        fs.writeFileSync(file, JSON.stringify(list, null, 2));
        return res.json({ ok: true, source: 'file', record });
    } catch (err) {
        console.error('File storage error:', err);
        return res.status(500).json({ error: 'Could not save workflow request' });
    }
});

// Admin: list workflow requests (protected)
app.get('/api/workflow-requests', authenticate, async (req, res) => {
    try {
        if (SUPABASE_URL && SUPABASE_KEY) {
            const { data, error } = await supabase
                .from('workflow_requests')
                .select('*')
                .order('timestamp', { ascending: false })
                .limit(200);
            if (error) return res.status(500).json({ error: error.message });
            return res.json({ items: data });
        }

        // Fallback file
        const file = path.join(__dirname, 'data', 'workflow_requests.json');
        const list = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8') || '[]') : [];
        return res.json({ items: list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// Get stats
app.get('/api/stats', authenticate, async (req, res) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Total missed calls
    const { count: totalCalls } = await supabase
        .from('missed_calls')
        .select('*', { count: 'exact', head: true })
        .gte('timestamp', thirtyDaysAgo.toISOString());

    // Total responses
    const { count: totalResponses } = await supabase
        .from('customer_responses')
        .select('*', { count: 'exact', head: true })
        .gte('timestamp', thirtyDaysAgo.toISOString());

    const recoveryRate = totalCalls > 0 ? ((totalResponses / totalCalls) * 100).toFixed(1) : 0;

    res.json({
        totalCalls: totalCalls || 0,
        totalResponses: totalResponses || 0,
        recoveryRate: `${recoveryRate}%`
    });
});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get('/health', (req, res) => {
    res.json({ 
        status: 'online', 
        service: 'Vexel Logic Missed Call Bot',
        timestamp: new Date().toISOString()
    });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════╗
║   🚀 VEXEL LOGIC MISSED CALL BOT          ║
║   📞 Dental Practice Edition              ║
║   🌐 Server running on port ${PORT}         ║
╚═══════════════════════════════════════════╝
    `);
});


