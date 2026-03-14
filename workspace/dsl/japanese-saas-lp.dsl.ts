import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const indigo = '#6366f1';
const violet = '#8b5cf6';
const indigoBg = '#eef2ff';
const dark = '#1a1a1a';
const darkBg = '#111827';

const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  strokes: [{ color: hex('#eeeeee'), weight: 1, align: 'INSIDE' }],
  children: [
    text('TaskFlow', { fontSize: 22, fontWeight: 800, color: indigo }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: ['機能', '料金', '導入事例', 'サポート'].map(t =>
        text(t, { fontSize: 14, fontWeight: 500, color: '#555555' })
      ),
    }),
    frame('NavActions', {
      autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('ログイン', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        frame('TrialBtn', {
          autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(indigo)],
          cornerRadius: 8,
          children: [text('無料で始める', { fontSize: 14, fontWeight: 600, color: '#ffffff' })],
        }),
      ],
    }),
  ],
});

const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: indigoBg, position: 0 }, { hex: '#e0e7ff', position: 1 }], 135)],
  children: [
    frame('Badge', {
      autoLayout: horizontal({ padX: 20, padY: 8 }),
      fills: [solid('#fef3c7')],
      cornerRadius: 20,
      children: [text('🎉 シリーズA 10億円調達', { fontSize: 13, fontWeight: 600, color: '#92400e' })],
    }),
    text('チームの生産性を\n10倍にする', {
      fontSize: 52, fontWeight: 800, color: dark,
      lineHeight: { value: 120, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    text('AIが自動でタスクを整理・優先順位付け。\n面倒な進捗管理から解放されます。', {
      fontSize: 18, fontWeight: 400, color: '#666666',
      lineHeight: { value: 170, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('Actions', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('Primary', {
          autoLayout: horizontal({ padX: 40, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(indigo)],
          cornerRadius: 10,
          children: [text('無料トライアル', { fontSize: 16, fontWeight: 700, color: '#ffffff' })],
        }),
        frame('Demo', {
          autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 10,
          strokes: [{ color: hex(indigo), weight: 2, align: 'INSIDE' }],
          children: [text('デモを見る', { fontSize: 16, fontWeight: 700, color: indigo })],
        }),
      ],
    }),
    frame('Stats', {
      autoLayout: horizontal({ spacing: 32 }),
      children: [
        text('5,000+ 導入企業', { fontSize: 14, fontWeight: 400, color: '#666666' }),
        text('99.9% 稼働率', { fontSize: 14, fontWeight: 400, color: '#666666' }),
        text('4.8 App Store評価', { fontSize: 14, fontWeight: 400, color: '#666666' }),
      ],
    }),
  ],
});

function featureCard(icon: string, title: string, description: string) {
  return frame(`Feature: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 32 }),
    fills: [solid('#f9fafb')],
    cornerRadius: 16,
    strokes: [{ color: hex('#f0f0f0'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('IconWrapper', {
        size: { x: 48, y: 48 },
        autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(indigoBg)],
        cornerRadius: 12,
        children: [text(icon, { fontSize: 24, textAlignHorizontal: 'CENTER' })],
      }),
      text(title, { fontSize: 18, fontWeight: 700, color: dark }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#666666',
        lineHeight: { value: 170, unit: 'PERCENT' },
        size: { x: 300 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const featuresSection = frame('FeaturesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('主な機能', { fontSize: 32, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
    text('シンプルなのに高機能。必要な機能がすべて揃っています。', { fontSize: 16, fontWeight: 400, color: '#888888', textAlignHorizontal: 'CENTER' }),
    frame('Grid', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Row1', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            featureCard('🤖', 'AI自動整理', 'タスクを自動的にカテゴリ分け・優先順位付け。手動で整理する手間がなくなります。'),
            featureCard('📊', 'リアルタイム分析', 'チームの生産性をダッシュボードで可視化。ボトルネックを即座に発見。'),
            featureCard('🔗', '外部連携', 'Slack, Teams, GitHub, Jiraなど100以上のツールと簡単に連携。'),
          ],
        }),
        frame('Row2', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            featureCard('🔒', 'エンタープライズセキュリティ', 'SOC2 Type II準拠、SSO対応、監査ログ完備。安心のセキュリティ。'),
            featureCard('📱', 'マルチデバイス', 'PC、タブレット、スマートフォン。いつでもどこでもアクセス可能。'),
            featureCard('⚡', '高速パフォーマンス', '大量のタスクでもサクサク動作。ストレスのない操作感を実現。'),
          ],
        }),
      ],
    }),
  ],
});

function pricingCard(name: string, price: string, period: string, features: string[], highlighted?: boolean) {
  return frame(`Plan: ${name}`, {
    autoLayout: vertical({ spacing: 24, padX: 24, padY: 32 }),
    fills: [solid('#ffffff')],
    cornerRadius: 16,
    strokes: [{ color: hex(highlighted ? indigo : '#e5e7eb'), weight: highlighted ? 2 : 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      ...(highlighted ? [
        frame('PopBadge', {
          autoLayout: horizontal({ padX: 16, padY: 4 }),
          fills: [solid(indigo)],
          cornerRadius: 12,
          children: [text('人気No.1', { fontSize: 12, fontWeight: 700, color: '#ffffff' })],
        }),
      ] : []),
      text(name, { fontSize: 18, fontWeight: 700, color: dark }),
      frame('Price', {
        autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }),
        children: [
          text(price, { fontSize: 36, fontWeight: 800, color: dark }),
          text(period, { fontSize: 14, fontWeight: 400, color: '#888888' }),
        ],
      }),
      frame('Features', {
        autoLayout: vertical({ spacing: 12 }),
        layoutSizingHorizontal: 'FILL',
        children: features.map(f => text(`✓ ${f}`, { fontSize: 14, fontWeight: 400, color: '#555555' })),
      }),
      frame('CTA', {
        autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(highlighted ? indigo : '#f3f4f6')],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
        children: [text(highlighted ? '今すぐ始める' : '詳しく見る', { fontSize: 15, fontWeight: 600, color: highlighted ? '#ffffff' : '#555555' })],
      }),
    ],
  });
}

const pricingSection = frame('PricingSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#f9fafb')],
  children: [
    text('料金プラン', { fontSize: 32, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
    text('14日間の無料トライアル付き。クレジットカード不要。', { fontSize: 16, fontWeight: 400, color: '#888888', textAlignHorizontal: 'CENTER' }),
    frame('PricingGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        pricingCard('スターター', '¥980', '/ユーザー/月', ['5プロジェクト', '基本的なタスク管理', 'メール通知', 'モバイルアプリ']),
        pricingCard('プロ', '¥2,980', '/ユーザー/月', ['無制限プロジェクト', 'AI自動整理', 'ダッシュボード分析', '外部ツール連携', '優先サポート'], true),
        pricingCard('エンタープライズ', '要相談', ' ', ['プロの全機能', 'SSO/SAML対応', '専任サポート', 'カスタム連携', 'SLA保証']),
      ],
    }),
  ],
});

const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: indigo, position: 0 }, { hex: violet, position: 1 }], 135)],
  children: [
    text('今すぐ始めましょう', { fontSize: 32, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('14日間無料。いつでもキャンセル可能。', { fontSize: 16, fontWeight: 400, color: '#ffffffCC', textAlignHorizontal: 'CENTER' }),
    frame('Btn', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      cornerRadius: 10,
      children: [text('無料トライアルを開始', { fontSize: 16, fontWeight: 700, color: indigo })],
    }),
  ],
});

const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0, padX: 120 }),
  fills: [solid(darkBg)],
  children: [
    frame('Inner', {
      autoLayout: horizontal({ spacing: 0, padY: 64, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex('#1f2937'), weight: 1, align: 'INSIDE' }],
      children: [
        frame('Brand', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('TaskFlow', { fontSize: 20, fontWeight: 800, color: indigo }),
            text('チームの生産性を10倍にする', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
          ],
        }),
        frame('Links', {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            frame('Col1', { autoLayout: vertical({ spacing: 12 }), children: [
              text('製品', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('機能一覧', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              text('料金プラン', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              text('セキュリティ', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            ]}),
            frame('Col2', { autoLayout: vertical({ spacing: 12 }), children: [
              text('リソース', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('ヘルプセンター', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              text('API ドキュメント', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              text('ブログ', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            ]}),
            frame('Col3', { autoLayout: vertical({ spacing: 12 }), children: [
              text('会社情報', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('チーム紹介', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              text('採用情報', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            ]}),
          ],
        }),
      ],
    }),
    frame('Bottom', {
      autoLayout: horizontal({ padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [text('© 2026 TaskFlow Inc. All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#4b5563' })],
    }),
  ],
});

export default frame('JapaneseSaaSLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [navBar, heroSection, featuresSection, pricingSection, ctaSection, footerSection],
});
