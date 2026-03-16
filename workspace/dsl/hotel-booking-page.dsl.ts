/**
 * Hotel Booking — Room cards, amenity icons, booking form
 * DSL features: gradient hero, star rating, price per night, amenity pills, two-column layout
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function roomCard(name: string, price: string, rating: string, color1: string, color2: string) {
  return frame(`Room: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('RoomImage', { size: { x: 1, y: 180 }, fills: [gradient([{ hex: color1, position: 0 }, { hex: color2, position: 1 }], 135)], cornerRadius: { topLeft: 12, topRight: 12, bottomLeft: 0, bottomRight: 0 }, layoutSizingHorizontal: 'FILL' }),
      frame('RoomInfo', {
        autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('NamePrice', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
            text(name, { fontSize: 16, fontWeight: 600, color: '#1e293b' }),
            text(price, { fontSize: 16, fontWeight: 700, color: '#0f766e' }),
          ]}),
          frame('RatingRow', { autoLayout: horizontal({ spacing: 4 }), children: [
            text(rating, { fontSize: 13, fontWeight: 500, color: '#f59e0b' }),
            text('per night', { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
          ]}),
        ],
      }),
    ],
  });
}

function amenityPill(label: string) {
  return frame(`Am: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 12, padY: 6 }),
    fills: [solid('#f0fdfa')],
    cornerRadius: 9999,
    strokes: [{ color: { r: 0.80, g: 0.94, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [text(label, { fontSize: 12, fontWeight: 500, color: '#0f766e' })],
  });
}

export default frame('HotelBookingPage', {
  size: { x: 1200 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 8, padX: 80, padY: 56, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#0f766e', position: 0 }, { hex: '#134e4a', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Find Your Perfect Stay', { fontSize: 36, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        text('Luxury hotels at affordable prices', { fontSize: 16, fontWeight: 400, color: '#99f6e4', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 48, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Available Rooms', { fontSize: 22, fontWeight: 700, color: '#1e293b' }),
        frame('RoomGrid', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            roomCard('Deluxe Suite', '$289', '4.9 stars', '#0f766e', '#115e59'),
            roomCard('Ocean View', '$199', '4.7 stars', '#0284c7', '#0369a1'),
            roomCard('Garden Room', '$149', '4.5 stars', '#65a30d', '#4d7c0f'),
          ],
        }),
        frame('Amenities', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Amenities', { fontSize: 18, fontWeight: 600, color: '#1e293b' }),
            frame('AmenityRow', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                amenityPill('Free WiFi'), amenityPill('Pool'), amenityPill('Spa'),
                amenityPill('Restaurant'), amenityPill('Gym'), amenityPill('Parking'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
