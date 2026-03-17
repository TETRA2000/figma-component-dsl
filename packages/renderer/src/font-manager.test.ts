import { describe, it, expect, beforeEach } from 'vitest';
import { resolveFontFamily, containsCJK, resetFontManager } from './font-manager.js';

beforeEach(() => {
  resetFontManager();
});

describe('containsCJK()', () => {
  it('returns true for Japanese text', () => {
    expect(containsCJK('こんにちは')).toBe(true);
    expect(containsCJK('漢字テスト')).toBe(true);
    expect(containsCJK('カタカナ')).toBe(true);
  });

  it('returns false for Latin-only text', () => {
    expect(containsCJK('Hello World')).toBe(false);
    expect(containsCJK('abc123')).toBe(false);
  });

  it('returns true for mixed text', () => {
    expect(containsCJK('Hello 世界')).toBe(true);
  });
});

describe('resolveFontFamily()', () => {
  it('returns Inter for Latin text with no explicit family', () => {
    expect(resolveFontFamily('Hello World')).toBe('Inter');
  });

  it('returns Noto Sans JP for CJK text', () => {
    expect(resolveFontFamily('こんにちは')).toBe('Noto Sans JP');
  });

  it('returns requested family when specified (non-Inter)', () => {
    expect(resolveFontFamily('Hello', 'Custom Font')).toBe('Custom Font');
  });

  it('returns Noto Sans JP for CJK text even when Inter is requested', () => {
    expect(resolveFontFamily('日本語', 'Inter')).toBe('Noto Sans JP');
  });

  it('returns requested family for CJK text when non-Inter family is specified', () => {
    expect(resolveFontFamily('日本語', 'Custom CJK')).toBe('Custom CJK');
  });
});
