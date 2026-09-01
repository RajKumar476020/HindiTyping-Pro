import React, { useState } from 'react';
import { CopyIcon, CheckIcon, SparklesIcon } from '../Icons';
import { encode } from '../../lib/fontEncoders/index';

export const FontShowcase: React.FC = () => {
  const [sampleText, setSampleText] = useState('नमस्ते कैसे हैं आप?');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const krutiDevOut = encode('krutiDev', sampleText);
  const devLysOut = encode('devLys', sampleText);
  const chanakyaOut = encode('chanakya', sampleText);
  const shushaOut = encode('shusha', sampleText);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  };

  const showcaseItems = [
    {
      id: 'unicode',
      label: 'Unicode',
      colorClass: 'neutral',
      output: sampleText,
      fontClass: '',
    },
    {
      id: 'krutiDev',
      label: 'Kruti Dev 010',
      colorClass: 'magenta',
      output: krutiDevOut,
      fontClass: 'font-krutidev',
    },
    {
      id: 'devLys',
      label: 'DevLys 010',
      colorClass: 'cyan',
      output: devLysOut,
      fontClass: 'font-devlys',
    },
    {
      id: 'chanakya',
      label: 'Chanakya',
      colorClass: 'yellow',
      output: chanakyaOut,
      fontClass: 'font-chanakya',
    },
    {
      id: 'shusha',
      label: 'Shusha',
      colorClass: 'blue',
      output: shushaOut,
      fontClass: 'font-shusha',
    },
  ];

  return (
    <section id="showcase" className="ht-section">
      <div className="ht-container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <h2 className="ht-h2">Live Font Showcase</h2>
          <p className="ht-body" style={{ marginTop: '8px' }}>
            See how your text renders in different legacy fonts simultaneously.
          </p>
        </div>

        {/* Live Test Input */}
        <div className="ht-showcase-controls">
          <SparklesIcon size={18} style={{ color: 'var(--accent-magenta)' }} />
          <input
            type="text"
            className="ht-showcase-input"
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            placeholder="Type any Hindi word here to test all fonts..."
          />
          <button
            type="button"
            className="ht-copy-btn"
            onClick={() => setSampleText('श्री गणेशाय नमः | शुभ दीपावली')}
          >
            Sample
          </button>
        </div>

        {/* 5 Connected Chips */}
        <div className="ht-showcase-chips-row">
          {showcaseItems.map((item) => (
            <div key={item.id} className={`ht-showcase-chip ${item.colorClass}`}>
              <div className="ht-chip-header">
                <span className={`ht-chip-tag ${item.colorClass}`}>{item.label}</span>
                <button
                  type="button"
                  className={`ht-copy-btn ${copiedId === item.id ? 'copied' : ''}`}
                  onClick={() => handleCopy(item.id, item.output)}
                  title="Copy encoded output"
                >
                  {copiedId === item.id ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                </button>
              </div>
              <div className={`ht-chip-content ${item.fontClass}`}>
                {item.output || '...'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
