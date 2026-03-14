import { frame, text, rectangle, ellipse, solid, gradient, radialGradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: nintendo.co.jp — Nintendo Japan, red branding, game-focused
// Features stressed: radial gradient, per-corner radii, multi-stroke, CJK, large imagery

const nintendoRed = '#E60012';
const dark = '#1a1a1a';
const white = '#ffffff';
const gray = '#777777';
const lightBg = '#f8f8f8';

function gameCard(title: string, platform: string, price: string, isNew: boolean) {
  return frame(`Game:${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 280, y: undefined },
    fills: [solid(white)],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    clipContent: true,
    children: [
      frame('GameImgContainer', {
        size: { x: 280, y: 160 },
        fills: [gradient([{ hex: '#2C2C2C', position: 0 }, { hex: '#444444', position: 1 }])],
        children: [
          ...(isNew ? [frame('NewBadge', {
            autoLayout: horizontal({ padX: 10, padY: 4 }),
            fills: [solid(nintendoRed)],
            cornerRadii: { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 8 },
            children: [text('NEW', { fontSize: 11, fontWeight: 700, color: white })],
          })] : []),
        ],
      }),
      frame('GameInfo', {
        autoLayout: vertical({ spacing: 6, padX: 16, padY: 14 }),
        layoutSizingHorizontal: 'FILL' as const,
        children: [
          text(title, { fontSize: 15, fontWeight: 600, color: dark }),
          frame('PlatformTag', {
            autoLayout: horizontal({ padX: 8, padY: 3 }),
            fills: [solid(nintendoRed, 0.1)],
            cornerRadius: 4,
            children: [text(platform, { fontSize: 11, fontWeight: 500, color: nintendoRed })],
          }),
          text(price, { fontSize: 16, fontWeight: 700, color: dark }),
        ],
      }),
    ],
  });
}

function newsItem(date: string, category: string, title: string) {
  return frame(`News:${title.slice(0, 15)}`, {
    autoLayout: horizontal({ spacing: 16, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL' as const,
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(date, { fontSize: 12, fontWeight: 400, color: gray }),
      frame('CatLabel', {
        autoLayout: horizontal({ padX: 8, padY: 3 }),
        fills: [solid(nintendoRed)],
        cornerRadius: 4,
        children: [text(category, { fontSize: 10, fontWeight: 600, color: white })],
      }),
      text(title, { fontSize: 14, fontWeight: 400, color: dark }),
    ],
  });
}

export default frame('NintendoJapanPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      strokes: [
        { color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const },
        { color: { r: 0.9, g: 0, b: 0.07, a: 1 }, weight: 3, align: 'OUTSIDE' as const },
      ],
      children: [
        text('Nintendo', { fontSize: 22, fontWeight: 700, color: nintendoRed }),
        frame('Nav', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('ゲーム', { fontSize: 14, fontWeight: 500, color: dark }),
            text('ハードウェア', { fontSize: 14, fontWeight: 500, color: dark }),
            text('ニュース', { fontSize: 14, fontWeight: 500, color: dark }),
            text('サポート', { fontSize: 14, fontWeight: 500, color: dark }),
            text('Nintendo Switch Online', { fontSize: 14, fontWeight: 500, color: dark }),
          ],
        }),
        frame('HeaderRight', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            text('ログイン', { fontSize: 13, fontWeight: 400, color: dark }),
            frame('StoreBtn', {
              autoLayout: horizontal({ padX: 16, padY: 8 }),
              fills: [solid(nintendoRed)],
              cornerRadius: 6,
              children: [text('ストア', { fontSize: 13, fontWeight: 600, color: white })],
            }),
          ],
        }),
      ],
    }),
    // Hero banner
    frame('HeroBanner', {
      autoLayout: vertical({ spacing: 16, padX: 120, padY: 64, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [radialGradient([
        { hex: '#FF2020', position: 0 },
        { hex: '#E60012', position: 0.6 },
        { hex: '#B20000', position: 1 },
      ])],
      children: [
        text('Nintendo Switch 2', { fontSize: 48, fontWeight: 900, color: white }),
        text('次世代のゲーム体験', { fontSize: 20, fontWeight: 400, color: white }),
        frame('HeroCTA', {
          autoLayout: horizontal({ padX: 32, padY: 12 }),
          fills: [solid(white)],
          cornerRadius: 8,
          children: [text('詳しくはこちら', { fontSize: 16, fontWeight: 600, color: nintendoRed })],
        }),
      ],
    }),
    // Game showcase
    frame('GameShowcase', {
      autoLayout: vertical({ spacing: 24, padX: 60, padY: 40 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        text('注目のゲーム', { fontSize: 22, fontWeight: 700, color: dark }),
        frame('GameGrid', {
          autoLayout: horizontal({ spacing: 20 }),
          children: [
            gameCard('ゼルダの伝説 知恵のかりもの', 'Nintendo Switch', '¥7,920', true),
            gameCard('マリオカート9', 'Nintendo Switch 2', '¥6,980', true),
            gameCard('スプラトゥーン3', 'Nintendo Switch', '¥6,578', false),
            gameCard('あつまれ どうぶつの森', 'Nintendo Switch', '¥6,578', false),
          ],
        }),
      ],
    }),
    // News section
    frame('NewsSection', {
      autoLayout: vertical({ spacing: 0, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(lightBg)],
      children: [
        frame('NewsHeader', {
          autoLayout: horizontal({ padX: 0, padY: 16, align: 'SPACE_BETWEEN' }),
          layoutSizingHorizontal: 'FILL' as const,
          children: [
            text('ニュース', { fontSize: 20, fontWeight: 700, color: dark }),
            text('一覧を見る →', { fontSize: 14, fontWeight: 500, color: nintendoRed }),
          ],
        }),
        newsItem('2026.03.14', 'ソフト', 'マリオカート9の発売日が決定しました'),
        newsItem('2026.03.13', 'イベント', 'Nintendo Direct 2026.3 放送決定'),
        newsItem('2026.03.12', 'キャンペーン', 'Switch Online 7日間無料体験キャンペーン'),
        newsItem('2026.03.11', 'サポート', 'システムアップデート Ver. 18.0.0 配信'),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 8, padX: 60, padY: 24, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#2C2C2C')],
      children: [
        text('任天堂株式会社', { fontSize: 12, fontWeight: 400, color: '#999999' }),
        text('© Nintendo', { fontSize: 11, fontWeight: 400, color: '#777777' }),
      ],
    }),
  ],
});
