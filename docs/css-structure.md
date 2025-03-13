# Project Structure Documentation

## CSS Files
- `src/styles/index.css` - Main CSS entry point with Tailwind directives
- `src/styles/variables.css` - Source of truth for design tokens
- `src/styles/typography.css` - Typography styles
- `src/styles/tokens/tokens.css` - Generated design tokens from Style Dictionary
- `src/components/Header.css` - Styles for the Header component
- `src/components/NavBar.css` - Styles for the NavBar component

## Token Files
- `tokens/all-tokens.json` - Raw tokens from Figma
- `tokens/transformed-tokens.json` - Processed tokens for use in Tailwind and components
- `src/styles/tokens/tokens.css` - CSS variables from tokens
- `src/styles/tokens/tokens.scss` - SCSS variables from tokens
- `src/styles/tokens/tokens.js` - JavaScript exports for tokens
- `src/styles/tokens/tokens.ts` - TypeScript types for tokens
- `src/styles/tokens/tokens.json` - JSON representation of tokens for reference

## Config Files
- `tailwind.config.js` - Root Tailwind config (primary, used by build process)
- `src/styles/tailwind.config.js` - Styles directory Tailwind config (should be in sync with root)
- `config/tailwind.config.ts` - TypeScript Tailwind config (for IDE integration)
- `postcss.config.js` - PostCSS configuration
- `config/sd.config.js` - Style Dictionary configuration

## Token Management Scripts
- `sync-tokens.js` - Synchronizes tokens across the project
- `sync-tailwind-configs.js` - Keeps tailwind configs in sync
- `verify-tokens.js` - Verifies token values against source of truth
- `cleanup-tokens.js` - Cleans up token files

## Import Structure
- `App.jsx` imports `./styles/index.css`
- `index.css` imports:
  - Tailwind directives
  - `./tokens/tokens.css`
  - `./typography.css`
  - `./variables.css`
- Component files import their own CSS files directly

## Build Process
- The build process uses the root `tailwind.config.js`
- Token synchronization ensures all token files are in sync

## Managing Styles
1. Edit design tokens in Figma
2. Use `npm run tokens:sync` to synchronize tokens
3. Use `npm run tailwind:sync` to keep Tailwind configs in sync
4. Use `npm run tokens:verify` to check token consistency
