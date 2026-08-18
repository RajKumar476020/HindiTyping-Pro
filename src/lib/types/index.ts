// Shared types for Hindilekh

export type FontId = 'krutiDev' | 'devLys' | 'chanakya' | 'shusha';

export interface FontMeta {
  id: FontId;
  name: string;
  fileName: string;
  cssFamily: string;
  description: string;
}

export const FONT_LIST: FontMeta[] = [
  {
    id: 'krutiDev',
    name: 'Kruti Dev 010',
    fileName: 'KrutiDev010.ttf',
    cssFamily: 'KrutiDev010',
    description: 'Most widely used legacy Hindi font in India',
  },
  {
    id: 'devLys',
    name: 'DevLys 010',
    fileName: 'DevLys010.ttf',
    cssFamily: 'DevLys010',
    description: 'Popular alternative to Kruti Dev in DTP',
  },
  {
    id: 'chanakya',
    name: 'Chanakya',
    fileName: 'Chanakya.ttf',
    cssFamily: 'Chanakya',
    description: 'Used heavily in government & newspaper printing',
  },
  {
    id: 'shusha',
    name: 'Shusha',
    fileName: 'Shusha.ttf',
    cssFamily: 'Shusha',
    description: 'Common in Maharashtra & North Indian print shops',
  },
];

// Stage 1 parser output
export type SyllableToken =
  | {
      type: 'syllable';
      baseConsonants: string[]; // Unicode codepoints of consonants (for conjuncts, multiple)
      matra: string | null;     // Unicode matra codepoint, or null for 'a' inherent vowel
      hasReph: boolean;         // र् (reph) precedes this syllable visually
      hasNukta: boolean;
      anusvara: string | null;  // anusvara/chandrabindu/visarga after matra
      isHalant: boolean;        // ends with virama (half-form / no vowel)
    }
  | { type: 'vowel'; char: string }       // Standalone initial vowel (word-initial)
  | { type: 'passthrough'; char: string }; // Space, Latin, digits, punctuation

export interface ConversionOutput {
  fontId: FontId;
  encodedText: string;
}

export interface ConversionResult {
  unicodeText: string;
  outputs: ConversionOutput[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  inputMode: 'hinglish' | 'unicode';
  inputText: string;
  unicodeText: string;
  selectedFonts: FontId[];
  outputs: ConversionOutput[];
  timestamp: number;
}
