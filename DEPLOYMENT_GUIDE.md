# 🚀 Complete Deployment Guide
# Vexel Logic Business OS - Full Product Launch System

This guide walks you through deploying the entire Vexel Logic product launch infrastructure from scratch.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Server Setup](#server-setup)
3. [Database Configuration](#database-configuration)
4. [Backend API Deployment](#backend-api-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Stripe Integration](#stripe-integration)
7. [Email System Setup](#email-system-setup)
8. [n8n Sub-Workflows](#n8n-sub-workflows)
9. [Domain & DNS Configuration](#domain--dns-configuration)
10. [SSL Certificates](#ssl-certificates)
11. [Testing Checklist](#testing-checklist)
12. [Go-Live Checklist](#go-live-checklist)
13. [Monitoring & Maintenance](#monitoring--maintenance)

---

## ✅ Prerequisites

### Required Accounts
- [ ] Domain name registered (e.g., vexellogic.com)
- [ ] Server/hosting (VPS or cloud provider)
- [ ] Stripe account (for payments)
- [ ] OpenAI API account
- [ ] Email service (Gmail, SendGrid, or Mailgun)
- [ ] n8n instance (self-hosted or cloud)

### Required Skills
- Basic Linux command line
- Understanding of DNS settings
- Basic Node.js knowledge (helpful but not required)

### Estimated Time
- **Basic Setup:** 2-3 hours
- **Full Setup with Customization:** 1 day
- **Testing & Refinement:** 1-2 days

---

## 🖥️ Server Setup

### Option 1: DigitalOcean Droplet (Recommended for Beginners)

```bash
# 1. Create Droplet
- Image: Ubuntu 22.04 LTS
- Plan: Basic - $12/month (2GB RAM, 50GB SSD)
- Datacenter: Closest to your target audience
- Add SSH key

# 2. Initial Server Setup
ssh root@your_server_ip

# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install PM2 (process manager)
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install Certbot (for SSL)
apt install -y certbot python3-certbot-nginx

# Create application user
adduser vexellogic
usermod -aG sudo vexellogic
```

### Option 2: AWS EC2

```bash
# Launch t2.small instance with Ubuntu 22.04
# Configure security group:
- SSH (22) - Your IP
- HTTP (80) - 0.0.0.0/0
- HTTPS (443) - 0.0.0.0/0
- Custom TCP (3000) - 0.0.0.0/0 (temporarily)

# Follow same setup steps as DigitalOcean
```

### Option 3: Vercel/Netlify (Frontend Only)

```bash
# For static frontend deployment
# Upload landing-page/ directory
# Configure environment variables in dashboard
```

---

## 🗄️ Database Configuration (Optional but Recommended)

### PostgreSQL Setup

```bash
# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Create database
sudo -u postgres psql
CREATE DATABASE vexellogic;
CREATE USER vexeluser WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE vexellogic TO vexeluser;
\q

# Update backend ENV_SETUP.md with:
DATABASE_URL=postgresql://vexeluser:your_secure_password@localhost:5432/vexellogic
```

### Alternative: Use Managed Database

- **Supabase** (Free tier available)
- **PlanetScale** (MySQL)
- **MongoDB Atlas** (NoSQL)

---

## 🔧 Backend API Deployment

### 1. Upload Code

```bash
# On your local machine
cd /path/to/VexelLogic
tar -czf vexel-backend.tar.gz backend/

# Upload to server
scp vexel-backend.tar.gz vexellogic@your_server_ip:/home/vexellogic/

# On server
ssh vexellogic@your_server_ip
tar -xzf vexel-backend.tar.gz
cd backend/
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
# Create .env file
cp ENV_SETUP.md .env
nano .env

# Add your actual values:
STRIPE_SECRET_KEY=sk_live_YOUR_KEY
STRIPE_PUBLIC_KEY=pk_live_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET

SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your_app_password

SITE_URL=https://vexellogic.com
PORT=3000
```

### 4. Test Locally

```bash
npm start

# Test endpoint
curl http://localhost:3000/api/health
```

### 5. Start with PM2

```bash
pm2 start server.js --name vexel-api
pm2 save
pm2 startup  # Follow instructions
```

---

## 🎨 Frontend Deployment

### Option A: Same Server as Backend

```bash
# Upload frontend files
scp -r landing-page/ vexellogic@your_server_ip:/var/www/vexellogic/

# Configure Nginx
sudo nano /etc/nginx/sites-available/vexellogic

# Add this configuration:
```

```nginx
server {
    listen 80;
    server_name vexellogic.com www.vexellogic.com;
    
    root /var/www/vexellogic/landing-page;
    index index.html;
    
    # Frontend static files
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Proxy API requests to Node.js backend
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/vexellogic /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Option B: Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd landing-page/
vercel

# Follow prompts
# Set environment variables in Vercel dashboard
```

---

## 💳 Stripe Integration

### 1. Create Products & Prices

```bash
# In Stripe Dashboard:
1. Go to Products → Add Product

# Starter Package
Name: Vexel Logic - Starter
Price: $99 (one-time)
Copy Price ID → Add to .env as STRIPE_PRICE_STARTER

# Professional Package
Name: Vexel Logic - Professional
Price: $199 (one-time)
Copy Price ID → Add to .env as STRIPE_PRICE_PROFESSIONAL

# Enterprise Package
Name: Vexel Logic - Enterprise
Price: $499 (one-time)
Copy Price ID → Add to .env as STRIPE_PRICE_ENTERPRISE
```

### 2. Configure Webhook

```bash
# In Stripe Dashboard:
Developers → Webhooks → Add endpoint

URL: https://vexellogic.com/api/webhook/stripe
Events to send:
- checkout.session.completed

Copy Signing secret → Add to .env as STRIPE_WEBHOOK_SECRET
```

### 3. Test Mode First

```bash
# Use test keys initially
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...

# Test with Stripe test cards:
4242 4242 4242 4242 (success)
4000 0000 0000 0002 (decline)
```

### 4. Go Live

```bash
# Switch to live keys in production
# Update frontend script.js with live public key
```

---

## 📧 Email System Setup

### Option 1: Gmail SMTP

```bash
# 1. Enable 2-Factor Authentication on Google Account
# 2. Generate App Password:
Google Account → Security → App passwords → Create

# 3. Add to .env:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your_16_char_app_password
```

### Option 2: SendGrid

```bash
# 1. Create SendGrid account (free tier: 100 emails/day)
# 2. Create API key
# 3. Update .env:
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.YOUR_API_KEY
```

### Test Email Delivery

```bash
# Test endpoint
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Check if email arrives
```

---

## 🔗 n8n Sub-Workflows

### 1. Import Sub-Workflows

```bash
# In n8n interface:
1. Create new workflow
2. Import: n8n-subworkflows/web-research-tavily.json
3. Add Tavily API credentials
4. Activate workflow
5. Note the workflow ID

# Repeat for:
- email-drafter-gmail.json
- calendar-manager-google.json
```

### 2. Connect to Main Workflow

```bash
# In main vexel-logic-business-os-agent.json:
1. Click each Tool Workflow node
2. Set workflowId to the imported workflow's ID
3. Save and activate
```

### 3. Configure API Credentials

```bash
# Tavily API
- Sign up at tavily.com
- Get API key
- Add to n8n: Credentials → HTTP Header Auth
  - Name: Authorization
  - Value: Bearer YOUR_TAVILY_API_KEY

# Gmail (for email drafter)
- n8n: Credentials → Gmail OAuth2
- Follow OAuth setup flow

# Google Calendar
- n8n: Credentials → Google Calendar OAuth2
- Follow OAuth setup flow
```

---

## 🌐 Domain & DNS Configuration

### 1. Point Domain to Server

```bash
# In your domain registrar (Namecheap, GoDaddy, etc.):

# A Records:
vexellogic.com → YOUR_SERVER_IP
www.vexellogic.com → YOUR_SERVER_IP

# Wait for DNS propagation (up to 48 hours, usually < 1 hour)
# Check with: dig vexellogic.com
```

### 2. Configure Subdomains (Optional)

```bash
# For separate services:
api.vexellogic.com → YOUR_SERVER_IP
dashboard.vexellogic.com → YOUR_SERVER_IP
docs.vexellogic.com → YOUR_SERVER_IP
```

---

## 🔒 SSL Certificates

### Using Certbot (Free Let's Encrypt)

```bash
# Request certificate
sudo certbot --nginx -d vexellogic.com -d www.vexellogic.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose redirect HTTP to HTTPS (recommended: yes)

# Auto-renewal test
sudo certbot renew --dry-run

# Certbot auto-renews every 60 days
```

### Verify HTTPS

```bash
# Visit https://vexellogic.com
# Should show padlock icon
# Check certificate: Valid for 90 days
```

---

## ✅ Testing Checklist

### Backend API Tests

```bash
# 1. Health check
curl https://vexellogic.com/api/health

# 2. Email subscription
curl -X POST https://vexellogic.com/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com"}'

# 3. Stripe checkout (use test mode)
# Go to website → Click "Get Professional" → Complete checkout

# 4. Webhook handling
# Complete a test purchase → Check email delivery

# 5. Dashboard access
# Visit: https://vexellogic.com/dashboard.html?email=customer@email.com
```

### Frontend Tests

```bash
# 1. Landing page loads
curl https://vexellogic.com

# 2. All sections render
- Navigation works
- Pricing cards display
- FAQ accordion functions
- Forms submit

# 3. Mobile responsive
# Test on phone or use browser dev tools

# 4. Analytics tracking
# Check Google Analytics dashboard
```

### n8n Workflow Tests

```bash
# 1. Send test webhook request
curl -X POST YOUR_N8N_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"message":"Calculate ROI: $10k investment, $15k return","sessionId":"test"}'

# 2. Verify response

# 3. Test each tool:
- "Research competitors in SaaS"
- "Draft sales email to tech CTO"
- "Calculate profit margin: $100k revenue, $65k costs"
- "Check availability on December 15th"
```

---

## 🎯 Go-Live Checklist

### Pre-Launch (24 hours before)

- [ ] All tests passing
- [ ] SSL certificate installed and verified
- [ ] Stripe in live mode with real products
- [ ] Email delivery working
- [ ] Error monitoring set up (Sentry, LogRocket)
- [ ] Backup system configured
- [ ] Load testing completed (use Apache Bench or Loader.io)
- [ ] Legal pages added (Privacy Policy, Terms, Refund Policy)
- [ ] Analytics tracking verified (Google Analytics, Hotjar)
- [ ] Support email monitored (support@vexellogic.com)

### Launch Day

- [ ] Final smoke test of all features
- [ ] Send announcement to email list
- [ ] Post on social media
- [ ] Monitor server resources (CPU, RAM, disk)
- [ ] Watch error logs in real-time
- [ ] Have rollback plan ready (PM2 can revert)
- [ ] Support team on standby

### Post-Launch (First Week)

- [ ] Monitor daily metrics (sales, traffic, errors)
- [ ] Respond to all support requests within 24 hours
- [ ] Fix any bugs discovered
- [ ] A/B test pricing, copy, CTAs
- [ ] Collect customer feedback
- [ ] Send first customer success email

---

## 📊 Monitoring & Maintenance

### Server Monitoring

```bash
# Install monitoring tools
npm install -g pm2
pm2 install pm2-logrotate

# View logs
pm2 logs vexel-api

# Monitor resources
pm2 monit

# Check server health
htop  # or: top
df -h  # disk usage
free -m  # memory usage
```

### Application Monitoring

**Option 1: Sentry (Error Tracking)**
```javascript
// Add to server.js
const Sentry = require("@sentry/node");
Sentry.init({ dsn: "YOUR_SENTRY_DSN" });
```

**Option 2: LogRocket (Session Replay)**
```html
<!-- Add to landing page -->
<script src="https://cdn.lr-ingest.io/LogRocket.min.js" crossorigin="anonymous"></script>
<script>window.LogRocket && window.LogRocket.init('your-app-id');</script>
```

### Database Backups

```bash
# Automated daily backups
crontab -e

# Add this line (runs daily at 2 AM):
0 2 * * * pg_dump vexellogic > /backups/db_$(date +\%Y\%m\%d).sql

# Keep last 7 days only
0 3 * * * find /backups -name "db_*.sql" -mtime +7 -delete
```

### Update Workflow

```bash
# Create deployment script
nano /home/vexellogic/deploy.sh
```

```bash
#!/bin/bash
# Vexel Logic Deployment Script

echo "🚀 Starting deployment..."

# Pull latest code (if using Git)
cd /home/vexellogic/backend
git pull origin main

# Install dependencies
npm install

# Run tests (if you have them)
# npm test

# Restart application
pm2 restart vexel-api

# Check if running
pm2 status

echo "✅ Deployment complete!"
```

```bash
chmod +x /home/vexellogic/deploy.sh
```

---

## 🐛 Common Issues & Solutions

### Issue: Port 3000 already in use

```bash
# Find process using port
lsof -i :3000

# Kill it
kill -9 PID_NUMBER

# Or use different port in .env
PORT=3001
```

### Issue: Nginx 502 Bad Gateway

```bash
# Check if backend is running
pm2 status

# Check Nginx error log
sudo tail -f /var/log/nginx/error.log

# Restart services
pm2 restart vexel-api
sudo systemctl restart nginx
```

### Issue: Stripe webhook not receiving events

```bash
# Check webhook secret matches
echo $STRIPE_WEBHOOK_SECRET

# Test webhook locally with Stripe CLI
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

### Issue: Emails not sending

```bash
# Test SMTP connection
node
const nodemailer = require('nodemailer');
// Test connection code

# Check spam folder
# Verify SMTP credentials
# Check rate limits (Gmail: 500/day, SendGrid free: 100/day)
```

---

## 📈 Scaling Considerations

### When Traffic Grows

**Horizontal Scaling:**
```bash
# Add load balancer (Nginx)
# Deploy multiple backend instances
# Use Redis for session storage
```

**Database Optimization:**
```bash
# Add indexes
# Use connection pooling
# Implement caching (Redis)
```

**CDN for Static Assets:**
```bash
# Use Cloudflare (free tier available)
# Or AWS CloudFront
```

---

## 🎓 Next Steps After Launch

1. **Collect Feedback** - Talk to first 10 customers
2. **Iterate** - Fix bugs, improve UX based on data
3. **Market** - Content marketing, SEO, paid ads
4. **Expand** - Add features, create industry variants
5. **Automate** - Build email sequences, chatbots
6. **Scale** - Optimize for higher traffic

---

## 📚 Additional Resources

- **n8n Docs:** https://docs.n8n.io
- **Stripe Docs:** https://stripe.com/docs
- **Nginx Guide:** https://nginx.org/en/docs/
- **PM2 Docs:** https://pm2.keymetrics.io/docs/usage/quick-start/
- **Let's Encrypt:** https://letsencrypt.org/getting-started/

---

## 🆘 Getting Help

- **Documentation:** All files in this repository
- **Community:** n8n community forums
- **Professional Help:** Consider hiring DevOps consultant for complex setups

---

**You're ready to launch! 🚀**

Remember:
- Start small, test thoroughly
- Monitor everything in first week
- Iterate based on real user feedback
- Scale gradually as needed

**Good luck with your launch!**

---

**Vexel Logic Business OS - Full Deployment Guide**
**Version 1.0 - December 2025**

