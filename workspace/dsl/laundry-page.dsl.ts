/**
 * Laundry Service — Pricing tiers, order tracker, and locations
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function pricingTier(name: string, price: string, includes: string[], color: string) {
  return frame(`Tier: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(name, { fontSize: 16, fontWeight: 700, color: '#1e293b' }),
      text(price, { fontSize: 22, fontWeight: 800, color }),
      ...includes.map(i => text(`✓ ${i}`, { fontSize: 12, fontWeight: 400, color: '#475569' })),
    ],
  });
}

function trackerStep(label: string, done: boolean, active: boolean) {
  return frame(`Step: ${label}`, {
    autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
    children: [
      ellipse('Dot', { size: { x: 16, y: 16 }, fills: [solid(done ? '#2563eb' : active ? '#93c5fd' : '#e2e8f0')] }),
      text(label, { fontSize: 10, fontWeight: done || active ? 600 : 400, color: done ? '#2563eb' : '#94a3b8' }),
    ],
  });
}

function locationItem(name: string, address: string, hours: string) {
  return frame(`Location: ${name}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 12, padY: 10 }),
    fills: [solid('#f8fafc')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('LocInfo', { autoLayout: vertical({ spacing: 2 }), children: [
        text(name, { fontSize: 13, fontWeight: 600, color: '#1e293b' }),
        text(address, { fontSize: 11, fontWeight: 400, color: '#64748b' }),
      ] }),
      text(hours, { fontSize: 11, fontWeight: 500, color: '#2563eb' }),
    ],
  });
}

export default frame('LaundryPage', {
  size: { x: 700 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#eff6ff')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 4, padX: 28, padY: 24 }),
      fills: [gradient([{ hex: '#1e3a5f', position: 0 }, { hex: '#2563eb', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('FreshFold Laundry', { fontSize: 22, fontWeight: 800, color: '#ffffff' }),
        text('Wash, fold, repeat — we handle the hard part', { fontSize: 13, fontWeight: 400, color: '#93c5fd' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 20, padX: 28, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Pricing', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Pricing', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            frame('TierGrid', { autoLayout: horizontal({ spacing: 10 }), layoutSizingHorizontal: 'FILL', children: [
              pricingTier('Wash & Fold', '$1.75/lb', ['Same-day service', 'Sorted by color', 'Eco detergent'], '#2563eb'),
              pricingTier('Dry Clean', '$6.99/item', ['Professional press', '48-hr turnaround', 'Stain treatment'], '#7c3aed'),
              pricingTier('Express', '$2.50/lb', ['3-hour turnaround', 'Priority handling', 'Free delivery'], '#059669'),
            ] }),
          ],
        }),
        frame('Tracker', {
          autoLayout: vertical({ spacing: 14, padX: 16, padY: 16 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Order #4821 — Status', { fontSize: 14, fontWeight: 700, color: '#0f172a' }),
            frame('Steps', { autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
              trackerStep('Picked Up', true, false),
              trackerStep('Washing', true, false),
              trackerStep('Drying', false, true),
              trackerStep('Folding', false, false),
              trackerStep('Delivery', false, false),
            ] }),
            text('Estimated delivery: Today by 6 PM', { fontSize: 12, fontWeight: 500, color: '#2563eb' }),
          ],
        }),
        frame('Locations', {
          autoLayout: vertical({ spacing: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Locations', { fontSize: 16, fontWeight: 700, color: '#0f172a' }),
            locationItem('Downtown', '245 Main St', '7 AM – 9 PM'),
            locationItem('Westside', '890 Oak Ave', '8 AM – 8 PM'),
            locationItem('Eastgate', '1200 Park Blvd', '7 AM – 10 PM'),
          ],
        }),
      ],
    }),
  ],
});
