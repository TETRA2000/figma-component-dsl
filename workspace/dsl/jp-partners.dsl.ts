/**
 * Partners page (パートナー企業)
 * Japanese corporate partner companies with logo grid, philosophy, and benefits.
 */
import {
  frame, text, image, rectangle,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function navLink(label: string) {
  return text(label, { fontSize: 14, fontWeight: 500, color: '#ffffff' });
}

function navBar() {
  return frame('NavBar', {
    size: { x: 1440, y: 72 },
    autoLayout: horizontal({
      padX: 80,
      padY: 0,
      align: 'SPACE_BETWEEN',
      counterAlign: 'CENTER',
    }),
    fills: [solid('#1a365d')],
    children: [
      frame('NavLeft', {
        autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
        children: [
          image('Logo', { src: './assets/company-logo.png', size: { x: 180, y: 50 } }),
          navLink('会社概要'),
          navLink('事業内容'),
          navLink('採用情報'),
          navLink('お問い合わせ'),
        ],
      }),
      frame('NavRight', {
        autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
        children: [
          frame('ContactBtn', {
            autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#2563eb')],
            cornerRadius: 4,
            children: [
              text('お問い合わせ', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function footer() {
  return frame('Footer', {
    size: { x: 1440, y: undefined },
    autoLayout: vertical({ spacing: 32, padX: 80, padY: 60 }),
    fills: [solid('#1a365d')],
    children: [
      frame('FooterTop', {
        autoLayout: horizontal({ spacing: 80, align: 'MIN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('FooterCol1', {
            autoLayout: vertical({ spacing: 12 }),
            children: [
              image('FooterLogo', { src: './assets/company-logo.png', size: { x: 180, y: 50 } }),
              text('〒100-0001\n東京都千代田区千代田1-1-1', {
                fontSize: 13, color: '#94a3b8',
                lineHeight: { value: 170, unit: 'PERCENT' },
                size: { x: 250 }, textAutoResize: 'HEIGHT',
              }),
            ],
          }),
          frame('FooterCol2', {
            autoLayout: vertical({ spacing: 10 }),
            children: [
              text('企業情報', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('会社概要', { fontSize: 13, color: '#94a3b8' }),
              text('代表メッセージ', { fontSize: 13, color: '#94a3b8' }),
              text('拠点情報', { fontSize: 13, color: '#94a3b8' }),
            ],
          }),
          frame('FooterCol3', {
            autoLayout: vertical({ spacing: 10 }),
            children: [
              text('事業・サービス', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('導入事例', { fontSize: 13, color: '#94a3b8' }),
              text('パートナー企業', { fontSize: 13, color: '#94a3b8' }),
              text('セミナー・イベント', { fontSize: 13, color: '#94a3b8' }),
            ],
          }),
        ],
      }),
      rectangle('FooterDivider', {
        size: { x: 1, y: 1 },
        fills: [solid('#2d4a7a')],
        layoutSizingHorizontal: 'FILL',
      }),
      text('© 2026 株式会社テクノフューチャー All Rights Reserved.', {
        fontSize: 12, color: '#64748b', textAlignHorizontal: 'CENTER',
      }),
    ],
  });
}

function partnerLogo(name: string, src: string) {
  return frame(name, {
    size: { x: 360, y: 120 },
    autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: hex('#e2e8f0'), weight: 1, align: 'INSIDE' }],
    children: [
      image(`${name}Img`, { src, size: { x: 160, y: 60 } }),
    ],
  });
}

function benefitCard(title: string, description: string, iconSrc: string) {
  return frame(`Benefit: ${title}`, {
    size: { x: 360, y: undefined },
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 32, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: hex('#e2e8f0'), weight: 1, align: 'INSIDE' }],
    children: [
      image(`Icon: ${title}`, { src: iconSrc, size: { x: 60, y: 60 } }),
      text(title, { fontSize: 18, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, color: '#475569',
        lineHeight: { value: 180, unit: 'PERCENT' },
        size: { x: 296 }, textAutoResize: 'HEIGHT',
        textAlignHorizontal: 'CENTER',
      }),
    ],
  });
}

export default frame('PartnersPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Navigation
    navBar(),

    // Page Title Section
    frame('PageTitleSection', {
      size: { x: 1440, y: 200 },
      autoLayout: vertical({ spacing: 8, padX: 80, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid('#f0f4f8')],
      children: [
        text('パートナー企業', { fontSize: 36, fontWeight: 700, color: '#1a365d' }),
        text('Partners', { fontSize: 16, fontWeight: 400, color: '#64748b', letterSpacing: { value: 200, unit: 'PERCENT' } }),
      ],
    }),

    // Breadcrumb
    frame('Breadcrumb', {
      autoLayout: horizontal({ spacing: 8, padX: 80, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('ホーム', { fontSize: 13, color: '#2563eb' }),
        text('>', { fontSize: 13, color: '#94a3b8' }),
        text('事業・サービス', { fontSize: 13, color: '#2563eb' }),
        text('>', { fontSize: 13, color: '#94a3b8' }),
        text('パートナー企業', { fontSize: 13, color: '#334155' }),
      ],
    }),

    // Partner Philosophy Section
    frame('PhilosophySection', {
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('パートナーシップの理念', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        rectangle('PhilosophyAccent', { size: { x: 60, y: 4 }, fills: [solid('#2563eb')], cornerRadius: 2 }),
        text('私たちは、パートナー企業様との強固な信頼関係を基盤に、お客様に最高品質のソリューションを提供しています。共に成長し、共に価値を創造する。それが私たちのパートナーシップの基本姿勢です。', {
          fontSize: 16, color: '#475569',
          lineHeight: { value: 200, unit: 'PERCENT' },
          size: { x: 800 }, textAutoResize: 'HEIGHT',
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),

    // Partner Logos Grid
    frame('PartnerLogosSection', {
      autoLayout: vertical({ spacing: 40, padX: 120, padY: 60, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f5f5f5')],
      children: [
        text('パートナー企業一覧', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        rectangle('LogosAccent', { size: { x: 60, y: 4 }, fills: [solid('#2563eb')], cornerRadius: 2 }),
        // Row 1
        frame('LogoRow1', {
          autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
          children: [
            partnerLogo('Partner1', './assets/logo-partner-1.png'),
            partnerLogo('Partner2', './assets/logo-partner-2.png'),
            partnerLogo('Partner3', './assets/logo-partner-3.png'),
          ],
        }),
        // Row 2
        frame('LogoRow2', {
          autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
          children: [
            partnerLogo('Partner4', './assets/logo-partner-4.png'),
            partnerLogo('Partner5', './assets/logo-partner-5.png'),
            partnerLogo('Partner6', './assets/logo-partner-6.png'),
          ],
        }),
      ],
    }),

    // Partnership Benefits Section
    frame('BenefitsSection', {
      autoLayout: vertical({ spacing: 48, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('パートナーシップのメリット', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        rectangle('BenefitsAccent', { size: { x: 60, y: 4 }, fills: [solid('#2563eb')], cornerRadius: 2 }),
        frame('BenefitCards', {
          autoLayout: horizontal({ spacing: 32, counterAlign: 'MIN' }),
          children: [
            benefitCard(
              '技術力の結集',
              '各パートナー企業の専門技術を組み合わせることで、単独では実現できない高度なソリューションを提供します。',
              './assets/icon-innovation.png',
            ),
            benefitCard(
              '品質保証',
              '厳格なパートナー審査基準と継続的な品質管理により、常に高い品質のサービスをお届けします。',
              './assets/icon-quality.png',
            ),
            benefitCard(
              'サポート体制',
              '全国のパートナーネットワークを活用し、迅速かつきめ細やかなサポート体制を実現しています。',
              './assets/icon-support.png',
            ),
          ],
        }),
      ],
    }),

    // Contact CTA Section
    frame('CTASection', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#1a365d')],
      children: [
        text('パートナーシップに関するお問い合わせ', { fontSize: 28, fontWeight: 700, color: '#ffffff' }),
        text('新たなパートナーシップのご提案やご相談はお気軽にお問い合わせください。', {
          fontSize: 16, color: '#94a3b8',
          lineHeight: { value: 170, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),
        frame('CTAButton', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#2563eb')],
          cornerRadius: 4,
          children: [
            text('お問い合わせはこちら', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
      ],
    }),

    // Footer
    footer(),
  ],
});
