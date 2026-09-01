import React, { useState } from 'react';
import type { FontMeta } from '../lib/types/index';
import { CopyIcon, CheckIcon } from './Icons';

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
      setTimeout(() => setCopied(false), 1800);
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
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Panel Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--accent-blue)',
                backgroundColor: 'rgba(10, 132, 255, var(--chip-bg-opacity))',
                padding: '4px 10px',
                borderRadius: 'var(--radius-chip)'
              }}
            >
              {font.name}
            </span>
            <span className="ht-small" style={{ color: 'var(--text-secondary)' }}>
              {font.description}
            </span>
          </div>
        </div>

        <button
          id={`copy-btn-${font.id}`}
          type="button"
          className={`ht-copy-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          disabled={isEmpty || !encodedText}
          title="Copy converted legacy text to clipboard"
          style={{ padding: '6px 14px', fontSize: '13px' }}
        >
          {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Preview Output Box */}
      <div
        className="ht-field-box"
        style={{
          minHeight: '80px',
          backgroundColor: 'var(--bg-card-tint)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '14px'
        }}
      >
        {isEmpty || !encodedText ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-tertiary)', fontSize: '14px', minHeight: '50px' }}>
            <span>✍️</span>
            <span>Type something to see live {font.name} output preview.</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Rendered in legacy font face */}
            <div
              className={`ht-output-display font-${font.id.toLowerCase()}`}
              style={{
                fontFamily: `'${font.cssFamily}', 'IBM Plex Mono', monospace`,
                fontSize: '18px',
                lineHeight: '1.6',
                color: 'var(--text-primary)',
                minHeight: '40px'
              }}
              title="Preview rendered in legacy font"
            >
              {encodedText}
            </div>

            {/* Raw ASCII code */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px dashed var(--border-subtle)', paddingTop: '8px' }}>
              <span className="ht-small" style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Raw ASCII:
              </span>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)', wordBreak: 'break-all' }}>
                {encodedText}
              </code>
            </div>
          </div>
        )}
      </div>

      {!isEmpty && encodedText && (
        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>📋</span>
          <span>Copy → Open CorelDraw/Illustrator → Set font to <strong>{font.name}</strong> → Paste</span>
        </div>
      )}
    </div>
  );
};

