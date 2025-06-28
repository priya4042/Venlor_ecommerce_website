// src/components/About.js
import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      {/* Font Awesome rotating T-shirt icon */}
      <i className="fas fa-tshirt tshirt-icon"></i>

      <div className="about-container">
        <div className="about-text">
          <h1 className="about-title">About Us – VELNOR</h1>
          <p>Welcome to <strong>VELNOR</strong>.</p>
          <p>
            We are not just a clothing brand — we are two brothers with one dream:
            To build something of our own, from zero, and make it stand proud.
          </p>

          <hr className="section-divider" />

          <h2>👬 Our Story –</h2>
          <p>
            We didn’t have a lot of money, no fancy studio, no investors.
            But what we had was enough: a strong bond, a clear dream.
          </p>
          <p>
            Our journey started from a small room with a big idea – to create a clothing brand that speaks
            to people who feel raw, real, and different. We believe fashion is not just about wearing cool
            clothes – it’s about expressing who you are inside.
          </p>
          <p>
            So we took the risk, saved every rupee, learned everything on our own, and started <strong>VELNOR</strong> — our dream stitched into fabric.
          </p>

          <hr className="section-divider" />

          <h2>Why the Name “VELNOR”?</h2>
          <p>
            The name <strong>VELNOR</strong> is not random. It’s a mix of two ideas:
          </p>
          <ul>
            <li><strong>VEL</strong> – inspired by <em>velocity</em>, symbolizing movement, power, and progress.</li>
            <li><strong>NOR</strong> – short for <em>North</em>, the direction where our roots lie and our dreams point.</li>
          </ul>
          <p>
            Together, <strong>VELNOR</strong> means: <em>“Move forward, stay grounded.”</em>
          </p>

          <hr className="section-divider" />

          <h2>Our Vision</h2>
          <ul>
            <li>Original designs with meaning</li>
            <li>Quality clothing that lasts</li>
            <li>Stories that connect with emotions</li>
            <li>And most importantly — Real People. Real Fashion.</li>
          </ul>
          <p>
            We believe everyone has a story. Through our designs, we want to help you wear yours.
          </p>

          <hr className="section-divider" />

          <h2>🙌 Thank You for Being Part of This</h2>
          <p>
            By wearing <strong>VELNOR</strong>, you are not just supporting a brand.
            You’re joining a movement of dreamers, doers, and believers.
          </p>
          <p>
            Welcome to the <strong>VELNOR</strong> family.
            Let’s wear emotions. Let’s wear truth. Let’s <strong>wear dreams</strong>.
          </p>
        </div>

        <div className="about-image">
          <img src="https://via.placeholder.com/500x500?text=VELNOR+About+Us" alt="VELNOR Story" />
        </div>
      </div>
    </div>
  );
}

export default About;
