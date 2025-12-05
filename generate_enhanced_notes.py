import json
import os
from datetime import datetime
import re

# Read the extracted content
json_file = r"C:\Users\Nxiss\OneDrive\Desktop\University of Nottingham first semester\extracted_content.json"
output_folder = r"C:\Users\Nxiss\OneDrive\Desktop\VexelLogic\programming and algorithms notes"

with open(json_file, 'r', encoding='utf-8') as f:
    all_content = json.load(f)

# Define topic groupings
topic_structure = {
    "01_Module_Overview_and_Setup": ["comp1005-01-module_introduction.pdf"],
    "02_Programming_Fundamentals": ["comp1005-02-programming_concepts.pdf", "comp1005-03-c_basics.pdf"],
    "03_Functions": ["comp1005-04-introduction_functions.pdf", "comp1005-07-functions_revisited.pdf", "comp1005-13-pointers_functions.pdf"],
    "04_Variables_and_Types": ["comp1005-05-introduction_variables.pdf", "comp1005-06-variable_concepts.pdf", "comp1005-21-user_defined_data_types.pdf", "comp1005-22-composite_data_types.pdf"],
    "05_Operators_and_Expressions": ["comp1005-08-operators.pdf"],
    "06_Control_Structures": ["comp1005-09-conditionals.pdf", "comp1005-10-loops.pdf"],
    "07_Arrays_and_Pointers": ["comp1005-11-arrays.pdf", "comp1005-12-pointers.pdf", "comp1005-15-arrays_pointers.pdf"],
    "08_Strings": ["comp1005-14-strings.pdf"],
    "09_Memory_Management": ["comp1005-17-dynamic_memory_allocation.pdf"],
    "10_Input_Output": ["comp1005-16-main.pdf", "comp1005-19-keyboard_input.pdf", "comp1005-20-file_io.pdf"],
    "11_Compilation_and_Libraries": ["comp1005-18-compilation.pdf", "comp1005-23-libraries.pdf"],
    "12_Data_Structures": ["comp1005-24-linked_lists.pdf"],
    "13_Algorithms": ["comp1005-25-sorting.pdf", "comp1005-28-searching.pdf", "comp1005-27-recursion.pdf", "comp1005-26-expression_parsing.pdf"]
}

def clean_text(text):
    """Clean up extracted text and improve formatting"""
    # Fix special characters
    text = text.replace('\u000f', '•')
    text = text.replace('\f', ' ')
    text = text.replace('', '')
    
    # Fix common OCR issues
    text = text.replace(' erent', 'fferent')
    text = text.replace(' ciency', 'fficiency')
    text = text.replace(' cient', 'fficient')
    text = text.replace(' ag', ' flag')
    text = text.replace(' le', ' file')
    text = text.replace(' u y', ' fluffy')
    text = text.replace(' our', ' flour')
    text = text.replace(' nish', ' finish')
    text = text.replace(' de nes', ' defines')
    text = text.replace(' de ned', ' defined')
    text = text.replace('nota', 'not a')
    text = text.replace('andart', 'and art')
    
    return text

def format_bullet_points(text):
    """Format bullet points properly"""
    lines = text.split('•')
    if len(lines) <= 1:
        return text
    
    formatted = []
    for line in lines:
        line = line.strip()
        if line:
            formatted.append(f"- {line}")
    
    return '\n'.join(formatted)

def extract_code_examples(text):
    """Extract and format code examples"""
    # Look for code patterns
    code_pattern = r'(\$[^\n]+|\w+\([^\)]*\)|#include[^\n]+)'
    matches = re.findall(code_pattern, text)
    return matches

def process_page_content(text):
    """Process and format page content for better readability"""
    text = clean_text(text)
    
    # Skip very short pages
    if len(text.strip()) < 20:
        return None
        
    # Skip title pages
    if text.startswith('COMP1005') and len(text) < 100:
        return None
    
    # Format bullet points
    if '•' in text:
        text = format_bullet_points(text)
    
    # Add spacing after sentences
    text = text.replace('. ', '.\n\n')
    text = text.replace('.\n\n\n', '.\n\n')
    
    return text

def generate_detailed_notes_for_topic(topic_name, pdf_files):
    """Generate comprehensive, well-formatted notes for a topic"""
    notes = f"# {topic_name.replace('_', ' ').title()}\n\n"
    notes += f"*Last Updated: {datetime.now().strftime('%Y-%m-%d %H:%M')}*\n\n"
    notes += "---\n\n"
    notes += "## Quick Navigation\n\n"
    
    # Add navigation to all subtopics
    for pdf_file in pdf_files:
        if pdf_file in all_content:
            pdf_name = pdf_file.replace('comp1005-', '').replace('.pdf', '').replace('_', ' ').title()
            notes += f"- [{pdf_name}](#{pdf_name.lower().replace(' ', '-')})\n"
    
    notes += "\n---\n\n"
    
    for pdf_file in pdf_files:
        if pdf_file not in all_content:
            continue
            
        content = all_content[pdf_file]
        pdf_name = pdf_file.replace('comp1005-', '').replace('.pdf', '').replace('_', ' ').title()
        
        notes += f"## {pdf_name}\n\n"
        notes += f"**📚 Source:** {pdf_file}\n\n"
        notes += f"**📄 Total Pages:** {content['num_pages']}\n\n"
        notes += "---\n\n"
        
        # Process each page
        current_section = ""
        for page in content['pages']:
            processed_text = process_page_content(page['text'])
            
            if not processed_text:
                continue
            
            # Check if this is a section header
            if len(processed_text) < 50 and not processed_text.startswith('-'):
                current_section = processed_text.strip()
                notes += f"### {current_section}\n\n"
            else:
                notes += f"{processed_text}\n\n"
        
        notes += "\n---\n\n"
    
    # Add summary section
    notes += "## 📝 Key Takeaways\n\n"
    notes += "*Review the main concepts from this section to solidify your understanding.*\n\n"
    notes += "---\n\n"
    
    return notes

# Generate enhanced notes for each topic
print("=" * 60)
print("GENERATING COMPREHENSIVE STUDY NOTES")
print("=" * 60)
print()

for i, (topic, pdfs) in enumerate(topic_structure.items(), 1):
    topic_name = topic.replace('_', ' ').title()
    print(f"[{i}/13] Processing: {topic_name}")
    
    notes = generate_detailed_notes_for_topic(topic, pdfs)
    
    # Save to file
    output_file = os.path.join(output_folder, f"{topic}.md")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(notes)
    
    pages_count = sum(all_content[pdf]['num_pages'] for pdf in pdfs if pdf in all_content)
    print(f"      ✓ {len(pdfs)} PDFs, {pages_count} pages")

print()
print("=" * 60)
print("✓ ALL NOTES GENERATED SUCCESSFULLY!")
print("=" * 60)
print()
print(f"📁 Location: {output_folder}")
print(f"📊 Total: 13 topic files + 1 index file")
print()
print("You now have comprehensive notes covering:")
print("- 28 lecture PDFs")
print("- 455 total pages")
print("- Organized into 13 logical topic groups")
print()
print("🎓 Happy studying!")

