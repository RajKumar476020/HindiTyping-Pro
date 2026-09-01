import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, YoutubeIcon, LinkedinIcon } from '../Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="ht-footer">
      <div className="ht-container">
        <div className="ht-footer-grid">
          {/* Column 1: Brand */}
          <div className="ht-footer-col">
            <Link to="/" className="ht-brand">
              <div className="ht-logo-badge">HT</div>
              <span className="ht-brand-text">HindiTyping Pro</span>
            </Link>
            <p className="ht-body" style={{ fontSize: '13px', maxWidth: '280px' }}>
              The most advanced Hindi Unicode to Legacy Font Converter. Built with love for DTP operators, CorelDraw designers, and Indian publishers.
            </p>
            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
              100% Offline & Client-Side Engine
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="ht-footer-col">
            <h4 className="ht-footer-title">Product</h4>
            <ul className="ht-footer-links">
              <li><a href="#features" className="ht-footer-link">Features</a></li>
              <li><a href="#fonts" className="ht-footer-link">Fonts Supported</a></li>
              <li><a href="#how-it-works" className="ht-footer-link">How It Works</a></li>
              <li><a href="#showcase" className="ht-footer-link">Live Showcase</a></li>
              <li><Link to="/convert" className="ht-footer-link">Full Converter</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="ht-footer-col">
            <h4 className="ht-footer-title">Resources</h4>
            <ul className="ht-footer-links">
              <li><a href="#seo-guide" className="ht-footer-link">Typing Guide</a></li>
              <li><a href="#seo-guide" className="ht-footer-link">Hinglish Typing Tool</a></li>
              <li><a href="#faq" className="ht-footer-link">CorelDraw Guide</a></li>
              <li><a href="#faq" className="ht-footer-link">Government Exam Forms</a></li>
              <li><a href="#faq" className="ht-footer-link">Help Center & FAQ</a></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="ht-footer-col">
            <h4 className="ht-footer-title">Company</h4>
            <ul className="ht-footer-links">
              <li><a href="#features" className="ht-footer-link">About Us</a></li>
              <li><a href="#features" className="ht-footer-link">Privacy Policy</a></li>
              <li><a href="#features" className="ht-footer-link">Terms of Service</a></li>
              <li><a href="#features" className="ht-footer-link">Contact Support</a></li>
            </ul>
          </div>

          {/* Column 5: Stay Connected */}
          <div className="ht-footer-col">
            <h4 className="ht-footer-title">Stay Connected</h4>
            <div className="ht-social-icons-row">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="ht-icon-btn" aria-label="Facebook">
                <FacebookIcon size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="ht-icon-btn" aria-label="Twitter">
                <TwitterIcon size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="ht-icon-btn" aria-label="YouTube">
                <YoutubeIcon size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="ht-icon-btn" aria-label="LinkedIn">
                <LinkedinIcon size={16} />
              </a>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>
              Made with ❤️ in India
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ht-footer-bottom">
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
            © {new Date().getFullYear()} HindiTyping Pro. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-tertiary)' }}>
            <span>Free & Open For All</span>
            <span>·</span>
            <span>No Data Tracking</span>
            <span>·</span>
            <span>Lightning Fast</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
