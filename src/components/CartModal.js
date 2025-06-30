// src/components/CartModal.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext';
import './CartModal.css';

const CartModal = ({ onClose }) => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // Calculate total price after discount
  const totalPrice = cartItems.reduce(
    (total, item) => total + ((item.price || 0) - 197) * item.quantity,
    0
  );

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>×</button>
        <h2>🛒 Products Added to Cart</h2>

        {/* Render each item in the cart */}
        {cartItems.map((item, index) => (
          <div className="modal-cart-item" key={index}>
            {/* Product image from media array */}
            <img
              src={item.media?.[0] || 'https://via.placeholder.com/100'}
              alt={item.title || 'Product'}
              className="modal-cart-img"
            />

            <div className="modal-item-info">
              <h4>{item.title || 'Untitled Product'}</h4>
              <p>Price: ₹{item.price}</p>
              <p>Offer Price: ₹{(item.price || 0) - 197}</p>
              <p>Qty: {item.quantity}</p>
              <p>Total: ₹{((item.price || 0) - 197) * item.quantity}</p>
            </div>
          </div>
        ))}

        <div className="modal-total">
          <strong>Grand Total: ₹{totalPrice}</strong>
        </div>

        <button className="go-to-cart-btn" onClick={() => navigate('/checkout')}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartModal;
