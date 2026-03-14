import { frame, text, rectangle, ellipse, solid, gradient, radialGradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: pokemoncenter-online.com — Pokémon Center Online, character goods
// Features stressed: radial gradient, vibrant colors, cornerRadius 9999, CJK, multi-stop gradients

const pokeRed = '#CC0000';
const pokeBlue = '#3B4CCA';
const pokeYellow = '#FFDE00';
const white = '#ffffff';
const dark = '#1a1a1a';
const gray = '#777777';

function merchCard(name: string, price: string, isNew: boolean, bgGrad: string[]) {
  return frame(`Merch:${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 220, y: undefined },
    fills: [solid(white)],
    cornerRadius: 12,
    clipContent: true,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('MerchImgContainer', {
        size: { x: 220, y: 220 },
        fills: [gradient(bgGrad.map((hex, i) => ({ hex, position: i / (bgGrad.length - 1) })))],
        children: [
          ...(isNew ? [frame('NewLabel', {
            autoLayout: horizontal({ padX: 8, padY: 4 }),
            fills: [solid(pokeRed)],
            cornerRadius: 9999,
            children: [text('NEW', { fontSize: 10, fontWeight: 700, color: white })],
          })] : []),
        ],
      }),
      frame('MerchInfo', {
        autoLayout: vertical({ spacing: 4, padX: 12, padY: 12 }),
        layoutSizingHorizontal: 'FILL' as const,
        children: [
          text(name, { fontSize: 13, fontWeight: 500, color: dark }),
          text('¥' + price + '（税込）', { fontSize: 14, fontWeight: 700, color: dark }),
        ],
      }),
    ],
  });
}

function categoryPill(name: string, color: string) {
  return frame(`Cat:${name}`, {
    autoLayout: horizontal({ padX: 14, padY: 7 }),
    fills: [solid(color, 0.12)],
    cornerRadius: 9999,
    strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
    children: [text(name, { fontSize: 12, fontWeight: 500, color })],
  });
}

export default frame('PokemonCenterPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(pokeRed)],
      children: [
        text('ポケモンセンターオンライン', { fontSize: 18, fontWeight: 700, color: white }),
        frame('SearchBar', {
          autoLayout: horizontal({ padX: 14, padY: 8 }),
          size: { x: 360, y: undefined },
          fills: [solid(white)],
          cornerRadius: 9999,
          children: [text('ポケモングッズを検索', { fontSize: 13, fontWeight: 400, color: gray })],
        }),
        frame('HeaderLinks', { autoLayout: horizontal({ spacing: 16 }), children: [
          text('カート', { fontSize: 13, fontWeight: 400, color: white }),
          text('マイページ', { fontSize: 13, fontWeight: 400, color: white }),
        ]}),
      ],
    }),
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 120, padY: 64, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [radialGradient([
        { hex: '#FFDE00', position: 0 },
        { hex: '#FFB300', position: 0.6 },
        { hex: '#FF8F00', position: 1 },
      ])],
      children: [
        text('ポケモンセンター', { fontSize: 40, fontWeight: 900, color: dark }),
        text('お気に入りのポケモングッズを見つけよう！', { fontSize: 18, fontWeight: 500, color: '#5D4037' }),
        frame('HeroCTA', {
          autoLayout: horizontal({ padX: 32, padY: 12 }),
          fills: [solid(pokeRed)],
          cornerRadius: 9999,
          children: [text('新商品を見る', { fontSize: 15, fontWeight: 700, color: white })],
        }),
      ],
    }),
    // Category pills
    frame('CategoryBar', {
      autoLayout: horizontal({ spacing: 10, padX: 40, padY: 16 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#FFF8E1')],
      children: [
        categoryPill('ぬいぐるみ', '#E91E63'),
        categoryPill('フィギュア', '#9C27B0'),
        categoryPill('文具', '#2196F3'),
        categoryPill('アパレル', '#4CAF50'),
        categoryPill('カードゲーム', '#FF9800'),
        categoryPill('お菓子', '#F44336'),
        categoryPill('雑貨', '#795548'),
        categoryPill('キッチン', '#00BCD4'),
      ],
    }),
    // New arrivals
    frame('NewArrivals', {
      autoLayout: vertical({ spacing: 20, padX: 40, padY: 32 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        text('新商品', { fontSize: 22, fontWeight: 700, color: dark }),
        frame('MerchGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            merchCard('ピカチュウ ぬいぐるみ L', '3,300', true, ['#FFDE00', '#FFB300']),
            merchCard('イーブイ もちもちクッション', '2,750', true, ['#C8A87C', '#A0845C']),
            merchCard('ミュウ フィギュア', '4,400', false, ['#FFB6C1', '#FF69B4']),
            merchCard('ゲンガー Tシャツ', '3,520', false, ['#7B68EE', '#4B0082']),
            merchCard('リザードン メタルチャーム', '1,100', true, ['#FF6347', '#FF4500']),
          ],
        }),
      ],
    }),
    // Pikachu feature
    frame('PikachuFeature', {
      autoLayout: horizontal({ padX: 60, padY: 32, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [gradient([{ hex: '#FFDE00', position: 0 }, { hex: '#FFF59D', position: 1 }])],
      cornerRadius: 16,
      children: [
        frame('FeatureText', { autoLayout: vertical({ spacing: 8 }), children: [
          text('ピカチュウコレクション', { fontSize: 24, fontWeight: 700, color: dark }),
          text('大人気のピカチュウグッズが勢揃い！限定アイテムも多数', { fontSize: 14, fontWeight: 400, color: '#5D4037' }),
          frame('FeatureCTA', {
            autoLayout: horizontal({ padX: 20, padY: 8 }),
            fills: [solid(pokeRed)],
            cornerRadius: 9999,
            children: [text('コレクションを見る', { fontSize: 13, fontWeight: 600, color: white })],
          }),
        ]}),
        ellipse('PikaIcon', { size: { x: 120, y: 120 }, fills: [solid(pokeYellow, 0.4)] }),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 6, padX: 40, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#2C2C2C')],
      children: [
        text('株式会社ポケモン', { fontSize: 12, fontWeight: 400, color: '#999999' }),
        text('© The Pokémon Company', { fontSize: 11, fontWeight: 400, color: '#777777' }),
      ],
    }),
  ],
});
