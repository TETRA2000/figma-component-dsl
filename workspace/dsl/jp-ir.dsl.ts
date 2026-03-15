import {
  frame, text, rectangle, image,
  solid, gradient, hex, imageFill,
  horizontal, vertical,
  statBlock, divider,
} from '@figma-dsl/core';

// ── Helpers ──

function navLink(label: string) {
  return text(label, { fontSize: 14, fontWeight: 500, color: '#ffffff' });
}

function calendarItem(date: string, title: string, badge?: string) {
  return frame(`Calendar: ${title}`, {
    autoLayout: horizontal({ spacing: 20, padX: 24, padY: 18, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('CalDate', {
        size: { x: 100, y: undefined },
        autoLayout: vertical({ spacing: 0 }),
        children: [
          text(date, { fontSize: 14, fontWeight: 600, color: '#1a365d' }),
        ],
      }),
      text(title, {
        fontSize: 14, fontWeight: 400, color: '#333333',
        size: { x: 700 }, textAutoResize: 'HEIGHT',
        lineHeight: { value: 160, unit: 'PERCENT' },
      }),
      ...(badge ? [
        frame('CalBadge', {
          autoLayout: horizontal({ padX: 12, padY: 4 }),
          fills: [solid(badge === '重要' ? '#dc2626' : '#2563eb')],
          cornerRadius: 4,
          children: [
            text(badge, { fontSize: 11, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
      ] : []),
    ],
  });
}

function documentRow(title: string, fileType: string, date: string) {
  return frame(`Doc: ${title}`, {
    autoLayout: horizontal({ spacing: 0, padX: 24, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('DocInfo', {
        autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
        children: [
          frame('FileIcon', {
            size: { x: 36, y: 36 },
            autoLayout: vertical({ spacing: 0, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#dc2626')],
            cornerRadius: 4,
            children: [
              text(fileType, { fontSize: 10, fontWeight: 700, color: '#ffffff' }),
            ],
          }),
          frame('DocText', {
            autoLayout: vertical({ spacing: 4 }),
            children: [
              text(title, { fontSize: 14, fontWeight: 500, color: '#1a365d' }),
              text(date, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
            ],
          }),
        ],
      }),
      frame('DownloadBtn', {
        autoLayout: horizontal({ padX: 20, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
        cornerRadius: 6,
        strokes: [{ color: hex('#2563eb'), weight: 1, align: 'INSIDE' as const }],
        children: [
          text('ダウンロード', { fontSize: 13, fontWeight: 500, color: '#2563eb' }),
        ],
      }),
    ],
  });
}

function stockInfoItem(label: string, value: string) {
  return frame(`Stock: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padY: 14, align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 14, fontWeight: 400, color: '#4a5568' }),
      text(value, { fontSize: 14, fontWeight: 600, color: '#1a365d' }),
    ],
  });
}

// ── Page ──

export default frame('JpIR', {
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
        text('IR情報', { fontSize: 36, fontWeight: 700, color: '#ffffff' }),
        text('Investor Relations', { fontSize: 14, fontWeight: 400, color: '#ffffff99', letterSpacing: { value: 200, unit: 'PERCENT' } }),
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
        text('IR情報', { fontSize: 12, fontWeight: 400, color: '#666666' }),
      ],
    }),

    // ── Financial Highlights ──
    frame('FinancialHighlights', {
      autoLayout: vertical({ spacing: 48, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('業績ハイライト', { fontSize: 28, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
        rectangle('FinUnderline', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),
        text('2026年3月期 第3四半期（累計）', {
          fontSize: 15, fontWeight: 400, color: '#6b7280',
          textAlignHorizontal: 'CENTER',
        }),
        frame('StatRow', {
          autoLayout: horizontal({ spacing: 32 }),
          children: [
            frame('Stat1', {
              size: { x: 260, y: undefined },
              autoLayout: vertical({ spacing: 12, padX: 32, padY: 32, counterAlign: 'CENTER' }),
              fills: [solid('#f8fafc')],
              cornerRadius: 12,
              strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
              children: [
                text('売上高', { fontSize: 14, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
                text('2,480億円', { fontSize: 32, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
                text('前年同期比 +8.2%', { fontSize: 13, fontWeight: 500, color: '#16a34a', textAlignHorizontal: 'CENTER' }),
              ],
            }),
            frame('Stat2', {
              size: { x: 260, y: undefined },
              autoLayout: vertical({ spacing: 12, padX: 32, padY: 32, counterAlign: 'CENTER' }),
              fills: [solid('#f8fafc')],
              cornerRadius: 12,
              strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
              children: [
                text('営業利益', { fontSize: 14, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
                text('312億円', { fontSize: 32, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
                text('前年同期比 +12.5%', { fontSize: 13, fontWeight: 500, color: '#16a34a', textAlignHorizontal: 'CENTER' }),
              ],
            }),
            frame('Stat3', {
              size: { x: 260, y: undefined },
              autoLayout: vertical({ spacing: 12, padX: 32, padY: 32, counterAlign: 'CENTER' }),
              fills: [solid('#f8fafc')],
              cornerRadius: 12,
              strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
              children: [
                text('経常利益', { fontSize: 14, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
                text('298億円', { fontSize: 32, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
                text('前年同期比 +9.8%', { fontSize: 13, fontWeight: 500, color: '#16a34a', textAlignHorizontal: 'CENTER' }),
              ],
            }),
            frame('Stat4', {
              size: { x: 260, y: undefined },
              autoLayout: vertical({ spacing: 12, padX: 32, padY: 32, counterAlign: 'CENTER' }),
              fills: [solid('#f8fafc')],
              cornerRadius: 12,
              strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
              children: [
                text('純利益', { fontSize: 14, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
                text('205億円', { fontSize: 32, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
                text('前年同期比 +11.3%', { fontSize: 13, fontWeight: 500, color: '#16a34a', textAlignHorizontal: 'CENTER' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ── IR Calendar ──
    frame('IRCalendar', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f5f5f5')],
      children: [
        text('IRカレンダー', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        rectangle('CalUnderline', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),
        rectangle('CalSpacer', { size: { x: 1, y: 8 }, opacity: 0 }),
        calendarItem('2026.05.14', '2026年3月期 決算発表', '重要'),
        calendarItem('2026.06.25', '第52回 定時株主総会', '重要'),
        calendarItem('2026.06.30', '配当金支払開始予定日'),
        calendarItem('2026.08.07', '2027年3月期 第1四半期 決算発表'),
        calendarItem('2026.11.06', '2027年3月期 第2四半期 決算発表'),
      ],
    }),

    // ── Document Downloads ──
    frame('Documents', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('IRライブラリ', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        rectangle('DocUnderline', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),
        text('決算資料・報告書などのIR関連資料をダウンロードいただけます。', {
          fontSize: 15, fontWeight: 400, color: '#4a5568',
        }),
        rectangle('DocSpacer', { size: { x: 1, y: 8 }, opacity: 0 }),
        documentRow('2026年3月期 第3四半期 決算短信', 'PDF', '2026年2月6日'),
        divider('#e5e7eb'),
        documentRow('2026年3月期 第3四半期 決算説明資料', 'PDF', '2026年2月6日'),
        divider('#e5e7eb'),
        documentRow('2026年3月期 第2四半期 決算短信', 'PDF', '2025年11月7日'),
        divider('#e5e7eb'),
        documentRow('統合報告書 2025', 'PDF', '2025年9月30日'),
        divider('#e5e7eb'),
        documentRow('コーポレートガバナンス報告書', 'PDF', '2025年7月15日'),
        divider('#e5e7eb'),
        documentRow('有価証券報告書（第51期）', 'PDF', '2025年6月27日'),
      ],
    }),

    // ── Stock Information ──
    frame('StockInfo', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f5f5f5')],
      children: [
        text('株式情報', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        rectangle('StockUnderline', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),
        rectangle('StockSpacer', { size: { x: 1, y: 8 }, opacity: 0 }),
        frame('StockCard', {
          size: { x: 1200, y: undefined },
          autoLayout: vertical({ spacing: 0, padX: 40, padY: 32 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
          children: [
            frame('StockHeader', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('StockName', {
                  autoLayout: vertical({ spacing: 4 }),
                  children: [
                    text('テックイノベーション（9999）', { fontSize: 18, fontWeight: 700, color: '#1a365d' }),
                    text('東京証券取引所 プライム市場', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
                  ],
                }),
                frame('StockPrice', {
                  autoLayout: vertical({ spacing: 4, counterAlign: 'MAX' }),
                  children: [
                    text('¥4,285', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
                    text('+65 (+1.54%)', { fontSize: 14, fontWeight: 500, color: '#16a34a' }),
                  ],
                }),
              ],
            }),
            rectangle('StockDivider', { size: { x: 1, y: 24 }, opacity: 0 }),
            divider('#e5e7eb'),
            stockInfoItem('証券コード', '9999'),
            divider('#e5e7eb'),
            stockInfoItem('上場市場', '東京証券取引所 プライム市場'),
            divider('#e5e7eb'),
            stockInfoItem('発行済株式数', '120,000,000 株'),
            divider('#e5e7eb'),
            stockInfoItem('配当金（年間予想）', '¥85 / 株'),
            divider('#e5e7eb'),
            stockInfoItem('配当利回り', '1.98%'),
            divider('#e5e7eb'),
            stockInfoItem('PER（予想）', '18.5 倍'),
            divider('#e5e7eb'),
            stockInfoItem('PBR', '2.1 倍'),
            divider('#e5e7eb'),
            stockInfoItem('決算期', '3月'),
          ],
        }),
      ],
    }),

    // ── Contact Section ──
    frame('IRContact', {
      size: { x: 1440, y: 200 },
      fills: [solid('#1a365d')],
      autoLayout: vertical({ spacing: 16, padX: 120, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
      children: [
        text('IR関連のお問い合わせ', { fontSize: 22, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        text('IR担当：経営企画部 IR室　TEL: 03-1234-5678　Email: ir@techinnovation.co.jp', {
          fontSize: 14, fontWeight: 400, color: '#ffffffcc',
          textAlignHorizontal: 'CENTER',
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
