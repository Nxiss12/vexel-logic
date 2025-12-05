require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('landing-page'));

// Email transporter configuration
const emailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Service Package configuration (Done-For-You Services with Subscription Model)
const SERVICE_PACKAGES = {
    starter: {
        name: 'Starter',
        subtitle: 'Single-function optimization',
        setupPrice: 499700, // £4,997 in pence
        monthlyPrice: 49700, // £497/month in pence
        description: '1 core intelligent automation system',
        deliverables: [
            '1 core intelligent automation system',
            'Revenue, Operations, or Customer Success focus',
            'Full integration with existing infrastructure',
            '30-day implementation timeline',
            'Comprehensive team training program',
            'Ongoing optimization & monitoring',
            '99.9% uptime SLA guarantee'
        ]
    },
    professional: {
        name: 'Professional',
        subtitle: 'Comprehensive workforce optimization',
        setupPrice: 1299700, // £12,997 in pence
        monthlyPrice: 99700, // £997/month in pence
        description: '3 integrated intelligent automation systems',
        deliverables: [
            '3 integrated intelligent automation systems',
            'Cross-functional workflow optimization',
            'Executive intelligence dashboard',
            'Priority 30-day implementation',
            'Dedicated success manager',
            'Quarterly strategic optimization reviews',
            'Advanced predictive analytics',
            'ROI guarantee: 15hrs/employee or full refund'
        ],
        badge: 'RECOMMENDED FOR GROWTH-STAGE COMPANIES'
    },
    enterprise: {
        name: 'Enterprise',
        subtitle: 'Full organizational transformation',
        setupPriceMin: 3500000, // £35,000 in pence
        setupPriceMax: 15000000, // £150,000 in pence
        monthlyPriceMin: 250000, // £2,500/month in pence
        monthlyPriceMax: 750000, // £7,500/month in pence
        description: 'Custom pricing for organizations with 20+ employees',
        deliverables: [
            'Unlimited automation systems',
            'White-glove implementation',
            'Dedicated technical team',
            'Custom AI models and workflows',
            '24/7 priority support',
            'Weekly strategic calls',
            'Full organizational transformation'
        ]
    }
};

// Product Package configuration (Legacy - for n8n workflow sales)
const PACKAGES = {
    starter: {
        name: 'Starter Package',
        price: 9900, // $99.00 in cents
        priceId: process.env.STRIPE_PRICE_STARTER,
        files: ['vexel-logic-business-os-agent.json', 'INSTALLATION_GUIDE.md', 'QUICK_REFERENCE.md']
    },
    professional: {
        name: 'Professional Package',
        price: 19900, // $199.00 in cents
        priceId: process.env.STRIPE_PRICE_PROFESSIONAL,
        files: [
            'vexel-logic-business-os-agent.json',
            'README.md',
            'INSTALLATION_GUIDE.md',
            'BUSINESS_USE_CASES.md',
            'TECHNICAL_DOCUMENTATION.md',
            'EXAMPLE_INTEGRATIONS.md',
            'QUICK_REFERENCE.md',
            'LICENSE.txt',
            'index.html'
        ]
    },
    enterprise: {
        name: 'Enterprise Package',
        price: 49900, // $499.00 in cents
        priceId: process.env.STRIPE_PRICE_ENTERPRISE,
        files: ['*'] // All files + consultation
    }
};

// Database simulation (replace with actual database in production)
const customers = new Map();
const emailSubscribers = new Set();

// API Routes

// Create Stripe Checkout Session
// ============================================
// CONSULTATION BOOKING ENDPOINT (Service-Based Business)
// ============================================

