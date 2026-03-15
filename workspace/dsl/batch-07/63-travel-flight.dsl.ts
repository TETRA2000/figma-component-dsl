/**
 * Flight Booking — Departure/arrival selector, flight results, fare class comparison
 * Batch 7, Page 3: Flight booking flow
 * DSL Features: nested layouts, FILL sizing, SPACE_BETWEEN, strokes, overlay patterns
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('TravelFlight', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('Wanderly', { fontSize: 22, fontWeight: 700, color: '#ea580c' }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
          children: [
            text('Explore', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Flights', { fontSize: 14, fontWeight: 500, color: '#ea580c' }),
            text('Hotels', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
          ],
        }),
      ],
    }),

    // Search Bar
    frame('SearchBar', {
      autoLayout: horizontal({ spacing: 16, padX: 80, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0369a1')],
      children: [
        searchInput('From', 'New York (JFK)'),
        text('⇄', { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
        searchInput('To', 'London (LHR)'),
        searchInput('Depart', 'Mar 20, 2026'),
        searchInput('Return', 'Mar 27, 2026'),
        searchInput('Class', 'Economy'),
        frame('ModifyBtn', {
          autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ea580c')],
          cornerRadius: 8,
          children: [
            text('Modify', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
      ],
    }),

    // Results Header
    frame('ResultsHeader', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('24 flights found', { fontSize: 18, fontWeight: 600, color: '#1e293b' }),
        frame('HeaderSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('SortRow', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            text('Sort by:', { fontSize: 14, fontWeight: 400, color: '#64748b' }),
            frame('SortBtn', {
              autoLayout: horizontal({ padX: 12, padY: 6, counterAlign: 'CENTER' }),
              cornerRadius: 6,
              strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Price: Low to High', { fontSize: 13, fontWeight: 500, color: '#1e293b' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Flight Results
    frame('FlightResults', {
      autoLayout: vertical({ spacing: 12, padX: 80, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        flightCard('SkyWay Airlines', 'SW 402', '08:30', 'JFK', '20:45', 'LHR', '7h 15m', 'Non-stop', '$489', true),
        flightCard('Atlantic Air', 'AA 118', '10:15', 'JFK', '23:30', 'LHR', '7h 15m', 'Non-stop', '$512', false),
        flightCard('EuroConnect', 'EC 774', '14:00', 'JFK', '06:20+1', 'LHR', '10h 20m', '1 stop (CDG)', '$378', false),
        flightCard('Global Wings', 'GW 201', '22:45', 'JFK', '11:00+1', 'LHR', '7h 15m', 'Non-stop', '$445', false),
      ],
    }),

    // Fare Class Comparison
    frame('FareComparison', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Compare Fare Classes', { fontSize: 22, fontWeight: 700, color: '#1e293b' }),
        frame('FareCards', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            fareCard('Economy', '$489', ['1 carry-on bag', '1 checked bag', 'Standard seat', 'Meal included'], false),
            fareCard('Premium Economy', '$729', ['2 carry-on bags', '2 checked bags', 'Extra legroom', 'Priority boarding', 'Meal + drinks'], false),
            fareCard('Business', '$2,180', ['2 carry-on bags', '3 checked bags', 'Lie-flat seat', 'Lounge access', 'Premium dining', 'Priority everything'], true),
          ],
        }),
      ],
    }),

    // Footer
    frame('Footer', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 24, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('© 2026 Wanderly. All rights reserved.', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
      ],
    }),
  ],
});

function searchInput(label: string, value: string) {
  return frame(`Input: ${label}`, {
    autoLayout: vertical({ spacing: 2, padX: 16, padY: 8 }),
    children: [
      text(label, { fontSize: 10, fontWeight: 600, color: '#ffffffaa' }),
      text(value, { fontSize: 14, fontWeight: 500, color: '#ffffff' }),
    ],
  });
}

function flightCard(airline: string, flight: string, depTime: string, depCode: string, arrTime: string, arrCode: string, duration: string, stops: string, price: string, recommended: boolean) {
  return frame(`Flight: ${flight}`, {
    autoLayout: horizontal({ spacing: 0, padX: 24, padY: 20, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: recommended ? { r: 0.92, g: 0.35, b: 0.05, a: 1 } : { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: recommended ? 2 : 1, align: 'INSIDE' }],
    children: [
      // Airline info
      frame('AirlineInfo', {
        autoLayout: vertical({ spacing: 4 }),
        size: { x: 140, y: undefined },
        children: [
          text(airline, { fontSize: 15, fontWeight: 600, color: '#1e293b' }),
          text(flight, { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
        ],
      }),
      // Departure
      frame('Departure', {
        autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }),
        size: { x: 100, y: undefined },
        children: [
          text(depTime, { fontSize: 22, fontWeight: 700, color: '#1e293b', textAlignHorizontal: 'CENTER' }),
          text(depCode, { fontSize: 13, fontWeight: 500, color: '#64748b', textAlignHorizontal: 'CENTER' }),
        ],
      }),
      // Duration
      frame('Duration', {
        autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(duration, { fontSize: 13, fontWeight: 500, color: '#64748b', textAlignHorizontal: 'CENTER' }),
          rectangle('FlightLine', {
            size: { x: 120, y: 2 },
            fills: [solid('#e2e8f0')],
            cornerRadius: 1,
          }),
          text(stops, { fontSize: 12, fontWeight: 400, color: '#94a3b8', textAlignHorizontal: 'CENTER' }),
        ],
      }),
      // Arrival
      frame('Arrival', {
        autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }),
        size: { x: 100, y: undefined },
        children: [
          text(arrTime, { fontSize: 22, fontWeight: 700, color: '#1e293b', textAlignHorizontal: 'CENTER' }),
          text(arrCode, { fontSize: 13, fontWeight: 500, color: '#64748b', textAlignHorizontal: 'CENTER' }),
        ],
      }),
      // Price & Book
      frame('PriceBook', {
        autoLayout: vertical({ spacing: 8, counterAlign: 'MAX' }),
        size: { x: 120, y: undefined },
        children: [
          text(price, { fontSize: 24, fontWeight: 700, color: '#ea580c', textAlignHorizontal: 'RIGHT' }),
          text('per person', { fontSize: 12, fontWeight: 400, color: '#94a3b8', textAlignHorizontal: 'RIGHT' }),
          frame('SelectBtn', {
            autoLayout: horizontal({ padX: 20, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(recommended ? '#ea580c' : '#ffffff')],
            cornerRadius: 8,
            strokes: recommended ? [] : [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
            children: [
              text('Select', { fontSize: 13, fontWeight: 600, color: recommended ? '#ffffff' : '#1e293b' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function fareCard(name: string, price: string, features: string[], recommended: boolean) {
  return frame(`Fare: ${name}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(recommended ? '#0369a1' : '#ffffff')],
    cornerRadius: 16,
    strokes: recommended ? [] : [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      ...(recommended ? [
        frame('RecBadge', {
          autoLayout: horizontal({ padX: 12, padY: 4 }),
          fills: [solid('#ffffff', 0.2)],
          cornerRadius: 999,
          children: [
            text('Recommended', { fontSize: 11, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
      ] : []),
      text(name, { fontSize: 18, fontWeight: 600, color: recommended ? '#ffffff' : '#1e293b' }),
      text(price, { fontSize: 32, fontWeight: 700, color: recommended ? '#ffffff' : '#ea580c' }),
      rectangle('FareDivider', {
        size: { x: 1, y: 1 },
        layoutSizingHorizontal: 'FILL',
        fills: [solid(recommended ? '#ffffff33' : '#e2e8f0')],
      }),
      ...features.map(f =>
        frame(`Feature: ${f}`, {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            text('✓', { fontSize: 14, fontWeight: 600, color: recommended ? '#7dd3fc' : '#22c55e' }),
            text(f, { fontSize: 14, fontWeight: 400, color: recommended ? '#ffffffcc' : '#4b5563' }),
          ],
        })
      ),
      frame('SelectFareBtn', {
        autoLayout: horizontal({ padX: 0, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        fills: [solid(recommended ? '#ffffff' : '#ea580c')],
        cornerRadius: 10,
        children: [
          text('Select', { fontSize: 15, fontWeight: 600, color: recommended ? '#0369a1' : '#ffffff' }),
        ],
      }),
    ],
  });
}
