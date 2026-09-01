import React, { useRef, useEffect } from 'react';
import { transliteratePartial } from '../lib/hinglishTransliterator';

interface HinglishInputProps {
  value: string;
  onChange: (val: string) => void;
  unicodeValue: string;
  onUnicodeChange: (val: string) => void;
  onClear: () => void;
}

export const HinglishInput: React.FC<HinglishInputProps> = ({
  value,
  onChange,
  unicodeValue,
  onUnicodeChange,
  onClear,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.max(100, textareaRef.current.scrollHeight) + 'px';
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    onChange(newVal);
    // Live transliterate as user types
    onUnicodeChange(transliteratePartial(newVal));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <label htmlFor="hinglish-input" className="ht-small" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            Type in Hinglish (Phonetic English):
          </label>
          <span className="ht-small" style={{ color: 'var(--text-tertiary)' }}>e.g. namaste, bharat</span>
        </div>

        <div className="ht-field-box" style={{ minHeight: '120px' }}>
          <textarea
            ref={textareaRef}
            id="hinglish-input"
            className="ht-textarea-input"
            placeholder="Type English phonetically (e.g. 'namaste... kaise ho...')"
            value={value}
            onChange={handleChange}
            style={{ minHeight: '80px', width: '100%' }}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          <div className="ht-field-footer">
            <span className="ht-char-count">{value.length} chars</span>
            {value && (
              <button type="button" className="ht-copy-btn" onClick={onClear} title="Clear input">
                ✕ Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Intermediate Unicode result — editable */}
      {unicodeValue && (
        <div style={{ backgroundColor: 'var(--bg-surface)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span className="ht-small" style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>
              ✓ Generated Unicode Hindi (Editable):
            </span>
          </div>
          <textarea
            id="unicode-intermediate"
            className="ht-textarea-input"
            value={unicodeValue}
            onChange={(e) => onUnicodeChange(e.target.value)}
            rows={2}
            spellCheck={false}
            dir="ltr"
            style={{
              fontFamily: 'var(--font-devanagari)',
              fontSize: '17px',
              fontWeight: 500,
              width: '100%',
              minHeight: '50px'
            }}
          />
        </div>
      )}
    </div>
  );
};

