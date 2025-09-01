// src/components/CartDrawer.jsx
import React from 'react';
import { useCart } from './context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

const CartDrawer = ({ onClose }) => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) return null;

  // ✅ Group items by ID and count quantity
  const groupedItems = cartItems.reduce((acc, item) => {
    const existing = acc.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="cart-drawer">
      <div className="cart-drawer-overlay" onClick={onClose}></div>
      <div className="cart-drawer-content">
        <h2>🛒 Your Cart</h2>

        {groupedItems.map((item, index) => {
          const offerPrice = item.price - 197;
          const total = offerPrice * item.quantity;

          return (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p><strong>Price:</strong> ₹{item.price}</p>
                <p><strong>Offer Price:</strong> ₹{offerPrice}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Total:</strong> ₹{total}</p>
              </div>
            </div>
          );
        })}

        <div className="cart-buttons">
          <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
          <button className="checkout-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
