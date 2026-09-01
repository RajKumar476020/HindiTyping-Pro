import React, { useRef, useEffect } from 'react';

interface UnicodeInputProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
}

export const UnicodeInput: React.FC<UnicodeInputProps> = ({
  value,
  onChange,
  onClear,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.max(120, textareaRef.current.scrollHeight) + 'px';
    }
  }, [value]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <label htmlFor="unicode-input" className="ht-small" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
          Unicode Hindi (Direct Type or Paste):
        </label>
        <span className="ht-small" style={{ color: 'var(--text-tertiary)' }}>Mangal, Google Input, etc.</span>
      </div>

      <div className="ht-field-box" style={{ minHeight: '140px' }}>
        <textarea
          ref={textareaRef}
          id="unicode-input"
          className="ht-textarea-input"
          placeholder="यहाँ हिंदी टाइप करें या Google Input Tools से paste करें..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          dir="ltr"
          lang="hi"
          style={{
            fontFamily: 'var(--font-devanagari)',
            fontSize: '16px',
            lineHeight: '1.6',
            minHeight: '100px',
            width: '100%'
          }}
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
  );
};