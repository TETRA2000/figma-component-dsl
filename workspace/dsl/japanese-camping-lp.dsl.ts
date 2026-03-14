import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const forestGreen = '#14532d';
const darkGreen = '#0a2e1a';
const cardBg = '#1a3d2a';
const orange = '#ea580c';
const white = '#ffffff';
const cream = '#f5f0e0';
const gray = '#9ca38a';
const mutedGray = '#6b7a5e';

// ─── NavBar ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(darkGreen)],
  strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
  children: [
    text('WILD BASE', { fontSize: 22, fontWeight: 900, color: orange, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('コンセプト', { fontSize: 14, fontWeight: 500, color: gray }),
        text('カテゴリー', { fontSize: 14, fontWeight: 500, color: gray }),
        text('商品一覧', { fontSize: 14, fontWeight: 500, color: gray }),
        text('キャンプ場', { fontSize: 14, fontWeight: 500, color: gray }),
        text('ストーリー', { fontSize: 14, fontWeight: 500, color: gray }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(orange)],
      children: [
        text('SHOP', { fontSize: 13, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 720 },
  autoLayout: vertical({ spacing: 28, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#0a2e1a', position: 0 }, { hex: forestGreen, position: 0.5 }, { hex: '#0d1f14', position: 1 }], 160)],
  children: [
    text('OUTDOOR GEAR BRAND', {
      fontSize: 13, fontWeight: 600, color: orange,
      letterSpacing: { value: 6, unit: 'PIXELS' },
    }),
    text('自然と、本気で遊ぼう', {
      fontSize: 72, fontWeight: 900, color: white,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('日本の四季を知り尽くしたキャンプギアブランド。\n厳選された素材と職人の技術で、あなたのアウトドアを支える。', {
      fontSize: 18, fontWeight: 400, color: '#ffffffA0',
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
          fills: [solid(orange)],
          children: [
            text('商品を見る', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('HeroBtnSecondary', {
          autoLayout: horizontal({ padX: 40, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex('#ffffff4D'), weight: 1, align: 'INSIDE' }],
          children: [
            text('ブランドストーリー', { fontSize: 16, fontWeight: 500, color: white }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Product Categories Section ───
function categoryCard(icon: string, title: string, description: string) {
  return frame(`Category: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 48, counterAlign: 'CENTER' }),
    fills: [solid(cardBg)],
    strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('CategoryIcon', {
        size: { x: 56, y: 56 },
        fills: [solid(orange)],
        cornerRadius: 8,
      }),
      text(title, { fontSize: 20, fontWeight: 800, color: white, textAlignHorizontal: 'CENTER' }),
      rectangle('Divider', { size: { x: 40, y: 2 }, fills: [solid(orange)] }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: gray,
        lineHeight: { value: 190, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 220 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const categoriesSection = frame('CategoriesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(darkGreen)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('CATEGORIES', { fontSize: 12, fontWeight: 600, color: orange, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('プロダクトカテゴリー', { fontSize: 36, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('CategoriesGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        categoryCard('TENT', 'テント', '軽量かつ高耐久。日本の気候に最適化された構造で、四季を通じて快適な居住空間を提供。'),
        categoryCard('COOK', 'クッキング', 'コンパクトに収納できる調理器具。アウトドアでも本格的な料理を楽しめる逸品揃い。'),
        categoryCard('SLEEP', 'スリーピング', '極寒から真夏まで対応するシュラフとマット。快適な睡眠がアウトドアの質を変える。'),
        categoryCard('LIGHT', 'ライティング', 'LEDからオイルランタンまで。自然の中で過ごす夜を、暖かく美しく照らします。'),
      ],
    }),
  ],
});

// ─── Featured Products Section ───
function productCard(name: string, category: string, price: string, description: string) {
  return frame(`Product: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid(cardBg)],
    strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('ProductImage', {
        size: { x: 380, y: 280 },
        fills: [gradient([{ hex: forestGreen, position: 0 }, { hex: '#1a5c3a', position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame('ProductInfo', {
        autoLayout: vertical({ spacing: 12, padX: 28, padY: 24 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(category, { fontSize: 11, fontWeight: 600, color: orange, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          text(name, { fontSize: 20, fontWeight: 800, color: white }),
          text(description, {
            fontSize: 14, fontWeight: 400, color: gray,
            lineHeight: { value: 180, unit: 'PERCENT' },
            size: { x: 300 },
            textAutoResize: 'HEIGHT',
          }),
          rectangle('PriceSpacer', { size: { x: 1, y: 4 }, opacity: 0 }),
          text(price, { fontSize: 24, fontWeight: 900, color: orange }),
        ],
      }),
    ],
  });
}

const productsSection = frame('ProductsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(forestGreen)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('FEATURED', { fontSize: 12, fontWeight: 600, color: orange, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('注目のアイテム', { fontSize: 36, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('ProductsGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        productCard('SUMMIT DOME 2P', 'TENT', '¥49,800', '2人用の軽量ドームテント。ダブルウォール構造で結露を防ぎ、4シーズン対応。重量わずか1.8kg。'),
        productCard('FOREST BURNER PRO', 'COOKING', '¥12,800', '高火力コンパクトバーナー。風防一体型で安定した炎を実現。ソロからファミリーまで。'),
        productCard('AURORA LANTERN', 'LIGHTING', '¥8,500', 'USB充電式LEDランタン。暖色から白色まで無段階調光。最大400ルーメン、連続36時間。'),
      ],
    }),
  ],
});

// ─── Campsite Partners Section ───
function campsiteCard(name: string, location: string, features: string) {
  return frame(`Campsite: ${name}`, {
    autoLayout: horizontal({ spacing: 24, padX: 32, padY: 28 }),
    fills: [solid(cardBg)],
    strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('CampsiteImg', {
        size: { x: 160, y: 120 },
        fills: [gradient([{ hex: '#1a5c3a', position: 0 }, { hex: forestGreen, position: 1 }], 135)],
        cornerRadius: 4,
      }),
      frame('CampsiteInfo', {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 20, fontWeight: 800, color: white }),
          text(location, { fontSize: 13, fontWeight: 600, color: orange, letterSpacing: { value: 1, unit: 'PIXELS' } }),
          text(features, {
            fontSize: 14, fontWeight: 400, color: gray,
            lineHeight: { value: 180, unit: 'PERCENT' },
            size: { x: 500 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
    ],
  });
}

const campsiteSection = frame('CampsiteSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(darkGreen)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('PARTNERS', { fontSize: 12, fontWeight: 600, color: orange, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('提携キャンプ場', { fontSize: 36, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('CampsiteList', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        campsiteCard('ふもとっぱらキャンプ場', '静岡県富士宮市', '富士山の絶景を独占できるフリーサイト。広大な草原で開放感抜群。WILD BASE製品のレンタル・試用が可能。'),
        campsiteCard('北軽井沢スウィートグラス', '群馬県長野原町', '四季折々の美しい高原キャンプ場。薪ストーブ付きコテージも。WILD BASE直営ショップ併設。'),
        campsiteCard('笠置キャンプ場', '京都府笠置町', '木津川沿いの自然豊かなキャンプ場。関西エリアの拠点として、ギアの展示・体験イベントを定期開催。'),
      ],
    }),
  ],
});

// ─── Brand Story Section ───
const storySection = frame('StorySection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 80, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(forestGreen)],
  children: [
    rectangle('StoryImage', {
      size: { x: 480, y: 400 },
      fills: [gradient([{ hex: '#1a5c3a', position: 0 }, { hex: darkGreen, position: 1 }], 135)],
      cornerRadius: 8,
    }),
    frame('StoryContent', {
      autoLayout: vertical({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('OUR STORY', { fontSize: 12, fontWeight: 600, color: orange, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('自然への敬意を、\nギアに込めて。', {
          fontSize: 36, fontWeight: 800, color: white,
          letterSpacing: { value: 2, unit: 'PIXELS' },
          lineHeight: { value: 140, unit: 'PERCENT' },
        }),
        text('WILD BASE は2018年、長野県の小さな工房から始まりました。「日本の自然を、日本のギアで楽しむ」という想いのもと、国産素材にこだわり、職人の手で一つひとつ丁寧に作り上げています。\n\n大量生産ではなく、品質と耐久性を追求。使い込むほどに味わいが増し、一生寄り添えるギアを目指しています。', {
          fontSize: 15, fontWeight: 400, color: '#ffffffB3',
          lineHeight: { value: 200, unit: 'PERCENT' },
          layoutSizingHorizontal: 'FILL',
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),
  ],
});

// ─── Shop CTA Section ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 120, padY: 120, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#0a1f12', position: 0 }, { hex: darkGreen, position: 1 }], 160)],
  children: [
    text('キャンプシーズン到来', {
      fontSize: 40, fontWeight: 900, color: white,
      letterSpacing: { value: 3, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('今なら新規会員登録で全商品10% OFF。\n送料無料キャンペーンも実施中。', {
      fontSize: 16, fontWeight: 400, color: '#ffffff80',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    rectangle('CtaSpacer', { size: { x: 1, y: 16 }, opacity: 0 }),
    frame('CtaBtn', {
      autoLayout: horizontal({ padX: 72, padY: 20, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(orange)],
      children: [
        text('オンラインショップへ', { fontSize: 18, fontWeight: 700, color: white, letterSpacing: { value: 3, unit: 'PIXELS' } }),
      ],
    }),
    text('※ 初回購入に限り30日間返品保証', { fontSize: 12, fontWeight: 400, color: mutedGray, textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Footer Section ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid('#05120a')],
  strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
  children: [
    text('WILD BASE ワイルドベース', { fontSize: 20, fontWeight: 900, color: orange, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('カテゴリー', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('商品一覧', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('キャンプ場', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('ブランド', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('お問い合わせ', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('特定商取引法', { fontSize: 13, fontWeight: 400, color: mutedGray }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#ffffff0F')],
    }),
    text('© 2026 WILD BASE All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#3a4a32', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseCampingLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(darkGreen)],
  children: [
    navBar,
    heroSection,
    categoriesSection,
    productsSection,
    campsiteSection,
    storySection,
    ctaSection,
    footerSection,
  ],
});
