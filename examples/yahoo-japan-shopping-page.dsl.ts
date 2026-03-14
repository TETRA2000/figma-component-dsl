import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: shopping.yahoo.co.jp — Yahoo! Japan portal shopping, purple/red branding
// Features stressed: gradient headers, dense product tiles, CJK, text decoration, per-corner radii

const yPurple = '#7B0099';
const yRed = '#FF0033';
const white = '#ffffff';
const dark = '#1a1a1a';
const gray = '#666666';
const lightBg = '#f0f0f0';
const paypayBlue = '#FF0033';

function dealCard(title: string, originalPrice: string, salePrice: string, discount: string) {
  return frame(`Deal:${title}`, {
    autoLayout: vertical({ spacing: 6 }),
    size: { x: 260, y: undefined },
    fills: [solid(white)],
    cornerRadii: { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 },
    strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    clipContent: true,
    children: [
      rectangle('DealImg', { size: { x: 260, y: 200 }, fills: [solid('#e8e8e8')] }),
      frame('DealInfo', {
        autoLayout: vertical({ spacing: 4, padX: 12, padY: 10 }),
        layoutSizingHorizontal: 'FILL' as const,
        children: [
          text(title, { fontSize: 13, fontWeight: 400, color: dark }),
          text(originalPrice, { fontSize: 12, fontWeight: 400, color: gray, textDecoration: 'STRIKETHROUGH' }),
          frame('SaleRow', {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              text(salePrice, { fontSize: 18, fontWeight: 700, color: yRed }),
              frame('DiscountBadge', {
                autoLayout: horizontal({ padX: 6, padY: 2 }),
                fills: [solid(yRed)],
                cornerRadius: 3,
                children: [text(discount, { fontSize: 11, fontWeight: 700, color: white })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function navTab(label: string, active: boolean) {
  return frame(`Tab:${label}`, {
    autoLayout: horizontal({ padX: 16, padY: 10 }),
    fills: active ? [solid(white)] : [],
    cornerRadii: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 },
    strokes: active ? [{ color: { r: 0.48, g: 0, b: 0.6, a: 1 }, weight: 2, align: 'INSIDE' as const }] : [],
    children: [text(label, { fontSize: 13, fontWeight: active ? 600 : 400, color: active ? yPurple : dark })],
  });
}

export default frame('YahooJapanShopping', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(lightBg)],
  children: [
    // Top bar
    frame('TopBar', {
      autoLayout: horizontal({ padX: 40, padY: 8, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [gradient([{ hex: '#7B0099', position: 0 }, { hex: '#4A0066', position: 1 }])],
      children: [
        text('Yahoo!ショッピング', { fontSize: 20, fontWeight: 700, color: white }),
        frame('SearchContainer', {
          autoLayout: horizontal({ padX: 12, padY: 8, counterAlign: 'CENTER' }),
          size: { x: 480, y: undefined },
          fills: [solid(white)],
          cornerRadius: 4,
          children: [text('キーワードで検索', { fontSize: 13, fontWeight: 400, color: gray })],
        }),
        frame('UserLinks', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            text('カート', { fontSize: 12, fontWeight: 400, color: white }),
            text('注文履歴', { fontSize: 12, fontWeight: 400, color: white }),
          ],
        }),
      ],
    }),
    // Navigation tabs
    frame('NavTabs', {
      autoLayout: horizontal({ spacing: 2, padX: 40, padY: 0 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#e0d0e8')],
      children: [
        navTab('おすすめ', true),
        navTab('ランキング', false),
        navTab('クーポン', false),
        navTab('タイムセール', false),
        navTab('PayPayモール', false),
      ],
    }),
    // PayPay banner
    frame('PayPayBanner', {
      autoLayout: horizontal({ padX: 60, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      children: [
        frame('PayPayInfo', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('PayPayポイント 最大+5%', { fontSize: 22, fontWeight: 700, color: yRed }),
            text('日曜日はさらにお得！毎週日曜日はポイント増量', { fontSize: 14, fontWeight: 400, color: gray }),
          ],
        }),
        frame('PayPayLogo', {
          autoLayout: horizontal({ padX: 20, padY: 10 }),
          fills: [solid(paypayBlue)],
          cornerRadius: 8,
          children: [text('PayPay', { fontSize: 18, fontWeight: 700, color: white })],
        }),
      ],
    }),
    // Deals section
    frame('DealsSection', {
      autoLayout: vertical({ spacing: 20, padX: 40, padY: 24 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        text('本日のお買い得', { fontSize: 20, fontWeight: 700, color: dark, textDecoration: 'UNDERLINE' }),
        frame('DealsGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            dealCard('ソニー WH-1000XM5 ワイヤレスヘッドホン', '¥44,000', '¥33,800', '-23%'),
            dealCard('ダイソン V15 コードレス掃除機', '¥99,800', '¥74,800', '-25%'),
            dealCard('任天堂 Switch 有機ELモデル', '¥37,980', '¥34,800', '-8%'),
            dealCard('アイリスオーヤマ 炊飯器 5.5合', '¥12,800', '¥8,980', '-30%'),
            dealCard('パナソニック ドライヤー ナノケア', '¥29,800', '¥22,800', '-23%'),
          ],
        }),
      ],
    }),
    // Category section
    frame('CategorySection', {
      autoLayout: vertical({ spacing: 16, padX: 40, padY: 24 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      cornerRadius: 12,
      children: [
        text('カテゴリから探す', { fontSize: 18, fontWeight: 600, color: dark }),
        frame('CategoryGrid', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            ...[
              { label: 'ファッション', color: '#E91E63' },
              { label: '食品・飲料', color: '#4CAF50' },
              { label: '家電・PC', color: '#2196F3' },
              { label: 'コスメ', color: '#FF9800' },
              { label: 'スポーツ', color: '#9C27B0' },
              { label: 'インテリア', color: '#607D8B' },
            ].map(c => frame(`Cat:${c.label}`, {
              autoLayout: vertical({ spacing: 8, padX: 0, padY: 0, counterAlign: 'CENTER' }),
              size: { x: 120, y: undefined },
              children: [
                ellipse('CatIcon', { size: { x: 60, y: 60 }, fills: [solid(c.color, 0.15)] }),
                text(c.label, { fontSize: 12, fontWeight: 500, color: dark }),
              ],
            })),
          ],
        }),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: horizontal({ padX: 40, padY: 20, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#333333')],
      children: [
        text('Yahoo! JAPAN', { fontSize: 14, fontWeight: 600, color: '#cccccc' }),
        text('© Yahoo Japan Corporation', { fontSize: 11, fontWeight: 400, color: '#999999' }),
      ],
    }),
  ],
});
