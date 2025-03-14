import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../hooks/useTheme';

// Import logo assets
import circleDark from '../../assets/logos/logo-circle-wordmark-dark.png';
import circleLight from '../../assets/logos/logo-circle-wordmark-light.png';

/**
 * CircleLogo Component
 * 
 * Renders the circular version of the Rachel Lee Advocacy logo
 * 
 * @param {Object} props Component props
 * @param {string} [props.size='md'] - Size variant of the logo ('xs', 'sm', 'md', 'lg', 'xl')
 * @param {string} [props.color='default'] - Color variant ('bloom', 'sea', 'citrine', 'berry', 'ocean', 'cloud', 'onyx', 'pebble')
 * @param {string} [props.style='default'] - Style variant ('default', 'outline', 'color-with-black')
 * @param {string} [props.mode] - Force a specific mode ('light', 'dark') - overrides system theme
 * @param {string} [props.className] - Additional CSS classes
 */
const CircleLogo = ({ 
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
  const logoSrc = logoMode === 'dark' ? circleDark : circleLight;

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

  // If default color, just render the image directly
  if (color === 'default') {
    return (
      <img
        src={logoSrc}
        alt="Rachel Lee Advocacy Logo"
        width={width}
        height={height}
        className={`inline-block ${className}`}
        {...props}
      />
    );
  }

  // For colored versions, we'll use a container with a background color
  // and render a version of the logo appropriate for contrast
  const colorMap = {
    bloom: {
      bgClass: 'bg-brand-bloom-300',
      logoMode: 'dark', // Dark text on light bg
      borderClass: ''
    },
    sea: {
      bgClass: 'bg-brand-sea-500',
      logoMode: 'light', // Light text on dark bg
      borderClass: ''
    },
    citrine: {
      bgClass: 'bg-brand-citrine-500',
      logoMode: 'dark', // Dark text on light bg
      borderClass: ''
    },
    berry: {
      bgClass: 'bg-brand-berry-500',
      logoMode: 'light', // Light text on dark bg
      borderClass: ''
    },
    ocean: {
      bgClass: 'bg-brand-ocean-500',
      logoMode: 'light', // Light text on dark bg
      borderClass: ''
    },
    cloud: {
      bgClass: 'bg-brand-cloud-500',
      logoMode: 'dark', // Dark text on light bg
      borderClass: 'border border-border-primary'
    },
    onyx: {
      bgClass: 'bg-brand-onyx-500',
      logoMode: 'light', // Light text on dark bg
      borderClass: ''
    },
    pebble: {
      bgClass: 'bg-brand-pebble-500',
      logoMode: 'dark', // Dark text on light bg
      borderClass: ''
    }
  };

  // Get the configuration for this color
  const colorConfig = colorMap[color];
  
  // Get the right logo based on the color's contrast needs
  const colorLogoSrc = colorConfig.logoMode === 'dark' ? circleDark : circleLight;

  // For outline style
  if (style === 'outline') {
    return (
      <div 
        className={`inline-flex items-center justify-center ${colorConfig.bgClass} ${colorConfig.borderClass} rounded-full ${className}`}
        style={{ width, height }}
        {...props}
      >
        <img
          src={colorLogoSrc}
          alt="Rachel Lee Advocacy Logo"
          className="w-[95%] h-[95%] opacity-80"
        />
      </div>
    );
  }

  // For color-with-black style
  if (style === 'color-with-black') {
    return (
      <div 
        className={`inline-flex items-center justify-center ${colorConfig.bgClass} ${colorConfig.borderClass} rounded-full ${className}`}
        style={{ width, height }}
        {...props}
      >
        <img
          src={circleDark} // Always use dark (black text) for this style
          alt="Rachel Lee Advocacy Logo"
          className="w-[95%] h-[95%]"
        />
      </div>
    );
  }

  // Default style (filled color)
  return (
    <div 
      className={`inline-flex items-center justify-center ${colorConfig.bgClass} ${colorConfig.borderClass} rounded-full ${className}`}
      style={{ width, height }}
      {...props}
    >
      <img
        src={colorLogoSrc}
        alt="Rachel Lee Advocacy Logo"
        className="w-[95%] h-[95%]"
      />
    </div>
  );
};

CircleLogo.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['default', 'bloom', 'sea', 'citrine', 'berry', 'ocean', 'cloud', 'onyx', 'pebble']),
  style: PropTypes.oneOf(['default', 'outline', 'color-with-black']),
  mode: PropTypes.oneOf(['light', 'dark']),
  className: PropTypes.string,
};

export default CircleLogo; 