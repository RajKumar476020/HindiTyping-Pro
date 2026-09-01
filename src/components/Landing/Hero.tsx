import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LockIcon, ArrowRightIcon, GridIcon, StarIcon, CopyIcon, CheckIcon, LightningIcon, ChevronDownIcon } from '../Icons';
import { encode } from '../../lib/fontEncoders/index';
import type { FontId } from '../../lib/types/index';

const SAMPLE_TEXT = 'नमस्ते कैसे हैं आप?';

export const Hero: React.FC = () => {
  const [inputText, setInputText] = useState<string>(SAMPLE_TEXT);
  const [selectedFont, setSelectedFont] = useState<FontId>('krutiDev');
  const [copied, setCopied] = useState<boolean>(false);

  // Compute live converted text
  const convertedText = useMemo(() => {
    if (!inputText) return '';
    return encode(selectedFont, inputText);
  }, [inputText, selectedFont]);

  const handleCopy = async () => {
    if (!convertedText) return;
    try {
      await navigator.clipboard.writeText(convertedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = convertedText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fontOptions: { id: FontId; label: string }[] = [
    { id: 'krutiDev', label: 'Kruti Dev 010' },
    { id: 'devLys', label: 'DevLys 010' },
    { id: 'chanakya', label: 'Chanakya' },
    { id: 'shusha', label: 'Shusha' },
  ];

  return (
    <section className="ht-hero">
      <div className="ht-container">
        <div className="ht-hero-grid">
          {/* Left Column */}
          <div className="ht-hero-left">
            {/* Pill Badge */}
            <div className="ht-pill-badge">
              <LockIcon size={14} />
              <span>100% Offline · Private · Secure</span>
            </div>

            {/* Main Headline */}
            <h1 className="ht-h1">
              Convert Hindi Fonts <br />
              <span className="cmyk-gradient-text">Beautifully.</span>
            </h1>

            {/* Subheadline */}
            <div className="ht-hero-subheadline">
              Unicode → Kruti Dev · DevLys · Chanakya · Shusha
            </div>

            {/* Description */}
            <p className="ht-hero-desc">
              Lightning fast conversion. 100% offline. Trusted by thousands of DTP operators, CorelDraw designers, and Hindi typing professionals across India.
            </p>

            {/* Action Buttons */}
            <div className="ht-hero-buttons">
              <Link to="/convert" className="ht-btn-primary">
                Start Converting Free <ArrowRightIcon size={16} />
              </Link>
              <a href="#showcase" className="ht-btn-secondary">
                <GridIcon size={16} /> Explore Fonts
              </a>
            </div>

            {/* Social Proof */}
            <div className="ht-social-proof">
              <div className="ht-avatars-group">
                <div className="ht-avatar-img" style={{ background: '#3b82f6', color: '#fff' }}>AK</div>
                <div className="ht-avatar-img" style={{ background: '#ec4899', color: '#fff' }}>RK</div>
                <div className="ht-avatar-img" style={{ background: '#10b981', color: '#fff' }}>PS</div>
                <div className="ht-avatar-img" style={{ background: '#f59e0b', color: '#fff' }}>VG</div>
                <div className="ht-avatar-img" style={{ background: '#6366f1', color: '#fff' }}>MS</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div className="ht-rating-stars">
                  <StarIcon size={14} />
                  <StarIcon size={14} />
                  <StarIcon size={14} />
                  <StarIcon size={14} />
                  <StarIcon size={14} />
                </div>
                <span className="ht-rating-caption">4.9/5 from 1,200+ DTP & Print Users</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Converter Card */}
          <div className="ht-live-card">
            <div className="ht-live-card-header">
              <div className="ht-live-card-title">
                <LightningIcon size={18} style={{ color: 'var(--accent-blue)' }} />
                Live Converter
              </div>
              <div className="ht-live-badge">
                <span className="ht-live-dot"></span>
                <span>Live</span>
              </div>
            </div>

            {/* Field 1: Unicode Input */}
            <div className="ht-converter-field-wrap">
              <div className="ht-field-label-row">
                <label htmlFor="hero-unicode-input" className="ht-field-label">Unicode (Type or Paste)</label>
              </div>
              <div className="ht-field-box">
                <textarea
                  id="hero-unicode-input"
                  className="ht-textarea-input"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="यहाँ हिंदी में टाइप करें या पेस्ट करें..."
                  maxLength={5000}
                />
                <div className="ht-field-footer">
                  <span className="ht-char-count">{inputText.length} / 5000</span>
                  <button
                    type="button"
                    className="ht-copy-btn"
                    onClick={() => setInputText('')}
                    title="Clear input"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Divider Swap Icon */}
            <div className="ht-swap-divider">
              <div className="ht-swap-btn" title="Live real-time converter active">
                <LightningIcon size={16} />
              </div>
            </div>

            {/* Field 2: Converted Output */}
            <div className="ht-converter-field-wrap">
              <div className="ht-field-label-row">
                <span className="ht-field-label">
                  Legacy ({fontOptions.find((f) => f.id === selectedFont)?.label || 'Kruti Dev'})
                </span>
              </div>
              <div className="ht-field-box">
                <div
                  className={`ht-output-display font-${selectedFont.toLowerCase()}`}
                  title="Converted legacy characters"
                >
                  {convertedText || <span style={{ color: 'var(--text-tertiary)' }}>Converted output will appear here...</span>}
                </div>
                <div className="ht-field-footer">
                  <span className="ht-char-count">{convertedText.length} chars</span>
                  <button
                    type="button"
                    className={`ht-copy-btn ${copied ? 'copied' : ''}`}
                    onClick={handleCopy}
                  >
                    {copied ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Font Selectors */}
            <div>
              <span className="ht-field-label" style={{ display: 'block', marginBottom: '8px' }}>
                Select Font
              </span>
              <div className="ht-font-pills-row">
                {fontOptions.map((font) => (
                  <button
                    key={font.id}
                    type="button"
                    className={`ht-font-pill ${selectedFont === font.id ? 'active' : ''}`}
                    onClick={() => setSelectedFont(font.id)}
                  >
                    {font.label}
                  </button>
                ))}
                <Link to="/convert" className="ht-font-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span>More</span> <ChevronDownIcon size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
