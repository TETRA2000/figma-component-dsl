import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: todai/keio style — Traditional blue, academic layout, news feed, event cards
const uniBlue = '#003366'; const dark = '#1a1a2a'; const white = '#ffffff'; const bg = '#f4f6f8';
const med = '#606878'; const lightBlue = '#e0eaf4'; const accent = '#0066aa';

function newsItem(title: string, date: string, category: string) {
  return frame(`News: ${title.slice(0, 20)}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL', fills: [solid(white)],
    strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(date, { fontSize: 10, fontWeight: 400, color: med, size: { x: 80 } }),
      frame('NewsCat', { autoLayout: horizontal({ padX: 8, padY: 2 }), fills: [solid(uniBlue, 0.1)], cornerRadius: 2,
        children: [text(category, { fontSize: 9, fontWeight: 600, color: uniBlue })] }),
      text(title, { fontSize: 13, fontWeight: 500, color: dark }),
    ],
  });
}

function eventCard(title: string, date: string, location: string) {
  return frame(`Event: ${title}`, {
    autoLayout: vertical({ spacing: 4, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL',
    fills: [solid(white)], cornerRadius: 4,
    strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(date, { fontSize: 10, fontWeight: 500, color: accent }),
      text(title, { fontSize: 13, fontWeight: 500, color: dark }),
      text(location, { fontSize: 11, fontWeight: 400, color: med }),
    ],
  });
}

export default frame('JapaneseUniversity', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('TopBar', {
      autoLayout: horizontal({ padX: 48, padY: 6, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(uniBlue)],
      children: [
        text('The University of Tokyo', { fontSize: 11, fontWeight: 400, color: '#a0b8d0' }),
        frame('LangBar', { autoLayout: horizontal({ spacing: 12 }), children: [
          text('EN', { fontSize: 10, fontWeight: 600, color: white }),
          text('JP', { fontSize: 10, fontWeight: 400, color: '#a0b8d0' }),
        ]}),
      ],
    }),
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('UTokyo', { fontSize: 22, fontWeight: 700, color: uniBlue }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('About', { fontSize: 12, fontWeight: 500, color: dark }),
          text('Academics', { fontSize: 12, fontWeight: 400, color: med }),
          text('Research', { fontSize: 12, fontWeight: 400, color: med }),
          text('Admissions', { fontSize: 12, fontWeight: 400, color: med }),
          text('Campus Life', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('HeroBanner', {
      autoLayout: vertical({ spacing: 12, padX: 48, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#003366', position: 0 }, { hex: '#004488', position: 0.5 }, { hex: '#003366', position: 1 }], 135)],
      children: [
        text('Shaping the future through knowledge', { fontSize: 32, fontWeight: 400, color: white }),
        text('Established 1877 — Japan\'s leading research university', { fontSize: 14, fontWeight: 400, color: '#a0c0e0' }),
      ],
    }),
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 20, padX: 48, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('NewsFeed', { autoLayout: vertical({ spacing: 8 }), size: { x: 700, y: undefined }, children: [
          text('News & Announcements', { fontSize: 16, fontWeight: 600, color: dark }),
          newsItem('UTokyo researchers develop new quantum computing algorithm', '2026.03.14', 'Research'),
          newsItem('Spring enrollment ceremony scheduled for April 12', '2026.03.12', 'Campus'),
          newsItem('International exchange program with MIT expanded', '2026.03.10', 'Global'),
          newsItem('New sustainability initiative launched across all faculties', '2026.03.08', 'University'),
          newsItem('Graduate school application deadline approaching: April 1', '2026.03.06', 'Admissions'),
        ]}),
        frame('Sidebar', { autoLayout: vertical({ spacing: 12 }), size: { x: 320, y: undefined }, children: [
          text('Upcoming Events', { fontSize: 14, fontWeight: 600, color: dark }),
          eventCard('Open Campus Day', 'March 22, 2026', 'Hongo Campus, Main Auditorium'),
          eventCard('AI Research Symposium', 'March 28, 2026', 'Komaba Campus, Building 18'),
          eventCard('Cherry Blossom Festival', 'April 2, 2026', 'Yasuda Auditorium Gardens'),
          frame('QuickLinks', { autoLayout: vertical({ spacing: 6, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL', fills: [solid(uniBlue)], cornerRadius: 4, children: [
            text('Quick Links', { fontSize: 13, fontWeight: 600, color: white }),
            text('Library Portal', { fontSize: 11, fontWeight: 400, color: '#a0c0e0' }),
            text('Student Portal', { fontSize: 11, fontWeight: 400, color: '#a0c0e0' }),
            text('Research Database', { fontSize: 11, fontWeight: 400, color: '#a0c0e0' }),
          ]}),
        ]}),
      ],
    }),
  ],
});
