/**
 * Event Tickets — Concert/event ticket marketplace with date badges, venue info, and event cards
 * DSL features: cornerRadii for ticket-style cards, gradient hero, ellipse for date badges,
 * textDecoration for links, opacity, FILL layout, SPACE_BETWEEN
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function dateBadge(month: string, day: string) {
  return frame('DateBadge', {
    size: { x: 52, y: 56 },
    autoLayout: vertical({ spacing: 0, padX: 0, padY: 0, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('MonthBar', {
        autoLayout: horizontal({ spacing: 0, padX: 0, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#7c3aed')],
        layoutSizingHorizontal: 'FILL',
        cornerRadii: { topLeft: 9, topRight: 9, bottomLeft: 0, bottomRight: 0 },
        children: [text(month, { fontSize: 10, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' })],
      }),
      frame('DayArea', {
        autoLayout: horizontal({ spacing: 0, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [text(day, { fontSize: 22, fontWeight: 800, color: '#111827', textAlignHorizontal: 'CENTER' })],
      }),
    ],
  });
}

function eventCard(title: string, venue: string, city: string, month: string, day: string, time: string, priceFrom: string, gradFrom: string, gradTo: string) {
  return frame(`Event: ${title}`, {
    autoLayout: horizontal({ spacing: 16, padX: 16, padY: 16, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('EventImage', {
        size: { x: 120, y: 120 },
        fills: [gradient([{ hex: gradFrom, position: 0 }, { hex: gradTo, position: 1 }], 135)],
        cornerRadius: 10,
      }),
      frame('EventInfo', {
        autoLayout: vertical({ spacing: 6 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 18, fontWeight: 700, color: '#111827' }),
          frame('VenueRow', {
            autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
            children: [
              text(venue, { fontSize: 13, fontWeight: 500, color: '#7c3aed', textDecoration: 'UNDERLINE' }),
              text('|', { fontSize: 13, fontWeight: 400, color: '#d1d5db' }),
              text(city, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            ],
          }),
          text(`${time}`, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
            children: [
              text('From', { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
              text(priceFrom, { fontSize: 16, fontWeight: 700, color: '#111827' }),
            ],
          }),
        ],
      }),
      dateBadge(month, day),
    ],
  });
}

function filterPill(label: string, active: boolean) {
  return frame(`Filter: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(active ? '#7c3aed' : '#f3f4f6')],
    cornerRadius: 9999,
    children: [text(label, { fontSize: 13, fontWeight: active ? 600 : 400, color: active ? '#ffffff' : '#374151' })],
  });
}

export default frame('EventTicketsPage', {
  size: { x: 900 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f9fafb')],
  children: [
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 12, padX: 40, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#4c1d95', position: 0 }, { hex: '#7c3aed', position: 0.5 }, { hex: '#a78bfa', position: 1 }], 135)],
      children: [
        text('Find Your Next Experience', { fontSize: 32, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        text('Concerts, festivals, sports, theater and more', { fontSize: 16, fontWeight: 400, color: '#ffffffcc', textAlignHorizontal: 'CENTER' }),
        frame('SearchBox', {
          autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12, counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          size: { x: 500 },
          children: [
            text('Search events, artists, venues...', { fontSize: 14, fontWeight: 400, color: '#9ca3af', layoutSizingHorizontal: 'FILL' }),
            frame('SearchBtn', {
              autoLayout: horizontal({ spacing: 0, padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#7c3aed')],
              cornerRadius: 8,
              children: [text('Search', { fontSize: 13, fontWeight: 600, color: '#ffffff' })],
            }),
          ],
        }),
      ],
    }),
    // Filters
    frame('Filters', {
      autoLayout: horizontal({ spacing: 10, padX: 40, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        filterPill('All Events', true),
        filterPill('Concerts', false),
        filterPill('Sports', false),
        filterPill('Theater', false),
        filterPill('Festivals', false),
        filterPill('Comedy', false),
      ],
    }),
    // Events list
    frame('EventsList', {
      autoLayout: vertical({ spacing: 12, padX: 40, padY: 8 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Upcoming Events', { fontSize: 22, fontWeight: 700, color: '#111827' }),
        eventCard('Taylor Swift - Eras Tour', 'Madison Square Garden', 'New York, NY', 'APR', '12', 'Sat, Apr 12 at 7:00 PM', '$149', '#ec4899', '#8b5cf6'),
        eventCard('NBA Finals Game 3', 'Crypto.com Arena', 'Los Angeles, CA', 'JUN', '08', 'Sun, Jun 8 at 8:30 PM', '$285', '#f97316', '#ef4444'),
        eventCard('Hamilton - Broadway', 'Richard Rodgers Theatre', 'New York, NY', 'MAY', '22', 'Thu, May 22 at 7:30 PM', '$89', '#10b981', '#3b82f6'),
        eventCard('Coldplay - Music of the Spheres', 'Wembley Stadium', 'London, UK', 'JUL', '05', 'Sat, Jul 5 at 6:00 PM', '$95', '#6366f1', '#a78bfa'),
      ],
    }),
  ],
});
