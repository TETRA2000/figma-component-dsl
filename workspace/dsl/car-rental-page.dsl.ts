/**
 * Car Rental — Vehicle cards, date picker placeholder, and price comparison
 * DSL features: gradient car images, feature pills, price table, cornerRadius cards
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function vehicleCard(name: string, category: string, price: string, features: string[], grad1: string, grad2: string) {
  return frame(`Vehicle: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('CarImage', { size: { x: 1, y: 140 }, fills: [gradient([{ hex: grad1, position: 0 }, { hex: grad2, position: 1 }], 135)], cornerRadius: { topLeft: 14, topRight: 14, bottomLeft: 0, bottomRight: 0 }, layoutSizingHorizontal: 'FILL' }),
      frame('CarInfo', {
        autoLayout: vertical({ spacing: 10, padX: 14, padY: 14 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('NameRow', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
            text(name, { fontSize: 15, fontWeight: 700, color: '#1e293b' }),
            frame('PriceTag', { autoLayout: vertical({ spacing: 0, counterAlign: 'MAX' }), children: [
              text(price, { fontSize: 18, fontWeight: 800, color: '#0ea5e9' }),
              text('/day', { fontSize: 10, fontWeight: 400, color: '#94a3b8', textAlignHorizontal: 'RIGHT' }),
            ] }),
          ] }),
          frame('CategoryBadge', { autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }), fills: [solid('#eff6ff')], cornerRadius: 6, children: [
            text(category, { fontSize: 10, fontWeight: 600, color: '#3b82f6' }),
          ] }),
          frame('Features', { autoLayout: horizontal({ spacing: 6 }), children: features.map(f =>
            frame(`Feat: ${f}`, { autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }), fills: [solid('#f1f5f9')], cornerRadius: 9999, children: [
              text(f, { fontSize: 10, fontWeight: 500, color: '#475569' }),
            ] })
          ) }),
        ],
      }),
    ],
  });
}

function dateField(label: string, value: string) {
  return frame(`DateField: ${label}`, {
    autoLayout: vertical({ spacing: 4 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 11, fontWeight: 600, color: '#64748b' }),
      frame('Input', {
        autoLayout: horizontal({ spacing: 0, padX: 14, padY: 10 }),
        fills: [solid('#f8fafc')],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
        strokes: [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
        children: [text(value, { fontSize: 13, fontWeight: 500, color: '#1e293b' })],
      }),
    ],
  });
}

function priceRow(category: string, daily: string, weekly: string) {
  return frame(`Price: ${category}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 10, align: 'SPACE_BETWEEN' }),
    fills: [solid('#f8fafc')],
    cornerRadius: 6,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(category, { fontSize: 13, fontWeight: 500, color: '#334155' }),
      frame('Prices', { autoLayout: horizontal({ spacing: 32 }), children: [
        text(daily, { fontSize: 13, fontWeight: 600, color: '#1e293b' }),
        text(weekly, { fontSize: 13, fontWeight: 600, color: '#0ea5e9' }),
      ] }),
    ],
  });
}

export default frame('CarRentalPage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 40, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('DriveEasy', { fontSize: 22, fontWeight: 800, color: '#0ea5e9' }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('Vehicles', { fontSize: 13, fontWeight: 600, color: '#0ea5e9' }),
          text('Locations', { fontSize: 13, fontWeight: 500, color: '#64748b' }),
          text('Deals', { fontSize: 13, fontWeight: 500, color: '#64748b' }),
        ] }),
      ],
    }),
    frame('DateBar', {
      autoLayout: horizontal({ spacing: 16, padX: 40, padY: 18 }),
      fills: [solid('#ffffff')],
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        dateField('Pick-up', 'Mar 20, 2026'),
        dateField('Return', 'Mar 25, 2026'),
        dateField('Location', 'San Francisco Airport'),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 40, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('VehicleGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            vehicleCard('Toyota Corolla', 'Economy', '$42', ['Auto', '5 seats', 'Gas'], '#94a3b8', '#64748b'),
            vehicleCard('Tesla Model 3', 'Electric', '$89', ['Auto', '5 seats', 'EV'], '#0ea5e9', '#0284c7'),
            vehicleCard('BMW X5', 'Luxury SUV', '$125', ['Auto', '7 seats', 'AWD'], '#1e293b', '#0f172a'),
          ],
        }),
        frame('PriceComparison', {
          autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
          fills: [solid('#ffffff')],
          cornerRadius: 14,
          layoutSizingHorizontal: 'FILL',
          strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text('Price Comparison', { fontSize: 18, fontWeight: 700, color: '#1e293b' }),
            frame('TableHeader', { autoLayout: horizontal({ spacing: 0, padX: 16, padY: 6, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
              text('Category', { fontSize: 11, fontWeight: 600, color: '#94a3b8' }),
              frame('Cols', { autoLayout: horizontal({ spacing: 32 }), children: [
                text('Daily', { fontSize: 11, fontWeight: 600, color: '#94a3b8' }),
                text('Weekly', { fontSize: 11, fontWeight: 600, color: '#94a3b8' }),
              ] }),
            ] }),
            priceRow('Economy', '$42', '$250'),
            priceRow('SUV', '$68', '$410'),
            priceRow('Electric', '$89', '$530'),
            priceRow('Luxury', '$125', '$750'),
          ],
        }),
      ],
    }),
  ],
});
