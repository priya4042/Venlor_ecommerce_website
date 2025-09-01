// src/components/DeliveryCheck.jsx

import React, { useState } from 'react';
import './DeliveryCheck.css';
import { FaMapMarkerAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const DeliveryCheck = () => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = () => {
    const serviceablePincodes = ['176001', '110001', '400001'];
    if (serviceablePincodes.includes(pincode)) {
      setResult({ success: true, message: 'Delivery available in your area ✅' });
    } else {
      setResult({ success: false, message: 'Sorry, delivery not available at this pincode ❌' });
    }
  };

  return (
    <div className="delivery-check">
      <h3>Check Delivery Availability</h3>
      <div className="input-group">
        <FaMapMarkerAlt className="icon" />
        <input
          type="text"
          placeholder="Enter your pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          maxLength="6"
        />
        <button onClick={handleCheck}>Check</button>
      </div>
      {result && (
        <div className={`result ${result.success ? 'success' : 'error'}`}>
          {result.success ? <FaCheckCircle /> : <FaTimesCircle />} {result.message}
        </div>
      )}
    </div>
  );
};

export default DeliveryCheck;
