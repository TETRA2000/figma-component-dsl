/**
 * ニュースリリース (News) — Japanese corporate news list page
 */
import {
  frame, text, rectangle, image,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

// ── Shared helpers ──────────────────────────────────────────

function navLink(label: string) {
  return text(label, { fontSize: 14, fontWeight: 500, color: '#ffffff' });
}

function navbar() {
  return frame('Navbar', {
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
        autoLayout: horizontal({ spacing: 40, counterAlign: 'CENTER' }),
        children: [
          image('Logo', { src: './workspace/assets/company-logo.png', size: { x: 180, y: 50 } }),
          navLink('ホーム'),
          navLink('企業情報'),
          navLink('製品・ソリューション'),
          navLink('技術紹介'),
          navLink('ニュース'),
        ],
      }),
      frame('NavRight', {
        autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
        children: [
          navLink('採用情報'),
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
    autoLayout: vertical({ spacing: 40, padX: 80, padY: 60 }),
    fills: [solid('#1a365d')],
    children: [
      frame('FooterTop', {
        autoLayout: horizontal({ spacing: 80 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('FooterCol1', {
            autoLayout: vertical({ spacing: 16 }),
            children: [
              text('株式会社テクノコーポレーション', { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
              text('〒100-0001\n東京都千代田区丸の内1-1-1\nテクノビル 15F', {
                fontSize: 13, color: '#94a3b8',
                size: { x: 280 }, textAutoResize: 'HEIGHT',
                lineHeight: { value: 180, unit: 'PERCENT' },
              }),
            ],
          }),
          frame('FooterCol2', {
            autoLayout: vertical({ spacing: 12 }),
            children: [
              text('サービス', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
              text('製品情報', { fontSize: 13, color: '#94a3b8' }),
              text('ソリューション', { fontSize: 13, color: '#94a3b8' }),
              text('技術紹介', { fontSize: 13, color: '#94a3b8' }),
            ],
          }),
          frame('FooterCol3', {
            autoLayout: vertical({ spacing: 12 }),
            children: [
              text('企業情報', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
              text('会社概要', { fontSize: 13, color: '#94a3b8' }),
              text('採用情報', { fontSize: 13, color: '#94a3b8' }),
              text('CSR活動', { fontSize: 13, color: '#94a3b8' }),
            ],
          }),
        ],
      }),
      rectangle('FooterDivider', {
        size: { x: 1, y: 1 },
        fills: [solid('#334155')],
        layoutSizingHorizontal: 'FILL',
      }),
      text('© 2026 テクノコーポレーション All Rights Reserved.', {
        fontSize: 12, color: '#64748b',
      }),
    ],
  });
}

// ── Category tab helper ─────────────────────────────────────

function categoryTab(label: string, active: boolean) {
  return frame(`Tab-${label}`, {
    autoLayout: horizontal({ padX: 28, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: active ? [solid('#1a365d')] : [solid('#ffffff')],
    cornerRadius: 4,
    strokes: active ? [] : [{ color: hex('#d1d5db'), weight: 1, align: 'INSIDE' }],
    children: [
      text(label, {
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        color: active ? '#ffffff' : '#4b5563',
      }),
    ],
  });
}

// ── News item helper ────────────────────────────────────────

function newsItem(date: string, category: string, categoryColor: string, title: string) {
  return frame(`News-${title.slice(0, 10)}`, {
    autoLayout: horizontal({ spacing: 24, padX: 0, padY: 24, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
    children: [
      text(date, { fontSize: 14, fontWeight: 400, color: '#6b7280', size: { x: 120 } }),
      frame(`Badge-${category}`, {
        autoLayout: horizontal({ padX: 14, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(categoryColor)],
        cornerRadius: 4,
        size: { x: 130, y: undefined },
        children: [
          text(category, { fontSize: 12, fontWeight: 500, color: '#ffffff' }),
        ],
      }),
      text(title, {
        fontSize: 15,
        fontWeight: 500,
        color: '#1a365d',
        size: { x: 800 },
        textAutoResize: 'HEIGHT',
        lineHeight: { value: 160, unit: 'PERCENT' },
      }),
    ],
  });
}

// ── Pagination helper ───────────────────────────────────────

function pageBtn(label: string, active: boolean) {
  return frame(`Page-${label}`, {
    size: { x: 40, y: 40 },
    autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: active ? [solid('#1a365d')] : [solid('#ffffff')],
    cornerRadius: 4,
    strokes: active ? [] : [{ color: hex('#d1d5db'), weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 14, fontWeight: active ? 600 : 400, color: active ? '#ffffff' : '#4b5563' }),
    ],
  });
}

// ── Main page ──────────────────────────────────────────────

export default frame('NewsPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Navigation
    navbar(),

    // Page Title Section
    frame('PageTitleSection', {
      size: { x: 1440, y: 200 },
      autoLayout: vertical({ spacing: 12, padX: 80, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid('#f0f4f8')],
      children: [
        text('ニュースリリース', { fontSize: 36, fontWeight: 700, color: '#1a365d' }),
        text('News Release', { fontSize: 16, fontWeight: 400, color: '#64748b', letterSpacing: { value: 200, unit: 'PERCENT' } }),
      ],
    }),

    // Breadcrumb
    frame('Breadcrumb', {
      size: { x: 1440, y: undefined },
      autoLayout: horizontal({ spacing: 8, padX: 80, padY: 16 }),
      fills: [solid('#f8fafc')],
      children: [
        text('ホーム', { fontSize: 12, color: '#2563eb' }),
        text('>', { fontSize: 12, color: '#94a3b8' }),
        text('ニュースリリース', { fontSize: 12, color: '#64748b' }),
      ],
    }),

    // Content Area
    frame('ContentArea', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 40, padX: 80, padY: 60 }),
      fills: [solid('#ffffff')],
      children: [
        // Category filter tabs
        frame('CategoryTabs', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            categoryTab('すべて', true),
            categoryTab('プレスリリース', false),
            categoryTab('お知らせ', false),
            categoryTab('IR', false),
          ],
        }),

        // Year filter
        frame('YearFilter', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            text('年度で絞り込み：', { fontSize: 14, fontWeight: 500, color: '#374151' }),
            frame('YearSelect', {
              autoLayout: horizontal({ padX: 16, padY: 8, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              size: { x: 160, y: 40 },
              fills: [solid('#ffffff')],
              cornerRadius: 4,
              strokes: [{ color: hex('#d1d5db'), weight: 1, align: 'INSIDE' }],
              children: [
                text('2026年', { fontSize: 14, color: '#374151' }),
                text('▼', { fontSize: 12, color: '#9ca3af' }),
              ],
            }),
          ],
        }),

        // News list
        frame('NewsList', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            newsItem('2026.03.10', 'プレスリリース', '#2563eb',
              '次世代AIプラットフォーム「TechnoAI 3.0」の提供を開始 — エンタープライズ向け生成AI機能を大幅に強化'),
            newsItem('2026.03.05', 'お知らせ', '#059669',
              '東京本社移転のお知らせ — 2026年4月より丸の内新オフィスにて営業開始'),
            newsItem('2026.02.28', 'IR', '#d97706',
              '2025年度 第3四半期決算報告 — 売上高前年同期比15%増、営業利益率12.3%を達成'),
            newsItem('2026.02.20', 'プレスリリース', '#2563eb',
              'グローバルパートナーシップ拡大のお知らせ — 欧州3カ国のIT企業と戦略的提携を締結'),
            newsItem('2026.02.15', 'お知らせ', '#059669',
              '「第15回 日本IT技術大賞」にて最優秀イノベーション賞を受賞'),
            newsItem('2026.02.01', 'プレスリリース', '#2563eb',
              'IoTセキュリティソリューション「SecureEdge」の新バージョンをリリース — ゼロトラスト対応を強化'),
          ],
        }),

        // Pagination
        frame('Pagination', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('PrevBtn', {
              size: { x: 80, y: 40 },
              autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#ffffff')],
              cornerRadius: 4,
              strokes: [{ color: hex('#d1d5db'), weight: 1, align: 'INSIDE' }],
              children: [
                text('< 前へ', { fontSize: 14, color: '#6b7280' }),
              ],
            }),
            pageBtn('1', true),
            pageBtn('2', false),
            pageBtn('3', false),
            pageBtn('4', false),
            pageBtn('5', false),
            frame('NextBtn', {
              size: { x: 80, y: 40 },
              autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#ffffff')],
              cornerRadius: 4,
              strokes: [{ color: hex('#d1d5db'), weight: 1, align: 'INSIDE' }],
              children: [
                text('次へ >', { fontSize: 14, color: '#6b7280' }),
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
