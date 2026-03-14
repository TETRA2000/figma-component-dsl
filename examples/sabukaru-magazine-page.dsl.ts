import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: sabukaru.online — Black background, magazine grid, editorial, non-standard layout
const black = '#0a0a0a'; const white = '#f0f0f0'; const red = '#e53935'; const med = '#707070';
const dimWhite = '#a0a0a0'; const surface = '#161616';

function editorialCard(title: string, category: string, w: number, h: number, g1: string, g2: string) {
  return frame(`Article: ${title.slice(0, 20)}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: w, y: undefined }, cornerRadius: 2, clipContent: true,
    fills: [solid(surface)],
    children: [
      rectangle('ArticleImg', { size: { x: w, y: h },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('ArticleInfo', { autoLayout: vertical({ spacing: 4, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL', children: [
        text(category, { fontSize: 9, fontWeight: 600, color: red, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        text(title, { fontSize: 14, fontWeight: 600, color: white }),
      ]}),
    ],
  });
}

export default frame('SabukuruMagazine', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(black)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.08 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('SABUKARU', { fontSize: 18, fontWeight: 800, color: white, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('Culture', { fontSize: 12, fontWeight: 500, color: white }),
          text('Fashion', { fontSize: 12, fontWeight: 400, color: med }),
          text('Music', { fontSize: 12, fontWeight: 400, color: med }),
          text('Art', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('FeaturedArticle', {
      autoLayout: horizontal({ padX: 40, padY: 32, spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('FeaturedImg', { size: { x: 700, y: 400 },
          fills: [gradient([{ hex: '#1a1a2a', position: 0 }, { hex: '#2a1a3a', position: 0.5 }, { hex: '#3a2a4a', position: 1 }], 135)], cornerRadius: 2 }),
        frame('FeaturedText', { autoLayout: vertical({ spacing: 12, padY: 20 }), layoutSizingHorizontal: 'FILL', children: [
          text('FEATURED', { fontSize: 10, fontWeight: 600, color: red, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
          text('The Underground Music Scene Reshaping Tokyo Nightlife', { fontSize: 28, fontWeight: 700, color: white, size: { x: 400 }, textAutoResize: 'HEIGHT' as const }),
          text('From Daikanyama basements to Shibuya rooftops, a new generation of DJs and producers are building a sonic identity that blends city pop nostalgia with cutting-edge electronic production.', { fontSize: 13, fontWeight: 400, color: dimWhite, size: { x: 400 }, textAutoResize: 'HEIGHT' as const }),
          text('READ MORE', { fontSize: 11, fontWeight: 600, color: red, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        ]}),
      ],
    }),
    frame('ArticleGrid', {
      autoLayout: vertical({ spacing: 14, padX: 40, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('LATEST', { fontSize: 12, fontWeight: 700, color: white, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        frame('Row1', { autoLayout: horizontal({ spacing: 14 }), children: [
          editorialCard('Harajuku Street Style Is Dead. Long Live Harajuku.', 'FASHION', 340, 220, '#2a1a1a', '#4a2a2a'),
          editorialCard('The Vinyl Revival in Japan\'s Record Bars', 'MUSIC', 340, 220, '#1a2a1a', '#2a3a2a'),
          editorialCard('Brutalist Architecture Walking Tour: Shibuya', 'CULTURE', 340, 220, '#1a1a2a', '#2a2a3a'),
          editorialCard('Neo-Dekotora: Customized Trucks as Art', 'ART', 280, 220, '#2a2a1a', '#3a3a2a'),
        ]}),
      ],
    }),
  ],
});
