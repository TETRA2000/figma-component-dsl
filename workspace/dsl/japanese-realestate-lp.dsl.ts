import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const green = '#1a5f3a';
const greenBg = '#f0f7f4';
const greenLight = '#e8f5ec';
const red = '#c4543a';
const dark = '#1a1a1a';

// ─── Nav ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  strokes: [{ color: hex('#e5e5e5'), weight: 1, align: 'INSIDE' }],
  children: [
    text('SUMIKA 住まい', { fontSize: 20, fontWeight: 800, color: green }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('物件検索', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('エリア情報', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('お客様の声', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('会社概要', { fontSize: 14, fontWeight: 500, color: '#555555' }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(green)],
      cornerRadius: 6,
      children: [text('無料相談', { fontSize: 14, fontWeight: 600, color: '#ffffff' })],
    }),
  ],
});

// ─── Hero ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 40, padX: 120, padY: 80 }),
  fills: [gradient([{ hex: greenBg, position: 0 }, { hex: greenLight, position: 1 }], 135)],
  children: [
    text('理想の暮らしを、\nここから見つけよう', {
      fontSize: 44, fontWeight: 800, color: dark,
      lineHeight: { value: 140, unit: 'PERCENT' },
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    text('東京・神奈川・千葉・埼玉エリアの厳選物件を\nあなたのライフスタイルに合わせてご提案します', {
      fontSize: 16, fontWeight: 400, color: '#666666',
      lineHeight: { value: 180, unit: 'PERCENT' },
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('SearchBox', {
      autoLayout: horizontal({ spacing: 0, padX: 8, padY: 8, counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      cornerRadius: 12,
      children: [
        frame('Field1', {
          autoLayout: vertical({ spacing: 4, padX: 24, padY: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('エリア', { fontSize: 12, fontWeight: 600, color: '#999999' }),
            text('東京都', { fontSize: 15, fontWeight: 500, color: dark }),
          ],
        }),
        rectangle('Div1', { size: { x: 1, y: 40 }, fills: [solid('#e5e5e5')] }),
        frame('Field2', {
          autoLayout: vertical({ spacing: 4, padX: 24, padY: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('種別', { fontSize: 12, fontWeight: 600, color: '#999999' }),
            text('マンション', { fontSize: 15, fontWeight: 500, color: dark }),
          ],
        }),
        rectangle('Div2', { size: { x: 1, y: 40 }, fills: [solid('#e5e5e5')] }),
        frame('Field3', {
          autoLayout: vertical({ spacing: 4, padX: 24, padY: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('価格', { fontSize: 12, fontWeight: 600, color: '#999999' }),
            text('〜5,000万円', { fontSize: 15, fontWeight: 500, color: dark }),
          ],
        }),
        frame('SearchBtn', {
          autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(green)],
          cornerRadius: 8,
          children: [text('検索する', { fontSize: 15, fontWeight: 700, color: '#ffffff' })],
        }),
      ],
    }),
  ],
});

// ─── Stats ───
function statItem(value: string, label: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
    children: [
      text(value, { fontSize: 36, fontWeight: 800, color: green, textAlignHorizontal: 'CENTER' }),
      text(label, { fontSize: 14, fontWeight: 400, color: '#888888', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

const statsSection = frame('StatsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 48, padX: 120, padY: 64, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  strokes: [{ color: hex('#f0f0f0'), weight: 1, align: 'INSIDE' }],
  children: [
    statItem('15,000+', '取扱物件数'),
    rectangle('Div1', { size: { x: 1, y: 60 }, fills: [solid('#e5e5e5')] }),
    statItem('98.5%', '顧客満足度'),
    rectangle('Div2', { size: { x: 1, y: 60 }, fills: [solid('#e5e5e5')] }),
    statItem('30年', '創業実績'),
    rectangle('Div3', { size: { x: 1, y: 60 }, fills: [solid('#e5e5e5')] }),
    statItem('5,200+', '成約件数'),
  ],
});

// ─── Properties ───
function propertyCard(title: string, location: string, price: string, specs: string, tag?: string) {
  const tagNodes = tag
    ? [frame('Tag', {
        autoLayout: horizontal({ padX: 14, padY: 4 }),
        fills: [solid(green)],
        cornerRadius: 4,
        children: [text(tag, { fontSize: 12, fontWeight: 700, color: '#ffffff' })],
      })]
    : [];
  return frame(`Property: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    cornerRadius: 12,
    strokes: [{ color: hex('#e5e5e5'), weight: 1, align: 'INSIDE' }],
    clipContent: true,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ImgArea', {
        size: { x: undefined, y: 200 },
        autoLayout: horizontal({ padX: 12, padY: 12 }),
        fills: [gradient([{ hex: greenLight, position: 0 }, { hex: '#d0e8d6', position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
        children: tagNodes,
      }),
      frame('Info', {
        autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 18, fontWeight: 700, color: dark }),
          text(location, { fontSize: 13, fontWeight: 400, color: '#888888' }),
          text(specs, { fontSize: 13, fontWeight: 400, color: '#666666' }),
          text(price, { fontSize: 22, fontWeight: 800, color: red }),
        ],
      }),
    ],
  });
}

const propertiesSection = frame('PropertiesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('おすすめ物件', { fontSize: 32, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
        text('プロが厳選した注目の物件情報', { fontSize: 16, fontWeight: 400, color: '#888888', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('PropertyGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        propertyCard('パークタワー目黒', '東京都目黒区 目黒駅 徒歩5分', '4,980万円', '3LDK / 72.5m² / 築3年 / 15階', 'NEW'),
        propertyCard('グランドメゾン世田谷', '東京都世田谷区 三軒茶屋駅 徒歩8分', '6,280万円', '4LDK / 95.2m² / 築1年 / 8階', 'おすすめ'),
        propertyCard('レジデンス武蔵小杉', '神奈川県川崎市 武蔵小杉駅 徒歩3分', '3,780万円', '2LDK / 58.3m² / 築5年 / 22階'),
      ],
    }),
  ],
});

// ─── Flow ───
function flowStep(number: string, title: string, description: string) {
  return frame(`Step: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex('#e5e5e5'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(number, { fontSize: 36, fontWeight: 900, color: green, opacity: 0.2, textAlignHorizontal: 'CENTER' }),
      text(title, { fontSize: 18, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#666666',
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 240 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const flowSection = frame('FlowSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#f8f8f8')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('ご購入の流れ', { fontSize: 32, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
        text('はじめての方でも安心のサポート体制', { fontSize: 16, fontWeight: 400, color: '#888888', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('FlowGrid', {
      autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        flowStep('01', '無料相談', 'ご希望の条件をお聞かせください。専任のアドバイザーがご対応します。'),
        text('→', { fontSize: 24, fontWeight: 700, color: green }),
        flowStep('02', '物件見学', '気になる物件を実際にご見学いただけます。オンライン内覧も可能です。'),
        text('→', { fontSize: 24, fontWeight: 700, color: green }),
        flowStep('03', '契約・引渡し', '住宅ローンのご相談から契約手続きまで、ワンストップでサポートします。'),
      ],
    }),
  ],
});

// ─── CTA ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid(green)],
  children: [
    text('まずは無料相談から', { fontSize: 32, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('専任アドバイザーがあなたの理想の住まい探しをサポートします', { fontSize: 16, fontWeight: 400, color: '#ffffffCC', textAlignHorizontal: 'CENTER' }),
    frame('CTAActions', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        frame('Phone', {
          autoLayout: horizontal({ padX: 40, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 8,
          children: [text('☎ 0120-123-456', { fontSize: 20, fontWeight: 800, color: green })],
        }),
        frame('Online', {
          autoLayout: horizontal({ padX: 40, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 8,
          strokes: [{ color: hex('#ffffff'), weight: 2, align: 'INSIDE' }],
          children: [text('オンライン相談予約', { fontSize: 16, fontWeight: 700, color: '#ffffff' })],
        }),
      ],
    }),
    text('受付時間：10:00〜19:00（年中無休）', { fontSize: 13, fontWeight: 400, color: '#ffffff99', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Footer ───
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
        frame('Brand', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('SUMIKA 住まい', { fontSize: 18, fontWeight: 800, color: green }),
            text('理想の暮らしを、ここから', { fontSize: 13, fontWeight: 400, color: '#888888' }),
          ],
        }),
        frame('Links', {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            frame('Col1', {
              autoLayout: vertical({ spacing: 12 }),
              children: [
                text('サービス', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
                text('売買物件', { fontSize: 13, fontWeight: 400, color: '#888888' }),
                text('賃貸物件', { fontSize: 13, fontWeight: 400, color: '#888888' }),
                text('リノベーション', { fontSize: 13, fontWeight: 400, color: '#888888' }),
              ],
            }),
            frame('Col2', {
              autoLayout: vertical({ spacing: 12 }),
              children: [
                text('サポート', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
                text('住宅ローン相談', { fontSize: 13, fontWeight: 400, color: '#888888' }),
                text('よくある質問', { fontSize: 13, fontWeight: 400, color: '#888888' }),
                text('お問い合わせ', { fontSize: 13, fontWeight: 400, color: '#888888' }),
              ],
            }),
          ],
        }),
      ],
    }),
    frame('Bottom', {
      autoLayout: horizontal({ padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('© 2026 SUMIKA All rights reserved. 宅地建物取引業者 国土交通大臣(1)第12345号', { fontSize: 12, fontWeight: 400, color: '#555555' }),
      ],
    }),
  ],
});

export default frame('JapaneseRealEstateLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [navBar, heroSection, statsSection, propertiesSection, flowSection, ctaSection, footerSection],
});
