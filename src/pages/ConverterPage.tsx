import { useState, useEffect, useCallback, useRef } from 'react';
import { HinglishInput } from '../components/HinglishInput';
import { UnicodeInput } from '../components/UnicodeInput';
import { FontSelector } from '../components/FontSelector';
import { OutputPanel } from '../components/OutputPanel';
import { HistoryDrawer } from '../components/HistoryDrawer';
import { AdSlot } from '../components/AdSlot';
import type { FontId, HistoryEntry, ConversionOutput } from '../lib/types/index';
import { FONT_LIST } from '../lib/types/index';
import { encode } from '../lib/fontEncoders/index';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDebounce } from '../hooks/useDebounce';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

type InputMode = 'hinglish' | 'unicode';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function ConverterPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.input-column', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
    gsap.from('.output-column', {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2
    });
  }, { scope: containerRef });

  // ── Mode state ──────────────────────────────────────────────────────────
  const [inputMode, setInputMode] = useState<InputMode>('hinglish');

  // ── Hinglish mode state ─────────────────────────────────────────────────
  const [hinglishText, setHinglishText] = useState('');
  const [hinglishUnicode, setHinglishUnicode] = useState(''); // editable intermediate

  // ── Unicode mode state ──────────────────────────────────────────────────
  const [unicodeText, setUnicodeText] = useState('');

  // ── Font selection (persisted) ──────────────────────────────────────────
  const [selectedFonts, setSelectedFonts] = useLocalStorage<FontId[]>(
    'hindilekh-selected-fonts',
    ['krutiDev']
  );

  // ── Conversion outputs ──────────────────────────────────────────────────
  const [outputs, setOutputs] = useState<ConversionOutput[]>([]);

  // ── History (persisted) ─────────────────────────────────────────────────
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>('hindilekh-history', []);

  // ── History drawer ──────────────────────────────────────────────────────
  const [historyOpen, setHistoryOpen] = useState(false);

  // ── Debounce for large inputs ────────────────────────────────────────────
  // The active unicode text to convert
  const activeUnicode = inputMode === 'hinglish' ? hinglishUnicode : unicodeText;
  const debouncedUnicode = useDebounce(activeUnicode, activeUnicode.length > 500 ? 100 : 0);

  // ── Run conversion pipeline ─────────────────────────────────────────────
  useEffect(() => {
    if (!debouncedUnicode.trim() || selectedFonts.length === 0) {
      setOutputs([]);
      return;
    }

    const newOutputs: ConversionOutput[] = selectedFonts.map((fontId) => ({
      fontId,
      encodedText: encode(fontId, debouncedUnicode),
    }));
    setOutputs(newOutputs);

    // Save to history (only on meaningful text)
    if (debouncedUnicode.trim().length > 2) {
      const entry: HistoryEntry = {
        id: generateId(),
        inputMode,
        inputText: inputMode === 'hinglish' ? hinglishText : unicodeText,
        unicodeText: debouncedUnicode,
        selectedFonts,
        outputs: newOutputs,
        timestamp: Date.now(),
      };
      setHistory((prev) => [entry, ...prev.filter((h) => h.unicodeText !== debouncedUnicode)].slice(0, 10));
    }
  }, [debouncedUnicode, selectedFonts]);

  // ── Restore from history ────────────────────────────────────────────────
  const handleRestore = useCallback((entry: HistoryEntry) => {
    setInputMode(entry.inputMode);
    if (entry.inputMode === 'hinglish') {
      setHinglishText(entry.inputText);
      setHinglishUnicode(entry.unicodeText);
    } else {
      setUnicodeText(entry.unicodeText);
    }
    setSelectedFonts(entry.selectedFonts);
  }, []);

  // ── Clear ────────────────────────────────────────────────────────────────
  const handleClearHinglish = () => {
    setHinglishText('');
    setHinglishUnicode('');
    setOutputs([]);
  };

  const handleClearUnicode = () => {
    setUnicodeText('');
    setOutputs([]);
  };

  const handleClearAll = () => {
    setHinglishText('');
    setHinglishUnicode('');
    setUnicodeText('');
    setOutputs([]);
  };

  // ── Mode switch ──────────────────────────────────────────────────────────
  const switchMode = (mode: InputMode) => {
    setInputMode(mode);
    // Don't clear text — keep each mode's input independent
  };

  const isEmpty = !activeUnicode.trim();

  return (
    <div className="app-root" ref={containerRef}>
      {/* ── Header ── */}
      <header className="app-header glass-panel" style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0, borderBottom: '1px solid rgba(255,255,255,0.8)' }}>
        <div className="header-inner">
          <div className="header-brand">
            <h1 className="brand-name" style={{ color: 'var(--magenta)' }}>हिंदी</h1>
          </div>

          <div className="header-actions">
            <button
              id="history-btn"
              className={`icon-btn ${historyOpen ? 'icon-btn--active' : ''}`}
              onClick={() => setHistoryOpen(!historyOpen)}
              title="Recent conversions"
              aria-expanded={historyOpen}
              aria-controls="history-drawer"
            >
              <span className="icon-btn-icon">🕐</span>
              <span className="icon-btn-label">History</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── History Drawer ── */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onRestore={handleRestore}
        onClearHistory={() => setHistory([])}
      />

      {/* ── Main Content ── */}
      <main className="app-main">
        <div className="main-inner">

          {/* ── Input Section ── */}
          <section className="input-column">
            <div className="section-card glass-panel" style={{ padding: '24px' }}>
              {/* Mode tabs */}
              <div className="mode-tabs" role="tablist" aria-label="Input mode">
                <button
                  id="tab-hinglish"
                  role="tab"
                  aria-selected={inputMode === 'hinglish'}
                  className={`mode-tab ${inputMode === 'hinglish' ? 'mode-tab--active' : ''}`}
                  onClick={() => switchMode('hinglish')}
                >
                  Hinglish / Phonetic
                </button>
                <button
                  id="tab-unicode"
                  role="tab"
                  aria-selected={inputMode === 'unicode'}
                  className={`mode-tab ${inputMode === 'unicode' ? 'mode-tab--active' : ''}`}
                  onClick={() => switchMode('unicode')}
                >
                  Unicode Hindi
                </button>
              </div>

              {/* Input area */}
              <div className="tab-content" style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--taupe)' }}>
                {inputMode === 'hinglish' ? (
                  <HinglishInput
                    value={hinglishText}
                    onChange={setHinglishText}
                    unicodeValue={hinglishUnicode}
                    onUnicodeChange={setHinglishUnicode}
                    onClear={handleClearHinglish}
                  />
                ) : (
                  <UnicodeInput
                    value={unicodeText}
                    onChange={setUnicodeText}
                    onClear={handleClearUnicode}
                  />
                )}
              </div>

              {/* Font selector */}
              <div className="font-selector-wrapper">
                <FontSelector
                  selected={selectedFonts}
                  onChange={setSelectedFonts}
                />
              </div>

              {/* Global clear */}
              {!isEmpty && (
               <div className="global-clear-wrapper" style={{ marginTop: '16px' }}>
                  <button className="global-clear-btn" onClick={handleClearAll} style={{ color: 'var(--magenta)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold' }}>
                    ✕ Clear All
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ── Signature Divider ── */}
          <div className="main-divider" aria-hidden="true" style={{ background: 'var(--cyan)', opacity: 0.5, borderRadius: '2px' }} />

          {/* ── Output Section ── */}
          <section className="output-column">
            <div className="output-section-header glass-panel" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 className="output-section-title" style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: 'var(--ink)' }}>
                Font Output
                {outputs.length > 0 && (
                  <span className="output-count-badge" style={{ marginLeft: '12px', background: 'var(--cyan)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.9rem' }}>{outputs.length}</span>
                )}
              </h2>
              {!isEmpty && outputs.length > 0 && (
                <span className="output-ready-hint" style={{ color: 'var(--magenta)', fontWeight: 600, fontSize: '0.9rem' }}>✓ Ready to copy and paste</span>
              )}
            </div>

            {selectedFonts.length === 0 ? (
              <div className="no-font-message glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
                <span className="no-font-icon" style={{ fontSize: '2rem' }}>🎯</span>
                <p style={{ marginTop: '8px', color: 'var(--ink-muted)' }}>Select one or more fonts above to see output</p>
              </div>
            ) : (
              <div className="output-panels">
                {FONT_LIST.filter((f) => selectedFonts.includes(f.id)).map((font) => {
                  const output = outputs.find((o) => o.fontId === font.id);
                  return (
                    <div key={font.id} className="glass-panel" style={{ marginBottom: '16px', overflow: 'hidden' }}>
                      <OutputPanel
                        font={font}
                        encodedText={output?.encodedText ?? ''}
                        unicodeText={activeUnicode}
                        isEmpty={isEmpty || !output?.encodedText}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* ── Ad Banner ── */}
      <div className="converter-ad-wrapper" style={{ margin: '2rem auto', textAlign: 'center', width: '100%', maxWidth: '1200px', padding: '0 2rem' }}>
        <AdSlot slotName="footer" />
      </div>

      {/* ── Footer ── */}
      <footer className="app-footer glass-panel" style={{ borderBottom: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0, marginTop: 'auto' }}>
        हिंदी — Designed for Indian graphic designers.
      </footer>
    </div>
  );
}
