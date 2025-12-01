// Vexel Logic - Missed Call Recovery Bot
// Built for: Dental Practice
// Cost: FREE (Twilio Trial) or £3/mo (Production)

const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

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
app.get('/api/missed-calls', async (req, res) => {
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
app.get('/api/responses', async (req, res) => {
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

// Get stats
app.get('/api/stats', async (req, res) => {
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


