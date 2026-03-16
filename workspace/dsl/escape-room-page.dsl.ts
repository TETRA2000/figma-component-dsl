/**
 * Escape Room Booking — Room themes, difficulty ratings, team size, booking slots
 * DSL features: dark theme, gradient room images, difficulty dots (ellipses), FILL columns
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function difficultyDots(level: number, max: number) {
  const dots: ReturnType<typeof ellipse>[] = [];
  for (let i = 0; i < max; i++) {
    dots.push(ellipse(`Dot${i}`, { size: { x: 10, y: 10 }, fills: [solid(i < level ? '#ef4444' : '#374151')] }));
  }
  return frame('Difficulty', {
    autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
    children: dots,
  });
}

function roomCard(name: string, desc: string, difficulty: number, team: string, duration: string, colors: [string, string]) {
  return frame(`Room:${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 14, padY: 14 }),
    fills: [solid('#1a1a2e')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle(`Img:${name}`, {
        size: { x: 260, y: 160 },
        fills: [gradient([{ hex: colors[0], position: 0 }, { hex: colors[1], position: 1 }], 135)],
        cornerRadius: 10,
        layoutSizingHorizontal: 'FILL',
      }),
      text(name, { fontSize: 16, fontWeight: 700, color: '#e0e0e0' }),
      text(desc, { fontSize: 12, fontWeight: 400, color: '#71717a', size: { x: 240 }, textAutoResize: 'HEIGHT' }),
      frame('RoomMeta', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          difficultyDots(difficulty, 5),
          text(team, { fontSize: 11, fontWeight: 500, color: '#a78bfa' }),
          text(duration, { fontSize: 11, fontWeight: 400, color: '#71717a' }),
        ],
      }),
      frame('BookBtn', {
        autoLayout: horizontal({ spacing: 0, padX: 24, padY: 8, align: 'CENTER' }),
        fills: [solid('#7c3aed')],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
        children: [text('Book Now', { fontSize: 13, fontWeight: 600, color: '#ffffff' })],
      }),
    ],
  });
}

function slotPill(time: string, available: boolean) {
  return frame(`Slot:${time}`, {
    autoLayout: horizontal({ spacing: 0, padX: 14, padY: 8 }),
    fills: [solid(available ? '#7c3aed22' : '#1a1a2e')],
    cornerRadius: 6,
    strokes: [{ color: { r: 0.49, g: 0.36, b: 0.89, a: available ? 0.6 : 0.15 }, weight: 1, align: 'INSIDE' as const }],
    children: [text(time, { fontSize: 12, fontWeight: 500, color: available ? '#a78bfa' : '#4a4a5a' })],
  });
}

export default frame('EscapeRoomPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 28, padX: 40, padY: 36 }),
  fills: [solid('#0f0f1a')],
  children: [
    frame('PageHeader', {
      autoLayout: vertical({ spacing: 6 }),
      children: [
        text('ESCAPE ROOM', { fontSize: 36, fontWeight: 700, color: '#ffffff' }),
        text('Challenge your mind. Beat the clock.', { fontSize: 14, fontWeight: 400, color: '#71717a' }),
      ],
    }),
    frame('RoomGrid', {
      autoLayout: horizontal({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        roomCard('Haunted Manor', 'Uncover the secrets of the cursed manor before dawn breaks.', 4, '2-6 players', '60 min', ['#581c87', '#312e81']),
        roomCard('Cyber Heist', 'Hack into the mainframe and steal the digital vault codes.', 3, '2-4 players', '45 min', ['#164e63', '#0e7490']),
        roomCard('Lost Temple', 'Navigate ancient traps and retrieve the golden idol.', 5, '3-6 players', '75 min', ['#713f12', '#a16207']),
      ],
    }),
    frame('BookingSection', {
      autoLayout: vertical({ spacing: 14, padX: 20, padY: 20 }),
      fills: [solid('#1a1a2e')],
      cornerRadius: 12,
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Available Slots - Saturday, Mar 21', { fontSize: 16, fontWeight: 600, color: '#e0e0e0' }),
        frame('SlotRow', {
          autoLayout: horizontal({ spacing: 8 }),
          children: [
            slotPill('10:00 AM', true),
            slotPill('11:30 AM', false),
            slotPill('1:00 PM', true),
            slotPill('2:30 PM', true),
            slotPill('4:00 PM', false),
            slotPill('5:30 PM', true),
            slotPill('7:00 PM', true),
          ],
        }),
      ],
    }),
  ],
});
