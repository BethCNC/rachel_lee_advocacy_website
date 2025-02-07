# Content Migration Plan

## Source Content Location
The original content is located in the `web_scrape_umi` project:
- Scraped content data
- Content analysis results
- Navigation structure
- Form templates
- Media assets

## Content Categories

### 1. Core Content
- Homepage content
- About section
- Services descriptions
- Contact information
- Legal notices

### 2. Conditions Content (24% of original site)
- Condition descriptions
- Treatment navigation guides
- Support resources
- Case studies
- Success stories

### 3. Resource Library
- Educational materials
- Downloadable guides
- Video content
- Audio resources
- Forms and templates

### 4. Interactive Content
- Assessment tools
- Navigation guides
- Resource finders
- Progress tracking tools

## Migration Process

### Phase 1: Content Audit
1. Review scraped content from `web_scrape_umi/scraped_data/`
2. Categorize content by type and section
3. Identify content gaps
4. Map content to new site structure

### Phase 2: Content Preparation
1. Clean and format text content
2. Optimize media assets
3. Create content templates
4. Develop metadata structure

### Phase 3: WordPress Import
1. Set up custom post types
2. Configure taxonomies
3. Import structured content
4. Map relationships between content

### Phase 4: Interactive Content Development
1. Build interactive components
2. Integrate content with components
3. Set up data persistence
4. Configure analytics

## Content Structure

### WordPress Custom Post Types
```php
// Conditions
register_post_type('condition', [
    'labels' => [
        'name' => 'Conditions',
        'singular_name' => 'Condition'
    ],
    'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
    'taxonomies' => ['condition_category', 'symptoms']
]);

// Resources
register_post_type('resource', [
    'labels' => [
        'name' => 'Resources',
        'singular_name' => 'Resource'
    ],
    'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
    'taxonomies' => ['resource_type', 'conditions']
]);
```

### Content Relationships
```typescript
interface ContentRelationships {
  condition: {
    resources: Resource[];
    guides: Guide[];
    stories: Story[];
  };
  resource: {
    conditions: Condition[];
    categories: Category[];
    related: Resource[];
  };
}
```

## Required Files from web_scrape_umi

### Content Files
- `scraped_data/conditions/*.json`
- `scraped_data/resources/*.json`
- `scraped_data/services/*.json`
- `scraped_data/stories/*.json`

### Analysis Files
- Content distribution analysis
- Navigation patterns
- User interaction data
- Form structures

### Media Assets
- Images
- Videos
- Audio files
- Documents

## Migration Checklist

### Content Preparation
- [ ] Extract content from JSON files
- [ ] Clean and format text
- [ ] Optimize media assets
- [ ] Create content templates
- [ ] Map content relationships

### WordPress Setup
- [ ] Configure custom post types
- [ ] Set up taxonomies
- [ ] Create content templates
- [ ] Configure metadata fields

### Content Import
- [ ] Import conditions
- [ ] Import resources
- [ ] Import services
- [ ] Import stories
- [ ] Map relationships

### Quality Assurance
- [ ] Content accuracy
- [ ] Media display
- [ ] Internal links
- [ ] Metadata
- [ ] SEO elements

## Automation Scripts

### Content Processing
```typescript
interface ContentProcessor {
  extractContent(): Promise<Content[]>;
  cleanFormat(): void;
  optimizeMedia(): void;
  createTemplates(): void;
  mapRelationships(): void;
}
```

### WordPress Import
```typescript
interface WordPressImporter {
  importContent(content: Content[]): Promise<void>;
  createPostTypes(): void;
  setupTaxonomies(): void;
  mapRelationships(): void;
}
```

## Content Maintenance

### Regular Updates
- Weekly content reviews
- Monthly analytics review
- Quarterly content audits
- Annual content strategy review

### Quality Control
- Content accuracy checks
- Accessibility validation
- SEO optimization
- Performance monitoring

## Documentation Requirements

### Content Guidelines
- Style guide
- Voice and tone
- Accessibility requirements
- SEO best practices

### Technical Documentation
- Content structure
- Import procedures
- Update processes
- Backup procedures 