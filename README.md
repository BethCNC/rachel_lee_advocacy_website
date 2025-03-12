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
rachel-lee-patient-advocacy/
├── public/                           # Static assets
│   ├── assets/                       # Media files
│   │   ├── images/                   # Image assets
│   │   ├── logo/                     # Logo files
│   │   └── videos/                   # Video assets
│   └── index.html                    # Main HTML file
├── src/                              # Source code
│   ├── components/                   # React components
│   │   ├── Header.jsx                # Header component
│   │   ├── Header.css                # Header styles
│   │   ├── NavBar.jsx                # Navigation component
│   │   └── NavBar.css                # Navigation styles
│   ├── styles/                       # CSS files
│   │   ├── tokens/                   # Design tokens
│   │   ├── variables.css             # CSS variables
│   │   └── typography.css            # Typography styles
│   ├── App.jsx                       # Main App component
│   ├── App.css                       # App styles
│   └── index.js                      # Entry point
├── config/                           # Configuration files
│   ├── webpack/                      # Webpack configuration
│   ├── tsconfig.json                 # TypeScript config
│   ├── tailwind.config.ts            # Tailwind config
│   └── sd.config.js                  # Style Dictionary config
├── tokens/                           # Design token files
│   ├── all-tokens.json               # Combined tokens
│   ├── color-tokens.json             # Color tokens
│   └── fixed-tokens.json             # Fixed tokens
├── tools/                            # External tools
│   ├── figma-token-project/          # Figma token engine
│   └── Figma-Context-MCP/            # Figma context tool
├── scripts/                          # Utility scripts
│   ├── extract_website_structure.py  # Website structure script
│   └── analyze_nextact.py            # Analysis script
├── docs/                             # Documentation
│   ├── development/                  # Development docs
│   ├── design/                       # Design assets
│   ├── content/                      # Content guidelines
│   └── research/                     # Analysis findings
├── data/                             # Data files
│   ├── scraping/                     # Scraped data
│   └── analysis/                     # Analysis data
├── package.json                      # NPM package file
└── README.md                         # Project documentation
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+ (for data scripts)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/rachel-lee-patient-advocacy.git
cd rachel-lee-patient-advocacy
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

## Development Workflow

### Design Tokens
Design tokens are stored in the `tokens/` directory and are processed using Style Dictionary. To update tokens:

1. Edit the token JSON files in the `tokens/` directory
2. Run the token processing script:
```bash
npm run tokens
```

### Component Development
Components are built using React and styled with CSS. Follow these guidelines:

1. Create new components in the `src/components/` directory
2. Use design tokens for consistent styling
3. Ensure accessibility compliance (WCAG 2.1 AA)
4. Test on multiple devices and screen sizes

## Accessibility Standards
This project adheres to WCAG 2.1 AA standards. Key requirements include:

- Semantic HTML structure
- Keyboard navigation
- Screen reader compatibility
- Color contrast compliance
- Multiple content formats
- ADHD/Autism-friendly design patterns

## Documentation
Comprehensive documentation is available in the `docs/` directory:

- `docs/development/` - Development guidelines
- `docs/design/` - Design assets and guidelines
- `docs/content/` - Content strategy and guidelines
- `docs/research/` - User research and analysis

## License
This project is proprietary and confidential. All rights reserved.

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