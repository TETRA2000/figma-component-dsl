import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: isetan.mistore.jp — Isetan Mitsukoshi department store, luxury, elegant
// Features stressed: elegant thin fonts, gold accents, dark theme sections, CJK, lineHeight

const isetanGold = '#C4A265';
const dark = '#1a1a1a';
const white = '#ffffff';
const cream = '#F8F4ED';
const warmGray = '#8C8070';
const navy = '#1A1A2E';

function luxuryCard(brand: string, desc: string, category: string) {
  return frame(`Brand:${brand}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 300, y: undefined },
    fills: [solid(white)],
    clipContent: true,
    children: [
      rectangle('BrandImg', { size: { x: 300, y: 220 }, fills: [gradient([{ hex: '#2C2C2C', position: 0 }, { hex: '#4A4A4A', position: 1 }])] }),
      frame('BrandInfo', {
        autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
        layoutSizingHorizontal: 'FILL' as const,
        children: [
          text(category, { fontSize: 11, fontWeight: 400, color: isetanGold, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
          text(brand, { fontSize: 18, fontWeight: 300, color: dark }),
          text(desc, { fontSize: 13, fontWeight: 400, color: warmGray, lineHeight: { value: 22, unit: 'PIXELS' as const } }),
        ],
      }),
    ],
  });
}

function eventRow(date: string, title: string, floor: string) {
  return frame(`Event:${title.slice(0, 10)}`, {
    autoLayout: horizontal({ padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL' as const,
    strokes: [{ color: { r: 0.9, g: 0.88, b: 0.84, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(date, { fontSize: 12, fontWeight: 400, color: warmGray }),
      text(title, { fontSize: 14, fontWeight: 400, color: dark }),
      frame('FloorBadge', {
        autoLayout: horizontal({ padX: 8, padY: 3 }),
        strokes: [{ color: { r: 0.77, g: 0.64, b: 0.40, a: 0.5 }, weight: 1, align: 'INSIDE' as const }],
        children: [text(floor, { fontSize: 11, fontWeight: 400, color: isetanGold })],
      }),
    ],
  });
}

export default frame('IsetanMitsukoshiPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      strokes: [{ color: { r: 0.9, g: 0.88, b: 0.84, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('ISETAN MITSUKOSHI', { fontSize: 18, fontWeight: 300, color: dark, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('ブランド', { fontSize: 13, fontWeight: 300, color: dark }),
          text('フロアガイド', { fontSize: 13, fontWeight: 300, color: dark }),
          text('イベント', { fontSize: 13, fontWeight: 300, color: dark }),
          text('オンラインストア', { fontSize: 13, fontWeight: 300, color: dark }),
        ]}),
        text('会員登録', { fontSize: 13, fontWeight: 300, color: isetanGold }),
      ],
    }),
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 20, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [gradient([{ hex: '#1A1A2E', position: 0 }, { hex: '#2C2C4A', position: 0.5 }, { hex: '#1A1A2E', position: 1 }])],
      children: [
        text('ISETAN', { fontSize: 14, fontWeight: 400, color: isetanGold, letterSpacing: { value: 8, unit: 'PIXELS' as const } }),
        text('美しさを、纏う。', { fontSize: 36, fontWeight: 200, color: white }),
        text('新宿伊勢丹 — 日本のファッションの殿堂', { fontSize: 14, fontWeight: 300, color: '#aaa8b8' }),
      ],
    }),
    // Featured brands
    frame('BrandsSection', {
      autoLayout: vertical({ spacing: 28, padX: 60, padY: 48 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        frame('SectionHeader', {
          autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL' as const,
          children: [
            text('FEATURED BRANDS', { fontSize: 12, fontWeight: 400, color: warmGray, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
            text('注目のブランド', { fontSize: 22, fontWeight: 200, color: dark }),
          ],
        }),
        frame('BrandGrid', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            luxuryCard('HERMÈS', '職人の技が光るレザーグッズの最高峰。時を超えて愛される逸品。', 'LUXURY'),
            luxuryCard('ISSEY MIYAKE', '革新的なプリーツテクノロジーが生み出す、動きのある美しさ。', 'FASHION'),
            luxuryCard('SHISEIDO', '日本の美意識から生まれた、先端のスキンケア＆メイクアップ。', 'BEAUTY'),
            luxuryCard('鍛冶 包丁', '堺の伝統技法で作られた日本刀級の切れ味。職人の魂が宿る一本。', 'CRAFT'),
          ],
        }),
      ],
    }),
    // Events
    frame('EventsSection', {
      autoLayout: vertical({ spacing: 16, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      children: [
        text('イベント・催事', { fontSize: 20, fontWeight: 200, color: dark }),
        eventRow('3/14 - 3/20', '春のスイーツコレクション 2026', '地下1階'),
        eventRow('3/15 - 3/28', 'フランス展 — パリの美食と文化', '6階'),
        eventRow('3/16 - 3/22', '日本の伝統工芸展', '7階'),
        eventRow('3/18 - 4/01', '春のジュエリーフェア', '1階'),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 8, padX: 60, padY: 28, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(navy)],
      children: [
        text('株式会社三越伊勢丹', { fontSize: 12, fontWeight: 300, color: '#8888aa' }),
        text('© Isetan Mitsukoshi Ltd.', { fontSize: 11, fontWeight: 300, color: '#666688' }),
      ],
    }),
  ],
});
