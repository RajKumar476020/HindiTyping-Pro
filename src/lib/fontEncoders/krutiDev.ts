/**
 * Hindilekh — Stage 2 Encoder: Kruti Dev 010
 *
 * Mapping sourced from multiple cross-referenced open-source projects:
 * - indianlanguageconverter (deepakkamboj, MIT)
 * - kru2uni (ltrc, open source)
 * - Widely published Kruti Dev ↔ Unicode DTP tables
 *
 * Direction: Unicode Devanagari → Kruti Dev 010 ASCII keystrokes
 *
 * Key Kruti Dev layout rules:
 *  1. The i-matra (ि U+093F) is placed BEFORE the consonant
 *  2. The reph (र् preceding a consonant) is placed AFTER the syllable
 *  3. Specific conjuncts have dedicated single/multi-char glyph slots
 */
import type { SyllableToken } from '../types/index';
import { parseDevanagari } from '../devanagariParser';

// ─── Consonant Map: Unicode consonant → KD010 ASCII ─────────────────────────
const KD_CONSONANT: Record<string, string> = {
  'क': 'd',
  'ख': '[',
  'ग': 'x',
  'घ': '?',
  'ङ': 'M',
  'च': 'p',
  'छ': 'N',
  'ज': 't',
  'झ': ']',
  'ञ': 'Y',
  'ट': 'V',
  'ठ': 'B',
  'ड': 'm',
  'ढ': 'M',
  'ण': '.',
  'त': 'r',
  'थ': 'F',
  'द': 'n',
  'ध': '/D',  // note: backslash-D
  'न': 'u',
  'प': 'i',
  'फ': 'Q',
  'ब': 'c',
  'भ': 'H',
  'म': 'e',
  'य': 'z',
  'र': 'j',
  'ल': 'y',
  'व': 'o',
  'श': '"',
  'ष': "'",
  'स': 'l',
  'ह': 'g',
  'ळ': 'G',
  // Nukta variants
  'क़': '&',
  'ख़': 'K',
  'ग़': 'W',
  'ज़': 'I',
  'ड़': ']',
  'ढ़': '^',
  'फ़': 'Q',
};

// Half-forms (halant state) of consonants in Kruti Dev
const KD_HALF: Record<string, string> = {
  'क': 'D',
  'ख': 'K',
  'ग': 'X',
  'घ': 'Gh',
  'ङ': 'M',
  'च': 'P',
  'छ': 'Ns',
  'ज': 'T',
  'झ': 'Jh',
  'ञ': 'Y',
  'ट': '\\',
  'ठ': '|',
  'ड': 'Dm',
  'ढ': 'DM',
  'ण': 'N.',
  'त': 'R',
  'थ': 'Th',
  'द': 'Nd',
  'ध': 'Dh',
  'न': 'U',
  'प': 'I',
  'फ': 'Qh',
  'ब': 'C',
  'भ': 'bH',
  'म': 'E',
  'य': 'Z',
  'र': '^',
  'ल': 'Y',
  'व': 'O',
  'श': '"',
  'ष': "';",
  'स': 'L',
  'ह': 'G',
};

// Common conjuncts with dedicated KD010 glyph slots
// Key: Unicode consonant1 + consonant2 (+ consonant3 for three-way)
const KD_CONJUNCT: Record<string, string> = {
  'क्क': 'DdD',
  'क्त': 'Dr',
  'क्न': 'Du',
  'क्ष': '{}',
  'क्य': 'Dz',
  'क्र': 'dz',
  'क्ल': 'Dy',
  'क्व': 'Do',
  'ग्र': 'xz',
  'ग्ध': 'XDh',
  'घ्र': '?z',
  'च्य': 'Pz',
  'च्र': 'pz',
  'ज्ज': 'Tt',
  'ज्ञ': '=',
  'ज्य': 'Tz',
  'ट्ट': '\\V',
  'ट्ठ': '\\B',
  'ट्र': 'Vz',
  'ड्ड': 'Dmmm',
  'ड्र': 'mz',
  'त्त': 'Rr',
  'त्थ': 'RF',
  'त्न': 'Ru',
  'त्म': 'Re',
  'त्य': 'Rz',
  'त्र': 'rz',
  'त्व': 'Ro',
  'त्स': 'Rl',
  'थ्र': 'Fz',
  'द्ग': 'nX',
  'द्ध': 'Uìa',
  'द्ब': 'nC',
  'द्म': 'ne',
  'द्य': 'nz',
  'द्र': 'nz',
  'द्व': 'no',
  'न्त': 'Ur',
  'न्थ': 'UF',
  'न्द': 'Un',
  'न्ध': 'UDh',
  'न्न': 'Uu',
  'न्य': 'Uz',
  'न्व': 'Uo',
  'न्स': 'Ul',
  'प्त': 'Ir',
  'प्न': 'Iu',
  'प्प': 'Ii',
  'प्य': 'Iz',
  'प्र': 'iz',
  'प्ल': 'Iy',
  'प्स': 'Il',
  'ब्ज': 'CT',
  'ब्द': 'Cn',
  'ब्ब': 'Cc',
  'ब्य': 'Cz',
  'ब्र': 'cz',
  'ब्ल': 'Cy',
  'भ्र': 'Hz',
  'म्न': 'Eu',
  'म्प': 'Ei',
  'म्ब': 'Ec',
  'म्य': 'Ez',
  'म्र': 'ez',
  'म्ल': 'Ey',
  'म्व': 'Eo',
  'ल्ल': 'Yy',
  'ल्य': 'Yz',
  'व्य': 'Oz',
  'व्र': 'oz',
  'श्च': '"p',
  'श्न': '"u',
  'श्य': '"z',
  'श्र': '"rz',
  'श्ल': '"y',
  'श्व': '"o',
  'ष्ट': '`',
  'ष्ठ': "'B",
  'ष्ण': "'.",
  'ष्प': "'i",
  'ष्म': "'e",
  'ष्य': "'z",
  'स्त': 'Lr',
  'स्थ': 'LF',
  'स्न': 'Lu',
  'स्प': 'Li',
  'स्म': 'Le',
  'स्य': 'Lz',
  'स्र': 'Lz',
  'स्ल': 'Ly',
  'स्व': 'Lo',
  'ह्न': 'gu',
  'ह्म': 'ge',
  'ह्य': 'gz',
  'ह्र': 'gz',
  'ह्व': 'go',
};

