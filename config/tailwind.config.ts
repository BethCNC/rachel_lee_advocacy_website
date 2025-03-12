import type { Config } from "tailwindcss";
import relumeTailwindPreset from "@relume_io/relume-ui-react/tailwind";

const config: Config = {
  content: [
    "./node_modules/@relume_io/relume-ui/dist/**/*",
    "./node_modules/@relume_io/relume-ui-react/dist/**/*",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [relumeTailwindPreset],
  theme: {
    extend: {
      fontFamily: {
        'din': ['din-2014', 'sans-serif'],
        'new-spirit': ['new-spirit', 'serif'],
        'space-mono': ['space-mono', 'monospace'],
        'playfair': ['Playfair Display', 'serif'],
        'opensans': ['Open Sans', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        // Rachel Lee Patient Advocacy color palette
        navy: '#1B365D',
        gold: '#D4AF37',
        teal: '#45818E',
        // You can add more colors from your design system here
      },
      // Add other custom theme extensions as needed
    },
  },
  plugins: [],
};

export default config; 