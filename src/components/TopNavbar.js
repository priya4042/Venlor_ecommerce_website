import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './context/CartContext'; // ✅ Cart Context
import './TopNavbar.css';

function TopNavbar() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { cartItems } = useCart(); // ✅ Access cart items

  const toggleSignIn = () => setIsSignedIn(!isSignedIn);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg custom-navbar shadow-lg ${isMobile ? 'navbar-mobile' : ''}`}>
      <div className="container-fluid">
        {/* ✅ Logo */}
        <Link className="navbar-brand logo" to="/">
          <img 
            src={`${process.env.PUBLIC_URL}/Shirts/velnor-new-logo.jpg`} 
            alt="Velnor Logo" 
            className="nav-logo-img"
          />
        </Link>

        {/* ✅ Hamburger for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon">
            <i className="fas fa-bars"></i>
          </span>
        </button>

        {/* ✅ Navigation links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/add-products">Add Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>

            {!isSignedIn ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/signin">Sign In</Link></li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={toggleSignIn}>Simulate Sign In</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={toggleSignIn}>Sign Out</button>
              </li>
            )}

            {/* ✅ Cart icon with dynamic count */}
            <li className="nav-item cart-icon">
              <Link className="nav-link" to="/checkout">
                <i className="fas fa-shopping-cart"></i>
                {cartItems.length > 0 && (
                  <span className="cart-count">{cartItems.length}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default TopNavbar;
