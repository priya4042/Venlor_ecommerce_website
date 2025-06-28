// src/components/ForgotPassword.js
import React, { useState } from 'react';
import './ForgotPassword.css'; // CSS specific to ForgotPassword

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle ForgotPassword logic
    console.log('Forgot Password:', email);
  };

  return (
    <div className="signin-container fade-in">
      <div className="signin-form">
        <h2>Forgot Your Password?</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        <div className="footer">
          <p>Remember your password? <a href="/signin">Sign In</a></p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
