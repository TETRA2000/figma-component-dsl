/**
 * Music Festival — Festival lineup with stage columns, artist cards, and schedule grid
 * DSL features: dark theme, gradient artist cards, cornerRadius, ellipse for time dots,
 * FILL layout, clipContent, textDecoration for links, opacity for secondary info
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function artistCard(name: string, genre: string, time: string, gradFrom: string, gradTo: string, headliner: boolean) {
  return frame(`Artist: ${name}`, {
    autoLayout: horizontal({ spacing: 12, padX: 14, padY: 12, counterAlign: 'CENTER' }),
    fills: [solid('#1e1e2e')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    strokes: headliner
      ? [{ color: { r: 1, g: 0.84, b: 0, a: 0.6 }, weight: 1.5, align: 'INSIDE' as const }]
      : [{ color: { r: 1, g: 1, b: 1, a: 0.08 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('ArtistImg', {
        size: { x: 48, y: 48 },
        fills: [gradient([{ hex: gradFrom, position: 0 }, { hex: gradTo, position: 1 }], 135)],
        cornerRadius: 8,
      }),
      frame('ArtistInfo', {
        autoLayout: vertical({ spacing: 3 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('ArtistNameRow', {
            autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
            children: [
              text(name, { fontSize: 14, fontWeight: headliner ? 700 : 500, color: '#ffffff' }),
              ...(headliner ? [frame('HeadlinerBadge', {
                autoLayout: horizontal({ spacing: 0, padX: 6, padY: 2 }),
                fills: [gradient([{ hex: '#f59e0b', position: 0 }, { hex: '#eab308', position: 1 }], 90)],
                cornerRadius: 4,
                children: [text('HEADLINER', { fontSize: 8, fontWeight: 800, color: '#000000' })],
              })] : []),
            ],
          }),
          text(genre, { fontSize: 11, fontWeight: 400, color: '#a78bfa', opacity: 0.8 }),
        ],
      }),
      text(time, { fontSize: 12, fontWeight: 600, color: '#d1d5db' }),
    ],
  });
}

function stageColumn(stageName: string, stageColor: string, artists: ReturnType<typeof artistCard>[]) {
  return frame(`Stage: ${stageName}`, {
    autoLayout: vertical({ spacing: 8, padX: 8, padY: 8 }),
    fills: [solid('#13132b')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('StageLabel', {
        autoLayout: horizontal({ spacing: 8, padX: 10, padY: 8, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          ellipse('StageDot', { size: { x: 10, y: 10 }, fills: [solid(stageColor)] }),
          text(stageName, { fontSize: 14, fontWeight: 700, color: stageColor }),
        ],
      }),
      ...artists,
    ],
  });
}

function dayTab(label: string, date: string, active: boolean) {
  return frame(`Tab: ${label}`, {
    autoLayout: vertical({ spacing: 2, padX: 20, padY: 10, counterAlign: 'CENTER' }),
    fills: [solid(active ? '#7c3aed' : '#1e1e2e')],
    cornerRadius: 8,
    children: [
      text(label, { fontSize: 14, fontWeight: 700, color: active ? '#ffffff' : '#a78bfa' }),
      text(date, { fontSize: 11, fontWeight: 400, color: active ? '#ffffffcc' : '#6b7280' }),
    ],
  });
}

export default frame('MusicFestivalPage', {
  size: { x: 1200 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0a0a1a')],
  children: [
    // Hero header
    frame('FestivalHero', {
      autoLayout: vertical({ spacing: 12, padX: 48, padY: 40, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#1a0a2e', position: 0 }, { hex: '#4c1d95', position: 0.4 }, { hex: '#7c3aed', position: 0.7 }, { hex: '#0a0a1a', position: 1 }], 180)],
      children: [
        text('SOUNDWAVE', { fontSize: 14, fontWeight: 800, color: '#a78bfa', letterSpacing: { value: 30, unit: 'PERCENT' } }),
        text('Festival 2026', { fontSize: 48, fontWeight: 900, color: '#ffffff', lineHeight: { value: 100, unit: 'PERCENT' } }),
        text('July 18-20 | Riverside Park, Austin TX', { fontSize: 16, fontWeight: 400, color: '#ffffffaa' }),
        frame('HeroActions', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            frame('TicketsBtn', {
              autoLayout: horizontal({ spacing: 0, padX: 28, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#a78bfa', position: 1 }], 90)],
              cornerRadius: 9999,
              children: [text('Get Tickets', { fontSize: 14, fontWeight: 700, color: '#ffffff' })],
            }),
            frame('LineupBtn', {
              autoLayout: horizontal({ spacing: 0, padX: 28, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#ffffff14')],
              cornerRadius: 9999,
              strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.2 }, weight: 1, align: 'INSIDE' as const }],
              children: [text('Full Lineup', { fontSize: 14, fontWeight: 600, color: '#ffffff', textDecoration: 'UNDERLINE' })],
            }),
          ],
        }),
      ],
    }),
    // Day tabs
    frame('DayTabs', {
      autoLayout: horizontal({ spacing: 10, padX: 48, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        dayTab('Friday', 'Jul 18', false),
        dayTab('Saturday', 'Jul 19', true),
        dayTab('Sunday', 'Jul 20', false),
      ],
    }),
    // Schedule grid - stage columns
    frame('ScheduleGrid', {
      autoLayout: horizontal({ spacing: 16, padX: 48, padY: 8 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        stageColumn('MAIN STAGE', '#ef4444', [
          artistCard('The Midnight', 'Synthwave', '4:00 PM', '#ff6b6b', '#ee5a24', false),
          artistCard('Glass Animals', 'Indie Pop', '5:30 PM', '#1abc9c', '#3498db', false),
          artistCard('Tame Impala', 'Psych Rock', '7:30 PM', '#9b59b6', '#8e44ad', true),
          artistCard('Daft Punk', 'Electronic', '9:30 PM', '#f1c40f', '#e67e22', true),
        ]),
        stageColumn('THUNDER DOME', '#3b82f6', [
          artistCard('Bonobo', 'Downtempo', '3:00 PM', '#2ecc71', '#27ae60', false),
          artistCard('Tycho', 'Ambient', '5:00 PM', '#3498db', '#2980b9', false),
          artistCard('ODESZA', 'Electronic', '7:00 PM', '#e74c3c', '#c0392b', true),
          artistCard('Rufus Du Sol', 'Dance', '9:00 PM', '#e84393', '#fd79a8', false),
        ]),
        stageColumn('SUNSET GROVE', '#10b981', [
          artistCard('Khruangbin', 'World Funk', '3:30 PM', '#f39c12', '#d35400', false),
          artistCard('Mac DeMarco', 'Indie Rock', '5:30 PM', '#1abc9c', '#16a085', false),
          artistCard('Parcels', 'Disco Pop', '7:30 PM', '#a78bfa', '#7c3aed', false),
          artistCard('Nils Frahm', 'Neo-Classical', '9:30 PM', '#636e72', '#2d3436', false),
        ]),
      ],
    }),
  ],
});
