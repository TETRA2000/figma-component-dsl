/**
 * Pet Store — Product cards, category navigation, and shopping cart
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function productCard(name: string, price: string, rating: string, category: string, color: string) {
  return frame(`Product: ${name}`, {
    autoLayout: vertical({ spacing: 12, padX: 16, padY: 16 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('ProductImage', { size: { x: 220, y: 140 }, fills: [solid(color + '1a')], cornerRadius: 8, layoutSizingHorizontal: 'FILL' }),
      frame('Badge', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(color + '15')], cornerRadius: 9999, children: [text(category, { fontSize: 10, fontWeight: 600, color })] }),
      text(name, { fontSize: 15, fontWeight: 600, color: '#1a1a2e' }),
      frame('PriceRow', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(price, { fontSize: 18, fontWeight: 700, color: '#059669' }),
          text(`★ ${rating}`, { fontSize: 12, fontWeight: 600, color: '#f59e0b' }),
        ],
      }),
    ],
  });
}

function categoryTab(label: string, active: boolean) {
  return frame(`Cat: ${label}`, {
    autoLayout: horizontal({ padX: 18, padY: 8 }),
    fills: [solid(active ? '#059669' : '#f1f5f9')],
    cornerRadius: 9999,
    children: [text(label, { fontSize: 13, fontWeight: 600, color: active ? '#ffffff' : '#64748b' })],
  });
}

function cartItem(name: string, qty: number, price: string) {
  return frame(`CartItem: ${name}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 12, padY: 10 }),
    fills: [solid('#f8fafc')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ItemInfo', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
        ellipse('Thumb', { size: { x: 32, y: 32 }, fills: [solid('#e2e8f0')] }),
        text(name, { fontSize: 13, fontWeight: 500, color: '#334155' }),
      ] }),
      frame('QtyPrice', { autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }), children: [
        text(`x${qty}`, { fontSize: 12, fontWeight: 600, color: '#64748b' }),
        text(price, { fontSize: 13, fontWeight: 700, color: '#059669' }),
      ] }),
    ],
  });
}

export default frame('PetStorePage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 48, padY: 20 }),
      fills: [solid('#ffffff')],
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('🐾 PawShop', { fontSize: 22, fontWeight: 800, color: '#059669' }),
        frame('CartBadge', { autoLayout: horizontal({ spacing: 6, padX: 14, padY: 8, counterAlign: 'CENTER' }), fills: [solid('#059669')], cornerRadius: 9999, children: [
          text('Cart (3)', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
        ] }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 48, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Categories', {
          autoLayout: horizontal({ spacing: 8 }),
          children: [
            categoryTab('All', false), categoryTab('Dogs', true), categoryTab('Cats', false),
            categoryTab('Birds', false), categoryTab('Fish', false), categoryTab('Small Pets', false),
          ],
        }),
        frame('ProductGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            productCard('Premium Dog Food', '$42.99', '4.8', 'Food', '#059669'),
            productCard('Interactive Ball', '$18.50', '4.6', 'Toys', '#3b82f6'),
            productCard('Cozy Pet Bed', '$65.00', '4.9', 'Beds', '#8b5cf6'),
            productCard('Grooming Kit', '$29.99', '4.5', 'Care', '#f59e0b'),
          ],
        }),
        frame('CartSection', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Your Cart', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            cartItem('Premium Dog Food', 2, '$85.98'),
            cartItem('Interactive Ball', 1, '$18.50'),
            frame('Total', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', padX: 12, padY: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Total', { fontSize: 16, fontWeight: 700, color: '#0f172a' }),
                text('$104.48', { fontSize: 18, fontWeight: 800, color: '#059669' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
