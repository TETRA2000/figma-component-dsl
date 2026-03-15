/**
 * Office Locations page (拠点情報)
 * Japanese corporate office locations with map, office cards, and global network.
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
          image('Logo', { src: './assets/company-logo.png', size: { x: 180, y: 50 } }),
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
              image('FooterLogo', { src: './assets/company-logo.png', size: { x: 180, y: 50 } }),
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

function officeCard(
  name: string,
  imgSrc: string,
  officeName: string,
  address: string,
  phone: string,
  description: string,
) {
  return frame(name, {
    size: { x: 380, y: undefined },
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: hex('#e2e8f0'), weight: 1, align: 'INSIDE' }],
    clipContent: true,
    children: [
      image(`${name}Image`, { src: imgSrc, size: { x: 380, y: 253 }, fit: 'FILL' }),
      frame(`${name}Content`, {
        autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(officeName, { fontSize: 20, fontWeight: 700, color: '#1a365d' }),
          rectangle(`${name}Divider`, {
            size: { x: 1, y: 1 },
            fills: [solid('#e2e8f0')],
            layoutSizingHorizontal: 'FILL',
          }),
          text(description, {
            fontSize: 14, color: '#475569',
            lineHeight: { value: 170, unit: 'PERCENT' },
            size: { x: 332 }, textAutoResize: 'HEIGHT',
          }),
          frame(`${name}Address`, {
            autoLayout: horizontal({ spacing: 8 }),
            children: [
              text('住所:', { fontSize: 13, fontWeight: 600, color: '#64748b' }),
              text(address, {
                fontSize: 13, color: '#334155',
                lineHeight: { value: 160, unit: 'PERCENT' },
                size: { x: 280 }, textAutoResize: 'HEIGHT',
              }),
            ],
          }),
          frame(`${name}Phone`, {
            autoLayout: horizontal({ spacing: 8 }),
            children: [
              text('TEL:', { fontSize: 13, fontWeight: 600, color: '#64748b' }),
              text(phone, { fontSize: 13, color: '#334155' }),
            ],
          }),
        ],
      }),
    ],
  });
}

export default frame('LocationsPage', {
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
        text('拠点情報', { fontSize: 36, fontWeight: 700, color: '#1a365d' }),
        text('Office Locations', { fontSize: 16, fontWeight: 400, color: '#64748b', letterSpacing: { value: 200, unit: 'PERCENT' } }),
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
        text('拠点情報', { fontSize: 13, color: '#334155' }),
      ],
    }),

    // Japan Map Section
    frame('MapSection', {
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 60, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('国内拠点', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        rectangle('MapAccent', { size: { x: 60, y: 4 }, fills: [solid('#2563eb')], cornerRadius: 2 }),
        text('全国3拠点のネットワークで、お客様のビジネスをサポートいたします。', {
          fontSize: 16, color: '#475569',
          lineHeight: { value: 170, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),
        image('MapJapan', {
          src: './assets/map-japan.png',
          size: { x: 800, y: 500 },
          cornerRadius: 8,
        }),
      ],
    }),

    // Office Cards
    frame('OfficeCardsSection', {
      autoLayout: horizontal({ spacing: 32, padX: 80, padY: 0, counterAlign: 'MIN', align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        officeCard(
          'OfficeTokyo',
          './assets/office-tokyo.png',
          '東京本社',
          '東京都千代田区千代田1-1-1\nテクノフューチャービル 15F',
          '03-1234-5678',
          '本社機能および研究開発拠点。最新のイノベーションラボを併設しています。',
        ),
        officeCard(
          'OfficeOsaka',
          './assets/office-osaka.png',
          '大阪支社',
          '大阪府大阪市北区梅田2-2-2\n大阪スカイビル 8F',
          '06-2345-6789',
          '西日本エリアの営業・コンサルティング拠点。関西の製造業DXを推進しています。',
        ),
        officeCard(
          'OfficeNagoya',
          './assets/office-nagoya.png',
          '名古屋支社',
          '愛知県名古屋市中区栄3-3-3\n名古屋テックセンター 5F',
          '052-3456-7890',
          '中部エリアの拠点。自動車産業を中心としたIoTソリューションを展開しています。',
        ),
      ],
    }),

    // Global Network Section
    frame('GlobalSection', {
      autoLayout: vertical({ spacing: 40, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f0f4f8')],
      children: [
        text('グローバルネットワーク', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        rectangle('GlobalAccent', { size: { x: 60, y: 4 }, fills: [solid('#2563eb')], cornerRadius: 2 }),
        text('海外パートナーとの連携により、世界各地でサービスを提供しています。', {
          fontSize: 16, color: '#475569',
          lineHeight: { value: 170, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),
        frame('GlobalStats', {
          autoLayout: horizontal({ spacing: 60, counterAlign: 'CENTER' }),
          children: [
            frame('Stat1', {
              autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                text('12', { fontSize: 48, fontWeight: 700, color: '#2563eb' }),
                text('提携国・地域', { fontSize: 14, color: '#64748b' }),
              ],
            }),
            frame('Stat2', {
              autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                text('25+', { fontSize: 48, fontWeight: 700, color: '#2563eb' }),
                text('海外パートナー企業', { fontSize: 14, color: '#64748b' }),
              ],
            }),
            frame('Stat3', {
              autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                text('500+', { fontSize: 48, fontWeight: 700, color: '#2563eb' }),
                text('グローバルプロジェクト', { fontSize: 14, color: '#64748b' }),
              ],
            }),
          ],
        }),
        frame('GlobalLocations', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            frame('Region1', {
              size: { x: 250, y: undefined },
              autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
              fills: [solid('#ffffff')],
              cornerRadius: 8,
              children: [
                text('アジア太平洋', { fontSize: 16, fontWeight: 700, color: '#1a365d' }),
                text('シンガポール / 上海 / バンコク / ジャカルタ', {
                  fontSize: 13, color: '#475569',
                  lineHeight: { value: 170, unit: 'PERCENT' },
                  size: { x: 202 }, textAutoResize: 'HEIGHT',
                }),
              ],
            }),
            frame('Region2', {
              size: { x: 250, y: undefined },
              autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
              fills: [solid('#ffffff')],
              cornerRadius: 8,
              children: [
                text('北米', { fontSize: 16, fontWeight: 700, color: '#1a365d' }),
                text('サンフランシスコ / ニューヨーク / トロント', {
                  fontSize: 13, color: '#475569',
                  lineHeight: { value: 170, unit: 'PERCENT' },
                  size: { x: 202 }, textAutoResize: 'HEIGHT',
                }),
              ],
            }),
            frame('Region3', {
              size: { x: 250, y: undefined },
              autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
              fills: [solid('#ffffff')],
              cornerRadius: 8,
              children: [
                text('ヨーロッパ', { fontSize: 16, fontWeight: 700, color: '#1a365d' }),
                text('ロンドン / フランクフルト / アムステルダム', {
                  fontSize: 13, color: '#475569',
                  lineHeight: { value: 170, unit: 'PERCENT' },
                  size: { x: 202 }, textAutoResize: 'HEIGHT',
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
