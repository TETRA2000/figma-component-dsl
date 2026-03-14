import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const navy = '#0f172a';
const cyan = '#06b6d4';
const darkSlate = '#1e293b';
const slate = '#94a3b8';
const lightCyan = '#67e8f9';

const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(navy)],
  strokes: [{ color: hex('#06b6d41F'), weight: 1, align: 'INSIDE' }],
  children: [
    frame('Brand', {
      autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('LIVIO', { fontSize: 24, fontWeight: 900, color: cyan }),
        text('リヴィオ', { fontSize: 12, fontWeight: 500, color: lightCyan }),
      ],
    }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: ['機能', '製品', '導入の流れ', 'お客様の声'].map(t =>
        text(t, { fontSize: 14, fontWeight: 500, color: slate })
      ),
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(cyan)],
      cornerRadius: 6,
      children: [text('無料相談', { fontSize: 14, fontWeight: 700, color: navy })],
    }),
  ],
});

const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 120, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: navy, position: 0 }, { hex: darkSlate, position: 0.4 }, { hex: navy, position: 1 }], 160)],
  children: [
    text('SMART HOME SYSTEM', { fontSize: 13, fontWeight: 600, color: cyan }),
    text('暮らしを、\nもっとスマートに', {
      fontSize: 68, fontWeight: 900, color: '#ffffff',
      lineHeight: { value: 120, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 650 },
      textAutoResize: 'HEIGHT',
    }),
    text('照明、空調、セキュリティ。すべてをひとつに。\nAIが学習し、あなたの理想の住まいを実現します。', {
      fontSize: 18, fontWeight: 400, color: '#ffffff80',
      lineHeight: { value: 190, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroActions', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('Primary', {
          autoLayout: horizontal({ padX: 48, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(cyan)],
          cornerRadius: 8,
          children: [text('無料相談を予約', { fontSize: 16, fontWeight: 700, color: navy })],
        }),
        frame('Secondary', {
          autoLayout: horizontal({ padX: 40, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#00000000')],
          cornerRadius: 8,
          strokes: [{ color: hex(cyan), weight: 2, align: 'INSIDE' }],
          children: [text('製品デモを見る', { fontSize: 16, fontWeight: 700, color: cyan })],
        }),
      ],
    }),
  ],
});

