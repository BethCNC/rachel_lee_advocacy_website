import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../hooks/useTheme';

// Import logo assets
import textLogoLight from '../../assets/logos/logo-text-light.png';
import textLogoDark from '../../assets/logos/logo-text-dark.png';
import textLogoStacked from '../../assets/logos/logo-text-stacked.png';
import textLogoStackedDark from '../../assets/logos/logo-text-stacked-dark.png';
import textLogoStaggered from '../../assets/logos/logo-text-staggered.png';
import textLogoStaggeredDark from '../../assets/logos/logo-text-staggered-dark.png';

/**
 * TextLogo Component
 * 
 * Renders the text variants of the Rachel Lee Advocacy logo
 * 
 * @param {Object} props Component props
 * @param {string} [props.variant='horizontal'] - Variant of the text logo ('horizontal', 'stacked', 'staggered')
 * @param {string} [props.size='md'] - Size variant of the logo ('xs', 'sm', 'md', 'lg', 'xl')
 * @param {string} [props.color='default'] - Color variant ('bloom', 'sea', 'citrine', 'berry', 'ocean', 'cloud', 'onyx', 'pebble')
 * @param {string} [props.style='default'] - Style variant ('default', 'outline', 'color-with-black')
 * @param {string} [props.mode] - Force a specific mode ('light', 'dark') - overrides system theme
 * @param {string} [props.className] - Additional CSS classes
 */
const TextLogo = ({ 
  variant = 'horizontal',
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
    'horizontal': { 
      light: textLogoLight, 
      dark: textLogoDark 
    },
    'stacked': { 
      light: textLogoStacked, 
      dark: textLogoStackedDark 
    },
    'staggered': { 
      light: textLogoStaggered, 
      dark: textLogoStaggeredDark 
    },
  }), []);

  // Get the correct logo asset
  const logoSrc = variantAssets[variant][logoMode];

  // Map size names to actual dimensions based on variant
  const sizeMap = useMemo(() => {
    // Different aspect ratios for each variant
    const aspectRatios = {
      horizontal: 4.5, // Width is 4.5x height
      stacked: 1.5,    // Width is 1.5x height
      staggered: 2,     // Width is 2x height
    };
    
    const ratio = aspectRatios[variant] || 4.5;
    
    return {
      'xs': { height: 20, width: 20 * ratio },
      'sm': { height: 30, width: 30 * ratio },
      'md': { height: 50, width: 50 * ratio },
      'lg': { height: 70, width: 70 * ratio },
      'xl': { height: 100, width: 100 * ratio },
    };
  }, [variant]);

  // Get dimensions from size map
  const { width, height } = sizeMap[size] || sizeMap.md;
  
  // If default color and style, just render the image directly
  if (color === 'default' && style === 'default') {
    return (
      <img
        src={logoSrc}
        alt={`Rachel Lee Advocacy ${variant} text logo`}
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
            alt={`Rachel Lee Advocacy ${variant} text logo`}
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
            alt={`Rachel Lee Advocacy ${variant} text logo`}
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
          alt={`Rachel Lee Advocacy ${variant} text logo`}
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
        alt={`Rachel Lee Advocacy ${variant} text logo`}
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
      alt={`Rachel Lee Advocacy ${variant} text logo`}
      width={width}
      height={height}
      className={`inline-block ${className}`}
      {...props}
    />
  );
};

TextLogo.propTypes = {
  variant: PropTypes.oneOf(['horizontal', 'stacked', 'staggered']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['default', 'bloom', 'sea', 'citrine', 'berry', 'ocean', 'cloud', 'onyx', 'pebble']),
  style: PropTypes.oneOf(['default', 'outline', 'color-with-black']),
  mode: PropTypes.oneOf(['light', 'dark']),
  className: PropTypes.string,
};

export default TextLogo; 