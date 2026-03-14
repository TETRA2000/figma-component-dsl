import { frame, text, rectangle, ellipse, solid, gradient, radialGradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: rakuten.co.jp — Dense e-commerce marketplace, red branding, category grid
// Features stressed: multi-stroke, SPACE_BETWEEN, CJK text, badge patterns, dense grids

const crimson = '#BF0000';
const white = '#ffffff';
const dark = '#333333';
const lightGray = '#f5f5f5';
const midGray = '#999999';
const gold = '#FFD700';

function categoryChip(label: string, bgColor: string) {
  return frame(`Cat:${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 6 }),
    fills: [solid(bgColor)],
    cornerRadius: 4,
    children: [text(label, { fontSize: 12, fontWeight: 500, color: white })],
  });
}

function productCard(name: string, price: string, rating: string, seller: string) {
  return frame(`Product:${name}`, {
    autoLayout: vertical({ spacing: 8 }),
    size: { x: 220, y: undefined },
    children: [
      rectangle('ProductImg', { size: { x: 220, y: 220 }, fills: [solid('#eeeeee')], cornerRadius: 4 }),
      text(name, { fontSize: 13, fontWeight: 400, color: dark }),
      frame('PriceRow', {
        autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
        children: [
          text('¥' + price, { fontSize: 16, fontWeight: 700, color: crimson }),
          text('送料無料', { fontSize: 10, fontWeight: 400, color: '#009900' }),
        ],
      }),
      frame('RatingRow', {
        autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
        children: [
          text('★' + rating, { fontSize: 11, fontWeight: 500, color: gold }),
          text(`(${seller})`, { fontSize: 10, fontWeight: 400, color: midGray }),
        ],
      }),
    ],
  });
}

function rankingItem(rank: number, name: string, price: string) {
  return frame(`Rank${rank}`, {
    autoLayout: horizontal({ spacing: 12, padX: 12, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL' as const,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('RankBadge', {
        autoLayout: horizontal({ padX: 8, padY: 4 }),
        fills: [solid(rank <= 3 ? crimson : midGray)],
        cornerRadius: 4,
        children: [text(String(rank), { fontSize: 14, fontWeight: 700, color: white })],
      }),
      frame('RankInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL' as const,
        children: [
          text(name, { fontSize: 13, fontWeight: 400, color: dark }),
          text('¥' + price, { fontSize: 14, fontWeight: 700, color: crimson }),
        ],
      }),
    ],
  });
}

export default frame('RakutenIchibaPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    // Header with multi-stroke
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(crimson)],
      strokes: [
        { color: { r: 0.6, g: 0, b: 0, a: 1 }, weight: 2, align: 'OUTSIDE' as const },
        { color: { r: 1, g: 1, b: 1, a: 0.2 }, weight: 1, align: 'INSIDE' as const },
      ],
      children: [
        text('楽天市場', { fontSize: 22, fontWeight: 700, color: white }),
        frame('SearchBar', {
          autoLayout: horizontal({ padX: 16, padY: 8, counterAlign: 'CENTER' }),
          size: { x: 500, y: undefined },
          fills: [solid(white)],
          cornerRadius: 20,
          children: [text('商品を検索', { fontSize: 13, fontWeight: 400, color: midGray })],
        }),
        frame('HeaderLinks', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            text('買い物かご', { fontSize: 12, fontWeight: 400, color: white }),
            text('購入履歴', { fontSize: 12, fontWeight: 400, color: white }),
            text('ログイン', { fontSize: 12, fontWeight: 400, color: white }),
          ],
        }),
      ],
    }),
    // Category bar
    frame('CategoryBar', {
      autoLayout: horizontal({ spacing: 8, padX: 40, padY: 10 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(lightGray)],
      children: [
        categoryChip('ファッション', '#E91E63'),
        categoryChip('食品', '#4CAF50'),
        categoryChip('家電', '#2196F3'),
        categoryChip('本・CD', '#FF9800'),
        categoryChip('スポーツ', '#9C27B0'),
        categoryChip('日用品', '#795548'),
      ],
    }),
    // Banner with radial gradient
    frame('PromoBanner', {
      autoLayout: vertical({ spacing: 8, padX: 60, padY: 40, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [radialGradient([
        { hex: '#FF1744', position: 0 },
        { hex: '#BF0000', position: 0.7 },
        { hex: '#800000', position: 1 },
      ])],
      children: [
        text('楽天スーパーSALE', { fontSize: 36, fontWeight: 900, color: gold }),
        text('最大50%OFF + ポイント最大44倍', { fontSize: 18, fontWeight: 600, color: white }),
        frame('CTA', {
          autoLayout: horizontal({ padX: 32, padY: 12 }),
          fills: [solid(gold)],
          cornerRadius: 24,
          children: [text('セール会場へ', { fontSize: 16, fontWeight: 700, color: crimson })],
        }),
      ],
    }),
    // Product grid
    frame('ProductSection', {
      autoLayout: vertical({ spacing: 24, padX: 40, padY: 32 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        text('あなたにおすすめ', { fontSize: 20, fontWeight: 700, color: dark }),
        frame('ProductGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            productCard('有機抹茶パウダー 100g', '2,480', '4.7', '宇治園'),
            productCard('今治タオルセット 5枚', '3,980', '4.5', 'タオル専門店'),
            productCard('国産牛 すき焼き用 500g', '4,980', '4.8', '肉のハナマサ'),
            productCard('ワイヤレスイヤホン Pro', '6,980', '4.3', 'テック工房'),
            productCard('北海道産 いくら 200g', '5,480', '4.9', '海鮮市場'),
          ],
        }),
      ],
    }),
    // Ranking section
    frame('RankingSection', {
      autoLayout: horizontal({ spacing: 32, padX: 40, padY: 32 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(lightGray)],
      children: [
        frame('DailyRanking', {
          autoLayout: vertical({ spacing: 0 }),
          size: { x: 400, y: undefined },
          fills: [solid(white)],
          cornerRadius: 8,
          clipContent: true,
          children: [
            frame('RankHeader', {
              autoLayout: horizontal({ padX: 16, padY: 12 }),
              layoutSizingHorizontal: 'FILL' as const,
              fills: [solid(crimson)],
              children: [text('デイリーランキング', { fontSize: 16, fontWeight: 700, color: white })],
            }),
            rankingItem(1, '有機抹茶パウダー 100g', '2,480'),
            rankingItem(2, '今治タオルセット', '3,980'),
            rankingItem(3, '国産牛 すき焼き用', '4,980'),
            rankingItem(4, 'ワイヤレスイヤホン', '6,980'),
            rankingItem(5, '北海道産いくら', '5,480'),
          ],
        }),
        frame('WeeklyRanking', {
          autoLayout: vertical({ spacing: 0 }),
          size: { x: 400, y: undefined },
          fills: [solid(white)],
          cornerRadius: 8,
          clipContent: true,
          children: [
            frame('RankHeader', {
              autoLayout: horizontal({ padX: 16, padY: 12 }),
              layoutSizingHorizontal: 'FILL' as const,
              fills: [solid('#FF6600')],
              children: [text('週間ランキング', { fontSize: 16, fontWeight: 700, color: white })],
            }),
            rankingItem(1, 'Switch ゲームソフト', '5,980'),
            rankingItem(2, 'お歳暮ギフトセット', '3,240'),
            rankingItem(3, 'ふるさと納税 米20kg', '10,000'),
          ],
        }),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 8, padX: 40, padY: 24, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(dark)],
      children: [
        text('楽天グループ株式会社', { fontSize: 12, fontWeight: 400, color: midGray }),
        text('© Rakuten Group, Inc.', { fontSize: 11, fontWeight: 400, color: midGray }),
      ],
    }),
  ],
});
