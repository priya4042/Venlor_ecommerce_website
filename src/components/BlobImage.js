// src/components/BlobImage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './BlobImage.css'; // We'll add styling separately

const blobPaths = [
  "M44.8,-76.2C56.4,-68.3,65.2,-56.2,72.7,-43.3C80.2,-30.3,86.4,-15.2,84.6,-1.1C82.9,13,73.2,25.9,65.1,38.6C57,51.2,50.4,63.5,39.7,70.7C29,77.9,14.5,80,-0.7,81C-15.8,82,-31.5,81.9,-42.5,74.5C-53.5,67.1,-60,52.3,-65.5,38.1C-71,23.8,-75.6,10,-74.8,-3.2C-74.1,-16.5,-68.1,-29.1,-59.7,-40.2C-51.3,-51.2,-40.4,-60.6,-28.3,-67.7C-16.2,-74.8,-8.1,-79.6,4.4,-86.7C16.9,-93.9,33.9,-103.9,44.8,-76.2Z",
  "M49.6,-73.2C63.2,-62.6,73.7,-47.4,77.6,-31.2C81.5,-15,78.9,2.3,72.2,17.7C65.4,33.1,54.5,46.7,41.4,55.2C28.3,63.7,14.2,67,-0.3,67.5C-14.8,68,-29.6,65.6,-43.5,59.5C-57.4,53.4,-70.4,43.6,-76.2,30.6C-82,17.5,-80.6,1.2,-74.8,-12.3C-69,-25.9,-58.7,-36.6,-47.2,-47.8C-35.7,-59,-22.8,-70.6,-7.1,-74.6C8.6,-78.7,17.2,-75.3,49.6,-73.2Z"
];

const BlobImage = ({ imageUrl }) => {
  return (
    <div className="blob-container">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="blobClip">
          <motion.path
            d={blobPaths[0]}
            animate={{ d: blobPaths[1] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            transform="translate(100 100)"
          />
        </clipPath>
        <image
          href={imageUrl}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#blobClip)"
        />
      </svg>
    </div>
  );
};

export default BlobImage;
