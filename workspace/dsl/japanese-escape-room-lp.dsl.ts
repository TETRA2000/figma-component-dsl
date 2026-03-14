import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const darkPurple = '#1a0a2e';
const deepPurple = '#2d1456';
const midPurple = '#3d1a6e';
const neonGreen = '#39ff14';
const magenta = '#ff00ff';
const white = '#ffffff';
const lightGray = '#cccccc';
const dimText = '#a89cc4';

// --- NavBar ---
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid('#0d0518')],
  strokes: [{ color: hex('#39ff1433'), weight: 1, align: 'INSIDE' }],
  children: [
    text('NAZOTOKI MEIKYUU', { fontSize: 18, fontWeight: 700, color: neonGreen, letterSpacing: { value: 3, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('ルーム紹介', { fontSize: 14, fontWeight: 500, color: dimText }),
        text('遊び方', { fontSize: 14, fontWeight: 500, color: dimText }),
        text('料金', { fontSize: 14, fontWeight: 500, color: dimText }),
        text('ランキング', { fontSize: 14, fontWeight: 500, color: dimText }),
        text('アクセス', { fontSize: 14, fontWeight: 500, color: dimText }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(neonGreen)],
      cornerRadius: 4,
      children: [
        text('予約する', { fontSize: 13, fontWeight: 700, color: darkPurple, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// --- Hero Section ---
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 720 },
  autoLayout: vertical({ spacing: 24, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#1a0a2e', position: 0 }, { hex: '#0d0518', position: 0.5 }, { hex: '#1a0a2e', position: 1 }], 180)],
  children: [
    rectangle('HeroGlowTop', { size: { x: 600, y: 4 }, fills: [gradient([{ hex: '#39ff1400', position: 0 }, { hex: '#39ff14', position: 0.5 }, { hex: '#39ff1400', position: 1 }], 90)], cornerRadius: 2 }),
    text('謎解き迷宮', {
      fontSize: 20, fontWeight: 600, color: magenta,
      letterSpacing: { value: 8, unit: 'PIXELS' },
    }),
    text('脱出せよ。制限時間60分。', {
      fontSize: 64, fontWeight: 900, color: white,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('仲間と協力し、暗号を解き明かせ。\n東京最大級のリアル脱出ゲーム施設がここに。', {
      fontSize: 16, fontWeight: 400, color: dimText,
      lineHeight: { value: 200, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 520 },
      textAutoResize: 'HEIGHT',
    }),
    rectangle('HeroSpacer', { size: { x: 1, y: 8 }, opacity: 0 }),
    frame('HeroBtnGroup', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        frame('HeroBtnPrimary', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(neonGreen)],
          cornerRadius: 4,
          children: [
            text('今すぐ予約', { fontSize: 15, fontWeight: 700, color: darkPurple, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('HeroBtnSecondary', {
          autoLayout: horizontal({ padX: 36, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex(magenta), weight: 1, align: 'INSIDE' }],
          cornerRadius: 4,
          children: [
            text('ルームを見る', { fontSize: 15, fontWeight: 500, color: magenta }),
          ],
        }),
      ],
    }),
    rectangle('HeroGlowBottom', { size: { x: 400, y: 3 }, fills: [gradient([{ hex: '#ff00ff00', position: 0 }, { hex: '#ff00ff', position: 0.5 }, { hex: '#ff00ff00', position: 1 }], 90)], cornerRadius: 2 }),
  ],
});

// --- Room Themes Section ---
function roomCard(name: string, theme: string, difficulty: string, stars: string, desc: string) {
  return frame(`Room: ${name}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
    fills: [solid(deepPurple)],
    strokes: [{ color: hex('#39ff1433'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('RoomImage', {
        size: { x: 240, y: 140 },
        fills: [gradient([{ hex: midPurple, position: 0 }, { hex: '#1a0a2e', position: 1 }], 135)],
        cornerRadius: 4,
        layoutSizingHorizontal: 'FILL',
      }),
      text(name, { fontSize: 20, fontWeight: 700, color: neonGreen }),
      text(theme, { fontSize: 13, fontWeight: 500, color: magenta, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      frame('DifficultyRow', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          text(difficulty, { fontSize: 12, fontWeight: 600, color: dimText }),
          text(stars, { fontSize: 14, fontWeight: 400, color: neonGreen }),
        ],
      }),
      text(desc, {
        fontSize: 13, fontWeight: 400, color: dimText,
        lineHeight: { value: 180, unit: 'PERCENT' },
        size: { x: 220 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const roomSection = frame('RoomSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(darkPurple)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('ROOMS', { fontSize: 11, fontWeight: 600, color: neonGreen, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('脱出ルーム一覧', { fontSize: 32, fontWeight: 700, color: white, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
        text('4つの異なるテーマから、あなたの挑戦を選べ。', {
          fontSize: 15, fontWeight: 400, color: dimText,
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),
    frame('RoomGrid', {
      autoLayout: horizontal({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        roomCard('廃病院の呪い', 'ホラー', '難易度', '★★★★☆', '廃墟と化した病院に閉じ込められた。不気味な音が響く中、脱出の鍵を探せ。'),
        roomCard('時空の研究所', 'SF', '難易度', '★★★☆☆', 'タイムマシンが暴走した研究所。時間が止まる前にパラドックスを解け。'),
        roomCard('忍者屋敷', '和風アクション', '難易度', '★★★★★', '最高難度。からくり仕掛けの忍者屋敷から脱出せよ。制限時間は45分。'),
        roomCard('宝石泥棒', 'スパイ', '難易度', '★★☆☆☆', '初心者向け。美術館に仕掛けられたセキュリティを突破し、宝石を奪還せよ。'),
      ],
    }),
  ],
});

// --- How to Play Section ---
function stepCard(num: string, title: string, desc: string) {
  return frame(`Step: ${num}`, {
    autoLayout: vertical({ spacing: 12, padX: 32, padY: 32, counterAlign: 'CENTER' }),
    fills: [solid('#0d0518')],
    strokes: [{ color: hex('#ff00ff44'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('StepNumber', {
        size: { x: 48, y: 48 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(magenta)],
        cornerRadius: 24,
        children: [
          text(num, { fontSize: 20, fontWeight: 700, color: white }),
        ],
      }),
      text(title, { fontSize: 16, fontWeight: 700, color: white, textAlignHorizontal: 'CENTER' }),
      text(desc, {
        fontSize: 13, fontWeight: 400, color: dimText,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 200 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const howToPlaySection = frame('HowToPlaySection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(deepPurple)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('HOW TO PLAY', { fontSize: 11, fontWeight: 600, color: magenta, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('遊び方', { fontSize: 32, fontWeight: 700, color: white, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('StepsGrid', {
      autoLayout: horizontal({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        stepCard('1', '予約する', 'Webまたは電話で日時とルームを予約。当日受付も空きがあればOK。'),
        stepCard('2', 'ブリーフィング', 'スタッフがルールと世界観を説明。チームで作戦を立てよう。'),
        stepCard('3', '脱出に挑戦', '制限時間内に謎を解き、暗号を解読し、脱出口を見つけよ。'),
        stepCard('4', '結果発表', 'クリアタイムと正解率を発表。ランキングに挑戦しよう。'),
      ],
    }),
  ],
});

// --- Group Packages Section ---
function packageCard(name: string, people: string, price: string, features: string[], highlight: boolean) {
  return frame(`Package: ${name}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid(highlight ? midPurple : deepPurple)],
    strokes: [{ color: hex(highlight ? neonGreen : '#39ff1444'), weight: highlight ? 2 : 1, align: 'INSIDE' }],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    children: [
      ...(highlight ? [text('POPULAR', { fontSize: 11, fontWeight: 700, color: darkPurple, letterSpacing: { value: 2, unit: 'PIXELS' } })] : []),
      text(name, { fontSize: 22, fontWeight: 700, color: white }),
      text(people, { fontSize: 14, fontWeight: 500, color: dimText }),
      text(price, { fontSize: 36, fontWeight: 900, color: neonGreen }),
      rectangle('PkgDivider', { size: { x: 200, y: 1 }, fills: [solid('#39ff1433')], layoutSizingHorizontal: 'FILL' }),
      ...features.map((f, i) =>
        text(f, { fontSize: 13, fontWeight: 400, color: dimText, lineHeight: { value: 180, unit: 'PERCENT' }, textAlignHorizontal: 'CENTER' }),
      ),
      rectangle('PkgSpacer', { size: { x: 1, y: 8 }, opacity: 0 }),
      frame('PkgBtn', {
        autoLayout: horizontal({ padX: 40, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(highlight ? neonGreen : '#39ff1433')],
        cornerRadius: 4,
        children: [
          text('予約する', { fontSize: 14, fontWeight: 700, color: highlight ? darkPurple : neonGreen }),
        ],
      }),
    ],
  });
}

const packageSection = frame('PackageSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 200, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(darkPurple)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('GROUP PACKAGES', { fontSize: 11, fontWeight: 600, color: neonGreen, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('グループ料金', { fontSize: 32, fontWeight: 700, color: white, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('PackageGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        packageCard('スモール', '2~3名', '¥3,500/人', ['1ルーム選択', '60分プレイ', '記念写真付き'], false),
        packageCard('スタンダード', '4~6名', '¥2,800/人', ['全ルーム選択可', '60分プレイ', '記念写真付き', 'ドリンク1杯無料'], true),
        packageCard('パーティー', '7~12名', '¥2,200/人', ['全ルーム選択可', '90分プレイ', '記念写真付き', 'ドリンク飲み放題', '貸切対応可'], false),
      ],
    }),
  ],
});

// --- Ranking / Reviews Section ---
const rankingSection = frame('RankingSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(deepPurple)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('RANKING & REVIEWS', { fontSize: 11, fontWeight: 600, color: magenta, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('ランキング&レビュー', { fontSize: 32, fontWeight: 700, color: white, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('RankingGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('TopRanking', {
          autoLayout: vertical({ spacing: 16, padX: 32, padY: 32 }),
          fills: [solid('#0d0518')],
          strokes: [{ color: hex('#39ff1433'), weight: 1, align: 'INSIDE' }],
          cornerRadius: 8,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('脱出タイムTOP3', { fontSize: 18, fontWeight: 700, color: neonGreen }),
            frame('Rank1', {
              autoLayout: horizontal({ spacing: 12, padY: 8, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('1st', { fontSize: 16, fontWeight: 900, color: neonGreen }),
                text('チーム忍者 - 23:45', { fontSize: 14, fontWeight: 500, color: white }),
              ],
            }),
            frame('Rank2', {
              autoLayout: horizontal({ spacing: 12, padY: 8, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('2nd', { fontSize: 16, fontWeight: 900, color: magenta }),
                text('脱出マスターズ - 28:12', { fontSize: 14, fontWeight: 500, color: dimText }),
              ],
            }),
            frame('Rank3', {
              autoLayout: horizontal({ spacing: 12, padY: 8, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('3rd', { fontSize: 16, fontWeight: 900, color: '#c49b00' }),
                text('謎解きファイターズ - 31:08', { fontSize: 14, fontWeight: 500, color: dimText }),
              ],
            }),
          ],
        }),
        frame('Reviews', {
          autoLayout: vertical({ spacing: 16, padX: 32, padY: 32 }),
          fills: [solid('#0d0518')],
          strokes: [{ color: hex('#ff00ff33'), weight: 1, align: 'INSIDE' }],
          cornerRadius: 8,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('参加者の声', { fontSize: 18, fontWeight: 700, color: magenta }),
            text('"忍者屋敷は本当に難しかった！でもクリアした時の達成感は最高。友達と来てよかった。"', {
              fontSize: 14, fontWeight: 400, color: dimText,
              lineHeight: { value: 190, unit: 'PERCENT' },
              size: { x: 400 },
              textAutoResize: 'HEIGHT',
            }),
            text('- 田中さん (20代)', { fontSize: 12, fontWeight: 500, color: '#888888' }),
            rectangle('ReviewDivider', { size: { x: 300, y: 1 }, fills: [solid('#ff00ff22')], layoutSizingHorizontal: 'FILL' }),
            text('"初心者でも宝石泥棒は楽しめました。スタッフの対応も丁寧で安心。次は時空の研究所に挑戦！"', {
              fontSize: 14, fontWeight: 400, color: dimText,
              lineHeight: { value: 190, unit: 'PERCENT' },
              size: { x: 400 },
              textAutoResize: 'HEIGHT',
            }),
            text('- 佐藤さん (30代)', { fontSize: 12, fontWeight: 500, color: '#888888' }),
          ],
        }),
      ],
    }),
  ],
});

