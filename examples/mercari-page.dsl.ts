import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: mercari.com — Flea market app, red branding, card-based listings
// Features stressed: cornerRadius 9999 (pill), opacity fills, FILL sizing, CJK, multi-stroke

const mercariRed = '#FF0211';
const white = '#ffffff';
const dark = '#222222';
const gray = '#888888';
const lightBg = '#f7f7f7';
const blue = '#4285F4';

function listingCard(title: string, price: string, status?: string) {
  return frame(`Listing:${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 200, y: undefined },
    fills: [solid(white)],
    cornerRadius: 8,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    clipContent: true,
    children: [
      frame('ImgContainer', {
        size: { x: 200, y: 200 },
        fills: [solid('#eeeeee')],
        children: [
          ...(status ? [frame('StatusBadge', {
            autoLayout: horizontal({ padX: 8, padY: 4 }),
            fills: [solid(status === 'SOLD' ? '#333333' : mercariRed, 0.85)],
            cornerRadius: 4,
            children: [text(status === 'SOLD' ? 'SOLD' : '値下げ', { fontSize: 10, fontWeight: 700, color: white })],
          })] : []),
        ],
      }),
      frame('ListingInfo', {
        autoLayout: vertical({ spacing: 4, padX: 10, padY: 10 }),
        layoutSizingHorizontal: 'FILL' as const,
        children: [
          text(title, { fontSize: 13, fontWeight: 400, color: dark }),
          text('¥' + price, { fontSize: 15, fontWeight: 700, color: dark }),
        ],
      }),
    ],
  });
}

function filterPill(label: string, active: boolean) {
  return frame(`Filter:${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 6 }),
    fills: active ? [solid(mercariRed)] : [solid(white)],
    cornerRadius: 9999,
    strokes: active ? [] : [{ color: { r: 0.8, g: 0.8, b: 0.8, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [text(label, { fontSize: 12, fontWeight: 500, color: active ? white : dark })],
  });
}

export default frame('MercariPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      strokes: [
        { color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const },
      ],
      children: [
        text('メルカリ', { fontSize: 24, fontWeight: 700, color: mercariRed }),
        frame('SearchBar', {
          autoLayout: horizontal({ padX: 16, padY: 10, counterAlign: 'CENTER' }),
          size: { x: 500, y: undefined },
          fills: [solid(lightBg)],
          cornerRadius: 8,
          children: [text('なにをお探しですか？', { fontSize: 14, fontWeight: 400, color: gray })],
        }),
        frame('HeaderActions', {
          autoLayout: horizontal({ spacing: 20 }),
          children: [
            text('通知', { fontSize: 13, fontWeight: 500, color: dark }),
            text('やることリスト', { fontSize: 13, fontWeight: 500, color: dark }),
            frame('SellButton', {
              autoLayout: horizontal({ padX: 20, padY: 8 }),
              fills: [solid(mercariRed)],
              cornerRadius: 9999,
              children: [text('出品', { fontSize: 14, fontWeight: 700, color: white })],
            }),
          ],
        }),
      ],
    }),
    // Categories
    frame('CategoryBar', {
      autoLayout: horizontal({ spacing: 24, padX: 40, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        ...[
          'おすすめ', 'マイリスト', 'レディース', 'メンズ', 'ベビー・キッズ',
          'インテリア', 'コスメ', '家電・スマホ', 'スポーツ',
        ].map(c => text(c, { fontSize: 13, fontWeight: 500, color: c === 'おすすめ' ? mercariRed : gray })),
      ],
    }),
    // Filters
    frame('FilterBar', {
      autoLayout: horizontal({ spacing: 8, padX: 40, padY: 12 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(lightBg)],
      children: [
        filterPill('すべて', true),
        filterPill('新品未使用', false),
        filterPill('送料込み', false),
        filterPill('値下げ中', false),
        filterPill('即購入OK', false),
      ],
    }),
    // Listings grid
    frame('ListingsSection', {
      autoLayout: vertical({ spacing: 20, padX: 40, padY: 24 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        text('新着のおすすめ商品', { fontSize: 18, fontWeight: 700, color: dark }),
        frame('ListingsRow1', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            listingCard('iPhone 15 Pro Max 256GB', '89,000'),
            listingCard('ナイキ エアフォース1 27cm', '8,500', '値下げ'),
            listingCard('無印良品 シェルフ 3段', '4,200'),
            listingCard('ユニクロ カシミヤセーター M', '2,800', 'SOLD'),
            listingCard('ダイソン ドライヤー 中古', '15,000'),
            listingCard('ポケモンカード SR', '12,000'),
          ],
        }),
        frame('ListingsRow2', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            listingCard('GU ワイドパンツ レディース', '1,200'),
            listingCard('iPad Air 第5世代', '52,000'),
            listingCard('ル・クルーゼ ココット', '6,800', 'SOLD'),
            listingCard('アディダス スタンスミス', '4,500'),
            listingCard('Switch ゲームソフト5本セット', '9,800'),
            listingCard('無印良品 アロマディフューザー', '2,400'),
          ],
        }),
      ],
    }),
    // Mercari Shops banner
    frame('ShopsBanner', {
      autoLayout: horizontal({ padX: 40, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [gradient([{ hex: '#FF0211', position: 0 }, { hex: '#FF6B6B', position: 1 }])],
      children: [
        frame('ShopsInfo', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('メルカリShops', { fontSize: 20, fontWeight: 700, color: white }),
            text('ショップの商品も安心して購入できます', { fontSize: 14, fontWeight: 400, color: white }),
          ],
        }),
        frame('ShopsCTA', {
          autoLayout: horizontal({ padX: 24, padY: 10 }),
          fills: [solid(white)],
          cornerRadius: 9999,
          children: [text('ショップを見る', { fontSize: 14, fontWeight: 600, color: mercariRed })],
        }),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 8, padX: 40, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#f0f0f0')],
      children: [
        text('株式会社メルカリ', { fontSize: 12, fontWeight: 400, color: gray }),
        text('© Mercari, Inc.', { fontSize: 11, fontWeight: 400, color: gray }),
      ],
    }),
  ],
});
