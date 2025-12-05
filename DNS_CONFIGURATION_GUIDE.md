# DNS Configuration Guide for vexellogic.com

## Current Status
- ✅ Landing page deployed to Vercel: https://vexel-logicv3.vercel.app/
- ⏳ Custom domain configuration needed: vexellogic.com

## Steps to Configure Custom Domain

### 1. Add Domain in Vercel

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Click on your project: `vexel-logicv3`
3. Go to **Settings** → **Domains**
4. Click "Add Domain"
5. Enter: `vexellogic.com`
6. Click "Add"
7. Repeat for: `www.vexellogic.com`

### 2. Get DNS Records from Vercel

After adding the domain, Vercel will show you DNS records to configure. They'll look something like:

**For vexellogic.com (apex domain):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www.vexellogic.com:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Configure DNS at Your Domain Registrar

#### If using Squarespace:
1. Go to https://account.squarespace.com/domains
2. Find vexellogic.com
3. Click "DNS Settings"
4. Add the A record:
   - Type: A
   - Host: @
   - Points to: 76.76.21.21
   - TTL: Auto
5. Add the CNAME record:
   - Type: CNAME
   - Host: www
   - Points to: cname.vercel-dns.com
   - TTL: Auto

#### If using Namecheap/GoDaddy/Other:
1. Login to your domain registrar
2. Find DNS Management / DNS Settings
3. Add the records provided by Vercel
4. Save changes

### 4. Wait for Propagation

- DNS changes take 5-60 minutes (usually <15 minutes)
- Check status: https://www.whatsmydns.net/
- Vercel will automatically issue SSL certificate once DNS is configured

### 5. Verification

Once DNS propagates:
- Visit https://vexellogic.com
- Should show your landing page
- SSL certificate should be active (padlock icon)
- Both www and non-www versions work

## Troubleshooting

**Problem: Domain not resolving after 1 hour**
- Check DNS records match exactly what Vercel provided
- Clear browser cache
- Try incognito mode
- Use https://www.whatsmydns.net/ to check global propagation

**Problem: SSL certificate not working**
- Wait 15 minutes after DNS propagates
- Vercel auto-issues certificates via Let's Encrypt
- Check Vercel dashboard for certificate status

**Problem: www works but apex doesn't (or vice versa)**
- Ensure both A record and CNAME are configured
- Some registrars require separate records for @ and www

## Next Steps After Domain is Live

1. ✅ Test all forms and buttons
2. ✅ Set up Google Analytics
3. ✅ Test mobile responsive design
4. ✅ Verify SSL certificate
5. ✅ Update any hardcoded URLs in backend to use https://vexellogic.com

---

**Note:** I'll continue with other todos (backend deployment, documentation, etc.) while you complete this DNS configuration. Let me know once vexellogic.com is live!

