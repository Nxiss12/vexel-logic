# Vexel Logic - Business Automation Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_BADGE_ID/deploy-status)](https://app.netlify.com/sites/vexellogicc/deploys)

**Live Site:** [https://vexellogicc.netlify.app](https://vexellogicc.netlify.app)

---

## 🎯 About

Vexel Logic is a complete business automation platform for UK SMEs. We build "digital nervous systems" that help businesses recover lost revenue from missed calls, automate review collection, and eliminate manual admin tasks.

### Key Features
- ✅ 21 production-ready automation tools
- ✅ Lead capture and tracking system
- ✅ Revenue calculator and ROI tools
- ✅ Full tools catalog (150+ documented systems)
- ✅ Supabase backend integration
- ✅ Calendly booking integration

---

## 🚀 Quick Start

### Prerequisites
- Web browser (for viewing HTML files)
- Python 3.8+ (for AI tool generators)
- Supabase account (for backend)
- Netlify account (for deployment)

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/vexel-logic.git
cd vexel-logic
```

2. **Open the website:**
```bash
# Just open index.html in your browser
open index.html
# or on Windows:
start index.html
```

3. **Set up Supabase (for lead capture):**
   - Create project at [supabase.com](https://supabase.com)
   - Run SQL from `SCALING_OPERATIONS_PLAYBOOK.md`
   - Update line 350 in `index.html` with your keys

4. **Optional: Generate new tools:**
```bash
# Set your API key
export GEMINI_API_KEY=your_key_here

# Run the architect
python vexel_architect.py
```

---

## 📁 Project Structure

```
vexel-logic/
├── index.html                          # Main website
├── tools/                              # All automation tools
│   ├── index.html                      # Tools directory
│   ├── missed_call_bot.html
│   ├── review_engine.html
│   └── ... (21 total tools)
├── vexel_architect.py                  # AI tool generator
├── vexel_prime.py                      # Local GPU tool generator
├── GO_TO_MARKET_STRATEGY.md           # Marketing playbook
├── SCALING_OPERATIONS_PLAYBOOK.md     # Operations manual
├── PROJECT_SUMMARY.md                 # Build documentation
└── README.md                          # User-facing readme
```

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, Tailwind CSS
- Vanilla JavaScript (no framework overhead)
- Font Awesome icons
- AOS animations

**Backend:**
- Supabase (PostgreSQL database)
- Serverless architecture
- RESTful APIs

**Integrations:**
- Twilio (SMS automation)
- Calendly (booking system)
- Stripe (payments)
- Various business APIs

**AI Tools:**
- Google Gemini API
- Local LLM support (LM Studio)

---

## 📦 Deployment

### Netlify (Recommended)

**Automatic Deployment:**
1. Connect this repo to Netlify
2. Every push to `main` auto-deploys
3. Preview deployments on pull requests

**Manual Deployment:**
```bash
netlify deploy --prod
```

### Alternative Hosting
- **Vercel:** `vercel --prod`
- **GitHub Pages:** Enable in repo settings
- **Any static host:** Upload all files

---

## 🔧 Configuration

### Environment Variables

For Python tools, set these environment variables:

```bash
# Gemini AI (for tool generation)
export GEMINI_API_KEY=your_key_here

# Optional: Google API (for vexel_prime.py)
export GOOGLE_API_KEY=your_key_here
```

### Supabase Setup

Update `index.html` line 350:
```javascript
const supabase = window.supabase.createClient(
    'YOUR_PROJECT_URL',
    'YOUR_ANON_KEY'
);
```

---

## 📊 Tools Included

### Core Automation (5 tools)
1. **Missed Call Bot** - Auto-text missed calls
2. **Review Engine** - Automated review requests
3. **Unified Inbox** - Multi-channel messaging
4. **AI Receptionist** - 24/7 booking agent
5. **Database Reactivator** - Win-back campaigns

### Business Operations (16 tools)
- Invoice Generator
- Appointment Scheduler
- Quote Calculator
- Time Tracker
- Project Tracker
- And 11 more...

**See full catalog:** `tools/CATALOG.md`

---

## 🤝 Contributing

This is a production business platform, but contributions are welcome!

1. Fork the repo
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

**Code Standards:**
- Clean, readable code
- Comments for complex logic
- Mobile-responsive design
- Accessibility best practices

---

## 📄 License

This project is proprietary software owned by Vexel Logic.

**For business inquiries:** benanokye577@gmail.com

---

## 🎯 Roadmap

- [ ] Add payment processing (Stripe integration)
- [ ] Build admin dashboard
- [ ] Add analytics tracking
- [ ] Create mobile app
- [ ] Add more tool integrations
- [ ] Multi-language support

---

## 📞 Contact

**Benedict Anokye-Davies**  
Founder & Lead Systems Architect

- **Email:** benanokye577@gmail.com
- **LinkedIn:** [Benedict Anokye-Davies](https://www.linkedin.com/in/benedict-anokye-davies/)
- **Website:** [vexellogicc.netlify.app](https://vexellogicc.netlify.app)
- **Book Demo:** [calendly.com/benanokye577/vexel-demo-revenue-recovery-audit](https://calendly.com/benanokye577/vexel-demo-revenue-recovery-audit)

---

## 🙏 Acknowledgments

Built with:
- Tailwind CSS
- Font Awesome
- Supabase
- Google Gemini AI
- And a lot of coffee ☕

---

**Built in Nottingham 🇬🇧 | Serving UK Businesses Nationwide**

