/**
 * Bakery Menu — Pastry cards, daily specials, and order form
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function pastryCard(name: string, price: string, desc: string, color: string) {
  return frame(`Pastry: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 14, padY: 14 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.94, g: 0.92, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('PastryImg', { size: { x: 160, y: 100 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#fbbf24', position: 1 }], 135)], cornerRadius: 8, layoutSizingHorizontal: 'FILL' }),
      text(name, { fontSize: 14, fontWeight: 600, color: '#451a03' }),
      text(desc, { fontSize: 11, fontWeight: 400, color: '#92400e' }),
      text(price, { fontSize: 16, fontWeight: 700, color: '#b45309' }),
    ],
  });
}

function specialBanner(title: string, desc: string, price: string) {
  return frame('DailySpecial', {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 18, padY: 16 }),
    fills: [gradient([{ hex: '#92400e', position: 0 }, { hex: '#b45309', position: 1 }], 135)],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('SpecialInfo', { autoLayout: vertical({ spacing: 4 }), children: [
        text('⭐ Today\'s Special', { fontSize: 10, fontWeight: 700, color: '#fde68a' }),
        text(title, { fontSize: 18, fontWeight: 700, color: '#ffffff' }),
        text(desc, { fontSize: 12, fontWeight: 400, color: '#fef3c7' }),
      ] }),
      text(price, { fontSize: 24, fontWeight: 800, color: '#fde68a' }),
    ],
  });
}

function formField(label: string, placeholder: string) {
  return frame(`Field: ${label}`, {
    autoLayout: vertical({ spacing: 4 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 600, color: '#451a03' }),
      frame('Input', { autoLayout: horizontal({ padX: 12, padY: 10 }), fills: [solid('#ffffff')], cornerRadius: 8, layoutSizingHorizontal: 'FILL', strokes: [{ color: { r: 0.88, g: 0.85, b: 0.8, a: 1 }, weight: 1, align: 'INSIDE' as const }], children: [
        text(placeholder, { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
      ] }),
    ],
  });
}

export default frame('BakeryPage', {
  size: { x: 700 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fef7ed')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 4, padX: 28, padY: 24, counterAlign: 'CENTER' }),
      fills: [solid('#451a03')],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Golden Crust Bakery', { fontSize: 24, fontWeight: 800, color: '#fde68a' }),
        text('Fresh-baked daily since 1987', { fontSize: 13, fontWeight: 400, color: '#fef3c7' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 22, padX: 28, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        specialBanner('Maple Pecan Danish', 'Flaky layers with caramel glaze', '$4.50'),
        frame('Menu', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Our Menu', { fontSize: 18, fontWeight: 700, color: '#451a03' }),
            frame('PastryGrid', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              pastryCard('Croissant', '$3.50', 'Buttery, flaky, classic French', '#d97706'),
              pastryCard('Sourdough Loaf', '$7.00', 'Tangy, crusty, artisan bread', '#92400e'),
              pastryCard('Cinnamon Roll', '$4.25', 'Warm, gooey, cream cheese icing', '#ea580c'),
            ] }),
          ],
        }),
        frame('OrderForm', {
          autoLayout: vertical({ spacing: 12, padX: 18, padY: 18 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Place an Order', { fontSize: 16, fontWeight: 700, color: '#451a03' }),
            formField('Your Name', 'Enter your name'),
            formField('Phone Number', '(555) 000-0000'),
            formField('Pickup Time', 'Select a time'),
            frame('SubmitBtn', { autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER' }), fills: [solid('#b45309')], cornerRadius: 8, layoutSizingHorizontal: 'FILL', children: [
              text('Submit Order', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
