import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
    return (
      <div>
        <h1>SEATME</h1>
      </div>
    );
  }
  
  const root = createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );