import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const yellow = '#f59e0b';
const darkBrown = '#78350f';
const warmBrown = '#92400e';
const white = '#ffffff';
const ivory = '#fffef8';
const lightYellow = '#fef9c3';
const lightGreen = '#ecfdf5';
const green = '#22c55e';

// ─── NavBar ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(ivory)],
  strokes: [{ color: hex('#f59e0b1A'), weight: 1, align: 'INSIDE' }],
  children: [
    text('ひまわり幼稚園', { fontSize: 22, fontWeight: 900, color: yellow, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('教育方針', { fontSize: 14, fontWeight: 500, color: '#888888' }),
        text('一日の流れ', { fontSize: 14, fontWeight: 500, color: '#888888' }),
        text('施設紹介', { fontSize: 14, fontWeight: 500, color: '#888888' }),
        text('年間行事', { fontSize: 14, fontWeight: 500, color: '#888888' }),
        text('入園案内', { fontSize: 14, fontWeight: 500, color: '#888888' }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(yellow)],
      cornerRadius: 24,
      children: [
        text('見学予約', { fontSize: 13, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 700 },
  autoLayout: vertical({ spacing: 20, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: lightYellow, position: 0 }, { hex: ivory, position: 0.4 }, { hex: lightGreen, position: 1 }], 160)],
  children: [
    text('HIMAWARI KINDERGARTEN', {
      fontSize: 13, fontWeight: 600, color: yellow,
      letterSpacing: { value: 6, unit: 'PIXELS' },
    }),
    text('のびのび育つ 笑顔の毎日', {
      fontSize: 60, fontWeight: 900, color: darkBrown,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('自然の中で遊び、学び、成長する。\n一人ひとりの個性を大切にした、あたたかい保育を実践しています。', {
      fontSize: 17, fontWeight: 400, color: warmBrown,
      lineHeight: { value: 190, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 560 },
      textAutoResize: 'HEIGHT',
      opacity: 0.7,
    }),
    frame('HeroBtnGroup', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        frame('HeroBtnPrimary', {
          autoLayout: horizontal({ padX: 48, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(yellow)],
          cornerRadius: 32,
          children: [
            text('園見学を予約する', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('HeroBtnSecondary', {
          autoLayout: horizontal({ padX: 40, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex(yellow), weight: 2, align: 'INSIDE' }],
          cornerRadius: 32,
          children: [
            text('資料請求', { fontSize: 16, fontWeight: 600, color: yellow }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Philosophy Section ───
function philosophyCard(number: string, title: string, description: string) {
  return frame(`Philosophy: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 28, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid(ivory)],
    strokes: [{ color: hex('#f59e0b1A'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 20,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(number, { fontSize: 36, fontWeight: 900, color: yellow, opacity: 0.3 }),
      text(title, { fontSize: 20, fontWeight: 700, color: darkBrown, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: warmBrown,
        lineHeight: { value: 190, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
        opacity: 0.7,
      }),
    ],
  });
}

const philosophySection = frame('PhilosophySection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('PHILOSOPHY', { fontSize: 12, fontWeight: 600, color: yellow, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('教育方針', { fontSize: 34, fontWeight: 800, color: darkBrown, letterSpacing: { value: 2, unit: 'PIXELS' } }),
        text('子どもたちの「やりたい！」を大切にする3つの柱', {
          fontSize: 15, fontWeight: 400, color: warmBrown,
          textAlignHorizontal: 'CENTER',
          opacity: 0.7,
        }),
      ],
    }),
    frame('PhilosophyGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        philosophyCard('01', '自然体験を通じた学び', '広い園庭と近隣の自然環境を活かし、四季を感じながら五感を育てます。田植えや収穫体験、昆虫観察など、自然の中でしか得られない学びがあります。'),
        philosophyCard('02', '主体性を育むあそび', '子どもたちが自ら考え、選び、行動する力を育てます。自由あそびの時間を十分に確保し、想像力と創造力を伸ばす環境づくりを大切にしています。'),
        philosophyCard('03', '思いやりの心を育てる', '異年齢交流や共同制作を通じて、友達を思いやる心を育みます。お兄さん・お姉さんから学び、年下の子の面倒を見る経験が、社会性を育てます。'),
      ],
    }),
  ],
});

// ─── Schedule Section ───
function scheduleItem(time: string, activity: string, description: string) {
  return frame(`Schedule: ${time}`, {
    autoLayout: horizontal({ spacing: 20, padY: 24, counterAlign: 'MIN' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#f59e0b1A'), weight: 1, align: 'INSIDE' }],
    children: [
      text(time, { fontSize: 18, fontWeight: 800, color: yellow, size: { x: 60 } }),
      ellipse('ScheduleDot', {
        size: { x: 12, y: 12 },
        fills: [gradient([{ hex: yellow, position: 0 }, { hex: '#fbbf24', position: 1 }], 135)],
      }),
      frame('ScheduleContent', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(activity, { fontSize: 17, fontWeight: 700, color: darkBrown }),
          text(description, { fontSize: 14, fontWeight: 400, color: warmBrown, opacity: 0.7 }),
        ],
      }),
    ],
  });
}

const scheduleSection = frame('ScheduleSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 370, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid('#fefce8')],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('DAILY SCHEDULE', { fontSize: 12, fontWeight: 600, color: yellow, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('一日の流れ', { fontSize: 34, fontWeight: 800, color: darkBrown, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('ScheduleList', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        scheduleItem('8:30', '登園・自由あそび', '元気にご挨拶。お友達と好きなあそびを楽しみます。'),
        scheduleItem('10:00', '朝の会・クラス活動', '歌やお話、制作活動など年齢に合わせた活動を行います。'),
        scheduleItem('11:30', 'お昼ごはん', '自園調理の温かい給食。食育にも力を入れています。'),
        scheduleItem('13:00', '午後の活動・外あそび', '園庭でのびのびと体を動かしたり、専門講師による体操・英語の時間も。'),
        scheduleItem('14:30', '帰りの会・降園', '一日の振り返りをして、お迎えの時間です。'),
        scheduleItem('15:00', '預かり保育', '18時まで預かり保育をご利用いただけます（別途申込）。'),
      ],
    }),
  ],
});

// ─── Facilities Section ───
function facilityCard(name: string, description: string) {
  return frame(`Facility: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid(ivory)],
    strokes: [{ color: hex('#f59e0b14'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('FacilityImage', {
        size: { x: 480, y: 200 },
        fills: [gradient([{ hex: '#fef3c7', position: 0 }, { hex: '#d9f99d', position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame('FacilityInfo', {
        autoLayout: vertical({ spacing: 8, padX: 24, padY: 24 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 18, fontWeight: 700, color: darkBrown }),
          text(description, {
            fontSize: 14, fontWeight: 400, color: warmBrown,
            lineHeight: { value: 180, unit: 'PERCENT' },
            opacity: 0.7,
            size: { x: 400 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
    ],
  });
}

const facilitiesSection = frame('FacilitiesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 220, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('FACILITIES', { fontSize: 12, fontWeight: 600, color: yellow, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('施設紹介', { fontSize: 34, fontWeight: 800, color: darkBrown, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('FacilitiesRow1', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        facilityCard('広々とした園庭', '芝生の広場、砂場、遊具エリアなど、子どもたちが思いきり遊べる広い園庭です。'),
        facilityCard('明るい保育室', '天井が高く、自然光がたっぷり入る開放的な保育室。床暖房完備で冬も快適です。'),
      ],
    }),
    frame('FacilitiesRow2', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        facilityCard('自園調理の給食室', '専任の栄養士と調理師が、毎日手作りの給食を提供。アレルギー対応も万全です。'),
        facilityCard('絵本コーナー', '1,500冊以上の絵本を揃えた図書スペース。読み聞かせの時間が子どもたちに大人気。'),
      ],
    }),
  ],
});

// ─── Events Section ───
function eventCard(month: string, title: string, description: string) {
  return frame(`Event: ${title}`, {
    autoLayout: vertical({ spacing: 8, padX: 24, padY: 28, counterAlign: 'CENTER' }),
    fills: [solid(white)],
    strokes: [{ color: hex('#22c55e1A'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('EventMonthBadge', {
        autoLayout: horizontal({ padX: 16, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#22c55e1A')],
        cornerRadius: 12,
        children: [
          text(month, { fontSize: 14, fontWeight: 800, color: green }),
        ],
      }),
      text(title, { fontSize: 17, fontWeight: 700, color: darkBrown, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 13, fontWeight: 400, color: warmBrown,
        textAlignHorizontal: 'CENTER',
        opacity: 0.7,
      }),
    ],
  });
}

const eventsSection = frame('EventsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 220, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(lightGreen)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('EVENTS', { fontSize: 12, fontWeight: 600, color: yellow, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('年間行事', { fontSize: 34, fontWeight: 800, color: darkBrown, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('EventsRow1', {
      autoLayout: horizontal({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        eventCard('4月', '入園式・お花見', '新しいお友達を迎え、桜の下でお祝いします。'),
        eventCard('7月', '夏祭り・プール開き', '盆踊りやゲームで楽しむ夏のお祭り。'),
        eventCard('10月', '運動会', 'かけっこやダンスを家族みんなで楽しむ一日。'),
      ],
    }),
    frame('EventsRow2', {
      autoLayout: horizontal({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        eventCard('12月', 'クリスマス発表会', '歌や劇など、日頃の成果を発表します。'),
        eventCard('2月', '節分・作品展', '豆まきと一年間の制作作品をお披露目。'),
        eventCard('3月', '卒園式', '成長を振り返り、新しいスタートをお祝いします。'),
      ],
    }),
  ],
});

// ─── Enrollment CTA Section ───
const enrollmentCtaSection = frame('EnrollmentCTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 120, padY: 120, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: lightYellow, position: 0 }, { hex: '#fef3c7', position: 0.5 }, { hex: '#fde68a', position: 1 }], 160)],
  children: [
    text('園見学受付中', {
      fontSize: 40, fontWeight: 900, color: darkBrown,
      letterSpacing: { value: 3, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('実際の保育の様子をご覧いただけます。\nお子さまと一緒に、お気軽にお越しください。', {
      fontSize: 16, fontWeight: 400, color: warmBrown,
      lineHeight: { value: 190, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 480 },
      textAutoResize: 'HEIGHT',
      opacity: 0.7,
    }),
    rectangle('CtaSpacer', { size: { x: 1, y: 16 }, opacity: 0 }),
    frame('EnrollmentCtaBtn', {
      autoLayout: horizontal({ padX: 64, padY: 20, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(yellow)],
      cornerRadius: 32,
      children: [
        text('見学を予約する', { fontSize: 18, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    text('※ 平日10:00〜11:00で随時受付中', { fontSize: 12, fontWeight: 400, color: warmBrown, opacity: 0.5, textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Footer Section ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid(darkBrown)],
  children: [
    text('ひまわり幼稚園', { fontSize: 22, fontWeight: 900, color: '#fbbf24', letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('教育方針', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('一日の流れ', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('施設紹介', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('年間行事', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('入園案内', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#ffffff1F')],
    }),
    text('© 2026 ひまわり幼稚園 All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#ffffff66', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseKindergartenLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(ivory)],
  children: [
    navBar,
    heroSection,
    philosophySection,
    scheduleSection,
    facilitiesSection,
    eventsSection,
    enrollmentCtaSection,
    footerSection,
  ],
});
