/**
 * Apartment Listing — Floor plan placeholder, amenity icons, price breakdown
 *
 * DSL features stressed: gradient image placeholder, amenity pills,
 * table rows, cornerRadius cards, FILL sizing, SPACE_BETWEEN
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function amenityPill(label: string) {
  return frame(`Amenity: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 7 }),
    fills: [solid('#f0fdf4')],
    cornerRadius: 9999,
    strokes: [{ color: { r: 0.74, g: 0.90, b: 0.78, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#15803d' }),
    ],
  });
}

function priceRow(label: string, amount: string, bold: boolean) {
  return frame(`Price: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 0, padY: 10, align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    strokes: bold ? [] : [{ color: { r: 0.94, g: 0.94, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 14, fontWeight: bold ? 700 : 400, color: bold ? '#111827' : '#6b7280' }),
      text(amount, { fontSize: 14, fontWeight: bold ? 700 : 500, color: bold ? '#111827' : '#374151' }),
    ],
  });
}

function detailItem(label: string, value: string) {
  return frame(`Detail: ${label}`, {
    autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(value, { fontSize: 22, fontWeight: 700, color: '#111827', textAlignHorizontal: 'CENTER' }),
      text(label, { fontSize: 12, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

export default frame('ApartmentListingPage', {
  size: { x: 1040 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f9fafb')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 40, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('HomeFind', { fontSize: 22, fontWeight: 800, color: '#16a34a' }),
        frame('HeaderNav', {
          autoLayout: horizontal({ spacing: 20 }),
          children: [
            text('Search', { fontSize: 14, fontWeight: 500, color: '#374151' }),
            text('Saved', { fontSize: 14, fontWeight: 500, color: '#374151' }),
            text('Messages', { fontSize: 14, fontWeight: 500, color: '#374151' }),
          ],
        }),
      ],
    }),

    // Main content
    frame('ListingContent', {
      autoLayout: horizontal({ spacing: 28, padX: 40, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left column
        frame('LeftCol', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Floor Plan Placeholder
            frame('FloorPlan', {
              autoLayout: vertical({ spacing: 0, counterAlign: 'CENTER' }),
              size: { x: 1, y: 280 },
              fills: [gradient([{ hex: '#d1fae5', position: 0 }, { hex: '#a7f3d0', position: 1 }], 160)],
              cornerRadius: 14,
              layoutSizingHorizontal: 'FILL',
              clipContent: true,
              children: [
                frame('FloorPlanLabel', {
                  autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER' }),
                  fills: [solid('#ffffff99')],
                  cornerRadius: 8,
                  children: [
                    text('Floor Plan — 2BR / 1BA', { fontSize: 14, fontWeight: 600, color: '#15803d' }),
                  ],
                }),
              ],
            }),

            // Details
            frame('QuickDetails', {
              autoLayout: horizontal({ spacing: 0, padX: 20, padY: 20, align: 'SPACE_BETWEEN' }),
              fills: [solid('#ffffff')],
              cornerRadius: 12,
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [
                detailItem('Bedrooms', '2'),
                detailItem('Bathrooms', '1'),
                detailItem('Sq Ft', '950'),
                detailItem('Floor', '3rd'),
              ],
            }),

            // Amenities
            frame('Amenities', {
              autoLayout: vertical({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Amenities', { fontSize: 18, fontWeight: 700, color: '#111827' }),
                frame('AmenityPills', {
                  autoLayout: horizontal({ spacing: 8, wrap: true }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    amenityPill('In-Unit Laundry'),
                    amenityPill('Dishwasher'),
                    amenityPill('Central AC'),
                    amenityPill('Hardwood Floors'),
                    amenityPill('Roof Deck'),
                    amenityPill('Gym'),
                    amenityPill('Pet Friendly'),
                    amenityPill('Parking'),
                  ],
                }),
              ],
            }),
          ],
        }),

        // Right column
        frame('RightCol', {
          autoLayout: vertical({ spacing: 20 }),
          size: { x: 320 },
          children: [
            // Price Card
            frame('PriceCard', {
              autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
              fills: [solid('#ffffff')],
              cornerRadius: 14,
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [
                text('$2,850 /mo', { fontSize: 28, fontWeight: 800, color: '#111827' }),
                text('Sunset District, San Francisco', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
                rectangle('PriceDivider', {
                  size: { x: 1, y: 1 }, fills: [solid('#e5e7eb')], layoutSizingHorizontal: 'FILL',
                }),
                priceRow('Base rent', '$2,850', false),
                priceRow('Utilities (est.)', '$120', false),
                priceRow('Parking', '$150', false),
                rectangle('TotalDivider', {
                  size: { x: 1, y: 2 }, fills: [solid('#111827')], layoutSizingHorizontal: 'FILL',
                }),
                priceRow('Monthly Total', '$3,120', true),
                frame('ApplyBtn', {
                  autoLayout: horizontal({ padY: 14, align: 'CENTER' }),
                  fills: [gradient([{ hex: '#16a34a', position: 0 }, { hex: '#22c55e', position: 1 }], 90)],
                  cornerRadius: 12,
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Apply Now', {
                      fontSize: 15, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER',
                    }),
                  ],
                }),
              ],
            }),

            // Agent Card
            frame('AgentCard', {
              autoLayout: horizontal({ spacing: 14, padX: 20, padY: 18, counterAlign: 'CENTER' }),
              fills: [solid('#ffffff')],
              cornerRadius: 14,
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [
                ellipse('AgentAv', {
                  size: { x: 44, y: 44 },
                  fills: [gradient([{ hex: '#16a34a', position: 0 }, { hex: '#0ea5e9', position: 1 }], 135)],
                }),
                frame('AgentInfo', {
                  autoLayout: vertical({ spacing: 2 }),
                  children: [
                    text('Lisa Park', { fontSize: 15, fontWeight: 600, color: '#111827' }),
                    text('Listing Agent', { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
                    text('(555) 987-6543', { fontSize: 12, fontWeight: 500, color: '#16a34a' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
