/**
 * CSR・サステナビリティ (CSR/Sustainability) — Japanese corporate CSR page
 */
import {
  frame, text, rectangle, image,
  solid, hex, imageFill, gradient,
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

// ── Initiative card helper ──────────────────────────────────

function initiativeCard(
  title: string,
  subtitle: string,
  description: string,
  items: string[],
  accentColor: string,
) {
  return frame(`Initiative-${title}`, {
    size: { x: 390, y: undefined },
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
    clipContent: true,
    children: [
      // Card image area with color accent
      frame(`ImgArea-${title}`, {
        size: { x: 390, y: 200 },
        fills: [imageFill('./workspace/assets/csr-activity.png')],
        autoLayout: vertical({ spacing: 0, padX: 0, padY: 0, align: 'MAX' }),
        clipContent: true,
        children: [
          // Color accent bar at bottom
          rectangle(`Accent-${title}`, {
            size: { x: 390, y: 4 },
            fills: [solid(accentColor)],
            layoutSizingHorizontal: 'FILL',
          }),
        ],
      }),
      // Card content
      frame(`CardContent-${title}`, {
        autoLayout: vertical({ spacing: 16, padX: 28, padY: 28 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(subtitle, { fontSize: 12, fontWeight: 500, color: accentColor, letterSpacing: { value: 100, unit: 'PERCENT' } }),
          text(title, { fontSize: 22, fontWeight: 700, color: '#1a365d' }),
          text(description, {
            fontSize: 14, color: '#4b5563',
            size: { x: 334 }, textAutoResize: 'HEIGHT',
            lineHeight: { value: 180, unit: 'PERCENT' },
          }),
          rectangle(`CardDivider-${title}`, {
            size: { x: 1, y: 1 },
            fills: [solid('#e5e7eb')],
            layoutSizingHorizontal: 'FILL',
          }),
          frame(`Items-${title}`, {
            autoLayout: vertical({ spacing: 10 }),
            layoutSizingHorizontal: 'FILL',
            children: items.map((item, i) =>
              text(`・${item}`, {
                fontSize: 13, color: '#6b7280',
                size: { x: 334 }, textAutoResize: 'HEIGHT',
                lineHeight: { value: 170, unit: 'PERCENT' },
              }),
            ),
          }),
        ],
      }),
    ],
  });
}

// ── Main page ──────────────────────────────────────────────

export default frame('CSRPage', {
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
        imageFill('./workspace/assets/hero-csr.png'),
        gradient([
          { hex: '#0f766e00', position: 0 },
          { hex: '#0f766ecc', position: 1 },
        ], 270),
      ],
      autoLayout: vertical({ spacing: 16, padX: 120, padY: 0, align: 'MAX', counterAlign: 'MIN' }),
      clipContent: true,
      children: [
        text('CSR / Sustainability', { fontSize: 16, fontWeight: 500, color: '#99f6e4', letterSpacing: { value: 300, unit: 'PERCENT' } }),
        text('持続可能な社会の実現に向けて', { fontSize: 42, fontWeight: 700, color: '#ffffff' }),
        text('テクノコーポレーションは、事業活動を通じて社会課題の解決に貢献し、\nすべてのステークホルダーとともに持続可能な未来を創造します。', {
          fontSize: 18, color: '#ccfbf1',
          size: { x: 700 }, textAutoResize: 'HEIGHT',
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
        text('CSR・サステナビリティ', { fontSize: 12, color: '#64748b' }),
      ],
    }),

    // CSR Philosophy Section
    frame('CSRPhilosophy', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      children: [
        text('CSR基本方針', { fontSize: 32, fontWeight: 700, color: '#1a365d' }),
        rectangle('PhilosophyUnderline', { size: { x: 60, y: 3 }, fills: [solid('#0d9488')] }),
        text('私たちは、企業市民として社会的責任を果たし、\n事業を通じて持続可能な社会の実現に貢献することを基本方針としています。\n環境・社会・ガバナンス（ESG）の各領域において、\n具体的な目標を設定し、着実に取り組みを進めています。', {
          fontSize: 16, color: '#4b5563',
          size: { x: 800 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 200, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),

        // Key metrics
        frame('CSRMetrics', {
          autoLayout: horizontal({ spacing: 48, counterAlign: 'CENTER' }),
          children: [
            frame('Metric1', {
              autoLayout: vertical({ spacing: 4, padX: 32, padY: 20, counterAlign: 'CENTER' }),
              fills: [solid('#f0fdf4')],
              cornerRadius: 8,
              children: [
                text('2030年', { fontSize: 14, fontWeight: 500, color: '#059669' }),
                text('カーボンニュートラル', { fontSize: 16, fontWeight: 700, color: '#1a365d' }),
                text('達成目標', { fontSize: 13, color: '#6b7280' }),
              ],
            }),
            frame('Metric2', {
              autoLayout: vertical({ spacing: 4, padX: 32, padY: 20, counterAlign: 'CENTER' }),
              fills: [solid('#eff6ff')],
              cornerRadius: 8,
              children: [
                text('30%', { fontSize: 28, fontWeight: 700, color: '#2563eb' }),
                text('女性管理職比率', { fontSize: 13, color: '#6b7280' }),
                text('（2025年度実績）', { fontSize: 12, color: '#94a3b8' }),
              ],
            }),
            frame('Metric3', {
              autoLayout: vertical({ spacing: 4, padX: 32, padY: 20, counterAlign: 'CENTER' }),
              fills: [solid('#fef3c7')],
              cornerRadius: 8,
              children: [
                text('100%', { fontSize: 28, fontWeight: 700, color: '#d97706' }),
                text('再生可能エネルギー', { fontSize: 13, color: '#6b7280' }),
                text('（本社電力）', { fontSize: 12, color: '#94a3b8' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Initiative Cards Section
    frame('InitiativesSection', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 48, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      fills: [solid('#f5f5f5')],
      children: [
        text('重点取り組み', { fontSize: 32, fontWeight: 700, color: '#1a365d' }),
        rectangle('InitiativesUnderline', { size: { x: 60, y: 3 }, fills: [solid('#0d9488')] }),

        frame('InitiativeCards', {
          autoLayout: horizontal({ spacing: 28 }),
          children: [
            initiativeCard(
              '環境',
              'Environment',
              '気候変動への対応と環境負荷低減に向けた取り組みを推進しています。',
              ['CO2排出量50%削減（2020年比）', '廃棄物リサイクル率95%達成', 'グリーンITソリューションの開発'],
              '#059669',
            ),
            initiativeCard(
              '社会',
              'Social',
              '多様性の尊重と地域社会への貢献を通じ、豊かな社会づくりに取り組んでいます。',
              ['ダイバーシティ推進プログラム', 'STEM教育支援活動', '地域ボランティア活動の推進'],
              '#2563eb',
            ),
            initiativeCard(
              'ガバナンス',
              'Governance',
              '透明性の高い経営と健全なコーポレートガバナンスを実践しています。',
              ['独立社外取締役の過半数確保', 'コンプライアンス研修100%受講', 'リスク管理委員会の定期開催'],
              '#7c3aed',
            ),
          ],
        }),
      ],
    }),

    // SDGs Commitment Section
    frame('SDGsSection', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 40, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      children: [
        text('SDGsへの取り組み', { fontSize: 32, fontWeight: 700, color: '#1a365d' }),
        rectangle('SDGsUnderline', { size: { x: 60, y: 3 }, fills: [solid('#0d9488')] }),
        text('私たちは国連が定める持続可能な開発目標（SDGs）に賛同し、\n事業活動を通じて17の目標の達成に貢献しています。', {
          fontSize: 16, color: '#4b5563',
          size: { x: 800 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 200, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),

        // SDGs priority goals
        frame('SDGsGoals', {
          autoLayout: vertical({ spacing: 24, padX: 40, padY: 40 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#f8fafc')],
          cornerRadius: 12,
          children: [
            text('特に注力する目標', { fontSize: 20, fontWeight: 700, color: '#1a365d' }),
            rectangle('GoalsDivider', {
              size: { x: 1, y: 1 },
              fills: [solid('#e2e8f0')],
              layoutSizingHorizontal: 'FILL',
            }),

            frame('GoalRow1', {
              autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('Goal7', {
                  size: { x: 56, y: 56 },
                  autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#fbbf24')],
                  cornerRadius: 8,
                  children: [
                    text('7', { fontSize: 24, fontWeight: 700, color: '#ffffff' }),
                  ],
                }),
                frame('Goal7Desc', {
                  autoLayout: vertical({ spacing: 4 }),
                  size: { x: 900, y: undefined },
                  children: [
                    text('目標7：エネルギーをみんなにそしてクリーンに', { fontSize: 16, fontWeight: 600, color: '#1a365d' }),
                    text('データセンターの再生可能エネルギー利用率100%を目指し、省エネルギー技術の研究開発を推進しています。', {
                      fontSize: 14, color: '#4b5563',
                      size: { x: 900 }, textAutoResize: 'HEIGHT',
                      lineHeight: { value: 170, unit: 'PERCENT' },
                    }),
                  ],
                }),
              ],
            }),

            frame('GoalRow2', {
              autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('Goal9', {
                  size: { x: 56, y: 56 },
                  autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#f97316')],
                  cornerRadius: 8,
                  children: [
                    text('9', { fontSize: 24, fontWeight: 700, color: '#ffffff' }),
                  ],
                }),
                frame('Goal9Desc', {
                  autoLayout: vertical({ spacing: 4 }),
                  size: { x: 900, y: undefined },
                  children: [
                    text('目標9：産業と技術革新の基盤をつくろう', { fontSize: 16, fontWeight: 600, color: '#1a365d' }),
                    text('AI・IoT技術を活用したインフラ高度化と、中小企業のDX推進を支援するプログラムを展開しています。', {
                      fontSize: 14, color: '#4b5563',
                      size: { x: 900 }, textAutoResize: 'HEIGHT',
                      lineHeight: { value: 170, unit: 'PERCENT' },
                    }),
                  ],
                }),
              ],
            }),

            frame('GoalRow3', {
              autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('Goal13', {
                  size: { x: 56, y: 56 },
                  autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#047857')],
                  cornerRadius: 8,
                  children: [
                    text('13', { fontSize: 22, fontWeight: 700, color: '#ffffff' }),
                  ],
                }),
                frame('Goal13Desc', {
                  autoLayout: vertical({ spacing: 4 }),
                  size: { x: 900, y: undefined },
                  children: [
                    text('目標13：気候変動に具体的な対策を', { fontSize: 16, fontWeight: 600, color: '#1a365d' }),
                    text('2030年カーボンニュートラル達成に向け、事業活動全体でのCO2排出量削減と、気候変動対策技術の開発に取り組んでいます。', {
                      fontSize: 14, color: '#4b5563',
                      size: { x: 900 }, textAutoResize: 'HEIGHT',
                      lineHeight: { value: 170, unit: 'PERCENT' },
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // CTA Section
    frame('CTASection', {
      size: { x: 1440, y: 180 },
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid('#0f766e')],
      children: [
        text('CSR活動の詳細レポートはこちらからダウンロードいただけます', { fontSize: 18, fontWeight: 500, color: '#ffffff' }),
        frame('DownloadBtn', {
          autoLayout: horizontal({ padX: 40, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 6,
          children: [
            text('CSRレポート2025（PDF）', { fontSize: 15, fontWeight: 600, color: '#0f766e' }),
          ],
        }),
      ],
    }),

    // Footer
    footer(),
  ],
});
