import React, { useEffect, useState } from 'react';
import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

import './CheckoutPage.css';
import 'animate.css';
import PaymentOptions from './PaymentOptions';

const CheckoutPage = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [hasAddress, setHasAddress] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    const fetchUserAddress = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const { name, phone, address, pincode } = data;

          const isComplete = name?.trim() && phone?.trim() && address?.trim() && pincode?.trim();

          if (isComplete) {
            setDeliveryInfo({ name, phone, address, pincode });
            setHasAddress(true);
          } else {
            setShowAddressModal(true);
          }
        } else {
          setShowAddressModal(true);
        }
      } catch (error) {
        console.error('Error fetching user address:', error);
      }
    };

    fetchUserAddress();
  }, [user, navigate]);

  const handleInputChange = (e) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = async () => {
    const { name, phone, address, pincode } = deliveryInfo;

    if (!name || !phone || !address || !pincode) {
      alert('⚠️ Please fill in all delivery fields.');
      return;
    }

    try {
      await setDoc(doc(db, 'users', user.uid), {
        name,
        phone,
        address,
        pincode,
        hasAddress: true,
      }, { merge: true });

      setHasAddress(true);
      setShowAddressModal(false);
    } catch (err) {
      console.error('❌ Error saving address:', err);
    }
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price - 197) * item.quantity,
    0
  );

  const triggerPayment = () => {
    if (!hasAddress) {
      alert('Please complete delivery details first.');
      return;
    }
    setShowPayment(true);
  };

  const getEstimatedDate = () => {
    const today = new Date();
    const estimatedDate = new Date(today.setDate(today.getDate() + 4));
    return estimatedDate.toDateString();
  };

  if (showPayment) {
    return (
      <PaymentOptions
        totalPrice={totalPrice}
        onSuccess={(paymentDetails) => {
          clearCart();
          navigate('/order-success', {
            state: {
              paymentDetails,
              totalItems,
              totalPrice,
              deliveryInfo,
            },
          });
        }}
        onBack={() => setShowPayment(false)}
      />
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title animate__animated animate__fadeInDown">My Cart</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart animate__animated animate__fadeIn">
          Your cart is empty.
        </p>
      ) : (
        <div className="checkout-grid">
          {/* 🛒 Cart Items */}
          <div className="cart-left">
            {cartItems.map((item, index) => (
              <div className="cart-item-card" key={index}>
                <img
                  src={item.media?.[0] || 'https://via.placeholder.com/100'}
                  alt={item.title || 'Product'}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h4>{item.title || 'Untitled Product'}</h4>
                  <p className="cart-item-meta">
                    Color: {item.color || 'N/A'} &nbsp;//&nbsp; Extras: ₹197 off
                  </p>
                </div>
                <div className="cart-item-price">
                  ₹{(item.price - 197).toFixed(2)}
                </div>
                <div className="cart-item-qty">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <div className="cart-item-total">
                  ₹{((item.price - 197) * item.quantity).toFixed(2)}
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* 🏠 Address + Totals */}
          <div className="cart-right">
            {/* ✅ Display saved delivery address */}
            {deliveryInfo.name && (
              <div className="address-box">
                <div className="address-box-header">
                  <h3>📍 Delivery Address</h3>
                  <button onClick={() => setShowAddressModal(true)}>Edit</button>
                </div>
                <div className="address-box-content">
                  <p><strong>{deliveryInfo.name}</strong></p>
                  <p>{deliveryInfo.phone}</p>
                  <p>{deliveryInfo.address}</p>
                  <p>{deliveryInfo.pincode}</p>
                </div>
              </div>

            )}

            {/* 🚚 Estimated Delivery */}
            <div className="delivery-info-box">
              <h3>📦 Estimated Delivery</h3>
              <p className="delivery-date">
                Order now and get it by <strong>{getEstimatedDate()}</strong>
              </p>
              <p className="delivery-note2" style={{ color: '#ffcc00' }}>
                Fast, trackable shipping across India 🚚
              </p>
            </div>

            {/* 💰 Total */}
            <div className="summary-box">
              <p>
                <strong>Subtotal TTC</strong> <span>₹{totalPrice.toFixed(2)}</span>
              </p>
              <p>
                <strong>Shipping</strong> <span>Free</span>
              </p>
              <hr />
              <p className="grand-total">
                <strong>Total</strong> <span>₹{totalPrice.toFixed(2)}</span>
              </p>
              <button className="place-order-btn" onClick={triggerPayment}>
                Checkout ₹{totalPrice.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📍 Address Modal */}
      {showAddressModal && (
        <div className="modal-overlay" onClick={() => setShowAddressModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowAddressModal(false)}
            >
              ×
            </button>
            <h2 className="modal-title">📍 Enter Delivery Address</h2>
            <div className="modal-form">
              <label>
                <span>👤 Name</span>
                <input
                  type="text"
                  name="name"
                  value={deliveryInfo.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <span>📞 Phone</span>
                <input
                  type="text"
                  name="phone"
                  value={deliveryInfo.phone}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <span>🏠 Address</span>
                <input
                  type="text"
                  name="address"
                  value={deliveryInfo.address}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <span>📮 Pincode</span>
                <input
                  type="text"
                  name="pincode"
                  value={deliveryInfo.pincode}
                  onChange={handleInputChange}
                />
              </label>
              <button className="modal-save" onClick={handleSaveAddress}>
                💾 Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
