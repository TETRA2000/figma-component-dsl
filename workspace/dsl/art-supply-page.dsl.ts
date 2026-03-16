/**
 * Art Supplies — Product grid, color swatches, and brand filters
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function productCard(name: string, price: string, brand: string, rating: string, color: string) {
  return frame(`Product: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 14, padY: 14 }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('ProductImg', { size: { x: 200, y: 120 }, fills: [solid('#f8fafc')], cornerRadius: 6, layoutSizingHorizontal: 'FILL' }),
      text(brand, { fontSize: 10, fontWeight: 600, color: '#94a3b8' }),
      text(name, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
      frame('PriceRow', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        text(price, { fontSize: 16, fontWeight: 700, color }),
        text(`★ ${rating}`, { fontSize: 12, fontWeight: 600, color: '#f59e0b' }),
      ] }),
    ],
  });
}

function colorSwatch(name: string, hex: string) {
  return frame(`Swatch: ${name}`, {
    autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
    children: [
      ellipse('Color', { size: { x: 32, y: 32 }, fills: [solid(hex)] }),
      text(name, { fontSize: 9, fontWeight: 500, color: '#64748b', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function brandPill(name: string, active: boolean) {
  return frame(`Brand: ${name}`, {
    autoLayout: horizontal({ padX: 14, padY: 6 }),
    fills: [solid(active ? '#7c3aed' : '#f5f3ff')],
    cornerRadius: 9999,
    children: [text(name, { fontSize: 12, fontWeight: 600, color: active ? '#ffffff' : '#7c3aed' })],
  });
}

export default frame('ArtSupplyPage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#faf8ff')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 48, padY: 18 }),
      fills: [gradient([{ hex: '#4c1d95', position: 0 }, { hex: '#7c3aed', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Palette Studio Supply', { fontSize: 22, fontWeight: 800, color: '#ffffff' }),
        frame('CartBtn', { autoLayout: horizontal({ padX: 14, padY: 6 }), fills: [solid('#ffffff1a')], cornerRadius: 9999, children: [text('Cart (5)', { fontSize: 13, fontWeight: 600, color: '#ffffff' })] }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 48, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Brands', { autoLayout: horizontal({ spacing: 8 }), children: [
          brandPill('All', false), brandPill('Winsor & Newton', true), brandPill('Prismacolor', false),
          brandPill('Faber-Castell', false), brandPill('Liquitex', false), brandPill('Copic', false),
        ] }),
        frame('ProductGrid', {
          autoLayout: horizontal({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            productCard('Watercolor Set 24pc', '$48.99', 'Winsor & Newton', '4.9', '#2563eb'),
            productCard('Colored Pencils 72pc', '$39.99', 'Prismacolor', '4.8', '#059669'),
            productCard('Acrylic Paint Set', '$54.99', 'Liquitex', '4.7', '#dc2626'),
            productCard('Sketch Markers 36pc', '$89.99', 'Copic', '4.9', '#7c3aed'),
          ],
        }),
        frame('Swatches', {
          autoLayout: vertical({ spacing: 12, padX: 18, padY: 18 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Trending Colors — Spring 2026', { fontSize: 16, fontWeight: 700, color: '#1e293b' }),
            frame('SwatchRow', { autoLayout: horizontal({ spacing: 16 }), children: [
              colorSwatch('Coral', '#ff6b6b'), colorSwatch('Sage', '#9dc88d'),
              colorSwatch('Ochre', '#d4a047'), colorSwatch('Slate', '#708090'),
              colorSwatch('Periwinkle', '#8b9dc3'), colorSwatch('Terracotta', '#c86c4a'),
              colorSwatch('Ivory', '#f5f0e1'), colorSwatch('Teal', '#2a9d8f'),
              colorSwatch('Blush', '#e8a0bf'), colorSwatch('Indigo', '#3d405b'),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
