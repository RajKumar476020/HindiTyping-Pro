/**
 * Hindilekh — Stage 2 Encoder: DevLys 010
 *
 * DevLys 010 is closely related to Kruti Dev but uses different key assignments
 * for several matras, half-forms, and conjuncts.
 *
 * Key differences from Kruti Dev 010:
 * - u-matra (ु): uses 'q' (same) but uu (ू) uses 'W' not 'w'
 * - Some conjuncts have different glyph codes
 * - Digits may differ
 * - o-matra (ो): encoded as 'ks' not just 'k'
 */
import type { SyllableToken } from '../types/index';
import { parseDevanagari } from '../devanagariParser';

const DL_CONSONANT: Record<string, string> = {
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
  'ध': '/D',
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
  'क़': '&',
  'ख़': 'K',
  'ग़': 'W',
  'ज़': 'I',
  'ड़': ']',
  'ढ़': '^',
  'फ़': 'Q',
};

const DL_HALF: Record<string, string> = {
  'क': 'D',
  'ख': 'K',
  'ग': 'X',
  'घ': 'Gh',
  'च': 'P',
  'ज': 'T',
  'ट': '\\',
  'ठ': '|',
  'ड': 'Dm',
  'ण': 'N.',
  'त': 'R',
  'थ': 'Th',
  'द': 'Nd',
  'ध': 'Dh',
  'न': 'U',
  'प': 'I',
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

const DL_CONJUNCT: Record<string, string> = {
  'क्क': 'DdD',
  'क्त': 'Dr',
  'क्न': 'Du',
  'क्ष': '{}',
  'क्य': 'Dz',
  'क्र': 'dz',
  'क्ल': 'Dy',
  'क्व': 'Do',
  'ग्र': 'xz',
  'ज्ञ': '=',
  'ट्ट': '\\V',
  'ट्र': 'Vz',
  'त्त': 'Rr',
  'त्थ': 'RF',
  'त्न': 'Ru',
  'त्म': 'Re',
  'त्य': 'Rz',
  'त्र': 'rz',
  'त्व': 'Ro',
  'त्स': 'Rl',
  'द्ध': 'nDh',
  'द्र': 'nz',
  'द्व': 'no',
  'न्त': 'Ur',
  'न्द': 'Un',
  'न्ध': 'UDh',
  'न्न': 'Uu',
  'न्य': 'Uz',
  'न्व': 'Uo',
  'प्र': 'iz',
  'ब्र': 'cz',
  'भ्र': 'Hz',
  'म्र': 'ez',
  'ल्ल': 'Yy',
  'व्र': 'oz',
  'श्र': '"rz',
  'ष्ट': '`',
  'स्त': 'Lr',
  'स्थ': 'LF',
  'स्न': 'Lu',
  'स्र': 'Lz',
  'स्व': 'Lo',
  'ह्र': 'gz',
};

// DevLys 010 matra differences vs Kruti Dev:
// - ू (uu): 'W' instead of 'w'
// - ो (o): 'ks' not 'k'
const DL_MATRA: Record<string, string> = {
  '\u093E': 'k',    // ा  aa
  '\u093F': 'f',    // ि  i   (placed BEFORE consonant)
  '\u0940': 'h',    // ी  ii
  '\u0941': 'q',    // ु  u
  '\u0942': 'W',    // ू  uu  ← DevLys difference
  '\u0943': 'a',    // ृ  ri
  '\u0944': 'A',    // ॄ
  '\u0945': '^',    // ॅ
  '\u0946': 's',    // ॆ
  '\u0947': 's',    // े  e
  '\u0948': 'S',    // ै  ai
  '\u0949': 'ks',   // ॉ  short-o ← DevLys
  '\u094A': 'ks',   // ो  short-o
  '\u094B': 'ks',   // ो  o   ← DevLys: 'ks' not 'k'
  '\u094C': 'kS',   // ौ  au
};

const DL_VOWEL: Record<string, string> = {
  'अ': 'v',
  'आ': 'vk',
  'इ': 'b',
  'ई': 'bZ',
  'उ': 'm',
  'ऊ': '\u00C5',
  'ऋ': '_',
  'ए': 'b',
  'ऐ': ',',
  'ओ': 'vks',
  'औ': 'vkS',
};

const DL_ANUSV  = 'a';
const DL_CHANDR = ';';
const DL_VISARG = '%';
const DL_REPH   = '^';
const DL_HALANT = '~';

export function encodeDevLys(tokens: SyllableToken[]): string {
  let result = '';

  for (const token of tokens) {
    if (token.type === 'passthrough') {
      result += token.char;
      continue;
    }

    if (token.type === 'vowel') {
      const base = token.char[0];
      const rest = token.char.slice(1);
      result += DL_VOWEL[base] ?? base;
      for (const ch of rest) {
        if (ch === '\u0902') result += DL_ANUSV;
        else if (ch === '\u0901') result += DL_CHANDR;
        else if (ch === '\u0903') result += DL_VISARG;
      }
      continue;
    }

    const { baseConsonants, matra, hasReph, anusvara, isHalant } = token;

    let consStr = '';
    if (baseConsonants.length >= 2) {
      const conjKey = baseConsonants.join('');
      if (DL_CONJUNCT[conjKey]) {
        consStr = DL_CONJUNCT[conjKey];
      } else {
        for (let ci = 0; ci < baseConsonants.length - 1; ci++) {
          const c = baseConsonants[ci];
          consStr += DL_HALF[c] ?? ((DL_CONSONANT[c] ?? '?') + DL_HALANT);
        }
        consStr += DL_CONSONANT[baseConsonants[baseConsonants.length - 1]] ?? '?';
      }
    } else if (baseConsonants.length === 1) {
      consStr = DL_CONSONANT[baseConsonants[0]] ?? '?';
    }

    let syllOut = '';
    if (matra === '\u093F') syllOut += DL_MATRA['\u093F'];
    if (hasReph) syllOut += DL_REPH;
    syllOut += consStr;
    if (matra && matra !== '\u093F') syllOut += DL_MATRA[matra] ?? '';
    if (anusvara === '\u0902') syllOut += DL_ANUSV;
    else if (anusvara === '\u0901') syllOut += DL_CHANDR;
    else if (anusvara === '\u0903') syllOut += DL_VISARG;
    if (isHalant) syllOut += DL_HALANT;

    result += syllOut;
  }

  return result;
}

export function unicodeToDevLys(unicode: string): string {
  const tokens = parseDevanagari(unicode);
  return encodeDevLys(tokens);
}
