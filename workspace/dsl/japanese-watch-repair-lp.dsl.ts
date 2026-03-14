import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

// Color palette - Watch repair dark brown with champagne
const brown = '#3b2a1a';
const brownLight = '#5c4033';
const champagne = '#c5a77d';
const champagneLight = '#d4be9a';
const warmBg = '#f9f6f1';
const dark = '#1a1a1a';
const textGray = '#666666';
const textLight = '#888888';
const borderColor = '#e8dfd4';

// ─── Navigation ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(brown)],
  children: [
    frame('BrandGroup', {
      autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        frame('BrandIcon', {
          size: { x: 36, y: 36 },
          fills: [solid(champagne)],
          cornerRadius: 18,
          children: [
            text('精', { fontSize: 16, fontWeight: 700, color: brown, x: 10, y: 6 }),
          ],
        }),
        frame('BrandText', {
          autoLayout: vertical({ spacing: 2 }),
          children: [
            text('時計工房 精巧', { fontSize: 16, fontWeight: 700, color: champagne }),
            text('SEIKO KOUBOU', { fontSize: 10, fontWeight: 600, color: '#999999', letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
      ],
    }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('サービス', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
        text('職人紹介', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
        text('料金案内', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
        text('お問い合わせ', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(champagne)],
      cornerRadius: 4,
      children: [
        text('ご相談予約', { fontSize: 14, fontWeight: 600, color: brown }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: brown, position: 0 }, { hex: brownLight, position: 1 }], 135)],
  children: [
    frame('HeroContent', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('HeroBadge', {
          autoLayout: horizontal({ padX: 16, padY: 6 }),
          cornerRadius: 2,
          strokes: [{ color: hex(champagne), weight: 1, align: 'INSIDE' }],
          children: [
            text('創業45年の信頼と実績', { fontSize: 13, fontWeight: 600, color: champagne }),
          ],
        }),
        text('時を刻む、\n職人の技', {
          fontSize: 52, fontWeight: 800, color: '#ffffff',
          lineHeight: { value: 130, unit: 'PERCENT' },
          size: { x: 500 },
          textAutoResize: 'HEIGHT',
        }),
        text('スイス・ドイツ・日本の名門ブランドを知り尽くした\n時計技師が、大切な一本を丁寧に修理いたします。', {
          fontSize: 16, fontWeight: 400, color: '#ffffffCC',
          lineHeight: { value: 180, unit: 'PERCENT' },
          size: { x: 450 },
          textAutoResize: 'HEIGHT',
        }),
        frame('HeroActions', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            frame('PrimaryBtn', {
              autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(champagne)],
              cornerRadius: 4,
              children: [
                text('無料お見積もり', { fontSize: 16, fontWeight: 600, color: brown }),
              ],
            }),
            frame('SecondaryBtn', {
              autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 4,
              strokes: [{ color: hex(champagne), weight: 2, align: 'INSIDE' }],
              children: [
                text('修理事例を見る', { fontSize: 16, fontWeight: 600, color: champagne }),
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
        frame('WatchPlaceholder', {
          size: { x: 360, y: 360 },
          children: [
            rectangle('WatchFace', {
              size: { x: 200, y: 200 },
              fills: [gradient([{ hex: champagne, position: 0 }, { hex: '#8b7355', position: 1 }], 180)],
              cornerRadius: 100,
              x: 80,
              y: 80,
            }),
            rectangle('WatchInner', {
              size: { x: 160, y: 160 },
              fills: [solid(brown)],
              cornerRadius: 80,
              x: 100,
              y: 100,
            }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Services Section ───
function serviceCard(icon: string, title: string, description: string, price: string) {
  return frame(`Service: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 40 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ServiceIcon', {
        size: { x: 56, y: 56 },
        fills: [solid(warmBg)],
        cornerRadius: 8,
        children: [
          text(icon, { fontSize: 28, x: 14, y: 10 }),
        ],
      }),
      text(title, { fontSize: 18, fontWeight: 700, color: dark }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: textGray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        size: { x: 240 },
        textAutoResize: 'HEIGHT',
      }),
      rectangle('ServiceDivider', {
        size: { x: 40, y: 2 },
        fills: [solid(champagne)],
      }),
      text(price, { fontSize: 14, fontWeight: 600, color: champagne }),
    ],
  });
}

const servicesSection = frame('ServicesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('サービス案内', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('あらゆる時計のお悩みに対応いたします', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('ServiceGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        serviceCard('修', '修理', 'ムーブメントの分解洗浄から精密調整まで、熟練の技術で対応。メーカー修理不可のヴィンテージも承ります。', '¥15,000~'),
        serviceCard('整', 'メンテナンス', '定期的なオーバーホールで、時計の寿命を延ばします。3~5年に一度のメンテナンスをおすすめします。', '¥20,000~'),
        serviceCard('電', '電池交換', '各種ブランド対応の電池交換。防水検査付きで安心。即日対応も可能です。', '¥2,000~'),
        serviceCard('復', 'レストレーション', '傷んだケースの研磨、文字盤の修復、ベルト交換など。大切な時計を美しく蘇らせます。', '¥30,000~'),
      ],
    }),
  ],
});

// ─── Brand Expertise Section ───
function brandItem(brandName: string) {
  return frame(`Brand: ${brandName}`, {
    autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 4,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    children: [
      text(brandName, { fontSize: 14, fontWeight: 600, color: dark }),
    ],
  });
}

const brandExpertiseSection = frame('BrandExpertiseSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(warmBg)],
  children: [
    text('取扱ブランド', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('国内外の一流ブランドに精通した技術者が対応', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('BrandGrid', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        brandItem('ROLEX'),
        brandItem('OMEGA'),
        brandItem('PATEK PHILIPPE'),
        brandItem('GRAND SEIKO'),
        brandItem('BREITLING'),
        brandItem('CARTIER'),
      ],
    }),
    frame('BrandGrid2', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        brandItem('IWC'),
        brandItem('JAEGER-LECOULTRE'),
        brandItem('TAG HEUER'),
        brandItem('LONGINES'),
        brandItem('TUDOR'),
      ],
    }),
    text('その他、国内外100以上のブランドに対応しております', { fontSize: 14, fontWeight: 400, color: textGray, textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Process Flow Section ───
function processStep(stepNumber: string, title: string, description: string) {
  return frame(`Step: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('StepNumber', {
        size: { x: 48, y: 48 },
        fills: [solid(brown)],
        cornerRadius: 24,
        children: [
          text(stepNumber, { fontSize: 20, fontWeight: 700, color: champagne, x: 16, y: 10 }),
        ],
      }),
      text(title, { fontSize: 18, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
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

const processFlowSection = frame('ProcessFlowSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('修理の流れ', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('お預かりから完了まで丁寧に対応いたします', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('ProcessGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        processStep('1', 'ご相談・お見積もり', 'お持ち込みまたは郵送にて承ります。症状を確認し、修理内容と料金をご案内いたします。'),
        processStep('2', '修理・調整', '熟練の時計技師が丁寧に作業。進捗はメールまたはお電話でお知らせいたします。'),
        processStep('3', '検品・お届け', '修理後の精度検査を行い、万全の状態でお引き渡し。1年間の修理保証付き。'),
      ],
    }),
  ],
});

// ─── Price Guide Section ───
function priceRow(service: string, price: string, note: string) {
  return frame(`Price: ${service}`, {
    autoLayout: horizontal({ spacing: 0, padX: 32, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#eeeeee'), weight: 1, align: 'INSIDE' }],
    children: [
      text(service, { fontSize: 15, fontWeight: 600, color: dark, size: { x: 300 } }),
      text(note, { fontSize: 13, fontWeight: 400, color: textGray, size: { x: 300 } }),
      text(price, { fontSize: 16, fontWeight: 700, color: champagne }),
    ],
  });
}

const priceGuideSection = frame('PriceGuideSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(warmBg)],
  children: [
    text('料金案内', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('修理内容に応じた料金目安', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('PriceTable', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      cornerRadius: 8,
      strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
      children: [
        priceRow('電池交換（一般）', '¥2,000~', '防水検査込み・即日対応可'),
        priceRow('電池交換（高級ブランド）', '¥5,000~', 'ブランド専用工具使用'),
        priceRow('オーバーホール（クォーツ）', '¥15,000~', '分解洗浄・注油・調整'),
        priceRow('オーバーホール（機械式）', '¥25,000~', '分解洗浄・注油・精度調整'),
        priceRow('ケース研磨', '¥8,000~', '傷取り・鏡面仕上げ'),
        priceRow('文字盤修復', '¥30,000~', '再塗装・印字・夜光塗布'),
      ],
    }),
    text('※ 正確な料金は実物を拝見した上でお見積もりいたします', { fontSize: 13, fontWeight: 400, color: textGray, textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Contact CTA Section ───
const contactCTA = frame('ContactCTA', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 120, padY: 96, counterAlign: 'CENTER', align: 'CENTER' }),
  fills: [solid(brown)],
  children: [
    text('大切な時計のご相談は', { fontSize: 36, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('お見積もりは無料です。お気軽にご相談ください。', {
      fontSize: 16, fontWeight: 400, color: '#ffffffCC', textAlignHorizontal: 'CENTER',
    }),
    frame('CTAButtons', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('CTAButton', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(champagne)],
          cornerRadius: 4,
          children: [
            text('無料お見積もり', { fontSize: 18, fontWeight: 700, color: brown }),
          ],
        }),
        frame('CTAButtonSecondary', {
          autoLayout: horizontal({ padX: 48, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 4,
          strokes: [{ color: hex(champagne), weight: 2, align: 'INSIDE' }],
          children: [
            text('03-9876-5432', { fontSize: 18, fontWeight: 600, color: champagne }),
          ],
        }),
      ],
    }),
    text('営業時間: 10:00-19:00（水曜定休）', { fontSize: 14, fontWeight: 400, color: '#ffffffCC', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Footer ───
function footerCol(title: string, links: string[]) {
  return frame(`FooterCol: ${title}`, {
    autoLayout: vertical({ spacing: 12 }),
    children: [
      text(title, { fontSize: 14, fontWeight: 700, color: champagne }),
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
            text('時計工房 精巧', { fontSize: 18, fontWeight: 700, color: champagne }),
            text('SEIKO KOUBOU', { fontSize: 11, fontWeight: 600, color: '#888888', letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('時を刻む、職人の技', { fontSize: 13, fontWeight: 400, color: '#888888' }),
          ],
        }),
        frame('FooterLinks', {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            footerCol('サービス', ['修理', 'メンテナンス', 'レストレーション']),
            footerCol('ご案内', ['料金表', '修理の流れ', 'よくある質問']),
            footerCol('会社情報', ['会社概要', 'アクセス', 'プライバシーポリシー']),
          ],
        }),
      ],
    }),
    frame('FooterBottom', {
      autoLayout: horizontal({ padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('© 2026 時計工房 精巧 SEIKO KOUBOU. All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER' }),
      ],
    }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseWatchRepairLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    navBar,
    heroSection,
    servicesSection,
    brandExpertiseSection,
    processFlowSection,
    priceGuideSection,
    contactCTA,
    footerSection,
  ],
});
