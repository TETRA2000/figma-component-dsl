import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: line.me — LINE messaging app landing page, green branding
// Features stressed: radial gradient, cornerRadius 9999, CJK, ellipse avatars, FILL sizing

const lineGreen = '#06C755';
const dark = '#1e1e1e';
const white = '#ffffff';
const gray = '#888888';
const lightBg = '#f5f5f5';

function featureCard(title: string, desc: string, iconColor: string) {
  return frame(`Feature:${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 24, counterAlign: 'CENTER' }),
    size: { x: 300, y: undefined },
    fills: [solid(white)],
    cornerRadius: 16,
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse('Icon', { size: { x: 56, y: 56 }, fills: [solid(iconColor, 0.15)] }),
      text(title, { fontSize: 16, fontWeight: 600, color: dark }),
      text(desc, { fontSize: 13, fontWeight: 400, color: gray, lineHeight: { value: 20, unit: 'PIXELS' as const } }),
    ],
  });
}

function chatBubble(msg: string, isSelf: boolean) {
  return frame(`Msg:${msg.slice(0, 10)}`, {
    autoLayout: horizontal({ padX: 16, padY: 10, ...(isSelf ? {} : {}) }),
    fills: [solid(isSelf ? lineGreen : '#E8E8E8')],
    cornerRadius: 18,
    children: [text(msg, { fontSize: 14, fontWeight: 400, color: isSelf ? white : dark })],
  });
}

export default frame('LineAppPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('LINE', { fontSize: 28, fontWeight: 700, color: lineGreen }),
        frame('Nav', {
          autoLayout: horizontal({ spacing: 28 }),
          children: [
            text('ダウンロード', { fontSize: 14, fontWeight: 500, color: dark }),
            text('サービス', { fontSize: 14, fontWeight: 500, color: dark }),
            text('企業情報', { fontSize: 14, fontWeight: 500, color: dark }),
            text('セキュリティ', { fontSize: 14, fontWeight: 500, color: dark }),
          ],
        }),
        frame('DownloadBtn', {
          autoLayout: horizontal({ padX: 24, padY: 10 }),
          fills: [solid(lineGreen)],
          cornerRadius: 9999,
          children: [text('無料ダウンロード', { fontSize: 14, fontWeight: 600, color: white })],
        }),
      ],
    }),
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 20, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [gradient([{ hex: '#06C755', position: 0 }, { hex: '#00B900', position: 0.5 }, { hex: '#009900', position: 1 }])],
      children: [
        text('LINE', { fontSize: 64, fontWeight: 900, color: white }),
        text('いつでも、どこでも、すぐに。', { fontSize: 24, fontWeight: 400, color: white }),
        text('無料通話・無料メールアプリ', { fontSize: 16, fontWeight: 400, color: white, opacity: 0.8 }),
        frame('HeroCTA', {
          autoLayout: horizontal({ padX: 40, padY: 14 }),
          fills: [solid(white)],
          cornerRadius: 9999,
          children: [text('今すぐダウンロード', { fontSize: 16, fontWeight: 700, color: lineGreen })],
        }),
        // Stats
        frame('Stats', {
          autoLayout: horizontal({ spacing: 48 }),
          children: [
            frame('Stat1', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), children: [
              text('9,500万+', { fontSize: 28, fontWeight: 700, color: white }),
              text('月間アクティブユーザー', { fontSize: 12, fontWeight: 400, color: white, opacity: 0.8 }),
            ]}),
            frame('Stat2', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), children: [
              text('230+', { fontSize: 28, fontWeight: 700, color: white }),
              text('国と地域', { fontSize: 12, fontWeight: 400, color: white, opacity: 0.8 }),
            ]}),
            frame('Stat3', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), children: [
              text('2011年〜', { fontSize: 28, fontWeight: 700, color: white }),
              text('サービス開始', { fontSize: 12, fontWeight: 400, color: white, opacity: 0.8 }),
            ]}),
          ],
        }),
      ],
    }),
    // Chat preview
    frame('ChatPreview', {
      autoLayout: vertical({ spacing: 16, padX: 120, padY: 48 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        text('LINEでつながる', { fontSize: 24, fontWeight: 700, color: dark }),
        frame('ChatWindow', {
          autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
          size: { x: 400, y: undefined },
          fills: [solid('#F0F0F0')],
          cornerRadius: 16,
          children: [
            frame('MsgLeft', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
              ellipse('Av1', { size: { x: 32, y: 32 }, fills: [solid('#FFB6C1')] }),
              chatBubble('今日のランチ何にする？', false),
            ]}),
            frame('MsgRight', { autoLayout: horizontal({ align: 'MAX' }), layoutSizingHorizontal: 'FILL' as const, children: [
              chatBubble('ラーメン食べたい！🍜', true),
            ]}),
            frame('MsgLeft2', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
              ellipse('Av2', { size: { x: 32, y: 32 }, fills: [solid('#FFB6C1')] }),
              chatBubble('いいね！駅前の新しい店行こう', false),
            ]}),
            frame('MsgRight2', { autoLayout: horizontal({ align: 'MAX' }), layoutSizingHorizontal: 'FILL' as const, children: [
              chatBubble('了解！12時に集合ね 👍', true),
            ]}),
          ],
        }),
      ],
    }),
    // Features
    frame('Features', {
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(lightBg)],
      children: [
        text('LINEの主な機能', { fontSize: 24, fontWeight: 700, color: dark }),
        frame('FeatureGrid', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            featureCard('トーク', 'テキスト、スタンプ、写真、動画を送れるメッセージ機能', lineGreen),
            featureCard('無料通話', '高品質な音声・ビデオ通話が無料で利用可能', '#4285F4'),
            featureCard('LINE Pay', 'お支払いも送金も、LINEで簡単に', '#FF6B00'),
            featureCard('LINE NEWS', '最新ニュースをLINE上で手軽にチェック', '#E91E63'),
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
        text('LINEヤフー株式会社', { fontSize: 12, fontWeight: 400, color: '#888888' }),
        text('© LY Corporation', { fontSize: 11, fontWeight: 400, color: '#666666' }),
      ],
    }),
  ],
});
