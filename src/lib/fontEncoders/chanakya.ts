/**
 * Hindilekh — Stage 2 Encoder: Chanakya
 *
 * Chanakya uses a different keyboard scheme from Kruti Dev/DevLys —
 * closer to the old Remington Gail typewriter layout used in
 * government printing presses across India.
 *
 * Key differences:
 * - Many consonants map to different keys
 * - Matras have distinct placements
 * - Conjuncts use different composite glyph slots
 * - Widely used in newspaper typesetting (Navbharat Times era)
 */
import type { SyllableToken } from '../types/index';
import { parseDevanagari } from '../devanagariParser';

const CH_CONSONANT: Record<string, string> = {
  'क': 'd',
  'ख': '[',
  'ग': 'x',
  'घ': 'X',
  'ङ': 'M',
  'च': 'p',
  'छ': 'P',
  'ज': 't',
  'झ': 'T',
  'ञ': 'Y',
  'ट': 'V',
  'ठ': 'B',
  'ड': 'm',
  'ढ': 'M',
  'ण': '.',
  'त': 'r',
  'थ': 'F',
  'द': 'n',
  'ध': 'N',
  'न': 'u',
  'प': 'i',
  'फ': 'I',
  'ब': 'c',
  'भ': 'H',
  'म': 'e',
  'य': 'z',
  'र': 'j',
  'ल': 'y',
  'व': 'o',
  'श': 'Z',
  'ष': "J",
  'स': 'l',
  'ह': 'g',
  'ळ': 'G',
  'क़': '&',
  'ग़': 'W',
  'ज़': 'O',
  'ड़': 'R',
  'फ़': 'I',
};

const CH_HALF: Record<string, string> = {
  'क': 'D',
  'ख': 'Kh',
  'ग': 'Xg',
  'घ': 'Xh',
  'च': 'C',
  'ज': 'Jj',
  'ट': '\\',
  'ठ': '|',
  'त': 'R',
  'थ': 'Th',
  'द': 'Dn',
  'ध': 'Dh',
  'न': 'U',
  'प': 'Ip',
  'ब': 'Cb',
  'भ': 'Hh',
  'म': 'E',
  'य': 'Zy',
  'र': '^',
  'ल': 'Yy',
  'व': 'Ov',
  'श': 'Zs',
  'ष': 'Js',
  'स': 'L',
  'ह': 'Hg',
};

const CH_CONJUNCT: Record<string, string> = {
  'क्ष': '{}',
  'क्र': 'dz',
  'क्त': 'Dr',
  'ज्ञ': '=',
  'त्र': 'rz',
  'त्त': 'Rr',
  'त्थ': 'RF',
  'त्व': 'Ro',
  'त्य': 'Rz',
  'न्त': 'Ur',
  'न्द': 'Un',
  'न्ध': 'UDh',
  'न्न': 'Uu',
  'न्य': 'Uz',
  'प्र': 'iz',
  'ब्र': 'cz',
  'भ्र': 'Hz',
  'म्र': 'ez',
  'श्र': 'Zrz',
  'स्त': 'Lr',
  'स्थ': 'LF',
  'स्र': 'Lz',
  'ह्र': 'gz',
  'ल्ल': 'Yy',
  'ष्ट': '`',
  'द्ध': 'nDh',
  'द्र': 'nz',
};

const CH_MATRA: Record<string, string> = {
  '\u093E': 'k',    // ा  aa
  '\u093F': 'f',    // ि  i  (before consonant)
  '\u0940': 'h',    // ी  ii
  '\u0941': 'q',    // ु  u
  '\u0942': 'w',    // ू  uu
  '\u0943': 'a',    // ृ  ri
  '\u0944': 'A',    // ॄ
  '\u0945': '^',    // ॅ
  '\u0946': 's',    // ॆ
  '\u0947': 's',    // े  e
  '\u0948': 'S',    // ै  ai
  '\u0949': 'ks',   // ॉ  short-o
  '\u094A': 'ks',
  '\u094B': 'ks',   // ो  o
  '\u094C': 'kS',   // ौ  au
};

const CH_VOWEL: Record<string, string> = {
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

const CH_ANUSV  = 'a';
const CH_CHANDR = ';';
const CH_VISARG = '%';
const CH_REPH   = '^';
const CH_HALANT = '~';

export function encodeChanakya(tokens: SyllableToken[]): string {
  let result = '';

  for (const token of tokens) {
    if (token.type === 'passthrough') {
      result += token.char;
      continue;
    }

    if (token.type === 'vowel') {
      const base = token.char[0];
      const rest = token.char.slice(1);
      result += CH_VOWEL[base] ?? base;
      for (const ch of rest) {
        if (ch === '\u0902') result += CH_ANUSV;
        else if (ch === '\u0901') result += CH_CHANDR;
        else if (ch === '\u0903') result += CH_VISARG;
      }
      continue;
    }

    const { baseConsonants, matra, hasReph, anusvara, isHalant } = token;

    let consStr = '';
    if (baseConsonants.length >= 2) {
      const conjKey = baseConsonants.join('');
      if (CH_CONJUNCT[conjKey]) {
        consStr = CH_CONJUNCT[conjKey];
      } else {
        for (let ci = 0; ci < baseConsonants.length - 1; ci++) {
          const c = baseConsonants[ci];
          consStr += CH_HALF[c] ?? ((CH_CONSONANT[c] ?? '?') + CH_HALANT);
        }
        consStr += CH_CONSONANT[baseConsonants[baseConsonants.length - 1]] ?? '?';
      }
    } else if (baseConsonants.length === 1) {
      consStr = CH_CONSONANT[baseConsonants[0]] ?? '?';
    }

    let syllOut = '';
    if (matra === '\u093F') syllOut += CH_MATRA['\u093F'];
    if (hasReph) syllOut += CH_REPH;
    syllOut += consStr;
    if (matra && matra !== '\u093F') syllOut += CH_MATRA[matra] ?? '';
    if (anusvara === '\u0902') syllOut += CH_ANUSV;
    else if (anusvara === '\u0901') syllOut += CH_CHANDR;
    else if (anusvara === '\u0903') syllOut += CH_VISARG;
    if (isHalant) syllOut += CH_HALANT;

    result += syllOut;
  }

  return result;
}

export function unicodeToChanakya(unicode: string): string {
  const tokens = parseDevanagari(unicode);
  return encodeChanakya(tokens);
}
