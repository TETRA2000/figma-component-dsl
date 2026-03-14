import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const lavender = '#ddd6fe';
const deepPurple = '#4c1d95';
const sage = '#a3be8c';
const white = '#ffffff';
const dark = '#2d2235';
const midPurple = '#7c3aed';
const lightLavender = '#ede9fe';
const softGray = '#8b7fa8';
const paleGreen = '#d4e4c8';

// --- NavBar ---
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(white)],
  strokes: [{ color: hex('#4c1d9515'), weight: 1, align: 'INSIDE' }],
  children: [
    text('MEISOU NO NIWA', { fontSize: 18, fontWeight: 700, color: deepPurple, letterSpacing: { value: 3, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('プログラム', { fontSize: 14, fontWeight: 500, color: softGray }),
        text('効果', { fontSize: 14, fontWeight: 500, color: softGray }),
        text('講師紹介', { fontSize: 14, fontWeight: 500, color: softGray }),
        text('スケジュール', { fontSize: 14, fontWeight: 500, color: softGray }),
        text('アクセス', { fontSize: 14, fontWeight: 500, color: softGray }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(deepPurple)],
      cornerRadius: 24,
      children: [
        text('体験申込', { fontSize: 13, fontWeight: 600, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// --- Hero Section ---
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 700 },
  autoLayout: vertical({ spacing: 24, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#ede9fe', position: 0 }, { hex: '#ddd6fe', position: 0.5 }, { hex: '#e8e0f0', position: 1 }], 170)],
  children: [
    text('MEDITATION & MINDFULNESS', {
      fontSize: 12, fontWeight: 600, color: midPurple,
      letterSpacing: { value: 6, unit: 'PIXELS' },
    }),
    text('瞑想の庭', {
      fontSize: 24, fontWeight: 600, color: deepPurple,
      letterSpacing: { value: 8, unit: 'PIXELS' },
    }),
    text('心の静けさを、取り戻す', {
      fontSize: 56, fontWeight: 700, color: dark,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('忙しい毎日から離れ、自分の内側に目を向ける時間。\n初心者からベテランまで、静寂の中で心を整える場所。', {
      fontSize: 16, fontWeight: 400, color: softGray,
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
          fills: [solid(deepPurple)],
          cornerRadius: 32,
          children: [
            text('無料体験に申し込む', { fontSize: 15, fontWeight: 600, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('HeroBtnSecondary', {
          autoLayout: horizontal({ padX: 36, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex(deepPurple), weight: 1, align: 'INSIDE' }],
          cornerRadius: 32,
          children: [
            text('プログラムを見る', { fontSize: 15, fontWeight: 500, color: deepPurple }),
          ],
        }),
      ],
    }),
  ],
});

// --- Programs Section ---
function programCard(name: string, subtitle: string, desc: string, accent: string) {
  return frame(`Program: ${name}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 36, counterAlign: 'CENTER' }),
    fills: [solid(white)],
    strokes: [{ color: hex('#4c1d9515'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('ProgramIcon', {
        size: { x: 64, y: 64 },
        fills: [gradient([{ hex: accent, position: 0 }, { hex: lavender, position: 1 }], 135)],
        cornerRadius: 32,
      }),
      text(name, { fontSize: 20, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
      text(subtitle, { fontSize: 13, fontWeight: 600, color: midPurple, letterSpacing: { value: 1, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      text(desc, {
        fontSize: 14, fontWeight: 400, color: softGray,
        lineHeight: { value: 190, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const programSection = frame('ProgramSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(lightLavender)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('PROGRAMS', { fontSize: 11, fontWeight: 600, color: midPurple, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('瞑想プログラム', { fontSize: 32, fontWeight: 700, color: dark, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
        text('3つのアプローチで、あなたに合った瞑想を見つけましょう。', {
          fontSize: 15, fontWeight: 400, color: softGray,
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),
    frame('ProgramGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        programCard('マインドフルネス瞑想', 'MINDFULNESS', '呼吸に意識を集中し、「今この瞬間」に気づく力を養います。ストレス軽減や集中力向上に効果的。初心者に最適です。', '#c4b5fd'),
        programCard('禅 瞑想', 'ZEN MEDITATION', '坐禅の作法に基づいた伝統的な瞑想法。姿勢と呼吸を整え、無心の境地を目指します。心の深い静寂を体験できます。', '#a3be8c'),
        programCard('ヨガ瞑想', 'YOGA MEDITATION', 'ヨガのポーズと呼吸法を組み合わせた動的瞑想。体を動かしながら心を落ち着かせ、心身の調和を実現します。', '#ddd6fe'),
      ],
    }),
  ],
});

// --- Benefits Section ---
function benefitItem(num: string, title: string, desc: string) {
  return frame(`Benefit: ${title}`, {
    autoLayout: horizontal({ spacing: 20, padY: 24, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('BenefitNum', {
        size: { x: 48, y: 48 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(sage)],
        cornerRadius: 24,
        children: [
          text(num, { fontSize: 18, fontWeight: 700, color: white }),
        ],
      }),
      frame('BenefitText', {
        autoLayout: vertical({ spacing: 6 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 18, fontWeight: 700, color: dark }),
          text(desc, {
            fontSize: 14, fontWeight: 400, color: softGray,
            lineHeight: { value: 180, unit: 'PERCENT' },
            size: { x: 460 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
    ],
  });
}

const benefitsSection = frame('BenefitsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 280, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('BENEFITS', { fontSize: 11, fontWeight: 600, color: sage, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('瞑想がもたらす効果', { fontSize: 32, fontWeight: 700, color: dark, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('BenefitsList', {
      autoLayout: vertical({ spacing: 8 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        benefitItem('1', 'ストレスの軽減', '瞑想はコルチゾール(ストレスホルモン)の分泌を抑制し、心の緊張をほぐします。日常の不安やイライラから解放されます。'),
        benefitItem('2', '集中力の向上', '定期的な瞑想により、注意力と集中力が向上。仕事や学習のパフォーマンスが自然と高まります。'),
        benefitItem('3', '睡眠の質の改善', '就寝前の瞑想習慣で、深い眠りへの移行がスムーズに。朝の目覚めも爽やかになります。'),
        benefitItem('4', '自己理解の深化', '自分の思考パターンや感情に気づく力が育ち、より冷静で穏やかな心の状態を維持できるようになります。'),
      ],
    }),
  ],
});

// --- Instructor Section ---
const instructorSection = frame('InstructorSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(lightLavender)],
  children: [
    rectangle('InstructorPhoto', {
      size: { x: 360, y: 420 },
      fills: [gradient([{ hex: '#c4b5fd', position: 0 }, { hex: '#a3be8c', position: 1 }], 160)],
      cornerRadius: 20,
    }),
    frame('InstructorInfo', {
      autoLayout: vertical({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('INSTRUCTOR', { fontSize: 11, fontWeight: 600, color: midPurple, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('主宰 講師紹介', { fontSize: 32, fontWeight: 700, color: dark, letterSpacing: { value: 3, unit: 'PIXELS' } }),
        text('藤田 静香', { fontSize: 24, fontWeight: 700, color: deepPurple }),
        text('マインドフルネス指導者 / 禅僧侶', { fontSize: 14, fontWeight: 600, color: midPurple, letterSpacing: { value: 1, unit: 'PIXELS' } }),
        text('京都の禅寺にて10年間修行を積んだ後、マインドフルネスの科学的アプローチを学ぶためMITへ留学。\n\n東洋の伝統と西洋の科学を融合した独自の瞑想メソッドを開発。\n企業研修やワークショップも数多く手がけ、これまでに5,000人以上を指導。', {
          fontSize: 14, fontWeight: 400, color: softGray,
          lineHeight: { value: 200, unit: 'PERCENT' },
          size: { x: 500 },
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),
  ],
});

// --- Schedule & Fees Section ---
function scheduleRow(day: string, time: string, programName: string, fee: string) {
  return frame(`Schedule: ${day}`, {
    autoLayout: horizontal({ spacing: 0, padX: 24, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    fills: [solid(white)],
    strokes: [{ color: hex('#4c1d9510'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(day, { fontSize: 14, fontWeight: 700, color: deepPurple }),
      text(time, { fontSize: 14, fontWeight: 500, color: dark }),
      text(programName, { fontSize: 14, fontWeight: 500, color: midPurple }),
      text(fee, { fontSize: 14, fontWeight: 700, color: dark }),
    ],
  });
}

const scheduleSection = frame('ScheduleSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 240, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('SCHEDULE & FEES', { fontSize: 11, fontWeight: 600, color: midPurple, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('スケジュール & 料金', { fontSize: 32, fontWeight: 700, color: dark, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('ScheduleTable', {
      autoLayout: vertical({ spacing: 8 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ScheduleHeader', {
          autoLayout: horizontal({ spacing: 0, padX: 24, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          fills: [solid(deepPurple)],
          cornerRadius: 8,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('曜日', { fontSize: 12, fontWeight: 600, color: white }),
            text('時間', { fontSize: 12, fontWeight: 600, color: white }),
            text('プログラム', { fontSize: 12, fontWeight: 600, color: white }),
            text('料金', { fontSize: 12, fontWeight: 600, color: white }),
          ],
        }),
        scheduleRow('月曜日', '07:00 - 08:00', 'マインドフルネス瞑想', '¥3,000'),
        scheduleRow('水曜日', '10:00 - 11:30', '禅 瞑想', '¥4,000'),
        scheduleRow('金曜日', '19:00 - 20:30', 'ヨガ瞑想', '¥3,500'),
        scheduleRow('土曜日', '09:00 - 10:00', 'マインドフルネス瞑想', '¥3,000'),
        scheduleRow('日曜日', '08:00 - 10:00', '禅 瞑想 (上級)', '¥5,000'),
      ],
    }),
    frame('FeeNote', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('月額プラン: ¥12,000/月 (通い放題)', { fontSize: 15, fontWeight: 700, color: deepPurple, textAlignHorizontal: 'CENTER' }),
        text('入会金: ¥5,000 (体験当日入会で無料)', { fontSize: 13, fontWeight: 400, color: softGray, textAlignHorizontal: 'CENTER' }),
      ],
    }),
  ],
});

// --- Trial CTA Section ---
const trialCtaSection = frame('TrialCTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: deepPurple, position: 0 }, { hex: '#6d28d9', position: 1 }], 160)],
  children: [
    text('まずは、静かに座ることから。', {
      fontSize: 36, fontWeight: 700, color: white,
      letterSpacing: { value: 3, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('初回体験セッション無料。\n心の旅の第一歩を、ここから始めませんか。', {
      fontSize: 16, fontWeight: 400, color: '#ffffffCC',
      lineHeight: { value: 200, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 480 },
      textAutoResize: 'HEIGHT',
    }),
    rectangle('CtaSpacer', { size: { x: 1, y: 16 }, opacity: 0 }),
    frame('CtaBtn', {
      autoLayout: horizontal({ padX: 64, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(white)],
      cornerRadius: 32,
      children: [
        text('無料体験を申し込む', { fontSize: 16, fontWeight: 700, color: deepPurple, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    text('※ 持ち物不要。動きやすい服装でお越しください', { fontSize: 12, fontWeight: 400, color: '#ffffff99', textAlignHorizontal: 'CENTER' }),
  ],
});

// --- Footer ---
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid('#f5f3ff')],
  strokes: [{ color: hex('#4c1d9515'), weight: 1, align: 'INSIDE' }],
  children: [
    text('MEISOU NO NIWA', { fontSize: 18, fontWeight: 700, color: deepPurple, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('プログラム', { fontSize: 13, fontWeight: 400, color: softGray }),
        text('講師紹介', { fontSize: 13, fontWeight: 400, color: softGray }),
        text('スケジュール', { fontSize: 13, fontWeight: 400, color: softGray }),
        text('よくある質問', { fontSize: 13, fontWeight: 400, color: softGray }),
        text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: softGray }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#4c1d9515')],
    }),
    text('\u00A9 2026 MEISOU NO NIWA All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#aaaaaa', textAlignHorizontal: 'CENTER' }),
  ],
});

// --- Full Page ---
export default frame('JapaneseMeditationLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    navBar,
    heroSection,
    programSection,
    benefitsSection,
    instructorSection,
    scheduleSection,
    trialCtaSection,
    footerSection,
  ],
});
