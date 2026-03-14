import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const matcha = '#3f6212';
const matchaLight = '#4d7c0f';
const washi = '#f5f0e8';
const dark = '#2d2a24';
const cardBg = '#ebe5d9';
const white = '#ffffff';
const textDark = '#1a1a1a';
const textMuted = '#5c5647';
const textLight = '#7a7567';
const dividerColor = '#d4cbb8';

// ─── NavBar ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(washi)],
  strokes: [{ color: hex(dividerColor), weight: 1, align: 'INSIDE' }],
  children: [
    text('茶道教室 和', { fontSize: 22, fontWeight: 900, color: matcha, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('教室紹介', { fontSize: 14, fontWeight: 500, color: textMuted }),
        text('講座内容', { fontSize: 14, fontWeight: 500, color: textMuted }),
        text('茶室案内', { fontSize: 14, fontWeight: 500, color: textMuted }),
        text('年間行事', { fontSize: 14, fontWeight: 500, color: textMuted }),
        text('体験申込', { fontSize: 14, fontWeight: 500, color: textMuted }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(matcha)],
      children: [
        text('体験予約', { fontSize: 13, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 700 },
  autoLayout: vertical({ spacing: 28, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#e8e0d0', position: 0 }, { hex: washi, position: 0.5 }, { hex: '#ede8df', position: 1 }], 160)],
  children: [
    text('SADOU KYOUSHITSU WA', {
      fontSize: 13, fontWeight: 600, color: matcha,
      letterSpacing: { value: 6, unit: 'PIXELS' },
    }),
    text('一服の安らぎ', {
      fontSize: 72, fontWeight: 900, color: textDark,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('日本の美と心を一碗の茶に込めて。\n裏千家の伝統を受け継ぐ、本格的な茶道教室です。', {
      fontSize: 18, fontWeight: 400, color: textMuted,
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
          fills: [solid(matcha)],
          children: [
            text('体験茶会に申し込む', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('HeroBtnSecondary', {
          autoLayout: horizontal({ padX: 40, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex(matcha), weight: 1, align: 'INSIDE' }],
          children: [
            text('講座内容を見る', { fontSize: 16, fontWeight: 500, color: matcha }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Course Overview Section ───
function courseCard(level: string, title: string, description: string, price: string) {
  return frame(`Course: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 36, padY: 48, counterAlign: 'CENTER' }),
    fills: [solid(white)],
    strokes: [{ color: hex(dividerColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('CourseBadge', {
        autoLayout: horizontal({ padX: 16, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(matcha)],
        children: [
          text(level, { fontSize: 11, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
        ],
      }),
      text(title, { fontSize: 22, fontWeight: 800, color: textDark, textAlignHorizontal: 'CENTER' }),
      rectangle('Divider', { size: { x: 40, y: 2 }, fills: [solid(matcha)] }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: textMuted,
        lineHeight: { value: 190, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
      rectangle('PriceSpacer', { size: { x: 1, y: 8 }, opacity: 0 }),
      text(price, { fontSize: 20, fontWeight: 800, color: matcha, textAlignHorizontal: 'CENTER' }),
      text('/月', { fontSize: 13, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    ],
  });
}

const coursesSection = frame('CoursesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(washi)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('COURSES', { fontSize: 12, fontWeight: 600, color: matcha, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('講座紹介', { fontSize: 36, fontWeight: 800, color: textDark, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('CoursesGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        courseCard('初心者向け', '入門コース', 'お茶の点て方、基本的な所作、簡単なお菓子のいただき方を学びます。道具の扱い方から丁寧に指導いたします。', '¥8,000'),
        courseCard('経験者向け', '中級コース', '薄茶・濃茶の点前を本格的に学びます。季節の道具の取り合わせや、茶花・掛物についても深く学びます。', '¥12,000'),
        courseCard('上級者向け', '上級コース', '奥点前・台子点前など高度な技法を習得。茶事の亭主としての立ち居振る舞いや、茶会の企画運営も学びます。', '¥18,000'),
      ],
    }),
  ],
});

// ─── Philosophy Section ───
const philosophySection = frame('PhilosophySection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 80, padX: 170, padY: 100 }),
  fills: [solid(cardBg)],
  children: [
    frame('PhilosophyText', {
      autoLayout: vertical({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('PHILOSOPHY', { fontSize: 12, fontWeight: 600, color: matcha, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('和敬清寂の心', { fontSize: 36, fontWeight: 800, color: textDark, letterSpacing: { value: 2, unit: 'PIXELS' } }),
        rectangle('PhilosophyDivider', { size: { x: 60, y: 2 }, fills: [solid(matcha)] }),
        text('茶道の根本精神である「和敬清寂」。和やかに敬い合い、清らかな心で静寂のなかに美を見出す。千利休が伝えたこの四つの心を、現代の暮らしの中で実践することを目指します。', {
          fontSize: 16, fontWeight: 400, color: textMuted,
          lineHeight: { value: 200, unit: 'PERCENT' },
          layoutSizingHorizontal: 'FILL',
          textAutoResize: 'HEIGHT',
        }),
        text('一期一会の精神で、毎回の稽古を大切にし、お茶を通じて日本文化の奥深さと美しさを体感していただきます。', {
          fontSize: 15, fontWeight: 400, color: textLight,
          lineHeight: { value: 190, unit: 'PERCENT' },
          layoutSizingHorizontal: 'FILL',
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),
    rectangle('PhilosophyImage', {
      size: { x: 400, y: 400 },
      fills: [gradient([{ hex: matcha, position: 0 }, { hex: '#2d5016', position: 1 }], 135)],
      cornerRadius: 4,
    }),
  ],
});

// ─── Tea Room Facility Section ───
const tearoomSection = frame('TearoomSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(washi)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('TEA ROOM', { fontSize: 12, fontWeight: 600, color: matcha, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('茶室のご案内', { fontSize: 36, fontWeight: 800, color: textDark, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('TearoomContent', {
      autoLayout: horizontal({ spacing: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('TearoomPhoto1', {
          size: { x: 360, y: 280 },
          fills: [gradient([{ hex: '#5a7d2a', position: 0 }, { hex: matcha, position: 1 }], 120)],
          cornerRadius: 4,
        }),
        rectangle('TearoomPhoto2', {
          size: { x: 360, y: 280 },
          fills: [gradient([{ hex: matcha, position: 0 }, { hex: '#2d5016', position: 1 }], 135)],
          cornerRadius: 4,
        }),
        frame('TearoomDetails', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('本格的な四畳半茶室', { fontSize: 20, fontWeight: 800, color: textDark }),
            rectangle('TearoomDivider', { size: { x: 40, y: 2 }, fills: [solid(matcha)] }),
            text('にじり口・床の間・炉を備えた本格的な茶室で、伝統的な雰囲気の中でお稽古いただけます。季節ごとに掛け軸や茶花を入れ替え、四季の移ろいを感じられる空間です。', {
              fontSize: 14, fontWeight: 400, color: textMuted,
              lineHeight: { value: 190, unit: 'PERCENT' },
              layoutSizingHorizontal: 'FILL',
              textAutoResize: 'HEIGHT',
            }),
            text('広間（八畳）と小間（四畳半）の2室を完備', {
              fontSize: 13, fontWeight: 500, color: matcha,
            }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Seasonal Events Section ───
function eventCard(season: string, title: string, description: string) {
  return frame(`Event: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 32, padY: 32, counterAlign: 'CENTER' }),
    fills: [solid(white)],
    strokes: [{ color: hex(dividerColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(season, { fontSize: 11, fontWeight: 700, color: matcha, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      text(title, { fontSize: 18, fontWeight: 800, color: textDark, textAlignHorizontal: 'CENTER' }),
      rectangle('EventDivider', { size: { x: 30, y: 2 }, fills: [solid(matcha)] }),
      text(description, {
        fontSize: 13, fontWeight: 400, color: textMuted,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 220 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const eventsSection = frame('EventsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(cardBg)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('SEASONAL EVENTS', { fontSize: 12, fontWeight: 600, color: matcha, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('年間行事', { fontSize: 36, fontWeight: 800, color: textDark, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('EventsGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        eventCard('春 SPRING', '初釜・花見茶会', '新年を祝う初釜と、桜の季節に野点形式で行う花見茶会。春の訪れを茶の湯で楽しみます。'),
        eventCard('夏 SUMMER', '朝茶事', '涼しい朝に行う夏の茶事。ガラスの茶碗や涼しげな道具組で、暑さを忘れるひとときを。'),
        eventCard('秋 AUTUMN', '名残の茶会', '風炉の季節の最後を惜しむ名残の茶会。紅葉を愛でながら、秋の深まりを感じます。'),
        eventCard('冬 WINTER', '炉開き・夜咄', '11月の炉開きで冬の茶の湯が始まります。燭台の灯りで行う幻想的な夜咄の茶事も。'),
      ],
    }),
  ],
});

// ─── Trial Lesson CTA ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 120, padY: 120, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#354a17', position: 0 }, { hex: matcha, position: 0.5 }, { hex: '#2d5016', position: 1 }], 160)],
  children: [
    text('まずは体験茶会から', {
      fontSize: 40, fontWeight: 900, color: white,
      letterSpacing: { value: 3, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('お着物でなくても大丈夫です。手ぶらでお越しください。\nお点前体験とお菓子付きの体験茶会を毎月開催しています。', {
      fontSize: 16, fontWeight: 400, color: '#ffffffCC',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    rectangle('CtaSpacer', { size: { x: 1, y: 16 }, opacity: 0 }),
    frame('CtaBtn', {
      autoLayout: horizontal({ padX: 72, padY: 20, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(white)],
      children: [
        text('体験茶会を予約する', { fontSize: 18, fontWeight: 700, color: matcha, letterSpacing: { value: 3, unit: 'PIXELS' } }),
      ],
    }),
    text('※ 体験茶会は1回3,000円（お菓子・お抹茶付き）', { fontSize: 12, fontWeight: 400, color: '#ffffff99', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Footer Section ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid(dark)],
  strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
  children: [
    text('茶道教室 和', { fontSize: 20, fontWeight: 900, color: matchaLight, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('教室紹介', { fontSize: 13, fontWeight: 400, color: '#999999' }),
        text('講座内容', { fontSize: 13, fontWeight: 400, color: '#999999' }),
        text('茶室案内', { fontSize: 13, fontWeight: 400, color: '#999999' }),
        text('年間行事', { fontSize: 13, fontWeight: 400, color: '#999999' }),
        text('体験申込', { fontSize: 13, fontWeight: 400, color: '#999999' }),
        text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#999999' }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#ffffff0F')],
    }),
    text('© 2026 茶道教室 和 All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#666666', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseTeaCeremonyLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(washi)],
  children: [
    navBar,
    heroSection,
    coursesSection,
    philosophySection,
    tearoomSection,
    eventsSection,
    ctaSection,
    footerSection,
  ],
});
