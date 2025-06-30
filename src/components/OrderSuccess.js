// src/components/OrderSuccess.jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './OrderSuccess.css';
import 'animate.css';
import { getApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

const OrderSuccess = () => {
  const { state } = useLocation();

  // Move useEffect ABOVE the early return!
  useEffect(() => {
    if (!state) return; // Prevent running if state is undefined

    const { totalItems, totalPrice, deliveryInfo, paymentDetails, cartItems } = state;

    const functions = getFunctions(getApp());
    const sendOrderEmail = httpsCallable(functions, 'sendOrderEmail');

    sendOrderEmail({
      totalItems,
      totalPrice,
      deliveryInfo,
      paymentDetails,
      cartItems: cartItems || [],
    })
      .then((res) => {
        if (res.data.success) {
          console.log('✅ Email sent to admin.');
        } else {
          console.error('❌ Failed to send email:', res.data.error);
        }
      })
      .catch((err) => {
        console.error('🔥 Error sending email:', err.message);
      });
  }, [state]);

  if (!state) return <p className="invalid-access">❌ Invalid Access</p>;

  const { totalItems, totalPrice, deliveryInfo, paymentDetails } = state;

  return (
    <div className="order-success-container animate__animated animate__fadeInUp">
      <div className="success-card">
        <h2 className="success-title">🎉 Order Placed Successfully!</h2>
        <p className="success-msg">Thank you for your purchase, {deliveryInfo.name}!</p>

        <div className="success-summary">
          <h4>🧾 Order Summary</h4>
          <ul>
            <li><span>🛍️ Items:</span> {totalItems}</li>
            <li><span>💰 Amount Paid:</span> ₹{totalPrice}</li>
            <li><span>🏦 Payment Method:</span> {paymentDetails.method}</li>
            <li><span>🧾 Payment ID:</span> {paymentDetails.id}</li>
            <li><span>📞 Contact:</span> {deliveryInfo.phone}</li>
            <li><span>📍 Address:</span> {deliveryInfo.address}, {deliveryInfo.pincode}</li>
          </ul>
        </div>

        <p className="delivery-note">📦 Expected Delivery in <strong>5-7 business days</strong>.</p>
        <p className="thank-you">🙏 We appreciate your trust in VELNOR!</p>
      </div>
    </div>
  );
};

export default OrderSuccess;
