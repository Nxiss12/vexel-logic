# Tool Generator Guide

**How to build new automation tools using the AI architect.**

---

## Overview

You have an AI-powered tool generator that creates new HTML tools in minutes.

**What it does:**
- Generates fully functional HTML/CSS/JS tools
- Uses Tailwind CSS for styling
- Creates professional, responsive designs
- Includes documentation

---

## Method 1: vexel_architect.py (Recommended)

### Requirements

- Python 3.x installed
- Gemini API key (Google AI)

### Setup

**Step 1: Get API Key**

1. Go to: https://makersuite.google.com/app/apikey
2. Create new API key
3. Copy the key

**Step 2: Set Environment Variable**

**Windows PowerShell:**
```powershell
$env:GEMINI_API_KEY="your_api_key_here"
```

**Alternative (permanent):**
```powershell
setx GEMINI_API_KEY "your_api_key_here"
```

### Running the Tool

```powershell
cd "C:\Users\Nxiss\OneDrive\Desktop\Vexel project"
cd scripts
python vexel_architect.py
```

**Interface opens at:** `http://localhost:7860`

### Using the Interface

1. **Select tab:** "Tool Fabricator"
2. **Enter tool details:**
   - Tool name: "Customer Feedback Widget"
   - Description: "Collect customer feedback with ratings"
   - Complexity: "Medium (Tailwind UI)"
3. **Click:** "INITIATE FABRICATION"
4. **Wait:** 30-60 seconds
5. **Tool created:** Saves to `tools/` folder

---

## Method 2: vexel_prime.py (Local GPU)

### Requirements

- LM Studio running locally
- Local LLM model loaded

### Setup

**Step 1: Install LM Studio**

1. Download: https://lmstudio.ai
2. Download a model (e.g., "Mistral-7B")
3. Start server on port 1234

**Step 2: Run Tool**

```powershell
cd scripts
python vexel_prime.py
```

### Using the Chat

Ask the AI to build tools:

```
"Create a time tracking tool with start/stop timer 
and daily summary table. Use Tailwind CSS."
```

---

## Tool Catalog

**See all 150 tools:** [tools/CATALOG.md](tools/CATALOG.md)

**Browse built tools:** [tools/index.html](tools/index.html)

---

## Customizing Tools

### After Tool is Generated

1. **Open tool file:** `PRODUCT/tools/your-tool.html`
2. **Make edits:**
   - Update colors
   - Add features
   - Modify functionality
3. **Test locally:**
   - Python server: `python -m http.server 8000`
   - Open: `http://localhost:8000/tools/your-tool.html`
4. **Deploy:**
   ```powershell
   git add PRODUCT/tools/your-tool.html
   git commit -m "Added new tool"
   git push
   ```

---

## Tool Template Structure

**Every tool has:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Tool Name</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white">
  <!-- Tool content here -->
  <script>
    // Tool functionality here
  </script>
</body>
</html>
```

---

## Best Practices

### Tool Design

- **Keep it simple:** Focus on one problem
- **Mobile-first:** Test on small screens
- **Vexel branding:** Use dark theme (#020305) + gold accent (#FBC02D)
- **Clear CTAs:** Obvious buttons and actions

### Tool Functionality

- **Instant feedback:** Show results immediately
- **Data persistence:** Use localStorage for saving
- **Error handling:** Show helpful error messages
- **Export features:** Let users download/print results

---

## Adding Tool to Website

### Step 1: Test Tool

Make sure tool works independently

### Step 2: Add to Tools Index

Edit: `PRODUCT/tools/index.html`

Add tool card:

```html
<div class="tool-card">
  <h3>Your Tool Name</h3>
  <p>Tool description here.</p>
  <a href="your-tool.html" class="btn">Open Tool</a>
</div>
```

### Step 3: Add to Main Website (Optional)

Edit: `index.html`

Add to tools section or tool count

### Step 4: Update Catalog

Edit: `PRODUCT/tools/CATALOG.md`

Add tool specs:
```markdown
### Your Tool Name
**Category:** Operations  
**Status:** ✅ Built  
**Description:** What it does  
**Key Features:**
- Feature 1
- Feature 2
```

---

## Example Tool Requests

### Simple Tools

- "QR code generator with custom colors"
- "Email signature builder for teams"
- "Invoice number generator"

### Medium Tools

- "Appointment scheduler with calendar view"
- "Expense tracker with category breakdown"
- "Lead scoring calculator"

### Complex Tools

- "CRM dashboard with pipeline stages"
- "Social media scheduler with preview"
- "Project management board (Kanban)"

---

## Troubleshooting

### "API key not found"

**Fix:**
```powershell
$env:GEMINI_API_KEY="your_actual_key"
```

### "Module not found"

**Fix:**
```powershell
pip install -r scripts/requirements.txt
```

### "Tool not generating"

**Fix:**
- Check API key is valid
- Check internet connection
- Try simpler prompt
- Check Gemini API quota

### "Port already in use"

**Fix:**
```powershell
# Kill process on port 7860
netstat -ano | findstr :7860
taskkill /PID [PID_NUMBER] /F
```

---

## Advanced: Manual Tool Creation

### Create from Scratch

1. **Copy template:**
   ```powershell
   copy PRODUCT\tools\template.html PRODUCT\tools\new-tool.html
   ```

2. **Edit HTML:**
   - Update title
   - Add your UI elements
   - Style with Tailwind classes

3. **Add JavaScript:**
   - Tool logic
   - Event handlers
   - Data processing

4. **Test & deploy**

---

## Tool Categories

**Organize tools by category:**

- Communication & Automation
- Analytics & Tracking
- Financial Management
- Customer Relationship Management
- Scheduling & Workflow
- Marketing & Branding
- Security & Compliance
- Operations & Productivity

---

## Resources

**Tailwind CSS:** https://tailwindcss.com/docs  
**JavaScript Guide:** https://javascript.info  
**Tool Examples:** [PRODUCT/tools/](tools/)

---

**Ready to build?** Run the architect and create your first tool!

```powershell
cd scripts
python vexel_architect.py
```

