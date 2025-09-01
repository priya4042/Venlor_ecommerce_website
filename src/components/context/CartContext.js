import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth() || {};
  const [cartItems, setCartItems] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false); // ✅ prevent premature overwrite

  // 🔁 Load cart from Firestore or localStorage
  useEffect(() => {
    const loadCart = async () => {
      const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];

      if (user?.uid) {
        try {
          const cartRef = doc(db, 'cartData', user.uid);
          const snap = await getDoc(cartRef);
          const firestoreCart = snap.exists() ? snap.data().cart || [] : [];

          // Merge localCart into Firestore cart
          const mergedCart = [...firestoreCart];
          localCart.forEach((localItem) => {
            const existing = mergedCart.find((item) => item.id === localItem.id);
            if (existing) {
              existing.quantity += localItem.quantity;
            } else {
              mergedCart.push(localItem);
            }
          });

          setCartItems(mergedCart);
          localStorage.removeItem('cartItems');

          await setDoc(cartRef, { cart: mergedCart }, { merge: true });
        } catch (err) {
          console.error('Error loading cartData from Firestore:', err);
        }
      } else {
        setCartItems(localCart);
      }

      setCartLoaded(true); // ✅ Mark that cart has been loaded
    };

    loadCart();
  }, [user]);

  // 🔁 Save cart to Firestore & localStorage after load is complete
  useEffect(() => {
    if (!cartLoaded) return; // ✅ Don't save prematurely

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    if (user?.uid) {
      const saveCart = async () => {
        try {
          const cartRef = doc(db, 'cartData', user.uid);
          await setDoc(cartRef, { cart: cartItems }, { merge: true });
        } catch (err) {
          console.error('Error saving cartData to Firestore:', err);
        }
      };

      saveCart();
    }
  }, [cartItems, user, cartLoaded]);

  // ✅ Add to Cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // ✅ Remove from Cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // ✅ Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ✅ Increase quantity
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ✅ Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');

    if (user?.uid) {
      const cartRef = doc(db, 'cartData', user.uid);
      setDoc(cartRef, { cart: [] }, { merge: true }).catch((err) =>
        console.error('Error clearing cartData:', err)
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
