// src/components/StockStatus.jsx

import React from 'react';
import './StockStatus.css';
import { FaFire, FaExclamationCircle } from 'react-icons/fa';

const StockStatus = ({ quantity }) => {
  let message = '';
  let icon = null;
  let className = 'stock-status';

  if (quantity <= 5) {
    message = `Only ${quantity} left in stock!`;
    icon = <FaExclamationCircle />;
    className += ' low-stock';
  } else {
    message = '🔥 Trending item!';
    icon = <FaFire />;
    className += ' trending';
  }

  return (
    <div className={className}>
      {icon} {message}
    </div>
  );
};

export default StockStatus;
