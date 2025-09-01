import React from 'react';

const RazorpayCheckout = ({ amount, deliveryInfo, onSuccess }) => {
  const handleRazorpayPayment = async () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // 🔑 Replace with your Razorpay Key ID
      amount: amount * 100, // Razorpay amount is in paise
      currency: 'INR',
      name: 'VELNOR CLOTHING',
      description: 'Order Payment',
      image: '/favicon.png',
      handler: function (response) {
        // 🎉 Payment successful
        const paymentDetails = {
          method: 'Razorpay',
          id: response.razorpay_payment_id,
        };
        onSuccess(paymentDetails);
      },
      prefill: {
        name: deliveryInfo.name,
        email: 'customer@example.com', // Optional
        contact: deliveryInfo.phone,
      },
      theme: {
        color: '#e50914',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <button onClick={handleRazorpayPayment} className="payment-btn">
      💳 Pay Securely with Razorpay
    </button>
  );
};

export default RazorpayCheckout;
