import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const amber = '#d97706';
const amberDark = '#b45309';
const amberBg = '#fef3c7';
const amberLight = '#fde68a';
const warmBg = '#fffbeb';
const dark = '#1a1a1a';

const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  strokes: [{ color: hex('#eeeeee'), weight: 1, align: 'INSIDE' }],
  children: [
    text('旅路 TABIJI', { fontSize: 22, fontWeight: 800, color: amber }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: ['国内ツアー', '海外ツアー', '温泉特集', 'お客様の声'].map(t =>
        text(t, { fontSize: 14, fontWeight: 500, color: '#555555' })
      ),
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(amber)],
      cornerRadius: 6,
      children: [text('無料相談', { fontSize: 14, fontWeight: 600, color: '#ffffff' })],
    }),
  ],
});

const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: amberBg, position: 0 }, { hex: amberLight, position: 1 }], 135)],
  children: [
    text('心に残る旅を、\nあなたと共に', {
      fontSize: 48, fontWeight: 800, color: dark,
      lineHeight: { value: 130, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    text('創業50年の実績と専門スタッフが、\n忘れられない旅の体験をプロデュースします', {
      fontSize: 16, fontWeight: 400, color: '#666666',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 400 },
      textAutoResize: 'HEIGHT',
    }),
    frame('SearchBox', {
      autoLayout: horizontal({ spacing: 0, padX: 8, padY: 8, counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      cornerRadius: 12,
      children: [
        ...['目的地|北海道', '日程|2泊3日', '人数|2名'].map((pair, i) => {
          const [label, value] = pair.split('|');
          return frame(`Field${i}`, {
            autoLayout: vertical({ spacing: 4, padX: 20, padY: 12 }),
            layoutSizingHorizontal: 'FILL',
            strokes: i < 2 ? [{ color: hex('#eeeeee'), weight: 1, align: 'INSIDE' }] : [],
            children: [
              text(label, { fontSize: 11, fontWeight: 600, color: '#999999' }),
              text(value, { fontSize: 14, fontWeight: 500, color: dark }),
            ],
          });
        }),
        frame('SearchBtn', {
          autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(amber)],
          cornerRadius: 8,
          children: [text('ツアー検索', { fontSize: 14, fontWeight: 700, color: '#ffffff' })],
        }),
      ],
    }),
  ],
});

function destCard(name: string, region: string, price: string, tag?: string) {
  return frame(`Dest: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    cornerRadius: 12,
    strokes: [{ color: hex('#eeeeee'), weight: 1, align: 'INSIDE' }],
    clipContent: true,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('Img', {
        size: { x: undefined, y: 180 },
        autoLayout: horizontal({ padX: 12, padY: 12 }),
        fills: [gradient([{ hex: amberBg, position: 0 }, { hex: amberLight, position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
        children: tag ? [
          frame('Tag', {
            autoLayout: horizontal({ padX: 12, padY: 4 }),
            fills: [solid(amber)],
            cornerRadius: 4,
            children: [text(tag, { fontSize: 11, fontWeight: 700, color: '#ffffff' })],
          }),
        ] : [],
      }),
      frame('Info', {
        autoLayout: vertical({ spacing: 4, padX: 16, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(region, { fontSize: 12, fontWeight: 600, color: amber }),
          text(name, { fontSize: 15, fontWeight: 700, color: dark }),
          text(`${price}〜`, { fontSize: 18, fontWeight: 800, color: amberDark }),
        ],
      }),
    ],
  });
}

const destSection = frame('DestSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('人気の旅先', { fontSize: 32, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
    text('今シーズンおすすめの旅行プラン', { fontSize: 16, fontWeight: 400, color: '#888888', textAlignHorizontal: 'CENTER' }),
    frame('DestGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        destCard('富良野ラベンダー畑ツアー', '北海道', '¥49,800', '人気No.1'),
        destCard('京都紅葉めぐり', '京都', '¥35,000'),
        destCard('沖縄リゾートステイ', '沖縄', '¥59,800', 'NEW'),
        destCard('箱根温泉の旅', '神奈川', '¥28,000'),
      ],
    }),
  ],
});

function featureItem(number: string, title: string, description: string) {
  return frame(`Feature: ${title}`, {
    autoLayout: horizontal({ spacing: 24, padX: 32, padY: 32, counterAlign: 'MIN' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex(amberLight), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(number, { fontSize: 32, fontWeight: 900, color: amber, opacity: 0.3 }),
      frame('Text', {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 18, fontWeight: 700, color: dark }),
          text(description, {
            fontSize: 14, fontWeight: 400, color: '#666666',
            lineHeight: { value: 180, unit: 'PERCENT' },
            size: { x: 500 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
    ],
  });
}

const featuresSection = frame('FeaturesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 320, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(warmBg)],
  children: [
    text('選ばれる理由', { fontSize: 32, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
    frame('FeatureList', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        featureItem('01', 'オーダーメイドの旅行プラン', 'お客様のご要望に合わせて、専任のトラベルコンシェルジュが最適なプランをご提案します。'),
        featureItem('02', '安心の24時間サポート', '旅行中のトラブルにも迅速に対応。日本語対応のサポートデスクを24時間運営しています。'),
        featureItem('03', '厳選された宿泊施設', '実際にスタッフが訪問して品質を確認した、信頼できる宿泊施設のみをご紹介します。'),
      ],
    }),
  ],
});

const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid(amber)],
  children: [
    text('旅の相談、承ります', { fontSize: 32, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('行き先が決まっていなくても大丈夫。お気軽にご相談ください。', { fontSize: 16, fontWeight: 400, color: '#ffffffCC', textAlignHorizontal: 'CENTER' }),
    frame('CTAActions', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('Btn', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 8,
          children: [text('無料相談を予約する', { fontSize: 16, fontWeight: 700, color: amber })],
        }),
        frame('Phone', {
          autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 8,
          strokes: [{ color: hex('#ffffff'), weight: 2, align: 'INSIDE' }],
          children: [text('☎ 0120-000-123', { fontSize: 16, fontWeight: 700, color: '#ffffff' })],
        }),
      ],
    }),
  ],
});

const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 12, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid(dark)],
  children: [
    text('旅路 TABIJI', { fontSize: 18, fontWeight: 800, color: amber, textAlignHorizontal: 'CENTER' }),
    text('観光庁長官登録旅行業第1234号 / 一般社団法人日本旅行業協会 正会員', { fontSize: 12, fontWeight: 400, color: '#888888', textAlignHorizontal: 'CENTER' }),
    text('© 2026 旅路 TABIJI All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER' }),
  ],
});

export default frame('JapaneseTravelLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [navBar, heroSection, destSection, featuresSection, ctaSection, footerSection],
});
