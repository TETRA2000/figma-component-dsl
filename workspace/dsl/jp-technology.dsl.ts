/**
 * 技術紹介 (Technology) — Japanese corporate technology page
 */
import {
  frame, text, rectangle, image,
  solid, hex, imageFill, gradient,
  horizontal, vertical,
  statBlock,
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

// ── Technology area card helper ──────────────────────────────

function techAreaCard(
  iconSrc: string,
  title: string,
  description: string,
  highlights: string[],
) {
  return frame(`TechArea-${title}`, {
    size: { x: 280, y: undefined },
    autoLayout: vertical({ spacing: 20, padX: 28, padY: 32, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
    children: [
      image(`Icon-${title}`, { src: iconSrc, size: { x: 64, y: 64 } }),
      text(title, { fontSize: 20, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, color: '#4b5563',
        size: { x: 224 }, textAutoResize: 'HEIGHT',
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
      }),
      rectangle(`Divider-${title}`, {
        size: { x: 1, y: 1 },
        fills: [solid('#e5e7eb')],
        layoutSizingHorizontal: 'FILL',
      }),
      frame(`Highlights-${title}`, {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: highlights.map((h, i) =>
          text(`・${h}`, {
            fontSize: 13, color: '#6b7280',
            size: { x: 224 }, textAutoResize: 'HEIGHT',
            lineHeight: { value: 170, unit: 'PERCENT' },
          }),
        ),
      }),
    ],
  });
}

// ── Main page ──────────────────────────────────────────────

export default frame('TechnologyPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Navigation
    navbar(),

    // Hero Section
    frame('Hero', {
      size: { x: 1440, y: 400 },
      fills: [
        imageFill('./workspace/assets/hero-tech.png'),
        gradient([
          { hex: '#1a365d00', position: 0 },
          { hex: '#1a365ddd', position: 1 },
        ], 270),
      ],
      autoLayout: vertical({ spacing: 16, padX: 120, padY: 0, align: 'MAX', counterAlign: 'MIN' }),
      clipContent: true,
      children: [
        text('Technology', { fontSize: 16, fontWeight: 500, color: '#93c5fd', letterSpacing: { value: 300, unit: 'PERCENT' } }),
        text('最先端の技術力で社会に貢献', { fontSize: 42, fontWeight: 700, color: '#ffffff' }),
        text('研究開発から実用化まで、一貫した技術力でイノベーションを創出します。', {
          fontSize: 18, color: '#cbd5e1',
          size: { x: 600 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 170, unit: 'PERCENT' },
        }),
        rectangle('HeroSpacer', { size: { x: 1, y: 48 }, opacity: 0 }),
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
        text('技術紹介', { fontSize: 12, color: '#64748b' }),
      ],
    }),

    // R&D Philosophy Section
    frame('RDPhilosophy', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      children: [
        text('研究開発の理念', { fontSize: 32, fontWeight: 700, color: '#1a365d' }),
        rectangle('PhilosophyUnderline', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),
        text('「技術は人のために」— この信念のもと、私たちは社会課題の解決に直結する\n研究開発に注力しています。基礎研究から応用開発、そして実用化まで、\n一貫した技術プロセスで革新的なソリューションを創出しています。', {
          fontSize: 16, color: '#4b5563',
          size: { x: 800 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 200, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),

        // Philosophy pillars
        frame('PhilosophyPillars', {
          autoLayout: horizontal({ spacing: 40 }),
          children: [
            frame('Pillar1', {
              autoLayout: vertical({ spacing: 8, padX: 32, padY: 24, counterAlign: 'CENTER' }),
              size: { x: 350, y: undefined },
              fills: [solid('#f0f4f8')],
              cornerRadius: 8,
              children: [
                text('01', { fontSize: 32, fontWeight: 700, color: '#2563eb' }),
                text('基礎研究', { fontSize: 18, fontWeight: 700, color: '#1a365d' }),
                text('最先端の学術研究と連携し、次世代技術の基盤を構築します。', {
                  fontSize: 14, color: '#4b5563',
                  size: { x: 286 }, textAutoResize: 'HEIGHT',
                  lineHeight: { value: 180, unit: 'PERCENT' },
                  textAlignHorizontal: 'CENTER',
                }),
              ],
            }),
            frame('Pillar2', {
              autoLayout: vertical({ spacing: 8, padX: 32, padY: 24, counterAlign: 'CENTER' }),
              size: { x: 350, y: undefined },
              fills: [solid('#f0f4f8')],
              cornerRadius: 8,
              children: [
                text('02', { fontSize: 32, fontWeight: 700, color: '#2563eb' }),
                text('応用開発', { fontSize: 18, fontWeight: 700, color: '#1a365d' }),
                text('研究成果を実用的な技術へと昇華させ、製品開発に活かします。', {
                  fontSize: 14, color: '#4b5563',
                  size: { x: 286 }, textAutoResize: 'HEIGHT',
                  lineHeight: { value: 180, unit: 'PERCENT' },
                  textAlignHorizontal: 'CENTER',
                }),
              ],
            }),
            frame('Pillar3', {
              autoLayout: vertical({ spacing: 8, padX: 32, padY: 24, counterAlign: 'CENTER' }),
              size: { x: 350, y: undefined },
              fills: [solid('#f0f4f8')],
              cornerRadius: 8,
              children: [
                text('03', { fontSize: 32, fontWeight: 700, color: '#2563eb' }),
                text('社会実装', { fontSize: 18, fontWeight: 700, color: '#1a365d' }),
                text('開発した技術を社会に届け、人々の暮らしに価値を創造します。', {
                  fontSize: 14, color: '#4b5563',
                  size: { x: 286 }, textAutoResize: 'HEIGHT',
                  lineHeight: { value: 180, unit: 'PERCENT' },
                  textAlignHorizontal: 'CENTER',
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Technology Areas Section
    frame('TechAreas', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 48, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      fills: [solid('#f5f5f5')],
      children: [
        text('注力技術領域', { fontSize: 32, fontWeight: 700, color: '#1a365d' }),
        rectangle('AreasUnderline', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),

        frame('TechAreaCards', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            techAreaCard(
              './workspace/assets/icon-innovation.png',
              'AI・機械学習',
              '深層学習と自然言語処理を中核とした次世代AI技術の研究開発。',
              ['大規模言語モデル', '画像認識・生成', '予測分析エンジン'],
            ),
            techAreaCard(
              './workspace/assets/icon-global.png',
              'IoT・エッジ',
              'エッジコンピューティングとIoTプラットフォームの開発。',
              ['リアルタイム処理', 'センサーフュージョン', 'デバイス管理基盤'],
            ),
            techAreaCard(
              './workspace/assets/icon-quality.png',
              'クラウド基盤',
              'スケーラブルなクラウドネイティブ技術の研究と実装。',
              ['マイクロサービス', 'コンテナオーケストレーション', 'サーバーレス'],
            ),
            techAreaCard(
              './workspace/assets/icon-security.png',
              'セキュリティ',
              'ゼロトラストセキュリティと暗号技術の最前線。',
              ['ゼロトラスト', '耐量子暗号', '脅威インテリジェンス'],
            ),
          ],
        }),
      ],
    }),

    // Research Achievements Section
    frame('Achievements', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 48, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      children: [
        text('研究開発実績', { fontSize: 32, fontWeight: 700, color: '#1a365d' }),
        rectangle('AchievementsUnderline', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),

        frame('StatsRow', {
          autoLayout: horizontal({ spacing: 60 }),
          children: [
            statBlock('150+', '取得特許数', { valueColor: '#2563eb' }),
            statBlock('85名', '研究開発人員', { valueColor: '#2563eb' }),
            statBlock('12億円', '年間R&D投資額', { valueColor: '#2563eb' }),
            statBlock('40+', '学術論文発表数', { valueColor: '#2563eb' }),
          ],
        }),

        // Recent achievements list
        frame('AchievementsList', {
          autoLayout: vertical({ spacing: 16, padX: 40, padY: 32 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#f8fafc')],
          cornerRadius: 12,
          children: [
            text('主な研究成果', { fontSize: 20, fontWeight: 700, color: '#1a365d' }),
            rectangle('ListDivider', {
              size: { x: 1, y: 1 },
              fills: [solid('#e2e8f0')],
              layoutSizingHorizontal: 'FILL',
            }),
            text('・大規模言語モデルの省メモリ推論技術で国際学会ベストペーパー賞を受賞（2025年）', {
              fontSize: 14, color: '#4b5563',
              size: { x: 1000 }, textAutoResize: 'HEIGHT',
              lineHeight: { value: 180, unit: 'PERCENT' },
            }),
            text('・エッジデバイス向け軽量暗号アルゴリズムの開発と標準化提案（2025年）', {
              fontSize: 14, color: '#4b5563',
              size: { x: 1000 }, textAutoResize: 'HEIGHT',
              lineHeight: { value: 180, unit: 'PERCENT' },
            }),
            text('・自律型IoTセンサーネットワークの実証実験に成功（2026年）', {
              fontSize: 14, color: '#4b5563',
              size: { x: 1000 }, textAutoResize: 'HEIGHT',
              lineHeight: { value: 180, unit: 'PERCENT' },
            }),
            text('・量子耐性暗号を用いたゼロトラストアーキテクチャの特許取得（2026年）', {
              fontSize: 14, color: '#4b5563',
              size: { x: 1000 }, textAutoResize: 'HEIGHT',
              lineHeight: { value: 180, unit: 'PERCENT' },
            }),
          ],
        }),
      ],
    }),

    // Footer
    footer(),
  ],
});
