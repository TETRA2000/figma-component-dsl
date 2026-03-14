import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Japanese matcha tea ceremony — Deep green, cream, wabi-sabi ceramics
const matcha = '#2e5a1e'; const cream = '#f5f0e0'; const darkGreen = '#1a3a10'; const white = '#faf8f2';
const med = '#7a7060'; const brown = '#6e5a40'; const sage = '#8a9a70';

function productItem(name: string, origin: string, price: string, desc: string) {
  return frame(`Tea: ${name}`, {
    autoLayout: horizontal({ spacing: 20, padX: 24, padY: 20, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL', fills: [solid(white)], cornerRadius: 4,
    strokes: [{ color: { r: 0.88, g: 0.85, b: 0.78, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse('TeaBowl', { size: { x: 80, y: 80 }, fills: [gradient([{ hex: '#2e5a1e', position: 0 }, { hex: '#4a7a3a', position: 1 }], 135)],
        strokes: [{ color: { r: 0.42, g: 0.35, b: 0.25, a: 0.3 }, weight: 2, align: 'INSIDE' as const }] }),
      frame('TeaInfo', { autoLayout: vertical({ spacing: 4 }), layoutSizingHorizontal: 'FILL', children: [
        text(name, { fontSize: 16, fontWeight: 300, color: darkGreen, letterSpacing: { value: 1, unit: 'PIXELS' as const } }),
        text(origin, { fontSize: 11, fontWeight: 400, color: sage }),
        text(desc, { fontSize: 12, fontWeight: 300, color: med }),
      ]}),
      text(price, { fontSize: 15, fontWeight: 400, color: matcha }),
    ],
  });
}

export default frame('MatchaCeremony', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(cream)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('茶  道', { fontSize: 22, fontWeight: 300, color: darkGreen, letterSpacing: { value: 8, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('Matcha', { fontSize: 12, fontWeight: 400, color: darkGreen }),
          text('Ceremony', { fontSize: 12, fontWeight: 300, color: med }),
          text('Chawan', { fontSize: 12, fontWeight: 300, color: med }),
          text('About', { fontSize: 12, fontWeight: 300, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#1a3a10', position: 0 }, { hex: '#2e5a1e', position: 0.4 }, { hex: '#4a7a3a', position: 0.7 }, { hex: '#8a9a70', position: 1 }], 180)],
      children: [
        text('一期一会', { fontSize: 14, fontWeight: 300, color: sage, letterSpacing: { value: 12, unit: 'PIXELS' as const } }),
        text('One moment, one meeting', { fontSize: 44, fontWeight: 200, color: white, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        text('Premium ceremonial grade matcha from Uji, Kyoto', { fontSize: 14, fontWeight: 300, color: '#b0c090' }),
      ],
    }),
    frame('Products', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('SectionHead', { autoLayout: vertical({ spacing: 6 }), children: [
          text('OUR MATCHA', { fontSize: 11, fontWeight: 400, color: matcha, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('Curated selections', { fontSize: 24, fontWeight: 200, color: darkGreen }),
        ]}),
        productItem('Hikari', 'Uji, Kyoto', '¥4,800', 'Our finest ceremonial grade. Vibrant green with umami sweetness.'),
        productItem('Tsuki', 'Nishio, Aichi', '¥3,200', 'Smooth and balanced. Perfect for daily ceremony practice.'),
        productItem('Kaze', 'Yame, Fukuoka', '¥2,400', 'Rich and vegetal. Excellent for both thin and thick preparation.'),
        productItem('Hana', 'Uji, Kyoto', '¥1,800', 'Culinary grade with deep flavor. Ideal for lattes and baking.'),
      ],
    }),
    frame('CeremonySection', {
      autoLayout: horizontal({ padX: 80, padY: 48, spacing: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        frame('CeremonyText', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
          text('THE CEREMONY', { fontSize: 11, fontWeight: 400, color: matcha, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('The way of tea', { fontSize: 28, fontWeight: 200, color: darkGreen }),
          text('Chado, the way of tea, is more than preparing a bowl of matcha. It is a practice of mindfulness, respect, and the appreciation of beauty in simplicity. Each movement is deliberate, each moment savored.', { fontSize: 13, fontWeight: 300, color: med, size: { x: 450 }, textAutoResize: 'HEIGHT' as const }),
        ]}),
        frame('Steps', { autoLayout: vertical({ spacing: 12 }), size: { x: 400, y: undefined }, children: [
          frame('Step1', { autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12, counterAlign: 'CENTER' }), fills: [solid(cream)], cornerRadius: 4, layoutSizingHorizontal: 'FILL', children: [
            ellipse('S1', { size: { x: 28, y: 28 }, fills: [solid(matcha, 0.15)] }),
            frame('S1Text', { autoLayout: vertical({ spacing: 1 }), children: [
              text('Purification', { fontSize: 13, fontWeight: 400, color: darkGreen }),
              text('Cleanse the utensils with deliberate care', { fontSize: 11, fontWeight: 300, color: med }),
            ]}),
          ]}),
          frame('Step2', { autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12, counterAlign: 'CENTER' }), fills: [solid(cream)], cornerRadius: 4, layoutSizingHorizontal: 'FILL', children: [
            ellipse('S2', { size: { x: 28, y: 28 }, fills: [solid(matcha, 0.15)] }),
            frame('S2Text', { autoLayout: vertical({ spacing: 1 }), children: [
              text('Preparation', { fontSize: 13, fontWeight: 400, color: darkGreen }),
              text('Sift matcha powder, heat water to 80°C', { fontSize: 11, fontWeight: 300, color: med }),
            ]}),
          ]}),
          frame('Step3', { autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12, counterAlign: 'CENTER' }), fills: [solid(cream)], cornerRadius: 4, layoutSizingHorizontal: 'FILL', children: [
            ellipse('S3', { size: { x: 28, y: 28 }, fills: [solid(matcha, 0.15)] }),
            frame('S3Text', { autoLayout: vertical({ spacing: 1 }), children: [
              text('Whisking', { fontSize: 13, fontWeight: 400, color: darkGreen }),
              text('Whisk in a W pattern until frothy', { fontSize: 11, fontWeight: 300, color: med }),
            ]}),
          ]}),
          frame('Step4', { autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12, counterAlign: 'CENTER' }), fills: [solid(cream)], cornerRadius: 4, layoutSizingHorizontal: 'FILL', children: [
            ellipse('S4', { size: { x: 28, y: 28 }, fills: [solid(matcha, 0.15)] }),
            frame('S4Text', { autoLayout: vertical({ spacing: 1 }), children: [
              text('Enjoyment', { fontSize: 13, fontWeight: 400, color: darkGreen }),
              text('Receive with both hands, savor each sip', { fontSize: 11, fontWeight: 300, color: med }),
            ]}),
          ]}),
        ]}),
      ],
    }),
  ],
});
