/**
 * 製品・ソリューション (Products) — Japanese corporate product introduction page
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

// ── Product card helper ─────────────────────────────────────

function productCard(
  imgSrc: string,
  title: string,
  category: string,
  description: string,
) {
  return frame(`Product-${title}`, {
    size: { x: 400, y: undefined },
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
    clipContent: true,
    children: [
      image(`Img-${title}`, { src: imgSrc, size: { x: 400, y: 300 } }),
      frame(`Content-${title}`, {
        autoLayout: vertical({ spacing: 12, padX: 28, padY: 28 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame(`Badge-${category}`, {
            autoLayout: horizontal({ padX: 12, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#eef2ff')],
            cornerRadius: 4,
            children: [
              text(category, { fontSize: 12, fontWeight: 500, color: '#2563eb' }),
            ],
          }),
          text(title, { fontSize: 20, fontWeight: 700, color: '#1a365d' }),
          text(description, {
            fontSize: 14, color: '#4b5563',
            size: { x: 344 }, textAutoResize: 'HEIGHT',
            lineHeight: { value: 180, unit: 'PERCENT' },
          }),
          frame(`LearnMore-${title}`, {
            autoLayout: horizontal({ padX: 0, padY: 8 }),
            children: [
              text('詳しく見る →', { fontSize: 14, fontWeight: 600, color: '#2563eb' }),
            ],
          }),
        ],
      }),
    ],
  });
}

// ── Main page ──────────────────────────────────────────────

export default frame('ProductsPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Navigation
    navbar(),

    // Hero Section
    frame('Hero', {
      size: { x: 1440, y: 420 },
      fills: [
        solid('#1a365d'),
        gradient([
          { hex: '#2563eb33', position: 0 },
          { hex: '#1a365d00', position: 1 },
        ], 0),
      ],
      autoLayout: vertical({ spacing: 20, padX: 120, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
      children: [
        text('製品・ソリューション', { fontSize: 16, fontWeight: 500, color: '#93c5fd', letterSpacing: { value: 200, unit: 'PERCENT' } }),
        text('革新的な製品で、未来を変える', { fontSize: 44, fontWeight: 700, color: '#ffffff' }),
        text('最先端のテクノロジーを活用した製品群で、\nお客様のビジネス課題を解決します。', {
          fontSize: 18, color: '#cbd5e1',
          size: { x: 600 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 180, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),
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
        text('製品・ソリューション', { fontSize: 12, color: '#64748b' }),
      ],
    }),

    // Product Cards Section
    frame('ProductsSection', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 48, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      children: [
        text('主要製品ラインナップ', { fontSize: 32, fontWeight: 700, color: '#1a365d' }),
        rectangle('TitleUnderline', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),
        text('お客様のニーズに合わせた最適なソリューションをご提供いたします。', {
          fontSize: 16, color: '#64748b',
          textAlignHorizontal: 'CENTER',
        }),

        frame('ProductCards', {
          autoLayout: horizontal({ spacing: 32 }),
          children: [
            productCard(
              './workspace/assets/product-1.png',
              'TechnoAI Platform',
              'AI・機械学習',
              'エンタープライズ向けAIプラットフォーム。自然言語処理、画像認識、予測分析を統合し、業務の自動化と意思決定の高度化を実現します。',
            ),
            productCard(
              './workspace/assets/product-2.png',
              'SecureEdge IoT',
              'IoTセキュリティ',
              'IoTデバイスのエンドポイントセキュリティを包括的に保護。ゼロトラストアーキテクチャにより、安全なIoT環境を構築します。',
            ),
            productCard(
              './workspace/assets/product-3.png',
              'CloudBridge Enterprise',
              'クラウド基盤',
              'ハイブリッドクラウド環境の構築・運用を一元管理。マルチクラウド対応で、柔軟かつ堅牢なインフラを実現します。',
            ),
          ],
        }),
      ],
    }),

    // Technology Overview Section
    frame('TechOverview', {
      size: { x: 1440, y: undefined },
      autoLayout: horizontal({ spacing: 60, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      fills: [solid('#f5f5f5')],
      children: [
        image('TechImage', {
          src: './workspace/assets/technology.png',
          size: { x: 600, y: 380 },
          cornerRadius: 12,
        }),
        frame('TechContent', {
          autoLayout: vertical({ spacing: 24 }),
          size: { x: 580, y: undefined },
          children: [
            text('技術的優位性', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
            rectangle('TechUnderline', { size: { x: 48, y: 3 }, fills: [solid('#2563eb')] }),
            text('私たちの製品は、長年の研究開発で培われた独自技術をベースに開発されています。特許取得済みのコアテクノロジーにより、他社製品にはない高い性能と信頼性を実現しています。', {
              fontSize: 15, color: '#4b5563',
              size: { x: 580 }, textAutoResize: 'HEIGHT',
              lineHeight: { value: 200, unit: 'PERCENT' },
            }),
            frame('TechStats', {
              autoLayout: horizontal({ spacing: 40 }),
              children: [
                frame('Stat1', {
                  autoLayout: vertical({ spacing: 4 }),
                  children: [
                    text('99.99%', { fontSize: 28, fontWeight: 700, color: '#2563eb' }),
                    text('稼働率', { fontSize: 13, color: '#6b7280' }),
                  ],
                }),
                frame('Stat2', {
                  autoLayout: vertical({ spacing: 4 }),
                  children: [
                    text('150+', { fontSize: 28, fontWeight: 700, color: '#2563eb' }),
                    text('取得特許数', { fontSize: 13, color: '#6b7280' }),
                  ],
                }),
                frame('Stat3', {
                  autoLayout: vertical({ spacing: 4 }),
                  children: [
                    text('3,000+', { fontSize: 28, fontWeight: 700, color: '#2563eb' }),
                    text('導入企業数', { fontSize: 13, color: '#6b7280' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Support Info Section
    frame('SupportSection', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 48, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      children: [
        text('充実のサポート体制', { fontSize: 32, fontWeight: 700, color: '#1a365d' }),
        rectangle('SupportUnderline', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),

        frame('SupportCards', {
          autoLayout: horizontal({ spacing: 48 }),
          children: [
            // Support card
            frame('SupportCard', {
              size: { x: 580, y: undefined },
              autoLayout: horizontal({ spacing: 24, padX: 40, padY: 40, counterAlign: 'CENTER' }),
              fills: [solid('#f0f9ff')],
              cornerRadius: 12,
              strokes: [{ color: hex('#bfdbfe'), weight: 1, align: 'INSIDE' }],
              children: [
                image('IconSupport', { src: './workspace/assets/icon-support.png', size: { x: 80, y: 80 } }),
                frame('SupportText', {
                  autoLayout: vertical({ spacing: 12 }),
                  size: { x: 400, y: undefined },
                  children: [
                    text('24時間365日サポート', { fontSize: 20, fontWeight: 700, color: '#1a365d' }),
                    text('専任のサポートエンジニアが、お客様の運用をバックアップ。障害発生時の迅速な対応から、定期的な運用レビューまで、包括的なサポートを提供します。', {
                      fontSize: 14, color: '#4b5563',
                      size: { x: 400 }, textAutoResize: 'HEIGHT',
                      lineHeight: { value: 180, unit: 'PERCENT' },
                    }),
                  ],
                }),
              ],
            }),

            // Security card
            frame('SecurityCard', {
              size: { x: 580, y: undefined },
              autoLayout: horizontal({ spacing: 24, padX: 40, padY: 40, counterAlign: 'CENTER' }),
              fills: [solid('#fef3c7')],
              cornerRadius: 12,
              strokes: [{ color: hex('#fcd34d'), weight: 1, align: 'INSIDE' }],
              children: [
                image('IconSecurity', { src: './workspace/assets/icon-security.png', size: { x: 80, y: 80 } }),
                frame('SecurityText', {
                  autoLayout: vertical({ spacing: 12 }),
                  size: { x: 400, y: undefined },
                  children: [
                    text('万全のセキュリティ', { fontSize: 20, fontWeight: 700, color: '#1a365d' }),
                    text('ISO 27001認証取得済み。多層防御アーキテクチャと継続的な脆弱性診断により、お客様の大切なデータを確実に保護します。', {
                      fontSize: 14, color: '#4b5563',
                      size: { x: 400 }, textAutoResize: 'HEIGHT',
                      lineHeight: { value: 180, unit: 'PERCENT' },
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
      size: { x: 1440, y: 200 },
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid('#1e3a5f')],
      children: [
        text('製品に関するお問い合わせ・デモのご依頼はこちら', { fontSize: 20, fontWeight: 600, color: '#ffffff' }),
        frame('CTAButton', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#2563eb')],
          cornerRadius: 6,
          children: [
            text('お問い合わせ', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
      ],
    }),

    // Footer
    footer(),
  ],
});
