/**
 * Car Rental — Vehicle cards with price comparison, category filters, booking form
 * DSL features: card grid, gradient hero, pill filters, price highlighting, feature badges
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function categoryTag(label: string, active: boolean) {
  return frame(`Cat: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 8 }),
    fills: [solid(active ? '#2563eb' : '#f3f4f6')], cornerRadius: 9999,
    children: [text(label, { fontSize: 13, fontWeight: 600, color: active ? '#ffffff' : '#6b7280' })],
  });
}

function vehicleCard(name: string, category: string, price: string, features: string[], color: string, popular: boolean) {
  return frame(`Car: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')], cornerRadius: 14, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('CarImage', {
        size: { x: 1, y: 110 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [gradient([{ hex: color, position: 0 }, { hex: color + 'bb', position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
        children: [
          ...(popular ? [frame('PopBadge', {
            autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }),
            fills: [solid('#fbbf24')], cornerRadius: 9999,
            children: [text('Popular', { fontSize: 10, fontWeight: 700, color: '#78350f' })],
          })] : []),
        ],
      }),
      frame('CarInfo', {
        autoLayout: vertical({ spacing: 8, padX: 14, padY: 14 }), layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 15, fontWeight: 700, color: '#111827' }),
          text(category, { fontSize: 12, fontWeight: 500, color: '#6b7280' }),
          frame('Features', {
            autoLayout: horizontal({ spacing: 6 }),
            children: features.map(f => frame(`F:${f}`, {
              autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }),
              fills: [solid('#eff6ff')], cornerRadius: 6,
              children: [text(f, { fontSize: 10, fontWeight: 500, color: '#2563eb' })],
            })),
          }),
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              frame('Price', {
                autoLayout: horizontal({ spacing: 2, counterAlign: 'MAX' }),
                children: [
                  text(price, { fontSize: 22, fontWeight: 800, color: '#2563eb' }),
                  text('/day', { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
                ],
              }),
              frame('BookBtn', {
                autoLayout: horizontal({ spacing: 0, padX: 16, padY: 8 }),
                fills: [solid('#2563eb')], cornerRadius: 8,
                children: [text('Book Now', { fontSize: 12, fontWeight: 600, color: '#ffffff' })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function bookingField(label: string, value: string) {
  return frame(`Field: ${label}`, {
    autoLayout: vertical({ spacing: 4 }), layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 11, fontWeight: 600, color: '#6b7280' }),
      frame('Input', {
        autoLayout: horizontal({ spacing: 0, padX: 12, padY: 10 }),
        fills: [solid('#f9fafb')], cornerRadius: 8, layoutSizingHorizontal: 'FILL',
        strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
        children: [text(value, { fontSize: 13, fontWeight: 400, color: '#374151' })],
      }),
    ],
  });
}

export default frame('CarRentalPage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('DriveEasy', { fontSize: 22, fontWeight: 800, color: '#2563eb' }),
        frame('Nav', {
          autoLayout: horizontal({ spacing: 18 }),
          children: [
            text('Vehicles', { fontSize: 14, fontWeight: 600, color: '#2563eb' }),
            text('Locations', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
            text('Deals', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
          ],
        }),
      ],
    }),
    frame('SearchBar', {
      autoLayout: horizontal({ spacing: 12, padX: 32, padY: 16 }),
      layoutSizingHorizontal: 'FILL', fills: [solid('#ffffff')],
      children: [
        bookingField('Pick-up', 'San Francisco, CA'),
        bookingField('Pick-up Date', 'Mar 20, 2026'),
        bookingField('Return Date', 'Mar 24, 2026'),
        frame('SearchBtn', {
          autoLayout: horizontal({ spacing: 0, padX: 24, padY: 10 }),
          fills: [solid('#2563eb')], cornerRadius: 8,
          children: [text('Search', { fontSize: 13, fontWeight: 600, color: '#ffffff' })],
        }),
      ],
    }),
    frame('Categories', {
      autoLayout: horizontal({ spacing: 8, padX: 32, padY: 12 }), layoutSizingHorizontal: 'FILL',
      children: [
        categoryTag('All', true), categoryTag('Economy', false), categoryTag('SUV', false),
        categoryTag('Luxury', false), categoryTag('Electric', false),
      ],
    }),
    frame('VehicleGrid', {
      autoLayout: horizontal({ spacing: 16, padX: 32, padY: 12 }), layoutSizingHorizontal: 'FILL',
      children: [
        vehicleCard('Toyota Corolla', 'Economy Sedan', '$42', ['Auto', '5 Seats', 'AC'], '#3b82f6', false),
        vehicleCard('Tesla Model 3', 'Electric Sedan', '$89', ['Auto', 'EV', 'GPS'], '#10b981', true),
        vehicleCard('Jeep Wrangler', 'Mid-size SUV', '$76', ['4WD', '5 Seats', 'AC'], '#f59e0b', false),
        vehicleCard('BMW 5 Series', 'Luxury Sedan', '$125', ['Auto', 'Leather', 'GPS'], '#8b5cf6', false),
      ],
    }),
  ],
});
