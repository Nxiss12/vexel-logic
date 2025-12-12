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
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const pino = require('pino');
const Sentry = require('@sentry/node');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static('public'));

// Logger
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

// Sentry
if (process.env.SENTRY_DSN) {
    Sentry.init({ dsn: process.env.SENTRY_DSN });
    app.use(Sentry.Handlers.requestHandler());
}

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Configuration (ENV VARIABLES - SET THESE IN RAILWAY/RENDER)
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-please';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@vexellogic.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';
const REFRESH_COOKIE_NAME = 'vexel_rt';
const ACCESS_TOKEN_EXP = '15m';
const REFRESH_TOKEN_EXP_DAYS = 30;
const BUSINESS_NAME = process.env.BUSINESS_NAME || 'Our Dental Practice';

// Initialize Twilio & Supabase
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ==========================================
// MAIN BOT LOGIC: MISSED CALL HANDLER
// ==========================================

app.post('/webhook/missed-call', async (req, res) => {
    // Verify Twilio token (simple header-based verification)
    if (process.env.TWILIO_WEBHOOK_SECRET) {
        const token = req.headers['x-twilio-webhook-token'];
        if (!token || token !== process.env.TWILIO_WEBHOOK_SECRET) {
            logger.warn('Invalid Twilio webhook token');
            return res.status(403).send('Forbidden');
        }
    }
    logger.info('📞 Incoming call event', req.body);

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
            // queue for retry
            await queueRetry({ type: 'sms', to: fromNumber, body: `Hi! We just missed your call at ${BUSINESS_NAME}. We're with a patient right now. What can we help with? Reply here or call back anytime. 😊` });
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
    if (process.env.TWILIO_WEBHOOK_SECRET) {
        const token = req.headers['x-twilio-webhook-token'];
        if (!token || token !== process.env.TWILIO_WEBHOOK_SECRET) {
            logger.warn('Invalid Twilio webhook token');
            return res.status(403).send('Forbidden');
        }
    }
    logger.info('💬 Incoming SMS:', req.body);

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

// Retry queue processing
async function queueRetry(item) {
    const file = path.join(__dirname, 'data', 'retry_queue.json');
    let list = [];
    if (fs.existsSync(file)) list = JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
    item.attempts = 0;
    item.last_error = null;
    list.push(item);
    fs.writeFileSync(file, JSON.stringify(list, null, 2));
}

async function processRetryQueue() {
    const file = path.join(__dirname, 'data', 'retry_queue.json');
    if (!fs.existsSync(file)) return;
    let list = JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
    const remaining = [];
    for (const it of list) {
        if (it.type === 'sms') {
            try {
                await twilioClient.messages.create({ body: it.body, from: TWILIO_PHONE_NUMBER, to: it.to });
                logger.info('Retried SMS success', it.to);
            } catch (e) {
                it.attempts = (it.attempts || 0) + 1;
                it.last_error = e.message;
                if (it.attempts < 5) remaining.push(it);
                else logger.warn('SMS dropped after 5 attempts', it);
            }
        }
    }
    fs.writeFileSync(file, JSON.stringify(remaining, null, 2));
}

setInterval(processRetryQueue, 60 * 1000);

// Stripe webhook endpoint (raw body required)
app.post('/webhook/stripe', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        if (webhookSecret) {
            event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        } else {
            event = req.body;
        }
    } catch (err) {
        logger.warn('Stripe webhook signature verification failed', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // persist basic event
    (async () => {
        try {
            if (SUPABASE_URL && SUPABASE_KEY) {
                await supabase.from('billing_events').insert([{ stripe_event_id: event.id, type: event.type, payload: event }]);
            } else {
                const file = path.join(__dirname, 'data', 'billing_events.json');
                const list = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8') || '[]') : [];
                list.unshift({ stripe_event_id: event.id, type: event.type, payload: event, created_at: new Date().toISOString() });
                fs.writeFileSync(file, JSON.stringify(list, null, 2));
            }
        } catch (e) {
            logger.warn('Failed to persist stripe event', e);
        }
    })();

    // handle checkout.session.completed -> mark customer active
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const email = session.customer_details && session.customer_details.email;
        const cid = session.customer;
        (async () => {
            try {
                if (SUPABASE_URL && SUPABASE_KEY) {
                    await supabase.from('customers').upsert({ email, stripe_customer_id: cid, subscription_active: true }, { onConflict: ['email'] });
                }
            } catch (e) { logger.warn('Failed to upsert customer', e); }
        })();
    }

    res.json({ received: true });
});

// Sentry test endpoint
app.get('/debug-sentry', (req, res) => {
    throw new Error('Sentry test error');
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
        // issue short-lived access token
        const accessToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXP });

        // create refresh token (opaque)
        const refreshToken = crypto.randomBytes(64).toString('hex');
        const refreshHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXP_DAYS);

        await saveRefreshToken(email, refreshHash, expiresAt.toISOString());

        // set cookie
        res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });

        return res.json({ token: accessToken });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
});

// Rate limit auth endpoints
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });
app.use('/api/login', authLimiter);
app.use('/api/refresh', authLimiter);

