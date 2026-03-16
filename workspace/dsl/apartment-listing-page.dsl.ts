/**
 * Apartment Listing — Floor plan placeholder, amenities grid, resident reviews
 * DSL features: gradient hero, feature grid, review cards with ellipse avatars, amenity tags
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function amenityItem(icon: string, label: string) {
  return frame(`Amenity: ${label}`, {
    autoLayout: horizontal({ spacing: 8, padX: 12, padY: 8, counterAlign: 'CENTER' }),
    fills: [solid('#f8fafc')], cornerRadius: 8, layoutSizingHorizontal: 'FILL',
    children: [
      text(icon, { fontSize: 16, fontWeight: 400, color: '#2563eb' }),
      text(label, { fontSize: 13, fontWeight: 500, color: '#374151' }),
    ],
  });
}

function reviewCard(name: string, rating: number, comment: string, date: string, color: string) {
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  return frame(`Review: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }),
    fills: [solid('#ffffff')], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('ReviewHeader', {
        autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
        children: [
          ellipse(`Av:${name}`, { size: { x: 36, y: 36 }, fills: [solid(color)] }),
          frame('ReviewerInfo', {
            autoLayout: vertical({ spacing: 1 }),
            children: [
              text(name, { fontSize: 13, fontWeight: 600, color: '#111827' }),
              text(date, { fontSize: 11, fontWeight: 400, color: '#9ca3af' }),
            ],
          }),
        ],
      }),
      text(stars, { fontSize: 13, fontWeight: 400, color: '#f59e0b' }),
      text(comment, {
        fontSize: 13, fontWeight: 400, color: '#6b7280',
        size: { x: 400 }, textAutoResize: 'HEIGHT', lineHeight: { value: 150, unit: 'PERCENT' },
      }),
    ],
  });
}

function detailRow(label: string, value: string) {
  return frame(`Detail: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padY: 8 }), layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: '#6b7280', layoutSizingHorizontal: 'FILL' }),
      text(value, { fontSize: 13, fontWeight: 600, color: '#111827' }),
    ],
  });
}

export default frame('ApartmentListingPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    rectangle('HeroImage', {
      size: { x: 1000, y: 300 },
      fills: [gradient([{ hex: '#475569', position: 0 }, { hex: '#94a3b8', position: 0.5 }, { hex: '#e2e8f0', position: 1 }], 160)],
    }),
    frame('ListingHeader', {
      autoLayout: horizontal({ spacing: 0, padX: 36, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('TitleArea', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('The Meridian — Unit 8B', { fontSize: 24, fontWeight: 800, color: '#111827' }),
            text('2BR / 2BA • 1,150 sqft • Available Apr 1', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
          ],
        }),
        frame('PriceArea', {
          autoLayout: vertical({ spacing: 0, counterAlign: 'MAX' }),
          children: [
            text('$2,850/mo', { fontSize: 26, fontWeight: 800, color: '#2563eb' }),
            text('12-month lease', { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
          ],
        }),
      ],
    }),
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 28, padX: 36, padY: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('LeftCol', {
          autoLayout: vertical({ spacing: 20 }), layoutSizingHorizontal: 'FILL',
          children: [
            frame('FloorPlan', {
              autoLayout: vertical({ spacing: 8 }), layoutSizingHorizontal: 'FILL',
              children: [
                text('Floor Plan', { fontSize: 18, fontWeight: 700, color: '#111827' }),
                frame('PlanPlaceholder', {
                  size: { x: 1, y: 200 },
                  autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#f1f5f9')], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
                  children: [text('Floor Plan View', { fontSize: 14, fontWeight: 500, color: '#94a3b8' })],
                }),
              ],
            }),
            frame('Amenities', {
              autoLayout: vertical({ spacing: 8 }), layoutSizingHorizontal: 'FILL',
              children: [
                text('Amenities', { fontSize: 18, fontWeight: 700, color: '#111827' }),
                frame('AmenRow1', {
                  autoLayout: horizontal({ spacing: 8 }), layoutSizingHorizontal: 'FILL',
                  children: [amenityItem('🏊', 'Pool'), amenityItem('💪', 'Gym'), amenityItem('🅿️', 'Parking')],
                }),
                frame('AmenRow2', {
                  autoLayout: horizontal({ spacing: 8 }), layoutSizingHorizontal: 'FILL',
                  children: [amenityItem('🐕', 'Pet Friendly'), amenityItem('👕', 'In-Unit Laundry'), amenityItem('📦', 'Storage')],
                }),
              ],
            }),
            frame('Reviews', {
              autoLayout: vertical({ spacing: 10 }), layoutSizingHorizontal: 'FILL',
              children: [
                text('Resident Reviews', { fontSize: 18, fontWeight: 700, color: '#111827' }),
                reviewCard('Alex Morgan', 5, 'Great location and responsive management. The pool area is amazing and the gym is well-maintained.', 'Feb 2026', '#3b82f6'),
                reviewCard('Jamie Lee', 4, 'Love the apartment layout. Only wish the parking garage was a bit closer to the elevator.', 'Jan 2026', '#ec4899'),
              ],
            }),
          ],
        }),
        frame('RightCol', {
          size: { x: 280 },
          autoLayout: vertical({ spacing: 12 }),
          children: [
            frame('Details', {
              autoLayout: vertical({ spacing: 2, padX: 18, padY: 18 }),
              fills: [solid('#f8fafc')], cornerRadius: 14, layoutSizingHorizontal: 'FILL',
              children: [
                text('Unit Details', { fontSize: 15, fontWeight: 700, color: '#111827' }),
                detailRow('Floor', '8th'),
                detailRow('Bedrooms', '2'),
                detailRow('Bathrooms', '2'),
                detailRow('Sq Ft', '1,150'),
                detailRow('Deposit', '$2,850'),
                detailRow('Pets', 'Allowed ($50/mo)'),
              ],
            }),
            frame('ApplyBtn', {
              autoLayout: horizontal({ spacing: 0, padY: 14, align: 'CENTER' }),
              fills: [solid('#2563eb')], cornerRadius: 10, layoutSizingHorizontal: 'FILL',
              children: [text('Apply Now', { fontSize: 15, fontWeight: 700, color: '#ffffff' })],
            }),
            frame('TourBtn', {
              autoLayout: horizontal({ spacing: 0, padY: 14, align: 'CENTER' }),
              fills: [solid('#ffffff')], cornerRadius: 10, layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.15, g: 0.39, b: 0.92, a: 1 }, weight: 1.5, align: 'INSIDE' as const }],
              children: [text('Schedule Tour', { fontSize: 15, fontWeight: 700, color: '#2563eb' })],
            }),
          ],
        }),
      ],
    }),
  ],
});
