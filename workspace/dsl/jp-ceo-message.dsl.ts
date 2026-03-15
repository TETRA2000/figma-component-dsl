/**
 * CEO Message page (代表メッセージ)
 * Japanese corporate CEO message with portrait, vision, and signature.
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
          image('Logo', { src: '../assets/company-logo.png', size: { x: 180, y: 50 } }),
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
              image('FooterLogo', { src: '../assets/company-logo.png', size: { x: 180, y: 50 } }),
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

export default frame('CEOMessagePage', {
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
        text('代表メッセージ', { fontSize: 36, fontWeight: 700, color: '#1a365d' }),
        text('CEO Message', { fontSize: 16, fontWeight: 400, color: '#64748b', letterSpacing: { value: 200, unit: 'PERCENT' } }),
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
        text('企業情報', { fontSize: 13, color: '#2563eb' }),
        text('>', { fontSize: 13, color: '#94a3b8' }),
        text('代表メッセージ', { fontSize: 13, color: '#334155' }),
      ],
    }),

    // CEO Message Main Section
    frame('CEOMessageSection', {
      autoLayout: horizontal({ spacing: 60, padX: 120, padY: 80, counterAlign: 'MIN' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        // CEO Portrait
        frame('PortraitArea', {
          autoLayout: vertical({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            image('CEOPortrait', {
              src: '../assets/ceo-portrait.png',
              size: { x: 300, y: 400 },
              cornerRadius: 8,
            }),
            text('代表取締役社長', { fontSize: 14, fontWeight: 500, color: '#64748b', textAlignHorizontal: 'CENTER' }),
            text('田中 太郎', { fontSize: 20, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
          ],
        }),
        // Message Text
        frame('MessageArea', {
          autoLayout: vertical({ spacing: 32 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('テクノロジーの力で、\n社会の未来を切り拓く。', {
              fontSize: 28, fontWeight: 700, color: '#1a365d',
              lineHeight: { value: 160, unit: 'PERCENT' },
              size: { x: 700 }, textAutoResize: 'HEIGHT',
            }),
            rectangle('MessageAccent', {
              size: { x: 60, y: 4 },
              fills: [solid('#2563eb')],
              cornerRadius: 2,
            }),
            text('私たちは2005年の創業以来、「テクノロジーで社会をより良くする」という理念のもと、お客様と共に歩んでまいりました。急速に変化するデジタル社会において、企業に求められるのは単なる技術の導入ではなく、その技術を通じて社会的価値を創造することです。', {
              fontSize: 16, fontWeight: 400, color: '#334155',
              lineHeight: { value: 200, unit: 'PERCENT' },
              size: { x: 700 }, textAutoResize: 'HEIGHT',
            }),
            text('当社は、AI・クラウド・IoTなどの先端技術を駆使し、製造業、金融業、ヘルスケアなど幅広い業界のデジタルトランスフォーメーションを支援してまいりました。技術力だけでなく、お客様のビジネスを深く理解し、真の課題解決パートナーとして信頼を築いてまいりました。', {
              fontSize: 16, fontWeight: 400, color: '#334155',
              lineHeight: { value: 200, unit: 'PERCENT' },
              size: { x: 700 }, textAutoResize: 'HEIGHT',
            }),
            text('これからも私たちは、イノベーションへの挑戦を続け、持続可能な社会の実現に貢献してまいります。社員一人ひとりの成長を大切にしながら、グローバルに通用する企業へと進化し続けます。皆様のご支援とご期待に応えるべく、全力で邁進してまいります。', {
              fontSize: 16, fontWeight: 400, color: '#334155',
              lineHeight: { value: 200, unit: 'PERCENT' },
              size: { x: 700 }, textAutoResize: 'HEIGHT',
            }),
          ],
        }),
      ],
    }),

    // Company Vision Section
    frame('VisionSection', {
      autoLayout: vertical({ spacing: 40, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f0f4f8')],
      children: [
        text('経営ビジョン', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        rectangle('VisionAccent', { size: { x: 60, y: 4 }, fills: [solid('#2563eb')], cornerRadius: 2 }),
        frame('VisionCards', {
          autoLayout: horizontal({ spacing: 32, counterAlign: 'MIN' }),
          children: [
            frame('Vision1', {
              size: { x: 360, y: undefined },
              autoLayout: vertical({ spacing: 16, padX: 32, padY: 32, counterAlign: 'CENTER' }),
              fills: [solid('#ffffff')],
              cornerRadius: 8,
              strokes: [{ color: hex('#e2e8f0'), weight: 1, align: 'INSIDE' }],
              children: [
                image('IconInnovation', { src: '../assets/icon-innovation.png', size: { x: 60, y: 60 } }),
                text('イノベーション', { fontSize: 18, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
                text('常に新しい技術と発想で、お客様のビジネスに革新をもたらします。', {
                  fontSize: 14, color: '#475569',
                  lineHeight: { value: 180, unit: 'PERCENT' },
                  size: { x: 296 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'CENTER',
                }),
              ],
            }),
            frame('Vision2', {
              size: { x: 360, y: undefined },
              autoLayout: vertical({ spacing: 16, padX: 32, padY: 32, counterAlign: 'CENTER' }),
              fills: [solid('#ffffff')],
              cornerRadius: 8,
              strokes: [{ color: hex('#e2e8f0'), weight: 1, align: 'INSIDE' }],
              children: [
                image('IconTrust', { src: '../assets/icon-trust.png', size: { x: 60, y: 60 } }),
                text('信頼', { fontSize: 18, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
                text('誠実な姿勢と確かな技術で、お客様との長期的な信頼関係を構築します。', {
                  fontSize: 14, color: '#475569',
                  lineHeight: { value: 180, unit: 'PERCENT' },
                  size: { x: 296 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'CENTER',
                }),
              ],
            }),
            frame('Vision3', {
              size: { x: 360, y: undefined },
              autoLayout: vertical({ spacing: 16, padX: 32, padY: 32, counterAlign: 'CENTER' }),
              fills: [solid('#ffffff')],
              cornerRadius: 8,
              strokes: [{ color: hex('#e2e8f0'), weight: 1, align: 'INSIDE' }],
              children: [
                image('IconGlobal', { src: '../assets/icon-global.png', size: { x: 60, y: 60 } }),
                text('グローバル', { fontSize: 18, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
                text('世界に通用する技術とサービスで、グローバル市場に挑戦し続けます。', {
                  fontSize: 14, color: '#475569',
                  lineHeight: { value: 180, unit: 'PERCENT' },
                  size: { x: 296 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'CENTER',
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Signature Section
    frame('SignatureSection', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 60, counterAlign: 'MAX' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('2026年3月', { fontSize: 14, color: '#64748b', textAlignHorizontal: 'RIGHT' }),
        text('株式会社テクノフューチャー', { fontSize: 16, color: '#334155', textAlignHorizontal: 'RIGHT' }),
        text('代表取締役社長　田中 太郎', { fontSize: 20, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'RIGHT' }),
      ],
    }),

    // Footer
    footer(),
  ],
});
