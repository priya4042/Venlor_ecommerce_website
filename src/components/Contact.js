// src/components/Contact.js
import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtext">
            We'd love to hear from you! Whether it's feedback, suggestions, or partnership opportunities — reach out anytime.
          </p>
          <ul className="contact-details">
            <li><strong>Email:</strong> contact@yourdomain.com</li>
            <li><strong>Phone:</strong> +91 9876543210</li>
            <li><strong>Address:</strong> 123 Red Street, Black City, IN</li>
          </ul>
        </div>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
