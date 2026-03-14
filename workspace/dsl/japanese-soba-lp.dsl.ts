import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const sepia = '#704214';
const straw = '#d4b896';
const darkBrown = '#3a2410';
const darkest = '#1a1208';
const warmBg = '#faf7f2';
const white = '#ffffff';
const cream = '#f5eed9';

// ─── Navigation ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 64 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(darkest)],
  children: [
    text('そば処 清流庵 SEIRYUAN', { fontSize: 20, fontWeight: 800, color: straw, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('こだわり', { fontSize: 14, fontWeight: 500, color: '#bbaa88' }),
        text('お品書き', { fontSize: 14, fontWeight: 500, color: '#bbaa88' }),
        text('季節の一品', { fontSize: 14, fontWeight: 500, color: '#bbaa88' }),
        text('店舗情報', { fontSize: 14, fontWeight: 500, color: '#bbaa88' }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 600 },
  autoLayout: vertical({ spacing: 24, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: darkBrown, position: 0 }, { hex: darkest, position: 1 }], 180)],
  children: [
    frame('HeroLabel', {
      autoLayout: horizontal({ padX: 24, padY: 8 }),
      strokes: [{ color: hex('#d4b8964D'), weight: 1, align: 'INSIDE' }],
      children: [
        text('創業明治三十年', { fontSize: 13, fontWeight: 400, color: straw, letterSpacing: { value: 4, unit: 'PIXELS' } }),
      ],
    }),
    text('手打ちの一杯、\n至福のひととき', {
      fontSize: 56, fontWeight: 900, color: white,
      lineHeight: { value: 130, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    text('厳選した国産蕎麦粉を石臼挽きし、\n毎朝職人が丁寧に手打ちしています', {
      fontSize: 16, fontWeight: 400, color: '#ffffffB3',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroCTA', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(straw)],
      children: [
        text('お品書きを見る', { fontSize: 16, fontWeight: 700, color: darkest, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Kodawari Section ───
function kodawariCard(number: string, title: string, description: string) {
  return frame(`Kodawari: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 28, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid(white)],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(number, { fontSize: 48, fontWeight: 900, color: straw, opacity: 0.4 }),
      text(title, { fontSize: 22, fontWeight: 800, color: darkBrown, textAlignHorizontal: 'CENTER' }),
      rectangle('Divider', { size: { x: 40, y: 2 }, fills: [solid(sepia)] }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#7a6a5a',
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 250 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const kodawariSection = frame('KodawariSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(warmBg)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('KODAWARI', { fontSize: 13, fontWeight: 600, color: sepia, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('三つのこだわり', { fontSize: 32, fontWeight: 800, color: darkBrown, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('KodawariGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        kodawariCard('01', '蕎麦粉', '北海道幌加内産の最上級蕎麦粉を使用。石臼で丁寧に挽くことで、豊かな香りと風味を引き出します。'),
        kodawariCard('02', '水', '奥多摩の天然湧水を使用。蕎麦の繊細な味わいを最大限に活かす、まろやかな軟水です。'),
        kodawariCard('03', '手打ちの技', '三代に渡り受け継がれた手打ちの技。その日の気温や湿度に合わせ、最適な加減で打ち上げます。'),
      ],
    }),
  ],
});

// ─── Menu Section ───
function menuItem(name: string, price: string, description: string, tag?: string) {
  const tagNodes = tag
    ? [frame('MenuTag', {
        autoLayout: horizontal({ padX: 12, padY: 4 }),
        fills: [solid(straw)],
        children: [text(tag, { fontSize: 11, fontWeight: 700, color: darkest })],
      })]
    : [];

  return frame(`Menu: ${name}`, {
    autoLayout: horizontal({ spacing: 0 }),
    cornerRadius: 8,
    clipContent: true,
    layoutSizingHorizontal: 'FILL',
    fills: [solid(warmBg)],
    children: [
      frame('MenuImgArea', {
        size: { x: 180, y: 160 },
        autoLayout: horizontal({ padX: 12, padY: 12 }),
        fills: [gradient([{ hex: '#5a4020', position: 0 }, { hex: darkBrown, position: 1 }], 135)],
        children: tagNodes,
      }),
      frame('MenuInfo', {
        autoLayout: vertical({ spacing: 8, padX: 24, padY: 24 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 18, fontWeight: 700, color: darkBrown }),
          text(description, {
            fontSize: 13, fontWeight: 400, color: '#7a6a5a',
            lineHeight: { value: 160, unit: 'PERCENT' },
            size: { x: 280 },
            textAutoResize: 'HEIGHT',
          }),
          text(price, { fontSize: 22, fontWeight: 800, color: sepia }),
        ],
      }),
    ],
  });
}

const menuSection = frame('MenuSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('MENU', { fontSize: 13, fontWeight: 600, color: sepia, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('お品書き', { fontSize: 32, fontWeight: 800, color: darkBrown, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('MenuGrid', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('MenuRow1', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            menuItem('ざるそば', '¥950', '挽きたて・打ちたて・茹でたての三たてを味わう基本の一枚', '定番'),
            menuItem('天ざるそば', '¥1,650', '旬の野菜と海老の天ぷらを添えた贅沢な一品'),
          ],
        }),
        frame('MenuRow2', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            menuItem('鴨南蛮そば', '¥1,450', '合鴨の旨味が溶け出した温かいつゆが絶品', '人気'),
            menuItem('とろろそば', '¥1,100', '粘りの強い大和芋のとろろで味わう、のど越し抜群の一杯'),
          ],
        }),
      ],
    }),
  ],
});

// ─── Seasonal Section ───
const seasonalSection = frame('SeasonalSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 220, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('SEASONAL', { fontSize: 13, fontWeight: 600, color: sepia, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('季節のおすすめ', { fontSize: 32, fontWeight: 800, color: darkBrown, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('SeasonalGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('SeasonalItem1', {
          autoLayout: vertical({ spacing: 12, padX: 24, padY: 24, counterAlign: 'CENTER' }),
          fills: [solid(white)],
          layoutSizingHorizontal: 'FILL',
          cornerRadius: 8,
          children: [
            frame('SeasonalImg1', {
              size: { x: undefined, y: 160 },
              fills: [gradient([{ hex: '#6a5030', position: 0 }, { hex: darkBrown, position: 1 }], 135)],
              layoutSizingHorizontal: 'FILL',
              cornerRadius: 4,
            }),
            text('春の山菜天ぷらそば', { fontSize: 18, fontWeight: 700, color: darkBrown }),
            text('¥1,550', { fontSize: 20, fontWeight: 800, color: sepia }),
          ],
        }),
        frame('SeasonalItem2', {
          autoLayout: vertical({ spacing: 12, padX: 24, padY: 24, counterAlign: 'CENTER' }),
          fills: [solid(white)],
          layoutSizingHorizontal: 'FILL',
          cornerRadius: 8,
          children: [
            frame('SeasonalImg2', {
              size: { x: undefined, y: 160 },
              fills: [gradient([{ hex: '#6a5030', position: 0 }, { hex: darkBrown, position: 1 }], 135)],
              layoutSizingHorizontal: 'FILL',
              cornerRadius: 4,
            }),
            text('新そば（秋季限定）', { fontSize: 18, fontWeight: 700, color: darkBrown }),
            text('¥1,200', { fontSize: 20, fontWeight: 800, color: sepia }),
          ],
        }),
        frame('SeasonalItem3', {
          autoLayout: vertical({ spacing: 12, padX: 24, padY: 24, counterAlign: 'CENTER' }),
          fills: [solid(white)],
          layoutSizingHorizontal: 'FILL',
          cornerRadius: 8,
          children: [
            frame('SeasonalImg3', {
              size: { x: undefined, y: 160 },
              fills: [gradient([{ hex: '#6a5030', position: 0 }, { hex: darkBrown, position: 1 }], 135)],
              layoutSizingHorizontal: 'FILL',
              cornerRadius: 4,
            }),
            text('冬の牡蠣そば', { fontSize: 18, fontWeight: 700, color: darkBrown }),
            text('¥1,650', { fontSize: 20, fontWeight: 800, color: sepia }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Atmosphere Section ───
const atmosphereSection = frame('AtmosphereSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('ATMOSPHERE', { fontSize: 13, fontWeight: 600, color: sepia, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('店内の雰囲気', { fontSize: 32, fontWeight: 800, color: darkBrown, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('AtmosphereContent', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('AtmosphereImg', {
          size: { x: undefined, y: 300 },
          autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [gradient([{ hex: '#5a4020', position: 0 }, { hex: darkBrown, position: 1 }], 135)],
          cornerRadius: 8,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('PHOTO', { fontSize: 24, fontWeight: 700, color: '#5a5040', letterSpacing: { value: 4, unit: 'PIXELS' } }),
          ],
        }),
        frame('AtmosphereText', {
          autoLayout: vertical({ spacing: 20, padY: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('古民家を改装した\n落ち着きの空間', {
              fontSize: 24, fontWeight: 800, color: darkBrown,
              lineHeight: { value: 150, unit: 'PERCENT' },
            }),
            text('築百年の古民家を改装した店内は、太い梁と土壁が織りなす温かみのある空間。四季折々の庭を眺めながら、ゆったりとお蕎麦をお楽しみいただけます。個室もご用意しておりますので、接待やお祝いの席にもご利用いただけます。', {
              fontSize: 15, fontWeight: 400, color: '#7a6a5a',
              lineHeight: { value: 200, unit: 'PERCENT' },
              size: { x: 400 },
              textAutoResize: 'HEIGHT',
            }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Access Section ───
const accessSection = frame('AccessSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(darkest)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('ACCESS', { fontSize: 13, fontWeight: 600, color: straw, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('店舗情報', { fontSize: 32, fontWeight: 800, color: white, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('AccessContent', {
      autoLayout: horizontal({ spacing: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('MapPlaceholder', {
          size: { x: undefined, y: 300 },
          autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#2a2218')],
          cornerRadius: 8,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('MAP', { fontSize: 24, fontWeight: 700, color: '#5a5040', letterSpacing: { value: 4, unit: 'PIXELS' } }),
          ],
        }),
        frame('AccessInfo', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            ...[
              ['住所', '東京都世田谷区深沢4-5-6'],
              ['電話', '03-9876-5432'],
              ['営業時間', '昼 11:00〜15:00 / 夜 17:00〜21:00'],
              ['定休日', '毎週水曜日'],
              ['席数', 'テーブル24席 / 座敷16席 / 個室2室'],
            ].map(([label, value]) =>
              frame(`Row: ${label}`, {
                autoLayout: horizontal({ spacing: 0, padY: 16, counterAlign: 'CENTER' }),
                layoutSizingHorizontal: 'FILL',
                strokes: [{ color: hex('#3a3020'), weight: 1, align: 'INSIDE' }],
                children: [
                  text(label, { fontSize: 14, fontWeight: 600, color: straw, size: { x: 100 }, textAutoResize: 'HEIGHT' }),
                  text(value, { fontSize: 14, fontWeight: 400, color: '#ccbbaa' }),
                ],
              })
            ),
          ],
        }),
      ],
    }),
  ],
});

// ─── Footer ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 12, padX: 120, padY: 32, counterAlign: 'CENTER' }),
  fills: [solid('#0f0c06')],
  children: [
    text('そば処 清流庵 SEIRYUAN', { fontSize: 18, fontWeight: 800, color: straw, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('© 2026 そば処 清流庵 All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#555544', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseSobaLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    navBar,
    heroSection,
    kodawariSection,
    menuSection,
    seasonalSection,
    atmosphereSection,
    accessSection,
    footerSection,
  ],
});
