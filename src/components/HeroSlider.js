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
<<<<<<< HEAD
          <source src="https://cdn.shopify.com/videos/c/o/v/9d88411d442843aeaf8d4fa5efd71a42.mov" type="video/mp4" />
=======
          {/* ✅ Local video path from public/Shirts/ */}
          <source src={`${process.env.PUBLIC_URL}/Shirts/comming soon video.mp4`}  type="video/mp4" />
>>>>>>> a7b10ae (Updated files and added new changes)
          Your browser does not support the video tag.
        </video>

        <div className="slide-overlay">
<<<<<<< HEAD
          <h1 className="logo-text">Velnor</h1>
          <h2>Black Hoodie</h2>
=======
          <h1 className="logo-text">VELNOR</h1>
          <h2>Premium Cloths</h2>
>>>>>>> a7b10ae (Updated files and added new changes)
          <p>Stylish, Sleek, and Comfortable</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
