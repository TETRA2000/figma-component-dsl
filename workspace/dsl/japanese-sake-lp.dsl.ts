import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const indigo = '#1e1b4b';
const gold = '#d4a574';
const deepIndigo = '#120f3a';
const darkIndigo = '#15123d';
const lightIndigo = '#2a2660';
const cream = '#f5f0e8';

// ─── Navigation ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 64 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(deepIndigo)],
  children: [
    text('酒蔵 月光 GEKKOU', { fontSize: 22, fontWeight: 900, color: gold, letterSpacing: { value: 3, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('銘酒', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
        text('醸造', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
        text('蔵見学', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
        text('オンラインショップ', { fontSize: 14, fontWeight: 500, color: gold }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 640 },
  autoLayout: vertical({ spacing: 24, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: indigo, position: 0 }, { hex: '#0f0d2e', position: 1 }], 180)],
  children: [
    frame('HeroLabel', {
      autoLayout: horizontal({ padX: 24, padY: 8 }),
      strokes: [{ color: hex('#d4a5744D'), weight: 1, align: 'INSIDE' }],
      children: [
        text('SINCE 1842', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 6, unit: 'PIXELS' } }),
      ],
    }),
    text('伝統と革新の、\n一滴', {
      fontSize: 56, fontWeight: 900, color: '#ffffff',
      lineHeight: { value: 130, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    text('百八十年の歴史が紡ぐ\n月光のもとで醸される至高の日本酒', {
      fontSize: 16, fontWeight: 400, color: '#ffffffB3',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroCTA', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(gold)],
      children: [
        text('オンラインショップへ', { fontSize: 16, fontWeight: 700, color: indigo, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Sake Lineup Section ───
function sakeCard(name: string, nameEn: string, type: string, description: string, price: string) {
  return frame(`Sake: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 4,
    clipContent: true,
    children: [
      frame('SakeImage', {
        size: { x: undefined, y: 280 },
        autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [gradient([{ hex: lightIndigo, position: 0 }, { hex: darkIndigo, position: 1 }], 180)],
        layoutSizingHorizontal: 'FILL',
        children: [
          text('BOTTLE', { fontSize: 16, fontWeight: 700, color: '#3a3670', letterSpacing: { value: 4, unit: 'PIXELS' } }),
        ],
      }),
      frame('SakeInfo', {
        autoLayout: vertical({ spacing: 8, padX: 20, padY: 24 }),
        fills: [solid(darkIndigo)],
        layoutSizingHorizontal: 'FILL',
        children: [
          text(nameEn, { fontSize: 11, fontWeight: 600, color: gold, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          text(name, { fontSize: 20, fontWeight: 800, color: '#ffffff' }),
          text(type, { fontSize: 12, fontWeight: 500, color: '#8888cc' }),
          rectangle('Divider', { size: { x: 30, y: 2 }, fills: [solid(gold)] }),
          text(description, {
            fontSize: 13, fontWeight: 400, color: '#aaaacc',
            lineHeight: { value: 170, unit: 'PERCENT' },
            size: { x: 240 },
            textAutoResize: 'HEIGHT',
          }),
          text(price, { fontSize: 20, fontWeight: 800, color: gold }),
        ],
      }),
    ],
  });
}

const sakeSection = frame('SakeSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(indigo)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('LINEUP', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('銘酒ラインナップ', { fontSize: 32, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('SakeGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        sakeCard('月光 大吟醸', 'GEKKOU DAIGINJO', '大吟醸 / 精米歩合35%', '月光の名を冠するフラッグシップ。華やかな吟醸香と透明感のある味わいが特徴。冷やしてワイングラスでお楽しみください。', '¥5,500'),
        sakeCard('月影 純米吟醸', 'TSUKIKAGE JUNMAI', '純米吟醸 / 精米歩合50%', '穏やかな香りとまろやかな口当たり。料理との相性が抜群で、和食はもちろん洋食にも合う万能な一本。', '¥3,300'),
        sakeCard('銀河 特別純米', 'GINGA TOKUBETSU', '特別純米 / 精米歩合60%', '米の旨味をしっかり感じられる辛口タイプ。燗にしても冷やしても美味しい、日常に寄り添う定番酒。', '¥2,200'),
        sakeCard('雫 スパークリング', 'SHIZUKU SPARKLING', 'スパークリング / 微発泡', '瓶内二次発酵による自然な泡立ち。フルーティーで軽やかな味わいは日本酒初心者にもおすすめ。', '¥2,800'),
      ],
    }),
  ],
});

// ─── Brewing Process Section ───
function processStep(number: string, title: string, description: string) {
  return frame(`Step: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid(indigo)],
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 4,
    children: [
      text(number, { fontSize: 48, fontWeight: 900, color: gold, opacity: 0.3 }),
      text(title, { fontSize: 22, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
      rectangle('Divider', { size: { x: 40, y: 2 }, fills: [solid(gold)] }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#aaaacc',
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 220 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const processSection = frame('ProcessSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(deepIndigo)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('PROCESS', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('醸造工程', { fontSize: 32, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('ProcessGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        processStep('01', '精米・洗米', '厳選した酒米を丁寧に磨き上げ、清冽な湧水で洗米。米の中心にある心白を活かすため、時間をかけて精米します。'),
        processStep('02', '麹づくり', '蒸した米に麹菌を振りかけ、約48時間かけて麹を育てます。温度と湿度を職人が五感で管理する最重要工程。'),
        processStep('03', '仕込み・発酵', '麹、蒸米、水を三段階に分けて仕込み。低温でゆっくりと発酵させることで、繊細な香りと味わいを引き出します。'),
        processStep('04', '搾り・熟成', '醪を丁寧に搾り、新酒を得ます。その後、蔵内の冷暗所でじっくりと熟成。時間が生み出す深い味わいをお届けします。'),
      ],
    }),
  ],
});

// ─── Brewery Tour Section ───
const tourSection = frame('TourSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(indigo)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('BREWERY TOUR', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('蔵見学のご案内', { fontSize: 32, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('TourContent', {
      autoLayout: horizontal({ spacing: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('TourImage', {
          size: { x: undefined, y: 300 },
          autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [gradient([{ hex: lightIndigo, position: 0 }, { hex: darkIndigo, position: 1 }], 135)],
          cornerRadius: 8,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('BREWERY', { fontSize: 24, fontWeight: 700, color: '#3a3670', letterSpacing: { value: 4, unit: 'PIXELS' } }),
          ],
        }),
        frame('TourInfo', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            ...([
              ['開催日', '毎週土曜・日曜 10:00 / 14:00'],
              ['所要時間', '約90分（試飲含む）'],
              ['料金', 'お一人様 ¥2,000（試飲3種付き）'],
              ['定員', '各回10名様まで'],
              ['住所', '新潟県南魚沼市月光町1-2-3'],
            ] as const).map(([label, value]) =>
              frame(`Row: ${label}`, {
                autoLayout: horizontal({ spacing: 0, padY: 16, counterAlign: 'CENTER' }),
                layoutSizingHorizontal: 'FILL',
                strokes: [{ color: hex('#333366'), weight: 1, align: 'INSIDE' }],
                children: [
                  text(label, { fontSize: 14, fontWeight: 600, color: gold, size: { x: 100 }, textAutoResize: 'HEIGHT' }),
                  text(value, { fontSize: 14, fontWeight: 400, color: '#ccccdd' }),
                ],
              })
            ),
          ],
        }),
      ],
    }),
  ],
});

// ─── Online Shop CTA Section ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: 360 },
  autoLayout: vertical({ spacing: 24, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: darkIndigo, position: 0 }, { hex: indigo, position: 0.5 }, { hex: darkIndigo, position: 1 }], 135)],
  children: [
    text('ONLINE SHOP', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 6, unit: 'PIXELS' } }),
    text('月光の酒をご自宅で', { fontSize: 36, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('全国送料無料でお届けいたします\nギフト包装・のし対応も承ります', {
      fontSize: 16, fontWeight: 400, color: '#ffffffB3',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('CTAButton', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(gold)],
      children: [
        text('オンラインショップへ', { fontSize: 16, fontWeight: 700, color: indigo, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Footer ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 12, padX: 120, padY: 32, counterAlign: 'CENTER' }),
  fills: [solid('#0a0825')],
  children: [
    text('酒蔵 月光 GEKKOU', { fontSize: 18, fontWeight: 900, color: gold, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('© 2026 酒蔵月光 All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#555577', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseSakeLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(indigo)],
  children: [
    navBar,
    heroSection,
    sakeSection,
    processSection,
    tourSection,
    ctaSection,
    footerSection,
  ],
});
