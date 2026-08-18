/**
 * Hindilekh — Hinglish (Phonetic Roman) → Unicode Devanagari Transliterator
 *
 * Implements a longest-match-first greedy tokenizer over ITRANS/phonetic rules.
 * Output is plain Unicode Devanagari suitable for feeding into the Stage 1 parser.
 */

// Unicode constants
const VIRAMA = '\u094D';      // ् halant / virama
const ANUSVARA = '\u0902';    // ं
const VISARGA = '\u0903';     // ः

// ─── Consonant Map ───────────────────────────────────────────────────────────
// Multi-char patterns MUST come before their single-char prefixes.
// Order within each group matters (longer patterns first).
const CONSONANT_MAP: [string, string][] = [
  // Aspirated + special combinations (check LONGEST first)
  ['ksh', 'क्ष'],
  ['gyn', 'ज्ञ'],
  ['jny', 'ज्ञ'],
  ['jnx', 'ज्ञ'],
  ['trr', 'त्र'],
  ['str', 'स्त्र'],
  ['shr', 'श्र'],
  ['shh', 'ष'],
  ['chh', 'छ'],
  ['nng', 'ङ'],
  ['nny', 'ञ'],

  // Two-char consonants
  ['kh', 'ख'],
  ['gh', 'घ'],
  ['ng', 'ङ'],
  ['ch', 'च'],
  ['jh', 'झ'],
  ['ny', 'ञ'],
  ['tth', 'ठ'],  // retroflex aspirated
  ['ddh', 'ढ'],  // retroflex aspirated
  ['tt', 'ट'],   // retroflex
  ['dd', 'ड'],   // retroflex
  ['nn', 'ण'],   // retroflex nasal
  ['th', 'थ'],
  ['dh', 'ध'],
  ['ph', 'फ'],
  ['bh', 'भ'],
  ['sh', 'श'],
  ['Sh', 'ष'],
  ['rr', 'ड़'],
  ['zh', 'ळ'],

  // Single-char consonants
  ['k', 'क'],
  ['K', 'ख'],
  ['g', 'ग'],
  ['G', 'घ'],
  ['c', 'च'],
  ['j', 'ज'],
  ['J', 'झ'],
  ['T', 'ट'],
  ['D', 'ड'],
  ['N', 'ण'],
  ['t', 'त'],
  ['d', 'द'],
  ['n', 'न'],
  ['p', 'प'],
  ['f', 'फ'],
  ['b', 'ब'],
  ['B', 'भ'],
  ['m', 'म'],
  ['y', 'य'],
  ['r', 'र'],
  ['l', 'ल'],
  ['L', 'ळ'],
  ['v', 'व'],
  ['w', 'व'],
  ['s', 'स'],
  ['S', 'श'],
  ['h', 'ह'],
  ['x', 'क्ष'],
  ['q', 'क़'],
  ['z', 'ज़'],
];

// ─── Vowel Map (standalone / word-initial) ────────────────────────────────────
const VOWEL_MAP: [string, string][] = [
  ['aa', 'आ'],
  ['ee', 'ई'],
  ['oo', 'ऊ'],
  ['ai', 'ऐ'],
  ['au', 'औ'],
  ['ri', 'ऋ'],
  ['ae', 'ऍ'],
  ['oe', 'ऑ'],
  ['a', 'अ'],
  ['A', 'आ'],
  ['i', 'इ'],
  ['I', 'ई'],
  ['u', 'उ'],
  ['U', 'ऊ'],
  ['e', 'ए'],
  ['o', 'ओ'],
  ['E', 'ऐ'],
  ['O', 'औ'],
];

// ─── Matra Map (after a consonant) ──────────────────────────────────────────
// Maps phonetic vowel suffixes to their matra Unicode codepoints.
// '' (empty) = inherent 'a' vowel — needs no matra written
const MATRA_MAP: [string, string][] = [
  ['aa', '\u093E'],  // ा
  ['ee', '\u0940'],  // ी
  ['oo', '\u0942'],  // ू
  ['ai', '\u0948'],  // ै
  ['au', '\u094C'],  // ौ
  ['ri', '\u0943'],  // ृ
  ['ae', '\u0945'],  // ॅ
  ['oe', '\u094B'],  // ो (approximate)
  ['A', '\u093E'],   // ा
  ['I', '\u0940'],   // ी
  ['U', '\u0942'],   // ू
  ['E', '\u0948'],   // ै
  ['O', '\u094C'],   // ौ
  ['a', ''],         // inherent 'a' — no matra
  ['i', '\u093F'],   // ि
  ['u', '\u0941'],   // ु
  ['e', '\u0947'],   // े
  ['o', '\u094B'],   // ो
];

