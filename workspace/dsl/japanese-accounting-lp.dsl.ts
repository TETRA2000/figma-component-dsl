import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const darkBlue = '#1e3a5f';
const darkBlueBg = '#152d4a';
const green = '#2d8c5a';
const greenLight = '#5ecc8e';
const greenBg = '#edf5f0';
const bodyText = '#5a6b7d';
const borderCol = '#e8edf2';

const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(darkBlue)],
  children: [
    text('青葉会計事務所', { fontSize: 20, fontWeight: 800, color: '#ffffff' }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: ['サービス', '実績', '会社概要', 'お知らせ'].map(t =>
        text(t, { fontSize: 14, fontWeight: 500, color: '#ffffffCC' })
      ),
    }),
    frame('ContactBtn', {
      autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(green)],
      cornerRadius: 6,
      children: [text('無料相談', { fontSize: 14, fontWeight: 600, color: '#ffffff' })],
    }),
  ],
});

const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: darkBlue, position: 0 }, { hex: darkBlueBg, position: 1 }], 135)],
  children: [
    frame('Badge', {
      autoLayout: horizontal({ padX: 20, padY: 8 }),
      fills: [solid('#2d8c5a33')],
      cornerRadius: 6,
      strokes: [{ color: hex('#2d8c5a4D'), weight: 1, align: 'INSIDE' }],
      children: [text('創業30年の実績', { fontSize: 13, fontWeight: 600, color: greenLight })],
    }),
    text('経営を数字で支える', {
      fontSize: 48, fontWeight: 800, color: '#ffffff',
      lineHeight: { value: 120, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
    }),
    text('税務・会計のプロフェッショナルとして、\nお客様の事業成長を財務面からサポートいたします。', {
      fontSize: 17, fontWeight: 400, color: '#ffffffBF',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 520 },
      textAutoResize: 'HEIGHT',
    }),
    frame('Actions', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('Primary', {
          autoLayout: horizontal({ padX: 40, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(green)],
          cornerRadius: 8,
          children: [text('無料相談を予約', { fontSize: 16, fontWeight: 700, color: '#ffffff' })],
        }),
        frame('Secondary', {
          autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 8,
          strokes: [{ color: hex('#ffffff66'), weight: 2, align: 'INSIDE' }],
          children: [text('サービス詳細', { fontSize: 16, fontWeight: 700, color: '#ffffff' })],
        }),
      ],
    }),
  ],
});

