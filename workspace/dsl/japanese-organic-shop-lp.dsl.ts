import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const green = '#4a7c59';
const darkGreen = '#2d4a35';
const cream = '#faf7f2';
const white = '#ffffff';
const gray = '#777777';
const textGray = '#666666';
const lightGreen = '#e8f0e4';

// ─── NavBar ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  strokes: [{ color: hex('#4a7c591F'), weight: 1, align: 'INSIDE' }],
  children: [
    text('大地の恵み', { fontSize: 22, fontWeight: 900, color: green, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('こだわり', { fontSize: 14, fontWeight: 500, color: textGray }),
        text('商品一覧', { fontSize: 14, fontWeight: 500, color: textGray }),
        text('生産者紹介', { fontSize: 14, fontWeight: 500, color: textGray }),
        text('配送について', { fontSize: 14, fontWeight: 500, color: textGray }),
        text('お問い合わせ', { fontSize: 14, fontWeight: 500, color: textGray }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(green)],
      cornerRadius: 24,
      children: [
        text('お試しセット', { fontSize: 13, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 680 },
  autoLayout: vertical({ spacing: 20, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#e8f0e4', position: 0 }, { hex: '#f5f0e6', position: 0.5 }, { hex: cream, position: 1 }], 160)],
  children: [
    text('ORGANIC FOOD SHOP', {
      fontSize: 13, fontWeight: 600, color: green,
      letterSpacing: { value: 6, unit: 'PIXELS' },
    }),
    text('自然の恵みを食卓に', {
      fontSize: 64, fontWeight: 900, color: darkGreen,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('全国の契約農家から届く、農薬不使用・有機栽培の新鮮野菜と食材。\n安心・安全なオーガニックフードで、家族の健康を守ります。', {
      fontSize: 17, fontWeight: 400, color: '#6b7c6f',
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
            text('お試しセットを注文する', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('HeroBtnSecondary', {
          autoLayout: horizontal({ padX: 40, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex(green), weight: 2, align: 'INSIDE' }],
          cornerRadius: 32,
          children: [
            text('商品一覧を見る', { fontSize: 16, fontWeight: 600, color: green }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Categories Section ───
function categoryCard(title: string, description: string) {
  return frame(`Category: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 28, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid(cream)],
    strokes: [{ color: hex('#4a7c591A'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('CategoryIcon', {
        size: { x: 56, y: 56 },
        fills: [solid(lightGreen)],
      }),
      text(title, { fontSize: 20, fontWeight: 700, color: darkGreen, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: gray,
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
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('CATEGORIES', { fontSize: 12, fontWeight: 600, color: green, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('商品カテゴリ', { fontSize: 34, fontWeight: 800, color: darkGreen, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('CategoriesGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        categoryCard('有機野菜', '旬の有機野菜を産地直送でお届け。農薬を使わず、土づくりからこだわった安心の野菜たちです。'),
        categoryCard('果物', '太陽をたっぷり浴びて育ったオーガニックフルーツ。自然の甘みが凝縮された贅沢な味わい。'),
        categoryCard('お米・穀物', '有機栽培のコシヒカリや玄米、雑穀など。毎日の主食を安心・安全なものに。'),
        categoryCard('卵・乳製品', '平飼い卵や無添加の乳製品。のびのびと育った鶏や牛から届く、自然の恵み。'),
      ],
    }),
  ],
});

// ─── Featured Products ───
function productCard(name: string, farm: string, price: string) {
  return frame(`Product: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid(white)],
    cornerRadius: 16,
    strokes: [{ color: hex('#4a7c5914'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('ProductImage', {
        size: { x: 260, y: 200 },
        fills: [gradient([{ hex: '#c8dcc0', position: 0 }, { hex: '#a8c8a0', position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame('ProductInfo', {
        autoLayout: vertical({ spacing: 8, padX: 24, padY: 24 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(farm, { fontSize: 12, fontWeight: 600, color: green, letterSpacing: { value: 1, unit: 'PIXELS' } }),
          text(name, { fontSize: 18, fontWeight: 700, color: darkGreen }),
          text(price, { fontSize: 20, fontWeight: 800, color: green }),
        ],
      }),
    ],
  });
}

const featuredSection = frame('FeaturedSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('FEATURED', { fontSize: 12, fontWeight: 600, color: green, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('今週のおすすめ商品', { fontSize: 34, fontWeight: 800, color: darkGreen, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('ProductsGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        productCard('有機ほうれん草セット', '山田農園（長野県）', '¥980'),
        productCard('完熟トマト詰め合わせ', '太陽ファーム（熊本県）', '¥1,480'),
        productCard('新米コシヒカリ 5kg', '田中農場（新潟県）', '¥3,200'),
        productCard('平飼い卵 20個入り', '森のたまご牧場（千葉県）', '¥1,200'),
      ],
    }),
  ],
});

// ─── Farm Story Section ───
const farmStorySection = frame('FarmStorySection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    rectangle('FarmStoryImage', {
      size: { x: 480, y: 400 },
      fills: [gradient([{ hex: '#7ba87e', position: 0 }, { hex: green, position: 1 }], 135)],
      cornerRadius: 20,
    }),
    frame('FarmStoryContent', {
      autoLayout: vertical({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('OUR STORY', { fontSize: 12, fontWeight: 600, color: green, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('生産者とつながる、安心の食卓', { fontSize: 30, fontWeight: 800, color: darkGreen, lineHeight: { value: 150, unit: 'PERCENT' } }),
        text('私たちは全国50以上の契約農家と直接つながり、栽培方法から収穫、出荷まですべてのプロセスを管理しています。農薬や化学肥料に頼らず、土壌の力を最大限に引き出す有機農法で育てた作物だけをお届けします。', {
          fontSize: 15, fontWeight: 400, color: textGray,
          lineHeight: { value: 190, unit: 'PERCENT' },
          size: { x: 460 },
          textAutoResize: 'HEIGHT',
        }),
        text('定期的な農場訪問と品質検査を実施し、お客様に本当に安心できる食材をお届けすることをお約束します。', {
          fontSize: 15, fontWeight: 400, color: textGray,
          lineHeight: { value: 190, unit: 'PERCENT' },
          size: { x: 460 },
          textAutoResize: 'HEIGHT',
        }),
        frame('FarmStoryBtn', {
          autoLayout: horizontal({ padX: 36, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex(green), weight: 2, align: 'INSIDE' }],
          cornerRadius: 28,
          children: [
            text('生産者を知る', { fontSize: 15, fontWeight: 700, color: green }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Delivery Section ───
function deliveryCard(title: string, description: string) {
  return frame(`Delivery: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 28, padY: 40, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('DeliveryIcon', {
        size: { x: 64, y: 64 },
        fills: [solid(green)],
      }),
      text(title, { fontSize: 18, fontWeight: 700, color: darkGreen, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: gray,
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
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid('#f0ebe2')],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('DELIVERY', { fontSize: 12, fontWeight: 600, color: green, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('配送について', { fontSize: 34, fontWeight: 800, color: darkGreen, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('DeliveryGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        deliveryCard('朝採れ即日出荷', '午前中に収穫した野菜をその日のうちに出荷。最短翌日にはご自宅にお届けします。'),
        deliveryCard('全国送料無料', '5,000円以上のご注文で送料無料。定期便なら金額に関わらずいつでも送料無料です。'),
        deliveryCard('鮮度保持パッケージ', '野菜ごとに最適な温度・湿度管理を行い、鮮度を保ったままお届けする独自のパッケージ技術。'),
      ],
    }),
  ],
});

// ─── CTA Section ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 120, padY: 120, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: lightGreen, position: 0 }, { hex: '#d8e8d0', position: 1 }], 160)],
  children: [
    text('まずはお試しセットから', {
      fontSize: 38, fontWeight: 900, color: darkGreen,
      letterSpacing: { value: 2, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('初回限定・送料無料の有機野菜お試しセット。\n旬のおまかせ野菜8品目を特別価格でお届けします。', {
      fontSize: 16, fontWeight: 400, color: '#6b7c6f',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('CtaPriceBox', {
      autoLayout: horizontal({ spacing: 20, counterAlign: 'CENTER' }),
      children: [
        text('通常 ¥3,980', { fontSize: 16, fontWeight: 400, color: '#999999' }),
        text('初回限定 ¥1,980', { fontSize: 28, fontWeight: 900, color: green }),
      ],
    }),
    frame('CtaBtn', {
      autoLayout: horizontal({ padX: 64, padY: 20, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(green)],
      cornerRadius: 32,
      children: [
        text('お試しセットを注文する', { fontSize: 18, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    text('※ 定期購入の縛りはありません。1回限りのお試しOK', { fontSize: 12, fontWeight: 400, color: '#888888', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Footer Section ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid(darkGreen)],
  children: [
    text('大地の恵み', { fontSize: 20, fontWeight: 900, color: '#a8d4a0', letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('商品一覧', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('定期便について', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('生産者紹介', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('よくある質問', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('会社概要', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#ffffff1F')],
    }),
    text('© 2026 大地の恵み All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#ffffff66', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseOrganicShopLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    navBar,
    heroSection,
    categoriesSection,
    featuredSection,
    farmStorySection,
    deliverySection,
    ctaSection,
    footerSection,
  ],
});
