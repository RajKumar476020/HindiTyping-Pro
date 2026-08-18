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
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    onChange(newVal);
    // Live transliterate as user types
    onUnicodeChange(transliteratePartial(newVal));
  };

  return (
    <div className="input-section">
      <div className="input-header">
        <label className="input-label">
          Hinglish / Phonetic Typing
        </label>
      </div>

      <div className="textarea-wrapper">
        <textarea
          ref={textareaRef}
          id="hinglish-input"
          className="main-textarea"
          placeholder="namaste... kaise ho... bharat mahan hai..."
          value={value}
          onChange={handleChange}
          rows={4}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <div className="textarea-footer">
          <span className="char-count">{value.length} chars</span>
          {value && (
            <button className="clear-btn" onClick={onClear} title="Clear input">
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Intermediate Unicode result — editable */}
      {unicodeValue && (
        <div className="unicode-preview-section">
          <div className="unicode-preview-header">
            <span className="unicode-label">Unicode Hindi (editable)</span>
          </div>
          <textarea
            id="unicode-intermediate"
            className="unicode-textarea"
            value={unicodeValue}
            onChange={(e) => onUnicodeChange(e.target.value)}
            rows={2}
            spellCheck={false}
            dir="ltr"
          />
        </div>
      )}
    </div>
  );
};
