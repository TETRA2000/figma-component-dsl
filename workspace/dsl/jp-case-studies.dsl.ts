/**
 * Case Studies page (導入事例)
 * Japanese corporate case studies with client cards, industry badges, and results.
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

function industryBadge(label: string) {
  return frame(`Badge: ${label}`, {
    autoLayout: horizontal({ padX: 12, padY: 4 }),
    fills: [solid('#eef2ff')],
    cornerRadius: 4,
    children: [
      text(label, { fontSize: 12, fontWeight: 600, color: '#2563eb' }),
    ],
  });
}

function resultItem(metric: string, value: string) {
  return frame(`Result: ${metric}`, {
    autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
    children: [
      frame('ResultDot', {
        size: { x: 8, y: 8 },
        autoLayout: horizontal({}),
        fills: [solid('#2563eb')],
        cornerRadius: 4,
        children: [],
      }),
      text(`${metric}: `, { fontSize: 13, fontWeight: 600, color: '#475569' }),
      text(value, { fontSize: 13, fontWeight: 700, color: '#1a365d' }),
    ],
  });
}

function caseStudyCard(
  name: string,
  imgSrc: string,
  clientName: string,
  industry: string,
  challenge: string,
  results: Array<{ metric: string; value: string }>,
) {
  return frame(name, {
    size: { x: 380, y: undefined },
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: hex('#e2e8f0'), weight: 1, align: 'INSIDE' }],
    clipContent: true,
    children: [
      image(`${name}Image`, { src: imgSrc, size: { x: 380, y: 266 }, fit: 'FILL' }),
      frame(`${name}Content`, {
        autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame(`${name}Header`, {
            autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
            children: [
              text(clientName, { fontSize: 18, fontWeight: 700, color: '#1a365d' }),
              industryBadge(industry),
            ],
          }),
          rectangle(`${name}Divider`, {
            size: { x: 1, y: 1 },
            fills: [solid('#e2e8f0')],
            layoutSizingHorizontal: 'FILL',
          }),
          frame(`${name}Challenge`, {
            autoLayout: vertical({ spacing: 8 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text('課題', { fontSize: 13, fontWeight: 700, color: '#64748b' }),
              text(challenge, {
                fontSize: 14, color: '#334155',
                lineHeight: { value: 170, unit: 'PERCENT' },
                size: { x: 332 }, textAutoResize: 'HEIGHT',
              }),
            ],
          }),
          frame(`${name}Results`, {
            autoLayout: vertical({ spacing: 8 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text('導入効果', { fontSize: 13, fontWeight: 700, color: '#64748b' }),
              ...results.map(r => resultItem(r.metric, r.value)),
            ],
          }),
          frame(`${name}ReadMore`, {
            autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#f0f4f8')],
            cornerRadius: 4,
            layoutSizingHorizontal: 'FILL',
            children: [
              text('詳細を見る', { fontSize: 14, fontWeight: 600, color: '#2563eb' }),
            ],
          }),
        ],
      }),
    ],
  });
}

export default frame('CaseStudiesPage', {
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
        text('導入事例', { fontSize: 36, fontWeight: 700, color: '#1a365d' }),
        text('Case Studies', { fontSize: 16, fontWeight: 400, color: '#64748b', letterSpacing: { value: 200, unit: 'PERCENT' } }),
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
        text('導入事例', { fontSize: 13, color: '#334155' }),
      ],
    }),

    // Introduction
    frame('IntroSection', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 60, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('お客様の課題解決に貢献した事例をご紹介します。', {
          fontSize: 18, color: '#475569',
          lineHeight: { value: 170, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),
        frame('FilterBadges', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            frame('FilterAll', {
              autoLayout: horizontal({ padX: 20, padY: 8 }),
              fills: [solid('#1a365d')],
              cornerRadius: 999,
              children: [
                text('すべて', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
            frame('FilterMfg', {
              autoLayout: horizontal({ padX: 20, padY: 8 }),
              fills: [solid('#f0f4f8')],
              cornerRadius: 999,
              children: [
                text('製造業', { fontSize: 13, fontWeight: 500, color: '#475569' }),
              ],
            }),
            frame('FilterFinance', {
              autoLayout: horizontal({ padX: 20, padY: 8 }),
              fills: [solid('#f0f4f8')],
              cornerRadius: 999,
              children: [
                text('金融', { fontSize: 13, fontWeight: 500, color: '#475569' }),
              ],
            }),
            frame('FilterHealthcare', {
              autoLayout: horizontal({ padX: 20, padY: 8 }),
              fills: [solid('#f0f4f8')],
              cornerRadius: 999,
              children: [
                text('ヘルスケア', { fontSize: 13, fontWeight: 500, color: '#475569' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Case Study Cards
    frame('CaseStudyCardsSection', {
      autoLayout: horizontal({ spacing: 32, padX: 80, padY: 40, counterAlign: 'MIN', align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f5f5f5')],
      children: [
        caseStudyCard(
          'CaseStudy1',
          './assets/case-study-1.png',
          '大手自動車メーカー A社',
          '製造業',
          '生産ラインの品質検査を人手に頼っており、検査精度のばらつきと人件費の増大が課題でした。',
          [
            { metric: '検査精度', value: '99.2%に向上' },
            { metric: '検査コスト', value: '40%削減' },
            { metric: '不良品流出率', value: '85%減少' },
          ],
        ),
        caseStudyCard(
          'CaseStudy2',
          './assets/case-study-2.png',
          '大手地方銀行 B行',
          '金融',
          '紙ベースの審査プロセスに時間がかかり、顧客の待ち時間が長期化していました。',
          [
            { metric: '審査時間', value: '3日から30分に短縮' },
            { metric: '顧客満足度', value: '35%向上' },
            { metric: '処理件数', value: '2.5倍に増加' },
          ],
        ),
        caseStudyCard(
          'CaseStudy3',
          './assets/case-study-3.png',
          '総合病院 Cメディカルセンター',
          'ヘルスケア',
          '電子カルテの導入が遅れ、院内の情報共有や患者データ管理に非効率が生じていました。',
          [
            { metric: '業務効率', value: '60%向上' },
            { metric: 'データ入力時間', value: '50%削減' },
            { metric: '医療ミス', value: '70%減少' },
          ],
        ),
      ],
    }),

    // CTA Section
    frame('CTASection', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#1a365d')],
      children: [
        text('貴社の課題もお聞かせください', { fontSize: 28, fontWeight: 700, color: '#ffffff' }),
        text('業界や規模を問わず、お客様のデジタル変革を支援いたします。\nまずはお気軽にご相談ください。', {
          fontSize: 16, color: '#94a3b8',
          lineHeight: { value: 180, unit: 'PERCENT' },
          size: { x: 600 }, textAutoResize: 'HEIGHT',
          textAlignHorizontal: 'CENTER',
        }),
        frame('CTAButtons', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            frame('CTAButton1', {
              autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#2563eb')],
              cornerRadius: 4,
              children: [
                text('お問い合わせ', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
            frame('CTAButton2', {
              autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 4,
              strokes: [{ color: hex('#ffffff'), weight: 1, align: 'INSIDE' }],
              children: [
                text('資料ダウンロード', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Footer
    footer(),
  ],
});
