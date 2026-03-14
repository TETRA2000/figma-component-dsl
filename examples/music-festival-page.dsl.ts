import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const magenta = '#d946ef'; const white = '#ffffff'; const bg = '#0a0a0a'; const surface = '#18181b';
const light = '#fafafa'; const gray = '#a1a1aa'; const dim = '#52525b';

function artistCard(name: string, genre: string, time: string, stage: string, g1: string, g2: string, isHeadliner: boolean) {
  return frame(`Artist: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: isHeadliner ? 380 : 240, y: undefined },
    cornerRadius: 12, clipContent: true, fills: [solid(surface)],
    children: [
      rectangle('ArtistImg', { size: { x: isHeadliner ? 380 : 240, y: isHeadliner ? 260 : 180 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('ArtistInfo', { autoLayout: vertical({ spacing: 4, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL', children: [
        ...(isHeadliner ? [frame('HeadlinerBadge', { autoLayout: horizontal({ padX: 8, padY: 2 }), fills: [solid(magenta)], cornerRadius: 4,
          children: [text('HEADLINER', { fontSize: 10, fontWeight: 700, color: white })] })] : []),
        text(name, { fontSize: isHeadliner ? 20 : 15, fontWeight: 700, color: light }),
        text(genre, { fontSize: 12, fontWeight: 400, color: gray }),
        frame('TimeStage', { autoLayout: horizontal({ spacing: 8 }), children: [
          text(time, { fontSize: 12, fontWeight: 500, color: magenta }),
          text(stage, { fontSize: 12, fontWeight: 400, color: dim }),
        ]}),
      ]}),
    ],
  });
}

function dayTab(label: string, date: string, isActive: boolean) {
  return frame(`Day: ${label}`, {
    autoLayout: vertical({ spacing: 2, padX: 20, padY: 8, counterAlign: 'CENTER' }),
    fills: [solid(isActive ? magenta : surface)], cornerRadius: 8,
    children: [
      text(label, { fontSize: 13, fontWeight: 600, color: isActive ? white : gray }),
      text(date, { fontSize: 11, fontWeight: 400, color: isActive ? '#f0abfc' : dim }),
    ],
  });
}

export default frame('MusicFestival', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(surface)],
      children: [
        text('NEONWAVE', { fontSize: 22, fontWeight: 700, color: magenta, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Lineup', { fontSize: 14, fontWeight: 600, color: magenta }),
          text('Schedule', { fontSize: 14, fontWeight: 400, color: gray }),
          text('Tickets', { fontSize: 14, fontWeight: 400, color: gray }),
          text('Map', { fontSize: 14, fontWeight: 400, color: gray }),
        ]}),
        frame('TicketBtn', { autoLayout: horizontal({ padX: 20, padY: 8 }),
          fills: [gradient([{ hex: '#d946ef', position: 0 }, { hex: '#a855f7', position: 1 }], 90)], cornerRadius: 9999,
          children: [text('Get Tickets', { fontSize: 13, fontWeight: 600, color: white })] }),
      ],
    }),
    frame('HeroBanner', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#2e1065', position: 0 }, { hex: '#581c87', position: 0.3 }, { hex: '#86198f', position: 0.6 }, { hex: '#0a0a0a', position: 1 }], 180)],
      children: [
        text('NEONWAVE 2026', { fontSize: 48, fontWeight: 800, color: light, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        text('July 18-20 · Desert Valley Arena', { fontSize: 16, fontWeight: 400, color: '#d8b4fe' }),
        frame('DayTabs', { autoLayout: horizontal({ spacing: 8 }), children: [
          dayTab('Day 1', 'Fri, Jul 18', true),
          dayTab('Day 2', 'Sat, Jul 19', false),
          dayTab('Day 3', 'Sun, Jul 20', false),
        ]}),
      ],
    }),
    frame('LineupSection', {
      autoLayout: vertical({ spacing: 20, padX: 40, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Friday Lineup', { fontSize: 24, fontWeight: 700, color: light }),
        frame('ArtistRow1', { autoLayout: horizontal({ spacing: 14 }), children: [
          artistCard('Aurora Nexus', 'Electronic / Ambient', '9:00 PM', 'Main Stage', '#d946ef', '#a855f7', true),
          artistCard('Void Echo', 'Synthwave', '7:30 PM', 'Neon Stage', '#3b82f6', '#1d4ed8', false),
          artistCard('Crystal Haze', 'Trance', '6:00 PM', 'Pulse Stage', '#06b6d4', '#0891b2', false),
          artistCard('Dark Matter', 'Techno', '8:00 PM', 'Bass Stage', '#ef4444', '#b91c1c', false),
        ]}),
        frame('ArtistRow2', { autoLayout: horizontal({ spacing: 14 }), children: [
          artistCard('Lunar Phase', 'House', '5:00 PM', 'Main Stage', '#f59e0b', '#d97706', false),
          artistCard('Neon Saints', 'Indie Electronic', '4:00 PM', 'Neon Stage', '#10b981', '#059669', false),
          artistCard('Pulse Driver', 'Drum & Bass', '3:00 PM', 'Pulse Stage', '#ec4899', '#db2777', false),
          artistCard('Zero Gravity', 'Progressive', '11:00 PM', 'Main Stage', '#6366f1', '#4f46e5', true),
        ]}),
      ],
    }),
  ],
});
