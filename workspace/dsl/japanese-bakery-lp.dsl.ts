import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const brown = '#8B4513';
const cream = '#FFF8DC';
const darkBrown = '#4a3728';
const warmBg = '#f5edd8';
const breadBg = '#e8d4a8';
const mutedBrown = '#9a8070';
const textBrown = '#7a6a5a';
const white = '#ffffff';

// ─── NavBar ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  strokes: [{ color: hex('#8B45131A'), weight: 1, align: 'INSIDE' }],
  children: [
    text('こむぎ堂', { fontSize: 24, fontWeight: 800, color: brown, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('こだわり', { fontSize: 14, fontWeight: 500, color: mutedBrown }),
        text('商品一覧', { fontSize: 14, fontWeight: 500, color: mutedBrown }),
        text('私たちの想い', { fontSize: 14, fontWeight: 500, color: mutedBrown }),
        text('アクセス', { fontSize: 14, fontWeight: 500, color: mutedBrown }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(brown)],
      cornerRadius: 24,
      children: [
        text('オンライン注文', { fontSize: 13, fontWeight: 600, color: white, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 680 },
  autoLayout: vertical({ spacing: 20, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#f5e6c8', position: 0 }, { hex: '#ecdbb5', position: 0.4 }, { hex: breadBg, position: 1 }], 170)],
  children: [
    text('ARTISAN BAKERY SINCE 2005', {
      fontSize: 11, fontWeight: 600, color: brown,
      letterSpacing: { value: 6, unit: 'PIXELS' },
    }),
    text('毎朝焼きたて', {
      fontSize: 56, fontWeight: 800, color: darkBrown,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('手作りの幸せ', {
      fontSize: 56, fontWeight: 800, color: brown,
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('厳選した国産小麦と天然酵母で、ひとつひとつ丁寧に焼き上げる。\n毎日食べても飽きない、素朴で温かいパンをお届けします。', {
      fontSize: 16, fontWeight: 400, color: '#8a7560',
      lineHeight: { value: 200, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 560 },
      textAutoResize: 'HEIGHT',
    }),
    rectangle('HeroSpacer', { size: { x: 1, y: 12 }, opacity: 0 }),
    frame('HeroBtnPrimary', {
      autoLayout: horizontal({ padX: 56, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(brown)],
      cornerRadius: 32,
      children: [
        text('商品を見る', { fontSize: 16, fontWeight: 600, color: white, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Product Section ───
function breadCard(name: string, price: string, description: string) {
  return frame(`Bread: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid(white)],
    strokes: [{ color: hex('#8B451314'), weight: 1, align: 'INSIDE' }],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('BreadPhoto', {
        size: { x: 340, y: 200 },
        fills: [gradient([{ hex: breadBg, position: 0 }, { hex: '#d4be8a', position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame('BreadInfo', {
        autoLayout: vertical({ spacing: 8, padX: 24, padY: 24 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 18, fontWeight: 700, color: darkBrown }),
          text(description, {
            fontSize: 13, fontWeight: 400, color: mutedBrown,
            lineHeight: { value: 180, unit: 'PERCENT' },
            size: { x: 280 },
            textAutoResize: 'HEIGHT',
          }),
          rectangle('PriceSpacer', { size: { x: 1, y: 4 }, opacity: 0 }),
          text(price, { fontSize: 18, fontWeight: 800, color: brown }),
        ],
      }),
    ],
  });
}

const productSection = frame('ProductSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('OUR BREADS', { fontSize: 11, fontWeight: 600, color: brown, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('人気のパン', { fontSize: 32, fontWeight: 800, color: darkBrown, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
        text('毎朝ひとつひとつ心を込めて焼き上げています。', {
          fontSize: 15, fontWeight: 400, color: mutedBrown,
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),
    frame('ProductRow1', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        breadCard('天然酵母の食パン', '\u00A5380', '自家培養の天然酵母でじっくり発酵。もちもちの食感と小麦本来の甘みが楽しめる看板商品です。'),
        breadCard('くるみとレーズンのカンパーニュ', '\u00A5450', '香ばしいくるみとジューシーなレーズンをたっぷり練り込んだ、食べ応えのあるハードパン。'),
        breadCard('バターロール', '\u00A5160', '北海道産発酵バターを贅沢に使用。ふわふわで口溶けの良い、お子様にも人気の定番パン。'),
      ],
    }),
    frame('ProductRow2', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        breadCard('クロワッサン', '\u00A5280', '36層に折り込んだ生地をサクサクに焼き上げ。芳醇なバターの香りが広がります。'),
        breadCard('あんぱん', '\u00A5200', '自家製つぶあんをしっとりとした生地で包みました。甘さ控えめで大人にも人気。'),
        breadCard('フォカッチャ', '\u00A5320', 'オリーブオイルとローズマリーが香る、イタリア伝統のパン。ワインとの相性も抜群です。'),
      ],
    }),
  ],
});

// ─── About Section ───
const aboutSection = frame('AboutSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(warmBg)],
  children: [
    rectangle('AboutPhoto', {
      size: { x: 480, y: 400 },
      fills: [gradient([{ hex: '#d4be8a', position: 0 }, { hex: '#c4a870', position: 1 }], 135)],
      cornerRadius: 12,
    }),
    frame('AboutContent', {
      autoLayout: vertical({ spacing: 12 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('OUR STORY', { fontSize: 11, fontWeight: 600, color: brown, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('私たちの想い', { fontSize: 32, fontWeight: 800, color: darkBrown, letterSpacing: { value: 3, unit: 'PIXELS' } }),
        rectangle('AboutSpacer', { size: { x: 1, y: 12 }, opacity: 0 }),
        text('「毎日食べるものだからこそ、安心で美味しいものを。」\n\n創業者の祖母が焼いてくれた素朴なパンの味を原点に、2005年にこの小さなベーカリーを始めました。\n\n国産小麦100%、天然酵母、無添加にこだわり、季節の素材を活かしたパン作りを続けています。手間を惜しまず、時間をかけてじっくりと。それが私たちの変わらない信念です。', {
          fontSize: 15, fontWeight: 400, color: textBrown,
          lineHeight: { value: 220, unit: 'PERCENT' },
          size: { x: 460 },
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),
  ],
});

// ─── Access Section ───
const accessSection = frame('AccessSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(cream)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('ACCESS & HOURS', { fontSize: 11, fontWeight: 600, color: brown, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('アクセス・営業時間', { fontSize: 32, fontWeight: 800, color: darkBrown, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('AccessInner', {
      autoLayout: horizontal({ spacing: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('AccessMap', {
          size: { x: 520, y: 360 },
          fills: [gradient([{ hex: '#e0d5c0', position: 0 }, { hex: '#d4c8b0', position: 1 }], 135)],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
        }),
        frame('AccessInfo', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('AccessItem1', {
              autoLayout: vertical({ spacing: 6 }),
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: hex('#8B45131A'), weight: 1, align: 'INSIDE' }],
              children: [
                text('住所', { fontSize: 12, fontWeight: 700, color: brown, letterSpacing: { value: 2, unit: 'PIXELS' } }),
                text('東京都世田谷区三軒茶屋2-14-8', { fontSize: 15, fontWeight: 400, color: darkBrown }),
              ],
            }),
            frame('AccessItem2', {
              autoLayout: vertical({ spacing: 6 }),
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: hex('#8B45131A'), weight: 1, align: 'INSIDE' }],
              children: [
                text('営業時間', { fontSize: 12, fontWeight: 700, color: brown, letterSpacing: { value: 2, unit: 'PIXELS' } }),
                text('7:00〜19:00（売り切れ次第終了）', { fontSize: 15, fontWeight: 400, color: darkBrown }),
              ],
            }),
            frame('AccessItem3', {
              autoLayout: vertical({ spacing: 6 }),
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: hex('#8B45131A'), weight: 1, align: 'INSIDE' }],
              children: [
                text('定休日', { fontSize: 12, fontWeight: 700, color: brown, letterSpacing: { value: 2, unit: 'PIXELS' } }),
                text('毎週月曜日・第3火曜日', { fontSize: 15, fontWeight: 400, color: darkBrown }),
              ],
            }),
            frame('AccessItem4', {
              autoLayout: vertical({ spacing: 6 }),
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: hex('#8B45131A'), weight: 1, align: 'INSIDE' }],
              children: [
                text('最寄り駅', { fontSize: 12, fontWeight: 700, color: brown, letterSpacing: { value: 2, unit: 'PIXELS' } }),
                text('東急田園都市線 三軒茶屋駅 徒歩5分', { fontSize: 15, fontWeight: 400, color: darkBrown }),
              ],
            }),
            frame('AccessItem5', {
              autoLayout: vertical({ spacing: 6 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('電話番号', { fontSize: 12, fontWeight: 700, color: brown, letterSpacing: { value: 2, unit: 'PIXELS' } }),
                text('03-1234-5678', { fontSize: 15, fontWeight: 400, color: darkBrown }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Footer Section ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid(darkBrown)],
  children: [
    text('こむぎ堂', { fontSize: 22, fontWeight: 800, color: breadBg, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('こだわり', { fontSize: 13, fontWeight: 400, color: '#a08a7a' }),
        text('商品一覧', { fontSize: 13, fontWeight: 400, color: '#a08a7a' }),
        text('私たちの想い', { fontSize: 13, fontWeight: 400, color: '#a08a7a' }),
        text('アクセス', { fontSize: 13, fontWeight: 400, color: '#a08a7a' }),
        text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#a08a7a' }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#ffffff1A')],
    }),
    text('\u00A9 2026 こむぎ堂 All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#8a7a6a', textAlignHorizontal: 'CENTER' }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseBakeryLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    navBar,
    heroSection,
    productSection,
    aboutSection,
    accessSection,
    footerSection,
  ],
});
