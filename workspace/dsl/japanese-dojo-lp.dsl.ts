import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const crimson = '#dc2626';
const dark = '#0a0a0a';
const cardBg = '#141414';
const white = '#ffffff';
const gray = '#888888';
const mutedGray = '#666666';

// ─── NavBar ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(dark)],
  strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
  children: [
    text('武道館 誠心', { fontSize: 22, fontWeight: 900, color: crimson, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('稽古内容', { fontSize: 14, fontWeight: 500, color: '#aaaaaa' }),
        text('時間割', { fontSize: 14, fontWeight: 500, color: '#aaaaaa' }),
        text('師範紹介', { fontSize: 14, fontWeight: 500, color: '#aaaaaa' }),
        text('体験稽古', { fontSize: 14, fontWeight: 500, color: '#aaaaaa' }),
        text('アクセス', { fontSize: 14, fontWeight: 500, color: '#aaaaaa' }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(crimson)],
      children: [
        text('体験申込', { fontSize: 13, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 700 },
  autoLayout: vertical({ spacing: 28, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#1a0505', position: 0 }, { hex: dark, position: 0.5 }, { hex: '#0d0d0d', position: 1 }], 160)],
  children: [
    text('BUDOKAN SEISHIN', {
      fontSize: 13, fontWeight: 600, color: crimson,
      letterSpacing: { value: 6, unit: 'PIXELS' },
    }),
    text('心技体を鍛える', {
      fontSize: 72, fontWeight: 900, color: white,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('伝統武道の精神を現代に伝える。\n初心者から有段者まで、本物の武道を学べる総合道場。', {
      fontSize: 18, fontWeight: 400, color: '#ffffff99',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroBtnGroup', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        frame('HeroBtnPrimary', {
          autoLayout: horizontal({ padX: 56, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(crimson)],
          children: [
            text('無料体験稽古に申し込む', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('HeroBtnSecondary', {
          autoLayout: horizontal({ padX: 40, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex('#ffffff4D'), weight: 1, align: 'INSIDE' }],
          children: [
            text('稽古内容を見る', { fontSize: 16, fontWeight: 500, color: white }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Disciplines Section ───
function disciplineCard(nameJa: string, nameEn: string, description: string) {
  return frame(`Discipline: ${nameEn}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 48, counterAlign: 'CENTER' }),
    fills: [solid(cardBg)],
    strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('DisciplineIcon', {
        size: { x: 56, y: 56 },
        fills: [solid(crimson)],
        cornerRadius: 4,
      }),
      text(nameJa, { fontSize: 22, fontWeight: 800, color: white, textAlignHorizontal: 'CENTER' }),
      text(nameEn, { fontSize: 12, fontWeight: 600, color: crimson, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      rectangle('Divider', { size: { x: 40, y: 2 }, fills: [solid(crimson)] }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: gray,
        lineHeight: { value: 190, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 240 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const disciplinesSection = frame('DisciplinesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(dark)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('DISCIPLINES', { fontSize: 12, fontWeight: 600, color: crimson, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('稽古種目', { fontSize: 36, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('DisciplinesGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        disciplineCard('空手道', 'KARATE', '突き・蹴り・型の基本から組手まで。心身の鍛錬を通じて強い精神力を養います。'),
        disciplineCard('柔道', 'JUDO', '投技・固技・当身技を体系的に学ぶ。礼に始まり礼に終わる日本柔道の真髄。'),
        disciplineCard('剣道', 'KENDO', '竹刀を通じて剣の理法を学ぶ。集中力と判断力を高め、人間形成を目指します。'),
        disciplineCard('合気道', 'AIKIDO', '相手の力を利用した合理的な技法。護身術としても実用的な和の武道。'),
      ],
    }),
  ],
});

// ─── Class Schedule Section ───
function scheduleRow(time: string, mon: string, tue: string, wed: string, thu: string, fri: string, sat: string) {
  return frame(`ScheduleRow: ${time}`, {
    autoLayout: horizontal({ spacing: 0, padY: 14 }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#ffffff0A'), weight: 1, align: 'INSIDE' }],
    children: [
      text(time, { fontSize: 14, fontWeight: 600, color: white, size: { x: 120 }, textAlignHorizontal: 'CENTER' }),
      text(mon, { fontSize: 13, fontWeight: 400, color: '#aaaaaa', layoutSizingHorizontal: 'FILL', textAlignHorizontal: 'CENTER' }),
      text(tue, { fontSize: 13, fontWeight: 400, color: '#aaaaaa', layoutSizingHorizontal: 'FILL', textAlignHorizontal: 'CENTER' }),
      text(wed, { fontSize: 13, fontWeight: 400, color: '#aaaaaa', layoutSizingHorizontal: 'FILL', textAlignHorizontal: 'CENTER' }),
      text(thu, { fontSize: 13, fontWeight: 400, color: '#aaaaaa', layoutSizingHorizontal: 'FILL', textAlignHorizontal: 'CENTER' }),
      text(fri, { fontSize: 13, fontWeight: 400, color: '#aaaaaa', layoutSizingHorizontal: 'FILL', textAlignHorizontal: 'CENTER' }),
      text(sat, { fontSize: 13, fontWeight: 400, color: '#aaaaaa', layoutSizingHorizontal: 'FILL', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

const scheduleSection = frame('ScheduleSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid('#111111')],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('SCHEDULE', { fontSize: 12, fontWeight: 600, color: crimson, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('稽古時間割', { fontSize: 36, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('ScheduleTable', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(cardBg)],
      strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
      children: [
        frame('ScheduleHeader', {
          autoLayout: horizontal({ spacing: 0, padY: 16 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid(crimson)],
          children: [
            text('時間', { fontSize: 13, fontWeight: 700, color: white, size: { x: 120 }, textAlignHorizontal: 'CENTER' }),
            text('月', { fontSize: 13, fontWeight: 700, color: white, layoutSizingHorizontal: 'FILL', textAlignHorizontal: 'CENTER' }),
            text('火', { fontSize: 13, fontWeight: 700, color: white, layoutSizingHorizontal: 'FILL', textAlignHorizontal: 'CENTER' }),
            text('水', { fontSize: 13, fontWeight: 700, color: white, layoutSizingHorizontal: 'FILL', textAlignHorizontal: 'CENTER' }),
            text('木', { fontSize: 13, fontWeight: 700, color: white, layoutSizingHorizontal: 'FILL', textAlignHorizontal: 'CENTER' }),
            text('金', { fontSize: 13, fontWeight: 700, color: white, layoutSizingHorizontal: 'FILL', textAlignHorizontal: 'CENTER' }),
            text('土', { fontSize: 13, fontWeight: 700, color: white, layoutSizingHorizontal: 'FILL', textAlignHorizontal: 'CENTER' }),
          ],
        }),
        scheduleRow('10:00', '空手', '柔道', '剣道', '合気道', '空手', '全種目'),
        scheduleRow('14:00', '柔道', '剣道', '合気道', '空手', '柔道', '全種目'),
        scheduleRow('17:00', '少年部', '少年部', '少年部', '少年部', '少年部', '-'),
        scheduleRow('19:00', '剣道', '合気道', '空手', '柔道', '剣道', '-'),
        scheduleRow('21:00', '合気道', '空手', '柔道', '剣道', '合気道', '-'),
      ],
    }),
  ],
});

// ─── Instructor Section ───
function instructorCard(name: string, title: string, bio: string) {
  return frame(`Instructor: ${name}`, {
    autoLayout: horizontal({ spacing: 40, padX: 40, padY: 40 }),
    fills: [solid(cardBg)],
    strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('InstructorPhoto', {
        size: { x: 200, y: 240 },
        fills: [gradient([{ hex: crimson, position: 0 }, { hex: '#991b1b', position: 1 }], 135)],
        cornerRadius: 4,
      }),
      frame('InstructorInfo', {
        autoLayout: vertical({ spacing: 12 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 13, fontWeight: 600, color: crimson, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          text(name, { fontSize: 24, fontWeight: 800, color: white }),
          rectangle('InstructorDivider', { size: { x: 40, y: 2 }, fills: [solid(crimson)] }),
          text(bio, {
            fontSize: 15, fontWeight: 400, color: '#cccccc',
            lineHeight: { value: 190, unit: 'PERCENT' },
            layoutSizingHorizontal: 'FILL',
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
    ],
  });
}

const instructorsSection = frame('InstructorsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(dark)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('INSTRUCTORS', { fontSize: 12, fontWeight: 600, color: crimson, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('師範紹介', { fontSize: 36, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('InstructorsGrid', {
      autoLayout: vertical({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        instructorCard('高橋 剛', '館長 / 空手道八段', '全日本空手道選手権優勝3回。40年以上の指導歴を持ち、門下生から多くの全国大会入賞者を輩出。「武道とは己に克つこと」を信条に、技術だけでなく人間力の育成を重視した指導を行う。'),
        instructorCard('渡辺 誠一郎', '副館長 / 柔道七段', '講道館柔道七段。元全日本実業団柔道選手。「柔よく剛を制す」の理念のもと、相手を尊重し共に成長する柔道を伝える。少年部から一般部まで幅広い世代の指導に定評がある。'),
      ],
    }),
  ],
});

// ─── Trial Lesson CTA ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 120, padY: 120, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#1a0505', position: 0 }, { hex: dark, position: 1 }], 160)],
  children: [
    text('まずは体験稽古から', {
      fontSize: 40, fontWeight: 900, color: white,
      letterSpacing: { value: 3, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('道着・防具は無料でお貸しします。\n初心者の方も安心してご参加いただけます。見学だけでもお気軽にどうぞ。', {
      fontSize: 16, fontWeight: 400, color: '#ffffff80',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    rectangle('CtaSpacer', { size: { x: 1, y: 16 }, opacity: 0 }),
    frame('CtaBtn', {
      autoLayout: horizontal({ padX: 72, padY: 20, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(crimson)],
      children: [
        text('体験稽古を申し込む', { fontSize: 18, fontWeight: 700, color: white, letterSpacing: { value: 3, unit: 'PIXELS' } }),
      ],
    }),
    text('※ 体験稽古は1回2,000円（当日入門で無料）', { fontSize: 12, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Access Section ───
const accessSection = frame('AccessSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid('#111111')],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('ACCESS', { fontSize: 12, fontWeight: 600, color: crimson, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('アクセス', { fontSize: 36, fontWeight: 800, color: white, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('AccessInfo', {
      autoLayout: horizontal({ spacing: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('MapPlaceholder', {
          size: { x: 540, y: 320 },
          fills: [solid('#1a1a1a')],
          strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
          cornerRadius: 4,
        }),
        frame('AccessDetails', {
          autoLayout: vertical({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('武道館 誠心 BUDOKAN SEISHIN', { fontSize: 20, fontWeight: 800, color: white }),
            rectangle('AccessDivider', { size: { x: 40, y: 2 }, fills: [solid(crimson)] }),
            text('〒150-0001\n東京都渋谷区神宮前3-15-8 誠心ビル B1F', {
              fontSize: 15, fontWeight: 400, color: '#cccccc',
              lineHeight: { value: 180, unit: 'PERCENT' },
              size: { x: 400 },
              textAutoResize: 'HEIGHT',
            }),
            text('東京メトロ銀座線 外苑前駅 徒歩5分\nJR山手線 原宿駅 徒歩12分', {
              fontSize: 14, fontWeight: 400, color: gray,
              lineHeight: { value: 180, unit: 'PERCENT' },
              size: { x: 400 },
              textAutoResize: 'HEIGHT',
            }),
            text('TEL: 03-1234-5678\n営業時間: 10:00 - 22:00（日祝休み）', {
              fontSize: 14, fontWeight: 400, color: mutedGray,
              lineHeight: { value: 180, unit: 'PERCENT' },
              size: { x: 400 },
              textAutoResize: 'HEIGHT',
            }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Footer Section ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid('#050505')],
  strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
  children: [
    text('武道館 誠心', { fontSize: 20, fontWeight: 900, color: crimson, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('稽古内容', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('時間割', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('師範紹介', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('体験稽古', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('アクセス', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: mutedGray }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#ffffff0F')],
    }),
    text('© 2026 武道館 誠心 All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#444444', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseDojoLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(dark)],
  children: [
    navBar,
    heroSection,
    disciplinesSection,
    scheduleSection,
    instructorsSection,
    ctaSection,
    accessSection,
    footerSection,
  ],
});
