import json
import os
from datetime import datetime

# Read the extracted content
json_file = r"C:\Users\Nxiss\OneDrive\Desktop\University of Nottingham first semester\extracted_content.json"
output_folder = r"C:\Users\Nxiss\OneDrive\Desktop\VexelLogic\programming and algorithms notes"

with open(json_file, 'r', encoding='utf-8') as f:
    all_content = json.load(f)

# Define topic groupings
topic_structure = {
    "01_Module_Overview_and_Setup": [
        "comp1005-01-module_introduction.pdf"
    ],
    "02_Programming_Fundamentals": [
        "comp1005-02-programming_concepts.pdf",
        "comp1005-03-c_basics.pdf"
    ],
    "03_Functions": [
        "comp1005-04-introduction_functions.pdf",
        "comp1005-07-functions_revisited.pdf",
        "comp1005-13-pointers_functions.pdf"
    ],
    "04_Variables_and_Types": [
        "comp1005-05-introduction_variables.pdf",
        "comp1005-06-variable_concepts.pdf",
        "comp1005-21-user_defined_data_types.pdf",
        "comp1005-22-composite_data_types.pdf"
    ],
    "05_Operators_and_Expressions": [
        "comp1005-08-operators.pdf"
    ],
    "06_Control_Structures": [
        "comp1005-09-conditionals.pdf",
        "comp1005-10-loops.pdf"
    ],
    "07_Arrays_and_Pointers": [
        "comp1005-11-arrays.pdf",
        "comp1005-12-pointers.pdf",
        "comp1005-15-arrays_pointers.pdf"
    ],
    "08_Strings": [
        "comp1005-14-strings.pdf"
    ],
    "09_Memory_Management": [
        "comp1005-17-dynamic_memory_allocation.pdf"
    ],
    "10_Input_Output": [
        "comp1005-16-main.pdf",
        "comp1005-19-keyboard_input.pdf",
        "comp1005-20-file_io.pdf"
    ],
    "11_Compilation_and_Libraries": [
        "comp1005-18-compilation.pdf",
        "comp1005-23-libraries.pdf"
    ],
    "12_Data_Structures": [
        "comp1005-24-linked_lists.pdf"
    ],
    "13_Algorithms": [
        "comp1005-25-sorting.pdf",
        "comp1005-28-searching.pdf",
        "comp1005-27-recursion.pdf",
        "comp1005-26-expression_parsing.pdf"
    ]
}

def clean_text(text):
    """Clean up extracted text"""
    # Remove excessive newlines
    text = ' '.join(text.split())
    # Fix common OCR issues
    text = text.replace('\u000f', '•')
    text = text.replace('\f', ' ')
    return text

def generate_notes_for_topic(topic_name, pdf_files):
    """Generate comprehensive notes for a topic"""
    notes = f"# {topic_name.replace('_', ' ').title()}\n\n"
    notes += f"*Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}*\n\n"
    notes += "---\n\n"
    
    for pdf_file in pdf_files:
        if pdf_file not in all_content:
            continue
            
        content = all_content[pdf_file]
        notes += f"## {pdf_file.replace('comp1005-', '').replace('.pdf', '').replace('_', ' ').title()}\n\n"
        notes += f"**Source:** {pdf_file} ({content['num_pages']} pages)\n\n"
        
        # Extract and organize content from each page
        for page in content['pages']:
            text = clean_text(page['text'])
            
            # Skip if page is too short (likely just a title page)
            if len(text) < 20:
                continue
                
            # Add page content with proper formatting
            if text and not text.startswith('COMP1005'):
                notes += f"{text}\n\n"
        
        notes += "\n---\n\n"
    
    return notes

# Generate notes for each topic
print("Generating comprehensive notes...\n")

for topic, pdfs in topic_structure.items():
    print(f"Processing: {topic}")
    notes = generate_notes_for_topic(topic, pdfs)
    
    # Save to file
    output_file = os.path.join(output_folder, f"{topic}.md")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(notes)
    
    print(f"  ✓ Saved: {topic}.md")

# Generate master index file
print("\nGenerating master index...")
index = "# COMP1005 Programming and Algorithms - Complete Notes\n\n"
index += f"*Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}*\n\n"
index += "**University of Nottingham - First Semester**\n\n"
index += "---\n\n"
index += "## Table of Contents\n\n"

for i, (topic, pdfs) in enumerate(topic_structure.items(), 1):
    topic_name = topic.replace('_', ' ').title()
    index += f"{i}. [{topic_name}]({topic}.md)\n"
    for pdf in pdfs:
        pdf_name = pdf.replace('comp1005-', '').replace('.pdf', '').replace('_', ' ').title()
        index += f"   - {pdf_name}\n"
    index += "\n"

index += "\n---\n\n"
index += "## Module Information\n\n"
index += "- **Course Code:** COMP1005\n"
index += "- **Module:** Programming and Algorithms\n"
index += "- **Language:** C Programming\n"
index += "- **Total Lectures:** 28\n"
index += "- **Total Pages:** 455\n\n"
index += "## Assessment\n\n"
index += "- **Coursework:** 75% (70% programming + 5% quizzes)\n"
index += "- **Exam:** 25% (1 hour, January 2026)\n\n"
index += "## Key Resources\n\n"
index += "- **Essential Book:** The C Programming Language (K&R)\n"
index += "- **Moodle:** Programming and Algorithms (COMP1005 UNUK)\n"
index += "- **GitLab:** projects.cs.nott.ac.uk\n"
index += "- **Lecturers:** Dr. Jamie Twycross, Dr. Valerio Giuffrida\n\n"

index_file = os.path.join(output_folder, "00_INDEX_README.md")
with open(index_file, 'w', encoding='utf-8') as f:
    f.write(index)

print(f"  ✓ Saved: 00_INDEX_README.md")
print(f"\n✓ All notes generated successfully!")
print(f"📁 Location: {output_folder}")

