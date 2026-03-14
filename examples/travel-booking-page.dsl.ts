import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const sky = '#0284c7'; const skyBg = '#e0f2fe'; const white = '#ffffff'; const bg = '#f0f9ff';
const dark = '#0c4a6e'; const med = '#64748b'; const amber = '#f59e0b'; const green = '#059669';

function destinationCard(city: string, country: string, price: string, rating: string, g1: string, g2: string) {
  return frame(`Dest: ${city}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 260, y: undefined },
    cornerRadius: 14, clipContent: true, fills: [solid(white)],
    strokes: [{ color: { r: 0.88, g: 0.93, b: 0.97, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('DestImg', { size: { x: 260, y: 160 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)],
        autoLayout: horizontal({ padX: 8, padY: 8, align: 'MAX' }),
        children: [
          frame('RatingBadge', { autoLayout: horizontal({ padX: 6, padY: 3, spacing: 4, counterAlign: 'CENTER' }),
            fills: [solid(white)], cornerRadius: 6,
            children: [
              ellipse('Star', { size: { x: 10, y: 10 }, fills: [solid(amber)] }),
              text(rating, { fontSize: 11, fontWeight: 600, color: dark }),
            ] }),
        ],
      }),
      frame('DestInfo', { autoLayout: vertical({ spacing: 4, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL', children: [
        text(city, { fontSize: 16, fontWeight: 600, color: dark }),
        text(country, { fontSize: 13, fontWeight: 400, color: med }),
        frame('PriceRow', { autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }), children: [
          text(`From ${price}`, { fontSize: 15, fontWeight: 700, color: sky }),
          text('/person', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ]}),
    ],
  });
}

export default frame('TravelBooking', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('Wanderlust', { fontSize: 22, fontWeight: 700, color: sky }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Flights', { fontSize: 14, fontWeight: 600, color: sky }),
          text('Hotels', { fontSize: 14, fontWeight: 400, color: med }),
          text('Packages', { fontSize: 14, fontWeight: 400, color: med }),
          text('Activities', { fontSize: 14, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('HeroBanner', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#0369a1', position: 0 }, { hex: '#0284c7', position: 0.5 }, { hex: '#38bdf8', position: 1 }], 135)],
      children: [
        text('Where to next?', { fontSize: 42, fontWeight: 700, color: white, textAlignHorizontal: 'CENTER' as const }),
        text('Discover amazing destinations at unbeatable prices', { fontSize: 16, fontWeight: 400, color: '#bae6fd' }),
        frame('BookingForm', {
          autoLayout: horizontal({ spacing: 0, padX: 4, padY: 4 }), fills: [solid(white)], cornerRadius: 14,
          children: [
            frame('FromField', { autoLayout: vertical({ spacing: 2, padX: 16, padY: 10 }), size: { x: 200, y: undefined }, children: [
              text('From', { fontSize: 11, fontWeight: 500, color: med }),
              text('San Francisco', { fontSize: 14, fontWeight: 500, color: dark }),
            ]}),
            rectangle('Sep1', { size: { x: 1, y: 40 }, fills: [solid('#e2e8f0')] }),
            frame('ToField', { autoLayout: vertical({ spacing: 2, padX: 16, padY: 10 }), size: { x: 200, y: undefined }, children: [
              text('To', { fontSize: 11, fontWeight: 500, color: med }),
              text('Tokyo, Japan', { fontSize: 14, fontWeight: 500, color: dark }),
            ]}),
            rectangle('Sep2', { size: { x: 1, y: 40 }, fills: [solid('#e2e8f0')] }),
            frame('DateField', { autoLayout: vertical({ spacing: 2, padX: 16, padY: 10 }), size: { x: 180, y: undefined }, children: [
              text('Dates', { fontSize: 11, fontWeight: 500, color: med }),
              text('Mar 20 - Mar 28', { fontSize: 14, fontWeight: 500, color: dark }),
            ]}),
            frame('SearchBtn', { autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(sky)], cornerRadius: 10,
              children: [text('Search', { fontSize: 14, fontWeight: 600, color: white })] }),
          ],
        }),
      ],
    }),
    frame('DestSection', {
      autoLayout: vertical({ spacing: 20, padX: 48, padY: 32 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('SectionHeader', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
          text('Popular Destinations', { fontSize: 24, fontWeight: 700, color: dark }),
          text('View All →', { fontSize: 14, fontWeight: 500, color: sky }),
        ]}),
        frame('DestGrid', { autoLayout: horizontal({ spacing: 16 }), children: [
          destinationCard('Tokyo', 'Japan', '$899', '4.9', '#dc2626', '#ea580c'),
          destinationCard('Paris', 'France', '$749', '4.8', '#8b5cf6', '#6d28d9'),
          destinationCard('Bali', 'Indonesia', '$599', '4.7', '#059669', '#047857'),
          destinationCard('Santorini', 'Greece', '$1,199', '4.9', '#0284c7', '#0369a1'),
          destinationCard('Reykjavik', 'Iceland', '$1,050', '4.6', '#475569', '#334155'),
        ]}),
      ],
    }),
  ],
});
