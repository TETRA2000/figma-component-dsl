import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Japanese electronic/city pop label — Neon gradients, album art grid, dark theme
const dark = '#0a0a14'; const surface = '#141420'; const white = '#e8e8f0'; const med = '#6a6a80';
const neonPink = '#ff4488'; const neonCyan = '#00e8ff'; const neonPurple = '#aa44ff';

function albumCard(title: string, artist: string, year: string, g1: string, g2: string) {
  return frame(`Album: ${title}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 200, y: undefined }, cornerRadius: 4, clipContent: true,
    fills: [solid(surface)],
    children: [
      rectangle('AlbumArt', { size: { x: 200, y: 200 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('AlbumInfo', { autoLayout: vertical({ spacing: 2, padX: 12, padY: 10 }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 13, fontWeight: 600, color: white }),
        text(artist, { fontSize: 11, fontWeight: 400, color: med }),
        text(year, { fontSize: 10, fontWeight: 400, color: neonPink }),
      ]}),
    ],
  });
}

function trackRow(num: string, title: string, duration: string) {
  return frame(`Track: ${title}`, {
    autoLayout: horizontal({ spacing: 12, padX: 14, padY: 8, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.04 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('TrackLeft', { autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }), children: [
        text(num, { fontSize: 11, fontWeight: 400, color: med }),
        text(title, { fontSize: 13, fontWeight: 400, color: white }),
      ]}),
      text(duration, { fontSize: 11, fontWeight: 400, color: med }),
    ],
  });
}

export default frame('MusicLabel', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(dark)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(surface)],
      children: [
        text('NIGHT CITY RECORDS', { fontSize: 14, fontWeight: 700, color: neonCyan, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('Releases', { fontSize: 12, fontWeight: 500, color: white }),
          text('Artists', { fontSize: 12, fontWeight: 400, color: med }),
          text('Events', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('FeaturedRelease', {
      autoLayout: horizontal({ padX: 48, padY: 32, spacing: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#0a0a14', position: 0 }, { hex: '#1a0a28', position: 0.5 }, { hex: '#0a1428', position: 1 }], 135)],
      children: [
        rectangle('FeaturedArt', { size: { x: 320, y: 320 },
          fills: [gradient([{ hex: '#ff4488', position: 0 }, { hex: '#aa44ff', position: 0.5 }, { hex: '#00e8ff', position: 1 }], 135)], cornerRadius: 4 }),
        frame('FeaturedInfo', { autoLayout: vertical({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
          text('NEW RELEASE', { fontSize: 10, fontWeight: 600, color: neonPink, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
          text('Midnight Boulevard', { fontSize: 28, fontWeight: 300, color: white }),
          text('Neon Tanaka', { fontSize: 14, fontWeight: 400, color: neonCyan }),
          frame('Tracklist', { autoLayout: vertical({ spacing: 0 }), layoutSizingHorizontal: 'FILL', children: [
            trackRow('01', 'Shibuya After Dark', '4:32'),
            trackRow('02', 'Neon Dreams', '3:58'),
            trackRow('03', 'City Pop Revival', '5:11'),
            trackRow('04', 'Rooftop Sunset', '4:45'),
            trackRow('05', 'Last Train Home', '6:22'),
          ]}),
        ]}),
      ],
    }),
    frame('ReleasesSection', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 28 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Latest Releases', { fontSize: 16, fontWeight: 600, color: white }),
        frame('AlbumGrid', { autoLayout: horizontal({ spacing: 14 }), children: [
          albumCard('Electric Sakura', 'Yuki Synthesis', '2026', '#ff4488', '#aa44ff'),
          albumCard('Tokyo Drift FM', 'DJ Harajuku', '2026', '#00e8ff', '#0060aa'),
          albumCard('Analog Summer', 'Retro Wave Co.', '2025', '#ff8844', '#ff4488'),
          albumCard('Crystal Rain', 'MIKU.exe', '2026', '#aa44ff', '#00e8ff'),
          albumCard('Pacific Coast', 'Sunset Riders', '2025', '#44aaff', '#00e8ff'),
          albumCard('Ghost Signal', 'Binary Club', '2026', '#ff4488', '#440044'),
        ]}),
      ],
    }),
  ],
});
