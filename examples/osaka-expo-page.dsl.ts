import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: expo2025.or.jp — Circular motifs, blue/red national colors, futuristic minimal
const blue = '#003da5'; const red = '#e60012'; const white = '#ffffff'; const dark = '#1a1a2a';
const med = '#666680'; const lightBlue = '#c0d0f0'; const bg = '#f0f4fa';

function pavilionCard(name: string, country: string, theme: string, accent: string) {
  return frame(`Pavilion: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 18, padY: 16, counterAlign: 'CENTER' }), size: { x: 220, y: undefined },
    fills: [solid(white)], cornerRadius: 12,
    children: [
      ellipse('PavilionIcon', { size: { x: 60, y: 60 }, fills: [solid(accent, 0.12)],
        strokes: [{ color: { r: 0, g: 0.24, b: 0.65, a: 0.15 }, weight: 1, align: 'INSIDE' as const }] }),
      text(country, { fontSize: 10, fontWeight: 500, color: accent, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
      text(name, { fontSize: 14, fontWeight: 500, color: dark }),
      text(theme, { fontSize: 11, fontWeight: 400, color: med }),
    ],
  });
}

export default frame('OsakaExpo', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        frame('Logo', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
          ellipse('LogoCircle', { size: { x: 28, y: 28 }, fills: [solid(red)] }),
          text('EXPO 2025 OSAKA', { fontSize: 14, fontWeight: 700, color: blue, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        ]}),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('Pavilions', { fontSize: 12, fontWeight: 500, color: dark }),
          text('Events', { fontSize: 12, fontWeight: 400, color: med }),
          text('Tickets', { fontSize: 12, fontWeight: 400, color: med }),
          text('Access', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 20, padX: 60, padY: 64, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#003da5', position: 0 }, { hex: '#0050c8', position: 0.5 }, { hex: '#4080e0', position: 1 }], 135)],
      children: [
        frame('HeroCircles', { autoLayout: horizontal({ spacing: -10, counterAlign: 'CENTER' }), children: [
          ellipse('C1', { size: { x: 40, y: 40 }, fills: [solid(red, 0.4)] }),
          ellipse('C2', { size: { x: 40, y: 40 }, fills: [solid(white, 0.2)] }),
          ellipse('C3', { size: { x: 40, y: 40 }, fills: [solid(red, 0.3)] }),
          ellipse('C4', { size: { x: 40, y: 40 }, fills: [solid(white, 0.15)] }),
          ellipse('C5', { size: { x: 40, y: 40 }, fills: [solid(red, 0.25)] }),
        ]}),
        text('Designing Future Society\nfor Our Lives', { fontSize: 40, fontWeight: 300, color: white, lineHeight: { value: 48, unit: 'PIXELS' as const } }),
        text('April 13 — October 13, 2025 | Yumeshima, Osaka', { fontSize: 14, fontWeight: 400, color: lightBlue }),
        frame('TicketCTA', { autoLayout: horizontal({ padX: 24, padY: 10 }), fills: [solid(red)], cornerRadius: 9999,
          children: [text('GET TICKETS', { fontSize: 12, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' as const } })] }),
      ],
    }),
    frame('PavilionsSection', {
      autoLayout: vertical({ spacing: 20, padX: 60, padY: 40 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Featured Pavilions', { fontSize: 22, fontWeight: 400, color: dark }),
        frame('PavilionGrid', { autoLayout: horizontal({ spacing: 14 }), children: [
          pavilionCard('Japan Pavilion', 'JAPAN', 'Life meets life — biodiversity and technology', red),
          pavilionCard('Future City', 'INTERNATIONAL', 'Smart urban living and sustainable design', blue),
          pavilionCard('Ocean Pavilion', 'JAPAN', 'Deep sea exploration and marine innovation', '#0088aa'),
          pavilionCard('Health Pavilion', 'JAPAN', 'Longevity science and wellness technology', '#00aa66'),
          pavilionCard('Space Pavilion', 'INTERNATIONAL', 'Journey to Mars and beyond', '#6644aa'),
        ]}),
      ],
    }),
    frame('InfoBar', {
      autoLayout: horizontal({ padX: 60, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(blue)],
      children: [
        frame('InfoItem1', { autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }), children: [
          text('160+', { fontSize: 28, fontWeight: 700, color: white }),
          text('Countries', { fontSize: 11, fontWeight: 400, color: lightBlue }),
        ]}),
        frame('InfoItem2', { autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }), children: [
          text('28M', { fontSize: 28, fontWeight: 700, color: white }),
          text('Expected Visitors', { fontSize: 11, fontWeight: 400, color: lightBlue }),
        ]}),
        frame('InfoItem3', { autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }), children: [
          text('155ha', { fontSize: 28, fontWeight: 700, color: white }),
          text('Site Area', { fontSize: 11, fontWeight: 400, color: lightBlue }),
        ]}),
        frame('InfoItem4', { autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }), children: [
          text('184', { fontSize: 28, fontWeight: 700, color: white }),
          text('Days', { fontSize: 11, fontWeight: 400, color: lightBlue }),
        ]}),
      ],
    }),
  ],
});
