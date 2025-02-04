# UMI Website Rebuild Project

This repository contains the analysis, planning, and implementation files for rebuilding the UMI Wellness Center website into two separate branded websites: Rachel Lee Patient Advocacy and UMI Lee Movement Intelligence.

## 📁 Project Structure

### Documentation (`/docs`)
- **Analysis**: Current website analysis and content reorganization strategy
- **Planning**: Site plans, user journeys, and sitemaps for both brands
- **Design**: Visual design strategy and wireframes
- **Technical**: Implementation specifications and user flow diagrams

### Source Code (`/src`)
- Web scraping and analysis tools
- Content processing utilities
- Data collection scripts

### Data (`/scraped_data`)
- Scraped website content
- Site analysis reports
- UX analysis data

## 🚀 Getting Started

1. Review the current website analysis in `/docs/analysis/current_website_analysis.md`
2. Explore the site plans:
   - Rachel Lee Advocacy: `/docs/planning/rachel_lee_advocacy/site_plan.md`
   - UMI Lee: `/docs/planning/umi_lee/site_plan.md`
3. Check the visual design strategy in `/docs/design/visual_design_strategy.md`

## 🔧 Development Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## 📚 Documentation

- **Analysis Documents**: Review current website state and reorganization strategy
- **Planning Documents**: Explore site plans and user journeys for both brands
- **Design Documents**: Access visual design guidelines and wireframes
- **Technical Documents**: Implementation details and specifications

## 🔒 Security

- All sensitive information should be stored in `.env`
- Follow HIPAA compliance guidelines
- Implement secure forms and data handling
- Protect client information

## 👥 Contributing

1. Create a feature branch from `development`
2. Follow the established coding standards
3. Update documentation as needed
4. Submit pull requests for review

## 📝 License

All rights reserved. This project is proprietary and confidential.
