import React from 'react';
import Button from './Button';

// SVG star icon for demonstration
const StarIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

/**
 * Example component demonstrating various Button configurations
 */
const ButtonExample = () => {
  return (
    <div className="p-8 space-y-12">
      {/* Light Mode Examples */}
      <div>
        <h1 className="text-2xl font-bold mb-6">Light Mode</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Button Variants</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Small Size</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary" size="small">Primary</Button>
              <Button variant="secondary" size="small">Secondary</Button>
              <Button variant="tertiary" size="small">Tertiary</Button>
              <Button variant="ghost" size="small">Ghost</Button>
              <Button variant="link" size="small">Link</Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">With Icons</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary" icon={<StarIcon />} iconPosition="left">With Icon</Button>
              <Button variant="secondary" icon={<StarIcon />} iconPosition="right">With Icon</Button>
              <Button variant="tertiary" icon={<StarIcon />} iconPosition="only" aria-label="Star" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Full Width</h2>
            <div className="space-y-4 max-w-md">
              <Button variant="primary" fullWidth>Full Width Button</Button>
              <Button variant="secondary" fullWidth>Full Width Button</Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Disabled State</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" disabled>Primary</Button>
              <Button variant="secondary" disabled>Secondary</Button>
              <Button variant="tertiary" disabled>Tertiary</Button>
              <Button variant="ghost" disabled>Ghost</Button>
              <Button variant="link" disabled>Link</Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">As Links</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" href="https://example.com">External Link</Button>
              <Button variant="secondary" to="/example">Internal Link</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Mode Examples */}
      <div className="bg-gray-900 text-white p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Dark Mode</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Button Variants</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" darkMode>Primary</Button>
              <Button variant="secondary" darkMode>Secondary</Button>
              <Button variant="tertiary" darkMode>Tertiary</Button>
              <Button variant="ghost" darkMode>Ghost</Button>
              <Button variant="link" darkMode>Link</Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Small Size</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary" size="small" darkMode>Primary</Button>
              <Button variant="secondary" size="small" darkMode>Secondary</Button>
              <Button variant="tertiary" size="small" darkMode>Tertiary</Button>
              <Button variant="ghost" size="small" darkMode>Ghost</Button>
              <Button variant="link" size="small" darkMode>Link</Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">With Icons</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary" icon={<StarIcon />} iconPosition="left" darkMode>With Icon</Button>
              <Button variant="secondary" icon={<StarIcon />} iconPosition="right" darkMode>With Icon</Button>
              <Button variant="tertiary" icon={<StarIcon />} iconPosition="only" aria-label="Star" darkMode />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Disabled State</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" disabled darkMode>Primary</Button>
              <Button variant="secondary" disabled darkMode>Secondary</Button>
              <Button variant="tertiary" disabled darkMode>Tertiary</Button>
              <Button variant="ghost" disabled darkMode>Ghost</Button>
              <Button variant="link" disabled darkMode>Link</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonExample; 