import { describe, it, expect, vi, beforeEach } from 'vitest';
import { resolveDslFile, toKebabCase } from './dsl-association';
import * as fs from 'fs';

vi.mock('fs');

describe('toKebabCase', () => {
  it('converts single word', () => {
    expect(toKebabCase('Button')).toBe('button');
  });

  it('converts multi-word PascalCase', () => {
    expect(toKebabCase('PricingCard')).toBe('pricing-card');
  });

  it('handles consecutive capitals (acronyms)', () => {
    expect(toKebabCase('CTABanner')).toBe('cta-banner');
  });

  it('handles already lowercase', () => {
    expect(toKebabCase('badge')).toBe('badge');
  });

  it('handles multi-segment PascalCase', () => {
    expect(toKebabCase('FeatureGrid')).toBe('feature-grid');
  });
});

describe('resolveDslFile', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns matching DSL file by naming convention', () => {
    vi.spyOn(fs, 'readdirSync').mockReturnValue([
      'button.dsl.ts',
      'card.dsl.ts',
    ] as unknown as ReturnType<typeof fs.readdirSync>);

    const result = resolveDslFile('Button', { dslDir: 'examples/', overrides: {} });
    expect(result).toBe('examples/button.dsl.ts');
  });

  it('returns matching DSL file with suffix pattern', () => {
    vi.spyOn(fs, 'readdirSync').mockReturnValue([
      'badge-variants.dsl.ts',
    ] as unknown as ReturnType<typeof fs.readdirSync>);

    const result = resolveDslFile('Badge', { dslDir: 'examples/', overrides: {} });
    expect(result).toBe('examples/badge-variants.dsl.ts');
  });

  it('returns null when no DSL file matches', () => {
    vi.spyOn(fs, 'readdirSync').mockReturnValue([
      'button.dsl.ts',
    ] as unknown as ReturnType<typeof fs.readdirSync>);

    const result = resolveDslFile('Hero', { dslDir: 'examples/', overrides: {} });
    expect(result).toBeNull();
  });

  it('uses manual override when provided', () => {
    vi.spyOn(fs, 'readdirSync').mockReturnValue([
      'button.dsl.ts',
    ] as unknown as ReturnType<typeof fs.readdirSync>);

    const result = resolveDslFile('Hero', {
      dslDir: 'examples/',
      overrides: { Hero: 'custom/hero-custom.dsl.ts' },
    });
    expect(result).toBe('custom/hero-custom.dsl.ts');
  });

  it('override takes precedence over naming convention', () => {
    vi.spyOn(fs, 'readdirSync').mockReturnValue([
      'button.dsl.ts',
    ] as unknown as ReturnType<typeof fs.readdirSync>);

    const result = resolveDslFile('Button', {
      dslDir: 'examples/',
      overrides: { Button: 'overrides/button-v2.dsl.ts' },
    });
    expect(result).toBe('overrides/button-v2.dsl.ts');
  });

  it('handles multi-word component names', () => {
    vi.spyOn(fs, 'readdirSync').mockReturnValue([
      'pricing-card.dsl.ts',
    ] as unknown as ReturnType<typeof fs.readdirSync>);

    const result = resolveDslFile('PricingCard', { dslDir: 'examples/', overrides: {} });
    expect(result).toBe('examples/pricing-card.dsl.ts');
  });

  it('normalizes dslDir trailing slash', () => {
    vi.spyOn(fs, 'readdirSync').mockReturnValue([
      'button.dsl.ts',
    ] as unknown as ReturnType<typeof fs.readdirSync>);

    const result = resolveDslFile('Button', { dslDir: 'examples', overrides: {} });
    expect(result).toBe('examples/button.dsl.ts');
  });
});
