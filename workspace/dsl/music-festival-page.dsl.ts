/**
 * Music Festival — Dark lineup page with stage columns, artist cards, and schedule
 * DSL features: dark theme, gradient stage headers, ellipse avatars, pill genre tags
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function artistCard(name: string, time: string, genre: string, color: string) {
  return frame(`Artist: ${name}`, {
    autoLayout: horizontal({ spacing: 10, padX: 12, padY: 10, counterAlign: 'CENTER' }),
    fills: [solid('#1e1e2e')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse(`Av:${name}`, { size: { x: 40, y: 40 }, fills: [solid(color)] }),
      frame('ArtistInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
          text(time, { fontSize: 11, fontWeight: 400, color: '#a1a1aa' }),
        ],
      }),
      frame('GenreTag', {
        autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }),
        fills: [solid(color + '33')],
        cornerRadius: 9999,
        children: [text(genre, { fontSize: 10, fontWeight: 600, color })],
      }),
    ],
  });
}

function stageColumn(stage: string, gradFrom: string, gradTo: string, artists: ReturnType<typeof artistCard>[]) {
  return frame(`Stage: ${stage}`, {
    autoLayout: vertical({ spacing: 10, padX: 10, padY: 10 }),
    fills: [solid('#161622')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('StageHeader', {
        autoLayout: horizontal({ spacing: 0, padX: 14, padY: 10, align: 'CENTER' }),
        fills: [gradient([{ hex: gradFrom, position: 0 }, { hex: gradTo, position: 1 }], 90)],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
        children: [text(stage, { fontSize: 15, fontWeight: 800, color: '#ffffff' })],
      }),
      ...artists,
    ],
  });
}

function statBadge(label: string, value: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 2, padX: 16, padY: 10, counterAlign: 'CENTER' }),
    fills: [solid('#1e1e2e')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(value, { fontSize: 22, fontWeight: 800, color: '#ffffff' }),
      text(label, { fontSize: 11, fontWeight: 500, color: '#71717a' }),
    ],
  });
}

export default frame('MusicFestivalPage', {
  size: { x: 1200 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0c0c14')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#ec4899', position: 1 }], 90)],
      children: [
        frame('HeaderLeft', {
          autoLayout: vertical({ spacing: 2 }),
          children: [
            text('NEONWAVE FEST 2026', { fontSize: 28, fontWeight: 900, color: '#ffffff' }),
            text('June 14-16 • Riverside Park, Austin TX', { fontSize: 13, fontWeight: 500, color: '#ffffffcc' }),
          ],
        }),
        frame('TicketBtn', {
          autoLayout: horizontal({ spacing: 0, padX: 20, padY: 10 }),
          fills: [solid('#ffffff')],
          cornerRadius: 9999,
          children: [text('Get Tickets', { fontSize: 14, fontWeight: 700, color: '#7c3aed' })],
        }),
      ],
    }),
    frame('Stats', {
      autoLayout: horizontal({ spacing: 12, padX: 32, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        statBadge('Artists', '48'),
        statBadge('Stages', '4'),
        statBadge('Days', '3'),
        statBadge('Attendees', '25K'),
      ],
    }),
    frame('Lineup', {
      autoLayout: horizontal({ spacing: 14, padX: 32, padY: 8 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        stageColumn('Main Stage', '#7c3aed', '#6d28d9', [
          artistCard('Aurora Skies', '8:00 PM', 'Pop', '#ec4899'),
          artistCard('The Drift', '6:30 PM', 'Rock', '#f59e0b'),
          artistCard('Midnight Echo', '5:00 PM', 'Indie', '#3b82f6'),
        ]),
        stageColumn('Electric Tent', '#ec4899', '#be185d', [
          artistCard('DJ Pulse', '9:00 PM', 'EDM', '#22c55e'),
          artistCard('Bass Theory', '7:00 PM', 'DnB', '#a855f7'),
          artistCard('Synthwave Kid', '5:30 PM', 'Synth', '#06b6d4'),
        ]),
        stageColumn('Acoustic Grove', '#f59e0b', '#d97706', [
          artistCard('Willow Creek', '7:30 PM', 'Folk', '#16a34a'),
          artistCard('Cedar & Stone', '6:00 PM', 'Blues', '#dc2626'),
          artistCard('Lana Moon', '4:30 PM', 'Jazz', '#8b5cf6'),
        ]),
        stageColumn('Discovery', '#3b82f6', '#2563eb', [
          artistCard('Neon Nomad', '8:30 PM', 'Alt', '#f97316'),
          artistCard('Glass Animals II', '6:45 PM', 'Psych', '#14b8a6'),
          artistCard('Rookie Waves', '5:15 PM', 'Indie', '#eab308'),
        ]),
      ],
    }),
  ],
});
