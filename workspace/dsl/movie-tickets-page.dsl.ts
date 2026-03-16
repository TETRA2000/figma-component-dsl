/**
 * Movie Ticket Booking — Now showing grid, seat selection, showtime pills
 *
 * DSL features stressed: dark theme, gradient posters, grid layout,
 * pill badges, SPACE_BETWEEN rows, cornerRadius cards
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function movieCard(title: string, genre: string, rating: string, grad1: string, grad2: string) {
  return frame(`Movie: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#1c1c2e')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    clipContent: true,
    children: [
      rectangle(`${title}Poster`, {
        size: { x: 1, y: 180 },
        fills: [gradient([{ hex: grad1, position: 0 }, { hex: grad2, position: 1 }], 160)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame(`${title}Info`, {
        autoLayout: vertical({ spacing: 6, padX: 14, padY: 14 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 15, fontWeight: 700, color: '#ffffff' }),
          frame(`${title}Meta`, {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              text(genre, { fontSize: 11, fontWeight: 400, color: '#a0a0c0' }),
              frame(`${title}RatingBadge`, {
                autoLayout: horizontal({ padX: 8, padY: 3 }),
                fills: [solid('#fbbf2433')],
                cornerRadius: 9999,
                children: [
                  text(`★ ${rating}`, { fontSize: 11, fontWeight: 600, color: '#fbbf24' }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function showtimePill(time: string, active: boolean) {
  return frame(`Time: ${time}`, {
    autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER' }),
    fills: active
      ? [gradient([{ hex: '#e11d48', position: 0 }, { hex: '#f97316', position: 1 }], 90)]
      : [solid('#1c1c2e')],
    cornerRadius: 9999,
    strokes: active ? [] : [{ color: { r: 0.4, g: 0.4, b: 0.55, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(time, { fontSize: 13, fontWeight: 600, color: active ? '#ffffff' : '#a0a0c0' }),
    ],
  });
}

function seatRow(rowLabel: string, count: number) {
  const seats: ReturnType<typeof rectangle>[] = [];
  for (let i = 0; i < count; i++) {
    const taken = i === 2 || i === 3 || i === 7;
    const selected = i === 5 || i === 6;
    seats.push(
      rectangle(`${rowLabel}-${i}`, {
        size: { x: 28, y: 28 },
        fills: [solid(selected ? '#e11d48' : taken ? '#2a2a40' : '#3b3b58')],
        cornerRadius: 6,
      })
    );
  }
  return frame(`Row ${rowLabel}`, {
    autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
    children: [
      text(rowLabel, { fontSize: 12, fontWeight: 600, color: '#6b6b8a', width: 20 }),
      ...seats,
    ],
  });
}

export default frame('MovieTicketsPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0f0f1a')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 40, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#16162a')],
      children: [
        text('CineMax', { fontSize: 24, fontWeight: 800, color: '#e11d48' }),
        frame('NavItems', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('Now Showing', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
            text('Coming Soon', { fontSize: 14, fontWeight: 400, color: '#6b6b8a' }),
            text('My Tickets', { fontSize: 14, fontWeight: 400, color: '#6b6b8a' }),
          ],
        }),
      ],
    }),

    // Now Showing
    frame('NowShowing', {
      autoLayout: vertical({ spacing: 20, padX: 40, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Now Showing', { fontSize: 22, fontWeight: 700, color: '#ffffff' }),
        frame('MovieGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            movieCard('Galactic Dawn', 'Sci-Fi', '8.7', '#1a0533', '#6d28d9'),
            movieCard('Midnight Chase', 'Thriller', '7.9', '#0c1631', '#1d4ed8'),
            movieCard('The Last Garden', 'Drama', '8.2', '#1a2e0a', '#16a34a'),
            movieCard('Ember Rising', 'Action', '7.5', '#3b0a0a', '#dc2626'),
          ],
        }),
      ],
    }),

    // Booking Section
    frame('BookingSection', {
      autoLayout: vertical({ spacing: 24, padX: 40, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('BookingHeader', {
          autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Book: Galactic Dawn', { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
            text('March 16, 2026', { fontSize: 14, fontWeight: 400, color: '#6b6b8a' }),
          ],
        }),

        // Showtimes
        frame('Showtimes', {
          autoLayout: horizontal({ spacing: 10 }),
          children: [
            showtimePill('11:30 AM', false),
            showtimePill('2:15 PM', true),
            showtimePill('5:00 PM', false),
            showtimePill('7:45 PM', false),
            showtimePill('10:30 PM', false),
          ],
        }),

        // Seat Map
        frame('SeatMap', {
          autoLayout: vertical({ spacing: 8, padX: 24, padY: 20, counterAlign: 'CENTER' }),
          fills: [solid('#16162a')],
          cornerRadius: 14,
          layoutSizingHorizontal: 'FILL',
          children: [
            rectangle('Screen', {
              size: { x: 260, y: 4 },
              fills: [gradient([{ hex: '#e11d48', position: 0 }, { hex: '#f97316', position: 1 }], 90)],
              cornerRadius: 2,
            }),
            text('SCREEN', { fontSize: 10, fontWeight: 500, color: '#6b6b8a', textAlignHorizontal: 'CENTER' }),
            seatRow('A', 10),
            seatRow('B', 10),
            seatRow('C', 10),
            seatRow('D', 10),
          ],
        }),

        // Legend + Total
        frame('BookingFooter', {
          autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('Legend', {
              autoLayout: horizontal({ spacing: 16 }),
              children: [
                frame('LegAvailable', {
                  autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
                  children: [
                    rectangle('LAvail', { size: { x: 14, y: 14 }, fills: [solid('#3b3b58')], cornerRadius: 3 }),
                    text('Available', { fontSize: 11, fontWeight: 400, color: '#6b6b8a' }),
                  ],
                }),
                frame('LegSelected', {
                  autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
                  children: [
                    rectangle('LSel', { size: { x: 14, y: 14 }, fills: [solid('#e11d48')], cornerRadius: 3 }),
                    text('Selected', { fontSize: 11, fontWeight: 400, color: '#6b6b8a' }),
                  ],
                }),
                frame('LegTaken', {
                  autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
                  children: [
                    rectangle('LTak', { size: { x: 14, y: 14 }, fills: [solid('#2a2a40')], cornerRadius: 3 }),
                    text('Taken', { fontSize: 11, fontWeight: 400, color: '#6b6b8a' }),
                  ],
                }),
              ],
            }),
            frame('Total', {
              autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
              children: [
                text('2 seats — $24.00', { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
                frame('BuyBtn', {
                  autoLayout: horizontal({ padX: 24, padY: 10 }),
                  fills: [gradient([{ hex: '#e11d48', position: 0 }, { hex: '#f97316', position: 1 }], 90)],
                  cornerRadius: 10,
                  children: [
                    text('Buy Tickets', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
