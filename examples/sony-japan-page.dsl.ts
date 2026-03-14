import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: sony.co.jp — Sony Japan, dark premium, product-centric
// Features stressed: dark theme, gradient overlays, large hero, spec tables, stroke alignment OUTSIDE

const sonyBlack = '#000000';
const dark = '#1a1a1a';
const white = '#ffffff';
const gray = '#999999';
const accent = '#0070D2';
const lightGray = '#333333';

function specRow(label: string, value: string) {
  return frame(`Spec:${label}`, {
    autoLayout: horizontal({ padX: 16, padY: 10, align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL' as const,
    strokes: [{ color: { r: 0.25, g: 0.25, b: 0.25, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 13, fontWeight: 400, color: gray }),
      text(value, { fontSize: 13, fontWeight: 500, color: white }),
    ],
  });
}

function productCard(name: string, desc: string, price: string) {
  return frame(`Product:${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 320, y: undefined },
    fills: [solid('#111111')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.2, g: 0.2, b: 0.2, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    clipContent: true,
    children: [
      rectangle('ProductImg', {
        size: { x: 320, y: 200 },
        fills: [gradient([{ hex: '#1a1a1a', position: 0 }, { hex: '#333333', position: 1 }])],
      }),
      frame('ProductInfo', {
        autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
        layoutSizingHorizontal: 'FILL' as const,
        children: [
          text(name, { fontSize: 16, fontWeight: 600, color: white }),
          text(desc, { fontSize: 13, fontWeight: 400, color: gray, lineHeight: { value: 20, unit: 'PIXELS' as const } }),
          text(price, { fontSize: 18, fontWeight: 700, color: accent }),
        ],
      }),
    ],
  });
}

export default frame('SonyJapanPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(sonyBlack)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(sonyBlack)],
      strokes: [{ color: { r: 0.15, g: 0.15, b: 0.15, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('SONY', { fontSize: 24, fontWeight: 700, color: white, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        frame('Nav', {
          autoLayout: horizontal({ spacing: 28 }),
          children: [
            text('製品情報', { fontSize: 14, fontWeight: 400, color: white }),
            text('PlayStation', { fontSize: 14, fontWeight: 400, color: white }),
            text('エンタテインメント', { fontSize: 14, fontWeight: 400, color: white }),
            text('企業情報', { fontSize: 14, fontWeight: 400, color: white }),
          ],
        }),
        frame('HeaderRight', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            text('ストア', { fontSize: 13, fontWeight: 400, color: gray }),
            text('サポート', { fontSize: 13, fontWeight: 400, color: gray }),
          ],
        }),
      ],
    }),
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [gradient([
        { hex: '#000000', position: 0 },
        { hex: '#0A1628', position: 0.5 },
        { hex: '#000000', position: 1 },
      ], 135)],
      children: [
        text('PlayStation 5 Pro', { fontSize: 48, fontWeight: 200, color: white, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        text('究極のゲーム体験', { fontSize: 20, fontWeight: 300, color: gray }),
        frame('HeroCTA', {
          autoLayout: horizontal({ padX: 32, padY: 12 }),
          fills: [solid(white)],
          cornerRadius: 4,
          children: [text('詳しく見る', { fontSize: 15, fontWeight: 500, color: sonyBlack })],
        }),
      ],
    }),
    // Featured product section with specs
    frame('FeaturedSection', {
      autoLayout: horizontal({ spacing: 40, padX: 60, padY: 48 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        frame('FeaturedImg', {
          size: { x: 600, y: 400 },
          fills: [gradient([{ hex: '#111111', position: 0 }, { hex: '#222222', position: 1 }])],
          cornerRadius: 12,
          strokes: [{ color: { r: 0.15, g: 0.15, b: 0.15, a: 1 }, weight: 2, align: 'OUTSIDE' as const }],
        }),
        frame('FeaturedInfo', {
          autoLayout: vertical({ spacing: 16 }),
          size: { x: 500, y: undefined },
          children: [
            text('WH-1000XM6', { fontSize: 32, fontWeight: 200, color: white }),
            text('業界最高クラスのノイズキャンセリング', { fontSize: 16, fontWeight: 400, color: gray }),
            text('¥49,500（税込）', { fontSize: 22, fontWeight: 600, color: accent }),
            frame('SpecTable', {
              autoLayout: vertical({ spacing: 0 }),
              layoutSizingHorizontal: 'FILL' as const,
              children: [
                specRow('ドライバー', '30mm 高品質ドライバー'),
                specRow('バッテリー', '最大40時間'),
                specRow('重量', '約250g'),
                specRow('接続', 'Bluetooth 5.3 / LDAC'),
                specRow('ノイズキャンセリング', 'HD NC プロセッサー QN2'),
              ],
            }),
            frame('BuyBtn', {
              autoLayout: horizontal({ padX: 24, padY: 12 }),
              fills: [solid(accent)],
              cornerRadius: 4,
              children: [text('購入する', { fontSize: 15, fontWeight: 600, color: white })],
            }),
          ],
        }),
      ],
    }),
    // Product grid
    frame('ProductGrid', {
      autoLayout: vertical({ spacing: 24, padX: 60, padY: 40 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        text('おすすめ製品', { fontSize: 22, fontWeight: 300, color: white }),
        frame('Grid', {
          autoLayout: horizontal({ spacing: 20 }),
          children: [
            productCard('α7 IV', 'フルサイズミラーレス一眼カメラ', '¥328,900'),
            productCard('Xperia 1 VI', '5G対応スマートフォン', '¥194,700'),
            productCard('WF-1000XM6', '完全ワイヤレスイヤホン', '¥36,300'),
            productCard('BRAVIA XR A95L', '4K有機ELテレビ', '¥385,000'),
          ],
        }),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: horizontal({ padX: 60, padY: 24, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#0a0a0a')],
      strokes: [{ color: { r: 0.15, g: 0.15, b: 0.15, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('ソニーグループ株式会社', { fontSize: 12, fontWeight: 400, color: '#666666' }),
        text('© Sony Group Corporation', { fontSize: 11, fontWeight: 400, color: '#555555' }),
      ],
    }),
  ],
});
