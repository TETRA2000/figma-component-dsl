/**
 * Car Wash — Service tiers, loyalty card, and operating hours
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function serviceTier(name: string, price: string, features: string[], color: string) {
  return frame(`Tier: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('TierHeader', { autoLayout: horizontal({ padX: 10, padY: 4 }), fills: [solid(color)], cornerRadius: 8, children: [
        text(name, { fontSize: 12, fontWeight: 700, color: '#ffffff' }),
      ] }),
      text(price, { fontSize: 24, fontWeight: 800, color }),
      ...features.map(f => text(`✓ ${f}`, { fontSize: 11, fontWeight: 400, color: '#475569' })),
    ],
  });
}

function loyaltyDot(filled: boolean) {
  return ellipse('Stamp', { size: { x: 28, y: 28 }, fills: [solid(filled ? '#2563eb' : '#e2e8f0')] });
}

function hoursRow(day: string, hours: string, today: boolean) {
  return frame(`Hours: ${day}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', padX: 12, padY: 8 }),
    fills: [solid(today ? '#eff6ff' : '#f8fafc')],
    cornerRadius: 6,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(day, { fontSize: 13, fontWeight: today ? 600 : 400, color: today ? '#2563eb' : '#475569' }),
      text(hours, { fontSize: 13, fontWeight: 500, color: '#1e293b' }),
    ],
  });
}

export default frame('CarWashPage', {
  size: { x: 600 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#eff6ff')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 4, padX: 24, padY: 22, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#1e3a5f', position: 0 }, { hex: '#2563eb', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('AquaShine Car Wash', { fontSize: 22, fontWeight: 800, color: '#ffffff' }),
        text('Drive in dirty, drive out sparkling', { fontSize: 12, fontWeight: 400, color: '#93c5fd' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 18, padX: 24, padY: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Services', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Wash Packages', { fontSize: 16, fontWeight: 700, color: '#0f172a' }),
            frame('TierGrid', { autoLayout: horizontal({ spacing: 10 }), layoutSizingHorizontal: 'FILL', children: [
              serviceTier('Basic', '$12', ['Exterior wash', 'Rinse & dry'], '#64748b'),
              serviceTier('Deluxe', '$22', ['Exterior + interior', 'Tire shine', 'Air freshener'], '#2563eb'),
              serviceTier('Premium', '$35', ['Full detail', 'Wax coating', 'Interior vacuum', 'Dashboard polish'], '#7c3aed'),
            ] }),
          ],
        }),
        frame('Loyalty', {
          autoLayout: vertical({ spacing: 10, padX: 16, padY: 16, counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Loyalty Card', { fontSize: 14, fontWeight: 700, color: '#0f172a' }),
            text('7 of 10 washes — 3 more for a free wash!', { fontSize: 12, fontWeight: 400, color: '#64748b' }),
            frame('Stamps', { autoLayout: horizontal({ spacing: 6 }), children: [
              loyaltyDot(true), loyaltyDot(true), loyaltyDot(true), loyaltyDot(true),
              loyaltyDot(true), loyaltyDot(true), loyaltyDot(true),
              loyaltyDot(false), loyaltyDot(false), loyaltyDot(false),
            ] }),
          ],
        }),
        frame('Hours', {
          autoLayout: vertical({ spacing: 4 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Operating Hours', { fontSize: 14, fontWeight: 700, color: '#0f172a' }),
            hoursRow('Monday', '7 AM – 8 PM', true),
            hoursRow('Tuesday', '7 AM – 8 PM', false),
            hoursRow('Wednesday', '7 AM – 8 PM', false),
            hoursRow('Thursday', '7 AM – 8 PM', false),
            hoursRow('Friday', '7 AM – 9 PM', false),
            hoursRow('Saturday', '8 AM – 9 PM', false),
            hoursRow('Sunday', '9 AM – 6 PM', false),
          ],
        }),
      ],
    }),
  ],
});
