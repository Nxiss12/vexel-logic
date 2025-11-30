# 🌐 GoDaddy DNS Configuration Guide for Vercel

## Prerequisites
- ✅ Domain purchased: `vexellogic.com`
- ✅ Vercel project: `vexellogic1`
- ✅ GitHub repo connected to Vercel

---

## Step 1: Add Custom Domain in Vercel

1. Go to https://vercel.com/dashboard
2. Click on your `vexellogic1` project
3. Click **"Settings"** (top navigation)
4. Click **"Domains"** (left sidebar)
5. In the "Add Domain" field, enter: `vexellogic.com`
6. Click **"Add"**
7. Vercel will show you **DNS records** to add

**Expected Records:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 600

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
TTL: 600
```

8. Also add `www.vexellogic.com` (repeat step 5-7 with www subdomain)

---

## Step 2: Configure DNS in GoDaddy

### 2.1 Access DNS Management

1. Go to https://dcc.godaddy.com/
2. Sign in to your GoDaddy account
3. Click on your domain: `vexellogic.com`
4. Scroll down to **"Additional Settings"**
5. Click **"Manage DNS"**

### 2.2 Add/Update DNS Records

#### **Record 1: Root Domain (A Record)**

1. Find existing `A` record with Name `@` (or add new one)
2. Click **"Edit"** (pencil icon)
3. Set:
   - **Type:** `A`
   - **Name:** `@`
   - **Value:** `76.76.21.21` (Vercel's IP - verify in your Vercel dashboard)
   - **TTL:** `600 seconds` (10 minutes)
4. Click **"Save"**

#### **Record 2: WWW Subdomain (CNAME)**

1. Find existing `CNAME` record with Name `www` (or add new one)
2. Click **"Edit"** or **"Add"** if it doesn't exist
3. Set:
   - **Type:** `CNAME`
   - **Name:** `www`
   - **Value:** `cname.vercel-dns.com` (verify in your Vercel dashboard)
   - **TTL:** `600 seconds`
4. Click **"Save"**

#### **Record 3: Remove Conflicting Records (if any)**

- Delete any existing `A` records pointing to parking pages
- Delete any `CNAME` for `@` (root can't be CNAME, must be `A`)

---

## Step 3: Verify in Vercel

1. Go back to Vercel → Settings → Domains
2. Wait 5-15 minutes for DNS propagation
3. Vercel will show:
   - ✅ `vexellogic.com` - Valid Configuration
   - ✅ `www.vexellogic.com` - Valid Configuration
4. Vercel will **automatically** provision SSL certificate (5-15 min)

---

## Step 4: Test Your Domain

### 4.1 DNS Propagation Check

Open terminal and run:
```bash
nslookup vexellogic.com
```

You should see:
```
Address: 76.76.21.21
```

### 4.2 Browser Test

1. Open browser (clear cache first: Ctrl+Shift+R)
2. Go to: `https://vexellogic.com`
3. You should see your Vexel Logic site!
4. Check for green padlock (HTTPS working)

### 4.3 WWW Redirect Test

1. Go to: `https://www.vexellogic.com`
2. Should redirect to `https://vexellogic.com` (or vice versa, depending on Vercel settings)

---

## Step 5: Email Configuration (Already Done by GoDaddy)

Your business email `ben@vexellogic.com` should already work since you set it up through GoDaddy.

### 5.1 Verify Email Works

1. Send a test email FROM: ben@vexellogic.com
2. Send a test email TO: ben@vexellogic.com
3. Both should work

### 5.2 Email Client Setup (if needed)

**For Outlook/Gmail:**
- **Incoming (IMAP):** `imap.secureserver.net` (Port: 993, SSL)
- **Outgoing (SMTP):** `smtpout.secureserver.net` (Port: 465, SSL)
- **Username:** `ben@vexellogic.com`
- **Password:** [Your GoDaddy email password]

---

## Troubleshooting

### Issue: "DNS Not Found" after 30 minutes

**Solution:**
1. Go to GoDaddy DNS Management
2. Check "Nameservers" section at top
3. Ensure it says **"GoDaddy Nameservers"** (not custom)
4. If custom, click "Change" → "Use GoDaddy Nameservers"

### Issue: Vercel shows "Invalid Configuration"

**Solution:**
1. Double-check the `A` record value matches what Vercel shows
2. Ensure there's NO `CNAME` for `@` (root domain must be `A` record)
3. Wait 15-30 more minutes (DNS can be slow)

### Issue: SSL Certificate Not Provisioning

**Solution:**
1. Ensure DNS is fully propagated (wait 30-60 minutes)
2. In Vercel, go to Domains → Click domain → "Refresh SSL"
3. If still failing, remove domain from Vercel and re-add it

### Issue: Email not working

**Solution:**
1. Go to GoDaddy → "Email & Office" section
2. Check if email is active
3. Verify MX records are set (GoDaddy does this automatically)
4. Try accessing webmail: `https://email.secureserver.net`

---

## Timeline

- **Add Domain to Vercel:** 2 minutes
- **Configure GoDaddy DNS:** 5 minutes
- **DNS Propagation:** 5-60 minutes (usually 10-15 min)
- **SSL Certificate:** 5-15 minutes (automatic after DNS)
- **Total:** 20-90 minutes (mostly waiting)

---

## What Happens After DNS Configuration

1. **Old URL still works:** `https://vexellogic1.vercel.app` (Vercel keeps it as backup)
2. **New URL becomes primary:** `https://vexellogic.com`
3. **Vercel auto-redirects:** vexellogic1.vercel.app → vexellogic.com
4. **SSL is automatic:** HTTPS works immediately
5. **Email is independent:** Works regardless of website DNS

---

## Verification Checklist

After DNS propagates:

- [ ] `https://vexellogic.com` loads your site
- [ ] `https://www.vexellogic.com` redirects properly
- [ ] Green padlock shows (HTTPS/SSL working)
- [ ] All pages load: /growth-engine.html, /admin-assassin.html, etc.
- [ ] mailto links open with ben@vexellogic.com
- [ ] Can send/receive email at ben@vexellogic.com
- [ ] Old URL (vexellogic1.vercel.app) redirects to new domain

---

## Important Notes

1. **DNS propagation is global** - may take up to 48 hours worldwide (but usually 10-30 minutes in UK)
2. **Keep old Calendly link working** until you update all marketing materials
3. **Vercel handles SSL automatically** - no manual certificate setup needed
4. **Your GitHub repo stays the same** - pushes still auto-deploy
5. **No downtime expected** - old domain works during migration

---

## Need Help?

**Vercel Support:** https://vercel.com/support  
**GoDaddy Support:** https://www.godaddy.com/help

Your current setup should work perfectly once DNS propagates!

