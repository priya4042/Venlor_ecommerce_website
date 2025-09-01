// src/components/context/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider, db } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import emailjs from 'emailjs-com';

const AuthContext = createContext();

// 🔐 EmailJS config
const SERVICE_ID = 'service_46fax5r';
const TEMPLATE_ID = 'template_8o7s1cl';
const PUBLIC_KEY = 'H0PWIhoVm-GPl9axn';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState('');
  const [tempSignupData, setTempSignupData] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ NEW

  // 🔁 Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const userDoc = await getDoc(doc(db, 'users', u.uid));
        setUser({ uid: u.uid, email: u.email, ...userDoc.data() });
      } else {
        setUser(null);
      }
      setLoading(false); // ✅ Only update after auth status known
    });
    return () => unsubscribe();
  }, []);

  // ✅ Request OTP
  const requestOtpForSignup = async (username, email, password) => {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length > 0) {
      throw new Error('Email is already registered. Please log in.');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(code);
    setTempSignupData({ username, email, password });

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      email,
      passcode: code,
      time: '15 minutes'
    }, PUBLIC_KEY);

    return true;
  };

  // ✅ Complete Signup
  const completeSignupWithOtp = async (enteredOtp) => {
    if (enteredOtp !== otp) {
      throw new Error('Invalid OTP. Please try again.');
    }

    if (!tempSignupData) {
      throw new Error('Signup session expired.');
    }

    const { username, email, password } = tempSignupData;

    const res = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', res.user.uid), {
      username,
      email,
      hasAddress: false
    });

    setOtp('');
    setTempSignupData(null);
    return res.user.uid;
  };

  // ✅ Sign In with email
  const signInWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // ✅ Google Sign-In
  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    await setDoc(doc(db, 'users', res.user.uid), {
      username: res.user.displayName,
      email: res.user.email,
      hasAddress: false
    }, { merge: true });
  };

  // ✅ Logout
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{
      user,
      loading,                     // ✅ Pass loading to consumers
      requestOtpForSignup,
      completeSignupWithOtp,
      signInWithEmail,
      signInWithGoogle,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
