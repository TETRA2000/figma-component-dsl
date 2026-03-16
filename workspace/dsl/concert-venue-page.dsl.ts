/**
 * Concert Venue — Venue page with seating chart placeholder, event list, and ticket tiers
 * DSL features stressed: gradient seating map placeholder, tiered pricing cards with borders,
 * event list rows with date badges, pill genre tags, dark accent header, ellipse seat indicators
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function eventRow(artist: string, genre: string, date: string, month: string, day: string, time: string, status: 'on-sale' | 'selling-fast' | 'sold-out') {
  const statusColor = status === 'on-sale' ? '#16a34a' : status === 'selling-fast' ? '#f59e0b' : '#ef4444';
  const statusBg = status === 'on-sale' ? '#f0fdf4' : status === 'selling-fast' ? '#fffbeb' : '#fef2f2';
  const statusLabel = status === 'on-sale' ? 'On Sale' : status === 'selling-fast' ? 'Selling Fast' : 'Sold Out';
  return frame(`Event: ${artist}`, {
    autoLayout: horizontal({ spacing: 14, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('DateBadge', {
        size: { x: 52, y: 56 },
        autoLayout: vertical({ spacing: 0, counterAlign: 'CENTER', align: 'CENTER' }),
        fills: [solid('#f8fafc')],
        cornerRadius: 10,
        children: [
          text(month, { fontSize: 10, fontWeight: 700, color: '#dc2626', textAlignHorizontal: 'CENTER' }),
          text(day, { fontSize: 22, fontWeight: 700, color: '#1e293b', textAlignHorizontal: 'CENTER' }),
        ],
      }),
      frame('EventInfo', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(artist, { fontSize: 15, fontWeight: 700, color: '#1e293b' }),
          frame('EventMeta', {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              text(time, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
              frame('GenreTag', {
                autoLayout: horizontal({ spacing: 0, padX: 8, padY: 2 }),
                fills: [solid('#eff6ff')],
                cornerRadius: 6,
                children: [
                  text(genre, { fontSize: 10, fontWeight: 600, color: '#3b82f6' }),
                ],
              }),
            ],
          }),
        ],
      }),
      frame('StatusBadge', {
        autoLayout: horizontal({ spacing: 0, padX: 12, padY: 5 }),
        fills: [solid(statusBg)],
        cornerRadius: 9999,
        children: [
          text(statusLabel, { fontSize: 11, fontWeight: 600, color: statusColor }),
        ],
      }),
    ],
  });
}

function ticketTier(name: string, price: string, features: string[], color: string, recommended: boolean) {
  return frame(`Tier: ${name}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: recommended ? { r: 0.86, g: 0.15, b: 0.15, a: 1 } : { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: recommended ? 2 : 1, align: 'INSIDE' as const }],
    children: [
      ...(recommended ? [
        frame('RecommendedBadge', {
          autoLayout: horizontal({ spacing: 0, padX: 10, padY: 3 }),
          fills: [solid('#dc2626')],
          cornerRadius: 6,
          children: [
            text('BEST VALUE', { fontSize: 9, fontWeight: 700, color: '#ffffff' }),
          ],
        }),
      ] : []),
      text(name, { fontSize: 16, fontWeight: 700, color: '#1e293b' }),
      text(price, { fontSize: 28, fontWeight: 700, color }),
      frame('TierFeatures', {
        autoLayout: vertical({ spacing: 6 }),
        layoutSizingHorizontal: 'FILL',
        children: features.map(f =>
          frame(`Feature: ${f}`, {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              ellipse('Check', { size: { x: 6, y: 6 }, fills: [solid(color)] }),
              text(f, { fontSize: 13, fontWeight: 400, color: '#475569' }),
            ],
          })
        ),
      }),
      frame('SelectBtn', {
        autoLayout: horizontal({ spacing: 0, padY: 10, align: 'CENTER' }),
        fills: [solid(recommended ? '#dc2626' : '#f8fafc')],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
        children: [
          text('Select Tickets', { fontSize: 13, fontWeight: 600, color: recommended ? '#ffffff' : '#475569' }),
        ],
      }),
    ],
  });
}

function seatLegendItem(label: string, color: string) {
  return frame(`Legend: ${label}`, {
    autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
    children: [
      ellipse('Dot', { size: { x: 10, y: 10 }, fills: [solid(color)] }),
      text(label, { fontSize: 11, fontWeight: 500, color: '#64748b' }),
    ],
  });
}

export default frame('ConcertVenuePage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    // Header
    frame('Header', {
      autoLayout: vertical({ spacing: 6, padX: 36, padY: 28 }),
      fills: [gradient([{ hex: '#1e293b', position: 0 }, { hex: '#0f172a', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('HeaderTop', {
          autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('The Grand Arena', { fontSize: 26, fontWeight: 700, color: '#ffffff' }),
            frame('CapacityBadge', {
              autoLayout: horizontal({ spacing: 0, padX: 14, padY: 6 }),
              fills: [solid('#ffffff0d')],
              cornerRadius: 8,
              children: [
                text('Capacity: 12,500', { fontSize: 12, fontWeight: 600, color: '#94a3b8' }),
              ],
            }),
          ],
        }),
        text('456 Concert Boulevard, Austin, TX 78701', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
      ],
    }),

    // Content
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 36, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Seating chart section
        frame('SeatingSection', {
          autoLayout: vertical({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Seating Chart', { fontSize: 18, fontWeight: 700, color: '#1e293b' }),
            frame('SeatingChart', {
              size: { x: 1, y: 240 },
              autoLayout: vertical({ spacing: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [gradient([{ hex: '#e2e8f0', position: 0 }, { hex: '#f1f5f9', position: 0.5 }, { hex: '#e2e8f0', position: 1 }], 135)],
              cornerRadius: 16,
              layoutSizingHorizontal: 'FILL',
              children: [
                // Stage indicator
                frame('StageIndicator', {
                  size: { x: 200, y: 32 },
                  autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#1e293b')],
                  cornerRadius: 8,
                  children: [
                    text('STAGE', { fontSize: 12, fontWeight: 700, color: '#ffffff' }),
                  ],
                }),
                // Seat rows placeholder
                frame('SeatRows', {
                  autoLayout: vertical({ spacing: 6, counterAlign: 'CENTER' }),
                  children: [
                    frame('Row1', { autoLayout: horizontal({ spacing: 4 }), children: Array.from({ length: 12 }, (_, i) => ellipse(`S1-${i}`, { size: { x: 14, y: 14 }, fills: [solid('#dc2626')] })) }),
                    frame('Row2', { autoLayout: horizontal({ spacing: 4 }), children: Array.from({ length: 16 }, (_, i) => ellipse(`S2-${i}`, { size: { x: 14, y: 14 }, fills: [solid('#f59e0b')] })) }),
                    frame('Row3', { autoLayout: horizontal({ spacing: 4 }), children: Array.from({ length: 20 }, (_, i) => ellipse(`S3-${i}`, { size: { x: 14, y: 14 }, fills: [solid('#3b82f6')] })) }),
                    frame('Row4', { autoLayout: horizontal({ spacing: 4 }), children: Array.from({ length: 24 }, (_, i) => ellipse(`S4-${i}`, { size: { x: 14, y: 14 }, fills: [solid('#22c55e')] })) }),
                  ],
                }),
              ],
            }),
            frame('SeatLegend', {
              autoLayout: horizontal({ spacing: 20, align: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                seatLegendItem('VIP Front', '#dc2626'),
                seatLegendItem('Premium', '#f59e0b'),
                seatLegendItem('Standard', '#3b82f6'),
                seatLegendItem('General', '#22c55e'),
              ],
            }),
          ],
        }),

        // Ticket tiers
        frame('TicketSection', {
          autoLayout: vertical({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Ticket Tiers', { fontSize: 18, fontWeight: 700, color: '#1e293b' }),
            frame('TierGrid', {
              autoLayout: horizontal({ spacing: 14 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                ticketTier('General', '$45', ['Standing area access', 'Shared restrooms', 'Cash bar'], '#22c55e', false),
                ticketTier('Premium', '$95', ['Reserved seating', 'Priority entry', 'Complimentary drink', 'Merch discount'], '#dc2626', true),
                ticketTier('VIP', '$185', ['Front row seats', 'Backstage meet & greet', 'Open bar', 'VIP lounge', 'Free parking'], '#f59e0b', false),
              ],
            }),
          ],
        }),

        // Upcoming events
        frame('EventsSection', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('EventsHeader', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Upcoming Events', { fontSize: 18, fontWeight: 700, color: '#1e293b' }),
                text('Full calendar', { fontSize: 13, fontWeight: 600, color: '#dc2626' }),
              ],
            }),
            eventRow('Aurora Nights', 'Indie Rock', 'Mar 22, 2026', 'MAR', '22', '8:00 PM', 'on-sale'),
            eventRow('DJ Nebula', 'Electronic', 'Mar 28, 2026', 'MAR', '28', '10:00 PM', 'selling-fast'),
            eventRow('The Velvet Strings', 'Jazz', 'Apr 3, 2026', 'APR', '03', '7:30 PM', 'on-sale'),
            eventRow('Crimson Tide', 'Metal', 'Apr 10, 2026', 'APR', '10', '9:00 PM', 'sold-out'),
          ],
        }),
      ],
    }),
  ],
});
