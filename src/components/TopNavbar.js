<<<<<<< HEAD
// src/components/TopNavbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopNavbar.css'; // Custom CSS for TopNavbar

function TopNavbar() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Simulate sign-in state
  const [isMobile, setIsMobile] = useState(false); // Check if screen size is mobile

  // Toggle sign-in state for testing
  const toggleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  };

  // Check screen size for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update the state if screen width <= 768px
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Update state on window resize

    return () => window.removeEventListener('resize', handleResize); // Cleanup listener
=======
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './context/CartContext'; // ✅ Import
import './TopNavbar.css';

function TopNavbar() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { cartItems } = useCart(); // ✅ use cart

  const toggleSignIn = () => setIsSignedIn(!isSignedIn);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
>>>>>>> a7b10ae (Updated files and added new changes)
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg custom-navbar shadow-lg animate__animated animate__fadeInDown ${isMobile ? 'navbar-mobile' : ''}`}>
      <div className="container-fluid">
<<<<<<< HEAD
        {/* Logo Image */}
        <Link className="navbar-brand logo" to="/">
          <img 
            src={`${process.env.PUBLIC_URL}/images/navlogo.jpeg`} 
=======
        <Link className="navbar-brand logo" to="/">
          <img 
            src={`${process.env.PUBLIC_URL}/Shirts/velnor-new-logo.jpg`} 
>>>>>>> a7b10ae (Updated files and added new changes)
            alt="Velnor Logo" 
            className="nav-logo-img"
          />
        </Link>

<<<<<<< HEAD
        {/* Hamburger Menu Icon for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fas fa-bars"></i> {/* FontAwesome hamburger icon */}
          </span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item animate__animated animate__fadeIn animate__delay-1s">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item animate__animated animate__fadeIn animate__delay-1s">
    <Link className="nav-link" to="/add-products">Add Products</Link> {/* 🔧 Fixed label */}
  </li>
            <li className="nav-item animate__animated animate__fadeIn animate__delay-2s">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item animate__animated animate__fadeIn animate__delay-3s">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            {!isSignedIn ? (
              <>
                <li className="nav-item animate__animated animate__fadeIn animate__delay-4s">
                  <Link className="nav-link" to="/signin">Sign In</Link>
                </li>
                <li className="nav-item animate__animated animate__fadeIn animate__delay-4s">
                  <button className="btn btn-link" onClick={toggleSignIn}>Simulate Sign In</button>
                </li>
              </>
            ) : (
              <li className="nav-item animate__animated animate__fadeIn animate__delay-4s">
                <button className="btn btn-link" onClick={toggleSignIn}>Sign Out</button>
              </li>
            )}
=======
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"><i className="fas fa-bars"></i></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/add-products">Add Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            {!isSignedIn ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/signin">Sign In</Link></li>
                <li className="nav-item"><button className="btn btn-link" onClick={toggleSignIn}>Simulate Sign In</button></li>
              </>
            ) : (
              <li className="nav-item"><button className="btn btn-link" onClick={toggleSignIn}>Sign Out</button></li>
            )}
            {/* ✅ Cart Icon with Count */}
            <li className="nav-item cart-icon">
              <Link className="nav-link" to="/checkout">
                <i className="fas fa-shopping-cart"></i>
                {cartItems.length > 0 && (
                  <span className="cart-count">{cartItems.length}</span>
                )}
              </Link>
            </li>
>>>>>>> a7b10ae (Updated files and added new changes)
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default TopNavbar;
