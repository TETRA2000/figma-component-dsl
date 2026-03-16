/**
 * Campsite Booking — Site cards, amenities, and weather info
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function siteCard(name: string, type: string, price: string, rating: string, features: string[], color: string) {
  return frame(`Site: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('SiteImage', { size: { x: 250, y: 120 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#166534', position: 1 }], 135)], cornerRadius: 8, layoutSizingHorizontal: 'FILL' }),
      frame('TypeBadge', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(color + '15')], cornerRadius: 9999, children: [text(type, { fontSize: 10, fontWeight: 600, color })] }),
      text(name, { fontSize: 15, fontWeight: 600, color: '#1e293b' }),
      frame('PriceRating', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        text(`${price}/night`, { fontSize: 16, fontWeight: 700, color: '#166534' }),
        text(`★ ${rating}`, { fontSize: 12, fontWeight: 600, color: '#f59e0b' }),
      ] }),
      frame('Features', { autoLayout: horizontal({ spacing: 6 }), children: features.map(f =>
        frame(`Feat: ${f}`, { autoLayout: horizontal({ padX: 6, padY: 2 }), fills: [solid('#f0fdf4')], cornerRadius: 4, children: [text(f, { fontSize: 10, fontWeight: 500, color: '#166534' })] })
      ) }),
    ],
  });
}

function weatherDay(day: string, icon: string, high: string, low: string) {
  return frame(`Weather: ${day}`, {
    autoLayout: vertical({ spacing: 4, padX: 12, padY: 10, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    children: [
      text(day, { fontSize: 11, fontWeight: 600, color: '#475569' }),
      text(icon, { fontSize: 22, fontWeight: 400, color: '#475569' }),
      text(high, { fontSize: 14, fontWeight: 700, color: '#1e293b' }),
      text(low, { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
    ],
  });
}

function amenityChip(label: string) {
  return frame(`Amenity: ${label}`, {
    autoLayout: horizontal({ padX: 12, padY: 6 }),
    fills: [solid('#ecfdf5')],
    cornerRadius: 9999,
    children: [text(label, { fontSize: 12, fontWeight: 500, color: '#166534' })],
  });
}

export default frame('CampingPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f0fdf4')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 44, padY: 32 }),
      fills: [gradient([{ hex: '#14532d', position: 0 }, { hex: '#166534', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Pine Ridge Campgrounds', { fontSize: 26, fontWeight: 800, color: '#ffffff' }),
        text('Escape to nature — reserve your perfect campsite', { fontSize: 14, fontWeight: 400, color: '#bbf7d0' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 44, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Weather', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Weather Forecast', { fontSize: 18, fontWeight: 700, color: '#14532d' }),
            frame('WeatherRow', { autoLayout: horizontal({ spacing: 10 }), children: [
              weatherDay('Mon', '☀️', '72°F', '51°F'),
              weatherDay('Tue', '⛅', '68°F', '49°F'),
              weatherDay('Wed', '🌧', '60°F', '45°F'),
              weatherDay('Thu', '☀️', '74°F', '52°F'),
              weatherDay('Fri', '☀️', '76°F', '54°F'),
            ] }),
          ],
        }),
        frame('Sites', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Available Campsites', { fontSize: 18, fontWeight: 700, color: '#14532d' }),
            frame('SiteGrid', { autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
              siteCard('Lakeside A12', 'Tent', '$35', '4.9', ['Lake view', 'Fire pit', 'Shade'], '#2563eb'),
              siteCard('Forest B7', 'RV', '$55', '4.7', ['Full hookup', '30 amp', 'Pull-through'], '#166534'),
              siteCard('Meadow C3', 'Cabin', '$120', '4.8', ['Sleeps 4', 'Kitchen', 'A/C'], '#b45309'),
            ] }),
          ],
        }),
        frame('Amenities', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Campground Amenities', { fontSize: 18, fontWeight: 700, color: '#14532d' }),
            frame('AmenityGrid', { autoLayout: horizontal({ spacing: 8 }), children: [
              amenityChip('Showers'), amenityChip('WiFi'), amenityChip('Camp Store'),
              amenityChip('Boat Rental'), amenityChip('Fishing'), amenityChip('Hiking Trails'),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
