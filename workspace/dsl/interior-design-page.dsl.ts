/**
 * Interior Design Portfolio — Room showcases, style categories, and color palettes
 * DSL features: gradient room images, color swatch rectangles, two-column layout, FILL columns
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function roomCard(name: string, style: string, grad1: string, grad2: string) {
  return frame(`Room: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.91, b: 0.89, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('RoomImage', { size: { x: 1, y: 160 }, fills: [gradient([{ hex: grad1, position: 0 }, { hex: grad2, position: 1 }], 135)], cornerRadius: { topLeft: 14, topRight: 14, bottomLeft: 0, bottomRight: 0 }, layoutSizingHorizontal: 'FILL' }),
      frame('RoomInfo', {
        autoLayout: vertical({ spacing: 4, padX: 16, padY: 14 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 16, fontWeight: 600, color: '#1c1917' }),
          text(style, { fontSize: 12, fontWeight: 400, color: '#78716c' }),
        ],
      }),
    ],
  });
}

function stylePill(label: string, active: boolean) {
  return frame(`Style: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 7 }),
    fills: [solid(active ? '#292524' : '#fafaf9')],
    cornerRadius: 9999,
    strokes: active ? [] : [{ color: { r: 0.85, g: 0.83, b: 0.80, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [text(label, { fontSize: 12, fontWeight: 600, color: active ? '#ffffff' : '#57534e' })],
  });
}

function colorPalette(name: string, colors: string[]) {
  return frame(`Palette: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.91, b: 0.89, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(name, { fontSize: 14, fontWeight: 600, color: '#1c1917' }),
      frame('Swatches', { autoLayout: horizontal({ spacing: 6 }), layoutSizingHorizontal: 'FILL', children: colors.map((c, i) =>
        rectangle(`Swatch${i}`, { size: { x: 40, y: 40 }, fills: [solid(c)], cornerRadius: 8 })
      ) }),
    ],
  });
}

export default frame('InteriorDesignPage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fafaf9')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 48, padY: 36, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#292524', position: 0 }, { hex: '#57534e', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Atelier Studio', { fontSize: 30, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        text('Curated interiors for modern living', { fontSize: 14, fontWeight: 400, color: '#d6d3d1', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 48, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Styles', { autoLayout: horizontal({ spacing: 8 }), children: [
          stylePill('All', true), stylePill('Minimalist', false), stylePill('Scandinavian', false),
          stylePill('Industrial', false), stylePill('Mid-Century', false), stylePill('Japandi', false),
        ] }),
        frame('RoomGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('Col1', { autoLayout: vertical({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
              roomCard('Living Room Retreat', 'Scandinavian Minimal', '#d6d3d1', '#a8a29e'),
              roomCard('Cozy Bedroom', 'Japandi Warmth', '#78716c', '#57534e'),
            ] }),
            frame('Col2', { autoLayout: vertical({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
              roomCard('Modern Kitchen', 'Industrial Chic', '#44403c', '#292524'),
              roomCard('Home Office', 'Mid-Century Modern', '#92400e', '#b45309'),
            ] }),
          ],
        }),
        frame('Palettes', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Color Palettes', { fontSize: 20, fontWeight: 700, color: '#1c1917' }),
            frame('PaletteGrid', { autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
              colorPalette('Nordic Frost', ['#f5f5f4', '#d6d3d1', '#78716c', '#292524', '#0c4a6e']),
              colorPalette('Desert Sage', ['#fef3c7', '#d6d3d1', '#a16207', '#57534e', '#365314']),
              colorPalette('Urban Slate', ['#f1f5f9', '#94a3b8', '#475569', '#1e293b', '#0f172a']),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
