#!/bin/bash

# Create new directory structure
mkdir -p public/{css,js,fonts,images,videos}
mkdir -p src/{styles/{base,components,layouts},js,pages}
mkdir -p docs/{brand,design}
mkdir -p assets/{images,videos}

# Move and organize CSS files
cp design/tokens/semantic-tokens.css src/styles/base/
cp wp-content/themes/rachel-lee-theme/assets/styles/components/*.css src/styles/components/
cp assets/fonts/font_satoshi/css/satoshi.css public/fonts/

# Move HTML files
cp prototypes/navigation-hero.html src/pages/
cp docs/design/wireframes/*.html src/pages/

# Move assets
cp -r assets/fonts/* public/fonts/
cp -r assets/videos/* public/videos/ 2>/dev/null || true
cp -r assets/images/* public/images/ 2>/dev/null || true

# Move documentation
cp -r docs/brand docs/
cp -r docs/design docs/

# Create build directory for compiled assets
mkdir -p build

# Create a new main.css that imports all component styles
echo "/* Base styles */
@import '../base/semantic-tokens.css';

/* Component styles */
@import '../components/services-grid.css';
@import '../components/hero-animation.css';
@import '../components/navigation.css';
@import '../components/cta.css';
@import '../components/testimonials.css';" > src/styles/layouts/main.css

# Copy the compiled CSS to public
cp src/styles/layouts/main.css public/css/

# Cleanup old directories
rm -rf styles 