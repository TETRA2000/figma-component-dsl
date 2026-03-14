import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: daiso-sangyo.co.jp — Daiso 100-yen shop, colorful, value-focused
// Features stressed: vibrant multi-color palette, dense product grid, CJK, cornerRadius 9999, SPACE_BETWEEN

const daisoPink = '#E91E63';
const daisoBlue = '#2196F3';
const daisoGreen = '#4CAF50';
const daisoOrange = '#FF9800';
const white = '#ffffff';
const dark = '#222222';
const gray = '#888888';
const lightBg = '#FFF5F7';

function productItem(name: string, category: string, catColor: string) {
  return frame(`Item:${name}`, {
    autoLayout: vertical({ spacing: 6, counterAlign: 'CENTER' }),
    size: { x: 150, y: undefined },
    children: [
      rectangle('ItemImg', { size: { x: 140, y: 140 }, fills: [solid('#f0f0f0')], cornerRadius: 12 }),
      text(name, { fontSize: 12, fontWeight: 500, color: dark }),
      frame('CatRow', {
        autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
        children: [
          frame('Dot', { size: { x: 8, y: 8 }, fills: [solid(catColor)], cornerRadius: 4 }),
          text(category, { fontSize: 10, fontWeight: 400, color: gray }),
        ],
      }),
      frame('PriceBadge', {
        autoLayout: horizontal({ padX: 10, padY: 3 }),
        fills: [solid(daisoPink)],
        cornerRadius: 9999,
        children: [text('¥110', { fontSize: 12, fontWeight: 700, color: white })],
      }),
    ],
  });
}

function categoryCircle(name: string, color: string) {
  return frame(`Cat:${name}`, {
    autoLayout: vertical({ spacing: 6, counterAlign: 'CENTER' }),
    size: { x: 100, y: undefined },
    children: [
      ellipse('CatCircle', { size: { x: 64, y: 64 }, fills: [solid(color, 0.2)] }),
      text(name, { fontSize: 12, fontWeight: 500, color: dark }),
    ],
  });
}

export default frame('DaisoJapanPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(daisoPink)],
      children: [
        text('DAISO', { fontSize: 28, fontWeight: 900, color: white }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('商品', { fontSize: 14, fontWeight: 500, color: white }),
          text('店舗検索', { fontSize: 14, fontWeight: 500, color: white }),
          text('オンラインショップ', { fontSize: 14, fontWeight: 500, color: white }),
          text('企業情報', { fontSize: 14, fontWeight: 500, color: white }),
        ]}),
        frame('OnlineBtn', {
          autoLayout: horizontal({ padX: 16, padY: 8 }),
          fills: [solid(white)],
          cornerRadius: 9999,
          children: [text('オンラインで買う', { fontSize: 13, fontWeight: 600, color: daisoPink })],
        }),
      ],
    }),
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 120, padY: 56, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [gradient([{ hex: '#E91E63', position: 0 }, { hex: '#FF5252', position: 0.5 }, { hex: '#FF8A80', position: 1 }])],
      children: [
        text('毎日が楽しくなる', { fontSize: 36, fontWeight: 900, color: white }),
        text('100円ショップ DAISO', { fontSize: 18, fontWeight: 400, color: white }),
        text('70,000点以上の商品があなたを待っています', { fontSize: 14, fontWeight: 400, color: white, opacity: 0.8 }),
      ],
    }),
    // Categories
    frame('Categories', {
      autoLayout: vertical({ spacing: 20, padX: 60, padY: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(lightBg)],
      children: [
        text('カテゴリ', { fontSize: 20, fontWeight: 700, color: dark }),
        frame('CatGrid', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            categoryCircle('キッチン', daisoPink),
            categoryCircle('収納', daisoBlue),
            categoryCircle('文具', daisoOrange),
            categoryCircle('インテリア', daisoGreen),
            categoryCircle('美容', '#9C27B0'),
            categoryCircle('DIY', '#795548'),
            categoryCircle('掃除', '#00BCD4'),
            categoryCircle('食品', '#FF5722'),
            categoryCircle('園芸', '#8BC34A'),
            categoryCircle('電気', '#607D8B'),
          ],
        }),
      ],
    }),
    // Popular products
    frame('PopularSection', {
      autoLayout: vertical({ spacing: 20, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        frame('SectionHeader', {
          autoLayout: horizontal({ align: 'SPACE_BETWEEN' }),
          layoutSizingHorizontal: 'FILL' as const,
          children: [
            text('人気商品', { fontSize: 20, fontWeight: 700, color: dark }),
            text('もっと見る →', { fontSize: 14, fontWeight: 500, color: daisoPink }),
          ],
        }),
        frame('ProductGrid', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            productItem('マイクロファイバークロス', 'キッチン', daisoPink),
            productItem('収納ボックス S', '収納', daisoBlue),
            productItem('ゲルインクペン 5色', '文具', daisoOrange),
            productItem('アロマキャンドル', 'インテリア', daisoGreen),
            productItem('メイクブラシセット', '美容', '#9C27B0'),
            productItem('ワイヤーラック', '収納', daisoBlue),
            productItem('シリコンスプーン', 'キッチン', daisoPink),
            productItem('付箋メモ 3種', '文具', daisoOrange),
          ],
        }),
      ],
    }),
    // Store finder
    frame('StoreFinder', {
      autoLayout: horizontal({ padX: 60, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#FFF0F3')],
      cornerRadius: 12,
      children: [
        frame('StoreInfo', { autoLayout: vertical({ spacing: 6 }), children: [
          text('お近くのDAISOを探す', { fontSize: 18, fontWeight: 700, color: dark }),
          text('全国3,800店舗以上', { fontSize: 14, fontWeight: 400, color: gray }),
        ]}),
        frame('FindBtn', {
          autoLayout: horizontal({ padX: 24, padY: 10 }),
          fills: [solid(daisoPink)],
          cornerRadius: 9999,
          children: [text('店舗検索', { fontSize: 14, fontWeight: 600, color: white })],
        }),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 6, padX: 60, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#333333')],
      children: [
        text('株式会社大創産業', { fontSize: 12, fontWeight: 400, color: '#999999' }),
        text('© DAISO Industries Co., Ltd.', { fontSize: 11, fontWeight: 400, color: '#777777' }),
      ],
    }),
  ],
});
