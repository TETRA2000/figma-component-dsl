import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const orange = '#f4845f';
const orangeLight = '#f6a583';
const warm = '#fffaf7';
const warmAlt = '#fef6f0';
const brown = '#3a2e28';
const brownMuted = '#7a6b60';
const borderColor = '#f0e0d4';

const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
  children: [
    text('🐾 ペットサロン ぽかぽか', { fontSize: 20, fontWeight: 800, color: orange }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
      children: ['サービス', '料金', 'ギャラリー', 'お客様の声', 'ご予約'].map(t =>
        text(t, { fontSize: 14, fontWeight: 500, color: '#6b5b50' })
      ),
    }),
    frame('BookBtn', {
      autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(orange)],
      cornerRadius: 24,
      children: [text('今すぐ予約', { fontSize: 14, fontWeight: 600, color: '#ffffff' })],
    }),
  ],
});

const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 60, padX: 120, padY: 80, counterAlign: 'CENTER', align: 'CENTER' }),
  fills: [gradient([{ hex: warm, position: 0 }, { hex: '#fef0e8', position: 1 }], 135)],
  children: [
    frame('HeroText', {
      autoLayout: vertical({ spacing: 20 }),
      children: [
        text('大切な家族に\nプロのケアを', {
          fontSize: 44, fontWeight: 800, color: brown,
          lineHeight: { value: 130, unit: 'PERCENT' },
          size: { x: 480 },
          textAutoResize: 'HEIGHT',
        }),
        text('愛するペットの健康と美しさを守る、\nやさしさあふれるグルーミングサロンです。', {
          fontSize: 16, fontWeight: 400, color: brownMuted,
          lineHeight: { value: 180, unit: 'PERCENT' },
          size: { x: 400 },
          textAutoResize: 'HEIGHT',
        }),
        frame('Actions', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            frame('Primary', {
              autoLayout: horizontal({ padX: 36, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(orange)],
              cornerRadius: 28,
              children: [text('無料カウンセリング', { fontSize: 16, fontWeight: 700, color: '#ffffff' })],
            }),
            frame('Secondary', {
              autoLayout: horizontal({ padX: 28, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 28,
              strokes: [{ color: hex(orange), weight: 2, align: 'INSIDE' }],
              children: [text('サービスを見る', { fontSize: 16, fontWeight: 700, color: orange })],
            }),
          ],
        }),
      ],
    }),
    ellipse('HeroImage', {
      size: { x: 400, y: 400 },
      fills: [gradient([{ hex: '#fde2d4', position: 0 }, { hex: '#f4845f55', position: 1 }], 135)],
    }),
  ],
});

function serviceCard(icon: string, title: string, description: string) {
  return frame(`Service: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 32, counterAlign: 'CENTER' }),
    fills: [solid(warm)],
    cornerRadius: 20,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(icon, { fontSize: 40, textAlignHorizontal: 'CENTER' }),
      text(title, { fontSize: 18, fontWeight: 700, color: brown, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: brownMuted,
        lineHeight: { value: 170, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 260 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const servicesSection = frame('ServicesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('サービス一覧', { fontSize: 30, fontWeight: 800, color: brown, textAlignHorizontal: 'CENTER' }),
    text('大切なペットに合わせた多彩なケアメニュー', { fontSize: 15, fontWeight: 400, color: '#9a8a7e', textAlignHorizontal: 'CENTER' }),
    frame('Grid', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Row1', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            serviceCard('✂️', 'トリミング', '犬種に合わせたカットスタイルで、可愛さを最大限に引き出します。'),
            serviceCard('🛁', 'シャンプー・ブロー', '低刺激の天然シャンプーで、ふわふわの仕上がりに。'),
            serviceCard('🦷', 'デンタルケア', '歯磨きや口腔ケアで、健康な歯と息を保ちます。'),
          ],
        }),
        frame('Row2', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            serviceCard('💅', '爪切り・耳掃除', '定期的なお手入れで、清潔で快適な状態をキープ。'),
            serviceCard('🧴', 'スパトリートメント', '保湿パックやマッサージで、毛並みと肌を美しく。'),
            serviceCard('🏥', '健康チェック', 'グルーミング時に皮膚や健康状態を丁寧にチェック。'),
          ],
        }),
      ],
    }),
  ],
});

function priceRow(label: string, price: string) {
  return frame(`Price: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 32, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#f5ebe3'), weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 15, fontWeight: 600, color: brown }),
      text(price, { fontSize: 18, fontWeight: 800, color: orange }),
    ],
  });
}

