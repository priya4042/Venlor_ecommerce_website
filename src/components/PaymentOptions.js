// src/components/PaymentOptions.jsx

import React, { useState } from 'react';
import './PaymentOptions.css';

const PaymentOptions = ({ totalPrice, onSuccess, onBack }) => {
  const [method, setMethod] = useState('');
  const [id, setId] = useState('');

  const handleConfirm = () => {
    if (!method) return alert('Please select a payment method.');
    if (!id.trim()) return alert('Please enter your payment ID.');
    onSuccess({ method, id });
  };

  return (
    <div className="payment-overlay">
      <div className="payment-modal">
        <button className="close-btn" onClick={onBack}>← Back</button>
        <h2>Choose Payment Method</h2>
        <p>Total to Pay: ₹{totalPrice}</p>

        <div className="methods">
          {['Paytm', 'Razorpay', 'Google Pay', 'UPI'].map((m) => (
            <label key={m} className={method === m ? 'active' : ''}>
              <input
                type="radio"
                value={m}
                checked={method === m}
                onChange={() => setMethod(m)}
              />
              {m}
            </label>
          ))}
        </div>

        {method && (
          <div className="input-id">
            <label>Enter your {method} ID:</label>
            <input
              type="text"
              placeholder={`Your ${method} ID or UPI`}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
        )}

        <button className="pay-btn" onClick={handleConfirm}>✅ Pay & Confirm</button>
      </div>
    </div>
  );
};

export default PaymentOptions;
