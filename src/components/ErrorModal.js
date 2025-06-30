// src/components/ErrorModal.jsx

import React from 'react';
import './ErrorModal.css';

function ErrorModal({ message, onClose, type }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-box ${type === 'success' ? 'modal-success' : 'modal-error'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="modal-close" onClick={onClose}>×</span>
        <p>{message}</p>
        <button className="modal-btn" onClick={onClose}>Okay</button>
      </div>
    </div>
  );
}

export default ErrorModal;
