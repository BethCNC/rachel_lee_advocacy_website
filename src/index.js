import React from 'react';
import { createRoot } from 'react-dom/client';
// Only importing the essential CSS file that imports all others
import './styles/index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 