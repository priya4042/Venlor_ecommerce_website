// src/components/PaymentPage.jsx
import React from 'react';
import './PaymentPage.css';
import RazorpayCheckout from './RazorpayCheckout';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice, deliveryInfo, totalItems } = location.state || {};

  const handlePaymentSuccess = (paymentDetails) => {
    navigate('/order-success', {
      state: {
        paymentDetails,
        totalPrice,
        totalItems,
        deliveryInfo,
      },
    });
  };

  if (!deliveryInfo) return <p>Invalid Access</p>;

  return (
    <div className="payment-page">
      <h2>💳 Choose Payment Method</h2>
      <div className="payment-options">
        <RazorpayCheckout
          amount={totalPrice}
          deliveryInfo={deliveryInfo}
          onSuccess={handlePaymentSuccess}
        />
        {/* Add more options later */}
      </div>
    </div>
  );
};

export default PaymentPage;
