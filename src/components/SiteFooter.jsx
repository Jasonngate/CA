import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const SiteFooter = memo(() => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-title">CA Automation</div>
          <div className="tagline">Accelerating Compliance Intelligence</div>
        </div>
        <div>
          <div className="footer-title">Support</div>
          <ul className="footer-list">
            <li><a href="mailto:support@ca-automation.example">support@ca-automation.example</a></li>
            <li><a href="tel:+1800123456">+1 800 123 456</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-title">Company</div>
          <ul className="footer-list">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-title">Legal</div>
          <ul className="footer-list">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-title">Follow</div>
          <div className="socials">
            <a href="#" aria-label="X / Twitter" title="X / Twitter">
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 3h4.5l5.1 6.7L18.4 3H21l-7.3 9.3L21 21h-4.6l-5.5-7.2L5.4 21H3l7.6-10L3 3z" />
              </svg>
              <span className="sr-only">X / Twitter</span>
            </a>
            <a href="#" aria-label="LinkedIn" title="LinkedIn">
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.1c.6-1.1 2.1-2.2 4.4-2.2 4.7 0 5.5 3.1 5.5 7.1V24h-5v-7.1c0-1.7 0-3.8-2.3-3.8-2.3 0-2.7 1.8-2.7 3.7V24h-5V8z" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="#" aria-label="YouTube" title="YouTube">
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-5.8 31 31 0 0 0-.5-5.8zM9.6 15.5v-7L15.8 12l-6.2 3.5z" />
              </svg>
              <span className="sr-only">YouTube</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} CA Automation • All rights reserved.</div>
    </footer>
  );
});

SiteFooter.displayName = 'SiteFooter';

export default SiteFooter;
