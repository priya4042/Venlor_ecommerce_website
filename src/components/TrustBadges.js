// src/components/TrustBadges.jsx

import React from 'react';
import './TrustBadges.css';
import { FaShippingFast, FaLock, FaUndoAlt } from 'react-icons/fa';

const TrustBadges = () => {
  return (
    <div className="trust-badges">
      <div className="badge">
        <FaShippingFast /> Free Delivery 🛵
      </div>
      <div className="badge">
        <FaLock /> Secure Payment 🔐
      </div>
      <div className="badge">
        <FaUndoAlt /> Easy Returns 🔄
      </div>
    </div>
  );
};

export default TrustBadges;
