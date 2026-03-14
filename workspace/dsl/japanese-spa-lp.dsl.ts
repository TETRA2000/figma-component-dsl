import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const slateBlue = '#64748b';
const bamboo = '#4d7c0f';
const dark = '#1e293b';
const warmBg = '#f1f5f9';
const lightBg = '#f8fafc';

const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  strokes: [{ color: hex('#e2e8f0'), weight: 1, align: 'INSIDE' }],
  children: [
    text('湯処 やすらぎ', { fontSize: 22, fontWeight: 500, color: slateBlue, letterSpacing: { value: 4, unit: 'PIXELS' } }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('お風呂', { fontSize: 13, fontWeight: 400, color: '#64748b', letterSpacing: { value: 1, unit: 'PIXELS' } }),
        text('施術メニュー', { fontSize: 13, fontWeight: 400, color: '#64748b', letterSpacing: { value: 1, unit: 'PIXELS' } }),
        text('施設案内', { fontSize: 13, fontWeight: 400, color: '#64748b', letterSpacing: { value: 1, unit: 'PIXELS' } }),
        text('アクセス', { fontSize: 13, fontWeight: 400, color: '#64748b', letterSpacing: { value: 1, unit: 'PIXELS' } }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 28, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(slateBlue)],
      cornerRadius: 4,
      children: [text('ご予約', { fontSize: 13, fontWeight: 500, color: '#ffffff', letterSpacing: { value: 1, unit: 'PIXELS' } })],
    }),
  ],
});

