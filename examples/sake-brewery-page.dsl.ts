import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Dassai/Kubota sake — Deep navy, gold accents, calligraphy elegance
const navy = '#0a1628'; const gold = '#c8a44e'; const white = '#f5f0e8'; const dark = '#1a1420';
const silver = '#a0a8b0'; const cream = '#e8e0d0';

function sakeCard(name: string, grade: string, desc: string, price: string) {
  return frame(`Sake: ${name}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }), size: { x: 300, y: undefined },
    fills: [gradient([{ hex: '#0a1628', position: 0 }, { hex: '#14203a', position: 1 }], 180)],
    cornerRadius: 4,
    children: [
      rectangle('BottleShape', { size: { x: 60, y: 180 },
        fills: [gradient([{ hex: '#1a2a4a', position: 0 }, { hex: '#2a3a5a', position: 0.5 }, { hex: '#1a2a4a', position: 1 }], 180)],
        cornerRadius: 4 }),
      text(grade, { fontSize: 10, fontWeight: 400, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
      text(name, { fontSize: 20, fontWeight: 300, color: white, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
      rectangle('GoldLine', { size: { x: 40, y: 1 }, fills: [solid(gold, 0.5)] }),
      text(desc, { fontSize: 12, fontWeight: 300, color: silver, size: { x: 252 }, textAutoResize: 'HEIGHT' as const }),
      text(price, { fontSize: 14, fontWeight: 400, color: gold }),
    ],
  });
}

export default frame('SakeBrewery', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(navy)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('獺  祭', { fontSize: 24, fontWeight: 300, color: gold, letterSpacing: { value: 8, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 32 }), children: [
          text('Collection', { fontSize: 12, fontWeight: 400, color: white }),
          text('Craft', { fontSize: 12, fontWeight: 300, color: silver }),
          text('Brewery', { fontSize: 12, fontWeight: 300, color: silver }),
          text('Visit', { fontSize: 12, fontWeight: 300, color: silver }),
        ]}),
      ],
    }),
    frame('HeroSection', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#0a1628', position: 0 }, { hex: '#141e30', position: 0.5 }, { hex: '#0a1628', position: 1 }], 180)],
      children: [
        text('DASSAI', { fontSize: 14, fontWeight: 400, color: gold, letterSpacing: { value: 12, unit: 'PIXELS' as const } }),
        text('Beyond the ordinary', { fontSize: 48, fontWeight: 200, color: white, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        text('Crafted with Yamada Nishiki rice, polished to its purest essence', { fontSize: 14, fontWeight: 300, color: silver }),
        rectangle('HeroDivider', { size: { x: 60, y: 1 }, fills: [solid(gold, 0.4)] }),
      ],
    }),
    frame('CollectionSection', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('SectionHead', { autoLayout: vertical({ spacing: 8 }), children: [
          text('THE COLLECTION', { fontSize: 11, fontWeight: 400, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('Sake defined by the polish', { fontSize: 24, fontWeight: 200, color: white }),
        ]}),
        frame('SakeGrid', { autoLayout: horizontal({ spacing: 20 }), children: [
          sakeCard('Dassai 23', 'JUNMAI DAIGINJO', 'Polished to 23%. Floral aroma with delicate sweetness and clean finish. The pinnacle of sake craftsmanship.', '¥16,170'),
          sakeCard('Dassai 39', 'JUNMAI DAIGINJO', 'Polished to 39%. Elegant balance of fruit and umami. Perfect harmony of flavor and fragrance.', '¥5,720'),
          sakeCard('Dassai 45', 'JUNMAI DAIGINJO', 'Polished to 45%. Approachable yet refined. Clean taste with subtle rice sweetness.', '¥3,300'),
          sakeCard('Dassai Sparkling', 'NIGORI SPARKLING', 'Natural effervescence from in-bottle fermentation. Light, refreshing, with cloudy sweetness.', '¥4,180'),
        ]}),
      ],
    }),
    frame('CraftSection', {
      autoLayout: horizontal({ padX: 80, padY: 48, spacing: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#14203a', position: 0 }, { hex: '#0a1628', position: 1 }], 90)],
      children: [
        frame('CraftText', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
          text('OUR CRAFT', { fontSize: 11, fontWeight: 400, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('The art of polishing', { fontSize: 28, fontWeight: 200, color: white }),
          text('The percentage indicates how much of the rice grain remains after polishing. Lower numbers mean more polishing — removing the outer layers to reveal the starchy heart, producing sake of extraordinary clarity and refinement.', { fontSize: 13, fontWeight: 300, color: silver, size: { x: 400 }, textAutoResize: 'HEIGHT' as const }),
        ]}),
        frame('PolishDiagram', { autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }), children: [
          frame('P1', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), children: [
            ellipse('Grain1', { size: { x: 80, y: 80 }, fills: [solid(gold, 0.15)], strokes: [{ color: { r: 0.78, g: 0.64, b: 0.31, a: 0.3 }, weight: 1, align: 'INSIDE' as const }] }),
            text('45%', { fontSize: 12, fontWeight: 400, color: gold }),
          ]}),
          frame('P2', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), children: [
            ellipse('Grain2', { size: { x: 60, y: 60 }, fills: [solid(gold, 0.2)], strokes: [{ color: { r: 0.78, g: 0.64, b: 0.31, a: 0.4 }, weight: 1, align: 'INSIDE' as const }] }),
            text('39%', { fontSize: 12, fontWeight: 400, color: gold }),
          ]}),
          frame('P3', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), children: [
            ellipse('Grain3', { size: { x: 40, y: 40 }, fills: [solid(gold, 0.3)], strokes: [{ color: { r: 0.78, g: 0.64, b: 0.31, a: 0.5 }, weight: 1, align: 'INSIDE' as const }] }),
            text('23%', { fontSize: 12, fontWeight: 400, color: gold }),
          ]}),
        ]}),
      ],
    }),
  ],
});
