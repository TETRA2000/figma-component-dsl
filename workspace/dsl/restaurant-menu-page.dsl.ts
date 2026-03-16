/**
 * Restaurant Menu — Elegant menu with categories, items, special dishes
 * DSL features: warm color palette, decorative lines, dietary tag pills, gradient special card
 */
import { frame, text, rectangle, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function dietTag(label: string) {
  const colors: Record<string, string> = { V: '#16a34a', GF: '#d97706', DF: '#7c3aed', S: '#ef4444' };
  const c = colors[label] || '#6b7280';
  return frame(`Tag: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }),
    fills: [solid(c + '1a')],
    cornerRadius: 4,
    children: [text(label, { fontSize: 10, fontWeight: 600, color: c })],
  });
}

function menuItem(name: string, desc: string, price: string, tags: string[], popular: boolean) {
  return frame(`Item: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 20, padY: 16 }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.91, b: 0.87, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('ItemHeader', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('NameRow', {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              text(name, { fontSize: 15, fontWeight: 600, color: '#292524' }),
              ...(popular ? [frame('PopBadge', {
                autoLayout: horizontal({ spacing: 0, padX: 8, padY: 2 }),
                fills: [solid('#fef3c7')],
                cornerRadius: 4,
                children: [text('Popular', { fontSize: 10, fontWeight: 600, color: '#d97706' })],
              })] : []),
            ],
          }),
          text(price, { fontSize: 15, fontWeight: 700, color: '#292524' }),
        ],
      }),
      text(desc, { fontSize: 13, fontWeight: 400, color: '#78716c', lineHeight: { value: 145, unit: 'PERCENT' }, size: { x: 500 }, textAutoResize: 'HEIGHT' }),
      ...(tags.length > 0 ? [frame('Tags', {
        autoLayout: horizontal({ spacing: 6 }),
        children: tags.map(t => dietTag(t)),
      })] : []),
    ],
  });
}

function menuCategory(name: string, items: ReturnType<typeof menuItem>[]) {
  return frame(`Category: ${name}`, {
    autoLayout: vertical({ spacing: 12 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('CatHeader', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 20, fontWeight: 700, color: '#292524' }),
          rectangle('Divider', { size: { x: 1, y: 1 }, fills: [solid('#d6d3d1')], layoutSizingHorizontal: 'FILL' }),
        ],
      }),
      ...items,
    ],
  });
}

export default frame('RestaurantMenuPage', {
  size: { x: 720 },
  autoLayout: vertical({ spacing: 32, padX: 48, padY: 48 }),
  fills: [solid('#faf7f2')],
  children: [
    frame('RestHeader', {
      autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('La Maison', { fontSize: 36, fontWeight: 700, color: '#292524', textAlignHorizontal: 'CENTER' }),
        text('Fine French Cuisine', { fontSize: 14, fontWeight: 400, color: '#a8a29e', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    // Special
    frame('Special', {
      autoLayout: vertical({ spacing: 12, padX: 28, padY: 28 }),
      fills: [gradient([{ hex: '#292524', position: 0 }, { hex: '#44403c', position: 1 }], 135)],
      cornerRadius: 14,
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('SpecialBadge', {
          autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }),
          fills: [solid('#d97706')],
          cornerRadius: 4,
          children: [text("Chef's Special", { fontSize: 11, fontWeight: 700, color: '#ffffff' })],
        }),
        text('Truffle Risotto', { fontSize: 22, fontWeight: 700, color: '#ffffff' }),
        text('Arborio rice slow-cooked with black truffle, aged parmesan, and a hint of white wine', { fontSize: 14, fontWeight: 400, color: '#d6d3d1', lineHeight: { value: 150, unit: 'PERCENT' }, size: { x: 550 }, textAutoResize: 'HEIGHT' }),
        text('$42', { fontSize: 20, fontWeight: 700, color: '#d97706' }),
      ],
    }),
    menuCategory('Starters', [
      menuItem('French Onion Soup', 'Caramelized onion broth with gruyere crouton', '$14', ['GF'], true),
      menuItem('Escargot', 'Garlic herb butter, toasted baguette', '$18', [], false),
      menuItem('Garden Salad', 'Mixed greens, goat cheese, candied walnuts, vinaigrette', '$12', ['V', 'GF'], false),
    ]),
    menuCategory('Mains', [
      menuItem('Duck Confit', 'Slow-cooked leg, roasted potatoes, cherry reduction', '$38', ['GF'], true),
      menuItem('Sea Bass en Croute', 'Pastry-wrapped fillet with dill cream sauce', '$36', [], false),
      menuItem('Mushroom Bourguignon', 'Wild mushroom stew with pearl onions and herbs', '$28', ['V', 'DF'], false),
    ]),
    menuCategory('Desserts', [
      menuItem('Creme Brulee', 'Classic vanilla bean custard with caramelized sugar', '$14', ['GF'], true),
      menuItem('Tarte Tatin', 'Upside-down apple tart with creme fraiche', '$12', ['V'], false),
    ]),
    frame('Footer', {
      autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Open Tuesday - Sunday, 5:30 PM - 10:00 PM', { fontSize: 12, fontWeight: 400, color: '#a8a29e', textAlignHorizontal: 'CENTER' }),
        text('Reservations: (415) 555-0189', { fontSize: 12, fontWeight: 400, color: '#a8a29e', textAlignHorizontal: 'CENTER' }),
      ],
    }),
  ],
});
