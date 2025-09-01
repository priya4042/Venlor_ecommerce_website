// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './components/context/AuthContext';
import { CartProvider } from './components/context/CartContext';

import TopNavbar from './components/TopNavbar';
import Footer from './components/Footer';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import ProductPage from './components/ProductPage';
import ProductDetailPage from './components/ProductDetailPage';
import About from './components/About';
import Contact from './components/Contact';
import AddProducts from './components/AddProducts';
import CheckoutPage from './components/CheckoutPage';
import PaymentPage from './components/PaymentPage';
import OrderSuccess from './components/OrderSuccess';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Spinner } from 'react-bootstrap'; // Optional: loading animation

// ✅ Show loading screen while auth is initializing
const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen" style={{ textAlign: 'center', padding: '5rem', color: 'white' }}>
        <Spinner animation="border" variant="light" />
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <CartProvider>
      {/* ✅ Set basename to match GitHub repo name */}
      <BrowserRouter basename="/Venlor_ecommerce_website">
        <TopNavbar />
        <div className="containers">
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />

            {/* ✅ Public Routes */}
            <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
            <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

            {/* ✅ Public Pages */}
            <Route path="/products" element={<ProductPage />} />
            <Route path="/about" element={<About />} />

            {/* ✅ Protected Routes */}
            <Route path="/product/:id" element={<PrivateRoute><ProductDetailPage /></PrivateRoute>} />
            <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
            <Route path="/add-products" element={<PrivateRoute><AddProducts /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
};

// ✅ Wrap app in AuthProvider first
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
