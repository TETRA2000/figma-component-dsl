import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Studio Ghibli inspiration — Whimsical forest green, sky blue, warm nostalgic palette
const forest = '#3a6a40'; const skyBlue = '#88c8e8'; const warmYellow = '#f8e8a0'; const dark = '#2a3020';
const white = '#faf8f0'; const med = '#6a7060'; const cream = '#f0ebe0'; const earthBrown = '#8a7a60';

function filmCard(title: string, year: string, desc: string, g1: string, g2: string) {
  return frame(`Film: ${title}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 260, y: undefined }, cornerRadius: 12, clipContent: true,
    fills: [solid(white)],
    children: [
      rectangle('PosterImg', { size: { x: 260, y: 340 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 160)] }),
      frame('FilmInfo', { autoLayout: vertical({ spacing: 4, padX: 16, padY: 14 }), layoutSizingHorizontal: 'FILL', children: [
        text(year, { fontSize: 10, fontWeight: 400, color: forest }),
        text(title, { fontSize: 15, fontWeight: 500, color: dark }),
        text(desc, { fontSize: 11, fontWeight: 400, color: med }),
      ]}),
    ],
  });
}

export default frame('GhibliFanPage', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(cream)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('STUDIO GHIBLI', { fontSize: 16, fontWeight: 500, color: dark, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Films', { fontSize: 12, fontWeight: 500, color: dark }),
          text('Museum', { fontSize: 12, fontWeight: 400, color: med }),
          text('Shop', { fontSize: 12, fontWeight: 400, color: med }),
          text('About', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 60, padY: 64, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#88c8e8', position: 0 }, { hex: '#c0e0f0', position: 0.3 }, { hex: '#f0ebe0', position: 0.6 }, { hex: '#3a6a40', position: 1 }], 180)],
      children: [
        text('A world of wonder', { fontSize: 42, fontWeight: 300, color: white }),
        text('Celebrating the timeless artistry of Japanese animation', { fontSize: 14, fontWeight: 400, color: '#e0f0e0' }),
      ],
    }),
    frame('FilmsSection', {
      autoLayout: vertical({ spacing: 20, padX: 60, padY: 40 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Beloved Films', { fontSize: 22, fontWeight: 300, color: dark }),
        frame('FilmGrid', { autoLayout: horizontal({ spacing: 14 }), children: [
          filmCard('My Neighbor Totoro', '1988', 'Two sisters discover friendly forest spirits in rural Japan', '#3a6a40', '#88c8e8'),
          filmCard('Spirited Away', '2001', 'A girl navigates a world of spirits to save her parents', '#4a3a6a', '#a088c8'),
          filmCard('Princess Mononoke', '1997', 'The clash between nature and industrial civilization', '#2a4a20', '#6a8a50'),
          filmCard('Howl\'s Moving Castle', '2004', 'A young woman and a wizard in a walking castle', '#8a7a60', '#c8b898'),
          filmCard('The Boy and the Heron', '2023', 'A boy enters a fantastical world following a gray heron', '#4a5a6a', '#8898a8'),
        ]}),
      ],
    }),
    frame('QuoteSection', {
      autoLayout: vertical({ spacing: 12, padX: 160, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        ellipse('TotoroIcon', { size: { x: 48, y: 48 }, fills: [solid(forest, 0.12)] }),
        text('Always believe in yourself. Do this and no matter where you are, you will have nothing to fear.', { fontSize: 18, fontWeight: 300, color: dark, lineHeight: { value: 28, unit: 'PIXELS' as const }, size: { x: 500 }, textAutoResize: 'HEIGHT' as const }),
        text('— The Cat Returns', { fontSize: 12, fontWeight: 400, color: med }),
      ],
    }),
  ],
});
