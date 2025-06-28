// src/components/Reviews.jsx

import React from 'react';
import './Reviews.css';

const reviews = [
  {
    name: 'Ravi Sharma',
    rating: 5,
    comment: 'Perfect fit and fabric is top-notch!',
    image: 'https://via.placeholder.com/100x100?text=Ravi'
  },
  {
    name: 'Anjali Mehta',
    rating: 4,
    comment: 'Loved the oversized fit! Quality bhi mast hai.',
    image: 'https://via.placeholder.com/100x100?text=Anjali'
  },
  {
    name: 'Kunal S.',
    rating: 4,
    comment: 'Color is vibrant and looks great on me!',
    image: 'https://via.placeholder.com/100x100?text=Kunal'
  }
];

const Reviews = () => {
  return (
    <div className="reviews-section">
      <h3>Customer Reviews</h3>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <img src={review.image} alt={review.name} className="review-image" />
            <div className="review-details">
              <strong>{review.name}</strong>
              <div className="stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
              <p>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
