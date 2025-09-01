const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thevelnor@gmail.com',
    pass: 'otgz fuyt joug hemb', // App password
  },
});

exports.sendOrderEmail = functions.https.onCall(async (data, context) => {
  const {
    deliveryInfo = {},
    paymentDetails = {},
    totalItems = 0,
    totalPrice = 0,
    cartItems = [],
  } = data;

  const itemListHTML = cartItems
    .map((item, index) => `
      <li>
        <strong>${index + 1}. ${item.name}</strong><br/>
        Color: ${item.color || 'N/A'}<br/>
        Size: ${item.size || 'N/A'}<br/>
        Qty: ${item.quantity}<br/>
        Price: ₹${item.price}<br/>
        Offer: ₹${item.price - 197}<br/>
      </li>
    `)
    .join('');

  const htmlContent = `
    <div style="font-family: 'Poppins', sans-serif; color: #333;">
      <h2>🛍️ New Order Received</h2>
      <p><strong>👤 Name:</strong> ${deliveryInfo.name}</p>
      <p><strong>📞 Phone:</strong> ${deliveryInfo.phone}</p>
      <p><strong>📍 Address:</strong> ${deliveryInfo.address}, ${deliveryInfo.pincode}</p>
      <p><strong>🏦 Payment Method:</strong> ${paymentDetails.method}</p>
      <p><strong>🧾 Payment ID:</strong> ${paymentDetails.id}</p>
      <p><strong>🛒 Total Items:</strong> ${totalItems}</p>
      <p><strong>💰 Total Price:</strong> ₹${totalPrice}</p>
      <h3 style="margin-top: 20px;">📦 Order Items</h3>
      <ul style="padding-left: 20px;">
        ${itemListHTML}
      </ul>
      <p style="margin-top: 20px;">✅ Expected Delivery in 5–7 business days.</p>
    </div>
  `;

  const mailOptions = {
    from: 'VELNOR Order Bot <thevelnor@gmail.com>',
    to: 'thevelnor@gmail.com',
    subject: `🧾 New Order by ${deliveryInfo.name || 'Unknown User'}`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('📩 Order email sent successfully to admin.');
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send order email:', error);
    return { success: false, error: error.message };
  }
});
