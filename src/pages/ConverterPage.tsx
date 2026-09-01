import { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from '../components/Landing/Header';
import { Footer } from '../components/Landing/Footer';
import { HinglishInput } from '../components/HinglishInput';
import { UnicodeInput } from '../components/UnicodeInput';
import { FontSelector } from '../components/FontSelector';
import { OutputPanel } from '../components/OutputPanel';
import { HistoryDrawer } from '../components/HistoryDrawer';
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
      x: -40,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
    gsap.from('.output-column', {
      x: 40,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.1,
    });
  }, { scope: containerRef });

  // ── Mode state ──────────────────────────────────────────────────────────
  const [inputMode, setInputMode] = useState<InputMode>('hinglish');

  // ── Hinglish mode state ─────────────────────────────────────────────────
  const [hinglishText, setHinglishText] = useState('');
  const [hinglishUnicode, setHinglishUnicode] = useState('');

  // ── Unicode mode state ──────────────────────────────────────────────────
  const [unicodeText, setUnicodeText] = useState('');

  // ── Font selection (persisted) ──────────────────────────────────────────
  const [selectedFonts, setSelectedFonts] = useLocalStorage<FontId[]>(
    'hindilekh-selected-fonts',
    ['krutiDev', 'devLys', 'chanakya', 'shusha']
  );

  // ── Conversion outputs ──────────────────────────────────────────────────
  const [outputs, setOutputs] = useState<ConversionOutput[]>([]);

  // ── History (persisted) ─────────────────────────────────────────────────
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>('hindilekh-history', []);

  // ── History drawer ──────────────────────────────────────────────────────
  const [historyOpen, setHistoryOpen] = useState(false);

  // ── Active unicode text to convert ──────────────────────────────────────
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

  const switchMode = (mode: InputMode) => {
    setInputMode(mode);
  };

  const isEmpty = !activeUnicode.trim();

  return (
    <div className="converter-page-wrapper" ref={containerRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-page)' }}>
      {/* Universal Header */}
      <Header />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onRestore={handleRestore}
        onClearHistory={() => setHistory([])}
      />

      {/* Main Content */}
      <main className="ht-container" style={{ flex: 1, padding: '32px 24px 64px 24px' }}>
        {/* Top Control bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 className="ht-h2" style={{ fontSize: '24px' }}>
              Full <span className="cmyk-gradient-text">Studio Converter</span>
            </h1>
            <p className="ht-small">Type once in English or Unicode, copy simultaneously to any DTP legacy font.</p>
          </div>

          <button
            id="history-btn"
            type="button"
            className="ht-btn-secondary"
            onClick={() => setHistoryOpen(!historyOpen)}
            style={{ height: '36px', fontSize: '13px' }}
          >
            <span>🕐 Conversion History ({history.length})</span>
          </button>
        </div>

        {/* 2-Column Converter Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', alignItems: 'start' }}>
          {/* Input Column */}
          <section className="input-column" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-card)', padding: '20px', boxShadow: 'var(--elevated-shadow)' }}>
              {/* Mode Tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                <button
                  type="button"
                  className={`ht-font-pill ${inputMode === 'hinglish' ? 'active' : ''}`}
                  onClick={() => switchMode('hinglish')}
                >
                  ⚡ Hinglish / English Typing
                </button>
                <button
                  type="button"
                  className={`ht-font-pill ${inputMode === 'unicode' ? 'active' : ''}`}
                  onClick={() => switchMode('unicode')}
                >
                  🇮🇳 Unicode / Mangal Hindi
                </button>
              </div>

              {/* Input Area */}
              <div style={{ minHeight: '160px' }}>
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

              {/* Font Selector */}
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <span className="ht-small" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                  Select Target Legacy Fonts:
                </span>
                <FontSelector
                  selected={selectedFonts}
                  onChange={setSelectedFonts}
                />
              </div>

              {/* Global Clear */}
              {!isEmpty && (
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={handleClearAll}
                    style={{ fontSize: '13px', color: 'var(--accent-magenta)', fontWeight: 600 }}
                  >
                    ✕ Clear All Text
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Output Column */}
          <section className="output-column" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 className="ht-h3">
                Live Font Outputs ({outputs.length})
              </h2>
              {!isEmpty && outputs.length > 0 && (
                <span className="ht-pill-badge" style={{ padding: '4px 10px', fontSize: '12px' }}>
                  ✓ Ready for CorelDraw & DTP
                </span>
              )}
            </div>

            {selectedFonts.length === 0 ? (
              <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-card)', padding: '36px', textAlign: 'center' }}>
                <p className="ht-body">Select at least one font above to generate legacy output.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {FONT_LIST.filter((f) => selectedFonts.includes(f.id)).map((font) => {
                  const output = outputs.find((o) => o.fontId === font.id);
                  return (
                    <div key={font.id} style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
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

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
