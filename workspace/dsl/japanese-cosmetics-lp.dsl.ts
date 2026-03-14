import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

// Color palette - Japanese cosmetics pink/rose theme
const pink = '#c9788e';
const pinkLight = '#e8a0b4';
const pinkBg = '#fef3f0';
const warmBg = '#fdf8f5';
const borderColor = '#f0e8e0';
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
    text('SAKURA BEAUTY', { fontSize: 20, fontWeight: 700, color: pink, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('商品一覧', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('成分について', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('お客様の声', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('お問い合わせ', { fontSize: 14, fontWeight: 500, color: '#555555' }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(pink)],
      cornerRadius: 24,
      children: [
        text('今すぐ購入', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
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
          fills: [solid(pinkBg)],
          cornerRadius: 20,
          children: [
            text('新発売', { fontSize: 13, fontWeight: 600, color: pink }),
          ],
        }),
        text('あなたの肌に\n自然の恵みを', {
          fontSize: 48, fontWeight: 800, color: dark,
          lineHeight: { value: 130, unit: 'PERCENT' },
          size: { x: 500 },
          textAutoResize: 'HEIGHT',
        }),
        text('日本古来の美容成分と最新テクノロジーが融合した\nプレミアムスキンケアシリーズ', {
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
              fills: [gradient([{ hex: pink, position: 0 }, { hex: '#d4909e', position: 1 }], 135)],
              cornerRadius: 28,
              children: [
                text('詳しく見る', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
            frame('SecondaryBtn', {
              autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 28,
              strokes: [{ color: hex(pink), weight: 2, align: 'INSIDE' }],
              children: [
                text('無料サンプル', { fontSize: 16, fontWeight: 600, color: pink }),
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
        frame('ProductPlaceholder', {
          size: { x: 300, y: 400 },
          children: [
            rectangle('ProductBottle', {
              size: { x: 120, y: 280 },
              fills: [gradient([{ hex: '#f8e8ee', position: 0 }, { hex: pink, position: 1 }], 180)],
              cornerRadius: 20,
              x: 90,
              y: 60,
            }),
            ellipse('ProductGlow', {
              size: { x: 250, y: 250 },
              fills: [solid(pink, 0.15)],
              x: 25,
              y: 75,
            }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Features Section ───
function featureCard(icon: string, title: string, description: string) {
  return frame(`Feature: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 40, counterAlign: 'CENTER' }),
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
        size: { x: 260 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const featuresSection = frame('FeaturesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(warmBg)],
  children: [
    text('こだわりの3つのポイント', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('お肌のことを第一に考えた処方設計', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('FeatureGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        featureCard('🌸', '天然由来成分98%', '桜エキス・米ぬか・椿オイルなど、日本の自然が育んだ美容成分をたっぷり配合'),
        featureCard('🧪', '皮膚科医監修', '敏感肌の方にも安心してお使いいただけるよう、皮膚科専門医が処方を監修'),
        featureCard('🌿', '無添加処方', 'パラベン・合成着色料・鉱物油不使用。お肌に優しい無添加処方にこだわりました'),
      ],
    }),
  ],
});

// ─── Products Section ───
function productCard(name: string, price: string, tag?: string) {
  const tagNode = tag
    ? [frame('ProductTag', {
        autoLayout: horizontal({ padX: 12, padY: 4 }),
        fills: [solid(pink)],
        cornerRadius: 12,
        children: [
          text(tag, { fontSize: 11, fontWeight: 700, color: '#ffffff' }),
        ],
      })]
    : [];

  return frame(`Product: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    cornerRadius: 16,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    clipContent: true,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ProductImgArea', {
        size: { x: undefined, y: 200 },
        autoLayout: horizontal({ padX: 12, padY: 12 }),
        fills: [gradient([{ hex: pinkBg, position: 0 }, { hex: '#fdf0e8', position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
        children: tagNode,
      }),
      frame('ProductInfo', {
        autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 15, fontWeight: 600, color: dark }),
          text(price, { fontSize: 18, fontWeight: 700, color: pink }),
        ],
      }),
    ],
  });
}

const productsSection = frame('ProductsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('人気商品', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('お客様に愛されるベストセラー商品', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('ProductGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        productCard('桜モイスチャークリーム', '¥4,980', 'BEST SELLER'),
        productCard('米ぬか洗顔フォーム', '¥2,480'),
        productCard('椿オイル美容液', '¥6,980', 'NEW'),
        productCard('抹茶フェイスマスク', '¥1,980'),
      ],
    }),
  ],
});

// ─── Testimonials Section ───
function testimonialCard(name: string, testimonialText: string, rating: number) {
  return frame(`Testimonial: ${name}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 32 }),
    fills: [solid('#ffffff')],
    cornerRadius: 16,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text('★'.repeat(rating) + '☆'.repeat(5 - rating), { fontSize: 16, color: '#f5a623' }),
      text(testimonialText, {
        fontSize: 14, fontWeight: 400, color: '#444444',
        lineHeight: { value: 180, unit: 'PERCENT' },
        size: { x: 260 },
        textAutoResize: 'HEIGHT',
      }),
      frame('Author', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          ellipse('Avatar', {
            size: { x: 40, y: 40 },
            fills: [gradient([{ hex: pink, position: 0 }, { hex: pinkLight, position: 1 }], 135)],
          }),
          text(name, { fontSize: 14, fontWeight: 600, color: dark }),
        ],
      }),
    ],
  });
}

const testimonialsSection = frame('TestimonialsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(warmBg)],
  children: [
    text('お客様の声', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('実際にご使用いただいたお客様からの感想', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('TestimonialGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        testimonialCard('田中 美咲 様', '使い始めて2週間で肌のハリが変わりました。朝のスキンケアが楽しみになりました。', 5),
        testimonialCard('佐藤 花子 様', '敏感肌ですが、刺激もなく安心して使えています。香りも自然で心地よいです。', 5),
        testimonialCard('鈴木 優子 様', '母と一緒に使っています。年齢に関係なく使える万能クリームです。', 4),
      ],
    }),
  ],
});

// ─── CTA Section ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 120, padY: 96, counterAlign: 'CENTER', align: 'CENTER' }),
  fills: [gradient([{ hex: pink, position: 0 }, { hex: '#d4909e', position: 1 }], 135)],
  children: [
    text('初回限定 50%OFF', { fontSize: 36, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('今なら送料無料＆30日間返金保証付き', { fontSize: 16, fontWeight: 400, color: '#ffffffE6', textAlignHorizontal: 'CENTER' }),
    frame('Pricing', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'MAX' }),
      children: [
        text('¥9,960', { fontSize: 20, fontWeight: 400, color: '#ffffff99', textDecoration: 'STRIKETHROUGH' }),
        text('¥4,980', { fontSize: 40, fontWeight: 800, color: '#ffffff' }),
      ],
    }),
    frame('CTAButton', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      cornerRadius: 32,
      children: [
        text('今すぐ申し込む', { fontSize: 18, fontWeight: 700, color: pink }),
      ],
    }),
    text('※ 定期縛りなし・いつでも解約可能', { fontSize: 13, fontWeight: 400, color: '#ffffffCC', textAlignHorizontal: 'CENTER' }),
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
            text('SAKURA BEAUTY', { fontSize: 18, fontWeight: 700, color: pink, letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('日本の美を、あなたの肌へ', { fontSize: 13, fontWeight: 400, color: '#888888' }),
          ],
        }),
        frame('FooterLinks', {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            footerCol('商品', ['スキンケア', 'メイクアップ', 'ボディケア']),
            footerCol('サポート', ['よくある質問', 'お問い合わせ', '返品・交換']),
            footerCol('会社情報', ['会社概要', 'プライバシーポリシー', '特定商取引法に基づく表記']),
          ],
        }),
      ],
    }),
    frame('FooterBottom', {
      autoLayout: horizontal({ padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('© 2026 SAKURA BEAUTY. All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER' }),
      ],
    }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseCosmeticsLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    navBar,
    heroSection,
    featuresSection,
    productsSection,
    testimonialsSection,
    ctaSection,
    footerSection,
  ],
});
