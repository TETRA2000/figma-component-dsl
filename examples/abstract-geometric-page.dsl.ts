/**
 * Abstract Geometric — Bold shapes, primary colors, Bauhaus-inspired.
 *
 * DSL features stressed: ellipse + rectangle shapes, bold fills,
 * multiple geometric elements, counterAlign combinations.
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default frame('AbstractGeometricPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fafafa')],
  children: [
    frame('Hero', {
      autoLayout: horizontal({ spacing: 48, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Shapes
        frame('Shapes', {
          size: { x: 400, y: 400 },
          autoLayout: vertical({ spacing: 24, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          children: [
            ellipse('Circle', { size: { x: 120, y: 120 }, fills: [solid('#ff3d00')] }),
            rectangle('Square', { size: { x: 100, y: 100 }, fills: [solid('#2962ff')] }),
            rectangle('Line', { size: { x: 160, y: 8 }, fills: [solid('#ffd600')] }),
          ],
        }),
        // Right: Text
        frame('TextBlock', {
          size: { x: 600, y: undefined },
          autoLayout: vertical({ spacing: 24 }),
          children: [
            text('BAUHAUS', { fontSize: 14, fontWeight: 700, color: '#ff3d00', letterSpacing: { value: 6, unit: 'PIXELS' } }),
            text('Form Follows\nFunction', { fontSize: 64, fontWeight: 800, color: '#111111', lineHeight: { value: 100, unit: 'PERCENT' } }),
            text('Less is more. Architecture, art, and design converge in geometric harmony.', {
              fontSize: 18, fontWeight: 400, color: '#666666',
              lineHeight: { value: 160, unit: 'PERCENT' }, layoutSizingHorizontal: 'FILL',
            }),
            frame('CTA', {
              autoLayout: horizontal({ padX: 32, padY: 14 }),
              fills: [solid('#111111')],
              children: [
                text('EXPLORE', { fontSize: 14, fontWeight: 600, color: '#ffffff', letterSpacing: { value: 2, unit: 'PIXELS' } }),
              ],
            }),
          ],
        }),
      ],
    }),
    rectangle('Divider', { size: { x: 1, y: 4 }, fills: [solid('#111111')], layoutSizingHorizontal: 'FILL' }),
    frame('Grid', {
      autoLayout: horizontal({ spacing: 32, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('C1', {
          size: { x: 400, y: undefined }, autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
          fills: [solid('#ff3d00')],
          children: [
            text('POINT', { fontSize: 32, fontWeight: 800, color: '#ffffff' }),
            text('The fundamental element. Where everything begins.', { fontSize: 14, fontWeight: 400, color: '#ffffff', lineHeight: { value: 160, unit: 'PERCENT' }, layoutSizingHorizontal: 'FILL' }),
          ],
        }),
        frame('C2', {
          size: { x: 400, y: undefined }, autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
          fills: [solid('#2962ff')],
          children: [
            text('LINE', { fontSize: 32, fontWeight: 800, color: '#ffffff' }),
            text('Direction and movement. The path from A to B.', { fontSize: 14, fontWeight: 400, color: '#ffffff', lineHeight: { value: 160, unit: 'PERCENT' }, layoutSizingHorizontal: 'FILL' }),
          ],
        }),
        frame('C3', {
          size: { x: 400, y: undefined }, autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
          fills: [solid('#ffd600')],
          children: [
            text('PLANE', { fontSize: 32, fontWeight: 800, color: '#111111' }),
            text('Surface and area. Where form takes shape.', { fontSize: 14, fontWeight: 400, color: '#333333', lineHeight: { value: 160, unit: 'PERCENT' }, layoutSizingHorizontal: 'FILL' }),
          ],
        }),
      ],
    }),
  ],
});
