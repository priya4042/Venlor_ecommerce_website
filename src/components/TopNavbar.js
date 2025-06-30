// src/components/TopNavbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import './TopNavbar.css';

function TopNavbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  return (
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
            <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/add-products">Add Products</Link></li>

            {user ? (
              <>
                <li className="nav-item"><span className="nav-link">👋 {user.username}</span></li>
                <li className="nav-item"><button className="btn nav-link" onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <li className="nav-item"><Link className="nav-link" to="/signin">Sign In</Link></li>
            )}

            <li className="nav-item cart-icon">
              <Link className="nav-link" to="/checkout">
                🛒 {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default TopNavbar;