app.post('/api/book-consultation', async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            company,
            website,
            interested_package,
            system,
            challenge,
            revenue,
            package: selectedPackage
        } = req.body;

        // Validation
        if (!name || !email || !phone || !company || !interested_package || !system || !challenge) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Get package details
        const packageDetails = SERVICE_PACKAGES[interested_package] || {
            name: 'Custom Package',
            subtitle: 'Tailored solution',
            setupPrice: 0,
            monthlyPrice: 0,
            description: 'Custom solution tailored to your needs'
        };

        // Store consultation request in database or send notification
        // For now, we'll send emails

        // 1. Send confirmation email to customer
        const customerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #b026ff, #00f3ff); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .highlight { background: #fff; padding: 20px; border-radius: 8px; border-left: 4px solid #b026ff; margin: 20px 0; }
        .button { display: inline-block; background: #b026ff; color: white !important; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0;">🎉 Consultation Booked!</h1>
            <p style="margin: 10px 0 0; font-size: 18px;">We're excited to transform your business, ${name}!</p>
        </div>
        <div class="content">
            <p>Thank you for your interest in <strong>${packageDetails.name}</strong>!</p>
            
            <div class="highlight">
                <h3 style="margin-top: 0;">📋 Your Consultation Details:</h3>
                <p><strong>Package:</strong> ${packageDetails.name}</p>
                <p><strong>System Interest:</strong> ${system.charAt(0).toUpperCase() + system.slice(1)}</p>
                <p><strong>Company:</strong> ${company}</p>
                ${website ? `<p><strong>Website:</strong> ${website}</p>` : ''}
            </div>

            <h3>🚀 What Happens Next?</h3>
            <ol>
                <li><strong>Within 24 hours:</strong> Our team will review your information</li>
                <li><strong>You'll receive:</strong> A calendar invite to book your free 30-minute consultation call</li>
                <li><strong>Before the call:</strong> You'll get a preparation guide to maximize our time together</li>
                <li><strong>On the call:</strong> We'll map out exactly which automations will save you 10-20 hours per week</li>
            </ol>

            <div class="highlight">
                <h3 style="margin-top: 0;">💡 Prepare for Your Call</h3>
                <p>Think about:</p>
                <ul>
                    <li>Tasks you do repeatedly every week</li>
                    <li>Leads or customers you're currently losing</li>
                    <li>Bottlenecks preventing your business from scaling</li>
                    <li>Your biggest time-wasters</li>
                </ul>
            </div>

            <p><strong>Challenge you mentioned:</strong><br>
            <em>"${challenge}"</em></p>

            <p>We'll show you exactly how to solve this with automation.</p>

            <center>
                <a href="mailto:hello@vexellogic.com" class="button">Questions? Email Us</a>
            </center>
        </div>
        <div class="footer">
            <p>📧 <strong>Vexel Logic</strong> - Done-For-You Business Automation</p>
            <p>+44 7700 900000 | hello@vexellogic.com</p>
            <p style="font-size: 12px; color: #999;">You're receiving this because you requested a consultation at vexellogic.com</p>
        </div>
    </div>
</body>
</html>
        `;

        await emailTransporter.sendMail({
            from: `"Vexel Logic" <${process.env.SMTP_USER}>`,
            to: email,
            subject: `✅ Consultation Booked - ${packageDetails.name}`,
            html: customerEmailHtml
        });

        // 2. Send notification to admin/sales team
        const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: monospace; background: #000; color: #0f0; padding: 20px; }
        .alert { border: 2px solid #0f0; padding: 20px; }
        h2 { color: #0ff; }
        .data { background: #111; padding: 15px; margin: 10px 0; border-left: 3px solid #0f0; }
    </style>
</head>
<body>
    <div class="alert">
        <h2>🚨 NEW CONSULTATION REQUEST 🚨</h2>
        
        <div class="data">
            <p><strong>NAME:</strong> ${name}</p>
            <p><strong>EMAIL:</strong> ${email}</p>
            <p><strong>PHONE:</strong> ${phone}</p>
            <p><strong>COMPANY:</strong> ${company}</p>
            ${website ? `<p><strong>WEBSITE:</strong> ${website}</p>` : ''}
            ${revenue ? `<p><strong>MONTHLY REVENUE:</strong> ${revenue}</p>` : ''}
        </div>

        <div class="data">
            <h3>💰 PACKAGE INTEREST:</h3>
            <p><strong>${packageDetails.name}</strong></p>
            <p>Price: £${(packageDetails.price / 100).toLocaleString()}</p>
        </div>

        <div class="data">
            <h3>🎯 SYSTEM INTEREST:</h3>
            <p>${system}</p>
        </div>

        <div class="data">
            <h3>❗ CHALLENGE:</h3>
            <p>${challenge}</p>
        </div>

        <div class="data">
            <h3>⚡ ACTION REQUIRED:</h3>
            <ol>
                <li>Review their website: ${website || 'Not provided'}</li>
                <li>Send calendar invite within 24 hours</li>
                <li>Prepare consultation based on their challenge</li>
                <li>Add to CRM/tracking system</li>
            </ol>
        </div>

        <p><strong>LEAD RECEIVED:</strong> ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
    </div>
</body>
</html>
        `;

        await emailTransporter.sendMail({
            from: `"Vexel Logic Leads" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
            subject: `🚨 NEW ${interested_package.toUpperCase()} CONSULTATION - ${name} (${company})`,
            html: adminEmailHtml
        });

        // Log for analytics
        console.log(`[CONSULTATION] ${new Date().toISOString()} - ${name} (${email}) - ${interested_package} - ${system}`);

        res.json({
            success: true,
            message: 'Consultation booked successfully',
            data: {
                package: packageDetails.name,
                email: email
            }
        });

    } catch (error) {
        console.error('Consultation booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to book consultation',
            error: error.message
        });
    }
});

// ============================================
// LEGACY ROUTES (Product Sales - n8n workflows)
// ============================================

app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const { priceId, packageType, successUrl, cancelUrl } = req.body;
        
        const packageInfo = PACKAGES[packageType];
        
        if (!packageInfo) {
            return res.status(400).json({ error: 'Invalid package type' });
        }
        
        // Get affiliate ID from request (if exists)
        const affiliateId = req.body.affiliateId;
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: packageInfo.priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            customer_email: req.body.email || undefined,
            metadata: {
                packageType: packageType,
                affiliateId: affiliateId || 'none'
            },
            allow_promotion_codes: true,
        });
        
        res.json({ id: session.id });
    } catch (error) {
        console.error('Stripe checkout error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Stripe Webhook (handle successful payments)
app.post('/api/webhook/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        
        // Get customer details
        const customerEmail = session.customer_email || session.customer_details?.email;
        const packageType = session.metadata.packageType;
        const affiliateId = session.metadata.affiliateId;
        
        // Store customer info
        const customerData = {
            email: customerEmail,
            packageType: packageType,
            purchaseDate: new Date().toISOString(),
            transactionId: session.id,
            affiliateId: affiliateId,
            downloadToken: generateDownloadToken()
        };
        
        customers.set(customerEmail, customerData);
        
        // Send purchase confirmation email with download link
        await sendPurchaseConfirmation(customerData);
        
        // If there's an affiliate, credit them
        if (affiliateId && affiliateId !== 'none') {
            await creditAffiliate(affiliateId, packageType, session.amount_total / 100);
        }
        
        console.log('✅ Purchase completed:', customerEmail, packageType);
    }
    
    res.json({ received: true });
});

// Email subscription endpoint
app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email || !isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }
        
        // Add to subscribers
        emailSubscribers.add(email);
        
        // Send welcome email
        await sendWelcomeEmail(email);
        
        // In production, add to your email marketing platform (Mailchimp, ConvertKit, etc.)
        
        res.json({ success: true, message: 'Subscribed successfully' });
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({ error: 'Subscription failed' });
    }
});

// Download endpoint (protected by token)
app.get('/api/download/:token', async (req, res) => {
    const token = req.params.token;
    
    // Find customer by token
    let customerData = null;
    for (const [email, data] of customers.entries()) {
        if (data.downloadToken === token) {
            customerData = data;
            break;
        }
    }
    
    if (!customerData) {
        return res.status(404).send('Invalid download link');
    }
    
    // Get package files
    const packageInfo = PACKAGES[customerData.packageType];
    const zipFilePath = await createZipPackage(packageInfo.files, customerData.packageType);
    
    // Send zip file
    res.download(zipFilePath, `vexel-logic-${customerData.packageType}.zip`);
});

// Customer dashboard endpoint
app.get('/api/customer/dashboard/:email', async (req, res) => {
    const email = req.params.email;
    const customerData = customers.get(email);
    
    if (!customerData) {
        return res.status(404).json({ error: 'Customer not found' });
    }
    
    res.json({
        email: customerData.email,
        package: customerData.packageType,
        purchaseDate: customerData.purchaseDate,
        downloadLink: `/api/download/${customerData.downloadToken}`
    });
});

// Affiliate registration
app.post('/api/affiliate/register', async (req, res) => {
    try {
        const { name, email, website } = req.body;
        
        const affiliateId = generateAffiliateId();
        
        // Store affiliate data (use database in production)
        // affiliates.set(affiliateId, { name, email, website, commissionRate: 0.20 });
        
        // Send affiliate welcome email with tracking link
        await sendAffiliateWelcome(email, affiliateId);
        
        res.json({
            success: true,
            affiliateId: affiliateId,
            trackingLink: `${process.env.SITE_URL}?ref=${affiliateId}`
        });
    } catch (error) {
        console.error('Affiliate registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Helper Functions

function generateDownloadToken() {
    return require('crypto').randomBytes(32).toString('hex');
}

function generateAffiliateId() {
    return require('crypto').randomBytes(8).toString('hex');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendPurchaseConfirmation(customerData) {
    const downloadLink = `${process.env.SITE_URL}/api/download/${customerData.downloadToken}`;
    
    const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #b026ff, #00f3ff); padding: 30px; text-align: center; color: white; }
                .content { background: #f9f9f9; padding: 30px; }
                .button { display: inline-block; padding: 15px 30px; background: #b026ff; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎉 Welcome to Vexel Logic!</h1>
                </div>
                <div class="content">
                    <h2>Thank You for Your Purchase!</h2>
                    <p>You've successfully purchased the <strong>${PACKAGES[customerData.packageType].name}</strong>.</p>
                    
                    <p><strong>What's Next?</strong></p>
                    <ol>
                        <li>Download your package using the button below</li>
                        <li>Follow the INSTALLATION_GUIDE.md for setup</li>
                        <li>Join our community for support</li>
                    </ol>
                    
                    <center>
                        <a href="${downloadLink}" class="button">Download Your Package</a>
                    </center>
                    
                    <p><strong>Need Help?</strong><br>
                    Reply to this email or visit our support portal.</p>
                    
                    <p><strong>Quick Start:</strong></p>
                    <ul>
                        <li>Import the JSON into n8n (10 minutes)</li>
                        <li>Add your OpenAI API key</li>
                        <li>Start automating your business!</li>
                    </ul>
                </div>
                <div class="footer">
                    <p>Transaction ID: ${customerData.transactionId}</p>
                    <p>&copy; 2025 Vexel Logic. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
    
    await emailTransporter.sendMail({
        from: process.env.SMTP_FROM || 'support@vexellogic.com',
        to: customerData.email,
        subject: '🎉 Your Vexel Logic Purchase - Download Inside',
        html: emailHtml
    });
    
    console.log('✅ Purchase confirmation sent to:', customerData.email);
}

async function sendWelcomeEmail(email) {
    const emailHtml = `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>Welcome to Vexel Logic!</h2>
                <p>Thanks for subscribing. You'll receive weekly tips on:</p>
                <ul>
                    <li>Business automation strategies</li>
                    <li>AI productivity hacks</li>
                    <li>Exclusive discounts and early access</li>
                </ul>
                <p>Best,<br>The Vexel Logic Team</p>
            </div>
        </body>
        </html>
    `;
    
    await emailTransporter.sendMail({
        from: process.env.SMTP_FROM || 'hello@vexellogic.com',
        to: email,
        subject: 'Welcome to Vexel Logic Community! 🚀',
        html: emailHtml
    });
}

async function sendAffiliateWelcome(email, affiliateId) {
    const trackingLink = `${process.env.SITE_URL}?ref=${affiliateId}`;
    
    const emailHtml = `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>Welcome to Vexel Logic Affiliate Program!</h2>
                <p>You've been approved! Here are your details:</p>
                <p><strong>Your Affiliate ID:</strong> ${affiliateId}</p>
                <p><strong>Your Tracking Link:</strong><br>
                <a href="${trackingLink}">${trackingLink}</a></p>
                <p><strong>Commission Rate:</strong> 20% per sale</p>
                <p><strong>Cookie Duration:</strong> 30 days</p>
                <p>Share your link on social media, blog posts, or with your audience to start earning!</p>
            </div>
        </body>
        </html>
    `;
    
    await emailTransporter.sendMail({
        from: process.env.SMTP_FROM || 'affiliates@vexellogic.com',
        to: email,
        subject: '🎉 Welcome to Vexel Logic Affiliates',
        html: emailHtml
    });
}

async function creditAffiliate(affiliateId, packageType, amount) {
    const commission = amount * 0.20; // 20% commission
    
    console.log(`💰 Affiliate ${affiliateId} earned $${commission.toFixed(2)} from ${packageType} sale`);
    
    // In production, update affiliate earnings in database
    // and send notification email
}

async function createZipPackage(files, packageType) {
    const archiver = require('archiver');
    const fs = require('fs');
    const zipPath = path.join(__dirname, 'temp', `vexel-logic-${packageType}-${Date.now()}.zip`);
    
    // Create temp directory if it doesn't exist
    if (!fs.existsSync(path.join(__dirname, 'temp'))) {
        fs.mkdirSync(path.join(__dirname, 'temp'));
    }
    
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    archive.pipe(output);
    
    // Add files to archive
    if (files[0] === '*') {
        // Include all files for enterprise
        archive.directory('./', 'vexel-logic-business-os');
    } else {
        files.forEach(file => {
            const filePath = path.join(__dirname, '..', file);
            if (fs.existsSync(filePath)) {
                archive.file(filePath, { name: file });
            }
        });
    }
    
    await archive.finalize();
    
    return new Promise((resolve, reject) => {
        output.on('close', () => resolve(zipPath));
        archive.on('error', reject);
    });
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Vexel Logic API running on port ${PORT}`);
    console.log(`📧 Email configured: ${process.env.SMTP_USER ? 'Yes' : 'No'}`);
    console.log(`💳 Stripe configured: ${process.env.STRIPE_SECRET_KEY ? 'Yes' : 'No'}`);
});

module.exports = app;

