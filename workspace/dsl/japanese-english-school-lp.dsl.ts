import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const blue = '#2563eb';
const darkBlue = '#1d4ed8';
const deepBlue = '#1e40af';
const lightBlue = '#eff6ff';
const white = '#ffffff';
const dark = '#1a1a1a';
const gray = '#666666';
const lightGray = '#888888';
const border = '#e5e7eb';

// ─── Navigation ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 64 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(white)],
  strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
  children: [
    text('GlobalTalk 英会話', { fontSize: 22, fontWeight: 800, color: blue }),
    frame('NavRight', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('特徴', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('コース', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('講師紹介', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('受講者の声', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('よくある質問', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        frame('NavCTA', {
          autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(blue)],
          cornerRadius: 9999,
          children: [
            text('無料体験予約', { fontSize: 14, fontWeight: 600, color: white }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 600 },
  autoLayout: vertical({ spacing: 24, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: blue, position: 0 }, { hex: darkBlue, position: 1 }], 135)],
  children: [
    frame('HeroLabel', {
      autoLayout: horizontal({ padX: 24, padY: 8 }),
      cornerRadius: 9999,
      strokes: [{ color: hex('#ffffff4D'), weight: 1, align: 'INSIDE' }],
      children: [
        text('初心者から上級者まで対応', {
          fontSize: 14, fontWeight: 400, color: '#ffffffE6',
          letterSpacing: { value: 3, unit: 'PIXELS' },
        }),
      ],
    }),
    text('英語で世界が広がる', {
      fontSize: 52, fontWeight: 900, color: white,
      lineHeight: { value: 130, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
    }),
    text('ネイティブ講師との会話を通じて、\n実践的な英語力を身につけませんか？', {
      fontSize: 18, fontWeight: 400, color: '#ffffffD9',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroButtons', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        frame('HeroCTAPrimary', {
          autoLayout: horizontal({ padX: 40, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(white)],
          cornerRadius: 9999,
          children: [
            text('無料体験レッスンを予約する', { fontSize: 16, fontWeight: 700, color: blue }),
          ],
        }),
        frame('HeroCTASecondary', {
          autoLayout: horizontal({ padX: 40, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 9999,
          strokes: [{ color: hex('#ffffff80'), weight: 2, align: 'INSIDE' }],
          children: [
            text('コース一覧を見る', { fontSize: 16, fontWeight: 600, color: white }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Features / Method Section ───
function featureCard(iconLabel: string, title: string, description: string) {
  return frame(`Feature: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 28, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid(white)],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('IconBg', {
        size: { x: 56, y: 56 },
        autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(lightBlue)],
        cornerRadius: 16,
        children: [
          text(iconLabel, { fontSize: 24, fontWeight: 400, color: blue }),
        ],
      }),
      text(title, { fontSize: 18, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
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

const featuresSection = frame('FeaturesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(lightBlue)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('METHOD', { fontSize: 13, fontWeight: 600, color: blue, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('選ばれる4つの理由', { fontSize: 36, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
        text('実績と経験に基づいた独自メソッドで、確実な英語力向上をサポートします', {
          fontSize: 16, fontWeight: 400, color: gray,
          lineHeight: { value: 170, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
          size: { x: 600 },
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),
    frame('FeaturesGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        featureCard('A', '会話中心のレッスン', '教科書を読むだけの授業ではありません。実際の会話シーンを想定した実践的なレッスンで、話す力を鍛えます。'),
        featureCard('B', 'ネイティブ講師', '全講師がTESOL資格保有のネイティブスピーカー。正しい発音とナチュラルな表現を直接学べます。'),
        featureCard('C', '個別カリキュラム', '一人ひとりの目標とレベルに合わせた完全オーダーメイドのカリキュラムをご用意します。'),
        featureCard('D', '柔軟な受講スタイル', '教室でもオンラインでも受講可能。忙しい方でも無理なく続けられる柔軟なスケジュール対応。'),
      ],
    }),
  ],
});

// ─── Course Plans Section ───
function courseFeatureRow(label: string) {
  return frame(`Feature: ${label}`, {
    autoLayout: horizontal({ spacing: 8, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#f0f0f0'), weight: 1, align: 'INSIDE' }],
    children: [
      text('✓', { fontSize: 14, fontWeight: 700, color: blue }),
      text(label, { fontSize: 14, fontWeight: 400, color: '#555555' }),
    ],
  });
}

function courseCard(name: string, price: string, unit: string, features: string[], popular?: boolean) {
  const popularBadge = popular
    ? [frame('PopularBadge', {
        autoLayout: horizontal({ padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(blue)],
        layoutSizingHorizontal: 'FILL',
        children: [
          text('一番人気', { fontSize: 12, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
        ],
      })]
    : [];

  return frame(`Course: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 16,
    strokes: [{ color: popular ? hex(blue) : hex(border), weight: popular ? 2 : 1, align: 'INSIDE' }],
    clipContent: true,
    children: [
      ...popularBadge,
      frame('CourseHeader', {
        autoLayout: vertical({ spacing: 8, padX: 24, padY: 32, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 20, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 0, counterAlign: 'MAX' }),
            children: [
              text(price, { fontSize: 36, fontWeight: 900, color: blue }),
              text(unit, { fontSize: 14, fontWeight: 500, color: lightGray }),
            ],
          }),
        ],
      }),
      frame('CourseFeatures', {
        autoLayout: vertical({ spacing: 0, padX: 24, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: features.map(f => courseFeatureRow(f)),
      }),
      frame('CourseCTA', {
        autoLayout: horizontal({ padX: 24, padY: 24 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('CourseBtn', {
            autoLayout: horizontal({ padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            cornerRadius: 9999,
            fills: popular ? [solid(blue)] : [],
            strokes: popular ? [] : [{ color: hex(blue), weight: 2, align: 'INSIDE' }],
            children: [
              text('詳しく見る', { fontSize: 15, fontWeight: 700, color: popular ? white : blue, textAlignHorizontal: 'CENTER' }),
            ],
          }),
        ],
      }),
    ],
  });
}

const coursesSection = frame('CoursesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('COURSES', { fontSize: 13, fontWeight: 600, color: blue, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('コース・料金', { fontSize: 36, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
        text('あなたの目標に合わせて最適なプランをお選びください', {
          fontSize: 16, fontWeight: 400, color: gray,
          lineHeight: { value: 170, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),
    frame('CourseGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        courseCard('ライトプラン', '¥9,800', '/月', [
          '月4回のグループレッスン',
          '1レッスン50分',
          'オンライン教材使い放題',
          '日本人スタッフのサポート',
        ]),
        courseCard('スタンダードプラン', '¥19,800', '/月', [
          '月8回のレッスン（グループ+個別）',
          '1レッスン50分',
          'オンライン教材使い放題',
          '月1回のレベルチェック',
          '日本人カウンセラー相談',
        ], true),
        courseCard('プレミアムプラン', '¥34,800', '/月', [
          '月12回のマンツーマンレッスン',
          '1レッスン50分',
          'オンライン教材使い放題',
          '毎週のレベルチェック',
          '専属カウンセラー付き',
          'ビジネス英語対応',
        ]),
      ],
    }),
  ],
});

// ─── Instructors Section ───
function instructorCard(name: string, role: string, bio: string) {
  return frame(`Instructor: ${name}`, {
    autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('Avatar', {
        size: { x: 100, y: 100 },
        fills: [gradient([{ hex: blue, position: 0 }, { hex: darkBlue, position: 1 }], 135)],
      }),
      rectangle('Spacer', { size: { x: 1, y: 8 }, opacity: 0 }),
      text(name, { fontSize: 18, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
      text(role, { fontSize: 13, fontWeight: 600, color: blue, textAlignHorizontal: 'CENTER' }),
      text(bio, {
        fontSize: 14, fontWeight: 400, color: gray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const instructorsSection = frame('InstructorsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(lightBlue)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('INSTRUCTORS', { fontSize: 13, fontWeight: 600, color: blue, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('講師紹介', { fontSize: 36, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
        text('経験豊富なネイティブ講師が、あなたの学習を全力でサポートします', {
          fontSize: 16, fontWeight: 400, color: gray,
          lineHeight: { value: 170, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),
    frame('InstructorGrid', {
      autoLayout: horizontal({ spacing: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        instructorCard('Sarah Johnson', 'シニア講師 / TESOL認定', 'イギリス出身。日本での英語指導歴10年以上。初心者から上級者まで幅広く対応。趣味は日本の温泉巡り。'),
        instructorCard('Michael Chen', 'ビジネス英語担当', 'アメリカ出身。元外資系企業マネージャーの経験を活かし、実践的なビジネス英語を指導。TOEIC対策も得意。'),
        instructorCard('Emma Williams', 'キッズ・初心者担当', 'オーストラリア出身。子ども英語教育のスペシャリスト。楽しいレッスンで英語への苦手意識をなくします。'),
      ],
    }),
  ],
});

// ─── Testimonials Section ───
function testimonialCard(quote: string, name: string, info: string) {
  return frame(`Testimonial: ${name}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 32 }),
    fills: [solid('#f9fafb')],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    children: [
      text('★★★★★', { fontSize: 16, fontWeight: 400, color: '#f59e0b', letterSpacing: { value: 2, unit: 'PIXELS' } }),
      text(quote, {
        fontSize: 14, fontWeight: 400, color: '#555555',
        lineHeight: { value: 180, unit: 'PERCENT' },
        size: { x: 250 },
        textAutoResize: 'HEIGHT',
      }),
      frame('Author', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          ellipse('AuthorAvatar', {
            size: { x: 40, y: 40 },
            fills: [gradient([{ hex: '#60a5fa', position: 0 }, { hex: blue, position: 1 }], 135)],
          }),
          frame('AuthorInfo', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, { fontSize: 14, fontWeight: 700, color: dark }),
              text(info, { fontSize: 12, fontWeight: 400, color: lightGray }),
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
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('VOICE', { fontSize: 13, fontWeight: 600, color: blue, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('受講者の声', { fontSize: 36, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('TestimonialGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        testimonialCard(
          '半年通っただけで、海外旅行で困らないレベルになりました。先生方が本当に親切で、毎回のレッスンが楽しみです。',
          '田中 美咲さん', '会社員 / 受講歴1年',
        ),
        testimonialCard(
          'ビジネスの場で英語のプレゼンができるようになりました。実践的な指導のおかげで自信がつきました。',
          '佐藤 健太さん', 'IT企業勤務 / 受講歴2年',
        ),
        testimonialCard(
          '子どもが英語を大好きになりました。Emma先生のレッスンは遊びながら学べるので、毎週楽しみにしています。',
          '山田 由美子さん', '主婦 / お子様受講歴8ヶ月',
        ),
      ],
    }),
  ],
});

// ─── Trial Lesson CTA Section ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: blue, position: 0 }, { hex: deepBlue, position: 1 }], 135)],
  children: [
    text('まずは無料体験レッスンから', {
      fontSize: 36, fontWeight: 900, color: white, textAlignHorizontal: 'CENTER',
    }),
    text('あなたに合ったレッスンを体験してみませんか？\nカウンセリング付きの無料体験レッスンを実施中です。', {
      fontSize: 18, fontWeight: 400, color: '#ffffffD9',
      lineHeight: { value: 170, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    frame('CTAButton', {
      autoLayout: horizontal({ padX: 56, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(white)],
      cornerRadius: 9999,
      children: [
        text('無料体験レッスンを予約する', { fontSize: 18, fontWeight: 700, color: blue }),
      ],
    }),
    text('※ 無理な勧誘は一切ございません', {
      fontSize: 13, fontWeight: 400, color: '#ffffffB3', textAlignHorizontal: 'CENTER',
    }),
  ],
});

// ─── FAQ Section ───
function faqItem(question: string, answer: string) {
  return frame(`FAQ: ${question.slice(0, 20)}`, {
    autoLayout: vertical({ spacing: 12, padY: 24 }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      frame('Question', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'MIN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text('Q.', { fontSize: 16, fontWeight: 800, color: blue }),
          text(question, {
            fontSize: 16, fontWeight: 700, color: dark,
            size: { x: 700 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
      text(answer, {
        fontSize: 14, fontWeight: 400, color: gray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        size: { x: 700 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const faqSection = frame('FAQSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 320, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('FAQ', { fontSize: 13, fontWeight: 600, color: blue, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('よくある質問', { fontSize: 36, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('FAQList', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        faqItem('英語が全く話せませんが大丈夫ですか？', 'はい、大丈夫です。完全初心者向けのカリキュラムをご用意しており、日本人スタッフのサポートもあるので安心してご受講いただけます。'),
        faqItem('レッスンのキャンセルや振替はできますか？', 'レッスン前日の18時まで無料でキャンセル・振替が可能です。急な予定変更にも柔軟に対応いたします。'),
        faqItem('オンラインと教室の併用は可能ですか？', 'はい、可能です。その日のご都合に合わせて、教室受講とオンライン受講を自由に切り替えていただけます。'),
        faqItem('入会金はかかりますか？', '現在キャンペーン中につき、入会金は無料です。テキスト代もコース料金に含まれています。'),
        faqItem('どのくらいで効果を実感できますか？', '個人差はありますが、多くの受講者の方が3ヶ月程度で上達を実感されています。週2回以上の受講をおすすめしています。'),
      ],
    }),
  ],
});

// ─── Footer Section ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 120, padY: 48 }),
  fills: [solid(dark)],
  children: [
    frame('FooterTop', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('FooterBrandArea', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('GlobalTalk 英会話', { fontSize: 20, fontWeight: 800, color: white }),
            text('ネイティブ講師による実践的な英会話スクール。\nあなたの英語力向上を全力でサポートします。', {
              fontSize: 13, fontWeight: 400, color: lightGray,
              lineHeight: { value: 170, unit: 'PERCENT' },
              size: { x: 340 },
              textAutoResize: 'HEIGHT',
            }),
          ],
        }),
        frame('FooterColumns', {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            frame('FooterCol1', {
              autoLayout: vertical({ spacing: 10 }),
              children: [
                text('コース', { fontSize: 13, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
                rectangle('ColSpacer1', { size: { x: 1, y: 6 }, opacity: 0 }),
                text('ライトプラン', { fontSize: 13, fontWeight: 400, color: lightGray }),
                text('スタンダードプラン', { fontSize: 13, fontWeight: 400, color: lightGray }),
                text('プレミアムプラン', { fontSize: 13, fontWeight: 400, color: lightGray }),
              ],
            }),
            frame('FooterCol2', {
              autoLayout: vertical({ spacing: 10 }),
              children: [
                text('サポート', { fontSize: 13, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
                rectangle('ColSpacer2', { size: { x: 1, y: 6 }, opacity: 0 }),
                text('よくある質問', { fontSize: 13, fontWeight: 400, color: lightGray }),
                text('お問い合わせ', { fontSize: 13, fontWeight: 400, color: lightGray }),
                text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: lightGray }),
              ],
            }),
          ],
        }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1, y: 1 },
      fills: [solid('#333333')],
      layoutSizingHorizontal: 'FILL',
    }),
    frame('FooterBottom', {
      autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('© 2026 GlobalTalk 英会話 All rights reserved.', {
          fontSize: 12, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER',
        }),
      ],
    }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseEnglishSchoolLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    navBar,
    heroSection,
    featuresSection,
    coursesSection,
    instructorsSection,
    testimonialsSection,
    ctaSection,
    faqSection,
    footerSection,
  ],
});
