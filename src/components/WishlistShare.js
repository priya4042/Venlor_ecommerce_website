// src/components/WishlistShare.jsx

import React from 'react';
import './WishlistShare.css';
import { FaHeart, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const WishlistShare = () => {
  return (
    <div className="wishlist-share">
      <button className="wishlist-btn">
        <FaHeart /> Add to Wishlist
      </button>
      <div className="share-buttons">
        <span>Share:</span>
        <a href="#" className="share-icon whatsapp">
          <FaWhatsapp />
        </a>
        <a href="#" className="share-icon instagram">
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};

export default WishlistShare;