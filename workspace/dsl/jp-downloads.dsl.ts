/**
 * jp-downloads.dsl.ts — 資料ダウンロード (Downloads/Resource Center)
 * Japanese corporate downloads page with category tabs and resource cards.
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

function categoryTab(label: string, active: boolean) {
  return frame(`Tab-${label}`, {
    autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: active ? [solid('#2563eb')] : [solid('#ffffff')],
    cornerRadius: 4,
    strokes: active ? [] : [{ color: hex('#d1d5db'), weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, {
        fontSize: 15,
        fontWeight: active ? 700 : 500,
        color: active ? '#ffffff' : '#374151',
      }),
    ],
  });
}

function documentIcon(format: string) {
  return frame('DocIcon', {
    size: { x: 64, y: 64 },
    autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid('#eff6ff')],
    cornerRadius: 8,
    children: [
      text(format, { fontSize: 14, fontWeight: 700, color: '#2563eb' }),
    ],
  });
}

function resourceCard(title: string, description: string, fileSize: string, category: string) {
  return frame(`Resource-${title.slice(0, 15)}`, {
    size: { x: 380, y: undefined },
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('CardHeader', {
        autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          documentIcon('PDF'),
          frame('CardMeta', {
            autoLayout: vertical({ spacing: 4 }),
            children: [
              frame('CategoryBadge', {
                autoLayout: horizontal({ padX: 10, padY: 3 }),
                fills: [solid('#eff6ff')],
                cornerRadius: 999,
                children: [
                  text(category, { fontSize: 11, fontWeight: 600, color: '#2563eb' }),
                ],
              }),
              text(fileSize, { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
            ],
          }),
        ],
      }),
      text(title, {
        fontSize: 16, fontWeight: 700, color: '#1a365d',
        size: { x: 332 }, textAutoResize: 'HEIGHT',
        lineHeight: { value: 150, unit: 'PERCENT' },
      }),
      text(description, {
        fontSize: 13, fontWeight: 400, color: '#6b7280',
        size: { x: 332 }, textAutoResize: 'HEIGHT',
        lineHeight: { value: 170, unit: 'PERCENT' },
      }),
      frame('DownloadBtn', {
        autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#1a365d')],
        cornerRadius: 4,
        layoutSizingHorizontal: 'FILL',
        children: [
          text('ダウンロード', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
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

export default frame('DownloadsPage', {
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
        text('資料ダウンロード', { fontSize: 36, fontWeight: 800, color: '#ffffff' }),
        text('製品カタログ、技術資料、ホワイトペーパーなど各種資料をダウンロードいただけます。', {
          fontSize: 16, fontWeight: 400, color: '#cbd5e1',
          textAlignHorizontal: 'CENTER',
          size: { x: 700 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 170, unit: 'PERCENT' },
        }),
      ],
    }),

    // Category Tabs
    frame('CategoryTabs', {
      size: { x: 1440, y: undefined },
      autoLayout: horizontal({ spacing: 12, padX: 80, padY: 32, counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
      children: [
        categoryTab('製品カタログ', true),
        categoryTab('技術資料', false),
        categoryTab('ホワイトペーパー', false),
      ],
    }),

    // Resource Cards Grid
    frame('ResourceGrid', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 48 }),
      children: [
        frame('Row1', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            resourceCard(
              '統合ソリューション 製品カタログ 2024',
              '当社の主力製品ラインアップを網羅した総合カタログです。製品仕様、導入事例、価格体系をご確認いただけます。',
              'PDF / 12.5 MB',
              '製品カタログ',
            ),
            resourceCard(
              'クラウドプラットフォーム技術概要',
              'クラウドプラットフォームのアーキテクチャ、セキュリティ機能、スケーラビリティについて解説しています。',
              'PDF / 8.2 MB',
              '技術資料',
            ),
            resourceCard(
              'DX推進ガイドブック',
              'デジタルトランスフォーメーションの戦略立案から実行までを解説。業界別の成功事例も収録。',
              'PDF / 15.3 MB',
              'ホワイトペーパー',
            ),
          ],
        }),
        frame('Row2', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            resourceCard(
              'IoTソリューション導入ガイド',
              'IoTプラットフォームの導入手順、システム要件、運用ベストプラクティスを詳説しています。',
              'PDF / 6.8 MB',
              '技術資料',
            ),
            resourceCard(
              'サイバーセキュリティ白書 2024',
              '最新のサイバーセキュリティ脅威動向と当社の対策ソリューションについてまとめた資料です。',
              'PDF / 10.1 MB',
              'ホワイトペーパー',
            ),
            resourceCard(
              'AI・機械学習製品カタログ',
              'AI関連製品のラインアップ、活用シーン、導入ステップをわかりやすくまとめました。',
              'PDF / 9.4 MB',
              '製品カタログ',
            ),
          ],
        }),
      ],
    }),

    // CTA Section
    frame('CTASection', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 64, counterAlign: 'CENTER' }),
      fills: [solid('#2563eb')],
      children: [
        text('お探しの資料が見つかりませんか？', { fontSize: 28, fontWeight: 700, color: '#ffffff' }),
        text('お気軽にお問い合わせください。専任スタッフが最適な資料をご案内いたします。', {
          fontSize: 16, color: '#dbeafe',
          textAlignHorizontal: 'CENTER',
          size: { x: 600 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 170, unit: 'PERCENT' },
        }),
        frame('CTAButton', {
          autoLayout: horizontal({ padX: 40, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 4,
          children: [
            text('お問い合わせはこちら', { fontSize: 16, fontWeight: 700, color: '#2563eb' }),
          ],
        }),
      ],
    }),

    // Footer
    footer(),
  ],
});
