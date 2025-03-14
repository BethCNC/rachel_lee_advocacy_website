import requests
from bs4 import BeautifulSoup
from datetime import datetime
import os

def scrape_article(url):
    # Send a GET request to the URL
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()

    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')

    # Get the article title
    title = soup.find('h1')
    title_text = title.get_text() if title else "Notion Client Portals Article"

    # Initialize markdown content with the title
    markdown_content = f"# {title_text}\n\n"

    # Get the main content
    main_content = soup.find('main')
    if main_content:
        # Process headings
        for heading in main_content.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
            level = int(heading.name[1])  # Get the heading level from h1, h2, etc.
            markdown_content += f"{'#' * level} {heading.get_text().strip()}\n\n"

        # Process paragraphs
        for paragraph in main_content.find_all('p'):
            text = paragraph.get_text().strip()
            if text:  # Only add non-empty paragraphs
                markdown_content += f"{text}\n\n"

        # Process lists
        for ul in main_content.find_all('ul'):
            for li in ul.find_all('li'):
                markdown_content += f"* {li.get_text().strip()}\n"
            markdown_content += "\n"

    return markdown_content

def save_markdown(content):
    # Create docs directory if it doesn't exist
    os.makedirs('docs/scraped_articles', exist_ok=True)
    
    # Generate filename with timestamp
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f'docs/scraped_articles/notion_client_portals_{timestamp}.md'
    
    # Save the content
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return filename

def main():
    url = "https://matthiasfrank.de/client-portals-for-notion/"
    try:
        print("Starting to scrape the article...")
        content = scrape_article(url)
        filename = save_markdown(content)
        print(f"Successfully saved the article to: {filename}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main() 