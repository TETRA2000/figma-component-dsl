import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const brown = '#3c1518';
const pink = '#f9a8d4';
const gold = '#c5a040';
const cream = '#fdf6f0';
const darkBrown = '#2a0e10';
const textMuted = '#8a6060';

const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(brown)],
  strokes: [{ color: hex(gold), weight: 1, align: 'INSIDE' }],
  children: [
    frame('Brand', {
      autoLayout: vertical({ spacing: 2 }),
      children: [
        text('ショコラトリー 月の雫', { fontSize: 18, fontWeight: 700, color: gold, letterSpacing: 3 }),
        text('TSUKI NO SHIZUKU', { fontSize: 10, fontWeight: 400, color: '#7a6030', letterSpacing: 4 }),
      ],
    }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: ['コレクション', 'ショコラティエ', 'ギフト', 'オンラインショップ'].map(t =>
        text(t, { fontSize: 13, fontWeight: 400, color: '#ccaaaa' })
      ),
    }),
    frame('NavCta', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(gold)],
      cornerRadius: 4,
      children: [text('ご注文はこちら', { fontSize: 13, fontWeight: 700, color: brown })],
    }),
  ],
});

const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 120, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: brown, position: 0 }, { hex: '#5a2328', position: 0.5 }, { hex: '#4a1a1e', position: 1 }], 160)],
  children: [
    text('ARTISAN CHOCOLATERIE', { fontSize: 11, fontWeight: 500, color: gold, letterSpacing: 8 }),
    text('口どけの芸術', {
      fontSize: 64, fontWeight: 700, color: '#ffffff',
      lineHeight: { value: 130, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      letterSpacing: 12,
    }),
    text('カカオの産地から厳選した素材を使い、\n一粒一粒に想いを込めて仕上げる至高のショコラ。\n月の雫が奏でる、口福のひととき。', {
      fontSize: 16, fontWeight: 400, color: '#ffffffA6',
      lineHeight: { value: 220, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroActions', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('PrimaryBtn', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(gold)],
          cornerRadius: 4,
          children: [text('コレクションを見る', { fontSize: 15, fontWeight: 700, color: brown })],
        }),
        frame('SecondaryBtn', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 4,
          strokes: [{ color: hex('#c5a04066'), weight: 1, align: 'INSIDE' }],
          children: [text('ギフトを贈る', { fontSize: 15, fontWeight: 500, color: gold })],
        }),
      ],
    }),
  ],
});

