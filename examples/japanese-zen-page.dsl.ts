/**
 * Japanese Zen — Wabi-sabi aesthetics, muted tones, dramatic white space.
 *
 * DSL features stressed: generous padding, subtle text colors, thin lines,
 * extreme whitespace, textAlignHorizontal CENTER, delicate typography.
 */
import {
  frame, text, rectangle,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default frame('JapaneseZenPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#faf8f5')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 120, padY: 32, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('禅', { fontSize: 24, fontWeight: 400, color: '#2d2d2d' }),
        text('ZEN GARDEN', {
          fontSize: 11,
          fontWeight: 400,
          color: '#aaaaaa',
          letterSpacing: { value: 4, unit: 'PIXELS' },
        }),
      ],
    }),

    rectangle('Line', { size: { x: 1, y: 1 }, fills: [solid('#e8e4df')], layoutSizingHorizontal: 'FILL' }),

    // Hero — massive whitespace
    frame('Hero', {
      autoLayout: vertical({ spacing: 40, padX: 120, padY: 160, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('侘寂', {
          fontSize: 80,
          fontWeight: 300,
          color: '#2d2d2d',
          textAlignHorizontal: 'CENTER',
        }),
        rectangle('Brush', { size: { x: 40, y: 1 }, fills: [solid('#c8b8a4')] }),
        text('WABI-SABI', {
          fontSize: 14,
          fontWeight: 400,
          color: '#aaaaaa',
          letterSpacing: { value: 8, unit: 'PIXELS' },
          textAlignHorizontal: 'CENTER',
        }),
        text('Finding beauty in imperfection.\nEmbracing the transience of all things.', {
          fontSize: 16,
          fontWeight: 300,
          color: '#999999',
          lineHeight: { value: 180, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
          size: { x: 400 },
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),

    rectangle('Line2', { size: { x: 1, y: 1 }, fills: [solid('#e8e4df')], layoutSizingHorizontal: 'FILL' }),

    // Three principles
    frame('Principles', {
      autoLayout: horizontal({ spacing: 0, padX: 120, padY: 80, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('P1', {
          size: { x: 350, y: undefined },
          autoLayout: vertical({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            text('間', { fontSize: 40, fontWeight: 300, color: '#c8b8a4' }),
            text('MA', { fontSize: 12, fontWeight: 400, color: '#999999', letterSpacing: { value: 4, unit: 'PIXELS' } }),
            text('Negative space. The pause between notes that creates the music.', {
              fontSize: 14, fontWeight: 400, color: '#999999',
              lineHeight: { value: 170, unit: 'PERCENT' },
              textAlignHorizontal: 'CENTER',
              layoutSizingHorizontal: 'FILL',
            }),
          ],
        }),
        frame('P2', {
          size: { x: 350, y: undefined },
          autoLayout: vertical({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            text('渋', { fontSize: 40, fontWeight: 300, color: '#c8b8a4' }),
            text('SHIBUI', { fontSize: 12, fontWeight: 400, color: '#999999', letterSpacing: { value: 4, unit: 'PIXELS' } }),
            text('Understated elegance. Beauty that grows on the viewer.', {
              fontSize: 14, fontWeight: 400, color: '#999999',
              lineHeight: { value: 170, unit: 'PERCENT' },
              textAlignHorizontal: 'CENTER',
              layoutSizingHorizontal: 'FILL',
            }),
          ],
        }),
        frame('P3', {
          size: { x: 350, y: undefined },
          autoLayout: vertical({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            text('幽', { fontSize: 40, fontWeight: 300, color: '#c8b8a4' }),
            text('YUGEN', { fontSize: 12, fontWeight: 400, color: '#999999', letterSpacing: { value: 4, unit: 'PIXELS' } }),
            text('Profound grace. A deep awareness of the universe.', {
              fontSize: 14, fontWeight: 400, color: '#999999',
              lineHeight: { value: 170, unit: 'PERCENT' },
              textAlignHorizontal: 'CENTER',
              layoutSizingHorizontal: 'FILL',
            }),
          ],
        }),
      ],
    }),
  ],
});
