import json
import os
import pandas as pd
import networkx as nx
from collections import Counter
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns
from wordcloud import WordCloud
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

class ContentAnalyzer:
    def __init__(self, data_dir='scraped_data'):
        self.data_dir = data_dir
        self.analysis_dir = os.path.join(data_dir, 'analysis')
        self.visualization_dir = os.path.join(self.analysis_dir, 'visualizations')
        os.makedirs(self.visualization_dir, exist_ok=True)
        
        # Load the latest content file
        content_files = [f for f in os.listdir(data_dir) if f.startswith('site_content_')]
        latest_content = max(content_files)
        with open(os.path.join(data_dir, latest_content), 'r', encoding='utf-8') as f:
            self.content = json.load(f)
            
        # Download NLTK data
        nltk.download('punkt')
        nltk.download('stopwords')
        
    def analyze_site_structure(self):
        """Analyze and visualize the site structure"""
        G = nx.DiGraph()
        
        # Add nodes and edges
        for url, data in self.content.items():
            G.add_node(url, title=data['title'])
            for link in data['links']:
                if isinstance(link, dict) and 'href' in link:
                    target_url = link['href']
                    if target_url in self.content:
                        G.add_edge(url, target_url)
        
        # Calculate important metrics
        metrics = {
            'page_count': len(G.nodes),
            'internal_links': len(G.edges),
            'avg_depth': nx.average_shortest_path_length(G) if nx.is_strongly_connected(G) else 'N/A',
            'most_linked': max(dict(G.in_degree()).items(), key=lambda x: x[1])[0],
            'orphaned_pages': [node for node, degree in dict(G.in_degree()).items() if degree == 0]
        }
        
        # Visualize site structure
        plt.figure(figsize=(15, 10))
        pos = nx.spring_layout(G)
        nx.draw(G, pos, with_labels=False, node_size=500, node_color='lightblue')
        plt.savefig(os.path.join(self.visualization_dir, 'site_structure.png'))
        plt.close()
        
        return metrics
    
    def analyze_content_types(self):
        """Analyze content type distribution across pages"""
        content_dist = {}
        for url, data in self.content.items():
            content_dist[url] = {
                'headings': len(data['headings']),
                'paragraphs': len(data['paragraphs']),
                'images': len(data['images']),
                'forms': len(data['forms']),
                'interactive': len(data['interactive_elements'])
            }
        
        df = pd.DataFrame(content_dist).T
        
        # Visualize content distribution
        plt.figure(figsize=(15, 8))
        df.boxplot()
        plt.title('Content Type Distribution Across Pages')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig(os.path.join(self.visualization_dir, 'content_distribution.png'))
        plt.close()
        
        return df.describe()
    
    def analyze_text_content(self):
        """Analyze text content for common themes and terminology"""
        all_text = []
        for data in self.content.values():
            # Collect headings
            all_text.extend([h['text'] for h in data['headings']])
            # Collect paragraphs
            all_text.extend(data['paragraphs'])
        
        # Join all text and convert to lowercase
        text = ' '.join(all_text).lower()
        
        # Simple word tokenization
        words = [word.strip('.,!?()[]{}":;') for word in text.split()]
        
        # Remove stopwords
        stop_words = set(stopwords.words('english'))
        words = [w for w in words if w.isalnum() and w not in stop_words and len(w) > 2]
        
        # Generate word frequency
        word_freq = Counter(words)
        
        # Create word cloud
        wordcloud = WordCloud(width=1200, height=800, background_color='white').generate_from_frequencies(word_freq)
        plt.figure(figsize=(15, 10))
        plt.imshow(wordcloud, interpolation='bilinear')
        plt.axis('off')
        plt.savefig(os.path.join(self.visualization_dir, 'word_cloud.png'))
        plt.close()
        
        return dict(word_freq.most_common(50))
    
    def analyze_user_flows(self):
        """Analyze common user flows based on navigation patterns"""
        flows = []
        for url, data in self.content.items():
            if any(nav['href'] == url for nav in data['navigation']):
                flow = {
                    'start_page': url,
                    'forms': [f['action'] for f in data['forms']],
                    'interactive_elements': len(data['interactive_elements']),
                    'next_possible_steps': [link['href'] for link in data['links'] if link['href'] in self.content]
                }
                flows.append(flow)
        
        return flows
    
    def analyze_medical_content(self):
        """Analyze and categorize medical/health-related content"""
        medical_terms = {
            'conditions': ['eds', 'hsd', 'autism', 'adhd', 'chronic', 'pain', 'disability', 'syndrome', 'disorder'],
            'wellness': ['health', 'wellness', 'healing', 'therapy', 'treatment', 'care', 'support'],
            'services': ['advocacy', 'consulting', 'classes', 'programs', 'services', 'resources']
        }
        
        categorized_pages = {
            'conditions': [],
            'wellness': [],
            'services': [],
            'news': [],
            'about': [],
            'other': []
        }
        
        for url, data in self.content.items():
            # Get all text content from the page
            page_text = ' '.join([
                data['title'].lower(),
                *[h['text'].lower() for h in data['headings']],
                *[p.lower() for p in data['paragraphs']]
            ])
            
            # Categorize based on content and URL patterns
            if any(term in url.lower() for term in ['about', 'staff', 'founder']):
                categorized_pages['about'].append({
                    'url': url,
                    'title': data['title'],
                    'content_summary': data['headings'][0]['text'] if data['headings'] else data['title']
                })
            elif any(term in url.lower() for term in ['news', '2024', '2023']):
                categorized_pages['news'].append({
                    'url': url,
                    'title': data['title'],
                    'date': next((h['text'] for h in data['headings'] if '202' in h['text']), 'No date')
                })
            elif any(term in page_text for term in medical_terms['conditions']):
                categorized_pages['conditions'].append({
                    'url': url,
                    'title': data['title'],
                    'conditions_mentioned': [term for term in medical_terms['conditions'] if term in page_text]
                })
            elif any(term in page_text for term in medical_terms['wellness']):
                categorized_pages['wellness'].append({
                    'url': url,
                    'title': data['title'],
                    'focus': [term for term in medical_terms['wellness'] if term in page_text]
                })
            elif any(term in page_text for term in medical_terms['services']):
                categorized_pages['services'].append({
                    'url': url,
                    'title': data['title'],
                    'service_types': [term for term in medical_terms['services'] if term in page_text]
                })
            else:
                categorized_pages['other'].append({
                    'url': url,
                    'title': data['title']
                })
        
        return categorized_pages
    
    def generate_site_recommendations(self):
        """Generate recommendations for site reorganization"""
        categorized_content = self.analyze_medical_content()
        content_stats = {category: len(pages) for category, pages in categorized_content.items()}
        
        # Analyze interactive elements
        interactive_elements = {}
        for url, data in self.content.items():
            if data['forms'] or data['interactive_elements']:
                interactive_elements[url] = {
                    'forms': len(data['forms']),
                    'interactive': len(data['interactive_elements'])
                }
        
        recommendations = {
            'proposed_structure': {
                'main_sections': {
                    'home': {
                        'purpose': 'Landing page introducing UMI Wellness Center',
                        'key_elements': [
                            'Mission statement',
                            'Featured conditions and specialties',
                            'Latest news/updates',
                            'Quick access to key services',
                            'Interactive wellness assessment tool'
                        ],
                        'interactive_elements': [
                            'Wellness quiz/assessment',
                            'Service finder tool',
                            'Emergency resources widget'
                        ]
                    },
                    'conditions': {
                        'purpose': 'Comprehensive information about conditions treated',
                        'subsections': [
                            'EDS/HSD Information',
                            'Autism Resources',
                            'ADHD Management',
                            'Chronic Pain',
                            'Related Conditions'
                        ],
                        'interactive_elements': [
                            'Symptom checker',
                            'Condition comparison tool',
                            'Resource library'
                        ]
                    },
                    'services': {
                        'purpose': 'Healthcare and support services offered',
                        'subsections': [
                            'Patient Advocacy',
                            'Wellness Programs',
                            'Classes & Workshops',
                            'Consulting Services',
                            'Community Support'
                        ],
                        'interactive_elements': [
                            'Service scheduler',
                            'Class registration',
                            'Virtual consultation booking'
                        ]
                    },
                    'about': {
                        'purpose': 'Information about the center and team',
                        'subsections': [
                            'Our Story',
                            'Team Members',
                            'Mission & Values',
                            'Testimonials',
                            'Location & Contact'
                        ],
                        'interactive_elements': [
                            'Team member profiles',
                            'Interactive timeline',
                            'Contact form'
                        ]
                    },
                    'resources': {
                        'purpose': 'Educational and support materials',
                        'subsections': [
                            'Research Library',
                            'Patient Stories',
                            'News & Updates',
                            'Community Forum',
                            'Support Groups'
                        ],
                        'interactive_elements': [
                            'Resource finder',
                            'Document library',
                            'Community forum',
                            'Event calendar'
                        ]
                    }
                },
                'interactive_features': {
                    'priority_additions': [
                        'Interactive symptom tracker',
                        'Visual condition guides',
                        'Progress tracking tools',
                        'Community support forum',
                        'Resource recommendation engine'
                    ],
                    'content_visualization': [
                        'Infographics for medical concepts',
                        'Interactive body maps',
                        'Video tutorials and guides',
                        'Progress visualization tools',
                        'Interactive timelines'
                    ]
                },
                'content_strategy': {
                    'medical_content': {
                        'approach': 'Visual and interactive learning',
                        'elements': [
                            'Simplified medical diagrams',
                            'Step-by-step visual guides',
                            'Interactive case studies',
                            'Video explanations',
                            'Downloadable resources'
                        ]
                    },
                    'accessibility': {
                        'features': [
                            'High contrast mode',
                            'Text-to-speech integration',
                            'Customizable font sizes',
                            'Keyboard navigation',
                            'Screen reader optimization'
                        ]
                    }
                }
            },
            'content_migration': {
                'existing_pages': content_stats,
                'interactive_opportunities': len(interactive_elements),
                'priority_pages': [page for pages in categorized_content.values() for page in pages[:3]]
            }
        }
        
        return recommendations
    
    def analyze_video_content(self):
        """Analyze video content across the site"""
        video_analysis = {
            'total_videos': 0,
            'video_locations': [],
            'video_types': {
                'youtube': [],
                'vimeo': [],
                'embedded': [],
                'facebook': [],
                'other': []
            }
        }
        
        video_indicators = [
            'video', 'youtube', 'youtu.be', 'vimeo', 'facebook.com/video',
            'iframe', 'embed', 'player', '.mp4', '.webm', 'watch?v=',
            'playlist', 'channel', 'facebook.com/watch'
        ]
        
        for url, data in self.content.items():
            page_videos = []
            
            # Check for video elements in interactive elements
            for element in data['interactive_elements']:
                element_str = str(element).lower()
                if any(v in element_str for v in video_indicators):
                    video_type = 'other'
                    if 'youtube' in element_str or 'youtu.be' in element_str:
                        video_type = 'youtube'
                    elif 'vimeo' in element_str:
                        video_type = 'vimeo'
                    elif 'facebook' in element_str:
                        video_type = 'facebook'
                    elif 'iframe' in element_str or 'embed' in element_str:
                        video_type = 'embedded'
                    
                    video_info = {
                        'page': data['title'],
                        'url': url,
                        'element': element,
                        'context': self._get_video_context(data, element_str)
                    }
                    
                    video_analysis['video_types'][video_type].append(video_info)
                    page_videos.append(video_info)
            
            # Check for video links in content
            for link in data['links']:
                link_url = str(link.get('href', '')).lower()
                link_text = str(link.get('text', '')).lower()
                
                if any(v in link_url or v in link_text for v in video_indicators):
                    video_type = 'other'
                    if 'youtube' in link_url or 'youtu.be' in link_url:
                        video_type = 'youtube'
                    elif 'vimeo' in link_url:
                        video_type = 'vimeo'
                    elif 'facebook' in link_url and ('video' in link_url or 'watch' in link_url):
                        video_type = 'facebook'
                    
                    video_info = {
                        'page': data['title'],
                        'url': url,
                        'video_url': link_url,
                        'link_text': link_text,
                        'context': self._get_video_context(data, link_text)
                    }
                    video_analysis['video_types'][video_type].append(video_info)
                    page_videos.append(video_info)
            
            # Check paragraphs for video-related content
            for paragraph in data['paragraphs']:
                if any(v in paragraph.lower() for v in video_indicators):
                    video_info = {
                        'page': data['title'],
                        'url': url,
                        'context': paragraph,
                        'type': 'reference'
                    }
                    video_analysis['video_types']['other'].append(video_info)
                    page_videos.append(video_info)
            
            if page_videos:
                video_analysis['video_locations'].append({
                    'page': data['title'],
                    'url': url,
                    'video_count': len(page_videos),
                    'videos': page_videos
                })
        
        video_analysis['total_videos'] = sum(len(videos) for videos in video_analysis['video_types'].values())
        
        return video_analysis
    
    def _get_video_context(self, page_data, search_text):
        """Get surrounding context for a video element"""
        # Look for nearby headings
        for heading in page_data['headings']:
            if search_text in str(heading).lower():
                return {'heading': heading['text']}
        
        # Look in paragraphs
        for para in page_data['paragraphs']:
            if search_text in para.lower():
                return {'paragraph': para}
        
        return None
    
    def generate_report(self):
        """Generate a comprehensive analysis report"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        report = {
            'site_structure': self.analyze_site_structure(),
            'content_distribution': self.analyze_content_types().to_dict(),
            'common_terminology': self.analyze_text_content(),
            'user_flows': self.analyze_user_flows(),
            'content_categories': self.analyze_medical_content(),
            'site_recommendations': self.generate_site_recommendations(),
            'video_content': self.analyze_video_content()
        }
        
        # Save report
        report_file = os.path.join(self.analysis_dir, f'ux_analysis_report_{timestamp}.json')
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print(f"\nAnalysis complete! Report saved to: {report_file}")
        print(f"Visualizations saved in: {self.visualization_dir}")
        
        # Print video content analysis
        video_analysis = report['video_content']
        print("\nVIDEO CONTENT ANALYSIS")
        print("-" * 50)
        print(f"Total Videos Found: {video_analysis['total_videos']}")
        print("\nVideo Distribution:")
        for video_type, videos in video_analysis['video_types'].items():
            print(f"  - {video_type.title()}: {len(videos)} videos")
        
        print("\nPages with Videos:")
        for location in video_analysis['video_locations']:
            print(f"  - {location['page']}: {location['video_count']} videos")
        
        # Print detailed content analysis
        print("\n=== DETAILED CONTENT ANALYSIS ===")
        print("\n1. CONTENT OVERVIEW")
        print("-" * 50)
        print(f"Total Pages: {report['site_structure']['page_count']}")
        print(f"Most Linked Page: {report['site_structure']['most_linked']}")
        print(f"Orphaned Pages: {len(report['site_structure']['orphaned_pages'])}")
        
        # Content type distribution
        dist = report['content_distribution']
        if isinstance(dist, dict) and 'mean' in dist:
            print("\n2. AVERAGE CONTENT PER PAGE")
            print("-" * 50)
            print(f"Headings: {dist['mean']['headings']:.1f}")
            print(f"Paragraphs: {dist['mean']['paragraphs']:.1f}")
            print(f"Images: {dist['mean']['images']:.1f}")
            print(f"Forms: {dist['mean']['forms']:.1f}")
            print(f"Interactive Elements: {dist['mean']['interactive']:.1f}")
        
        # Content categories breakdown
        categories = report['content_categories']
        print("\n3. CONTENT CATEGORIES")
        print("-" * 50)
        for category, pages in categories.items():
            print(f"\n{category.upper()} ({len(pages)} pages):")
            for page in pages[:5]:  # Show first 5 pages of each category
                print(f"  - {page['title']}")
            if len(pages) > 5:
                print(f"  ... and {len(pages) - 5} more pages")
        
        # Terminology analysis
        print("\n4. KEY TERMINOLOGY")
        print("-" * 50)
        print("\nMost Common Terms:")
        for term, count in list(report['common_terminology'].items())[:20]:
            print(f"  - {term}: {count} occurrences")
        
        # User flow analysis
        flows = report['user_flows']
        print("\n5. USER FLOW ANALYSIS")
        print("-" * 50)
        print(f"Pages with Forms: {sum(1 for flow in flows if flow['forms'])}")
        print(f"Pages with Interactive Elements: {sum(1 for flow in flows if flow['interactive_elements'] > 0)}")
        
        # Print current site structure
        print("\n6. CURRENT SITE STRUCTURE")
        print("-" * 50)
        if 'navigation_hierarchy' in report['site_structure']:
            def print_hierarchy(hierarchy, level=0):
                for page, children in hierarchy.items():
                    print("  " * level + f"- {page}")
                    if isinstance(children, dict):
                        print_hierarchy(children, level + 1)
            print_hierarchy(report['site_structure']['navigation_hierarchy'])
        
        # Print reorganization recommendations
        print("\n7. PROPOSED SITE STRUCTURE")
        print("-" * 50)
        for section, details in report['site_recommendations']['proposed_structure']['main_sections'].items():
            print(f"\n{section.upper()}:")
            print(f"Purpose: {details['purpose']}")
            
            if 'key_elements' in details:
                print("Key elements:")
                for element in details['key_elements']:
                    print(f"  - {element}")
            
            if 'subsections' in details:
                print("Key subsections:")
                for subsection in details['subsections']:
                    print(f"  - {subsection}")
            
            if 'interactive_elements' in details:
                print("Interactive elements:")
                for element in details['interactive_elements']:
                    print(f"  - {element}")
        
        # Print content improvement recommendations
        print("\n8. CONTENT IMPROVEMENT RECOMMENDATIONS")
        print("-" * 50)
        print("\nPriority Interactive Features:")
        for feature in report['site_recommendations']['proposed_structure']['interactive_features']['priority_additions']:
            print(f"  - {feature}")
        
        print("\nVisualization Strategies:")
        for strategy in report['site_recommendations']['proposed_structure']['interactive_features']['content_visualization']:
            print(f"  - {strategy}")
        
        print("\nAccessibility Features:")
        for feature in report['site_recommendations']['proposed_structure']['content_strategy']['accessibility']['features']:
            print(f"  - {feature}")
        
        # Migration statistics
        print("\n9. CONTENT MIGRATION STATISTICS")
        print("-" * 50)
        print("Current content distribution:")
        for category, count in report['site_recommendations']['content_migration']['existing_pages'].items():
            print(f"  - {category}: {count} pages")
        print(f"\nInteractive enhancement opportunities: {report['site_recommendations']['content_migration']['interactive_opportunities']} pages")
        
        return report
    
    def analyze_ui_elements(self):
        """Analyze UI elements and CTAs across the site"""
        ui_analysis = {
            'cta_buttons': [],
            'forms': [],
            'navigation_elements': [],
            'interactive_components': [],
            'media_elements': []
        }
        
        for url, data in self.content.items():
            page_ctas = []
            page_forms = []
            page_interactive = []
            
            # Analyze links for CTA patterns
            for link in data['links']:
                link_text = link.get('text', '').lower()
                if any(cta in link_text for cta in ['sign up', 'register', 'join', 'contact', 'book', 'schedule', 'learn more', 'get started']):
                    page_ctas.append({
                        'text': link_text,
                        'url': link.get('href', ''),
                        'page': data['title']
                    })
            
            # Analyze forms
            for form in data['forms']:
                form_fields = []
                for field in form.get('fields', []):
                    form_fields.append({
                        'type': field.get('type', ''),
                        'name': field.get('name', ''),
                        'required': field.get('required', False)
                    })
                page_forms.append({
                    'action': form.get('action', ''),
                    'fields': form_fields,
                    'page': data['title']
                })
            
            # Analyze interactive elements
            for element in data['interactive_elements']:
                page_interactive.append({
                    'type': element.get('type', ''),
                    'purpose': element.get('purpose', ''),
                    'page': data['title']
                })
            
            ui_analysis['cta_buttons'].extend(page_ctas)
            ui_analysis['forms'].extend(page_forms)
            ui_analysis['interactive_components'].extend(page_interactive)
            
            # Analyze media elements
            ui_analysis['media_elements'].append({
                'page': data['title'],
                'images': len(data['images']),
                'videos': len([e for e in data['interactive_elements'] if 'video' in str(e).lower()]),
                'embeds': len([e for e in data['interactive_elements'] if 'embed' in str(e).lower()])
            })
        
        return ui_analysis
    
    def analyze_user_journeys(self):
        """Analyze potential user journeys through the site"""
        journeys = {
            'primary_paths': [],
            'conversion_points': [],
            'dead_ends': [],
            'entry_points': []
        }
        
        # Identify main entry points
        for url, data in self.content.items():
            incoming_links = sum(1 for _, page_data in self.content.items() 
                               for link in page_data['links'] if link.get('href') == url)
            if incoming_links > 5:  # Popular entry points
                journeys['entry_points'].append({
                    'page': data['title'],
                    'url': url,
                    'incoming_links': incoming_links
                })
        
        # Identify conversion points (pages with forms or strong CTAs)
        for url, data in self.content.items():
            if data['forms'] or any(cta in str(data).lower() for cta in ['sign up', 'register', 'contact']):
                journeys['conversion_points'].append({
                    'page': data['title'],
                    'url': url,
                    'type': 'form' if data['forms'] else 'cta'
                })
        
        # Identify dead ends (pages with few outgoing links)
        for url, data in self.content.items():
            if len(data['links']) < 3:
                journeys['dead_ends'].append({
                    'page': data['title'],
                    'url': url,
                    'outgoing_links': len(data['links'])
                })
        
        # Analyze common paths through the site
        nav_patterns = []
        for url, data in self.content.items():
            if data['navigation']:
                path = []
                current = url
                while current and len(path) < 5:
                    path.append(current)
                    next_links = self.content.get(current, {}).get('links', [])
                    current = next((link['href'] for link in next_links 
                                  if link['href'] in self.content and link['href'] not in path), None)
                if len(path) > 2:
                    nav_patterns.append(path)
        
        journeys['primary_paths'] = nav_patterns[:10]  # Top 10 common paths
        
        return journeys
    
    def generate_ux_report(self):
        """Generate a comprehensive UX analysis report"""
        ui_analysis = self.analyze_ui_elements()
        user_journeys = self.analyze_user_journeys()
        
        report = {
            'current_state': {
                'ui_elements': ui_analysis,
                'user_journeys': user_journeys,
                'content_organization': self.analyze_content_types().to_dict(),
                'site_structure': self.analyze_site_structure(),
                'terminology': self.analyze_text_content()
            }
        }
        
        # Print UX Analysis Report
        print("\n=== UX/UI ANALYSIS REPORT ===")
        print("\n1. SITE STRUCTURE AND NAVIGATION")
        print("-" * 50)
        print(f"Total Pages: {report['current_state']['site_structure']['page_count']}")
        print("\nMain Navigation Structure:")
        if 'navigation_hierarchy' in report['current_state']['site_structure']:
            self._print_hierarchy(report['current_state']['site_structure']['navigation_hierarchy'])
        
        print("\n2. CALL-TO-ACTION ANALYSIS")
        print("-" * 50)
        cta_count = len(ui_analysis['cta_buttons'])
        print(f"Total CTAs found: {cta_count}")
        print("\nMost Common CTAs:")
        cta_texts = [cta['text'] for cta in ui_analysis['cta_buttons']]
        for cta, count in Counter(cta_texts).most_common(5):
            print(f"  - '{cta}': {count} occurrences")
        
        print("\n3. FORM ANALYSIS")
        print("-" * 50)
        form_count = len(ui_analysis['forms'])
        print(f"Total Forms: {form_count}")
        print("\nForm Locations:")
        for form in ui_analysis['forms'][:5]:
            print(f"  - {form['page']}: {len(form['fields'])} fields")
        
        print("\n4. USER JOURNEY ANALYSIS")
        print("-" * 50)
        print("\nMain Entry Points:")
        for entry in user_journeys['entry_points'][:5]:
            print(f"  - {entry['page']}: {entry['incoming_links']} incoming links")
        
        print("\nConversion Points:")
        for point in user_journeys['conversion_points'][:5]:
            print(f"  - {point['page']} ({point['type']})")
        
        print("\nPotential User Flow Issues:")
        print(f"  - Dead Ends: {len(user_journeys['dead_ends'])} pages")
        
        print("\n5. INTERACTIVE ELEMENTS")
        print("-" * 50)
        interactive_count = len(ui_analysis['interactive_components'])
        print(f"Total Interactive Elements: {interactive_count}")
        
        print("\n6. MEDIA USAGE")
        print("-" * 50)
        total_images = sum(media['images'] for media in ui_analysis['media_elements'])
        total_videos = sum(media['videos'] for media in ui_analysis['media_elements'])
        print(f"Total Images: {total_images}")
        print(f"Total Videos: {total_videos}")
        
        print("\n7. CONTENT DENSITY")
        print("-" * 50)
        content_dist = report['current_state']['content_organization']
        if isinstance(content_dist, dict) and 'mean' in content_dist:
            print("Average per page:")
            print(f"  - Headings: {content_dist['mean']['headings']:.1f}")
            print(f"  - Paragraphs: {content_dist['mean']['paragraphs']:.1f}")
            print(f"  - Images: {content_dist['mean']['images']:.1f}")
        
        return report
    
    def _print_hierarchy(self, hierarchy, level=0):
        """Helper method to print site hierarchy"""
        for page, children in hierarchy.items():
            print("  " * level + f"- {page}")
            if isinstance(children, dict):
                self._print_hierarchy(children, level + 1)

    def analyze_brand_separation(self):
        """Analyze and separate content between Rachel Lee Advocacy and UMI Lee brands"""
        brand_categories = {
            'rachel_lee_advocacy': {
                'keywords': ['advocacy', 'advocate', 'patient', 'community', 'classes', 'newsletter', 'blog', 'public'],
                'pages': [],
                'content_types': {
                    'advocacy_content': [],
                    'community_resources': [],
                    'blog_posts': [],
                    'classes': [],
                    'scheduling': []
                }
            },
            'umi_lee': {
                'keywords': ['umi', 'movement', 'intelligence', 'workshop', 'eds', 'hsd', 'hypermobility', 'autism', 'movement intelligence'],
                'pages': [],
                'content_types': {
                    'movement_content': [],
                    'conditions': [],
                    'workshops': [],
                    'resources': [],
                    'testimonials': []
                }
            }
        }

        # Analyze each page and categorize content
        for url, data in self.content.items():
            page_text = ' '.join([
                data['title'].lower(),
                *[h['text'].lower() for h in data['headings']],
                *[p.lower() for p in data['paragraphs']]
            ])

            # Check for video content
            video_elements = [
                elem for elem in data['interactive_elements'] 
                if any(v in str(elem).lower() for v in ['video', 'youtube', 'vimeo', 'iframe'])
            ]

            page_info = {
                'url': url,
                'title': data['title'],
                'headings': data['headings'],
                'videos': video_elements,
                'forms': data['forms'],
                'images': data['images']
            }

            # Categorize by brand
            if any(keyword in page_text for keyword in brand_categories['rachel_lee_advocacy']['keywords']):
                brand_categories['rachel_lee_advocacy']['pages'].append(page_info)
                
                # Sub-categorize Rachel Lee content
                if 'advocacy' in page_text or 'advocate' in page_text:
                    brand_categories['rachel_lee_advocacy']['content_types']['advocacy_content'].append(page_info)
                if 'community' in page_text or 'resources' in page_text:
                    brand_categories['rachel_lee_advocacy']['content_types']['community_resources'].append(page_info)
                if 'blog' in page_text or 'news' in page_text:
                    brand_categories['rachel_lee_advocacy']['content_types']['blog_posts'].append(page_info)
                if 'class' in page_text or 'workshop' in page_text:
                    brand_categories['rachel_lee_advocacy']['content_types']['classes'].append(page_info)
                if 'schedule' in page_text or 'appointment' in page_text:
                    brand_categories['rachel_lee_advocacy']['content_types']['scheduling'].append(page_info)

            if any(keyword in page_text for keyword in brand_categories['umi_lee']['keywords']):
                brand_categories['umi_lee']['pages'].append(page_info)
                
                # Sub-categorize UMI Lee content
                if 'movement' in page_text or 'intelligence' in page_text:
                    brand_categories['umi_lee']['content_types']['movement_content'].append(page_info)
                if any(condition in page_text for condition in ['eds', 'hsd', 'hypermobility', 'autism']):
                    brand_categories['umi_lee']['content_types']['conditions'].append(page_info)
                if 'workshop' in page_text:
                    brand_categories['umi_lee']['content_types']['workshops'].append(page_info)
                if 'resource' in page_text:
                    brand_categories['umi_lee']['content_types']['resources'].append(page_info)
                if 'testimonial' in page_text or 'review' in page_text:
                    brand_categories['umi_lee']['content_types']['testimonials'].append(page_info)

        return brand_categories

    def generate_brand_report(self):
        """Generate a detailed report for both brands"""
        brand_data = self.analyze_brand_separation()
        
        print("\n=== BRAND SEPARATION ANALYSIS ===")
        
        for brand, data in brand_data.items():
            print(f"\n{brand.upper().replace('_', ' ')}")
            print("-" * 50)
            print(f"Total Pages: {len(data['pages'])}")
            
            print("\nContent Categories:")
            for category, pages in data['content_types'].items():
                print(f"\n{category.replace('_', ' ').title()} ({len(pages)} pages):")
                for page in pages[:5]:
                    print(f"  - {page['title']}")
                    if page['videos']:
                        print(f"    * Contains {len(page['videos'])} video(s)")
                if len(pages) > 5:
                    print(f"    ... and {len(pages) - 5} more pages")
            
            # Calculate media statistics
            total_videos = sum(len(page['videos']) for page in data['pages'])
            total_images = sum(len(page['images']) for page in data['pages'])
            total_forms = sum(len(page['forms']) for page in data['pages'])
            
            print(f"\nMedia Statistics:")
            print(f"  - Videos: {total_videos}")
            print(f"  - Images: {total_images}")
            print(f"  - Forms: {total_forms}")

        return brand_data

def main():
    analyzer = ContentAnalyzer()
    
    # Generate all reports
    content_report = analyzer.generate_report()
    ux_report = analyzer.generate_ux_report()
    brand_report = analyzer.generate_brand_report()
    
    # Print key insights
    print("\nKey Content Insights:")
    print(f"- Total pages: {content_report['site_structure']['page_count']}")
    print(f"- Most linked page: {content_report['site_structure']['most_linked']}")
    print(f"- Orphaned pages: {len(content_report['site_structure']['orphaned_pages'])}")
    
    # Print orphaned pages
    print("\nOrphaned Pages:")
    for page in content_report['site_structure']['orphaned_pages']:
        print(f"- {page}")
    
    print("\nTop 10 commonly used terms:")
    for term, count in list(content_report['common_terminology'].items())[:10]:
        print(f"- {term}: {count}")

if __name__ == "__main__":
    main() 