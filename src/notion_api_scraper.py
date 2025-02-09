import requests
from bs4 import BeautifulSoup
from markdownify import markdownify as md
import os
from datetime import datetime
import json
from urllib.parse import urljoin, urlparse
import time
import frontmatter
import yaml

class NotionAPIScraper:
    def __init__(self, base_url="https://developers.notion.com/docs", output_dir="docs/notion_api"):
        self.base_url = base_url
        self.output_dir = output_dir
        self.visited_urls = set()
        self.rate_limit = 2  # seconds between requests
        self.last_request_time = 0
        
        # Create output directory
        os.makedirs(output_dir, exist_ok=True)
        
    def rate_limit_wait(self):
        """Implement rate limiting between requests"""
        elapsed = time.time() - self.last_request_time
        if elapsed < self.rate_limit:
            time.sleep(self.rate_limit - elapsed)
        self.last_request_time = time.time()

    def clean_filename(self, title):
        """Convert title to valid filename"""
        invalid_chars = '<>:"/\\|?*'
        filename = ''.join(c for c in title if c not in invalid_chars)
        return filename.lower().replace(' ', '_') + '.md'

    def get_page_content(self, url):
        """Scrape a single documentation page and convert to markdown"""
        self.rate_limit_wait()
        
        try:
            response = requests.get(url)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find the main content area - adjust selector based on Notion's docs structure
            main_content = soup.find('main') or soup.find('article') or soup.find('div', class_='notion-docs')
            
            if not main_content:
                print(f"Could not find main content for {url}")
                return None
                
            # Extract title
            title = soup.find('h1')
            if title:
                title = title.text.strip()
            else:
                title = "Untitled Document"
            
            # Extract metadata
            meta_tags = {}
            for meta in soup.find_all('meta'):
                name = meta.get('name', meta.get('property', ''))
                if name:
                    meta_tags[name] = meta.get('content', '')
            
            # Convert HTML to Markdown
            markdown_content = md(str(main_content), heading_style="ATX")
            
            # Create metadata dictionary
            metadata = {
                'title': title,
                'url': url,
                'scraped_at': datetime.now().isoformat(),
                'meta_tags': meta_tags
            }
            
            return {
                'metadata': metadata,
                'content': markdown_content
            }
            
        except Exception as e:
            print(f"Error scraping {url}: {str(e)}")
            return None

    def save_content(self, content, filename):
        """Save the markdown content to a file"""
        if not content:
            return
            
        filepath = os.path.join(self.output_dir, filename)
        
        try:
            # Format the frontmatter and content
            frontmatter_content = yaml.dump(content['metadata'], default_flow_style=False)
            markdown_content = content['content']
            
            # Combine them with proper YAML frontmatter delimiters
            full_content = f"---\n{frontmatter_content}---\n\n{markdown_content}"
            
            # Write to file
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(full_content)
            print(f"Saved {filepath}")
        except Exception as e:
            print(f"Error saving {filepath}: {str(e)}")

    def scrape_docs(self, start_url=None):
        """Start scraping from the getting started page"""
        if not start_url:
            start_url = urljoin(self.base_url, "getting-started")
        
        if start_url in self.visited_urls:
            return
            
        self.visited_urls.add(start_url)
        
        # Get page content
        content = self.get_page_content(start_url)
        if content:
            filename = self.clean_filename(content['metadata']['title'])
            self.save_content(content, filename)
            
            # Find links to other documentation pages
            try:
                response = requests.get(start_url)
                soup = BeautifulSoup(response.text, 'html.parser')
                for link in soup.find_all('a', href=True):
                    href = link['href']
                    absolute_url = urljoin(start_url, href)
                    
                    # Only follow links within the documentation
                    if (absolute_url.startswith(self.base_url) and 
                        absolute_url not in self.visited_urls and
                        '/docs/' in absolute_url):
                        self.scrape_docs(absolute_url)
            except Exception as e:
                print(f"Error finding links in {start_url}: {str(e)}")

def main():
    scraper = NotionAPIScraper()
    scraper.scrape_docs("https://developers.notion.com/docs/getting-started")
    print("Documentation scraping completed!")

if __name__ == "__main__":
    main() 