import React from "react";
import {
  FaTruck,
  FaRedo,
  FaCreditCard,
  FaTags,
  FaMobileAlt,
} from "react-icons/fa";
import "./FeaturesCarousel.css";

const FeaturesCarousel = () => {
  return (
    <div className="features-container">
      {/* Left Arrow */}
      <button className="arrow-btn left-btn"> &lt; </button>

      {/* Feature Items */}
      <div className="features-list">
        <div className="feature-item">
          <FaMobileAlt className="feature-icon" />
          <p className="feature-text">Track Your Package</p>
        </div>
        <div className="feature-item">
          <FaTruck className="feature-icon" />
          <p className="feature-text">Free Shipping</p>
        </div>
        <div className="feature-item">
          <FaRedo className="feature-icon red-icon" />
          <p className="feature-text">7 Day Exchange Policy</p>
        </div>
        <div className="feature-item">
          <FaCreditCard className="feature-icon" />
          <p className="feature-text">Secure Payment Methods</p>
        </div>
        <div className="feature-item">
          <FaTags className="feature-icon" />
          <p className="feature-text">Weekend Discount Coupon</p>
        </div>
      </div>

      {/* Right Arrow */}
      <button className="arrow-btn right-btn"> &gt; </button>
    </div>
  );
};

export default FeaturesCarousel;
