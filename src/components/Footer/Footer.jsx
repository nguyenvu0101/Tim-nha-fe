// src/components/Footer.js
import React from 'react';
import './Footer.css';
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Liên hệ</h3>
          <p>
            <strong>Address: </strong> 123 Main Street, City, Country
          </p>
          <p>
            <strong>Phone: </strong> +123 456 789
          </p>
          <p>
            <strong>Email: </strong> info@timnhatro.com
          </p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul className="social-links">
            <li>
              <FontAwesomeIcon icon={faFacebook} />
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <FontAwesomeIcon icon={faTwitter} />
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <FontAwesomeIcon
                icon={faInstagram}
            
              />
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="quick-links">
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/terms">Terms & Conditions</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 TimNhatro. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
