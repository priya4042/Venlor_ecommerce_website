// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA4lyG41pQsFcpyDpQ6rBPF8h9JWt3TEwE",
  authDomain: "velnor-products.firebaseapp.com",
  projectId: "velnor-products",
  storageBucket: "velnor-products.appspot.com", // ✅ CORRECTED HERE
  messagingSenderId: "640082818273",
  appId: "1:640082818273:web:920c1dc6011135748933a0",
  measurementId: "G-V0RQCG88MC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);