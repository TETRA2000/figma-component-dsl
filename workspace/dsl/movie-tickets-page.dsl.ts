/**
 * Movie Tickets — Cinema with movie poster cards, showtimes, seat selection placeholder
 * DSL features: gradient poster placeholders, showtime pills, seat grid placeholder, rating badges
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function movieCard(title: string, genre: string, rating: string, duration: string, color: string, times: string[]) {
  return frame(`Movie: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')], cornerRadius: 14, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle(`Poster:${title}`, {
        size: { x: 1, y: 180 },
        fills: [gradient([{ hex: color, position: 0 }, { hex: '#0f172a', position: 1 }], 180)],
        cornerRadius: 14,
      }),
      frame('MovieInfo', {
        autoLayout: vertical({ spacing: 8, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL',
        children: [
          frame('TitleRow', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(title, { fontSize: 15, fontWeight: 700, color: '#111827' }),
              frame('RatingBadge', {
                autoLayout: horizontal({ spacing: 3, padX: 6, padY: 3 }),
                fills: [solid('#fef3c7')], cornerRadius: 6,
                children: [
                  text('★', { fontSize: 11, fontWeight: 400, color: '#f59e0b' }),
                  text(rating, { fontSize: 11, fontWeight: 700, color: '#d97706' }),
                ],
              }),
            ],
          }),
          text(`${genre} • ${duration}`, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
          frame('Showtimes', {
            autoLayout: horizontal({ spacing: 6 }),
            children: times.map(t => frame(`Time:${t}`, {
              autoLayout: horizontal({ spacing: 0, padX: 10, padY: 5 }),
              fills: [solid('#eff6ff')], cornerRadius: 6,
              children: [text(t, { fontSize: 11, fontWeight: 600, color: '#2563eb' })],
            })),
          }),
        ],
      }),
    ],
  });
}

function seatRow(row: string, seats: number) {
  const seatNodes = Array.from({ length: seats }, (_, i) => {
    const taken = i === 2 || i === 5 || i === 8;
    const selected = i === 3 || i === 4;
    const fill = taken ? '#e5e7eb' : selected ? '#2563eb' : '#ffffff';
    const stroke = taken ? '#d1d5db' : selected ? '#2563eb' : '#cbd5e1';
    return frame(`Seat:${row}${i}`, {
      size: { x: 28, y: 24 },
      fills: [solid(fill)], cornerRadius: 4,
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 0 }, weight: 0, align: 'INSIDE' as const }],
      children: [],
    });
  });
  return frame(`Row: ${row}`, {
    autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
    children: [
      text(row, { fontSize: 11, fontWeight: 600, color: '#9ca3af', size: { x: 16 } }),
      ...seatNodes,
    ],
  });
}

function legendItem(color: string, label: string) {
  return frame(`Legend: ${label}`, {
    autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
    children: [
      rectangle(`Dot:${label}`, { size: { x: 14, y: 12 }, fills: [solid(color)], cornerRadius: 3 }),
      text(label, { fontSize: 11, fontWeight: 400, color: '#6b7280' }),
    ],
  });
}

export default frame('MovieTicketsPage', {
  size: { x: 900 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 28, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid('#0f172a')],
      children: [
        text('CineMax', { fontSize: 22, fontWeight: 800, color: '#fbbf24' }),
        text('Downtown Theater • Today', { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
      ],
    }),
    frame('MoviesSection', {
      autoLayout: vertical({ spacing: 12, padX: 28, padY: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Now Showing', { fontSize: 18, fontWeight: 700, color: '#111827' }),
        frame('MovieGrid', {
          autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL',
          children: [
            movieCard('Nebula Rising', 'Sci-Fi', '8.7', '2h 15m', '#3b82f6', ['1:30', '4:45', '7:30']),
            movieCard('The Last Waltz', 'Drama', '9.1', '1h 55m', '#ec4899', ['2:00', '5:15', '8:00']),
            movieCard('Shadow Pursuit', 'Action', '7.8', '2h 05m', '#f59e0b', ['3:00', '6:30', '9:15']),
          ],
        }),
      ],
    }),
    frame('SeatSection', {
      autoLayout: vertical({ spacing: 12, padX: 28, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Select Seats — Nebula Rising 7:30 PM', { fontSize: 16, fontWeight: 700, color: '#111827' }),
        frame('Screen', {
          autoLayout: horizontal({ spacing: 0, padY: 6, align: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            rectangle('ScreenBar', {
              size: { x: 300, y: 4 },
              fills: [gradient([{ hex: '#cbd5e1', position: 0 }, { hex: '#94a3b8', position: 0.5 }, { hex: '#cbd5e1', position: 1 }], 90)],
              cornerRadius: 2,
            }),
          ],
        }),
        text('SCREEN', { fontSize: 10, fontWeight: 600, color: '#9ca3af', textAlignHorizontal: 'CENTER' }),
        frame('SeatGrid', {
          autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [seatRow('A', 10), seatRow('B', 10), seatRow('C', 10), seatRow('D', 10)],
        }),
        frame('Legend', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            legendItem('#ffffff', 'Available'),
            legendItem('#2563eb', 'Selected'),
            legendItem('#e5e7eb', 'Taken'),
          ],
        }),
      ],
    }),
  ],
});