const priceSection = frame('PriceSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 370, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(warmAlt)],
  children: [
    text('料金メニュー', { fontSize: 30, fontWeight: 800, color: brown, textAlignHorizontal: 'CENTER' }),
    text('すべてのメニューにシャンプー・ブロー込み', { fontSize: 15, fontWeight: 400, color: '#9a8a7e', textAlignHorizontal: 'CENTER' }),
    frame('Table', {
      autoLayout: vertical({ spacing: 0 }),
      fills: [solid('#ffffff')],
      cornerRadius: 20,
      strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
      layoutSizingHorizontal: 'FILL',
      children: [
        priceRow('小型犬 トリミングコース', '¥5,500〜'),
        priceRow('中型犬 トリミングコース', '¥7,700〜'),
        priceRow('大型犬 トリミングコース', '¥11,000〜'),
        priceRow('シャンプー・ブローのみ', '¥3,300〜'),
        priceRow('デンタルケア', '¥1,100'),
        priceRow('スパトリートメント', '¥2,200〜'),
      ],
    }),
  ],
});

function galleryItem(breed: string) {
  return frame(`Gallery: ${breed}`, {
    autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle(`Image: ${breed}`, {
        size: { x: 200, y: 200 },
        fills: [gradient([{ hex: '#fde2d4', position: 0 }, { hex: '#fef0e8', position: 1 }], 135)],
        cornerRadius: 16,
      }),
      text(breed, { fontSize: 13, fontWeight: 600, color: brownMuted, textAlignHorizontal: 'CENTER' }),
    ],
  });
}

const gallerySection = frame('GallerySection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('ギャラリー', { fontSize: 30, fontWeight: 800, color: brown, textAlignHorizontal: 'CENTER' }),
    text('施術前後のビフォーアフターをご覧ください', { fontSize: 15, fontWeight: 400, color: '#9a8a7e', textAlignHorizontal: 'CENTER' }),
    frame('GalleryGrid', {
      autoLayout: horizontal({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        galleryItem('トイプードル'),
        galleryItem('ポメラニアン'),
        galleryItem('シーズー'),
        galleryItem('マルチーズ'),
        galleryItem('ヨークシャーテリア'),
      ],
    }),
  ],
});

function testimonialCard(name: string, pet: string, comment: string) {
  return frame(`Testimonial: ${name}`, {
    autoLayout: vertical({ spacing: 20, padX: 24, padY: 28 }),
    fills: [solid('#ffffff')],
    cornerRadius: 16,
    strokes: [{ color: hex(borderColor), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(`「${comment}」`, {
        fontSize: 14, fontWeight: 400, color: '#5a4e44',
        lineHeight: { value: 180, unit: 'PERCENT' },
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
      frame('Author', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          ellipse('Avatar', {
            size: { x: 40, y: 40 },
            fills: [solid('#fde2d4')],
          }),
          frame('Info', {
            autoLayout: vertical({ spacing: 4 }),
            children: [
              text(name, { fontSize: 14, fontWeight: 700, color: brown }),
              text(pet, { fontSize: 12, fontWeight: 400, color: '#9a8a7e' }),
            ],
          }),
        ],
      }),
    ],
  });
}

const testimonialsSection = frame('TestimonialsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(warmAlt)],
  children: [
    text('お客様の声', { fontSize: 30, fontWeight: 800, color: brown, textAlignHorizontal: 'CENTER' }),
    text('たくさんの飼い主さまからお喜びの声をいただいています', { fontSize: 15, fontWeight: 400, color: '#9a8a7e', textAlignHorizontal: 'CENTER' }),
    frame('Cards', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        testimonialCard('田中さま', 'トイプードル・ココちゃん', 'いつもふわふわに仕上げてもらえて大満足です。スタッフの方も優しくて安心して預けられます。'),
        testimonialCard('佐藤さま', 'ポメラニアン・モコちゃん', '怖がりなうちの子も、ここなら落ち着いて過ごせるみたいです。毎月通っています。'),
        testimonialCard('鈴木さま', 'シーズー・ハナちゃん', 'デンタルケアも一緒にお願いできるのが嬉しいです。仕上がりもいつも完璧です。'),
      ],
    }),
  ],
});

