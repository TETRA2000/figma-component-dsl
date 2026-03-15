/**
 * Trip Itinerary — Day-by-day timeline, activity cards, time slots, map placeholder, sharing
 * Batch 7, Page 4: Trip itinerary planner
 * DSL Features: nested layouts, FILL sizing, clipContent, gradient overlays
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('TravelItinerary', {
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
        frame('NavActions', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            frame('ShareBtn', {
              autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 8,
              strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Share Trip', { fontSize: 13, fontWeight: 500, color: '#64748b' }),
              ],
            }),
            frame('ExportBtn', {
              autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 8,
              strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Export PDF', { fontSize: 13, fontWeight: 500, color: '#64748b' }),
              ],
            }),
            frame('EditBtn', {
              autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#ea580c')],
              cornerRadius: 8,
              children: [
                text('Edit Trip', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Trip Header
    frame('TripHeader', {
      autoLayout: vertical({ spacing: 8, padX: 80, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        frame('TripBadge', {
          autoLayout: horizontal({ padX: 12, padY: 4 }),
          fills: [solid('#fff7ed')],
          cornerRadius: 999,
          children: [
            text('7-Day Trip', { fontSize: 12, fontWeight: 600, color: '#ea580c' }),
          ],
        }),
        text('Tokyo & Kyoto Adventure', { fontSize: 32, fontWeight: 700, color: '#1e293b' }),
        text('March 20 - March 27, 2026  |  2 Travelers', {
          fontSize: 15, fontWeight: 400, color: '#64748b',
        }),
      ],
    }),

    // Main Content
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 32, padX: 80, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Timeline
        frame('Timeline', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Day Tabs
            frame('DayTabs', {
              autoLayout: horizontal({ spacing: 8, padY: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                dayTab('Day 1', 'Mar 20', true),
                dayTab('Day 2', 'Mar 21', false),
                dayTab('Day 3', 'Mar 22', false),
                dayTab('Day 4', 'Mar 23', false),
                dayTab('Day 5', 'Mar 24', false),
                dayTab('Day 6', 'Mar 25', false),
                dayTab('Day 7', 'Mar 26', false),
              ],
            }),

            // Day 1 Activities
            frame('DayActivities', {
              autoLayout: vertical({ spacing: 0, padY: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                activityCard('09:00', 'Arrival at Narita Airport', 'Arrive at NRT, pick up JR Pass, take Narita Express to Shinjuku Station.', 'transport', '2h'),
                timelineLine(),
                activityCard('12:00', 'Check-in at Hotel Gracery', 'Located in Kabukicho, Shinjuku. Walking distance to major attractions.', 'hotel', '1h'),
                timelineLine(),
                activityCard('14:00', 'Meiji Shrine Visit', 'Explore the serene Meiji Shrine and surrounding Yoyogi Park.', 'attraction', '2h'),
                timelineLine(),
                activityCard('16:30', 'Harajuku & Takeshita Street', 'Walk through the vibrant fashion district, try crepes and street food.', 'shopping', '2h'),
                timelineLine(),
                activityCard('19:00', 'Dinner at Ichiran Ramen', 'Famous tonkotsu ramen chain with individual booth seating.', 'food', '1h'),
              ],
            }),
          ],
        }),

        // Right: Map Placeholder
        frame('MapSection', {
          autoLayout: vertical({ spacing: 0 }),
          size: { x: 400, y: undefined },
          children: [
            frame('MapPlaceholder', {
              size: { x: 400, y: 400 },
              fills: [solid('#e2e8f0')],
              cornerRadius: 16,
              clipContent: true,
              autoLayout: vertical({ spacing: 8, padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
              children: [
                text('Map View', { fontSize: 16, fontWeight: 600, color: '#94a3b8', textAlignHorizontal: 'CENTER' }),
                text('Interactive map with\nactivity locations', {
                  fontSize: 13, fontWeight: 400, color: '#94a3b8',
                  textAlignHorizontal: 'CENTER',
                  lineHeight: { value: 20, unit: 'PIXELS' },
                }),
              ],
            }),
            // Trip Summary
            frame('TripSummary', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              size: { x: 400, y: undefined },
              fills: [solid('#ffffff')],
              cornerRadius: 16,
              strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Trip Summary', { fontSize: 16, fontWeight: 600, color: '#1e293b' }),
                summaryRow('Total Distance', '142 km'),
                summaryRow('Activities', '28 planned'),
                summaryRow('Accommodations', '2 hotels'),
                summaryRow('Est. Budget', '$3,450'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

function dayTab(day: string, date: string, active: boolean) {
  return frame(`Tab: ${day}`, {
    autoLayout: vertical({ spacing: 2, padX: 16, padY: 8, counterAlign: 'CENTER' }),
    fills: [solid(active ? '#ea580c' : '#ffffff')],
    cornerRadius: 8,
    strokes: active ? [] : [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(day, { fontSize: 13, fontWeight: 600, color: active ? '#ffffff' : '#1e293b' }),
      text(date, { fontSize: 11, fontWeight: 400, color: active ? '#ffffffcc' : '#94a3b8' }),
    ],
  });
}

function activityCard(time: string, title: string, description: string, type: string, duration: string) {
  const typeColors: Record<string, string> = {
    transport: '#0369a1',
    hotel: '#7c3aed',
    attraction: '#ea580c',
    shopping: '#d946ef',
    food: '#16a34a',
  };
  const color = typeColors[type] || '#64748b';

  return frame(`Activity: ${title}`, {
    autoLayout: horizontal({ spacing: 16, padX: 0, padY: 12 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      // Time column
      frame('TimeCol', {
        autoLayout: vertical({ spacing: 0, counterAlign: 'MAX' }),
        size: { x: 60, y: undefined },
        children: [
          text(time, { fontSize: 14, fontWeight: 600, color: '#1e293b', textAlignHorizontal: 'RIGHT' }),
        ],
      }),
      // Dot
      frame('DotCol', {
        autoLayout: vertical({ spacing: 0, counterAlign: 'CENTER' }),
        size: { x: 16, y: undefined },
        children: [
          rectangle('Dot', {
            size: { x: 12, y: 12 },
            fills: [solid(color)],
            cornerRadius: 6,
          }),
        ],
      }),
      // Content
      frame('ActivityContent', {
        autoLayout: vertical({ spacing: 6, padX: 16, padY: 12 }),
        layoutSizingHorizontal: 'FILL',
        fills: [solid('#ffffff')],
        cornerRadius: 12,
        strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
        children: [
          frame('ActivityHeader', {
            autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(title, { fontSize: 15, fontWeight: 600, color: '#1e293b', layoutSizingHorizontal: 'FILL' }),
              frame('DurationBadge', {
                autoLayout: horizontal({ padX: 8, padY: 2 }),
                fills: [solid('#f1f5f9')],
                cornerRadius: 4,
                children: [
                  text(duration, { fontSize: 11, fontWeight: 500, color: '#64748b' }),
                ],
              }),
            ],
          }),
          text(description, {
            fontSize: 13, fontWeight: 400, color: '#64748b',
            lineHeight: { value: 20, unit: 'PIXELS' },
          }),
        ],
      }),
    ],
  });
}

function timelineLine() {
  return frame('TimelineLine', {
    autoLayout: horizontal({ spacing: 0, padX: 0, padY: 0 }),
    size: { x: 1, y: 8 },
    children: [],
  });
}

function summaryRow(label: string, value: string) {
  return frame(`Summary: ${label}`, {
    autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 400, color: '#64748b', layoutSizingHorizontal: 'FILL' }),
      text(value, { fontSize: 13, fontWeight: 600, color: '#1e293b' }),
    ],
  });
}
