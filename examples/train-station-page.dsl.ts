import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: JR/Suica — Transit info grid, schedules, platform colors, information-dense
const jrGreen = '#1b813e'; const dark = '#1a1a1a'; const white = '#ffffff'; const bg = '#f0f0f0';
const med = '#666666'; const blue = '#0066cc'; const orange = '#e65100'; const red = '#cc0000';

function trainRow(time: string, dest: string, line: string, lineColor: string, platform: string, status: string) {
  return frame(`Train: ${time} ${dest}`, {
    autoLayout: horizontal({ spacing: 0, padX: 12, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL', fills: [solid(white)],
    strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(time, { fontSize: 16, fontWeight: 700, color: dark, size: { x: 70 } }),
      frame('LineBadge', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(lineColor)], cornerRadius: 2, size: { x: 100 },
        children: [text(line, { fontSize: 10, fontWeight: 700, color: white })] }),
      text(dest, { fontSize: 13, fontWeight: 500, color: dark, size: { x: 200 } }),
      text(platform, { fontSize: 12, fontWeight: 400, color: med, size: { x: 80 } }),
      text(status, { fontSize: 12, fontWeight: 600, color: status === 'On Time' ? jrGreen : red, size: { x: 80 } }),
    ],
  });
}

export default frame('TrainStation', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('StationHeader', {
      autoLayout: horizontal({ padX: 32, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(jrGreen)],
      children: [
        frame('Logo', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
          text('JR', { fontSize: 20, fontWeight: 800, color: white }),
          text('EAST', { fontSize: 14, fontWeight: 400, color: white }),
        ]}),
        text('Tokyo Station', { fontSize: 18, fontWeight: 600, color: white }),
        text('2026.03.14 15:42', { fontSize: 12, fontWeight: 400, color: '#a0d0a0' }),
      ],
    }),
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 16, padX: 32, padY: 20 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('DepartureBoard', { autoLayout: vertical({ spacing: 8 }), size: { x: 620, y: undefined }, children: [
          frame('BoardHeader', { autoLayout: horizontal({ align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
            text('Departures', { fontSize: 16, fontWeight: 700, color: dark }),
            text('All Lines', { fontSize: 11, fontWeight: 400, color: blue }),
          ]}),
          frame('ColumnHeaders', { autoLayout: horizontal({ spacing: 0, padX: 12, padY: 6 }), layoutSizingHorizontal: 'FILL', fills: [solid('#e8e8e8')], children: [
            text('Time', { fontSize: 10, fontWeight: 600, color: med, size: { x: 70 } }),
            text('Line', { fontSize: 10, fontWeight: 600, color: med, size: { x: 100 } }),
            text('Destination', { fontSize: 10, fontWeight: 600, color: med, size: { x: 200 } }),
            text('Platform', { fontSize: 10, fontWeight: 600, color: med, size: { x: 80 } }),
            text('Status', { fontSize: 10, fontWeight: 600, color: med, size: { x: 80 } }),
          ]}),
          trainRow('15:45', 'Yokohama', 'Tokaido', blue, 'Platform 7', 'On Time'),
          trainRow('15:48', 'Ueno', 'Yamanote', jrGreen, 'Platform 4', 'On Time'),
          trainRow('15:50', 'Chiba', 'Sobu Rapid', '#ffd700', 'Platform 1', 'On Time'),
          trainRow('15:53', 'Omiya', 'Keihin-Tohoku', '#00bfff', 'Platform 3', '+3 min'),
          trainRow('15:55', 'Sendai', 'Tohoku Shinkansen', '#00b050', 'Platform 22', 'On Time'),
          trainRow('15:58', 'Shinagawa', 'Yamanote', jrGreen, 'Platform 5', 'On Time'),
          trainRow('16:00', 'Nagoya', 'Tokaido Shinkansen', blue, 'Platform 18', 'On Time'),
        ]}),
        frame('SideInfo', { autoLayout: vertical({ spacing: 12 }), size: { x: 280, y: undefined }, children: [
          frame('ServiceAlert', { autoLayout: vertical({ spacing: 6, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL', fills: [solid(white)], children: [
            frame('AlertHeader', { autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }), children: [
              rectangle('AlertDot', { size: { x: 8, y: 8 }, fills: [solid(orange)], cornerRadius: 4 }),
              text('Service Notices', { fontSize: 13, fontWeight: 700, color: dark }),
            ]}),
            text('Keihin-Tohoku Line: Minor delays due to signal check near Akabane. Expected recovery by 16:15.', { fontSize: 11, fontWeight: 400, color: med }),
          ]}),
          frame('StationMap', { autoLayout: vertical({ spacing: 6, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL', fills: [solid(white)], children: [
            text('Station Facilities', { fontSize: 13, fontWeight: 700, color: dark }),
            frame('F1', { autoLayout: horizontal({ spacing: 8 }), children: [
              ellipse('FI1', { size: { x: 16, y: 16 }, fills: [solid(blue, 0.15)] }),
              text('Coin Lockers — B1F East', { fontSize: 11, fontWeight: 400, color: dark }),
            ]}),
            frame('F2', { autoLayout: horizontal({ spacing: 8 }), children: [
              ellipse('FI2', { size: { x: 16, y: 16 }, fills: [solid(jrGreen, 0.15)] }),
              text('JR Office — 1F Central', { fontSize: 11, fontWeight: 400, color: dark }),
            ]}),
            frame('F3', { autoLayout: horizontal({ spacing: 8 }), children: [
              ellipse('FI3', { size: { x: 16, y: 16 }, fills: [solid(orange, 0.15)] }),
              text('Food Court — Gransta B1F', { fontSize: 11, fontWeight: 400, color: dark }),
            ]}),
          ]}),
          frame('ICCard', { autoLayout: vertical({ spacing: 6, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL', fills: [solid(jrGreen)], cornerRadius: 4, children: [
            text('Suica Balance', { fontSize: 11, fontWeight: 400, color: '#a0d0a0' }),
            text('¥3,248', { fontSize: 24, fontWeight: 700, color: white }),
            text('Last charged: 2026.03.13', { fontSize: 10, fontWeight: 400, color: '#a0d0a0' }),
          ]}),
        ]}),
      ],
    }),
  ],
});
