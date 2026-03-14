import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: NHK/Nikkei style — Dense information layout, headlines, three-column
const dark = '#1a1a1a'; const white = '#ffffff'; const red = '#cc0000'; const bg = '#f2f2f2';
const med = '#666666'; const lightGray = '#e0e0e0'; const blue = '#0066cc';

function headlineItem(title: string, time: string, category: string, catColor: string) {
  return frame(`Headline: ${title.slice(0, 20)}`, {
    autoLayout: vertical({ spacing: 4, padX: 0, padY: 10 }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.08 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('HeadlineMeta', { autoLayout: horizontal({ spacing: 8 }), children: [
        frame('CatTag', { autoLayout: horizontal({ padX: 6, padY: 2 }), fills: [solid(catColor)],
          children: [text(category, { fontSize: 9, fontWeight: 700, color: white })] }),
        text(time, { fontSize: 10, fontWeight: 400, color: med }),
      ]}),
      text(title, { fontSize: 14, fontWeight: 500, color: dark }),
    ],
  });
}

function sidebarItem(title: string, views: string) {
  return frame(`Side: ${title.slice(0, 15)}`, {
    autoLayout: horizontal({ spacing: 8, padX: 0, padY: 8, align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(title, { fontSize: 12, fontWeight: 400, color: dark }),
      text(views, { fontSize: 10, fontWeight: 400, color: med }),
    ],
  });
}

export default frame('JapaneseNewsroom', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('TopBar', {
      autoLayout: horizontal({ padX: 40, padY: 6, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(dark)],
      children: [
        text('BREAKING: Bank of Japan holds rates steady at March meeting', { fontSize: 11, fontWeight: 500, color: '#ff6666' }),
        text('2026.03.14 15:42 JST', { fontSize: 10, fontWeight: 400, color: med }),
      ],
    }),
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('NIKKEI NEWS', { fontSize: 20, fontWeight: 700, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('Economy', { fontSize: 12, fontWeight: 500, color: dark }),
          text('Markets', { fontSize: 12, fontWeight: 400, color: med }),
          text('Tech', { fontSize: 12, fontWeight: 400, color: med }),
          text('Politics', { fontSize: 12, fontWeight: 400, color: med }),
          text('World', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 16, padX: 40, padY: 20 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('MainColumn', { autoLayout: vertical({ spacing: 12 }), size: { x: 600, y: undefined }, children: [
          frame('FeaturedStory', { autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }), layoutSizingHorizontal: 'FILL', fills: [solid(white)], children: [
            rectangle('FeaturedImg', { size: { x: 568, y: 280 },
              fills: [gradient([{ hex: '#1a1a3a', position: 0 }, { hex: '#2a3a5a', position: 1 }], 135)] }),
            frame('FeaturedTag', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(red)],
              children: [text('TOP STORY', { fontSize: 10, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' as const } })] }),
            text('Japan GDP Growth Exceeds Expectations at 2.3% Annual Rate', { fontSize: 22, fontWeight: 700, color: dark }),
            text('The Japanese economy expanded faster than analysts predicted in Q4 2025, driven by strong exports and recovering domestic consumption amid the weakening yen.', { fontSize: 13, fontWeight: 400, color: med }),
          ]}),
          frame('HeadlineList', { autoLayout: vertical({ spacing: 0, padX: 16, padY: 12 }), layoutSizingHorizontal: 'FILL', fills: [solid(white)], children: [
            text('Latest Headlines', { fontSize: 14, fontWeight: 700, color: dark }),
            headlineItem('Toyota announces solid-state battery mass production timeline for 2027', '14:30', 'TECH', blue),
            headlineItem('Nikkei 225 closes above 42,000 for first time as chip stocks rally', '13:15', 'MARKETS', '#009900'),
            headlineItem('Japan birth rate hits new record low despite government subsidies', '12:00', 'POLITICS', red),
            headlineItem('SoftBank Vision Fund reports quarterly profit on AI portfolio gains', '11:45', 'BUSINESS', blue),
          ]}),
        ]}),
        frame('SideColumn', { autoLayout: vertical({ spacing: 12 }), size: { x: 300, y: undefined }, children: [
          frame('MarketBox', { autoLayout: vertical({ spacing: 6, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL', fills: [solid(white)], children: [
            text('Markets', { fontSize: 13, fontWeight: 700, color: dark }),
            frame('M1', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
              text('Nikkei 225', { fontSize: 12, fontWeight: 400, color: dark }),
              text('42,156.78 +1.2%', { fontSize: 12, fontWeight: 500, color: '#009900' }),
            ]}),
            frame('M2', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
              text('TOPIX', { fontSize: 12, fontWeight: 400, color: dark }),
              text('2,948.32 +0.8%', { fontSize: 12, fontWeight: 500, color: '#009900' }),
            ]}),
            frame('M3', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
              text('USD/JPY', { fontSize: 12, fontWeight: 400, color: dark }),
              text('148.52 -0.3%', { fontSize: 12, fontWeight: 500, color: red }),
            ]}),
          ]}),
          frame('TrendingBox', { autoLayout: vertical({ spacing: 4, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL', fills: [solid(white)], children: [
            text('Most Read', { fontSize: 13, fontWeight: 700, color: dark }),
            sidebarItem('AI chip demand drives semiconductor boom', '42.1K'),
            sidebarItem('Remote work culture shifts in Japanese firms', '38.7K'),
            sidebarItem('Kyoto tourism tax proposal stirs debate', '31.2K'),
            sidebarItem('Shinkansen Hokkaido extension faces delays', '28.9K'),
          ]}),
        ]}),
      ],
    }),
  ],
});
