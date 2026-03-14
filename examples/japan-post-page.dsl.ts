import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: post.japanpost.jp — Japan Post Office, red/white, postal services
// Features stressed: form layout, data tables, CJK, SPACE_BETWEEN, multi-stroke, service grid

const postRed = '#CC0000';
const dark = '#222222';
const white = '#ffffff';
const gray = '#777777';
const lightBg = '#f5f5f5';
const green = '#2E7D32';

function serviceCard(name: string, desc: string, iconColor: string) {
  return frame(`Service:${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 20, padY: 20, counterAlign: 'CENTER' }),
    size: { x: 200, y: undefined },
    fills: [solid(white)],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse('ServiceIcon', { size: { x: 48, y: 48 }, fills: [solid(iconColor, 0.15)] }),
      text(name, { fontSize: 15, fontWeight: 600, color: dark }),
      text(desc, { fontSize: 12, fontWeight: 400, color: gray }),
    ],
  });
}

function trackingRow(num: string, status: string, date: string, location: string) {
  return frame(`Track:${num}`, {
    autoLayout: horizontal({ padX: 16, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL' as const,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(num, { fontSize: 13, fontWeight: 500, color: dark }),
      frame('StatusBadge', {
        autoLayout: horizontal({ padX: 8, padY: 3 }),
        fills: [solid(status === '配達完了' ? green : status === '輸送中' ? '#FF9800' : postRed, 0.1)],
        cornerRadius: 4,
        children: [text(status, { fontSize: 11, fontWeight: 600, color: status === '配達完了' ? green : status === '輸送中' ? '#FF9800' : postRed })],
      }),
      text(date, { fontSize: 12, fontWeight: 400, color: gray }),
      text(location, { fontSize: 12, fontWeight: 400, color: gray }),
    ],
  });
}

function rateRow(type: string, weight: string, price: string) {
  return frame(`Rate:${type}`, {
    autoLayout: horizontal({ padX: 16, padY: 8, align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL' as const,
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(type, { fontSize: 13, fontWeight: 500, color: dark }),
      text(weight, { fontSize: 13, fontWeight: 400, color: gray }),
      text(price, { fontSize: 14, fontWeight: 700, color: dark }),
    ],
  });
}

export default frame('JapanPostPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(postRed)],
      strokes: [
        { color: { r: 0.6, g: 0, b: 0, a: 1 }, weight: 2, align: 'OUTSIDE' as const },
      ],
      children: [
        frame('Logo', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            text('〒', { fontSize: 24, fontWeight: 700, color: white }),
            text('日本郵便', { fontSize: 20, fontWeight: 700, color: white }),
          ],
        }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('郵便・荷物', { fontSize: 13, fontWeight: 500, color: white }),
          text('切手・はがき', { fontSize: 13, fontWeight: 500, color: white }),
          text('送料計算', { fontSize: 13, fontWeight: 500, color: white }),
          text('郵便局検索', { fontSize: 13, fontWeight: 500, color: white }),
        ]}),
        text('法人のお客さま', { fontSize: 12, fontWeight: 400, color: white, opacity: 0.8 }),
      ],
    }),
    // Tracking search
    frame('TrackingSection', {
      autoLayout: vertical({ spacing: 16, padX: 40, padY: 28 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(lightBg)],
      children: [
        text('郵便追跡サービス', { fontSize: 20, fontWeight: 700, color: dark }),
        frame('TrackingInput', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            frame('Input', {
              autoLayout: horizontal({ padX: 16, padY: 10 }),
              size: { x: 400, y: undefined },
              fills: [solid(white)],
              cornerRadius: 6,
              strokes: [{ color: { r: 0.8, g: 0.8, b: 0.8, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [text('お問い合わせ番号を入力', { fontSize: 14, fontWeight: 400, color: gray })],
            }),
            frame('TrackBtn', {
              autoLayout: horizontal({ padX: 24, padY: 10 }),
              fills: [solid(postRed)],
              cornerRadius: 6,
              children: [text('追跡する', { fontSize: 14, fontWeight: 600, color: white })],
            }),
          ],
        }),
        // Sample tracking results
        frame('TrackingResults', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL' as const,
          fills: [solid(white)],
          cornerRadius: 8,
          clipContent: true,
          children: [
            frame('ResultHeader', {
              autoLayout: horizontal({ padX: 16, padY: 10, align: 'SPACE_BETWEEN' }),
              layoutSizingHorizontal: 'FILL' as const,
              fills: [solid(postRed, 0.05)],
              children: [
                text('お問い合わせ番号', { fontSize: 12, fontWeight: 600, color: dark }),
                text('状態', { fontSize: 12, fontWeight: 600, color: dark }),
                text('日時', { fontSize: 12, fontWeight: 600, color: dark }),
                text('取扱局', { fontSize: 12, fontWeight: 600, color: dark }),
              ],
            }),
            trackingRow('1234-5678-9012-3', '配達完了', '3/14 14:30', '渋谷郵便局'),
            trackingRow('9876-5432-1098-7', '輸送中', '3/14 09:15', '東京中央郵便局'),
            trackingRow('5555-1234-5678-9', '受付', '3/14 08:00', '新宿郵便局'),
          ],
        }),
      ],
    }),
    // Services grid
    frame('ServicesGrid', {
      autoLayout: vertical({ spacing: 20, padX: 40, padY: 32 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        text('主なサービス', { fontSize: 20, fontWeight: 700, color: dark }),
        frame('Grid', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            serviceCard('ゆうパック', '荷物の集荷・配達', postRed),
            serviceCard('レターパック', '速達の封筒サービス', '#2196F3'),
            serviceCard('ゆうメール', '印刷物・CDの配送', green),
            serviceCard('国際郵便', 'EMS・国際小包', '#FF9800'),
            serviceCard('書留', '記録付き郵便', '#9C27B0'),
            serviceCard('年賀状印刷', 'デザイン・印刷サービス', '#E91E63'),
          ],
        }),
      ],
    }),
    // Rate table
    frame('RateSection', {
      autoLayout: vertical({ spacing: 12, padX: 40, padY: 32 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(lightBg)],
      children: [
        text('郵便料金一覧', { fontSize: 18, fontWeight: 700, color: dark }),
        frame('RateTable', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL' as const,
          fills: [solid(white)],
          cornerRadius: 8,
          clipContent: true,
          children: [
            rateRow('はがき', '—', '¥63'),
            rateRow('定形郵便', '25g以内', '¥84'),
            rateRow('定形郵便', '50g以内', '¥94'),
            rateRow('定形外（規格内）', '50g以内', '¥120'),
            rateRow('定形外（規格内）', '100g以内', '¥140'),
            rateRow('レターパックライト', '4kg以内', '¥370'),
            rateRow('レターパックプラス', '4kg以内', '¥520'),
          ],
        }),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 6, padX: 40, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#333333')],
      children: [
        text('日本郵便株式会社', { fontSize: 12, fontWeight: 400, color: '#999999' }),
        text('© Japan Post Co., Ltd.', { fontSize: 11, fontWeight: 400, color: '#777777' }),
      ],
    }),
  ],
});
