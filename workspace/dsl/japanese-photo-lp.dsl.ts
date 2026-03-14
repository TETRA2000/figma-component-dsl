import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const black = '#1a1a1a';
const white = '#ffffff';
const gray = '#888888';
const grayLight = '#f8f8f8';
const grayBorder = '#e5e5e5';

const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(white)],
  strokes: [{ color: hex(grayBorder), weight: 1, align: 'INSIDE' }],
  children: [
    text('HIKARI STUDIO', { fontSize: 18, fontWeight: 300, color: black, letterSpacing: { value: 4, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: ['ポートフォリオ', 'フォトグラファー', '料金', 'お問い合わせ'].map(t =>
        text(t, { fontSize: 13, fontWeight: 400, color: '#666666' })
      ),
    }),
    frame('ContactBtn', {
      autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(black)],
      children: [text('撮影のご相談', { fontSize: 13, fontWeight: 500, color: white })],
    }),
  ],
});

const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 600 },
  autoLayout: vertical({ spacing: 16, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#2a2a2a', position: 0 }, { hex: black, position: 1 }], 135)],
  children: [
    text('一瞬を、永遠に。', {
      fontSize: 56, fontWeight: 200, color: white,
      textAlignHorizontal: 'CENTER',
      letterSpacing: { value: 8, unit: 'PIXELS' },
    }),
    text('光と影で紡ぐ、あなただけの物語', {
      fontSize: 16, fontWeight: 300, color: '#ffffff99',
      textAlignHorizontal: 'CENTER',
      letterSpacing: { value: 4, unit: 'PIXELS' },
    }),
  ],
});

function portfolioItem(label: string, w: number, h: number) {
  return frame(`Portfolio: ${label}`, {
    autoLayout: vertical({ spacing: 0, align: 'MAX' }),
    size: { x: w, y: h },
    fills: [solid('#f0f0f0')],
    clipContent: true,
    children: [
      frame('Overlay', {
        autoLayout: horizontal({ padX: 16, padY: 12 }),
        layoutSizingHorizontal: 'FILL',
        fills: [gradient([{ hex: '#00000000', position: 0 }, { hex: '#000000BB', position: 1 }], 180)],
        children: [
          text(label, { fontSize: 13, fontWeight: 400, color: white }),
        ],
      }),
    ],
  });
}

const portfolioSection = frame('PortfolioSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    text('ポートフォリオ', { fontSize: 24, fontWeight: 300, color: black, textAlignHorizontal: 'CENTER', letterSpacing: { value: 4, unit: 'PIXELS' } }),
    frame('Grid', {
      autoLayout: vertical({ spacing: 4 }),
      children: [
        frame('Row1', {
          autoLayout: horizontal({ spacing: 4 }),
          children: [
            portfolioItem('ウェディング', 360, 480),
            portfolioItem('ポートレート', 360, 480),
            portfolioItem('商品撮影', 360, 480),
          ],
        }),
        frame('Row2', {
          autoLayout: horizontal({ spacing: 4 }),
          children: [
            portfolioItem('建築・空間', 360, 360),
            portfolioItem('家族写真', 360, 360),
            portfolioItem('イベント', 360, 360),
          ],
        }),
      ],
    }),
  ],
});

const photographerSection = frame('PhotographerSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(grayLight)],
  children: [
    rectangle('Photo', {
      size: { x: 320, y: 400 },
      fills: [gradient([{ hex: '#e0e0e0', position: 0 }, { hex: '#c0c0c0', position: 1 }], 135)],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('フォトグラファー', { fontSize: 12, fontWeight: 400, color: '#999999' }),
        text('山田 光 / Hikari Yamada', {
          fontSize: 28, fontWeight: 300, color: black,
          letterSpacing: { value: 2, unit: 'PIXELS' },
        }),
        text('東京を拠点に活動するフォトグラファー。武蔵野美術大学卒業後、ロンドンで3年間修業。自然光を活かした繊細な表現と、被写体の本質を捉える力が評価され、国内外の雑誌やブランドの撮影を手掛ける。', {
          fontSize: 15, fontWeight: 400, color: '#555555',
          lineHeight: { value: 200, unit: 'PERCENT' },
          size: { x: 460 },
          textAutoResize: 'HEIGHT',
        }),
        frame('Awards', {
          autoLayout: horizontal({ spacing: 16 }),
          children: ['東京写真賞 2024', '国際写真コンペ銀賞', '個展 5回開催'].map(a =>
            frame(`Award: ${a}`, {
              autoLayout: horizontal({ padX: 14, padY: 6 }),
              strokes: [{ color: hex('#cccccc'), weight: 1, align: 'INSIDE' }],
              children: [text(a, { fontSize: 12, fontWeight: 400, color: black })],
            })
          ),
        }),
      ],
    }),
  ],
});