// ─── Matra Map: Unicode matra codepoint → KD010 ASCII ───────────────────────
const KD_MATRA: Record<string, string> = {
  '\u093E': 'k',   // ा  aa
  '\u093F': 'f',   // ि  i  (placed BEFORE consonant — handled specially)
  '\u0940': 'h',   // ी  ii
  '\u0941': 'q',   // ु  u
  '\u0942': 'w',   // ू  uu
  '\u0943': 'a',   // ृ  ri
  '\u0944': 'A',   // ॄ  rii
  '\u0945': '^',   // ॅ  short-e (candra)
  '\u0946': 's',   // ॆ  short-e
  '\u0947': 's',   // े  e
  '\u0948': 'S',   // ै  ai
  '\u0949': 'k',   // ॉ  short-o
  '\u094A': 'k',   // ॊ  short-o
  '\u094B': 'k',   // ो  o  (KD: consonant + 'k', but 'k' alone is aa; context: after consonant)
  '\u094C': 'kS',  // ौ  au
};

// ─── Independent Vowel Map ────────────────────────────────────────────────────
const KD_VOWEL: Record<string, string> = {
  'अ': 'v',
  'आ': 'vk',
  'इ': 'b',
  'ई': 'bZ',
  'उ': 'm',
  'ऊ': '\u00C5', // Å
  'ऋ': '_',
  'ए': 'b',
  'ऐ': ',',
  'ओ': 'vks',
  'औ': 'vkS',
  'ऑ': 'vks', // ऑ ≈ ओ in KD
};

const KD_ANUSV  = 'a';  // ं  anusvara
const KD_CHANDR = ';';  // ँ  chandrabindu
const KD_VISARG = '%';  // ः  visarga
const KD_REPH   = '^';  // र्  reph (placed before consonant display, after in typing)
const KD_HALANT = '~';  // ्  explicit halant

/**
 * Encode a token stream → Kruti Dev 010 ASCII string.
 */
export function encodeKrutiDev(tokens: SyllableToken[]): string {
  let result = '';

  for (const token of tokens) {
    if (token.type === 'passthrough') {
      result += token.char;
      continue;
    }

    if (token.type === 'vowel') {
      const base = token.char[0];
      const rest = token.char.slice(1);
      result += KD_VOWEL[base] ?? base;
      for (const ch of rest) {
        if (ch === '\u0902') result += KD_ANUSV;
        else if (ch === '\u0901') result += KD_CHANDR;
        else if (ch === '\u0903') result += KD_VISARG;
      }
      continue;
    }

    // type === 'syllable'
    const { baseConsonants, matra, hasReph, anusvara, isHalant } = token;

    // Build consonant cluster string
    let consStr = '';
    if (baseConsonants.length >= 2) {
      const conjKey = baseConsonants.join('');
      if (KD_CONJUNCT[conjKey]) {
        consStr = KD_CONJUNCT[conjKey];
      } else {
        // Build from half-forms + full form
        for (let ci = 0; ci < baseConsonants.length - 1; ci++) {
          const c = baseConsonants[ci];
          consStr += KD_HALF[c] ?? ((KD_CONSONANT[c] ?? '?') + KD_HALANT);
        }
        consStr += KD_CONSONANT[baseConsonants[baseConsonants.length - 1]] ?? '?';
      }
    } else if (baseConsonants.length === 1) {
      consStr = KD_CONSONANT[baseConsonants[0]] ?? '?';
    }

    let syllOut = '';

    // i-matra goes BEFORE the consonant cluster in Kruti Dev
    if (matra === '\u093F') {
      syllOut += KD_MATRA['\u093F']; // 'f'
    }

    // Reph in Kruti Dev: typed as '^' BEFORE the consonant (at the key-level)
    if (hasReph) {
      syllOut += KD_REPH;
    }

    syllOut += consStr;

    // Other matras (not i-matra) go AFTER consonant
    if (matra && matra !== '\u093F') {
      syllOut += KD_MATRA[matra] ?? '';
    }

    // Anusvara / chandrabindu / visarga
    if (anusvara === '\u0902') syllOut += KD_ANUSV;
    else if (anusvara === '\u0901') syllOut += KD_CHANDR;
    else if (anusvara === '\u0903') syllOut += KD_VISARG;

    // Explicit halant at end
    if (isHalant) syllOut += KD_HALANT;

    result += syllOut;
  }

  return result;
}

export function unicodeToKrutiDev(unicode: string): string {
  const tokens = parseDevanagari(unicode);
  return encodeKrutiDev(tokens);
}
