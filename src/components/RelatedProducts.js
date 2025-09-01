// src/components/RelatedProducts.jsx

import React from 'react';
import './RelatedProducts.css';

const related = [
  {
    name: 'Black Oversized Tee',
    image: 'https://via.placeholder.com/150x200?text=Black+Tee',
    price: 799,
  },
  {
    name: 'VELNOR Graphic Shirt',
    image: 'https://via.placeholder.com/150x200?text=Shirt',
    price: 999,
  },
  {
    name: 'Minimal White T-Shirt',
    image: 'https://via.placeholder.com/150x200?text=White+Tee',
    price: 749,
  },
  {
    name: 'Streetwear Hoodie',
    image: 'https://via.placeholder.com/150x200?text=Hoodie',
    price: 1299,
  }
];

const RelatedProducts = () => {
  return (
    <div className="related-products">
      <h3>You May Also Like</h3>
      <div className="product-scroll">
        {related.map((item, index) => (
          <div className="related-card" key={index}>
            <img src={item.image} alt={item.name} />
            <div className="related-info">
              <p className="related-name">{item.name}</p>
              <p className="related-price">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
