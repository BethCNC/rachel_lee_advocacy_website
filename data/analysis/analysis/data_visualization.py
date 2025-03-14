import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

# Set style for matplotlib
plt.style.use('seaborn-v0_8')  # Using a built-in style
sns.set_palette("husl")

def create_content_distribution_pie():
    # Content Distribution Data
    labels = ['News/Updates', 'Wellness Content', 'Conditions Info', 'About/Company']
    sizes = [41, 30, 24, 5]
    colors = ['#4169E1', '#40E0D0', '#FF69B4', '#FFD700']
    
    plt.figure(figsize=(10, 8))
    plt.pie(sizes, labels=labels, colors=colors, autopct='%1.0f%%',
            startangle=90)
    plt.axis('equal')
    plt.title('Current Content Distribution')
    plt.savefig('docs/analysis/visualizations/content_distribution_pie.png')
    plt.close()

def create_brand_content_comparison():
    # Brand Content Comparison
    categories = ['Advocacy', 'Community', 'Blog', 'Classes', 'Scheduling']
    rachel_lee = [14, 27, 10, 14, 7]
    umi_lee = [9, 21, 5, 1, 2]
    
    x = np.arange(len(categories))
    width = 0.35
    
    fig, ax = plt.subplots(figsize=(12, 6))
    rects1 = ax.bar(x - width/2, rachel_lee, width, label='Rachel Lee Advocacy')
    rects2 = ax.bar(x + width/2, umi_lee, width, label='UMI Lee')
    
    ax.set_ylabel('Number of Pages')
    ax.set_title('Content Distribution by Brand')
    ax.set_xticks(x)
    ax.set_xticklabels(categories)
    ax.legend()
    
    # Add value labels on bars
    def autolabel(rects):
        for rect in rects:
            height = rect.get_height()
            ax.annotate(f'{height}',
                       xy=(rect.get_x() + rect.get_width() / 2, height),
                       xytext=(0, 3),
                       textcoords="offset points",
                       ha='center', va='bottom')
    
    autolabel(rects1)
    autolabel(rects2)
    
    plt.tight_layout()
    plt.savefig('docs/analysis/visualizations/brand_content_comparison.png')
    plt.close()

def create_interactive_elements_treemap():
    # Interactive Elements Data
    data = {
        'Category': ['Forms', 'CTAs', 'Social Links', 'Navigation', 'Media Players'],
        'Count': [111, 118, 57, 89, 61],
        'Parent': ['', '', '', '', ''],
        'Type': ['Input', 'Action', 'External', 'Internal', 'Media']
    }
    
    df = pd.DataFrame(data)
    
    fig = px.treemap(df, 
                     path=['Type', 'Category'],
                     values='Count',
                     title='Interactive Elements Distribution')
    
    fig.write_html('docs/analysis/visualizations/interactive_elements_treemap.html')

def create_user_journey_sankey():
    # User Journey Flow Data
    fig = go.Figure(data=[go.Sankey(
        node = dict(
            pad = 15,
            thickness = 20,
            line = dict(color = "black", width = 0.5),
            label = ["Homepage", "Services", "Resources", "Blog", "Contact", 
                    "Consultation", "Downloads", "Signup", "Conversion"],
            color = "blue"
        ),
        link = dict(
            source = [0, 0, 0, 1, 1, 2, 2, 3, 4], # indices correspond to labels
            target = [1, 2, 3, 5, 4, 6, 7, 7, 8],
            value = [8, 4, 2, 6, 2, 3, 1, 1, 2]
        ))])
    
    fig.update_layout(title_text="User Journey Flow",
                     font_size=10)
    
    fig.write_html('docs/analysis/visualizations/user_journey_sankey.html')

def create_engagement_metrics_radar():
    # Engagement Metrics
    categories = ['Page Views', 'Time on Site', 
                 'Form Completions', 'Resource Downloads', 
                 'Social Engagement']
    
    rachel_metrics = [85, 70, 90, 75, 80]
    umi_metrics = [75, 85, 65, 90, 70]
    
    angles = np.linspace(0, 2*np.pi, len(categories), endpoint=False)
    
    # Close the plot by appending first value
    angles = np.concatenate((angles, [angles[0]]))
    rachel_metrics = np.concatenate((rachel_metrics, [rachel_metrics[0]]))
    umi_metrics = np.concatenate((umi_metrics, [umi_metrics[0]]))
    
    fig, ax = plt.subplots(figsize=(10, 10), subplot_kw=dict(projection='polar'))
    
    ax.plot(angles, rachel_metrics, 'o-', linewidth=2, label='Rachel Lee Advocacy')
    ax.fill(angles, rachel_metrics, alpha=0.25)
    ax.plot(angles, umi_metrics, 'o-', linewidth=2, label='UMI Lee')
    ax.fill(angles, umi_metrics, alpha=0.25)
    
    ax.set_thetagrids(angles[:-1] * 180/np.pi, categories)
    ax.set_title('Engagement Metrics Comparison')
    ax.legend(loc='upper right', bbox_to_anchor=(0.1, 0.1))
    
    plt.tight_layout()
    plt.savefig('docs/analysis/visualizations/engagement_metrics_radar.png')
    plt.close()

def main():
    # Create directory for visualizations if it doesn't exist
    import os
    os.makedirs('docs/analysis/visualizations', exist_ok=True)
    
    # Generate all visualizations
    create_content_distribution_pie()
    create_brand_content_comparison()
    create_interactive_elements_treemap()
    create_user_journey_sankey()
    create_engagement_metrics_radar()

if __name__ == "__main__":
    main() 