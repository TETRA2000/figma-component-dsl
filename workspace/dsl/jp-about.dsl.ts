import {
  frame, text, rectangle, image,
  solid, hex, imageFill,
  horizontal, vertical,
  divider,
} from '@figma-dsl/core';

// ── Helpers ──

function navLink(label: string) {
  return text(label, { fontSize: 14, fontWeight: 500, color: '#ffffff' });
}

function infoRow(label: string, value: string) {
  return frame(`Info: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padY: 20, counterAlign: 'MIN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('LabelCol', {
        size: { x: 200, y: undefined },
        autoLayout: vertical({ spacing: 0 }),
        fills: [solid('#f8fafc')],
        children: [
          text(label, { fontSize: 14, fontWeight: 600, color: '#1a365d', size: { x: 200 }, textAutoResize: 'HEIGHT' }),
        ],
      }),
      text(value, {
        fontSize: 14, fontWeight: 400, color: '#333333',
        size: { x: 800 }, textAutoResize: 'HEIGHT',
        lineHeight: { value: 170, unit: 'PERCENT' },
      }),
    ],
  });
}

// ── Page ──

export default frame('JpAbout', {
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

    // ── Page Title Banner ──
    frame('TitleBanner', {
      size: { x: 1440, y: 200 },
      fills: [solid('#1a365d')],
      autoLayout: vertical({ spacing: 12, padX: 120, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
      children: [
        text('会社概要', { fontSize: 36, fontWeight: 700, color: '#ffffff' }),
        text('Company Overview', { fontSize: 14, fontWeight: 400, color: '#ffffff99', letterSpacing: { value: 200, unit: 'PERCENT' } }),
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
        text('会社概要', { fontSize: 12, fontWeight: 400, color: '#666666' }),
      ],
    }),

    // ── Philosophy Section ──
    frame('Philosophy', {
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('企業理念', { fontSize: 28, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
        rectangle('PhiloUnderline', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),
        text('「技術と誠意で、持続可能な未来を共に創る」', {
          fontSize: 22, fontWeight: 600, color: '#1a365d',
          textAlignHorizontal: 'CENTER',
        }),
        text(
          '私たちは、最先端の技術力と真摯な姿勢をもって、お客様・パートナー・社会と共に\n持続可能な未来を実現することを企業活動の根幹としています。\n変化の激しい時代にあっても、誠実さと革新性を両立させ、\n社会から信頼される企業であり続けることを目指します。',
          {
            fontSize: 15, fontWeight: 400, color: '#4a5568',
            size: { x: 800 }, textAutoResize: 'HEIGHT',
            lineHeight: { value: 200, unit: 'PERCENT' },
            textAlignHorizontal: 'CENTER',
          },
        ),
      ],
    }),

    // ── Company Information Table ──
    frame('CompanyInfo', {
      autoLayout: vertical({ spacing: 0, padX: 120, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('会社情報', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        rectangle('InfoSpacer', { size: { x: 1, y: 32 }, opacity: 0 }),
        divider('#e5e7eb'),
        infoRow('会社名', '株式会社テックイノベーション'),
        divider('#e5e7eb'),
        infoRow('設立', '1975年4月1日'),
        divider('#e5e7eb'),
        infoRow('資本金', '150億円'),
        divider('#e5e7eb'),
        infoRow('代表取締役社長', '山田 太郎'),
        divider('#e5e7eb'),
        infoRow('従業員数', '12,500名（連結）'),
        divider('#e5e7eb'),
        infoRow('売上高', '3,200億円（2025年3月期）'),
        divider('#e5e7eb'),
        infoRow('本社所在地', '〒100-0005 東京都千代田区丸の内一丁目1番1号'),
        divider('#e5e7eb'),
        infoRow('事業内容', 'ITソリューション、システムインテグレーション、クラウドサービス、\nAI・IoTプラットフォーム、コンサルティング'),
        divider('#e5e7eb'),
      ],
    }),

    // ── Office Images ──
    frame('Offices', {
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f5f5f5')],
      children: [
        text('拠点紹介', { fontSize: 28, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
        rectangle('OfficeSpacer', { size: { x: 1, y: 8 }, opacity: 0 }),
        frame('OfficeRow', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            frame('Tokyo', {
              autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
              children: [
                image('OfficeTokyoImg', {
                  src: '../assets/office-tokyo.png',
                  size: { x: 380, y: 253 },
                  cornerRadius: 8,
                }),
                text('東京本社', { fontSize: 16, fontWeight: 600, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
                text('千代田区丸の内', { fontSize: 13, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
              ],
            }),
            frame('Osaka', {
              autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
              children: [
                image('OfficeOsakaImg', {
                  src: '../assets/office-osaka.png',
                  size: { x: 380, y: 253 },
                  cornerRadius: 8,
                }),
                text('大阪支社', { fontSize: 16, fontWeight: 600, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
                text('大阪市北区中之島', { fontSize: 13, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
              ],
            }),
            frame('Nagoya', {
              autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
              children: [
                image('OfficeNagoyaImg', {
                  src: '../assets/office-nagoya.png',
                  size: { x: 380, y: 253 },
                  cornerRadius: 8,
                }),
                text('名古屋支社', { fontSize: 16, fontWeight: 600, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
                text('名古屋市中村区名駅', { fontSize: 13, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
              ],
            }),
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
