import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
  hex,
} from '@figma-dsl/core';

const teal = '#2ba4b3';
const tealBg = '#f8fcfd';
const tealLight = '#e8f7f9';
const tealMid = '#d0f0f5';
const dark = '#1a1a1a';

const navBar = frame('NavBar', {
  size: { x: 1440, y: 72 },
  autoLayout: horizontal({ spacing: 0, padX: 120, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  strokes: [{ color: hex('#e0eff0'), weight: 1, align: 'INSIDE' }],
  children: [
    text('さくら歯科クリニック', { fontSize: 20, fontWeight: 800, color: teal }),
    frame('NavLinks', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('診療内容', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('医師紹介', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('院内紹介', { fontSize: 14, fontWeight: 500, color: '#555555' }),
        text('アクセス', { fontSize: 14, fontWeight: 500, color: '#555555' }),
      ],
    }),
    frame('NavCTA', {
      autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid(teal)],
      cornerRadius: 24,
      children: [text('WEB予約', { fontSize: 14, fontWeight: 600, color: '#ffffff' })],
    }),
  ],
});

const heroSection = frame('HeroSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: tealLight, position: 0 }, { hex: tealMid, position: 1 }], 135)],
  children: [
    text('笑顔あふれる\n歯科治療を', {
      fontSize: 48, fontWeight: 800, color: dark,
      lineHeight: { value: 130, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    text('痛みの少ない丁寧な治療で、\nお子様からご年配の方まで安心して通える歯科医院です', {
      fontSize: 16, fontWeight: 400, color: '#666666',
      lineHeight: { value: 180, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
      size: { x: 500 },
      textAutoResize: 'HEIGHT',
    }),
    frame('HeroActions', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('PrimaryBtn', {
          autoLayout: horizontal({ padX: 40, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(teal)],
          cornerRadius: 28,
          children: [text('初診予約', { fontSize: 16, fontWeight: 700, color: '#ffffff' })],
        }),
        frame('SecondaryBtn', {
          autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 28,
          strokes: [{ color: hex(teal), weight: 2, align: 'INSIDE' }],
          children: [text('☎ 03-1234-5678', { fontSize: 16, fontWeight: 700, color: teal })],
        }),
      ],
    }),
    frame('HeroFeatures', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        ...['土日診療', '駅徒歩3分', 'キッズスペース完備'].map(f =>
          frame(`Feature: ${f}`, {
            autoLayout: horizontal({ padX: 20, padY: 8 }),
            fills: [solid(teal, 0.1)],
            cornerRadius: 20,
            children: [text(f, { fontSize: 13, fontWeight: 600, color: teal })],
          })
        ),
      ],
    }),
  ],
});

function treatmentCard(icon: string, title: string, description: string) {
  return frame(`Treatment: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 32, counterAlign: 'CENTER' }),
    fills: [solid(tealBg)],
    cornerRadius: 16,
    strokes: [{ color: hex('#e0eff0'), weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(icon, { fontSize: 40, textAlignHorizontal: 'CENTER' }),
      text(title, { fontSize: 18, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#666666',
        lineHeight: { value: 180, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        size: { x: 220 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

const treatmentsSection = frame('TreatmentsSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('診療内容', { fontSize: 32, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
    text('幅広い診療メニューで、お口の健康をトータルサポート', { fontSize: 16, fontWeight: 400, color: '#888888', textAlignHorizontal: 'CENTER' }),
    frame('TreatmentGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        treatmentCard('🦷', '一般歯科', '虫歯や歯周病の治療を、痛みを最小限に抑えて行います'),
        treatmentCard('✨', '審美歯科', 'ホワイトニング、セラミック治療で美しい笑顔に'),
        treatmentCard('👶', '小児歯科', 'お子様が楽しく通える環境づくりを心がけています'),
        treatmentCard('🔧', '矯正歯科', '目立たないマウスピース矯正で理想の歯並びへ'),
      ],
    }),
  ],
});

const doctorSection = frame('DoctorSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid(tealBg)],
  children: [
    text('医師紹介', { fontSize: 32, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
    frame('DoctorCard', {
      autoLayout: horizontal({ spacing: 48, counterAlign: 'CENTER' }),
      children: [
        rectangle('DoctorImage', {
          size: { x: 250, y: 300 },
          fills: [gradient([{ hex: tealMid, position: 0 }, { hex: '#a8dce4', position: 1 }], 135)],
          cornerRadius: 16,
        }),
        frame('DoctorInfo', {
          autoLayout: vertical({ spacing: 16 }),
          children: [
            text('院長', { fontSize: 14, fontWeight: 600, color: teal }),
            text('山田 太郎', { fontSize: 28, fontWeight: 800, color: dark }),
            text('東京歯科大学卒業後、大学病院にて10年間の臨床経験を経て開院。\n「患者様の不安を取り除くこと」を第一に、丁寧なカウンセリングと\n痛みの少ない治療を心がけています。', {
              fontSize: 15, fontWeight: 400, color: '#555555',
              lineHeight: { value: 180, unit: 'PERCENT' },
              size: { x: 450 },
              textAutoResize: 'HEIGHT',
            }),
            frame('Certs', {
              autoLayout: horizontal({ spacing: 12 }),
              children: [
                frame('Cert1', {
                  autoLayout: horizontal({ padX: 14, padY: 6 }),
                  fills: [solid(teal, 0.1)],
                  cornerRadius: 16,
                  children: [text('日本歯科医師会会員', { fontSize: 12, fontWeight: 500, color: teal })],
                }),
                frame('Cert2', {
                  autoLayout: horizontal({ padX: 14, padY: 6 }),
                  fills: [solid(teal, 0.1)],
                  cornerRadius: 16,
                  children: [text('インプラント認定医', { fontSize: 12, fontWeight: 500, color: teal })],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

const facilitySection = frame('FacilitySection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 220, padY: 96, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('院内紹介', { fontSize: 32, fontWeight: 800, color: dark, textAlignHorizontal: 'CENTER' }),
    text('清潔で快適な空間をご用意しています', { fontSize: 16, fontWeight: 400, color: '#888888', textAlignHorizontal: 'CENTER' }),
    frame('FacilityGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        ...['受付・待合室', '診察室', 'キッズスペース'].map(label =>
          frame(`Facility: ${label}`, {
            autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              rectangle('Img', {
                size: { x: 300, y: 200 },
                fills: [gradient([{ hex: tealLight, position: 0 }, { hex: tealMid, position: 1 }], 135)],
                cornerRadius: 12,
              }),
              text(label, { fontSize: 15, fontWeight: 600, color: dark, textAlignHorizontal: 'CENTER' }),
            ],
          })
        ),
      ],
    }),
  ],
});

const ctaSection = frame('CTASection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 32, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid(teal)],
  children: [
    text('まずはお気軽にご相談ください', { fontSize: 28, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    text('初診の方は事前のWEB予約がスムーズです', { fontSize: 16, fontWeight: 400, color: '#ffffffCC', textAlignHorizontal: 'CENTER' }),
    frame('CTAActions', {
      autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
      children: [
        frame('WebBtn', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 28,
          children: [text('WEB予約はこちら', { fontSize: 18, fontWeight: 700, color: teal })],
        }),
        frame('PhoneInfo', {
          autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
          children: [
            text('お電話でのご予約', { fontSize: 13, fontWeight: 400, color: '#ffffffB3' }),
            text('03-1234-5678', { fontSize: 24, fontWeight: 800, color: '#ffffff' }),
          ],
        }),
      ],
    }),
    frame('Hours', {
      autoLayout: vertical({ spacing: 0 }),
      children: [
        frame('HoursRow1', {
          autoLayout: horizontal({ spacing: 0, padY: 8, align: 'SPACE_BETWEEN' }),
          strokes: [{ color: hex('#ffffff33'), weight: 1, align: 'INSIDE' }],
          children: [
            text('診療時間', { fontSize: 14, fontWeight: 500, color: '#ffffffE6', size: { x: 200 }, textAutoResize: 'HEIGHT' }),
            text('月〜金 9:00-19:00 / 土日 9:00-17:00', { fontSize: 14, fontWeight: 400, color: '#ffffffE6' }),
          ],
        }),
        frame('HoursRow2', {
          autoLayout: horizontal({ spacing: 0, padY: 8, align: 'SPACE_BETWEEN' }),
          children: [
            text('休診日', { fontSize: 14, fontWeight: 500, color: '#ffffffE6', size: { x: 200 }, textAutoResize: 'HEIGHT' }),
            text('祝日', { fontSize: 14, fontWeight: 400, color: '#ffffffE6' }),
          ],
        }),
      ],
    }),
  ],
});

const footerSection = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 12, padX: 120, padY: 48, counterAlign: 'CENTER' }),
  fills: [solid(dark)],
  children: [
    text('さくら歯科クリニック', { fontSize: 18, fontWeight: 800, color: teal, textAlignHorizontal: 'CENTER' }),
    text('〒150-0001 東京都渋谷区神宮前1-2-3 メディカルビル2F', { fontSize: 13, fontWeight: 400, color: '#888888', textAlignHorizontal: 'CENTER' }),
    text('© 2026 さくら歯科クリニック All rights reserved.', { fontSize: 12, fontWeight: 400, color: '#555555', textAlignHorizontal: 'CENTER' }),
  ],
});

export default frame('JapaneseDentalLP', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [navBar, heroSection, treatmentsSection, doctorSection, facilitySection, ctaSection, footerSection],
});
