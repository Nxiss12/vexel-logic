import gradio as gr
import os
from openai import OpenAI
import google.generativeai as genai
import time

# --- CONFIGURATION ---
# 1. LOCAL AI (LM Studio / Ollama)
# Ensure LM Studio server is running on port 1234
LOCAL_CLIENT = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

# 2. GOOGLE GEMINI (Optional - Use environment variable for security)
import os as _os
GOOGLE_API_KEY = _os.getenv('GOOGLE_API_KEY', 'PASTE_YOUR_GOOGLE_API_KEY_HERE')
try:
    genai.configure(api_key=GOOGLE_API_KEY)
    GEMINI_AVAILABLE = True
except:
    GEMINI_AVAILABLE = False

# --- SYSTEM PROMPTS ---
SYSTEM_PROMPT = """
You are VEXEL PRIME, a Tier-1 Systems Architect AI running locally on secure infrastructure.
Your mission is to write production-grade code for the Vexel Logic platform.
You specialize in: Python, JavaScript, Supabase, Stripe, and Twilio Automation.
When asked to build a tool, provide the full file structure and code.
Do not be chatty. Be precise. Be an engineer.
"""

# --- LOGIC ENGINE ---
def generate_response(message, history, model_mode, temperature):
    """
    Routes the query to either the Local GPU Model or Google Gemini.
    """
    full_response = ""
    history = history or [] # Ensure history is a list
    
    # Context builder for OpenAI format (standard for Local LLMs)
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for user_msg, bot_msg in history:
        messages.append({"role": "user", "content": str(user_msg)})
        messages.append({"role": "assistant", "content": str(bot_msg)})
    messages.append({"role": "user", "content": str(message)})

    try:
        if model_mode == "Local GPU (RTX 3060 Ti)":
            # Connect to Local LM Studio
            stream = LOCAL_CLIENT.chat.completions.create(
                model="local-model", # LM Studio handles the model selection in its UI
                messages=messages,
                temperature=temperature,
                stream=True
            )
            for chunk in stream:
                if chunk.choices[0].delta.content is not None:
                    content = chunk.choices[0].delta.content
                    full_response += content
                    # Yield full history with new message appended for standard chatbot
                    yield history + [[message, full_response]]

        elif model_mode == "Google Gemini (Cloud)":
            if not GEMINI_AVAILABLE:
                yield history + [[message, "Error: Google API Key not configured in code."]]
                return
            
            model = genai.GenerativeModel('gemini-pro')
            # Gemini handles history differently, sending just the prompt for simplicity here
            response = model.generate_content(SYSTEM_PROMPT + "\n\nUser: " + message, stream=True)
            for chunk in response:
                full_response += chunk.text
                # Yield full history with new message appended
                yield history + [[message, full_response]]
                
    except Exception as e:
        error_msg = f"SYSTEM FAILURE: Connection to AI Engine failed.\nEnsure LM Studio Server is running for Local Mode.\nError: {str(e)}"
        yield history + [[message, error_msg]]

# --- UI THEME ---
custom_css = """
body { background-color: #020305; color: #e2e8f0; }
.gradio-container { font-family: 'Courier New', monospace; }
button.primary { background-color: #FBC02D !important; color: #000 !important; border: none; font-weight: bold; }
.chat-message { border: 1px solid #333; border-radius: 8px; margin-bottom: 10px; padding: 10px; }
"""

# --- THE INTERFACE ---
# Removed 'css' argument to fix TypeError and injected via gr.HTML
with gr.Blocks(title="VEXEL PRIME CONSOLE") as app:
    gr.HTML(f"<style>{custom_css}</style>")
    
    with gr.Row():
        gr.Markdown(
            """
            # ⚡ VEXEL PRIME // INFRASTRUCTURE ARCHITECT
            **System Status:** 🟢 ONLINE | **GPU:** RTX 3060 Ti Detected | **Mode:** Engineering
            """
        )
    
    with gr.Row():
        with gr.Column(scale=1):
            # Sidebar Controls
            gr.Markdown("### ⚙️ NEURAL CONFIG")
            model_selector = gr.Radio(
                ["Local GPU (RTX 3060 Ti)", "Google Gemini (Cloud)"], 
                label="Intelligence Source", 
                value="Local GPU (RTX 3060 Ti)"
            )
            temp_slider = gr.Slider(minimum=0.1, maximum=1.0, value=0.7, label="Creativity (Temperature)")
            
            gr.Markdown("### 🛠️ QUICK BUILD COMMANDS")
            btn_missed_call = gr.Button("Build: Missed Call Bot")
            btn_review_bot = gr.Button("Build: Review Engine")
            btn_inventory = gr.Button("Build: Inventory Sync")
            
            gr.Markdown("---")
            gr.Markdown("*Local model requires LM Studio server running on port 1234.*")

        with gr.Column(scale=4):
            # Chat Window - Removed 'type="messages"' to fix TypeError
            chatbot = gr.Chatbot(height=600, label="Terminal Output")
            msg_input = gr.Textbox(placeholder="Enter engineering command or tool requirement...", label="Command Line", autofocus=True)
            submit_btn = gr.Button("EXECUTE", elem_classes="primary")
            clear_btn = gr.Button("CLEAR TERMINAL")

    # --- EVENT HANDLERS ---
    
    # Chat Submission
    msg_input.submit(generate_response, [msg_input, chatbot, model_selector, temp_slider], chatbot)
    submit_btn.click(generate_response, [msg_input, chatbot, model_selector, temp_slider], chatbot)
    
    # Quick Build Buttons (Pre-filled prompts)
    def quick_prompt(btn_name):
        return f"Generate the full Python/Node.js code for the '{btn_name}' tool mentioned on the Vexel Logic website. Include necessary API connections."
    
    btn_missed_call.click(lambda: quick_prompt("Missed Call Bot"), None, msg_input)
    btn_review_bot.click(lambda: quick_prompt("Review Engine"), None, msg_input)
    btn_inventory.click(lambda: quick_prompt("Inventory Sync"), None, msg_input)
    
    clear_btn.click(lambda: None, None, chatbot, queue=False)

if __name__ == "__main__":
    app.launch(dark=True)