// ─── Special suffixes ────────────────────────────────────────────────────────
// Vowels & Matras are matched in loops below

/**
 * Transliterate a single word from Hinglish phonetic Roman to Unicode Devanagari.
 * Handles consonants, vowels, matras, anusvara, visarga.
 */
function transliterateWord(word: string): string {
  if (!word) return '';
  // If already Devanagari, pass through
  if (/[\u0900-\u097F]/.test(word)) return word;

  let result = '';
  let i = 0;
  let prevWasConsonant = false;

  while (i < word.length) {
    let matched = false;

    // ─── Try matching anusvara (word-final nasal) ──────────────────────────
    // Check special cases for word-final nasals before next consonant
    if (word[i] === 'M' || word[i] === '~') {
      result += ANUSVARA;
      i++;
      prevWasConsonant = false;
      matched = true;
      continue;
    }
    if (word[i] === 'H' && i === word.length - 1) {
      result += VISARGA;
      i++;
      prevWasConsonant = false;
      matched = true;
      continue;
    }

    // ─── Try consonant match ──────────────────────────────────────────────
    for (const [pattern, devanagari] of CONSONANT_MAP) {
      if (word.startsWith(pattern, i)) {
        if (!prevWasConsonant) {
          if (prevWasConsonant === false) {
            // Starting fresh consonant — just write it
            result += devanagari;
            i += pattern.length;
            prevWasConsonant = true;
            matched = true;
            break;
          }
        } else {
          // Preceding consonant exists — this forms a conjunct
          // Add virama before this consonant
          result += VIRAMA + devanagari;
          i += pattern.length;
          prevWasConsonant = true;
          matched = true;
          break;
        }
      }
    }
    if (matched) continue;

    // ─── Try vowel / matra match ──────────────────────────────────────────
    if (prevWasConsonant) {
      // After a consonant: look for matra
      let matraMatched = false;
      for (const [pattern, matra] of MATRA_MAP) {
        if (word.startsWith(pattern, i)) {
          result += matra; // '' for inherent 'a' means nothing appended
          i += pattern.length;
          prevWasConsonant = false;
          matraMatched = true;
          break;
        }
      }
      if (matraMatched) continue;

      // No vowel found after consonant — inherent 'a' applies
      // Check next for another consonant (virama needed for halant/conjunct)
      if (i < word.length) {
        // If next characters are part of a known consonant pattern, add a virama
        let isNextConsonant = false;
        for (const [pattern] of CONSONANT_MAP) {
          if (word.startsWith(pattern, i)) {
            isNextConsonant = true;
            break;
          }
        }
        if (isNextConsonant) {
          result += VIRAMA;
          prevWasConsonant = false;
          // Don't advance i — let the consonant be processed next iteration
          continue;
        }
      }
      // Just move on
      prevWasConsonant = false;
    } else {
      // Not after consonant: standalone vowel
      let vowelMatched = false;
      for (const [pattern, vowel] of VOWEL_MAP) {
        if (word.startsWith(pattern, i)) {
          result += vowel;
          i += pattern.length;
          vowelMatched = true;
          break;
        }
      }
      if (!vowelMatched) {
        // Unknown character — pass through
        result += word[i];
        i++;
      }
    }
  }

  // If word ends with a consonant + no vowel, add virama (halant) for word-final
  // BUT in standard Hindi, word-final consonants often have implicit 'a' dropped
  // We do NOT add virama at word-end — inherent 'a' is assumed dropped phonetically
  // (standard convention: "Ram" → राम, not राम् )

  return result;
}

/**
 * Main entry point.
 * Transliterates a full Hinglish string to Unicode Devanagari.
 * Processes word-by-word, preserving spaces and punctuation.
 */
export function transliterateHinglish(input: string): string {
  if (!input) return '';

  // Split by word boundaries (spaces, punctuation, digits)
  // Keep delimiters in the array so we can reconstruct the string
  const tokens = input.split(/(\s+|[0-9]+|[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~।॥]+)/);

  return tokens
    .map((token) => {
      // Whitespace, punctuation, digits — pass through
      if (/^(\s+|[0-9]+|[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~।॥]+)$/.test(token)) {
        return token;
      }
      return transliterateWord(token);
    })
    .join('');
}

/**
 * Transliterate word-by-word up to the cursor (for live preview).
 * Completed words (followed by space/punctuation) are transliterated.
 * The last partial word (being typed) is transliterated as-is.
 */
export function transliteratePartial(input: string): string {
  return transliterateHinglish(input);
}
