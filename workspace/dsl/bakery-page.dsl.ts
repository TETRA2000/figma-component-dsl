/**
 * Bakery Shop — Product showcase, daily specials, and order form
 * DSL features: warm palette, gradient pastry images, price badges, SPACE_BETWEEN, cornerRadius
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function pastryCard(name: string, price: string, desc: string, grad1: string, grad2: string) {
  return frame(`Pastry: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.89, b: 0.84, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('PastryImage', { size: { x: 1, y: 130 }, fills: [gradient([{ hex: grad1, position: 0 }, { hex: grad2, position: 1 }], 135)], cornerRadius: { topLeft: 14, topRight: 14, bottomLeft: 0, bottomRight: 0 }, layoutSizingHorizontal: 'FILL' }),
      frame('PastryInfo', {
        autoLayout: vertical({ spacing: 6, padX: 14, padY: 12 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('NamePrice', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
            text(name, { fontSize: 15, fontWeight: 600, color: '#451a03' }),
            frame('PriceBadge', { autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }), fills: [solid('#fef3c7')], cornerRadius: 8, children: [
              text(price, { fontSize: 13, fontWeight: 700, color: '#92400e' }),
            ] }),
          ] }),
          text(desc, { fontSize: 12, fontWeight: 400, color: '#78716c' }),
        ],
      }),
    ],
  });
}

function specialItem(name: string, originalPrice: string, salePrice: string) {
  return frame(`Special: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    fills: [solid('#fffbeb')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(name, { fontSize: 14, fontWeight: 600, color: '#451a03' }),
      frame('Prices', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
        text(originalPrice, { fontSize: 12, fontWeight: 400, color: '#a8a29e' }),
        frame('SaleBadge', { autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }), fills: [solid('#dc2626')], cornerRadius: 8, children: [
          text(salePrice, { fontSize: 13, fontWeight: 700, color: '#ffffff' }),
        ] }),
      ] }),
    ],
  });
}

function orderField(label: string, placeholder: string) {
  return frame(`Field: ${label}`, {
    autoLayout: vertical({ spacing: 4 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 600, color: '#78350f' }),
      frame('Input', {
        autoLayout: horizontal({ spacing: 0, padX: 14, padY: 10 }),
        fills: [solid('#ffffff')],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
        strokes: [{ color: { r: 0.88, g: 0.84, b: 0.78, a: 1 }, weight: 1, align: 'INSIDE' as const }],
        children: [text(placeholder, { fontSize: 13, fontWeight: 400, color: '#a8a29e' })],
      }),
    ],
  });
}

export default frame('BakeryPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fefce8')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 48, padY: 36, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#78350f', position: 0 }, { hex: '#b45309', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Golden Crust Bakery', { fontSize: 28, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        text('Freshly baked every morning since 1987', { fontSize: 14, fontWeight: 400, color: '#fde68a', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 44, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Products', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Our Favorites', { fontSize: 20, fontWeight: 700, color: '#451a03' }),
            frame('ProductGrid', { autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
              pastryCard('Croissant', '$4.50', 'Buttery, flaky layers of perfection', '#d97706', '#f59e0b'),
              pastryCard('Sourdough Loaf', '$8.00', 'Slow-fermented 48 hours, crusty exterior', '#92400e', '#b45309'),
              pastryCard('Cinnamon Roll', '$5.50', 'Warm, gooey, cream cheese frosting', '#c2410c', '#ea580c'),
            ] }),
          ],
        }),
        frame('Specials', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('SpecialHeader', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
              text('Daily Specials', { fontSize: 18, fontWeight: 700, color: '#451a03' }),
              text('Today only', { fontSize: 12, fontWeight: 600, color: '#dc2626' }),
            ] }),
            specialItem('Blueberry Muffin', '$4.00', '$2.50'),
            specialItem('Chocolate Eclair', '$5.50', '$3.75'),
            specialItem('Apple Turnover', '$4.25', '$2.99'),
          ],
        }),
        frame('OrderForm', {
          autoLayout: vertical({ spacing: 14, padX: 24, padY: 24 }),
          fills: [solid('#fffbeb')],
          cornerRadius: 16,
          layoutSizingHorizontal: 'FILL',
          strokes: [{ color: { r: 0.93, g: 0.89, b: 0.80, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text('Place an Order', { fontSize: 18, fontWeight: 700, color: '#451a03' }),
            frame('Fields', { autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
              orderField('Name', 'Your name'),
              orderField('Phone', '(555) 000-0000'),
            ] }),
            orderField('Special Instructions', 'Allergies, preferences...'),
          ],
        }),
      ],
    }),
  ],
});