// --- Booking CTA Section ---
const bookingCtaSection = frame('BookingCTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#39ff14', position: 0 }, { hex: '#00cc44', position: 1 }], 135)],
  children: [
    text('次の脱出者は、あなただ。', {
      fontSize: 36, fontWeight: 900, color: darkPurple,
      letterSpacing: { value: 3, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('仲間を集めて、挑戦を始めよう。\nオンライン予約で10%OFF。', {
      fontSize: 16, fontWeight: 500, color: '#1a0a2eCC',
      lineHeight: { value: 200, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 460 },
      textAutoResize: 'HEIGHT',
    }),
    rectangle('CtaSpacer', { size: { x: 1, y: 16 }, opacity: 0 }),
    frame('CtaBtn', {
      autoLayout: horizontal({ padX: 64, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(darkPurple)],
      cornerRadius: 4,
      children: [
        text('オンラインで予約する', { fontSize: 16, fontWeight: 700, color: neonGreen, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    text('※ 当日予約も空きがあれば可能です', { fontSize: 12, fontWeight: 400, color: '#1a0a2e99', textAlignHorizontal: 'CENTER' }),
  ],
});

// --- Footer ---
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid('#0d0518')],
  strokes: [{ color: hex('#39ff1422'), weight: 1, align: 'INSIDE' }],
  children: [
    text('NAZOTOKI MEIKYUU', { fontSize: 18, fontWeight: 700, color: neonGreen, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('ルーム紹介', { fontSize: 13, fontWeight: 400, color: dimText }),
        text('遊び方', { fontSize: 13, fontWeight: 400, color: dimText }),
        text('料金', { fontSize: 13, fontWeight: 400, color: dimText }),
        text('よくある質問', { fontSize: 13, fontWeight: 400, color: dimText }),
        text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: dimText }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#39ff1422')],
    }),
    text('\u00A9 2026 NAZOTOKI MEIKYUU All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#666666', textAlignHorizontal: 'CENTER' }),
  ],
});

// --- Full Page ---
export default frame('JapaneseEscapeRoomLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(darkPurple)],
  children: [
    navBar,
    heroSection,
    roomSection,
    howToPlaySection,
    packageSection,
    rankingSection,
    bookingCtaSection,
    footerSection,
  ],
});
