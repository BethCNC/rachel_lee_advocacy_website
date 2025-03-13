import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Button component that renders as a button, link, or router Link
 * Matches the Figma design system specifications exactly
 */
const Button = ({
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  href,
  to,
  onClick,
  isActive = false,
  disabled = false,
  children,
  icon,
  iconPosition = 'no-icon',
  className = '',
  darkMode = false,
  ...props
}) => {
  // Base classes - using the exact border-radius from design (36px)
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-[36px] transition-all";
  
  // Size classes based on Figma specs
  // Default: 24px horizontal, 10px vertical padding
  // Small: 20px horizontal, 8px vertical padding
  // Icon-only has exact 12px/8px padding per design
  const sizeClasses = {
    default: iconPosition === 'only' 
      ? 'w-12 h-12 p-3' 
      : 'px-6 py-2.5 text-label-lg',
    small: iconPosition === 'only' 
      ? 'w-8 h-8 p-2' 
      : 'px-5 py-2 text-label-base'
  };
  
  // Light mode variant classes based on semantic color tokens
  const lightModeVariants = {
    primary: "bg-[#6e1e3b] text-[#f9fafb] hover:bg-[#5c1931] active:bg-[#491427] disabled:bg-[#e2d2d8] disabled:text-[#9e697c]",
    secondary: "bg-[#f8e5ed] text-[#5c1931] hover:bg-[#f4d7e3] active:bg-[#f1cada] disabled:text-[#9e697c] border border-[#5c1931]",
    tertiary: "bg-[#274f8c] text-[#d4dce8] hover:bg-[#214275] active:bg-[#1a355d] disabled:bg-[#d4dce8] disabled:text-[#93a7c5] border border-[#214275]",
    ghost: "bg-transparent text-[#030712] hover:bg-[#f8e5ed] active:bg-[#f4d7e3] disabled:text-[#9e697c]",
    link: "bg-transparent text-[#030712] hover:underline p-0 disabled:text-[#9e697c] disabled:no-underline"
  };
  
  // Dark mode variant classes
  const darkModeVariants = {
    primary: "bg-[#eab0c8] text-[#370f1e] hover:bg-[#f1cada] active:bg-[#f4d7e3] disabled:bg-[#c393a7] disabled:text-[#755864]",
    secondary: "bg-[#eab0c8] text-[#370f1e] hover:bg-[#f1cada] active:bg-[#f4d7e3] disabled:text-[#755864] border border-[#370f1e]",
    tertiary: "bg-[#274f8c] text-[#d4dce8] hover:bg-[#214275] active:bg-[#1a355d] disabled:bg-[#d4dce8] disabled:text-[#93a7c5] border border-[#214275]",
    ghost: "bg-transparent text-[#f9fafb] hover:bg-[#eab0c8]/10 active:bg-[#eab0c8]/20 disabled:text-[#755864]",
    link: "bg-transparent text-[#f9fafb] hover:underline p-0 disabled:text-[#755864] disabled:no-underline"
  };
  
  // Select variant based on dark mode
  const variantClasses = darkMode ? darkModeVariants : lightModeVariants;
  
  // Width classes
  const widthClasses = fullWidth ? "w-full" : "";
  
  // Icon spacing classes - using exact values from Figma (8px for default, 4px for small)
  const iconSpacingClasses = {
    'leading': size === 'small' ? 'gap-1' : 'gap-2',
    'trailing': size === 'small' ? 'gap-1' : 'gap-2',
    'no-icon': '',
    'only': ''
  };
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size] || sizeClasses.default}
    ${variantClasses[variant] || variantClasses.primary}
    ${widthClasses}
    ${iconSpacingClasses[iconPosition]}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  // Render icon based on position and apply correct color
  const renderIcon = () => {
    if (!icon || iconPosition === 'no-icon') return null;
    
    // Clone the icon element to apply the correct color and size from design
    return React.cloneElement(icon, {
      className: `${icon.props.className || ''} ${iconPosition === 'only' ? 'mx-auto' : ''}`,
      style: { ...icon.props.style, color: 'currentColor' },
      // For small buttons, icon is 16px, for regular it's 20px
      width: size === 'small' ? 16 : 20,
      height: size === 'small' ? 16 : 20,
    });
  };
  
  // Render children based on icon position
  const renderContent = () => {
    if (iconPosition === 'only') return renderIcon();
    
    return (
      <>
        {iconPosition === 'leading' && renderIcon()}
        <span className="whitespace-nowrap">{children}</span>
        {iconPosition === 'trailing' && renderIcon()}
      </>
    );
  };

  // Render as link if href is provided
  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        {renderContent()}
      </a>
    );
  }
  
  // Render as router Link if to is provided
  if (to) {
    return (
      <Link
        to={to}
        className={buttonClasses}
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        {renderContent()}
      </Link>
    );
  }
  
  // Default: render as button
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={props.type || 'button'}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button; 