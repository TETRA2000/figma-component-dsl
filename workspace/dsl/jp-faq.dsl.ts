/**
 * jp-faq.dsl.ts — よくあるご質問 (FAQ)
 * Japanese corporate FAQ page with categorized Q&A items.
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

function qaItem(question: string, answer: string) {
  return frame(`QA-${question.slice(0, 10)}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('QuestionRow', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'MIN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('QBadge', {
            size: { x: 32, y: 32 },
            autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#2563eb')],
            cornerRadius: 16,
            children: [
              text('Q', { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
            ],
          }),
          text(question, {
            fontSize: 16, fontWeight: 700, color: '#1a365d',
            size: { x: 900 }, textAutoResize: 'HEIGHT',
            lineHeight: { value: 160, unit: 'PERCENT' },
          }),
        ],
      }),
      rectangle('QADivider', {
        size: { x: 1, y: 1 },
        fills: [solid('#e5e7eb')],
        layoutSizingHorizontal: 'FILL',
      }),
      frame('AnswerRow', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'MIN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('ABadge', {
            size: { x: 32, y: 32 },
            autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#f5f5f5')],
            cornerRadius: 16,
            strokes: [{ color: hex('#d1d5db'), weight: 1, align: 'INSIDE' as const }],
            children: [
              text('A', { fontSize: 16, fontWeight: 700, color: '#1a365d' }),
            ],
          }),
          text(answer, {
            fontSize: 14, fontWeight: 400, color: '#4b5563',
            size: { x: 900 }, textAutoResize: 'HEIGHT',
            lineHeight: { value: 180, unit: 'PERCENT' },
          }),
        ],
      }),
    ],
  });
}

function categorySection(title: string, items: { q: string; a: string }[]) {
  return frame(`Section-${title}`, {
    autoLayout: vertical({ spacing: 16 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('SectionHeader', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          rectangle('Accent', { size: { x: 4, y: 28 }, fills: [solid('#2563eb')], cornerRadius: 2 }),
          text(title, { fontSize: 22, fontWeight: 700, color: '#1a365d' }),
        ],
      }),
      ...items.map(item => qaItem(item.q, item.a)),
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
            ],
          }),
          frame('FooterCol3', {
            autoLayout: vertical({ spacing: 12 }),
            children: [
              text('企業情報', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('会社概要', { fontSize: 13, color: '#94a3b8' }),
              text('採用情報', { fontSize: 13, color: '#94a3b8' }),
            ],
          }),
          frame('FooterCol4', {
            autoLayout: vertical({ spacing: 12 }),
            children: [
              text('サポート', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('お問い合わせ', { fontSize: 13, color: '#94a3b8' }),
              text('よくあるご質問', { fontSize: 13, color: '#94a3b8' }),
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

export default frame('FAQPage', {
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
        text('よくあるご質問', { fontSize: 36, fontWeight: 800, color: '#ffffff' }),
        text('お客様からよくいただくご質問をカテゴリ別にまとめました。', {
          fontSize: 16, fontWeight: 400, color: '#cbd5e1',
          textAlignHorizontal: 'CENTER',
          size: { x: 600 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 170, unit: 'PERCENT' },
        }),
      ],
    }),

    // FAQ Content
    frame('FAQContent', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 48, padX: 80, padY: 56 }),
      children: [
        // Category 1: 製品について
        categorySection('製品について', [
          {
            q: '製品の無料トライアルはありますか？',
            a: 'はい、すべての製品に30日間の無料トライアルをご用意しております。トライアル期間中はすべての機能をお試しいただけます。お申し込みはウェブサイトのトライアルページから、または営業担当までお問い合わせください。',
          },
          {
            q: '製品のカスタマイズは可能ですか？',
            a: 'お客様の業務要件に合わせたカスタマイズに対応しております。API連携、UIカスタマイズ、独自機能の追加など、幅広いカスタマイズオプションをご用意しております。詳細はソリューション担当までご相談ください。',
          },
          {
            q: '他社製品との連携は可能ですか？',
            a: '主要なERPシステム、CRM、グループウェアなど、多数のサードパーティ製品との連携に対応しております。REST APIおよびWebhookによる柔軟なインテグレーションが可能です。連携実績一覧は技術資料をご参照ください。',
          },
        ]),

        // Category 2: サービスについて
        categorySection('サービスについて', [
          {
            q: '導入支援サービスの内容を教えてください。',
            a: '要件定義から設計・構築・テスト・移行まで、プロジェクト全体をサポートする包括的な導入支援サービスを提供しております。専任のプロジェクトマネージャーがお客様のプロジェクトを担当し、スムーズな導入を実現します。',
          },
          {
            q: 'サポート対応時間はいつですか？',
            a: 'スタンダードプランは平日9:00〜18:00、プレミアムプランは24時間365日対応となっております。緊急時はお電話でのサポートも承っております。SLA（サービスレベルアグリーメント）に基づく迅速な対応をお約束します。',
          },
          {
            q: '研修・トレーニングは提供していますか？',
            a: 'オンサイト研修、オンライントレーニング、eラーニングの3つの形式をご用意しております。お客様の運用チームのスキルレベルに合わせたカリキュラムをご提案いたします。定期的なスキルアップ研修も実施しています。',
          },
        ]),

        // Category 3: お支払いについて
        categorySection('お支払いについて', [
          {
            q: '料金体系はどのようになっていますか？',
            a: 'ご利用人数・機能範囲に応じた月額サブスクリプション制を採用しております。初期費用、月額費用、オプション費用の詳細はお見積りにてご案内いたします。ボリュームディスカウントや長期契約割引もございます。',
          },
          {
            q: '請求書払いは可能ですか？',
            a: 'はい、法人のお客様には請求書払い（月末締め翌月末払い）をご利用いただけます。銀行振込、口座振替にも対応しております。お支払い条件についてはご相談ください。',
          },
        ]),
      ],
    }),

    // Contact CTA
    frame('ContactCTA', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 64, counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
      children: [
        text('お探しの回答が見つかりませんか？', { fontSize: 24, fontWeight: 700, color: '#1a365d' }),
        text('お気軽にお問い合わせください。専門スタッフが丁寧にご対応いたします。', {
          fontSize: 15, color: '#6b7280',
          textAlignHorizontal: 'CENTER',
          size: { x: 500 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 170, unit: 'PERCENT' },
        }),
        frame('ContactButtons', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            frame('PhoneBtn', {
              autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#1a365d')],
              cornerRadius: 4,
              children: [
                text('電話でのお問い合わせ', { fontSize: 15, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
            frame('FormBtn', {
              autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 4,
              strokes: [{ color: hex('#1a365d'), weight: 2, align: 'INSIDE' as const }],
              children: [
                text('フォームでのお問い合わせ', { fontSize: 15, fontWeight: 600, color: '#1a365d' }),
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
