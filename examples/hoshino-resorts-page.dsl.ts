import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: hoshinoresorts.com — Hoshino Resorts, luxury Japanese hospitality
// Features stressed: elegant typography, large whitespace, CJK, gradient overlays, fontWeight 200-300

const dark = '#1a1a1a';
const white = '#ffffff';
const cream = '#F5F0E8';
const warmGray = '#8C8070';
const brown = '#5C4B3A';
const gold = '#C4A265';

function resortCard(name: string, location: string, desc: string, brand: string, brandColor: string) {
  return frame(`Resort:${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 380, y: undefined },
    fills: [solid(white)],
    cornerRadius: 0,
    clipContent: true,
    children: [
      rectangle('ResortImg', {
        size: { x: 380, y: 240 },
        fills: [gradient([{ hex: '#3E2C1E', position: 0 }, { hex: '#5C4B3A', position: 0.5 }, { hex: '#8C7A6A', position: 1 }])],
      }),
      frame('ResortInfo', {
        autoLayout: vertical({ spacing: 8, padX: 24, padY: 24 }),
        layoutSizingHorizontal: 'FILL' as const,
        children: [
          frame('BrandTag', {
            autoLayout: horizontal({ padX: 10, padY: 3 }),
            fills: [solid(brandColor, 0.1)],
            children: [text(brand, { fontSize: 11, fontWeight: 500, color: brandColor, letterSpacing: { value: 2, unit: 'PIXELS' as const } })],
          }),
          text(name, { fontSize: 20, fontWeight: 300, color: dark }),
          text(location, { fontSize: 13, fontWeight: 400, color: warmGray }),
          text(desc, { fontSize: 13, fontWeight: 400, color: warmGray, lineHeight: { value: 22, unit: 'PIXELS' as const } }),
        ],
      }),
    ],
  });
}

export default frame('HoshinoResortsPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(cream)],
      children: [
        text('星野リゾート', { fontSize: 20, fontWeight: 300, color: dark, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        frame('Nav', {
          autoLayout: horizontal({ spacing: 32 }),
          children: [
            text('施設一覧', { fontSize: 14, fontWeight: 300, color: dark }),
            text('ブランド', { fontSize: 14, fontWeight: 300, color: dark }),
            text('体験', { fontSize: 14, fontWeight: 300, color: dark }),
            text('ニュース', { fontSize: 14, fontWeight: 300, color: dark }),
          ],
        }),
        frame('Actions', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            text('EN', { fontSize: 13, fontWeight: 400, color: warmGray }),
            frame('ReserveBtn', {
              autoLayout: horizontal({ padX: 20, padY: 8 }),
              fills: [solid(dark)],
              children: [text('予約', { fontSize: 13, fontWeight: 400, color: white })],
            }),
          ],
        }),
      ],
    }),
    // Hero — elegant minimalist
    frame('Hero', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 100, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [gradient([{ hex: '#3E2C1E', position: 0 }, { hex: '#2A1E14', position: 1 }])],
      children: [
        text('HOSHINO RESORTS', { fontSize: 14, fontWeight: 400, color: gold, letterSpacing: { value: 8, unit: 'PIXELS' as const } }),
        text('日本の美意識に触れる旅', { fontSize: 36, fontWeight: 200, color: white }),
        text('その土地の魅力を最大限に引き出す、星野リゾートのおもてなし', {
          fontSize: 15, fontWeight: 300, color: '#bbaa99',
          lineHeight: { value: 28, unit: 'PIXELS' as const },
        }),
        frame('HeroCTA', {
          autoLayout: horizontal({ padX: 40, padY: 14 }),
          strokes: [{ color: { r: 0.77, g: 0.64, b: 0.40, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [text('施設を探す', { fontSize: 14, fontWeight: 400, color: gold })],
        }),
      ],
    }),
    // Brand intro
    frame('BrandSection', {
      autoLayout: vertical({ spacing: 40, padX: 120, padY: 64 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        frame('BrandHeader', {
          autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL' as const,
          children: [
            text('ブランド', { fontSize: 12, fontWeight: 400, color: warmGray, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
            text('4つのブランドで、多彩な体験を', { fontSize: 24, fontWeight: 200, color: dark }),
          ],
        }),
        frame('BrandGrid', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            ...[
              { name: '星のや', desc: '圧倒的非日常', color: '#1a1a1a' },
              { name: '界', desc: '王道なのに、あたらしい', color: '#8B4513' },
              { name: 'リゾナーレ', desc: '大人のためのファミリーリゾート', color: '#2E7D32' },
              { name: 'OMO', desc: '都市を楽しむホテル', color: '#E91E63' },
            ].map(b => frame(`Brand:${b.name}`, {
              autoLayout: vertical({ spacing: 8, padX: 24, padY: 24, counterAlign: 'CENTER' }),
              size: { x: 260, y: undefined },
              fills: [solid(white)],
              children: [
                ellipse('BrandIcon', { size: { x: 48, y: 48 }, fills: [solid(b.color, 0.1)] }),
                text(b.name, { fontSize: 20, fontWeight: 300, color: dark }),
                text(b.desc, { fontSize: 13, fontWeight: 400, color: warmGray }),
              ],
            })),
          ],
        }),
      ],
    }),
    // Resort cards
    frame('ResortsSection', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      children: [
        text('おすすめの施設', { fontSize: 22, fontWeight: 200, color: dark }),
        frame('ResortGrid', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            resortCard('星のや京都', '京都・嵐山', '渡月橋を眺める水辺の私邸。京都の文化に浸る極上の滞在。', '星のや', '#1a1a1a'),
            resortCard('界 箱根', '神奈川・箱根', '温泉旅館の伝統を受け継ぎながら、新しい湯治の楽しみを提案。', '界', '#8B4513'),
            resortCard('リゾナーレトマム', '北海道・トマム', '雲海テラスや氷の街など、北海道の大自然を満喫。', 'リゾナーレ', '#2E7D32'),
          ],
        }),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 8, padX: 80, padY: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(dark)],
      children: [
        text('星野リゾート', { fontSize: 14, fontWeight: 300, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        text('© Hoshino Resorts Inc.', { fontSize: 11, fontWeight: 400, color: '#666666' }),
      ],
    }),
  ],
});
