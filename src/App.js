<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
=======
// ✅ Import necessary React and routing tools
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// ✅ Import your component pages
>>>>>>> a7b10ae (Updated files and added new changes)
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TopNavbar from './components/TopNavbar';
import ForgotPassword from './components/ForgotPassword';
<<<<<<< HEAD
import './App.css';
=======
>>>>>>> a7b10ae (Updated files and added new changes)
import ProductPage from './components/ProductPage';
import ProductDetailPage from './components/ProductDetailPage';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
<<<<<<< HEAD
import AddProducts from './components/AddProducts'; // ✅ ADD THIS
=======
import AddProducts from './components/AddProducts';
import CheckoutPage from './components/CheckoutPage'; // ✅ New route for cart checkout

// ✅ Import CartContext Provider
import { CartProvider } from './components/context/CartContext';

// ✅ Import global styles
import './App.css';
>>>>>>> a7b10ae (Updated files and added new changes)
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
<<<<<<< HEAD
    <Router basename="/ecommerce-website">
      <TopNavbar />
      <div className="containers">
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/add-products" element={<AddProducts />} />
        </Routes>
      </div>
      <Footer />
    </Router>
=======
    // ✅ Wrap the entire app in CartProvider so cart state is global
    <CartProvider>
      <Router basename="/ecommerce-website">
        {/* ✅ Top navigation bar */}
        <TopNavbar />

        {/* ✅ Container for page content */}
        <div className="containers">
          <Routes>
            {/* ✅ Define routes for all pages */}
            <Route path="/" element={<ProductPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add-products" element={<AddProducts />} />
            <Route path="/checkout" element={<CheckoutPage />} /> {/* ✅ Cart route */}
          </Routes>
        </div>

        {/* ✅ Global footer */}
        <Footer />
      </Router>
    </CartProvider>
>>>>>>> a7b10ae (Updated files and added new changes)
  );
}

export default App;
