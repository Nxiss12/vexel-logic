import gradio as gr
import os
import time
import threading
import google.generativeai as genai
from datetime import datetime

# --- 1. CONFIGURATION (GOD MODE) ---
# SECURITY: Store API keys in environment variables for production
import os
API_KEY = os.getenv('GEMINI_API_KEY', 'PASTE_YOUR_API_KEY_HERE')  # Use: export GEMINI_API_KEY=your_key

# Configure AI
try:
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')
    AI_STATUS = "ONLINE (Gemini Flash)"
except Exception as e:
    AI_STATUS = f"OFFLINE ({str(e)})"

# Global State for Sentinel Mode
SENTINEL_ACTIVE = False
LOGS = []

# --- 2. CORE INTELLIGENCE ENGINE ---

def log(message):
    """Adds a timestamped message to the system log."""
    timestamp = datetime.now().strftime("%H:%M:%S")
    entry = f"[{timestamp}] {message}"
    LOGS.insert(0, entry)
    return "\n".join(LOGS)

def list_files():
    """Scans the current directory for relevant files."""
    files = [f for f in os.listdir('.') if os.path.isfile(f) and f.endswith(('.html', '.css', '.js', '.py', '.md'))]
    return files

def read_file_content(filename):
    """Reads a file safely."""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"Error reading file: {str(e)}"

def write_file_content(filename, content):
    """Writes content to a file safely."""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    except:
        return False

def ai_engineer(prompt, context=""):
    """Sends a request to the Neural Core."""
    try:
        full_prompt = f"""
        You are Vexel Architect, a high-level software engineer.
        Your goal is to write perfect, production-ready code.
        
        CONTEXT:
        {context}
        
        TASK:
        {prompt}
        
        OUTPUT RULES:
        1. Return ONLY the code. No markdown blocks (```), no explanations.
        2. If editing a file, return the FULL file content, not just the diff.
        3. Optimize for speed and modern best practices.
        """
        response = model.generate_content(full_prompt)
        clean_code = response.text.replace("```html", "").replace("```python", "").replace("```", "").strip()
        return clean_code
    except Exception as e:
        return f"// AI ERROR: {str(e)}"

# --- 3. AGENT FUNCTIONS ---

def tool_builder(tool_name, complexity):
    """Generates a new AI Tool file."""
    log(f"Initializing fabrication: {tool_name} ({complexity})...")
    
    prompt = f"Create a single-file HTML/JS/Tailwind tool for: '{tool_name}'. It should be modern, dark-themed (Vexel style: #020305 background, #FBC02D accent), and fully functional. Use pure JS, no external framework builds."
    
    code = ai_engineer(prompt)
    
    filename = f"tools/{tool_name.lower().replace(' ', '_')}.html"
    os.makedirs("tools", exist_ok=True)
    write_file_content(filename, code)
    
    log(f"SUCCESS: Tool built at {filename}")
    return f"Tool generated successfully!\nSaved to: {filename}\n\nPREVIEW CODE:\n{code[:500]}..."

def fix_file(filename, issue_desc):
    """Fixes a specific file based on user input."""
    content = read_file_content(filename)
    log(f"Analyzing {filename} for issues: {issue_desc}...")
    
    prompt = f"Fix the following issue in the code provided below: '{issue_desc}'. Return the full corrected code."
    new_content = ai_engineer(prompt, context=content)
    
    write_file_content(filename, new_content)
    log(f"PATCH APPLIED: {filename} updated.")
    return f"File {filename} updated successfully."

def sentinel_loop():
    """Background thread that continuously optimizes code."""
    global SENTINEL_ACTIVE
    target_file = "index.html"
    
    while SENTINEL_ACTIVE:
        log(f"SENTINEL: Scanning {target_file} for optimizations...")
        content = read_file_content(target_file)
        
        # Sentinel Logic: Find 1 improvement
        prompt = "Identify ONE distinct improvement (SEO, Performance, or Accessibility) for this code and implement it. Return full code."
        optimized_code = ai_engineer(prompt, context=content)
        
        if len(optimized_code) > len(content) * 0.5: # Safety check to ensure code wasn't deleted
            write_file_content(target_file, optimized_code)
            log(f"SENTINEL: Optimization applied to {target_file}.")
        else:
            log("SENTINEL: AI returned invalid code. Skipping cycle.")
            
        time.sleep(30) # Wait 30 seconds before next scan

