import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

// Color palette - Japanese interior warm taupe theme
const taupe = '#8b7355';
const taupeDark = '#6b5842';
const cream = '#faf8f5';
const creamDark = '#f5f0ea';
const creamAccent = '#e8ddd0';
const borderColor = '#e8e0d4';
const dark = '#1a1a1a';
const textGray = '#666666';
const textLight = '#888888';

// ─── Navigation ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
  children: [
    text('空間工房 KUUKAN KOUBOU', { fontSize: 18, fontWeight: 700, color: taupe, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('サービス', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('施工事例', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('施工の流れ', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('お問い合わせ', { fontSize: 14, fontWeight: 500, color: '#555555' }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(taupe)],
      cornerRadius: 4,
      children: [
        text('無料相談', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 320, padY: 120, counterAlign: 'CENTER', align: 'CENTER' }),
  fills: [gradient([{ hex: creamDark, position: 0 }, { hex: creamAccent, position: 1 }], 135)],
  children: [
    frame('HeroBadge', {
      autoLayout: horizontal({ padX: 20, padY: 6 }),
      fills: [solid(taupe, 0.1)],
      cornerRadius: 2,
      children: [
        text('INTERIOR DESIGN', { fontSize: 13, fontWeight: 600, color: taupe, letterSpacing: { value: 3, unit: 'PIXELS' } }),
      ],
    }),
    text('理想の空間を、\nかたちに', {
      fontSize: 52, fontWeight: 800, color: dark,
      lineHeight: { value: 130, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    text('住宅・商業施設・リノベーション\n暮らしに寄り添う空間デザインをご提案します', {
      fontSize: 16, fontWeight: 400, color: textGray,
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroActions', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('PrimaryBtn', {
          autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(taupe)],
          cornerRadius: 4,
          children: [
            text('施工事例を見る', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
        frame('SecondaryBtn', {
          autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 4,
          strokes: [{ color: hex(taupe), weight: 2, align: 'INSIDE' }],
          children: [
            text('無料相談はこちら', { fontSize: 16, fontWeight: 600, color: taupe }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Services Section ───
function serviceCard(icon: string, title: string, description: string) {
  return frame(`Service: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 28, padY: 48, counterAlign: 'CENTER' }),
    fills: [solid(cream)],
    cornerRadius: 8,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(icon, { fontSize: 40 }),
      text(title, { fontSize: 20, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: textGray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const servicesSection = frame('ServicesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('サービス', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('お客様のニーズに合わせた3つのサービス', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('ServiceGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        serviceCard('🏠', '住宅デザイン', 'ご家族のライフスタイルに合わせた快適な住空間をご提案します。'),
        serviceCard('🏢', '商業施設デザイン', 'ブランドイメージを反映した魅力的な空間を創造します。'),
        serviceCard('🔧', 'リノベーション', '古い空間に新しい命を吹き込み、現代のライフスタイルに合わせて再生します。'),
      ],
    }),
  ],
});

// ─── Process Section ───
function processStep(num: string, title: string, description: string) {
  return frame(`Step: ${num}`, {
    autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('StepNumber', {
        size: { x: 48, y: 48 },
        fills: [solid(taupe)],
        cornerRadius: 24,
        children: [
          text(num, { fontSize: 18, fontWeight: 700, color: '#ffffff', x: 14, y: 12 }),
        ],
      }),
      text(title, { fontSize: 16, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 13, fontWeight: 400, color: textGray,
        lineHeight: { value: 170, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 160 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

function processArrow() {
  return text('→', { fontSize: 24, fontWeight: 400, color: taupe });
}

const processSection = frame('ProcessSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  children: [
    text('施工の流れ', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('ご相談からお引き渡しまで丁寧にサポートいたします', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('ProcessFlow', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'MIN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        processStep('01', '無料相談', 'お客様のご要望やイメージをヒアリングいたします'),
        processArrow(),
        processStep('02', '現地調査', '施工場所の状態や寸法を詳しく調査いたします'),
        processArrow(),
        processStep('03', 'デザイン提案', '3Dパースを用いたデザインプランをご提案します'),
        processArrow(),
        processStep('04', '施工', '熟練の職人が丁寧に施工いたします'),
        processArrow(),
        processStep('05', 'お引き渡し', '最終確認後、お引き渡しとなります'),
      ],
    }),
  ],
});

// ─── Portfolio Section ───
function portfolioItem(tag: string, title: string) {
  return frame(`Portfolio: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    cornerRadius: 8,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    clipContent: true,
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('PortfolioImg', {
        size: { x: undefined, y: 220 },
        fills: [gradient([{ hex: creamAccent, position: 0 }, { hex: '#d4c8b8', position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame('PortfolioInfo', {
        autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('PortfolioTag', {
            autoLayout: horizontal({ padX: 12, padY: 4 }),
            fills: [solid(taupe, 0.1)],
            cornerRadius: 2,
            children: [
              text(tag, { fontSize: 12, fontWeight: 600, color: taupe }),
            ],
          }),
          text(title, { fontSize: 16, fontWeight: 600, color: dark }),
        ],
      }),
    ],
  });
}

const portfolioSection = frame('PortfolioSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('施工事例', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('これまでに手がけた空間デザインの一部をご紹介', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('PortfolioRow1', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        portfolioItem('住宅', 'モダン和室のある家'),
        portfolioItem('商業施設', 'カフェ＆ギャラリー空間'),
        portfolioItem('リノベーション', '築40年マンション再生'),
      ],
    }),
    frame('PortfolioRow2', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        portfolioItem('住宅', '光と風の通る住まい'),
        portfolioItem('商業施設', 'ミニマルオフィスデザイン'),
        portfolioItem('リノベーション', '古民家をモダンに再生'),
      ],
    }),
  ],
});

// ─── CTA Section ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 120, padY: 96, counterAlign: 'CENTER', align: 'CENTER' }),
  fills: [solid(taupe)],
  children: [
    text('無料相談受付中', { fontSize: 36, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('まずはお気軽にご相談ください。\n経験豊富なデザイナーがお客様の理想をかたちにします。', {
      fontSize: 16, fontWeight: 400, color: '#ffffffD9',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('CTAButton', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      cornerRadius: 4,
      children: [
        text('無料相談を予約する', { fontSize: 18, fontWeight: 700, color: taupe }),
      ],
    }),
    text('※ オンライン相談も対応しております', { fontSize: 13, fontWeight: 400, color: '#ffffffB3', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Footer ───
function footerCol(title: string, links: string[]) {
  return frame(`FooterCol: ${title}`, {
    autoLayout: vertical({ spacing: 12 }),
    children: [
      text(title, { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
      ...links.map(link => text(link, { fontSize: 13, fontWeight: 400, color: '#888888' })),
    ],
  });
}

const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0, padX: 120 }),
  fills: [solid(dark)],
  children: [
    frame('FooterInner', {
      autoLayout: horizontal({ spacing: 0, padY: 64, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex('#333333'), weight: 1, align: 'INSIDE' }],
      children: [
        frame('FooterBrand', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('空間工房 KUUKAN KOUBOU', { fontSize: 16, fontWeight: 700, color: taupe, letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('理想の空間を、かたちに', { fontSize: 13, fontWeight: 400, color: '#888888' }),
          ],
        }),
        frame('FooterLinks', {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            footerCol('サービス', ['住宅デザイン', '商業施設デザイン', 'リノベーション']),
            footerCol('会社情報', ['会社概要', 'アクセス', '採用情報']),
            footerCol('お問い合わせ', ['無料相談予約', 'メールでのお問い合わせ', 'プライバシーポリシー']),
          ],
        }),
      ],
    }),
    frame('FooterBottom', {
      autoLayout: horizontal({ padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('© 2026 空間工房 KUUKAN KOUBOU. All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER' }),
      ],
    }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseInteriorLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    navBar,
    heroSection,
    servicesSection,
    processSection,
    portfolioSection,
    ctaSection,
    footerSection,
  ],
});
