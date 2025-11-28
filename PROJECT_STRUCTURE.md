# 📁 Vexel Logic - Project Structure

Clean, organized folder structure for the Vexel Logic business automation platform.

---

## 🗂️ Root Directory

```
Vexel project/
├── index.html              ⭐ Main website (landing page, catalog, calculator)
├── README.md               📘 Project overview and quick start
├── .gitignore              🚫 Git ignore rules
├── .env                    🔐 API keys (DO NOT commit)
│
├── 📁 docs/                📚 All documentation
├── 📁 scripts/             🛠️ Python utility scripts
├── 📁 tools/               🔧 150+ business tools (HTML/CSS/JS)
├── 📁 ai_agent/            🤖 AI Growth Agent (autonomous outreach)
├── 📁 marketing_assets/    📢 Ready-to-use marketing content
└── 📁 .github/             ⚙️ GitHub Actions (auto-deploy)
```

---

## 📚 `/docs` - Documentation (11 files)

**Business & Strategy:**
- `GO_TO_MARKET_STRATEGY.md` - Client acquisition plan
- `SCALING_OPERATIONS_PLAYBOOK.md` - Operations & hiring
- `MARKETING_EXECUTION_PLAN.md` - 30-day marketing plan
- `DEPLOYMENT_STRATEGY.md` - IP protection strategy

**Technical:**
- `FREE_HOSTING_SETUP.md` - GitHub Pages hosting (free)
- `QUICK_DEPLOY.md` - 3-step deployment
- `LOCAL_DEVELOPMENT.md` - Run locally guide
- `PROJECT_SUMMARY.md` - Complete overview

**Other:**
- `GOD_MODE_IMPROVEMENTS_LOG.md` - Audit & improvements
- `README_GITHUB.md` - GitHub README template
- `README.md` - Docs folder index

---

## 🛠️ `/scripts` - Utility Scripts (2 files)

**`vexel_architect.py`**
- AI tool generator (Google Gemini)
- Generates HTML/CSS/JS tools
- Gradio interface

**`vexel_prime.py`**
- Local GPU AI assistant
- Engineering-focused
- Gradio interface

**Setup:** See `scripts/README.md`

---

## 🔧 `/tools` - Business Tools (150+ files)

**Organized by category:**
- 📞 Communication & Automation
- 📊 Analytics & Tracking
- 💰 Financial Management
- 👥 Customer Relationship Management
- 📅 Scheduling & Workflow
- 🎨 Marketing & Branding *(30 tools in `/marketing_tools`)*
- 🔐 Security & Compliance
- 🚀 Operations & Productivity

**Files:**
- `index.html` - Tool browser
- `CATALOG.md` - Complete tool specifications
- `marketing_tools/` - 30+ marketing tools
- `[tool_name].html` - Individual tool files

---

## 🤖 `/ai_agent` - AI Growth Agent (11 files)

**Purpose:** Autonomous client acquisition and content generation

**Main Scripts:**
- `vexel_agent.py` - Interactive AI agent (prospect management)
- `auto_runner.py` - Automated content generation
- `linkedin_importer.py` - ✅ **WORKING** LinkedIn prospect importer
- `prospect_scraper.py` - Google scraper (archived)
- `prospect_generator.py` - AI prospect generator (backup)

**Database:**
- `growth_agent.db` - SQLite database (prospects, messages, tasks)

**Documentation:**
- `README.md` - Full agent guide
- `WORKING_PROSPECT_GUIDE.md` - ✅ How to use LinkedIn importer
- `PROSPECT_FINDER_GUIDE.md` - Old scraper guide

**Dependencies:**
- `requirements.txt` - Python packages
- Needs `OPENAI_API_KEY` in `.env`

**Quick Start:**
```bash
cd ai_agent
python linkedin_importer.py
```

---

## 📢 `/marketing_assets` - Marketing Content (3 files)

**Ready-to-use content:**

**`READY_TO_POST_CONTENT.md`**
- LinkedIn posts (15+)
- Twitter threads
- Hashtag sets
- Quick reply templates

**`scheduled_posts.json`**
- 10 pre-filled social media posts
- For Social Media Scheduler tool

**`QUICK_START.md`**
- 5-minute marketing setup
- Immediate actions

---

## ⚙️ `/.github/workflows` - CI/CD (1 file)

**`deploy.yml`**
- Auto-deploys to GitHub Pages
- Triggers on push to `main`
- Free hosting forever

---

## 🔐 Root Configuration Files

**`.gitignore`**
- Excludes `.env`, `__pycache__`, etc.

**`.env`** (create manually)
```env
GEMINI_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
SUPABASE_URL=your_url_here
SUPABASE_KEY=your_key_here
```

---

## 🚀 Quick Navigation

| **I want to...** | **Go to...** |
|------------------|--------------|
| View the website | `index.html` |
| Deploy to production | `docs/QUICK_DEPLOY.md` |
| Run locally | `docs/LOCAL_DEVELOPMENT.md` |
| Generate content | `ai_agent/auto_runner.py` |
| Find prospects | `ai_agent/linkedin_importer.py` ✅ |
| Get marketing content | `marketing_assets/READY_TO_POST_CONTENT.md` |
| Browse tools | `tools/index.html` |
| Generate new tools | `scripts/vexel_architect.py` |
| Read strategy | `docs/GO_TO_MARKET_STRATEGY.md` |
| Scale operations | `docs/SCALING_OPERATIONS_PLAYBOOK.md` |

---

## 📊 Project Stats

- **Website:** 1 main file (`index.html`)
- **Tools:** 150+ unique tools (21 built, rest cataloged)
- **Documentation:** 11 comprehensive guides
- **AI Scripts:** 5 automation scripts
- **Marketing Content:** 15+ ready-to-post pieces
- **Total Lines of Code:** ~25,000+

---

## 🎯 Recommended Workflow

### **For Development:**
1. Edit `index.html` in root
2. Generate tools with `scripts/vexel_architect.py`
3. Test locally (see `docs/LOCAL_DEVELOPMENT.md`)
4. Push to GitHub (auto-deploys)

### **For Marketing:**
1. Use `marketing_assets/QUICK_START.md` (5 min setup)
2. Run `ai_agent/auto_runner.py` for content
3. Use Social Media Scheduler tool
4. Track with `marketing_assets/READY_TO_POST_CONTENT.md`

### **For Client Acquisition:**
1. Search LinkedIn for prospects
2. Run `ai_agent/linkedin_importer.py`
3. Paste profile URLs
4. Get personalized messages instantly
5. Send manually (avoid LinkedIn bans)

---

## 📝 Recent Changes

**Latest Organization (Nov 28, 2025):**
✅ Moved all documentation to `docs/`
✅ Moved utility scripts to `scripts/`
✅ Created folder READMEs
✅ Created master structure document
✅ Cleaned up root directory

**Before:**
- 11 `.md` files cluttering root
- Scripts mixed with website files
- No clear organization

**After:**
- Clean root (only `index.html`, `README.md`, `.gitignore`)
- Everything organized by purpose
- Easy to navigate and understand

---

**Last Updated:** November 28, 2025
**Status:** ✅ Fully organized and production-ready

