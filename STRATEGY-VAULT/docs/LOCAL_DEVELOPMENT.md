# 🖥️ LOCAL DEVELOPMENT GUIDE

**How to run Vexel Logic website on your computer**

---

## ⚡ **METHOD 1: SIMPLEST (Double-Click)**

### **For Quick Testing:**

1. **Navigate to your project folder:**
   ```
   C:\Users\Nxiss\OneDrive\Desktop\Vexel project
   ```

2. **Double-click `index.html`**
   - Opens in your default browser
   - ✅ Works immediately
   - ⚠️ Some features may have CORS issues (forms, Supabase)

**✅ Use this for:** Quick visual checks, viewing static content

---

## 🐍 **METHOD 2: Python HTTP Server (RECOMMENDED)**

### **Best for Full Functionality:**

#### **Step 1: Open Terminal in Project Folder**
```powershell
cd "C:\Users\Nxiss\OneDrive\Desktop\Vexel project"
```

#### **Step 2: Start Server**

**Python 3:**
```powershell
python -m http.server 8000
```

**Or if that doesn't work:**
```powershell
python3 -m http.server 8000
```

**Or Python 2 (if Python 3 not available):**
```powershell
python -m SimpleHTTPServer 8000
```

#### **Step 3: Open Browser**
Visit: **http://localhost:8000**

**✅ Your site is now running locally!**

#### **Step 4: Stop Server**
Press `Ctrl + C` in the terminal

---

## 💻 **METHOD 3: VS Code Live Server (EASIEST)**

### **If You Use VS Code:**

1. **Install Extension:**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search: "Live Server"
   - Install by Ritwick Dey

2. **Run:**
   - Right-click `index.html`
   - Select: **"Open with Live Server"**
   - Browser opens automatically at `http://127.0.0.1:5500`

3. **Auto-Reload:**
   - ✅ Automatically refreshes when you save files
   - ✅ Perfect for development

**✅ Best for:** Active development and testing

---

## 📦 **METHOD 4: Node.js http-server**

### **If You Have Node.js Installed:**

#### **Step 1: Install Globally (One Time)**
```powershell
npm install -g http-server
```

#### **Step 2: Run Server**
```powershell
cd "C:\Users\Nxiss\OneDrive\Desktop\Vexel project"
http-server
```

#### **Step 3: Access**
Visit: **http://localhost:8080**

---

## 🎯 **QUICK REFERENCE**

| Method | Command | URL | Best For |
|--------|---------|-----|----------|
| **Double-Click** | Just open `index.html` | `file:///...` | Quick view |
| **Python Server** | `python -m http.server 8000` | `http://localhost:8000` | Full testing |
| **VS Code Live** | Right-click → Live Server | `http://127.0.0.1:5500` | Development |
| **Node.js** | `http-server` | `http://localhost:8080` | If you use Node |

---

## 🔧 **TROUBLESHOOTING**

### **Issue: "Python not found"**

**Solution 1: Install Python**
- Download: [python.org/downloads](https://www.python.org/downloads/)
- ✅ Check "Add Python to PATH" during installation
- Restart terminal

**Solution 2: Use VS Code Live Server** (no Python needed)

---

### **Issue: "CORS errors in console"**

**Why:** Some browsers block local file access for security

**Solution:** Use a local server (Method 2, 3, or 4 above)
- ✅ Python server fixes this
- ✅ VS Code Live Server fixes this
- ✅ Node.js http-server fixes this

---

### **Issue: "Supabase not working"**

**Check:**
1. Are you using a local server? (not file://)
2. Are your Supabase keys configured in `index.html`?
3. Check browser console for API errors

**Location of Supabase config:**
- Open `index.html`
- Search for: `supabaseUrl` and `supabaseKey`
- Update with your actual keys (around line 350)

---

### **Issue: "Styles not loading"**

**Check:**
1. Internet connection (CDN resources need internet)
2. Browser console for blocked resources
3. Try different browser (Chrome, Firefox, Edge)

---

### **Issue: "Port already in use"**

**Solution:** Use a different port:
```powershell
# Python
python -m http.server 8001

# Node.js
http-server -p 8081
```

---

## 📁 **NAVIGATING TO DIFFERENT PAGES**

Once server is running, access:

**Homepage:**
- `http://localhost:8000/` or `http://localhost:8000/index.html`

**Tools Page:**
- `http://localhost:8000/tools/index.html`

**Marketing Tools:**
- `http://localhost:8000/tools/marketing_tools/index.html`

**Individual Tool:**
- `http://localhost:8000/tools/missed_call_bot.html`

---

## 🚀 **RECOMMENDED WORKFLOW**

### **For Development:**
1. Use **VS Code Live Server** (auto-reload on save)
2. Make changes to HTML/CSS/JS
3. See changes instantly in browser

### **For Testing:**
1. Use **Python HTTP Server** (simple, reliable)
2. Test all features thoroughly
3. Check browser console for errors

### **For Quick Checks:**
1. Just **double-click** `index.html`
2. Verify visual changes

---

## 💡 **PRO TIPS**

1. **Keep Terminal Open:**
   - Server runs until you close terminal or press Ctrl+C
   - Keep it running while developing

2. **Multiple Browsers:**
   - Test in Chrome, Firefox, and Edge
   - Each may handle things slightly differently

3. **Browser DevTools:**
   - Press `F12` to open developer tools
   - Check Console tab for errors
   - Use Network tab to see resource loading

4. **Hot Reload:**
   - VS Code Live Server auto-refreshes
   - Python/Node servers: Refresh browser manually (F5)

5. **Mobile Testing:**
   - Find your local IP: `ipconfig` (Windows)
   - Access from phone: `http://YOUR_IP:8000`
   - Example: `http://192.168.1.100:8000`

---

## ✅ **QUICK START (Copy-Paste)**

**Fastest way to get running:**

```powershell
# 1. Navigate to project
cd "C:\Users\Nxiss\OneDrive\Desktop\Vexel project"

# 2. Start server
python -m http.server 8000

# 3. Open browser to:
# http://localhost:8000
```

**That's it!** 🎉

---

## 📝 **NEXT STEPS**

Once running locally:
- ✅ Test all features
- ✅ Check forms work
- ✅ Verify Supabase connection
- ✅ Test calculator
- ✅ Browse all tools
- ✅ Check mobile responsiveness (F12 → Device toolbar)

---

**Questions?** Check browser console (F12) for specific error messages!


