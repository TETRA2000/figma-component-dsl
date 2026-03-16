/**
 * Coworking Space Detail — Amenity list, floor plan, pricing tiers, reviews
 * DSL features: gradient hero, amenity icons (rectangles), star ratings, FILL columns, strokes
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function amenityItem(label: string, color: string) {
  return frame(`Amenity:${label}`, {
    autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
    children: [
      rectangle(`Icon:${label}`, { size: { x: 28, y: 28 }, fills: [solid(color)], cornerRadius: 6 }),
      text(label, { fontSize: 13, fontWeight: 500, color: '#374151' }),
    ],
  });
}

function pricingTier(name: string, price: string, features: string[], highlighted: boolean) {
  return frame(`Tier:${name}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
    fills: [solid(highlighted ? '#1e40af' : '#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: highlighted ? [] : [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(name, { fontSize: 16, fontWeight: 600, color: highlighted ? '#ffffff' : '#111827' }),
      text(price, { fontSize: 28, fontWeight: 700, color: highlighted ? '#ffffff' : '#1e40af' }),
      ...features.map(f => text(`- ${f}`, { fontSize: 12, fontWeight: 400, color: highlighted ? '#bfdbfe' : '#6b7280' })),
    ],
  });
}

function reviewCard(name: string, stars: string, comment: string, color: string) {
  return frame(`Review:${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }),
    fills: [solid('#f9fafb')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('RevHeader', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          ellipse(`Av:${name}`, { size: { x: 28, y: 28 }, fills: [solid(color)] }),
          text(name, { fontSize: 13, fontWeight: 600, color: '#111827' }),
          text(stars, { fontSize: 12, fontWeight: 500, color: '#f59e0b' }),
        ],
      }),
      text(comment, { fontSize: 12, fontWeight: 400, color: '#6b7280', size: { x: 300 }, textAutoResize: 'HEIGHT' }),
    ],
  });
}

export default frame('CoworkingDetailPage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 28, padX: 0, padY: 0 }),
  fills: [solid('#ffffff')],
  children: [
    rectangle('Hero', {
      size: { x: 1100, y: 260 },
      fills: [gradient([{ hex: '#1e3a8a', position: 0 }, { hex: '#3b82f6', position: 0.5 }, { hex: '#93c5fd', position: 1 }], 135)],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 48, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('TitleRow', {
          autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('The Hive Workspace', { fontSize: 28, fontWeight: 700, color: '#111827' }),
            text('4.8 stars (124 reviews)', { fontSize: 14, fontWeight: 500, color: '#f59e0b' }),
          ],
        }),
        text('A modern coworking space in downtown with high-speed WiFi, meeting rooms, and a vibrant community.', { fontSize: 14, fontWeight: 400, color: '#6b7280', size: { x: 700 }, textAutoResize: 'HEIGHT' }),
        frame('Amenities', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Amenities', { fontSize: 18, fontWeight: 600, color: '#111827' }),
            frame('AmenityGrid', {
              autoLayout: horizontal({ spacing: 24 }),
              children: [
                amenityItem('High-Speed WiFi', '#3b82f6'),
                amenityItem('Meeting Rooms', '#8b5cf6'),
                amenityItem('Kitchen', '#f59e0b'),
                amenityItem('Phone Booths', '#10b981'),
                amenityItem('24/7 Access', '#ef4444'),
              ],
            }),
          ],
        }),
        frame('FloorPlan', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('Floor Plan', { fontSize: 18, fontWeight: 600, color: '#111827' }),
            rectangle('FloorPlanMap', { size: { x: 500, y: 200 }, fills: [solid('#f3f4f6')], cornerRadius: 10, strokes: [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }] }),
          ],
        }),
        frame('PricingSection', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Pricing', { fontSize: 18, fontWeight: 600, color: '#111827' }),
            frame('Tiers', {
              autoLayout: horizontal({ spacing: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                pricingTier('Day Pass', '$25/day', ['Hot desk', 'WiFi', 'Coffee'], false),
                pricingTier('Monthly', '$349/mo', ['Dedicated desk', 'Meeting rooms', 'Mail service', '24/7 access'], true),
                pricingTier('Office', '$899/mo', ['Private office', 'All amenities', 'Branding', 'Priority support'], false),
              ],
            }),
          ],
        }),
        frame('ReviewsSection', {
          autoLayout: vertical({ spacing: 12, padY: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Reviews', { fontSize: 18, fontWeight: 600, color: '#111827' }),
            frame('ReviewGrid', {
              autoLayout: horizontal({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                reviewCard('Alex P.', '5 stars', 'Amazing space, great community and fantastic coffee!', '#3b82f6'),
                reviewCard('Maria L.', '4 stars', 'Love the meeting rooms. WiFi could be faster occasionally.', '#8b5cf6'),
                reviewCard('Tom R.', '5 stars', 'Best coworking in the city. 24/7 access is a game changer.', '#10b981'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
