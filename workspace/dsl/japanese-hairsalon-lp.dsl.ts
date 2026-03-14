import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const dark = '#1a1a1a';
const warmBg = '#f5f0eb';
const warmDark = '#ddd5ca';

const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  strokes: [{ color: hex('#eeeeee'), weight: 1, align: 'INSIDE' }],
  children: [
    text('TSUBAKI Hair', { fontSize: 22, fontWeight: 300, color: dark, letterSpacing: { value: 4, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('コンセプト', { fontSize: 13, fontWeight: 400, color: '#666666', letterSpacing: { value: 1, unit: 'PIXELS' } }),
        text('メニュー・料金', { fontSize: 13, fontWeight: 400, color: '#666666', letterSpacing: { value: 1, unit: 'PIXELS' } }),
        text('スタイリスト', { fontSize: 13, fontWeight: 400, color: '#666666', letterSpacing: { value: 1, unit: 'PIXELS' } }),
        text('サロン情報', { fontSize: 13, fontWeight: 400, color: '#666666', letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(dark)],
      children: [text('予約する', { fontSize: 13, fontWeight: 500, color: '#ffffff', letterSpacing: { value: 1, unit: 'PIXELS' } })],
    }),
  ],
});

const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 120, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: warmBg, position: 0 }, { hex: '#ebe3d9', position: 1 }], 135)],
  children: [
    text('SINCE 2010', { fontSize: 12, fontWeight: 400, color: '#999999', letterSpacing: { value: 4, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('あなただけの\n美しさを引き出す', {
      fontSize: 48, fontWeight: 300, color: dark,
      lineHeight: { value: 140, unit: 'PERCENT' },
      letterSpacing: { value: 2, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    text('一人ひとりの髪質と骨格に合わせた\nオーダーメイドスタイルをご提案します', {
      fontSize: 15, fontWeight: 400, color: '#888888',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 400 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroCTA', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(dark)],
      children: [text('ホットペッパーで予約', { fontSize: 14, fontWeight: 500, color: '#ffffff', letterSpacing: { value: 2, unit: 'PIXELS' } })],
    }),
  ],
});

const conceptSection = frame('ConceptSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    frame('ConceptText', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('CONCEPT', { fontSize: 12, fontWeight: 400, color: '#999999', letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('髪と向き合う\n贅沢な時間を', {
          fontSize: 32, fontWeight: 300, color: dark,
          lineHeight: { value: 150, unit: 'PERCENT' },
          letterSpacing: { value: 1, unit: 'PIXELS' },
          size: { x: 400 },
          textAutoResize: 'HEIGHT',
        }),
        text('TSUBAKIは、表参道の隠れ家サロン。完全予約制・マンツーマン施術で、カウンセリングから仕上げまで一人のスタイリストが担当します。お客様一人ひとりのライフスタイルに寄り添った、再現性の高いヘアスタイルをご提案します。', {
          fontSize: 14, fontWeight: 400, color: '#666666',
          lineHeight: { value: 200, unit: 'PERCENT' },
          size: { x: 400 },
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),
    rectangle('ConceptImage', {
      size: { x: 400, y: 500 },
      fills: [gradient([{ hex: warmBg, position: 0 }, { hex: warmDark, position: 1 }], 135)],
    }),
  ],
});

function menuCard(category: string, items: { name: string; price: string }[]) {
  return frame(`Menu: ${category}`, {
    autoLayout: vertical({ spacing: 20, padX: 32, padY: 32 }),
    fills: [solid('#ffffff')],
    strokes: [{ color: hex('#eeeeee'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(category, { fontSize: 18, fontWeight: 600, color: dark, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ...items.map(item =>
        frame(`Item: ${item.name}`, {
          autoLayout: horizontal({ spacing: 0, padY: 12, align: 'SPACE_BETWEEN' }),
          layoutSizingHorizontal: 'FILL',
          strokes: [{ color: hex('#f0f0f0'), weight: 1, align: 'INSIDE' }],
          children: [
            text(item.name, { fontSize: 14, fontWeight: 400, color: '#444444' }),
            text(item.price, { fontSize: 14, fontWeight: 600, color: dark }),
          ],
        })
      ),
    ],
  });
}

const menuSection = frame('MenuSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 270, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#faf8f5')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('MENU', { fontSize: 12, fontWeight: 400, color: '#999999', letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('メニュー・料金', { fontSize: 28, fontWeight: 300, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('MenuGrid', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('MenuRow1', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            menuCard('カット', [{ name: 'カット', price: '¥6,600' }, { name: 'カット＋シャンプーブロー', price: '¥7,700' }, { name: '前髪カット', price: '¥1,100' }]),
            menuCard('カラー', [{ name: 'ワンカラー', price: '¥8,800〜' }, { name: 'ハイライト', price: '¥11,000〜' }, { name: 'グラデーション', price: '¥13,200〜' }]),
          ],
        }),
        frame('MenuRow2', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            menuCard('パーマ', [{ name: 'デジタルパーマ', price: '¥13,200〜' }, { name: 'コールドパーマ', price: '¥9,900〜' }, { name: '縮毛矯正', price: '¥16,500〜' }]),
            menuCard('トリートメント', [{ name: 'ベーシックトリートメント', price: '¥3,300' }, { name: 'プレミアムトリートメント', price: '¥5,500' }, { name: 'ヘッドスパ', price: '¥4,400' }]),
          ],
        }),
      ],
    }),
  ],
});

