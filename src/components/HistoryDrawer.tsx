import React from 'react';
import type { HistoryEntry } from '../lib/types/index';
import { FONT_LIST } from '../lib/types/index';
import { CloseIcon } from './Icons';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryEntry[];
  onRestore: (entry: HistoryEntry) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onRestore,
  onClearHistory,
}) => {
  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) +
      ', ' + d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 1001,
            transition: 'opacity 0.25s ease'
          }}
        />
      )}

      {/* Drawer */}
      <aside
        id="history-drawer"
        role="complementary"
        aria-label="Recent conversions history"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '380px',
          maxWidth: '90vw',
          backgroundColor: 'var(--bg-page)',
          borderLeft: '1px solid var(--border-subtle)',
          boxShadow: 'var(--elevated-shadow)',
          zIndex: 1002,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>🕐</span>
            <h2 className="ht-h3" style={{ fontSize: '17px' }}>
              Recent Conversions
            </h2>
          </div>
          <button
            type="button"
            className="ht-icon-btn"
            onClick={onClose}
            aria-label="Close history drawer"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Drawer Body */}
        {history.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center', gap: '8px' }}>
            <span style={{ fontSize: '32px' }}>📭</span>
            <p className="ht-body" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>No conversions yet</p>
            <p className="ht-small">Your recent conversions will automatically be saved here.</p>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {history.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => {
                    onRestore(entry);
                    onClose();
                  }}
                  title="Click to restore this conversion"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-card)',
                    padding: '14px',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-blue)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-chip)',
                        backgroundColor: entry.inputMode === 'hinglish' ? 'rgba(10, 132, 255, 0.12)' : 'rgba(52, 199, 89, 0.12)',
                        color: entry.inputMode === 'hinglish' ? 'var(--accent-blue)' : 'var(--accent-green)'
                      }}
                    >
                      {entry.inputMode === 'hinglish' ? '⌨️ Hinglish' : '📋 Unicode'}
                    </span>
                    <span className="ht-small" style={{ fontSize: '11px' }}>
                      {formatTime(entry.timestamp)}
                    </span>
                  </div>

                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                    {entry.unicodeText.slice(0, 60)}
                    {entry.unicodeText.length > 60 ? '…' : ''}
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
                    {entry.selectedFonts.map((fid) => {
                      const font = FONT_LIST.find((f) => f.id === fid);
                      return (
                        <span
                          key={fid}
                          style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: 'var(--bg-card-tint)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border-subtle)'
                          }}
                        >
                          {font?.name ?? fid}
                        </span>
                      );
                    })}
                  </div>
                </button>
              ))}
            </div>

            {/* Drawer Footer */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="ht-btn-secondary"
                onClick={onClearHistory}
                style={{ height: '36px', fontSize: '13px', color: 'var(--accent-magenta)' }}
              >
                🗑️ Clear History
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

