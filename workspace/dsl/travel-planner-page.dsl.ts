/**
 * Travel Planner — Trip itinerary with day-by-day schedule, destination cards, and map placeholder
 * DSL features: gradient destination cards, cornerRadii for asymmetric shapes, ellipse for icons,
 * textAutoResize HEIGHT for descriptions, FILL layout, strokes, opacity
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function destinationCard(city: string, country: string, dates: string, gradFrom: string, gradTo: string) {
  return frame(`Dest: ${city}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 14,
    clipContent: true,
    children: [
      rectangle('DestImage', {
        size: { x: 300, y: 140 },
        fills: [gradient([{ hex: gradFrom, position: 0 }, { hex: gradTo, position: 1 }], 135)],
      }),
      frame('DestInfo', {
        autoLayout: vertical({ spacing: 4, padX: 16, padY: 14 }),
        fills: [solid('#ffffff')],
        layoutSizingHorizontal: 'FILL',
        strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
        children: [
          text(city, { fontSize: 18, fontWeight: 700, color: '#111827' }),
          text(country, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
          text(dates, { fontSize: 12, fontWeight: 500, color: '#7c3aed' }),
        ],
      }),
    ],
  });
}

function itineraryItem(time: string, title: string, description: string, type: 'activity' | 'transport' | 'meal' | 'hotel') {
  const typeColors: Record<string, string> = { activity: '#3b82f6', transport: '#f59e0b', meal: '#ef4444', hotel: '#8b5cf6' };
  const color = typeColors[type];
  return frame(`Item: ${title}`, {
    autoLayout: horizontal({ spacing: 12, padX: 0, padY: 10, counterAlign: 'MIN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(time, { fontSize: 12, fontWeight: 600, color: '#9ca3af', size: { x: 60 } }),
      frame('Timeline', {
        autoLayout: vertical({ spacing: 0, counterAlign: 'CENTER' }),
        size: { x: 20 },
        children: [
          ellipse('Dot', { size: { x: 12, y: 12 }, fills: [solid(color)] }),
          rectangle('Line', { size: { x: 2, y: 40 }, fills: [solid('#e5e7eb')] }),
        ],
      }),
      frame('ItemContent', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 14, fontWeight: 600, color: '#111827' }),
          text(description, {
            fontSize: 13, fontWeight: 400, color: '#6b7280',
            size: { x: 400 }, textAutoResize: 'HEIGHT',
            lineHeight: { value: 150, unit: 'PERCENT' },
          }),
        ],
      }),
    ],
  });
}

function dayHeader(day: string, date: string) {
  return frame(`Day: ${day}`, {
    autoLayout: horizontal({ spacing: 12, padX: 0, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('DayBadge', {
        autoLayout: horizontal({ spacing: 0, padX: 14, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#7c3aed')],
        cornerRadius: 8,
        children: [text(day, { fontSize: 13, fontWeight: 700, color: '#ffffff' })],
      }),
      text(date, { fontSize: 14, fontWeight: 500, color: '#374151' }),
      rectangle('DayLine', { size: { x: 200, y: 1 }, fills: [solid('#e5e7eb')] }),
    ],
  });
}

export default frame('TravelPlannerPage', {
  size: { x: 1000 },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid('#f9fafb')],
  children: [
    // Main content
    frame('MainContent', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Header
        frame('Header', {
          autoLayout: vertical({ spacing: 8, padX: 32, padY: 28 }),
          layoutSizingHorizontal: 'FILL',
          fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#4f46e5', position: 1 }], 90)],
          children: [
            text('Europe Summer 2026', { fontSize: 28, fontWeight: 800, color: '#ffffff' }),
            text('Jun 15 - Jul 2 | 3 cities | 18 days', { fontSize: 14, fontWeight: 400, color: '#ffffffcc' }),
          ],
        }),
        // Destinations row
        frame('Destinations', {
          autoLayout: horizontal({ spacing: 16, padX: 32, padY: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            destinationCard('Paris', 'France', 'Jun 15 - Jun 21', '#e74c3c', '#3498db'),
            destinationCard('Barcelona', 'Spain', 'Jun 22 - Jun 27', '#f39c12', '#e74c3c'),
          ],
        }),
        // Itinerary
        frame('Itinerary', {
          autoLayout: vertical({ spacing: 4, padX: 32, padY: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Itinerary', { fontSize: 22, fontWeight: 700, color: '#111827' }),
            dayHeader('Day 1', 'Sunday, June 15'),
            itineraryItem('09:00', 'Flight to Paris', 'Depart JFK Terminal 1. Air France AF 007. Arrive CDG 22:30 local.', 'transport'),
            itineraryItem('23:30', 'Check-in: Hotel Le Marais', 'Boutique hotel in the 4th arrondissement. Confirmation #HLM2026.', 'hotel'),
            dayHeader('Day 2', 'Monday, June 16'),
            itineraryItem('08:00', 'Breakfast at Cafe de Flore', 'Classic Parisian cafe. Try the croissants and cafe au lait.', 'meal'),
            itineraryItem('10:00', 'Louvre Museum', 'Pre-booked tickets for the Denon Wing. Allow 3-4 hours.', 'activity'),
            itineraryItem('14:30', 'Lunch in Tuileries Garden', 'Picnic with supplies from Rue Cler market.', 'meal'),
            itineraryItem('16:00', 'Seine River Walk', 'Walk along the Left Bank from Pont des Arts to Notre-Dame.', 'activity'),
          ],
        }),
      ],
    }),
    // Map sidebar
    frame('MapSidebar', {
      size: { x: 340 },
      autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }),
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('MapPlaceholder', {
          size: { x: 340, y: 300 },
          fills: [gradient([{ hex: '#d1fae5', position: 0 }, { hex: '#bfdbfe', position: 0.5 }, { hex: '#ddd6fe', position: 1 }], 160)],
          autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
          children: [text('Map View', { fontSize: 16, fontWeight: 600, color: '#6b7280', textAlignHorizontal: 'CENTER' })],
        }),
        frame('TripStats', {
          autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Trip Summary', { fontSize: 16, fontWeight: 700, color: '#111827' }),
            frame('StatRow1', {
              autoLayout: horizontal({ spacing: 0 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Duration', { fontSize: 13, fontWeight: 400, color: '#6b7280', layoutSizingHorizontal: 'FILL' }),
                text('18 days', { fontSize: 13, fontWeight: 600, color: '#111827' }),
              ],
            }),
            frame('StatRow2', {
              autoLayout: horizontal({ spacing: 0 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Cities', { fontSize: 13, fontWeight: 400, color: '#6b7280', layoutSizingHorizontal: 'FILL' }),
                text('3', { fontSize: 13, fontWeight: 600, color: '#111827' }),
              ],
            }),
            frame('StatRow3', {
              autoLayout: horizontal({ spacing: 0 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Budget', { fontSize: 13, fontWeight: 400, color: '#6b7280', layoutSizingHorizontal: 'FILL' }),
                text('$5,200', { fontSize: 13, fontWeight: 600, color: '#111827' }),
              ],
            }),
            frame('StatRow4', {
              autoLayout: horizontal({ spacing: 0 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Activities', { fontSize: 13, fontWeight: 400, color: '#6b7280', layoutSizingHorizontal: 'FILL' }),
                text('24 planned', { fontSize: 13, fontWeight: 600, color: '#111827' }),
              ],
            }),
          ],
        }),
        frame('PackingList', {
          autoLayout: vertical({ spacing: 8, padX: 20, padY: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Packing Checklist', { fontSize: 16, fontWeight: 700, color: '#111827' }),
            ...[
              { item: 'Passport & copies', done: true },
              { item: 'Travel insurance docs', done: true },
              { item: 'Power adapter (EU)', done: false },
              { item: 'Comfortable walking shoes', done: false },
              { item: 'Medications', done: true },
            ].map(({ item, done }) =>
              frame(`Pack:${item}`, {
                autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
                layoutSizingHorizontal: 'FILL',
                children: [
                  frame('PackCheck', {
                    size: { x: 16, y: 16 },
                    fills: [solid(done ? '#7c3aed' : '#ffffff')],
                    cornerRadius: 4,
                    strokes: done ? [] : [{ color: { r: 0.8, g: 0.8, b: 0.8, a: 1 }, weight: 1.5, align: 'INSIDE' as const }],
                    children: done ? [text('v', { fontSize: 10, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' })] : [],
                  }),
                  text(item, {
                    fontSize: 13, fontWeight: 400,
                    color: done ? '#9ca3af' : '#374151',
                    textDecoration: done ? 'STRIKETHROUGH' : 'NONE',
                  }),
                ],
              })
            ),
          ],
        }),
      ],
    }),
  ],
});
