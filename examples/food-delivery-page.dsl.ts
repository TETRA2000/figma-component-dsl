import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const orange = '#f97316'; const orangeDark = '#ea580c'; const white = '#ffffff'; const bg = '#fff7ed';
const dark = '#1c1917'; const med = '#78716c'; const green = '#16a34a'; const border = '#e7e5e4';

function restaurantCard(name: string, cuisine: string, rating: string, time: string, delivery: string, g1: string, g2: string) {
  return frame(`Restaurant: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 300, y: undefined },
    cornerRadius: 14, clipContent: true, fills: [solid(white)],
    strokes: [{ color: { r: 0.91, g: 0.9, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('RestImage', {
        size: { x: 300, y: 160 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)],
        autoLayout: horizontal({ padX: 10, padY: 10, align: 'SPACE_BETWEEN' }),
        children: [
          frame('TimeBadge', {
            autoLayout: horizontal({ padX: 8, padY: 4 }), fills: [solid(white)], cornerRadius: 8,
            children: [text(`${time} min`, { fontSize: 12, fontWeight: 600, color: dark })],
          }),
          frame('DeliveryBadge', {
            autoLayout: horizontal({ padX: 8, padY: 4 }), fills: [solid(green)], cornerRadius: 8,
            children: [text(delivery, { fontSize: 11, fontWeight: 600, color: white })],
          }),
        ],
      }),
      frame('RestInfo', {
        autoLayout: vertical({ spacing: 6, padX: 14, padY: 14 }), layoutSizingHorizontal: 'FILL',
        children: [
          frame('NameRating', {
            autoLayout: horizontal({ align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL',
            children: [
              text(name, { fontSize: 16, fontWeight: 600, color: dark }),
              frame('RatingBadge', {
                autoLayout: horizontal({ padX: 6, padY: 2, spacing: 4, counterAlign: 'CENTER' }),
                fills: [solid('#fef3c7')], cornerRadius: 6,
                children: [
                  ellipse('Star', { size: { x: 12, y: 12 }, fills: [solid('#f59e0b')] }),
                  text(rating, { fontSize: 12, fontWeight: 600, color: '#92400e' }),
                ],
              }),
            ],
          }),
          text(cuisine, { fontSize: 13, fontWeight: 400, color: med }),
        ],
      }),
    ],
  });
}

function categoryCircle(label: string, color: string) {
  return frame(`Cat: ${label}`, {
    autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }), size: { x: 80, y: undefined },
    children: [
      ellipse('CatIcon', { size: { x: 56, y: 56 }, fills: [solid(color, 0.15)] }),
      text(label, { fontSize: 12, fontWeight: 500, color: dark, textAlignHorizontal: 'CENTER' as const }),
    ],
  });
}

function orderItem(name: string, restaurant: string, status: string, statusColor: string) {
  return frame(`Order: ${name}`, {
    autoLayout: horizontal({ spacing: 12, padX: 14, padY: 12, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL', fills: [solid(white)], cornerRadius: 10,
    strokes: [{ color: { r: 0.91, g: 0.9, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('OrderLeft', { autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }), children: [
        rectangle('OrderThumb', { size: { x: 44, y: 44 }, fills: [solid(orange, 0.1)], cornerRadius: 10 }),
        frame('OrderInfo', { autoLayout: vertical({ spacing: 1 }), children: [
          text(name, { fontSize: 14, fontWeight: 500, color: dark }),
          text(restaurant, { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ]}),
      frame('StatusBadge', {
        autoLayout: horizontal({ padX: 10, padY: 4 }), fills: [solid(statusColor, 0.1)], cornerRadius: 9999,
        children: [text(status, { fontSize: 11, fontWeight: 600, color: statusColor })],
      }),
    ],
  });
}

export default frame('FoodDelivery', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      strokes: [{ color: { r: 0.91, g: 0.9, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('FoodDash', { fontSize: 22, fontWeight: 700, color: orange }),
        frame('SearchBar', {
          autoLayout: horizontal({ padX: 16, padY: 10, spacing: 8, counterAlign: 'CENTER' }),
          fills: [solid('#f5f5f4')], cornerRadius: 10, size: { x: 400, y: undefined },
          children: [
            ellipse('SearchIcon', { size: { x: 16, y: 16 }, fills: [solid(med, 0.4)] }),
            text('Search restaurants, food...', { fontSize: 14, fontWeight: 400, color: med }),
          ],
        }),
        frame('CartBtn', {
          autoLayout: horizontal({ padX: 16, padY: 8, spacing: 6, counterAlign: 'CENTER' }),
          fills: [solid(orange)], cornerRadius: 10,
          children: [
            ellipse('CartIcon', { size: { x: 16, y: 16 }, fills: [solid(white)] }),
            text('Cart (3)', { fontSize: 14, fontWeight: 600, color: white }),
          ],
        }),
      ],
    }),
    frame('Categories', {
      autoLayout: horizontal({ spacing: 16, padX: 40, padY: 20, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL',
      children: [
        categoryCircle('Pizza', '#ef4444'), categoryCircle('Burgers', '#f59e0b'),
        categoryCircle('Sushi', '#ec4899'), categoryCircle('Chinese', '#ef4444'),
        categoryCircle('Indian', '#f97316'), categoryCircle('Thai', '#10b981'),
        categoryCircle('Mexican', '#84cc16'), categoryCircle('Italian', '#6366f1'),
        categoryCircle('Desserts', '#a855f7'), categoryCircle('Healthy', '#22c55e'),
      ],
    }),
    frame('Main', {
      autoLayout: horizontal({ spacing: 24, padX: 40, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('LeftCol', { autoLayout: vertical({ spacing: 20 }), layoutSizingHorizontal: 'FILL', children: [
          frame('PromoCard', {
            autoLayout: horizontal({ padX: 32, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            fills: [gradient([{ hex: orange, position: 0 }, { hex: orangeDark, position: 1 }], 135)],
            cornerRadius: 16, layoutSizingHorizontal: 'FILL',
            children: [
              frame('PromoText', { autoLayout: vertical({ spacing: 8 }), children: [
                text('Free Delivery Week!', { fontSize: 24, fontWeight: 700, color: white }),
                text('Order $25+ and get free delivery on all orders', { fontSize: 14, fontWeight: 400, color: '#fed7aa' }),
                frame('PromoBtn', {
                  autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid(white)], cornerRadius: 9999,
                  children: [text('Order Now', { fontSize: 14, fontWeight: 600, color: orange })],
                }),
              ]}),
              rectangle('PromoImg', { size: { x: 120, y: 120 }, fills: [solid(white, 0.15)], cornerRadius: 60 }),
            ],
          }),
          text('Popular Near You', { fontSize: 20, fontWeight: 700, color: dark }),
          frame('RestGrid', { autoLayout: horizontal({ spacing: 16 }), children: [
            restaurantCard('Bella Italia', 'Italian · Pasta · Pizza', '4.8', '25-35', 'Free', '#dc2626', '#b91c1c'),
            restaurantCard('Sakura Sushi', 'Japanese · Sushi · Ramen', '4.6', '30-40', '$2.99', '#ec4899', '#db2777'),
            restaurantCard('Green Bowl', 'Healthy · Salads · Bowls', '4.9', '15-25', 'Free', '#16a34a', '#15803d'),
          ]}),
        ]}),
        frame('RightCol', { autoLayout: vertical({ spacing: 16 }), size: { x: 340, y: undefined }, children: [
          frame('ActiveOrders', {
            autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }), fills: [solid(white)],
            cornerRadius: 14, layoutSizingHorizontal: 'FILL',
            children: [
              text('Active Orders', { fontSize: 16, fontWeight: 600, color: dark }),
              orderItem('Margherita Pizza', 'Bella Italia', 'On the way', orange),
              orderItem('Chicken Teriyaki', 'Sakura Sushi', 'Preparing', '#3b82f6'),
            ],
          }),
          frame('RecentOrders', {
            autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }), fills: [solid(white)],
            cornerRadius: 14, layoutSizingHorizontal: 'FILL',
            children: [
              text('Recent Orders', { fontSize: 16, fontWeight: 600, color: dark }),
              orderItem('Caesar Salad', 'Green Bowl', 'Delivered', green),
              orderItem('Spicy Ramen', 'Sakura Sushi', 'Delivered', green),
              orderItem('Pasta Carbonara', 'Bella Italia', 'Delivered', green),
            ],
          }),
        ]}),
      ],
    }),
  ],
});
