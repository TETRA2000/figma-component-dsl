import {
  frame, text, rectangle, image,
  solid, gradient, hex, imageFill,
  horizontal, vertical,
  divider,
} from '@figma-dsl/core';

// ── Helpers ──

function navLink(label: string) {
  return text(label, { fontSize: 14, fontWeight: 500, color: '#ffffff' });
}

function serviceCard(imgSrc: string, title: string, description: string, tags: string[]) {
  return frame(`Service: ${title}`, {
    size: { x: 370, y: undefined },
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
    clipContent: true,
    children: [
      image(`ServiceImg: ${title}`, {
        src: imgSrc,
        size: { x: 370, y: 240 },
        fit: 'FILL',
      }),
      frame('ServiceCardBody', {
        autoLayout: vertical({ spacing: 16, padX: 28, padY: 28 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 20, fontWeight: 700, color: '#1a365d' }),
          text(description, {
            fontSize: 14, fontWeight: 400, color: '#4a5568',
            size: { x: 314 }, textAutoResize: 'HEIGHT',
            lineHeight: { value: 180, unit: 'PERCENT' },
          }),
          frame('Tags', {
            autoLayout: horizontal({ spacing: 8 }),
            children: tags.map(tag =>
              frame(`Tag: ${tag}`, {
                autoLayout: horizontal({ padX: 10, padY: 4 }),
                fills: [solid('#eef2ff')],
                cornerRadius: 4,
                children: [
                  text(tag, { fontSize: 11, fontWeight: 500, color: '#2563eb' }),
                ],
              }),
            ),
          }),
        ],
      }),
    ],
  });
}

