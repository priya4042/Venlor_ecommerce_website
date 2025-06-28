import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <h3>Get updates</h3>
        <div className="newsletter-form">
          <input type="email" placeholder="Email address" />
          <button>Sign up</button>
        </div>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h4>Important Links</h4>
          <a href="#">About Us</a>
          <a href="#">Contact Info</a>
          <a href="#">Place Return and Exchange</a>
          <a href="#">Track Order</a>
          <a href="#">Creator's Program</a>
        </div>
        <div className="footer-column">
          <h4>Policies</h4>
          <a href="#">Return and Exchange</a>
          <a href="#">Cancellation</a>
          <a href="#">Privacy</a>
          <a href="#">Shipping</a>
          <a href="#">Terms of Service</a>
          <a href="#">Refund Policy</a>
        </div>
        <div className="footer-column">
          <h4>Melangebox India</h4>
          <p>
            PAYA STORES LLP is a sustainable fashion technology company
            which owns Velnor. We assist you with quality sustainable
            daily essentials at affordable prices. Products are created in-house 
            and offered at factory pricing.
          </p>
        </div>
        <div className="footer-column">
          <h4>Follow us</h4>
          <div className="social-icons">
            <FaTwitter />
            <FaFacebook />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>
      </div>
      <p className="footer-bottom">&copy; {new Date().getFullYear()} Velnor. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
