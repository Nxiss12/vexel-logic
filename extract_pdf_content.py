import PyPDF2
import os
import json

# Path to the PDFs
pdf_folder = r"C:\Users\Nxiss\OneDrive\Desktop\University of Nottingham first semester"

# Get all PDF files
pdf_files = sorted([f for f in os.listdir(pdf_folder) if f.endswith('.pdf')])

# Dictionary to store all content
all_content = {}

print(f"Found {len(pdf_files)} PDF files")
print("Extracting content from PDFs...\n")

for pdf_file in pdf_files:
    pdf_path = os.path.join(pdf_folder, pdf_file)
    print(f"Processing: {pdf_file}")
    
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            num_pages = len(pdf_reader.pages)
            
            content = {
                'filename': pdf_file,
                'num_pages': num_pages,
                'pages': []
            }
            
            for page_num in range(num_pages):
                page = pdf_reader.pages[page_num]
                text = page.extract_text()
                content['pages'].append({
                    'page_number': page_num + 1,
                    'text': text
                })
            
            all_content[pdf_file] = content
            print(f"  ✓ Extracted {num_pages} pages")
            
    except Exception as e:
        print(f"  ✗ Error: {str(e)}")

# Save to JSON file
output_file = os.path.join(pdf_folder, "extracted_content.json")
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(all_content, f, indent=2, ensure_ascii=False)

print(f"\n✓ All content saved to: {output_file}")
print(f"Total PDFs processed: {len(all_content)}")


