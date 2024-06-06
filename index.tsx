// index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/client/App';

// Create a mock DOM element
const rootElement = document.createElement('div');
rootElement.id = 'root';

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);