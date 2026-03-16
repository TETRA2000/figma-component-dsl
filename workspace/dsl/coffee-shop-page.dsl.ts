/**
 * Coffee Shop Menu — Drink categories, customization options, and loyalty card
 * DSL features: warm palette (browns/creams), gradient drink images, size pills, progress dots
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function drinkCard(name: string, price: string, desc: string, grad1: string, grad2: string) {
  return frame(`Drink: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.91, g: 0.87, b: 0.82, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('DrinkImage', { size: { x: 1, y: 120 }, fills: [gradient([{ hex: grad1, position: 0 }, { hex: grad2, position: 1 }], 135)], cornerRadius: { topLeft: 14, topRight: 14, bottomLeft: 0, bottomRight: 0 }, layoutSizingHorizontal: 'FILL' }),
      frame('DrinkInfo', {
        autoLayout: vertical({ spacing: 6, padX: 14, padY: 12 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('NamePrice', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
            text(name, { fontSize: 14, fontWeight: 600, color: '#3c2415' }),
            text(price, { fontSize: 14, fontWeight: 700, color: '#92400e' }),
          ] }),
          text(desc, { fontSize: 11, fontWeight: 400, color: '#78716c' }),
        ],
      }),
    ],
  });
}

function sizePill(label: string, active: boolean) {
  return frame(`Size: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 14, padY: 6, align: 'CENTER' }),
    fills: [solid(active ? '#78350f' : '#fef3c7')],
    cornerRadius: 9999,
    children: [text(label, { fontSize: 12, fontWeight: 600, color: active ? '#ffffff' : '#92400e' })],
  });
}

function categoryPill(label: string, active: boolean) {
  return frame(`Cat: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 7 }),
    fills: [solid(active ? '#92400e' : '#fef9ee')],
    cornerRadius: 9999,
    strokes: active ? [] : [{ color: { r: 0.85, g: 0.78, b: 0.68, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [text(label, { fontSize: 12, fontWeight: 600, color: active ? '#ffffff' : '#78350f' })],
  });
}

function loyaltyDot(filled: boolean) {
  return ellipse(filled ? 'Filled' : 'Empty', {
    size: { x: 16, y: 16 },
    fills: [solid(filled ? '#92400e' : '#fde68a')],
  });
}

export default frame('CoffeeShopPage', {
  size: { x: 960 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fef9ee')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 44, padY: 36, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#78350f', position: 0 }, { hex: '#92400e', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('The Roasted Bean', { fontSize: 28, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        text('Artisan coffee, crafted with care', { fontSize: 14, fontWeight: 400, color: '#fde68a', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 44, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Categories', { autoLayout: horizontal({ spacing: 8 }), children: [
          categoryPill('All', true), categoryPill('Espresso', false),
          categoryPill('Cold Brew', false), categoryPill('Tea', false), categoryPill('Pastries', false),
        ] }),
        frame('DrinkGrid', {
          autoLayout: horizontal({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            drinkCard('Caramel Latte', '$5.50', 'Espresso, steamed milk, caramel', '#92400e', '#b45309'),
            drinkCard('Iced Mocha', '$6.00', 'Cold espresso, chocolate, cream', '#78350f', '#451a03'),
            drinkCard('Matcha Latte', '$5.75', 'Ceremonial matcha, oat milk', '#365314', '#4d7c0f'),
            drinkCard('Chai Spice', '$5.25', 'Black tea, cinnamon, cardamom', '#7c2d12', '#9a3412'),
          ],
        }),
        frame('Customization', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Customize Your Drink', { fontSize: 18, fontWeight: 700, color: '#3c2415' }),
            frame('SizeRow', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
              text('Size', { fontSize: 14, fontWeight: 600, color: '#57534e' }),
              frame('Sizes', { autoLayout: horizontal({ spacing: 8 }), children: [
                sizePill('Small', false), sizePill('Medium', true), sizePill('Large', false),
              ] }),
            ] }),
          ],
        }),
        frame('LoyaltyCard', {
          autoLayout: vertical({ spacing: 12, padX: 24, padY: 20, counterAlign: 'CENTER' }),
          fills: [gradient([{ hex: '#451a03', position: 0 }, { hex: '#78350f', position: 1 }], 135)],
          cornerRadius: 16,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Loyalty Rewards', { fontSize: 18, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
            text('7 of 10 stamps collected', { fontSize: 13, fontWeight: 400, color: '#fde68a', textAlignHorizontal: 'CENTER' }),
            frame('Dots', { autoLayout: horizontal({ spacing: 8, align: 'CENTER' }), children: [
              loyaltyDot(true), loyaltyDot(true), loyaltyDot(true), loyaltyDot(true),
              loyaltyDot(true), loyaltyDot(true), loyaltyDot(true),
              loyaltyDot(false), loyaltyDot(false), loyaltyDot(false),
            ] }),
            text('3 more for a free drink!', { fontSize: 12, fontWeight: 600, color: '#fbbf24', textAlignHorizontal: 'CENTER' }),
          ],
        }),
      ],
    }),
  ],
});
