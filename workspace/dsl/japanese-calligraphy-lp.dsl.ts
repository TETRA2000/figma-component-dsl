import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const inkBlack = '#111111';
const deepBlack = '#0a0a0a';
const paperWhite = '#f5f0e8';
const vermillion = '#cc3333';
const warmGray = '#8a8078';
const mutedGray = '#6b6460';
const lightBeige = '#e8e0d4';
const cardBg = '#1c1a18';

// ─── NavBar ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(deepBlack)],
  strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
  children: [
    frame('BrandGroup', {
      autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('墨香', { fontSize: 26, fontWeight: 900, color: paperWhite }),
        text('BOKKOU', { fontSize: 13, fontWeight: 600, color: vermillion, letterSpacing: { value: 3, unit: 'PIXELS' } }),
      ],
    }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('教室案内', { fontSize: 14, fontWeight: 500, color: warmGray }),
        text('コース', { fontSize: 14, fontWeight: 500, color: warmGray }),
        text('作品集', { fontSize: 14, fontWeight: 500, color: warmGray }),
        text('講師紹介', { fontSize: 14, fontWeight: 500, color: warmGray }),
        text('体験申込', { fontSize: 14, fontWeight: 500, color: warmGray }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(vermillion)],
      children: [
        text('体験予約', { fontSize: 13, fontWeight: 700, color: paperWhite, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 720 },
  autoLayout: vertical({ spacing: 28, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#1a1614', position: 0 }, { hex: inkBlack, position: 0.5 }, { hex: deepBlack, position: 1 }], 160)],
  children: [
    text('書道教室 墨香', {
      fontSize: 13, fontWeight: 600, color: vermillion,
      letterSpacing: { value: 6, unit: 'PIXELS' },
    }),
    text('筆を持ち、心を整える', {
      fontSize: 72, fontWeight: 900, color: paperWhite,
      letterSpacing: { value: 6, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('千年の伝統を受け継ぐ書の道。\n一筆一筆に込める想いが、あなたの心と暮らしを豊かにします。', {
      fontSize: 18, fontWeight: 400, color: '#f5f0e8A0',
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
          fills: [solid(vermillion)],
          children: [
            text('無料体験に申し込む', { fontSize: 16, fontWeight: 700, color: paperWhite, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('HeroBtnSecondary', {
          autoLayout: horizontal({ padX: 40, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex('#f5f0e84D'), weight: 1, align: 'INSIDE' }],
          children: [
            text('教室を見学する', { fontSize: 16, fontWeight: 500, color: paperWhite }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Course Levels Section ───
function courseCard(level: string, title: string, description: string, schedule: string, price: string) {
  return frame(`Course: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 36, padY: 48, counterAlign: 'CENTER' }),
    fills: [solid(cardBg)],
    strokes: [{ color: hex('#f5f0e81A'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(level, { fontSize: 11, fontWeight: 700, color: vermillion, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      text(title, { fontSize: 24, fontWeight: 800, color: paperWhite, textAlignHorizontal: 'CENTER' }),
      rectangle('Divider', { size: { x: 40, y: 2 }, fills: [solid(vermillion)] }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: warmGray,
        lineHeight: { value: 190, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
      rectangle('Spacer', { size: { x: 1, y: 8 }, opacity: 0 }),
      text(schedule, { fontSize: 13, fontWeight: 500, color: mutedGray, textAlignHorizontal: 'CENTER' }),
      text(price, { fontSize: 22, fontWeight: 900, color: paperWhite, textAlignHorizontal: 'CENTER' }),
    ],
  });
}

const coursesSection = frame('CoursesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(inkBlack)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('COURSES', { fontSize: 12, fontWeight: 600, color: vermillion, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('コース案内', { fontSize: 36, fontWeight: 800, color: paperWhite, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('CoursesGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        courseCard('BEGINNER', '入門コース', '筆の持ち方、基本的な筆使いから始めます。ひらがな・カタカナ・簡単な漢字を美しく書けるようになります。書道未経験の方も安心。', '月2回 / 90分', '¥6,600/月'),
        courseCard('INTERMEDIATE', '中級コース', '楷書・行書の基礎を学び、半紙作品の制作に取り組みます。古典臨書を通じて書の奥深さを探求します。', '月3回 / 90分', '¥9,900/月'),
        courseCard('ADVANCED', '上級コース', '草書・篆書を含む多様な書体を習得。展覧会出品を目指し、個性的な表現と創作活動に取り組みます。', '月4回 / 120分', '¥14,300/月'),
      ],
    }),
  ],
});

// ─── Gallery Section ───
function galleryItem(title: string, style: string) {
  return frame(`Gallery: ${title}`, {
    autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('GalleryImage', {
        size: { x: 240, y: 340 },
        fills: [gradient([{ hex: '#2a2420', position: 0 }, { hex: '#1a1614', position: 1 }], 135)],
        cornerRadius: 4,
        layoutSizingHorizontal: 'FILL',
      }),
      text(title, { fontSize: 15, fontWeight: 700, color: paperWhite, textAlignHorizontal: 'CENTER' }),
      text(style, { fontSize: 12, fontWeight: 500, color: mutedGray, textAlignHorizontal: 'CENTER' }),
    ],
  });
}

const gallerySection = frame('GallerySection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(deepBlack)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('GALLERY', { fontSize: 12, fontWeight: 600, color: vermillion, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('作品紹介', { fontSize: 36, fontWeight: 800, color: paperWhite, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('GalleryGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        galleryItem('風', '草書'),
        galleryItem('永字八法', '楷書'),
        galleryItem('花鳥風月', '行書'),
        galleryItem('無心', '篆書'),
      ],
    }),
  ],
});

// ─── Instructor Section ───
const instructorSection = frame('InstructorSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 80, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(inkBlack)],
  children: [
    rectangle('InstructorPhoto', {
      size: { x: 400, y: 480 },
      fills: [gradient([{ hex: '#2a2420', position: 0 }, { hex: cardBg, position: 1 }], 135)],
      cornerRadius: 8,
    }),
    frame('InstructorInfo', {
      autoLayout: vertical({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('INSTRUCTOR', { fontSize: 12, fontWeight: 600, color: vermillion, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('講師紹介', { fontSize: 36, fontWeight: 800, color: paperWhite, letterSpacing: { value: 2, unit: 'PIXELS' } }),
        rectangle('InstrDivider', { size: { x: 60, y: 2 }, fills: [solid(vermillion)] }),
        text('山田 翠雲（やまだ すいうん）', { fontSize: 22, fontWeight: 800, color: paperWhite }),
        text('日展入選5回。毎日書道展審査員。書道歴40年。\n東京藝術大学書道科卒業後、中国留学を経て独自の書風を確立。\n\n「書は人なり」を信条に、技術だけでなく心の在り方を大切にした指導を行っています。初心者から上級者まで、一人ひとりの個性を活かした丁寧な指導が評判です。', {
          fontSize: 15, fontWeight: 400, color: warmGray,
          lineHeight: { value: 200, unit: 'PERCENT' },
          layoutSizingHorizontal: 'FILL',
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),
  ],
});

// ─── Class Info Section ───
const classInfoSection = frame('ClassInfoSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(deepBlack)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('INFORMATION', { fontSize: 12, fontWeight: 600, color: vermillion, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('教室案内', { fontSize: 36, fontWeight: 800, color: paperWhite, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('InfoGrid', {
      autoLayout: horizontal({ spacing: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ScheduleInfo', {
          autoLayout: vertical({ spacing: 16, padX: 40, padY: 40 }),
          fills: [solid(cardBg)],
          strokes: [{ color: hex('#f5f0e81A'), weight: 1, align: 'INSIDE' }],
          layoutSizingHorizontal: 'FILL',
          children: [
            text('開講スケジュール', { fontSize: 20, fontWeight: 800, color: paperWhite }),
            rectangle('ScheduleDivider', { size: { x: 40, y: 2 }, fills: [solid(vermillion)] }),
            text('火曜日 10:00 - 12:00 / 14:00 - 16:00', { fontSize: 14, fontWeight: 400, color: warmGray, lineHeight: { value: 180, unit: 'PERCENT' } }),
            text('木曜日 18:30 - 20:30（夜間クラス）', { fontSize: 14, fontWeight: 400, color: warmGray, lineHeight: { value: 180, unit: 'PERCENT' } }),
            text('土曜日 10:00 - 12:00 / 13:00 - 15:00', { fontSize: 14, fontWeight: 400, color: warmGray, lineHeight: { value: 180, unit: 'PERCENT' } }),
            text('日曜日 10:00 - 12:00（月2回）', { fontSize: 14, fontWeight: 400, color: warmGray, lineHeight: { value: 180, unit: 'PERCENT' } }),
          ],
        }),
        frame('FeeInfo', {
          autoLayout: vertical({ spacing: 16, padX: 40, padY: 40 }),
          fills: [solid(cardBg)],
          strokes: [{ color: hex('#f5f0e81A'), weight: 1, align: 'INSIDE' }],
          layoutSizingHorizontal: 'FILL',
          children: [
            text('料金のご案内', { fontSize: 20, fontWeight: 800, color: paperWhite }),
            rectangle('FeeDivider', { size: { x: 40, y: 2 }, fills: [solid(vermillion)] }),
            text('入会金: ¥5,500（体験当日入会で無料）', { fontSize: 14, fontWeight: 400, color: warmGray, lineHeight: { value: 180, unit: 'PERCENT' } }),
            text('入門コース: ¥6,600/月（月2回）', { fontSize: 14, fontWeight: 400, color: warmGray, lineHeight: { value: 180, unit: 'PERCENT' } }),
            text('中級コース: ¥9,900/月（月3回）', { fontSize: 14, fontWeight: 400, color: warmGray, lineHeight: { value: 180, unit: 'PERCENT' } }),
            text('上級コース: ¥14,300/月（月4回）', { fontSize: 14, fontWeight: 400, color: warmGray, lineHeight: { value: 180, unit: 'PERCENT' } }),
            text('※ 道具一式レンタル無料（筆・墨・硯・紙）', { fontSize: 13, fontWeight: 500, color: mutedGray }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Trial Lesson CTA Section ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 120, padY: 120, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#1a0a0a', position: 0 }, { hex: inkBlack, position: 1 }], 160)],
  children: [
    text('まずは体験教室へ', {
      fontSize: 40, fontWeight: 900, color: paperWhite,
      letterSpacing: { value: 3, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('手ぶらでOK。道具はすべてご用意しています。\n60分の体験で、書道の奥深さと心地よさを感じてください。', {
      fontSize: 16, fontWeight: 400, color: '#f5f0e880',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    rectangle('CtaSpacer', { size: { x: 1, y: 16 }, opacity: 0 }),
    frame('CtaBtn', {
      autoLayout: horizontal({ padX: 72, padY: 20, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(vermillion)],
      children: [
        text('体験教室を予約する', { fontSize: 18, fontWeight: 700, color: paperWhite, letterSpacing: { value: 3, unit: 'PIXELS' } }),
      ],
    }),
    text('※ 体験料 ¥1,100（税込）/ 当日入会で無料', { fontSize: 12, fontWeight: 400, color: mutedGray, textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Footer Section ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid('#080808')],
  strokes: [{ color: hex('#ffffff0F'), weight: 1, align: 'INSIDE' }],
  children: [
    frame('FooterBrand', {
      autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('書道教室 墨香', { fontSize: 20, fontWeight: 900, color: paperWhite, letterSpacing: { value: 2, unit: 'PIXELS' } }),
        text('BOKKOU', { fontSize: 13, fontWeight: 600, color: vermillion, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('教室案内', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('コース', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('作品集', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('講師紹介', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('アクセス', { fontSize: 13, fontWeight: 400, color: mutedGray }),
        text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: mutedGray }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#ffffff0F')],
    }),
    text('© 2026 書道教室 墨香 BOKKOU All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#444444', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseCalligraphyLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(inkBlack)],
  children: [
    navBar,
    heroSection,
    coursesSection,
    gallerySection,
    instructorSection,
    classInfoSection,
    ctaSection,
    footerSection,
  ],
});
