# Project CSS Structure Documentation

## CSS Files
- `src/styles/index.css` - Main CSS entry point with Tailwind directives
- `src/styles/variables.css` - Additional CSS variables (shadows, focus effects, etc.)
- `src/styles/typography.css` - Typography styles and variables
- `src/styles/tokens.css` - Design tokens for colors, spacing, etc.

## Configuration Files
- `tailwind.config.js` - Main Tailwind configuration file
- `postcss.config.js` - PostCSS configuration

## Import Structure
- `index.css` imports:
  - Tailwind directives
  - `./tokens.css`
  - `./typography.css`
  - `./variables.css`
- Component files should import `index.css` or use the Tailwind classes directly

## Design Token System

### Token Organization
1. **Primitive Tokens** - Base values (colors, spacing, etc.)
2. **Semantic Tokens** - Purpose-based tokens (background, foreground, etc.)
3. **Component Tokens** - Component-specific tokens

### Using Tokens in Components
Always use the semantic or component tokens rather than primitive tokens:

```jsx
// GOOD: Using semantic tokens
<div className="bg-background-primary text-foreground-primary">
  Content
</div>

// AVOID: Using primitive tokens directly
<div className="bg-brand-pebble-100 text-brand-pebble-900">
  Content
</div>
```

## Typography System
The typography system provides consistent text styles through Tailwind classes:

```jsx
// Using typography classes
<h1 className="text-display-2xl">Large Heading</h1>
<p className="text-body-base">Regular paragraph text</p>
```

## Adding New Design Tokens

1. Add CSS variables to the appropriate file:
   - Color tokens → `tokens.css`
   - Typography tokens → `typography.css`
   - Other tokens (shadows, effects) → `variables.css`

2. Add the corresponding Tailwind mapping in `tailwind.config.js`

3. Use the new tokens in your components via Tailwind classes

## Best Practices

1. **Use Tailwind First** - Prefer Tailwind utility classes over custom CSS
2. **Follow the Token System** - Use semantic tokens rather than hard-coded values
3. **Maintain Consistency** - Follow established patterns for new components
4. **Mobile-First** - Design for mobile first, then add responsive variants
5. **Accessibility** - Ensure sufficient color contrast and proper focus states
