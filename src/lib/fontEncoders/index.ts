/**
 * Font encoder registry — maps FontId to encoder functions.
 */
import type { FontId } from '../types/index';
import { unicodeToKrutiDev } from './krutiDev';
import { unicodeToDevLys } from './devLys';
import { unicodeToChanakya } from './chanakya';
import { unicodeToShusha } from './shusha';

export type EncoderFn = (unicode: string) => string;

export const ENCODERS: Record<FontId, EncoderFn> = {
  krutiDev: unicodeToKrutiDev,
  devLys: unicodeToDevLys,
  chanakya: unicodeToChanakya,
  shusha: unicodeToShusha,
};

export function encode(fontId: FontId, unicode: string): string {
  const fn = ENCODERS[fontId];
  if (!fn) return unicode;
  return fn(unicode);
}