function pricingCard(name: string, price: string, features: string[], featured?: boolean) {
  return frame(`Plan: ${name}`, {
    autoLayout: vertical({ spacing: 28, padX: 28, padY: 40 }),
    fills: [solid('#222222')],
    strokes: [{ color: hex(featured ? white : '#333333'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      ...(featured ? [
        frame('Badge', {
          autoLayout: horizontal({ padX: 16, padY: 4 }),
          fills: [solid(white)],
          children: [text('人気', { fontSize: 11, fontWeight: 700, color: black })],
        }),
      ] : []),
      text(name, { fontSize: 16, fontWeight: 300, color: white }),
      frame('PriceRow', {
        autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }),
        children: [
          text(price, { fontSize: 32, fontWeight: 200, color: white }),
          text('（税込）', { fontSize: 13, fontWeight: 400, color: gray }),
        ],
      }),
      frame('Features', {
        autoLayout: vertical({ spacing: 12 }),
        layoutSizingHorizontal: 'FILL',
        children: features.map(f =>
          text(`— ${f}`, { fontSize: 13, fontWeight: 400, color: '#aaaaaa' })
        ),
      }),
    ],
  });
}

const pricingSection = frame('PricingSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(black)],
  children: [
    text('撮影プラン', { fontSize: 24, fontWeight: 300, color: white, textAlignHorizontal: 'CENTER', letterSpacing: { value: 4, unit: 'PIXELS' } }),
    frame('PricingGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        pricingCard('ライトプラン', '¥38,000', ['撮影時間 1時間', '納品枚数 30枚', 'レタッチ 基本補正', 'データ納品']),
        pricingCard('スタンダードプラン', '¥78,000', ['撮影時間 3時間', '納品枚数 80枚', 'レタッチ 丁寧な補正', 'データ＋プリント10枚', 'ロケーション撮影対応'], true),
        pricingCard('プレミアムプラン', '¥150,000', ['撮影時間 終日', '納品枚数 200枚', 'レタッチ フルレタッチ', 'データ＋アルバム制作', '衣装・ヘアメイク手配']),
      ],
    }),
  ],
});

const contactSection = frame('ContactSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    text('お問い合わせ', { fontSize: 24, fontWeight: 300, color: black, textAlignHorizontal: 'CENTER', letterSpacing: { value: 4, unit: 'PIXELS' } }),
    text('撮影のご相談・お見積りはお気軽にどうぞ。\nご要望に合わせたプランをご提案いたします。', {
      fontSize: 15, fontWeight: 400, color: '#666666',
      lineHeight: { value: 200, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 400 },
      textAutoResize: 'HEIGHT',
    }),
    frame('ContactBtn', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(black)],
      children: [text('お問い合わせフォーム', { fontSize: 14, fontWeight: 500, color: white })],
    }),
    text('info@hikari-studio.jp', { fontSize: 14, fontWeight: 400, color: '#999999' }),
  ],
});

const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0, padX: 120 }),
  fills: [solid(black)],
  children: [
    frame('Inner', {
      autoLayout: horizontal({ spacing: 0, padY: 48, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex('#333333'), weight: 1, align: 'INSIDE' }],
      children: [
        frame('Brand', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('HIKARI STUDIO', { fontSize: 16, fontWeight: 300, color: white, letterSpacing: { value: 4, unit: 'PIXELS' } }),
            text('一瞬を、永遠に。', { fontSize: 12, fontWeight: 400, color: '#666666' }),
          ],
        }),
        frame('Links', {
          autoLayout: horizontal({ spacing: 28 }),
          children: ['ポートフォリオ', '料金', 'フォトグラファー', 'お問い合わせ', 'Instagram'].map(t =>
            text(t, { fontSize: 12, fontWeight: 400, color: gray })
          ),
        }),
      ],
    }),
    frame('Bottom', {
      autoLayout: horizontal({ padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [text('© 2026 HIKARI STUDIO All rights reserved.', { fontSize: 11, fontWeight: 400, color: '#555555' })],
    }),
  ],
});

export default frame('JapanesePhotoLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [navBar, heroSection, portfolioSection, photographerSection, pricingSection, contactSection, footerSection],
});
