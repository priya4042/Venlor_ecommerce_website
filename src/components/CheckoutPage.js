// src/components/CheckoutPage.jsx
import React, { useState } from 'react';
import { useCart } from './context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import 'animate.css';

const CheckoutPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Simulate if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 🧠 Set this true if user logs in

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      alert('Please fill in delivery details!');
      return;
    }

    alert('🎉 Your order has been placed successfully!');
    clearCart();
    navigate('/');
  };

  const handleInputChange = (e) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="checkout-page">
      <h1 className="checkout-title animate__animated animate__fadeInDown">🛒 Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart animate__animated animate__fadeIn">Your cart is empty.</p>
      ) : (
        <div className="checkout-content animate__animated animate__fadeInUp">
          {!isLoggedIn && (
            <div className="delivery-form animate__animated animate__fadeInLeft">
              <h3 className="form-title">📦 Enter Delivery Details</h3>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={deliveryInfo.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={deliveryInfo.phone}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Full Address"
                value={deliveryInfo.address}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={deliveryInfo.pincode}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <div className="checkout-items">
            {cartItems.map((item, index) => (
              <div className="checkout-item-card animate__animated animate__zoomIn" key={index}>
                <img src={item.image} alt={item.name} className="checkout-item-image" />
                <div className="checkout-item-info">
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-price">₹ {item.price}</p>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-summary animate__animated animate__fadeInRight">
            <div className="summary-box">
              <h3>Total Items: <span>{cartItems.length}</span></h3>
              <h2>Total: ₹ <span>{totalPrice}</span></h2>
              <button className="place-order-btn" onClick={handlePlaceOrder}>
                🚀 Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