function collectionCard(icon: string, name: string, description: string) {
  return frame(`Collection: ${name}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 36, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: hex('#3c151814'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(icon, { fontSize: 36, textAlignHorizontal: 'CENTER' }),
      text(name, { fontSize: 18, fontWeight: 700, color: brown, letterSpacing: 2, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 13, fontWeight: 400, color: textMuted,
        lineHeight: { value: 190, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 220 },
        textAutoResize: 'HEIGHT',
      }),
      text('詳しく見る →', { fontSize: 13, fontWeight: 500, color: gold }),
    ],
  });
}

const collectionsSection = frame('CollectionsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('COLLECTIONS', { fontSize: 11, fontWeight: 500, color: gold, letterSpacing: 6 }),
        text('コレクション', { fontSize: 32, fontWeight: 700, color: brown, letterSpacing: 4, textAlignHorizontal: 'CENTER' }),
        text('素材と技法にこだわり抜いた、四季折々のショコラをご堪能ください。', { fontSize: 15, fontWeight: 400, color: textMuted, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('Grid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        collectionCard('🍫', 'トリュフ', 'ガナッシュを贅沢に包み込んだ、なめらかな口どけのトリュフコレクション。'),
        collectionCard('💎', 'ボンボンショコラ', '宝石のように美しい一粒。フルーツ、ナッツ、スパイスの芸術的なボンボン。'),
        collectionCard('🏷️', 'タブレット', 'カカオの個性を最大限に引き出したシングルオリジンのタブレット。'),
        collectionCard('🌸', '季節限定', '旬の素材を活かした、その季節だけの特別なショコラ。'),
      ],
    }),
  ],
});

const chocolatierSection = frame('ChocolatierSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(brown)],
  children: [
    frame('Photo', {
      size: { x: 420, y: 500 },
      fills: [gradient([{ hex: '#5a2328', position: 0 }, { hex: '#7a3338', position: 1 }], 135)],
      cornerRadius: 8,
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('CHOCOLATIER', { fontSize: 11, fontWeight: 500, color: gold, letterSpacing: 6 }),
        text('ショコラティエ 藤原 月子', { fontSize: 28, fontWeight: 700, color: '#ffffff', letterSpacing: 3 }),
        text('パリの名門ショコラトリーで10年間修行を重ね、帰国後「月の雫」を創業。フランスの伝統技法と日本の繊細な感性を融合させた独自のスタイルで、数々の国際コンクールで受賞。', {
          fontSize: 15, fontWeight: 400, color: '#ffffffA6',
          lineHeight: { value: 220, unit: 'PERCENT' },
          size: { x: 480 },
          textAutoResize: 'HEIGHT',
        }),
        text('「カカオは大地からの贈り物。その声に耳を傾け、最高の一粒をお届けしたい。」', {
          fontSize: 15, fontWeight: 400, color: '#ffffffA6',
          lineHeight: { value: 220, unit: 'PERCENT' },
          size: { x: 480 },
          textAutoResize: 'HEIGHT',
        }),
        frame('Awards', {
          autoLayout: horizontal({ spacing: 12 }),
          children: ['C.C.C. 金賞 2024', 'ICA 銀賞 2023', 'サロン・デュ・ショコラ出展'].map(a =>
            frame(`Award: ${a}`, {
              autoLayout: horizontal({ padX: 16, padY: 6 }),
              cornerRadius: 4,
              strokes: [{ color: hex('#c5a0404D'), weight: 1, align: 'INSIDE' }],
              children: [text(a, { fontSize: 12, fontWeight: 500, color: gold })],
            })
          ),
        }),
      ],
    }),
  ],
});

function giftCard(name: string, price: string, description: string) {
  return frame(`Gift: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: hex('#3c15180F'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('Photo', {
        size: { x: undefined, y: 220 },
        fills: [gradient([{ hex: '#5a2328', position: 0 }, { hex: '#7a3338', position: 0.5 }, { hex: gold, position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame('Info', {
        autoLayout: vertical({ spacing: 12, padX: 24, padY: 28 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 18, fontWeight: 700, color: brown, letterSpacing: 2 }),
          text(description, {
            fontSize: 13, fontWeight: 400, color: textMuted,
            lineHeight: { value: 190, unit: 'PERCENT' },
            size: { x: 280 },
            textAutoResize: 'HEIGHT',
          }),
          frame('Bottom', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(price, { fontSize: 22, fontWeight: 700, color: gold }),
              frame('CartBtn', {
                autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                fills: [solid(brown)],
                cornerRadius: 4,
                children: [text('カートに入れる', { fontSize: 12, fontWeight: 600, color: '#ffffff' })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

const giftSection = frame('GiftSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid('#f9ede4')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('GIFT', { fontSize: 11, fontWeight: 500, color: gold, letterSpacing: 6 }),
        text('ギフトコレクション', { fontSize: 32, fontWeight: 700, color: brown, letterSpacing: 4, textAlignHorizontal: 'CENTER' }),
        text('大切な方への贈り物に、特別なショコラを。', { fontSize: 15, fontWeight: 400, color: textMuted, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('Grid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        giftCard('月光 -GEKKOU-', '¥5,400', '看板トリュフ6種を美しい木箱に詰めた、当店一番人気のギフトセット。'),
        giftCard('花鳥風月 -KACHOU FUUGETSU-', '¥8,640', '四季をテーマにしたボンボンショコラ12粒入り。和素材との繊細なマリアージュ。'),
        giftCard('至福の時 -SHIFUKU NO TOKI-', '¥12,960', 'タブレット3種とトリュフ9粒の豪華アソート。特別な日の贈り物に。'),
      ],
    }),
  ],
});

const ctaSection = frame('OnlineOrderCTA', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: gold, position: 0 }, { hex: '#d4b050', position: 0.5 }, { hex: gold, position: 1 }], 135)],
  children: [
    text('オンラインショップ', { fontSize: 32, fontWeight: 700, color: brown, letterSpacing: 4, textAlignHorizontal: 'CENTER' }),
    text('全国どこからでもご注文いただけます。\n¥10,000以上のご注文で送料無料。', {
      fontSize: 16, fontWeight: 400, color: '#3c1518B3',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 400 },
      textAutoResize: 'HEIGHT',
    }),
    frame('CtaBtn', {
      autoLayout: horizontal({ padX: 56, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(brown)],
      cornerRadius: 4,
      children: [text('オンラインショップへ', { fontSize: 16, fontWeight: 700, color: gold })],
    }),
    text('クール便でお届け / 最短翌日配送', { fontSize: 13, fontWeight: 400, color: '#3c151880' }),
  ],
});

const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0, padX: 120 }),
  fills: [solid(darkBrown)],
  children: [
    frame('Inner', {
      autoLayout: horizontal({ spacing: 0, padY: 64, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Brand', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('ショコラトリー 月の雫', { fontSize: 18, fontWeight: 700, color: gold, letterSpacing: 2 }),
            text('TSUKI NO SHIZUKU', { fontSize: 10, fontWeight: 400, color: '#7a6030', letterSpacing: 4 }),
          ],
        }),
        frame('Links', {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            frame('Col1', { autoLayout: vertical({ spacing: 12 }), children: [
              text('ショップ', { fontSize: 13, fontWeight: 700, color: '#ffffffCC' }),
              text('コレクション', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
              text('ギフト', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
              text('オンラインショップ', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
            ]}),
            frame('Col2', { autoLayout: vertical({ spacing: 12 }), children: [
              text('ブランド', { fontSize: 13, fontWeight: 700, color: '#ffffffCC' }),
              text('ショコラティエ紹介', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
              text('素材へのこだわり', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
              text('店舗情報', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
            ]}),
            frame('Col3', { autoLayout: vertical({ spacing: 12 }), children: [
              text('サポート', { fontSize: 13, fontWeight: 700, color: '#ffffffCC' }),
              text('よくあるご質問', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
              text('配送について', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
              text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#ffffff66' }),
            ]}),
          ],
        }),
      ],
    }),
    frame('Bottom', {
      autoLayout: horizontal({ padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex('#ffffff14'), weight: 1, align: 'INSIDE' }],
      children: [text('© 2026 ショコラトリー 月の雫 All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#ffffff4D' })],
    }),
  ],
});

export default frame('JapaneseChocolateLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [navBar, heroSection, collectionsSection, chocolatierSection, giftSection, ctaSection, footerSection],
});
