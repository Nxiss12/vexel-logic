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

// Package configuration
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

