/**
 * お問い合わせ (Contact) — Japanese corporate contact page
 */
import {
  frame, text, rectangle, image,
  solid, hex, imageFill,
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

// ── Form field helper ──────────────────────────────────────

function formField(label: string, width: number, height: number) {
  return frame(`Field-${label}`, {
    autoLayout: vertical({ spacing: 8 }),
    children: [
      text(label, { fontSize: 14, fontWeight: 500, color: '#374151' }),
      frame(`Input-${label}`, {
        size: { x: width, y: height },
        autoLayout: horizontal({ padX: 16, padY: 12, counterAlign: 'CENTER' }),
        fills: [solid('#ffffff')],
        cornerRadius: 6,
        strokes: [{ color: hex('#d1d5db'), weight: 1, align: 'INSIDE' }],
        children: [
          text('入力してください', { fontSize: 14, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}

// ── Main page ──────────────────────────────────────────────

export default frame('ContactPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Navigation
    navbar(),

    // Page Title Section
    frame('PageTitleSection', {
      size: { x: 1440, y: 200 },
      autoLayout: vertical({ spacing: 12, padX: 80, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid('#f0f4f8')],
      children: [
        text('お問い合わせ', { fontSize: 36, fontWeight: 700, color: '#1a365d' }),
        text('Contact Us', { fontSize: 16, fontWeight: 400, color: '#64748b', letterSpacing: { value: 200, unit: 'PERCENT' } }),
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
        text('お問い合わせ', { fontSize: 12, color: '#64748b' }),
      ],
    }),

    // Contact Form Section
    frame('FormSection', {
      size: { x: 1440, y: undefined },
      autoLayout: horizontal({ spacing: 60, padX: 80, padY: 80 }),
      fills: [solid('#ffffff')],
      children: [
        // Form area
        frame('FormArea', {
          autoLayout: vertical({ spacing: 24 }),
          size: { x: 700, y: undefined },
          children: [
            text('お問い合わせフォーム', { fontSize: 24, fontWeight: 700, color: '#1a365d' }),
            text('下記フォームに必要事項をご記入の上、送信ボタンを押してください。\n担当者より2営業日以内にご連絡いたします。', {
              fontSize: 14, color: '#4b5563',
              size: { x: 700 }, textAutoResize: 'HEIGHT',
              lineHeight: { value: 180, unit: 'PERCENT' },
            }),

            // Name row
            frame('NameRow', {
              autoLayout: horizontal({ spacing: 24 }),
              children: [
                formField('お名前（姓）', 338, 48),
                formField('お名前（名）', 338, 48),
              ],
            }),

            formField('メールアドレス', 700, 48),
            formField('会社名', 700, 48),
            formField('電話番号', 700, 48),

            // Subject dropdown
            frame('Field-Subject', {
              autoLayout: vertical({ spacing: 8 }),
              children: [
                text('お問い合わせ種別', { fontSize: 14, fontWeight: 500, color: '#374151' }),
                frame('Select-Subject', {
                  size: { x: 700, y: 48 },
                  autoLayout: horizontal({ padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  fills: [solid('#ffffff')],
                  cornerRadius: 6,
                  strokes: [{ color: hex('#d1d5db'), weight: 1, align: 'INSIDE' }],
                  children: [
                    text('選択してください', { fontSize: 14, color: '#9ca3af' }),
                    text('▼', { fontSize: 12, color: '#9ca3af' }),
                  ],
                }),
              ],
            }),

            formField('お問い合わせ内容', 700, 180),

            // Privacy policy checkbox
            frame('PrivacyCheck', {
              autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
              children: [
                rectangle('Checkbox', {
                  size: { x: 20, y: 20 },
                  fills: [solid('#ffffff')],
                  cornerRadius: 4,
                  strokes: [{ color: hex('#d1d5db'), weight: 1, align: 'INSIDE' }],
                }),
                text('個人情報の取り扱いについて同意する', { fontSize: 14, color: '#374151' }),
              ],
            }),

            // Submit button
            frame('SubmitBtn', {
              size: { x: 280, y: 56 },
              autoLayout: horizontal({ padX: 40, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#2563eb')],
              cornerRadius: 6,
              children: [
                text('送信する', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),

        // Contact info sidebar
        frame('ContactInfo', {
          autoLayout: vertical({ spacing: 32, padX: 32, padY: 32 }),
          size: { x: 480, y: undefined },
          fills: [solid('#f8fafc')],
          cornerRadius: 12,
          children: [
            text('お問い合わせ先', { fontSize: 20, fontWeight: 700, color: '#1a365d' }),

            frame('PhoneInfo', {
              autoLayout: vertical({ spacing: 8 }),
              children: [
                text('お電話でのお問い合わせ', { fontSize: 14, fontWeight: 600, color: '#374151' }),
                text('03-1234-5678', { fontSize: 28, fontWeight: 700, color: '#2563eb' }),
                text('受付時間：平日 9:00〜18:00', { fontSize: 13, color: '#6b7280' }),
              ],
            }),

            rectangle('InfoDivider', {
              size: { x: 1, y: 1 },
              fills: [solid('#e2e8f0')],
              layoutSizingHorizontal: 'FILL',
            }),

            frame('FaxInfo', {
              autoLayout: vertical({ spacing: 8 }),
              children: [
                text('FAX', { fontSize: 14, fontWeight: 600, color: '#374151' }),
                text('03-1234-5679', { fontSize: 18, fontWeight: 600, color: '#1a365d' }),
              ],
            }),

            rectangle('InfoDivider2', {
              size: { x: 1, y: 1 },
              fills: [solid('#e2e8f0')],
              layoutSizingHorizontal: 'FILL',
            }),

            frame('EmailInfo', {
              autoLayout: vertical({ spacing: 8 }),
              children: [
                text('メールでのお問い合わせ', { fontSize: 14, fontWeight: 600, color: '#374151' }),
                text('info@techno-corp.co.jp', { fontSize: 16, fontWeight: 500, color: '#2563eb' }),
              ],
            }),

            rectangle('InfoDivider3', {
              size: { x: 1, y: 1 },
              fills: [solid('#e2e8f0')],
              layoutSizingHorizontal: 'FILL',
            }),

            frame('HoursInfo', {
              autoLayout: vertical({ spacing: 8 }),
              children: [
                text('営業時間', { fontSize: 14, fontWeight: 600, color: '#374151' }),
                text('月曜日〜金曜日：9:00〜18:00\n土日祝日：休業', {
                  fontSize: 14, color: '#4b5563',
                  size: { x: 380 }, textAutoResize: 'HEIGHT',
                  lineHeight: { value: 170, unit: 'PERCENT' },
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Office & Map Section
    frame('OfficeMapSection', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 40, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      fills: [solid('#f5f5f5')],
      children: [
        text('アクセス', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        text('本社所在地のご案内', { fontSize: 16, color: '#64748b' }),

        frame('MapAndAddress', {
          autoLayout: horizontal({ spacing: 48 }),
          children: [
            image('Map', {
              src: './workspace/assets/map-japan.png',
              size: { x: 700, y: 440 },
              cornerRadius: 12,
            }),
            frame('AddressDetail', {
              autoLayout: vertical({ spacing: 24, padY: 16 }),
              size: { x: 480, y: undefined },
              children: [
                text('本社', { fontSize: 22, fontWeight: 700, color: '#1a365d' }),
                text('〒100-0001\n東京都千代田区丸の内1-1-1\nテクノビル 15F', {
                  fontSize: 16, color: '#374151',
                  size: { x: 480 }, textAutoResize: 'HEIGHT',
                  lineHeight: { value: 200, unit: 'PERCENT' },
                }),
                rectangle('AddrDivider', {
                  size: { x: 1, y: 1 },
                  fills: [solid('#e2e8f0')],
                  layoutSizingHorizontal: 'FILL',
                }),
                frame('TransportInfo', {
                  autoLayout: vertical({ spacing: 12 }),
                  children: [
                    text('交通アクセス', { fontSize: 16, fontWeight: 600, color: '#1a365d' }),
                    text('・JR東京駅 丸の内南口より徒歩5分\n・東京メトロ丸ノ内線 東京駅より徒歩3分\n・東京メトロ千代田線 二重橋前駅より徒歩2分', {
                      fontSize: 14, color: '#4b5563',
                      size: { x: 480 }, textAutoResize: 'HEIGHT',
                      lineHeight: { value: 200, unit: 'PERCENT' },
                    }),
                  ],
                }),

                // Office images
                frame('OfficeImages', {
                  autoLayout: horizontal({ spacing: 16 }),
                  children: [
                    image('OfficeTokyo', { src: './workspace/assets/office-tokyo.png', size: { x: 228, y: 152 }, cornerRadius: 8 }),
                    image('OfficeOsaka', { src: './workspace/assets/office-osaka.png', size: { x: 228, y: 152 }, cornerRadius: 8 }),
                  ],
                }),
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