function stylistCard(name: string, role: string, desc: string) {
  return frame(`Stylist: ${name}`, {
    autoLayout: vertical({ spacing: 20, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('Photo', {
        size: { x: 200, y: 240 },
        fills: [gradient([{ hex: warmBg, position: 0 }, { hex: warmDark, position: 1 }], 135)],
        cornerRadius: 4,
      }),
      text(role, { fontSize: 12, fontWeight: 400, color: '#999999', letterSpacing: { value: 1, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      text(name, { fontSize: 18, fontWeight: 500, color: dark, textAlignHorizontal: 'CENTER' }),
      text(desc, {
        fontSize: 13, fontWeight: 400, color: '#888888',
        lineHeight: { value: 160, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 260 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const stylistSection = frame('StylistSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('STYLIST', { fontSize: 12, fontWeight: 400, color: '#999999', letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('スタイリスト', { fontSize: 28, fontWeight: 300, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('StylistGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        stylistCard('佐藤 美紀', 'オーナースタイリスト', 'キャリア15年。ナチュラルで再現性の高いスタイルが得意。'),
        stylistCard('田中 隆', 'トップスタイリスト', 'メンズカットに定評あり。骨格に合わせた似合わせカットが人気。'),
        stylistCard('鈴木 あい', 'カラーリスト', '透明感のあるカラーリングが得意。イルミナカラー認定スタイリスト。'),
      ],
    }),
  ],
});

const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid(dark)],
  children: [
    text('ご予約・お問い合わせ', { fontSize: 28, fontWeight: 300, color: '#ffffff', letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('初めての方はカウンセリング付きカットがおすすめです', { fontSize: 14, fontWeight: 400, color: '#999999', textAlignHorizontal: 'CENTER' }),
    frame('CTAActions', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('BookBtn', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          children: [text('ホットペッパーで予約', { fontSize: 14, fontWeight: 500, color: dark, letterSpacing: { value: 1, unit: 'PIXELS' } })],
        }),
        frame('PhoneBtn', {
          autoLayout: horizontal({ padX: 32, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex('#555555'), weight: 1, align: 'INSIDE' }],
          children: [text('☎ 03-1234-5678', { fontSize: 14, fontWeight: 500, color: '#ffffff' })],
        }),
      ],
    }),
  ],
});

const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid('#111111')],
  children: [
    text('TSUBAKI Hair', { fontSize: 18, fontWeight: 300, color: '#ffffff', letterSpacing: { value: 4, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('〒150-0001 東京都渋谷区神宮前4-5-6 表参道ビル3F', { fontSize: 12, fontWeight: 400, color: '#777777', textAlignHorizontal: 'CENTER' }),
    text('営業時間：10:00〜20:00（最終受付 19:00）/ 定休日：毎週火曜日', { fontSize: 12, fontWeight: 400, color: '#777777', textAlignHorizontal: 'CENTER' }),
    text('© 2026 TSUBAKI Hair. All rights reserved.', { fontSize: 11, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER' }),
  ],
});

export default frame('JapaneseHairSalonLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [navBar, heroSection, conceptSection, menuSection, stylistSection, ctaSection, footerSection],
});
