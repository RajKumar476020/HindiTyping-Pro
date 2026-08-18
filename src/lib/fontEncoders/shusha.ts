/**
 * Hindilekh — Stage 2 Encoder: Shusha
 *
 * Shusha is used in North India, Maharashtra, and neighboring states.
 * It has a layout that differs from Kruti Dev in consonant and matra assignments.
 * Widely used for Marathi/Hindi DTP alongside Shree Lipi and ISM Office.
 */
import type { SyllableToken } from '../types/index';
import { parseDevanagari } from '../devanagariParser';

const SH_CONSONANT: Record<string, string> = {
  'क': 'k',
  'ख': 'K',
  'ग': 'g',
  'घ': 'G',
  'ङ': '~N',
  'च': 'c',
  'छ': 'C',
  'ज': 'j',
  'झ': 'J',
  'ञ': '~n',
  'ट': 'T',
  'ठ': '{',
  'ड': 'D',
  'ढ': '}',
  'ण': 'N',
  'त': 't',
  'थ': 'T',
  'द': 'd',
  'ध': 'D',
  'न': 'n',
  'प': 'p',
  'फ': 'P',
  'ब': 'b',
  'भ': 'B',
  'म': 'm',
  'य': 'y',
  'र': 'r',
  'ल': 'l',
  'व': 'v',
  'श': 'S',
  'ष': 'X',
  'स': 's',
  'ह': 'h',
  'ळ': 'L',
  'क़': 'q',
  'ज़': 'z',
  'ड़': 'R',
  'फ़': 'f',
};

const SH_HALF: Record<string, string> = {
  'क': 'K',
  'ख': 'KH',
  'ग': 'GG',
  'घ': 'Gh',
  'च': 'Ch',
  'ज': 'JJ',
  'ट': 'TT',
  'ठ': '{h',
  'ड': 'DD',
  'त': 'TH',
  'थ': 'Th',
  'द': 'dh',
  'ध': 'Dh',
  'न': 'nh',
  'प': 'Ph',
  'ब': 'Bh',
  'म': 'Mh',
  'य': 'yh',
  'र': '^',
  'ल': 'lh',
  'व': 'vh',
  'श': 'Sh',
  'ष': 'Xh',
  'स': 'sh',
  'ह': 'hh',
};

const SH_CONJUNCT: Record<string, string> = {
  'क्ष': 'x',
  'ज्ञ': 'Z',
  'त्र': 'tr',
  'क्र': 'kr',
  'प्र': 'pr',
  'ब्र': 'br',
  'भ्र': 'bhr',
  'म्र': 'mr',
  'श्र': 'shr',
  'स्र': 'sr',
  'ग्र': 'gr',
  'त्त': 'tt',
  'त्थ': 'tTH',
  'त्व': 'tv',
  'त्य': 'ty',
  'न्त': 'nt',
  'न्द': 'nd',
  'न्ध': 'ndh',
  'न्न': 'nn',
  'न्य': 'ny',
  'ल्ल': 'll',
  'ष्ट': 'Xt',
  'ष्ठ': 'X{',
  'स्त': 'st',
  'स्थ': 'sTH',
  'स्व': 'sv',
  'ह्र': 'hr',
};

const SH_MATRA: Record<string, string> = {
  '\u093E': 'a',   // ा  aa
  '\u093F': 'i',   // ि  i (before consonant in Shusha too)
  '\u0940': 'I',   // ी  ii
  '\u0941': 'u',   // ु  u
  '\u0942': 'U',   // ू  uu
  '\u0943': 'R',   // ृ  ri
  '\u0944': 'RR',  // ॄ
  '\u0945': 'e',   // ॅ  short-e
  '\u0946': 'e',   // ॆ
  '\u0947': 'e',   // े  e
  '\u0948': 'E',   // ै  ai
  '\u0949': 'o',   // ॉ
  '\u094A': 'o',
  '\u094B': 'o',   // ो  o
  '\u094C': 'O',   // ौ  au
};

const SH_VOWEL: Record<string, string> = {
  'अ': 'a',
  'आ': 'aa',
  'इ': 'i',
  'ई': 'ii',
  'उ': 'u',
  'ऊ': 'uu',
  'ऋ': 'R',
  'ए': 'e',
  'ऐ': 'ai',
  'ओ': 'o',
  'औ': 'au',
};

const SH_ANUSV  = 'M';
const SH_CHANDR = 'M';
const SH_VISARG = 'H';
const SH_REPH   = 'r';  // reph in Shusha: 'r' before consonant
const SH_HALANT = '\\'; // halant sign

export function encodeShusha(tokens: SyllableToken[]): string {
  let result = '';

  for (const token of tokens) {
    if (token.type === 'passthrough') {
      result += token.char;
      continue;
    }

    if (token.type === 'vowel') {
      const base = token.char[0];
      const rest = token.char.slice(1);
      result += SH_VOWEL[base] ?? base;
      for (const ch of rest) {
        if (ch === '\u0902') result += SH_ANUSV;
        else if (ch === '\u0901') result += SH_CHANDR;
        else if (ch === '\u0903') result += SH_VISARG;
      }
      continue;
    }

    const { baseConsonants, matra, hasReph, anusvara, isHalant } = token;

    let consStr = '';
    if (baseConsonants.length >= 2) {
      const conjKey = baseConsonants.join('');
      if (SH_CONJUNCT[conjKey]) {
        consStr = SH_CONJUNCT[conjKey];
      } else {
        for (let ci = 0; ci < baseConsonants.length - 1; ci++) {
          const c = baseConsonants[ci];
          consStr += SH_HALF[c] ?? ((SH_CONSONANT[c] ?? '?') + SH_HALANT);
        }
        consStr += SH_CONSONANT[baseConsonants[baseConsonants.length - 1]] ?? '?';
      }
    } else if (baseConsonants.length === 1) {
      consStr = SH_CONSONANT[baseConsonants[0]] ?? '?';
    }

    let syllOut = '';
    if (matra === '\u093F') syllOut += SH_MATRA['\u093F'];
    if (hasReph) syllOut += SH_REPH;
    syllOut += consStr;
    if (matra && matra !== '\u093F') syllOut += SH_MATRA[matra] ?? '';
    if (anusvara === '\u0902') syllOut += SH_ANUSV;
    else if (anusvara === '\u0901') syllOut += SH_CHANDR;
    else if (anusvara === '\u0903') syllOut += SH_VISARG;
    if (isHalant) syllOut += SH_HALANT;

    result += syllOut;
  }

  return result;
}

export function unicodeToShusha(unicode: string): string {
  const tokens = parseDevanagari(unicode);
  return encodeShusha(tokens);
}
