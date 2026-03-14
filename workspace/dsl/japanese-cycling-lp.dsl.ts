import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

// Color palette - Japanese Cycling electric blue with lime theme
const blue = '#0284c7';
const blueLight = '#38bdf8';
const blueDark = '#0369a1';
const lime = '#84cc16';
const limeDark = '#65a30d';
const blueBg = '#f0f9ff';
const lightBg = '#f8fdf0';
const borderColor = '#e0e8f0';
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
        text('PEDAL HOUSE', { fontSize: 18, fontWeight: 800, color: blue, letterSpacing: { value: 2, unit: 'PIXELS' } }),
        text('ペダルハウス', { fontSize: 12, fontWeight: 500, color: textGray }),
      ],
    }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('バイク', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('サービス', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('イベント', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('店舗情報', { fontSize: 14, fontWeight: 500, color: '#555555' }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(blue)],
      cornerRadius: 24,
      children: [
        text('来店予約', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#0c4a6e', position: 0 }, { hex: blue, position: 1 }], 135)],
  children: [
    frame('HeroContent', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('HeroBadge', {
          autoLayout: horizontal({ padX: 16, padY: 6 }),
          fills: [solid(lime)],
          cornerRadius: 20,
          children: [
            text('2026 NEW MODEL', { fontSize: 13, fontWeight: 700, color: '#ffffff' }),
          ],
        }),
        text('風を切って\n走ろう', {
          fontSize: 52, fontWeight: 900, color: '#ffffff',
          lineHeight: { value: 130, unit: 'PERCENT' },
          size: { x: 500 },
          textAutoResize: 'HEIGHT',
        }),
        text('ロードバイクからシティサイクルまで、あなたの\nライフスタイルに合った最高の一台を見つけよう', {
          fontSize: 16, fontWeight: 400, color: '#ffffffCC',
          lineHeight: { value: 180, unit: 'PERCENT' },
          size: { x: 440 },
          textAutoResize: 'HEIGHT',
        }),
        frame('HeroActions', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            frame('PrimaryBtn', {
              autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(lime)],
              cornerRadius: 28,
              children: [
                text('ラインナップを見る', { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
              ],
            }),
            frame('SecondaryBtn', {
              autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 28,
              strokes: [{ color: hex('#ffffff'), weight: 2, align: 'INSIDE' }],
              children: [
                text('試乗予約', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
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
        frame('BikePlaceholder', {
          size: { x: 400, y: 300 },
          children: [
            rectangle('BikeWheel1', {
              size: { x: 120, y: 120 },
              fills: [solid('#ffffff', 0.15)],
              cornerRadius: 60,
              strokes: [{ color: hex('#ffffff', 0.5), weight: 3, align: 'INSIDE' }],
              x: 40,
              y: 140,
            }),
            rectangle('BikeWheel2', {
              size: { x: 120, y: 120 },
              fills: [solid('#ffffff', 0.15)],
              cornerRadius: 60,
              strokes: [{ color: hex('#ffffff', 0.5), weight: 3, align: 'INSIDE' }],
              x: 240,
              y: 140,
            }),
            rectangle('BikeFrame', {
              size: { x: 200, y: 8 },
              fills: [solid(lime)],
              cornerRadius: 4,
              x: 100,
              y: 160,
            }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Bike Categories Section ───
function categoryCard(title: string, description: string, priceRange: string, icon: string) {
  return frame(`Category: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 16,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('CategoryIcon', {
        size: { x: 64, y: 64 },
        fills: [gradient([{ hex: blue, position: 0 }, { hex: blueLight, position: 1 }], 135)],
        cornerRadius: 32,
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        children: [
          text(icon, { fontSize: 28 }),
        ],
      }),
      text(title, { fontSize: 20, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: textGray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 300 },
        textAutoResize: 'HEIGHT',
      }),
      text(priceRange, { fontSize: 16, fontWeight: 700, color: blue, textAlignHorizontal: 'CENTER' }),
    ],
  });
}

const categoriesSection = frame('CategoriesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('バイクカテゴリー', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('あなたの走りに合った一台を', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('CategoryGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        categoryCard('ロードバイク', '高速走行やロングライドに最適。軽量カーボンフレームで快適な走りを実現', '¥120,000〜', 'RD'),
        categoryCard('マウンテンバイク', 'オフロードやトレイルを駆け抜ける。高い走破性と耐久性を備えた本格モデル', '¥98,000〜', 'MT'),
        categoryCard('シティサイクル', '毎日の通勤・通学に。快適性と実用性を両立したスタイリッシュモデル', '¥45,000〜', 'CT'),
      ],
    }),
  ],
});

// ─── Service Menu Section ───
function serviceCard(title: string, description: string, price: string) {
  return frame(`Service: ${title}`, {
    autoLayout: horizontal({ spacing: 20, padX: 28, padY: 24, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ServiceDot', {
        size: { x: 8, y: 8 },
        fills: [solid(lime)],
        cornerRadius: 4,
      }),
      frame('ServiceInfo', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 16, fontWeight: 700, color: dark }),
          text(description, { fontSize: 14, fontWeight: 400, color: textGray, lineHeight: { value: 170, unit: 'PERCENT' } }),
        ],
      }),
      text(price, { fontSize: 16, fontWeight: 700, color: blue }),
    ],
  });
}

const serviceSection = frame('ServiceSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(blueBg)],
  children: [
    text('サービスメニュー', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('購入後も安心のサポート体制', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('ServiceList', {
      autoLayout: vertical({ spacing: 12 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        serviceCard('修理・メンテナンス', 'パンク修理からオーバーホールまで。経験豊富なメカニックが対応します', '¥1,100〜'),
        serviceCard('フィッティング', '体格やライディングスタイルに合わせた最適なポジション調整', '¥5,500'),
        serviceCard('レンタサイクル', '試してから決めたい方に。最新モデルを1日からレンタル可能', '¥3,300/日'),
      ],
    }),
  ],
});

// ─── Featured Bikes Section ───
function bikeCard(name: string, category: string, price: string, spec: string) {
  return frame(`Bike: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    cornerRadius: 16,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    clipContent: true,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('BikeImgArea', {
        size: { x: undefined, y: 220 },
        autoLayout: horizontal({ padX: 16, padY: 16 }),
        fills: [gradient([{ hex: blueBg, position: 0 }, { hex: '#e0f2fe', position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('BikeTag', {
            autoLayout: horizontal({ padX: 12, padY: 4 }),
            fills: [solid(lime)],
            cornerRadius: 12,
            children: [
              text(category, { fontSize: 11, fontWeight: 700, color: '#ffffff' }),
            ],
          }),
        ],
      }),
      frame('BikeInfo', {
        autoLayout: vertical({ spacing: 8, padX: 24, padY: 20 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 17, fontWeight: 700, color: dark }),
          text(spec, { fontSize: 13, fontWeight: 400, color: textGray }),
          text(price, { fontSize: 20, fontWeight: 800, color: blue }),
        ],
      }),
    ],
  });
}

const featuredSection = frame('FeaturedSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('注目のバイク', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('スタッフおすすめの厳選モデル', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('BikeGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        bikeCard('AERO SWIFT R9', 'ROAD', '¥298,000', 'カーボンフレーム / 22速 / 7.2kg'),
        bikeCard('TRAIL BLAZER X7', 'MTB', '¥178,000', 'アルミフレーム / フルサス / 29er'),
        bikeCard('URBAN GLIDE S3', 'CITY', '¥68,000', 'クロモリフレーム / 内装8速 / ベルトドライブ'),
      ],
    }),
  ],
});

// ─── Cycling Events Section ───
function eventItem(date: string, title: string, description: string) {
  return frame(`Event: ${title}`, {
    autoLayout: horizontal({ spacing: 24, padX: 24, padY: 20, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('EventDate', {
        size: { x: 80, y: 64 },
        fills: [solid(blue)],
        cornerRadius: 8,
        autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
        children: [
          text(date, { fontSize: 14, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        ],
      }),
      frame('EventInfo', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 16, fontWeight: 700, color: dark }),
          text(description, { fontSize: 14, fontWeight: 400, color: textGray, lineHeight: { value: 170, unit: 'PERCENT' } }),
        ],
      }),
      frame('EventJoinBtn', {
        autoLayout: horizontal({ padX: 20, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(lime)],
        cornerRadius: 20,
        children: [
          text('参加する', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
        ],
      }),
    ],
  });
}

const eventsSection = frame('EventsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(lightBg)],
  children: [
    text('イベント情報', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('仲間と一緒に走ろう', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('EventsList', {
      autoLayout: vertical({ spacing: 12 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        eventItem('4/12\nSAT', '初心者ライド in 多摩川', '平坦コース30km。初めてのグループライドにぴったり'),
        eventItem('4/20\nSUN', 'ヒルクライムチャレンジ', '箱根旧道を攻略。上級者向けのチャレンジイベント'),
        eventItem('5/3\nSAT', 'メンテナンス講座', '自分でできるパンク修理・チェーン清掃を学ぼう'),
      ],
    }),
  ],
});

// ─── Store Info Section ───
const storeSection = frame('StoreSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    frame('StoreMap', {
      size: { x: 480, y: 320 },
      fills: [gradient([{ hex: blueBg, position: 0 }, { hex: '#e0f2fe', position: 1 }], 135)],
      cornerRadius: 16,
      autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
      children: [
        text('MAP', { fontSize: 32, fontWeight: 700, color: blue, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('StoreInfo', {
      autoLayout: vertical({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('店舗情報', { fontSize: 28, fontWeight: 700, color: dark }),
        frame('InfoRow1', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('PEDAL HOUSE ペダルハウス 本店', { fontSize: 16, fontWeight: 600, color: dark }),
            text('〒150-0001 東京都渋谷区神宮前3-15-8', { fontSize: 14, fontWeight: 400, color: textGray }),
          ],
        }),
        frame('InfoRow2', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('営業時間', { fontSize: 14, fontWeight: 700, color: dark }),
            text('平日 11:00〜20:00 / 土日祝 10:00〜19:00', { fontSize: 14, fontWeight: 400, color: textGray }),
            text('定休日: 毎週火曜日', { fontSize: 14, fontWeight: 400, color: textGray }),
          ],
        }),
        frame('InfoRow3', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('TEL: 03-XXXX-XXXX', { fontSize: 14, fontWeight: 600, color: blue }),
            text('駐車場: 3台 / 駐輪場: 20台', { fontSize: 14, fontWeight: 400, color: textGray }),
          ],
        }),
        frame('StoreBtn', {
          autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(blue)],
          cornerRadius: 24,
          children: [
            text('Google Maps で開く', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
      ],
    }),
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
            text('PEDAL HOUSE', { fontSize: 18, fontWeight: 800, color: blue, letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('あなたの自転車ライフをサポート', { fontSize: 13, fontWeight: 400, color: '#888888' }),
          ],
        }),
        frame('FooterLinks', {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            footerCol('バイク', ['ロードバイク', 'マウンテンバイク', 'シティサイクル']),
            footerCol('サービス', ['修理・メンテナンス', 'フィッティング', 'レンタル']),
            footerCol('情報', ['イベント', 'ブログ', 'プライバシーポリシー']),
          ],
        }),
      ],
    }),
    frame('FooterBottom', {
      autoLayout: horizontal({ padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('© 2026 PEDAL HOUSE. All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER' }),
      ],
    }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseCyclingLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    navBar,
    heroSection,
    categoriesSection,
    serviceSection,
    featuredSection,
    eventsSection,
    storeSection,
    footerSection,
  ],
});
