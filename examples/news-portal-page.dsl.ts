import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const red = '#dc2626'; const white = '#ffffff'; const bg = '#fafafa'; const dark = '#111827';
const med = '#6b7280'; const light = '#9ca3af'; const border = '#e5e7eb';

function newsCard(title: string, category: string, catColor: string, time: string, excerpt: string, g1: string, g2: string, isFeatured?: boolean) {
  return frame(`News: ${title.substring(0, 20)}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: isFeatured ? 680 : 320, y: undefined },
    cornerRadius: 12, clipContent: true, fills: [solid(white)],
    strokes: [{ color: { r: 0.9, g: 0.91, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('Image', { size: { x: isFeatured ? 680 : 320, y: isFeatured ? 300 : 180 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('Info', { autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }), layoutSizingHorizontal: 'FILL', children: [
        frame('CatTime', { autoLayout: horizontal({ spacing: 8 }), children: [
          frame('Cat', { autoLayout: horizontal({ padX: 8, padY: 2 }), fills: [solid(catColor, 0.1)], cornerRadius: 4,
            children: [text(category, { fontSize: 11, fontWeight: 600, color: catColor })] }),
          text(time, { fontSize: 12, fontWeight: 400, color: light }),
        ]}),
        text(title, { fontSize: isFeatured ? 22 : 16, fontWeight: 700, color: dark,
          lineHeight: { value: 130, unit: 'PERCENT' as const } }),
        text(excerpt, { fontSize: 14, fontWeight: 400, color: med, lineHeight: { value: 150, unit: 'PERCENT' as const },
          size: { x: isFeatured ? 648 : 288 }, textAutoResize: 'HEIGHT' as const }),
      ]}),
    ],
  });
}

function trendingItem(rank: string, title: string, reads: string) {
  return frame(`Trend: ${rank}`, {
    autoLayout: horizontal({ spacing: 10, padY: 8, counterAlign: 'MIN' }), layoutSizingHorizontal: 'FILL',
    children: [
      text(rank, { fontSize: 24, fontWeight: 700, color: '#e5e7eb' }),
      frame('TrendInfo', { autoLayout: vertical({ spacing: 2 }), children: [
        text(title, { fontSize: 14, fontWeight: 500, color: dark }),
        text(reads, { fontSize: 12, fontWeight: 400, color: light }),
      ]}),
    ],
  });
}

export default frame('NewsPortal', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      strokes: [{ color: { r: 0.9, g: 0.91, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('DailyPulse', { fontSize: 24, fontWeight: 700, color: red }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Home', { fontSize: 14, fontWeight: 600, color: dark }),
          text('World', { fontSize: 14, fontWeight: 400, color: med }),
          text('Tech', { fontSize: 14, fontWeight: 400, color: med }),
          text('Business', { fontSize: 14, fontWeight: 400, color: med }),
          text('Science', { fontSize: 14, fontWeight: 400, color: med }),
          text('Sports', { fontSize: 14, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('BreakingBar', {
      autoLayout: horizontal({ padX: 48, padY: 8, spacing: 12, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(red)],
      children: [
        text('BREAKING', { fontSize: 12, fontWeight: 700, color: white }),
        text('Global tech summit announces major AI safety framework agreement', { fontSize: 13, fontWeight: 400, color: white }),
      ],
    }),
    frame('Main', {
      autoLayout: horizontal({ spacing: 24, padX: 48, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('LeftCol', { autoLayout: vertical({ spacing: 20 }), layoutSizingHorizontal: 'FILL', children: [
          newsCard('AI Safety Framework Sets New Global Standard for Responsible Development', 'Technology', '#3b82f6', '2 hours ago',
            'World leaders and tech companies have agreed on a comprehensive framework for AI safety, marking a historic milestone in the regulation of artificial intelligence.',
            '#1e40af', '#3b82f6', true),
          frame('SecondRow', { autoLayout: horizontal({ spacing: 16 }), children: [
            newsCard('Markets Rally on Positive Economic Data', 'Business', '#059669', '4 hours ago',
              'Stock markets surged today following better-than-expected employment numbers.',
              '#047857', '#059669'),
            newsCard('SpaceX Completes Historic Mars Mission', 'Science', '#7c3aed', '6 hours ago',
              'The first crewed spacecraft has successfully entered Mars orbit.',
              '#6d28d9', '#7c3aed'),
          ]}),
        ]}),
        frame('RightCol', { autoLayout: vertical({ spacing: 16 }), size: { x: 320, y: undefined }, children: [
          frame('Trending', {
            autoLayout: vertical({ spacing: 4, padX: 20, padY: 16 }), fills: [solid(white)],
            cornerRadius: 12, layoutSizingHorizontal: 'FILL',
            children: [
              text('Trending Now', { fontSize: 18, fontWeight: 700, color: dark }),
              trendingItem('01', 'Climate summit reaches breakthrough agreement', '45K reads'),
              trendingItem('02', 'New quantum computing milestone achieved', '38K reads'),
              trendingItem('03', 'Olympic host city announced for 2036', '32K reads'),
              trendingItem('04', 'Major cybersecurity vulnerability discovered', '28K reads'),
              trendingItem('05', 'Revolutionary cancer treatment shows promise', '24K reads'),
            ],
          }),
        ]}),
      ],
    }),
  ],
});
