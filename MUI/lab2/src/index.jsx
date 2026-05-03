import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Entry Point
 * 
 * This file tells React where to render our 'App' component in the HTML.
 * We find the 'root' div in public/index.html and inject our React code there.
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
