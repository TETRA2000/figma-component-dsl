import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const orange = '#ea580c';
const darkOrange = '#c2410c';
const cream = '#fef7ed';
const dark = '#1a1a1a';
const white = '#ffffff';

// ─── Navigation ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 64 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(white)],
  strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
  children: [
    frame('BrandGroup', {
      autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('🍜', { fontSize: 24, fontWeight: 400, color: orange }),
        text('ラーメン速達', { fontSize: 22, fontWeight: 900, color: orange, letterSpacing: { value: 2, unit: 'PIXELS' } }),
        text('RAMEN SOKUTATSU', { fontSize: 11, fontWeight: 600, color: '#9ca3af', letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
      children: [
        text('メニュー', { fontSize: 14, fontWeight: 500, color: '#374151' }),
        text('配達エリア', { fontSize: 14, fontWeight: 500, color: '#374151' }),
        text('ご注文方法', { fontSize: 14, fontWeight: 500, color: '#374151' }),
        frame('NavCTA', {
          autoLayout: horizontal({ padX: 20, padY: 8 }),
          fills: [solid(orange)],
          cornerRadius: 24,
          children: [
            text('今すぐ注文', { fontSize: 14, fontWeight: 700, color: white }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 560 },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    frame('HeroLeft', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 0, align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('HeroBadge', {
          autoLayout: horizontal({ padX: 16, padY: 6 }),
          fills: [solid('#fff7ed')],
          strokes: [{ color: hex(orange), weight: 1, align: 'INSIDE' }],
          cornerRadius: 20,
          children: [
            text('最短30分でお届け', { fontSize: 13, fontWeight: 600, color: orange }),
          ],
        }),
        text('アツアツの\nラーメンを\nご自宅に', {
          fontSize: 52, fontWeight: 900, color: dark,
          lineHeight: { value: 130, unit: 'PERCENT' },
          size: { x: 500 },
          textAutoResize: 'HEIGHT',
        }),
        text('こだわりの一杯を、出来たての美味しさのまま\nご自宅やオフィスにお届けします。', {
          fontSize: 16, fontWeight: 400, color: '#6b7280',
          lineHeight: { value: 180, unit: 'PERCENT' },
          size: { x: 420 },
          textAutoResize: 'HEIGHT',
        }),
        frame('HeroBtns', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            frame('PrimaryBtn', {
              autoLayout: horizontal({ padX: 36, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(orange)],
              cornerRadius: 32,
              children: [
                text('メニューを見る', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
              ],
            }),
            frame('SecondaryBtn', {
              autoLayout: horizontal({ padX: 36, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(white)],
              strokes: [{ color: hex(orange), weight: 2, align: 'INSIDE' }],
              cornerRadius: 32,
              children: [
                text('アプリで注文', { fontSize: 16, fontWeight: 700, color: orange, letterSpacing: { value: 1, unit: 'PIXELS' } }),
              ],
            }),
          ],
        }),
      ],
    }),
    frame('HeroRight', {
      size: { x: 600, y: 560 },
      autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: orange, position: 0 }, { hex: darkOrange, position: 1 }], 135)],
      children: [
        text('RAMEN', { fontSize: 80, fontWeight: 900, color: '#ffffff33', letterSpacing: { value: 12, unit: 'PIXELS' } }),
        text('DELIVERY', { fontSize: 40, fontWeight: 700, color: '#ffffff22', letterSpacing: { value: 8, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Menu Section ───
function menuCard(name: string, description: string, price: string, tag?: string) {
  const tagNodes = tag
    ? [frame('MenuTag', {
        autoLayout: horizontal({ padX: 10, padY: 4 }),
        fills: [solid(orange)],
        cornerRadius: 4,
        children: [text(tag, { fontSize: 11, fontWeight: 700, color: white })],
      })]
    : [];

  return frame(`Menu: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 12,
    clipContent: true,
    fills: [solid(white)],
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
    children: [
      frame('MenuImgArea', {
        size: { x: undefined, y: 160 },
        autoLayout: horizontal({ padX: 12, padY: 12 }),
        fills: [gradient([{ hex: '#f97316', position: 0 }, { hex: '#ea580c', position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
        children: tagNodes,
      }),
      frame('MenuBody', {
        autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 18, fontWeight: 700, color: dark }),
          text(description, {
            fontSize: 13, fontWeight: 400, color: '#6b7280',
            lineHeight: { value: 160, unit: 'PERCENT' },
            size: { x: 260 },
            textAutoResize: 'HEIGHT',
          }),
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(price, { fontSize: 22, fontWeight: 800, color: orange }),
              frame('AddBtn', {
                autoLayout: horizontal({ padX: 16, padY: 6 }),
                fills: [solid(orange)],
                cornerRadius: 20,
                children: [
                  text('追加', { fontSize: 13, fontWeight: 700, color: white }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

const menuSection = frame('MenuSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#f9fafb')],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('MENU', { fontSize: 13, fontWeight: 600, color: orange, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('人気メニュー', { fontSize: 32, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('MenuGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        menuCard('特製豚骨ラーメン', '濃厚な豚骨スープに自家製麺。チャーシュー3枚付き', '¥1,080', '人気No.1'),
        menuCard('味噌バターラーメン', '北海道味噌にバターの風味。コーンたっぷり', '¥1,150'),
        menuCard('醤油ラーメン', '鶏ガラベースの澄んだスープ。あっさり派に', '¥980'),
      ],
    }),
    frame('MenuGrid2', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        menuCard('辛味噌つけ麺', '特製辛味噌のつけ汁で楽しむ極太麺', '¥1,200', '期間限定'),
        menuCard('塩レモンラーメン', '爽やかなレモン香る塩ラーメン。夏季限定', '¥1,050'),
        menuCard('チャーシュー丼セット', 'お好きなラーメン+ミニチャーシュー丼', '¥1,380'),
      ],
    }),
  ],
});

// ─── Delivery Areas ───
function areaCard(area: string, time: string) {
  return frame(`Area: ${area}`, {
    autoLayout: vertical({ spacing: 8, padX: 32, padY: 24, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 12,
    children: [
      text(area, { fontSize: 18, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
      text(time, { fontSize: 14, fontWeight: 500, color: orange, textAlignHorizontal: 'CENTER' }),
    ],
  });
}

const deliverySection = frame('DeliverySection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('DELIVERY AREA', { fontSize: 13, fontWeight: 600, color: orange, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('配達エリア', { fontSize: 32, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('AreaGrid', {
      autoLayout: horizontal({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        areaCard('渋谷区', '約25分'),
        areaCard('新宿区', '約30分'),
        areaCard('港区', '約35分'),
        areaCard('目黒区', '約30分'),
        areaCard('世田谷区', '約40分'),
        areaCard('中野区', '約35分'),
      ],
    }),
    text('※ 交通状況により配達時間が前後する場合がございます', {
      fontSize: 13, fontWeight: 400, color: '#9ca3af', textAlignHorizontal: 'CENTER',
    }),
  ],
});

// ─── How to Order ───
function stepCard(step: string, title: string, description: string) {
  return frame(`Step: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 40, padY: 40, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 16,
    children: [
      frame('StepCircle', {
        size: { x: 56, y: 56 },
        autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(orange)],
        cornerRadius: 28,
        children: [
          text(step, { fontSize: 22, fontWeight: 800, color: white }),
        ],
      }),
      text(title, { fontSize: 20, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#6b7280',
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const howToSection = frame('HowToSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('HOW TO ORDER', { fontSize: 13, fontWeight: 600, color: orange, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('ご注文方法', { fontSize: 32, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('StepGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        stepCard('1', 'メニューを選ぶ', 'アプリまたはWebサイトから\nお好きなラーメンをお選びください'),
        stepCard('2', 'お届け先を入力', 'ご住所とお届け時間を\nご指定ください'),
        stepCard('3', 'アツアツをお届け', '専用の保温容器で\n出来たての美味しさをお届けします'),
      ],
    }),
  ],
});

// ─── App Download CTA ───
const appSection = frame('AppSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [gradient([{ hex: '#ea580c', position: 0 }, { hex: '#dc2626', position: 1 }], 135)],
  children: [
    frame('AppLeft', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 80, align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('アプリでもっと便利に', { fontSize: 32, fontWeight: 800, color: white }),
        text('初回ダウンロードで500円OFFクーポンプレゼント！\nポイントも貯まってお得にラーメンを楽しめます。', {
          fontSize: 16, fontWeight: 400, color: '#ffffffCC',
          lineHeight: { value: 180, unit: 'PERCENT' },
          size: { x: 440 },
          textAutoResize: 'HEIGHT',
        }),
        frame('AppBtns', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            frame('AppStoreBtn', {
              autoLayout: horizontal({ padX: 28, padY: 14 }),
              fills: [solid(white)],
              cornerRadius: 8,
              children: [
                text('App Store', { fontSize: 15, fontWeight: 700, color: dark }),
              ],
            }),
            frame('GooglePlayBtn', {
              autoLayout: horizontal({ padX: 28, padY: 14 }),
              fills: [solid(white)],
              cornerRadius: 8,
              children: [
                text('Google Play', { fontSize: 15, fontWeight: 700, color: dark }),
              ],
            }),
          ],
        }),
      ],
    }),
    frame('AppRight', {
      size: { x: 400, y: undefined },
      autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER', padY: 60 }),
      children: [
        frame('PhoneMock', {
          size: { x: 200, y: 360 },
          autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff22')],
          cornerRadius: 24,
          children: [
            text('APP', { fontSize: 32, fontWeight: 800, color: '#ffffff44', letterSpacing: { value: 8, unit: 'PIXELS' } }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Footer ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48 }),
  fills: [solid(dark)],
  children: [
    frame('FooterTop', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('FooterBrand', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('ラーメン速達', { fontSize: 20, fontWeight: 900, color: orange, letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('RAMEN SOKUTATSU', { fontSize: 11, fontWeight: 600, color: '#6b7280', letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('FooterLinks', {
          autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
          children: [
            text('メニュー', { fontSize: 13, fontWeight: 400, color: '#9ca3af' }),
            text('配達エリア', { fontSize: 13, fontWeight: 400, color: '#9ca3af' }),
            text('ご注文方法', { fontSize: 13, fontWeight: 400, color: '#9ca3af' }),
            text('お問い合わせ', { fontSize: 13, fontWeight: 400, color: '#9ca3af' }),
            text('利用規約', { fontSize: 13, fontWeight: 400, color: '#9ca3af' }),
          ],
        }),
      ],
    }),
    rectangle('FooterDivider', { size: { x: 1200, y: 1 }, fills: [solid('#333333')], layoutSizingHorizontal: 'FILL' }),
    text('© 2026 ラーメン速達 RAMEN SOKUTATSU All rights reserved.', {
      fontSize: 12, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER',
    }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseRamenDeliveryLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    navBar,
    heroSection,
    menuSection,
    deliverySection,
    howToSection,
    appSection,
    footerSection,
  ],
});
