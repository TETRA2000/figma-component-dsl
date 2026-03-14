import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const navy = '#1a2744';
const darkNavy = '#0f1623';
const deepNavy = '#131d33';
const gold = '#c4a35a';
const white = '#ffffff';
const lightGray = '#8a99b4';
const footerBg = '#0a1020';

// ─── NavBar ───
const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid(navy)],
  strokes: [{ color: hex('#c4a35a26'), weight: 1, align: 'INSIDE' }],
  children: [
    text('弁護士法人 青山総合法律事務所', { fontSize: 16, fontWeight: 700, color: gold, letterSpacing: { value: 2, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 36, counterAlign: 'CENTER' }),
      children: [
        text('取扱分野', { fontSize: 14, fontWeight: 500, color: lightGray }),
        text('弁護士紹介', { fontSize: 14, fontWeight: 500, color: lightGray }),
        text('解決実績', { fontSize: 14, fontWeight: 500, color: lightGray }),
        text('ご相談の流れ', { fontSize: 14, fontWeight: 500, color: lightGray }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(gold)],
      children: [
        text('無料相談予約', { fontSize: 13, fontWeight: 700, color: navy, letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
  ],
});

// ─── Hero Section ───
const heroSection = frame('HeroSection', {
  size: { x: 1440, y: 700 },
  autoLayout: vertical({ spacing: 20, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: navy, position: 0 }, { hex: '#13203d', position: 0.5 }, { hex: '#0f1a33', position: 1 }], 170)],
  children: [
    text('AOYAMA LAW OFFICE', {
      fontSize: 12, fontWeight: 600, color: gold,
      letterSpacing: { value: 8, unit: 'PIXELS' },
    }),
    rectangle('HeroSpacer1', { size: { x: 1, y: 8 }, opacity: 0 }),
    text('あなたの権利を守る', {
      fontSize: 64, fontWeight: 800, color: white,
      letterSpacing: { value: 6, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('経験豊富な弁護士チームが、複雑な法的問題を迅速かつ的確に解決。\n初回相談無料。まずはお気軽にご相談ください。', {
      fontSize: 16, fontWeight: 400, color: '#ffffff8C',
      lineHeight: { value: 200, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 560 },
      textAutoResize: 'HEIGHT',
    }),
    rectangle('HeroSpacer2', { size: { x: 1, y: 12 }, opacity: 0 }),
    frame('HeroBtnGroup', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        frame('HeroBtnPrimary', {
          autoLayout: horizontal({ padX: 56, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(gold)],
          children: [
            text('無料相談を予約する', { fontSize: 15, fontWeight: 700, color: navy, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('HeroBtnSecondary', {
          autoLayout: horizontal({ padX: 40, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex('#c4a35a66'), weight: 1, align: 'INSIDE' }],
          children: [
            text('取扱分野を見る', { fontSize: 15, fontWeight: 500, color: gold }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Practice Areas Section ───
function practiceCard(title: string, description: string) {
  return frame(`Practice: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 32, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid('#1a274499')],
    strokes: [{ color: hex('#c4a35a1A'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('PracticeIcon', {
        size: { x: 48, y: 48 },
        fills: [gradient([{ hex: gold, position: 0 }, { hex: '#a88a3e', position: 1 }], 135)],
        cornerRadius: 8,
      }),
      rectangle('IconSpacer', { size: { x: 1, y: 4 }, opacity: 0 }),
      text(title, { fontSize: 20, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: lightGray,
        lineHeight: { value: 190, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const practiceSection = frame('PracticeSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(darkNavy)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('PRACTICE AREAS', { fontSize: 11, fontWeight: 600, color: gold, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('取扱分野', { fontSize: 32, fontWeight: 800, color: white, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
        text('幅広い法律問題に対応し、最適な解決策をご提案します。', {
          fontSize: 15, fontWeight: 400, color: lightGray,
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),
    frame('PracticeRow1', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        practiceCard('企業法務', '契約書作成・レビュー、M&A、コンプライアンス対応など、企業活動を法的側面から全面的にサポート。'),
        practiceCard('労働問題', '不当解雇、残業代請求、ハラスメント問題など、労働者の権利を守るために徹底的に対応いたします。'),
        practiceCard('離婚・家事事件', '離婚協議、親権問題、養育費・財産分与など、家族に関する法的問題を丁寧に解決します。'),
      ],
    }),
    frame('PracticeRow2', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        practiceCard('交通事故', '保険会社との交渉代行、適正な慰謝料・賠償金の獲得。被害者の立場に立った解決を目指します。'),
        practiceCard('相続・遺言', '遺産分割協議、遺言書作成、相続税対策まで。円満な相続の実現をトータルでサポートします。'),
        practiceCard('債務整理', '任意整理、自己破産、個人再生など、借金問題からの再出発を全力でお手伝いします。'),
      ],
    }),
  ],
});

// ─── Lawyer Section ───
function lawyerCard(name: string, title: string, bio: string) {
  return frame(`Lawyer: ${name}`, {
    autoLayout: vertical({ spacing: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('LawyerPhoto', {
        size: { x: 180, y: 180 },
        fills: [gradient([{ hex: '#2a3a5c', position: 0 }, { hex: navy, position: 1 }], 135)],
        strokes: [{ color: hex('#c4a35a33'), weight: 2, align: 'INSIDE' }],
      }),
      rectangle('Spacer', { size: { x: 1, y: 8 }, opacity: 0 }),
      text(name, { fontSize: 22, fontWeight: 700, color: white, textAlignHorizontal: 'CENTER' }),
      text(title, { fontSize: 13, fontWeight: 600, color: gold, letterSpacing: { value: 1, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      rectangle('LawyerDivider', { size: { x: 40, y: 1 }, fills: [solid('#c4a35a4D')] }),
      text(bio, {
        fontSize: 14, fontWeight: 400, color: lightGray,
        lineHeight: { value: 190, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const lawyerSection = frame('LawyerSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(deepNavy)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('LAWYERS', { fontSize: 11, fontWeight: 600, color: gold, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('弁護士紹介', { fontSize: 32, fontWeight: 800, color: white, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('LawyerGrid', {
      autoLayout: horizontal({ spacing: 36 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        lawyerCard('青山 太郎', '代表弁護士・パートナー', '東京大学法学部卒。弁護士歴25年。企業法務・M&Aを専門とし、上場企業を含む200社以上の顧問を歴任。日本弁護士連合会理事。'),
        lawyerCard('白石 美和', 'パートナー弁護士', '京都大学法科大学院修了。離婚・家事事件の専門家として、年間150件以上の案件を解決。女性の権利保護に尽力。'),
        lawyerCard('田村 誠一', 'シニアアソシエイト', '慶應義塾大学法学部卒。労働問題・交通事故を専門とし、多数の勝訴判決を獲得。依頼者に寄り添う姿勢に定評あり。'),
      ],
    }),
  ],
});

// ─── Stats Section ───
function statItem(number: string, label: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(number, { fontSize: 48, fontWeight: 900, color: gold, letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      text(label, { fontSize: 14, fontWeight: 500, color: lightGray, letterSpacing: { value: 1, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    ],
  });
}

const statsSection = frame('StatsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 56, padX: 170, padY: 100, counterAlign: 'CENTER' }),
  fills: [solid(navy)],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('TRACK RECORD', { fontSize: 11, fontWeight: 600, color: gold, letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('解決実績', { fontSize: 32, fontWeight: 800, color: white, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('StatsGrid', {
      autoLayout: horizontal({ spacing: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        statItem('5,000+', '相談実績件数'),
        statItem('98.2%', '依頼者満足度'),
        statItem('25年', '事務所設立'),
        statItem('15名', '所属弁護士数'),
      ],
    }),
  ],
});

// ─── Contact CTA Section ───
const contactCtaSection = frame('ContactCTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 120, padY: 100, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: navy, position: 0 }, { hex: '#0f1a33', position: 1 }], 160)],
  children: [
    text('まずは無料相談から', {
      fontSize: 36, fontWeight: 800, color: white,
      letterSpacing: { value: 3, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('初回相談は60分無料。秘密厳守でご相談をお受けします。\nお電話またはオンラインでの相談も可能です。', {
      fontSize: 16, fontWeight: 400, color: '#ffffff8C',
      lineHeight: { value: 200, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 560 },
      textAutoResize: 'HEIGHT',
    }),
    rectangle('CtaSpacer', { size: { x: 1, y: 16 }, opacity: 0 }),
    frame('ContactBtnGroup', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        frame('ContactBtnPrimary', {
          autoLayout: horizontal({ padX: 56, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(gold)],
          children: [
            text('無料相談を予約する', { fontSize: 16, fontWeight: 700, color: navy, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        frame('ContactBtnSecondary', {
          autoLayout: horizontal({ padX: 40, padY: 18, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex('#c4a35a66'), weight: 1, align: 'INSIDE' }],
          children: [
            text('03-1234-5678', { fontSize: 16, fontWeight: 600, color: gold, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
      ],
    }),
    text('\u203B \u53D7\u4ED8\u6642\u9593\uFF1A\u5E73\u65E5 9:00\u301C21:00 / \u571F\u66DC 10:00\u301C18:00', {
      fontSize: 12, fontWeight: 400, color: '#5a6a84', textAlignHorizontal: 'CENTER',
    }),
  ],
});

// ─── Footer Section ───
const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid(footerBg)],
  strokes: [{ color: hex('#c4a35a1A'), weight: 1, align: 'INSIDE' }],
  children: [
    text('青山総合法律事務所', { fontSize: 16, fontWeight: 700, color: gold, letterSpacing: { value: 3, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    frame('FooterLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('取扱分野', { fontSize: 13, fontWeight: 400, color: '#5a6a84' }),
        text('弁護士紹介', { fontSize: 13, fontWeight: 400, color: '#5a6a84' }),
        text('解決実績', { fontSize: 13, fontWeight: 400, color: '#5a6a84' }),
        text('アクセス', { fontSize: 13, fontWeight: 400, color: '#5a6a84' }),
        text('プライバシーポリシー', { fontSize: 13, fontWeight: 400, color: '#5a6a84' }),
      ],
    }),
    rectangle('FooterDivider', {
      size: { x: 1200, y: 1 },
      fills: [solid('#c4a35a1A')],
    }),
    text('\u00A9 2026 \u5F01\u8B77\u58EB\u6CD5\u4EBA \u9752\u5C71\u7DCF\u5408\u6CD5\u5F8B\u4E8B\u52D9\u6240 All rights reserved.', {
      fontSize: 12, fontWeight: 400, color: '#3a4a64', textAlignHorizontal: 'CENTER',
    }),
  ],
});

// ─── Full Page ───
export default frame('JapaneseLawFirmLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(darkNavy)],
  children: [
    navBar,
    heroSection,
    practiceSection,
    lawyerSection,
    statsSection,
    contactCtaSection,
    footerSection,
  ],
});
