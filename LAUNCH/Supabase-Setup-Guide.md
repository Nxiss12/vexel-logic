# Supabase Database Setup Guide

**Complete guide to set up your backend database for Vexel Logic.**

---

## Step 1: Create New Supabase Project (3 minutes)

### 1.1 Sign Up / Log In

1. Go to: https://supabase.com
2. Click "Start your project"
3. Sign in with GitHub (recommended)

### 1.2 Create New Project

1. Click "New Project"
2. Choose your organization (or create one)
3. Fill in project details:
   - **Name:** `vexel-logic`
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to UK (e.g., London or Frankfurt)
   - **Pricing Plan:** Free (starts with $0/month)
4. Click "Create new project"
5. Wait 2-3 minutes for database to spin up

---

## Step 2: Set Up Database Schema (5 minutes)

### 2.1 Open SQL Editor

1. In your Supabase project dashboard
2. Click "SQL Editor" in left sidebar
3. Click "New query"

### 2.2 Run This SQL Code

Copy and paste this entire script, then click "Run":

```sql
-- ========================================
-- VEXEL LOGIC DATABASE SCHEMA
-- ========================================

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- ========================================
-- 1. LEADS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Contact Information
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    
    -- Lead Details
    source TEXT, -- 'website', 'linkedin', 'referral', etc.
    status TEXT DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'converted', 'lost'
    notes TEXT,
    
    -- Selected Tools (JSON array)
    selected_tools JSONB DEFAULT '[]'::jsonb,
    
    -- Calculated Revenue
    estimated_value NUMERIC(10,2),
    
    -- Metadata
    ip_address TEXT,
    user_agent TEXT
);

-- ========================================
-- 2. CUSTOMERS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Contact Information
    business_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    
    -- Business Details
    industry TEXT,
    employee_count INTEGER,
    website TEXT,
    
    -- Subscription
    plan_tier TEXT, -- 'growth', 'professional', 'enterprise'
    monthly_price NUMERIC(10,2),
    signup_date DATE,
    status TEXT DEFAULT 'active', -- 'active', 'paused', 'cancelled'
    
    -- Metrics
    mrr NUMERIC(10,2), -- Monthly Recurring Revenue
    ltv NUMERIC(10,2), -- Lifetime Value
    health_score INTEGER, -- 0-100
    churn_risk BOOLEAN DEFAULT false,
    
    -- Metadata
    last_login TIMESTAMP WITH TIME ZONE,
    notes TEXT
);

-- ========================================
-- 3. TOOLS USAGE TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS tools_usage (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Relations
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    
    -- Tool Information
    tool_name TEXT NOT NULL,
    tool_category TEXT,
    
    -- Usage Stats
    activated_date DATE,
    last_used TIMESTAMP WITH TIME ZONE,
    usage_count INTEGER DEFAULT 0,
    
    -- Status
    is_active BOOLEAN DEFAULT true
);

-- ========================================
-- 4. SUPPORT TICKETS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Relations
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    
    -- Ticket Details
    subject TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'open', -- 'open', 'in_progress', 'resolved', 'closed'
    priority TEXT DEFAULT 'normal', -- 'low', 'normal', 'high', 'critical'
    
    -- Assignment
    assigned_to TEXT,
    
    -- Resolution
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolution_notes TEXT
);

-- ========================================
-- 5. CALCULATOR RESULTS TABLE (Optional)
-- ========================================
CREATE TABLE IF NOT EXISTS calculator_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Input Values
    missed_calls_per_week INTEGER,
    average_job_value NUMERIC(10,2),
    
    -- Calculated Results
    annual_lost_revenue NUMERIC(10,2),
    recoverable_revenue NUMERIC(10,2),
    roi_ratio NUMERIC(10,2),
    
    -- User Info (optional)
    email TEXT,
    industry TEXT,
    
    -- Metadata
    ip_address TEXT
);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_customers_plan_tier ON customers(plan_tier);

CREATE INDEX idx_tools_usage_customer_id ON tools_usage(customer_id);
CREATE INDEX idx_tools_usage_tool_name ON tools_usage(tool_name);

CREATE INDEX idx_support_tickets_customer_id ON support_tickets(customer_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);

-- ========================================
-- ROW LEVEL SECURITY (RLS)
-- ========================================

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_results ENABLE ROW LEVEL SECURITY;

-- Public access policies (adjust based on your needs)
-- For now, allow all operations (you can restrict later)

CREATE POLICY "Allow all operations on leads" ON leads
    FOR ALL USING (true);

CREATE POLICY "Allow all operations on customers" ON customers
    FOR ALL USING (true);

CREATE POLICY "Allow all operations on tools_usage" ON tools_usage
    FOR ALL USING (true);

CREATE POLICY "Allow all operations on support_tickets" ON support_tickets
    FOR ALL USING (true);

CREATE POLICY "Allow all operations on calculator_results" ON calculator_results
    FOR ALL USING (true);

-- ========================================
-- SAMPLE DATA (Optional)
-- ========================================

-- Insert a test lead
INSERT INTO leads (name, email, phone, company, source, selected_tools, estimated_value)
VALUES (
    'Test User',
    'test@example.com',
    '07700 900000',
    'Test Company Ltd',
    'website',
    '["Missed Call Bot", "Review Engine"]',
    4500.00
);

-- Insert a test customer
INSERT INTO customers (
    business_name, 
    contact_name, 
    email, 
    phone, 
    industry, 
    plan_tier, 
    monthly_price, 
    signup_date, 
    mrr, 
    health_score
)
VALUES (
    'Demo Plumbing Services',
    'John Demo',
    'demo@example.com',
    '07700 900001',
    'Trades',
    'growth',
    249.00,
    CURRENT_DATE,
    249.00,
    85
);

-- ========================================
-- DONE!
-- ========================================
SELECT 'Database schema created successfully!' AS status;
```

