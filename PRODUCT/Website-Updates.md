# Website Updates Guide

**How to make changes to your Vexel Logic website.**

---

## Quick Reference

**Main website file:** `index.html`

**Update process:**
1. Edit file locally
2. Test using Python server
3. Commit and push to GitHub
4. Wait 2-3 minutes for deployment

---

## Common Updates

### Update Contact Information

**Location:** Search for "benanokye577@gmail.com" in `index.html`

**Replace with:**
- Your email address
- Your phone number
- Your LinkedIn profile URL

---

### Update Calendly Link

**Location:** Search for "calendly.com" in `index.html`

**Replace:** `https://calendly.com/vexellogic/demo`

**With:** Your actual Calendly link

---

### Update Pricing

**Location:** Search for "£249" and "£697" in `index.html`

**Change:**
- Growth plan price
- Professional plan price
- Enterprise plan (custom)

---

### Add New Tools to Homepage

**Location:** Find the tools section in `index.html`

**Add this template:**

```html
<div class="tool-card">
  <div class="tool-icon">🔧</div>
  <h3>Tool Name</h3>
  <p>Short description of what it does.</p>
  <a href="tools/tool-name.html" class="btn">Open Tool</a>
</div>
```

---

### Update Hero Section

**Location:** Top of `index.html` (hero section)

**Elements to customize:**
- Main headline
- Subheadline
- CTA button text
- Background image

---

## Testing Changes

### Before Pushing to GitHub

**Method 1: Python Server**

```powershell
cd "C:\Users\Nxiss\OneDrive\Desktop\Vexel project"
python -m http.server 8000
```

Open: `http://localhost:8000`

**Method 2: VS Code Live Server**

Right-click `index.html` → "Open with Live Server"

**Check:**
- [ ] Styles load correctly
- [ ] Links work
- [ ] No console errors (F12)
- [ ] Mobile responsive

---

## Deploying Changes

### Step 1: Commit Changes

```powershell
git add index.html
git commit -m "Updated contact information"
```

### Step 2: Push to GitHub

```powershell
git push
```

### Step 3: Wait & Verify

- Wait 2-3 minutes
- Visit: https://nxiss12.github.io/vexel-logic/
- Verify changes are live

---

## Adding New Pages

### Create New Page

1. Create file: `new-page.html`
2. Copy structure from `index.html`
3. Modify content
4. Link from homepage

### Link to New Page

```html
<a href="new-page.html">Visit New Page</a>
```

---

## Updating Tools

**Tools location:** `PRODUCT/tools/` folder

**To update a tool:**
1. Open tool file: `PRODUCT/tools/tool-name.html`
2. Make changes
3. Test locally
4. Push to GitHub

---

## SEO Updates

### Update Page Title

**Location:** `<title>` tag in `<head>`

```html
<title>Vexel Logic - Your New Title</title>
```

### Update Meta Description

```html
<meta name="description" content="Your new description here">
```

### Update Keywords

```html
<meta name="keywords" content="automation, UK business, tools">
```

---

## Analytics

### Check Performance

**Google Analytics:**
- Visit: https://analytics.google.com
- View: Real-time reports, traffic sources

**Key metrics:**
- Page views
- Unique visitors
- Bounce rate
- Demo bookings (if tracking events)

---

## Troubleshooting

### Changes Not Showing

**Solutions:**
1. Clear browser cache (Ctrl+Shift+R)
2. Wait 5 minutes for deployment
3. Check GitHub Actions for build errors
4. Try incognito mode

### Broken Layout

**Solutions:**
1. Check browser console (F12) for errors
2. Verify all CDN links work
3. Test in different browser
4. Revert to previous commit if needed

---

## Resources

**Design inspiration:**
- Tailwind UI: https://tailwindui.com
- Dribbble: https://dribbble.com

**Tools:**
- Tailwind CSS: https://tailwindcss.com
- Font Awesome Icons: https://fontawesome.com

---

**Need help?** Check browser console (F12) for specific errors.




