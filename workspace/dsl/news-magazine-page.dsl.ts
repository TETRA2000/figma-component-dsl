/**
 * News Magazine — Cover story, article grid, and sidebar
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function articleCard(title: string, author: string, category: string, readTime: string, color: string) {
  return frame(`Article: ${title}`, {
    autoLayout: vertical({ spacing: 10, padX: 14, padY: 14 }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('Thumb', { size: { x: 240, y: 130 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#0f172a', position: 1 }], 150)], cornerRadius: 6, layoutSizingHorizontal: 'FILL' }),
      frame('CatBadge', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(color + '15')], cornerRadius: 9999, children: [text(category, { fontSize: 10, fontWeight: 600, color })] }),
      text(title, { fontSize: 14, fontWeight: 700, color: '#0f172a' }),
      frame('Meta', { autoLayout: horizontal({ spacing: 8 }), children: [
        text(author, { fontSize: 11, fontWeight: 500, color: '#64748b' }),
        text(`· ${readTime}`, { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
      ] }),
    ],
  });
}

function sidebarItem(rank: string, title: string, views: string) {
  return frame(`Trending: ${title}`, {
    autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER', padY: 8 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(rank, { fontSize: 20, fontWeight: 800, color: '#e2e8f0' }),
      frame('Info', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 13, fontWeight: 600, color: '#1e293b' }),
        text(views, { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
      ] }),
    ],
  });
}

export default frame('NewsMagazinePage', {
  size: { x: 1200 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 48, padY: 16 }),
      fills: [solid('#0f172a')],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('The Pulse', { fontSize: 24, fontWeight: 900, color: '#ffffff' }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('News', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
          text('Tech', { fontSize: 13, fontWeight: 500, color: '#94a3b8' }),
          text('Culture', { fontSize: 13, fontWeight: 500, color: '#94a3b8' }),
          text('Science', { fontSize: 13, fontWeight: 500, color: '#94a3b8' }),
          text('Opinion', { fontSize: 13, fontWeight: 500, color: '#94a3b8' }),
        ] }),
      ],
    }),
    frame('Body', {
      autoLayout: horizontal({ spacing: 28, padX: 48, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('MainCol', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('CoverStory', {
              autoLayout: vertical({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                rectangle('CoverImage', { size: { x: 760, y: 320 }, fills: [gradient([{ hex: '#1e40af', position: 0 }, { hex: '#7c3aed', position: 1 }], 135)], cornerRadius: 14, layoutSizingHorizontal: 'FILL' }),
                frame('CoverBadge', { autoLayout: horizontal({ padX: 10, padY: 4 }), fills: [solid('#ef4444')], cornerRadius: 9999, children: [text('Breaking', { fontSize: 11, fontWeight: 700, color: '#ffffff' })] }),
                text('Global Climate Summit Reaches Historic Agreement on Carbon Emissions', { fontSize: 24, fontWeight: 800, color: '#0f172a' }),
                text('World leaders sign landmark treaty to cut carbon emissions by 60% by 2040, marking the most ambitious climate deal in history.', { fontSize: 14, fontWeight: 400, color: '#64748b' }),
                text('By Sarah Mitchell · 12 min read · March 16, 2026', { fontSize: 12, fontWeight: 500, color: '#94a3b8' }),
              ],
            }),
            frame('ArticleGrid', {
              autoLayout: horizontal({ spacing: 14 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                articleCard('AI Regulation Framework Passes Senate', 'J. Torres', 'Tech', '8 min', '#7c3aed'),
                articleCard('Housing Market Sees Unexpected Boom', 'R. Kim', 'Economy', '5 min', '#059669'),
                articleCard('Space Tourism Opens to Public', 'A. Novak', 'Science', '6 min', '#2563eb'),
              ],
            }),
          ],
        }),
        frame('Sidebar', {
          autoLayout: vertical({ spacing: 16, padX: 18, padY: 18 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          size: { x: 280 },
          children: [
            text('Trending Now', { fontSize: 16, fontWeight: 700, color: '#0f172a' }),
            sidebarItem('01', 'Stock Markets Hit All-Time High', '245K views'),
            sidebarItem('02', 'New Study Links Sleep to Productivity', '189K views'),
            sidebarItem('03', 'Electric Vehicles Outsell Gas Cars', '156K views'),
            sidebarItem('04', 'Mars Mission Launch Date Confirmed', '134K views'),
            sidebarItem('05', 'Remote Work Trends in 2026', '112K views'),
          ],
        }),
      ],
    }),
  ],
});