function serviceCard(icon: string, title: string, description: string) {
  return frame(`Service: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 32 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex(borderCol), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('IconWrap', {
        size: { x: 48, y: 48 },
        autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(greenBg)],
        cornerRadius: 10,
        children: [text(icon, { fontSize: 24, textAlignHorizontal: 'CENTER' })],
      }),
      text(title, { fontSize: 18, fontWeight: 700, color: darkBlue }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: bodyText,
        lineHeight: { value: 170, unit: 'PERCENT' },
        size: { x: 300 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const servicesSection = frame('ServicesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#f8fafb')],
  children: [
    text('サービス内容', { fontSize: 30, fontWeight: 800, color: darkBlue, textAlignHorizontal: 'CENTER' }),
    text('幅広い専門サービスで経営課題を解決します', { fontSize: 15, fontWeight: 400, color: '#6b7b8d', textAlignHorizontal: 'CENTER' }),
    frame('Grid', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Row1', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            serviceCard('📋', '税務申告・税務相談', '法人税・消費税・所得税の申告代行。節税対策から税務調査対応までトータルサポート。'),
            serviceCard('🔍', '会計監査', '法定監査から任意監査まで。財務諸表の信頼性を確保し、ステークホルダーの信頼を獲得。'),
            serviceCard('📈', '経営コンサルティング', '事業計画策定、M&Aアドバイザリー、事業承継支援。経営の意思決定をサポート。'),
          ],
        }),
        frame('Row2', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            serviceCard('💰', '記帳代行・経理代行', '日常の経理業務をアウトソーシング。コア業務に集中できる環境を実現。'),
            serviceCard('🏢', '会社設立支援', '法人設立から届出まで。スムーズな事業開始をワンストップでサポート。'),
            serviceCard('🌐', '国際税務', '海外進出・外国法人の日本進出における税務戦略を専門チームが支援。'),
          ],
        }),
      ],
    }),
  ],
});

function caseStudyCard(industry: string, title: string, result: string) {
  return frame(`Case: ${industry}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 32 }),
    fills: [solid('#f8fafb')],
    cornerRadius: 12,
    strokes: [{ color: hex(borderCol), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('TopBorder', { size: { x: 1, y: 4 }, fills: [solid(green)], layoutSizingHorizontal: 'FILL' }),
      frame('IndustryBadge', {
        autoLayout: horizontal({ padX: 12, padY: 4 }),
        fills: [solid(greenBg)],
        cornerRadius: 4,
        children: [text(industry, { fontSize: 12, fontWeight: 700, color: green })],
      }),
      text(title, {
        fontSize: 18, fontWeight: 700, color: darkBlue,
        lineHeight: { value: 150, unit: 'PERCENT' },
        size: { x: 300 },
        textAutoResize: 'HEIGHT',
      }),
      text(result, {
        fontSize: 14, fontWeight: 400, color: bodyText,
        lineHeight: { value: 170, unit: 'PERCENT' },
        size: { x: 300 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const caseStudiesSection = frame('CaseStudiesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('導入事例', { fontSize: 30, fontWeight: 800, color: darkBlue, textAlignHorizontal: 'CENTER' }),
    text('お客様の成功事例をご紹介します', { fontSize: 15, fontWeight: 400, color: '#6b7b8d', textAlignHorizontal: 'CENTER' }),
    frame('CaseGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        caseStudyCard('製造業', '税務最適化で年間500万円のコスト削減', '適切な税制優遇措置の活用と経費見直しにより、大幅なコスト削減を実現しました。'),
        caseStudyCard('IT企業', 'IPO準備の会計体制構築をサポート', '上場に必要な内部統制の整備から監査法人との連携まで、2年間のIPO準備を伴走しました。'),
        caseStudyCard('飲食チェーン', '多店舗展開における経理業務の効率化', 'クラウド会計の導入と業務フロー改善により、経理工数を40%削減しました。'),
      ],
    }),
  ],
});

function statBlock(value: string, unit: string, label: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ValueRow', {
        autoLayout: horizontal({ spacing: 2, counterAlign: 'MAX' }),
        children: [
          text(value, { fontSize: 48, fontWeight: 800, color: green }),
          text(unit, { fontSize: 18, fontWeight: 700, color: green }),
        ],
      }),
      text(label, { fontSize: 14, fontWeight: 400, color: '#ffffffB3', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

const statsSection = frame('StatsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 48, padX: 220, padY: 80, align: 'CENTER' }),
  fills: [solid(darkBlue)],
  children: [
    statBlock('30', '年', '業界経験'),
    statBlock('1,200', '社+', '顧問先企業'),
    statBlock('50', '名', '専門スタッフ'),
    statBlock('98', '%', '顧客満足度'),
  ],
});

const consultationCta = frame('ConsultationCTA', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: green, position: 0 }, { hex: '#247a4e', position: 1 }], 135)],
  children: [
    text('まずは無料相談から', { fontSize: 30, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('経営のお悩み、税務のご相談、何でもお気軽にお問い合わせください。\n初回相談は無料です。', {
      fontSize: 16, fontWeight: 400, color: '#ffffffDD',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('Actions', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('PrimaryBtn', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 8,
          children: [text('無料相談を予約する', { fontSize: 16, fontWeight: 700, color: green })],
        }),
        frame('PhoneBtn', {
          autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 8,
          strokes: [{ color: hex('#ffffff'), weight: 2, align: 'INSIDE' }],
          children: [text('📞 03-5678-9012', { fontSize: 16, fontWeight: 700, color: '#ffffff' })],
        }),
      ],
    }),
  ],
});

const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0, padX: 120 }),
  fills: [solid('#0f1f30')],
  children: [
    frame('Inner', {
      autoLayout: horizontal({ spacing: 0, padY: 64, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex(darkBlue), weight: 1, align: 'INSIDE' }],
      children: [
        frame('Brand', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('青葉会計事務所', { fontSize: 18, fontWeight: 800, color: '#ffffff' }),
            text('経営を数字で支える', { fontSize: 13, fontWeight: 400, color: '#6b7b8d' }),
            text('〒100-0005 東京都千代田区丸の内1-1-1', { fontSize: 12, fontWeight: 400, color: '#4a5a6d' }),
          ],
        }),
        frame('Links', {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            frame('Col1', { autoLayout: vertical({ spacing: 10 }), children: [
              text('サービス', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('税務申告', { fontSize: 13, fontWeight: 400, color: '#6b7b8d' }),
              text('会計監査', { fontSize: 13, fontWeight: 400, color: '#6b7b8d' }),
              text('経営コンサルティング', { fontSize: 13, fontWeight: 400, color: '#6b7b8d' }),
            ]}),
            frame('Col2', { autoLayout: vertical({ spacing: 10 }), children: [
              text('企業情報', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('代表挨拶', { fontSize: 13, fontWeight: 400, color: '#6b7b8d' }),
              text('スタッフ紹介', { fontSize: 13, fontWeight: 400, color: '#6b7b8d' }),
              text('採用情報', { fontSize: 13, fontWeight: 400, color: '#6b7b8d' }),
            ]}),
            frame('Col3', { autoLayout: vertical({ spacing: 10 }), children: [
              text('お問い合わせ', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('無料相談予約', { fontSize: 13, fontWeight: 400, color: '#6b7b8d' }),
              text('アクセス', { fontSize: 13, fontWeight: 400, color: '#6b7b8d' }),
              text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#6b7b8d' }),
            ]}),
          ],
        }),
      ],
    }),
    frame('Bottom', {
      autoLayout: horizontal({ padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [text('© 2026 青葉会計事務所 All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#4a5a6d' })],
    }),
  ],
});

export default frame('JapaneseAccountingLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [navBar, heroSection, servicesSection, caseStudiesSection, statsSection, consultationCta, footerSection],
});
