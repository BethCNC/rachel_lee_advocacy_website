import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/variables.css';
import './styles/typography.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 