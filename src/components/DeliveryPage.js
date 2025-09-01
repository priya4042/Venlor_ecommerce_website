// src/components/DeliveryPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const DeliveryPage = () => {
  const { setUserAddress } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserAddress(address);
    navigate('/checkout'); // proceed to checkout
  };

  return (
    <div className="delivery-page">
      <h2>Enter Delivery Address</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          required
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Save & Continue</button>
      </form>
    </div>
  );
};

export default DeliveryPage;