function featureCard(icon: string, title: string, description: string) {
  return frame(`Feature: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 28, padY: 36 }),
    fills: [solid('#1e293b99')],
    cornerRadius: 12,
    strokes: [{ color: hex('#06b6d41F'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('IconWrapper', {
        size: { x: 48, y: 48 },
        autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#06b6d41A')],
        cornerRadius: 12,
        children: [text(icon, { fontSize: 24, textAlignHorizontal: 'CENTER' })],
      }),
      text(title, { fontSize: 18, fontWeight: 700, color: '#ffffff' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: slate,
        lineHeight: { value: 180, unit: 'PERCENT' },
        size: { x: 300 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const featuresSection = frame('FeaturesSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(navy)],
  children: [
    text('FEATURES', { fontSize: 12, fontWeight: 600, color: cyan }),
    text('6つのスマート機能', { fontSize: 36, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('家中のデバイスをシームレスに連携。快適な暮らしをワンタップで。', { fontSize: 15, fontWeight: 400, color: slate, textAlignHorizontal: 'CENTER' }),
    frame('Grid', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Row1', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            featureCard('💡', 'スマート照明', '時間帯や気分に合わせて、照明を自動調整。シーン設定で一括コントロール。'),
            featureCard('🔐', 'セキュリティ', '顔認証ドアロック、侵入検知、リアルタイム通知。家族の安全を24時間守ります。'),
            featureCard('❄️', '空調管理', 'AIが室温・湿度を学習し、最適な環境を自動維持。省エネ効果も抜群。'),
          ],
        }),
        frame('Row2', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            featureCard('🎤', '音声操作', '「おはよう」の一言ですべてが動き出す。主要な音声アシスタントに対応。'),
            featureCard('⚡', 'エネルギー管理', '電力消費をリアルタイムで可視化。太陽光発電との連携で電気代を最適化。'),
            featureCard('📹', '見守りカメラ', '4K対応カメラで室内外を確認。お子様やペットの見守りにも活用できます。'),
          ],
        }),
      ],
    }),
  ],
});

function packageCard(name: string, price: string, description: string, features: string[], highlighted?: boolean) {
  return frame(`Package: ${name}`, {
    autoLayout: vertical({ spacing: 20, padX: 28, padY: 40 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex(highlighted ? cyan : '#e2e8f0'), weight: highlighted ? 2 : 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      ...(highlighted ? [
        frame('PopBadge', {
          autoLayout: horizontal({ padX: 20, padY: 4 }),
          fills: [solid(cyan)],
          cornerRadius: 20,
          children: [text('人気No.1', { fontSize: 12, fontWeight: 700, color: '#ffffff' })],
        }),
      ] : []),
      text(name, { fontSize: 22, fontWeight: 800, color: navy }),
      text(price, { fontSize: 32, fontWeight: 900, color: cyan }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#64748b',
        lineHeight: { value: 170, unit: 'PERCENT' },
        size: { x: 300 },
        textAutoResize: 'HEIGHT',
      }),
      frame('Features', {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: features.map(f => text(`✓ ${f}`, { fontSize: 14, fontWeight: 400, color: '#334155' })),
      }),
      frame('CTA', {
        autoLayout: horizontal({ padX: 24, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(highlighted ? cyan : '#f1f5f9')],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
        children: [text(highlighted ? '今すぐ相談' : '詳しく見る', { fontSize: 15, fontWeight: 700, color: highlighted ? '#ffffff' : '#334155' })],
      }),
    ],
  });
}

const productsSection = frame('ProductsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid('#f0f9ff')],
  children: [
    text('PRODUCT LINEUP', { fontSize: 12, fontWeight: 600, color: '#0891b2' }),
    text('製品ラインナップ', { fontSize: 36, fontWeight: 800, color: navy, textAlignHorizontal: 'CENTER' }),
    frame('PackageGrid', {
      autoLayout: horizontal({ spacing: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        packageCard('LIVIO Lite', '¥198,000〜', 'スマートホームを気軽に始めたい方に。基本機能を厳選したエントリーモデル。', ['スマート照明（4部屋）', '音声操作対応', 'スマートロック', 'スマホアプリ管理']),
        packageCard('LIVIO Standard', '¥398,000〜', '家族みんなが快適に。充実の機能でスマートライフを実現。', ['スマート照明（全室）', 'セキュリティシステム', 'AI空調管理', '音声操作対応', 'エネルギーモニター'], true),
        packageCard('LIVIO Premium', '¥698,000〜', '最先端のテクノロジーで、究極のスマートホームを。', ['Standardの全機能', '4K見守りカメラ（4台）', '太陽光発電連携', 'カスタムシーン無制限', '専任サポート']),
      ],
    }),
  ],
});

function stepCard(number: string, title: string, description: string) {
  return frame(`Step: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 36, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(number, { fontSize: 48, fontWeight: 900, color: cyan, textAlignHorizontal: 'CENTER' }),
      text(title, { fontSize: 18, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: slate,
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 220 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const installationSection = frame('InstallationSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(darkSlate)],
  children: [
    text('INSTALLATION', { fontSize: 12, fontWeight: 600, color: cyan }),
    text('導入の流れ', { fontSize: 36, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('ご相談から導入まで、最短2週間で完了します。', { fontSize: 15, fontWeight: 400, color: slate, textAlignHorizontal: 'CENTER' }),
    frame('StepsGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        stepCard('01', '無料相談', 'お住まいの間取りやご要望をヒアリング。最適なプランをご提案します。'),
        stepCard('02', 'プラン設計', '専任エンジニアが設置場所やデバイス構成を設計。お見積もりをご提示。'),
        stepCard('03', '設置工事', '経験豊富な技術者が丁寧に設置。配線もすっきり美しく仕上げます。'),
        stepCard('04', '操作レクチャー', 'ご家族全員への操作説明と初期設定。導入後のサポートも万全です。'),
      ],
    }),
  ],
});

function testimonialCard(name: string, role: string, quote: string) {
  return frame(`Testimonial: ${name}`, {
    autoLayout: vertical({ spacing: 24, padX: 36, padY: 36 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex('#e2e8f0'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(quote, {
        fontSize: 15, fontWeight: 400, color: '#334155',
        lineHeight: { value: 190, unit: 'PERCENT' },
        size: { x: 400 },
        textAutoResize: 'HEIGHT',
      }),
      frame('Author', {
        autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
        children: [
          rectangle('Avatar', {
            size: { x: 48, y: 48 },
            fills: [gradient([{ hex: cyan, position: 0 }, { hex: '#0891b2', position: 1 }], 135)],
            cornerRadius: 24,
          }),
          frame('AuthorInfo', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, { fontSize: 15, fontWeight: 700, color: navy }),
              text(role, { fontSize: 13, fontWeight: 400, color: '#64748b' }),
            ],
          }),
        ],
      }),
    ],
  });
}

const testimonialsSection = frame('TestimonialsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid('#f0f9ff')],
  children: [
    text('TESTIMONIALS', { fontSize: 12, fontWeight: 600, color: '#0891b2' }),
    text('お客様の声', { fontSize: 36, fontWeight: 800, color: navy, textAlignHorizontal: 'CENTER' }),
    frame('TestimonialGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        testimonialCard('田中 健太郎さん', 'LIVIO Standard / 戸建て', '「おはよう」と言うだけでカーテンが開き、照明がつき、コーヒーメーカーが動き出す。この体験は本当に感動的です。家族全員がスマートホームの虜になりました。'),
        testimonialCard('佐藤 美穂さん', 'LIVIO Premium / マンション', '子供が帰宅すると自動で通知が届くので安心です。エネルギー管理で電気代が月3,000円以上節約できているのも嬉しいポイント。導入して本当によかったです。'),
      ],
    }),
  ],
});