// Refresh token endpoint
app.post('/api/refresh', async (req, res) => {
    const rt = req.cookies[REFRESH_COOKIE_NAME];
    if (!rt) return res.status(401).json({ error: 'Missing refresh token' });
    const hash = crypto.createHash('sha256').update(rt).digest('hex');
    const record = await findRefreshToken(hash);
    if (!record || record.revoked) return res.status(401).json({ error: 'Invalid refresh token' });

    // rotate
    const newRefresh = crypto.randomBytes(64).toString('hex');
    const newHash = crypto.createHash('sha256').update(newRefresh).digest('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXP_DAYS);
    await revokeRefreshToken(hash);
    await saveRefreshToken(record.email, newHash, expiresAt.toISOString());

    const accessToken = jwt.sign({ email: record.email }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXP });

    res.cookie(REFRESH_COOKIE_NAME, newRefresh, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/' });
    return res.json({ token: accessToken });
});

// Logout
app.post('/api/logout', async (req, res) => {
    const rt = req.cookies[REFRESH_COOKIE_NAME];
    if (rt) {
        const hash = crypto.createHash('sha256').update(rt).digest('hex');
        await revokeRefreshToken(hash);
        res.clearCookie(REFRESH_COOKIE_NAME, { path: '/' });
    }
    return res.json({ ok: true });
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

            // send notification email
            try {
                if (process.env.SENDGRID_API_KEY) {
                    await sgMail.send({
                        to: process.env.ADMIN_EMAIL,
                        from: process.env.ADMIN_EMAIL,
                        subject: `New Workflow Request: ${payload.workflow_name || 'Unnamed'}`,
                        text: `New workflow request from ${payload.email || 'unknown'}:\n\n${JSON.stringify(payload, null, 2)}`
                    });
                }
            } catch (e) {
                logger.warn('SendGrid send failed', e);
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
        const limit = Math.min(parseInt(req.query.limit || '50', 10), 500);
        const offset = Math.max(parseInt(req.query.offset || '0', 10), 0);

        if (SUPABASE_URL && SUPABASE_KEY) {
            const { data, error } = await supabase
                .from('workflow_requests')
                .select('*')
                .order('timestamp', { ascending: false })
                .range(offset, offset + limit - 1);
            if (error) return res.status(500).json({ error: error.message });
            return res.json({ items: data, limit, offset });
        }

        // Fallback file
        const file = path.join(__dirname, 'data', 'workflow_requests.json');
        const list = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8') || '[]') : [];
        return res.json({ items: list.slice(offset, offset + limit), limit, offset });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// GDPR: Delete user data by email (admin only)
app.post('/api/delete-user-data', authenticate, async (req, res) => {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ error: 'Missing email' });
    try {
        if (SUPABASE_URL && SUPABASE_KEY) {
            await supabase.from('workflow_requests').delete().eq('email', email);
            await supabase.from('customer_responses').delete().eq('customer_phone', email);
            await supabase.from('missed_calls').delete().eq('customer_phone', email);
            await supabase.from('refresh_tokens').delete().eq('email', email);
        } else {
            // file-based deletion
            const files = ['data/workflow_requests.json','data/refresh_tokens.json','data/billing_events.json'];
            for (const f of files) {
                const p = path.join(__dirname, f);
                if (!fs.existsSync(p)) continue;
                const list = JSON.parse(fs.readFileSync(p, 'utf8') || '[]').filter(r => r.email !== email && r.customer_phone !== email);
                fs.writeFileSync(p, JSON.stringify(list, null, 2));
            }
        }

        return res.json({ ok: true });
    } catch (err) {
        logger.error('Failed to delete user data', err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// helper functions for refresh token storage (supabase or file fallback)
async function saveRefreshToken(email, hash, expiresAt) {
    try {
        if (SUPABASE_URL && SUPABASE_KEY) {
            await supabase.from('refresh_tokens').insert([{ email, token_hash: hash, expires_at: expiresAt, revoked: false }]);
            return;
        }
    } catch (e) {
        logger.warn('Supabase saveRefreshToken failed', e);
    }

    const file = path.join(__dirname, 'data', 'refresh_tokens.json');
    let list = [];
    if (fs.existsSync(file)) list = JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
    list.push({ email, token_hash: hash, expires_at: expiresAt, revoked: false });
    if (!fs.existsSync(path.dirname(file))) fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(list, null, 2));
}

async function findRefreshToken(hash) {
    try {
        if (SUPABASE_URL && SUPABASE_KEY) {
            const { data, error } = await supabase.from('refresh_tokens').select('*').eq('token_hash', hash).limit(1);
            if (error) throw error;
            if (data && data.length) return data[0];
            return null;
        }
    } catch (e) {
        logger.warn('Supabase findRefreshToken failed', e);
    }

    const file = path.join(__dirname, 'data', 'refresh_tokens.json');
    if (!fs.existsSync(file)) return null;
    const list = JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
    const rec = list.find(r => r.token_hash === hash);
    return rec || null;
}

async function revokeRefreshToken(hash) {
    try {
        if (SUPABASE_URL && SUPABASE_KEY) {
            await supabase.from('refresh_tokens').update({ revoked: true }).eq('token_hash', hash);
            return;
        }
    } catch (e) {
        logger.warn('Supabase revokeRefreshToken failed', e);
    }

    const file = path.join(__dirname, 'data', 'refresh_tokens.json');
    if (!fs.existsSync(file)) return;
    let list = JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
    list = list.map(r => r.token_hash === hash ? { ...r, revoked: true } : r);
    fs.writeFileSync(file, JSON.stringify(list, null, 2));
}

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

// Readiness probe
app.get('/healthz', (req, res) => {
    res.status(200).send('ok');
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


