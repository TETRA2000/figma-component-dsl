import { frame, text, rectangle, ellipse, solid, gradient, radialGradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: kabuki-za.co.jp — Kabuki-za Theatre, traditional Japanese performing arts
// Features stressed: radial gradient, traditional colors, CJK, elegant typography, lineHeight, decorative strokes

const burgundy = '#8B0000';
const gold = '#C4A265';
const dark = '#1a1a1a';
const white = '#ffffff';
const cream = '#FFF8F0';
const warmGray = '#6B5B4F';

function performanceCard(title: string, performer: string, date: string, session: string) {
  return frame(`Show:${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
    size: { x: 380, y: undefined },
    fills: [solid(white)],
    strokes: [
      { color: { r: 0.77, g: 0.64, b: 0.40, a: 0.3 }, weight: 1, align: 'INSIDE' as const },
    ],
    children: [
      text(session, { fontSize: 11, fontWeight: 400, color: gold, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
      text(title, { fontSize: 20, fontWeight: 400, color: dark }),
      rectangle('Divider', { size: { x: 40, y: 1 }, fills: [solid(gold)] }),
      text(performer, { fontSize: 14, fontWeight: 400, color: warmGray }),
      text(date, { fontSize: 13, fontWeight: 400, color: warmGray }),
      frame('TicketBtn', {
        autoLayout: horizontal({ padX: 20, padY: 8 }),
        fills: [solid(burgundy)],
        children: [text('チケット購入', { fontSize: 13, fontWeight: 500, color: white })],
      }),
    ],
  });
}

export default frame('KabukizaPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(cream)],
      strokes: [{ color: { r: 0.77, g: 0.64, b: 0.40, a: 0.3 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('歌舞伎座', { fontSize: 24, fontWeight: 400, color: dark, letterSpacing: { value: 8, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('公演情報', { fontSize: 14, fontWeight: 400, color: dark }),
          text('チケット', { fontSize: 14, fontWeight: 400, color: dark }),
          text('歌舞伎入門', { fontSize: 14, fontWeight: 400, color: dark }),
          text('アクセス', { fontSize: 14, fontWeight: 400, color: dark }),
        ]}),
        text('English', { fontSize: 12, fontWeight: 400, color: warmGray }),
      ],
    }),
    // Hero with radial gradient
    frame('Hero', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [radialGradient([
        { hex: '#4A0000', position: 0 },
        { hex: '#2A0000', position: 0.6 },
        { hex: '#1A0000', position: 1 },
      ])],
      children: [
        text('KABUKI-ZA', { fontSize: 14, fontWeight: 400, color: gold, letterSpacing: { value: 8, unit: 'PIXELS' as const } }),
        text('歌舞伎座', { fontSize: 48, fontWeight: 400, color: white, letterSpacing: { value: 12, unit: 'PIXELS' as const } }),
        rectangle('GoldLine', { size: { x: 80, y: 1 }, fills: [solid(gold)] }),
        text('四百年の伝統、今に息づく舞台芸術', { fontSize: 16, fontWeight: 300, color: '#ccaa88' }),
      ],
    }),
    // Current performances
    frame('Performances', {
      autoLayout: vertical({ spacing: 28, padX: 60, padY: 48 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        frame('SectionHeader', {
          autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL' as const,
          children: [
            text('公演情報', { fontSize: 12, fontWeight: 400, color: warmGray, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
            text('三月大歌舞伎', { fontSize: 26, fontWeight: 400, color: dark }),
          ],
        }),
        frame('PerformanceGrid', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            performanceCard('仮名手本忠臣蔵', '市川海老蔵 / 尾上菊五郎', '3月3日〜3月27日', '昼の部'),
            performanceCard('義経千本桜', '片岡仁左衛門 / 中村勘九郎', '3月3日〜3月27日', '夜の部'),
            performanceCard('一幕見席 — 連獅子', '坂東玉三郎', '毎日上演', '特別公演'),
          ],
        }),
      ],
    }),
    // Kabuki intro
    frame('IntroSection', {
      autoLayout: horizontal({ spacing: 48, padX: 60, padY: 48 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      children: [
        frame('IntroText', {
          autoLayout: vertical({ spacing: 16 }),
          size: { x: 600, y: undefined },
          children: [
            text('歌舞伎とは', { fontSize: 22, fontWeight: 400, color: dark }),
            text('歌舞伎は、日本が世界に誇る伝統芸能のひとつです。江戸時代初期の1603年に出雲阿国が京都で始めた「かぶき踊り」がその起源とされています。', {
              fontSize: 14, fontWeight: 400, color: warmGray,
              lineHeight: { value: 26, unit: 'PIXELS' as const },
            }),
            text('華やかな衣装、独特の化粧（隈取）、力強い演技、そして三味線や太鼓の生演奏が織りなす総合芸術として、四百年以上にわたり受け継がれてきました。', {
              fontSize: 14, fontWeight: 400, color: warmGray,
              lineHeight: { value: 26, unit: 'PIXELS' as const },
            }),
            frame('LearnBtn', {
              autoLayout: horizontal({ padX: 24, padY: 10 }),
              strokes: [{ color: { r: 0.55, g: 0, b: 0, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [text('歌舞伎入門ガイド', { fontSize: 14, fontWeight: 400, color: burgundy })],
            }),
          ],
        }),
        rectangle('KabukiImg', {
          size: { x: 400, y: 300 },
          fills: [gradient([{ hex: '#3E2C1E', position: 0 }, { hex: '#5C4B3A', position: 1 }])],
        }),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 8, padX: 60, padY: 28, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#2A1E14')],
      children: [
        text('松竹株式会社', { fontSize: 12, fontWeight: 400, color: '#aa9980' }),
        text('© Shochiku Co., Ltd.', { fontSize: 11, fontWeight: 400, color: '#887766' }),
      ],
    }),
  ],
});
