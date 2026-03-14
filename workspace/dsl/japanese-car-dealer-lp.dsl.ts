import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const red = '#b91c1c';
const darkRed = '#991b1b';
const darkBg = '#1c1917';
const darkest = '#0c0a09';
const lightBg = '#fafafa';
const white = '#ffffff';

// ─── Navigation ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 64 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(darkBg)],
  children: [
    text('AutoPrime / オートプライム', { fontSize: 22, fontWeight: 900, color: red, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('車両一覧', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
        text('選ばれる理由', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
        text('ショールーム', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
        text('試乗予約', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 620 },
  autoLayout: vertical({ spacing: 24, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: darkBg, position: 0 }, { hex: darkest, position: 1 }], 135)],
  children: [
    frame('HeroLabel', {
      autoLayout: horizontal({ padX: 24, padY: 8 }),
      strokes: [{ color: hex('#b91c1c66'), weight: 1, align: 'INSIDE' }],
      children: [
        text('AUTOPRIME JAPAN', { fontSize: 13, fontWeight: 600, color: red, letterSpacing: { value: 5, unit: 'PIXELS' } }),
      ],
    }),
    text('最高の一台を\n見つけよう', {
      fontSize: 54, fontWeight: 900, color: white,
      lineHeight: { value: 130, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    text('厳選された上質な車両と確かな品質保証で\nあなたの理想のカーライフを実現します', {
      fontSize: 16, fontWeight: 400, color: '#ffffffA6',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroCTA', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(red)],
      children: [
        text('試乗予約はこちら', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Featured Cars ───
function carCard(name: string, year: string, mileage: string, price: string, tag?: string) {
  const tagNodes = tag
    ? [frame('CarTag', {
        autoLayout: horizontal({ padX: 14, padY: 4 }),
        fills: [solid(red)],
        cornerRadius: 2,
        children: [text(tag, { fontSize: 11, fontWeight: 700, color: white })],
      })]
    : [];

  return frame(`Car: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    cornerRadius: 8,
    clipContent: true,
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    strokes: [{ color: hex('#e5e5e5'), weight: 1, align: 'INSIDE' }],
    children: [
      frame('CarImgArea', {
        size: { x: undefined, y: 200 },
        autoLayout: horizontal({ padX: 12, padY: 12 }),
        fills: [gradient([{ hex: '#292524', position: 0 }, { hex: darkBg, position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
        children: tagNodes,
      }),
      frame('CarInfo', {
        autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 18, fontWeight: 700, color: '#1a1a1a' }),
          frame('CarSpecs', {
            autoLayout: horizontal({ spacing: 16 }),
            children: [
              text(`年式: ${year}`, { fontSize: 13, fontWeight: 500, color: '#888888' }),
              text(`走行: ${mileage}`, { fontSize: 13, fontWeight: 500, color: '#888888' }),
            ],
          }),
          text(price, { fontSize: 24, fontWeight: 900, color: red }),
        ],
      }),
    ],
  });
}

const featuredSection = frame('FeaturedSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(lightBg)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('FEATURED', { fontSize: 13, fontWeight: 600, color: red, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('注目の車両', { fontSize: 32, fontWeight: 800, color: '#1a1a1a', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('CarGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        carCard('レクサス RX 450h', '2024年', '1.2万km', '¥6,980,000', '新着'),
        carCard('トヨタ クラウン クロスオーバー', '2023年', '2.5万km', '¥5,280,000'),
        carCard('日産 GT-R NISMO', '2024年', '0.3万km', '¥24,800,000', '希少'),
      ],
    }),
  ],
});

// ─── Why Choose Us ───
function featureItem(number: string, title: string, description: string) {
  return frame(`Feature: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 32, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(number, { fontSize: 40, fontWeight: 900, color: red, opacity: 0.35 }),
      text(title, { fontSize: 18, fontWeight: 700, color: white, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#ffffff99',
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 220 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const whyUsSection = frame('WhyUsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(darkBg)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('WHY CHOOSE US', { fontSize: 13, fontWeight: 600, color: red, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('選ばれる理由', { fontSize: 32, fontWeight: 800, color: white, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('FeatureGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        featureItem('01', '全車保証付き', 'すべての車両に最長3年の保証を付帯。安心のカーライフをサポートします。'),
        featureItem('02', '厳格な品質基準', '200項目以上の点検をクリアした車両のみを厳選して取り揃えております。'),
        featureItem('03', '適正価格', '市場データに基づく透明な価格設定。駆け引きなしの安心価格でご提供。'),
        featureItem('04', 'アフターサポート', 'ご購入後も専任スタッフが車検・整備・保険まで一貫してサポート。'),
      ],
    }),
  ],
});

// ─── Showroom Section ───
const showroomSection = frame('ShowroomSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('SHOWROOM', { fontSize: 13, fontWeight: 600, color: red, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('ショールーム情報', { fontSize: 32, fontWeight: 800, color: '#1a1a1a', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('ShowroomContent', {
      autoLayout: horizontal({ spacing: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('MapPlaceholder', {
          size: { x: undefined, y: 300 },
          autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#f0f0f0')],
          cornerRadius: 8,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('MAP', { fontSize: 24, fontWeight: 700, color: '#bbbbbb', letterSpacing: { value: 4, unit: 'PIXELS' } }),
          ],
        }),
        frame('ShowroomInfo', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            ...([
              ['住所', '東京都港区南青山3-4-5 オートプライムビル1F'],
              ['電話', '03-9876-5432'],
              ['営業時間', '10:00〜19:00'],
              ['定休日', '毎週水曜日'],
              ['展示台数', '常時50台以上'],
            ] as const).map(([label, value]) =>
              frame(`Row: ${label}`, {
                autoLayout: horizontal({ spacing: 0, padY: 16, counterAlign: 'CENTER' }),
                layoutSizingHorizontal: 'FILL',
                strokes: [{ color: hex('#e5e5e5'), weight: 1, align: 'INSIDE' }],
                children: [
                  text(label, { fontSize: 14, fontWeight: 600, color: red, size: { x: 100 }, textAutoResize: 'HEIGHT' }),
                  text(value, { fontSize: 14, fontWeight: 400, color: '#555555' }),
                ],
              })
            ),
          ],
        }),
      ],
    }),
  ],
});

// ─── CTA Section ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 420, padY: 80, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: red, position: 0 }, { hex: darkRed, position: 1 }], 135)],
  children: [
    text('試乗予約', { fontSize: 36, fontWeight: 900, color: white, textAlignHorizontal: 'CENTER' }),
    text('お気軽にご来店・ご試乗ください。\n専任スタッフが最適な一台をご提案いたします。', {
      fontSize: 16, fontWeight: 400, color: '#ffffffD9',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('CTABtn', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(white)],
      children: [
        text('無料試乗を予約する', { fontSize: 16, fontWeight: 700, color: red, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Footer ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 12, padX: 120, padY: 32, counterAlign: 'CENTER' }),
  fills: [solid(darkest)],
  children: [
    text('AutoPrime / オートプライム', { fontSize: 18, fontWeight: 900, color: red, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('© 2026 AutoPrime All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseCarDealerLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    navBar,
    heroSection,
    featuredSection,
    whyUsSection,
    showroomSection,
    ctaSection,
    footerSection,
  ],
});
