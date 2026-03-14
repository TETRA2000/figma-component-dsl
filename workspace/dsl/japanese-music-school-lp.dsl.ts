import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const purple = '#7c3aed';
const darkPurple = '#2d1b69';
const ivory = '#faf8f5';
const lightPurple = '#f3eeff';
const white = '#ffffff';
const gray = '#777777';
const mutedPurple = '#8b7da0';

// ─── NavBar ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(ivory)],
  strokes: [{ color: hex('#7c3aed14'), weight: 1, align: 'INSIDE' }],
  children: [
    text('Melodia 音楽教室', { fontSize: 20, fontWeight: 900, color: purple, letterSpacing: { value: 1, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('コース紹介', { fontSize: 14, fontWeight: 500, color: '#888888' }),
        text('講師紹介', { fontSize: 14, fontWeight: 500, color: '#888888' }),
        text('発表会', { fontSize: 14, fontWeight: 500, color: '#888888' }),
        text('よくある質問', { fontSize: 14, fontWeight: 500, color: '#888888' }),
        text('アクセス', { fontSize: 14, fontWeight: 500, color: '#888888' }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(purple)],
      cornerRadius: 24,
      children: [
        text('無料体験レッスン', { fontSize: 13, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 700 },
  autoLayout: vertical({ spacing: 20, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: lightPurple, position: 0 }, { hex: ivory, position: 0.5 }, { hex: '#f8f4ff', position: 1 }], 160)],
  children: [
    text('MUSIC SCHOOL', {
      fontSize: 13, fontWeight: 600, color: purple,
      letterSpacing: { value: 6, unit: 'PIXELS' },
    }),
    text('音楽のある暮らしを', {
      fontSize: 64, fontWeight: 900, color: darkPurple,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('初心者からプロ志望まで、一人ひとりに寄り添った個人レッスン。\n音楽の楽しさを、あなたのペースで見つけましょう。', {
      fontSize: 17, fontWeight: 400, color: mutedPurple,
      lineHeight: { value: 190, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 560 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroBtnGroup', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        frame('HeroBtnPrimary', {
          autoLayout: horizontal({ padX: 48, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(purple)],
          cornerRadius: 32,
          children: [
            text('無料体験に申し込む', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('HeroBtnSecondary', {
          autoLayout: horizontal({ padX: 40, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex(purple), weight: 2, align: 'INSIDE' }],
          cornerRadius: 32,
          children: [
            text('コースを見る', { fontSize: 16, fontWeight: 600, color: purple }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Courses Section ───
function courseCard(title: string, level: string, description: string) {
  return frame(`Course: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 28, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid(ivory)],
    strokes: [{ color: hex('#7c3aed14'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('CourseIcon', {
        size: { x: 80, y: 80 },
        fills: [gradient([{ hex: purple, position: 0 }, { hex: '#a78bfa', position: 1 }], 135)],
      }),
      text(title, { fontSize: 20, fontWeight: 700, color: darkPurple, textAlignHorizontal: 'CENTER' }),
      text(level, { fontSize: 12, fontWeight: 600, color: purple, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: gray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 220 },
        textAutoResize: 'HEIGHT',
      }),
      frame('CourseBtn', {
        autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
        strokes: [{ color: hex(purple), weight: 2, align: 'INSIDE' }],
        cornerRadius: 20,
        children: [
          text('詳しく見る', { fontSize: 13, fontWeight: 700, color: purple }),
        ],
      }),
    ],
  });
}

const coursesSection = frame('CoursesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('COURSES', { fontSize: 12, fontWeight: 600, color: purple, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('コース紹介', { fontSize: 34, fontWeight: 800, color: darkPurple, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('CoursesGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        courseCard('ピアノコース', '初級〜上級', 'クラシックからポップスまで幅広いジャンルに対応。グランドピアノを使った本格レッスンで、確かな技術を身につけます。'),
        courseCard('ギターコース', '初級〜上級', 'アコースティック・エレキどちらも対応。弾き語りからソロギターまで、やりたい音楽を自由に楽しめるコースです。'),
        courseCard('ヴァイオリンコース', '初級〜中級', '美しい音色を奏でる喜びを。正しいフォームと表現力を丁寧に指導し、憧れの曲が弾けるようになります。'),
        courseCard('ヴォーカルコース', '初級〜上級', '腹式呼吸から発声法まで基礎を徹底指導。カラオケ上達から本格的なステージまで、あなたの声を磨きます。'),
      ],
    }),
  ],
});

// ─── Instructors Section ───
function instructorCard(name: string, instrument: string, bio: string) {
  return frame(`Instructor: ${name}`, {
    autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('InstructorPhoto', {
        size: { x: 180, y: 180 },
        fills: [gradient([{ hex: purple, position: 0 }, { hex: '#a78bfa', position: 1 }], 135)],
      }),
      rectangle('Spacer', { size: { x: 1, y: 8 }, opacity: 0 }),
      text(name, { fontSize: 20, fontWeight: 800, color: darkPurple, textAlignHorizontal: 'CENTER' }),
      text(instrument, { fontSize: 13, fontWeight: 600, color: purple, letterSpacing: { value: 1, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      text(bio, {
        fontSize: 14, fontWeight: 400, color: gray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 240 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const instructorsSection = frame('InstructorsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid('#f8f4ff')],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('INSTRUCTORS', { fontSize: 12, fontWeight: 600, color: purple, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('講師紹介', { fontSize: 34, fontWeight: 800, color: darkPurple, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('InstructorsGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        instructorCard('高橋 美由紀', 'ピアノ講師', '東京藝術大学卒業。コンクール入賞歴多数。20年以上の指導経験で、初心者から上級者まで丁寧に指導します。'),
        instructorCard('鈴木 健太', 'ギター講師', 'プロミュージシャンとして活動後、指導の道へ。ロック・ジャズ・ボサノバなど幅広いジャンルに対応。'),
        instructorCard('中村 さくら', 'ヴァイオリン講師', 'ウィーン音楽院留学経験あり。オーケストラでの演奏経験を活かした、表現力豊かなレッスンが好評。'),
        instructorCard('山口 翔', 'ヴォーカル講師', 'メジャーアーティストのボイストレーナーとしても活動。科学的アプローチで確実に歌唱力を向上させます。'),
      ],
    }),
  ],
});

// ─── Recital Gallery Section ───
const recitalSection = frame('RecitalSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('RECITAL', { fontSize: 12, fontWeight: 600, color: purple, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('発表会・イベント', { fontSize: 34, fontWeight: 800, color: darkPurple, letterSpacing: { value: 2, unit: 'PIXELS' } }),
        text('年2回の発表会と季節のイベントで、日頃の成果を披露する機会を提供しています。', {
          fontSize: 15, fontWeight: 400, color: mutedPurple,
          lineHeight: { value: 180, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),
    frame('RecitalGrid', {
      autoLayout: horizontal({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('RecitalCol1', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            rectangle('RecitalImg1', { size: { x: 340, y: 220 }, fills: [gradient([{ hex: '#e9e0ff', position: 0 }, { hex: '#c4b5fd', position: 1 }], 135)], cornerRadius: 12, layoutSizingHorizontal: 'FILL' }),
            rectangle('RecitalImg2', { size: { x: 340, y: 220 }, fills: [gradient([{ hex: '#ddd4f7', position: 0 }, { hex: '#b8a5f0', position: 1 }], 135)], cornerRadius: 12, layoutSizingHorizontal: 'FILL' }),
          ],
        }),
        frame('RecitalCol2', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            rectangle('RecitalImg3', { size: { x: 340, y: 220 }, fills: [gradient([{ hex: '#d1c4f7', position: 0 }, { hex: '#a78bfa', position: 1 }], 135)], cornerRadius: 12, layoutSizingHorizontal: 'FILL' }),
            rectangle('RecitalImg4', { size: { x: 340, y: 220 }, fills: [gradient([{ hex: '#e5ddf5', position: 0 }, { hex: '#c9b8f0', position: 1 }], 135)], cornerRadius: 12, layoutSizingHorizontal: 'FILL' }),
          ],
        }),
        frame('RecitalCol3', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            rectangle('RecitalImg5', { size: { x: 340, y: 220 }, fills: [gradient([{ hex: '#ece5ff', position: 0 }, { hex: '#b8a5f0', position: 1 }], 135)], cornerRadius: 12, layoutSizingHorizontal: 'FILL' }),
            rectangle('RecitalImg6', { size: { x: 340, y: 220 }, fills: [gradient([{ hex: '#d8cef5', position: 0 }, { hex: '#a78bfa', position: 1 }], 135)], cornerRadius: 12, layoutSizingHorizontal: 'FILL' }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Trial CTA Section ───
const trialCtaSection = frame('TrialCTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 120, padY: 120, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: lightPurple, position: 0 }, { hex: '#ede5ff', position: 1 }], 160)],
  children: [
    text('まずは無料体験レッスンから', {
      fontSize: 38, fontWeight: 900, color: darkPurple,
      letterSpacing: { value: 2, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('30分の無料体験レッスンで、楽器に触れる楽しさを体感してください。\n手ぶらでOK。楽器はすべて無料で貸し出しいたします。', {
      fontSize: 16, fontWeight: 400, color: mutedPurple,
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 560 },
      textAutoResize: 'HEIGHT',
    }),
    rectangle('CtaSpacer', { size: { x: 1, y: 16 }, opacity: 0 }),
    frame('TrialCtaBtn', {
      autoLayout: horizontal({ padX: 64, padY: 20, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(purple)],
      cornerRadius: 32,
      children: [
        text('無料体験を予約する', { fontSize: 18, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    text('※ 強引な勧誘は一切ございません', { fontSize: 12, fontWeight: 400, color: '#999999', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── FAQ Section ───
function faqItem(question: string, answer: string) {
  return frame(`FAQ: ${question.substring(0, 20)}`, {
    autoLayout: vertical({ spacing: 12, padY: 32 }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#7c3aed14'), weight: 1, align: 'INSIDE' }],
    children: [
      text(question, { fontSize: 17, fontWeight: 700, color: darkPurple }),
      text(answer, {
        fontSize: 15, fontWeight: 400, color: gray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        size: { x: 700 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const faqSection = frame('FAQSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0, padX: 320, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(ivory)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('FAQ', { fontSize: 12, fontWeight: 600, color: purple, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('よくある質問', { fontSize: 34, fontWeight: 800, color: darkPurple, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    rectangle('FaqSpacer', { size: { x: 1, y: 32 }, opacity: 0 }),
    faqItem('楽器を持っていなくても始められますか？', 'はい、レッスン用の楽器は無料で貸し出しております。まずは体験レッスンで楽器に触れてみてください。購入をご検討の際は、講師がアドバイスいたします。'),
    faqItem('何歳から習えますか？', 'ピアノは4歳から、ギターは小学1年生から、ヴァイオリンは3歳から受講可能です。ヴォーカルは小学3年生からとなります。シニアの方も大歓迎です。'),
    faqItem('レッスンの振替はできますか？', '前日までにご連絡いただければ、月内で振替レッスンが可能です。急な体調不良の場合も柔軟に対応いたしますので、お気軽にご相談ください。'),
    faqItem('月謝以外に費用はかかりますか？', '入会金と月謝以外の費用はございません。教材費は月謝に含まれています。発表会参加費のみ別途かかりますが、任意参加です。'),
  ],
});

// ─── Footer Section ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid(darkPurple)],
  children: [
    text('Melodia 音楽教室', { fontSize: 20, fontWeight: 900, color: '#c4b5fd', letterSpacing: { value: 1, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('コース紹介', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('講師紹介', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('料金', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('発表会', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('よくある質問', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#ffffff1F')],
    }),
    text('© 2026 Melodia 音楽教室 All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#ffffff66', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseMusicSchoolLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(ivory)],
  children: [
    navBar,
    heroSection,
    coursesSection,
    instructorsSection,
    recitalSection,
    trialCtaSection,
    faqSection,
    footerSection,
  ],
});
