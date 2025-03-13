// tailwind.config.js
const tokens = require('./tokens/transformed-tokens.json');

/** Map tokens to Tailwind format */
function extractColors(tokenObj) {
  const colors = {};
  
  // Extract colors from primitives/color section if it exists
  if (tokenObj['primitives/color'] && tokenObj['primitives/color']['Color Brand']) {
    Object.entries(tokenObj['primitives/color']['Color Brand']).forEach(([key, value]) => {
      if (value.value) colors[key.toLowerCase()] = value.value;
    });
  }
  
  // Extract theme colors if they exist
  if (tokenObj['theme/theme-light']) {
    Object.entries(tokenObj['theme/theme-light']).forEach(([key, value]) => {
      if (value.value) colors[key.toLowerCase()] = value.value;
    });
  }
  
  return colors;
}

function extractSpacing(tokenObj) {
  const spacing = {};
  
  // Extract dimensions from primitives/dimensions
  if (tokenObj['primitives/dimensions'] && tokenObj['primitives/dimensions']['dimensions']) {
    Object.entries(tokenObj['primitives/dimensions']['dimensions']).forEach(([key, value]) => {
      if (value.value) spacing[key.toLowerCase()] = value.value;
    });
  }
  
  return spacing;
}

function extractShadows() {
  // Using values from variables.css since they appear well-defined
  return {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  };
}

function extractBlur() {
  // Using values from variables.css since they appear well-defined
  return {
    none: '0px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
    '3xl': '64px'
  };
}

/**
 * Extract typography styles defined in typography.css
 * This ensures exact matching with the design system's typography
 */
