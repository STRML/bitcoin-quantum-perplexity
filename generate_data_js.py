#!/usr/bin/env python3
"""Regenerate data.js from the markdown corpus."""
import os
import json

# Paths are relative to this script's location
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CORPUS_DIR = SCRIPT_DIR
OUTPUT_FILE = os.path.join(SCRIPT_DIR, "docs", "data.js")

def get_all_md_files(base_dir):
    """Walk the corpus and return all .md files with their relative paths."""
    md_files = []
    for root, dirs, files in os.walk(base_dir):
        # Skip non-corpus directories
        dirs[:] = [d for d in sorted(dirs) if d not in ('.git', 'docs', 'skills', '__pycache__')]
        for f in sorted(files):
            if f.endswith('.md') and f != 'README.md':
                full_path = os.path.join(root, f)
                rel_path = os.path.relpath(full_path, base_dir)
                md_files.append((rel_path, full_path))
    return md_files

def build_corpus_object(md_files):
    """Build the CORPUS JS object from markdown files."""
    entries = []
    for rel_path, full_path in md_files:
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        # Convert path to route key: remove .md extension
        route_key = rel_path.replace('.md', '')
        # Escape for JS string
        js_content = json.dumps(content)
        entries.append(f'  "{route_key}": {js_content}')
    return entries

def main():
    md_files = get_all_md_files(CORPUS_DIR)
    print(f"Found {len(md_files)} markdown files")
    
    entries = build_corpus_object(md_files)
    
    js_output = "const CORPUS = {\n" + ",\n".join(entries) + "\n};\n"
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(js_output)
    
    file_size = os.path.getsize(OUTPUT_FILE)
    print(f"Generated {OUTPUT_FILE} ({file_size:,} bytes, {len(entries)} entries)")

if __name__ == '__main__':
    main()
