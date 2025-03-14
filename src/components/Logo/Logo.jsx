import React from 'react';
import PropTypes from 'prop-types';
import CircleLogo from './CircleLogo';
import TextLogo from './TextLogo';
import GinkgoLogo from './GinkgoLogo';

/**
 * Logo Component
 * 
 * A unified interface for all Rachel Lee Advocacy logo variants
 * 
 * @param {Object} props Component props
 * @param {string} [props.type='primary'] - Type of logo ('primary', 'text', 'ginkgo')
 * @param {string} [props.variant] - Variant of the selected logo type
 *   primary: 'full', 'mark' (default: 'full')
 *   text: 'horizontal', 'stacked', 'staggered' (default: 'horizontal')
 *   ginkgo: 'leaf', 'leaf-arch', 'circle-leaf', 'arch-leaf' (default: 'leaf')
 * @param {string} [props.size='md'] - Size variant ('xs', 'sm', 'md', 'lg', 'xl')
 * @param {string} [props.color='default'] - Color variant ('bloom', 'sea', 'citrine', 'berry', 'ocean', 'cloud', 'onyx', 'pebble')
 * @param {string} [props.style='default'] - Style variant ('default', 'outline', 'color-with-black')
 * @param {string} [props.mode] - Force a specific mode ('light', 'dark') - overrides system theme
 * @param {string} [props.className] - Additional CSS classes
 */
const Logo = ({ 
  type = 'primary',
  variant,
  size = 'md',
  color = 'default',
  style = 'default',
  mode,
  className = '',
  ...props 
}) => {
  // Determine the correct variant based on the logo type
  const getDefaultVariant = () => {
    switch (type) {
      case 'primary': return 'full';
      case 'text': return 'horizontal';
      case 'ginkgo': return 'leaf';
      default: return 'full';
    }
  };

  const logoVariant = variant || getDefaultVariant();

  // Render the appropriate logo component based on type
  switch (type) {
    case 'primary':
      return (
        <CircleLogo 
          variant={logoVariant}
          size={size}
          color={color}
          style={style}
          mode={mode}
          className={className}
          {...props}
        />
      );
      
    case 'text':
      return (
        <TextLogo 
          variant={logoVariant}
          size={size}
          color={color}
          style={style}
          mode={mode}
          className={className}
          {...props}
        />
      );
      
    case 'ginkgo':
      return (
        <GinkgoLogo 
          variant={logoVariant}
          size={size}
          color={color}
          style={style}
          mode={mode}
          className={className}
          {...props}
        />
      );
      
    default:
      return (
        <CircleLogo 
          variant="full"
          size={size}
          color={color}
          style={style}
          mode={mode}
          className={className}
          {...props}
        />
      );
  }
};

Logo.propTypes = {
  type: PropTypes.oneOf(['primary', 'text', 'ginkgo']),
  variant: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['default', 'bloom', 'sea', 'citrine', 'berry', 'ocean', 'cloud', 'onyx', 'pebble']),
  style: PropTypes.oneOf(['default', 'outline', 'color-with-black']),
  mode: PropTypes.oneOf(['light', 'dark']),
  className: PropTypes.string,
};

export default Logo; 