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
    <div className="footer-1">
      <div className="footer-container-1">
        <div className="footer-section-1">
          <h3>Liên hệ</h3>
          <p>
            <strong>Address: </strong> Đường Chiến Thắng
          </p>
          <p>
            <strong>Phone: </strong> +84 999999999
          </p>
          <p>
            <strong>Email: </strong> info@timnhatro.com
          </p>
        </div>

        <div className="footer-section-1">
          <h3>Follow</h3>
          <ul className="social-links-1">
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

        <div className="footer-section-1">
          <h3>Quick Links</h3>
          <ul className="quick-links-1">
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
      <div className="footer-bottom-1">
        <p>&copy; 2025 TIMNHATRO.COM</p>
      </div>
    </div>
  );
}

export default Footer;