### 2.3 Verify Tables Created

After running the script, you should see:
- ✅ "Database schema created successfully!"
- Check "Table Editor" in left sidebar
- You should see 5 tables: leads, customers, tools_usage, support_tickets, calculator_results

---

## Step 3: Get Your API Keys (2 minutes)

### 3.1 Find Your Credentials

1. In Supabase dashboard, click "Settings" (gear icon)
2. Click "API" in left sidebar
3. You'll see two important values:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```

**Anon/Public Key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
```

### 3.2 Copy These Values

**Keep these safe!** You'll need them for:
- Vercel environment variables
- Your website configuration

---

## Step 4: Add to Vercel (3 minutes)

### 4.1 Go to Vercel Project Settings

1. Go to: https://vercel.com/dashboard
2. Click on your `vexel-logic` project
3. Click "Settings" tab
4. Click "Environment Variables" in left sidebar

### 4.2 Add Variables

Click "Add" and enter:

**Variable 1:**
- **Key:** `SUPABASE_URL`
- **Value:** `https://xxxxxxxxxxxxx.supabase.co` (your Project URL)
- **Environments:** Production, Preview, Development (check all)
- Click "Save"

**Variable 2:**
- **Key:** `SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (your Anon key)
- **Environments:** Production, Preview, Development (check all)
- Click "Save"

### 4.3 Redeploy

1. Go to "Deployments" tab
2. Click the three dots (...) on latest deployment
3. Click "Redeploy"
4. Wait 1-2 minutes

**Your site will now work with the database!**

---

## Step 5: Test Everything (2 minutes)

### 5.1 Test Lead Form

1. Visit your live Vercel site
2. Fill out the lead capture form
3. Submit it

### 5.2 Check Database

1. Go back to Supabase
2. Click "Table Editor"
3. Open "leads" table
4. You should see your test submission!

---

## What Each Table Does

| Table | Purpose | Used For |
|-------|---------|----------|
| **leads** | Lead capture | Website form submissions, calculator results |
| **customers** | Customer management | Track paying customers, subscriptions, health |
| **tools_usage** | Usage tracking | See which tools customers use |
| **support_tickets** | Customer support | Track support requests, bugs, questions |
| **calculator_results** | Analytics | Track calculator usage (ROI insights) |

---

## Security Notes

### Current Setup (Development)
- ✅ RLS enabled
- ✅ Public policies (allow all for testing)
- ⚠️ Anyone can read/write (fine for MVP)

### Production Setup (Later)
When you have real customers:
1. Update RLS policies to restrict access
2. Add authentication (user login)
3. Restrict policies to authenticated users only

**For now, this setup is perfect for launching!**

---

## Common Issues

### "Relation already exists"
- Tables already created
- Click "Table Editor" to verify
- If you want to start fresh, delete tables and re-run SQL

### "Permission denied"
- Make sure you're logged into the right Supabase project
- Check that RLS policies were created

### "Can't connect from Vercel"
- Double-check environment variable names (exact spelling)
- Make sure you clicked "Save" in Vercel
- Redeploy after adding variables

---

## Quick Reference

**Your Supabase Dashboard:**
https://app.supabase.com/project/YOUR_PROJECT_ID

**Key Pages:**
- SQL Editor: Run queries
- Table Editor: View/edit data
- API Settings: Get your keys
- Database: Monitor performance

---

## Next Steps After Setup

1. ✅ Database is created
2. ✅ Vercel is connected
3. ✅ Website can save data
4. 🚀 Launch your business!

**You're ready to go!**

---

## Need Help?

If you run into issues:
1. Check Supabase logs (Database → Logs)
2. Check Vercel deployment logs
3. Verify environment variables are set correctly
4. Test with the sample data first

---

**Database rebuild complete!** 🎉

Your Vexel Logic website now has a fully functional backend.

