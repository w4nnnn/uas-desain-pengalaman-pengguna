import re
import os

with open('Wireframe_HighFidelity/hasil_export_stitch.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# The file contains multiple HTML documents appended together.
# They are separated by comments like <!-- Title --> <!DOCTYPE html>
# Let's split by "<!DOCTYPE html>" and find the preceding comment for the name.

parts = content.split('<!DOCTYPE html>')
# parts[0] might contain the first comment.

html_docs = []
for i in range(1, len(parts)):
    html_content = '<!DOCTYPE html>\n' + parts[i]
    
    # Try to find the comment in the previous part
    prev_part = parts[i-1].strip()
    lines = prev_part.split('\n')
    name = f"page_{i}"
    if lines:
        last_line = lines[-1].strip()
        if last_line.startswith('<!--') and last_line.endswith('-->'):
            name = last_line.replace('<!--', '').replace('-->', '').strip()
            # Clean up the name for a filename
            name = re.sub(r'[^a-zA-Z0-9_\- ]', '', name).replace(' ', '_')
    
    html_docs.append((name, html_content))

for name, doc in html_docs:
    filename = f"{name}.html"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(doc)
    print(f"Saved {filename}")

