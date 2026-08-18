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
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <div className="input-section">
      <div className="input-header">
        <label className="input-label">
          <span className="label-icon">📋</span> Unicode Hindi
        </label>
        <span className="input-hint">Paste text from Google Input Tools or type directly</span>
      </div>

      <div className="textarea-wrapper">
        <textarea
          ref={textareaRef}
          id="unicode-input"
          className="main-textarea unicode-font"
          placeholder="यहाँ हिंदी टाइप करें या Google Input Tools से paste करें..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          spellCheck={false}
          dir="ltr"
          lang="hi"
        />
        <div className="textarea-footer">
          <span className="char-count">{value.length} chars</span>
          {value && (
            <button className="clear-btn" onClick={onClear} title="Clear input">
              ✕ Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};