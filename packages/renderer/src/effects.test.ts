import { describe, it, expect } from 'vitest';
import { createCanvas } from '@napi-rs/canvas';
import { applyDropShadow, clearShadow, applyBlendMode, resetBlendMode, applyEffects } from './effects.js';
import type { DropShadowEffect, BlendMode } from '@figma-dsl/core';

describe('applyDropShadow()', () => {
  it('sets shadow properties on canvas context', () => {
    const canvas = createCanvas(100, 100);
    const ctx = canvas.getContext('2d');

    const effect: DropShadowEffect = {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.5 },
      offsetX: 2,
      offsetY: 4,
      blur: 8,
    };

    applyDropShadow(ctx, effect);
    expect(ctx.shadowBlur).toBe(8);
    expect(ctx.shadowOffsetX).toBe(2);
    expect(ctx.shadowOffsetY).toBe(4);
  });
});

describe('clearShadow()', () => {
  it('resets shadow properties', () => {
    const canvas = createCanvas(100, 100);
    const ctx = canvas.getContext('2d');

    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    clearShadow(ctx);
    expect(ctx.shadowBlur).toBe(0);
    expect(ctx.shadowOffsetX).toBe(0);
    expect(ctx.shadowOffsetY).toBe(0);
  });
});

describe('applyBlendMode()', () => {
  it('maps MULTIPLY to multiply', () => {
    const canvas = createCanvas(100, 100);
    const ctx = canvas.getContext('2d');

    applyBlendMode(ctx, 'MULTIPLY');
    expect(ctx.globalCompositeOperation).toBe('multiply');
  });

  it('maps SCREEN to screen', () => {
    const canvas = createCanvas(100, 100);
    const ctx = canvas.getContext('2d');

    applyBlendMode(ctx, 'SCREEN');
    expect(ctx.globalCompositeOperation).toBe('screen');
  });
});

describe('resetBlendMode()', () => {
  it('resets to source-over', () => {
    const canvas = createCanvas(100, 100);
    const ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'multiply';
    resetBlendMode(ctx);
    expect(ctx.globalCompositeOperation).toBe('source-over');
  });
});

describe('applyEffects()', () => {
  it('returns cleanup function that resets state', () => {
    const canvas = createCanvas(100, 100);
    const ctx = canvas.getContext('2d');

    const cleanup = applyEffects(ctx, [
      { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 1 }, offsetX: 1, offsetY: 1, blur: 5 },
    ], 'MULTIPLY');

    expect(ctx.shadowBlur).toBe(5);
    expect(ctx.globalCompositeOperation).toBe('multiply');

    cleanup();
    expect(ctx.shadowBlur).toBe(0);
    expect(ctx.globalCompositeOperation).toBe('source-over');
  });

  it('handles no effects gracefully', () => {
    const canvas = createCanvas(100, 100);
    const ctx = canvas.getContext('2d');

    const cleanup = applyEffects(ctx, undefined, undefined);
    expect(ctx.globalCompositeOperation).toBe('source-over');
    cleanup(); // Should not throw
  });

  it('handles NORMAL blend mode without changing composite operation', () => {
    const canvas = createCanvas(100, 100);
    const ctx = canvas.getContext('2d');

    const cleanup = applyEffects(ctx, [], 'NORMAL');
    expect(ctx.globalCompositeOperation).toBe('source-over');
    cleanup();
  });
});