function extractTypographyStyles() {
  // These values are directly from src/styles/typography.css
  return {
    // Heading styles - Halyard Display
    'heading-7xl': ['96px', { lineHeight: '114px', fontWeight: '500', fontFamily: 'halyard-display, sans-serif', letterSpacing: '0em' }],
    'heading-6xl': ['72px', { lineHeight: '86px', fontWeight: '500', fontFamily: 'halyard-display, sans-serif', letterSpacing: '0em' }],
    'heading-5xl': ['60px', { lineHeight: '72px', fontWeight: '500', fontFamily: 'halyard-display, sans-serif', letterSpacing: '0em' }],
    'heading-4xl': ['48px', { lineHeight: '56px', fontWeight: '500', fontFamily: 'halyard-display, sans-serif', letterSpacing: '0em' }],
    'heading-3xl': ['36px', { lineHeight: '44px', fontWeight: '400', fontFamily: 'halyard-display, sans-serif', letterSpacing: '0em' }],
    'heading-2xl': ['30px', { lineHeight: '42px', fontWeight: '500', fontFamily: 'halyard-display, sans-serif', letterSpacing: '0em' }],
    'heading-xl': ['24px', { lineHeight: '32px', fontWeight: '500', fontFamily: 'halyard-display, sans-serif', letterSpacing: '0em' }],
    'heading-lg': ['20px', { lineHeight: '28px', fontWeight: '500', fontFamily: 'halyard-display, sans-serif', letterSpacing: '0em' }],
    'heading-base': ['16px', { lineHeight: '24px', fontWeight: '500', fontFamily: 'halyard-display, sans-serif', letterSpacing: '0em' }],
    'heading-sm': ['14px', { lineHeight: '18px', fontWeight: '500', fontFamily: 'halyard-display, sans-serif', letterSpacing: '0em' }],
    'heading-xs': ['12px', { lineHeight: '16px', fontWeight: '500', fontFamily: 'halyard-display, sans-serif', letterSpacing: '0em' }],
    
    // Hero styles - FreightDisp Pro
    'hero-3xl': ['72px', { lineHeight: '86px', fontWeight: '500', fontFamily: 'freight-display-pro, serif', letterSpacing: '0em' }],
    'hero-2xl': ['60px', { lineHeight: '80px', fontWeight: '500', fontFamily: 'freight-display-pro, serif', letterSpacing: '0em' }],
    'hero-xl': ['48px', { lineHeight: '56px', fontWeight: '500', fontFamily: 'freight-display-pro, serif', letterSpacing: '0em' }],
    'hero-lg': ['36px', { lineHeight: '56px', fontWeight: '500', fontFamily: 'freight-display-pro, serif', letterSpacing: '0em' }],
    'hero-base': ['30px', { lineHeight: '44px', fontWeight: '500', fontFamily: 'freight-display-pro, serif', letterSpacing: '0em' }],
    'hero-sm': ['24px', { lineHeight: '42px', fontWeight: '500', fontFamily: 'freight-display-pro, serif', letterSpacing: '0em' }],
    
    // Body styles - FreightText Pro
    'body-3xl': ['36px', { lineHeight: '42px', fontWeight: '600', fontFamily: 'freight-text-pro, serif', letterSpacing: '0em' }],
    'body-2xl': ['24px', { lineHeight: '32px', fontWeight: '600', fontFamily: 'freight-text-pro, serif', letterSpacing: '0em' }],
    'body-xl': ['20px', { lineHeight: '32px', fontWeight: '600', fontFamily: 'freight-text-pro, serif', letterSpacing: '0em' }],
    'body-lg': ['18px', { lineHeight: '24px', fontWeight: '500', fontFamily: 'freight-text-pro, serif', letterSpacing: '0em' }],
    'body-base': ['16px', { lineHeight: '22px', fontWeight: '500', fontFamily: 'freight-text-pro, serif', letterSpacing: '0em' }],
    'body-sm': ['14px', { lineHeight: '18px', fontWeight: '400', fontFamily: 'freight-text-pro, serif', letterSpacing: '0em' }],
    'body-xs': ['12px', { lineHeight: '16px', fontWeight: '400', fontFamily: 'freight-text-pro, serif', letterSpacing: '0em' }],
    
    // Label styles - Halyard Text
    'label-lg': ['18px', { lineHeight: '24px', fontWeight: '400', fontFamily: 'halyard-text, sans-serif', letterSpacing: '0em' }],
    'label-base': ['16px', { lineHeight: '22px', fontWeight: '400', fontFamily: 'halyard-text, sans-serif', letterSpacing: '0em' }],
    'label-sm': ['14px', { lineHeight: '18px', fontWeight: '400', fontFamily: 'halyard-text, sans-serif', letterSpacing: '0em' }],
    'label-xs': ['12px', { lineHeight: '16px', fontWeight: '400', fontFamily: 'halyard-text, sans-serif', letterSpacing: '0em' }],
  };
}

function extractTypography(tokenObj) {
  const fontFamilies = {
    'halyard-display': ['halyard-display', 'sans-serif'],
    'freight-display': ['freight-display-pro', 'serif'],
    'freight-text': ['freight-text-pro', 'serif'],
    'halyard-text': ['halyard-text', 'sans-serif'],
  };
  
  // Extract other typography values from token file if needed
  // This is a fallback; we'll primarily use the typography styles above
  if (tokenObj['primitives/font-styling']) {
    Object.entries(tokenObj['primitives/font-styling']).forEach(([key, value]) => {
      // Additional font family mappings if needed
      if (key.includes('family') && value.value && !fontFamilies[key.replace('family-', '')]) {
        const familyName = key.replace('family-', '');
        fontFamilies[familyName] = value.value.split(',').map(f => f.trim());
      }
    });
  }
  
  return { fontFamilies };
}

// Extract tokens
const colors = extractColors(tokens);
const spacing = extractSpacing(tokens);
const shadows = extractShadows();
const blur = extractBlur();
const { fontFamilies } = extractTypography(tokens);
const typographyStyles = extractTypographyStyles();

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors,
      spacing,
      boxShadow: shadows,
      blur,
      fontFamily: fontFamilies,
      fontSize: typographyStyles,
    },
  },
  plugins: [
    require('tailwindcss-animate')
  ],
};