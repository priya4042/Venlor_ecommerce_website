<<<<<<< HEAD
=======
// src/index.js
>>>>>>> a7b10ae (Updated files and added new changes)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
=======
import { CartProvider } from './components/context/CartContext'; // ✅ Import Cart Context
>>>>>>> a7b10ae (Updated files and added new changes)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
=======
    <CartProvider> {/* ✅ Wrap App with CartProvider */}
      <App />
    </CartProvider>
  </React.StrictMode>
);

>>>>>>> a7b10ae (Updated files and added new changes)
reportWebVitals();
