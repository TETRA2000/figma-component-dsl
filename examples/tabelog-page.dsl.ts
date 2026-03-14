import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: tabelog.com — Restaurant review site, orange branding, rating-focused
// Features stressed: stroke alignment INSIDE, text decoration UNDERLINE, CJK, nested layout, SPACE_BETWEEN

const orange = '#F58220';
const darkOrange = '#CC6600';
const white = '#ffffff';
const dark = '#333333';
const gray = '#666666';
const lightGray = '#f5f5f2';
const star = '#FFB400';

function ratingBadge(score: string) {
  const num = parseFloat(score);
  const bg = num >= 3.5 ? '#C43302' : num >= 3.0 ? orange : '#999999';
  return frame('Rating', {
    autoLayout: horizontal({ padX: 10, padY: 6 }),
    fills: [solid(bg)],
    cornerRadius: 4,
    children: [text(score, { fontSize: 16, fontWeight: 700, color: white })],
  });
}

function restaurantCard(
  name: string, area: string, cuisine: string,
  rating: string, reviews: string, priceRange: string, description: string
) {
  return frame(`Restaurant:${name}`, {
    autoLayout: horizontal({ spacing: 16, padX: 16, padY: 16 }),
    layoutSizingHorizontal: 'FILL' as const,
    fills: [solid(white)],
    cornerRadius: 8,
    strokes: [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('RestImg', { size: { x: 160, y: 120 }, fills: [solid('#e0e0e0')], cornerRadius: 6 }),
      frame('RestInfo', {
        autoLayout: vertical({ spacing: 6 }),
        layoutSizingHorizontal: 'FILL' as const,
        children: [
          frame('NameRow', {
            autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
            children: [
              text(name, { fontSize: 16, fontWeight: 600, color: dark }),
              ratingBadge(rating),
            ],
          }),
          frame('MetaRow', {
            autoLayout: horizontal({ spacing: 8 }),
            children: [
              text(area, { fontSize: 12, fontWeight: 400, color: gray }),
              text('/', { fontSize: 12, fontWeight: 400, color: gray }),
              text(cuisine, { fontSize: 12, fontWeight: 400, color: gray }),
              text(`(${reviews}件)`, { fontSize: 12, fontWeight: 400, color: gray }),
            ],
          }),
          text(description, { fontSize: 13, fontWeight: 400, color: dark, lineHeight: { value: 20, unit: 'PIXELS' as const } }),
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
            children: [
              text('予算:', { fontSize: 12, fontWeight: 400, color: gray }),
              text(priceRange, { fontSize: 13, fontWeight: 600, color: darkOrange }),
            ],
          }),
        ],
      }),
    ],
  });
}

export default frame('TabelogPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(lightGray)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('Logo', {
          autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
          children: [
            text('食べログ', { fontSize: 22, fontWeight: 700, color: orange }),
            text('Tabelog', { fontSize: 11, fontWeight: 400, color: gray }),
          ],
        }),
        frame('SearchRow', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            frame('AreaInput', {
              autoLayout: horizontal({ padX: 12, padY: 8 }),
              size: { x: 200, y: undefined },
              fills: [solid(lightGray)],
              cornerRadius: 4,
              strokes: [{ color: { r: 0.8, g: 0.8, b: 0.8, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [text('東京都', { fontSize: 13, fontWeight: 400, color: dark })],
            }),
            frame('KeywordInput', {
              autoLayout: horizontal({ padX: 12, padY: 8 }),
              size: { x: 280, y: undefined },
              fills: [solid(lightGray)],
              cornerRadius: 4,
              strokes: [{ color: { r: 0.8, g: 0.8, b: 0.8, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [text('料理・店名で探す', { fontSize: 13, fontWeight: 400, color: gray })],
            }),
            frame('SearchBtn', {
              autoLayout: horizontal({ padX: 20, padY: 8 }),
              fills: [solid(orange)],
              cornerRadius: 4,
              children: [text('検索', { fontSize: 14, fontWeight: 600, color: white })],
            }),
          ],
        }),
        frame('UserMenu', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            text('ログイン', { fontSize: 13, fontWeight: 400, color: dark }),
            text('会員登録', { fontSize: 13, fontWeight: 500, color: orange }),
          ],
        }),
      ],
    }),
    // Breadcrumb
    frame('Breadcrumb', {
      autoLayout: horizontal({ spacing: 8, padX: 40, padY: 10 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        text('東京都', { fontSize: 12, fontWeight: 400, color: orange, textDecoration: 'UNDERLINE' }),
        text('>', { fontSize: 12, fontWeight: 400, color: gray }),
        text('渋谷区', { fontSize: 12, fontWeight: 400, color: orange, textDecoration: 'UNDERLINE' }),
        text('>', { fontSize: 12, fontWeight: 400, color: gray }),
        text('和食', { fontSize: 12, fontWeight: 400, color: dark }),
      ],
    }),
    // Search results header
    frame('ResultsHeader', {
      autoLayout: horizontal({ padX: 40, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      cornerRadius: 8,
      children: [
        text('渋谷 × 和食 の検索結果 (248件)', { fontSize: 16, fontWeight: 600, color: dark }),
        frame('SortOptions', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            text('ランキング順', { fontSize: 13, fontWeight: 600, color: orange }),
            text('評価順', { fontSize: 13, fontWeight: 400, color: gray }),
            text('口コミ数順', { fontSize: 13, fontWeight: 400, color: gray }),
          ],
        }),
      ],
    }),
    // Restaurant listings
    frame('Listings', {
      autoLayout: vertical({ spacing: 12, padX: 40, padY: 16 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        restaurantCard('鮨 さいとう', '渋谷', '寿司', '4.32', '512', '¥20,000〜¥29,999',
          '厳選された旬の素材を使った極上の江戸前寿司。完全予約制。'),
        restaurantCard('天ぷら みかわ 是山居', '渋谷', '天ぷら', '3.98', '287', '¥10,000〜¥14,999',
          '季節の食材を一つひとつ丁寧に揚げる名店。カウンター席のみ。'),
        restaurantCard('蕎麦 おざわ', '渋谷', 'そば', '3.72', '156', '¥1,000〜¥1,999',
          '石臼挽き十割蕎麦。毎朝打ちたての蕎麦を提供。'),
        restaurantCard('居酒屋 つぼ八 渋谷店', '渋谷', '居酒屋', '3.15', '89', '¥3,000〜¥3,999',
          '昔ながらの居酒屋。新鮮な刺身と焼き鳥が自慢。'),
        restaurantCard('うなぎ 宮川本廛', '渋谷', 'うなぎ', '3.85', '203', '¥4,000〜¥4,999',
          '創業明治26年。備長炭で焼き上げる関東風うなぎ。'),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 8, padX: 40, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#333333')],
      children: [
        text('株式会社カカクコム', { fontSize: 12, fontWeight: 400, color: '#999999' }),
        text('© Kakaku.com, Inc. All Rights Reserved.', { fontSize: 11, fontWeight: 400, color: '#777777' }),
      ],
    }),
  ],
});
