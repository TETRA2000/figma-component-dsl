import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

// Color palette - Nursery soft coral with mint
const coral = '#f97316';
const coralLight = '#fb923c';
const mint = '#a7f3d0';
const mintDark = '#6ee7b7';
const warmBg = '#fef7f0';
const mintBg = '#ecfdf5';
const dark = '#1a1a1a';
const textGray = '#666666';
const textLight = '#888888';
const borderColor = '#f0e8e0';

// ─── Navigation ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
  children: [
    frame('BrandGroup', {
      autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        frame('BrandIcon', {
          size: { x: 36, y: 36 },
          fills: [solid(coral)],
          cornerRadius: 18,
          children: [
            text('N', { fontSize: 18, fontWeight: 700, color: '#ffffff', x: 12, y: 6 }),
          ],
        }),
        frame('BrandText', {
          autoLayout: vertical({ spacing: 2 }),
          children: [
            text('にこにこ保育園', { fontSize: 16, fontWeight: 700, color: coral }),
            text('NIKONIKO HOIKUEN', { fontSize: 10, fontWeight: 600, color: textLight, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
      ],
    }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('園の紹介', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('クラス案内', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('保護者の声', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('入園案内', { fontSize: 14, fontWeight: 500, color: '#555555' }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(coral)],
      cornerRadius: 24,
      children: [
        text('見学予約', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: warmBg, position: 0 }, { hex: mintBg, position: 1 }], 135)],
  children: [
    frame('HeroContent', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('HeroBadge', {
          autoLayout: horizontal({ padX: 16, padY: 6 }),
          fills: [solid(mint)],
          cornerRadius: 20,
          children: [
            text('2026年度 園児募集中', { fontSize: 13, fontWeight: 600, color: '#166534' }),
          ],
        }),
        text('笑顔あふれる\n毎日を', {
          fontSize: 48, fontWeight: 800, color: dark,
          lineHeight: { value: 130, unit: 'PERCENT' },
          size: { x: 500 },
          textAutoResize: 'HEIGHT',
        }),
        text('子どもたちの「やりたい！」を大切に。\n一人ひとりの個性を伸ばす保育を実践しています。', {
          fontSize: 16, fontWeight: 400, color: textGray,
          lineHeight: { value: 180, unit: 'PERCENT' },
          size: { x: 450 },
          textAutoResize: 'HEIGHT',
        }),
        frame('HeroActions', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            frame('PrimaryBtn', {
              autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [gradient([{ hex: coral, position: 0 }, { hex: coralLight, position: 1 }], 135)],
              cornerRadius: 28,
              children: [
                text('見学を申し込む', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
            frame('SecondaryBtn', {
              autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 28,
              strokes: [{ color: hex(coral), weight: 2, align: 'INSIDE' }],
              children: [
                text('資料ダウンロード', { fontSize: 16, fontWeight: 600, color: coral }),
              ],
            }),
          ],
        }),
      ],
    }),
    frame('HeroImage', {
      autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ImagePlaceholder', {
          size: { x: 400, y: 320 },
          fills: [gradient([{ hex: mint, position: 0 }, { hex: '#fde68a', position: 1 }], 135)],
          cornerRadius: 24,
          children: [
            rectangle('PlayBlock', {
              size: { x: 80, y: 80 },
              fills: [solid(coral, 0.3)],
              cornerRadius: 16,
              x: 160,
              y: 120,
            }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Age Groups Section ───
function ageGroupCard(ageRange: string, title: string, description: string, bgColor: string) {
  return frame(`AgeGroup: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 20,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('AgeIcon', {
        size: { x: 64, y: 64 },
        fills: [solid(bgColor)],
        cornerRadius: 32,
        children: [
          text(ageRange, { fontSize: 16, fontWeight: 700, color: dark, x: 12, y: 20 }),
        ],
      }),
      text(title, { fontSize: 20, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: textGray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const ageGroupsSection = frame('AgeGroupsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('クラス案内', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('年齢に合わせた最適なプログラム', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('AgeGroupGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        ageGroupCard('0-2歳', 'ひよこ組', '安心・安全な環境の中で、愛情たっぷりの保育。生活リズムを大切にしながら、五感を育む遊びを提供します。', mint),
        ageGroupCard('3-5歳', 'うさぎ組', '好奇心を引き出すカリキュラム。英語・リトミック・絵画など、多彩な活動で豊かな感性と社会性を育みます。', '#fde68a'),
        ageGroupCard('放課後', 'そら組', '小学生向けの学童保育。宿題サポートから自由遊びまで、放課後の時間を有意義に過ごせるプログラムです。', '#c4b5fd'),
      ],
    }),
  ],
});

// ─── Daily Routine Section ───
function routineItem(time: string, activity: string, isHighlight: boolean) {
  return frame(`Routine: ${activity}`, {
    autoLayout: horizontal({ spacing: 24, padX: 32, padY: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: isHighlight ? [solid(warmBg)] : [],
    cornerRadius: 12,
    children: [
      text(time, { fontSize: 16, fontWeight: 700, color: coral, size: { x: 80 } }),
      rectangle('Divider', {
        size: { x: 3, y: 24 },
        fills: [solid(mint)],
        cornerRadius: 2,
      }),
      text(activity, { fontSize: 15, fontWeight: 500, color: dark }),
    ],
  });
}

const dailyRoutineSection = frame('DailyRoutineSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(mintBg)],
  children: [
    text('1日の流れ', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('園での1日をご紹介します', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('RoutineList', {
      autoLayout: vertical({ spacing: 8 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      cornerRadius: 20,
      strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
      children: [
        routineItem('7:30', '登園・自由遊び', false),
        routineItem('9:00', '朝の会・体操', true),
        routineItem('10:00', 'カリキュラム活動', false),
        routineItem('11:30', '給食', true),
        routineItem('13:00', 'お昼寝', false),
        routineItem('15:00', 'おやつ・自由遊び', true),
        routineItem('17:00', 'お迎え・降園', false),
      ],
    }),
  ],
});

// ─── Staff Section ───
function staffCard(name: string, role: string, message: string) {
  return frame(`Staff: ${name}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 32, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 20,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('StaffAvatar', {
        size: { x: 80, y: 80 },
        fills: [gradient([{ hex: coral, position: 0 }, { hex: coralLight, position: 1 }], 135)],
        cornerRadius: 40,
      }),
      text(name, { fontSize: 18, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
      frame('RoleBadge', {
        autoLayout: horizontal({ padX: 12, padY: 4 }),
        fills: [solid(warmBg)],
        cornerRadius: 12,
        children: [
          text(role, { fontSize: 12, fontWeight: 600, color: coral }),
        ],
      }),
      text(message, {
        fontSize: 14, fontWeight: 400, color: textGray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 260 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const staffSection = frame('StaffSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('先生紹介', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('子どもたちの成長を見守るスタッフをご紹介', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('StaffGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        staffCard('山田 さくら', '園長', '子どもたちの笑顔が私の元気の源です。一人ひとりに寄り添った保育を心がけています。'),
        staffCard('佐藤 ゆい', '主任保育士', '遊びの中から学ぶことを大切に。毎日ワクワクする活動を考えています。'),
        staffCard('田中 はるか', '保育士', '子どもたちと一緒に成長する毎日です。安心できる場所づくりを目指しています。'),
      ],
    }),
  ],
});

// ─── Testimonials Section ───
function testimonialCard(name: string, relation: string, testimonialText: string) {
  return frame(`Testimonial: ${name}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 32 }),
    fills: [solid('#ffffff')],
    cornerRadius: 20,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(testimonialText, {
        fontSize: 15, fontWeight: 400, color: '#444444',
        lineHeight: { value: 180, unit: 'PERCENT' },
        size: { x: 440 },
        textAutoResize: 'HEIGHT',
      }),
      frame('Author', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          frame('Avatar', {
            size: { x: 44, y: 44 },
            fills: [gradient([{ hex: mint, position: 0 }, { hex: mintDark, position: 1 }], 135)],
            cornerRadius: 22,
          }),
          frame('AuthorInfo', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, { fontSize: 14, fontWeight: 600, color: dark }),
              text(relation, { fontSize: 12, fontWeight: 400, color: textLight }),
            ],
          }),
        ],
      }),
    ],
  });
}

const testimonialsSection = frame('TestimonialsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(warmBg)],
  children: [
    text('保護者の声', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
    text('通園中の保護者様からいただいた感想', { fontSize: 16, fontWeight: 400, color: textLight, textAlignHorizontal: 'CENTER' }),
    frame('TestimonialGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        testimonialCard('木村 あかり', '3歳児の母', '毎朝「保育園に行きたい！」と言ってくれるようになりました。先生方の温かい対応に感謝しています。給食も栄養バランスが良く、家でも食べられるものが増えました。'),
        testimonialCard('高橋 まさと', '5歳児の父', '英語やリトミックなど、多彩なカリキュラムが魅力です。子どもの成長が目に見えて分かり、毎日の連絡帳も丁寧で安心して預けられます。'),
      ],
    }),
  ],
});

// ─── Enrollment CTA Section ───
const enrollmentCTA = frame('EnrollmentCTA', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 120, padY: 96, counterAlign: 'CENTER', align: 'CENTER' }),
  fills: [gradient([{ hex: coral, position: 0 }, { hex: coralLight, position: 1 }], 135)],
  children: [
    text('2026年度 入園児募集中', { fontSize: 36, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('まずは見学にいらしてください。園の雰囲気を体感していただけます。', {
      fontSize: 16, fontWeight: 400, color: '#ffffffE6', textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('CTAButtons', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('CTAButton', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 32,
          children: [
            text('見学予約はこちら', { fontSize: 18, fontWeight: 700, color: coral }),
          ],
        }),
        frame('CTAButtonSecondary', {
          autoLayout: horizontal({ padX: 48, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 32,
          strokes: [{ color: hex('#ffffff'), weight: 2, align: 'INSIDE' }],
          children: [
            text('お電話でのお問い合わせ', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
      ],
    }),
    text('TEL: 03-1234-5678（平日 9:00-17:00）', { fontSize: 14, fontWeight: 400, color: '#ffffffCC', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Footer ───
function footerCol(title: string, links: string[]) {
  return frame(`FooterCol: ${title}`, {
    autoLayout: vertical({ spacing: 12 }),
    children: [
      text(title, { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
      ...links.map(link => text(link, { fontSize: 13, fontWeight: 400, color: '#888888' })),
    ],
  });
}

const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0, padX: 120 }),
  fills: [solid(dark)],
  children: [
    frame('FooterInner', {
      autoLayout: horizontal({ spacing: 0, padY: 64, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex('#333333'), weight: 1, align: 'INSIDE' }],
      children: [
        frame('FooterBrand', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('にこにこ保育園', { fontSize: 18, fontWeight: 700, color: coral }),
            text('NIKONIKO HOIKUEN', { fontSize: 11, fontWeight: 600, color: '#888888', letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('笑顔あふれる毎日を', { fontSize: 13, fontWeight: 400, color: '#888888' }),
          ],
        }),
        frame('FooterLinks', {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            footerCol('園について', ['園の方針', 'クラス案内', '年間行事']),
            footerCol('入園案内', ['募集要項', '見学予約', 'よくある質問']),
            footerCol('お問い合わせ', ['アクセス', '電話番号', 'メール']),
          ],
        }),
      ],
    }),
    frame('FooterBottom', {
      autoLayout: horizontal({ padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('© 2026 にこにこ保育園 NIKONIKO HOIKUEN. All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER' }),
      ],
    }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseNurseryLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    navBar,
    heroSection,
    ageGroupsSection,
    dailyRoutineSection,
    staffSection,
    testimonialsSection,
    enrollmentCTA,
    footerSection,
  ],
});
