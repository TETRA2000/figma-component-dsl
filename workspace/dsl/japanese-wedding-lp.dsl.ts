import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

// Color palette - Japanese wedding champagne gold theme
const gold = '#c4a35a';
const goldLight = '#d4b86a';
const ivory = '#fffff0';
const blush = '#f5e6e0';
const dark = '#2a2a2a';
const textGray = '#666666';
const textMuted = '#888888';
const borderColor = '#e8dcc8';
const warmBg = '#faf6f0';

// ─── Navigation ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 76 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(ivory)],
  strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
  children: [
    text('FELICITA WEDDING', { fontSize: 18, fontWeight: 700, color: gold, letterSpacing: { value: 3, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
      children: [
        text('会場紹介', { fontSize: 13, fontWeight: 400, color: '#555555' }),
        text('プラン・料金', { fontSize: 13, fontWeight: 400, color: '#555555' }),
        text('フォトギャラリー', { fontSize: 13, fontWeight: 400, color: '#555555' }),
        text('お客様の声', { fontSize: 13, fontWeight: 400, color: '#555555' }),
        text('ブライダルフェア', { fontSize: 13, fontWeight: 400, color: '#555555' }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(gold)],
      cornerRadius: 2,
      children: [
        text('フェア予約', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 600 },
  autoLayout: vertical({ spacing: 28, padX: 120, padY: 80, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: blush, position: 0 }, { hex: ivory, position: 0.4 }, { hex: blush, position: 1 }], 135)],
  children: [
    text('— おふたりの特別な一日を —', {
      fontSize: 14, fontWeight: 400, color: gold,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('最高の一日を、\nふたりで。', {
      fontSize: 52, fontWeight: 700, color: dark,
      lineHeight: { value: 150, unit: 'PERCENT' },
      letterSpacing: { value: 2, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
      size: { x: 700 },
      textAutoResize: 'HEIGHT',
    }),
    text('洗練された空間と心を込めたおもてなしで、\nおふたりだけの物語を紡ぎます。', {
      fontSize: 15, fontWeight: 400, color: textGray,
      lineHeight: { value: 200, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroActions', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('PrimaryBtn', {
          autoLayout: horizontal({ padX: 36, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(gold)],
          cornerRadius: 2,
          children: [
            text('ブライダルフェア予約', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
        frame('SecondaryBtn', {
          autoLayout: horizontal({ padX: 36, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 2,
          strokes: [{ color: hex(gold), weight: 1, align: 'INSIDE' }],
          children: [
            text('資料請求', { fontSize: 14, fontWeight: 600, color: gold }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Venue Section ───
function venueCard(name: string, capacity: string, description: string) {
  return frame(`Venue: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    clipContent: true,
    layoutSizingHorizontal: 'FILL',
    children: [
      // Image placeholder
      frame('VenueImg', {
        size: { x: undefined, y: 240 },
        fills: [gradient([{ hex: blush, position: 0 }, { hex: borderColor, position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame('VenueInfo', {
        autoLayout: vertical({ spacing: 12, padX: 24, padY: 28 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 18, fontWeight: 700, color: dark }),
          frame('CapacityBadge', {
            autoLayout: horizontal({ padX: 10, padY: 2 }),
            strokes: [{ color: hex(gold), weight: 1, align: 'INSIDE' }],
            children: [
              text(capacity, { fontSize: 12, fontWeight: 400, color: gold }),
            ],
          }),
          text(description, {
            fontSize: 13, fontWeight: 400, color: textGray,
            lineHeight: { value: 190, unit: 'PERCENT' },
            size: { x: 320 },
            textAutoResize: 'HEIGHT',
          }),
          text('詳しく見る →', { fontSize: 13, fontWeight: 500, color: gold }),
        ],
      }),
    ],
  });
}

const venueSection = frame('VenueSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(ivory)],
  children: [
    text('VENUE', {
      fontSize: 12, fontWeight: 400, color: gold,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('会場紹介', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER', letterSpacing: { value: 2, unit: 'PIXELS' } }),
    text('おふたりの理想を叶える、3つの個性豊かな会場をご用意', { fontSize: 14, fontWeight: 400, color: textMuted, textAlignHorizontal: 'CENTER' }),
    frame('VenueGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        venueCard('チャペル・ド・ルミエール', '着席 80名', '天井高10mの荘厳なチャペル。自然光が降り注ぐステンドグラスが、神聖な挙式を演出します。'),
        venueCard('ザ・ガーデンテラス', '着席 120名', '四季折々の庭園に囲まれたテラス会場。開放的な空間で、ゲストと一体になるパーティーを。'),
        venueCard('グランドバンケット 雅', '着席 200名', '格式高いバンケットホール。シャンデリアが煌めく上質な空間で、華やかな披露宴を。'),
      ],
    }),
  ],
});

// ─── Plan Section ───
function planCard(tier: string, price: string, features: string[], recommended?: boolean) {
  const children = [];

  if (recommended) {
    children.push(
      frame('PlanBadge', {
        autoLayout: horizontal({ padX: 20, padY: 4 }),
        fills: [solid(gold)],
        children: [
          text('おすすめ', { fontSize: 12, fontWeight: 600, color: '#ffffff' }),
        ],
      })
    );
  }

  children.push(
    text(tier, { fontSize: 18, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER', letterSpacing: { value: 1, unit: 'PIXELS' } }),
    text(price + '〜（税込）', { fontSize: 24, fontWeight: 700, color: gold, textAlignHorizontal: 'CENTER' }),
    rectangle('PlanDivider', { size: { x: 40, y: 1 }, fills: [solid(borderColor)] }),
    ...features.map(f => text('✓ ' + f, {
      fontSize: 13, fontWeight: 400, color: '#555555',
      lineHeight: { value: 220, unit: 'PERCENT' },
    })),
    frame('PlanButton', {
      autoLayout: horizontal({ padX: 28, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
      cornerRadius: 2,
      strokes: recommended ? [] : [{ color: hex(gold), weight: 1, align: 'INSIDE' }],
      fills: recommended ? [solid(gold)] : [],
      children: [
        text('詳細を見る', { fontSize: 13, fontWeight: 600, color: recommended ? '#ffffff' : gold }),
      ],
    })
  );

  return frame(`Plan: ${tier}`, {
    autoLayout: vertical({ spacing: 16, padX: 28, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    strokes: [{ color: hex(recommended ? gold : borderColor), weight: recommended ? 2 : 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children,
  });
}

const planSection = frame('PlanSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(warmBg)],
  children: [
    text('PLAN', {
      fontSize: 12, fontWeight: 400, color: gold,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('プラン・料金', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER', letterSpacing: { value: 2, unit: 'PIXELS' } }),
    text('おふたりのご予算やご要望に合わせてお選びいただけます', { fontSize: 14, fontWeight: 400, color: textMuted, textAlignHorizontal: 'CENTER' }),
    frame('PlanGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        planCard('シンプルプラン', '¥1,980,000', [
          '挙式（チャペル or 人前式）',
          '衣装（新郎新婦各1着）',
          'ヘアメイク・着付け',
          'フラワーアレンジメント',
          '写真撮影（データ100カット）',
        ]),
        planCard('プレミアムプラン', '¥2,980,000', [
          'シンプルプランの全内容',
          '披露宴（60名分お料理）',
          '衣装（お色直し1回含む）',
          '映像演出・エンドロール',
          '写真撮影（データ300カット）',
          '前撮りロケーションフォト',
        ], true),
        planCard('ラグジュアリープラン', '¥4,500,000', [
          'プレミアムプランの全内容',
          '披露宴（100名分お料理）',
          '衣装（新婦3着・新郎2着）',
          'フルムービー撮影・編集',
          '海外リゾート前撮り',
          '専属プランナー',
        ]),
      ],
    }),
  ],
});

// ─── Gallery Section ───
function galleryItem(label: string) {
  return frame(`Gallery: ${label}`, {
    size: { x: 280, y: 280 },
    autoLayout: vertical({ spacing: 0, padX: 12, padY: 12, align: 'MAX' }),
    fills: [gradient([{ hex: '#4a4040', position: 0 }, { hex: '#3a3030', position: 0.5 }, { hex: '#4a4040', position: 1 }], 135)],
    clipContent: true,
    children: [
      text(label, { fontSize: 12, fontWeight: 400, color: ivory }),
    ],
  });
}

const gallerySection = frame('GallerySection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(dark)],
  children: [
    text('GALLERY', {
      fontSize: 12, fontWeight: 400, color: gold,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('フォトギャラリー', { fontSize: 32, fontWeight: 700, color: ivory, textAlignHorizontal: 'CENTER', letterSpacing: { value: 2, unit: 'PIXELS' } }),
    text('これまでのウェディングの一場面をご紹介', { fontSize: 14, fontWeight: 400, color: '#ffffffB3', textAlignHorizontal: 'CENTER' }),
    frame('GalleryRow1', {
      autoLayout: horizontal({ spacing: 12 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        galleryItem('チャペル挙式'),
        galleryItem('ガーデン人前式'),
        galleryItem('ブーケトス'),
        galleryItem('披露宴'),
      ],
    }),
    frame('GalleryRow2', {
      autoLayout: horizontal({ spacing: 12 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        galleryItem('ファーストバイト'),
        galleryItem('テーブル装花'),
        galleryItem('ウェディングケーキ'),
        galleryItem('お色直し入場'),
      ],
    }),
  ],
});

// ─── Testimonials Section ───
function testimonialCard(couple: string, date: string, testimonialText: string) {
  return frame(`Voice: ${couple}`, {
    autoLayout: vertical({ spacing: 16, padX: 28, padY: 36 }),
    fills: [solid('#ffffff')],
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text('\u201C', { fontSize: 48, fontWeight: 400, color: gold, lineHeight: { value: 60, unit: 'PERCENT' } }),
      text(testimonialText, {
        fontSize: 14, fontWeight: 400, color: '#555555',
        lineHeight: { value: 200, unit: 'PERCENT' },
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
      frame('VoiceMeta', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          ellipse('Avatar', {
            size: { x: 40, y: 40 },
            fills: [gradient([{ hex: gold, position: 0 }, { hex: goldLight, position: 1 }], 135)],
          }),
          frame('VoiceInfo', {
            autoLayout: vertical({ spacing: 4 }),
            children: [
              text(couple, { fontSize: 13, fontWeight: 600, color: dark }),
              text(date, { fontSize: 12, fontWeight: 400, color: '#aaaaaa' }),
            ],
          }),
        ],
      }),
    ],
  });
}

const testimonialSection = frame('TestimonialSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(ivory)],
  children: [
    text('VOICE', {
      fontSize: 12, fontWeight: 400, color: gold,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('お客様の声', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER', letterSpacing: { value: 2, unit: 'PIXELS' } }),
    text('実際に挙式されたおふたりからのメッセージ', { fontSize: 14, fontWeight: 400, color: textMuted, textAlignHorizontal: 'CENTER' }),
    frame('TestimonialGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        testimonialCard('田中 健一・美咲 ご夫妻', '2025年10月挙式', 'プランナーさんが私たちの想いを丁寧に汲み取ってくださり、理想以上の結婚式になりました。ゲストからも「今まで出た結婚式で一番感動した」と言っていただけました。'),
        testimonialCard('佐藤 大輔・花子 ご夫妻', '2025年6月挙式', 'ガーデンテラスでの人前式は、青空の下で最高に気持ちよかったです。お料理も大変好評で、スタッフの皆さんの温かいサービスに感激しました。'),
        testimonialCard('鈴木 拓也・優子 ご夫妻', '2025年3月挙式', '遠方からのゲストが多かったのですが、きめ細やかな対応で安心してお任せできました。特にエンドロールの映像は一生の宝物です。'),
      ],
    }),
  ],
});

// ─── Fair Section ───
function fairCard(title: string, date: string, tags: string[]) {
  return frame(`Fair: ${title}`, {
    autoLayout: horizontal({ spacing: 0 }),
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    clipContent: true,
    children: [
      // Image placeholder
      frame('FairImg', {
        size: { x: 240, y: undefined },
        fills: [gradient([{ hex: blush, position: 0 }, { hex: borderColor, position: 1 }], 135)],
        layoutSizingVertical: 'FILL',
      }),
      frame('FairInfo', {
        autoLayout: vertical({ spacing: 12, padX: 24, padY: 28 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, {
            fontSize: 16, fontWeight: 700, color: dark,
            lineHeight: { value: 160, unit: 'PERCENT' },
            size: { x: 340 },
            textAutoResize: 'HEIGHT',
          }),
          text(date, { fontSize: 13, fontWeight: 400, color: textMuted }),
          frame('FairTags', {
            autoLayout: horizontal({ spacing: 6 }),
            children: tags.map(tag =>
              frame(`Tag: ${tag}`, {
                autoLayout: horizontal({ padX: 10, padY: 3 }),
                strokes: [{ color: hex(gold), weight: 1, align: 'INSIDE' }],
                children: [
                  text(tag, { fontSize: 11, fontWeight: 400, color: gold }),
                ],
              })
            ),
          }),
          frame('FairBtn', {
            autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(gold)],
            cornerRadius: 2,
            children: [
              text('このフェアを予約する', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
            ],
          }),
        ],
      }),
    ],
  });
}

const fairSection = frame('FairSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(warmBg)],
  children: [
    text('BRIDAL FAIR', {
      fontSize: 12, fontWeight: 400, color: gold,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('ブライダルフェア', { fontSize: 32, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER', letterSpacing: { value: 2, unit: 'PIXELS' } }),
    text('まずはフェアで会場の雰囲気を体感してください', { fontSize: 14, fontWeight: 400, color: textMuted, textAlignHorizontal: 'CENTER' }),
    frame('FairGrid', {
      autoLayout: vertical({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        fairCard('【初めての方限定】全館見学×試食付きフェア', '2026年4月12日（日）10:00〜 / 14:00〜', ['会場見学', '無料試食', '相談会', '特典あり']),
        fairCard('【週末限定】チャペル模擬挙式×コース試食フェア', '2026年4月19日（土）10:00〜 / 13:00〜', ['模擬挙式', 'フルコース試食', 'ドレス試着']),
      ],
    }),
  ],
});

// ─── CTA Section ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 28, padX: 120, padY: 96, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: blush, position: 0 }, { hex: ivory, position: 0.5 }, { hex: blush, position: 1 }], 135)],
  children: [
    text('RESERVATION', {
      fontSize: 12, fontWeight: 400, color: gold,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('ブライダルフェアのご予約', { fontSize: 28, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER', letterSpacing: { value: 2, unit: 'PIXELS' } }),
    text('おふたりの理想のウェディングを一緒に叶えましょう。\nまずはお気軽にフェアへお越しください。', {
      fontSize: 14, fontWeight: 400, color: textGray,
      lineHeight: { value: 200, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('CTAActions', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('CTAPrimary', {
          autoLayout: horizontal({ padX: 40, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(gold)],
          cornerRadius: 2,
          children: [
            text('フェアを予約する', { fontSize: 15, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
        frame('CTASecondary', {
          autoLayout: horizontal({ padX: 40, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 2,
          strokes: [{ color: hex(gold), weight: 1, align: 'INSIDE' }],
          children: [
            text('お電話でのお問い合わせ', { fontSize: 15, fontWeight: 600, color: gold }),
          ],
        }),
      ],
    }),
    text('☎ 0120-xxx-xxx（受付 10:00〜19:00）', { fontSize: 14, fontWeight: 400, color: textMuted, textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Footer ───
function footerCol(title: string, links: string[]) {
  return frame(`FooterCol: ${title}`, {
    autoLayout: vertical({ spacing: 12 }),
    children: [
      text(title, { fontSize: 13, fontWeight: 600, color: '#ffffffCC' }),
      ...links.map(link => text(link, { fontSize: 12, fontWeight: 400, color: '#ffffff80' })),
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
      children: [
        frame('FooterBrand', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('FELICITA WEDDING', { fontSize: 16, fontWeight: 700, color: gold, letterSpacing: { value: 3, unit: 'PIXELS' } }),
            text('最高の一日を、ふたりで。', { fontSize: 12, fontWeight: 400, color: '#ffffff80' }),
          ],
        }),
        frame('FooterLinks', {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            footerCol('ウェディング', ['会場紹介', 'プラン・料金', 'フォトギャラリー']),
            footerCol('フェア・イベント', ['ブライダルフェア', '相談会', 'ドレス試着会']),
            footerCol('ご案内', ['アクセス', 'よくある質問', 'プライバシーポリシー']),
          ],
        }),
      ],
    }),
    frame('FooterBottom', {
      autoLayout: horizontal({ padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex('#ffffff1A'), weight: 1, align: 'INSIDE' }],
      children: [
        text('© 2026 FELICITA WEDDING. All rights reserved.', { fontSize: 11, fontWeight: 400, color: '#ffffff4D', textAlignHorizontal: 'CENTER' }),
      ],
    }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseWeddingLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(ivory)],
  children: [
    navBar,
    heroSection,
    venueSection,
    planSection,
    gallerySection,
    testimonialSection,
    fairSection,
    ctaSection,
    footerSection,
  ],
});
