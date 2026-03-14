import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: lawson.co.jp — Lawson convenience store, blue branding, konbini digital
// Features stressed: dense product grid, CJK, badges, SPACE_BETWEEN, multi-stop gradient

const lawsonBlue = '#0068B7';
const white = '#ffffff';
const dark = '#222222';
const gray = '#888888';
const lightBg = '#F0F4FF';
const red = '#E53935';
const green = '#2E7D32';

function konbiniProduct(name: string, price: string, tag?: string, tagColor?: string) {
  return frame(`Product:${name}`, {
    autoLayout: vertical({ spacing: 6, counterAlign: 'CENTER' }),
    size: { x: 150, y: undefined },
    children: [
      frame('ImgContainer', {
        size: { x: 130, y: 130 },
        fills: [solid('#f0f0f0')],
        cornerRadius: 8,
        children: [
          ...(tag ? [frame('Tag', {
            autoLayout: horizontal({ padX: 6, padY: 2 }),
            fills: [solid(tagColor || red)],
            cornerRadius: 3,
            children: [text(tag, { fontSize: 9, fontWeight: 700, color: white })],
          })] : []),
        ],
      }),
      text(name, { fontSize: 11, fontWeight: 500, color: dark }),
      text('¥' + price, { fontSize: 13, fontWeight: 700, color: dark }),
    ],
  });
}

function serviceItem(name: string, desc: string, color: string) {
  return frame(`Service:${name}`, {
    autoLayout: horizontal({ spacing: 12, padX: 14, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL' as const,
    fills: [solid(white)],
    cornerRadius: 8,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse('ServiceIcon', { size: { x: 40, y: 40 }, fills: [solid(color, 0.15)] }),
      frame('ServiceInfo', { autoLayout: vertical({ spacing: 2 }), children: [
        text(name, { fontSize: 14, fontWeight: 600, color: dark }),
        text(desc, { fontSize: 12, fontWeight: 400, color: gray }),
      ]}),
    ],
  });
}

export default frame('LawsonPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(lawsonBlue)],
      children: [
        text('LAWSON', { fontSize: 24, fontWeight: 900, color: white, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('商品・おトク', { fontSize: 13, fontWeight: 500, color: white }),
          text('サービス', { fontSize: 13, fontWeight: 500, color: white }),
          text('店舗検索', { fontSize: 13, fontWeight: 500, color: white }),
          text('Pontaポイント', { fontSize: 13, fontWeight: 500, color: white }),
        ]}),
        frame('PontaCard', {
          autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
          children: [
            text('Ponta:', { fontSize: 12, fontWeight: 400, color: white, opacity: 0.8 }),
            text('1,234pt', { fontSize: 14, fontWeight: 700, color: '#FFD600' }),
          ],
        }),
      ],
    }),
    // Hero banner
    frame('Hero', {
      autoLayout: vertical({ spacing: 12, padX: 120, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [gradient([{ hex: '#0068B7', position: 0 }, { hex: '#004C8C', position: 0.5 }, { hex: '#003366', position: 1 }])],
      children: [
        text('LAWSON', { fontSize: 48, fontWeight: 900, color: white }),
        text('マチのほっとステーション', { fontSize: 18, fontWeight: 400, color: white, opacity: 0.8 }),
      ],
    }),
    // New products
    frame('NewProducts', {
      autoLayout: vertical({ spacing: 16, padX: 40, padY: 24 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(lightBg)],
      children: [
        frame('SectionHeader', {
          autoLayout: horizontal({ align: 'SPACE_BETWEEN' }),
          layoutSizingHorizontal: 'FILL' as const,
          children: [
            text('新商品', { fontSize: 20, fontWeight: 700, color: dark }),
            text('すべて見る →', { fontSize: 14, fontWeight: 500, color: lawsonBlue }),
          ],
        }),
        frame('ProductGrid', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            konbiniProduct('からあげクン レッド', '238', 'NEW', red),
            konbiniProduct('プレミアムロールケーキ', '180', 'おすすめ', lawsonBlue),
            konbiniProduct('もち麦おにぎり 鮭', '158', undefined),
            konbiniProduct('バスチー', '225', 'NEW', red),
            konbiniProduct('悪魔のおにぎり', '168', '人気', green),
            konbiniProduct('ウチカフェ ラテ M', '200', undefined),
            konbiniProduct('Lチキ', '198', '定番', '#FF9800'),
            konbiniProduct('玉子サンド', '298', undefined),
          ],
        }),
      ],
    }),
    // Services
    frame('ServicesSection', {
      autoLayout: horizontal({ spacing: 32, padX: 40, padY: 32 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        frame('ServicesList', {
          autoLayout: vertical({ spacing: 8 }),
          size: { x: 450, y: undefined },
          children: [
            text('便利なサービス', { fontSize: 18, fontWeight: 700, color: dark }),
            serviceItem('ローソン銀行ATM', '24時間利用可能なATM', lawsonBlue),
            serviceItem('Loppi', 'チケット・各種支払い端末', '#E91E63'),
            serviceItem('マルチコピー機', '印刷・スキャン・FAX', '#4CAF50'),
            serviceItem('宅配便受付', 'ヤマト運輸・佐川急便', '#FF9800'),
          ],
        }),
        // Campaign
        frame('Campaign', {
          autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
          size: { x: 400, y: undefined },
          fills: [gradient([{ hex: '#0068B7', position: 0 }, { hex: '#00A0E9', position: 1 }])],
          cornerRadius: 16,
          children: [
            text('Pontaポイント 2倍！', { fontSize: 22, fontWeight: 700, color: white }),
            text('3月14日〜3月20日まで\n対象商品購入でポイント2倍', {
              fontSize: 14, fontWeight: 400, color: white,
              lineHeight: { value: 22, unit: 'PIXELS' as const },
            }),
            frame('CampaignCTA', {
              autoLayout: horizontal({ padX: 24, padY: 10 }),
              fills: [solid('#FFD600')],
              cornerRadius: 9999,
              children: [text('詳しく見る', { fontSize: 14, fontWeight: 600, color: dark })],
            }),
          ],
        }),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 6, padX: 40, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#1a2a3a')],
      children: [
        text('株式会社ローソン', { fontSize: 12, fontWeight: 400, color: '#8899aa' }),
        text('© Lawson, Inc.', { fontSize: 11, fontWeight: 400, color: '#667788' }),
      ],
    }),
  ],
});
