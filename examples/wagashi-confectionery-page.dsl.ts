import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Wagashi Japanese sweets — Soft pastels (sakura pink, matcha green, yuzu yellow), delicate
const sakuraPink = '#f0b0c0'; const matchaGreen = '#8aaa78'; const yuzuYellow = '#e8d070'; const dark = '#3a3430';
const white = '#fefcf8'; const med = '#8a8078'; const cream = '#f8f4ec'; const paleRose = '#fae8ee';

function wagashiCard(name: string, season: string, desc: string, price: string, color: string) {
  return frame(`Wagashi: ${name}`, {
    autoLayout: vertical({ spacing: 0, counterAlign: 'CENTER' }), size: { x: 220, y: undefined }, cornerRadius: 12, clipContent: true,
    fills: [solid(white)],
    children: [
      frame('WagashiImgWrap', { autoLayout: vertical({ padX: 0, padY: 24, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL', fills: [solid(color, 0.1)], children: [
        ellipse('WagashiShape', { size: { x: 80, y: 80 }, fills: [solid(color, 0.3)],
          strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.05 }, weight: 1, align: 'INSIDE' as const }] }),
      ]}),
      frame('WagashiInfo', { autoLayout: vertical({ spacing: 5, padX: 16, padY: 14, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
        text(season, { fontSize: 9, fontWeight: 400, color, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        text(name, { fontSize: 15, fontWeight: 400, color: dark }),
        text(desc, { fontSize: 11, fontWeight: 300, color: med }),
        text(price, { fontSize: 13, fontWeight: 400, color: dark }),
      ]}),
    ],
  });
}

export default frame('WagashiConfectionery', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(cream)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('菓子処  花月', { fontSize: 20, fontWeight: 300, color: dark, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Wagashi', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Seasons', { fontSize: 12, fontWeight: 300, color: med }),
          text('Gifts', { fontSize: 12, fontWeight: 300, color: med }),
          text('Tea Pairing', { fontSize: 12, fontWeight: 300, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 14, padX: 80, padY: 60, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(paleRose)],
      children: [
        text('四季の彩り', { fontSize: 14, fontWeight: 300, color: sakuraPink, letterSpacing: { value: 8, unit: 'PIXELS' as const } }),
        text('Colors of the four seasons', { fontSize: 36, fontWeight: 200, color: dark }),
        text('Traditional Japanese confections, handcrafted to reflect nature\'s beauty', { fontSize: 13, fontWeight: 300, color: med }),
      ],
    }),
    frame('Products', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 40 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Seasonal Selection', { fontSize: 22, fontWeight: 200, color: dark }),
        frame('WagashiGrid', { autoLayout: horizontal({ spacing: 16 }), children: [
          wagashiCard('Sakura Mochi', 'SPRING', 'Cherry-leaf wrapped mochi with sweet bean paste', '¥380', sakuraPink),
          wagashiCard('Matcha Daifuku', 'ALL SEASONS', 'Matcha-infused rice cake filled with white bean', '¥420', matchaGreen),
          wagashiCard('Yuzu Yokan', 'WINTER', 'Citrus-scented bean jelly, refreshingly tart', '¥350', yuzuYellow),
          wagashiCard('Kuzu Manju', 'SUMMER', 'Translucent kuzu starch over sweet azuki bean', '¥400', '#88b0d0'),
          wagashiCard('Momiji Kinton', 'AUTUMN', 'Chestnut purée shaped as autumn maple leaves', '¥450', '#d8a060'),
        ]}),
      ],
    }),
    frame('TeaPairing', {
      autoLayout: horizontal({ padX: 80, padY: 40, spacing: 40, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        frame('PairingText', { autoLayout: vertical({ spacing: 10 }), layoutSizingHorizontal: 'FILL', children: [
          text('TEA PAIRING', { fontSize: 11, fontWeight: 400, color: matchaGreen, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('The perfect harmony', { fontSize: 24, fontWeight: 200, color: dark }),
          text('Each wagashi is designed to complement specific teas. The sweetness of the confection balances the bitterness of matcha, creating a moment of perfect balance.', { fontSize: 13, fontWeight: 300, color: med, size: { x: 400 }, textAutoResize: 'HEIGHT' as const }),
        ]}),
        frame('PairingCards', { autoLayout: vertical({ spacing: 8 }), size: { x: 300, y: undefined }, children: [
          frame('Pair1', { autoLayout: horizontal({ spacing: 12, padX: 14, padY: 10, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', fills: [solid(matchaGreen, 0.06)], cornerRadius: 6, children: [
            ellipse('T1', { size: { x: 24, y: 24 }, fills: [solid(matchaGreen, 0.2)] }),
            text('Usucha + Sakura Mochi — Classic springtime pairing', { fontSize: 11, fontWeight: 300, color: dark }),
          ]}),
          frame('Pair2', { autoLayout: horizontal({ spacing: 12, padX: 14, padY: 10, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', fills: [solid(yuzuYellow, 0.06)], cornerRadius: 6, children: [
            ellipse('T2', { size: { x: 24, y: 24 }, fills: [solid(yuzuYellow, 0.2)] }),
            text('Hojicha + Yuzu Yokan — Roasted warmth meets citrus', { fontSize: 11, fontWeight: 300, color: dark }),
          ]}),
          frame('Pair3', { autoLayout: horizontal({ spacing: 12, padX: 14, padY: 10, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', fills: [solid(sakuraPink, 0.06)], cornerRadius: 6, children: [
            ellipse('T3', { size: { x: 24, y: 24 }, fills: [solid(sakuraPink, 0.2)] }),
            text('Koicha + Momiji Kinton — Rich matcha, autumn sweetness', { fontSize: 11, fontWeight: 300, color: dark }),
          ]}),
        ]}),
      ],
    }),
  ],
});
