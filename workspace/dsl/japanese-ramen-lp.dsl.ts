import {
  frame, text, rectangle, ellipse,
  solid, gradient, radialGradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const gold = '#e8c47c';
const darkBrown = '#2a1a0a';
const darkest = '#1a1a1a';
const warmBg = '#faf6f0';
const red = '#c4543a';

// ─── Navigation ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 64 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(darkest)],
  children: [
    text('麺匠 一番', { fontSize: 24, fontWeight: 900, color: gold, letterSpacing: { value: 3, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('こだわり', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
        text('メニュー', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
        text('店舗情報', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
        text('ご予約', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 600 },
  autoLayout: vertical({ spacing: 24, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: darkBrown, position: 0 }, { hex: '#1a0a00', position: 1 }], 135)],
  children: [
    frame('HeroLabel', {
      autoLayout: horizontal({ padX: 24, padY: 8 }),
      strokes: [{ color: hex('#e8c47c4D'), weight: 1, align: 'INSIDE' }],
      children: [
        text('創業三十年の味', { fontSize: 14, fontWeight: 400, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' } }),
      ],
    }),
    text('一杯に込めた\n職人の魂', {
      fontSize: 56, fontWeight: 900, color: '#ffffff',
      lineHeight: { value: 130, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    text('厳選された素材と伝統の製法が生み出す\n至極の一杯をお届けします', {
      fontSize: 16, fontWeight: 400, color: '#ffffffB3',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroCTA', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(gold)],
      children: [
        text('ご予約はこちら', { fontSize: 16, fontWeight: 700, color: darkest, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Kodawari Section ───
function kodawariCard(number: string, title: string, description: string) {
  return frame(`Kodawari: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 28, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(number, { fontSize: 48, fontWeight: 900, color: gold, opacity: 0.3 }),
      text(title, { fontSize: 22, fontWeight: 800, color: darkest, textAlignHorizontal: 'CENTER' }),
      rectangle('Divider', { size: { x: 40, y: 2 }, fills: [solid(gold)] }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#666666',
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
        text('KODAWARI', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('三つのこだわり', { fontSize: 32, fontWeight: 800, color: darkest, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('KodawariGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        kodawariCard('01', '自家製麺', '毎朝店内で打つ自家製麺。小麦の香りと独特のコシが自慢です。太さや硬さもお好みに合わせてお選びいただけます。'),
        kodawariCard('02', '豚骨スープ', '丸二日間じっくりと炊き上げた濃厚豚骨スープ。臭みのない深いコクと旨味をお楽しみください。'),
        kodawariCard('03', '厳選チャーシュー', '国産豚バラ肉を低温でじっくりと調理。口の中でとろけるような食感が人気の秘密です。'),
      ],
    }),
  ],
});

// ─── Menu Section ───
function menuItem(name: string, price: string, description: string, tag?: string) {
  const tagNodes = tag
    ? [frame('MenuTag', {
        autoLayout: horizontal({ padX: 12, padY: 4 }),
        fills: [solid(gold)],
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
        fills: [gradient([{ hex: '#3a2a1a', position: 0 }, { hex: darkBrown, position: 1 }], 135)],
        children: tagNodes,
      }),
      frame('MenuInfo', {
        autoLayout: vertical({ spacing: 8, padX: 24, padY: 24 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 18, fontWeight: 700, color: darkest }),
          text(description, {
            fontSize: 13, fontWeight: 400, color: '#666666',
            lineHeight: { value: 160, unit: 'PERCENT' },
            size: { x: 280 },
            textAutoResize: 'HEIGHT',
          }),
          text(price, { fontSize: 22, fontWeight: 800, color: red }),
        ],
      }),
    ],
  });
}

const menuSection = frame('MenuSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('MENU', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('おすすめメニュー', { fontSize: 32, fontWeight: 800, color: darkest, textAlignHorizontal: 'CENTER' }),
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
            menuItem('特製濃厚豚骨ラーメン', '¥980', '看板メニュー。濃厚スープと自家製太麺の最強コンビ', '一番人気'),
            menuItem('味玉醤油ラーメン', '¥880', '香り高い醤油ダレと半熟味玉の王道の一杯'),
          ],
        }),
        frame('MenuRow2', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            menuItem('辛味噌ラーメン', '¥950', '自家製辛味噌が効いたパンチのある一杯', '期間限定'),
            menuItem('つけ麺（並）', '¥900', '極太麺を濃厚つけ汁でいただく。麺量変更無料'),
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
        text('ACCESS', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('店舗情報', { fontSize: 32, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('AccessContent', {
      autoLayout: horizontal({ spacing: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('MapPlaceholder', {
          size: { x: undefined, y: 300 },
          autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#2a2a2a')],
          cornerRadius: 8,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('MAP', { fontSize: 24, fontWeight: 700, color: '#555555', letterSpacing: { value: 4, unit: 'PIXELS' } }),
          ],
        }),
        frame('AccessInfo', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            ...[
              ['住所', '東京都渋谷区道玄坂1-2-3 ラーメンビル1F'],
              ['電話', '03-1234-5678'],
              ['営業時間', '11:00〜23:00（L.O. 22:30）'],
              ['定休日', '年中無休'],
              ['席数', 'カウンター12席 / テーブル20席'],
            ].map(([label, value]) =>
              frame(`Row: ${label}`, {
                autoLayout: horizontal({ spacing: 0, padY: 16, counterAlign: 'CENTER' }),
                layoutSizingHorizontal: 'FILL',
                strokes: [{ color: hex('#333333'), weight: 1, align: 'INSIDE' }],
                children: [
                  text(label, { fontSize: 14, fontWeight: 600, color: gold, size: { x: 100 }, textAutoResize: 'HEIGHT' }),
                  text(value, { fontSize: 14, fontWeight: 400, color: '#cccccc' }),
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
  fills: [solid('#111111')],
  children: [
    text('麺匠 一番', { fontSize: 18, fontWeight: 900, color: gold, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('© 2026 麺匠一番 All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseRamenLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    navBar,
    heroSection,
    kodawariSection,
    menuSection,
    accessSection,
    footerSection,
  ],
});
