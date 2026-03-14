import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Aman Kyoto — Moss green, stone gray, timber brown, luxury zen
const moss = '#5a6e4a'; const stone = '#8a8a80'; const timber = '#6e5a40'; const white = '#f8f8f4';
const dark = '#2a2820'; const med = '#6a6860'; const cream = '#f0ece4';

export default frame('AmanKyoto', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(white)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('AMAN', { fontSize: 18, fontWeight: 300, color: dark, letterSpacing: { value: 10, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('Kyoto', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Experiences', { fontSize: 12, fontWeight: 300, color: med }),
          text('Dining', { fontSize: 12, fontWeight: 300, color: med }),
          text('Wellness', { fontSize: 12, fontWeight: 300, color: med }),
        ]}),
        text('Reserve', { fontSize: 12, fontWeight: 300, color: timber }),
      ],
    }),
    frame('HeroSection', {
      autoLayout: vertical({ spacing: 0 }), layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('HeroImg', { size: { x: 1440, y: 500 },
          fills: [gradient([{ hex: '#3a4a30', position: 0 }, { hex: '#5a6e4a', position: 0.3 }, { hex: '#8a9878', position: 0.6 }, { hex: '#c4ceb8', position: 1 }], 160)] }),
        frame('HeroOverlay', {
          autoLayout: vertical({ spacing: 12, padX: 80, padY: 40 }), layoutSizingHorizontal: 'FILL', fills: [solid(cream)],
          children: [
            text('AMAN KYOTO', { fontSize: 11, fontWeight: 400, color: timber, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
            text('A sanctuary within a secret garden', { fontSize: 36, fontWeight: 200, color: dark }),
            text('Hidden among the forested hills of Kyoto, where ancient cedar trees and moss-covered pathways lead to a world of profound tranquility.', { fontSize: 14, fontWeight: 300, color: med, size: { x: 600 }, textAutoResize: 'HEIGHT' as const }),
          ],
        }),
      ],
    }),
    frame('ExperienceSection', {
      autoLayout: horizontal({ padX: 80, padY: 60, spacing: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('ExpLeft', { autoLayout: vertical({ spacing: 24 }), layoutSizingHorizontal: 'FILL', children: [
          frame('Exp1', { autoLayout: vertical({ spacing: 8 }), children: [
            rectangle('ExpImg1', { size: { x: 340, y: 220 }, fills: [gradient([{ hex: '#5a6e4a', position: 0 }, { hex: '#8a9878', position: 1 }], 135)], cornerRadius: 2 }),
            text('Living Pavilions', { fontSize: 18, fontWeight: 300, color: dark }),
            text('Timber and glass pavilions set among centuries-old trees', { fontSize: 12, fontWeight: 300, color: med }),
          ]}),
          frame('Exp2', { autoLayout: vertical({ spacing: 8 }), children: [
            rectangle('ExpImg2', { size: { x: 340, y: 220 }, fills: [gradient([{ hex: '#6e5a40', position: 0 }, { hex: '#a08860', position: 1 }], 135)], cornerRadius: 2 }),
            text('Aman Spa', { fontSize: 18, fontWeight: 300, color: dark }),
            text('Traditional Japanese healing rituals and onsen bathing', { fontSize: 12, fontWeight: 300, color: med }),
          ]}),
        ]}),
        frame('ExpRight', { autoLayout: vertical({ spacing: 24, padY: 80 }), layoutSizingHorizontal: 'FILL', children: [
          frame('Exp3', { autoLayout: vertical({ spacing: 8 }), children: [
            rectangle('ExpImg3', { size: { x: 340, y: 220 }, fills: [gradient([{ hex: '#8a8a80', position: 0 }, { hex: '#b0b0a8', position: 1 }], 135)], cornerRadius: 2 }),
            text('Kaiseki Dining', { fontSize: 18, fontWeight: 300, color: dark }),
            text('Multi-course Japanese cuisine celebrating seasonal ingredients', { fontSize: 12, fontWeight: 300, color: med }),
          ]}),
          frame('Exp4', { autoLayout: vertical({ spacing: 8 }), children: [
            rectangle('ExpImg4', { size: { x: 340, y: 220 }, fills: [gradient([{ hex: '#4a5a3a', position: 0 }, { hex: '#7a8a6a', position: 1 }], 135)], cornerRadius: 2 }),
            text('Garden Walks', { fontSize: 18, fontWeight: 300, color: dark }),
            text('Moss gardens, stone pathways, and ancient maple groves', { fontSize: 12, fontWeight: 300, color: med }),
          ]}),
        ]}),
      ],
    }),
    frame('QuoteSection', {
      autoLayout: vertical({ spacing: 16, padX: 200, padY: 60, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(cream)],
      children: [
        rectangle('QuoteMark', { size: { x: 40, y: 2 }, fills: [solid(moss, 0.3)] }),
        text('In this hidden enclave, nature is the architecture and silence is the luxury.', { fontSize: 20, fontWeight: 200, color: dark, size: { x: 600 }, textAutoResize: 'HEIGHT' as const, lineHeight: { value: 32, unit: 'PIXELS' as const } }),
        rectangle('QuoteEnd', { size: { x: 40, y: 2 }, fills: [solid(moss, 0.3)] }),
      ],
    }),
  ],
});
