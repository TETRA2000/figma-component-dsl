import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const wine = '#7f1d1d'; const cream = '#fef3c7'; const white = '#ffffff'; const bg = '#fffbeb';
const dark = '#292524'; const med = '#78716c'; const gold = '#b45309'; const green = '#15803d';

function menuItem(name: string, desc: string, price: string, isVeg: boolean) {
  return frame(`Item: ${name}`, {
    autoLayout: horizontal({ padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'MIN' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.87, b: 0.78, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('ItemLeft', { autoLayout: horizontal({ spacing: 10, counterAlign: 'MIN' }), children: [
        ...(isVeg ? [ellipse('VegDot', { size: { x: 8, y: 8 }, fills: [solid(green)] })] : []),
        frame('ItemText', { autoLayout: vertical({ spacing: 3 }), children: [
          text(name, { fontSize: 15, fontWeight: 600, color: dark }),
          text(desc, { fontSize: 12, fontWeight: 400, color: med, size: { x: 320 }, textAutoResize: 'HEIGHT' as const }),
        ]}),
      ]}),
      text(price, { fontSize: 16, fontWeight: 700, color: gold }),
    ],
  });
}

function menuSection(title: string, items: ReturnType<typeof menuItem>[]) {
  return frame(`Section: ${title}`, {
    autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }), layoutSizingHorizontal: 'FILL',
    children: [
      frame('SectionHead', { autoLayout: horizontal({ padX: 16, padY: 10 }), layoutSizingHorizontal: 'FILL',
        fills: [solid(cream)],
        children: [text(title, { fontSize: 18, fontWeight: 700, color: wine, letterSpacing: { value: 1, unit: 'PIXELS' as const } })] }),
      ...items,
    ],
  });
}

export default frame('RestaurantMenu', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#7f1d1d', position: 0 }, { hex: '#991b1b', position: 1 }], 90)],
      children: [
        text('La Trattoria', { fontSize: 24, fontWeight: 700, color: cream }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Menu', { fontSize: 14, fontWeight: 600, color: cream }),
          text('Reservations', { fontSize: 14, fontWeight: 400, color: '#fbbf24' }),
          text('About', { fontSize: 14, fontWeight: 400, color: '#fbbf24' }),
        ]}),
      ],
    }),
    frame('Banner', {
      autoLayout: vertical({ spacing: 8, padX: 48, padY: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(cream)],
      children: [
        text('Our Menu', { fontSize: 36, fontWeight: 700, color: wine }),
        text('Authentic Italian cuisine made with love', { fontSize: 15, fontWeight: 400, color: med }),
      ],
    }),
    frame('MenuBody', {
      autoLayout: horizontal({ spacing: 24, padX: 48, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('LeftCol', { autoLayout: vertical({ spacing: 16 }), layoutSizingHorizontal: 'FILL', fills: [solid(white)], cornerRadius: 12, clipContent: true, children: [
          menuSection('ANTIPASTI', [
            menuItem('Bruschetta Classica', 'Toasted bread with fresh tomatoes, basil, and garlic', '$12', true),
            menuItem('Carpaccio di Manzo', 'Thinly sliced beef with arugula and parmesan', '$16', false),
            menuItem('Burrata Caprese', 'Creamy burrata with heirloom tomatoes', '$14', true),
          ]),
          menuSection('PRIMI PIATTI', [
            menuItem('Spaghetti Carbonara', 'Guanciale, egg yolk, pecorino romano, black pepper', '$18', false),
            menuItem('Risotto ai Funghi', 'Arborio rice with wild mushrooms and truffle oil', '$20', true),
            menuItem('Pappardelle al Ragu', 'Wide pasta with slow-cooked Bolognese sauce', '$19', false),
          ]),
        ]}),
        frame('RightCol', { autoLayout: vertical({ spacing: 16 }), layoutSizingHorizontal: 'FILL', fills: [solid(white)], cornerRadius: 12, clipContent: true, children: [
          menuSection('SECONDI', [
            menuItem('Osso Buco', 'Braised veal shanks with gremolata', '$32', false),
            menuItem('Branzino al Forno', 'Baked Mediterranean sea bass with herbs', '$28', false),
            menuItem('Pollo alla Parmigiana', 'Chicken breast with tomato sauce and mozzarella', '$24', false),
          ]),
          menuSection('DOLCI', [
            menuItem('Tiramisu', 'Classic mascarpone and espresso layered dessert', '$10', true),
            menuItem('Panna Cotta', 'Vanilla bean cream with berry compote', '$9', true),
            menuItem('Cannoli Siciliani', 'Crispy shells filled with sweet ricotta', '$8', true),
          ]),
        ]}),
      ],
    }),
  ],
});