def toggle_sentinel(active):
    global SENTINEL_ACTIVE
    if active and not SENTINEL_ACTIVE:
        SENTINEL_ACTIVE = True
        threading.Thread(target=sentinel_loop, daemon=True).start()
        return "SENTINEL ACTIVE: Continuous optimization engaged."
    elif not active:
        SENTINEL_ACTIVE = False
        return "SENTINEL STANDBY: Automated systems paused."
    return "Status unchanged."

# --- 4. THE VEXEL UI (Custom CSS) ---

vexel_css = """
body { background-color: #020305; color: #e2e8f0; font-family: 'Courier New', monospace; }
.gradio-container { background-color: #020305 !important; border: 1px solid #111625; }
.header-text { color: #FBC02D; font-weight: bold; letter-spacing: 2px; }
button.primary { background-color: #FBC02D !important; color: #000 !important; font-weight: bold; border: none; }
button.secondary { background-color: #111625 !important; color: #fff !important; border: 1px solid #333; }
.textbox textarea { background-color: #0b0f19 !important; color: #fff !important; border: 1px solid #333 !important; }
.panel { background-color: #0b0f19; border-radius: 8px; padding: 15px; border: 1px solid #111625; }
"""

# --- 5. GRADIO INTERFACE ---

with gr.Blocks(css=vexel_css, title="VEXEL ARCHITECT") as app:
    
    # Header
    with gr.Row():
        with gr.Column():
            gr.Markdown("# ⚡ VEXEL ARCHITECT // SYSTEM CORE")
            gr.Markdown(f"**Status:** {AI_STATUS} | **Location:** Nottingham, UK | **Mode:** GOD")
    
    # Main Dashboard
    with gr.Tabs():
        
        # Tab 1: Builder (Create New Tools)
        with gr.TabItem("🛠️ Tool Fabricator"):
            with gr.Row():
                with gr.Column(scale=2):
                    tool_name_input = gr.Textbox(label="Tool Name", placeholder="e.g. Mortgage Calculator")
                    complexity_input = gr.Radio(["Low (Single Script)", "Medium (Tailwind UI)", "High (Full App)"], label="Complexity Level", value="Medium (Tailwind UI)")
                    build_btn = gr.Button("INITIATE FABRICATION", elem_classes="primary")
                with gr.Column(scale=3):
                    build_output = gr.Code(label="Fabrication Output", language="html")
            
            build_btn.click(tool_builder, inputs=[tool_name_input, complexity_input], outputs=[build_output])

        # Tab 2: Repair (Fix Existing Code)
        with gr.TabItem("🔧 Code Repair"):
            with gr.Row():
                file_dropdown = gr.Dropdown(label="Select File", choices=list_files(), value="index.html")
                refresh_btn = gr.Button("Refresh File List", size="sm")
            
            issue_input = gr.Textbox(label="Describe Issue / Request", placeholder="e.g. Fix the mobile menu z-index bug")
            fix_btn = gr.Button("EXECUTE PATCH", elem_classes="primary")
            fix_output = gr.Textbox(label="System Response")
            
            refresh_btn.click(lambda: gr.Dropdown(choices=list_files()), outputs=file_dropdown)
            fix_btn.click(fix_file, inputs=[file_dropdown, issue_input], outputs=fix_output)

        # Tab 3: Sentinel (Auto-Pilot)
        with gr.TabItem("🛡️ Sentinel Mode"):
            gr.Markdown("Sentinel is an autonomous agent that continuously scans 'index.html' for improvements.")
            with gr.Row():
                sentinel_toggle = gr.Checkbox(label="Activate Sentinel Loop (Auto-Fix every 30s)", value=False)
                sentinel_status = gr.Textbox(label="Status", value="STANDBY", interactive=False)
            
            sentinel_toggle.change(toggle_sentinel, inputs=[sentinel_toggle], outputs=[sentinel_status])

    # System Logs
    with gr.Row():
        log_display = gr.Textbox(label="System Logs", value="System initialized...", max_lines=10, elem_classes="panel")
    
    # Auto-refresh logs every 2 seconds
    app.load(lambda: "\n".join(LOGS), None, log_display, every=2)

if __name__ == "__main__":
    app.launch(inbrowser=True, quiet=True)