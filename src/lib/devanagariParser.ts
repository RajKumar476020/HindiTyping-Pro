/**
 * Hindilekh — Stage 1: Unicode Devanagari Parser
 *
 * Walks a Unicode Devanagari string and produces a SyllableToken[] stream
 * that is font-agnostic. Stage 2 encoders consume this stream.
 */
import type { SyllableToken } from './types/index';

// ─── Unicode ranges / codepoints ────────────────────────────────────────────
const VIRAMA      = '\u094D'; // ् (halant)
const REPH_CONS   = '\u0930'; // र
const NUKTA       = '\u093C'; // ़
const ANUSVARA    = '\u0902'; // ं
const CHANDRABINDU= '\u0901'; // ँ
const VISARGA     = '\u0903'; // ः
const AVAGRAHA    = '\u093D'; // ऽ

// Devanagari consonants range
function isConsonant(ch: string): boolean {
  const cp = ch.codePointAt(0)!;
  // क-ह: 0x0915–0x0939, plus क़-य़: 0x0958–0x095F, ड़: 0x095C, ढ़: 0x095D
  return (cp >= 0x0915 && cp <= 0x0939) || (cp >= 0x0958 && cp <= 0x095F);
}

// Independent vowels (word-initial or standalone)
function isIndependentVowel(ch: string): boolean {
  const cp = ch.codePointAt(0)!;
  return cp >= 0x0904 && cp <= 0x0914; // अ–औ + ऄ
}

// Dependent vowel signs (matras)
function isMatra(ch: string): boolean {
  const cp = ch.codePointAt(0)!;
  // ा–ौ: 0x093E–0x094C, also ॅ 0x0945, ॆ 0x0946, ॉ 0x094A
  return (cp >= 0x093E && cp <= 0x094C) || cp === 0x093F || cp === 0x0945 || cp === 0x094A;
}

function isAnusvaraOrSimilar(ch: string): boolean {
  return ch === ANUSVARA || ch === CHANDRABINDU || ch === VISARGA;
}

function isDevanagari(ch: string): boolean {
  const cp = ch.codePointAt(0)!;
  return cp >= 0x0900 && cp <= 0x097F;
}

/**
 * Parse a Unicode Devanagari string into a token stream.
 * Handles: consonant clusters (conjuncts via virama), matras,
 * reph (र् before cluster), nukta, anusvara/visarga, standalone vowels,
 * and pass-through characters (Latin, digits, punctuation, spaces).
 */
export function parseDevanagari(input: string): SyllableToken[] {
  const tokens: SyllableToken[] = [];
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    // ── Pass-through: non-Devanagari characters ───────────────────────────
    if (!isDevanagari(ch)) {
      tokens.push({ type: 'passthrough', char: ch });
      i++;
      continue;
    }

    // ── Avagraha ─────────────────────────────────────────────────────────
    if (ch === AVAGRAHA) {
      tokens.push({ type: 'passthrough', char: ch });
      i++;
      continue;
    }

    // ── Standalone anusvara/visarga (edge case: at word start) ───────────
    if (isAnusvaraOrSimilar(ch) && !isConsonant(ch)) {
      tokens.push({ type: 'passthrough', char: ch });
      i++;
      continue;
    }

    // ── Independent vowel (word-initial) ──────────────────────────────────
    if (isIndependentVowel(ch)) {
      let vowel = ch;
      i++;
      // May be followed by anusvara/visarga
      let anusvara: string | null = null;
      if (i < input.length && isAnusvaraOrSimilar(input[i])) {
        anusvara = input[i];
        i++;
      }
      // Combine into a vowel token (pass through — encoders handle vowel maps)
      tokens.push({ type: 'vowel', char: vowel + (anusvara ?? '') });
      continue;
    }

    // ── Consonant (start of a syllable) ───────────────────────────────────
    if (isConsonant(ch)) {
      // Detect reph: र + virama immediately before this consonant cluster?
      // Reph in Devanagari Unicode is encoded as:
      //   [previous consonant] + virama + र... No — reph is र + virama + consonant
      //   The VISUAL reph appears ABOVE the consonant that follows र्
      //   In Unicode: र (0x0930) + ् (094D) + [next consonant]
      //   We need to look back: was the previous consumed token र् (reph)?
      // We handle reph detection differently: when we see र followed by virama,
      // we mark hasReph=true on the NEXT syllable token and don't emit a
      // separate syllable for the reph consonant.

      // Look-back: check if tokens[-1] was a reph marker
      // Actually: in the forward scan, when we encounter र, we peek ahead.
      // If र is followed by virama and then another consonant, it's a reph prefix.
      let hasReph = false;
      if (ch === REPH_CONS && i + 1 < input.length && input[i + 1] === VIRAMA
        && i + 2 < input.length && isConsonant(input[i + 2])) {
        // This र् is a reph — consume it, mark flag, continue to main consonant
        hasReph = true;
        i += 2; // skip र ्
      }

      // Now collect the consonant cluster (conjunct)
      const baseConsonants: string[] = [];
      let hasNukta = false;
      let isHalant = false;

      while (i < input.length && isConsonant(input[i])) {
        let cons = input[i];
        i++;
        // Nukta?
        if (i < input.length && input[i] === NUKTA) {
          hasNukta = true;
          cons += NUKTA; // attach nukta to consonant for encoder lookup
          i++;
        }
        baseConsonants.push(cons);

        // Virama after consonant?
        if (i < input.length && input[i] === VIRAMA) {
          i++; // consume virama
          // Is next char another consonant? → conjunct continues
          if (i < input.length && isConsonant(input[i])) {
            // Continue loop to add next consonant
            continue;
          } else {
            // Virama at end / before non-consonant → halant (explicit half-form)
            isHalant = true;
            break;
          }
        } else {
          // No virama — end of consonant cluster
          break;
        }
      }

      // Matra?
      let matra: string | null = null;
      if (!isHalant && i < input.length && isMatra(input[i])) {
        matra = input[i];
        i++;
      }

      // Anusvara / visarga / chandrabindu after matra?
      let anusvara: string | null = null;
      if (i < input.length && isAnusvaraOrSimilar(input[i])) {
        anusvara = input[i];
        i++;
      }

      tokens.push({
        type: 'syllable',
        baseConsonants,
        matra,
        hasReph,
        hasNukta,
        anusvara,
        isHalant,
      });
      continue;
    }

    // ── Devanagari digits ─────────────────────────────────────────────────
    if (ch.codePointAt(0)! >= 0x0966 && ch.codePointAt(0)! <= 0x096F) {
      tokens.push({ type: 'passthrough', char: ch });
      i++;
      continue;
    }

    // ── Fallback: any other Devanagari character ──────────────────────────
    tokens.push({ type: 'passthrough', char: ch });
    i++;
  }

  return tokens;
}
