import json
import os
from collections import defaultdict
import csv

def extract_website_structure(sitemap_file):
    """
    Extract and organize the website structure from a sitemap JSON file.
    
    Args:
        sitemap_file (str): Path to the sitemap JSON file
    
    Returns:
        dict: Organized website structure
    """
    # Load the sitemap JSON file
    with open(sitemap_file, 'r') as f:
        sitemap_data = json.load(f)
    
    # Create a dictionary to store the website structure
    website_structure = {
        'pages': [],
        'categories': defaultdict(list),
        'stats': {
            'total_pages': 0,
            'total_forms': 0,
            'total_interactive_elements': 0,
            'total_images': 0
        }
    }
    
    # Extract page information
    for url, page_data in sitemap_data.items():
        # Skip duplicate URLs (with trailing slash)
        if url.endswith('/') and url[:-1] in sitemap_data:
            continue
            
        # Extract page title and path
        title = page_data.get('title', '')
        path = url.replace('https://umiwellnesscenter.com', '')
        if not path:
            path = '/'
            
        # Extract headings
        headings = [h['text'] for h in page_data.get('headings', []) if h['text']]
        main_heading = headings[0] if headings else title
            
        # Extract stats
        forms_count = page_data.get('forms_count', 0)
        interactive_elements_count = page_data.get('interactive_elements_count', 0)
        image_count = page_data.get('image_count', 0)
        
        # Create page object
        page = {
            'url': url,
            'path': path,
            'title': title,
            'main_heading': main_heading,
            'headings': headings,
            'forms_count': forms_count,
            'interactive_elements_count': interactive_elements_count,
            'image_count': image_count
        }
        
        # Add page to the list
        website_structure['pages'].append(page)
        
        # Update stats
        website_structure['stats']['total_pages'] += 1
        website_structure['stats']['total_forms'] += forms_count
        website_structure['stats']['total_interactive_elements'] += interactive_elements_count
        website_structure['stats']['total_images'] += image_count
        
        # Categorize pages
        if path == '/':
            category = 'home'
        elif '/about' in path:
            category = 'about'
        elif '/how-umi-works' in path:
            category = 'how_it_works'
        elif '/faqs' in path:
            category = 'faqs'
        elif '/providers' in path or '/staff' in path or '/founders' in path:
            category = 'team'
        elif '/privacy' in path:
            category = 'legal'
        elif '/events' in path or '/calendar' in path:
            category = 'events'
        elif '/offerings' in path or '/classes' in path or '/moves' in path:
            category = 'services'
        elif '/community' in path:
            category = 'community'
        elif '/news' in path:
            category = 'news'
        elif '/contact' in path:
            category = 'contact'
        elif '/zebra' in path or '/roads' in path:
            category = 'resources'
        elif '/patient-advocacy' in path:
            category = 'advocacy'
        else:
            category = 'other'
            
        website_structure['categories'][category].append(page)
    
    return website_structure

def save_website_structure(website_structure, output_dir):
    """
    Save the website structure to various output files.
    
    Args:
        website_structure (dict): Organized website structure
        output_dir (str): Directory to save the output files
    """
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Save the full structure as JSON
    with open(os.path.join(output_dir, 'website_structure.json'), 'w') as f:
        json.dump(website_structure, f, indent=2)
    
    # Save the pages as CSV
    with open(os.path.join(output_dir, 'pages.csv'), 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['URL', 'Path', 'Title', 'Main Heading', 'Forms', 'Interactive Elements', 'Images'])
        for page in website_structure['pages']:
            writer.writerow([
                page['url'],
                page['path'],
                page['title'],
                page['main_heading'],
                page['forms_count'],
                page['interactive_elements_count'],
                page['image_count']
            ])
    
    # Save the categories as CSV
    with open(os.path.join(output_dir, 'categories.csv'), 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['Category', 'Page Count', 'Pages'])
        for category, pages in website_structure['categories'].items():
            writer.writerow([
                category,
                len(pages),
                ', '.join([page['path'] for page in pages])
            ])
    
    # Save the stats as JSON
    with open(os.path.join(output_dir, 'stats.json'), 'w') as f:
        json.dump(website_structure['stats'], f, indent=2)
    
    # Generate a markdown report
    with open(os.path.join(output_dir, 'website_structure_report.md'), 'w') as f:
        f.write('# UMI Wellness Center Website Structure Report\n\n')
        
        f.write('## Website Statistics\n\n')
        f.write(f"- Total Pages: {website_structure['stats']['total_pages']}\n")
        f.write(f"- Total Forms: {website_structure['stats']['total_forms']}\n")
        f.write(f"- Total Interactive Elements: {website_structure['stats']['total_interactive_elements']}\n")
        f.write(f"- Total Images: {website_structure['stats']['total_images']}\n\n")
        
        f.write('## Content Categories\n\n')
        for category, pages in sorted(website_structure['categories'].items(), key=lambda x: len(x[1]), reverse=True):
            f.write(f"### {category.replace('_', ' ').title()} ({len(pages)} pages)\n\n")
            for page in pages:
                f.write(f"- [{page['title']}]({page['url']})\n")
            f.write('\n')
        
        f.write('## Page Structure\n\n')
        for page in website_structure['pages']:
            f.write(f"### {page['title']}\n\n")
            f.write(f"- URL: {page['url']}\n")
            f.write(f"- Path: {page['path']}\n")
            f.write(f"- Main Heading: {page['main_heading']}\n")
            f.write(f"- Forms: {page['forms_count']}\n")
            f.write(f"- Interactive Elements: {page['interactive_elements_count']}\n")
            f.write(f"- Images: {page['image_count']}\n")
            
            if page['headings']:
                f.write('\n#### Headings\n\n')
                for heading in page['headings']:
                    if heading:
                        f.write(f"- {heading}\n")
            
            f.write('\n')

if __name__ == '__main__':
    # Define the input and output paths
    sitemap_file = 'data/scraping/sitemap_20250204_074235.json'
    output_dir = 'data/analysis/website_structure'
    
    # Extract and organize the website structure
    website_structure = extract_website_structure(sitemap_file)
    
    # Save the website structure to output files
    save_website_structure(website_structure, output_dir)
    
    print(f"Website structure extracted and saved to {output_dir}") 