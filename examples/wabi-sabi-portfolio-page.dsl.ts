import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: 2026 Wabi-Sabi trend — Muted earth tones, asymmetric layout, generous negative space
const stone = '#b0a898'; const dark = '#3a3430'; const white = '#faf8f4'; const cream = '#f0ebe0';
const med = '#8a8078'; const warmGray = '#c8c0b4';

export default frame('WabiSabiPortfolio', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(white)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 120, padY: 28, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('YUKI TANAKA', { fontSize: 13, fontWeight: 300, color: dark, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        text('Portfolio', { fontSize: 12, fontWeight: 300, color: med }),
      ],
    }),
    frame('HeroSection', {
      autoLayout: vertical({ spacing: 20, padX: 120, padY: 100 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Finding beauty\nin imperfection', { fontSize: 52, fontWeight: 200, color: dark, lineHeight: { value: 62, unit: 'PIXELS' as const } }),
        rectangle('Accent', { size: { x: 40, y: 1 }, fills: [solid(stone, 0.4)] }),
        text('Visual designer exploring the intersection of tradition and digital craft', { fontSize: 15, fontWeight: 300, color: med }),
      ],
    }),
    frame('WorkSection', {
      autoLayout: vertical({ spacing: 48, padX: 120, padY: 60 }), layoutSizingHorizontal: 'FILL', fills: [solid(cream)],
      children: [
        text('Selected work', { fontSize: 13, fontWeight: 300, color: med, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        frame('Work1', { autoLayout: horizontal({ spacing: 48, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
          rectangle('Img1', { size: { x: 520, y: 360 }, fills: [gradient([{ hex: '#b0a898', position: 0 }, { hex: '#d0c8b8', position: 1 }], 135)], cornerRadius: 2 }),
          frame('Work1Text', { autoLayout: vertical({ spacing: 10 }), layoutSizingHorizontal: 'FILL', children: [
            text('01', { fontSize: 48, fontWeight: 200, color: warmGray }),
            text('Ceramic Traditions', { fontSize: 22, fontWeight: 300, color: dark }),
            text('A photographic study of Bizen pottery, capturing the unpredictable beauty of wood-fired kilns and natural ash glaze.', { fontSize: 13, fontWeight: 300, color: med, size: { x: 350 }, textAutoResize: 'HEIGHT' as const }),
          ]}),
        ]}),
        frame('Work2', { autoLayout: horizontal({ spacing: 48, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
          frame('Work2Text', { autoLayout: vertical({ spacing: 10 }), layoutSizingHorizontal: 'FILL', children: [
            text('02', { fontSize: 48, fontWeight: 200, color: warmGray }),
            text('Weathered Surfaces', { fontSize: 22, fontWeight: 300, color: dark }),
            text('Documenting the patina of time on urban materials — rust, moss, aged wood — finding art in decay.', { fontSize: 13, fontWeight: 300, color: med, size: { x: 350 }, textAutoResize: 'HEIGHT' as const }),
          ]}),
          rectangle('Img2', { size: { x: 520, y: 360 }, fills: [gradient([{ hex: '#8a8078', position: 0 }, { hex: '#c8c0b4', position: 1 }], 135)], cornerRadius: 2 }),
        ]}),
      ],
    }),
    frame('QuoteSection', {
      autoLayout: vertical({ spacing: 16, padX: 200, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('Q1', { size: { x: 30, y: 1 }, fills: [solid(stone, 0.3)] }),
        text('Nothing lasts, nothing is finished, nothing is perfect.', { fontSize: 22, fontWeight: 200, color: dark, lineHeight: { value: 34, unit: 'PIXELS' as const } }),
        text('— Richard Powell', { fontSize: 12, fontWeight: 300, color: med }),
        rectangle('Q2', { size: { x: 30, y: 1 }, fills: [solid(stone, 0.3)] }),
      ],
    }),
  ],
});
