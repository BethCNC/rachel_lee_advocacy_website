import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../hooks/useTheme';

// Import logo assets
import leafDark from '../../assets/logos/logo-leaf-dark.png';
import leafLight from '../../assets/logos/logo-leaf-light.png';
import leafArchDark from '../../assets/logos/logo-leaf-arch-dark.png';
import leafArchLight from '../../assets/logos/logo-leaf-arch-light.png';
import circleLeafDark from '../../assets/logos/logo-circle-leaf-dark.png';
import circleLeafLight from '../../assets/logos/logo-circle-leaf-light.png';
import archLeafDark from '../../assets/logos/logo-arch-leaf-dark.png';
import archLeafLight from '../../assets/logos/logo-arch-leaf-light.png';

/**
 * GinkgoLogo Component
 * 
 * Renders the ginkgo leaf variants of the Rachel Lee Advocacy logo
 * 
 * @param {Object} props Component props
 * @param {string} [props.variant='leaf'] - Variant of the ginkgo logo ('leaf', 'leaf-arch', 'circle-leaf', 'arch-leaf')
 * @param {string} [props.size='md'] - Size variant of the logo ('xs', 'sm', 'md', 'lg', 'xl')
 * @param {string} [props.color='default'] - Color variant ('bloom', 'sea', 'citrine', 'berry', 'ocean', 'cloud', 'onyx', 'pebble')
 * @param {string} [props.style='default'] - Style variant ('default', 'outline', 'color-with-black')
 * @param {string} [props.mode] - Force a specific mode ('light', 'dark') - overrides system theme
 * @param {string} [props.className] - Additional CSS classes
 */
const GinkgoLogo = ({ 
  variant = 'leaf',
  size = 'md', 
  color = 'default',
  style = 'default',
  mode,
  className = '',
  ...props 
}) => {
  const { isDarkMode } = useTheme();
  
  // Determine which logo to use based on mode or system theme
  const logoMode = mode || (isDarkMode ? 'dark' : 'light');
  
  // Map variant to the correct logo assets
  const variantAssets = useMemo(() => ({
    'leaf': { 
      light: leafLight, 
      dark: leafDark 
    },
    'leaf-arch': { 
      light: leafArchLight, 
      dark: leafArchDark 
    },
    'circle-leaf': { 
      light: circleLeafLight, 
      dark: circleLeafDark 
    },
    'arch-leaf': { 
      light: archLeafLight, 
      dark: archLeafDark 
    },
  }), []);

  // Get the correct logo asset
  const logoSrc = variantAssets[variant][logoMode];

  // Map size names to actual dimensions
  const sizeMap = useMemo(() => ({
    'xs': { width: 25, height: 25 },
    'sm': { width: 50, height: 50 },
    'md': { width: 100, height: 100 },
    'lg': { width: 200, height: 200 },
    'xl': { width: 400, height: 400 },
  }), []);

  // Get dimensions from size map
  const { width, height } = sizeMap[size] || sizeMap.md;

  // If default color and style, just render the image directly
  if (color === 'default' && style === 'default') {
    return (
      <img
        src={logoSrc}
        alt={`Rachel Lee Advocacy ${variant.replace('-', ' ')} Logo`}
        width={width}
        height={height}
        className={`inline-block ${className}`}
        {...props}
      />
    );
  }

  // For colored versions, we need to create a wrapper with appropriate styling
  const colorMap = {
    bloom: {
      bgClass: 'bg-brand-bloom-300',
      logoMode: 'dark', // Dark logo on light background
      borderClass: ''
    },
    sea: {
      bgClass: 'bg-brand-sea-500',
      logoMode: 'light', // Light logo on dark background
      borderClass: ''
    },
    citrine: {
      bgClass: 'bg-brand-citrine-500',
      logoMode: 'dark', // Dark logo on light background
      borderClass: ''
    },
    berry: {
      bgClass: 'bg-brand-berry-500',
      logoMode: 'light', // Light logo on dark background
      borderClass: ''
    },
    ocean: {
      bgClass: 'bg-brand-ocean-500',
      logoMode: 'light', // Light logo on dark background
      borderClass: ''
    },
    cloud: {
      bgClass: 'bg-brand-cloud-500',
      logoMode: 'dark', // Dark logo on light background
      borderClass: 'border border-border-primary'
    },
    onyx: {
      bgClass: 'bg-brand-onyx-500',
      logoMode: 'light', // Light logo on dark background
      borderClass: ''
    },
    pebble: {
      bgClass: 'bg-brand-pebble-500',
      logoMode: 'dark', // Dark logo on light background
      borderClass: ''
    }
  };

  // Handle different styles with color
  if (color !== 'default') {
    const colorConfig = colorMap[color];
    
    // Get the right logo based on the color's contrast needs
    const colorModeAssets = variantAssets[variant];
    const colorLogoSrc = colorConfig.logoMode === 'dark' 
      ? colorModeAssets.dark 
      : colorModeAssets.light;

    // For outline style
    if (style === 'outline') {
      return (
        <div 
          className={`inline-flex items-center justify-center ${colorConfig.bgClass} ${colorConfig.borderClass} rounded-md ${className}`}
          style={{ width, height }}
          {...props}
        >
          <img
            src={colorLogoSrc}
            alt={`Rachel Lee Advocacy ${variant.replace('-', ' ')} Logo`}
            className="w-[95%] h-[95%] opacity-80"
          />
        </div>
      );
    }

    // For color-with-black style
    if (style === 'color-with-black') {
      return (
        <div 
          className={`inline-flex items-center justify-center ${colorConfig.bgClass} ${colorConfig.borderClass} rounded-md ${className}`}
          style={{ width, height }}
          {...props}
        >
          <img
            src={variantAssets[variant].dark} // Always use dark (black text) for this style
            alt={`Rachel Lee Advocacy ${variant.replace('-', ' ')} Logo`}
            className="w-[95%] h-[95%]"
          />
        </div>
      );
    }

    // Default style with color (filled color)
    return (
      <div 
        className={`inline-flex items-center justify-center ${colorConfig.bgClass} ${colorConfig.borderClass} rounded-md ${className}`}
        style={{ width, height }}
        {...props}
      >
        <img
          src={colorLogoSrc}
          alt={`Rachel Lee Advocacy ${variant.replace('-', ' ')} Logo`}
          className="w-[95%] h-[95%]"
        />
      </div>
    );
  }

  // Handle style variations with default color
  if (style === 'outline') {
    return (
      <img
        src={logoSrc}
        alt={`Rachel Lee Advocacy ${variant.replace('-', ' ')} Logo`}
        width={width}
        height={height}
        className={`inline-block opacity-80 ${className}`}
        {...props}
      />
    );
  }

  // Default logo with default style
  return (
    <img
      src={logoSrc}
      alt={`Rachel Lee Advocacy ${variant.replace('-', ' ')} Logo`}
      width={width}
      height={height}
      className={`inline-block ${className}`}
      {...props}
    />
  );
};

GinkgoLogo.propTypes = {
  variant: PropTypes.oneOf(['leaf', 'leaf-arch', 'circle-leaf', 'arch-leaf']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['default', 'bloom', 'sea', 'citrine', 'berry', 'ocean', 'cloud', 'onyx', 'pebble']),
  style: PropTypes.oneOf(['default', 'outline', 'color-with-black']),
  mode: PropTypes.oneOf(['light', 'dark']),
  className: PropTypes.string,
};

export default GinkgoLogo; 