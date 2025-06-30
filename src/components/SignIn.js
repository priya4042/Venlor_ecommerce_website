// src/components/SignIn.jsx

import React, { useState } from 'react';
import './SignIn.css';
import './ErrorModal.css'; // ✅ Modal styles
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import ErrorModal from './ErrorModal'; // ✅ Reusable modal
import 'animate.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState(''); // 'success' | 'error'
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setModalType('error');
      setModalMessage('⚠️ Please enter both email and password.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setModalType('success');
      setModalMessage('🎉 Login successful!');
    } catch (err) {
      console.error(err.message);
      setModalType('error');

      if (err.code === 'auth/user-not-found') {
        setModalMessage('❌ No user found with this email.');
      } else if (err.code === 'auth/wrong-password') {
        setModalMessage('❌ Incorrect password. Please try again.');
      } else {
        setModalMessage('❌ Login failed. Please check your credentials.');
      }
    }
  };

  const handleModalClose = () => {
    setModalMessage('');
    if (modalType === 'success') {
      navigate('/products'); // ✅ Redirect after successful login
    }
  };

  return (
    <div className="signin-container fade-in">
      <div className="signin-form animate__animated animate__fadeInDown">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary">Login</button>
        </form>

        <div className="footer">
          <p>Don’t have an account? <a href="/signup">Sign Up</a></p>
          <p><a href="/forgot-password">Forgot Password?</a></p>
        </div>
      </div>

      {modalMessage && (
        <ErrorModal
          message={modalMessage}
          onClose={handleModalClose}
          type={modalType}
        />
      )}
    </div>
  );
}

export default SignIn;
