// src/components/DeliveryModal.jsx
import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import './Modal.css';

export default function DeliveryModal({ onClose }) {
  const { saveDelivery } = useAuth();
  const [info, setInfo] = useState({ address: '', phone: '', city: '', pincode: '' });
  const [err, setErr] = useState('');

  const handle = (e) => setInfo({ ...info, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!info.address || !info.phone || !info.city || !info.pincode) {
      setErr('All fields are required');
      return;
    }
    await saveDelivery(info);
    onClose();
    window.location.href = '/checkout';
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="closeBtn" onClick={onClose}>×</button>
        <h2>Delivery Details</h2>
        {['address', 'city', 'phone', 'pincode'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={info[field]}
            onChange={handle}
          />
        ))}
        {err && <p className="error">{err}</p>}
        <button onClick={submit}>Save & Continue</button>
      </div>
    </div>
  );
}
