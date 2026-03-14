import { frame, text, rectangle, ellipse, solid, gradient, radialGradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: jal.co.jp — Japan Airlines, crane red branding, booking interface
// Features stressed: gradient hero, form inputs, CJK, SPACE_BETWEEN, stroke alignment, per-corner radii

const jalRed = '#CC0000';
const dark = '#1a1a1a';
const white = '#ffffff';
const gray = '#777777';
const lightBg = '#f8f8f8';
const navy = '#002244';

function classOption(name: string, desc: string, price: string, selected: boolean) {
  return frame(`Class:${name}`, {
    autoLayout: vertical({ spacing: 6, padX: 16, padY: 14 }),
    size: { x: 250, y: undefined },
    fills: [solid(selected ? '#FFF5F5' : white)],
    cornerRadius: 8,
    strokes: [{ color: selected ? { r: 0.8, g: 0, b: 0, a: 1 } : { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: selected ? 2 : 1, align: 'INSIDE' as const }],
    children: [
      text(name, { fontSize: 15, fontWeight: 600, color: selected ? jalRed : dark }),
      text(desc, { fontSize: 12, fontWeight: 400, color: gray }),
      text(price, { fontSize: 18, fontWeight: 700, color: selected ? jalRed : dark }),
    ],
  });
}

function destCard(city: string, jpName: string, price: string) {
  return frame(`Dest:${city}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 260, y: undefined },
    fills: [solid(white)],
    cornerRadius: 10,
    clipContent: true,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('DestImg', { size: { x: 260, y: 160 }, fills: [gradient([{ hex: '#003366', position: 0 }, { hex: '#006699', position: 1 }])] }),
      frame('DestInfo', {
        autoLayout: vertical({ spacing: 4, padX: 14, padY: 12 }),
        layoutSizingHorizontal: 'FILL' as const,
        children: [
          text(city, { fontSize: 16, fontWeight: 600, color: dark }),
          text(jpName, { fontSize: 12, fontWeight: 400, color: gray }),
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
            children: [
              text('往復', { fontSize: 11, fontWeight: 400, color: gray }),
              text(price, { fontSize: 16, fontWeight: 700, color: jalRed }),
              text('〜', { fontSize: 12, fontWeight: 400, color: gray }),
            ],
          }),
        ],
      }),
    ],
  });
}

export default frame('JALAirlinesPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('Logo', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            ellipse('Crane', { size: { x: 32, y: 32 }, fills: [solid(jalRed)] }),
            text('JAL', { fontSize: 24, fontWeight: 700, color: jalRed }),
          ],
        }),
        frame('Nav', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('航空券予約', { fontSize: 14, fontWeight: 500, color: dark }),
            text('マイル', { fontSize: 14, fontWeight: 500, color: dark }),
            text('旅の情報', { fontSize: 14, fontWeight: 500, color: dark }),
            text('JALカード', { fontSize: 14, fontWeight: 500, color: dark }),
          ],
        }),
        frame('UserArea', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            text('ログイン', { fontSize: 13, fontWeight: 400, color: dark }),
            text('English', { fontSize: 13, fontWeight: 400, color: gray }),
          ],
        }),
      ],
    }),
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 120, padY: 64, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [radialGradient([
        { hex: '#003366', position: 0 },
        { hex: '#001a33', position: 0.7 },
        { hex: '#000d1a', position: 1 },
      ])],
      children: [
        text('新しい空の旅へ', { fontSize: 40, fontWeight: 300, color: white }),
        text('JALで世界を、もっと近くに。', { fontSize: 18, fontWeight: 400, color: '#aaccee' }),
      ],
    }),
    // Booking form
    frame('BookingForm', {
      autoLayout: vertical({ spacing: 20, padX: 40, padY: 32 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(lightBg)],
      children: [
        text('フライト検索', { fontSize: 20, fontWeight: 700, color: dark }),
        frame('FormRow', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'MAX' }),
          children: [
            frame('FromField', {
              autoLayout: vertical({ spacing: 4 }), size: { x: 200, y: undefined },
              children: [
                text('出発地', { fontSize: 12, fontWeight: 500, color: gray }),
                frame('Input', { autoLayout: horizontal({ padX: 14, padY: 10 }), layoutSizingHorizontal: 'FILL' as const, fills: [solid(white)], cornerRadius: 6, strokes: [{ color: { r: 0.8, g: 0.8, b: 0.8, a: 1 }, weight: 1, align: 'INSIDE' as const }], children: [text('東京 (NRT)', { fontSize: 14, fontWeight: 500, color: dark })] }),
              ],
            }),
            frame('ToField', {
              autoLayout: vertical({ spacing: 4 }), size: { x: 200, y: undefined },
              children: [
                text('到着地', { fontSize: 12, fontWeight: 500, color: gray }),
                frame('Input', { autoLayout: horizontal({ padX: 14, padY: 10 }), layoutSizingHorizontal: 'FILL' as const, fills: [solid(white)], cornerRadius: 6, strokes: [{ color: { r: 0.8, g: 0.8, b: 0.8, a: 1 }, weight: 1, align: 'INSIDE' as const }], children: [text('大阪 (ITM)', { fontSize: 14, fontWeight: 500, color: dark })] }),
              ],
            }),
            frame('DateField', {
              autoLayout: vertical({ spacing: 4 }), size: { x: 180, y: undefined },
              children: [
                text('出発日', { fontSize: 12, fontWeight: 500, color: gray }),
                frame('Input', { autoLayout: horizontal({ padX: 14, padY: 10 }), layoutSizingHorizontal: 'FILL' as const, fills: [solid(white)], cornerRadius: 6, strokes: [{ color: { r: 0.8, g: 0.8, b: 0.8, a: 1 }, weight: 1, align: 'INSIDE' as const }], children: [text('2026/03/20', { fontSize: 14, fontWeight: 500, color: dark })] }),
              ],
            }),
            frame('PaxField', {
              autoLayout: vertical({ spacing: 4 }), size: { x: 120, y: undefined },
              children: [
                text('人数', { fontSize: 12, fontWeight: 500, color: gray }),
                frame('Input', { autoLayout: horizontal({ padX: 14, padY: 10 }), layoutSizingHorizontal: 'FILL' as const, fills: [solid(white)], cornerRadius: 6, strokes: [{ color: { r: 0.8, g: 0.8, b: 0.8, a: 1 }, weight: 1, align: 'INSIDE' as const }], children: [text('大人 1名', { fontSize: 14, fontWeight: 500, color: dark })] }),
              ],
            }),
            frame('SearchBtn', {
              autoLayout: horizontal({ padX: 32, padY: 12 }),
              fills: [solid(jalRed)],
              cornerRadius: 6,
              children: [text('検索', { fontSize: 15, fontWeight: 600, color: white })],
            }),
          ],
        }),
        // Class selection
        frame('ClassSelection', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            classOption('エコノミー', '快適な空の旅', '¥15,800〜', true),
            classOption('プレミアムエコノミー', 'ゆとりのシート', '¥28,600〜', false),
            classOption('ビジネス', '上質なおもてなし', '¥52,400〜', false),
            classOption('ファースト', '最上級の体験', '¥89,000〜', false),
          ],
        }),
      ],
    }),
    // Destinations
    frame('Destinations', {
      autoLayout: vertical({ spacing: 20, padX: 40, padY: 32 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        text('おすすめの旅先', { fontSize: 20, fontWeight: 700, color: dark }),
        frame('DestGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            destCard('ホノルル', 'ハワイ', '¥128,000'),
            destCard('バンコク', 'タイ', '¥68,000'),
            destCard('パリ', 'フランス', '¥198,000'),
            destCard('シンガポール', 'シンガポール', '¥78,000'),
            destCard('ニューヨーク', 'アメリカ', '¥168,000'),
          ],
        }),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 6, padX: 40, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(navy)],
      children: [
        text('日本航空株式会社', { fontSize: 12, fontWeight: 400, color: '#8899aa' }),
        text('© Japan Airlines Co., Ltd.', { fontSize: 11, fontWeight: 400, color: '#667788' }),
      ],
    }),
  ],
});
