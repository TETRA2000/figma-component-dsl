/**
 * Bike Shop — Bike cards, services, and accessories
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function bikeCard(name: string, type: string, price: string, color: string) {
  return frame(`Bike: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 14, padY: 14 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('BikeImg', { size: { x: 220, y: 140 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#1e293b', position: 1 }], 150)], cornerRadius: 8, layoutSizingHorizontal: 'FILL' }),
      frame('TypeBadge', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(color + '15')], cornerRadius: 9999, children: [text(type, { fontSize: 10, fontWeight: 600, color })] }),
      text(name, { fontSize: 15, fontWeight: 600, color: '#1e293b' }),
      text(price, { fontSize: 18, fontWeight: 700, color: '#059669' }),
    ],
  });
}

function serviceItem(name: string, price: string, time: string) {
  return frame(`Service: ${name}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 14, padY: 12 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('SvcInfo', { autoLayout: vertical({ spacing: 2 }), children: [
        text(name, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
        text(time, { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
      ] }),
      text(price, { fontSize: 14, fontWeight: 700, color: '#059669' }),
    ],
  });
}

function accessoryChip(name: string, price: string) {
  return frame(`Acc: ${name}`, {
    autoLayout: horizontal({ spacing: 8, padX: 12, padY: 8, counterAlign: 'CENTER' }),
    fills: [solid('#f0fdf4')],
    cornerRadius: 8,
    children: [
      text(name, { fontSize: 12, fontWeight: 500, color: '#166534' }),
      text(price, { fontSize: 12, fontWeight: 700, color: '#059669' }),
    ],
  });
}

export default frame('BikeShopPage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 48, padY: 18 }),
      fills: [gradient([{ hex: '#14532d', position: 0 }, { hex: '#059669', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Spoke & Wheel Bikes', { fontSize: 22, fontWeight: 800, color: '#ffffff' }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('Bikes', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
          text('Service', { fontSize: 13, fontWeight: 500, color: '#a7f3d0' }),
          text('Accessories', { fontSize: 13, fontWeight: 500, color: '#a7f3d0' }),
        ] }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 48, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Bikes', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Featured Bikes', { fontSize: 20, fontWeight: 700, color: '#0f172a' }),
            frame('BikeGrid', { autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
              bikeCard('Trail Master 29er', 'Mountain', '$1,299', '#059669'),
              bikeCard('Urban Commuter', 'City', '$799', '#2563eb'),
              bikeCard('Carbon Aero Pro', 'Road', '$3,499', '#ef4444'),
              bikeCard('E-Cruiser 500', 'Electric', '$2,199', '#7c3aed'),
            ] }),
          ],
        }),
        frame('Services', {
          autoLayout: vertical({ spacing: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Shop Services', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            serviceItem('Basic Tune-Up', '$59', '1-2 days'),
            serviceItem('Complete Overhaul', '$189', '3-5 days'),
            serviceItem('Flat Tire Repair', '$15', 'Same day'),
            serviceItem('Brake Adjustment', '$35', 'Same day'),
            serviceItem('Wheel Truing', '$25', '1 day'),
          ],
        }),
        frame('Accessories', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Popular Accessories', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            frame('AccGrid', { autoLayout: horizontal({ spacing: 8 }), children: [
              accessoryChip('Helmet', '$65'), accessoryChip('Lock', '$45'),
              accessoryChip('Lights Set', '$35'), accessoryChip('Water Bottle', '$15'),
              accessoryChip('Bike Rack', '$120'), accessoryChip('Pump', '$28'),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
