import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const pink = '#ec4899';
const darkPink = '#be185d';
const dark = '#18181b';
const darkCard = '#27272a';
const white = '#ffffff';
const gray = '#a1a1aa';
const lightPink = '#fdf2f8';

// ─── NavBar ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(dark)],
  strokes: [{ color: hex('#ec489920'), weight: 1, align: 'INSIDE' }],
  children: [
    text('STUDIO GROOVE', { fontSize: 20, fontWeight: 900, color: pink, letterSpacing: { value: 3, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('ダンススタイル', { fontSize: 14, fontWeight: 500, color: gray }),
        text('インストラクター', { fontSize: 14, fontWeight: 500, color: gray }),
        text('スケジュール', { fontSize: 14, fontWeight: 500, color: gray }),
        text('生徒の声', { fontSize: 14, fontWeight: 500, color: gray }),
        text('体験レッスン', { fontSize: 14, fontWeight: 500, color: gray }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(pink)],
      cornerRadius: 24,
      children: [
        text('体験予約', { fontSize: 13, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 700 },
  autoLayout: vertical({ spacing: 20, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#2d0a1e', position: 0 }, { hex: dark, position: 0.6 }, { hex: '#1a1a2e', position: 1 }], 160)],
  children: [
    text('STUDIO GROOVE スタジオグルーヴ', {
      fontSize: 13, fontWeight: 600, color: pink,
      letterSpacing: { value: 6, unit: 'PIXELS' },
    }),
    text('踊る楽しさを、すべての人に', {
      fontSize: 64, fontWeight: 900, color: white,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('初心者からプロ志望まで、年齢・経験を問わず楽しめるダンススタジオ。\nHIP-HOP、JAZZ、バレエ、K-POPなど多彩なジャンルで、あなたの表現を見つけよう。', {
      fontSize: 17, fontWeight: 400, color: '#e4a8ca',
      lineHeight: { value: 190, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 620 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroBtnGroup', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        frame('HeroBtnPrimary', {
          autoLayout: horizontal({ padX: 48, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(pink)],
          cornerRadius: 32,
          children: [
            text('無料体験レッスンに申し込む', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('HeroBtnSecondary', {
          autoLayout: horizontal({ padX: 40, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex(pink), weight: 2, align: 'INSIDE' }],
          cornerRadius: 32,
          children: [
            text('レッスン一覧を見る', { fontSize: 16, fontWeight: 600, color: pink }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Dance Styles Section ───
function styleCard(nameJa: string, nameEn: string, description: string) {
  return frame(`Style: ${nameJa}`, {
    autoLayout: vertical({ spacing: 14, padX: 28, padY: 44, counterAlign: 'CENTER' }),
    fills: [solid(darkCard)],
    strokes: [{ color: hex('#ec489918'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('StyleIcon', {
        size: { x: 56, y: 56 },
        fills: [gradient([{ hex: pink, position: 0 }, { hex: darkPink, position: 1 }], 135)],
        cornerRadius: 12,
      }),
      text(nameJa, { fontSize: 22, fontWeight: 800, color: white, textAlignHorizontal: 'CENTER' }),
      text(nameEn, { fontSize: 12, fontWeight: 600, color: pink, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      rectangle('StyleDivider', {
        size: { x: 40, y: 2 },
        fills: [solid(pink)],
      }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: gray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 220 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const stylesSection = frame('StylesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(dark)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('DANCE STYLES', { fontSize: 12, fontWeight: 600, color: pink, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('ダンススタイル', { fontSize: 34, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('StylesGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        styleCard('ヒップホップ', 'HIP-HOP', 'ストリートカルチャーから生まれた自由なスタイル。リズム感とボディコントロールを磨きます。'),
        styleCard('ジャズ', 'JAZZ', 'しなやかな動きと力強さを兼ね備えたスタイル。表現力豊かなダンスを楽しめます。'),
        styleCard('バレエ', 'BALLET', 'すべてのダンスの基礎となるクラシックバレエ。美しい姿勢と体幹を養います。'),
        styleCard('K-POP', 'K-POP', '最新のK-POP振付を完コピ。推しの曲で楽しく踊りながら、ダンススキルを向上。'),
      ],
    }),
  ],
});

// ─── Instructor Team Section ───
function instructorCard(name: string, role: string, bio: string) {
  return frame(`Instructor: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid(darkCard)],
    cornerRadius: 16,
    strokes: [{ color: hex('#ec489914'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('InstructorPhoto', {
        size: { x: 360, y: 280 },
        fills: [gradient([{ hex: pink, position: 0 }, { hex: '#7c3aed', position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame('InstructorInfo', {
        autoLayout: vertical({ spacing: 8, padX: 28, padY: 28 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(role, { fontSize: 12, fontWeight: 600, color: pink, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          text(name, { fontSize: 20, fontWeight: 800, color: white }),
          text(bio, {
            fontSize: 14, fontWeight: 400, color: gray,
            lineHeight: { value: 180, unit: 'PERCENT' },
            size: { x: 300 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
    ],
  });
}

const instructorsSection = frame('InstructorsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid('#1f1f23')],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('INSTRUCTORS', { fontSize: 12, fontWeight: 600, color: pink, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('インストラクター紹介', { fontSize: 34, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('InstructorsGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        instructorCard('YUKI', 'HIP-HOP / FREESTYLE', '数々のダンスバトルで優勝経験を持つHIP-HOPダンサー。初心者にもわかりやすい指導で人気。'),
        instructorCard('MIKA', 'JAZZ / CONTEMPORARY', '劇団四季出身のプロダンサー。しなやかで美しい動きの表現を丁寧に指導します。'),
        instructorCard('HARUTO', 'K-POP / BALLET', 'K-POPアーティストの振付経験を持つ若手ダンサー。バレエの基礎から最新K-POP振付まで幅広く対応。'),
      ],
    }),
  ],
});

// ─── Class Schedule Section ───
const scheduleSection = frame('ScheduleSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(dark)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('SCHEDULE', { fontSize: 12, fontWeight: 600, color: pink, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('レッスンスケジュール', { fontSize: 34, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('ScheduleTable', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      cornerRadius: 12,
      strokes: [{ color: hex('#ec489920'), weight: 1, align: 'INSIDE' }],
      children: [
        frame('ScheduleHeader', {
          autoLayout: horizontal({ spacing: 0 }),
          fills: [solid(pink)],
          layoutSizingHorizontal: 'FILL',
          children: [
            text('時間', { fontSize: 13, fontWeight: 700, color: white, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('月', { fontSize: 13, fontWeight: 700, color: white, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('火', { fontSize: 13, fontWeight: 700, color: white, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('水', { fontSize: 13, fontWeight: 700, color: white, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('木', { fontSize: 13, fontWeight: 700, color: white, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('金', { fontSize: 13, fontWeight: 700, color: white, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('土', { fontSize: 13, fontWeight: 700, color: white, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
          ],
        }),
        frame('Row1', {
          autoLayout: horizontal({ spacing: 0, padY: 14 }),
          fills: [solid(darkCard)],
          layoutSizingHorizontal: 'FILL',
          children: [
            text('11:00', { fontSize: 13, fontWeight: 600, color: white, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('バレエ入門', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('JAZZ基礎', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('バレエ入門', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('JAZZ基礎', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('バレエ入門', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('全ジャンル', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
          ],
        }),
        frame('Row2', {
          autoLayout: horizontal({ spacing: 0, padY: 14 }),
          fills: [solid('#1f1f23')],
          layoutSizingHorizontal: 'FILL',
          children: [
            text('14:00', { fontSize: 13, fontWeight: 600, color: white, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('K-POP', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('HIP-HOP', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('K-POP', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('HIP-HOP', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('K-POP', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('全ジャンル', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
          ],
        }),
        frame('Row3', {
          autoLayout: horizontal({ spacing: 0, padY: 14 }),
          fills: [solid(darkCard)],
          layoutSizingHorizontal: 'FILL',
          children: [
            text('17:00', { fontSize: 13, fontWeight: 600, color: white, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('キッズHH', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('キッズバレエ', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('キッズHH', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('キッズK-POP', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('キッズHH', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('-', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
          ],
        }),
        frame('Row4', {
          autoLayout: horizontal({ spacing: 0, padY: 14 }),
          fills: [solid('#1f1f23')],
          layoutSizingHorizontal: 'FILL',
          children: [
            text('19:00', { fontSize: 13, fontWeight: 600, color: white, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('HIP-HOP', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('JAZZ応用', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('HIP-HOP', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('K-POP', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('FREESTYLE', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
            text('-', { fontSize: 13, fontWeight: 400, color: gray, size: { x: 160 }, textAlignHorizontal: 'CENTER' }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Student Showcase Section ───
const showcaseSection = frame('ShowcaseSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid('#1f1f23')],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('SHOWCASE', { fontSize: 12, fontWeight: 600, color: pink, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('生徒の声', { fontSize: 34, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('ShowcaseGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Showcase1', {
          autoLayout: vertical({ spacing: 16, padX: 32, padY: 36 }),
          fills: [solid(darkCard)],
          strokes: [{ color: hex('#ec489918'), weight: 1, align: 'INSIDE' }],
          cornerRadius: 16,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('ダンス未経験でしたが、YUKIさんの丁寧な指導のおかげで、今ではHIP-HOPが大好きに。発表会のステージに立てた時は感動しました！', {
              fontSize: 15, fontWeight: 400, color: '#d4d4d8',
              lineHeight: { value: 190, unit: 'PERCENT' },
              size: { x: 320 },
              textAutoResize: 'HEIGHT',
            }),
            text('Aさん（20代・女性）', { fontSize: 13, fontWeight: 600, color: pink }),
          ],
        }),
        frame('Showcase2', {
          autoLayout: vertical({ spacing: 16, padX: 32, padY: 36 }),
          fills: [solid(darkCard)],
          strokes: [{ color: hex('#ec489918'), weight: 1, align: 'INSIDE' }],
          cornerRadius: 16,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('子どもの頃からの夢だったバレエを40代で始めました。同世代の仲間もいて、毎週のレッスンが一番の楽しみです。', {
              fontSize: 15, fontWeight: 400, color: '#d4d4d8',
              lineHeight: { value: 190, unit: 'PERCENT' },
              size: { x: 320 },
              textAutoResize: 'HEIGHT',
            }),
            text('Bさん（40代・女性）', { fontSize: 13, fontWeight: 600, color: pink }),
          ],
        }),
        frame('Showcase3', {
          autoLayout: vertical({ spacing: 16, padX: 32, padY: 36 }),
          fills: [solid(darkCard)],
          strokes: [{ color: hex('#ec489918'), weight: 1, align: 'INSIDE' }],
          cornerRadius: 16,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('K-POPクラスで推しの振付をマスターできて最高！インスタにダンス動画を上げるようになりました。', {
              fontSize: 15, fontWeight: 400, color: '#d4d4d8',
              lineHeight: { value: 190, unit: 'PERCENT' },
              size: { x: 320 },
              textAutoResize: 'HEIGHT',
            }),
            text('Cさん（10代・男性）', { fontSize: 13, fontWeight: 600, color: pink }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Trial Lesson CTA ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 20, padX: 120, padY: 120, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#3d0a27', position: 0 }, { hex: dark, position: 1 }], 160)],
  children: [
    text('まずは体験レッスンから', {
      fontSize: 40, fontWeight: 900, color: white,
      letterSpacing: { value: 3, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('初回体験レッスン無料！ウェアとシューズのレンタルも完備。\n手ぶらでお気軽にお越しください。', {
      fontSize: 16, fontWeight: 400, color: '#d4a0be',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('CtaBtn', {
      autoLayout: horizontal({ padX: 64, padY: 20, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(pink)],
      cornerRadius: 32,
      children: [
        text('無料体験レッスンを予約する', { fontSize: 18, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    text('※ 当日入会で入会金50%OFF', { fontSize: 12, fontWeight: 400, color: '#888888', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Footer ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid('#09090b')],
  children: [
    text('STUDIO GROOVE スタジオグルーヴ', { fontSize: 18, fontWeight: 900, color: pink, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('ダンススタイル', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
        text('インストラクター', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
        text('スケジュール', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
        text('生徒の声', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
        text('よくある質問', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
        text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#ffffff1F')],
    }),
    text('© 2026 STUDIO GROOVE All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#ffffff44', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseDanceLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(dark)],
  children: [
    navBar,
    heroSection,
    stylesSection,
    instructorsSection,
    scheduleSection,
    showcaseSection,
    ctaSection,
    footerSection,
  ],
});
