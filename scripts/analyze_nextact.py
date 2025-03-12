#!/usr/bin/env python3
"""
Analyzer for Next Act Coaching website data
This script analyzes the scraped content from the Next Act Coaching website
to extract design patterns, content structure, and other useful information.
"""

import os
import json
import re
from collections import Counter, defaultdict

def load_data():
    """Load the scraped data"""
    try:
        with open('data/nextact/all_content.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print("Error: Scraped data not found. Run scrape_nextact.py first.")
        return None

def analyze_headings(data):
    """Analyze heading structure and patterns"""
    heading_analysis = {
        'count_by_level': defaultdict(int),
        'common_patterns': [],
        'heading_hierarchy': {},
    }
    
    all_headings = []
    
    # Collect all headings from all pages
    for page_name, page_data in data.items():
        headings = page_data.get('headings', [])
        for heading in headings:
            level = heading.get('level', '')
            text = heading.get('text', '')
            if level and text:
                heading_analysis['count_by_level'][level] += 1
                all_headings.append((level, text, page_name))
    
    # Analyze heading patterns
    heading_texts = [h[1].lower() for h in all_headings]
    common_patterns = Counter()
    
    # Look for common starting words
    starting_words = [text.split()[0] if text.split() else '' for text in heading_texts]
    common_patterns.update(starting_words)
    
    # Look for question patterns
    question_headings = [text for text in heading_texts if text.endswith('?')]
    if question_headings:
        heading_analysis['common_patterns'].append({
            'type': 'questions',
            'count': len(question_headings),
            'examples': question_headings[:5]
        })
    
    # Look for "How to" patterns
    how_to_headings = [text for text in heading_texts if text.startswith('how to')]
    if how_to_headings:
        heading_analysis['common_patterns'].append({
            'type': 'how_to',
            'count': len(how_to_headings),
            'examples': how_to_headings[:5]
        })
    
    # Analyze heading hierarchy by page
    for page_name, page_data in data.items():
        headings = page_data.get('headings', [])
        if headings:
            heading_analysis['heading_hierarchy'][page_name] = [
                {'level': h.get('level', ''), 'text': h.get('text', '')}
                for h in headings
            ]
    
    return heading_analysis

def analyze_paragraphs(data):
    """Analyze paragraph structure and patterns"""
    paragraph_analysis = {
        'avg_length': 0,
        'tone_indicators': {
            'personal': 0,
            'professional': 0,
            'question': 0,
            'call_to_action': 0,
        },
        'common_phrases': [],
    }
    
    all_paragraphs = []
    total_length = 0
    
    # Collect all paragraphs from all pages
    for page_name, page_data in data.items():
        paragraphs = page_data.get('paragraphs', [])
        all_paragraphs.extend(paragraphs)
    
    if not all_paragraphs:
        return paragraph_analysis
    
    # Calculate average length
    for p in all_paragraphs:
        total_length += len(p.split())
    
    paragraph_analysis['avg_length'] = total_length / len(all_paragraphs) if all_paragraphs else 0
    
    # Analyze tone
    for p in all_paragraphs:
        p_lower = p.lower()
        # Personal tone indicators
        if re.search(r'\b(i|we|our|us|my)\b', p_lower):
            paragraph_analysis['tone_indicators']['personal'] += 1
        
        # Professional tone indicators
        if re.search(r'\b(professional|expertise|experience|qualified|certified)\b', p_lower):
            paragraph_analysis['tone_indicators']['professional'] += 1
        
        # Questions
        if '?' in p:
            paragraph_analysis['tone_indicators']['question'] += 1
        
        # Call to action
        if re.search(r'\b(contact|call|email|book|schedule|learn more|sign up|join)\b', p_lower):
            paragraph_analysis['tone_indicators']['call_to_action'] += 1
    
    # Find common phrases (3-grams)
    phrase_counter = Counter()
    for p in all_paragraphs:
        words = p.lower().split()
        for i in range(len(words) - 2):
            phrase = ' '.join(words[i:i+3])
            phrase_counter[phrase] += 1
    
    paragraph_analysis['common_phrases'] = [
        {'phrase': phrase, 'count': count}
        for phrase, count in phrase_counter.most_common(10)
        if count > 1  # Only include phrases that appear more than once
    ]
    
    return paragraph_analysis

def analyze_services(data):
    """Analyze service structure and presentation"""
    service_analysis = {
        'count': 0,
        'structure': {},
        'common_elements': [],
    }
    
    all_services = []
    
    # Collect all services from all pages
    for page_name, page_data in data.items():
        services = page_data.get('services', [])
        all_services.extend(services)
    
    service_analysis['count'] = len(all_services)
    
    if not all_services:
        return service_analysis
    
    # Analyze service structure
    service_elements = defaultdict(int)
    for service in all_services:
        for key in service.keys():
            service_elements[key] += 1
    
    service_analysis['structure'] = dict(service_elements)
    
    # Find common elements in service descriptions
    description_phrases = []
    for service in all_services:
        desc = service.get('description', '').lower()
        if desc:
            words = desc.split()
            for i in range(len(words) - 1):
                phrase = ' '.join(words[i:i+2])
                description_phrases.append(phrase)
    
    phrase_counter = Counter(description_phrases)
    service_analysis['common_elements'] = [
        {'phrase': phrase, 'count': count}
        for phrase, count in phrase_counter.most_common(10)
        if count > 1
    ]
    
    return service_analysis

def analyze_testimonials(data):
    """Analyze testimonial structure and patterns"""
    testimonial_analysis = {
        'count': 0,
        'avg_length': 0,
        'common_themes': [],
    }
    
    all_testimonials = []
    
    # Collect all testimonials from all pages
    for page_name, page_data in data.items():
        testimonials = page_data.get('testimonials', [])
        all_testimonials.extend(testimonials)
    
    testimonial_analysis['count'] = len(all_testimonials)
    
    if not all_testimonials:
        return testimonial_analysis
    
    # Calculate average length
    total_length = sum(len(t.split()) for t in all_testimonials)
    testimonial_analysis['avg_length'] = total_length / len(all_testimonials)
    
    # Analyze common themes
    theme_keywords = {
        'helpful': ['help', 'helpful', 'helped', 'support', 'supported'],
        'professional': ['professional', 'expert', 'expertise', 'knowledge', 'skilled'],
        'transformative': ['change', 'transform', 'growth', 'journey', 'breakthrough'],
        'recommend': ['recommend', 'recommendation', 'suggested', 'advice'],
        'grateful': ['thank', 'grateful', 'appreciate', 'thankful'],
    }
    
    theme_counts = defaultdict(int)
    
    for testimonial in all_testimonials:
        t_lower = testimonial.lower()
        for theme, keywords in theme_keywords.items():
            if any(keyword in t_lower for keyword in keywords):
                theme_counts[theme] += 1
    
    testimonial_analysis['common_themes'] = [
        {'theme': theme, 'count': count}
        for theme, count in theme_counts.items()
    ]
    
    return testimonial_analysis

def analyze_site_structure(data):
    """Analyze overall site structure"""
    structure_analysis = {
        'pages': [],
        'navigation': [],
        'common_sections': [],
    }
    
    # Analyze pages
    for page_name, page_data in data.items():
        structure_analysis['pages'].append({
            'name': page_name,
            'url': page_data.get('url', ''),
            'title': page_data.get('title', ''),
            'heading_count': len(page_data.get('headings', [])),
            'paragraph_count': len(page_data.get('paragraphs', [])),
        })
    
    # Extract navigation links (common across pages)
    nav_links = defaultdict(int)
    for page_name, page_data in data.items():
        links = page_data.get('links', [])
        for link in links:
            nav_links[link.get('text', '')] += 1
    
    # Links that appear on most pages are likely navigation
    page_count = len(data)
    threshold = max(2, page_count // 2)  # Links that appear on at least half the pages
    
    structure_analysis['navigation'] = [
        {'text': text, 'count': count}
        for text, count in nav_links.items()
        if count >= threshold
    ]
    
    # Identify common sections across pages
    section_patterns = [
        r'about',
        r'service',
        r'testimonial',
        r'contact',
        r'blog',
        r'resource',
        r'faq',
    ]
    
    for pattern in section_patterns:
        pattern_count = 0
        for page_name, page_data in data.items():
            headings = page_data.get('headings', [])
            for heading in headings:
                if re.search(pattern, heading.get('text', '').lower()):
                    pattern_count += 1
                    break
        
        if pattern_count > 0:
            structure_analysis['common_sections'].append({
                'name': pattern,
                'count': pattern_count
            })
    
    return structure_analysis

def generate_report(data):
    """Generate a comprehensive analysis report"""
    if not data:
        return
    
    # Run all analyses
    heading_analysis = analyze_headings(data)
    paragraph_analysis = analyze_paragraphs(data)
    service_analysis = analyze_services(data)
    testimonial_analysis = analyze_testimonials(data)
    structure_analysis = analyze_site_structure(data)
    
    # Combine into a single report
    report = {
        'site_structure': structure_analysis,
        'headings': heading_analysis,
        'paragraphs': paragraph_analysis,
        'services': service_analysis,
        'testimonials': testimonial_analysis,
    }
    
    # Save the report
    with open('data/nextact/analysis_report.json', 'w') as f:
        json.dump(report, f, indent=2)
    
    # Generate a human-readable summary
    generate_summary(report)
    
    print("Analysis completed! Report saved to data/nextact/analysis_report.json")
    print("Summary saved to data/nextact/analysis_summary.md")

def generate_summary(report):
    """Generate a human-readable summary of the analysis"""
    summary = """# Next Act Coaching Website Analysis

## Overview

This analysis examines the structure, content patterns, and design elements of the Next Act Coaching website to provide inspiration for the Rachel Lee Patient Advocacy website.

"""
    
    # Site Structure Summary
    summary += "## Site Structure\n\n"
    
    pages = report['site_structure']['pages']
    summary += f"The site consists of {len(pages)} pages:\n\n"
    
    for page in pages:
        summary += f"- **{page['name']}**: {page['heading_count']} headings, {page['paragraph_count']} paragraphs\n"
    
    summary += "\n"
    
    # Navigation
    nav_items = report['site_structure']['navigation']
    if nav_items:
        summary += "### Navigation\n\n"
        summary += "Common navigation items across the site:\n\n"
        
        for item in nav_items:
            summary += f"- {item['text']} (appears on {item['count']} pages)\n"
        
        summary += "\n"
    
    # Common Sections
    common_sections = report['site_structure']['common_sections']
    if common_sections:
        summary += "### Common Sections\n\n"
        summary += "Sections that appear across multiple pages:\n\n"
        
        for section in common_sections:
            summary += f"- {section['name'].capitalize()} sections (found on {section['count']} pages)\n"
        
        summary += "\n"
    
    # Heading Analysis
    summary += "## Content Structure\n\n"
    
    summary += "### Heading Patterns\n\n"
    
    heading_counts = report['headings']['count_by_level']
    summary += "Distribution of heading levels:\n\n"
    
    for level, count in heading_counts.items():
        summary += f"- {level.upper()}: {count} instances\n"
    
    summary += "\n"
    
    # Paragraph Analysis
    summary += "### Paragraph Style\n\n"
    
    avg_length = report['paragraphs']['avg_length']
    summary += f"Average paragraph length: {avg_length:.1f} words\n\n"
    
    tone = report['paragraphs']['tone_indicators']
    summary += "Content tone indicators:\n\n"
    
    for tone_type, count in tone.items():
        summary += f"- {tone_type.capitalize()}: {count} instances\n"
    
    summary += "\n"
    
    # Services Analysis
    summary += "## Services Presentation\n\n"
    
    service_count = report['services']['count']
    summary += f"The site presents {service_count} services.\n\n"
    
    if service_count > 0:
        service_structure = report['services']['structure']
        summary += "Service presentation structure includes:\n\n"
        
        for element, count in service_structure.items():
            summary += f"- {element}: present in {count} services\n"
        
        summary += "\n"
    
    # Testimonial Analysis
    summary += "## Testimonials\n\n"
    
    testimonial_count = report['testimonials']['count']
    summary += f"The site includes {testimonial_count} testimonials.\n\n"
    
    if testimonial_count > 0:
        avg_length = report['testimonials']['avg_length']
        summary += f"Average testimonial length: {avg_length:.1f} words\n\n"
        
        themes = report['testimonials']['common_themes']
        if themes:
            summary += "Common themes in testimonials:\n\n"
            
            for theme in themes:
                summary += f"- {theme['theme'].capitalize()}: {theme['count']} instances\n"
            
            summary += "\n"
    
    # Design Recommendations
    summary += "## Design Recommendations for Rachel Lee Advocacy\n\n"
    
    summary += """Based on this analysis, consider the following for the Rachel Lee Patient Advocacy website:

1. **Clear Navigation Structure**: Implement a consistent navigation menu with key sections like Home, About, Services, Resources, and Contact.

2. **Service Presentation**: Present services with clear titles, concise descriptions, and prominent call-to-action buttons.

3. **Content Tone**: Balance professional expertise with personal, empathetic language to build trust and connection.

4. **Testimonial Integration**: Feature client testimonials prominently to build credibility, focusing on transformation and results.

5. **Heading Hierarchy**: Maintain a clear heading structure with descriptive H1, H2, and H3 headings to guide users through content.

6. **Paragraph Length**: Keep paragraphs concise and focused, with an average length of 2-3 sentences for readability.

7. **Call-to-Action Placement**: Include clear calls to action throughout the site, especially after service descriptions and testimonials.

8. **Section Consistency**: Maintain consistent section types across pages to create a cohesive user experience.
"""
    
    # Save the summary
    with open('data/nextact/analysis_summary.md', 'w') as f:
        f.write(summary)

if __name__ == "__main__":
    data = load_data()
    if data:
        generate_report(data) 