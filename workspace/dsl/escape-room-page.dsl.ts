/**
 * Escape Rooms — Room cards, difficulty ratings, and booking slots
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function roomCard(name: string, theme: string, difficulty: number, players: string, price: string, color: string) {
  return frame(`Room: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('RoomImg', { size: { x: 240, y: 130 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#0f172a', position: 1 }], 150)], cornerRadius: 10, layoutSizingHorizontal: 'FILL' }),
      text(name, { fontSize: 16, fontWeight: 700, color: '#0f172a' }),
      text(theme, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
      frame('DiffRow', { autoLayout: horizontal({ spacing: 4 }), children: Array.from({ length: 5 }, (_, i) =>
        ellipse(`Star${i}`, { size: { x: 10, y: 10 }, fills: [solid(i < difficulty ? '#f59e0b' : '#e2e8f0')] })
      ) }),
      frame('BottomRow', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        text(players, { fontSize: 12, fontWeight: 500, color: '#64748b' }),
        text(price, { fontSize: 16, fontWeight: 700, color: '#7c3aed' }),
      ] }),
    ],
  });
}

function bookingSlot(time: string, available: boolean) {
  return frame(`Slot: ${time}`, {
    autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER' }),
    fills: [solid(available ? '#f5f3ff' : '#f1f5f9')],
    cornerRadius: 8,
    children: [text(time, { fontSize: 12, fontWeight: 600, color: available ? '#7c3aed' : '#94a3b8' })],
  });
}

function featureChip(label: string) {
  return frame(`Feature: ${label}`, {
    autoLayout: horizontal({ padX: 12, padY: 5 }),
    fills: [solid('#f5f3ff')],
    cornerRadius: 9999,
    children: [text(label, { fontSize: 11, fontWeight: 500, color: '#7c3aed' })],
  });
}

export default frame('EscapeRoomPage', {
  size: { x: 900 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0f172a')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 36, padY: 32, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#0f172a', position: 0 }, { hex: '#4c1d95', position: 1 }], 160)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Enigma Escape Rooms', { fontSize: 28, fontWeight: 800, color: '#ffffff' }),
        text('Can you solve the puzzle and escape in 60 minutes?', { fontSize: 14, fontWeight: 400, color: '#c4b5fd' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 36, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Rooms', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Our Rooms', { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
            frame('RoomGrid', { autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
              roomCard('The Vault', 'Bank heist thriller', 4, '2-6 players', '$35/person', '#ef4444'),
              roomCard('Lost Temple', 'Ancient adventure', 3, '2-8 players', '$30/person', '#d97706'),
              roomCard('Cyber Hack', 'Sci-fi cyberpunk', 5, '3-6 players', '$40/person', '#06b6d4'),
            ] }),
          ],
        }),
        frame('Features', {
          autoLayout: horizontal({ spacing: 8 }),
          children: [
            featureChip('Live Actors'), featureChip('Special Effects'),
            featureChip('Themed Rooms'), featureChip('Group Discounts'),
            featureChip('Private Events'),
          ],
        }),
        frame('Booking', {
          autoLayout: vertical({ spacing: 10, padX: 18, padY: 18 }),
          fills: [solid('#1e293b')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Book a Session — Today', { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
            frame('Slots', { autoLayout: horizontal({ spacing: 8 }), children: [
              bookingSlot('10:00 AM', true), bookingSlot('12:00 PM', false),
              bookingSlot('2:00 PM', true), bookingSlot('4:00 PM', true),
              bookingSlot('6:00 PM', false), bookingSlot('8:00 PM', true),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
