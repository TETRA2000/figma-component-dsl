/**
 * Florist Shop — Bouquet gallery, occasion categories, and delivery scheduler
 * DSL features: soft pink/green palette, gradient flower images, category pills, price cards
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function bouquetCard(name: string, price: string, desc: string, grad1: string, grad2: string) {
  return frame(`Bouquet: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.88, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('FlowerImage', { size: { x: 1, y: 140 }, fills: [gradient([{ hex: grad1, position: 0 }, { hex: grad2, position: 1 }], 135)], cornerRadius: { topLeft: 14, topRight: 14, bottomLeft: 0, bottomRight: 0 }, layoutSizingHorizontal: 'FILL' }),
      frame('BouquetInfo', {
        autoLayout: vertical({ spacing: 6, padX: 14, padY: 12 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 15, fontWeight: 600, color: '#4a1942' }),
          text(desc, { fontSize: 11, fontWeight: 400, color: '#9d7a91' }),
          frame('PriceTag', { autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }), fills: [solid('#fce7f3')], cornerRadius: 8, children: [
            text(price, { fontSize: 14, fontWeight: 700, color: '#be185d' }),
          ] }),
        ],
      }),
    ],
  });
}

function occasionPill(label: string, active: boolean) {
  return frame(`Occ: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 7 }),
    fills: [solid(active ? '#be185d' : '#fdf2f8')],
    cornerRadius: 9999,
    strokes: active ? [] : [{ color: { r: 0.95, g: 0.85, b: 0.90, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [text(label, { fontSize: 12, fontWeight: 600, color: active ? '#ffffff' : '#9d174d' })],
  });
}

function deliverySlot(date: string, time: string, available: boolean) {
  return frame(`Slot: ${date}`, {
    autoLayout: vertical({ spacing: 4, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    fills: [solid(available ? '#ecfdf5' : '#fdf2f8')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    strokes: available ? [{ color: { r: 0.60, g: 0.90, b: 0.72, a: 1 }, weight: 1, align: 'INSIDE' as const }] : [],
    children: [
      text(date, { fontSize: 13, fontWeight: 600, color: available ? '#059669' : '#9d7a91' }),
      text(time, { fontSize: 11, fontWeight: 400, color: available ? '#6ee7b7' : '#d4a8c4' }),
    ],
  });
}

export default frame('FloristPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fdf2f8')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 8, padX: 48, padY: 36, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#9d174d', position: 0 }, { hex: '#be185d', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Petal & Bloom', { fontSize: 30, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        text('Handcrafted bouquets for every moment', { fontSize: 14, fontWeight: 400, color: '#fbcfe8', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 44, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Occasions', { autoLayout: horizontal({ spacing: 8 }), children: [
          occasionPill('All', true), occasionPill('Birthday', false), occasionPill('Anniversary', false),
          occasionPill('Sympathy', false), occasionPill('Thank You', false), occasionPill('Wedding', false),
        ] }),
        frame('BouquetGrid', {
          autoLayout: horizontal({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            bouquetCard('Rose Romance', '$65', 'Red roses, baby breath, eucalyptus', '#be185d', '#ec4899'),
            bouquetCard('Garden Bliss', '$55', 'Mixed wildflowers, lavender, fern', '#059669', '#34d399'),
            bouquetCard('Sunset Peony', '$75', 'Peonies, ranunculus, dusty miller', '#f59e0b', '#fbbf24'),
          ],
        }),
        frame('MoreBouquets', {
          autoLayout: horizontal({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            bouquetCard('Pastel Dream', '$60', 'Soft pink tulips, white lilies', '#ec4899', '#f9a8d4'),
            bouquetCard('Tropical Sun', '$70', 'Birds of paradise, orchids, monstera', '#ea580c', '#f97316'),
            bouquetCard('Winter White', '$80', 'White roses, hydrangea, silver dollar', '#64748b', '#94a3b8'),
          ],
        }),
        frame('Delivery', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Schedule Delivery', { fontSize: 18, fontWeight: 700, color: '#4a1942' }),
            frame('SlotGrid', { autoLayout: horizontal({ spacing: 10 }), layoutSizingHorizontal: 'FILL', children: [
              deliverySlot('Mar 17', '9 AM - 12 PM', true),
              deliverySlot('Mar 17', '2 PM - 5 PM', false),
              deliverySlot('Mar 18', '9 AM - 12 PM', true),
              deliverySlot('Mar 18', '2 PM - 5 PM', true),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
