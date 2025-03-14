import React, { useState } from 'react';
import Logo from './Logo';
import { useTheme } from '../../hooks/useTheme';

/**
 * LogoShowcase Component
 * 
 * Demonstrates all logo variants and their properties
 */
const LogoShowcase = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [selectedColor, setSelectedColor] = useState('default');
  const [selectedStyle, setSelectedStyle] = useState('default');

  const colors = [
    'default', 'bloom', 'sea', 'citrine', 'berry', 
    'ocean', 'cloud', 'onyx', 'pebble'
  ];

  const styles = ['default', 'outline', 'color-with-black'];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Logo Showcase</h1>
        <button 
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-brand-sea-500 text-white rounded-md hover:bg-brand-sea-600 transition-colors"
        >
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-medium mb-4">Color & Style Controls</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <label className="block mb-2 font-medium">Color:</label>
            <select 
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              {colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Style:</label>
            <select 
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              {styles.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Primary Logo Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Primary Logos</h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col items-center">
            <Logo 
              type="primary" 
              variant="full" 
              size="md" 
              color={selectedColor} 
              style={selectedStyle}
              className="mb-4"
            />
            <span className="text-sm">Full Logo</span>
          </div>
          <div className="flex flex-col items-center">
            <Logo 
              type="primary" 
              variant="mark" 
              size="md" 
              color={selectedColor} 
              style={selectedStyle}
              className="mb-4"
            />
            <span className="text-sm">Mark Only</span>
          </div>
        </div>
      </section>

      {/* Text Logo Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Text Logos</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center">
            <Logo 
              type="text" 
              variant="horizontal" 
              size="md" 
              color={selectedColor} 
              style={selectedStyle}
              className="mb-4"
            />
            <span className="text-sm">Horizontal</span>
          </div>
          <div className="flex flex-col items-center">
            <Logo 
              type="text" 
              variant="stacked" 
              size="md" 
              color={selectedColor} 
              style={selectedStyle}
              className="mb-4"
            />
            <span className="text-sm">Stacked</span>
          </div>
          <div className="flex flex-col items-center">
            <Logo 
              type="text" 
              variant="staggered" 
              size="md" 
              color={selectedColor} 
              style={selectedStyle}
              className="mb-4"
            />
            <span className="text-sm">Staggered</span>
          </div>
        </div>
      </section>

      {/* Ginkgo Logo Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Ginkgo Logos</h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col items-center">
            <Logo 
              type="ginkgo" 
              variant="leaf" 
              size="md" 
              color={selectedColor} 
              style={selectedStyle}
              className="mb-4"
            />
            <span className="text-sm">Leaf</span>
          </div>
          <div className="flex flex-col items-center">
            <Logo 
              type="ginkgo" 
              variant="leaf-arch" 
              size="md" 
              color={selectedColor} 
              style={selectedStyle}
              className="mb-4"
            />
            <span className="text-sm">Leaf with Arch</span>
          </div>
          <div className="flex flex-col items-center">
            <Logo 
              type="ginkgo" 
              variant="circle-leaf" 
              size="md" 
              color={selectedColor} 
              style={selectedStyle}
              className="mb-4"
            />
            <span className="text-sm">Circle Leaf</span>
          </div>
          <div className="flex flex-col items-center">
            <Logo 
              type="ginkgo" 
              variant="arch-leaf" 
              size="md" 
              color={selectedColor} 
              style={selectedStyle}
              className="mb-4"
            />
            <span className="text-sm">Arch Leaf</span>
          </div>
        </div>
      </section>

      {/* Size Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Size Variants</h2>
        <div className="flex flex-wrap gap-8 items-end">
          <div className="flex flex-col items-center">
            <Logo type="primary" size="xs" color={selectedColor} style={selectedStyle} className="mb-2" />
            <span className="text-sm">XS</span>
          </div>
          <div className="flex flex-col items-center">
            <Logo type="primary" size="sm" color={selectedColor} style={selectedStyle} className="mb-2" />
            <span className="text-sm">SM</span>
          </div>
          <div className="flex flex-col items-center">
            <Logo type="primary" size="md" color={selectedColor} style={selectedStyle} className="mb-2" />
            <span className="text-sm">MD</span>
          </div>
          <div className="flex flex-col items-center">
            <Logo type="primary" size="lg" color={selectedColor} style={selectedStyle} className="mb-2" />
            <span className="text-sm">LG</span>
          </div>
          <div className="flex flex-col items-center">
            <Logo type="primary" size="xl" color={selectedColor} style={selectedStyle} className="mb-2" />
            <span className="text-sm">XL</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LogoShowcase; 