import React from 'react';
import type { FontId } from '../lib/types/index';
import { FONT_LIST } from '../lib/types/index';

interface FontSelectorProps {
  selected: FontId[];
  onChange: (selected: FontId[]) => void;
}

export const FontSelector: React.FC<FontSelectorProps> = ({ selected, onChange }) => {
  const toggle = (id: FontId) => {
    if (selected.includes(id)) {
      onChange(selected.filter((f) => f !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const selectAll = () => onChange(FONT_LIST.map((f) => f.id));
  const clearAll = () => onChange([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="ht-small" style={{ color: 'var(--text-secondary)' }}>
          Click to enable/disable fonts for multi-output:
        </span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            className="ht-small"
            style={{ color: 'var(--accent-blue)', fontWeight: 600 }}
            onClick={selectAll}
          >
            Select All
          </button>
          <span style={{ color: 'var(--border-subtle)' }}>|</span>
          <button
            type="button"
            className="ht-small"
            style={{ color: 'var(--text-tertiary)', fontWeight: 500 }}
            onClick={clearAll}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="ht-font-pills-row" style={{ marginTop: '2px' }}>
        {FONT_LIST.map((font) => {
          const isSelected = selected.includes(font.id);
          return (
            <button
              key={font.id}
              id={`font-chip-${font.id}`}
              type="button"
              className={`ht-font-pill ${isSelected ? 'active' : ''}`}
              onClick={() => toggle(font.id)}
              title={font.description}
            >
              {isSelected ? '✓ ' : '+ '} {font.name}
            </button>
          );
        })}
      </div>

      {selected.length === 0 && (
        <p className="ht-small" style={{ color: 'var(--accent-magenta)', marginTop: '4px' }}>
          ⚠️ Please select at least one font to generate output.
        </p>
      )}
    </div>
  );
};

