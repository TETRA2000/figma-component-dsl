import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

// Color palette - Japanese flower shop pink/green theme
const pink = '#e8a0bf';
const pinkLight = '#f0c0d4';
const pinkBg = '#fdf2f7';
const leafGreen = '#5b8a5b';
const greenBg = '#f5faf5';
const greenBorder = '#d4e8d4';
const borderColor = '#f0e8ec';
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
    text('花結び HANAMUSUBI', { fontSize: 20, fontWeight: 700, color: pink, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('アレンジメント', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('人気商品', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('配送について', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('ご注文', { fontSize: 14, fontWeight: 500, color: '#555555' }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(pink)],
      cornerRadius: 24,
      children: [
        text('オンライン注文', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
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
          autoLayout: horizontal({ padX: 20, padY: 6 }),
          fills: [solid(pinkBg)],
          cornerRadius: 20,
          children: [
            text('FLOWER SHOP', { fontSize: 13, fontWeight: 600, color: pink, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        text('花のある\n暮らしを', {
          fontSize: 48, fontWeight: 800, color: dark,
          lineHeight: { value: 130, unit: 'PERCENT' },
          size: { x: 400 },
          textAutoResize: 'HEIGHT',
        }),
        text('季節の花々を丁寧にお届け。\n大切な人への贈り物に、日々の暮らしに彩りを。', {
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
              fills: [gradient([{ hex: pink, position: 0 }, { hex: pinkLight, position: 1 }], 135)],
              cornerRadius: 28,
              children: [
                text('商品を見る', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
            frame('SecondaryBtn', {
              autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 28,
              strokes: [{ color: hex(pink), weight: 2, align: 'INSIDE' }],
              children: [
                text('ギフト相談', { fontSize: 16, fontWeight: 600, color: pink }),
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
        frame('FlowerPlaceholder', {
          size: { x: 320, y: 380 },
          children: [
            ellipse('FlowerCircle', {
              size: { x: 260, y: 260 },
              fills: [gradient([{ hex: pinkBg, position: 0 }, { hex: pink, position: 1 }], 180)],
              x: 30,
              y: 40,
            }),
            rectangle('LeafAccent', {
              size: { x: 80, y: 120 },
              fills: [gradient([{ hex: leafGreen, position: 0 }, { hex: '#7aaa7a', position: 1 }], 135)],
              cornerRadius: 0,
              x: 220,
              y: 240,
              opacity: 0.7,
            }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Categories Section ───
function categoryCard(icon: string, title: string, description: string) {
  return frame(`Category: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 16,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(icon, { fontSize: 40 }),
      text(title, { fontSize: 18, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: textGray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 220 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const categoriesSection = frame('CategoriesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#fdf8fa')],
  children: [
    text('アレンジメント', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('シーンに合わせた花をご用意しております', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('CategoryGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        categoryCard('💐', 'ブーケ', '日常を彩る花束。誕生日・記念日のプレゼントにも最適です。'),
        categoryCard('💒', 'ウェディング', 'ブーケ・会場装花など、結婚式をトータルコーディネート。'),
        categoryCard('🕯️', 'お供え・仏花', '故人を偲ぶ心を込めたアレンジメント。法要用もご用意。'),
        categoryCard('🌸', '季節の花', '旬の花材を使った季節限定アレンジメント。'),
      ],
    }),
  ],
});

// ─── Popular Items Section ───
function itemCard(name: string, description: string, price: string) {
  return frame(`Item: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    cornerRadius: 16,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    clipContent: true,
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('ItemImgArea', {
        size: { x: undefined, y: 240 },
        fills: [gradient([{ hex: pinkBg, position: 0 }, { hex: '#f5e6ee', position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame('ItemInfo', {
        autoLayout: vertical({ spacing: 8, padX: 24, padY: 24 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 17, fontWeight: 700, color: dark }),
          text(description, {
            fontSize: 14, fontWeight: 400, color: textGray,
            lineHeight: { value: 170, unit: 'PERCENT' },
            size: { x: 300 },
            textAutoResize: 'HEIGHT',
          }),
          text(price, { fontSize: 22, fontWeight: 800, color: pink }),
        ],
      }),
    ],
  });
}

const popularItemsSection = frame('PopularItemsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('人気商品', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('お客様に選ばれている人気のアレンジメント', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('ItemGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        itemCard('季節のおまかせブーケ M', '旬の花をフローリストがセレクト。ボリューム感たっぷりのブーケです。', '¥4,400'),
        itemCard('ローズガーデン', '上品なバラを中心に、グリーンを添えた華やかなアレンジメント。', '¥6,600'),
        itemCard('ナチュラルバスケット', 'かごに季節の花を詰め込んだ、そのまま飾れるバスケットアレンジ。', '¥5,500'),
      ],
    }),
  ],
});

// ─── Delivery Section ───
function deliveryCard(icon: string, title: string, description: string) {
  return frame(`Delivery: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 16,
    strokes: [{ color: hex(greenBorder), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(icon, { fontSize: 36 }),
      text(title, { fontSize: 18, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: textGray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 260 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const deliverySection = frame('DeliverySection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(greenBg)],
  children: [
    text('配送について', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('全国へ新鮮なお花をお届けいたします', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('DeliveryGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        deliveryCard('🚚', '全国配送対応', '北海道から沖縄まで、全国へお届けいたします。'),
        deliveryCard('📅', '日時指定可能', 'ご希望の日時にお届け。午前・午後の指定も承ります。'),
        deliveryCard('🎁', 'ギフトラッピング', 'メッセージカード付きのギフトラッピングを無料でご用意。'),
      ],
    }),
  ],
});

// ─── CTA Section ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 120, padY: 96, counterAlign: 'CENTER', align: 'CENTER' }),
  fills: [gradient([{ hex: pink, position: 0 }, { hex: pinkLight, position: 1 }], 135)],
  children: [
    text('ご注文はこちらから', { fontSize: 36, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('オンラインで簡単注文。\n¥5,500以上のご注文で送料無料。', {
      fontSize: 16, fontWeight: 400, color: '#ffffffE6',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 400 },
      textAutoResize: 'HEIGHT',
    }),
    frame('CTAButton', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      cornerRadius: 32,
      children: [
        text('オンラインショップへ', { fontSize: 18, fontWeight: 700, color: pink }),
      ],
    }),
    text('※ 当日配送は14時までのご注文に限ります', { fontSize: 13, fontWeight: 400, color: '#ffffffCC', textAlignHorizontal: 'CENTER' }),
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
            text('花結び HANAMUSUBI', { fontSize: 18, fontWeight: 700, color: pink, letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('花のある暮らしを', { fontSize: 13, fontWeight: 400, color: '#888888' }),
          ],
        }),
        frame('FooterLinks', {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            footerCol('商品', ['ブーケ', 'アレンジメント', '季節の花']),
            footerCol('ご利用ガイド', ['ご注文方法', '配送について', 'よくある質問']),
            footerCol('店舗情報', ['店舗案内', 'お問い合わせ', 'プライバシーポリシー']),
          ],
        }),
      ],
    }),
    frame('FooterBottom', {
      autoLayout: horizontal({ padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('© 2026 花結び HANAMUSUBI. All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER' }),
      ],
    }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseFlowerShopLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    navBar,
    heroSection,
    categoriesSection,
    popularItemsSection,
    deliverySection,
    ctaSection,
    footerSection,
  ],
});
