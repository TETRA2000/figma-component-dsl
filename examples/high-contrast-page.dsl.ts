/**
 * High Contrast — Pure black and white, stark edges, maximum readability.
 *
 * DSL features stressed: pure #000000/#ffffff fills, thick strokes,
 * textDecoration UNDERLINE, high fontWeight contrast.
 */
import {
  frame, text, rectangle,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default frame('HighContrastPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#000000')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('CONTRAST', { fontSize: 16, fontWeight: 900, color: '#000000', letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('MENU', { fontSize: 14, fontWeight: 400, color: '#000000', textDecoration: 'UNDERLINE' }),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 120, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('BLACK', { fontSize: 120, fontWeight: 900, color: '#ffffff', lineHeight: { value: 90, unit: 'PERCENT' } }),
        text('AND', { fontSize: 120, fontWeight: 100, color: '#444444', lineHeight: { value: 90, unit: 'PERCENT' } }),
        text('WHITE', { fontSize: 120, fontWeight: 900, color: '#ffffff', lineHeight: { value: 90, unit: 'PERCENT' } }),
        rectangle('Line', { size: { x: 200, y: 4 }, fills: [solid('#ffffff')] }),
        text('No gray areas. Maximum impact.', { fontSize: 18, fontWeight: 400, color: '#888888' }),
      ],
    }),
    frame('Stats', {
      autoLayout: horizontal({ spacing: 0, padX: 0, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('S1', {
          size: { x: 480, y: undefined }, autoLayout: vertical({ spacing: 8, padX: 40, padY: 40 }),
          fills: [solid('#ffffff')],
          children: [
            text('100%', { fontSize: 48, fontWeight: 900, color: '#000000' }),
            text('Contrast Ratio', { fontSize: 14, fontWeight: 400, color: '#666666' }),
          ],
        }),
        frame('S2', {
          size: { x: 480, y: undefined }, autoLayout: vertical({ spacing: 8, padX: 40, padY: 40 }),
          strokes: [{ color: hex('#ffffff'), weight: 1, align: 'INSIDE' }],
          children: [
            text('∞', { fontSize: 48, fontWeight: 100, color: '#ffffff' }),
            text('Readability', { fontSize: 14, fontWeight: 400, color: '#888888' }),
          ],
        }),
        frame('S3', {
          size: { x: 480, y: undefined }, autoLayout: vertical({ spacing: 8, padX: 40, padY: 40 }),
          fills: [solid('#ffffff')],
          children: [
            text('2', { fontSize: 48, fontWeight: 900, color: '#000000' }),
            text('Colors Only', { fontSize: 14, fontWeight: 400, color: '#666666' }),
          ],
        }),
      ],
    }),
  ],
});
