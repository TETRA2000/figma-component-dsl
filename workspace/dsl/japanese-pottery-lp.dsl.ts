import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const terracotta = '#a0522d';
const cream = '#faf5ef';
const darkBrown = '#3d2b1f';
const lightTan = '#c4956a';
const paleTan = '#e8c9a0';

const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  strokes: [{ color: hex('#e8ddd0'), weight: 1, align: 'INSIDE' }],
  children: [
    frame('Brand', {
      autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('陶芸教室 土の詩', { fontSize: 20, fontWeight: 800, color: terracotta }),
        text('TSUCHI NO UTA', { fontSize: 11, fontWeight: 600, color: lightTan }),
      ],
    }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: ['コース紹介', '作品ギャラリー', '講師紹介', '体験レッスン', 'スケジュール'].map(t =>
        text(t, { fontSize: 14, fontWeight: 500, color: '#7a6a5e' })
      ),
    }),
  ],
});

const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 120, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: terracotta, position: 0 }, { hex: '#7a3b1e', position: 0.5 }, { hex: '#4a2212', position: 1 }], 160)],
  children: [
    text('POTTERY CLASS', { fontSize: 13, fontWeight: 600, color: paleTan }),
    text('土と向き合う、\n心のひととき', {
      fontSize: 64, fontWeight: 900, color: '#ffffff',
      lineHeight: { value: 130, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    text('手のひらに伝わる土の温もり。\nゆっくりと形を紡ぐ、贅沢な時間を過ごしませんか。', {
      fontSize: 18, fontWeight: 400, color: '#ffffff99',
      lineHeight: { value: 190, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 480 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroCTA', {
      autoLayout: horizontal({ padX: 56, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(cream)],
      cornerRadius: 4,
      children: [text('体験レッスンを予約する', { fontSize: 16, fontWeight: 700, color: terracotta })],
    }),
  ],
});

function courseCard(level: string, title: string, description: string, features: string[], price: string) {
  return frame(`Course: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 28, padY: 36 }),
    fills: [solid('#ffffff0F')],
    cornerRadius: 8,
    strokes: [{ color: hex('#c4956a33'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(level, { fontSize: 11, fontWeight: 700, color: lightTan }),
      text(title, { fontSize: 22, fontWeight: 800, color: cream }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#faf5ef99',
        lineHeight: { value: 180, unit: 'PERCENT' },
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
      frame('Features', {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: features.map(f => text(`○ ${f}`, { fontSize: 13, fontWeight: 400, color: '#faf5efB3' })),
      }),
      text(price, { fontSize: 20, fontWeight: 800, color: paleTan }),
    ],
  });
}

const coursesSection = frame('CoursesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid('#4a2212')],
  children: [
    text('COURSES', { fontSize: 12, fontWeight: 600, color: lightTan }),
    text('コース紹介', { fontSize: 36, fontWeight: 800, color: cream, textAlignHorizontal: 'CENTER' }),
    text('初心者から経験者まで、あなたに合ったコースをお選びいただけます', {
      fontSize: 15, fontWeight: 400, color: '#faf5ef99', textAlignHorizontal: 'CENTER',
    }),
    frame('CourseGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        courseCard('BEGINNER', 'はじめての陶芸コース', '陶芸が初めての方でも安心。土練りから成形、釉薬掛けまで基礎を丁寧にお教えします。', ['手びねりの基本技法', '釉薬の選び方と掛け方', '全4回（月2回）', '道具・材料費込み'], '月額 ¥8,800'),
        courseCard('INTERMEDIATE', '中級コース', '基礎を習得した方向け。より自由な表現と高度な技法に挑戦していただけます。', ['たたら成形・型起こし', 'オリジナル釉薬の調合', '全8回（月2回）', '自由制作の時間あり'], '月額 ¥12,800'),
        courseCard('WHEEL', 'ろくろコース', '電動ろくろを使った本格的な作陶。器の美しいフォルムを追求します。', ['電動ろくろの操作', '削り・仕上げ技法', '全8回（月2回）', '専用ろくろ完備'], '月額 ¥15,800'),
      ],
    }),
  ],
});

function galleryItem(label: string, desc: string) {
  return frame(`Gallery: ${label}`, {
    autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle(`Img: ${label}`, {
        size: { x: 340, y: 220 },
        fills: [gradient([{ hex: lightTan, position: 0 }, { hex: terracotta, position: 0.5 }, { hex: '#7a3b1e', position: 1 }], 135)],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
      }),
      text(label, { fontSize: 16, fontWeight: 700, color: darkBrown }),
      text(desc, { fontSize: 13, fontWeight: 400, color: '#7a6a5e' }),
    ],
  });
}

const gallerySection = frame('GallerySection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  children: [
    text('GALLERY', { fontSize: 12, fontWeight: 600, color: terracotta }),
    text('生徒作品ギャラリー', { fontSize: 36, fontWeight: 800, color: darkBrown, textAlignHorizontal: 'CENTER' }),
    frame('GalleryRow1', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        galleryItem('飯碗', '初級コース 3ヶ月目'),
        galleryItem('花器', '中級コース 6ヶ月目'),
        galleryItem('急須セット', 'ろくろコース 1年目'),
      ],
    }),
    frame('GalleryRow2', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        galleryItem('大皿', '中級コース 8ヶ月目'),
        galleryItem('ぐい呑み', 'ろくろコース 4ヶ月目'),
        galleryItem('マグカップ', '初級コース 2ヶ月目'),
      ],
    }),
  ],
});

const instructorSection = frame('InstructorSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(terracotta)],
  children: [
    rectangle('InstructorPhoto', {
      size: { x: 360, y: 440 },
      fills: [gradient([{ hex: '#7a3b1e', position: 0 }, { hex: '#4a2212', position: 1 }], 135)],
      cornerRadius: 8,
    }),
    frame('InstructorInfo', {
      autoLayout: vertical({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('INSTRUCTOR', { fontSize: 12, fontWeight: 600, color: paleTan }),
        text('講師紹介', { fontSize: 36, fontWeight: 800, color: '#ffffff' }),
        frame('NameRow', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('山本 美咲', { fontSize: 24, fontWeight: 800, color: '#ffffff' }),
            text('主宰・陶芸家', { fontSize: 14, fontWeight: 500, color: paleTan }),
          ],
        }),
        text('京都市立芸術大学陶磁器専攻卒業後、備前焼の窯元で5年間修行。\n2015年に「土の詩」を開窯。日本工芸会正会員。', {
          fontSize: 15, fontWeight: 400, color: '#ffffffBF',
          lineHeight: { value: 200, unit: 'PERCENT' },
          size: { x: 500 },
          textAutoResize: 'HEIGHT',
        }),
        text('「土と対話しながら、自分だけの器を生み出す喜びを\n一人でも多くの方に感じていただきたい」', {
          fontSize: 15, fontWeight: 400, color: '#ffffffBF',
          lineHeight: { value: 200, unit: 'PERCENT' },
          size: { x: 500 },
          textAutoResize: 'HEIGHT',
        }),
        frame('Awards', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('日本陶芸展 入選 (2018)', { fontSize: 13, fontWeight: 500, color: paleTan }),
            text('信楽陶芸祭 奨励賞 (2020)', { fontSize: 13, fontWeight: 500, color: paleTan }),
            text('全国陶磁器フェア 金賞 (2023)', { fontSize: 13, fontWeight: 500, color: paleTan }),
          ],
        }),
      ],
    }),
  ],
});

const trialSection = frame('TrialSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 270, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  children: [
    text('TRIAL LESSON', { fontSize: 12, fontWeight: 600, color: terracotta }),
    text('体験レッスン', { fontSize: 36, fontWeight: 800, color: darkBrown, textAlignHorizontal: 'CENTER' }),
    text('まずは気軽に陶芸を体験してみませんか？\nお一人様から参加いただけます。', {
      fontSize: 15, fontWeight: 400, color: '#7a6a5e',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 400 },
      textAutoResize: 'HEIGHT',
    }),
    frame('TrialCards', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Trial1', {
          autoLayout: vertical({ spacing: 16, padX: 28, padY: 36 }),
          fills: [solid('#ffffff')],
          cornerRadius: 8,
          strokes: [{ color: hex('#e8ddd0'), weight: 1, align: 'INSIDE' }],
          layoutSizingHorizontal: 'FILL',
          children: [
            text('手びねり体験', { fontSize: 20, fontWeight: 800, color: terracotta }),
            text('粘土をこねて自由に形を作ります。お子様連れも歓迎。', {
              fontSize: 14, fontWeight: 400, color: '#7a6a5e',
              lineHeight: { value: 180, unit: 'PERCENT' },
              size: { x: 320 },
              textAutoResize: 'HEIGHT',
            }),
            frame('Meta1', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: hex('#e8ddd0'), weight: 1, align: 'INSIDE' }],
              children: [
                text('所要時間: 約90分', { fontSize: 14, fontWeight: 600, color: darkBrown }),
                text('¥3,500（材料費込み）', { fontSize: 14, fontWeight: 600, color: darkBrown }),
              ],
            }),
          ],
        }),
        frame('Trial2', {
          autoLayout: vertical({ spacing: 16, padX: 28, padY: 36 }),
          fills: [solid('#ffffff')],
          cornerRadius: 8,
          strokes: [{ color: hex('#e8ddd0'), weight: 1, align: 'INSIDE' }],
          layoutSizingHorizontal: 'FILL',
          children: [
            text('ろくろ体験', { fontSize: 20, fontWeight: 800, color: terracotta }),
            text('電動ろくろで茶碗やカップを制作。講師がマンツーマンで指導。', {
              fontSize: 14, fontWeight: 400, color: '#7a6a5e',
              lineHeight: { value: 180, unit: 'PERCENT' },
              size: { x: 320 },
              textAutoResize: 'HEIGHT',
            }),
            frame('Meta2', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: hex('#e8ddd0'), weight: 1, align: 'INSIDE' }],
              children: [
                text('所要時間: 約120分', { fontSize: 14, fontWeight: 600, color: darkBrown }),
                text('¥5,500（材料費込み）', { fontSize: 14, fontWeight: 600, color: darkBrown }),
              ],
            }),
          ],
        }),
      ],
    }),
    frame('TrialCTA', {
      autoLayout: horizontal({ padX: 64, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(terracotta)],
      cornerRadius: 4,
      children: [text('体験レッスンに申し込む', { fontSize: 16, fontWeight: 700, color: '#ffffff' })],
    }),
  ],
});

const scheduleSection = frame('ScheduleSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 270, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(darkBrown)],
  children: [
    text('SCHEDULE', { fontSize: 12, fontWeight: 600, color: lightTan }),
    text('教室スケジュール', { fontSize: 36, fontWeight: 800, color: cream, textAlignHorizontal: 'CENTER' }),
    frame('DayHeaders', {
      autoLayout: horizontal({ spacing: 8 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Spacer', { size: { x: 160, y: 20 }, children: [] }),
        ...['月', '火', '水', '木', '金', '土', '日'].map(d =>
          text(d, { fontSize: 14, fontWeight: 700, color: d === '日' ? '#e87a5e' : lightTan, textAlignHorizontal: 'CENTER', layoutSizingHorizontal: 'FILL' })
        ),
      ],
    }),
    frame('MorningRow', {
      autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('午前 10:00-12:30', { fontSize: 13, fontWeight: 600, color: paleTan, size: { x: 160 } }),
        ...['初級', '休', '中級', 'ろくろ', '初級', '体験', '休'].map(s =>
          frame(`Slot: ${s}`, {
            autoLayout: horizontal({ padX: 4, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(s === '休' ? '#00000000' : '#a0522d80')],
            cornerRadius: 4,
            layoutSizingHorizontal: 'FILL',
            children: [text(s, { fontSize: 13, fontWeight: 600, color: s === '休' ? '#7a6a5e' : cream, textAlignHorizontal: 'CENTER' })],
          })
        ),
      ],
    }),
    frame('AfternoonRow', {
      autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('午後 14:00-16:30', { fontSize: 13, fontWeight: 600, color: paleTan, size: { x: 160 } }),
        ...['中級', '休', 'ろくろ', '初級', '中級', 'ろくろ', '休'].map(s =>
          frame(`Slot: ${s}`, {
            autoLayout: horizontal({ padX: 4, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(s === '休' ? '#00000000' : '#a0522d80')],
            cornerRadius: 4,
            layoutSizingHorizontal: 'FILL',
            children: [text(s, { fontSize: 13, fontWeight: 600, color: s === '休' ? '#7a6a5e' : cream, textAlignHorizontal: 'CENTER' })],
          })
        ),
      ],
    }),
    frame('EveningRow', {
      autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('夜間 18:30-21:00', { fontSize: 13, fontWeight: 600, color: paleTan, size: { x: 160 } }),
        ...['初級', '休', '初級', '中級', 'ろくろ', '-', '休'].map(s =>
          frame(`Slot: ${s}`, {
            autoLayout: horizontal({ padX: 4, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(s === '休' || s === '-' ? '#00000000' : '#a0522d80')],
            cornerRadius: 4,
            layoutSizingHorizontal: 'FILL',
            children: [text(s, { fontSize: 13, fontWeight: 600, color: s === '休' || s === '-' ? '#7a6a5e' : cream, textAlignHorizontal: 'CENTER' })],
          })
        ),
      ],
    }),
  ],
});

const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 20, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid('#2a1a10')],
  children: [
    text('陶芸教室 土の詩', { fontSize: 20, fontWeight: 800, color: lightTan }),
    frame('FooterInfo', {
      autoLayout: horizontal({ spacing: 32 }),
      children: [
        text('〒606-8406 京都市左京区浄土寺下南田町3-15', { fontSize: 13, fontWeight: 400, color: '#7a6a5e' }),
        text('TEL: 075-123-4567', { fontSize: 13, fontWeight: 400, color: '#7a6a5e' }),
        text('営業: 10:00-21:00（火・日定休）', { fontSize: 13, fontWeight: 400, color: '#7a6a5e' }),
      ],
    }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 28 }),
      children: ['コース紹介', '作品ギャラリー', '講師紹介', '体験レッスン', 'プライバシーポリシー'].map(t =>
        text(t, { fontSize: 13, fontWeight: 400, color: '#7a6a5e' })
      ),
    }),
    rectangle('Divider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#c4956a26')],
      layoutSizingHorizontal: 'FILL',
    }),
    text('\u00a9 2026 陶芸教室 土の詩 TSUCHI NO UTA All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#5a4a3e' }),
  ],
});

export default frame('JapanesePotteryLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [navBar, heroSection, coursesSection, gallerySection, instructorSection, trialSection, scheduleSection, footerSection],
});
