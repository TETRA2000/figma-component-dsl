import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const red = '#e63946';
const dark = '#0a0a0a';
const cardBg = '#141414';
const trainerBg = '#111111';
const white = '#ffffff';
const gray = '#888888';
const mutedGray = '#666666';

// ─── NavBar ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(dark)],
  strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
  children: [
    text('BEAST GYM', { fontSize: 22, fontWeight: 900, color: red, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('コンセプト', { fontSize: 14, fontWeight: 500, color: '#aaaaaa' }),
        text('トレーナー', { fontSize: 14, fontWeight: 500, color: '#aaaaaa' }),
        text('料金プラン', { fontSize: 14, fontWeight: 500, color: '#aaaaaa' }),
        text('お客様の声', { fontSize: 14, fontWeight: 500, color: '#aaaaaa' }),
        text('アクセス', { fontSize: 14, fontWeight: 500, color: '#aaaaaa' }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(red)],
      children: [
        text('無料体験', { fontSize: 13, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 700 },
  autoLayout: vertical({ spacing: 28, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#1a0a0a', position: 0 }, { hex: dark, position: 0.5 }, { hex: '#0d0d0d', position: 1 }], 160)],
  children: [
    text('PERSONAL TRAINING GYM', {
      fontSize: 13, fontWeight: 600, color: red,
      letterSpacing: { value: 6, unit: 'PIXELS' },
    }),
    text('理想のカラダへ', {
      fontSize: 72, fontWeight: 900, color: white,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('科学的根拠に基づいたトレーニングと食事管理で\nあなたの限界を超える。結果にコミットする完全個室ジム。', {
      fontSize: 18, fontWeight: 400, color: '#ffffff99',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroBtnGroup', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        frame('HeroBtnPrimary', {
          autoLayout: horizontal({ padX: 56, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(red)],
          children: [
            text('無料カウンセリング予約', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('HeroBtnSecondary', {
          autoLayout: horizontal({ padX: 40, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex('#ffffff4D'), weight: 1, align: 'INSIDE' }],
          children: [
            text('詳しく見る', { fontSize: 16, fontWeight: 500, color: white }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Features Section ───
function featureCard(num: string, title: string, description: string) {
  return frame(`Feature: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 48, counterAlign: 'CENTER' }),
    fills: [solid(cardBg)],
    strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('FeatureIcon', {
        size: { x: 56, y: 56 },
        fills: [solid(red)],
      }),
      text(title, { fontSize: 20, fontWeight: 800, color: white, textAlignHorizontal: 'CENTER' }),
      rectangle('Divider', { size: { x: 40, y: 2 }, fills: [solid(red)] }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: gray,
        lineHeight: { value: 190, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const featuresSection = frame('FeaturesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(dark)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('WHY CHOOSE US', { fontSize: 12, fontWeight: 600, color: red, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('選ばれる3つの理由', { fontSize: 36, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('FeaturesGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        featureCard('01', '完全マンツーマン指導', '経験豊富なトレーナーがあなた専属で担当。一人ひとりの体質・目標に合わせた完全オーダーメイドのプログラムを提供します。'),
        featureCard('02', '科学的トレーニング', '最新のスポーツ科学に基づいたメソッドを採用。InBodyによる体組成分析で効果を数値で可視化し、最短ルートで結果を出します。'),
        featureCard('03', '食事管理サポート', '管理栄養士監修の食事プランを毎日LINEでアドバイス。無理な食事制限はなし。一生続けられる食習慣を身につけます。'),
      ],
    }),
  ],
});

// ─── Trainers Section ───
function trainerCard(name: string, role: string, bio: string) {
  return frame(`Trainer: ${name}`, {
    autoLayout: vertical({ spacing: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('TrainerPhoto', {
        size: { x: 200, y: 200 },
        fills: [gradient([{ hex: red, position: 0 }, { hex: '#b02a35', position: 1 }], 135)],
      }),
      rectangle('Spacer', { size: { x: 1, y: 8 }, opacity: 0 }),
      text(name, { fontSize: 22, fontWeight: 800, color: white, textAlignHorizontal: 'CENTER' }),
      text(role, { fontSize: 13, fontWeight: 600, color: red, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      text(bio, {
        fontSize: 14, fontWeight: 400, color: gray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const trainersSection = frame('TrainersSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(trainerBg)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('TRAINERS', { fontSize: 12, fontWeight: 600, color: red, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('トレーナー紹介', { fontSize: 36, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('TrainersGrid', {
      autoLayout: horizontal({ spacing: 36 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        trainerCard('田中 翔太', 'HEAD TRAINER', 'NSCA-CSCS認定。ボディビル大会優勝経験あり。延べ3,000名以上の指導実績。筋肥大・ダイエット両方に精通。'),
        trainerCard('佐藤 美咲', 'DIET SPECIALIST', '管理栄養士・NESTA-PFT取得。女性特有の悩みに寄り添い、美しいボディラインを作るプログラムが人気。'),
        trainerCard('山本 健一', 'STRENGTH COACH', '元プロアスリート。JATI-ATI認定。パワーリフティング指導のスペシャリスト。初心者から上級者まで対応。'),
      ],
    }),
  ],
});

// ─── Pricing Section ───
function priceCard(plan: string, price: string, features: string[], popular?: boolean) {
  const featureNodes = features.map((f) =>
    frame(`PlanFeature: ${f.substring(0, 20)}`, {
      autoLayout: horizontal({ padY: 10 }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex('#ffffff0A'), weight: 1, align: 'INSIDE' }],
      children: [
        text(f, { fontSize: 14, fontWeight: 400, color: '#aaaaaa', textAlignHorizontal: 'CENTER', layoutSizingHorizontal: 'FILL' }),
      ],
    })
  );

  const borderStroke = popular
    ? [{ color: hex(red), weight: 2, align: 'INSIDE' as const }]
    : [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' as const }];

  const popularBadge = popular
    ? [frame('PopularBadge', {
        autoLayout: horizontal({ padX: 20, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(red)],
        children: [
          text('人気 No.1', { fontSize: 11, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
        ],
      })]
    : [];

  return frame(`PriceCard: ${plan}`, {
    autoLayout: vertical({ spacing: 0, padX: 32, padY: 48, counterAlign: 'CENTER' }),
    fills: [solid(cardBg)],
    strokes: borderStroke,
    layoutSizingHorizontal: 'FILL',
    children: [
      ...popularBadge,
      text(plan, { fontSize: 18, fontWeight: 700, color: gray, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      rectangle('PriceSpacer', { size: { x: 1, y: 20 }, opacity: 0 }),
      text(price, { fontSize: 48, fontWeight: 900, color: white, textAlignHorizontal: 'CENTER' }),
      text('/月', { fontSize: 16, fontWeight: 500, color: mutedGray, textAlignHorizontal: 'CENTER' }),
      rectangle('PlanDivider', { size: { x: 200, y: 1 }, fills: [solid('#ffffff0F')] }),
      rectangle('DividerSpacer', { size: { x: 1, y: 12 }, opacity: 0 }),
      ...featureNodes,
      rectangle('BtnSpacer', { size: { x: 1, y: 16 }, opacity: 0 }),
      frame('PlanBtn', {
        autoLayout: horizontal({ padX: 32, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: popular ? [solid(red)] : [],
        strokes: popular ? [] : [{ color: hex('#ffffff33'), weight: 1, align: 'INSIDE' }],
        layoutSizingHorizontal: 'FILL',
        children: [
          text(popular ? '今すぐ申し込む' : '詳細を見る', {
            fontSize: 14, fontWeight: 700, color: white,
            letterSpacing: { value: 2, unit: 'PIXELS' },
            textAlignHorizontal: 'CENTER',
          }),
        ],
      }),
    ],
  });
}

const pricingSection = frame('PricingSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(dark)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('PRICING', { fontSize: 12, fontWeight: 600, color: red, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('料金プラン', { fontSize: 36, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('PricingGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        priceCard('LIGHT', '¥29,800', [
          '月4回パーソナルトレーニング',
          '1回50分',
          '食事アドバイス（週1回）',
          'ウェア・タオルレンタル',
          'プロテイン1杯無料',
        ]),
        priceCard('STANDARD', '¥49,800', [
          '月8回パーソナルトレーニング',
          '1回50分',
          '毎日LINE食事指導',
          'ウェア・タオルレンタル',
          'プロテイン飲み放題',
          'InBody測定月1回無料',
        ], true),
        priceCard('PREMIUM', '¥79,800', [
          '月12回パーソナルトレーニング',
          '1回80分',
          '毎日LINE食事指導',
          '全レンタル無料',
          'プロテイン飲み放題',
          'InBody測定無制限',
          '整体・ストレッチ月2回',
        ]),
      ],
    }),
  ],
});

// ─── Testimonials Section ───
function testimonialCard(result: string, body: string, meta: string) {
  return frame(`Testimonial: ${meta.substring(0, 20)}`, {
    autoLayout: horizontal({ spacing: 48, padX: 40, padY: 40 }),
    fills: [solid('#1a1a1a')],
    strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('BeforeAfter', {
        autoLayout: horizontal({ spacing: 16 }),
        children: [
          frame('BeforeBox', {
            autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              rectangle('BeforeImg', { size: { x: 140, y: 180 }, fills: [solid('#2a2a2a')], cornerRadius: 4 }),
              text('BEFORE', { fontSize: 11, fontWeight: 700, color: mutedGray, letterSpacing: { value: 2, unit: 'PIXELS' } }),
            ],
          }),
          frame('AfterBox', {
            autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              rectangle('AfterImg', {
                size: { x: 140, y: 180 },
                fills: [gradient([{ hex: red, position: 0 }, { hex: '#b02a35', position: 1 }], 135)],
                cornerRadius: 4,
              }),
              text('AFTER', { fontSize: 11, fontWeight: 700, color: red, letterSpacing: { value: 2, unit: 'PIXELS' } }),
            ],
          }),
        ],
      }),
      frame('TestimonialContent', {
        autoLayout: vertical({ spacing: 12 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(result, { fontSize: 14, fontWeight: 700, color: red, letterSpacing: { value: 1, unit: 'PIXELS' } }),
          text(body, {
            fontSize: 15, fontWeight: 400, color: '#cccccc',
            lineHeight: { value: 190, unit: 'PERCENT' },
            size: { x: 480 },
            textAutoResize: 'HEIGHT',
          }),
          text(meta, { fontSize: 13, fontWeight: 400, color: mutedGray }),
        ],
      }),
    ],
  });
}

const testimonialsSection = frame('TestimonialsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(trainerBg)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('VOICE', { fontSize: 12, fontWeight: 600, color: red, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('お客様の声', { fontSize: 36, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('TestimonialsGrid', {
      autoLayout: vertical({ spacing: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        testimonialCard(
          '3ヶ月で体重 -12kg / 体脂肪率 -8%',
          '仕事が忙しく運動習慣がなかった私でも、トレーナーさんの的確な指導で無理なく続けられました。食事制限もストレスなく、会社の健康診断でもすべてA判定に。人生が変わりました。',
          '30代男性・会社員 K.T 様（STANDARDプラン 3ヶ月）'
        ),
        testimonialCard(
          '2ヶ月でウエスト -10cm / 体重 -7kg',
          '産後太りが気になり入会。女性トレーナーの佐藤さんに担当していただき、安心してトレーニングに集中できました。姿勢も改善され、肩こりや腰痛もなくなりました。',
          '30代女性・主婦 M.S 様（STANDARDプラン 2ヶ月）'
        ),
      ],
    }),
  ],
});

// ─── CTA Section ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 120, padY: 120, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#1a0508', position: 0 }, { hex: dark, position: 1 }], 160)],
  children: [
    text('まずは無料体験から', {
      fontSize: 40, fontWeight: 900, color: white,
      letterSpacing: { value: 3, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('カウンセリング＋体験トレーニング60分が完全無料。\n強引な勧誘は一切ございません。お気軽にお申し込みください。', {
      fontSize: 16, fontWeight: 400, color: '#ffffff80',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    rectangle('CtaSpacer', { size: { x: 1, y: 16 }, opacity: 0 }),
    frame('CtaBtn', {
      autoLayout: horizontal({ padX: 72, padY: 20, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(red)],
      children: [
        text('無料体験を予約する', { fontSize: 18, fontWeight: 700, color: white, letterSpacing: { value: 3, unit: 'PIXELS' } }),
      ],
    }),
    text('※ 当日入会で入会金33,000円が無料', { fontSize: 12, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Footer Section ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid('#050505')],
  strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
  children: [
    text('BEAST GYM', { fontSize: 20, fontWeight: 900, color: red, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('コンセプト', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('トレーナー', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('料金プラン', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('お客様の声', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('よくある質問', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: mutedGray }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#ffffff0F')],
    }),
    text('© 2026 BEAST GYM All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#444444', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseFitnessLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(dark)],
  children: [
    navBar,
    heroSection,
    featuresSection,
    trainersSection,
    pricingSection,
    testimonialsSection,
    ctaSection,
    footerSection,
  ],
});
