import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const charcoal = '#1f2937';
const purple = '#6b5b8d';
const lightPurple = '#8b7baa';
const darkest = '#111318';
const paleBg = '#f5f3f7';
const white = '#ffffff';
const mutedText = '#9ca3af';

// ─── Navigation ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 64 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(darkest)],
  children: [
    text('セレモニーホール 静 SHIZUKA', { fontSize: 20, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('プラン', { fontSize: 14, fontWeight: 500, color: mutedText }),
        text('施設案内', { fontSize: 14, fontWeight: 500, color: mutedText }),
        text('ご葬儀の流れ', { fontSize: 14, fontWeight: 500, color: mutedText }),
        text('お問い合わせ', { fontSize: 14, fontWeight: 500, color: mutedText }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 560 },
  autoLayout: vertical({ spacing: 24, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: charcoal, position: 0 }, { hex: darkest, position: 1 }], 180)],
  children: [
    frame('HeroLabel', {
      autoLayout: horizontal({ padX: 24, padY: 8 }),
      strokes: [{ color: hex('#6b5b8d4D'), weight: 1, align: 'INSIDE' }],
      children: [
        text('心を込めて、お見送りのお手伝い', { fontSize: 13, fontWeight: 400, color: lightPurple, letterSpacing: { value: 4, unit: 'PIXELS' } }),
      ],
    }),
    text('大切な方との、\n最後のお別れを', {
      fontSize: 48, fontWeight: 800, color: white,
      lineHeight: { value: 140, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    text('24時間365日、いつでもご相談ください。\n経験豊富なスタッフが丁寧にサポートいたします。', {
      fontSize: 15, fontWeight: 400, color: '#ffffffB3',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroCTA', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(purple)],
      children: [
        text('無料相談はこちら', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Plan Section ───
function planCard(title: string, subtitle: string, price: string, description: string) {
  return frame(`Plan: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 28, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid(white)],
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
    children: [
      text(subtitle, { fontSize: 12, fontWeight: 600, color: purple, letterSpacing: { value: 3, unit: 'PIXELS' } }),
      text(title, { fontSize: 24, fontWeight: 800, color: charcoal, textAlignHorizontal: 'CENTER' }),
      rectangle('PlanDivider', { size: { x: 40, y: 2 }, fills: [solid(purple)] }),
      text(price, { fontSize: 20, fontWeight: 700, color: purple }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#6b7280',
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 260 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const planSection = frame('PlanSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(paleBg)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('PLAN', { fontSize: 13, fontWeight: 600, color: purple, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('ご葬儀プラン', { fontSize: 32, fontWeight: 800, color: charcoal, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('PlanGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        planCard('家族葬', 'FAMILY', '¥385,000〜', '少人数でゆっくりとお別れいただける、温かみのあるご葬儀プランです。'),
        planCard('一般葬', 'GENERAL', '¥660,000〜', '多くの方にお見送りいただける、伝統的なご葬儀プランです。'),
        planCard('直葬', 'DIRECT', '¥165,000〜', 'お通夜・告別式を行わず、シンプルにお見送りするプランです。'),
      ],
    }),
  ],
});

// ─── Facility Section ───
function facilityFeature(title: string, description: string) {
  return frame(`Facility: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 32 }),
    fills: [solid('#f9fafb')],
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 8,
    children: [
      text(title, { fontSize: 18, fontWeight: 700, color: charcoal }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#6b7280',
        lineHeight: { value: 180, unit: 'PERCENT' },
        size: { x: 260 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const facilitySection = frame('FacilitySection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('FACILITY', { fontSize: 13, fontWeight: 600, color: purple, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('施設のご案内', { fontSize: 32, fontWeight: 800, color: charcoal, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('FacilityGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        facilityFeature('本館式場', '最大200名収容の広々とした式場。落ち着いた雰囲気の中でお別れいただけます。'),
        facilityFeature('控室・親族室', 'ご遺族の皆様がゆっくりとお過ごしいただける快適な控室をご用意しています。'),
        facilityFeature('宿泊施設', 'お通夜の際にご利用いただける宿泊施設を完備しております。'),
        facilityFeature('駐車場完備', '大型駐車場を完備。最大50台まで駐車可能です。'),
      ],
    }),
  ],
});

// ─── Flow Section ───
function flowStep(number: string, title: string, description: string) {
  return frame(`Step: ${title}`, {
    autoLayout: vertical({ spacing: 8, padX: 20, padY: 24, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(number, { fontSize: 36, fontWeight: 900, color: purple, opacity: 0.3 }),
      text(title, { fontSize: 16, fontWeight: 700, color: white, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 13, fontWeight: 400, color: mutedText,
        lineHeight: { value: 170, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 140 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const flowSection = frame('FlowSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(charcoal)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('FLOW', { fontSize: 13, fontWeight: 600, color: lightPurple, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('ご葬儀の流れ', { fontSize: 32, fontWeight: 800, color: white, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('FlowGrid', {
      autoLayout: horizontal({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        flowStep('01', 'ご連絡', 'お電話にて\nご一報ください'),
        flowStep('02', 'お迎え', '専用車にて\nお迎えに伺います'),
        flowStep('03', 'ご安置', '安置室にて\n丁寧にお預かり'),
        flowStep('04', 'お打合せ', 'ご要望を伺い\nプランをご提案'),
        flowStep('05', 'ご葬儀', '心を込めた\nお式を執り行います'),
        flowStep('06', 'アフターサポート', '各種手続きを\nサポートいたします'),
      ],
    }),
  ],
});

// ─── 24h Hotline CTA ───
const hotlineCTA = frame('HotlineCTA', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 220, padY: 64, counterAlign: 'CENTER' }),
  fills: [solid(purple)],
  children: [
    text('24時間365日対応', { fontSize: 14, fontWeight: 600, color: '#ffffffCC', letterSpacing: { value: 4, unit: 'PIXELS' } }),
    text('0120-000-000', { fontSize: 48, fontWeight: 900, color: white, letterSpacing: { value: 4, unit: 'PIXELS' } }),
    text('深夜・早朝でもお気軽にご連絡ください', { fontSize: 15, fontWeight: 400, color: '#ffffffB3' }),
  ],
});

// ─── Consultation Form Area ───
const consultationSection = frame('ConsultationSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 320, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid(paleBg)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('CONTACT', { fontSize: 13, fontWeight: 600, color: purple, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('無料相談・お問い合わせ', { fontSize: 28, fontWeight: 800, color: charcoal, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('FormArea', {
      autoLayout: vertical({ spacing: 20, padX: 40, padY: 40 }),
      fills: [solid(white)],
      layoutSizingHorizontal: 'FILL',
      cornerRadius: 8,
      children: [
        ...[
          ['お名前', '例）山田 太郎'],
          ['お電話番号', '例）090-1234-5678'],
          ['メールアドレス', '例）example@mail.com'],
        ].map(([label, placeholder]) =>
          frame(`Field: ${label}`, {
            autoLayout: vertical({ spacing: 8 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(label, { fontSize: 14, fontWeight: 600, color: charcoal }),
              frame('Input', {
                autoLayout: horizontal({ padX: 16, padY: 14 }),
                fills: [solid('#f9fafb')],
                layoutSizingHorizontal: 'FILL',
                cornerRadius: 4,
                strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
                children: [
                  text(placeholder, { fontSize: 14, fontWeight: 400, color: '#9ca3af' }),
                ],
              }),
            ],
          })
        ),
        frame('SubmitButton', {
          autoLayout: horizontal({ padX: 64, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(purple)],
          cornerRadius: 4,
          children: [
            text('相談する（無料）', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Footer ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 12, padX: 120, padY: 32, counterAlign: 'CENTER' }),
  fills: [solid(darkest)],
  children: [
    text('セレモニーホール 静 SHIZUKA', { fontSize: 18, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('© 2026 セレモニーホール 静 All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseFuneralLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(white)],
  children: [
    navBar,
    heroSection,
    planSection,
    facilitySection,
    flowSection,
    hotlineCTA,
    consultationSection,
    footerSection,
  ],
});
