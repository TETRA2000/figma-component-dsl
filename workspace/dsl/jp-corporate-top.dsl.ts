import {
  frame, text, rectangle, image,
  solid, gradient, hex, imageFill,
  horizontal, vertical,
  divider,
} from '@figma-dsl/core';

// ── Helpers ──

function navLink(label: string) {
  return text(label, { fontSize: 14, fontWeight: 500, color: '#ffffff' });
}

function newsItem(date: string, category: string, title: string) {
  return frame(`News: ${title}`, {
    autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(date, { fontSize: 13, fontWeight: 400, color: '#6b7280', size: { x: 100 }, textAutoResize: 'HEIGHT' }),
      frame('CategoryBadge', {
        autoLayout: horizontal({ padX: 12, padY: 4 }),
        fills: [solid('#2563eb')],
        cornerRadius: 4,
        children: [
          text(category, { fontSize: 11, fontWeight: 600, color: '#ffffff' }),
        ],
      }),
      text(title, {
        fontSize: 14, fontWeight: 400, color: '#333333',
        size: { x: 700 }, textAutoResize: 'HEIGHT',
        lineHeight: { value: 160, unit: 'PERCENT' },
      }),
    ],
  });
}

function highlightCard(iconSrc: string, title: string, description: string) {
  return frame(`Highlight: ${title}`, {
    size: { x: 360, y: undefined },
    autoLayout: vertical({ spacing: 20, padX: 32, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
    children: [
      image(`Icon: ${title}`, { src: iconSrc, size: { x: 80, y: 80 } }),
      text(title, { fontSize: 20, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#4a5568',
        size: { x: 296 }, textAutoResize: 'HEIGHT',
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
      }),
    ],
  });
}

// ── Page ──

export default frame('JpCorporateTop', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [

    // ── Header ──
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      size: { x: 1440, y: 72 },
      fills: [solid('#1a365d')],
      children: [
        image('Logo', { src: '../assets/company-logo.png', size: { x: 180, y: 50 } }),
        frame('Nav', {
          autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
          children: [
            navLink('会社情報'),
            navLink('事業紹介'),
            navLink('採用情報'),
            navLink('IR情報'),
            navLink('お問い合わせ'),
          ],
        }),
      ],
    }),

    // ── Hero Section ──
    frame('Hero', {
      size: { x: 1440, y: 500 },
      fills: [
        imageFill('../assets/hero-corporate.png'),
        gradient([
          { hex: '#1a365d00', position: 0 },
          { hex: '#1a365dcc', position: 1 },
        ], 270),
      ],
      autoLayout: vertical({ spacing: 16, padX: 120, padY: 0, align: 'MAX', counterAlign: 'MIN' }),
      clipContent: true,
      children: [
        text('テクノロジーで、社会をもっと豊かに。', {
          fontSize: 42, fontWeight: 700, color: '#ffffff',
        }),
        text('私たちは革新的なソリューションを通じて、お客様と社会の持続的な成長に貢献します。', {
          fontSize: 18, fontWeight: 400, color: '#ffffffcc',
          size: { x: 600 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 170, unit: 'PERCENT' },
        }),
        rectangle('HeroSpacer', { size: { x: 1, y: 48 }, opacity: 0 }),
      ],
    }),

    // ── Mission Section ──
    frame('Mission', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('私たちの使命', { fontSize: 32, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
        rectangle('MissionUnderline', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),
        text(
          '創業以来、私たちは「テクノロジーの力で社会課題を解決する」という理念のもと、\n常に挑戦を続けてまいりました。グローバルな視点と地域に根ざしたサービスで、\nお客様のビジネス変革を力強くサポートいたします。',
          {
            fontSize: 16, fontWeight: 400, color: '#4a5568',
            size: { x: 800 }, textAutoResize: 'HEIGHT',
            lineHeight: { value: 200, unit: 'PERCENT' },
            textAlignHorizontal: 'CENTER',
          },
        ),
      ],
    }),

    // ── Business Highlights ──
    frame('Highlights', {
      autoLayout: vertical({ spacing: 48, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f5f5f5')],
      children: [
        text('事業ハイライト', { fontSize: 28, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
        frame('HighlightCards', {
          autoLayout: horizontal({ spacing: 32, counterAlign: 'MIN' }),
          children: [
            highlightCard(
              '../assets/icon-innovation.png',
              'イノベーション',
              '最先端のAI・IoT技術を活用し、お客様のデジタルトランスフォーメーションを推進します。',
            ),
            highlightCard(
              '../assets/icon-global.png',
              'グローバル展開',
              '世界15カ国に拠点を構え、国境を越えたシームレスなサービスを提供しています。',
            ),
            highlightCard(
              '../assets/icon-trust.png',
              '信頼と実績',
              '創業50年以上の歴史と3,000社以上の導入実績が、私たちの品質の証です。',
            ),
          ],
        }),
      ],
    }),

    // ── News Section ──
    frame('News', {
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('ニュース', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        divider('#e5e7eb'),
        newsItem('2026.03.10', 'IR', '2026年3月期 第3四半期決算短信を発表いたしました'),
        divider('#e5e7eb'),
        newsItem('2026.03.05', 'プレス', '次世代AI基盤プラットフォームの提供を開始'),
        divider('#e5e7eb'),
        newsItem('2026.02.28', '採用', '2027年度 新卒採用エントリーの受付を開始しました'),
        divider('#e5e7eb'),
        newsItem('2026.02.20', 'CSR', '環境負荷低減に向けたカーボンニュートラル宣言を発表'),
        divider('#e5e7eb'),
      ],
    }),

    // ── Footer ──
    frame('Footer', {
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 60 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#1a365d')],
      children: [
        frame('FooterLinks', {
          autoLayout: horizontal({ spacing: 48 }),
          children: [
            text('会社情報', { fontSize: 13, fontWeight: 400, color: '#ffffffcc' }),
            text('事業紹介', { fontSize: 13, fontWeight: 400, color: '#ffffffcc' }),
            text('採用情報', { fontSize: 13, fontWeight: 400, color: '#ffffffcc' }),
            text('IR情報', { fontSize: 13, fontWeight: 400, color: '#ffffffcc' }),
            text('お問い合わせ', { fontSize: 13, fontWeight: 400, color: '#ffffffcc' }),
            text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#ffffffcc' }),
          ],
        }),
        rectangle('FooterDivider', {
          size: { x: 1, y: 1 },
          fills: [solid('#ffffff', 0.2)],
          layoutSizingHorizontal: 'FILL',
        }),
        text('© 2026 株式会社テックイノベーション All Rights Reserved.', {
          fontSize: 12, fontWeight: 400, color: '#ffffff99',
        }),
      ],
    }),
  ],
});
