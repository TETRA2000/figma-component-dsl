/**
 * Plant Shop — Plant e-commerce with care icons, cart summary, and green nature theme
 * DSL features stressed: green-toned gradient fills, ellipse care icons, cart summary sidebar,
 * two-column product grid, pill badges, warm earthy color palette
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function plantCard(name: string, botanical: string, price: string, careLevel: string, light: string, water: string, imgGrad: [string, string]) {
  const careLevelColor = careLevel === 'Easy' ? '#16a34a' : careLevel === 'Medium' ? '#f59e0b' : '#ef4444';
  return frame(`Plant: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    clipContent: true,
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('PlantImage', {
        size: { x: 1, y: 180 },
        fills: [gradient([{ hex: imgGrad[0], position: 0 }, { hex: imgGrad[1], position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame('PlantInfo', {
        autoLayout: vertical({ spacing: 10, padX: 14, padY: 14 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('NameRow', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              frame('PlantName', {
                autoLayout: vertical({ spacing: 2 }),
                children: [
                  text(name, { fontSize: 15, fontWeight: 700, color: '#1a2e1a' }),
                  text(botanical, { fontSize: 11, fontWeight: 400, color: '#6b7280', fontStyle: 'italic' }),
                ],
              }),
              text(price, { fontSize: 18, fontWeight: 800, color: '#16a34a' }),
            ],
          }),
          frame('CareIcons', {
            autoLayout: horizontal({ spacing: 12 }),
            children: [
              careIcon('☀', light, '#f59e0b'),
              careIcon('💧', water, '#3b82f6'),
              careIcon('♡', careLevel, careLevelColor),
            ],
          }),
          frame('AddBtn', {
            autoLayout: horizontal({ spacing: 0, padX: 0, padY: 10, align: 'CENTER' }),
            fills: [solid('#16a34a')],
            cornerRadius: 8,
            layoutSizingHorizontal: 'FILL',
            children: [
              text('Add to Cart', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function careIcon(icon: string, label: string, color: string) {
  return frame(`Care: ${label}`, {
    autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
    children: [
      ellipse('Icon', { size: { x: 22, y: 22 }, fills: [solid(color + '1a')] }),
      text(label, { fontSize: 11, fontWeight: 500, color: '#6b7280' }),
    ],
  });
}

function cartItem(name: string, qty: number, price: string) {
  return frame(`CartItem: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('ItemInfo', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(name, { fontSize: 13, fontWeight: 600, color: '#1a2e1a' }),
          text(`Qty: ${qty}`, { fontSize: 11, fontWeight: 400, color: '#6b7280' }),
        ],
      }),
      text(price, { fontSize: 14, fontWeight: 600, color: '#16a34a' }),
    ],
  });
}

export default frame('PlantShopPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f0fdf4')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('Logo', {
          autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
          children: [
            ellipse('Leaf', { size: { x: 24, y: 24 }, fills: [gradient([{ hex: '#16a34a', position: 0 }, { hex: '#22c55e', position: 1 }], 135)] }),
            text('Verdant', { fontSize: 22, fontWeight: 800, color: '#1a2e1a' }),
          ],
        }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('Shop', { fontSize: 14, fontWeight: 600, color: '#16a34a' }),
            text('Care Guides', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
            text('About', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
          ],
        }),
      ],
    }),

    // Hero banner
    frame('HeroBanner', {
      autoLayout: vertical({ spacing: 8, padX: 40, padY: 36, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#16a34a', position: 0 }, { hex: '#15803d', position: 0.5 }, { hex: '#166534', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Bring Nature Home', { fontSize: 32, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        text('Curated plants delivered to your door with personalized care instructions', { fontSize: 15, fontWeight: 400, color: '#ffffffcc', textAlignHorizontal: 'CENTER' }),
      ],
    }),

    // Main content: products + cart
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 24, padX: 32, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Product grid
        frame('ProductGrid', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('GridHeader', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Popular Plants', { fontSize: 20, fontWeight: 700, color: '#1a2e1a' }),
                text('12 plants', { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
              ],
            }),
            frame('GridRow1', {
              autoLayout: horizontal({ spacing: 14 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                plantCard('Monstera Deliciosa', 'Monstera deliciosa', '$34', 'Easy', 'Indirect', 'Weekly', ['#22c55e', '#16a34a']),
                plantCard('Fiddle Leaf Fig', 'Ficus lyrata', '$48', 'Medium', 'Bright', '10 days', ['#4ade80', '#166534']),
              ],
            }),
            frame('GridRow2', {
              autoLayout: horizontal({ spacing: 14 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                plantCard('Snake Plant', 'Sansevieria trifasciata', '$22', 'Easy', 'Any', 'Bi-weekly', ['#a3e635', '#65a30d']),
                plantCard('Bird of Paradise', 'Strelitzia reginae', '$56', 'Hard', 'Full sun', 'Weekly', ['#f59e0b', '#16a34a']),
              ],
            }),
          ],
        }),

        // Cart sidebar
        frame('CartSidebar', {
          size: { x: 280 },
          autoLayout: vertical({ spacing: 16, padX: 20, padY: 20 }),
          fills: [solid('#ffffff')],
          cornerRadius: 14,
          strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text('Your Cart', { fontSize: 16, fontWeight: 700, color: '#1a2e1a' }),
            cartItem('Monstera Deliciosa', 1, '$34'),
            cartItem('Snake Plant', 2, '$44'),
            frame('Divider', {
              size: { x: 1, y: 1 },
              fills: [solid('#e5e7eb')],
              layoutSizingHorizontal: 'FILL',
            }),
            frame('TotalRow', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Total', { fontSize: 15, fontWeight: 600, color: '#1a2e1a' }),
                text('$78', { fontSize: 18, fontWeight: 800, color: '#16a34a' }),
              ],
            }),
            frame('CheckoutBtn', {
              autoLayout: horizontal({ spacing: 0, padY: 12, align: 'CENTER' }),
              fills: [gradient([{ hex: '#16a34a', position: 0 }, { hex: '#22c55e', position: 1 }], 90)],
              cornerRadius: 10,
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Checkout', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
            text('Free shipping on orders over $50', { fontSize: 11, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
          ],
        }),
      ],
    }),
  ],
});
