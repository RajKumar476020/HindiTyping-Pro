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
    <div className="font-selector">
      <div className="font-selector-header">
        <span className="font-selector-title">Output Fonts</span>
        <div className="font-selector-actions">
          <button className="link-btn" onClick={selectAll}>All</button>
          <span className="sep">·</span>
          <button className="link-btn" onClick={clearAll}>None</button>
        </div>
      </div>

      <div className="font-chips">
        {FONT_LIST.map((font) => {
          const isSelected = selected.includes(font.id);
          return (
            <button
              key={font.id}
              id={`font-chip-${font.id}`}
              className={`font-chip ${isSelected ? 'font-chip--selected' : ''}`}
              onClick={() => toggle(font.id)}
              title={font.description}
            >
              <span className="font-chip-check">{isSelected ? '✓' : ''}</span>
              <span className="font-chip-name">{font.name}</span>
            </button>
          );
        })}
      </div>

      {selected.length === 0 && (
        <p className="font-selector-hint">Select at least one font to see output</p>
      )}
    </div>
  );
};
