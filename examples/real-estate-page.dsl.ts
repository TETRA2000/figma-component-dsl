import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: suumo.jp style — Property listing grid, filter sidebar, price badges, specs
const green = '#00a050'; const dark = '#1a1a1a'; const white = '#ffffff'; const bg = '#f5f5f5';
const med = '#666666'; const orange = '#ff6600'; const blue = '#0066cc';

function propertyCard(name: string, price: string, area: string, station: string, layout: string, size2: string, age: string) {
  return frame(`Property: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 320, y: undefined }, fills: [solid(white)], cornerRadius: 4,
    strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.08 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('PropertyImg', { size: { x: 320, y: 180 },
        fills: [gradient([{ hex: '#d0d0d0', position: 0 }, { hex: '#e8e8e8', position: 1 }], 135)] }),
      frame('PropertyInfo', { autoLayout: vertical({ spacing: 6, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL', children: [
        frame('PriceRow', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
          frame('PriceBadge', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(orange)], cornerRadius: 2,
            children: [text(price, { fontSize: 14, fontWeight: 700, color: white })] }),
          text(area, { fontSize: 11, fontWeight: 400, color: med }),
        ]}),
        text(name, { fontSize: 14, fontWeight: 600, color: dark }),
        text(station, { fontSize: 11, fontWeight: 400, color: blue }),
        frame('SpecRow', { autoLayout: horizontal({ spacing: 10 }), children: [
          text(layout, { fontSize: 11, fontWeight: 500, color: dark }),
          text(size2, { fontSize: 11, fontWeight: 400, color: med }),
          text(age, { fontSize: 11, fontWeight: 400, color: med }),
        ]}),
      ]}),
    ],
  });
}

export default frame('RealEstate', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 32, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(green)],
      children: [
        text('SUUMO', { fontSize: 20, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 16 }), children: [
          text('Buy', { fontSize: 12, fontWeight: 600, color: white }),
          text('Rent', { fontSize: 12, fontWeight: 400, color: '#a0e0b0' }),
          text('New Build', { fontSize: 12, fontWeight: 400, color: '#a0e0b0' }),
        ]}),
      ],
    }),
    frame('SearchBar', {
      autoLayout: horizontal({ padX: 32, padY: 12, spacing: 12, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.08 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('SearchInput', { autoLayout: horizontal({ padX: 12, padY: 8 }), fills: [solid(bg)], cornerRadius: 4, size: { x: 300, y: undefined },
          children: [text('Search area, station, or address...', { fontSize: 12, fontWeight: 400, color: med })] }),
        frame('FilterBtn1', { autoLayout: horizontal({ padX: 10, padY: 6 }), fills: [solid(bg)], cornerRadius: 4,
          children: [text('Price Range', { fontSize: 11, fontWeight: 400, color: dark })] }),
        frame('FilterBtn2', { autoLayout: horizontal({ padX: 10, padY: 6 }), fills: [solid(bg)], cornerRadius: 4,
          children: [text('Layout', { fontSize: 11, fontWeight: 400, color: dark })] }),
        frame('FilterBtn3', { autoLayout: horizontal({ padX: 10, padY: 6 }), fills: [solid(bg)], cornerRadius: 4,
          children: [text('Area (sqm)', { fontSize: 11, fontWeight: 400, color: dark })] }),
        frame('SearchBtn', { autoLayout: horizontal({ padX: 16, padY: 6 }), fills: [solid(green)], cornerRadius: 4,
          children: [text('Search', { fontSize: 12, fontWeight: 600, color: white })] }),
      ],
    }),
    frame('ResultsHeader', {
      autoLayout: horizontal({ padX: 32, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Tokyo - Minato-ku  |  248 properties found', { fontSize: 13, fontWeight: 500, color: dark }),
        frame('SortBar', { autoLayout: horizontal({ spacing: 10 }), children: [
          text('Sort by:', { fontSize: 11, fontWeight: 400, color: med }),
          text('Price', { fontSize: 11, fontWeight: 600, color: green }),
          text('New', { fontSize: 11, fontWeight: 400, color: med }),
          text('Area', { fontSize: 11, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('ListingsGrid', {
      autoLayout: vertical({ spacing: 14, padX: 32, padY: 12 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('Row1', { autoLayout: horizontal({ spacing: 14 }), children: [
          propertyCard('Roppongi Hills Residence', '¥89,800,000', 'Minato-ku', 'Roppongi Station 3 min walk', '3LDK', '98.5 sqm', 'Built 2018'),
          propertyCard('Azabu Juban Tower', '¥128,000,000', 'Minato-ku', 'Azabu-Juban Station 5 min', '4LDK', '142.3 sqm', 'Built 2020'),
          propertyCard('Shirokane Terrace', '¥52,800,000', 'Minato-ku', 'Shirokane-Takanawa 7 min', '2LDK', '68.2 sqm', 'Built 2015'),
          propertyCard('Toranomon Apartment', '¥73,500,000', 'Minato-ku', 'Toranomon Station 2 min', '2LDK', '82.1 sqm', 'Built 2022'),
        ]}),
      ],
    }),
  ],
});
