/**
 * Map View — Large map placeholder, pins list sidebar, filter categories, distance
 * Batch 7, Page 7: Travel map view
 * DSL Features: clipContent, FILL sizing, nested layouts, SPACE_BETWEEN
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('TravelMap', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
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
        frame('SearchBox', {
          autoLayout: horizontal({ padX: 16, padY: 10, counterAlign: 'CENTER' }),
          size: { x: 320, y: undefined },
          cornerRadius: 8,
          strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            text('Search locations...', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
          ],
        }),
      ],
    }),

    // Map + Sidebar Layout
    frame('MapLayout', {
      autoLayout: horizontal({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Sidebar
        frame('Sidebar', {
          autoLayout: vertical({ spacing: 0 }),
          size: { x: 400, y: undefined },
          fills: [solid('#ffffff')],
          strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            // Filter Categories
            frame('FilterSection', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Categories', { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
                frame('CategoryChips', {
                  autoLayout: horizontal({ spacing: 8 }),
                  children: [
                    categoryChip('All', true),
                    categoryChip('Hotels', false),
                    categoryChip('Food', false),
                    categoryChip('Sights', false),
                  ],
                }),
                frame('CategoryChips2', {
                  autoLayout: horizontal({ spacing: 8 }),
                  children: [
                    categoryChip('Shopping', false),
                    categoryChip('Transport', false),
                    categoryChip('Nightlife', false),
                  ],
                }),
              ],
            }),

            // Distance Filter
            frame('DistanceFilter', {
              autoLayout: horizontal({ spacing: 0, padX: 20, padY: 12, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Distance from center', { fontSize: 13, fontWeight: 500, color: '#64748b', layoutSizingHorizontal: 'FILL' }),
                frame('DistanceValue', {
                  autoLayout: horizontal({ padX: 10, padY: 4 }),
                  fills: [solid('#f1f5f9')],
                  cornerRadius: 4,
                  children: [
                    text('< 5 km', { fontSize: 13, fontWeight: 500, color: '#0369a1' }),
                  ],
                }),
              ],
            }),

            // Results count
            frame('ResultsCount', {
              autoLayout: horizontal({ spacing: 0, padX: 20, padY: 12, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('18 places found', { fontSize: 14, fontWeight: 600, color: '#1e293b', layoutSizingHorizontal: 'FILL' }),
                text('List view', { fontSize: 13, fontWeight: 500, color: '#0369a1' }),
              ],
            }),

            // Pins List
            frame('PinsList', {
              autoLayout: vertical({ spacing: 0 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                pinCard('1', 'Acropolis Museum', 'Museum & Gallery', '0.8 km', '4.7', '#ea580c'),
                pinCard('2', 'Plaka District', 'Historic Neighborhood', '0.3 km', '4.5', '#0369a1'),
                pinCard('3', 'Central Market', 'Food & Shopping', '1.2 km', '4.3', '#16a34a'),
                pinCard('4', 'Temple of Olympian Zeus', 'Historic Site', '1.5 km', '4.6', '#ea580c'),
                pinCard('5', 'Monastiraki Flea Market', 'Shopping', '0.6 km', '4.2', '#d946ef'),
                pinCard('6', 'Syntagma Square', 'Landmark', '0.4 km', '4.1', '#ea580c'),
              ],
            }),
          ],
        }),

        // Map Placeholder
        frame('MapArea', {
          layoutSizingHorizontal: 'FILL',
          size: { x: 1040, y: 700 },
          fills: [solid('#e8efe8')],
          clipContent: true,
          autoLayout: vertical({ spacing: 0, align: 'CENTER', counterAlign: 'CENTER' }),
          children: [
            // Simulated map elements
            frame('MapOverlay', {
              autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                text('Interactive Map', { fontSize: 20, fontWeight: 600, color: '#94a3b8', textAlignHorizontal: 'CENTER' }),
                text('Athens, Greece', { fontSize: 14, fontWeight: 400, color: '#94a3b8', textAlignHorizontal: 'CENTER' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

function categoryChip(label: string, active: boolean) {
  return frame(`Category: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(active ? '#ea580c' : '#f8fafc')],
    cornerRadius: 999,
    strokes: active ? [] : [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: active ? '#ffffff' : '#4b5563' }),
    ],
  });
}

function pinCard(num: string, name: string, type: string, distance: string, rating: string, pinColor: string) {
  return frame(`Pin: ${name}`, {
    autoLayout: horizontal({ spacing: 12, padX: 20, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      // Pin number
      frame('PinNum', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 28, y: 28 },
        fills: [solid(pinColor)],
        cornerRadius: 14,
        children: [
          text(num, { fontSize: 12, fontWeight: 700, color: '#ffffff' }),
        ],
      }),
      // Info
      frame('PinInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
          text(type, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
        ],
      }),
      // Distance & Rating
      frame('PinMeta', {
        autoLayout: vertical({ spacing: 2, counterAlign: 'MAX' }),
        children: [
          text(distance, { fontSize: 12, fontWeight: 500, color: '#0369a1', textAlignHorizontal: 'RIGHT' }),
          frame('PinRating', {
            autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
            children: [
              text('★', { fontSize: 12, fontWeight: 400, color: '#f59e0b' }),
              text(rating, { fontSize: 12, fontWeight: 500, color: '#1e293b' }),
            ],
          }),
        ],
      }),
    ],
  });
}
