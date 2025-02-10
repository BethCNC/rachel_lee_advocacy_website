/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./wp-content/themes/rachel-lee-theme/**/*.{php,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Main brand colors
        mulberry: {
          50: '#e2d2d8',
          100: '#cfb4be',
          200: '#b68e9d',
          300: '#9e697c',
          400: '#86445c',
          500: '#6e1e3b',
          600: '#5c1931',
          700: '#491427',
          800: '#370f1e',
          900: '#250a14'
        },
        cobalt: {
          50: '#d4dce8',
          100: '#b7c4d9',
          200: '#93a7c5',
          300: '#6f8ab2',
          400: '#4b6c9f',
          500: '#274f8c',
          600: '#214275',
          700: '#1a355d',
          800: '#142846',
          900: '#0d1a2f'
        },
        amber: {
          50: '#f7e1db',
          100: '#f2cdc4',
          200: '#ebb4a6',
          300: '#e49c88',
          400: '#de836b',
          500: '#d76a4d',
          600: '#b35840',
          700: '#8f4733',
          800: '#6c3527',
          900: '#48231a'
        },
        evergreen: {
          50: '#d4ddd9',
          100: '#b7c6bf',
          200: '#92a99f',
          300: '#6e8c7f',
          400: '#4a705f',
          500: '#26533f',
          600: '#204535',
          700: '#19372a',
          800: '#132a20',
          900: '#0d1c15'
        },
        // Accent colors
        saffron: {
          50: '#fef8e8',
          100: '#fdf4d8',
          200: '#fceec4',
          300: '#fbe8b1',
          400: '#fae39d',
          500: '#f9dd8a',
          600: '#cfb873',
          700: '#a6935c',
          800: '#7d6f45',
          900: '#534a2e'
        },
        citron: {
          50: '#f4f7e0',
          100: '#edf2cb',
          200: '#e4ebb1',
          300: '#dbe597',
          400: '#d2de7d',
          500: '#c9d863',
          600: '#a7b453',
          700: '#869042',
          800: '#656c32',
          900: '#434821'
        },
        petal: {
          50: '#fbeff4',
          100: '#f8e5ed',
          200: '#f4d7e3',
          300: '#f1cada',
          400: '#edbdd1',
          500: '#eab0c8',
          600: '#c393a7',
          700: '#9c7585',
          800: '#755864',
          900: '#4e3b43'
        },
        periwinkle: {
          50: '#edf2f9',
          100: '#e1e9f5',
          200: '#d2def0',
          300: '#c3d3eb',
          400: '#b4c8e6',
          500: '#a5bde1',
          600: '#899dbb',
          700: '#6e7e96',
          800: '#535f71',
          900: '#373f4b'
        }
      },
      fontFamily: {
        sans: ['"DIN 2014"', 'sans-serif'],
        serif: ['"New Spirit Condensed"', 'serif'],
        mono: ['"Space Mono"', 'monospace']
      },
      fontSize: {
        'xs': ['0.75rem', '1rem'],        // 12px, 16px
        'sm': ['0.875rem', '1.125rem'],   // 14px, 18px
        'base': ['1rem', '1.375rem'],     // 16px, 22px
        'lg': ['1.125rem', '1.5rem'],     // 18px, 24px
        'xl': ['1.25rem', '1.625rem'],    // 20px, 26px
        '2xl': ['1.5rem', '1.75rem'],     // 24px, 28px
        '3xl': ['1.875rem', '2.25rem'],   // 30px, 36px
        '4xl': ['2.25rem', '2.625rem'],   // 36px, 42px
        '5xl': ['3rem', '3.625rem'],      // 48px, 58px
        '6xl': ['3.75rem', '4.5rem'],     // 60px, 72px
        '7xl': ['4.5rem', '5.375rem'],    // 72px, 86px
        '8xl': ['6rem', '7.125rem'],      // 96px, 114px
        '9xl': ['8rem', '9.25rem'],       // 128px, 148px
        '10xl': ['12.5rem', '15rem']      // 200px, 240px
      },
      spacing: {
        '1.5': '0.0938rem',
        '18': '1.125rem',
        '128': '8rem',
        '200': '12.5rem',
        '256': '16rem'
      },
      borderRadius: {
        'xs': '0.125rem',    // 2px
        'sm': '0.25rem',     // 4px
        'md': '0.375rem',    // 6px
        'lg': '0.5rem',      // 8px
        'xl': '0.75rem',     // 12px
        '2xl': '1rem',       // 16px
        '3xl': '1.25rem',    // 20px
        '4xl': '1.5rem',     // 24px
        '5xl': '2.25rem',    // 36px
        'full': '62.4375rem' // 999px
      },
      letterSpacing: {
        tighter: '-0.05rem',
        tight: '-0.025rem',
        normal: '0rem',
        wide: '0.025rem',
        wider: '0.05rem',
        widest: '0.1rem'
      },
      lineHeight: {
        'xs': '1rem',      // 16px
        'sm': '1.125rem',  // 18px
        'base': '1.375rem', // 22px
        'lg': '1.5rem',    // 24px
        'xl': '1.625rem',  // 26px
        '2xl': '1.75rem',  // 28px
        '3xl': '2.25rem',  // 36px
        '4xl': '2.625rem', // 42px
        '5xl': '3.625rem', // 58px
        '6xl': '4.5rem',   // 72px
        '7xl': '5.375rem', // 86px
        '8xl': '7.125rem', // 114px
        '9xl': '9.25rem',  // 148px
        '10xl': '15rem'    // 240px
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700'
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '40rem',    // 640px
          md: '48rem',    // 768px
          lg: '64rem',    // 1024px
          xl: '80rem',    // 1280px
          '2xl': '96rem', // 1536px
        }
      }
    }
  },
  plugins: [],
}; 