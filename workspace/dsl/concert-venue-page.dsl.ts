/**
 * Concert Venue — Event listing with ticket tiers, venue info, upcoming shows
 * DSL features: gradient hero, event list cards, tier pricing, ellipse avatars, status badges
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function eventCard(artist: string, date: string, genre: string, color: string, soldOut: boolean) {
  return frame(`Event: ${artist}`, {
    autoLayout: horizontal({ spacing: 14, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse(`Av:${artist}`, { size: { x: 48, y: 48 }, fills: [solid(color)] }),
      frame('EventInfo', {
        autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL',
        children: [
          text(artist, { fontSize: 15, fontWeight: 700, color: '#111827' }),
          text(date, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
          text(genre, { fontSize: 11, fontWeight: 500, color }),
        ],
      }),
      frame('StatusBadge', {
        autoLayout: horizontal({ spacing: 0, padX: 12, padY: 5 }),
        fills: [solid(soldOut ? '#fef2f2' : '#f0fdf4')], cornerRadius: 9999,
        children: [text(soldOut ? 'Sold Out' : 'Available', { fontSize: 11, fontWeight: 600, color: soldOut ? '#dc2626' : '#16a34a' })],
      }),
    ],
  });
}

function ticketTier(name: string, price: string, perks: string[], color: string, featured: boolean) {
  return frame(`Tier: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 18, padY: 18 }),
    fills: [solid(featured ? color : '#ffffff')], cornerRadius: 14, layoutSizingHorizontal: 'FILL',
    strokes: featured ? [] : [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(name, { fontSize: 14, fontWeight: 700, color: featured ? '#ffffff' : '#111827' }),
      text(price, { fontSize: 26, fontWeight: 800, color: featured ? '#ffffff' : color }),
      ...perks.map(p => text(`• ${p}`, { fontSize: 12, fontWeight: 400, color: featured ? '#ffffffcc' : '#6b7280' })),
      frame('TierBtn', {
        autoLayout: horizontal({ spacing: 0, padY: 10, align: 'CENTER' }),
        fills: [solid(featured ? '#ffffff' : color)], cornerRadius: 8, layoutSizingHorizontal: 'FILL',
        children: [text('Select', { fontSize: 13, fontWeight: 600, color: featured ? color : '#ffffff' })],
      }),
    ],
  });
}

function venueInfo(label: string, value: string) {
  return frame(`Info: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padY: 6 }), layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#9ca3af', layoutSizingHorizontal: 'FILL' }),
      text(value, { fontSize: 12, fontWeight: 600, color: '#374151' }),
    ],
  });
}

export default frame('ConcertVenuePage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fafafa')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 36, padY: 32 }), layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#1e1b4b', position: 0 }, { hex: '#4c1d95', position: 0.6 }, { hex: '#7c3aed', position: 1 }], 135)],
      children: [
        text('The Velvet Room', { fontSize: 32, fontWeight: 900, color: '#ffffff' }),
        text('Live Music Venue • Downtown Portland', { fontSize: 14, fontWeight: 500, color: '#c4b5fd' }),
        text('Capacity 1,200 • Full Bar • VIP Lounge', { fontSize: 12, fontWeight: 400, color: '#a78bfa' }),
      ],
    }),
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 24, padX: 36, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('EventsList', {
          autoLayout: vertical({ spacing: 10 }), layoutSizingHorizontal: 'FILL',
          children: [
            text('Upcoming Shows', { fontSize: 18, fontWeight: 700, color: '#111827' }),
            eventCard('Nova Collective', 'Mar 22, 2026 • 8:00 PM', 'Indie Rock', '#7c3aed', false),
            eventCard('DJ Solaris', 'Mar 28, 2026 • 9:00 PM', 'Electronic', '#3b82f6', false),
            eventCard('The Ember Trio', 'Apr 3, 2026 • 7:30 PM', 'Jazz Fusion', '#f59e0b', false),
            eventCard('Midnight Aurora', 'Apr 10, 2026 • 8:00 PM', 'Synthwave', '#ec4899', true),
            eventCard('Cedar Folk Band', 'Apr 15, 2026 • 7:00 PM', 'Folk', '#16a34a', false),
          ],
        }),
        frame('Sidebar', {
          size: { x: 300 },
          autoLayout: vertical({ spacing: 16 }),
          children: [
            text('Ticket Tiers', { fontSize: 18, fontWeight: 700, color: '#111827' }),
            ticketTier('General', '$35', ['Standing room', 'Cash bar access'], '#7c3aed', false),
            ticketTier('VIP', '$85', ['Reserved seating', 'VIP lounge', 'Complimentary drink'], '#7c3aed', true),
            ticketTier('Premium', '$150', ['Front row', 'Meet & greet', 'Open bar'], '#7c3aed', false),
            frame('VenueDetails', {
              autoLayout: vertical({ spacing: 4, padX: 16, padY: 14 }),
              fills: [solid('#ffffff')], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [
                text('Venue Info', { fontSize: 14, fontWeight: 700, color: '#111827' }),
                venueInfo('Address', '42 Music Lane, Portland'),
                venueInfo('Parking', 'Garage adjacent'),
                venueInfo('Age', '21+ after 9 PM'),
                venueInfo('Doors', '1 hour before show'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
