/**
 * Restaurant Menu — Categories with items, warm color palette
 * Batch 3, Page 1: Food & Restaurant
 * DSL Features: rich typography, gradients, cornerRadii, warm colors
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const BROWN = '#8B4513';
const TAN = '#D4A574';
const CREAM = '#FFF8F0';
const DARK = '#3E2723';
const MUTED = '#8D6E63';
const DIVIDER = '#E8D5C4';

function menuItem(name: string, description: string, price: string) {
  return frame(`Item: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 0, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'MIN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ItemInfo', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 18, fontWeight: 600, color: DARK }),
          text(description, {
            fontSize: 14, fontWeight: 400, color: MUTED,
            lineHeight: { value: 22, unit: 'PIXELS' },
          }),
        ],
      }),
      text(price, { fontSize: 18, fontWeight: 700, color: BROWN }),
    ],
  });
}

function menuDivider() {
  return rectangle('Divider', {
    size: { x: 1, y: 1 },
    fills: [solid(DIVIDER)],
    layoutSizingHorizontal: 'FILL',
  });
}

function menuCategory(title: string, items: { name: string; desc: string; price: string }[]) {
  const children: ReturnType<typeof menuItem | typeof menuDivider>[] = [];
  items.forEach((item, i) => {
    children.push(menuItem(item.name, item.desc, item.price));
    if (i < items.length - 1) children.push(menuDivider());
  });

  return frame(`Category: ${title}`, {
    autoLayout: vertical({ spacing: 8, padX: 32, padY: 24 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#FFFFFF')],
    cornerRadius: 16,
    strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('CategoryHeader', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          frame('CategoryIcon', {
            autoLayout: horizontal({ padX: 8, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(TAN, 0.2)],
            cornerRadius: 8,
            size: { x: 36, y: 36 },
            children: [
              text('◆', { fontSize: 16, fontWeight: 600, color: BROWN }),
            ],
          }),
          text(title, { fontSize: 24, fontWeight: 700, color: BROWN }),
        ],
      }),
      ...children,
    ],
  });
}

export default component('FoodMenu', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(CREAM)],
  children: [
    // Header
    frame('Header', {
      autoLayout: vertical({ spacing: 8, padX: 80, padY: 48, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#8B4513', position: 0 },
          { hex: '#5D4037', position: 1 },
        ], 270),
      ],
      children: [
        text('Our Menu', {
          fontSize: 48, fontWeight: 700, color: '#FFFFFF',
          letterSpacing: { value: -1, unit: 'PIXELS' },
        }),
        text('Fresh ingredients, timeless recipes', {
          fontSize: 18, fontWeight: 400, color: TAN,
        }),
      ],
    }),

    // Menu Content
    frame('MenuContent', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        menuCategory('Appetizers', [
          { name: 'Bruschetta al Pomodoro', desc: 'Toasted bread topped with fresh tomatoes, basil, and garlic', price: '$12' },
          { name: 'Calamari Fritti', desc: 'Lightly fried squid with marinara dipping sauce', price: '$14' },
          { name: 'Carpaccio di Manzo', desc: 'Thinly sliced raw beef with arugula and parmesan', price: '$16' },
        ]),
        menuCategory('Mains', [
          { name: 'Osso Buco', desc: 'Braised veal shanks with gremolata and saffron risotto', price: '$38' },
          { name: 'Branzino al Forno', desc: 'Oven-roasted Mediterranean sea bass with herbs', price: '$34' },
          { name: 'Tagliatelle al Ragù', desc: 'Fresh pasta with slow-cooked Bolognese sauce', price: '$26' },
          { name: 'Pollo alla Parmigiana', desc: 'Breaded chicken cutlet with mozzarella and tomato sauce', price: '$28' },
        ]),
        menuCategory('Desserts', [
          { name: 'Tiramisù', desc: 'Classic layered espresso and mascarpone dessert', price: '$12' },
          { name: 'Panna Cotta', desc: 'Vanilla bean cream with seasonal berry compote', price: '$10' },
          { name: 'Cannoli Siciliani', desc: 'Crispy pastry shells filled with sweet ricotta cream', price: '$11' },
        ]),
      ],
    }),

    // Footer
    frame('Footer', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(BROWN, 0.08)],
      children: [
        text('Prices are subject to change. Please inform your server of any allergies.', {
          fontSize: 13, fontWeight: 400, color: MUTED,
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),
  ],
});
