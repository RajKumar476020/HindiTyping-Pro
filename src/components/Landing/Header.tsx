import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { SunIcon, MoonIcon, MenuIcon, CloseIcon, ChevronDownIcon } from '../Icons';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="ht-header">
      <div className="ht-header-inner">
        {/* Left: Logo */}
        <Link to="/" className="ht-brand">
          <div className="ht-logo-badge">HT</div>
          <span className="ht-brand-text">HindiTyping Pro</span>
        </Link>

        {/* Center: Nav links */}
        <ul className="ht-nav-links">
          <li>
            <a href="#features" className="ht-nav-link">Features</a>
          </li>
          <li>
            <a href="#fonts" className="ht-nav-link">Fonts</a>
          </li>
          <li>
            <a href="#showcase" className="ht-nav-link">Showcase</a>
          </li>
          <li>
            <a href="#how-it-works" className="ht-nav-link">How It Works</a>
          </li>
          <li>
            <a href="#seo-guide" className="ht-nav-link">
              Resources <ChevronDownIcon size={14} />
            </a>
          </li>
          <li>
            <a href="#faq" className="ht-nav-link">FAQ</a>
          </li>
        </ul>

        {/* Right: Theme Toggle & Primary CTA */}
        <div className="ht-header-actions">
          <button
            type="button"
            onClick={toggleTheme}
            className="ht-icon-btn"
            aria-label="Toggle light/dark theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>

          <Link to="/convert" className="ht-btn-primary">
            Try It Now
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="ht-icon-btn ht-mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`ht-mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <a href="#features" className="ht-mobile-link" onClick={() => setMobileOpen(false)}>Features</a>
        <a href="#fonts" className="ht-mobile-link" onClick={() => setMobileOpen(false)}>Fonts</a>
        <a href="#showcase" className="ht-mobile-link" onClick={() => setMobileOpen(false)}>Showcase</a>
        <a href="#how-it-works" className="ht-mobile-link" onClick={() => setMobileOpen(false)}>How It Works</a>
        <a href="#seo-guide" className="ht-mobile-link" onClick={() => setMobileOpen(false)}>SEO Guide & Tutorials</a>
        <a href="#faq" className="ht-mobile-link" onClick={() => setMobileOpen(false)}>FAQ</a>
        <Link to="/convert" className="ht-btn-primary" style={{ marginTop: '16px', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
          Open Full Converter
        </Link>
      </div>
    </header>
  );
};
