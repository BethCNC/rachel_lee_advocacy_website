import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Button component that renders as a button, link, or router Link
 * Ready for new design tokens
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
  // Base classes
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-full transition-all";
  
  // Size classes - will be updated with new design tokens
  const sizeClasses = {
    default: iconPosition === 'only' 
      ? 'w-12 h-12 p-3' 
      : 'px-6 py-2.5 text-base',
    small: iconPosition === 'only' 
      ? 'w-8 h-8 p-2' 
      : 'px-5 py-2 text-sm'
  };
  
  // Variant classes - will be updated with new design tokens
  const lightModeVariants = {
    primary: "bg-black text-white hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-300 disabled:text-gray-500",
    secondary: "bg-white text-black hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-400 border border-black",
    tertiary: "bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900 disabled:bg-blue-200 disabled:text-blue-400",
    ghost: "bg-transparent text-black hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-400",
    link: "bg-transparent text-black hover:underline p-0 disabled:text-gray-400 disabled:no-underline"
  };
  
  // Dark mode variant classes - will be updated with new design tokens
  const darkModeVariants = {
    primary: "bg-white text-black hover:bg-gray-200 active:bg-gray-300 disabled:bg-gray-700 disabled:text-gray-500",
    secondary: "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-600 disabled:text-gray-500 border border-white",
    tertiary: "bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-300 disabled:bg-blue-800 disabled:text-blue-600",
    ghost: "bg-transparent text-white hover:bg-gray-800 active:bg-gray-700 disabled:text-gray-600",
    link: "bg-transparent text-white hover:underline p-0 disabled:text-gray-500 disabled:no-underline"
  };
  
  // Select the appropriate variant classes based on dark mode
  const variantClasses = darkMode ? darkModeVariants[variant] : lightModeVariants[variant];
  
  // Width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses} ${widthClass} ${className}`;
  
  // Render icon if provided
  const renderIcon = () => {
    if (!icon) return null;
    
    return React.cloneElement(icon, {
      className: `${iconPosition === 'left' ? 'mr-2' : ''} ${iconPosition === 'right' ? 'ml-2' : ''} ${iconPosition === 'only' ? '' : 'w-5 h-5'}`,
      'aria-hidden': 'true'
    });
  };
  
  // Render content based on icon position
  const renderContent = () => {
    if (iconPosition === 'left') {
      return (
        <>
          {renderIcon()}
          {children}
        </>
      );
    } else if (iconPosition === 'right') {
      return (
        <>
          {children}
          {renderIcon()}
        </>
      );
    } else if (iconPosition === 'only') {
      return renderIcon();
    } else {
      return children;
    }
  };
  
  // If it's a link (external)
  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {renderContent()}
      </a>
    );
  }
  
  // If it's a router Link (internal)
  if (to) {
    return (
      <Link
        to={to}
        className={combinedClasses}
        {...props}
      >
        {renderContent()}
      </Link>
    );
  }
  
  // Default button
  return (
    <button
      type="button"
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button; 