import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

// Color palette - Japanese Kimono deep plum with gold theme
const plum = '#581c87';
const plumLight = '#7c3aed';
const gold = '#c5a000';
const goldLight = '#e8d44d';
const plumBg = '#f5f0f9';
const warmBg = '#faf8f0';
const borderColor = '#e8e0f0';
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
    frame('BrandGroup', {
      autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('着物レンタル 彩', { fontSize: 18, fontWeight: 700, color: plum }),
        text('IRODORI', { fontSize: 14, fontWeight: 600, color: gold, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('プラン', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('ギャラリー', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('着付けサービス', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('料金', { fontSize: 14, fontWeight: 500, color: '#555555' }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(plum)],
      cornerRadius: 24,
      children: [
        text('予約する', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    frame('HeroContent', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('HeroBadge', {
          autoLayout: horizontal({ padX: 16, padY: 6 }),
          fills: [solid(plumBg)],
          cornerRadius: 20,
          children: [
            text('伝統と美の融合', { fontSize: 13, fontWeight: 600, color: plum }),
          ],
        }),
        text('特別な日を、\n美しい着物で', {
          fontSize: 48, fontWeight: 800, color: dark,
          lineHeight: { value: 130, unit: 'PERCENT' },
          size: { x: 500 },
          textAutoResize: 'HEIGHT',
        }),
        text('結婚式・成人式・七五三など、人生の大切な節目を\n最高の一着で彩ります', {
          fontSize: 16, fontWeight: 400, color: textGray,
          lineHeight: { value: 180, unit: 'PERCENT' },
          size: { x: 400 },
          textAutoResize: 'HEIGHT',
        }),
        frame('HeroActions', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            frame('PrimaryBtn', {
              autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [gradient([{ hex: plum, position: 0 }, { hex: plumLight, position: 1 }], 135)],
              cornerRadius: 28,
              children: [
                text('プランを見る', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
            frame('SecondaryBtn', {
              autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 28,
              strokes: [{ color: hex(plum), weight: 2, align: 'INSIDE' }],
              children: [
                text('来店予約', { fontSize: 16, fontWeight: 600, color: plum }),
              ],
            }),
          ],
        }),
      ],
    }),
    frame('HeroImage', {
      autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('KimonoPlaceholder', {
          size: { x: 300, y: 400 },
          children: [
            rectangle('KimonoShape', {
              size: { x: 160, y: 320 },
              fills: [gradient([{ hex: plumBg, position: 0 }, { hex: plum, position: 1 }], 180)],
              cornerRadius: 12,
              x: 70,
              y: 40,
            }),
            rectangle('ObiSash', {
              size: { x: 160, y: 40 },
              fills: [gradient([{ hex: gold, position: 0 }, { hex: goldLight, position: 1 }], 90)],
              cornerRadius: 4,
              x: 70,
              y: 200,
            }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Plan Types Section ───
function planCard(title: string, subtitle: string, description: string, price: string) {
  return frame(`Plan: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 16,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('PlanIcon', {
        size: { x: 56, y: 56 },
        fills: [gradient([{ hex: plum, position: 0 }, { hex: plumLight, position: 1 }], 135)],
        cornerRadius: 28,
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        children: [
          text(subtitle, { fontSize: 14, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        ],
      }),
      text(title, { fontSize: 20, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: textGray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
      text(price, { fontSize: 22, fontWeight: 800, color: plum, textAlignHorizontal: 'CENTER' }),
      frame('PlanBtn', {
        autoLayout: horizontal({ padX: 32, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(plum)],
        cornerRadius: 24,
        children: [
          text('詳しく見る', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
        ],
      }),
    ],
  });
}

const plansSection = frame('PlansSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(warmBg)],
  children: [
    text('レンタルプラン', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('シーンに合わせた最適なプランをご用意', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('PlanGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        planCard('婚礼プラン', '婚', '白無垢・色打掛・引き振袖など、花嫁衣裳を豊富にご用意。ヘアメイク・着付け込みのトータルプラン', '¥88,000〜'),
        planCard('成人式プラン', '成', '振袖レンタル・前撮り・当日着付けまで。一生に一度の晴れの日を最高の装いで', '¥55,000〜'),
        planCard('カジュアルプラン', '遊', '街歩き・観光・食事会に。小紋や紬など、気軽に楽しめるカジュアル着物をレンタル', '¥9,800〜'),
      ],
    }),
  ],
});

// ─── Gallery Section ───
function galleryItem(label: string, width: number, height: number) {
  return frame(`Gallery: ${label}`, {
    size: { x: width, y: height },
    fills: [gradient([{ hex: plumBg, position: 0 }, { hex: '#e8d0f0', position: 1 }], 135)],
    cornerRadius: 12,
    clipContent: true,
    autoLayout: vertical({ padX: 16, padY: 16, align: 'MIN', counterAlign: 'MAX' }),
    children: [
      frame('GalleryLabel', {
        autoLayout: horizontal({ padX: 12, padY: 4 }),
        fills: [solid(plum, 0.8)],
        cornerRadius: 8,
        children: [
          text(label, { fontSize: 12, fontWeight: 600, color: '#ffffff' }),
        ],
      }),
    ],
  });
}

const gallerySection = frame('GallerySection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('着物ギャラリー', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('四季折々の美しい着物コレクション', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('GalleryGrid', {
      autoLayout: horizontal({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('GalleryCol1', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            galleryItem('振袖 - 桜柄', 380, 260),
            galleryItem('色打掛 - 鶴', 380, 200),
          ],
        }),
        frame('GalleryCol2', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            galleryItem('訪問着 - 菊', 380, 200),
            galleryItem('小紋 - 市松', 380, 260),
          ],
        }),
        frame('GalleryCol3', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            galleryItem('白無垢', 380, 260),
            galleryItem('袴 - 卒業式', 380, 200),
          ],
        }),
      ],
    }),
  ],
});

// ─── Dressing Service Section ───
function serviceStep(num: string, title: string, description: string) {
  return frame(`Step: ${title}`, {
    autoLayout: horizontal({ spacing: 20, padX: 24, padY: 24, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('StepNum', {
        size: { x: 48, y: 48 },
        fills: [solid(gold)],
        cornerRadius: 24,
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        children: [
          text(num, { fontSize: 18, fontWeight: 800, color: '#ffffff' }),
        ],
      }),
      frame('StepContent', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 16, fontWeight: 700, color: dark }),
          text(description, {
            fontSize: 14, fontWeight: 400, color: textGray,
            lineHeight: { value: 170, unit: 'PERCENT' },
          }),
        ],
      }),
    ],
  });
}

const dressingSection = frame('DressingSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(warmBg)],
  children: [
    text('着付けサービス', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('プロの着付け師が美しい着姿をお手伝い', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('StepsList', {
      autoLayout: vertical({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        serviceStep('1', 'ご来店・カウンセリング', 'ご希望のシーンやイメージをヒアリング。体型に合った着物をご提案します'),
        serviceStep('2', '着物選び・試着', '豊富なコレクションからお気に入りの一着をお選びいただけます'),
        serviceStep('3', 'ヘアメイク・着付け', '経験豊富な着付け師とヘアメイクアーティストが担当します'),
        serviceStep('4', 'お出かけ・撮影', '着崩れ対応もご安心ください。出張着付けも承ります'),
      ],
    }),
  ],
});

// ─── Price List Section ───
function priceRow(item: string, price: string, note?: string) {
  const noteNode = note
    ? [text(note, { fontSize: 12, fontWeight: 400, color: textLight })]
    : [];
  return frame(`Price: ${item}`, {
    autoLayout: horizontal({ spacing: 0, padX: 24, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    strokes: [{ color: hex('#f0e8e0'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('PriceItemGroup', {
        autoLayout: vertical({ spacing: 4 }),
        children: [
          text(item, { fontSize: 15, fontWeight: 600, color: dark }),
          ...noteNode,
        ],
      }),
      text(price, { fontSize: 18, fontWeight: 700, color: plum }),
    ],
  });
}

const priceSection = frame('PriceSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('料金表', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('すべて税込価格です', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('PriceList', {
      autoLayout: vertical({ spacing: 0 }),
      fills: [solid('#ffffff')],
      cornerRadius: 16,
      strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
      layoutSizingHorizontal: 'FILL',
      children: [
        priceRow('振袖レンタル（成人式）', '¥55,000〜', '前撮り・着付け・ヘアメイク込み'),
        priceRow('婚礼衣裳レンタル', '¥88,000〜', '白無垢・色打掛・引き振袖'),
        priceRow('訪問着レンタル', '¥25,000〜', '結婚式参列・入卒式に'),
        priceRow('カジュアル着物レンタル', '¥9,800〜', '街歩き・観光プラン'),
        priceRow('袴レンタル（卒業式）', '¥35,000〜', '着付け・ヘアセット込み'),
        priceRow('着付けのみ', '¥5,500〜', '持ち込み着物の着付け'),
      ],
    }),
  ],
});

// ─── Reservation CTA Section ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 120, padY: 96, counterAlign: 'CENTER', align: 'CENTER' }),
  fills: [gradient([{ hex: plum, position: 0 }, { hex: plumLight, position: 1 }], 135)],
  children: [
    text('ご予約・ご相談', { fontSize: 36, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('お気軽にお問い合わせください。経験豊富なスタッフがご対応いたします', {
      fontSize: 16, fontWeight: 400, color: '#ffffffE6', textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('CTAButtons', {
      autoLayout: horizontal({ spacing: 20 }),
      children: [
        frame('CTAButton', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(gold)],
          cornerRadius: 32,
          children: [
            text('来店予約', { fontSize: 18, fontWeight: 700, color: '#ffffff' }),
          ],
        }),
        frame('CTAPhoneBtn', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 32,
          children: [
            text('03-XXXX-XXXX', { fontSize: 18, fontWeight: 700, color: plum }),
          ],
        }),
      ],
    }),
    text('営業時間: 10:00〜19:00（水曜定休）', { fontSize: 13, fontWeight: 400, color: '#ffffffCC', textAlignHorizontal: 'CENTER' }),
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
            text('着物レンタル 彩 IRODORI', { fontSize: 18, fontWeight: 700, color: gold, letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('伝統の美を、あなたに', { fontSize: 13, fontWeight: 400, color: '#888888' }),
          ],
        }),
        frame('FooterLinks', {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            footerCol('プラン', ['婚礼プラン', '成人式プラン', 'カジュアルプラン']),
            footerCol('サービス', ['着付け', 'ヘアメイク', '前撮り撮影']),
            footerCol('ご案内', ['アクセス', 'よくある質問', 'プライバシーポリシー']),
          ],
        }),
      ],
    }),
    frame('FooterBottom', {
      autoLayout: horizontal({ padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('© 2026 着物レンタル 彩 IRODORI. All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER' }),
      ],
    }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseKimonoLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    navBar,
    heroSection,
    plansSection,
    gallerySection,
    dressingSection,
    priceSection,
    ctaSection,
    footerSection,
  ],
});
