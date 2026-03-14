import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: 2026 PANTONE colors — Teal (#008080) + Cloud Dancer near-white, modern clean
const teal = '#008080'; const cloudDancer = '#f8f4f0'; const dark = '#1a2a2a'; const white = '#ffffff';
const med = '#5a7070'; const lightTeal = '#b0d8d8'; const deepTeal = '#004d4d';

export default frame('TealCloudDancer', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(cloudDancer)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('PALETTE', { fontSize: 16, fontWeight: 600, color: teal, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('2026 Trends', { fontSize: 12, fontWeight: 500, color: dark }),
          text('Colors', { fontSize: 12, fontWeight: 400, color: med }),
          text('Gallery', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#004d4d', position: 0 }, { hex: '#008080', position: 0.5 }, { hex: '#40b0b0', position: 1 }], 135)],
      children: [
        text('COLOR OF THE YEAR', { fontSize: 11, fontWeight: 500, color: lightTeal, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        text('Teal', { fontSize: 72, fontWeight: 200, color: white, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        text('A timeless shade bridging natural calm and digital confidence', { fontSize: 15, fontWeight: 300, color: lightTeal }),
        rectangle('HeroDivider', { size: { x: 60, y: 2 }, fills: [solid(white, 0.3)] }),
      ],
    }),
    frame('ColorPalette', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('The 2026 Palette', { fontSize: 22, fontWeight: 300, color: dark }),
        frame('SwatchRow', { autoLayout: horizontal({ spacing: 12 }), children: [
          frame('Swatch1', { autoLayout: vertical({ spacing: 8 }), children: [
            rectangle('S1', { size: { x: 160, y: 120 }, fills: [solid(deepTeal)], cornerRadius: 8 }),
            text('Deep Teal', { fontSize: 12, fontWeight: 400, color: dark }),
            text('#004D4D', { fontSize: 10, fontWeight: 400, color: med }),
          ]}),
          frame('Swatch2', { autoLayout: vertical({ spacing: 8 }), children: [
            rectangle('S2', { size: { x: 160, y: 120 }, fills: [solid(teal)], cornerRadius: 8 }),
            text('Teal', { fontSize: 12, fontWeight: 400, color: dark }),
            text('#008080', { fontSize: 10, fontWeight: 400, color: med }),
          ]}),
          frame('Swatch3', { autoLayout: vertical({ spacing: 8 }), children: [
            rectangle('S3', { size: { x: 160, y: 120 }, fills: [solid(lightTeal)], cornerRadius: 8 }),
            text('Light Teal', { fontSize: 12, fontWeight: 400, color: dark }),
            text('#B0D8D8', { fontSize: 10, fontWeight: 400, color: med }),
          ]}),
          frame('Swatch4', { autoLayout: vertical({ spacing: 8 }), children: [
            rectangle('S4', { size: { x: 160, y: 120 }, fills: [solid(cloudDancer)], cornerRadius: 8,
              strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.08 }, weight: 1, align: 'INSIDE' as const }] }),
            text('Cloud Dancer', { fontSize: 12, fontWeight: 400, color: dark }),
            text('#F8F4F0', { fontSize: 10, fontWeight: 400, color: med }),
          ]}),
          frame('Swatch5', { autoLayout: vertical({ spacing: 8 }), children: [
            rectangle('S5', { size: { x: 160, y: 120 }, fills: [solid('#e8a0b8')], cornerRadius: 8 }),
            text('Heartfelt Pink', { fontSize: 12, fontWeight: 400, color: dark }),
            text('#E8A0B8', { fontSize: 10, fontWeight: 400, color: med }),
          ]}),
        ]}),
      ],
    }),
    frame('ApplicationSection', {
      autoLayout: horizontal({ padX: 80, padY: 48, spacing: 40, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        frame('AppText', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
          text('IN APPLICATION', { fontSize: 11, fontWeight: 400, color: teal, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('Nature meets digital', { fontSize: 26, fontWeight: 300, color: dark }),
          text('Teal sits at the intersection of blue and green — the color of shallow seas and forest canopy shadows. In digital design, it conveys both trustworthiness and freshness.', { fontSize: 13, fontWeight: 300, color: med, size: { x: 400 }, textAutoResize: 'HEIGHT' as const }),
        ]}),
        frame('AppCards', { autoLayout: vertical({ spacing: 10 }), size: { x: 400, y: undefined }, children: [
          frame('AppCard1', { autoLayout: horizontal({ spacing: 12, padX: 16, padY: 14, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', fills: [solid(teal, 0.06)], cornerRadius: 8, children: [
            ellipse('A1', { size: { x: 32, y: 32 }, fills: [solid(teal, 0.15)] }),
            frame('A1Text', { autoLayout: vertical({ spacing: 2 }), children: [
              text('UI Design', { fontSize: 13, fontWeight: 500, color: dark }),
              text('Primary buttons, links, focus states', { fontSize: 11, fontWeight: 300, color: med }),
            ]}),
          ]}),
          frame('AppCard2', { autoLayout: horizontal({ spacing: 12, padX: 16, padY: 14, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', fills: [solid(teal, 0.06)], cornerRadius: 8, children: [
            ellipse('A2', { size: { x: 32, y: 32 }, fills: [solid(teal, 0.15)] }),
            frame('A2Text', { autoLayout: vertical({ spacing: 2 }), children: [
              text('Branding', { fontSize: 13, fontWeight: 500, color: dark }),
              text('Healthcare, wellness, sustainability sectors', { fontSize: 11, fontWeight: 300, color: med }),
            ]}),
          ]}),
          frame('AppCard3', { autoLayout: horizontal({ spacing: 12, padX: 16, padY: 14, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', fills: [solid(teal, 0.06)], cornerRadius: 8, children: [
            ellipse('A3', { size: { x: 32, y: 32 }, fills: [solid(teal, 0.15)] }),
            frame('A3Text', { autoLayout: vertical({ spacing: 2 }), children: [
              text('Interior', { fontSize: 13, fontWeight: 500, color: dark }),
              text('Accent walls, textiles, ceramics', { fontSize: 11, fontWeight: 300, color: med }),
            ]}),
          ]}),
        ]}),
      ],
    }),
  ],
});
