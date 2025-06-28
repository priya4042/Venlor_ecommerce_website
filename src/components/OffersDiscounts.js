// src/components/OffersDiscounts.jsx

import React from 'react';
import './OffersDiscounts.css';
import { FaTags, FaGift, FaPercent } from 'react-icons/fa';

const OffersDiscounts = () => {
  return (
    <div className="offers-discounts">
      <h3>Special Offers</h3>
      <ul>
        <li><FaGift className="icon" /> Buy 2 Get 1 Free</li>
        <li><FaPercent className="icon" /> Use Code <strong>VEL10</strong> for 10% OFF</li>
        <li><FaTags className="icon" /> Extra ₹50 OFF on prepaid orders</li>
      </ul>
    </div>
  );
};

export default OffersDiscounts;
