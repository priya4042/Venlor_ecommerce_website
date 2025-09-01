// src/components/TopNavbar.jsx

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // ⬅️ useLocation
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import './TopNavbar.css';
import { FiHeart, FiSearch } from "react-icons/fi";

function TopNavbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation(); // ⬅️ current path

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedProducts, setLikedProducts] = useState([]); // later connect to context/state

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand logo" to="/">
            <img
              src={`${process.env.PUBLIC_URL}/Shirts/velnor-new-logo.jpg`}
              alt="Velnor Logo"
              className="nav-logo-img"
            />
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/products" ? "active" : ""}`}
                  to="/products"
                >
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/add-products" ? "active" : ""}`}
                  to="/add-products"
                >
                  Add Products
                </Link>
              </li>

              {/* === SEARCH ICON + INPUT === */}
              <li className={`nav-item search-container ${showSearch ? "active" : ""}`}>
                <form
                  className={`search-form ${showSearch ? "show" : ""}`}
                  onSubmit={handleSearchSubmit}
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>

                <button
                  type="button"
                  className="nav-link search-icon-btn"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <FiSearch className="search-icon-shape" />
                </button>
              </li>

              {/* === HEART (LIKED PRODUCTS) === */}
              <li className="nav-item heart-icon">
                <Link
                  className={`nav-link ${location.pathname === "/liked-products" ? "active" : ""}`}
                  to="/liked-products"
                >
                  <FiHeart className="heart-icon-shape" />
                  {likedProducts.length > 0 && (
                    <span className="heart-count">{likedProducts.length}</span>
                  )}
                </Link>
              </li>

              {/* === CART === */}
              <li className="nav-item cart-icon">
                <Link
                  className={`nav-link ${location.pathname === "/checkout" ? "active" : ""}`}
                  to="/checkout"
                >
                  🛒 {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
                </Link>
              </li>

              {/* === USER === */}
              {user ? (
                <>
                  <li className="nav-item"><span className="nav-link">👋 {user.username}</span></li>
                  <li className="nav-item"><button className="btn nav-link" onClick={handleLogout}>Logout</button></li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/signin" ? "active" : ""}`}
                    to="/signin"
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* === RIBBON === */}
      <div className="promo-ribbon">
        <div className="ribbon-text">
          ❤️ Grab 10% off on all of your Favourites &nbsp;&nbsp; 🏷 Free Delivery
          on all orders &nbsp;&nbsp; ❤️ Grab 10% off on all of your Favourites
          &nbsp;&nbsp; 🏷 Free Delivery on all orders
        </div>
      </div>
    </>
  );
}

export default TopNavbar;
