import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Creating a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
