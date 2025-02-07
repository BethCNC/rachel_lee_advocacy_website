# Rachel Lee Patient Advocacy Website

## Project Overview
A comprehensive WordPress-based website for Rachel Lee's patient advocacy services, built with accessibility and interactivity at its core. This project implements the findings from our extensive content analysis and user experience research to create an engaging, user-friendly platform for healthcare system navigation and advocacy support.

## Key Features
- Interactive Healthcare System Navigator
- Condition Pathfinder Tool
- Resource Compass
- Care Journey Mapping
- Audio Integration
- ADHD/Autism-Friendly Design
- WCAG 2.1 AA Compliance

## Technology Stack
- WordPress CMS (6.4+)
- Divi Theme Builder
- TypeScript/React for Interactive Components
- PHP 8.1+
- MySQL 8.0+
- Node.js 18+

## Project Structure
```
rachel-lee-website/
├── wp-content/
│   ├── themes/
│   │   ├── rachel-lee-theme/          # Custom child theme
│   │   └── divi/                      # Parent theme
│   ├── plugins/
│   │   ├── rachel-lee-tools/          # Custom interactive features
│   │   └── rachel-lee-blocks/         # Custom Gutenberg blocks
│   └── uploads/                       # Media files
├── src/
│   ├── components/                    # React components
│   │   ├── interactive/               # Interactive tools
│   │   ├── accessibility/             # Accessibility features
│   │   └── common/                    # Shared components
│   ├── styles/                        # SCSS files
│   │   ├── base/                      # Base styles
│   │   ├── components/                # Component styles
│   │   └── theme/                     # Theme variables
│   └── scripts/                       # TypeScript utilities
├── docs/
│   ├── development/                   # Development docs
│   ├── design/                        # Design assets
│   ├── content/                       # Content guidelines
│   └── research/                      # Analysis findings
└── tests/                            # Test suites
```

## Development Setup

### Prerequisites
1. Local WordPress Environment:
   - Local by Flywheel or similar
   - PHP 8.1+
   - MySQL 8.0+

2. Development Tools:
   - Node.js 18+
   - npm or yarn
   - Composer
   - Git

### Installation
1. Clone the repository:
```bash
git clone https://github.com/BethCNC/rachel-lee-website.git
cd rachel-lee-website
```

2. Install dependencies:
```bash
composer install
npm install
```

3. Configure WordPress:
```bash
# Copy environment configuration
cp .env.example .env
# Update with local settings
```

4. Build assets:
```bash
npm run build
```

### Development Workflow
1. Start development environment:
```bash
npm run dev
```

2. Follow branching strategy:
```bash
git checkout -b feature/your-feature-name
```

3. Run tests:
```bash
npm run test
```

## Key Components

### Interactive Tools
1. Condition Pathfinder
   - Step-by-step guidance
   - Visual decision tree
   - Resource recommendations

2. Resource Compass
   - Dynamic filtering
   - Resource categorization
   - Personalized suggestions

3. Care Journey Map
   - Timeline visualization
   - Progress tracking
   - Milestone management

### Accessibility Features
1. Audio Integration
   - Welcome messages
   - Navigation guidance
   - Content narration

2. Visual Aids
   - High contrast mode
   - Adjustable text size
   - Progress indicators

3. Navigation Support
   - Keyboard shortcuts
   - Screen reader optimization
   - Clear wayfinding

## Content Migration
The content migration process will utilize the data and analysis from the `web_scrape_umi` project:
1. Structured content from `scraped_data/`
2. Content distribution analysis
3. User experience insights
4. Navigation patterns
5. Form structures

## Testing Requirements
- Unit Tests: `npm run test:unit`
- Integration Tests: `npm run test:integration`
- Accessibility Tests: `npm run test:a11y`
- Performance Tests: `npm run test:performance`
- Visual Regression: `npm run test:visual`

## Deployment
- Staging: [staging-url]
- Production: [production-url]

### Deployment Process
1. Build production assets:
```bash
npm run build:production
```

2. Run deployment checks:
```bash
npm run pre-deploy
```

3. Deploy via CI/CD:
```bash
git push origin main
```

## Documentation
- [Development Guidelines](docs/development/README.md)
- [Design System](docs/design/README.md)
- [Content Guidelines](docs/content/README.md)
- [Testing Procedures](docs/testing/README.md)
- [Research Findings](docs/research/README.md)

## Accessibility Standards
This project adheres to WCAG 2.1 AA standards and includes:
- Screen reader optimization
- Keyboard navigation
- High contrast mode
- Multiple content formats
- ADHD/Autism-friendly design patterns

## Security
- HIPAA compliance measures
- Regular security audits
- Data encryption
- Secure form handling
- Privacy protection

## Contributing
1. Follow WordPress coding standards
2. Maintain accessibility compliance
3. Include documentation
4. Add appropriate tests
5. Submit pull requests for review

## License
Private repository - All rights reserved

## Contact
- **Project Owner**: Rachel Lee
- **Lead Developer**: Beth Cartrette
- **GitHub**: [BethCNC](https://github.com/BethCNC)

## Acknowledgments
- Original content analysis from `web_scrape_umi` project
- Design inspiration from healthcare advocacy best practices
- Accessibility guidance from WCAG 2.1
- WordPress community resources 