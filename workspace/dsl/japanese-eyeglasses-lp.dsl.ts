import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const gray = '#374151';
const darkGray = '#1f2937';
const darkest = '#111827';
const gold = '#b8860b';
const lightGold = '#d4a843';
const cream = '#faf8f3';
const white = '#ffffff';

// ─── Navigation ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(white)],
  strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
  children: [
    frame('BrandGroup', {
      autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('眼鏡工房', { fontSize: 24, fontWeight: 900, color: gray, letterSpacing: { value: 3, unit: 'PIXELS' } }),
        rectangle('BrandDivider', { size: { x: 1, y: 24 }, fills: [solid('#d1d5db')] }),
        text('MEGANE KOUBOU', { fontSize: 12, fontWeight: 600, color: gold, letterSpacing: { value: 3, unit: 'PIXELS' } }),
      ],
    }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('フレーム', { fontSize: 14, fontWeight: 500, color: gray }),
        text('レンズ', { fontSize: 14, fontWeight: 500, color: gray }),
        text('視力検査', { fontSize: 14, fontWeight: 500, color: gray }),
        text('店舗案内', { fontSize: 14, fontWeight: 500, color: gray }),
        frame('NavCTA', {
          autoLayout: horizontal({ padX: 24, padY: 10 }),
          fills: [solid(gray)],
          cornerRadius: 4,
          children: [
            text('来店予約', { fontSize: 14, fontWeight: 600, color: white }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 600 },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    frame('HeroLeft', {
      autoLayout: vertical({ spacing: 28, padX: 120, align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('SINCE 1985', { fontSize: 12, fontWeight: 600, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('あなたらしい\nメガネを', {
          fontSize: 52, fontWeight: 900, color: darkest,
          lineHeight: { value: 135, unit: 'PERCENT' },
          size: { x: 480 },
          textAutoResize: 'HEIGHT',
        }),
        text('一人ひとりの個性に寄り添い、\n最高の見え心地とデザインをご提案します。', {
          fontSize: 16, fontWeight: 400, color: '#6b7280',
          lineHeight: { value: 180, unit: 'PERCENT' },
          size: { x: 400 },
          textAutoResize: 'HEIGHT',
        }),
        frame('HeroBtns', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            frame('PrimaryBtn', {
              autoLayout: horizontal({ padX: 40, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(gray)],
              cornerRadius: 4,
              children: [
                text('コレクションを見る', { fontSize: 15, fontWeight: 600, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
              ],
            }),
            frame('SecondaryBtn', {
              autoLayout: horizontal({ padX: 40, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [],
              strokes: [{ color: hex(gray), weight: 1, align: 'INSIDE' }],
              cornerRadius: 4,
              children: [
                text('来店予約', { fontSize: 15, fontWeight: 600, color: gray, letterSpacing: { value: 1, unit: 'PIXELS' } }),
              ],
            }),
          ],
        }),
      ],
    }),
    frame('HeroRight', {
      size: { x: 560, y: 600 },
      autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: gray, position: 0 }, { hex: darkest, position: 1 }], 135)],
      children: [
        frame('GlassesIcon', {
          size: { x: 200, y: 100 },
          autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex('#ffffff33'), weight: 2, align: 'INSIDE' }],
          cornerRadius: 50,
          children: [
            text('MEGANE', { fontSize: 24, fontWeight: 700, color: '#ffffff33', letterSpacing: { value: 6, unit: 'PIXELS' } }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Frame Categories ───
function categoryCard(name: string, enName: string, description: string) {
  return frame(`Category: ${name}`, {
    autoLayout: vertical({ spacing: 16, padX: 0, padY: 0 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('CategoryImg', {
        size: { x: undefined, y: 220 },
        autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [gradient([{ hex: '#4b5563', position: 0 }, { hex: gray, position: 1 }], 135)],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
        children: [
          text(enName, { fontSize: 16, fontWeight: 600, color: '#ffffff44', letterSpacing: { value: 4, unit: 'PIXELS' } }),
        ],
      }),
      text(name, { fontSize: 20, fontWeight: 700, color: darkest }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#6b7280',
        lineHeight: { value: 170, unit: 'PERCENT' },
        size: { x: 260 },
        textAutoResize: 'HEIGHT',
      }),
      frame('ViewMore', {
        autoLayout: horizontal({ spacing: 4 }),
        children: [
          text('詳しく見る', { fontSize: 13, fontWeight: 600, color: gold }),
          text('→', { fontSize: 13, fontWeight: 600, color: gold }),
        ],
      }),
    ],
  });
}

const categoriesSection = frame('CategoriesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('FRAMES', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('フレームカテゴリー', { fontSize: 32, fontWeight: 800, color: darkest, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('CategoryGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        categoryCard('クラシック', 'CLASSIC', 'ウェリントン、ボストンなど\n時代を超えて愛される定番フレーム'),
        categoryCard('モダン', 'MODERN', 'ミニマルで洗練されたデザイン。\nビジネスシーンにも最適'),
        categoryCard('スポーツ', 'SPORTS', '軽量で丈夫な素材を使用。\nアクティブなライフスタイルに'),
        categoryCard('ラグジュアリー', 'LUXURY', 'チタン・金張りなど最高級素材。\n特別な一本をお探しの方に'),
      ],
    }),
  ],
});

// ─── Lens Options ───
function lensOption(name: string, price: string, features: string) {
  return frame(`Lens: ${name}`, {
    autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 8,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
    children: [
      frame('LensIcon', {
        size: { x: 80, y: 80 },
        autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(cream)],
        children: [
          frame('LensDot', {
            size: { x: 32, y: 32 },
            fills: [gradient([{ hex: gold, position: 0 }, { hex: lightGold, position: 1 }], 135)],
            cornerRadius: 16,
            children: [],
          }),
        ],
      }),
      frame('LensInfo', {
        autoLayout: vertical({ spacing: 4, padX: 20, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 16, fontWeight: 700, color: darkest }),
          text(features, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
        ],
      }),
      frame('LensPrice', {
        autoLayout: horizontal({ padX: 24, counterAlign: 'CENTER' }),
        children: [
          text(price, { fontSize: 18, fontWeight: 700, color: gold }),
        ],
      }),
    ],
  });
}

const lensSection = frame('LensSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#f9fafb')],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('LENS', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('レンズオプション', { fontSize: 32, fontWeight: 800, color: darkest, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('LensList', {
      autoLayout: vertical({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        lensOption('薄型非球面レンズ', '¥8,800〜', 'UVカット・反射防止コート付き'),
        lensOption('遠近両用レンズ', '¥16,500〜', '境目のない自然な見え心地'),
        lensOption('ブルーライトカットレンズ', '¥11,000〜', 'PC作業が多い方におすすめ'),
        lensOption('偏光サングラスレンズ', '¥13,200〜', 'ドライブ・アウトドアに最適'),
      ],
    }),
  ],
});

// ─── Eye Exam Section ───
const examSection = frame('ExamSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    frame('ExamImg', {
      size: { x: 600, y: undefined },
      autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER', padY: 96 }),
      fills: [solid(cream)],
      children: [
        frame('ExamIcon', {
          size: { x: 160, y: 160 },
          autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(white)],
          cornerRadius: 80,
          strokes: [{ color: hex(gold), weight: 2, align: 'INSIDE' }],
          children: [
            text('検査', { fontSize: 32, fontWeight: 800, color: gold }),
          ],
        }),
      ],
    }),
    frame('ExamContent', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 96 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ExamHeader', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('EYE EXAM', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' } }),
            text('視力検査サービス', { fontSize: 32, fontWeight: 800, color: darkest }),
          ],
        }),
        text('国家資格を持つ認定眼鏡士が、最新の検査機器を使って\n丁寧に視力検査を行います。お気軽にご相談ください。', {
          fontSize: 15, fontWeight: 400, color: '#6b7280',
          lineHeight: { value: 180, unit: 'PERCENT' },
          size: { x: 500 },
          textAutoResize: 'HEIGHT',
        }),
        frame('ExamFeatures', {
          autoLayout: vertical({ spacing: 16 }),
          children: [
            ...[
              '所要時間：約20分（予約優先）',
              '検査料：メガネご購入の方は無料',
              'コンタクトレンズの処方にも対応',
              'お子様の視力検査も承ります',
            ].map((feat) =>
              frame(`Feat: ${feat}`, {
                autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
                children: [
                  frame('CheckMark', {
                    size: { x: 20, y: 20 },
                    autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
                    fills: [solid(gold)],
                    cornerRadius: 10,
                    children: [
                      text('✓', { fontSize: 12, fontWeight: 700, color: white }),
                    ],
                  }),
                  text(feat, { fontSize: 14, fontWeight: 400, color: '#4b5563' }),
                ],
              })
            ),
          ],
        }),
        frame('ExamCTA', {
          autoLayout: horizontal({ padX: 36, padY: 14 }),
          fills: [solid(gold)],
          cornerRadius: 4,
          children: [
            text('検査を予約する', { fontSize: 15, fontWeight: 600, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Store Locations ───
function storeCard(name: string, address: string, hours: string, phone: string) {
  return frame(`Store: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 8,
    clipContent: true,
    fills: [solid(white)],
    children: [
      frame('StoreMapArea', {
        size: { x: undefined, y: 200 },
        autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#e5e7eb')],
        layoutSizingHorizontal: 'FILL',
        children: [
          text('MAP', { fontSize: 20, fontWeight: 700, color: '#9ca3af', letterSpacing: { value: 4, unit: 'PIXELS' } }),
        ],
      }),
      frame('StoreInfo', {
        autoLayout: vertical({ spacing: 12, padX: 28, padY: 28 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 22, fontWeight: 800, color: darkest }),
          ...[
            ['住所', address],
            ['営業時間', hours],
            ['電話', phone],
          ].map(([label, value]) =>
            frame(`StoreRow: ${label}`, {
              autoLayout: horizontal({ spacing: 12 }),
              children: [
                text(label, { fontSize: 13, fontWeight: 600, color: gold, size: { x: 64 }, textAutoResize: 'HEIGHT' }),
                text(value, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              ],
            })
          ),
          frame('StoreBtn', {
            autoLayout: horizontal({ padX: 0, padY: 8 }),
            children: [
              text('アクセス詳細 →', { fontSize: 13, fontWeight: 600, color: gold }),
            ],
          }),
        ],
      }),
    ],
  });
}

const storeSection = frame('StoreSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('STORES', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('店舗案内', { fontSize: 32, fontWeight: 800, color: darkest, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('StoreGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        storeCard('銀座本店', '東京都中央区銀座4-5-6 銀座メガネビル1F', '10:00〜20:00（水曜定休）', '03-1234-5678'),
        storeCard('表参道店', '東京都渋谷区神宮前5-10-1 表参道ヒルズB1F', '11:00〜21:00（年中無休）', '03-9876-5432'),
      ],
    }),
  ],
});

// ─── Footer ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48 }),
  fills: [solid(darkest)],
  children: [
    frame('FooterTop', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('FooterBrand', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('眼鏡工房', { fontSize: 20, fontWeight: 900, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('MEGANE KOUBOU', { fontSize: 11, fontWeight: 600, color: gold, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('FooterLinks', {
          autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
          children: [
            text('フレーム', { fontSize: 13, fontWeight: 400, color: '#9ca3af' }),
            text('レンズ', { fontSize: 13, fontWeight: 400, color: '#9ca3af' }),
            text('視力検査', { fontSize: 13, fontWeight: 400, color: '#9ca3af' }),
            text('店舗案内', { fontSize: 13, fontWeight: 400, color: '#9ca3af' }),
            text('お問い合わせ', { fontSize: 13, fontWeight: 400, color: '#9ca3af' }),
          ],
        }),
      ],
    }),
    rectangle('FooterDivider', { size: { x: 1200, y: 1 }, fills: [solid('#333333')], layoutSizingHorizontal: 'FILL' }),
    text('© 2026 眼鏡工房 MEGANE KOUBOU All rights reserved.', {
      fontSize: 12, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER',
    }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseEyeglassesLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    navBar,
    heroSection,
    categoriesSection,
    lensSection,
    examSection,
    storeSection,
    footerSection,
  ],
});