const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 140, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#e2e8f0', position: 0 }, { hex: '#cbd5e1', position: 1 }], 135)],
  children: [
    text('YUDOKORO YASURAGI', { fontSize: 12, fontWeight: 400, color: '#94a3b8', letterSpacing: { value: 6, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('日々の疲れを、癒やしの湯に', {
      fontSize: 44, fontWeight: 300, color: dark,
      lineHeight: { value: 140, unit: 'PERCENT' },
      letterSpacing: { value: 4, unit: 'PIXELS' },
      textAlignHorizontal: 'CENTER',
    }),
    text('四季の移ろいを感じながら\n心と身体を解きほぐすひとときを', {
      fontSize: 15, fontWeight: 400, color: '#64748b',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 400 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroCTA', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(slateBlue)],
      cornerRadius: 4,
      children: [text('日帰りプランを見る', { fontSize: 14, fontWeight: 500, color: '#ffffff', letterSpacing: { value: 2, unit: 'PIXELS' } })],
    }),
  ],
});

function bathCard(name: string, enName: string, desc: string) {
  return frame(`Bath: ${name}`, {
    autoLayout: vertical({ spacing: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('BathImage', {
        size: { x: 260, y: 180 },
        fills: [gradient([{ hex: '#cbd5e1', position: 0 }, { hex: '#94a3b8', position: 1 }], 135)],
        cornerRadius: 8,
      }),
      text(enName, { fontSize: 11, fontWeight: 400, color: '#94a3b8', letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
      text(name, { fontSize: 18, fontWeight: 500, color: dark, textAlignHorizontal: 'CENTER' }),
      text(desc, {
        fontSize: 13, fontWeight: 400, color: '#64748b',
        lineHeight: { value: 170, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 240 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const bathSection = frame('BathSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('ONSEN', { fontSize: 12, fontWeight: 400, color: '#94a3b8', letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('お風呂のご案内', { fontSize: 28, fontWeight: 300, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('BathGrid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        bathCard('露天風呂', 'OUTDOOR', '自然の風を感じながら\n開放感あふれる湯浴みを'),
        bathCard('内湯', 'INDOOR', '檜の香り漂う\n落ち着いた空間で'),
        bathCard('サウナ', 'SAUNA', 'ロウリュ対応の\n本格フィンランド式'),
        bathCard('岩風呂', 'ROCK BATH', '天然石に囲まれた\n趣ある佇まい'),
      ],
    }),
  ],
});

function treatmentItem(name: string, duration: string, price: string, desc: string) {
  return frame(`Treatment: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#e2e8f0'), weight: 1, align: 'INSIDE' }],
    children: [
      frame('TreatmentInfo', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 16, fontWeight: 500, color: dark }),
          text(desc, { fontSize: 13, fontWeight: 400, color: '#64748b' }),
        ],
      }),
      frame('TreatmentMeta', {
        autoLayout: vertical({ spacing: 4, counterAlign: 'MAX' }),
        children: [
          text(price, { fontSize: 16, fontWeight: 600, color: dark }),
          text(duration, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
        ],
      }),
    ],
  });
}

const treatmentSection = frame('TreatmentSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 270, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(warmBg)],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('TREATMENT', { fontSize: 12, fontWeight: 400, color: '#94a3b8', letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('施術メニュー', { fontSize: 28, fontWeight: 300, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('TreatmentList', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      cornerRadius: 8,
      children: [
        frame('TreatmentListInner', {
          autoLayout: vertical({ spacing: 0, padX: 40, padY: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            treatmentItem('全身もみほぐし', '60分', '¥6,600', '筋肉の疲れをじっくりとほぐします'),
            treatmentItem('アロマオイルトリートメント', '90分', '¥9,900', '香りと共に深いリラクゼーションを'),
            treatmentItem('足つぼリフレクソロジー', '40分', '¥4,400', '足裏から全身の巡りを整えます'),
            treatmentItem('ヘッドスパ', '30分', '¥3,300', '頭皮のコリをほぐし眼精疲労にも'),
            treatmentItem('美肌フェイシャル', '50分', '¥7,700', '温泉水を使用した贅沢なケア'),
          ],
        }),
      ],
    }),
  ],
});

const gallerySection = frame('GallerySection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('FACILITY', { fontSize: 12, fontWeight: 400, color: '#94a3b8', letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('施設のご紹介', { fontSize: 28, fontWeight: 300, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      ],
    }),
    frame('GalleryGrid', {
      autoLayout: horizontal({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('Gallery1', { layoutSizingHorizontal: 'FILL', size: { x: undefined, y: 240 }, fills: [gradient([{ hex: '#cbd5e1', position: 0 }, { hex: '#94a3b8', position: 1 }], 45)], cornerRadius: 8 }),
        rectangle('Gallery2', { layoutSizingHorizontal: 'FILL', size: { x: undefined, y: 240 }, fills: [gradient([{ hex: '#94a3b8', position: 0 }, { hex: '#64748b', position: 1 }], 135)], cornerRadius: 8 }),
        rectangle('Gallery3', { layoutSizingHorizontal: 'FILL', size: { x: undefined, y: 240 }, fills: [gradient([{ hex: '#64748b', position: 0 }, { hex: '#475569', position: 1 }], 90)], cornerRadius: 8 }),
      ],
    }),
    frame('FacilityInfo', {
      autoLayout: horizontal({ spacing: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('FacilityItem1', {
          autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('休憩処', { fontSize: 16, fontWeight: 500, color: dark, textAlignHorizontal: 'CENTER' }),
            text('畳敷きの広間でごゆっくりお休みいただけます', { fontSize: 13, fontWeight: 400, color: '#64748b', textAlignHorizontal: 'CENTER', size: { x: 300 }, textAutoResize: 'HEIGHT' }),
          ],
        }),
        frame('FacilityItem2', {
          autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('お食事処', { fontSize: 16, fontWeight: 500, color: dark, textAlignHorizontal: 'CENTER' }),
            text('地元食材を使った和食をお楽しみください', { fontSize: 13, fontWeight: 400, color: '#64748b', textAlignHorizontal: 'CENTER', size: { x: 300 }, textAutoResize: 'HEIGHT' }),
          ],
        }),
        frame('FacilityItem3', {
          autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('売店', { fontSize: 16, fontWeight: 500, color: dark, textAlignHorizontal: 'CENTER' }),
            text('温泉コスメやお土産を取り揃えております', { fontSize: 13, fontWeight: 400, color: '#64748b', textAlignHorizontal: 'CENTER', size: { x: 300 }, textAutoResize: 'HEIGHT' }),
          ],
        }),
      ],
    }),
  ],
});

const accessSection = frame('AccessSection', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(warmBg)],
  children: [
    frame('AccessText', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('ACCESS', { fontSize: 12, fontWeight: 400, color: '#94a3b8', letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('アクセス', { fontSize: 28, fontWeight: 300, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' } }),
        text('〒250-0631\n神奈川県箱根町湯本1-2-3', {
          fontSize: 14, fontWeight: 400, color: '#475569',
          lineHeight: { value: 200, unit: 'PERCENT' },
          size: { x: 300 },
          textAutoResize: 'HEIGHT',
        }),
        text('箱根登山鉄道「箱根湯本」駅より\n送迎バスで10分（無料）', {
          fontSize: 14, fontWeight: 400, color: '#64748b',
          lineHeight: { value: 200, unit: 'PERCENT' },
          size: { x: 300 },
          textAutoResize: 'HEIGHT',
        }),
        text('営業時間：10:00〜22:00（最終受付 21:00）\n定休日：第3火曜日', {
          fontSize: 13, fontWeight: 400, color: '#94a3b8',
          lineHeight: { value: 200, unit: 'PERCENT' },
          size: { x: 300 },
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),
    rectangle('MapPlaceholder', {
      size: { x: 400, y: 300 },
      fills: [gradient([{ hex: '#cbd5e1', position: 0 }, { hex: '#94a3b8', position: 1 }], 135)],
      cornerRadius: 8,
    }),
  ],
});

const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid(slateBlue)],
  children: [
    text('ご予約・お問い合わせ', { fontSize: 28, fontWeight: 300, color: '#ffffff', letterSpacing: { value: 2, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('日帰り温泉から宿泊プランまでお気軽にどうぞ', { fontSize: 14, fontWeight: 400, color: '#cbd5e1', textAlignHorizontal: 'CENTER' }),
    frame('CTAActions', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('BookBtn', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 4,
          children: [text('オンライン予約', { fontSize: 14, fontWeight: 500, color: slateBlue, letterSpacing: { value: 1, unit: 'PIXELS' } })],
        }),
        frame('PhoneBtn', {
          autoLayout: horizontal({ padX: 32, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          strokes: [{ color: hex('#94a3b8'), weight: 1, align: 'INSIDE' }],
          cornerRadius: 4,
          children: [text('TEL 0460-12-3456', { fontSize: 14, fontWeight: 500, color: '#ffffff' })],
        }),
      ],
    }),
  ],
});

const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid(dark)],
  children: [
    text('湯処 やすらぎ  YUDOKORO YASURAGI', { fontSize: 16, fontWeight: 300, color: '#ffffff', letterSpacing: { value: 4, unit: 'PIXELS' }, textAlignHorizontal: 'CENTER' }),
    text('〒250-0631 神奈川県箱根町湯本1-2-3', { fontSize: 12, fontWeight: 400, color: '#94a3b8', textAlignHorizontal: 'CENTER' }),
    text('営業時間：10:00〜22:00（最終受付 21:00）/ 定休日：第3火曜日', { fontSize: 12, fontWeight: 400, color: '#94a3b8', textAlignHorizontal: 'CENTER' }),
    text('© 2026 YUDOKORO YASURAGI. All rights reserved.', { fontSize: 11, fontWeight: 400, color: '#475569', textAlignHorizontal: 'CENTER' }),
  ],
});

export default frame('JapaneseSpaLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [navBar, heroSection, bathSection, treatmentSection, gallerySection, accessSection, ctaSection, footerSection],
});
