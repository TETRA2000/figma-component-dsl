import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const brown = '#92400e';
const ivory = '#fef7ed';
const dark = '#451a03';
const warmText = '#78350f';
const mutedText = '#a16207';

const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(ivory)],
  strokes: [{ color: hex('#fde68a'), weight: 1, align: 'INSIDE' }],
  children: [
    text('本の森 HONNOMORI', { fontSize: 22, fontWeight: 500, color: brown, letterSpacing: { value: 4, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('新刊案内', { fontSize: 13, fontWeight: 400, color: warmText, letterSpacing: { value: 1, unit: 'PIXELS' } }),
        text('読書空間', { fontSize: 13, fontWeight: 400, color: warmText, letterSpacing: { value: 1, unit: 'PIXELS' } }),
        text('イベント', { fontSize: 13, fontWeight: 400, color: warmText, letterSpacing: { value: 1, unit: 'PIXELS' } }),
        text('会員制度', { fontSize: 13, fontWeight: 400, color: warmText, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(brown)],
      cornerRadius: 4,
      children: [text('会員登録', { fontSize: 13, fontWeight: 500, color: '#ffffff', letterSpacing: { value: 1, unit: 'PIXELS' } })],
    }),
  ],
});

const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 140, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: ivory, position: 0 }, { hex: '#fef3c7', position: 1 }], 135)],
  children: [
    text('HONNOMORI BOOKSTORE', { fontSize: 12, fontWeight: 400, color: mutedText, letterSpacing: { value: 6, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('本との出会いを', {
      fontSize: 48, fontWeight: 300, color: dark,
      lineHeight: { value: 140, unit: 'PERCENT' },
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('一冊の本が、あなたの世界を広げる。\n厳選された書籍と静かな空間で、特別な読書体験を。', {
      fontSize: 15, fontWeight: 400, color: warmText,
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 480 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroCTA', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(brown)],
      cornerRadius: 4,
      children: [text('新刊をチェック', { fontSize: 14, fontWeight: 500, color: '#ffffff', letterSpacing: { value: 2, unit: 'PIXELS' } })],
    }),
  ],
});

function bookCard(title: string, author: string, genre: string, desc: string) {
  return frame(`Book: ${title}`, {
    autoLayout: vertical({ spacing: 16 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('BookCover', {
        size: { x: 220, y: 300 },
        fills: [gradient([{ hex: '#fde68a', position: 0 }, { hex: '#d97706', position: 1 }], 135)],
        cornerRadius: 4,
      }),
      text(genre, { fontSize: 11, fontWeight: 500, color: mutedText, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      text(title, { fontSize: 16, fontWeight: 600, color: dark }),
      text(author, { fontSize: 13, fontWeight: 400, color: warmText }),
      text(desc, {
        fontSize: 12, fontWeight: 400, color: '#92400e',
        lineHeight: { value: 160, unit: 'PERCENT' },
        size: { x: 240 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const newArrivalsSection = frame('NewArrivalsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('NEW ARRIVALS', { fontSize: 12, fontWeight: 400, color: mutedText, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('新刊案内', { fontSize: 28, fontWeight: 300, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('BookGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        bookCard('静かな森の声', '山田 太郎', '文学・小説', '自然との対話を通じて描かれる心の旅路'),
        bookCard('数学の美しさ', '佐藤 花子', 'サイエンス', '日常に潜む数学の不思議を解き明かす'),
        bookCard('古都の記憶', '田中 一郎', 'エッセイ', '京都の路地裏を歩きながら綴る随想'),
        bookCard('未来のかたち', '鈴木 明', '社会・思想', 'テクノロジーと共生する社会の姿を探る'),
      ],
    }),
  ],
});

const readingSpaceSection = frame('ReadingSpaceSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(ivory)],
  children: [
    rectangle('SpaceImage', {
      size: { x: 440, y: 360 },
      fills: [gradient([{ hex: '#fde68a', position: 0 }, { hex: '#fbbf24', position: 1 }], 135)],
      cornerRadius: 8,
    }),
    frame('SpaceText', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('READING SPACE', { fontSize: 12, fontWeight: 400, color: mutedText, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('読書空間のご案内', {
          fontSize: 28, fontWeight: 300, color: dark,
          letterSpacing: { value: 2, unit: 'PIXELS' },
        }),
        text('木の温もりに包まれた店内には、ゆったりとした読書スペースをご用意しています。お気に入りの一冊を見つけたら、併設カフェのドリンクと共にその場でお楽しみいただけます。', {
          fontSize: 14, fontWeight: 400, color: warmText,
          lineHeight: { value: 200, unit: 'PERCENT' },
          size: { x: 380 },
          textAutoResize: 'HEIGHT',
        }),
        frame('SpaceFeatures', {
          autoLayout: vertical({ spacing: 12 }),
          children: [
            text('座席数：48席（ソファ席・テーブル席・カウンター席）', { fontSize: 13, fontWeight: 400, color: '#92400e' }),
            text('併設カフェ：コーヒー・紅茶・軽食をご提供', { fontSize: 13, fontWeight: 400, color: '#92400e' }),
            text('Wi-Fi・電源完備', { fontSize: 13, fontWeight: 400, color: '#92400e' }),
          ],
        }),
      ],
    }),
  ],
});

function eventCard(title: string, date: string, desc: string) {
  return frame(`Event: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 32 }),
    fills: [solid('#ffffff')],
    strokes: [{ color: hex('#fde68a'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(date, { fontSize: 12, fontWeight: 500, color: mutedText, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      text(title, { fontSize: 18, fontWeight: 600, color: dark }),
      text(desc, {
        fontSize: 13, fontWeight: 400, color: warmText,
        lineHeight: { value: 170, unit: 'PERCENT' },
        layoutSizingHorizontal: 'FILL',
        textAutoResize: 'HEIGHT',
      }),
      frame('EventCTA', {
        autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
        strokes: [{ color: hex(brown), weight: 1, align: 'INSIDE' }],
        cornerRadius: 4,
        children: [text('詳細を見る', { fontSize: 12, fontWeight: 500, color: brown })],
      }),
    ],
  });
}

const eventsSection = frame('EventsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('EVENTS', { fontSize: 12, fontWeight: 400, color: mutedText, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('イベント・ワークショップ', { fontSize: 28, fontWeight: 300, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('EventGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        eventCard('著者トークイベント：山田太郎氏', '2026年4月12日（土）14:00〜', '新刊「静かな森の声」の執筆秘話を著者ご本人が語ります。サイン会も開催。'),
        eventCard('絵本読み聞かせの会', '毎週日曜 11:00〜', 'お子様向けの絵本読み聞かせ会。季節に合わせた絵本を選んでお届けします。'),
        eventCard('ブックバインディング講座', '2026年4月19日（土）13:00〜', '手製本の基礎を学ぶワークショップ。世界に一つだけのノートを作りましょう。'),
      ],
    }),
  ],
});

const membershipSection = frame('MembershipSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 270, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(ivory)],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('MEMBERSHIP', { fontSize: 12, fontWeight: 400, color: mutedText, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('会員制度', { fontSize: 28, fontWeight: 300, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('BenefitsList', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      cornerRadius: 8,
      children: [
        frame('BenefitsInner', {
          autoLayout: vertical({ spacing: 0, padX: 48, padY: 32 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('Benefit1', {
              autoLayout: horizontal({ spacing: 16, padY: 16, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: hex('#fde68a'), weight: 1, align: 'INSIDE' }],
              children: [
                text('01', { fontSize: 24, fontWeight: 300, color: '#d97706' }),
                frame('BenefitText1', {
                  autoLayout: vertical({ spacing: 4 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('全品10%OFF', { fontSize: 16, fontWeight: 600, color: dark }),
                    text('書籍・雑貨すべてのお買い物が会員価格に', { fontSize: 13, fontWeight: 400, color: warmText }),
                  ],
                }),
              ],
            }),
            frame('Benefit2', {
              autoLayout: horizontal({ spacing: 16, padY: 16, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: hex('#fde68a'), weight: 1, align: 'INSIDE' }],
              children: [
                text('02', { fontSize: 24, fontWeight: 300, color: '#d97706' }),
                frame('BenefitText2', {
                  autoLayout: vertical({ spacing: 4 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('読書スペース優先利用', { fontSize: 16, fontWeight: 600, color: dark }),
                    text('混雑時でも会員様専用席をご利用いただけます', { fontSize: 13, fontWeight: 400, color: warmText }),
                  ],
                }),
              ],
            }),
            frame('Benefit3', {
              autoLayout: horizontal({ spacing: 16, padY: 16, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('03', { fontSize: 24, fontWeight: 300, color: '#d97706' }),
                frame('BenefitText3', {
                  autoLayout: vertical({ spacing: 4 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('イベント先行予約', { fontSize: 16, fontWeight: 600, color: dark }),
                    text('人気イベントに優先的にお申し込みいただけます', { fontSize: 13, fontWeight: 400, color: warmText }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    frame('MembershipCTA', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(brown)],
      cornerRadius: 4,
      children: [text('年会費 ¥3,300（税込）で入会する', { fontSize: 14, fontWeight: 500, color: '#ffffff', letterSpacing: { value: 1, unit: 'PIXELS' } })],
    }),
  ],
});

const storeInfoSection = frame('StoreInfoSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    frame('StoreText', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('STORE INFO', { fontSize: 12, fontWeight: 400, color: mutedText, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('店舗情報', { fontSize: 28, fontWeight: 300, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' } }),
        text('〒113-0033\n東京都文京区本郷3-4-5 森ビル1F', {
          fontSize: 14, fontWeight: 400, color: '#78350f',
          lineHeight: { value: 200, unit: 'PERCENT' },
          size: { x: 300 },
          textAutoResize: 'HEIGHT',
        }),
        text('東京メトロ丸ノ内線「本郷三丁目」駅\n2番出口より徒歩3分', {
          fontSize: 14, fontWeight: 400, color: warmText,
          lineHeight: { value: 200, unit: 'PERCENT' },
          size: { x: 300 },
          textAutoResize: 'HEIGHT',
        }),
        text('営業時間：10:00〜21:00\nカフェラストオーダー 20:30\n定休日：毎週水曜日', {
          fontSize: 13, fontWeight: 400, color: mutedText,
          lineHeight: { value: 200, unit: 'PERCENT' },
          size: { x: 300 },
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),
    rectangle('StoreMapPlaceholder', {
      size: { x: 400, y: 300 },
      fills: [gradient([{ hex: '#fde68a', position: 0 }, { hex: '#fbbf24', position: 1 }], 135)],
      cornerRadius: 8,
    }),
  ],
});

const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid(dark)],
  children: [
    text('本の森  HONNOMORI', { fontSize: 16, fontWeight: 300, color: '#ffffff', letterSpacing: { value: 4, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('〒113-0033 東京都文京区本郷3-4-5 森ビル1F', { fontSize: 12, fontWeight: 400, color: '#a16207', textAlignHorizontal: 'CENTER' }),
    text('営業時間：10:00〜21:00 / 定休日：毎週水曜日', { fontSize: 12, fontWeight: 400, color: '#a16207', textAlignHorizontal: 'CENTER' }),
    text('© 2026 HONNOMORI. All rights reserved.', { fontSize: 11, fontWeight: 400, color: '#78350f', textAlignHorizontal: 'CENTER' }),
  ],
});

export default frame('JapaneseBookstoreLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [navBar, heroSection, newArrivalsSection, readingSpaceSection, eventsSection, membershipSection, storeInfoSection, footerSection],
});
