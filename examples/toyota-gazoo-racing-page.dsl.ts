import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: toyota-gazoo.com — Racing red/black, performance stats, dynamic feel
const racingRed = '#eb0a1e'; const black = '#0a0a0a'; const white = '#f0f0f0'; const silver = '#c0c0c0';
const med = '#707070'; const darkGray = '#1e1e1e';

function statCard(label: string, value: string, unit: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 2, padX: 20, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid(darkGray)], cornerRadius: 4, size: { x: 180, y: undefined },
    strokes: [{ color: { r: 0.92, g: 0.04, b: 0.12, a: 0.2 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('ValueRow', { autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }), children: [
        text(value, { fontSize: 32, fontWeight: 800, color: white }),
        text(unit, { fontSize: 14, fontWeight: 400, color: racingRed }),
      ]}),
      text(label, { fontSize: 11, fontWeight: 400, color: med }),
    ],
  });
}

export default frame('ToyotaGazooRacing', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(black)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(darkGray)],
      children: [
        frame('Logo', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
          text('TOYOTA', { fontSize: 14, fontWeight: 800, color: white, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
          text('GAZOO RACING', { fontSize: 14, fontWeight: 800, color: racingRed, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        ]}),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('GR Models', { fontSize: 12, fontWeight: 500, color: white }),
          text('Motorsport', { fontSize: 12, fontWeight: 400, color: med }),
          text('Drivers', { fontSize: 12, fontWeight: 400, color: med }),
          text('Heritage', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('HeroBanner', {
      autoLayout: vertical({ spacing: 20, padX: 48, padY: 60 }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#0a0a0a', position: 0 }, { hex: '#1e0a0a', position: 0.3 }, { hex: '#2a0a0a', position: 0.6 }, { hex: '#0a0a0a', position: 1 }], 135)],
      children: [
        text('GR SUPRA', { fontSize: 12, fontWeight: 700, color: racingRed, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        text('Born at the\nNurburgring', { fontSize: 52, fontWeight: 900, color: white, lineHeight: { value: 56, unit: 'PIXELS' as const } }),
        rectangle('RedAccent', { size: { x: 60, y: 4 }, fills: [solid(racingRed)] }),
        text('The legendary nameplate returns. Engineered for driving pleasure.', { fontSize: 15, fontWeight: 400, color: silver }),
        frame('HeroStats', { autoLayout: horizontal({ spacing: 12 }), children: [
          statCard('Power', '387', 'PS'),
          statCard('0-100', '3.9', 'sec'),
          statCard('Top Speed', '250', 'km/h'),
          statCard('Engine', '3.0L', 'I6'),
        ]}),
      ],
    }),
    frame('GRLineup', {
      autoLayout: vertical({ spacing: 20, padX: 48, padY: 32 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('GR LINEUP', { fontSize: 14, fontWeight: 700, color: white, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        frame('LineupRow', { autoLayout: horizontal({ spacing: 14 }), children: [
          frame('Car1', { autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }), size: { x: 260, y: undefined }, fills: [solid(darkGray)], cornerRadius: 4, children: [
            rectangle('Car1Img', { size: { x: 228, y: 140 }, fills: [gradient([{ hex: '#eb0a1e', position: 0 }, { hex: '#8a0000', position: 1 }], 135)], cornerRadius: 2 }),
            text('GR SUPRA', { fontSize: 15, fontWeight: 700, color: white }),
            text('From ¥7,313,000', { fontSize: 12, fontWeight: 400, color: racingRed }),
          ]}),
          frame('Car2', { autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }), size: { x: 260, y: undefined }, fills: [solid(darkGray)], cornerRadius: 4, children: [
            rectangle('Car2Img', { size: { x: 228, y: 140 }, fills: [gradient([{ hex: '#f0f0f0', position: 0 }, { hex: '#b0b0b0', position: 1 }], 135)], cornerRadius: 2 }),
            text('GR86', { fontSize: 15, fontWeight: 700, color: white }),
            text('From ¥3,038,000', { fontSize: 12, fontWeight: 400, color: racingRed }),
          ]}),
          frame('Car3', { autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }), size: { x: 260, y: undefined }, fills: [solid(darkGray)], cornerRadius: 4, children: [
            rectangle('Car3Img', { size: { x: 228, y: 140 }, fills: [gradient([{ hex: '#1a2a3a', position: 0 }, { hex: '#2a3a4a', position: 1 }], 135)], cornerRadius: 2 }),
            text('GR YARIS', { fontSize: 15, fontWeight: 700, color: white }),
            text('From ¥4,560,000', { fontSize: 12, fontWeight: 400, color: racingRed }),
          ]}),
          frame('Car4', { autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }), size: { x: 260, y: undefined }, fills: [solid(darkGray)], cornerRadius: 4, children: [
            rectangle('Car4Img', { size: { x: 228, y: 140 }, fills: [gradient([{ hex: '#2a2a2a', position: 0 }, { hex: '#4a4a4a', position: 1 }], 135)], cornerRadius: 2 }),
            text('GR COROLLA', { fontSize: 15, fontWeight: 700, color: white }),
            text('From ¥5,250,000', { fontSize: 12, fontWeight: 400, color: racingRed }),
          ]}),
        ]}),
      ],
    }),
  ],
});
