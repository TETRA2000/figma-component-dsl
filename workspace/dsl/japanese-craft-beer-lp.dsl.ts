import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const amber = '#f59e0b';
const darkAmber = '#78350f';
const deepBrown = '#451a03';
const hopGreen = '#65a30d';
const darkBg = '#1a0f05';
const darkest = '#0f0a05';
const warmBg = '#faf7f2';
const white = '#ffffff';

// ─── Navigation ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 64 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(darkest)],
  strokes: [{ color: hex('#ffffff14'), weight: 1, align: 'INSIDE' }],
  children: [
    text('HOP STAND ホップスタンド', { fontSize: 22, fontWeight: 900, color: amber, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('タップリスト', { fontSize: 14, fontWeight: 500, color: '#999999' }),
        text('フードメニュー', { fontSize: 14, fontWeight: 500, color: '#999999' }),
        text('ブルワリー', { fontSize: 14, fontWeight: 500, color: '#999999' }),
        text('イベント', { fontSize: 14, fontWeight: 500, color: '#999999' }),
        text('アクセス', { fontSize: 14, fontWeight: 500, color: '#999999' }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 680 },
  autoLayout: vertical({ spacing: 24, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: darkAmber, position: 0 }, { hex: deepBrown, position: 0.5 }, { hex: '#1c0a00', position: 1 }], 160)],
  children: [
    frame('HeroLabel', {
      autoLayout: horizontal({ padX: 24, padY: 8 }),
      children: [
        text('CRAFT BEER BAR', { fontSize: 13, fontWeight: 600, color: hopGreen, letterSpacing: { value: 6, unit: 'PIXELS' } }),
      ],
    }),
    text('こだわりの一杯を', {
      fontSize: 72, fontWeight: 900, color: white,
      lineHeight: { value: 120, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      letterSpacing: { value: 8, unit: 'PIXELS' },
    }),
    text('厳選された国内外のクラフトビールを常時12タップでご提供。\n一杯一杯に込められたブルワーの想いをお届けします。', {
      fontSize: 18, fontWeight: 400, color: '#ffffff80',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 560 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroCTA', {
      autoLayout: horizontal({ padX: 56, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(hopGreen)],
      children: [
        text('今日のタップリストを見る', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Beer Card ───
function beerCard(name: string, brewery: string, style: string, abv: string, ibu: string, description: string) {
  return frame(`Beer: ${name}`, {
    autoLayout: horizontal({ spacing: 20, padX: 28, padY: 28 }),
    fills: [solid('#261a0a')],
    strokes: [{ color: hex('#f59e0b26'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame(`Glass: ${name}`, {
        size: { x: 48, y: 80 },
        fills: [gradient([{ hex: amber, position: 0 }, { hex: darkAmber, position: 1 }], 180)],
        cornerRadius: 4,
        opacity: 0.7,
      }),
      frame(`BeerInfo: ${name}`, {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 17, fontWeight: 800, color: amber }),
          text(brewery, { fontSize: 12, fontWeight: 400, color: '#888888' }),
          text(style, { fontSize: 12, fontWeight: 600, color: hopGreen, letterSpacing: { value: 1, unit: 'PIXELS' } }),
          frame(`Stats: ${name}`, {
            autoLayout: horizontal({ spacing: 12 }),
            children: [
              frame(`ABV: ${name}`, {
                autoLayout: horizontal({ padX: 10, padY: 3 }),
                fills: [solid('#ffffff0F')],
                cornerRadius: 4,
                children: [
                  text(`ABV ${abv}`, { fontSize: 12, fontWeight: 600, color: '#cccccc' }),
                ],
              }),
              frame(`IBU: ${name}`, {
                autoLayout: horizontal({ padX: 10, padY: 3 }),
                fills: [solid('#ffffff0F')],
                cornerRadius: 4,
                children: [
                  text(`IBU ${ibu}`, { fontSize: 12, fontWeight: 600, color: '#cccccc' }),
                ],
              }),
            ],
          }),
          text(description, {
            fontSize: 13, fontWeight: 400, color: '#888888',
            lineHeight: { value: 170, unit: 'PERCENT' },
            size: { x: 260 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
    ],
  });
}

const tapListSection = frame('TapListSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(darkBg)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text("TODAY'S TAP LIST", { fontSize: 12, fontWeight: 600, color: hopGreen, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('本日のタップリスト', { fontSize: 36, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('TapGrid', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('TapRow1', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            beerCard('Hop Galaxy IPA', 'far yeast brewing', 'IPA', '6.5%', '55', 'シトラスとトロピカルフルーツが香る華やかなIPA。苦味と甘みのバランスが絶妙。'),
            beerCard('Tokyo White', 'T.Y. HARBOR', 'ウィートエール', '5.0%', '15', '小麦の柔らかな口当たりとオレンジピールの爽やかな香り。初心者にもおすすめ。'),
            beerCard('Kuroyama Stout', 'COEDO', 'スタウト', '5.5%', '40', 'ローストモルトの深いコクとチョコレートのような甘み。'),
          ],
        }),
        frame('TapRow2', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            beerCard('Hanami Saison', '志賀高原ビール', 'セゾン', '5.8%', '28', 'フルーティーでスパイシーなベルギースタイル。食事との相性が抜群。'),
            beerCard('Yuzu Pale Ale', '箕面ビール', 'ペールエール', '5.0%', '30', '国産柚子を贅沢に使用。和柑橘の爽やかな香りとモルトの甘みが調和。'),
            beerCard('Double IPA', '伊勢角屋麦酒', 'ダブルIPA', '8.5%', '75', '大量のホップが生み出す圧倒的な香りと苦味。ホップヘッズ必飲。'),
          ],
        }),
      ],
    }),
  ],
});

// ─── Food Menu Section ───
function foodCard(name: string, price: string, description: string) {
  return frame(`Food: ${name}`, {
    autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame(`FoodImg: ${name}`, {
        size: { x: undefined, y: 180 },
        fills: [gradient([{ hex: darkAmber, position: 0 }, { hex: deepBrown, position: 1 }], 135)],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
      }),
      text(name, { fontSize: 16, fontWeight: 800, color: '#1a1a1a', textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 13, fontWeight: 400, color: '#666666',
        lineHeight: { value: 170, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 220 },
        textAutoResize: 'HEIGHT',
      }),
      text(price, { fontSize: 20, fontWeight: 800, color: darkAmber }),
    ],
  });
}

const foodSection = frame('FoodSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(warmBg)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('FOOD MENU', { fontSize: 12, fontWeight: 600, color: darkAmber, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('フードメニュー', { fontSize: 36, fontWeight: 800, color: '#1a1a1a', letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('FoodGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        foodCard('自家製ソーセージ盛り合わせ', '¥1,280', '3種のハーブソーセージをグリルで。マスタード添え。'),
        foodCard('ビアチーズフォンデュ', '¥1,480', 'スタウトビールで仕上げた濃厚チーズ。バゲット付き。'),
        foodCard('スモークナッツ＆ドライフルーツ', '¥780', '自家燻製のミックスナッツとドライフルーツの盛り合わせ。'),
        foodCard('フィッシュ＆チップス', '¥1,180', 'IPA衣でカラッと揚げた白身魚。自家製タルタルソースで。'),
      ],
    }),
  ],
});

