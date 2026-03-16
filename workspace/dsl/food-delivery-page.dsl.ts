/**
 * Food Delivery — DoorDash-style with restaurant cards, category filters, and cart sidebar
 * DSL features: cornerRadii for cards, SPACE_BETWEEN in headers, gradient promo banner,
 * ellipse for category icons, FILL layout, strokes, clipContent
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function categoryChip(label: string, color: string, active: boolean) {
  return frame(`Cat: ${label}`, {
    autoLayout: vertical({ spacing: 6, padX: 4, padY: 4, counterAlign: 'CENTER' }),
    children: [
      ellipse(`Icon:${label}`, { size: { x: 52, y: 52 }, fills: [solid(active ? color : '#f3f4f6')] }),
      text(label, { fontSize: 12, fontWeight: active ? 600 : 400, color: active ? '#111827' : '#6b7280', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function restaurantCard(name: string, cuisine: string, rating: string, time: string, fee: string, gradFrom: string, gradTo: string) {
  return frame(`Rest: ${name}`, {
    size: { x: 240 },
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    clipContent: true,
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('RestImage', {
        size: { x: 240, y: 140 },
        fills: [gradient([{ hex: gradFrom, position: 0 }, { hex: gradTo, position: 1 }], 135)],
      }),
      frame('RestInfo', {
        autoLayout: vertical({ spacing: 6, padX: 14, padY: 12 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('RestHeader', {
            autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(name, { fontSize: 15, fontWeight: 700, color: '#111827', layoutSizingHorizontal: 'FILL' }),
              frame('RatingBadge', {
                autoLayout: horizontal({ spacing: 4, padX: 6, padY: 2, counterAlign: 'CENTER' }),
                fills: [solid('#fef3c7')],
                cornerRadius: 4,
                children: [text(rating, { fontSize: 12, fontWeight: 700, color: '#92400e' })],
              }),
            ],
          }),
          text(cuisine, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
          frame('RestMeta', {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              text(time, { fontSize: 12, fontWeight: 500, color: '#374151' }),
              text('|', { fontSize: 12, fontWeight: 400, color: '#d1d5db' }),
              text(fee, { fontSize: 12, fontWeight: 500, color: '#374151' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function cartItem(name: string, qty: number, price: string) {
  return frame(`CartItem: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 0, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('CartQty', {
        size: { x: 24, y: 24 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#ef4444')],
        cornerRadius: 6,
        children: [text(String(qty), { fontSize: 12, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' })],
      }),
      frame('CartName', {
        autoLayout: horizontal({ spacing: 0, padX: 10 }),
        layoutSizingHorizontal: 'FILL',
        children: [text(name, { fontSize: 13, fontWeight: 500, color: '#111827' })],
      }),
      text(price, { fontSize: 13, fontWeight: 600, color: '#111827' }),
    ],
  });
}

export default frame('FoodDeliveryPage', {
  size: { x: 1100 },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Main content
    frame('MainContent', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Top bar
        frame('TopBar', {
          autoLayout: horizontal({ spacing: 0, padX: 24, padY: 14, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#ffffff')],
          strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text('FoodDash', { fontSize: 22, fontWeight: 800, color: '#ef4444' }),
            frame('TopSpacer', { layoutSizingHorizontal: 'FILL', autoLayout: horizontal({ spacing: 0 }), children: [] }),
            frame('SearchBar', {
              autoLayout: horizontal({ spacing: 0, padX: 14, padY: 8 }),
              fills: [solid('#f3f4f6')],
              cornerRadius: 9999,
              size: { x: 280 },
              children: [text('Search restaurants or food...', { fontSize: 13, fontWeight: 400, color: '#9ca3af' })],
            }),
            frame('TopSpacer2', { layoutSizingHorizontal: 'FILL', autoLayout: horizontal({ spacing: 0 }), children: [] }),
            frame('DeliveryAddress', {
              autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
              children: [
                text('Deliver to:', { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
                text('123 Main St', { fontSize: 12, fontWeight: 600, color: '#111827' }),
              ],
            }),
          ],
        }),
        // Promo banner
        frame('PromoBanner', {
          autoLayout: horizontal({ spacing: 0, padX: 24, padY: 20, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          fills: [gradient([{ hex: '#ef4444', position: 0 }, { hex: '#f97316', position: 1 }], 90)],
          children: [
            frame('PromoText', {
              autoLayout: vertical({ spacing: 4 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Free Delivery on Your First Order', { fontSize: 20, fontWeight: 800, color: '#ffffff' }),
                text('Use code WELCOME at checkout. Min order $15.', { fontSize: 14, fontWeight: 400, color: '#ffffffdd' }),
              ],
            }),
            frame('PromoBtn', {
              autoLayout: horizontal({ spacing: 0, padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#ffffff')],
              cornerRadius: 8,
              children: [text('Order Now', { fontSize: 14, fontWeight: 700, color: '#ef4444' })],
            }),
          ],
        }),
        // Categories
        frame('Categories', {
          autoLayout: horizontal({ spacing: 16, padX: 24, padY: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            categoryChip('Pizza', '#ef4444', true),
            categoryChip('Burgers', '#f59e0b', false),
            categoryChip('Sushi', '#10b981', false),
            categoryChip('Thai', '#8b5cf6', false),
            categoryChip('Mexican', '#ec4899', false),
            categoryChip('Indian', '#f97316', false),
            categoryChip('Chinese', '#3b82f6', false),
            categoryChip('Salads', '#22c55e', false),
          ],
        }),
        // Restaurant grid
        frame('RestaurantSection', {
          autoLayout: vertical({ spacing: 16, padX: 24, padY: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Popular Near You', { fontSize: 20, fontWeight: 700, color: '#111827' }),
            frame('RestGrid', {
              autoLayout: horizontal({ spacing: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                restaurantCard('Napoli Pizza Co.', 'Italian, Pizza', '4.8', '25-35 min', '$2.99 delivery', '#e74c3c', '#f39c12'),
                restaurantCard('Sakura Sushi', 'Japanese, Sushi', '4.9', '30-40 min', 'Free delivery', '#1abc9c', '#3498db'),
                restaurantCard('Burger Barn', 'American, Burgers', '4.6', '15-25 min', '$1.99 delivery', '#e67e22', '#d35400'),
              ],
            }),
          ],
        }),
      ],
    }),
    // Cart sidebar
    frame('CartSidebar', {
      size: { x: 300 },
      autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }),
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('CartHeader', {
          autoLayout: horizontal({ spacing: 0, padX: 20, padY: 16 }),
          layoutSizingHorizontal: 'FILL',
          strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [text('Your Cart', { fontSize: 16, fontWeight: 700, color: '#111827' })],
        }),
        frame('CartFrom', {
          autoLayout: horizontal({ spacing: 8, padX: 20, padY: 12, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            ellipse('CartRestIcon', { size: { x: 28, y: 28 }, fills: [solid('#e74c3c')] }),
            text('Napoli Pizza Co.', { fontSize: 13, fontWeight: 600, color: '#111827' }),
          ],
        }),
        frame('CartItems', {
          autoLayout: vertical({ spacing: 0, padX: 20, padY: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            cartItem('Margherita Pizza (L)', 1, '$18.99'),
            cartItem('Garlic Bread', 2, '$7.98'),
            cartItem('Tiramisu', 1, '$8.50'),
          ],
        }),
        rectangle('CartDivider', { size: { x: 260, y: 1 }, fills: [solid('#e5e7eb')] }),
        frame('CartTotals', {
          autoLayout: vertical({ spacing: 8, padX: 20, padY: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('Subtotal', {
              autoLayout: horizontal({ spacing: 0 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Subtotal', { fontSize: 13, fontWeight: 400, color: '#6b7280', layoutSizingHorizontal: 'FILL' }),
                text('$35.47', { fontSize: 13, fontWeight: 500, color: '#111827' }),
              ],
            }),
            frame('DeliveryFee', {
              autoLayout: horizontal({ spacing: 0 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Delivery fee', { fontSize: 13, fontWeight: 400, color: '#6b7280', layoutSizingHorizontal: 'FILL' }),
                text('$2.99', { fontSize: 13, fontWeight: 500, color: '#111827' }),
              ],
            }),
            frame('Total', {
              autoLayout: horizontal({ spacing: 0 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Total', { fontSize: 15, fontWeight: 700, color: '#111827', layoutSizingHorizontal: 'FILL' }),
                text('$38.46', { fontSize: 15, fontWeight: 700, color: '#111827' }),
              ],
            }),
          ],
        }),
        frame('CheckoutBtn', {
          autoLayout: horizontal({ spacing: 0, padX: 20, padY: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('CheckoutInner', {
              autoLayout: horizontal({ spacing: 0, padX: 0, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#ef4444')],
              cornerRadius: 10,
              layoutSizingHorizontal: 'FILL',
              children: [text('Checkout - $38.46', { fontSize: 15, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' })],
            }),
          ],
        }),
      ],
    }),
  ],
});
