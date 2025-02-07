# UI Kit & Component Library Guidelines

## Recommended Base UI Kits

### 1. Chakra UI
**Primary Choice for Interactive Components**
- Built-in accessibility features
- Excellent TypeScript support
- Customizable theming
- WCAG compliant components
- Supports keyboard navigation
- Motion-safe animations

Installation:
```bash
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

Key Benefits:
- Built-in color mode switching
- Focus management
- WAI-ARIA compliant
- Responsive by default
- Supports RTL
- Modular architecture

### 2. Material UI (MUI)
**Secondary Option for Admin Interfaces**
- Comprehensive component set
- Strong WordPress admin integration
- Extensive documentation
- Active community

Installation:
```bash
npm install @mui/material @emotion/react @emotion/styled
```

## WordPress-Specific Components

### 1. Divi Components
- Use Divi's built-in components for:
  - Layout structures
  - Basic content blocks
  - Navigation elements
  - Headers and footers

### 2. Custom Block Components
```typescript
// Example block registration
registerBlockType('rachel-lee/component-name', {
  title: 'Component Name',
  category: 'rachel-lee-blocks',
  attributes: {
    // Component attributes
  },
  edit: EditComponent,
  save: SaveComponent
});
```

## Component Architecture

### 1. Base Components
Use Chakra UI for:
```typescript
// Basic UI elements
- Button
- Input
- Select
- Checkbox
- Radio
- Switch
- Slider
- Progress
- Alert
- Modal

// Layout components
- Box
- Flex
- Grid
- Stack
- Container
```

### 2. Custom Interactive Components

#### Condition Pathfinder
```typescript
// Base: Chakra UI Stepper + Card
import { Stepper, Card } from '@chakra-ui/react';

// Custom styling
const customTheme = {
  components: {
    Stepper: {
      // Custom stepper styles
    },
    Card: {
      // Custom card styles
    }
  }
};
```

#### Resource Compass
```typescript
// Base: Chakra UI Grid + Card + Filter
import { Grid, Card, Select } from '@chakra-ui/react';

// Custom implementation
const ResourceCompass = () => {
  // Component logic
};
```

#### Care Journey Map
```typescript
// Base: Chakra UI Timeline (custom)
// Consider react-chrono for timeline
import { Timeline } from 'react-chrono';

// Custom styling
const timelineTheme = {
  // Custom timeline styles
};
```

## Accessibility Enhancements

### 1. Audio Components
```typescript
// Base: Chakra UI components with custom audio features
const AudioPlayer = () => {
  return (
    <Box>
      <Button aria-label="Play audio">
        <Icon as={FaPlay} />
      </Button>
      <Slider aria-label="Audio progress" />
    </Box>
  );
};
```

### 2. Visual Aids
```typescript
// High contrast mode
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  colors: {
    // High contrast color palette
  }
});
```

## Design Tokens

### 1. Colors
```typescript
const colors = {
  primary: {
    500: '#1B365D', // Navy Blue
    600: '#45818E', // Teal
    700: '#D4AF37', // Gold
  },
  // Additional color scales
};
```

### 2. Typography
```typescript
const typography = {
  fonts: {
    heading: 'system-ui, sans-serif',
    body: 'system-ui, sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    // Additional sizes
  },
};
```

### 3. Spacing
```typescript
const space = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  // Additional spacing
};
```

## Implementation Guidelines

### 1. Component Creation
```typescript
// Template for new components
import { Box, useStyleConfig } from '@chakra-ui/react';

export const CustomComponent = (props) => {
  const { variant, ...rest } = props;
  const styles = useStyleConfig('CustomComponent', { variant });

  return <Box __css={styles} {...rest} />;
};
```

### 2. Theme Extension
```typescript
// Extend Chakra UI theme
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    // Custom component styles
  },
  colors,
  typography,
  space,
});
```

### 3. WordPress Integration
```typescript
// Register theme support
add_theme_support('editor-styles');
add_theme_support('responsive-embeds');
add_theme_support('align-wide');
```

## Development Workflow

### 1. Component Development
1. Start with Chakra UI base component
2. Add custom styling
3. Enhance with accessibility features
4. Add WordPress integration
5. Test across devices

### 2. Theme Customization
1. Define design tokens
2. Create component variants
3. Set up responsive styles
4. Implement dark/high contrast modes
5. Test accessibility

### 3. Quality Assurance
1. Component documentation
2. Accessibility testing
3. Performance testing
4. Cross-browser testing
5. WordPress compatibility 