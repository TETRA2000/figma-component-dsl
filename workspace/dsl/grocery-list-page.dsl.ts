/**
 * Grocery List App — Categorized items, checkboxes as rectangles, total price
 *
 * DSL features stressed: nested sections, small rectangles as checkboxes,
 * SPACE_BETWEEN, strokes for separators, FILL sizing
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function groceryItem(name: string, qty: string, price: string, checked: boolean) {
  return frame(`Item: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 14, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.94, g: 0.94, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame(`${name}Left`, {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          rectangle(`${name}Check`, {
            size: { x: 20, y: 20 },
            fills: [solid(checked ? '#16a34a' : '#ffffff')],
            cornerRadius: 4,
            strokes: [{ color: { r: checked ? 0.09 : 0.80, g: checked ? 0.64 : 0.80, b: checked ? 0.29 : 0.80, a: 1 }, weight: 2, align: 'INSIDE' as const }],
          }),
          frame(`${name}Info`, {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, {
                fontSize: 14, fontWeight: 500,
                color: checked ? '#9ca3af' : '#1f2937',
              }),
              text(qty, { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
            ],
          }),
        ],
      }),
      text(price, { fontSize: 14, fontWeight: 600, color: checked ? '#9ca3af' : '#374151' }),
    ],
  });
}

function categorySection(title: string, color: string, items: { name: string; qty: string; price: string; checked: boolean }[]) {
  return frame(`Cat: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame(`${title}Header`, {
        autoLayout: horizontal({ spacing: 10, padX: 14, padY: 10, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        fills: [solid('#fafafa')],
        children: [
          ellipse(`${title}Dot`, { size: { x: 10, y: 10 }, fills: [solid(color)] }),
          text(title, { fontSize: 14, fontWeight: 700, color: '#374151' }),
          text(`${items.length} items`, { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
      ...items.map(i => groceryItem(i.name, i.qty, i.price, i.checked)),
    ],
  });
}

export default frame('GroceryListPage', {
  size: { x: 900 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f3f4f6')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('GroceryGo', { fontSize: 22, fontWeight: 800, color: '#16a34a' }),
        frame('HeaderRight', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            text('My Lists', { fontSize: 14, fontWeight: 500, color: '#374151' }),
            frame('CartBadge', {
              autoLayout: horizontal({ padX: 14, padY: 6, spacing: 6, counterAlign: 'CENTER' }),
              fills: [solid('#16a34a')],
              cornerRadius: 9999,
              children: [
                text('12 items', { fontSize: 12, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // List Header
    frame('ListHeader', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ListTitle', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('Weekly Groceries', { fontSize: 24, fontWeight: 700, color: '#111827' }),
            text('March 16, 2026', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
          ],
        }),
        frame('AddBtn', {
          autoLayout: horizontal({ padX: 20, padY: 10, spacing: 6 }),
          fills: [solid('#16a34a')],
          cornerRadius: 10,
          children: [
            text('+ Add Item', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
      ],
    }),

    // Categories
    frame('CategoriesSection', {
      autoLayout: vertical({ spacing: 16, padX: 32, padY: 8 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        categorySection('Fruits & Vegetables', '#22c55e', [
          { name: 'Bananas', qty: '1 bunch', price: '$1.29', checked: true },
          { name: 'Avocados', qty: '3 pcs', price: '$4.50', checked: false },
          { name: 'Spinach', qty: '1 bag', price: '$2.99', checked: false },
          { name: 'Tomatoes', qty: '6 pcs', price: '$3.49', checked: true },
        ]),
        categorySection('Dairy & Eggs', '#3b82f6', [
          { name: 'Whole Milk', qty: '1 gallon', price: '$4.29', checked: false },
          { name: 'Greek Yogurt', qty: '4 cups', price: '$5.99', checked: false },
          { name: 'Eggs (dozen)', qty: '1 pk', price: '$3.49', checked: true },
        ]),
        categorySection('Pantry', '#f59e0b', [
          { name: 'Pasta', qty: '2 boxes', price: '$3.98', checked: false },
          { name: 'Olive Oil', qty: '1 bottle', price: '$7.99', checked: false },
          { name: 'Rice', qty: '2 lb bag', price: '$4.49', checked: true },
        ]),
      ],
    }),

    // Total
    frame('TotalSection', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('TotalInfo', {
          autoLayout: vertical({ spacing: 2 }),
          children: [
            text('Estimated Total', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            text('$42.50', { fontSize: 28, fontWeight: 800, color: '#111827' }),
          ],
        }),
        frame('CheckoutBtn', {
          autoLayout: horizontal({ padX: 28, padY: 14 }),
          fills: [gradient([{ hex: '#16a34a', position: 0 }, { hex: '#22c55e', position: 1 }], 90)],
          cornerRadius: 12,
          children: [
            text('Checkout', { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
          ],
        }),
      ],
    }),
  ],
});
