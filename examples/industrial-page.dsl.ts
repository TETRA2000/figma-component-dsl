/**
 * Industrial — Raw materials, concrete feel, exposed grid, utility aesthetic.
 *
 * DSL features stressed: gray palette, thick strokes, zero cornerRadius,
 * SPACE_BETWEEN layouts, uppercase text, heavy dividers.
 */
import {
  frame, text, rectangle,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default frame('IndustrialPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#d4d0cb')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#2a2a2a')],
      children: [
        text('FOUNDRY', { fontSize: 14, fontWeight: 700, color: '#d4d0cb', letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('EST. 1987', { fontSize: 12, fontWeight: 400, color: '#888888' }),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 60, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('RAW', { fontSize: 120, fontWeight: 900, color: '#2a2a2a', lineHeight: { value: 90, unit: 'PERCENT' } }),
        text('MATERIALS', { fontSize: 120, fontWeight: 900, color: '#2a2a2a', lineHeight: { value: 90, unit: 'PERCENT' } }),
        rectangle('HeavyLine', { size: { x: 200, y: 6 }, fills: [solid('#c45e3a')] }),
        text('The beauty of unfinished surfaces and honest construction.', {
          fontSize: 18, fontWeight: 400, color: '#666666', lineHeight: { value: 160, unit: 'PERCENT' },
          size: { x: 500 }, textAutoResize: 'HEIGHT',
        }),
      ],
    }),
    rectangle('Divider', { size: { x: 1, y: 3 }, fills: [solid('#2a2a2a')], layoutSizingHorizontal: 'FILL' }),
    frame('Grid', {
      autoLayout: horizontal({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('G1', {
          size: { x: 480, y: undefined }, autoLayout: vertical({ spacing: 12, padX: 32, padY: 32 }),
          strokes: [{ color: hex('#2a2a2a'), weight: 1, align: 'INSIDE' }],
          children: [
            text('01', { fontSize: 48, fontWeight: 900, color: '#c45e3a' }),
            text('CONCRETE', { fontSize: 18, fontWeight: 700, color: '#2a2a2a', letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('Solid foundations for lasting structures.', { fontSize: 14, fontWeight: 400, color: '#888888', lineHeight: { value: 160, unit: 'PERCENT' }, layoutSizingHorizontal: 'FILL' }),
          ],
        }),
        frame('G2', {
          size: { x: 480, y: undefined }, autoLayout: vertical({ spacing: 12, padX: 32, padY: 32 }),
          strokes: [{ color: hex('#2a2a2a'), weight: 1, align: 'INSIDE' }],
          children: [
            text('02', { fontSize: 48, fontWeight: 900, color: '#c45e3a' }),
            text('STEEL', { fontSize: 18, fontWeight: 700, color: '#2a2a2a', letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('Tensile strength meets structural grace.', { fontSize: 14, fontWeight: 400, color: '#888888', lineHeight: { value: 160, unit: 'PERCENT' }, layoutSizingHorizontal: 'FILL' }),
          ],
        }),
        frame('G3', {
          size: { x: 480, y: undefined }, autoLayout: vertical({ spacing: 12, padX: 32, padY: 32 }),
          strokes: [{ color: hex('#2a2a2a'), weight: 1, align: 'INSIDE' }],
          children: [
            text('03', { fontSize: 48, fontWeight: 900, color: '#c45e3a' }),
            text('GLASS', { fontSize: 18, fontWeight: 700, color: '#2a2a2a', letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('Transparent barriers that frame the world.', { fontSize: 14, fontWeight: 400, color: '#888888', lineHeight: { value: 160, unit: 'PERCENT' }, layoutSizingHorizontal: 'FILL' }),
          ],
        }),
      ],
    }),
  ],
});
