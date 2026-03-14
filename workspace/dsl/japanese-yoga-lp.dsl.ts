import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const sage = '#7c9473';
const cream = '#faf8f5';
const warmCream = '#f3efe9';
const heroBg = '#f0ebe4';
const dark = '#3a3a3a';
const gray = '#888888';
const white = '#ffffff';

// ─── NavBar ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  strokes: [{ color: hex('#7c947326'), weight: 1, align: 'INSIDE' }],
  children: [
    text('SHANTI YOGA', { fontSize: 20, fontWeight: 700, color: sage, letterSpacing: { value: 3, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('コンセプト', { fontSize: 14, fontWeight: 500, color: gray }),
        text('クラス一覧', { fontSize: 14, fontWeight: 500, color: gray }),
        text('インストラクター', { fontSize: 14, fontWeight: 500, color: gray }),
        text('スタジオ紹介', { fontSize: 14, fontWeight: 500, color: gray }),
        text('アクセス', { fontSize: 14, fontWeight: 500, color: gray }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(sage)],
      cornerRadius: 24,
      children: [
        text('体験予約', { fontSize: 13, fontWeight: 600, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 680 },
  autoLayout: vertical({ spacing: 20, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#f0ebe4', position: 0 }, { hex: '#e8e0d6', position: 0.4 }, { hex: '#ddd8cf', position: 1 }], 170)],
  children: [
    text('YOGA & MEDITATION', {
      fontSize: 12, fontWeight: 600, color: sage,
      letterSpacing: { value: 6, unit: 'PIXELS' },
    }),
    text('心と体を整える', {
      fontSize: 64, fontWeight: 700, color: dark,
      letterSpacing: { value: 6, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('深い呼吸とともに、自分自身と向き合う時間。\n初心者から経験者まで、一人ひとりに寄り添うヨガスタジオ。', {
      fontSize: 16, fontWeight: 400, color: '#777777',
      lineHeight: { value: 200, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 520 },
      textAutoResize: 'HEIGHT',
    }),
    rectangle('HeroSpacer', { size: { x: 1, y: 12 }, opacity: 0 }),
    frame('HeroBtnGroup', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        frame('HeroBtnPrimary', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(sage)],
          cornerRadius: 32,
          children: [
            text('無料体験レッスン', { fontSize: 15, fontWeight: 600, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('HeroBtnSecondary', {
          autoLayout: horizontal({ padX: 36, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex(sage), weight: 1, align: 'INSIDE' }],
          cornerRadius: 32,
          children: [
            text('クラスを見る', { fontSize: 15, fontWeight: 500, color: sage }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Schedule Section ───
function classCard(time: string, name: string, level: string, duration: string) {
  return frame(`Class: ${name}`, {
    autoLayout: horizontal({ spacing: 16, padX: 20, padY: 20 }),
    fills: [solid(white)],
    strokes: [{ color: hex('#7c94731F'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(time, { fontSize: 14, fontWeight: 700, color: sage }),
      frame('ClassInfo', {
        autoLayout: vertical({ spacing: 6 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 15, fontWeight: 600, color: dark }),
          frame('ClassMeta', {
            autoLayout: horizontal({ spacing: 12 }),
            children: [
              text(level, { fontSize: 12, fontWeight: 500, color: sage }),
              text(duration, { fontSize: 12, fontWeight: 400, color: '#999999' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function scheduleDay(day: string, classes: ReturnType<typeof classCard>[]) {
  return frame(`Day: ${day}`, {
    autoLayout: vertical({ spacing: 12 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(day, { fontSize: 16, fontWeight: 700, color: sage, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      rectangle('DayDivider', { size: { x: 200, y: 2 }, fills: [solid(sage)], layoutSizingHorizontal: 'FILL' }),
      ...classes,
    ],
  });
}

const scheduleSection = frame('ScheduleSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('CLASS SCHEDULE', { fontSize: 11, fontWeight: 600, color: sage, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('クラススケジュール', { fontSize: 32, fontWeight: 700, color: dark, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
        text('あなたのライフスタイルに合わせて、多彩なクラスをご用意しています。', {
          fontSize: 15, fontWeight: 400, color: gray,
          lineHeight: { value: 180, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),
    frame('ScheduleGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        scheduleDay('月曜日', [
          classCard('07:00', '朝のハタヨガ', '初級', '60分'),
          classCard('10:30', 'リストラティブヨガ', '全レベル', '75分'),
          classCard('19:00', 'ヴィンヤサフロー', '中級', '60分'),
        ]),
        scheduleDay('火曜日', [
          classCard('09:00', 'マタニティヨガ', '全レベル', '60分'),
          classCard('12:00', 'パワーヨガ', '中級〜上級', '75分'),
          classCard('20:00', '陰ヨガ＆瞑想', '全レベル', '90分'),
        ]),
        scheduleDay('水曜日', [
          classCard('07:00', '朝のハタヨガ', '初級', '60分'),
          classCard('11:00', 'アシュタンガヨガ', '上級', '90分'),
          classCard('18:30', 'リラックスヨガ', '初級', '60分'),
        ]),
      ],
    }),
  ],
});

// ─── Instructor Section ───
function instructorCard(name: string, specialty: string, bio: string) {
  return frame(`Instructor: ${name}`, {
    autoLayout: vertical({ spacing: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('InstructorPhoto', {
        size: { x: 180, y: 180 },
        fills: [gradient([{ hex: '#a8bfa0', position: 0 }, { hex: sage, position: 1 }], 135)],
      }),
      rectangle('Spacer', { size: { x: 1, y: 8 }, opacity: 0 }),
      text(name, { fontSize: 20, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
      text(specialty, { fontSize: 13, fontWeight: 600, color: sage, letterSpacing: { value: 1, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      text(bio, {
        fontSize: 14, fontWeight: 400, color: '#777777',
        lineHeight: { value: 190, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const instructorSection = frame('InstructorSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(warmCream)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('INSTRUCTOR', { fontSize: 11, fontWeight: 600, color: sage, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('インストラクター紹介', { fontSize: 32, fontWeight: 700, color: dark, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('InstructorGrid', {
      autoLayout: horizontal({ spacing: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        instructorCard('山田 沙織', 'ハタヨガ・瞑想', 'インド・リシケシュにて500時間のヨガティーチャートレーニング修了。10年以上の指導経験を持ち、心と体の調和を大切にした丁寧なレッスンが人気。'),
        instructorCard('鈴木 健太', 'アシュタンガ・パワーヨガ', '元アスリート。怪我のリハビリをきっかけにヨガと出会う。解剖学に基づいた安全で効果的なアライメント指導に定評あり。'),
        instructorCard('中村 美月', 'リストラティブ・陰ヨガ', '心理カウンセラー資格保有。ストレスマネジメントとヨガを融合させたプログラムで、心身のリラクゼーションを追求。'),
      ],
    }),
  ],
});

// ─── Studio Section ───
const studioSection = frame('StudioSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('STUDIO', { fontSize: 11, fontWeight: 600, color: sage, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('スタジオ紹介', { fontSize: 32, fontWeight: 700, color: dark, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('StudioGrid', {
      autoLayout: horizontal({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('StudioPhotoLarge', {
          size: { x: 700, y: 360 },
          fills: [gradient([{ hex: '#c5d4be', position: 0 }, { hex: '#a8bfa0', position: 1 }], 135)],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
        }),
        frame('StudioSmallGroup', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            rectangle('StudioPhotoSmall1', {
              size: { x: 340, y: 172 },
              fills: [gradient([{ hex: '#d4ddd0', position: 0 }, { hex: '#bfcfb8', position: 1 }], 135)],
              cornerRadius: 12,
              layoutSizingHorizontal: 'FILL',
              layoutSizingVertical: 'FILL',
            }),
            rectangle('StudioPhotoSmall2', {
              size: { x: 340, y: 172 },
              fills: [gradient([{ hex: '#d4ddd0', position: 0 }, { hex: '#bfcfb8', position: 1 }], 135)],
              cornerRadius: 12,
              layoutSizingHorizontal: 'FILL',
              layoutSizingVertical: 'FILL',
            }),
          ],
        }),
      ],
    }),
    frame('StudioFeatures', {
      autoLayout: horizontal({ spacing: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Feature1', {
          autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('天然無垢材の床', { fontSize: 16, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
            text('温もりのある天然木で、裸足で心地よく練習できます。', {
              fontSize: 14, fontWeight: 400, color: gray,
              lineHeight: { value: 180, unit: 'PERCENT' },
              textAlignHorizontal: 'CENTER',
              size: { x: 280 },
              textAutoResize: 'HEIGHT',
            }),
          ],
        }),
        frame('Feature2', {
          autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('自然光あふれる空間', { fontSize: 16, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
            text('大きな窓から柔らかな光が差し込む開放的なスタジオ。', {
              fontSize: 14, fontWeight: 400, color: gray,
              lineHeight: { value: 180, unit: 'PERCENT' },
              textAlignHorizontal: 'CENTER',
              size: { x: 280 },
              textAutoResize: 'HEIGHT',
            }),
          ],
        }),
        frame('Feature3', {
          autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('充実のアメニティ', { fontSize: 16, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
            text('オーガニックタオル、ハーブティー、更衣室完備。', {
              fontSize: 14, fontWeight: 400, color: gray,
              lineHeight: { value: 180, unit: 'PERCENT' },
              textAlignHorizontal: 'CENTER',
              size: { x: 280 },
              textAutoResize: 'HEIGHT',
            }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Trial CTA Section ───
const trialCtaSection = frame('TrialCTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: sage, position: 0 }, { hex: '#5e7a55', position: 1 }], 160)],
  children: [
    text('まずは体験レッスンから', {
      fontSize: 36, fontWeight: 700, color: white,
      letterSpacing: { value: 3, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('初めての方限定、体験レッスンが無料。\nマット・タオルも無料レンタル。手ぶらでお越しください。', {
      fontSize: 16, fontWeight: 400, color: '#ffffffCC',
      lineHeight: { value: 200, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    rectangle('CtaSpacer', { size: { x: 1, y: 16 }, opacity: 0 }),
    frame('CtaBtn', {
      autoLayout: horizontal({ padX: 64, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(white)],
      cornerRadius: 32,
      children: [
        text('無料体験を予約する', { fontSize: 16, fontWeight: 700, color: sage, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    text('※ 当日入会で入会金が無料になります', { fontSize: 12, fontWeight: 400, color: '#ffffff99', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Footer Section ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid(heroBg)],
  strokes: [{ color: hex('#7c947326'), weight: 1, align: 'INSIDE' }],
  children: [
    text('SHANTI YOGA', { fontSize: 18, fontWeight: 700, color: sage, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('コンセプト', { fontSize: 13, fontWeight: 400, color: gray }),
        text('クラス一覧', { fontSize: 13, fontWeight: 400, color: gray }),
        text('インストラクター', { fontSize: 13, fontWeight: 400, color: gray }),
        text('料金案内', { fontSize: 13, fontWeight: 400, color: gray }),
        text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: gray }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#7c947326')],
    }),
    text('\u00A9 2026 SHANTI YOGA All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#aaaaaa', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseYogaLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    navBar,
    heroSection,
    scheduleSection,
    instructorSection,
    studioSection,
    trialCtaSection,
    footerSection,
  ],
});