// ─── Brewery Story Section ───
const brewerySection = frame('BrewerySection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0, padX: 170, padY: 100 }),
  fills: [solid(darkAmber)],
  children: [
    frame('BreweryContent', {
      autoLayout: horizontal({ spacing: 64, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('BreweryImg', {
          size: { x: 400, y: 480 },
          fills: [gradient([{ hex: deepBrown, position: 0 }, { hex: '#1c0a00', position: 1 }], 135)],
          cornerRadius: 8,
        }),
        frame('BreweryText', {
          autoLayout: vertical({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('OUR STORY', { fontSize: 12, fontWeight: 600, color: hopGreen, letterSpacing: { value: 6, unit: 'PIXELS' } }),
            text('ブルワリーストーリー', { fontSize: 36, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('2018年、東京・下北沢の小さなガレージから始まったHOP STAND。「本当に美味しいビールを、もっと身近に」という想いから、国内外の個性豊かなクラフトビールを厳選してお届けしています。', {
              fontSize: 15, fontWeight: 400, color: '#ffffffB3',
              lineHeight: { value: 200, unit: 'PERCENT' },
              size: { x: 480 },
              textAutoResize: 'HEIGHT',
            }),
            text('常時12タップのラインナップは毎週更新。季節の素材を使った限定醸造ビールや、海外の希少なブルワリーとのコラボレーションなど、ここでしか味わえない一杯をご用意しています。', {
              fontSize: 15, fontWeight: 400, color: '#ffffffB3',
              lineHeight: { value: 200, unit: 'PERCENT' },
              size: { x: 480 },
              textAutoResize: 'HEIGHT',
            }),
            text('ビールの奥深い世界を、気軽に楽しんでいただける空間づくりを大切にしています。初心者の方もお気軽にお立ち寄りください。', {
              fontSize: 15, fontWeight: 400, color: '#ffffffB3',
              lineHeight: { value: 200, unit: 'PERCENT' },
              size: { x: 480 },
              textAutoResize: 'HEIGHT',
            }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Events Section ───
function eventCard(date: string, title: string, description: string) {
  return frame(`Event: ${title}`, {
    autoLayout: horizontal({ spacing: 28, padX: 28, padY: 28, counterAlign: 'MIN' }),
    fills: [solid(white)],
    strokes: [{ color: hex('#e5e0d8'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame(`EventDate: ${title}`, {
        autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(hopGreen)],
        cornerRadius: 6,
        children: [
          text(date, { fontSize: 14, fontWeight: 800, color: white }),
        ],
      }),
      frame(`EventInfo: ${title}`, {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 18, fontWeight: 800, color: '#1a1a1a' }),
          text(description, {
            fontSize: 14, fontWeight: 400, color: '#666666',
            lineHeight: { value: 170, unit: 'PERCENT' },
            size: { x: 560 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
    ],
  });
}

const eventsSection = frame('EventsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 280, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(warmBg)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('EVENTS', { fontSize: 12, fontWeight: 600, color: darkAmber, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('イベントカレンダー', { fontSize: 36, fontWeight: 800, color: '#1a1a1a', letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('EventsList', {
      autoLayout: vertical({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        eventCard('3/21 (金)', 'Spring Hop Fest 2026', 'ブルワーによるトークセッション付き。参加費¥3,000（ビール3杯付き）'),
        eventCard('3/28 (金)', 'ビギナーズ・テイスティングナイト', 'クラフトビール初心者向け。スタイル別の飲み比べセット。参加費¥2,000'),
        eventCard('4/5 (土)', 'ペアリングディナー', 'シェフ特製コース料理とクラフトビールのペアリング。限定20名。¥8,000'),
      ],
    }),
  ],
});

// ─── Access Section ───
const accessSection = frame('AccessSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(darkBg)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('ACCESS / HOURS', { fontSize: 12, fontWeight: 600, color: hopGreen, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('アクセス・営業時間', { fontSize: 36, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('AccessContent', {
      autoLayout: horizontal({ spacing: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('MapPlaceholder', {
          size: { x: undefined, y: 300 },
          autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#261a0a')],
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
              ['住所', '東京都世田谷区北沢2-12-8 B1F'],
              ['電話', '03-9876-5432'],
              ['営業時間', '平日 17:00〜24:00 / 土日祝 14:00〜24:00'],
              ['定休日', '火曜日'],
              ['席数', 'カウンター8席 / テーブル24席 / テラス12席'],
              ['最寄駅', '下北沢駅 徒歩3分'],
            ].map(([label, value]) =>
              frame(`Row: ${label}`, {
                autoLayout: horizontal({ spacing: 0, padY: 16, counterAlign: 'CENTER' }),
                layoutSizingHorizontal: 'FILL',
                strokes: [{ color: hex('#ffffff14'), weight: 1, align: 'INSIDE' }],
                children: [
                  text(label, { fontSize: 14, fontWeight: 600, color: amber, size: { x: 100 }, textAutoResize: 'HEIGHT' }),
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
  fills: [solid('#0a0500')],
  strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
  children: [
    text('HOP STAND ホップスタンド', { fontSize: 20, fontWeight: 900, color: amber, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32 }),
      children: [
        text('タップリスト', { fontSize: 13, fontWeight: 400, color: '#666666' }),
        text('フードメニュー', { fontSize: 13, fontWeight: 400, color: '#666666' }),
        text('ブルワリー', { fontSize: 13, fontWeight: 400, color: '#666666' }),
        text('イベント', { fontSize: 13, fontWeight: 400, color: '#666666' }),
        text('アクセス', { fontSize: 13, fontWeight: 400, color: '#666666' }),
        text('Instagram', { fontSize: 13, fontWeight: 400, color: '#666666' }),
      ],
    }),
    rectangle('FooterDivider', { size: { x: 1200, y: 1 }, fills: [solid('#ffffff0F')] }),
    text('© 2026 HOP STAND All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#444444', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseCraftBeerLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(darkest)],
  children: [
    navBar,
    heroSection,
    tapListSection,
    foodSection,
    brewerySection,
    eventsSection,
    accessSection,
    footerSection,
  ],
});
