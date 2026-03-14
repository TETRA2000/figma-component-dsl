import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: kokuyo.com — Creative stationery, playful colors, product showcase
const blue = '#2854C5'; const yellow = '#FFD600'; const pink = '#FF6B9D'; const green = '#00C853';
const white = '#ffffff'; const bg = '#fafafa'; const dark = '#1a1a1a'; const med = '#666666';

function productCard(name: string, desc: string, price: string, color: string, radius: number) {
  return frame(`Product: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 260, y: undefined },
    cornerRadius: radius, clipContent: true, fills: [solid(white)],
    children: [
      frame('ProductImg', { size: { x: 260, y: 200 }, fills: [solid(color, 0.12)],
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        children: [ellipse('ProductDot', { size: { x: 60, y: 60 }, fills: [solid(color, 0.3)] })] }),
      frame('ProductInfo', { autoLayout: vertical({ spacing: 6, padX: 16, padY: 14 }), layoutSizingHorizontal: 'FILL', children: [
        text(name, { fontSize: 14, fontWeight: 600, color: dark }),
        text(desc, { fontSize: 12, fontWeight: 400, color: med }),
        text(price, { fontSize: 14, fontWeight: 700, color: color }),
      ]}),
    ],
  });
}

function categoryChip(label: string, color: string, isActive: boolean) {
  return frame(`Cat: ${label}`, {
    autoLayout: horizontal({ padX: 16, padY: 8 }), fills: [solid(isActive ? color : white)],
    cornerRadius: 20, strokes: isActive ? [] : [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [text(label, { fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? white : dark })],
  });
}

export default frame('KokuyoStationery', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('KOKUYO', { fontSize: 20, fontWeight: 700, color: blue, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Products', { fontSize: 13, fontWeight: 500, color: blue }),
          text('Curiosity', { fontSize: 13, fontWeight: 400, color: dark }),
          text('Design Award', { fontSize: 13, fontWeight: 400, color: dark }),
          text('About', { fontSize: 13, fontWeight: 400, color: dark }),
        ]}),
      ],
    }),
    frame('HeroBanner', {
      autoLayout: horizontal({ padX: 48, padY: 40, spacing: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#2854C5', position: 0 }, { hex: '#4070DD', position: 0.5 }, { hex: '#6090FF', position: 1 }], 135)],
      children: [
        frame('HeroText', { autoLayout: vertical({ spacing: 12 }), children: [
          text('Curiosity is Life', { fontSize: 36, fontWeight: 700, color: white }),
          text('Creating tools that inspire creativity and productivity', { fontSize: 15, fontWeight: 400, color: '#b3c9ff' }),
          frame('ExploreBtn', { autoLayout: horizontal({ padX: 24, padY: 10 }), fills: [solid(yellow)], cornerRadius: 24,
            children: [text('Explore Products', { fontSize: 13, fontWeight: 600, color: dark })] }),
        ]}),
        frame('HeroShapes', { autoLayout: horizontal({ spacing: 12 }), children: [
          ellipse('Shape1', { size: { x: 80, y: 80 }, fills: [solid(yellow, 0.3)] }),
          rectangle('Shape2', { size: { x: 60, y: 60 }, fills: [solid(pink, 0.3)], cornerRadius: 12 }),
          ellipse('Shape3', { size: { x: 100, y: 100 }, fills: [solid(green, 0.3)] }),
        ]}),
      ],
    }),
    frame('Categories', {
      autoLayout: horizontal({ spacing: 8, padX: 48, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        categoryChip('All', blue, true),
        categoryChip('Notebooks', pink, false),
        categoryChip('Pens', green, false),
        categoryChip('Filing', yellow, false),
        categoryChip('Furniture', blue, false),
      ],
    }),
    frame('Products', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Popular Products', { fontSize: 20, fontWeight: 700, color: dark }),
        frame('Grid', { autoLayout: horizontal({ spacing: 16 }), children: [
          productCard('Campus Notebook B5', 'Smart ring binding system', '¥280', blue, 12),
          productCard('GLOO Tape Runner', 'Square-tip adhesive tape', '¥440', pink, 16),
          productCard('ME Softring Notebook', 'Ultra-soft ring binding', '¥550', green, 20),
          productCard('Harinacs Staple-Free', 'Staple without staples', '¥800', yellow, 12),
          productCard('PERPANEP Notebook', 'Paper texture selection', '¥990', '#9C27B0', 16),
        ]}),
      ],
    }),
  ],
});
