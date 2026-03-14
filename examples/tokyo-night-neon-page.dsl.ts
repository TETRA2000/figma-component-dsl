import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Shibuya/Akihabara — Electric blue, neon pink, dark background, cyberpunk
const neonPink = '#ff2d78'; const neonBlue = '#00d4ff'; const neonPurple = '#bf5af2';
const dark = '#0a0a14'; const darkSurface = '#141428'; const white = '#f0f0ff';
const med = '#6a6a8a'; const dimBlue = '#2a2a4a';

function spotCard(name: string, area: string, desc: string, accent: string) {
  return frame(`Spot: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 18, padY: 16 }), size: { x: 260, y: undefined },
    fills: [solid(darkSurface)], cornerRadius: 8,
    strokes: [{ color: { r: 0, g: 0.83, b: 1, a: 0.15 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('SpotAccent', { autoLayout: horizontal({ padX: 10, padY: 3 }), fills: [solid(accent, 0.15)], cornerRadius: 9999,
        children: [text(area, { fontSize: 10, fontWeight: 600, color: accent, letterSpacing: { value: 1, unit: 'PIXELS' as const } })] }),
      text(name, { fontSize: 16, fontWeight: 600, color: white }),
      text(desc, { fontSize: 12, fontWeight: 400, color: med }),
    ],
  });
}

export default frame('TokyoNightNeon', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(dark)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(darkSurface)],
      children: [
        text('TOKYO NIGHTS', { fontSize: 16, fontWeight: 700, color: neonPink, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('Explore', { fontSize: 12, fontWeight: 500, color: neonBlue }),
          text('Events', { fontSize: 12, fontWeight: 400, color: med }),
          text('Food', { fontSize: 12, fontWeight: 400, color: med }),
          text('Nightlife', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 20, padX: 48, padY: 72 }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#0a0a14', position: 0 }, { hex: '#1a0a28', position: 0.3 }, { hex: '#2a1040', position: 0.6 }, { hex: '#0a0a14', position: 1 }], 135)],
      children: [
        text('AFTER DARK', { fontSize: 11, fontWeight: 600, color: neonBlue, letterSpacing: { value: 8, unit: 'PIXELS' as const } }),
        text('The city that\nnever sleeps', { fontSize: 56, fontWeight: 800, color: white, lineHeight: { value: 60, unit: 'PIXELS' as const } }),
        text('Neon lights, hidden bars, late-night ramen, and the electric pulse of 14 million stories', { fontSize: 15, fontWeight: 400, color: med }),
        frame('HeroCTA', { autoLayout: horizontal({ padX: 20, padY: 10 }),
          fills: [gradient([{ hex: '#ff2d78', position: 0 }, { hex: '#bf5af2', position: 1 }], 90)],
          cornerRadius: 9999,
          children: [text('START EXPLORING', { fontSize: 12, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' as const } })] }),
      ],
    }),
    frame('SpotsSection', {
      autoLayout: vertical({ spacing: 20, padX: 48, padY: 40 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('TONIGHT\'S PICKS', { fontSize: 12, fontWeight: 600, color: neonPink, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        frame('SpotGrid', { autoLayout: horizontal({ spacing: 14 }), children: [
          spotCard('Golden Gai', 'SHINJUKU', 'Over 200 tiny bars squeezed into six alleys', neonPink),
          spotCard('Robot Restaurant', 'KABUKICHO', 'Laser-lit spectacle of mechanical dancers', neonBlue),
          spotCard('Omoide Yokocho', 'SHINJUKU', 'Smoky yakitori stalls under the train tracks', neonPurple),
          spotCard('Nonbei Yokocho', 'SHIBUYA', 'Drunkard alley — intimate sake bars from the 1950s', neonPink),
          spotCard('Akihabara Arcades', 'AKIHABARA', 'Multi-floor gaming palaces glowing until 5am', neonBlue),
        ]}),
      ],
    }),
    frame('EventsBanner', {
      autoLayout: horizontal({ padX: 48, padY: 32, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#ff2d78', position: 0 }, { hex: '#bf5af2', position: 0.5 }, { hex: '#00d4ff', position: 1 }], 90)],
      children: [
        frame('EventText', { autoLayout: vertical({ spacing: 4 }), children: [
          text('THIS WEEKEND', { fontSize: 11, fontWeight: 700, color: white, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
          text('Shibuya Night Market', { fontSize: 24, fontWeight: 700, color: white }),
        ]}),
        frame('EventCTA', { autoLayout: horizontal({ padX: 20, padY: 8 }), fills: [solid(white)], cornerRadius: 9999,
          children: [text('GET TICKETS', { fontSize: 12, fontWeight: 700, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' as const } })] }),
      ],
    }),
  ],
});
