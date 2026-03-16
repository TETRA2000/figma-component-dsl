/**
 * Grocery List — Shopping list with category sections, checkbox items, totals
 * DSL features: mobile width (500px), checkbox items, category headers, running total
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function checkItem(name: string, qty: string, price: string, checked: boolean) {
  return frame(`Item: ${name}`, {
    autoLayout: horizontal({ spacing: 10, padX: 4, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('Checkbox', {
        size: { x: 20, y: 20 },
        fills: [solid(checked ? '#16a34a' : '#ffffff')], cornerRadius: 5,
        strokes: checked ? [] : [{ color: { r: 0.8, g: 0.82, b: 0.84, a: 1 }, weight: 1.5, align: 'INSIDE' as const }],
        children: checked ? [text('✓', { fontSize: 12, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' })] : [],
      }),
      text(name, {
        fontSize: 14, fontWeight: 400, color: checked ? '#9ca3af' : '#374151',
        textDecoration: checked ? 'STRIKETHROUGH' : 'NONE', layoutSizingHorizontal: 'FILL',
      }),
      text(qty, { fontSize: 12, fontWeight: 500, color: '#6b7280', size: { x: 36 }, textAlignHorizontal: 'CENTER' }),
      text(price, { fontSize: 13, fontWeight: 600, color: checked ? '#9ca3af' : '#111827', size: { x: 50 }, textAlignHorizontal: 'RIGHT' }),
    ],
  });
}

function categorySection(title: string, icon: string, items: ReturnType<typeof checkItem>[]) {
  return frame(`Category: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('CatHeader', {
        autoLayout: horizontal({ spacing: 6, padX: 4, padY: 8, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(icon, { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
          text(title, { fontSize: 13, fontWeight: 700, color: '#111827', letterSpacing: { value: 4, unit: 'PERCENT' } }),
        ],
      }),
      ...items,
    ],
  });
}

function summaryRow(label: string, value: string, bold: boolean) {
  return frame(`Sum: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padY: 4 }), layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: bold ? 15 : 13, fontWeight: bold ? 700 : 400, color: '#374151', layoutSizingHorizontal: 'FILL' }),
      text(value, { fontSize: bold ? 15 : 13, fontWeight: bold ? 800 : 500, color: bold ? '#16a34a' : '#374151' }),
    ],
  });
}

export default frame('GroceryListPage', {
  size: { x: 500 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 20, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#16a34a')],
      children: [
        text('My Grocery List', { fontSize: 18, fontWeight: 800, color: '#ffffff' }),
        text('12 items', { fontSize: 13, fontWeight: 500, color: '#ffffffcc' }),
      ],
    }),
    frame('ListBody', {
      autoLayout: vertical({ spacing: 16, padX: 20, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        categorySection('Produce', '🥬', [
          checkItem('Avocados', 'x3', '$4.50', true),
          checkItem('Cherry Tomatoes', 'x1', '$3.99', true),
          checkItem('Baby Spinach', 'x1', '$2.99', false),
          checkItem('Bananas', 'x1', '$1.29', false),
        ]),
        categorySection('Dairy', '🧀', [
          checkItem('Whole Milk', '1 gal', '$4.79', false),
          checkItem('Greek Yogurt', 'x2', '$6.98', false),
          checkItem('Cheddar Cheese', 'x1', '$3.49', true),
        ]),
        categorySection('Proteins', '🥩', [
          checkItem('Chicken Breast', '2 lbs', '$9.98', false),
          checkItem('Atlantic Salmon', '1 lb', '$11.99', false),
        ]),
        categorySection('Pantry', '🏪', [
          checkItem('Olive Oil', 'x1', '$7.99', false),
          checkItem('Brown Rice', '2 lbs', '$3.49', false),
          checkItem('Pasta Sauce', 'x1', '$4.29', false),
        ]),
      ],
    }),
    rectangle('Divider', { size: { x: 460, y: 1 }, fills: [solid('#e5e7eb')] }),
    frame('Summary', {
      autoLayout: vertical({ spacing: 4, padX: 20, padY: 14 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        summaryRow('Subtotal (12 items)', '$65.77', false),
        summaryRow('Checked off (3)', '-$11.98', false),
        rectangle('SumDiv', { size: { x: 460, y: 1 }, fills: [solid('#e5e7eb')] }),
        summaryRow('Remaining', '$53.79', true),
      ],
    }),
  ],
});
