import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TopNavbar from './components/TopNavbar';
import ForgotPassword from './components/ForgotPassword';
import ProductPage from './components/ProductPage';
import ProductDetailPage from './components/ProductDetailPage';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import AddProducts from './components/AddProducts';
import CheckoutPage from './components/CheckoutPage'; // ✅ Added cart checkout route

import { CartProvider } from './components/context/CartContext'; // ✅ Cart context provider

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <CartProvider>
      <Router basename="/ecommerce-website">
        <TopNavbar />
        <div className="containers">
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add-products" element={<AddProducts />} />
            <Route path="/checkout" element={<CheckoutPage />} /> {/* ✅ Added checkout */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
