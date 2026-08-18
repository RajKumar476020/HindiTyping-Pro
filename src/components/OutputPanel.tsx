import React, { useState } from 'react';
import type { FontMeta } from '../lib/types/index';

interface OutputPanelProps {
  font: FontMeta;
  encodedText: string;
  unicodeText: string;
  isEmpty: boolean;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({
  font,
  encodedText,
  isEmpty,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!encodedText) return;
    try {
      await navigator.clipboard.writeText(encodedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = encodedText;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className={`output-panel ${isEmpty ? 'output-panel--empty' : ''}`}>
      <div className="output-panel-header">
        <div className="output-panel-title">
          <span className="output-font-badge">{font.name}</span>
          <span className="output-font-desc">{font.description}</span>
        </div>
        <button
          id={`copy-btn-${font.id}`}
          className={`copy-btn ${copied ? 'copy-btn--copied' : ''}`}
          onClick={handleCopy}
          disabled={isEmpty || !encodedText}
          title="Copy encoded text to clipboard"
        >
          {copied ? (
            <>
              <span className="copy-icon">✓</span>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <span className="copy-icon">⎘</span>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="output-preview-box">
        {isEmpty || !encodedText ? (
          <div className="output-placeholder">
            <span className="placeholder-icon">✍️</span>
            <span>Type something to see it in {font.name}.</span>
          </div>
        ) : (
          <>
            {/* Rendered in the actual legacy font */}
            <div
              className="output-rendered-text"
              style={{ fontFamily: `'${font.cssFamily}', 'Courier New', monospace` }}
              title="Preview rendered in legacy font"
            >
              {encodedText}
            </div>
            {/* Raw ASCII output — small, copyable reference */}
            <div className="output-raw-section">
              <span className="output-raw-label">Raw ASCII (what gets pasted):</span>
              <code className="output-raw-text">{encodedText}</code>
            </div>
          </>
        )}
      </div>

      {!isEmpty && encodedText && (
        <div className="output-panel-footer">
          <span className="output-instructions">
            📋 Copy → Open CorelDraw/Illustrator → Select <strong>{font.name}</strong> font → Paste
          </span>
        </div>
      )}
    </div>
  );
};
