/**
 * Florist Shop — Bouquet cards, occasion filters, and delivery info
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function bouquetCard(name: string, price: string, flowers: string, color: string) {
  return frame(`Bouquet: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 14, padY: 14 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.94, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('BouquetImg', { size: { x: 200, y: 140 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#fecdd3', position: 1 }], 135)], cornerRadius: 8, layoutSizingHorizontal: 'FILL' }),
      text(name, { fontSize: 15, fontWeight: 600, color: '#1c1917' }),
      text(flowers, { fontSize: 11, fontWeight: 400, color: '#78716c' }),
      frame('PriceRow', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        text(price, { fontSize: 18, fontWeight: 700, color: '#e11d48' }),
        frame('AddBtn', { autoLayout: horizontal({ padX: 12, padY: 4 }), fills: [solid('#e11d48')], cornerRadius: 8, children: [
          text('Add', { fontSize: 11, fontWeight: 600, color: '#ffffff' }),
        ] }),
      ] }),
    ],
  });
}

function occasionPill(label: string, active: boolean) {
  return frame(`Occ: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 6 }),
    fills: [solid(active ? '#e11d48' : '#fff1f2')],
    cornerRadius: 9999,
    children: [text(label, { fontSize: 12, fontWeight: 600, color: active ? '#ffffff' : '#be123c' })],
  });
}

function deliveryRow(label: string, value: string) {
  return frame(`Del: ${label}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', padX: 12, padY: 8 }),
    fills: [solid('#fff1f2')],
    cornerRadius: 6,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#78716c' }),
      text(value, { fontSize: 12, fontWeight: 600, color: '#1c1917' }),
    ],
  });
}

export default frame('FloristPage', {
  size: { x: 900 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fff1f2')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 4, padX: 36, padY: 28 }),
      fills: [gradient([{ hex: '#881337', position: 0 }, { hex: '#e11d48', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Bloom & Petal', { fontSize: 26, fontWeight: 800, color: '#ffffff' }),
        text('Handcrafted bouquets for every occasion', { fontSize: 13, fontWeight: 400, color: '#fecdd3' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 36, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Occasions', { autoLayout: horizontal({ spacing: 8 }), children: [
          occasionPill('All', false), occasionPill('Birthday', true), occasionPill('Anniversary', false),
          occasionPill('Sympathy', false), occasionPill('Wedding', false), occasionPill('Just Because', false),
        ] }),
        frame('BouquetGrid', {
          autoLayout: horizontal({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            bouquetCard('Sunset Romance', '$65', 'Roses, lilies, baby breath', '#e11d48'),
            bouquetCard('Garden Bliss', '$48', 'Daisies, sunflowers, eucalyptus', '#16a34a'),
            bouquetCard('Royal Elegance', '$85', 'Orchids, hydrangeas, peonies', '#7c3aed'),
            bouquetCard('Spring Joy', '$55', 'Tulips, ranunculus, freesia', '#f59e0b'),
          ],
        }),
        frame('Delivery', {
          autoLayout: vertical({ spacing: 8, padX: 18, padY: 18 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Delivery Information', { fontSize: 16, fontWeight: 700, color: '#1c1917' }),
            deliveryRow('Same-day delivery', 'Order by 2 PM'),
            deliveryRow('Next-day delivery', 'Free for orders $50+'),
            deliveryRow('Delivery area', 'Within 15 miles'),
            deliveryRow('Gift message', 'Included with every order'),
          ],
        }),
      ],
    }),
  ],
});
