import React from 'react';
import { Link } from 'react-router-dom';
import { QuoteIcon, StarIcon, ArrowRightIcon, LockIcon, ShieldCheckIcon, GlobeIcon } from '../Icons';

export const TestimonialCta: React.FC = () => {
  return (
    <section className="ht-section">
      <div className="ht-container">
        <div className="ht-testimonial-cta-row">
          {/* Left: Testimonial Card */}
          <div className="ht-testimonial-card">
            <div>
              <QuoteIcon size={36} className="ht-quote-icon" />
              <div className="ht-rating-stars" style={{ margin: '12px 0 16px 0' }}>
                <StarIcon size={16} />
                <StarIcon size={16} />
                <StarIcon size={16} />
                <StarIcon size={16} />
                <StarIcon size={16} />
              </div>
              <p className="ht-quote-text">
                &ldquo;The most accurate and fastest Hindi font converter I have ever used. A must-have tool for every DTP operator!&rdquo;
              </p>
            </div>

            <div className="ht-author-row">
              <div className="ht-author-avatar">RV</div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>Rahul Verma</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Printing Press Owner & DTP Specialist, Delhi</p>
              </div>
            </div>
          </div>

          {/* Right: CTA Banner */}
          <div className="ht-cta-banner">
            <h3 className="ht-cta-banner-title">Ready to Convert Like a Pro?</h3>
            <p className="ht-cta-banner-sub">
              Join thousands of graphic designers, press operators, and government exam candidates who trust HindiTyping Pro for their daily work.
            </p>
            <Link to="/convert" className="ht-btn-banner-white">
              <span>Start Converting Now</span>
              <ArrowRightIcon size={16} />
            </Link>
            <div className="ht-banner-trust-row">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheckIcon size={14} /> No Installation
              </span>
              <span>·</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <LockIcon size={14} /> 100% Safe
              </span>
              <span>·</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <GlobeIcon size={14} /> Works Offline
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
