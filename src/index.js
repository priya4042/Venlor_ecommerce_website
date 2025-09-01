import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './components/context/CartContext'; // ✅ Import Cart Context

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider> {/* ✅ Wrap App with CartProvider */}
      <App />
    </CartProvider>
  </React.StrictMode>
);

// Optional: Performance measurement
reportWebVitals();
