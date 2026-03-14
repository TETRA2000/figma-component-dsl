import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const blue = '#2563eb';
const orange = '#f97316';
const dark = '#1a1a1a';
const darkBg = '#111827';
const lightBg = '#f8fafc';

const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
  children: [
    frame('Brand', {
      autoLayout: vertical({ spacing: 2 }),
      children: [
        text('水道の達人', { fontSize: 22, fontWeight: 800, color: blue, letterSpacing: 2 }),
        text('SUIDOU NO TATSUJIN', { fontSize: 9, fontWeight: 400, color: '#93c5fd', letterSpacing: 3 }),
      ],
    }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: ['サービス', '料金案内', '対応エリア', 'お客様の声'].map(t =>
        text(t, { fontSize: 14, fontWeight: 500, color: '#555555' })
      ),
    }),
    frame('NavRight', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        text('0120-XXX-XXX', { fontSize: 16, fontWeight: 800, color: orange }),
        frame('NavCta', {
          autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(orange)],
          cornerRadius: 8,
          children: [text('今すぐ相談', { fontSize: 14, fontWeight: 700, color: '#ffffff' })],
        }),
      ],
    }),
  ],
});

const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: blue, position: 0 }, { hex: '#1d4ed8', position: 0.5 }, { hex: '#1e40af', position: 1 }], 160)],
  children: [
    frame('Badge', {
      autoLayout: horizontal({ padX: 24, padY: 8 }),
      fills: [solid(orange)],
      cornerRadius: 24,
      children: [text('24時間365日対応', { fontSize: 14, fontWeight: 700, color: '#ffffff' })],
    }),
    text('水のトラブル、\n即日解決', {
      fontSize: 52, fontWeight: 900, color: '#ffffff',
      lineHeight: { value: 130, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    text('水漏れ・つまり・修理・設置工事まで。\n最短30分で駆けつけ、経験豊富なプロが迅速対応。\n見積もり無料・出張費無料・深夜早朝割増なし。', {
      fontSize: 16, fontWeight: 400, color: '#ffffffCC',
      lineHeight: { value: 200, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 520 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroActions', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('PrimaryBtn', {
          autoLayout: horizontal({ padX: 48, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(orange)],
          cornerRadius: 10,
          children: [text('無料で相談する', { fontSize: 17, fontWeight: 800, color: '#ffffff' })],
        }),
        frame('SecondaryBtn', {
          autoLayout: horizontal({ padX: 40, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 10,
          fills: [solid('#ffffff26')],
          strokes: [{ color: hex('#ffffff4D'), weight: 2, align: 'INSIDE' }],
          children: [text('料金を確認する', { fontSize: 16, fontWeight: 600, color: '#ffffff' })],
        }),
      ],
    }),
    frame('Stats', {
      autoLayout: horizontal({ spacing: 48 }),
      children: [
        frame('Stat1', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), children: [
          text('50,000+', { fontSize: 28, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
          text('施工実績', { fontSize: 13, fontWeight: 400, color: '#ffffff99', textAlignHorizontal: 'CENTER' }),
        ]}),
        frame('Stat2', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), children: [
          text('98.5%', { fontSize: 28, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
          text('お客様満足度', { fontSize: 13, fontWeight: 400, color: '#ffffff99', textAlignHorizontal: 'CENTER' }),
        ]}),
        frame('Stat3', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), children: [
          text('最短30分', { fontSize: 28, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
          text('到着時間', { fontSize: 13, fontWeight: 400, color: '#ffffff99', textAlignHorizontal: 'CENTER' }),
        ]}),
      ],
    }),
  ],
});

function serviceCard(icon: string, name: string, description: string) {
  return frame(`Service: ${name}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 36, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(icon, { fontSize: 40, textAlignHorizontal: 'CENTER' }),
      text(name, { fontSize: 18, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 13, fontWeight: 400, color: '#777777',
        lineHeight: { value: 190, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 220 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const servicesSection = frame('ServicesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(lightBg)],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('SERVICES', { fontSize: 12, fontWeight: 700, color: blue, letterSpacing: 4 }),
        text('サービス内容', { fontSize: 32, fontWeight: 800, color: dark, letterSpacing: 2, textAlignHorizontal: 'CENTER' }),
        text('あらゆる水まわりのトラブルに対応いたします。', { fontSize: 15, fontWeight: 400, color: '#777777', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('Grid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        serviceCard('💧', '水漏れ修理', '蛇口・配管・トイレの水漏れを迅速に修理。再発防止まで徹底対応。'),
        serviceCard('🚿', 'つまり解消', 'トイレ・排水口・排水管のつまりを高圧洗浄や専用機器で解消。'),
        serviceCard('🔧', '設置・交換工事', '蛇口・トイレ・給湯器の交換や新規設置工事。ご予算に合わせてご提案。'),
        serviceCard('🚨', '緊急対応', '深夜・早朝・休日も割増なし。最短30分で駆けつけます。'),
      ],
    }),
  ],
});

const priceRow = (service: string, amount: string) =>
  frame(`Price: ${service}`, {
    autoLayout: horizontal({ spacing: 0, padX: 24, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#f0f0f0'), weight: 1, align: 'INSIDE' }],
    children: [
      text(service, { fontSize: 15, fontWeight: 500, color: '#333333' }),
      text(amount, { fontSize: 20, fontWeight: 800, color: blue }),
    ],
  });

const priceGuideSection = frame('PriceGuideSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 370, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('PRICE GUIDE', { fontSize: 12, fontWeight: 700, color: blue, letterSpacing: 4 }),
        text('料金案内', { fontSize: 32, fontWeight: 800, color: dark, letterSpacing: 2, textAlignHorizontal: 'CENTER' }),
        text('明朗会計で安心。作業前にお見積もりをご提示します。', { fontSize: 15, fontWeight: 400, color: '#777777', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('Table', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        priceRow('蛇口の水漏れ修理', '¥4,000〜'),
        priceRow('トイレのつまり', '¥5,000〜'),
        priceRow('排水管の高圧洗浄', '¥15,000〜'),
        priceRow('蛇口の交換', '¥12,000〜'),
        priceRow('トイレの交換', '¥30,000〜'),
        priceRow('給湯器の交換', '¥80,000〜'),
      ],
    }),
    text('※ 上記は基本料金です。部品代が別途かかる場合があります。出張費・見積もり無料。', {
      fontSize: 13, fontWeight: 400, color: '#999999',
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
  ],
});

const serviceAreaSection = frame('ServiceAreaSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 48, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(lightBg)],
  children: [
    frame('Map', {
      size: { x: 480, y: 400 },
      fills: [gradient([{ hex: '#dbeafe', position: 0 }, { hex: '#bfdbfe', position: 1 }], 135)],
      cornerRadius: 12,
      autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER', spacing: 12 }),
      children: [
        text('📍', { fontSize: 48, textAlignHorizontal: 'CENTER' }),
        text('対応エリアマップ', { fontSize: 16, fontWeight: 600, color: blue, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('SERVICE AREA', { fontSize: 12, fontWeight: 700, color: blue, letterSpacing: 4 }),
        text('対応エリア', { fontSize: 28, fontWeight: 800, color: dark, letterSpacing: 2 }),
        text('東京23区を中心に、神奈川・千葉・埼玉まで広くカバー。最短30分で現場に駆けつけます。', {
          fontSize: 15, fontWeight: 400, color: '#666666',
          lineHeight: { value: 190, unit: 'PERCENT' },
          size: { x: 400 },
          textAutoResize: 'HEIGHT',
        }),
        frame('AreaList', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            { region: '東京都', cities: '23区全域・武蔵野市・三鷹市・調布市・府中市' },
            { region: '神奈川県', cities: '横浜市・川崎市・相模原市' },
            { region: '千葉県', cities: '千葉市・船橋市・市川市・松戸市' },
            { region: '埼玉県', cities: 'さいたま市・川口市・所沢市・越谷市' },
          ].map(a =>
            frame(`Area: ${a.region}`, {
              autoLayout: vertical({ spacing: 4, padX: 16 }),
              strokes: [{ color: hex(blue), weight: 3, align: 'INSIDE' }],
              children: [
                text(a.region, { fontSize: 14, fontWeight: 700, color: dark }),
                text(a.cities, { fontSize: 13, fontWeight: 400, color: '#777777' }),
              ],
            })
          ),
        }),
      ],
    }),
  ],
});

function reviewCard(name: string, area: string, reviewText: string) {
  return frame(`Review: ${name}`, {
    autoLayout: vertical({ spacing: 16, padX: 28, padY: 32 }),
    fills: [solid(lightBg)],
    cornerRadius: 12,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text('★★★★★', { fontSize: 16, color: orange }),
      text(reviewText, {
        fontSize: 14, fontWeight: 400, color: '#555555',
        lineHeight: { value: 200, unit: 'PERCENT' },
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
      frame('Author', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          frame('Avatar', {
            size: { x: 40, y: 40 },
            fills: [solid(blue)],
            cornerRadius: 20,
            autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
            children: [text(name.charAt(0), { fontSize: 16, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' })],
          }),
          frame('Info', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, { fontSize: 14, fontWeight: 700, color: dark }),
              text(area, { fontSize: 12, fontWeight: 400, color: '#999999' }),
            ],
          }),
        ],
      }),
    ],
  });
}

const reviewsSection = frame('ReviewsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('REVIEWS', { fontSize: 12, fontWeight: 700, color: blue, letterSpacing: 4 }),
        text('お客様の声', { fontSize: 32, fontWeight: 800, color: dark, letterSpacing: 2, textAlignHorizontal: 'CENTER' }),
        text('実際にご利用いただいたお客様からの声をご紹介します。', { fontSize: 15, fontWeight: 400, color: '#777777', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('Grid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        reviewCard('田中様', '東京都世田谷区', '深夜にトイレが水漏れして困っていましたが、電話してから40分で来てくれました。丁寧に原因を説明してくれて、料金も見積もり通りで安心でした。'),
        reviewCard('佐藤様', '神奈川県横浜市', 'キッチンの排水がつまって依頼しました。高圧洗浄で一発解決。作業後に予防方法も教えてくれて、とても親切な対応でした。'),
        reviewCard('鈴木様', '埼玉県さいたま市', '古くなった蛇口の交換をお願いしました。複数の選択肢を提示してくれて、予算に合ったものを選べました。仕上がりもきれいで大満足です。'),
      ],
    }),
  ],
});

const callCtaSection = frame('CallCTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: orange, position: 0 }, { hex: '#ea580c', position: 1 }], 135)],
  children: [
    frame('Badge', {
      autoLayout: horizontal({ padX: 24, padY: 8 }),
      fills: [solid('#ffffff33')],
      cornerRadius: 24,
      children: [text('24時間365日受付', { fontSize: 14, fontWeight: 700, color: '#ffffff' })],
    }),
    text('水のトラブル、今すぐご相談ください', { fontSize: 28, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('出張費無料・見積もり無料・深夜早朝割増なし', { fontSize: 15, fontWeight: 400, color: '#ffffffCC', textAlignHorizontal: 'CENTER' }),
    frame('PhoneBox', {
      autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
      children: [
        text('フリーダイヤル', { fontSize: 13, fontWeight: 400, color: '#ffffffB3', textAlignHorizontal: 'CENTER' }),
        text('0120-XXX-XXX', { fontSize: 44, fontWeight: 900, color: '#ffffff', textAlignHorizontal: 'CENTER', letterSpacing: 4 }),
      ],
    }),
    frame('WebBtn', {
      autoLayout: horizontal({ padX: 56, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      cornerRadius: 10,
      children: [text('Webで無料相談する', { fontSize: 17, fontWeight: 800, color: orange })],
    }),
  ],
});

const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0, padX: 120 }),
  fills: [solid(darkBg)],
  children: [
    frame('Inner', {
      autoLayout: horizontal({ spacing: 0, padY: 64, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Brand', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('水道の達人', { fontSize: 20, fontWeight: 800, color: blue, letterSpacing: 2 }),
            text('SUIDOU NO TATSUJIN', { fontSize: 10, fontWeight: 400, color: '#4b5563', letterSpacing: 3 }),
          ],
        }),
        frame('Links', {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            frame('Col1', { autoLayout: vertical({ spacing: 12 }), children: [
              text('サービス', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('水漏れ修理', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              text('つまり解消', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              text('設置・交換工事', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              text('緊急対応', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            ]}),
            frame('Col2', { autoLayout: vertical({ spacing: 12 }), children: [
              text('ご案内', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('料金案内', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              text('対応エリア', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              text('お客様の声', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            ]}),
            frame('Col3', { autoLayout: vertical({ spacing: 12 }), children: [
              text('会社情報', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('会社概要', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              text('採用情報', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            ]}),
          ],
        }),
      ],
    }),
    frame('Bottom', {
      autoLayout: horizontal({ padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex('#ffffff14'), weight: 1, align: 'INSIDE' }],
      children: [text('© 2026 水道の達人 All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#4b5563' })],
    }),
  ],
});

export default frame('JapanesePlumbingLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [navBar, heroSection, servicesSection, priceGuideSection, serviceAreaSection, reviewsSection, callCtaSection, footerSection],
});
