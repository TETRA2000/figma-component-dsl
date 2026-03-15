/**
 * Seminars & Events page (セミナー・イベント)
 * Japanese corporate events page with featured event, upcoming list, and past archive.
 */
import {
  frame, text, image, rectangle,
  solid, hex, imageFill, gradient,
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

function eventTypeBadge(label: string, bgColor: string, textColor: string) {
  return frame(`Badge: ${label}`, {
    autoLayout: horizontal({ padX: 12, padY: 4 }),
    fills: [solid(bgColor)],
    cornerRadius: 4,
    children: [
      text(label, { fontSize: 12, fontWeight: 600, color: textColor }),
    ],
  });
}

function upcomingEventRow(
  date: string,
  eventType: string,
  title: string,
  venue: string,
  capacity: string,
) {
  return frame(`Event: ${title}`, {
    autoLayout: horizontal({ spacing: 24, padX: 32, padY: 24, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: hex('#e2e8f0'), weight: 1, align: 'INSIDE' }],
    children: [
      frame('DateBlock', {
        size: { x: 80, y: undefined },
        autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }),
        children: [
          text(date.split('.')[0] + '.' + date.split('.')[1], { fontSize: 13, fontWeight: 500, color: '#64748b', textAlignHorizontal: 'CENTER' }),
          text(date.split('.')[2], { fontSize: 32, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
        ],
      }),
      rectangle('EventRowDivider', {
        size: { x: 1, y: 60 },
        fills: [solid('#e2e8f0')],
      }),
      frame('EventInfo', {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('EventMeta', {
            autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
            children: [
              eventTypeBadge(eventType, '#eef2ff', '#2563eb'),
              text(`会場: ${venue}`, { fontSize: 12, color: '#64748b' }),
              text(`定員: ${capacity}`, { fontSize: 12, color: '#64748b' }),
            ],
          }),
          text(title, { fontSize: 16, fontWeight: 600, color: '#1a365d' }),
        ],
      }),
      frame('ApplyBtn', {
        autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#2563eb')],
        cornerRadius: 4,
        children: [
          text('申し込む', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
        ],
      }),
    ],
  });
}

function pastEventRow(date: string, title: string, participants: string) {
  return frame(`PastEvent: ${title}`, {
    autoLayout: horizontal({ spacing: 16, padX: 0, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(date, { fontSize: 13, color: '#64748b', size: { x: 100 }, textAutoResize: 'HEIGHT' }),
      text(title, {
        fontSize: 14, color: '#334155',
        layoutSizingHorizontal: 'FILL',
      }),
      text(`参加者: ${participants}名`, { fontSize: 13, color: '#64748b' }),
    ],
  });
}

export default frame('EventsPage', {
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
        text('セミナー・イベント', { fontSize: 36, fontWeight: 700, color: '#1a365d' }),
        text('Seminars & Events', { fontSize: 16, fontWeight: 400, color: '#64748b', letterSpacing: { value: 200, unit: 'PERCENT' } }),
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
        text('事業・サービス', { fontSize: 13, color: '#2563eb' }),
        text('>', { fontSize: 13, color: '#94a3b8' }),
        text('セミナー・イベント', { fontSize: 13, color: '#334155' }),
      ],
    }),

    // Featured Event Section
    frame('FeaturedEventSection', {
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 60, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('注目のイベント', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        rectangle('FeaturedAccent', { size: { x: 60, y: 4 }, fills: [solid('#2563eb')], cornerRadius: 2 }),
        frame('FeaturedCard', {
          autoLayout: horizontal({ spacing: 0 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          strokes: [{ color: hex('#e2e8f0'), weight: 1, align: 'INSIDE' }],
          clipContent: true,
          children: [
            image('FeaturedImage', {
              src: '../assets/event-seminar.png',
              size: { x: 600, y: 350 },
              fit: 'FILL',
            }),
            frame('FeaturedContent', {
              size: { x: 600, y: 350 },
              autoLayout: vertical({ spacing: 20, padX: 40, padY: 40, align: 'CENTER' }),
              fills: [solid('#ffffff')],
              children: [
                frame('FeaturedBadges', {
                  autoLayout: horizontal({ spacing: 8 }),
                  children: [
                    eventTypeBadge('セミナー', '#eef2ff', '#2563eb'),
                    eventTypeBadge('無料', '#ecfdf5', '#059669'),
                  ],
                }),
                text('AI時代のDX戦略\n～製造業における実践事例と最新動向～', {
                  fontSize: 24, fontWeight: 700, color: '#1a365d',
                  lineHeight: { value: 150, unit: 'PERCENT' },
                  size: { x: 520 }, textAutoResize: 'HEIGHT',
                }),
                frame('FeaturedDetails', {
                  autoLayout: vertical({ spacing: 8 }),
                  children: [
                    text('日時: 2026年4月15日（水）14:00〜17:00', { fontSize: 14, color: '#475569' }),
                    text('会場: 東京本社 イノベーションホール', { fontSize: 14, color: '#475569' }),
                    text('定員: 150名（先着順）', { fontSize: 14, color: '#475569' }),
                  ],
                }),
                frame('FeaturedCTA', {
                  autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#2563eb')],
                  cornerRadius: 4,
                  children: [
                    text('お申し込みはこちら', { fontSize: 15, fontWeight: 600, color: '#ffffff' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Upcoming Events Section
    frame('UpcomingEventsSection', {
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 60, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f5f5f5')],
      children: [
        text('開催予定のイベント', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        rectangle('UpcomingAccent', { size: { x: 60, y: 4 }, fills: [solid('#2563eb')], cornerRadius: 2 }),
        frame('UpcomingList', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            upcomingEventRow(
              '2026.04.22',
              'ウェビナー',
              'クラウドネイティブ開発入門 ～マイクロサービスアーキテクチャの実践～',
              'オンライン',
              '300名',
            ),
            upcomingEventRow(
              '2026.05.10',
              'セミナー',
              'データドリブン経営の実現 ～BIツール活用による意思決定の高速化～',
              '大阪支社',
              '80名',
            ),
            upcomingEventRow(
              '2026.05.25',
              'ワークショップ',
              'ゼロトラストセキュリティ導入ワークショップ ～実践ハンズオン～',
              '東京本社',
              '40名',
            ),
            upcomingEventRow(
              '2026.06.08',
              'カンファレンス',
              'テクノフューチャー Technology Summit 2026',
              '東京国際フォーラム',
              '500名',
            ),
          ],
        }),
      ],
    }),

    // Past Events Archive Section
    frame('PastEventsSection', {
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 60 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('過去のイベント', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        rectangle('PastAccent', { size: { x: 60, y: 4 }, fills: [solid('#2563eb')], cornerRadius: 2 }),
        frame('PastEventsList', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            pastEventRow('2026.03.05', 'サイバーセキュリティ対策セミナー ～最新の脅威動向と対策～', '120'),
            rectangle('PastDivider1', { size: { x: 1, y: 1 }, fills: [solid('#e2e8f0')], layoutSizingHorizontal: 'FILL' }),
            pastEventRow('2026.02.18', 'AI活用によるカスタマーサービス改革 ～チャットボット導入事例～', '95'),
            rectangle('PastDivider2', { size: { x: 1, y: 1 }, fills: [solid('#e2e8f0')], layoutSizingHorizontal: 'FILL' }),
            pastEventRow('2026.01.22', 'DX推進リーダー育成プログラム 第3期 成果発表会', '150'),
            rectangle('PastDivider3', { size: { x: 1, y: 1 }, fills: [solid('#e2e8f0')], layoutSizingHorizontal: 'FILL' }),
            pastEventRow('2025.12.10', '年次テクノロジーカンファレンス 2025', '380'),
            rectangle('PastDivider4', { size: { x: 1, y: 1 }, fills: [solid('#e2e8f0')], layoutSizingHorizontal: 'FILL' }),
            pastEventRow('2025.11.15', 'IoTプラットフォーム構築セミナー ～スマートファクトリー実現への道～', '110'),
          ],
        }),
        frame('ArchiveLink', {
          autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#f0f4f8')],
          cornerRadius: 4,
          children: [
            text('過去のイベント一覧を見る', { fontSize: 14, fontWeight: 600, color: '#2563eb' }),
          ],
        }),
      ],
    }),

    // Footer
    footer(),
  ],
});
