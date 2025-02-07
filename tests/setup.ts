import '@testing-library/jest-dom';

// Mock WordPress global objects
global.wp = {
  element: require('@wordpress/element'),
  components: require('@wordpress/components'),
  blocks: require('@wordpress/blocks'),
  apiFetch: require('@wordpress/api-fetch')
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
}); 