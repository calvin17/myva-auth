import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath } = {}) => {
  const root = createRoot(el);
  
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

// Export for container usage
export { default as AuthApp } from './AuthApp.jsx';

// If we are in development and in isolation,
// call mount immediately
if (import.meta.env.DEV) {
  const devRoot = document.querySelector('#root');

  if (devRoot) {
    mount(devRoot);
  }
}

// We are running through container
// and we should export the mount function
export { mount };
