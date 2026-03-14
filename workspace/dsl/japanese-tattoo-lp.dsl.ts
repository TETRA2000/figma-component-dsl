import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const black = '#0a0a0a';
const gold = '#d4af37';
const darkGray = '#141414';
const midGray = '#1c1c1c';
const lightGray = '#999999';

// ─── Navigation ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 64 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(black)],
  children: [
    text('彫師 龍 HORISHI RYU', { fontSize: 22, fontWeight: 900, color: gold, letterSpacing: { value: 3, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('スタイル', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
        text('アーティスト', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
        text('よくある質問', { fontSize: 14, fontWeight: 500, color: '#cccccc' }),
        text('ご予約', { fontSize: 14, fontWeight: 500, color: gold }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 640 },
  autoLayout: vertical({ spacing: 24, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: black, position: 0 }, { hex: '#1a1a0a', position: 0.5 }, { hex: black, position: 1 }], 180)],
  children: [
    frame('HeroLabel', {
      autoLayout: horizontal({ padX: 24, padY: 8 }),
      strokes: [{ color: hex('#d4af374D'), weight: 1, align: 'INSIDE' }],
      children: [
        text('TATTOO STUDIO', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 6, unit: 'PIXELS' } }),
      ],
    }),
    text('一生ものの、\nアートを肌に', {
      fontSize: 56, fontWeight: 900, color: '#ffffff',
      lineHeight: { value: 130, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    text('伝統と現代が融合した唯一無二のタトゥーを\nあなたの肌にお届けします', {
      fontSize: 16, fontWeight: 400, color: '#ffffffB3',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroCTA', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(gold)],
      children: [
        text('無料カウンセリング予約', { fontSize: 16, fontWeight: 700, color: black, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Style Gallery Section ───
function styleCard(title: string, titleEn: string, description: string) {
  return frame(`Style: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 4,
    clipContent: true,
    children: [
      frame('StyleImage', {
        size: { x: undefined, y: 240 },
        autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [gradient([{ hex: '#2a2a1a', position: 0 }, { hex: darkGray, position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
        children: [
          text(titleEn, { fontSize: 18, fontWeight: 700, color: '#333333', letterSpacing: { value: 4, unit: 'PIXELS' } }),
        ],
      }),
      frame('StyleInfo', {
        autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
        fills: [solid(midGray)],
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 18, fontWeight: 700, color: '#ffffff' }),
          rectangle('Divider', { size: { x: 30, y: 2 }, fills: [solid(gold)] }),
          text(description, {
            fontSize: 13, fontWeight: 400, color: lightGray,
            lineHeight: { value: 170, unit: 'PERCENT' },
            size: { x: 220 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
    ],
  });
}

const styleSection = frame('StyleSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(black)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('STYLE', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('スタイルギャラリー', { fontSize: 32, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('StyleGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        styleCard('和彫り', 'JAPANESE', '龍、鯉、般若など日本の伝統的なモチーフを現代の技術で表現。色彩豊かな大作から小さなワンポイントまで。'),
        styleCard('トライバル', 'TRIBAL', '力強い黒のラインで描くプリミティブな美。ポリネシアン、マオリなど各地域のスタイルに対応。'),
        styleCard('ポートレート', 'PORTRAIT', '写真のようなリアリスティックな表現。大切な人やペットの姿を肌に永遠に刻みます。'),
        styleCard('レタリング', 'LETTERING', '文字やフォントを使ったデザイン。漢字、英字、梵字など多彩な書体でお名前や座右の銘を。'),
      ],
    }),
  ],
});

// ─── Artist Profiles Section ───
function artistCard(name: string, nameEn: string, specialty: string, experience: string, description: string) {
  return frame(`Artist: ${name}`, {
    autoLayout: horizontal({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 4,
    clipContent: true,
    fills: [solid(midGray)],
    children: [
      frame('ArtistPhoto', {
        size: { x: 280, y: 320 },
        autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [gradient([{ hex: '#2a2a1a', position: 0 }, { hex: '#1a1a0a', position: 1 }], 135)],
        children: [
          text('PHOTO', { fontSize: 18, fontWeight: 700, color: '#333333', letterSpacing: { value: 4, unit: 'PIXELS' } }),
        ],
      }),
      frame('ArtistInfo', {
        autoLayout: vertical({ spacing: 16, padX: 40, padY: 40 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(nameEn, { fontSize: 12, fontWeight: 600, color: gold, letterSpacing: { value: 3, unit: 'PIXELS' } }),
          text(name, { fontSize: 28, fontWeight: 800, color: '#ffffff' }),
          rectangle('Divider', { size: { x: 40, y: 2 }, fills: [solid(gold)] }),
          frame('ArtistMeta', {
            autoLayout: horizontal({ spacing: 24 }),
            children: [
              text(`専門: ${specialty}`, { fontSize: 13, fontWeight: 500, color: gold }),
              text(`経験: ${experience}`, { fontSize: 13, fontWeight: 500, color: lightGray }),
            ],
          }),
          text(description, {
            fontSize: 14, fontWeight: 400, color: lightGray,
            lineHeight: { value: 180, unit: 'PERCENT' },
            size: { x: 400 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
    ],
  });
}

const artistSection = frame('ArtistSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(darkGray)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('ARTIST', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('アーティスト紹介', { fontSize: 32, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('ArtistList', {
      autoLayout: vertical({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        artistCard('龍一', 'RYUICHI', '和彫り / トライバル', '20年', '日本の伝統的な和彫りを軸に、トライバルとの融合スタイルを得意とする。国内外のコンベンションで多数の受賞歴を持つ。繊細なグラデーションと大胆な構図が持ち味。'),
        artistCard('美咲', 'MISAKI', 'ポートレート / レタリング', '12年', 'リアリスティックなポートレートと美しいレタリングを専門とする。細密描写に定評があり、写真と見紛うほどの作品を生み出す。女性ならではの繊細なタッチも人気。'),
      ],
    }),
  ],
});

// ─── FAQ Section ───
function faqItem(question: string, answer: string) {
  return frame(`FAQ: ${question}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(midGray)],
    cornerRadius: 4,
    children: [
      text(`Q. ${question}`, { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
      rectangle('Divider', { size: { x: undefined, y: 1 }, fills: [solid('#2a2a2a')], layoutSizingHorizontal: 'FILL' }),
      text(`A. ${answer}`, {
        fontSize: 14, fontWeight: 400, color: lightGray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        layoutSizingHorizontal: 'FILL',
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const faqSection = frame('FAQSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(black)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('FAQ', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('よくある質問', { fontSize: 32, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('FAQList', {
      autoLayout: vertical({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        faqItem('痛みはどのくらいですか？', '個人差がありますが、部位によって痛みの強さは異なります。初回カウンセリングで詳しくご説明いたします。痛みに不安のある方もお気軽にご相談ください。'),
        faqItem('完成までどのくらい時間がかかりますか？', 'デザインの大きさや複雑さによって異なります。ワンポイントで1〜2時間、大きな作品は複数回のセッションに分けて行います。'),
        faqItem('料金はどのくらいですか？', 'ワンポイント ¥15,000〜、時間制 ¥15,000/h〜となります。デザインの内容により変動しますので、まずは無料カウンセリングにてお見積りいたします。'),
        faqItem('未成年でも施術を受けられますか？', '18歳未満の方への施術はお断りしております。18歳以上20歳未満の方は保護者の同意書が必要です。'),
      ],
    }),
  ],
});

// ─── Consultation CTA Section ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: 360 },
  autoLayout: vertical({ spacing: 24, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#1a1a0a', position: 0 }, { hex: black, position: 1 }], 180)],
  children: [
    text('CONSULTATION', { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 6, unit: 'PIXELS' } }),
    text('無料カウンセリング受付中', { fontSize: 36, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('デザインのご相談から施術の流れまで\n丁寧にご説明いたします', {
      fontSize: 16, fontWeight: 400, color: '#ffffffB3',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('CTAButton', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(gold)],
      children: [
        text('今すぐ予約する', { fontSize: 16, fontWeight: 700, color: black, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Footer ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 12, padX: 120, padY: 32, counterAlign: 'CENTER' }),
  fills: [solid('#050505')],
  children: [
    text('彫師 龍 HORISHI RYU', { fontSize: 18, fontWeight: 900, color: gold, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('© 2026 HORISHI RYU All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseTattooLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(black)],
  children: [
    navBar,
    heroSection,
    styleSection,
    artistSection,
    faqSection,
    ctaSection,
    footerSection,
  ],
});
