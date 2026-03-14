import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const navy = '#0f172a';
const navyDark = '#020617';
const navyMid = '#1e293b';
const navyLight = '#334155';
const gold = '#c4a35a';
const textLight = '#e2e8f0';
const textMuted = '#94a3b8';
const textDim = '#64748b';
const white = '#ffffff';

// ─── Navigation ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(navy)],
  strokes: [{ color: hex('#c4a35a26'), weight: 1, align: 'INSIDE' }],
  children: [
    text('鮨 匠', { fontSize: 28, fontWeight: 900, color: gold, letterSpacing: { value: 6, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('おまかせ', { fontSize: 14, fontWeight: 500, color: textMuted, letterSpacing: { value: 1, unit: 'PIXELS' } }),
        text('職人紹介', { fontSize: 14, fontWeight: 500, color: textMuted, letterSpacing: { value: 1, unit: 'PIXELS' } }),
        text('旬の逸品', { fontSize: 14, fontWeight: 500, color: textMuted, letterSpacing: { value: 1, unit: 'PIXELS' } }),
        text('ご予約', { fontSize: 14, fontWeight: 500, color: textMuted, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 650 },
  autoLayout: vertical({ spacing: 24, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: navy, position: 0 }, { hex: navyDark, position: 1 }], 135)],
  children: [
    text('SUSHI TAKUMI', { fontSize: 13, fontWeight: 500, color: gold, letterSpacing: { value: 6, unit: 'PIXELS' } }),
    text('至高の一貫', {
      fontSize: 72, fontWeight: 900, color: white,
      letterSpacing: { value: 8, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    rectangle('HeroDivider', { size: { x: 60, y: 1 }, fills: [solid(gold)] }),
    text('江戸前の伝統を守りながら\n最高峰の素材で握る珠玉の鮨', {
      fontSize: 16, fontWeight: 400, color: '#ffffff99',
      lineHeight: { value: 200, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      letterSpacing: { value: 1, unit: 'PIXELS' },
      size: { x: 400 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroCTA', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
      strokes: [{ color: hex(gold), weight: 1, align: 'INSIDE' }],
      children: [
        text('ご予約はこちら', { fontSize: 14, fontWeight: 600, color: gold, letterSpacing: { value: 3, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Omakase Section ───
function courseCard(name: string, pieces: string, price: string, description: string) {
  return frame(`Course: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    cornerRadius: 4,
    clipContent: true,
    layoutSizingHorizontal: 'FILL',
    fills: [solid(navyMid)],
    strokes: [{ color: hex('#c4a35a1F'), weight: 1, align: 'INSIDE' }],
    children: [
      frame('CourseImgArea', {
        size: { x: undefined, y: 180 },
        fills: [gradient([{ hex: navyMid, position: 0 }, { hex: navy, position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
        children: [],
      }),
      frame('CourseInfo', {
        autoLayout: vertical({ spacing: 8, padX: 28, padY: 28 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 22, fontWeight: 800, color: gold, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          text(pieces, { fontSize: 13, fontWeight: 400, color: textMuted }),
          text(description, {
            fontSize: 14, fontWeight: 400, color: textMuted,
            lineHeight: { value: 180, unit: 'PERCENT' },
            size: { x: 280 },
            textAutoResize: 'HEIGHT',
          }),
          text(price, { fontSize: 24, fontWeight: 900, color: gold }),
        ],
      }),
    ],
  });
}

const omakaseSection = frame('OmakaseSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(navy)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('OMAKASE', { fontSize: 12, fontWeight: 500, color: gold, letterSpacing: { value: 5, unit: 'PIXELS' } }),
        text('おまかせコース', { fontSize: 30, fontWeight: 800, color: textLight, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('CourseGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        courseCard('匠コース', '握り12貫 + 一品料理', '¥22,000', '旬の素材を贅沢に使った当店最高峰のおまかせコース。前菜から甘味まで職人が心を込めてお仕立てします。'),
        courseCard('雅コース', '握り10貫 + 一品料理', '¥16,500', '厳選された旬のネタを中心に、バランスよくお楽しみいただけるコース。初めての方にもおすすめです。'),
        courseCard('華コース', '握り8貫 + お椀', '¥11,000', 'お気軽に江戸前鮨をお楽しみいただけるコース。ランチタイムにも人気の内容です。'),
      ],
    }),
  ],
});

// ─── Chef Section ───
const chefSection = frame('ChefSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(navyMid)],
  children: [
    frame('ChefImgArea', {
      size: { x: 360, y: 440 },
      fills: [gradient([{ hex: navyLight, position: 0 }, { hex: navyMid, position: 1 }], 135)],
      cornerRadius: 4,
      children: [],
    }),
    frame('ChefInfo', {
      autoLayout: vertical({ spacing: 12 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('CHEF', { fontSize: 12, fontWeight: 500, color: gold, letterSpacing: { value: 5, unit: 'PIXELS' } }),
        text('職人紹介', { fontSize: 30, fontWeight: 800, color: textLight, letterSpacing: { value: 3, unit: 'PIXELS' } }),
        rectangle('ChefDivider', { size: { x: 40, y: 1 }, fills: [solid(gold)] }),
        text('山本 匠一', { fontSize: 24, fontWeight: 700, color: white }),
        text('大将 / 鮨職人歴35年', { fontSize: 14, fontWeight: 400, color: gold, letterSpacing: { value: 1, unit: 'PIXELS' } }),
        text('銀座の名店で20年の修行を積み、独立。伝統の江戸前技法を極めながらも、新しい表現を追求し続ける。素材との対話を大切にし、一貫一貫に想いを込めて握ります。', {
          fontSize: 15, fontWeight: 400, color: textMuted,
          lineHeight: { value: 200, unit: 'PERCENT' },
          size: { x: 420 },
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),
  ],
});

// ─── Seasonal Section ───
function seasonalItem(name: string, description: string) {
  return frame(`Seasonal: ${name}`, {
    autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('SeasonalImgArea', {
        size: { x: undefined, y: 200 },
        fills: [gradient([{ hex: navyMid, position: 0 }, { hex: navy, position: 1 }], 135)],
        cornerRadius: 4,
        layoutSizingHorizontal: 'FILL',
        strokes: [{ color: hex('#c4a35a1A'), weight: 1, align: 'INSIDE' }],
        children: [],
      }),
      text(name, { fontSize: 20, fontWeight: 700, color: gold, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
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

const seasonalSection = frame('SeasonalSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(navy)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('SEASONAL', { fontSize: 12, fontWeight: 500, color: gold, letterSpacing: { value: 5, unit: 'PIXELS' } }),
        text('旬の逸品', { fontSize: 30, fontWeight: 800, color: textLight, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('SeasonalGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        seasonalItem('寒鰤', '冬の日本海が育んだ脂の乗った極上の鰤'),
        seasonalItem('白魚', '春を告げる繊細な味わいの白魚の軍艦'),
        seasonalItem('雲丹', '北海道産の濃厚な甘みが広がる極上雲丹'),
        seasonalItem('大トロ', '本鮪の最上部位を丁寧に仕込んだ逸品'),
      ],
    }),
  ],
});

// ─── Reservation Section ───
const reservationSection = frame('ReservationSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 12, padX: 420, padY: 96, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: navyMid, position: 0 }, { hex: navy, position: 1 }], 135)],
  children: [
    text('RESERVATION', { fontSize: 12, fontWeight: 500, color: gold, letterSpacing: { value: 5, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('ご予約', { fontSize: 30, fontWeight: 800, color: textLight, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    rectangle('ReservationDivider', { size: { x: 40, y: 1 }, fills: [solid(gold)] }),
    text('完全予約制でお一人おひとりに\n最高のおもてなしをお届けいたします', {
      fontSize: 16, fontWeight: 400, color: textMuted,
      lineHeight: { value: 200, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    text('03-5678-1234', { fontSize: 32, fontWeight: 900, color: gold, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('受付時間: 10:00〜20:00（不定休）', { fontSize: 13, fontWeight: 400, color: textDim, textAlignHorizontal: 'CENTER' }),
    frame('ReservationBtn', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(gold)],
      children: [
        text('オンライン予約', { fontSize: 14, fontWeight: 700, color: navy, letterSpacing: { value: 3, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Footer ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 8, padX: 120, padY: 40, counterAlign: 'CENTER' }),
  fills: [solid(navyDark)],
  strokes: [{ color: hex('#c4a35a1A'), weight: 1, align: 'INSIDE' }],
  children: [
    text('鮨 匠 / SUSHI TAKUMI', { fontSize: 18, fontWeight: 900, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('東京都中央区銀座6-7-8 銀座匠ビル2F', { fontSize: 13, fontWeight: 400, color: textDim, textAlignHorizontal: 'CENTER' }),
    text('© 2026 鮨 匠 All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#475569', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseSushiLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(navy)],
  children: [
    navBar,
    heroSection,
    omakaseSection,
    chefSection,
    seasonalSection,
    reservationSection,
    footerSection,
  ],
});
