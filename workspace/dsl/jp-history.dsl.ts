/**
 * jp-history.dsl.ts — 沿革 (Company History / Timeline)
 * Japanese corporate history page with timeline entries and growth stats.
 */
import {
  frame, text, rectangle, image,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

// ── Helpers ──

function navLink(label: string) {
  return text(label, { fontSize: 14, fontWeight: 500, color: '#ffffff' });
}

function navBar() {
  return frame('NavBar', {
    size: { x: 1440, y: 72 },
    autoLayout: horizontal({
      padX: 80, padY: 0,
      align: 'SPACE_BETWEEN',
      counterAlign: 'CENTER',
    }),
    fills: [solid('#1a365d')],
    children: [
      frame('NavLeft', {
        autoLayout: horizontal({ spacing: 40, counterAlign: 'CENTER' }),
        children: [
          image('Logo', { src: './workspace/assets/company-logo.png', size: { x: 180, y: 50 } }),
          navLink('製品情報'),
          navLink('技術情報'),
          navLink('企業情報'),
          navLink('採用情報'),
        ],
      }),
      frame('NavRight', {
        autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
        children: [
          navLink('お問い合わせ'),
          frame('NavCTA', {
            autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#2563eb')],
            cornerRadius: 4,
            children: [
              text('資料請求', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function timelineEntry(year: string, title: string, description: string, imageSrc?: string) {
  const children = [
    // Year column
    frame('YearCol', {
      size: { x: 120, y: undefined },
      autoLayout: vertical({ spacing: 4, counterAlign: 'MAX' }),
      children: [
        text(year, { fontSize: 28, fontWeight: 800, color: '#2563eb' }),
      ],
    }),
    // Dot and line
    frame('TimelineDot', {
      autoLayout: vertical({ spacing: 0, counterAlign: 'CENTER' }),
      children: [
        frame('Dot', {
          size: { x: 16, y: 16 },
          fills: [solid('#2563eb')],
          cornerRadius: 8,
        }),
        rectangle('Line', { size: { x: 2, y: 80 }, fills: [solid('#d1d5db')] }),
      ],
    }),
    // Content column
    frame('ContentCol', {
      size: { x: 900, y: undefined },
      autoLayout: vertical({ spacing: 12, padX: 24, padY: 0 }),
      children: [
        text(title, { fontSize: 20, fontWeight: 700, color: '#1a365d',
          size: { x: 850 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 150, unit: 'PERCENT' },
        }),
        text(description, {
          fontSize: 14, fontWeight: 400, color: '#4b5563',
          size: { x: 850 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 180, unit: 'PERCENT' },
        }),
        ...(imageSrc ? [
          image(`TimelineImg-${year}`, {
            src: imageSrc,
            size: { x: 400, y: 250 },
            cornerRadius: 8,
          }),
        ] : []),
      ],
    }),
  ];

  return frame(`Timeline-${year}`, {
    autoLayout: horizontal({ spacing: 16, counterAlign: 'MIN' }),
    layoutSizingHorizontal: 'FILL',
    children,
  });
}

function statCard(value: string, label: string) {
  return frame(`Stat-${label}`, {
    size: { x: 280, y: undefined },
    autoLayout: vertical({ spacing: 8, padX: 32, padY: 32, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
    children: [
      text(value, { fontSize: 40, fontWeight: 800, color: '#2563eb', textAlignHorizontal: 'CENTER' }),
      text(label, { fontSize: 14, fontWeight: 500, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
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
            autoLayout: vertical({ spacing: 16 }),
            children: [
              image('FooterLogo', { src: './workspace/assets/company-logo.png', size: { x: 150, y: 42 } }),
              text('〒100-0001\n東京都千代田区千代田1-1-1', {
                fontSize: 13, color: '#94a3b8',
                lineHeight: { value: 170, unit: 'PERCENT' },
                size: { x: 250 }, textAutoResize: 'HEIGHT',
              }),
            ],
          }),
          frame('FooterCol2', {
            autoLayout: vertical({ spacing: 12 }),
            children: [
              text('製品・サービス', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('製品一覧', { fontSize: 13, color: '#94a3b8' }),
              text('ソリューション', { fontSize: 13, color: '#94a3b8' }),
              text('導入事例', { fontSize: 13, color: '#94a3b8' }),
            ],
          }),
          frame('FooterCol3', {
            autoLayout: vertical({ spacing: 12 }),
            children: [
              text('企業情報', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('会社概要', { fontSize: 13, color: '#94a3b8' }),
              text('沿革', { fontSize: 13, color: '#94a3b8' }),
              text('採用情報', { fontSize: 13, color: '#94a3b8' }),
            ],
          }),
          frame('FooterCol4', {
            autoLayout: vertical({ spacing: 12 }),
            children: [
              text('サポート', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('お問い合わせ', { fontSize: 13, color: '#94a3b8' }),
              text('よくあるご質問', { fontSize: 13, color: '#94a3b8' }),
              text('資料ダウンロード', { fontSize: 13, color: '#94a3b8' }),
            ],
          }),
        ],
      }),
      rectangle('FooterDivider', { size: { x: 1280, y: 1 }, fills: [solid('#334155')] }),
      text('© 2024 株式会社テクノコーポレーション All Rights Reserved.', { fontSize: 12, color: '#64748b' }),
    ],
  });
}

// ── Main Page ──

export default frame('HistoryPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f5f5f5')],
  children: [
    // Navigation
    navBar(),

    // Page Header
    frame('PageHeader', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 12, padX: 80, padY: 64, counterAlign: 'CENTER' }),
      fills: [solid('#1a365d')],
      children: [
        text('沿革', { fontSize: 36, fontWeight: 800, color: '#ffffff' }),
        text('創業以来の歩みと主要なマイルストーンをご紹介します。', {
          fontSize: 16, fontWeight: 400, color: '#cbd5e1',
          textAlignHorizontal: 'CENTER',
          size: { x: 600 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 170, unit: 'PERCENT' },
        }),
      ],
    }),

    // Timeline Section
    frame('TimelineSection', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 0, padX: 80, padY: 64 }),
      fills: [solid('#ffffff')],
      children: [
        timelineEntry(
          '1952',
          '東京都千代田区にて創業',
          '創業者・田中一郎が電子機器の修理・販売を目的として個人事業を設立。戦後復興期における技術革新への情熱から、小さな工房でスタートしました。',
          './workspace/assets/office-tokyo.png',
        ),
        timelineEntry(
          '1968',
          '株式会社テクノコーポレーション設立',
          '法人化により事業基盤を強化。コンピュータ周辺機器の製造・販売を本格的に開始し、国内メーカーへのOEM供給を拡大しました。',
        ),
        timelineEntry(
          '1985',
          '大阪支社開設・西日本エリア進出',
          '大阪市北区に西日本の拠点となる支社を開設。関西圏を中心とした営業網を確立し、全国展開の礎を築きました。',
          './workspace/assets/office-osaka.png',
        ),
        timelineEntry(
          '1998',
          'ITソリューション事業への転換',
          'ハードウェア中心のビジネスモデルから、システムインテグレーションおよびITコンサルティングを中心としたソリューション事業へ経営資源をシフト。',
        ),
        timelineEntry(
          '2005',
          '東京証券取引所第一部上場',
          '企業としての信頼性と知名度が飛躍的に向上。上場を契機にグローバル展開を加速させ、アジア太平洋地域への進出を開始しました。',
        ),
        timelineEntry(
          '2012',
          'クラウドサービス事業を開始',
          '自社開発のクラウドプラットフォーム「TechnoCloud」を提供開始。SaaS、PaaS、IaaS の包括的なクラウドサービスを展開し、デジタルトランスフォーメーションを支援。',
          './workspace/assets/technology.png',
        ),
        timelineEntry(
          '2019',
          'AI・IoT研究開発センター設立',
          '名古屋市にAI・IoT技術の研究開発拠点を設立。産学連携により次世代技術の研究開発を推進し、特許取得件数は累計500件を突破しました。',
          './workspace/assets/office-nagoya.png',
        ),
        timelineEntry(
          '2024',
          'グループ売上高3,000億円を達成',
          '国内外のグループ企業を含む連結売上高が3,000億円に到達。サステナビリティ経営を推進し、次の100年に向けた成長戦略を策定しました。',
        ),
      ],
    }),

    // Growth Stats Section
    frame('GrowthStats', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 40, padX: 80, padY: 64, counterAlign: 'CENTER' }),
      fills: [solid('#f5f5f5')],
      children: [
        frame('StatsHeader', {
          autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('成長の軌跡', { fontSize: 28, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
            rectangle('StatsAccent', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),
          ],
        }),
        frame('StatsRow', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            statCard('72年', '創業からの歴史'),
            statCard('12,500名', 'グループ従業員数'),
            statCard('3,000億円', '連結売上高'),
            statCard('15カ国', '海外拠点数'),
          ],
        }),
      ],
    }),

    // Footer
    footer(),
  ],
});
