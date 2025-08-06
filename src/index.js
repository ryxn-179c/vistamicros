// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Solo configura axios si el archivo existe
try {
  const setupAxiosInterceptors = require('./axiosConfig').default;
  setupAxiosInterceptors();
} catch (error) {
  console.warn('axiosConfig.js no encontrado, continuando sin configuración de axios');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();