function serviceDetail(
  title: string,
  subtitle: string,
  description: string,
  features: string[],
  reversed: boolean,
) {
  return frame(`Detail: ${title}`, {
    autoLayout: vertical({ spacing: 24, padX: 0, padY: 0 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('DetailHeader', {
        autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
        children: [
          rectangle('DetailAccent', { size: { x: 4, y: 32 }, fills: [solid('#2563eb')] }),
          frame('DetailTitles', {
            autoLayout: vertical({ spacing: 4 }),
            children: [
              text(title, { fontSize: 22, fontWeight: 700, color: '#1a365d' }),
              text(subtitle, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            ],
          }),
        ],
      }),
      text(description, {
        fontSize: 15, fontWeight: 400, color: '#4a5568',
        size: { x: 1000 }, textAutoResize: 'HEIGHT',
        lineHeight: { value: 190, unit: 'PERCENT' },
      }),
      frame('FeatureList', {
        autoLayout: vertical({ spacing: 12, padX: 20 }),
        children: features.map(f =>
          frame(`Feature: ${f}`, {
            autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
            children: [
              rectangle('Bullet', { size: { x: 8, y: 8 }, fills: [solid('#2563eb')], cornerRadius: 4 }),
              text(f, { fontSize: 14, fontWeight: 400, color: '#333333' }),
            ],
          }),
        ),
      }),
    ],
  });
}

// ── Page ──

export default frame('JpServices', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [

    // ── Header ──
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      size: { x: 1440, y: 72 },
      fills: [solid('#1a365d')],
      children: [
        image('Logo', { src: '../assets/company-logo.png', size: { x: 180, y: 50 } }),
        frame('Nav', {
          autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
          children: [
            navLink('会社情報'),
            navLink('事業紹介'),
            navLink('採用情報'),
            navLink('IR情報'),
            navLink('お問い合わせ'),
          ],
        }),
      ],
    }),

    // ── Hero Banner ──
    frame('HeroBanner', {
      size: { x: 1440, y: 320 },
      fills: [
        imageFill('../assets/hero-tech.png'),
        gradient([
          { hex: '#1a365d99', position: 0 },
          { hex: '#1a365dee', position: 1 },
        ], 270),
      ],
      autoLayout: vertical({ spacing: 16, padX: 120, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
      clipContent: true,
      children: [
        text('事業紹介', { fontSize: 40, fontWeight: 700, color: '#ffffff' }),
        text('Business Services', { fontSize: 14, fontWeight: 400, color: '#ffffff99', letterSpacing: { value: 200, unit: 'PERCENT' } }),
        rectangle('HeroSpacer', { size: { x: 1, y: 8 }, opacity: 0 }),
        text('テクノロジーの力で、ビジネスの未来を切り拓く', {
          fontSize: 18, fontWeight: 400, color: '#ffffffcc',
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),

    // ── Breadcrumb ──
    frame('Breadcrumb', {
      autoLayout: horizontal({ spacing: 8, padX: 120, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f5f5f5')],
      children: [
        text('ホーム', { fontSize: 12, fontWeight: 400, color: '#2563eb' }),
        text('>', { fontSize: 12, fontWeight: 400, color: '#999999' }),
        text('事業紹介', { fontSize: 12, fontWeight: 400, color: '#666666' }),
      ],
    }),

    // ── Service Cards Section ──
    frame('ServiceCards', {
      autoLayout: vertical({ spacing: 48, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('主要サービス', { fontSize: 28, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
        rectangle('SvcUnderline', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),
        text('お客様のビジネス課題に最適なソリューションをご提供いたします。', {
          fontSize: 15, fontWeight: 400, color: '#4a5568',
          textAlignHorizontal: 'CENTER',
        }),
        frame('CardRow', {
          autoLayout: horizontal({ spacing: 30 }),
          children: [
            serviceCard(
              '../assets/product-1.png',
              'クラウドソリューション',
              'エンタープライズ向けクラウド基盤の設計・構築・運用をワンストップで提供。マルチクラウド環境にも対応しています。',
              ['AWS', 'Azure', 'GCP'],
            ),
            serviceCard(
              '../assets/product-2.png',
              'AIプラットフォーム',
              '機械学習・深層学習を活用したデータ分析基盤の構築。業務効率化から意思決定支援まで幅広くサポートします。',
              ['機械学習', 'NLP', '画像認識'],
            ),
            serviceCard(
              '../assets/product-3.png',
              'DXコンサルティング',
              'デジタルトランスフォーメーション戦略の策定から実行まで伴走。組織変革と技術導入を一体的に推進します。',
              ['戦略策定', '業務改革', 'PMO'],
            ),
          ],
        }),
      ],
    }),

    // ── Service Detail Sections ──
    frame('ServiceDetails', {
      autoLayout: vertical({ spacing: 64, padX: 120, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f5f5f5')],
      children: [
        text('サービス詳細', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        serviceDetail(
          'システムインテグレーション',
          'System Integration',
          '基幹システムからWeb系システムまで、お客様の業務要件に合わせた最適なシステムを設計・構築いたします。アジャイル開発手法を取り入れ、迅速かつ柔軟な開発を実現します。',
          [
            '要件定義から保守運用までのフルライフサイクル支援',
            'マイクロサービスアーキテクチャによる柔軟な設計',
            'DevOps/CI-CDパイプラインの構築',
            'レガシーシステムのモダナイゼーション',
          ],
          false,
        ),
        divider('#d1d5db'),
        serviceDetail(
          'セキュリティサービス',
          'Security Services',
          'サイバーセキュリティの脅威が増大する中、企業の情報資産を守るための包括的なセキュリティサービスを提供します。ゼロトラストアーキテクチャの導入からインシデント対応まで。',
          [
            'セキュリティ診断・脆弱性評価',
            'SOC（セキュリティオペレーションセンター）運用',
            'ゼロトラストネットワーク設計・構築',
            'セキュリティ教育・研修プログラム',
          ],
          true,
        ),
        divider('#d1d5db'),
        serviceDetail(
          'データアナリティクス',
          'Data Analytics',
          'ビッグデータの収集・蓄積・分析から可視化まで、データドリブンな意思決定を支援します。BIツールの導入からデータ基盤の構築まで幅広く対応いたします。',
          [
            'データレイク・データウェアハウス構築',
            'リアルタイムデータ分析基盤',
            'BIダッシュボード設計・開発',
            '予測分析・最適化モデル構築',
          ],
          false,
        ),
      ],
    }),

    // ── CTA Section ──
    frame('CTA', {
      size: { x: 1440, y: 280 },
      fills: [
        solid('#1a365d'),
        gradient([
          { hex: '#2563eb33', position: 0 },
          { hex: '#1a365d00', position: 1 },
        ], 0),
      ],
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
      children: [
        text('お客様のビジネス課題をお聞かせください', {
          fontSize: 28, fontWeight: 700, color: '#ffffff',
          textAlignHorizontal: 'CENTER',
        }),
        text('経験豊富なコンサルタントが、最適なソリューションをご提案いたします。', {
          fontSize: 15, fontWeight: 400, color: '#ffffffcc',
          textAlignHorizontal: 'CENTER',
        }),
        rectangle('CtaSpacer', { size: { x: 1, y: 8 }, opacity: 0 }),
        frame('CtaButton', {
          autoLayout: horizontal({ padX: 40, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#2563eb')],
          cornerRadius: 8,
          children: [
            text('お問い合わせはこちら', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
      ],
    }),

    // ── Footer ──
    frame('Footer', {
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 60 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#1a365d')],
      children: [
        frame('FooterLinks', {
          autoLayout: horizontal({ spacing: 48 }),
          children: [
            text('会社情報', { fontSize: 13, fontWeight: 400, color: '#ffffffcc' }),
            text('事業紹介', { fontSize: 13, fontWeight: 400, color: '#ffffffcc' }),
            text('採用情報', { fontSize: 13, fontWeight: 400, color: '#ffffffcc' }),
            text('IR情報', { fontSize: 13, fontWeight: 400, color: '#ffffffcc' }),
            text('お問い合わせ', { fontSize: 13, fontWeight: 400, color: '#ffffffcc' }),
            text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#ffffffcc' }),
          ],
        }),
        rectangle('FooterDivider', {
          size: { x: 1, y: 1 },
          fills: [solid('#ffffff', 0.2)],
          layoutSizingHorizontal: 'FILL',
        }),
        text('© 2026 株式会社テックイノベーション All Rights Reserved.', {
          fontSize: 12, fontWeight: 400, color: '#ffffff99',
        }),
      ],
    }),
  ],
});
