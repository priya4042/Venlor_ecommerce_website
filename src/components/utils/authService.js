// src/utils/authService.js
import emailjs from '@emailjs/browser';

const OTP_STORAGE_KEY = 'VELNOR_OTP';
const EMAIL_STORAGE_KEY = 'VELNOR_USER_EMAIL';

// Send OTP email
export const sendOtpToEmail = async (email, otp) => {
  const templateParams = {
    to_email: email,
    message: `Your VELNOR OTP is: ${otp}`,
  };
  await emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    templateParams,
    'YOUR_USER_ID'
  );
};

// Store OTP + email in localStorage
export const storeOtp = (email, otp) => {
  localStorage.setItem(OTP_STORAGE_KEY, otp);
  localStorage.setItem(EMAIL_STORAGE_KEY, email);
};

// Verify code
export const verifyOtpCode = (input) => {
  const stored = localStorage.getItem(OTP_STORAGE_KEY);
  return input === stored;
};

// Get logged-in email
export const getLoggedInUserEmail = () => {
  return localStorage.getItem(EMAIL_STORAGE_KEY);
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem(OTP_STORAGE_KEY);
  localStorage.removeItem(EMAIL_STORAGE_KEY);
};
