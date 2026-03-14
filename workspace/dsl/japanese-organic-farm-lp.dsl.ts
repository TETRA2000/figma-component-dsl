import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const green = '#15803d';
const darkGreen = '#0d5227';
const brown = '#78350f';
const cream = '#fefce8';
const white = '#ffffff';
const gray = '#6b7280';
const lightGreen = '#dcfce7';
const earthBg = '#faf5ef';

// ─── NavBar ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  strokes: [{ color: hex('#15803d1F'), weight: 1, align: 'INSIDE' }],
  children: [
    text('農園 大地', { fontSize: 22, fontWeight: 900, color: green, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('私たちの想い', { fontSize: 14, fontWeight: 500, color: gray }),
        text('旬の野菜', { fontSize: 14, fontWeight: 500, color: gray }),
        text('定期便', { fontSize: 14, fontWeight: 500, color: gray }),
        text('農園見学', { fontSize: 14, fontWeight: 500, color: gray }),
        text('ご注文', { fontSize: 14, fontWeight: 500, color: gray }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(green)],
      cornerRadius: 24,
      children: [
        text('ご注文はこちら', { fontSize: 13, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 680 },
  autoLayout: vertical({ spacing: 20, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#dcfce7', position: 0 }, { hex: '#fefce8', position: 0.5 }, { hex: earthBg, position: 1 }], 160)],
  children: [
    text('NOUEN DAICHI', {
      fontSize: 13, fontWeight: 600, color: green,
      letterSpacing: { value: 6, unit: 'PIXELS' },
    }),
    text('畑から食卓へ', {
      fontSize: 64, fontWeight: 900, color: brown,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('大地の力を信じ、自然と共に育てた有機野菜をご家庭へ。\n農薬・化学肥料を一切使わない、安心の野菜づくりを続けています。', {
      fontSize: 17, fontWeight: 400, color: '#5c6b52',
      lineHeight: { value: 190, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroBtnGroup', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        frame('HeroBtnPrimary', {
          autoLayout: horizontal({ padX: 48, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(green)],
          cornerRadius: 32,
          children: [
            text('旬の野菜を注文する', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('HeroBtnSecondary', {
          autoLayout: horizontal({ padX: 40, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex(green), weight: 2, align: 'INSIDE' }],
          cornerRadius: 32,
          children: [
            text('農園について知る', { fontSize: 16, fontWeight: 600, color: green }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Philosophy Section ───
function philosophyCard(title: string, description: string) {
  return frame(`Philosophy: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 44, counterAlign: 'CENTER' }),
    fills: [solid(white)],
    strokes: [{ color: hex('#15803d1A'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('PhilosophyIcon', {
        size: { x: 60, y: 60 },
        fills: [solid(lightGreen)],
        cornerRadius: 30,
      }),
      text(title, { fontSize: 20, fontWeight: 700, color: brown, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: gray,
        lineHeight: { value: 190, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 300 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const philosophySection = frame('PhilosophySection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(earthBg)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('PHILOSOPHY', { fontSize: 12, fontWeight: 600, color: green, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('私たちの想い', { fontSize: 34, fontWeight: 800, color: brown, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('PhilosophyGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        philosophyCard('土づくりから始める', '健康な土壌が健康な野菜を育てる。堆肥と微生物の力を活かした土づくりに30年以上取り組んでいます。'),
        philosophyCard('農薬・化学肥料ゼロ', '自然のサイクルを尊重し、農薬や化学肥料は一切使用しません。虫や草と共存する農業を実践しています。'),
        philosophyCard('旬を届ける', '季節の恵みを最もおいしいタイミングで収穫。朝採れ野菜をその日のうちに出荷します。'),
      ],
    }),
  ],
});

// ─── Seasonal Vegetables Section ───
function vegetableCard(name: string, season: string, description: string) {
  return frame(`Vegetable: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid(white)],
    cornerRadius: 16,
    strokes: [{ color: hex('#15803d14'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('VegetableImage', {
        size: { x: 260, y: 200 },
        fills: [gradient([{ hex: '#86efac', position: 0 }, { hex: '#22c55e', position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame('VegetableInfo', {
        autoLayout: vertical({ spacing: 8, padX: 24, padY: 24 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(season, { fontSize: 12, fontWeight: 600, color: green, letterSpacing: { value: 1, unit: 'PIXELS' } }),
          text(name, { fontSize: 18, fontWeight: 700, color: brown }),
          text(description, {
            fontSize: 13, fontWeight: 400, color: gray,
            lineHeight: { value: 180, unit: 'PERCENT' },
            size: { x: 220 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
    ],
  });
}

const vegetablesSection = frame('VegetablesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('SEASONAL', { fontSize: 12, fontWeight: 600, color: green, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('旬の野菜たち', { fontSize: 34, fontWeight: 800, color: brown, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('VegetablesGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        vegetableCard('有機トマト', '夏野菜', '太陽をたっぷり浴びた完熟トマト。糖度が高く、そのまま食べても絶品です。'),
        vegetableCard('無農薬ほうれん草', '冬野菜', '霜に当てて甘みを引き出した冬の逸品。えぐみが少なく、子どもにも人気。'),
        vegetableCard('新じゃがいも', '春野菜', '掘りたての新じゃが。ホクホクの食感と、皮ごと食べられる新鮮さが自慢です。'),
        vegetableCard('秋茄子', '秋野菜', '秋の涼しい気候で実が引き締まった茄子。焼き茄子や煮浸しに最適です。'),
      ],
    }),
  ],
});

// ─── Subscription Plans Section ───
function planCard(name: string, price: string, description: string, items: string, isPopular: boolean) {
  return frame(`Plan: ${name}`, {
    autoLayout: vertical({ spacing: 16, padX: 36, padY: 44, counterAlign: 'CENTER' }),
    fills: [solid(isPopular ? green : white)],
    strokes: isPopular ? [] : [{ color: hex('#15803d20'), weight: 2, align: 'INSIDE' }],
    cornerRadius: 20,
    layoutSizingHorizontal: 'FILL',
    children: [
      ...(isPopular
        ? [text('一番人気', { fontSize: 12, fontWeight: 700, color: '#86efac', letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' })]
        : []),
      text(name, { fontSize: 22, fontWeight: 800, color: isPopular ? white : brown, textAlignHorizontal: 'CENTER' }),
      text(price, { fontSize: 36, fontWeight: 900, color: isPopular ? white : green, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: isPopular ? '#bbf7d0' : gray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
      rectangle('PlanDivider', {
        size: { x: 200, y: 1 },
        fills: [solid(isPopular ? '#ffffff33' : '#15803d20')],
      }),
      text(items, {
        fontSize: 13, fontWeight: 500, color: isPopular ? '#dcfce7' : '#4b5563',
        lineHeight: { value: 200, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 260 },
        textAutoResize: 'HEIGHT',
      }),
      frame(`PlanBtn: ${name}`, {
        autoLayout: horizontal({ padX: 40, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: isPopular ? [solid(white)] : [solid(green)],
        cornerRadius: 28,
        children: [
          text('このプランを選ぶ', { fontSize: 14, fontWeight: 700, color: isPopular ? green : white }),
        ],
      }),
    ],
  });
}

const subscriptionSection = frame('SubscriptionSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('SUBSCRIPTION', { fontSize: 12, fontWeight: 600, color: green, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('定期便プラン', { fontSize: 34, fontWeight: 800, color: brown, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('PlansGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        planCard('お試しBOX', '¥2,480/月', '初めての方におすすめ。旬の野菜を少量ずつお届けします。', '旬の野菜 5品目\n送料無料\nいつでも解約OK', false),
        planCard('ファミリーBOX', '¥4,980/月', '家族の食卓に。たっぷりの有機野菜で毎日の食事を豊かに。', '旬の野菜 10品目\n送料無料\nレシピカード付き\nいつでも解約OK', true),
        planCard('プレミアムBOX', '¥7,980/月', '食にこだわる方へ。希少品種や加工品もセットでお届け。', '旬の野菜 12品目\n希少品種 2品目\n自家製加工品 1品\n送料無料', false),
      ],
    }),
  ],
});

// ─── Farm Visit Section ───
const farmVisitSection = frame('FarmVisitSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    rectangle('FarmVisitImage', {
      size: { x: 480, y: 400 },
      fills: [gradient([{ hex: '#86efac', position: 0 }, { hex: green, position: 1 }], 135)],
      cornerRadius: 20,
    }),
    frame('FarmVisitContent', {
      autoLayout: vertical({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('FARM VISIT', { fontSize: 12, fontWeight: 600, color: green, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('農園見学のご案内', { fontSize: 30, fontWeight: 800, color: brown, lineHeight: { value: 150, unit: 'PERCENT' } }),
        text('実際の畑を見て、土に触れ、採れたての野菜を味わう。農園見学では、私たちの農業への想いを直接お伝えします。お子様の食育にもおすすめです。', {
          fontSize: 15, fontWeight: 400, color: gray,
          lineHeight: { value: 190, unit: 'PERCENT' },
          size: { x: 440 },
          textAutoResize: 'HEIGHT',
        }),
        text('開催日: 毎月第2・第4土曜日\n時間: 10:00 - 12:00\n参加費: 大人 1,500円 / 子ども 500円\n場所: 千葉県南房総市 農園大地', {
          fontSize: 14, fontWeight: 500, color: '#4b5563',
          lineHeight: { value: 200, unit: 'PERCENT' },
          size: { x: 440 },
          textAutoResize: 'HEIGHT',
        }),
        frame('FarmVisitBtn', {
          autoLayout: horizontal({ padX: 36, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(green)],
          cornerRadius: 28,
          children: [
            text('見学を予約する', { fontSize: 15, fontWeight: 700, color: white }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Order CTA Section ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 20, padX: 120, padY: 120, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: lightGreen, position: 0 }, { hex: '#d1fae5', position: 1 }], 160)],
  children: [
    text('大地の恵みを、あなたの食卓へ', {
      fontSize: 38, fontWeight: 900, color: brown,
      letterSpacing: { value: 2, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('初回限定・送料無料のお試しBOXで、\n農園大地の有機野菜をお試しください。', {
      fontSize: 16, fontWeight: 400, color: '#5c6b52',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 480 },
      textAutoResize: 'HEIGHT',
    }),
    frame('CtaBtn', {
      autoLayout: horizontal({ padX: 64, padY: 20, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(green)],
      cornerRadius: 32,
      children: [
        text('お試しBOXを注文する', { fontSize: 18, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    text('※ 定期便ではありません。1回限りのお試しです', { fontSize: 12, fontWeight: 400, color: '#888888', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Footer ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid(brown)],
  children: [
    text('農園 大地 NOUEN DAICHI', { fontSize: 20, fontWeight: 900, color: '#fde68a', letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('私たちの想い', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('旬の野菜', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('定期便', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('農園見学', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('よくある質問', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#ffffff1F')],
    }),
    text('© 2026 農園 大地 All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#ffffff66', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseOrganicFarmLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    navBar,
    heroSection,
    philosophySection,
    vegetablesSection,
    subscriptionSection,
    farmVisitSection,
    ctaSection,
    footerSection,
  ],
});
