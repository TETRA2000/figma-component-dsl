/**
 * Board Game Cafe — Game library, table reservations, event calendar
 * DSL features: playful colors, game cards with gradient covers, player count badges, strokes
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function playerBadge(count: string) {
  return frame('Players', {
    autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }),
    fills: [solid('#dbeafe')],
    cornerRadius: 9999,
    children: [text(count, { fontSize: 10, fontWeight: 600, color: '#1d4ed8' })],
  });
}

function gameCard(name: string, type: string, players: string, time: string, colors: [string, string]) {
  return frame(`Game:${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 12, padY: 12 }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle(`Cover:${name}`, {
        size: { x: 200, y: 130 },
        fills: [gradient([{ hex: colors[0], position: 0 }, { hex: colors[1], position: 1 }], 135)],
        cornerRadius: 10,
        layoutSizingHorizontal: 'FILL',
      }),
      text(name, { fontSize: 14, fontWeight: 600, color: '#1f2937' }),
      text(type, { fontSize: 11, fontWeight: 400, color: '#9ca3af' }),
      frame('GameMeta', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          playerBadge(players),
          text(time, { fontSize: 11, fontWeight: 400, color: '#6b7280' }),
        ],
      }),
    ],
  });
}

function tableSlot(table: string, seats: string, available: boolean) {
  return frame(`Table:${table}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(available ? '#f0fdf4' : '#fef2f2')],
    cornerRadius: 8,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(table, { fontSize: 13, fontWeight: 600, color: '#374151' }),
      text(seats, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
      text(available ? 'Available' : 'Reserved', { fontSize: 11, fontWeight: 600, color: available ? '#16a34a' : '#dc2626' }),
    ],
  });
}

function eventItem(date: string, name: string, desc: string) {
  return frame(`Event:${name}`, {
    autoLayout: horizontal({ spacing: 12, padX: 14, padY: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('DateBox', {
        autoLayout: vertical({ spacing: 0, padX: 10, padY: 6, counterAlign: 'CENTER' }),
        fills: [solid('#8b5cf6')],
        cornerRadius: 8,
        children: [text(date, { fontSize: 12, fontWeight: 700, color: '#ffffff' })],
      }),
      frame('EventInfo', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(name, { fontSize: 13, fontWeight: 600, color: '#1f2937' }),
          text(desc, { fontSize: 11, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}

export default frame('BoardGamePage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 28, padX: 40, padY: 36 }),
  fills: [solid('#faf9fc')],
  children: [
    text('Roll & Play Cafe', { fontSize: 28, fontWeight: 700, color: '#1f2937' }),
    text('Board games, great coffee, and good company.', { fontSize: 14, fontWeight: 400, color: '#9ca3af' }),
    text('Game Library', { fontSize: 18, fontWeight: 600, color: '#1f2937' }),
    frame('GameGrid', {
      autoLayout: horizontal({ spacing: 14 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        gameCard('Settlers of Catan', 'Strategy', '3-4 players', '60-90 min', ['#fde68a', '#f97316']),
        gameCard('Ticket to Ride', 'Family', '2-5 players', '45-60 min', ['#bfdbfe', '#2563eb']),
        gameCard('Codenames', 'Party', '4-8 players', '15-30 min', ['#fecaca', '#dc2626']),
        gameCard('Wingspan', 'Engine Builder', '1-5 players', '40-70 min', ['#bbf7d0', '#16a34a']),
      ],
    }),
    frame('BottomRow', {
      autoLayout: horizontal({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Tables', {
          autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Table Reservations', { fontSize: 16, fontWeight: 600, color: '#1f2937' }),
            tableSlot('Table A', '4 seats', true),
            tableSlot('Table B', '6 seats', false),
            tableSlot('Table C', '2 seats', true),
            tableSlot('Table D', '8 seats', true),
          ],
        }),
        frame('Events', {
          autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Upcoming Events', { fontSize: 16, fontWeight: 600, color: '#1f2937' }),
            eventItem('Mar 20', 'D&D Night', 'Beginner-friendly campaign'),
            eventItem('Mar 22', 'Trivia Tournament', 'Teams of 4, prizes!'),
            eventItem('Mar 25', 'New Game Demo', 'Try Cascadia before purchase'),
          ],
        }),
      ],
    }),
  ],
});
