import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const orange = '#ea580c'; const white = '#ffffff'; const bg = '#fff7ed'; const dark = '#1c1917';
const med = '#78716c'; const amber = '#d97706'; const green = '#16a34a';

function eventCard(title: string, date: string, venue: string, price: string, g1: string, g2: string, soldOut: boolean) {
  return frame(`Event: ${title}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 320, y: undefined },
    cornerRadius: 14, clipContent: true, fills: [solid(white)],
    children: [
      frame('EventImg', { size: { x: 320, y: 180 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)],
        autoLayout: horizontal({ padX: 10, padY: 10, align: 'MAX' }),
        children: [
          frame('PriceBadge', { autoLayout: horizontal({ padX: 10, padY: 4 }), fills: [solid(white)], cornerRadius: 8,
            children: [text(soldOut ? 'Sold Out' : price, { fontSize: 13, fontWeight: 700, color: soldOut ? '#ef4444' : orange })] }),
        ],
      }),
      frame('EventInfo', { autoLayout: vertical({ spacing: 6, padX: 16, padY: 14 }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 17, fontWeight: 600, color: dark }),
        frame('DateVenue', { autoLayout: vertical({ spacing: 2 }), children: [
          text(date, { fontSize: 13, fontWeight: 500, color: orange }),
          text(venue, { fontSize: 13, fontWeight: 400, color: med }),
        ]}),
        ...(soldOut ? [] : [frame('BuyBtn', {
          autoLayout: horizontal({ padX: 20, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(orange)], cornerRadius: 8, layoutSizingHorizontal: 'FILL',
          children: [text('Get Tickets', { fontSize: 13, fontWeight: 600, color: white })],
        })]),
      ]}),
    ],
  });
}

export default frame('EventTicketing', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('EventHub', { fontSize: 22, fontWeight: 700, color: orange }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Events', { fontSize: 14, fontWeight: 600, color: orange }),
          text('Concerts', { fontSize: 14, fontWeight: 400, color: med }),
          text('Sports', { fontSize: 14, fontWeight: 400, color: med }),
          text('Theater', { fontSize: 14, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 40, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#9a3412', position: 0 }, { hex: '#ea580c', position: 0.5 }, { hex: '#fb923c', position: 1 }], 135)],
      children: [
        text('Find Amazing Events Near You', { fontSize: 38, fontWeight: 700, color: white }),
        text('Concerts, sports, theater, and more', { fontSize: 16, fontWeight: 400, color: '#fed7aa' }),
      ],
    }),
    frame('EventsGrid', {
      autoLayout: vertical({ spacing: 20, padX: 48, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('SectionHead', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
          text('Upcoming Events', { fontSize: 24, fontWeight: 700, color: dark }),
          text('View All', { fontSize: 14, fontWeight: 500, color: orange }),
        ]}),
        frame('Grid', { autoLayout: horizontal({ spacing: 16 }), children: [
          eventCard('Summer Music Festival', 'Jul 15-17, 2026', 'Central Park, NYC', '$89', '#ea580c', '#f97316', false),
          eventCard('Tech Conference 2026', 'Aug 5-7, 2026', 'Moscone Center, SF', '$299', '#2563eb', '#3b82f6', false),
          eventCard('Comedy Night Live', 'Mar 28, 2026', 'The Laugh Factory, LA', '$45', '#7c3aed', '#8b5cf6', false),
          eventCard('Championship Finals', 'Apr 12, 2026', 'Madison Square Garden', '$150', '#059669', '#10b981', true),
        ]}),
      ],
    }),
  ],
});
