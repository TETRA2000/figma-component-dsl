/**
 * Parking Finder — Spot cards, rates, and map placeholder
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function spotCard(name: string, distance: string, price: string, spots: number, type: string) {
  return frame(`Spot: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 14, padY: 14 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('TopRow', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        text(name, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
        frame('TypeBadge', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid('#eff6ff')], cornerRadius: 9999, children: [text(type, { fontSize: 10, fontWeight: 600, color: '#2563eb' })] }),
      ] }),
      text(distance, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
      frame('BottomRow', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        text(price, { fontSize: 16, fontWeight: 700, color: '#2563eb' }),
        text(`${spots} available`, { fontSize: 12, fontWeight: 500, color: spots <= 5 ? '#ef4444' : '#22c55e' }),
      ] }),
    ],
  });
}

function rateRow(label: string, price: string) {
  return frame(`Rate: ${label}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', padX: 12, padY: 8 }),
    fills: [solid('#f8fafc')],
    cornerRadius: 6,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: '#475569' }),
      text(price, { fontSize: 13, fontWeight: 700, color: '#1e293b' }),
    ],
  });
}

export default frame('ParkingAppPage', {
  size: { x: 600 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f1f5f9')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 20, padY: 16 }),
      fills: [gradient([{ hex: '#1e3a5f', position: 0 }, { hex: '#2563eb', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('ParkEasy', { fontSize: 20, fontWeight: 800, color: '#ffffff' }),
        frame('LocationPill', { autoLayout: horizontal({ padX: 10, padY: 4 }), fills: [solid('#ffffff1a')], cornerRadius: 9999, children: [
          text('📍 Downtown', { fontSize: 12, fontWeight: 500, color: '#ffffff' }),
        ] }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 18, padX: 20, padY: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('MapPlaceholder', { size: { x: 560, y: 180 }, fills: [solid('#dbeafe')], cornerRadius: 12, layoutSizingHorizontal: 'FILL' }),
        frame('NearbySpots', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Nearby Parking', { fontSize: 16, fontWeight: 700, color: '#0f172a' }),
            spotCard('Main St Garage', '0.2 mi away', '$3.50/hr', 24, 'Garage'),
            spotCard('City Center Lot', '0.4 mi away', '$2.00/hr', 3, 'Open Lot'),
            spotCard('Oak Plaza Deck', '0.6 mi away', '$4.00/hr', 45, 'Covered'),
          ],
        }),
        frame('Rates', {
          autoLayout: vertical({ spacing: 6, padX: 14, padY: 14 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Rate Guide', { fontSize: 14, fontWeight: 700, color: '#0f172a' }),
            rateRow('1 Hour', '$2.00 – $4.00'),
            rateRow('Half Day (4 hrs)', '$8.00 – $14.00'),
            rateRow('Full Day', '$12.00 – $22.00'),
            rateRow('Monthly Pass', '$95 – $175'),
          ],
        }),
      ],
    }),
  ],
});
