import React from 'react';
import './HeroSlider.css';
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube, FaEnvelope } from "react-icons/fa6";

const HeroSlider = () => {
  return (
    <div className="hero-slider">
      <div className="slide-item">
        
        {/* === LEFT SOCIAL ICONS === */}
        <div className="social-bar">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaXTwitter /></a>
          <a href="#"><FaYoutube /></a>
          <a href="mailto:info@velnor.com"><FaEnvelope /></a>
        </div>

        {/* === RIGHT DOTS === */}
        <div className="side-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        {/* === MAIN CONTENT === */}
        <div className="slide-overlay">
          <h1 className="hero-title">VELNOR</h1>
          <ul className="hero-bullets">
            <li><strong>The Premium Clothing Brand.</strong></li>
            <li>DTF Print, Screen Printing, Puff Print / HD Print, Embroidery.</li>
            <li>100% Cotton (Bio-Washed), Cotton Lycra, French Terry Cotton.</li>
            <li>180 – 240 GSM (Heavy streetwear).</li>
          </ul>
          <button className="hero-btn">BUY NOW &gt;</button>
        </div>

        {/* === BOTTOM DOTS === */}
        <div className="bottom-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
