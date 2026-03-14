import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: store-tsutaya.tsite.jp — Tsutaya/T-Site, media/culture store
// Features stressed: text decoration, CJK, card grid, category filters, opacity fills

const tsutayaYellow = '#FFD600';
const dark = '#1a1a1a';
const white = '#ffffff';
const gray = '#777777';
const lightBg = '#f5f5f0';

function mediaCard(title: string, creator: string, category: string, catColor: string, price: string) {
  return frame(`Media:${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 200, y: undefined },
    fills: [solid(white)],
    cornerRadius: 8,
    clipContent: true,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('Cover', { size: { x: 200, y: 260 }, fills: [solid('#e0ddd5')] }),
      frame('MediaInfo', {
        autoLayout: vertical({ spacing: 4, padX: 12, padY: 10 }),
        layoutSizingHorizontal: 'FILL' as const,
        children: [
          frame('CatTag', {
            autoLayout: horizontal({ padX: 6, padY: 2 }),
            fills: [solid(catColor, 0.15)],
            cornerRadius: 3,
            children: [text(category, { fontSize: 10, fontWeight: 500, color: catColor })],
          }),
          text(title, { fontSize: 13, fontWeight: 600, color: dark }),
          text(creator, { fontSize: 11, fontWeight: 400, color: gray }),
          text('¥' + price, { fontSize: 14, fontWeight: 700, color: dark }),
        ],
      }),
    ],
  });
}

function filterTab(label: string, active: boolean) {
  return frame(`Tab:${label}`, {
    autoLayout: horizontal({ padX: 16, padY: 8 }),
    fills: active ? [solid(tsutayaYellow)] : [],
    cornerRadius: 4,
    children: [text(label, { fontSize: 13, fontWeight: active ? 600 : 400, color: active ? dark : gray })],
  });
}

export default frame('TsutayaTSitePage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(lightBg)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(dark)],
      children: [
        text('TSUTAYA', { fontSize: 22, fontWeight: 700, color: tsutayaYellow, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('書籍', { fontSize: 14, fontWeight: 400, color: white }),
          text('音楽', { fontSize: 14, fontWeight: 400, color: white }),
          text('映画', { fontSize: 14, fontWeight: 400, color: white }),
          text('ゲーム', { fontSize: 14, fontWeight: 400, color: white }),
          text('文具', { fontSize: 14, fontWeight: 400, color: white }),
        ]}),
        frame('TPoint', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            text('Tポイント:', { fontSize: 12, fontWeight: 400, color: gray }),
            text('2,450pt', { fontSize: 14, fontWeight: 700, color: tsutayaYellow }),
          ],
        }),
      ],
    }),
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 12, padX: 120, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [gradient([{ hex: '#1a1a1a', position: 0 }, { hex: '#333333', position: 1 }])],
      children: [
        text('T-SITE', { fontSize: 48, fontWeight: 200, color: white, letterSpacing: { value: 8, unit: 'PIXELS' as const } }),
        text('本と暮らしの提案', { fontSize: 16, fontWeight: 300, color: '#aaaaaa' }),
      ],
    }),
    // Filter tabs
    frame('FilterBar', {
      autoLayout: horizontal({ spacing: 8, padX: 60, padY: 12 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      children: [
        filterTab('すべて', true),
        filterTab('書籍', false),
        filterTab('コミック', false),
        filterTab('音楽CD', false),
        filterTab('映画DVD', false),
        filterTab('ゲーム', false),
      ],
    }),
    // New releases
    frame('NewReleases', {
      autoLayout: vertical({ spacing: 20, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        text('新刊・新着', { fontSize: 20, fontWeight: 700, color: dark, textDecoration: 'UNDERLINE' }),
        frame('MediaGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            mediaCard('世界の終わりの天文台', '村上 春樹', '小説', '#2196F3', '1,980'),
            mediaCard('呪術廻戦 28巻', '芥見 下々', 'コミック', '#E91E63', '528'),
            mediaCard('BLUE GIANT 15巻', '石塚 真一', 'コミック', '#FF9800', '693'),
            mediaCard('成瀬は天下を取りにいく', '宮島 未奈', '小説', '#2196F3', '1,760'),
            mediaCard('推しの子 16巻', '赤坂 アカ', 'コミック', '#E91E63', '528'),
            mediaCard('正欲', '朝井 リョウ', '文庫', '#4CAF50', '858'),
          ],
        }),
      ],
    }),
    // Ranking
    frame('RankingSection', {
      autoLayout: vertical({ spacing: 16, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      cornerRadius: 12,
      children: [
        text('週間ランキング', { fontSize: 18, fontWeight: 700, color: dark }),
        ...[
          { rank: 1, title: '世界の終わりの天文台', author: '村上 春樹' },
          { rank: 2, title: '呪術廻戦 28巻', author: '芥見 下々' },
          { rank: 3, title: '成瀬は天下を取りにいく', author: '宮島 未奈' },
          { rank: 4, title: 'BLUE GIANT 15巻', author: '石塚 真一' },
          { rank: 5, title: '正欲', author: '朝井 リョウ' },
        ].map(r => frame(`Rank${r.rank}`, {
          autoLayout: horizontal({ spacing: 12, padX: 12, padY: 10, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL' as const,
          strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text(String(r.rank), { fontSize: 20, fontWeight: 700, color: r.rank <= 3 ? tsutayaYellow : gray }),
            frame('RankInfo', { autoLayout: vertical({ spacing: 2 }), children: [
              text(r.title, { fontSize: 14, fontWeight: 500, color: dark }),
              text(r.author, { fontSize: 12, fontWeight: 400, color: gray }),
            ]}),
          ],
        })),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 6, padX: 60, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(dark)],
      children: [
        text('カルチュア・コンビニエンス・クラブ株式会社', { fontSize: 12, fontWeight: 400, color: '#888888' }),
        text('© Culture Convenience Club Co., Ltd.', { fontSize: 11, fontWeight: 400, color: '#666666' }),
      ],
    }),
  ],
});
