import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const green = '#16a34a';
const darkGreen = '#15803d';
const deepGreen = '#052e16';
const lightGreen = '#f0fdf4';
const amber = '#f59e0b';
const dark = '#1a1a1a';
const white = '#ffffff';

// ─── Navigation ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 64 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(white)],
  strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
  children: [
    text('引越し名人 HIKKOSHI MEIJIN', { fontSize: 20, fontWeight: 900, color: green, letterSpacing: { value: 1, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('サービス', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('ご利用の流れ', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('料金', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('お客様の声', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('お見積もり', { fontSize: 14, fontWeight: 500, color: '#555555' }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10 }),
      fills: [solid(green)],
      cornerRadius: 6,
      children: [
        text('無料見積もり', { fontSize: 13, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 640 },
  autoLayout: vertical({ spacing: 24, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#f0fdf4', position: 0 }, { hex: '#dcfce7', position: 0.5 }, { hex: '#bbf7d0', position: 1 }], 160)],
  children: [
    frame('HeroLabel', {
      autoLayout: horizontal({ padX: 24, padY: 8 }),
      children: [
        text('MOVING SERVICE', { fontSize: 13, fontWeight: 600, color: green, letterSpacing: { value: 6, unit: 'PIXELS' } }),
      ],
    }),
    text('安心・丁寧・お引越し', {
      fontSize: 64, fontWeight: 900, color: dark,
      lineHeight: { value: 130, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      letterSpacing: { value: 4, unit: 'PIXELS' },
    }),
    text('経験豊富なスタッフが大切なお荷物を心を込めてお届けします。\n単身からオフィスまで、あらゆるお引越しに対応。', {
      fontSize: 18, fontWeight: 400, color: '#555555',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 560 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroBtns', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        frame('HeroBtnPrimary', {
          autoLayout: horizontal({ padX: 56, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(green)],
          cornerRadius: 8,
          children: [
            text('無料お見積もり', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('HeroBtnSecondary', {
          autoLayout: horizontal({ padX: 40, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex(green), weight: 2, align: 'INSIDE' }],
          cornerRadius: 8,
          children: [
            text('サービス詳細', { fontSize: 16, fontWeight: 500, color: green }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Plan Card ───
function planCard(name: string, price: string, features: string[], popular?: boolean) {
  const badge = popular
    ? [frame('PopularBadge', {
        autoLayout: horizontal({ padX: 20, padY: 6 }),
        fills: [solid(amber)],
        cornerRadius: 20,
        children: [
          text('人気 No.1', { fontSize: 11, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
        ],
      })]
    : [];

  return frame(`Plan: ${name}`, {
    autoLayout: vertical({ spacing: 0, padX: 32, padY: 48, counterAlign: 'CENTER' }),
    fills: [solid(white)],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: popular ? [{ color: hex(amber), weight: 3, align: 'INSIDE' }] : [],
    children: [
      ...badge,
      text(name, { fontSize: 20, fontWeight: 800, color: dark }),
      frame(`PriceSpacer: ${name}`, { size: { x: 1, y: 20 } }),
      text(price, { fontSize: 44, fontWeight: 900, color: green }),
      text('〜', { fontSize: 16, fontWeight: 500, color: '#888888' }),
      rectangle(`PlanDivider: ${name}`, { size: { x: 280, y: 1 }, fills: [solid('#e5e7eb')] }),
      frame(`PlanSpacer: ${name}`, { size: { x: 1, y: 16 } }),
      ...features.map((f, i) =>
        text(f, {
          fontSize: 14, fontWeight: 400, color: '#555555',
          lineHeight: { value: 280, unit: 'PERCENT' },
        })
      ),
      frame(`BtnSpacer: ${name}`, { size: { x: 1, y: 24 } }),
      frame(`PlanBtn: ${name}`, {
        autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: popular ? [solid(green)] : [],
        strokes: popular ? [] : [{ color: hex(green), weight: 2, align: 'INSIDE' }],
        cornerRadius: 8,
        children: [
          text(popular ? '今すぐ見積もり' : '詳細を見る', {
            fontSize: 14, fontWeight: 700,
            color: popular ? white : green,
            letterSpacing: { value: 2, unit: 'PIXELS' },
          }),
        ],
      }),
    ],
  });
}

const plansSection = frame('PlansSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(darkGreen)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('SERVICE PLANS', { fontSize: 12, fontWeight: 600, color: '#4ade80', letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('お引越しプラン', { fontSize: 36, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('PlansGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        planCard('単身プラン', '¥29,800', [
          '1R〜1LDKの荷物量',
          'スタッフ2名',
          '梱包資材サービス',
          '養生作業込み',
          '不用品回収1点無料',
        ]),
        planCard('ファミリープラン', '¥69,800', [
          '2LDK〜4LDKの荷物量',
          'スタッフ4名',
          '梱包・開梱サービス',
          '養生作業込み',
          'エアコン脱着1台無料',
          '不用品回収3点無料',
        ], true),
        planCard('オフィスプラン', '¥198,000', [
          'オフィス・店舗移転',
          '専任チーム編成',
          '什器の分解・組立',
          'IT機器の梱包対応',
          '休日・夜間対応可',
          'レイアウト相談無料',
          '原状回復サポート',
        ]),
      ],
    }),
  ],
});

// ─── Process Section ───
function processStep(num: string, title: string, description: string) {
  return frame(`Step: ${title}`, {
    autoLayout: vertical({ spacing: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame(`StepCircle: ${title}`, {
        size: { x: 64, y: 64 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(green)],
        cornerRadius: 32,
        children: [
          text(num, { fontSize: 24, fontWeight: 900, color: white }),
        ],
      }),
      text(title, { fontSize: 18, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#666666',
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 200 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const processSection = frame('ProcessSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(lightGreen)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('PROCESS', { fontSize: 12, fontWeight: 600, color: green, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('ご利用の流れ', { fontSize: 36, fontWeight: 800, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('ProcessSteps', {
      autoLayout: horizontal({ spacing: 24, counterAlign: 'MIN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        processStep('01', 'お問い合わせ', 'お電話またはWebフォームからお気軽にご連絡ください。'),
        frame('Arrow1', {
          size: { x: 40, y: 2 },
          fills: [solid(green)],
        }),
        processStep('02', '訪問見積もり', '経験豊富なスタッフがお伺いし、正確なお見積もりをご提示。'),
        frame('Arrow2', {
          size: { x: 40, y: 2 },
          fills: [solid(green)],
        }),
        processStep('03', '梱包・搬出', '丁寧に養生を施し、安全に梱包・搬出いたします。'),
        frame('Arrow3', {
          size: { x: 40, y: 2 },
          fills: [solid(green)],
        }),
        processStep('04', '搬入・設置', '新居への搬入後、家具の配置や設置まで対応いたします。'),
      ],
    }),
  ],
});

// ─── Price Calculator Section ───
function calcRow(label: string, value: string) {
  return frame(`CalcRow: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padY: 16, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 14, fontWeight: 600, color: dark }),
      frame(`CalcValue: ${label}`, {
        autoLayout: horizontal({ padX: 16, padY: 8 }),
        fills: [solid(white)],
        strokes: [{ color: hex('#d1d5db'), weight: 1, align: 'INSIDE' }],
        cornerRadius: 6,
        children: [
          text(value, { fontSize: 14, fontWeight: 400, color: '#555555' }),
        ],
      }),
    ],
  });
}

const calculatorSection = frame('CalculatorSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 340, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('PRICE SIMULATOR', { fontSize: 12, fontWeight: 600, color: green, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('料金シミュレーション', { fontSize: 36, fontWeight: 800, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('CalcCard', {
      autoLayout: vertical({ spacing: 0, padX: 48, padY: 48 }),
      fills: [solid('#f9fafb')],
      strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
      cornerRadius: 16,
      layoutSizingHorizontal: 'FILL',
      children: [
        calcRow('お引越しタイプ', 'ファミリープラン'),
        calcRow('現在のお住まい', '東京都'),
        calcRow('お引越し先', '神奈川県'),
        calcRow('お引越し時期', '4月（繁忙期）'),
        rectangle('CalcDivider', { size: { x: 660, y: 2 }, fills: [solid(green)] }),
        frame('CalcResult', {
          autoLayout: horizontal({ spacing: 0, padY: 16, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('概算お見積もり', { fontSize: 16, fontWeight: 700, color: dark }),
            text('¥89,800〜¥128,000', { fontSize: 28, fontWeight: 900, color: green }),
          ],
        }),
        text('※ 正確な金額は訪問見積もりにてご案内いたします', { fontSize: 12, fontWeight: 400, color: '#888888' }),
        frame('CalcBtnSpacer', { size: { x: 1, y: 24 } }),
        frame('CalcBtn', {
          autoLayout: horizontal({ padX: 48, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(green)],
          cornerRadius: 8,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('正式なお見積もりを依頼する', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Reviews Section ───
function reviewCard(rating: string, body: string, meta: string) {
  return frame(`Review: ${meta.slice(0, 20)}`, {
    autoLayout: vertical({ spacing: 16, padX: 36, padY: 36 }),
    fills: [solid(white)],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(rating, { fontSize: 20, fontWeight: 400, color: amber }),
      text(body, {
        fontSize: 14, fontWeight: 400, color: '#444444',
        lineHeight: { value: 190, unit: 'PERCENT' },
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
      text(meta, { fontSize: 13, fontWeight: 400, color: '#888888' }),
    ],
  });
}

const reviewsSection = frame('ReviewsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(darkGreen)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('REVIEWS', { fontSize: 12, fontWeight: 600, color: '#4ade80', letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('お客様の声', { fontSize: 36, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('ReviewsGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        reviewCard('★★★★★', '急な転勤で時間がない中、迅速に対応していただきました。梱包も丁寧で、新居では傷一つなく荷物が届きました。', '30代男性・会社員 T.K 様（単身プラン）'),
        reviewCard('★★★★★', '小さな子どもがいるため不安でしたが、スタッフの方が気遣ってくださり安心してお任せできました。', '30代女性・主婦 M.Y 様（ファミリープラン）'),
        reviewCard('★★★★★', 'オフィス移転で利用しました。IT機器の取り扱いも慣れており、月曜日から通常営業できました。', '40代男性・経営者 S.H 様（オフィスプラン）'),
      ],
    }),
  ],
});

// ─── Estimate CTA ───
const estimateCta = frame('EstimateCTA', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 220, padY: 120, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: deepGreen, position: 0 }, { hex: '#14532d', position: 1 }], 160)],
  children: [
    text('まずは無料お見積もりから', {
      fontSize: 40, fontWeight: 900, color: white,
      letterSpacing: { value: 3, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('お電話・Webフォームで簡単お見積もり。\nお気軽にご相談ください。強引な営業は一切いたしません。', {
      fontSize: 16, fontWeight: 400, color: '#ffffff99',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('CtaBtns', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        frame('CtaBtnWeb', {
          autoLayout: horizontal({ padX: 56, padY: 20, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(amber)],
          cornerRadius: 8,
          children: [
            text('Web無料見積もり', { fontSize: 18, fontWeight: 700, color: white, letterSpacing: { value: 3, unit: 'PIXELS' } }),
          ],
        }),
        frame('CtaBtnPhone', {
          autoLayout: horizontal({ padX: 40, padY: 20, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex('#ffffff66'), weight: 2, align: 'INSIDE' }],
          cornerRadius: 8,
          children: [
            text('0120-123-456', { fontSize: 18, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
      ],
    }),
    text('※ 受付時間：8:00〜20:00（年中無休）', { fontSize: 12, fontWeight: 400, color: '#ffffff66' }),
  ],
});

// ─── Footer ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 12, padX: 120, padY: 32, counterAlign: 'CENTER' }),
  fills: [solid(deepGreen)],
  strokes: [{ color: hex('#ffffff1A'), weight: 1, align: 'INSIDE' }],
  children: [
    text('引越し名人 HIKKOSHI MEIJIN', { fontSize: 18, fontWeight: 900, color: '#4ade80', letterSpacing: { value: 1, unit: 'PIXELS' } }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32 }),
      children: [
        text('サービス', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
        text('料金プラン', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
        text('ご利用の流れ', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
        text('お客様の声', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
        text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
      ],
    }),
    rectangle('FooterDivider', { size: { x: 1200, y: 1 }, fills: [solid('#ffffff1A')] }),
    text('© 2026 引越し名人 All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#ffffff4D', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseMovingLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    navBar,
    heroSection,
    plansSection,
    processSection,
    calculatorSection,
    reviewsSection,
    estimateCta,
    footerSection,
  ],
});
