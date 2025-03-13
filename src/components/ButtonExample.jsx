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
        <h1 className="text-heading-2xl mb-6">Light Mode</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-heading-xl mb-4">Button Variants</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div>
            <h2 className="text-heading-xl mb-4">Small Size</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary" size="small">Primary</Button>
              <Button variant="secondary" size="small">Secondary</Button>
              <Button variant="tertiary" size="small">Tertiary</Button>
              <Button variant="ghost" size="small">Ghost</Button>
              <Button variant="link" size="small">Link</Button>
            </div>
          </div>

          <div>
            <h2 className="text-heading-xl mb-4">With Leading Icons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" icon={<StarIcon />} iconPosition="leading">Primary</Button>
              <Button variant="secondary" icon={<StarIcon />} iconPosition="leading">Secondary</Button>
              <Button variant="tertiary" icon={<StarIcon />} iconPosition="leading">Tertiary</Button>
              <Button variant="ghost" icon={<StarIcon />} iconPosition="leading">Ghost</Button>
              <Button variant="link" icon={<StarIcon />} iconPosition="leading">Link</Button>
            </div>
          </div>
          
          <div>
            <h2 className="text-heading-xl mb-4">With Leading Icons (Small)</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="small" icon={<StarIcon />} iconPosition="leading">Primary</Button>
              <Button variant="secondary" size="small" icon={<StarIcon />} iconPosition="leading">Secondary</Button>
              <Button variant="tertiary" size="small" icon={<StarIcon />} iconPosition="leading">Tertiary</Button>
              <Button variant="ghost" size="small" icon={<StarIcon />} iconPosition="leading">Ghost</Button>
              <Button variant="link" size="small" icon={<StarIcon />} iconPosition="leading">Link</Button>
            </div>
          </div>

          <div>
            <h2 className="text-heading-xl mb-4">With Trailing Icons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" icon={<StarIcon />} iconPosition="trailing">Primary</Button>
              <Button variant="secondary" icon={<StarIcon />} iconPosition="trailing">Secondary</Button>
              <Button variant="tertiary" icon={<StarIcon />} iconPosition="trailing">Tertiary</Button>
              <Button variant="ghost" icon={<StarIcon />} iconPosition="trailing">Ghost</Button>
              <Button variant="link" icon={<StarIcon />} iconPosition="trailing">Link</Button>
            </div>
          </div>
          
          <div>
            <h2 className="text-heading-xl mb-4">With Trailing Icons (Small)</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="small" icon={<StarIcon />} iconPosition="trailing">Primary</Button>
              <Button variant="secondary" size="small" icon={<StarIcon />} iconPosition="trailing">Secondary</Button>
              <Button variant="tertiary" size="small" icon={<StarIcon />} iconPosition="trailing">Tertiary</Button>
              <Button variant="ghost" size="small" icon={<StarIcon />} iconPosition="trailing">Ghost</Button>
              <Button variant="link" size="small" icon={<StarIcon />} iconPosition="trailing">Link</Button>
            </div>
          </div>

          <div>
            <h2 className="text-heading-xl mb-4">Icon Only</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" icon={<StarIcon />} iconPosition="only" aria-label="Star Primary" />
              <Button variant="secondary" icon={<StarIcon />} iconPosition="only" aria-label="Star Secondary" />
              <Button variant="tertiary" icon={<StarIcon />} iconPosition="only" aria-label="Star Tertiary" />
              <Button variant="ghost" icon={<StarIcon />} iconPosition="only" aria-label="Star Ghost" />
            </div>
          </div>
          
          <div>
            <h2 className="text-heading-xl mb-4">Icon Only (Small)</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="small" icon={<StarIcon />} iconPosition="only" aria-label="Star Primary" />
              <Button variant="secondary" size="small" icon={<StarIcon />} iconPosition="only" aria-label="Star Secondary" />
              <Button variant="tertiary" size="small" icon={<StarIcon />} iconPosition="only" aria-label="Star Tertiary" />
              <Button variant="ghost" size="small" icon={<StarIcon />} iconPosition="only" aria-label="Star Ghost" />
            </div>
          </div>
        </div>
      </div>

      {/* Dark Mode Examples */}
      <div className="p-8 bg-[#030712] rounded-xl">
        <h1 className="text-heading-2xl mb-6 text-white">Dark Mode</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-heading-xl mb-4 text-white">Button Variants</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" darkMode>Primary</Button>
              <Button variant="secondary" darkMode>Secondary</Button>
              <Button variant="tertiary" darkMode>Tertiary</Button>
              <Button variant="ghost" darkMode>Ghost</Button>
              <Button variant="link" darkMode>Link</Button>
            </div>
          </div>

          <div>
            <h2 className="text-heading-xl mb-4 text-white">Small Size</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary" size="small" darkMode>Primary</Button>
              <Button variant="secondary" size="small" darkMode>Secondary</Button>
              <Button variant="tertiary" size="small" darkMode>Tertiary</Button>
              <Button variant="ghost" size="small" darkMode>Ghost</Button>
              <Button variant="link" size="small" darkMode>Link</Button>
            </div>
          </div>

          <div>
            <h2 className="text-heading-xl mb-4 text-white">With Leading Icons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" icon={<StarIcon />} iconPosition="leading" darkMode>Primary</Button>
              <Button variant="secondary" icon={<StarIcon />} iconPosition="leading" darkMode>Secondary</Button>
              <Button variant="tertiary" icon={<StarIcon />} iconPosition="leading" darkMode>Tertiary</Button>
              <Button variant="ghost" icon={<StarIcon />} iconPosition="leading" darkMode>Ghost</Button>
              <Button variant="link" icon={<StarIcon />} iconPosition="leading" darkMode>Link</Button>
            </div>
          </div>
          
          <div>
            <h2 className="text-heading-xl mb-4 text-white">With Trailing Icons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" icon={<StarIcon />} iconPosition="trailing" darkMode>Primary</Button>
              <Button variant="secondary" icon={<StarIcon />} iconPosition="trailing" darkMode>Secondary</Button>
              <Button variant="tertiary" icon={<StarIcon />} iconPosition="trailing" darkMode>Tertiary</Button>
              <Button variant="ghost" icon={<StarIcon />} iconPosition="trailing" darkMode>Ghost</Button>
              <Button variant="link" icon={<StarIcon />} iconPosition="trailing" darkMode>Link</Button>
            </div>
          </div>

          <div>
            <h2 className="text-heading-xl mb-4 text-white">Icon Only</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" icon={<StarIcon />} iconPosition="only" darkMode aria-label="Star Primary" />
              <Button variant="secondary" icon={<StarIcon />} iconPosition="only" darkMode aria-label="Star Secondary" />
              <Button variant="tertiary" icon={<StarIcon />} iconPosition="only" darkMode aria-label="Star Tertiary" />
              <Button variant="ghost" icon={<StarIcon />} iconPosition="only" darkMode aria-label="Star Ghost" />
            </div>
          </div>
          
          <div>
            <h2 className="text-heading-xl mb-4 text-white">States</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" disabled darkMode>Disabled</Button>
              <Button variant="secondary" disabled darkMode>Disabled</Button>
              <Button variant="tertiary" disabled darkMode>Disabled</Button>
              <Button variant="ghost" disabled darkMode>Disabled</Button>
              <Button variant="link" disabled darkMode>Disabled</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonExample; 