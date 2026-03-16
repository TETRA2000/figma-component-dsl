/**
 * DJ/Event Booking — Artist profiles, event calendar, genre tags
 * DSL features: dark theme, gradient neon accents, ellipse avatars, genre pill tags, large text
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function genrePill(label: string, color: string) {
  return frame(`Genre:${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 14, padY: 6 }),
    fills: [solid(color + '33')],
    cornerRadius: 9999,
    children: [text(label, { fontSize: 11, fontWeight: 600, color })],
  });
}

function djCard(name: string, genre: string, rate: string, color: string) {
  return frame(`DJ:${name}`, {
    autoLayout: vertical({ spacing: 12, padX: 16, padY: 16, counterAlign: 'CENTER' }),
    fills: [solid('#1e1e2e')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse(`Av:${name}`, {
        size: { x: 72, y: 72 },
        fills: [gradient([{ hex: color, position: 0 }, { hex: '#0f0f1a', position: 1 }], 135)],
      }),
      text(name, { fontSize: 18, fontWeight: 700, color: '#ffffff' }),
      genrePill(genre, color),
      text(rate, { fontSize: 14, fontWeight: 600, color: '#a78bfa' }),
    ],
  });
}

function eventRow(date: string, venue: string, dj: string, status: string) {
  return frame(`Event:${date}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.2, g: 0.2, b: 0.3, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(date, { fontSize: 13, fontWeight: 600, color: '#e0e0e0', size: { x: 100 } }),
      text(venue, { fontSize: 13, fontWeight: 400, color: '#a0a0c0', size: { x: 200 } }),
      text(dj, { fontSize: 13, fontWeight: 500, color: '#c084fc', size: { x: 140 } }),
      frame(`Status:${status}`, {
        autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }),
        fills: [solid(status === 'Confirmed' ? '#22c55e33' : '#facc1533')],
        cornerRadius: 9999,
        children: [text(status, { fontSize: 11, fontWeight: 600, color: status === 'Confirmed' ? '#22c55e' : '#facc15' })],
      }),
    ],
  });
}

export default frame('DJBookingPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 32, padX: 40, padY: 36 }),
  fills: [solid('#0f0f1a')],
  children: [
    frame('HeroSection', {
      autoLayout: vertical({ spacing: 8 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('NeonBar', {
          size: { x: 920, y: 4 },
          fills: [gradient([{ hex: '#c084fc', position: 0 }, { hex: '#22d3ee', position: 0.5 }, { hex: '#f472b6', position: 1 }], 90)],
          layoutSizingHorizontal: 'FILL',
        }),
        text('BOOK YOUR DJ', { fontSize: 40, fontWeight: 700, color: '#ffffff' }),
        text('Premium DJs for clubs, festivals, and private events', { fontSize: 15, fontWeight: 400, color: '#71717a' }),
      ],
    }),
    frame('GenreFilter', {
      autoLayout: horizontal({ spacing: 8 }),
      children: [
        genrePill('House', '#c084fc'),
        genrePill('Techno', '#22d3ee'),
        genrePill('Hip Hop', '#f472b6'),
        genrePill('Drum & Bass', '#34d399'),
        genrePill('Afrobeats', '#facc15'),
      ],
    }),
    frame('DJGrid', {
      autoLayout: horizontal({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        djCard('DJ Nova', 'House', '$500/hr', '#c084fc'),
        djCard('Synthwave Kid', 'Techno', '$450/hr', '#22d3ee'),
        djCard('Beatsmith', 'Hip Hop', '$600/hr', '#f472b6'),
        djCard('Pulse', 'Drum & Bass', '$400/hr', '#34d399'),
      ],
    }),
    frame('EventCalendar', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#1e1e2e')],
      cornerRadius: 12,
      children: [
        frame('CalHeader', {
          autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [text('Upcoming Events', { fontSize: 18, fontWeight: 600, color: '#ffffff' })],
        }),
        eventRow('Mar 22', 'Club Neon, LA', 'DJ Nova', 'Confirmed'),
        eventRow('Mar 25', 'Warehouse 9', 'Synthwave Kid', 'Pending'),
        eventRow('Mar 28', 'Rooftop Bar', 'Beatsmith', 'Confirmed'),
        eventRow('Apr 02', 'Festival Main', 'Pulse', 'Pending'),
      ],
    }),
  ],
});
