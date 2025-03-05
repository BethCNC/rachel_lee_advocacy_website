/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'din': ['din-2014', 'sans-serif'],
        'new-spirit': ['new-spirit', 'serif'],
        'space-mono': ['space-mono', 'monospace'],
      },
      colors: {
        // Add your color palette here
        primary: {
          // Example - replace with your actual colors
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... etc
        },
        secondary: {
          // Your secondary colors
        },
        // ... other color definitions
      },
      spacing: {
        // Add your custom spacing scale if different from Tailwind's default
      },
      borderRadius: {
        // Add your custom border radius values if needed
      },
      // Add other custom theme extensions as needed
    },
  },
  plugins: [],
} 