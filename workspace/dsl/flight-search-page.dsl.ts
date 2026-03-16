/**
 * Flight Search — Search form, flight result cards, price comparison
 * DSL features: gradient hero, form inputs, flight route display, price tags, SPACE_BETWEEN
 */
import { frame, text, rectangle, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function flightCard(airline: string, departTime: string, arriveTime: string, from: string, to: string, duration: string, price: string, stops: string) {
  return frame(`Flight: ${airline}`, {
    autoLayout: horizontal({ spacing: 0, padX: 20, padY: 18, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('AirlineInfo', { autoLayout: vertical({ spacing: 4 }), children: [
        rectangle('Logo', { size: { x: 32, y: 32 }, fills: [solid('#e0e7ff')], cornerRadius: 6 }),
        text(airline, { fontSize: 11, fontWeight: 500, color: '#6b7280' }),
      ]}),
      frame('RouteInfo', {
        autoLayout: horizontal({ spacing: 20, padX: 24, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('Depart', { autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }), children: [
            text(departTime, { fontSize: 20, fontWeight: 700, color: '#111827', textAlignHorizontal: 'CENTER' }),
            text(from, { fontSize: 12, fontWeight: 500, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
          ]}),
          frame('FlightLine', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
            text(duration, { fontSize: 11, fontWeight: 400, color: '#9ca3af', textAlignHorizontal: 'CENTER' }),
            rectangle('Line', { size: { x: 1, y: 2 }, fills: [solid('#e5e7eb')], layoutSizingHorizontal: 'FILL' }),
            text(stops, { fontSize: 11, fontWeight: 400, color: '#9ca3af', textAlignHorizontal: 'CENTER' }),
          ]}),
          frame('Arrive', { autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }), children: [
            text(arriveTime, { fontSize: 20, fontWeight: 700, color: '#111827', textAlignHorizontal: 'CENTER' }),
            text(to, { fontSize: 12, fontWeight: 500, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
          ]}),
        ],
      }),
      frame('PriceTag', {
        autoLayout: vertical({ spacing: 4, padX: 16, padY: 8, counterAlign: 'CENTER' }),
        fills: [solid('#f0fdf4')],
        cornerRadius: 8,
        children: [
          text(price, { fontSize: 20, fontWeight: 700, color: '#16a34a', textAlignHorizontal: 'CENTER' }),
          text('per person', { fontSize: 10, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
        ],
      }),
    ],
  });
}

export default frame('FlightSearchPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f1f5f9')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 40, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#4f46e5', position: 0 }, { hex: '#7c3aed', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Find Cheap Flights', { fontSize: 32, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        frame('SearchForm', {
          autoLayout: horizontal({ spacing: 12, padX: 20, padY: 14, counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          children: [
            frame('FromField', { autoLayout: vertical({ spacing: 2 }), children: [
              text('From', { fontSize: 11, fontWeight: 500, color: '#9ca3af' }),
              text('San Francisco (SFO)', { fontSize: 14, fontWeight: 600, color: '#111827' }),
            ]}),
            rectangle('Sep', { size: { x: 1, y: 36 }, fills: [solid('#e5e7eb')] }),
            frame('ToField', { autoLayout: vertical({ spacing: 2 }), children: [
              text('To', { fontSize: 11, fontWeight: 500, color: '#9ca3af' }),
              text('New York (JFK)', { fontSize: 14, fontWeight: 600, color: '#111827' }),
            ]}),
            rectangle('Sep2', { size: { x: 1, y: 36 }, fills: [solid('#e5e7eb')] }),
            frame('DateField', { autoLayout: vertical({ spacing: 2 }), children: [
              text('Date', { fontSize: 11, fontWeight: 500, color: '#9ca3af' }),
              text('Mar 20, 2026', { fontSize: 14, fontWeight: 600, color: '#111827' }),
            ]}),
            frame('SearchBtn', {
              autoLayout: horizontal({ spacing: 0, padX: 24, padY: 10, align: 'CENTER' }),
              fills: [solid('#4f46e5')],
              cornerRadius: 8,
              children: [text('Search', { fontSize: 14, fontWeight: 600, color: '#ffffff' })],
            }),
          ],
        }),
      ],
    }),
    frame('Results', {
      autoLayout: vertical({ spacing: 12, padX: 48, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ResultsHeader', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
          text('8 flights found', { fontSize: 16, fontWeight: 600, color: '#1e293b' }),
          text('Sort: Price', { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
        ]}),
        flightCard('United', '7:00 AM', '3:30 PM', 'SFO', 'JFK', '5h 30m', '$249', 'Nonstop'),
        flightCard('Delta', '9:15 AM', '5:45 PM', 'SFO', 'JFK', '5h 30m', '$279', 'Nonstop'),
        flightCard('JetBlue', '11:00 AM', '8:20 PM', 'SFO', 'JFK', '6h 20m', '$199', '1 stop'),
        flightCard('American', '2:30 PM', '11:15 PM', 'SFO', 'JFK', '5h 45m', '$265', 'Nonstop'),
      ],
    }),
  ],
});
