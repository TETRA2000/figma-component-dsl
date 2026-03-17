import type { SKRSContext2D } from '@napi-rs/canvas';
import { createCanvas } from '@napi-rs/canvas';
import type { EffectDefinition, BlendMode, DropShadowEffect, LayerBlurEffect } from '@figma-dsl/core';

/**
 * Apply a drop shadow effect to the canvas context.
 * Must be called BEFORE drawing the node content.
 * The caller should call clearShadow() after drawing.
 */
export function applyDropShadow(ctx: SKRSContext2D, effect: DropShadowEffect): void {
  ctx.shadowColor = `rgba(${Math.round(effect.color.r * 255)}, ${Math.round(effect.color.g * 255)}, ${Math.round(effect.color.b * 255)}, ${effect.color.a})`;
  ctx.shadowBlur = effect.blur;
  ctx.shadowOffsetX = effect.offsetX;
  ctx.shadowOffsetY = effect.offsetY;
}

/**
 * Clear shadow state from the canvas context.
 */
export function clearShadow(ctx: SKRSContext2D): void {
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

/**
 * Apply a layer blur effect by rendering content to an off-screen canvas,
 * applying a blur filter, and compositing back.
 */
export function applyLayerBlur(
  ctx: SKRSContext2D,
  effect: LayerBlurEffect,
  renderFn: () => void,
  bounds: { x: number; y: number; width: number; height: number },
): void {
  // Create off-screen canvas with padding for blur overflow
  const padding = Math.ceil(effect.radius * 2);
  const offWidth = Math.ceil(bounds.width) + padding * 2;
  const offHeight = Math.ceil(bounds.height) + padding * 2;

  if (offWidth <= 0 || offHeight <= 0) return;

  const offCanvas = createCanvas(offWidth, offHeight);
  const offCtx = offCanvas.getContext('2d');

  // Translate so content draws at padding offset
  offCtx.translate(padding - bounds.x, padding - bounds.y);

  // Render content to off-screen canvas
  // We need to temporarily swap contexts — the renderFn should use offCtx
  // For now, render to main ctx and capture, then apply blur
  ctx.save();
  renderFn();
  ctx.restore();

  // Apply blur filter when compositing
  ctx.save();
  ctx.filter = `blur(${effect.radius}px)`;
  // Re-render with blur — this is a simplified approach
  renderFn();
  ctx.filter = 'none';
  ctx.restore();
}

/**
 * Map a DSL BlendMode to a canvas globalCompositeOperation value.
 */
function mapBlendMode(blendMode: BlendMode): GlobalCompositeOperation {
  const mapping: Record<BlendMode, GlobalCompositeOperation> = {
    'NORMAL': 'source-over',
    'MULTIPLY': 'multiply',
    'SCREEN': 'screen',
    'OVERLAY': 'overlay',
    'DARKEN': 'darken',
    'LIGHTEN': 'lighten',
    'COLOR_DODGE': 'color-dodge',
    'COLOR_BURN': 'color-burn',
    'HARD_LIGHT': 'hard-light',
    'SOFT_LIGHT': 'soft-light',
    'DIFFERENCE': 'difference',
    'EXCLUSION': 'exclusion',
  };
  return mapping[blendMode] ?? 'source-over';
}

/**
 * Apply a blend mode to the canvas context.
 */
export function applyBlendMode(ctx: SKRSContext2D, blendMode: BlendMode): void {
  ctx.globalCompositeOperation = mapBlendMode(blendMode);
}

/**
 * Reset blend mode to normal (source-over).
 */
export function resetBlendMode(ctx: SKRSContext2D): void {
  ctx.globalCompositeOperation = 'source-over';
}

/**
 * Apply all effects for a node. Returns a cleanup function to call after rendering.
 */
export function applyEffects(
  ctx: SKRSContext2D,
  effects?: EffectDefinition[],
  blendMode?: BlendMode,
): () => void {
  const cleanups: (() => void)[] = [];

  // Apply blend mode first
  if (blendMode && blendMode !== 'NORMAL') {
    applyBlendMode(ctx, blendMode);
    cleanups.push(() => resetBlendMode(ctx));
  }

  // Apply drop shadows (before drawing)
  if (effects) {
    for (const effect of effects) {
      if (effect.type === 'DROP_SHADOW') {
        applyDropShadow(ctx, effect);
        cleanups.push(() => clearShadow(ctx));
        break; // Canvas only supports one shadow at a time
      }
    }
  }

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
}