const bookingCta = frame('BookingCTA', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: orange, position: 0 }, { hex: orangeLight, position: 1 }], 135)],
  children: [
    text('ご予約・お問い合わせ', { fontSize: 30, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('初回限定20%OFF！お気軽にお問い合わせください。', { fontSize: 16, fontWeight: 400, color: '#ffffffEE', textAlignHorizontal: 'CENTER' }),
    frame('Actions', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('OnlineBtn', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 28,
          children: [text('オンライン予約', { fontSize: 16, fontWeight: 700, color: orange })],
        }),
        frame('PhoneBtn', {
          autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 28,
          strokes: [{ color: hex('#ffffff'), weight: 2, align: 'INSIDE' }],
          children: [text('📞 03-1234-5678', { fontSize: 16, fontWeight: 700, color: '#ffffff' })],
        }),
      ],
    }),
    text('営業時間：10:00〜19:00（火曜定休）', { fontSize: 13, fontWeight: 400, color: '#ffffffCC', textAlignHorizontal: 'CENTER' }),
  ],
});

const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0, padX: 120 }),
  fills: [solid(brown)],
  children: [
    frame('Inner', {
      autoLayout: horizontal({ spacing: 0, padY: 64, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex('#4d403a'), weight: 1, align: 'INSIDE' }],
      children: [
        frame('Brand', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('🐾 ペットサロン ぽかぽか', { fontSize: 18, fontWeight: 800, color: orange }),
            text('大切な家族にプロのケアを', { fontSize: 13, fontWeight: 400, color: '#a0907e' }),
            text('〒150-0001 東京都渋谷区神宮前1-2-3', { fontSize: 12, fontWeight: 400, color: '#7a6b60' }),
          ],
        }),
        frame('Links', {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            frame('Col1', { autoLayout: vertical({ spacing: 10 }), children: [
              text('メニュー', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('サービス一覧', { fontSize: 13, fontWeight: 400, color: '#a0907e' }),
              text('料金表', { fontSize: 13, fontWeight: 400, color: '#a0907e' }),
              text('ギャラリー', { fontSize: 13, fontWeight: 400, color: '#a0907e' }),
            ]}),
            frame('Col2', { autoLayout: vertical({ spacing: 10 }), children: [
              text('サロン情報', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('スタッフ紹介', { fontSize: 13, fontWeight: 400, color: '#a0907e' }),
              text('アクセス', { fontSize: 13, fontWeight: 400, color: '#a0907e' }),
              text('よくある質問', { fontSize: 13, fontWeight: 400, color: '#a0907e' }),
            ]}),
          ],
        }),
      ],
    }),
    frame('Bottom', {
      autoLayout: horizontal({ padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [text('© 2026 ペットサロン ぽかぽか All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#6b5b50' })],
    }),
  ],
});

export default frame('JapanesePetGroomingLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(warm)],
  children: [navBar, heroSection, servicesSection, priceSection, gallerySection, testimonialsSection, bookingCta, footerSection],
});
