import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const navy = '#1e3a5f'; const skyBlue = '#0ea5e9'; const white = '#ffffff'; const bg = '#f0f9ff';
const dark = '#0c4a6e'; const med = '#64748b'; const green = '#059669'; const amber = '#d97706';

function flightCard(airline: string, dep: string, depTime: string, arr: string, arrTime: string, duration: string, price: string, stops: string) {
  return frame(`Flight: ${dep}-${arr}`, {
    autoLayout: horizontal({ padX: 20, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL', fills: [solid(white)], cornerRadius: 12,
    strokes: [{ color: { r: 0.88, g: 0.93, b: 0.97, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('AirlineInfo', { autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }), children: [
        rectangle('AirlineLogo', { size: { x: 40, y: 40 }, fills: [solid(skyBlue, 0.12)], cornerRadius: 8 }),
        text(airline, { fontSize: 14, fontWeight: 500, color: dark }),
      ]}),
      frame('RouteInfo', { autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }), children: [
        frame('Dep', { autoLayout: vertical({ spacing: 1, counterAlign: 'CENTER' }), children: [
          text(depTime, { fontSize: 18, fontWeight: 700, color: dark }),
          text(dep, { fontSize: 12, fontWeight: 500, color: med }),
        ]}),
        frame('FlightLine', { autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }), children: [
          text(duration, { fontSize: 11, fontWeight: 400, color: med }),
          frame('Line', { autoLayout: horizontal({ spacing: 0 }), children: [
            rectangle('LineLeft', { size: { x: 60, y: 2 }, fills: [solid(skyBlue)] }),
            ellipse('Dot', { size: { x: 6, y: 6 }, fills: [solid(skyBlue)] }),
            rectangle('LineRight', { size: { x: 60, y: 2 }, fills: [solid(skyBlue)] }),
          ]}),
          text(stops, { fontSize: 11, fontWeight: 400, color: stops === 'Nonstop' ? green : amber }),
        ]}),
        frame('Arr', { autoLayout: vertical({ spacing: 1, counterAlign: 'CENTER' }), children: [
          text(arrTime, { fontSize: 18, fontWeight: 700, color: dark }),
          text(arr, { fontSize: 12, fontWeight: 500, color: med }),
        ]}),
      ]}),
      frame('PriceSelect', { autoLayout: vertical({ spacing: 6, counterAlign: 'CENTER' }), children: [
        text(price, { fontSize: 22, fontWeight: 700, color: skyBlue }),
        frame('SelectBtn', { autoLayout: horizontal({ padX: 16, padY: 6 }), fills: [solid(skyBlue)], cornerRadius: 6,
          children: [text('Select', { fontSize: 13, fontWeight: 600, color: white })] }),
      ]}),
    ],
  });
}

export default frame('AirlineBooking', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(navy)],
      children: [
        text('SkyRoute', { fontSize: 22, fontWeight: 700, color: white }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Flights', { fontSize: 14, fontWeight: 600, color: white }),
          text('Hotels', { fontSize: 14, fontWeight: 400, color: '#93c5fd' }),
          text('Deals', { fontSize: 14, fontWeight: 400, color: '#93c5fd' }),
        ]}),
      ],
    }),
    frame('SearchBanner', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 24 }), layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#0c4a6e', position: 0 }, { hex: '#0ea5e9', position: 1 }], 135)],
      children: [
        text('Find Your Flight', { fontSize: 28, fontWeight: 700, color: white }),
        frame('SearchForm', {
          autoLayout: horizontal({ spacing: 0, padX: 4, padY: 4 }), fills: [solid(white)], cornerRadius: 12,
          children: [
            frame('From', { autoLayout: vertical({ spacing: 2, padX: 14, padY: 10 }), size: { x: 200, y: undefined }, children: [
              text('From', { fontSize: 11, fontWeight: 500, color: med }),
              text('SFO', { fontSize: 16, fontWeight: 600, color: dark }),
            ]}),
            rectangle('Sep1', { size: { x: 1, y: 44 }, fills: [solid('#e2e8f0')] }),
            frame('To', { autoLayout: vertical({ spacing: 2, padX: 14, padY: 10 }), size: { x: 200, y: undefined }, children: [
              text('To', { fontSize: 11, fontWeight: 500, color: med }),
              text('NRT', { fontSize: 16, fontWeight: 600, color: dark }),
            ]}),
            rectangle('Sep2', { size: { x: 1, y: 44 }, fills: [solid('#e2e8f0')] }),
            frame('Date', { autoLayout: vertical({ spacing: 2, padX: 14, padY: 10 }), size: { x: 200, y: undefined }, children: [
              text('Depart', { fontSize: 11, fontWeight: 500, color: med }),
              text('Mar 20, 2026', { fontSize: 14, fontWeight: 500, color: dark }),
            ]}),
            rectangle('Sep3', { size: { x: 1, y: 44 }, fills: [solid('#e2e8f0')] }),
            frame('Passengers', { autoLayout: vertical({ spacing: 2, padX: 14, padY: 10 }), size: { x: 160, y: undefined }, children: [
              text('Passengers', { fontSize: 11, fontWeight: 500, color: med }),
              text('2 Adults', { fontSize: 14, fontWeight: 500, color: dark }),
            ]}),
            frame('SearchBtn', { autoLayout: horizontal({ padX: 24, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(skyBlue)], cornerRadius: 8,
              children: [text('Search', { fontSize: 14, fontWeight: 600, color: white })] }),
          ],
        }),
      ],
    }),
    frame('Results', {
      autoLayout: vertical({ spacing: 12, padX: 48, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('ResultHeader', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
          text('8 flights found · SFO → NRT', { fontSize: 16, fontWeight: 600, color: dark }),
          text('Sort: Price', { fontSize: 13, fontWeight: 400, color: med }),
        ]}),
        flightCard('United Airlines', 'SFO', '10:30 AM', 'NRT', '2:45 PM+1', '11h 15m', '$892', 'Nonstop'),
        flightCard('ANA', 'SFO', '1:15 PM', 'NRT', '5:30 PM+1', '11h 15m', '$945', 'Nonstop'),
        flightCard('Delta', 'SFO', '8:00 AM', 'NRT', '4:20 PM+1', '14h 20m', '$756', '1 stop'),
        flightCard('JAL', 'SFO', '11:45 AM', 'NRT', '3:55 PM+1', '11h 10m', '$1,120', 'Nonstop'),
      ],
    }),
  ],
});
