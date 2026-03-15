/**
 * jp-group.dsl.ts — グループ企業 (Group Companies)
 * Japanese corporate group companies page with subsidiary cards and global presence.
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

function subsidiaryCard(
  name: string,
  enName: string,
  description: string,
  location: string,
  employees: string,
  business: string,
  iconSrc: string,
) {
  return frame(`Subsidiary-${name}`, {
    size: { x: 580, y: undefined },
    autoLayout: vertical({ spacing: 20, padX: 32, padY: 32 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('CardTop', {
        autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          image(`Icon-${name}`, { src: iconSrc, size: { x: 56, y: 56 }, cornerRadius: 12 }),
          frame('CardTitle', {
            autoLayout: vertical({ spacing: 4 }),
            children: [
              text(name, { fontSize: 20, fontWeight: 700, color: '#1a365d' }),
              text(enName, { fontSize: 12, fontWeight: 400, color: '#9ca3af', letterSpacing: { value: 100, unit: 'PERCENT' } }),
            ],
          }),
        ],
      }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#4b5563',
        size: { x: 516 }, textAutoResize: 'HEIGHT',
        lineHeight: { value: 180, unit: 'PERCENT' },
      }),
      rectangle('CardDivider', { size: { x: 1, y: 1 }, fills: [solid('#e5e7eb')], layoutSizingHorizontal: 'FILL' }),
      frame('CardDetails', {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('DetailRow-loc', {
            autoLayout: horizontal({ spacing: 12 }),
            children: [
              text('所在地', { fontSize: 13, fontWeight: 600, color: '#1a365d', size: { x: 80 }, textAutoResize: 'HEIGHT' }),
              text(location, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            ],
          }),
          frame('DetailRow-emp', {
            autoLayout: horizontal({ spacing: 12 }),
            children: [
              text('従業員数', { fontSize: 13, fontWeight: 600, color: '#1a365d', size: { x: 80 }, textAutoResize: 'HEIGHT' }),
              text(employees, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            ],
          }),
          frame('DetailRow-biz', {
            autoLayout: horizontal({ spacing: 12 }),
            children: [
              text('主要事業', { fontSize: 13, fontWeight: 600, color: '#1a365d', size: { x: 80 }, textAutoResize: 'HEIGHT' }),
              text(business, { fontSize: 13, fontWeight: 400, color: '#6b7280', size: { x: 400 }, textAutoResize: 'HEIGHT', lineHeight: { value: 160, unit: 'PERCENT' } }),
            ],
          }),
        ],
      }),
    ],
  });
}

function regionCard(region: string, countries: string, offices: string) {
  return frame(`Region-${region}`, {
    size: { x: 280, y: undefined },
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 24, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('RegionIcon', {
        size: { x: 48, y: 48 },
        autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#eff6ff')],
        cornerRadius: 24,
        children: [
          text('🌐', { fontSize: 20 }),
        ],
      }),
      text(region, { fontSize: 18, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
      text(countries, {
        fontSize: 13, fontWeight: 400, color: '#6b7280',
        textAlignHorizontal: 'CENTER',
        size: { x: 232 }, textAutoResize: 'HEIGHT',
        lineHeight: { value: 170, unit: 'PERCENT' },
      }),
      frame('OfficeBadge', {
        autoLayout: horizontal({ padX: 12, padY: 4 }),
        fills: [solid('#eff6ff')],
        cornerRadius: 999,
        children: [
          text(offices, { fontSize: 12, fontWeight: 600, color: '#2563eb' }),
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
              text('グループ企業', { fontSize: 13, color: '#94a3b8' }),
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

export default frame('GroupCompaniesPage', {
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
        text('グループ企業', { fontSize: 36, fontWeight: 800, color: '#ffffff' }),
        text('テクノコーポレーショングループの企業一覧と事業領域をご紹介します。', {
          fontSize: 16, fontWeight: 400, color: '#cbd5e1',
          textAlignHorizontal: 'CENTER',
          size: { x: 700 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 170, unit: 'PERCENT' },
        }),
      ],
    }),

    // Group Structure Overview
    frame('GroupOverview', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 64, counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      children: [
        frame('OverviewHeader', {
          autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('グループ体制', { fontSize: 28, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
            rectangle('OverviewAccent', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),
          ],
        }),
        text('テクノコーポレーショングループは、持株会社である株式会社テクノコーポレーションを中心に、国内外の関連企業で構成されています。各社が専門分野の強みを活かし、グループシナジーを最大化することで、お客様に包括的なソリューションを提供しています。', {
          fontSize: 15, fontWeight: 400, color: '#4b5563',
          size: { x: 900 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 200, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),
        // Group structure diagram placeholder
        frame('StructureDiagram', {
          autoLayout: vertical({ spacing: 16, padX: 40, padY: 32, counterAlign: 'CENTER' }),
          fills: [solid('#f8fafc')],
          cornerRadius: 12,
          strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
          children: [
            frame('ParentCompany', {
              autoLayout: horizontal({ padX: 32, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#1a365d')],
              cornerRadius: 8,
              children: [
                text('株式会社テクノコーポレーション（持株会社）', { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
              ],
            }),
            rectangle('ConnectorLine', { size: { x: 2, y: 24 }, fills: [solid('#d1d5db')] }),
            frame('SubsidiaryList', {
              autoLayout: horizontal({ spacing: 16 }),
              children: [
                frame('Sub1', {
                  autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#eff6ff')],
                  cornerRadius: 6,
                  strokes: [{ color: hex('#bfdbfe'), weight: 1, align: 'INSIDE' as const }],
                  children: [text('テクノシステムズ', { fontSize: 13, fontWeight: 600, color: '#1a365d' })],
                }),
                frame('Sub2', {
                  autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#eff6ff')],
                  cornerRadius: 6,
                  strokes: [{ color: hex('#bfdbfe'), weight: 1, align: 'INSIDE' as const }],
                  children: [text('テクノクラウド', { fontSize: 13, fontWeight: 600, color: '#1a365d' })],
                }),
                frame('Sub3', {
                  autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#eff6ff')],
                  cornerRadius: 6,
                  strokes: [{ color: hex('#bfdbfe'), weight: 1, align: 'INSIDE' as const }],
                  children: [text('テクノグローバル', { fontSize: 13, fontWeight: 600, color: '#1a365d' })],
                }),
                frame('Sub4', {
                  autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#eff6ff')],
                  cornerRadius: 6,
                  strokes: [{ color: hex('#bfdbfe'), weight: 1, align: 'INSIDE' as const }],
                  children: [text('テクノリサーチ', { fontSize: 13, fontWeight: 600, color: '#1a365d' })],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Subsidiary Cards
    frame('SubsidiaryCards', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 56 }),
      children: [
        frame('SectionTitle', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            rectangle('TitleAccent', { size: { x: 4, y: 28 }, fills: [solid('#2563eb')], cornerRadius: 2 }),
            text('グループ企業一覧', { fontSize: 24, fontWeight: 700, color: '#1a365d' }),
          ],
        }),
        frame('CardsRow1', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            subsidiaryCard(
              'テクノシステムズ株式会社',
              'Techno Systems Co., Ltd.',
              'システムインテグレーション、基幹業務システムの設計・開発・運用保守を担当するグループの中核事業会社。金融、製造、流通業界に強みを持ち、大規模プロジェクトの実績多数。',
              '東京都港区',
              '3,200名',
              'SI、業務システム開発、ITコンサルティング',
              './workspace/assets/icon-innovation.png',
            ),
            subsidiaryCard(
              'テクノクラウド株式会社',
              'Techno Cloud Co., Ltd.',
              '自社開発クラウドプラットフォーム「TechnoCloud」の企画・開発・運用を行う。SaaS、PaaS、IaaSの各レイヤーで包括的なクラウドサービスを提供。',
              '東京都渋谷区',
              '1,800名',
              'クラウドサービス、データセンター運用',
              './workspace/assets/icon-global.png',
            ),
          ],
        }),
        frame('CardsRow2', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            subsidiaryCard(
              'テクノグローバル株式会社',
              'Techno Global Co., Ltd.',
              '海外拠点の統括および国際事業展開を担う。アジア太平洋地域を中心に15カ国で事業を展開し、グローバルプロジェクトのマネジメントを実施。',
              'シンガポール',
              '2,500名',
              '海外事業統括、グローバルSI、オフショア開発',
              './workspace/assets/icon-trust.png',
            ),
            subsidiaryCard(
              'テクノリサーチ株式会社',
              'Techno Research Co., Ltd.',
              'AI、IoT、ブロックチェーンなど先端技術の研究開発を推進。産学連携プロジェクトや特許取得にも積極的に取り組み、グループの技術革新を牽引。',
              '名古屋市中村区',
              '450名',
              'AI研究、IoT開発、先端技術R&D',
              './workspace/assets/icon-quality.png',
            ),
          ],
        }),
      ],
    }),

    // Global Presence Section
    frame('GlobalPresence', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 40, padX: 80, padY: 64, counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      children: [
        frame('PresenceHeader', {
          autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('グローバル展開', { fontSize: 28, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
            rectangle('PresenceAccent', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),
            text('世界15カ国に拠点を展開し、グローバルなサービスネットワークを構築しています。', {
              fontSize: 15, fontWeight: 400, color: '#6b7280',
              textAlignHorizontal: 'CENTER',
              size: { x: 600 }, textAutoResize: 'HEIGHT',
              lineHeight: { value: 170, unit: 'PERCENT' },
            }),
          ],
        }),
        image('MapJapan', { src: './workspace/assets/map-japan.png', size: { x: 800, y: 500 }, cornerRadius: 12 }),
        frame('RegionCards', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            regionCard('日本', '東京、大阪、名古屋、福岡、札幌', '国内拠点 12カ所'),
            regionCard('東アジア', '中国、韓国、台湾', '海外拠点 5カ所'),
            regionCard('東南アジア', 'シンガポール、タイ、ベトナム、インドネシア', '海外拠点 6カ所'),
            regionCard('欧米', 'アメリカ、イギリス、ドイツ', '海外拠点 4カ所'),
          ],
        }),
      ],
    }),

    // Footer
    footer(),
  ],
});
