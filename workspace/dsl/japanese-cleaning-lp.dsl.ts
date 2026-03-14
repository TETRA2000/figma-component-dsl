import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const skyBlue = '#0ea5e9';
const darkBlue = '#0c4a6e';
const white = '#ffffff';
const bgLight = '#f8fbfd';
const lightBlue = '#e0f2fe';
const gray = '#64748b';
const lightGray = '#94a3b8';

// ─── NavBar ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(white)],
  strokes: [{ color: hex('#0ea5e91A'), weight: 1, align: 'INSIDE' }],
  children: [
    text('キラリ清掃サービス', { fontSize: 20, fontWeight: 900, color: skyBlue, letterSpacing: { value: 1, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('サービス内容', { fontSize: 14, fontWeight: 500, color: '#888888' }),
        text('料金', { fontSize: 14, fontWeight: 500, color: '#888888' }),
        text('施工事例', { fontSize: 14, fontWeight: 500, color: '#888888' }),
        text('お客様の声', { fontSize: 14, fontWeight: 500, color: '#888888' }),
        text('お問い合わせ', { fontSize: 14, fontWeight: 500, color: '#888888' }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(skyBlue)],
      cornerRadius: 24,
      children: [
        text('無料見積もり', { fontSize: 13, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 680 },
  autoLayout: vertical({ spacing: 20, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: lightBlue, position: 0 }, { hex: '#f0f9ff', position: 0.5 }, { hex: white, position: 1 }], 160)],
  children: [
    text('PROFESSIONAL CLEANING', {
      fontSize: 13, fontWeight: 600, color: skyBlue,
      letterSpacing: { value: 6, unit: 'PIXELS' },
    }),
    text('プロの技術でピカピカに', {
      fontSize: 60, fontWeight: 900, color: darkBlue,
      letterSpacing: { value: 3, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('ご家庭からオフィス、民泊まで。\n熟練スタッフが最新の設備と環境に優しい洗剤で、徹底的にキレイにします。', {
      fontSize: 17, fontWeight: 400, color: gray,
      lineHeight: { value: 190, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 560 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroBtnGroup', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        frame('HeroBtnPrimary', {
          autoLayout: horizontal({ padX: 48, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(skyBlue)],
          cornerRadius: 32,
          children: [
            text('無料見積もりを依頼', { fontSize: 16, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('HeroBtnSecondary', {
          autoLayout: horizontal({ padX: 40, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex(skyBlue), weight: 2, align: 'INSIDE' }],
          cornerRadius: 32,
          children: [
            text('サービス一覧', { fontSize: 16, fontWeight: 600, color: skyBlue }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Services Section ───
function serviceCard(title: string, description: string, features: string[]) {
  const featureNodes = features.map((f) =>
    frame(`Feature: ${f}`, {
      autoLayout: horizontal({ padY: 8 }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex('#0ea5e910'), weight: 1, align: 'INSIDE' }],
      children: [
        text(f, { fontSize: 14, fontWeight: 400, color: '#475569' }),
      ],
    })
  );

  return frame(`Service: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 28, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid(bgLight)],
    strokes: [{ color: hex('#0ea5e914'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('ServiceIcon', {
        size: { x: 64, y: 64 },
        fills: [gradient([{ hex: skyBlue, position: 0 }, { hex: '#38bdf8', position: 1 }], 135)],
        cornerRadius: 16,
      }),
      text(title, { fontSize: 20, fontWeight: 700, color: darkBlue, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: gray,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
      ...featureNodes,
    ],
  });
}

const servicesSection = frame('ServicesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('SERVICES', { fontSize: 12, fontWeight: 600, color: skyBlue, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('サービス内容', { fontSize: 34, fontWeight: 800, color: darkBlue, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('ServicesGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        serviceCard('ハウスクリーニング', 'キッチン・浴室・トイレなど水回りを中心に、お住まい全体をプロの技術でピカピカに。', ['エアコン分解洗浄', '換気扇クリーニング', '浴室カビ除去', 'フローリングワックス']),
        serviceCard('オフィスクリーニング', '快適な職場環境づくりをサポート。定期清掃から特別清掃まで柔軟に対応いたします。', ['日常清掃', 'カーペット洗浄', '窓ガラス清掃', 'ワックスがけ']),
        serviceCard('民泊清掃', 'ゲストの満足度を左右する清潔さ。チェックアウト後の迅速な清掃とセッティングを代行します。', ['リネン交換', 'アメニティ補充', '消耗品管理', 'ゴミ回収']),
      ],
    }),
  ],
});

// ─── Before/After Section ───
function baCard(caption: string) {
  return frame(`BA: ${caption.substring(0, 20)}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
    fills: [solid(white)],
    cornerRadius: 16,
    strokes: [{ color: hex('#0ea5e914'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('BAImages', {
        autoLayout: horizontal({ spacing: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('BeforeBox', {
            autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              rectangle('BeforeImg', { size: { x: 200, y: 180 }, fills: [solid('#cbd5e1')], cornerRadius: 8, layoutSizingHorizontal: 'FILL' }),
              text('BEFORE', { fontSize: 11, fontWeight: 700, color: lightGray, letterSpacing: { value: 2, unit: 'PIXELS' } }),
            ],
          }),
          frame('AfterBox', {
            autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              rectangle('AfterImg', { size: { x: 200, y: 180 }, fills: [gradient([{ hex: '#7dd3fc', position: 0 }, { hex: skyBlue, position: 1 }], 135)], cornerRadius: 8, layoutSizingHorizontal: 'FILL' }),
              text('AFTER', { fontSize: 11, fontWeight: 700, color: skyBlue, letterSpacing: { value: 2, unit: 'PIXELS' } }),
            ],
          }),
        ],
      }),
      text(caption, { fontSize: 14, fontWeight: 600, color: '#475569', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

const beforeAfterSection = frame('BeforeAfterSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 220, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid('#f0f9ff')],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('BEFORE / AFTER', { fontSize: 12, fontWeight: 600, color: skyBlue, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('施工事例', { fontSize: 34, fontWeight: 800, color: darkBlue, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('BAGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        baCard('キッチン換気扇 — 油汚れを分解洗浄で除去'),
        baCard('浴室タイル — カビ・水垢を徹底除去'),
      ],
    }),
  ],
});

// ─── Pricing Section ───
function priceRow(service: string, price: string, note: string) {
  return frame(`Price: ${service}`, {
    autoLayout: horizontal({ spacing: 0, padX: 24, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#0ea5e914'), weight: 1, align: 'INSIDE' }],
    children: [
      text(service, { fontSize: 16, fontWeight: 700, color: darkBlue, layoutSizingHorizontal: 'FILL' }),
      text(price, { fontSize: 20, fontWeight: 800, color: skyBlue }),
      text(note, { fontSize: 13, fontWeight: 400, color: lightGray, size: { x: 160 }, textAlignHorizontal: 'RIGHT' }),
    ],
  });
}

const pricingSection = frame('PricingSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 320, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(white)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('PRICING', { fontSize: 12, fontWeight: 600, color: skyBlue, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('料金表', { fontSize: 34, fontWeight: 800, color: darkBlue, letterSpacing: { value: 2, unit: 'PIXELS' } }),
        text('明朗会計。追加料金は一切ございません。', { fontSize: 15, fontWeight: 400, color: gray }),
      ],
    }),
    frame('PriceTable', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        priceRow('キッチンクリーニング', '¥12,000〜', '所要時間：約2時間'),
        priceRow('浴室クリーニング', '¥14,000〜', '所要時間：約2.5時間'),
        priceRow('トイレクリーニング', '¥8,000〜', '所要時間：約1時間'),
        priceRow('エアコン分解洗浄', '¥10,000〜', '所要時間：約1.5時間'),
        priceRow('全体清掃（1LDK）', '¥28,000〜', '所要時間：約4時間'),
        priceRow('民泊清掃（1回）', '¥6,000〜', '所要時間：約1.5時間'),
      ],
    }),
  ],
});

// ─── Reviews Section ───
function reviewCard(body: string, name: string) {
  return frame(`Review: ${name}`, {
    autoLayout: vertical({ spacing: 16, padX: 28, padY: 36 }),
    fills: [solid(white)],
    strokes: [{ color: hex('#0ea5e914'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    children: [
      text('★★★★★', { fontSize: 18, fontWeight: 400, color: '#f59e0b' }),
      text(body, {
        fontSize: 15, fontWeight: 400, color: '#475569',
        lineHeight: { value: 180, unit: 'PERCENT' },
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
      text(name, { fontSize: 13, fontWeight: 600, color: lightGray }),
    ],
  });
}

const reviewsSection = frame('ReviewsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(bgLight)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('REVIEWS', { fontSize: 12, fontWeight: 600, color: skyBlue, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('お客様の声', { fontSize: 34, fontWeight: 800, color: darkBlue, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('ReviewsGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        reviewCard('引っ越し前の退去清掃をお願いしました。自分では手の届かない場所まで隅々までキレイにしていただき、敷金も全額返ってきました。大満足です！', '30代女性 A.K 様'),
        reviewCard('民泊運営で毎回お世話になっています。ゲストからの清潔感の評価が格段に上がり、予約数も増えました。信頼できるパートナーです。', '40代男性 T.M 様'),
        reviewCard('エアコンクリーニングをお願いしたところ、真っ黒な汚れが大量に出てきて驚きました。クリーニング後は風の匂いが全然違います。毎年お願いしたいです。', '50代女性 Y.S 様'),
      ],
    }),
  ],
});

// ─── CTA Section ───
const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 120, padY: 120, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: lightBlue, position: 0 }, { hex: '#bae6fd', position: 1 }], 160)],
  children: [
    text('まずは無料見積もりから', {
      fontSize: 38, fontWeight: 900, color: darkBlue,
      letterSpacing: { value: 2, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('お見積もりは完全無料。お電話・メール・LINEで\nお気軽にお問い合わせください。最短翌日対応可能です。', {
      fontSize: 16, fontWeight: 400, color: gray,
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    rectangle('CtaSpacer', { size: { x: 1, y: 16 }, opacity: 0 }),
    frame('CtaBtn', {
      autoLayout: horizontal({ padX: 64, padY: 20, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(skyBlue)],
      cornerRadius: 32,
      children: [
        text('無料見積もりを依頼する', { fontSize: 18, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    text('※ 初回限定 全メニュー10%OFF', { fontSize: 12, fontWeight: 400, color: gray, textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Footer Section ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid(darkBlue)],
  children: [
    text('キラリ清掃サービス', { fontSize: 20, fontWeight: 900, color: '#7dd3fc', letterSpacing: { value: 1, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('サービス内容', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('料金', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('施工事例', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('お客様の声', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('会社概要', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
        text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#ffffff1F')],
    }),
    text('© 2026 キラリ清掃サービス All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#ffffff66', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseCleaningLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(bgLight)],
  children: [
    navBar,
    heroSection,
    servicesSection,
    beforeAfterSection,
    pricingSection,
    reviewsSection,
    ctaSection,
    footerSection,
  ],
});
