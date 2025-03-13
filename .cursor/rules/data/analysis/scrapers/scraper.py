import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.safari.options import Options as SafariOptions
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from urllib.parse import urljoin, urlparse
import json
import time
import os
from datetime import datetime
from tqdm import tqdm
import hashlib
import csv

class WebsiteScraper:
    def __init__(self, base_url, rate_limit=2):
        self.base_url = base_url
        self.visited_urls = set()
        self.site_content = {}
        self.navigation_structure = {}
        self.forms_data = []
        self.interactive_elements = []
        self.rate_limit = rate_limit
        self.last_request_time = 0
        
        # Create directories for saved content
        self.output_dir = 'scraped_data'
        self.images_dir = os.path.join(self.output_dir, 'images')
        self.analysis_dir = os.path.join(self.output_dir, 'analysis')
        os.makedirs(self.output_dir, exist_ok=True)
        os.makedirs(self.images_dir, exist_ok=True)
        os.makedirs(self.analysis_dir, exist_ok=True)
        
        # Setup Safari WebDriver
        try:
            print("Initializing Safari WebDriver...")
            self.driver = webdriver.Safari()
            self.driver.set_page_load_timeout(30)
            print("Safari WebDriver initialized successfully")
        except Exception as e:
            print(f"Error initializing Safari WebDriver: {str(e)}")
            raise
    
    def is_valid_url(self, url):
        """Check if URL belongs to the same domain"""
        try:
            return urlparse(self.base_url).netloc == urlparse(url).netloc
        except:
            return False
    
    def download_image(self, img_url):
        """Download and save an image, return local path"""
        if not img_url:
            return None
            
        try:
            # Make URL absolute if it's relative
            img_url = urljoin(self.base_url, img_url)
            
            # Generate filename from URL
            img_hash = hashlib.md5(img_url.encode()).hexdigest()
            ext = os.path.splitext(urlparse(img_url).path)[1] or '.jpg'
            filename = f"{img_hash}{ext}"
            local_path = os.path.join(self.images_dir, filename)
            
            # Skip if already downloaded
            if os.path.exists(local_path):
                return local_path
            
            # Download image
            response = requests.get(img_url, stream=True)
            if response.status_code == 200:
                with open(local_path, 'wb') as f:
                    for chunk in response.iter_content(1024):
                        f.write(chunk)
                return local_path
                
        except Exception as e:
            print(f"Error downloading image {img_url}: {str(e)}")
        return None
    
    def rate_limit_wait(self):
        """Implement rate limiting between requests"""
        elapsed = time.time() - self.last_request_time
        if elapsed < self.rate_limit:
            time.sleep(self.rate_limit - elapsed)
        self.last_request_time = time.time()
    
    def get_page_content(self, url):
        """Extract content from a single page"""
        self.rate_limit_wait()
        
        try:
            self.driver.get(url)
            
            # Wait for the page to load
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            
            # Let JavaScript execute
            time.sleep(2)
            
            soup = BeautifulSoup(self.driver.page_source, 'html.parser')
            
            # Extract navigation menu structure
            nav_elements = soup.find_all(['nav', 'header', 'menu'])
            navigation = []
            for nav in nav_elements:
                nav_items = nav.find_all('a')
                navigation.extend([{
                    'text': a.text.strip(),
                    'href': a.get('href', ''),
                    'class': a.get('class', []),
                    'id': a.get('id', '')
                } for a in nav_items])
            
            # Extract forms and their fields
            forms = []
            for form in soup.find_all('form'):
                form_data = {
                    'action': form.get('action', ''),
                    'method': form.get('method', ''),
                    'id': form.get('id', ''),
                    'class': form.get('class', []),
                    'fields': []
                }
                
                for field in form.find_all(['input', 'select', 'textarea']):
                    field_data = {
                        'type': field.get('type', 'text'),
                        'name': field.get('name', ''),
                        'id': field.get('id', ''),
                        'placeholder': field.get('placeholder', ''),
                        'required': field.has_attr('required')
                    }
                    form_data['fields'].append(field_data)
                
                forms.append(form_data)
            
            # Extract interactive elements
            interactive = []
            for elem in soup.find_all(['button', 'a', 'select', 'input']):
                if elem.name != 'a' or (elem.get('href', '').startswith('#') or 'javascript:' in elem.get('href', '')):
                    interactive.append({
                        'type': elem.name,
                        'text': elem.text.strip(),
                        'id': elem.get('id', ''),
                        'class': elem.get('class', []),
                        'data_attributes': {k: v for k, v in elem.attrs.items() if k.startswith('data-')}
                    })
            
            # Download images and store local paths
            images = []
            for img in soup.find_all('img', src=True):
                src = img.get('src', '')
                if src:
                    local_path = self.download_image(src)
                    if local_path:
                        images.append({
                            'original_src': src,
                            'local_path': local_path,
                            'alt_text': img.get('alt', ''),
                            'dimensions': {
                                'width': img.get('width', ''),
                                'height': img.get('height', '')
                            },
                            'class': img.get('class', [])
                        })
            
            # Extract meta information and content
            meta_tags = {}
            for meta in soup.find_all('meta'):
                name = meta.get('name', meta.get('property', ''))
                if name:
                    meta_tags[name] = meta.get('content', '')
            
            # Extract video content
            videos = self._extract_video_content(soup)
            
            content = {
                'url': url,
                'title': soup.title.string if soup.title else '',
                'meta_tags': meta_tags,
                'navigation': navigation,
                'forms': forms,
                'interactive_elements': interactive,
                'headings': [{'level': h.name, 'text': h.text.strip()} for h in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])],
                'paragraphs': [p.text.strip() for p in soup.find_all('p')],
                'links': [{'text': a.text.strip(), 'href': a.get('href', '')} for a in soup.find_all('a', href=True)],
                'images': images,
                'videos': videos,
                'classes_used': list(set([cls for tag in soup.find_all() for cls in tag.get('class', [])])),
                'scraped_at': datetime.now().isoformat()
            }
            
            return content
            
        except TimeoutException:
            print(f"Timeout while loading {url}")
            return None
        except Exception as e:
            print(f"Error scraping {url}: {str(e)}")
            return None
    
    def _extract_video_content(self, soup):
        """Extract video content from the page"""
        videos = []
        
        # Find YouTube iframes
        youtube_videos = soup.find_all('iframe', src=lambda x: x and ('youtube.com' in x or 'youtu.be' in x))
        for video in youtube_videos:
            videos.append({
                'type': 'youtube',
                'src': video.get('src', ''),
                'title': video.get('title', '')
            })
        
        # Find Vimeo iframes
        vimeo_videos = soup.find_all('iframe', src=lambda x: x and 'vimeo.com' in x)
        for video in vimeo_videos:
            videos.append({
                'type': 'vimeo',
                'src': video.get('src', ''),
                'title': video.get('title', '')
            })
        
        # Find Facebook video embeds
        facebook_videos = soup.find_all(['div', 'iframe'], class_=lambda x: x and 'fb-video' in x)
        facebook_videos.extend(soup.find_all('div', {'data-href': lambda x: x and 'facebook.com/video' in x}))
        for video in facebook_videos:
            videos.append({
                'type': 'facebook',
                'src': video.get('data-href', ''),
                'title': video.get('data-title', '')
            })
        
        # Find HTML5 video elements
        html5_videos = soup.find_all('video')
        for video in html5_videos:
            sources = video.find_all('source')
            video_sources = [source.get('src', '') for source in sources]
            videos.append({
                'type': 'html5',
                'sources': video_sources,
                'title': video.get('title', '')
            })
        
        # Find video links
        video_links = soup.find_all('a', href=lambda x: x and any(v in x.lower() for v in [
            'youtube.com/watch', 'youtu.be', 'vimeo.com', 'facebook.com/video',
            '.mp4', '.webm', '.ogg', 'watch?v='
        ]))
        for link in video_links:
            videos.append({
                'type': 'link',
                'url': link.get('href', ''),
                'text': link.get_text(strip=True)
            })
        
        return videos
    
    def scrape_website(self):
        """Main scraping function"""
        urls_to_visit = [self.base_url]
        
        with tqdm(desc="Scraping pages", unit="page") as pbar:
            while urls_to_visit:
                current_url = urls_to_visit.pop(0)
                
                if current_url in self.visited_urls:
                    continue
                    
                print(f"\nScraping: {current_url}")
                
                content = self.get_page_content(current_url)
                if content:
                    self.site_content[current_url] = content
                    self.visited_urls.add(current_url)
                    
                    # Add new URLs to visit
                    for link in content['links']:
                        href = link.get('href', '')
                        if href:  # Skip empty links
                            try:
                                absolute_url = urljoin(self.base_url, href)
                                if self.is_valid_url(absolute_url) and absolute_url not in self.visited_urls:
                                    urls_to_visit.append(absolute_url)
                            except Exception as e:
                                print(f"Error processing link {href}: {str(e)}")
                
                pbar.update(1)
                pbar.set_postfix({"Queue": len(urls_to_visit), "Visited": len(self.visited_urls)})
    
    def save_content(self):
        """Save scraped content and analysis"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        
        # Save full content
        content_file = os.path.join(self.output_dir, f'site_content_{timestamp}.json')
        with open(content_file, 'w', encoding='utf-8') as f:
            json.dump(self.site_content, f, indent=2, ensure_ascii=False)
        
        # Generate and save sitemap
        sitemap = {url: {
            'title': content['title'],
            'headings': content['headings'],
            'forms_count': len(content['forms']),
            'interactive_elements_count': len(content['interactive_elements']),
            'image_count': len(content['images']),
            'scraped_at': content['scraped_at']
        } for url, content in self.site_content.items()}
        
        sitemap_file = os.path.join(self.output_dir, f'sitemap_{timestamp}.json')
        with open(sitemap_file, 'w', encoding='utf-8') as f:
            json.dump(sitemap, f, indent=2, ensure_ascii=False)
        
        # Generate UX analysis files
        self._save_ux_analysis(timestamp)
        
        print(f"\nScraped content saved to: {content_file}")
        print(f"Sitemap saved to: {sitemap_file}")
        print(f"UX analysis saved in: {self.analysis_dir}")
    
    def _save_ux_analysis(self, timestamp):
        """Save UX-specific analysis files"""
        # Navigation structure analysis
        nav_file = os.path.join(self.analysis_dir, f'navigation_analysis_{timestamp}.json')
        nav_structure = {}
        for url, content in self.site_content.items():
            nav_structure[url] = {
                'in_main_nav': any(nav['href'] == url for nav in content['navigation']),
                'incoming_links': [link['href'] for page in self.site_content.values() 
                                 for link in page['links'] if link['href'] == url],
                'outgoing_links': [link['href'] for link in content['links']]
            }
        
        with open(nav_file, 'w', encoding='utf-8') as f:
            json.dump(nav_structure, f, indent=2, ensure_ascii=False)
        
        # Forms analysis
        forms_file = os.path.join(self.analysis_dir, f'forms_analysis_{timestamp}.csv')
        with open(forms_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(['Page URL', 'Form Action', 'Method', 'Field Count', 'Required Fields'])
            for url, content in self.site_content.items():
                for form in content['forms']:
                    writer.writerow([
                        url,
                        form['action'],
                        form['method'],
                        len(form['fields']),
                        sum(1 for field in form['fields'] if field['required'])
                    ])
        
        # Content type distribution
        content_dist_file = os.path.join(self.analysis_dir, f'content_distribution_{timestamp}.json')
        content_dist = {}
        for url, content in self.site_content.items():
            content_dist[url] = {
                'heading_count': len(content['headings']),
                'paragraph_count': len(content['paragraphs']),
                'image_count': len(content['images']),
                'interactive_element_count': len(content['interactive_elements']),
                'form_count': len(content['forms']),
                'classes_used': content['classes_used']
            }
        
        with open(content_dist_file, 'w', encoding='utf-8') as f:
            json.dump(content_dist, f, indent=2, ensure_ascii=False)
    
    def cleanup(self):
        """Close the browser"""
        if hasattr(self, 'driver'):
            self.driver.quit()

def main():
    base_url = "https://umiwellnesscenter.com"
    scraper = WebsiteScraper(base_url)
    
    try:
        scraper.scrape_website()
        scraper.save_content()
    except KeyboardInterrupt:
        print("\nScraping interrupted by user. Saving partial results...")
        scraper.save_content()
    finally:
        scraper.cleanup()

if __name__ == "__main__":
    main() 