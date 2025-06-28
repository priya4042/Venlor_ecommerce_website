import React from 'react';
import './CartDrawer.css';

const CartDrawer = ({ cartItem, onClose }) => {
  if (!cartItem) return null;

  return (
    <div className="cart-drawer">
      <div className="cart-drawer-overlay" onClick={onClose}></div>
      <div className="cart-drawer-content">
        <h2>🛒 Your Cart</h2>
        <div className="cart-item">
          <img src={cartItem.image} alt={cartItem.name} />
          <div className="cart-details">
            <h3>{cartItem.name}</h3>
            <p>Price: ₹{cartItem.price}</p>
            <p>Offer Price: ₹{cartItem.price - 197}</p>
            <p>Quantity: 1</p>
            <p>Total: ₹{cartItem.price - 197}</p>
          </div>
        </div>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartDrawer;
