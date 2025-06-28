// src/components/FabricInfo.jsx

import React from 'react';
import './FabricInfo.css';
import { GiCottonFlower } from 'react-icons/gi';

const FabricInfo = () => {
  return (
    <div className="fabric-info">
      <GiCottonFlower className="icon" />
      <p><strong>220 GSM Premium Cotton</strong> | Bio-washed | Pre-shrunk | Breathable & Skin Friendly</p>
    </div>
  );
};

export default FabricInfo;
