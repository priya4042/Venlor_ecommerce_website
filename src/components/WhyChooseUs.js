// src/components/WhyChooseUs.jsx

import React from 'react';
import './WhyChooseUs.css';
import { GiAchievement, GiDiamondHard, GiHearts } from 'react-icons/gi';

const WhyChooseUs = () => {
  return (
    <div className="why-choose-us">
      <h3>Why Choose VELNOR?</h3>
      <p className="brand-story">
        <GiHearts className="icon" /> VELNOR stands for <strong>quality</strong>, <strong>raw emotions</strong>, and <strong>original design</strong>. Every piece is crafted to express individuality and street culture.
      </p>
      <div className="features">
        <div className="feature"><GiAchievement /> 100% Authentic</div>
        <div className="feature"><GiDiamondHard /> Premium Craftsmanship</div>
        <div className="feature"><GiHearts /> Trusted by 10,000+ Customers</div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
