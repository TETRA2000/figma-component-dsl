/**
 * News Aggregator — Headlines, article cards, trending topics
 * DSL features: bold headlines, category badges, image placeholders, two-column featured, sidebar trending
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function articleCard(title: string, category: string, source: string, time: string, catColor: string, imgColor1: string, imgColor2: string) {
  return frame(`Article: ${title.slice(0, 20)}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('ArticleImg', { size: { x: 1, y: 140 }, fills: [gradient([{ hex: imgColor1, position: 0 }, { hex: imgColor2, position: 1 }], 135)], cornerRadius: { topLeft: 12, topRight: 12, bottomLeft: 0, bottomRight: 0 }, layoutSizingHorizontal: 'FILL' }),
      frame('ArticleBody', {
        autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('CatBadge', { autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }), fills: [solid(catColor + '1a')], cornerRadius: 4, children: [
            text(category, { fontSize: 11, fontWeight: 600, color: catColor }),
          ]}),
          text(title, { fontSize: 15, fontWeight: 600, color: '#111827', lineHeight: { value: 135, unit: 'PERCENT' }, size: { x: 300 }, textAutoResize: 'HEIGHT' }),
          frame('SourceRow', { autoLayout: horizontal({ spacing: 8 }), children: [
            text(source, { fontSize: 12, fontWeight: 500, color: '#6b7280' }),
            text(time, { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
          ]}),
        ],
      }),
    ],
  });
}

function trendingItem(rank: string, topic: string, count: string) {
  return frame(`Trend: ${topic}`, {
    autoLayout: horizontal({ spacing: 12, padX: 12, padY: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(rank, { fontSize: 16, fontWeight: 700, color: '#d1d5db' }),
      frame('TrendInfo', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
        text(topic, { fontSize: 14, fontWeight: 600, color: '#111827' }),
        text(count, { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
      ]}),
    ],
  });
}

export default frame('NewsAggregatorPage', {
  size: { x: 1200 },
  autoLayout: vertical({ spacing: 0, padX: 48, padY: 32 }),
  fills: [solid('#f9fafb')],
  children: [
    text('Daily Brief', { fontSize: 32, fontWeight: 800, color: '#111827' }),
    text('March 16, 2026', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 24, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ArticleGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('Col1', { autoLayout: vertical({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
              articleCard('AI Transforms Healthcare Diagnostics with New Breakthrough', 'Technology', 'TechCrunch', '2h ago', '#3b82f6', '#1e40af', '#3b82f6'),
              articleCard('Global Markets Rally as Trade Deal Reaches Final Stage', 'Business', 'Reuters', '4h ago', '#10b981', '#065f46', '#10b981'),
            ]}),
            frame('Col2', { autoLayout: vertical({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
              articleCard('New Study Reveals Benefits of Mediterranean Diet', 'Health', 'NYT', '3h ago', '#ef4444', '#991b1b', '#ef4444'),
              articleCard('SpaceX Announces Mars Mission Timeline Update', 'Science', 'Wired', '5h ago', '#8b5cf6', '#5b21b6', '#8b5cf6'),
            ]}),
          ],
        }),
        frame('Trending', {
          autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          children: [
            text('Trending', { fontSize: 16, fontWeight: 700, color: '#111827' }),
            trendingItem('1', 'AI Healthcare', '12.4K posts'),
            trendingItem('2', 'Mars Mission', '8.7K posts'),
            trendingItem('3', 'Trade Deal', '6.2K posts'),
            trendingItem('4', 'Mediterranean Diet', '4.1K posts'),
            trendingItem('5', 'Tech Earnings', '3.8K posts'),
          ],
        }),
      ],
    }),
  ],
});
