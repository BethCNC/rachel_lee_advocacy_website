/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // Add other content paths
  ],
  darkMode: 'class', // or 'media' based on preference
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'brand': {
          'pebble': {
            '50': 'var(--color-brand-pebble-50)',
            '100': 'var(--color-brand-pebble-100)',
            '200': 'var(--color-brand-pebble-200)',
            '300': 'var(--color-brand-pebble-300)',
            '400': 'var(--color-brand-pebble-400)',
            '500': 'var(--color-brand-pebble-500)',
            '600': 'var(--color-brand-pebble-600)',
            '700': 'var(--color-brand-pebble-700)',
            '800': 'var(--color-brand-pebble-800)',
            '900': 'var(--color-brand-pebble-900)',
            '950': 'var(--color-brand-pebble-950)',
          },
          'ocean': {
            '50': 'var(--color-brand-ocean-50)',
            '100': 'var(--color-brand-ocean-100)',
            '200': 'var(--color-brand-ocean-200)',
            '300': 'var(--color-brand-ocean-300)',
            '400': 'var(--color-brand-ocean-400)',
            '500': 'var(--color-brand-ocean-500)',
            '600': 'var(--color-brand-ocean-600)',
            '700': 'var(--color-brand-ocean-700)',
            '800': 'var(--color-brand-ocean-800)',
            '900': 'var(--color-brand-ocean-900)',
            '950': 'var(--color-brand-ocean-950)',
          },
          'berry': {
            '50': 'var(--color-brand-berry-50)',
            '100': 'var(--color-brand-berry-100)',
            '200': 'var(--color-brand-berry-200)',
            '300': 'var(--color-brand-berry-300)',
            '400': 'var(--color-brand-berry-400)',
            '500': 'var(--color-brand-berry-500)',
            '600': 'var(--color-brand-berry-600)',
            '700': 'var(--color-brand-berry-700)',
            '800': 'var(--color-brand-berry-800)',
            '900': 'var(--color-brand-berry-900)',
            '950': 'var(--color-brand-berry-950)',
          },
          'bloom': {
            '50': 'var(--color-brand-bloom-50)',
            '100': 'var(--color-brand-bloom-100)',
            '200': 'var(--color-brand-bloom-200)',
            '300': 'var(--color-brand-bloom-300)',
            '400': 'var(--color-brand-bloom-400)',
            '500': 'var(--color-brand-bloom-500)',
            '600': 'var(--color-brand-bloom-600)',
            '700': 'var(--color-brand-bloom-700)',
            '800': 'var(--color-brand-bloom-800)',
            '900': 'var(--color-brand-bloom-900)',
            '950': 'var(--color-brand-bloom-950)',
          },
          'sea': {
            '50': 'var(--color-brand-sea-50)',
            '100': 'var(--color-brand-sea-100)',
            '200': 'var(--color-brand-sea-200)',
            '300': 'var(--color-brand-sea-300)',
            '400': 'var(--color-brand-sea-400)',
            '500': 'var(--color-brand-sea-500)',
            '600': 'var(--color-brand-sea-600)',
            '700': 'var(--color-brand-sea-700)',
            '800': 'var(--color-brand-sea-800)',
            '900': 'var(--color-brand-sea-900)',
            '950': 'var(--color-brand-sea-950)',
          },
          'cloud': {
            '50': 'var(--color-brand-cloud-50)',
            '100': 'var(--color-brand-cloud-100)',
            '200': 'var(--color-brand-cloud-200)',
            '300': 'var(--color-brand-cloud-300)',
            '400': 'var(--color-brand-cloud-400)',
            '500': 'var(--color-brand-cloud-500)',
            '600': 'var(--color-brand-cloud-600)',
            '700': 'var(--color-brand-cloud-700)',
            '800': 'var(--color-brand-cloud-800)',
            '900': 'var(--color-brand-cloud-900)',
            '950': 'var(--color-brand-cloud-950)',
          },
          'citrine': {
            '50': 'var(--color-brand-citrine-50)',
            '100': 'var(--color-brand-citrine-100)',
            '200': 'var(--color-brand-citrine-200)',
            '300': 'var(--color-brand-citrine-300)',
            '400': 'var(--color-brand-citrine-400)',
            '500': 'var(--color-brand-citrine-500)',
            '600': 'var(--color-brand-citrine-600)',
            '700': 'var(--color-brand-citrine-700)',
            '800': 'var(--color-brand-citrine-800)',
            '900': 'var(--color-brand-citrine-900)',
            '950': 'var(--color-brand-citrine-950)',
          },
          'onyx': {
            '50': 'var(--color-brand-onyx-50)',
            '100': 'var(--color-brand-onyx-100)',
            '200': 'var(--color-brand-onyx-200)',
            '300': 'var(--color-brand-onyx-300)',
            '400': 'var(--color-brand-onyx-400)',
            '500': 'var(--color-brand-onyx-500)',
            '600': 'var(--color-brand-onyx-600)',
            '700': 'var(--color-brand-onyx-700)',
            '800': 'var(--color-brand-onyx-800)',
            '900': 'var(--color-brand-onyx-900)',
            '950': 'var(--color-brand-onyx-950)',
          },
        },
        
        // System colors
        'system': {
          'red': {
            '100': 'var(--color-system-red-100)',
            '200': 'var(--color-system-red-200)',
            '600': 'var(--color-system-red-600)',
            '700': 'var(--color-system-red-700)',
          },
          'orange': {
            '100': 'var(--color-system-orange-100)',
            '200': 'var(--color-system-orange-200)',
            '600': 'var(--color-system-orange-600)',
          },
          'emerald': {
            '100': 'var(--color-system-emerald-100)',
            '200': 'var(--color-system-emerald-200)',
            '600': 'var(--color-system-emerald-600)',
            '700': 'var(--color-system-emerald-700)',
          },
        },
        
        // Semantic colors
        'background': {
          'primary': 'var(--background-primary)',
          'primary-dark': 'var(--background-primary-dark)',
          'subtle': 'var(--background-subtle)',
          'disabled': 'var(--background-disabled)',
          'secondary': 'var(--background-secondary)',
          'tertiary': 'var(--background-tertiary)',
          'tertiary-subtle': 'var(--background-tertiary-subtle)',
          'accent': 'var(--background-accent)',
          'accent-light': 'var(--background-accent-light)',
          'alternate': 'var(--background-alternate)',
          'alternate-dark': 'var(--background-alternate-dark)',
          'error': 'var(--background-error)',
          'warning': 'var(--background-warning)',
          'success': 'var(--background-success)',
          'information': 'var(--background-information)',
        },
        'foreground': {
          'primary': 'var(--foreground-primary)',
          'primary-brand': 'var(--foreground-primary-brand)',
          'subtle': 'var(--foreground-subtle)',
          'on-dark': 'var(--foreground-on-dark)',
          'on-dark-subtle': 'var(--foreground-on-dark-subtle)',
          'on-tertiary': 'var(--foreground-on-tertiary)',
          'accent': 'var(--foreground-accent)',
          'on-accent': 'var(--foreground-on-accent)',
          'alternate': 'var(--foreground-alternate)',
          'on-alternate': 'var(--foreground-on-alternate)',
          'disabled': 'var(--foreground-disabled)',
          'error': 'var(--foreground-error)',
          'warning': 'var(--foreground-warning)',
          'success': 'var(--foreground-success)',
          'information': 'var(--foreground-information)',
        },
        'border': {
          'primary': 'var(--border-primary)',
          'primary-subtle': 'var(--border-primary-subtle)',
          'primary-light': 'var(--border-primary-light)',
          'secondary': 'var(--border-secondary)',
          'tertiary': 'var(--border-tertiary)',
          'accent': 'var(--border-accent)',
          'alternate': 'var(--border-alternate)',
          'disabled': 'var(--border-disabled)',
          'error': 'var(--border-error)',
          'warning': 'var(--border-warning)',
          'success': 'var(--border-success)',
          'information': 'var(--border-information)',
        },
        
        // Button specific colors
        'button-bg': {
          'primary': 'var(--button-background-primary)',
          'primary-hover': 'var(--button-background-primary-hover)',
          'secondary': 'var(--button-background-secondary)',
          'secondary-hover': 'var(--button-background-secondary-hover)',
          'disabled': 'var(--button-background-disabled)',
          'error': 'var(--button-background-error)',
          'error-hover': 'var(--button-background-error-hover)',
          'warning': 'var(--button-background-warning)',
          'warning-hover': 'var(--button-background-warning-hover)',
          'success': 'var(--button-background-success)',
          'success-hover': 'var(--button-background-success-hover)',
        },
        'button-fg': {
          'primary': 'var(--button-foreground-primary)',
          'primary-hover': 'var(--button-foreground-primary-hover)',
          'secondary': 'var(--button-foreground-secondary)',
          'secondary-hover': 'var(--button-foreground-secondary-hover)',
          'disabled': 'var(--button-foreground-disabled)',
          'error': 'var(--button-foreground-error)',
          'warning': 'var(--button-foreground-warning)',
          'success': 'var(--button-foreground-success)',
        },
        'button-border': {
          'primary': 'var(--button-border-primary)',
          'primary-hover': 'var(--button-border-primary-hover)',
          'secondary': 'var(--button-border-secondary)',
          'secondary-hover': 'var(--button-border-secondary-hover)',
          'disabled': 'var(--button-border-disabled)',
          'error': 'var(--button-border-error)',
          'warning': 'var(--button-border-warning)',
          'success': 'var(--button-border-success)',
        },
      },
      spacing: {
        // Standard spacing
        '0': 'var(--spacing-0)',
        '1': 'var(--spacing-1)',
        '1.5': 'var(--spacing-1-5)',
        '2': 'var(--spacing-2)',
        '4': 'var(--spacing-4)',
        '8': 'var(--spacing-8)',
        '10': 'var(--spacing-10)',
        '12': 'var(--spacing-12)',
        '16': 'var(--spacing-16)',
        '18': 'var(--spacing-18)',
        '20': 'var(--spacing-20)',
        '24': 'var(--spacing-24)',
        '28': 'var(--spacing-28)',
        '32': 'var(--spacing-32)',
        '36': 'var(--spacing-36)',
        '40': 'var(--spacing-40)',
        '42': 'var(--spacing-42)',
        '48': 'var(--spacing-48)',
        '56': 'var(--spacing-56)',
        '64': 'var(--spacing-64)',
        '72': 'var(--spacing-72)',
        '96': 'var(--spacing-96)',
        '128': 'var(--spacing-128)',
        '200': 'var(--spacing-200)',
        '256': 'var(--spacing-256)',
        
        // Component-specific spacing
        'radius': 'var(--radius)',
        'spacing': 'var(--spacing)',
        'h-padding': 'var(--h-padding)',
        'v-padding': 'var(--v-padding)',
        'full-padding': 'var(--full-padding)',
        'icon-size': 'var(--icon-size)',
      },
      borderRadius: {
        'none': 'var(--radius-none)',
        'xs': 'var(--radius-xs-2)',
        'sm': 'var(--radius-sm-4)',
        'md': 'var(--radius-md-6)',
        'lg': 'var(--radius-lg-8)',
        'xl': 'var(--radius-12)',
        '2xl': 'var(--radius-2xl-16)',
        '3xl': 'var(--radius-3xl-20)',
        '4xl': 'var(--radius-4xl-32)',
        '5xl': 'var(--radius-5xl-60)',
        'full': 'var(--radius-full)',
        'component': 'var(--radius)',
      },
      borderWidth: {
        '0': 'var(--border-width-0)',
        '1': 'var(--border-width-1)',
        '1.5': 'var(--border-width-1-5)',
        '2': 'var(--border-width-2)',
        '4': 'var(--border-width-4)',
        '6': 'var(--border-width-6)',
        '8': 'var(--border-width-8)',
      },
      fontFamily: {
        display: ['var(--font-family-display)'],
        title: ['var(--font-family-title)'],
        body: ['var(--font-family-body)'],
      },
      fontSize: {},
      fontWeight: {
        regular: 'var(--font-weight-regular)',   /* 400 - body text */
        medium: 'var(--font-weight-medium)',     /* 500 - small titles & display */
        bold: 'var(--font-weight-bold)',         /* 700 - large titles */
      },
      lineHeight: {
        tight: 'var(--line-height-tight)',
        snug: 'var(--line-height-snug)',
        normal: 'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
        loose: 'var(--line-height-loose)',
      },
      opacity: {
        '5': '0.05',
        '10': '0.1',
        '15': '0.15',
        '20': '0.2',
        '30': '0.3',
        '40': '0.4',
        '60': '0.6',
        '70': '0.7',
        '80': '0.8',
        '90': '0.9',
        '95': '0.95',
      },
      
      // Add backgroundImage configuration
      backgroundImage: {
        // Duotone gradients
        'duotone-light': 'var(--gradient-duotone-light)',
        'duotone-dark': 'var(--gradient-duotone-dark)',
        'duotone-light2': 'var(--gradient-duotone-light2)',
        'duotone-light3': 'var(--gradient-duotone-light3)',
        'duotone-blues': 'var(--gradient-duotone-blues)',
        
        // Monotone gradients
        'monotone-citron': 'var(--gradient-monotone-citron)',
        'monotone-bloom': 'var(--gradient-monotone-bloom)',
        'monotone-sea': 'var(--gradient-monotone-sea)',
        'monotone-ocean': 'var(--gradient-monotone-ocean)',
        'monotone-berry': 'var(--gradient-monotone-berry)',
        
        // Special effects
        'half-split': 'var(--half-split-gradient)',
        'glass-fill': 'var(--glass-fill)',
        'watercolor': 'var(--watercolor-background)',
      },
      
      // Add boxShadow configuration
      boxShadow: {
        'xxl': 'var(--shadow-xxl)',
        'focus-light': 'var(--focus-shadow-light)',
        'focus-dark': 'var(--focus-shadow-dark)',
        'focus-error': 'var(--focus-shadow-error)',
        'focus-success': 'var(--focus-shadow-success)',
        'focus-warning': 'var(--focus-shadow-warning)',
      },
      
      // Add backdropBlur configuration
      backdropBlur: {
        'glass': '10px',
        'glass-heavy': '25px',
      },
    },
  },
  plugins: [
    function({ addBase, addComponents, addUtilities, theme }) {
      addComponents({
        // Size utilities
        '.size-small': {
          '--radius': theme('borderRadius.lg'),
          '--spacing': theme('spacing.4'),
          '--h-padding': theme('spacing.16'),
          '--v-padding': theme('spacing.12'),
          '--full-padding': theme('spacing.16'),
          '--icon-size': theme('spacing.24'),
        },
        '.size-default': {
          '--radius': theme('borderRadius.xl'),
          '--spacing': theme('spacing.8'),
          '--h-padding': theme('spacing.16'),
          '--v-padding': theme('spacing.12'),
          '--full-padding': theme('spacing.16'),
          '--icon-size': theme('spacing.32'),
        },
        '.size-large': {
          '--radius': theme('borderRadius.2xl'),
          '--spacing': theme('spacing.16'),
          '--h-padding': theme('spacing.24'),
          '--v-padding': theme('spacing.16'),
          '--full-padding': theme('spacing.16'),
          '--icon-size': theme('spacing.40'),
        },
        
        // Typography component classes
        '.text-display-7xl': {
          fontFamily: theme('fontFamily.display'),
          fontSize: theme('fontSize.display-7xl[0]'),
          lineHeight: theme('fontSize.display-7xl[1].lineHeight'),
          fontWeight: theme('fontSize.display-7xl[1].fontWeight'),
        },
        // You can add similar classes for other text styles if needed
      });
      
      // Add typography utilities
      addUtilities({
        '.text-display': {
          fontFamily: theme('fontFamily.display'),
        },
        '.text-title': {
          fontFamily: theme('fontFamily.title'),
        },
        '.text-body': {
          fontFamily: theme('fontFamily.body'),
        },
      });
    },
  ],
}