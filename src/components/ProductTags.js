// src/components/ProductTags.jsx

import React from 'react';
import './ProductTags.css';

const tags = [
  'T-shirt',
  'Oversized Tee',
  'VELNOR',
  'Unisex',
  'Streetwear',
  'Cotton',
  'Printed',
  'Summer Fit'
];

const ProductTags = () => {
  return (
    <div className="product-tags">
      <h4>Tags:</h4>
      <div className="tag-list">
        {tags.map((tag, index) => (
          <span className="tag" key={index}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default ProductTags;