const consultationSection = frame('ConsultationSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: navy, position: 0 }, { hex: '#164e63', position: 0.5 }, { hex: navy, position: 1 }], 135)],
  children: [
    text('まずは無料相談から', { fontSize: 36, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('専門スタッフがお住まいに最適なスマートホームプランをご提案。\nオンラインまたはご自宅での相談が可能です。', {
      fontSize: 16, fontWeight: 400, color: '#ffffff99',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('CTAActions', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('ConsultPrimary', {
          autoLayout: horizontal({ padX: 56, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(cyan)],
          cornerRadius: 8,
          children: [text('無料相談を予約する', { fontSize: 16, fontWeight: 700, color: navy })],
        }),
        frame('ConsultSecondary', {
          autoLayout: horizontal({ padX: 40, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#00000000')],
          cornerRadius: 8,
          strokes: [{ color: hex('#06b6d466'), weight: 1, align: 'INSIDE' }],
          children: [text('資料をダウンロード', { fontSize: 16, fontWeight: 600, color: lightCyan })],
        }),
      ],
    }),
    text('相談無料 / 強引な営業は一切いたしません', { fontSize: 13, fontWeight: 400, color: lightCyan }),
  ],
});

const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0, padX: 120 }),
  fills: [solid('#020617')],
  children: [
    frame('Inner', {
      autoLayout: horizontal({ spacing: 0, padY: 64, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('BrandBlock', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('LIVIO', { fontSize: 22, fontWeight: 900, color: cyan }),
            text('暮らしを、もっとスマートに', { fontSize: 13, fontWeight: 400, color: '#475569' }),
          ],
        }),
        frame('Links', {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            frame('Col1', { autoLayout: vertical({ spacing: 10 }), children: [
              text('製品', { fontSize: 14, fontWeight: 700, color: '#e2e8f0' }),
              text('LIVIO Lite', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
              text('LIVIO Standard', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
              text('LIVIO Premium', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
            ]}),
            frame('Col2', { autoLayout: vertical({ spacing: 10 }), children: [
              text('サポート', { fontSize: 14, fontWeight: 700, color: '#e2e8f0' }),
              text('よくある質問', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
              text('お問い合わせ', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
              text('保証について', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
            ]}),
            frame('Col3', { autoLayout: vertical({ spacing: 10 }), children: [
              text('会社情報', { fontSize: 14, fontWeight: 700, color: '#e2e8f0' }),
              text('会社概要', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
              text('採用情報', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
              text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
            ]}),
          ],
        }),
      ],
    }),
    rectangle('Divider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#06b6d414')],
      layoutSizingHorizontal: 'FILL',
    }),
    frame('Bottom', {
      autoLayout: horizontal({ padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [text('\u00a9 2026 LIVIO Inc. All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#475569' })],
    }),
  ],
});

export default frame('JapaneseSmartHomeLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(navy)],
  children: [navBar, heroSection, featuresSection, productsSection, installationSection, testimonialsSection, consultationSection, footerSection],
});
