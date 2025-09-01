import React, { useState } from 'react';
import './SignUp.css';
import 'animate.css';
import { useAuth } from './context/AuthContext';
import ErrorModal from './ErrorModal';
import { FcGoogle } from 'react-icons/fc';

function SignUp() {
  const {
    requestOtpForSignup,
    completeSignupWithOtp,
    signInWithGoogle
  } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  // ✅ Input validation
  const validateForm = () => {
    if (!username || !email || !password) {
      setError('All fields are required.');
      return false;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  // ✅ Handle form submit → Request OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await requestOtpForSignup(username, email, password);
      setShowOtpModal(true); // ✅ Show modal after sending OTP
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Verify OTP and complete signup
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    setOtpLoading(true);
    try {
      await completeSignupWithOtp(otp);
      setShowOtpModal(false);
      alert('🎉 Account created successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setOtpLoading(false);
    }
  };

  // ✅ Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch {
      setError('Google sign in failed. Try again.');
    }
  };

  return (
    <div className="signin-container fade-in">
      <div className="signin-form animate__animated animate__fadeInDown">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ marginLeft: '30px' }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ marginLeft: '6px' }}
            />
          </div>

          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>

        <div className="divider"><span>OR</span></div>

        <button onClick={handleGoogleSignIn} className="google-signin-btn">
          <FcGoogle className="google-icon" />
          Sign up with Google
        </button>

        <div className="footer">
          <p>Already have an account? <a href="/signin">Sign In</a></p>
        </div>
      </div>

      {/* ✅ OTP Modal */}
      {showOtpModal && (
        <div className="otp-backdrop" onClick={() => setShowOtpModal(false)}>
          <div className="otp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="otp-title">Verify Your Email</div>
            <input
              className="otp-input"
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="otp-buttons">
              <button
                className="otp-btn verify"
                onClick={handleVerifyOtp}
                disabled={otpLoading}
              >
                {otpLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                className="otp-btn cancel"
                onClick={() => setShowOtpModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Error Modal */}
      {error && (
        <ErrorModal message={error} onClose={() => setError('')} />
      )}
    </div>
  );
}

export default SignUp;
