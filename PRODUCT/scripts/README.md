# 🛠️ Vexel Logic Utility Scripts

Python scripts for AI-powered development and automation.

## 📜 Available Scripts

### **`vexel_architect.py`**
**Purpose:** AI-powered tool generator using Google Gemini API

**Features:**
- Generates production-ready HTML/CSS/JS tools
- Uses Google Gemini 1.5 Pro
- Interactive Gradio interface

**Usage:**
```bash
cd scripts
python vexel_architect.py
```

**Requirements:**
- Set `GEMINI_API_KEY` environment variable
- Install: `pip install gradio google-generativeai`

---

### **`vexel_prime.py`**
**Purpose:** Local GPU-powered AI engineering assistant

**Features:**
- Uses local LLM (OpenAI-compatible API)
- Engineering-focused responses
- Gradio chat interface

**Usage:**
```bash
cd scripts
python vexel_prime.py
```

**Requirements:**
- Set `OPENAI_API_KEY` environment variable
- Install: `pip install gradio openai`

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

---

## 📦 Dependencies

Install all dependencies:
```bash
pip install gradio google-generativeai openai python-dotenv
```

---

## 🚀 Quick Start

1. **Set up API keys** (see above)
2. **Run a script:**
   ```bash
   cd scripts
   python vexel_architect.py
   ```
3. **Open browser** at the URL shown (usually `http://127.0.0.1:7860`)

---

**Note:** For AI Growth Agent, see `../ai_agent/README.md`


