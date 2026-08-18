import React from 'react';
import type { HistoryEntry } from '../lib/types/index';
import { FONT_LIST } from '../lib/types/index';

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
          className="drawer-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        id="history-drawer"
        className={`history-drawer ${isOpen ? 'history-drawer--open' : ''}`}
        role="complementary"
        aria-label="Recent conversions history"
      >
        <div className="drawer-header">
          <h2 className="drawer-title">
            <span>🕐</span>
            Recent Conversions
          </h2>
          <button
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close history drawer"
          >
            ✕
          </button>
        </div>

        {history.length === 0 ? (
          <div className="drawer-empty">
            <span className="drawer-empty-icon">📭</span>
            <p>No conversions yet</p>
            <p className="drawer-empty-hint">Your last 10 conversions will appear here</p>
          </div>
        ) : (
          <>
            <div className="drawer-list">
              {history.map((entry) => (
                <button
                  key={entry.id}
                  className="history-item"
                  onClick={() => {
                    onRestore(entry);
                    onClose();
                  }}
                  title="Click to restore this conversion"
                >
                  <div className="history-item-mode">
                    <span className="history-mode-badge">
                      {entry.inputMode === 'hinglish' ? '⌨️ Hinglish' : '📋 Unicode'}
                    </span>
                    <span className="history-time">{formatTime(entry.timestamp)}</span>
                  </div>
                  <div className="history-item-preview">
                    {entry.unicodeText.slice(0, 60)}
                    {entry.unicodeText.length > 60 ? '…' : ''}
                  </div>
                  <div className="history-item-fonts">
                    {entry.selectedFonts.map((fid) => {
                      const font = FONT_LIST.find((f) => f.id === fid);
                      return (
                        <span key={fid} className="history-font-tag">
                          {font?.name ?? fid}
                        </span>
                      );
                    })}
                  </div>
                </button>
              ))}
            </div>

            <div className="drawer-footer">
              <button
                className="clear-history-btn"
                onClick={onClearHistory}
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
