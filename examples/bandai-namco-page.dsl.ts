import { frame, text, rectangle, ellipse, solid, gradient, radialGradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: bandainamcoent.co.jp — Bandai Namco entertainment, vibrant colors, game characters
// Features stressed: radial gradient, multi-stop gradient, text decoration, cornerRadius 9999, CJK

const bnOrange = '#FF6600';
const bnYellow = '#FFCC00';
const dark = '#1a1a1a';
const white = '#ffffff';
const gray = '#888888';

function titleCard(name: string, genre: string, platform: string, releaseDate: string, isHot: boolean) {
  return frame(`Title:${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 300, y: undefined },
    fills: [solid(white)],
    cornerRadius: 12,
    clipContent: true,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('TitleImg', {
        size: { x: 300, y: 180 },
        fills: [gradient([{ hex: '#1a1a2e', position: 0 }, { hex: '#16213e', position: 0.5 }, { hex: '#0f3460', position: 1 }])],
        children: [
          ...(isHot ? [frame('HotBadge', {
            autoLayout: horizontal({ padX: 10, padY: 4 }),
            fills: [solid('#FF0033')],
            cornerRadius: 9999,
            children: [text('🔥 HOT', { fontSize: 11, fontWeight: 700, color: white })],
          })] : []),
        ],
      }),
      frame('TitleInfo', {
        autoLayout: vertical({ spacing: 6, padX: 16, padY: 14 }),
        layoutSizingHorizontal: 'FILL' as const,
        children: [
          text(name, { fontSize: 15, fontWeight: 600, color: dark }),
          frame('Tags', {
            autoLayout: horizontal({ spacing: 6 }),
            children: [
              frame('GenreTag', {
                autoLayout: horizontal({ padX: 8, padY: 3 }),
                fills: [solid(bnOrange, 0.1)],
                cornerRadius: 4,
                children: [text(genre, { fontSize: 10, fontWeight: 500, color: bnOrange })],
              }),
              frame('PlatTag', {
                autoLayout: horizontal({ padX: 8, padY: 3 }),
                fills: [solid('#2196F3', 0.1)],
                cornerRadius: 4,
                children: [text(platform, { fontSize: 10, fontWeight: 500, color: '#2196F3' })],
              }),
            ],
          }),
          text(`発売日: ${releaseDate}`, { fontSize: 12, fontWeight: 400, color: gray }),
        ],
      }),
    ],
  });
}

export default frame('BandaiNamcoPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('BANDAI NAMCO', { fontSize: 20, fontWeight: 700, color: bnOrange }),
        frame('Nav', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('ゲーム', { fontSize: 14, fontWeight: 500, color: dark }),
            text('アニメ', { fontSize: 14, fontWeight: 500, color: dark }),
            text('トイホビー', { fontSize: 14, fontWeight: 500, color: dark }),
            text('アミューズメント', { fontSize: 14, fontWeight: 500, color: dark }),
          ],
        }),
        frame('SearchIcon', {
          autoLayout: horizontal({ padX: 12, padY: 8 }),
          cornerRadius: 4,
          strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [text('検索', { fontSize: 13, fontWeight: 400, color: gray })],
        }),
      ],
    }),
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 20, padX: 120, padY: 72, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [radialGradient([
        { hex: '#FF8800', position: 0 },
        { hex: '#FF6600', position: 0.5 },
        { hex: '#CC4400', position: 1 },
      ])],
      children: [
        text('BANDAI NAMCO Entertainment', { fontSize: 16, fontWeight: 400, color: white, opacity: 0.7, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        text('ゲームの未来を、共に創る。', { fontSize: 40, fontWeight: 900, color: white }),
        text('Fun for All into the Future', { fontSize: 18, fontWeight: 300, color: bnYellow }),
      ],
    }),
    // Featured titles
    frame('FeaturedSection', {
      autoLayout: vertical({ spacing: 24, padX: 60, padY: 40 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        frame('SectionHeader', {
          autoLayout: horizontal({ align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL' as const,
          children: [
            text('注目タイトル', { fontSize: 22, fontWeight: 700, color: dark, textDecoration: 'UNDERLINE' }),
            text('すべて見る →', { fontSize: 14, fontWeight: 500, color: bnOrange }),
          ],
        }),
        frame('TitleGrid', {
          autoLayout: horizontal({ spacing: 20 }),
          children: [
            titleCard('ELDEN RING Nightreign', 'アクションRPG', 'PS5 / PC', '2025.06.27', true),
            titleCard('ドラゴンボール Sparking! ZERO', '対戦アクション', 'PS5 / PC', '2024.10.11', false),
            titleCard('鉄拳8', '格闘', 'PS5 / PC / Xbox', '2024.01.26', false),
            titleCard('テイルズ オブ 新作', 'RPG', 'PS5', '2026年予定', true),
          ],
        }),
      ],
    }),
    // Franchise grid
    frame('FranchiseSection', {
      autoLayout: vertical({ spacing: 20, padX: 60, padY: 40 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#f5f5f5')],
      children: [
        text('人気フランチャイズ', { fontSize: 20, fontWeight: 700, color: dark }),
        frame('FranchiseGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            ...[
              { name: 'ガンダム', color: '#E53935' },
              { name: 'ドラゴンボール', color: '#FF8F00' },
              { name: 'ワンピース', color: '#F44336' },
              { name: 'PAC-MAN', color: '#FFD600' },
              { name: 'NARUTO', color: '#FF6D00' },
              { name: 'たまごっち', color: '#E91E63' },
            ].map(f => frame(`Franchise:${f.name}`, {
              autoLayout: vertical({ spacing: 8, padX: 16, padY: 16, counterAlign: 'CENTER' }),
              size: { x: 180, y: undefined },
              fills: [solid(white)],
              cornerRadius: 12,
              children: [
                ellipse('FIcon', { size: { x: 64, y: 64 }, fills: [solid(f.color, 0.15)] }),
                text(f.name, { fontSize: 14, fontWeight: 600, color: dark }),
              ],
            })),
          ],
        }),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 8, padX: 60, padY: 24, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#1a1a1a')],
      children: [
        text('株式会社バンダイナムコエンターテインメント', { fontSize: 12, fontWeight: 400, color: '#888888' }),
        text('© Bandai Namco Entertainment Inc.', { fontSize: 11, fontWeight: 400, color: '#666666' }),
      ],
    }),
  ],
});
