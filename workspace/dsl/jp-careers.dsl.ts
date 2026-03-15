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

function valueCard(iconSrc: string, title: string, description: string) {
  return frame(`Value: ${title}`, {
    size: { x: 370, y: undefined },
    autoLayout: vertical({ spacing: 20, padX: 32, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
    children: [
      image(`ValueIcon: ${title}`, { src: iconSrc, size: { x: 80, y: 80 } }),
      text(title, { fontSize: 20, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#4a5568',
        size: { x: 306 }, textAutoResize: 'HEIGHT',
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
      }),
    ],
  });
}

function employeeVoice(
  imgSrc: string,
  name: string,
  department: string,
  year: string,
  quote: string,
) {
  return frame(`Voice: ${name}`, {
    size: { x: 560, y: undefined },
    autoLayout: horizontal({ spacing: 24, padX: 32, padY: 32, counterAlign: 'MIN' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
    children: [
      image(`Photo: ${name}`, {
        src: imgSrc,
        size: { x: 100, y: 100 },
        cornerRadius: 50,
        fit: 'FILL',
      }),
      frame('VoiceContent', {
        autoLayout: vertical({ spacing: 12 }),
        size: { x: 372, y: undefined },
        children: [
          text(name, { fontSize: 18, fontWeight: 700, color: '#1a365d' }),
          text(`${department} ／ ${year}入社`, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
          rectangle('VoiceSpacer', { size: { x: 1, y: 4 }, opacity: 0 }),
          text(quote, {
            fontSize: 14, fontWeight: 400, color: '#4a5568',
            size: { x: 372 }, textAutoResize: 'HEIGHT',
            lineHeight: { value: 180, unit: 'PERCENT' },
          }),
        ],
      }),
    ],
  });
}

function positionRow(title: string, department: string, location: string, type: string) {
  return frame(`Position: ${title}`, {
    autoLayout: horizontal({ spacing: 0, padX: 24, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('PositionInfo', {
        autoLayout: vertical({ spacing: 6 }),
        size: { x: 600, y: undefined },
        children: [
          text(title, { fontSize: 16, fontWeight: 600, color: '#1a365d' }),
          text(`${department} ｜ ${location}`, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
        ],
      }),
      frame('PositionType', {
        autoLayout: horizontal({ padX: 16, padY: 6 }),
        fills: [solid('#eef2ff')],
        cornerRadius: 4,
        children: [
          text(type, { fontSize: 12, fontWeight: 500, color: '#2563eb' }),
        ],
      }),
      frame('ApplyButton', {
        autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#2563eb')],
        cornerRadius: 6,
        children: [
          text('詳細を見る', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
        ],
      }),
    ],
  });
}

// ── Page ──

export default frame('JpCareers', {
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
        image('Logo', { src: './assets/company-logo.png', size: { x: 180, y: 50 } }),
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

    // ── Hero Section ──
    frame('Hero', {
      size: { x: 1440, y: 450 },
      fills: [
        imageFill('./assets/hero-careers.png'),
        gradient([
          { hex: '#1a365d33', position: 0 },
          { hex: '#1a365ddd', position: 1 },
        ], 270),
      ],
      autoLayout: vertical({ spacing: 20, padX: 120, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
      clipContent: true,
      children: [
        text('共に未来を創る仲間を求めています', {
          fontSize: 40, fontWeight: 700, color: '#ffffff',
          textAlignHorizontal: 'CENTER',
        }),
        text('Recruiting', { fontSize: 14, fontWeight: 400, color: '#ffffff99', letterSpacing: { value: 200, unit: 'PERCENT' } }),
        rectangle('HeroSpacer', { size: { x: 1, y: 8 }, opacity: 0 }),
        text('テクノロジーで社会を変える。その挑戦を、あなたと共に。', {
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
        text('採用情報', { fontSize: 12, fontWeight: 400, color: '#666666' }),
      ],
    }),

    // ── Why Join Us ──
    frame('WhyJoinUs', {
      autoLayout: vertical({ spacing: 48, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('テックイノベーションで働く理由', { fontSize: 28, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
        rectangle('WhyUnderline', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),
        text('社員一人ひとりが成長し、挑戦できる環境を整えています。', {
          fontSize: 15, fontWeight: 400, color: '#4a5568',
          textAlignHorizontal: 'CENTER',
        }),
        frame('ValueCards', {
          autoLayout: horizontal({ spacing: 30 }),
          children: [
            valueCard(
              './assets/icon-innovation.png',
              '成長できる環境',
              '最先端技術に触れ、グローバルプロジェクトに参画。社内外の研修プログラムも充実しています。',
            ),
            valueCard(
              './assets/icon-support.png',
              '働きやすい制度',
              'フレックスタイム制、リモートワーク、育児・介護支援など、多様な働き方を支援します。',
            ),
            valueCard(
              './assets/icon-global.png',
              'グローバルな舞台',
              '世界15カ国の拠点で、異文化チームと協働。海外駐在・出張の機会も豊富にあります。',
            ),
          ],
        }),
      ],
    }),

    // ── Employee Voices ──
    frame('EmployeeVoices', {
      autoLayout: vertical({ spacing: 48, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f5f5f5')],
      children: [
        text('社員の声', { fontSize: 28, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
        rectangle('VoiceUnderline', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),
        frame('VoiceRow1', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            employeeVoice(
              './assets/person-1.png',
              '佐藤 美咲',
              'AI開発部',
              '2020年',
              '入社3年目からプロジェクトリーダーを任されました。挑戦を後押ししてくれる文化があり、常に成長を実感できる環境です。',
            ),
            employeeVoice(
              './assets/person-2.png',
              '田中 健一',
              'クラウド基盤部',
              '2018年',
              '大規模クラウド移行プロジェクトを担当。技術力を高めながら、お客様のビジネスに直接貢献できることにやりがいを感じています。',
            ),
          ],
        }),
        frame('VoiceRow2', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            employeeVoice(
              './assets/person-3.png',
              '鈴木 大輔',
              'グローバル事業部',
              '2016年',
              'シンガポール駐在を経験し、現在はAPAC全体のプロジェクト管理を担当しています。グローバルな舞台で活躍できる環境です。',
            ),
            employeeVoice(
              './assets/person-4.png',
              '山本 愛',
              'コンサルティング部',
              '2021年',
              '育休復帰後もフレキシブルに働けています。時短勤務やリモートワークを活用しながら、キャリアを継続できる制度が整っています。',
            ),
          ],
        }),
      ],
    }),

    // ── Open Positions ──
    frame('OpenPositions', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('募集職種', { fontSize: 28, fontWeight: 700, color: '#1a365d' }),
        rectangle('PosUnderline', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),
        text('現在募集中のポジションをご紹介いたします。', {
          fontSize: 15, fontWeight: 400, color: '#4a5568',
        }),
        rectangle('PosSpacer', { size: { x: 1, y: 8 }, opacity: 0 }),
        positionRow('AIエンジニア', 'AI開発部', '東京', '正社員'),
        positionRow('クラウドアーキテクト', 'クラウド基盤部', '東京・大阪', '正社員'),
        positionRow('プロジェクトマネージャー', 'SI事業部', '東京・名古屋', '正社員'),
        positionRow('セキュリティコンサルタント', 'セキュリティ事業部', '東京', '正社員'),
        positionRow('データサイエンティスト', 'データアナリティクス部', '東京・リモート', '正社員'),
        positionRow('UXデザイナー', 'デジタルデザイン部', '東京', '正社員・契約社員'),
      ],
    }),

    // ── CTA ──
    frame('CareerCTA', {
      size: { x: 1440, y: 240 },
      fills: [solid('#1a365d')],
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
      children: [
        text('エントリーをお待ちしています', {
          fontSize: 26, fontWeight: 700, color: '#ffffff',
          textAlignHorizontal: 'CENTER',
        }),
        frame('EntryCTA', {
          autoLayout: horizontal({ padX: 40, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#2563eb')],
          cornerRadius: 8,
          children: [
            text('エントリーフォームへ', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
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
