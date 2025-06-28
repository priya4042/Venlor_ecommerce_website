import React from 'react';
import './HeroSlider.css';

const HeroSlider = () => {
  return (
    <div className="hero-slider">
      <div className="slide-item">
        <video
          className="slide-video"
          muted
          autoPlay
          playsInline
          loop
          poster="/images/fallback.jpg"
        >
          {/* ✅ Local video file from public/Shirts folder */}
          <source src={`${process.env.PUBLIC_URL}/Shirts/comming soon video.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="slide-overlay">
          <h1 className="logo-text">VELNOR</h1>
          <h2>Premium Cloths</h2>
          <p>Stylish, Sleek, and Comfortable</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
