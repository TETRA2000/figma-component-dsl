import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: eki-net.com — Shinkansen/JR train booking, blue/green transport branding
// Features stressed: data tables, SPACE_BETWEEN, stroke alignment, CJK, per-corner radii, dense layout

const jrGreen = '#007A33';
const jrBlue = '#003DA5';
const white = '#ffffff';
const dark = '#222222';
const gray = '#777777';
const lightBg = '#f0f4f8';
const red = '#D32F2F';

function trainRow(name: string, departure: string, arrival: string, duration: string, trainType: string, color: string, seats: string) {
  return frame(`Train:${name}`, {
    autoLayout: horizontal({ padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL' as const,
    fills: [solid(white)],
    cornerRadius: 8,
    strokes: [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('TrainName', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        size: { x: 200, y: undefined },
        children: [
          frame('TypeBadge', {
            autoLayout: horizontal({ padX: 8, padY: 4 }),
            fills: [solid(color)],
            cornerRadius: 4,
            children: [text(trainType, { fontSize: 11, fontWeight: 700, color: white })],
          }),
          text(name, { fontSize: 14, fontWeight: 600, color: dark }),
        ],
      }),
      frame('Schedule', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          text(departure, { fontSize: 18, fontWeight: 700, color: dark }),
          text('→', { fontSize: 14, fontWeight: 400, color: gray }),
          text(arrival, { fontSize: 18, fontWeight: 700, color: dark }),
        ],
      }),
      text(duration, { fontSize: 13, fontWeight: 400, color: gray }),
      frame('SeatInfo', {
        autoLayout: horizontal({ padX: 10, padY: 4 }),
        fills: [solid(seats === '×' ? '#ffebee' : '#e8f5e9')],
        cornerRadius: 4,
        children: [text(seats === '×' ? '満席' : `${seats}席`, {
          fontSize: 12, fontWeight: 600, color: seats === '×' ? red : jrGreen,
        })],
      }),
      frame('ReserveBtn', {
        autoLayout: horizontal({ padX: 16, padY: 8 }),
        fills: [solid(seats === '×' ? '#cccccc' : jrGreen)],
        cornerRadius: 4,
        children: [text('予約', { fontSize: 13, fontWeight: 600, color: white })],
      }),
    ],
  });
}

function stationInput(label: string, value: string) {
  return frame(`Input:${label}`, {
    autoLayout: vertical({ spacing: 4 }),
    size: { x: 200, y: undefined },
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: gray }),
      frame('InputField', {
        autoLayout: horizontal({ padX: 14, padY: 10 }),
        layoutSizingHorizontal: 'FILL' as const,
        fills: [solid(white)],
        cornerRadius: 6,
        strokes: [{ color: { r: 0.75, g: 0.75, b: 0.75, a: 1 }, weight: 1, align: 'INSIDE' as const }],
        children: [text(value, { fontSize: 15, fontWeight: 500, color: dark })],
      }),
    ],
  });
}

export default frame('ShinkansenBookingPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(lightBg)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(jrGreen)],
      children: [
        text('えきねっと', { fontSize: 22, fontWeight: 700, color: white }),
        frame('Nav', {
          autoLayout: horizontal({ spacing: 20 }),
          children: [
            text('きっぷ予約', { fontSize: 13, fontWeight: 500, color: white }),
            text('乗換案内', { fontSize: 13, fontWeight: 500, color: white }),
            text('運行情報', { fontSize: 13, fontWeight: 500, color: white }),
            text('お得なきっぷ', { fontSize: 13, fontWeight: 500, color: white }),
          ],
        }),
        frame('UserActions', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            text('ログイン', { fontSize: 13, fontWeight: 400, color: white }),
            frame('SignupBtn', {
              autoLayout: horizontal({ padX: 14, padY: 6 }),
              fills: [solid(white)],
              cornerRadius: 4,
              children: [text('新規会員登録', { fontSize: 12, fontWeight: 600, color: jrGreen })],
            }),
          ],
        }),
      ],
    }),
    // Search form
    frame('SearchForm', {
      autoLayout: vertical({ spacing: 20, padX: 40, padY: 32 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      cornerRadius: 12,
      strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('新幹線・特急列車を検索', { fontSize: 20, fontWeight: 700, color: dark }),
        frame('SearchInputs', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'MAX' }),
          children: [
            stationInput('出発駅', '東京'),
            frame('Arrow', {
              autoLayout: horizontal({ padX: 8, padY: 10 }),
              children: [text('⇆', { fontSize: 20, fontWeight: 400, color: gray })],
            }),
            stationInput('到着駅', '新大阪'),
            stationInput('日付', '2026年3月15日'),
            stationInput('時刻', '09:00'),
            frame('SearchBtn', {
              autoLayout: horizontal({ padX: 32, padY: 12 }),
              fills: [solid(jrGreen)],
              cornerRadius: 6,
              children: [text('検索する', { fontSize: 15, fontWeight: 600, color: white })],
            }),
          ],
        }),
      ],
    }),
    // Results
    frame('Results', {
      autoLayout: vertical({ spacing: 12, padX: 40, padY: 24 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        frame('ResultsHeader', {
          autoLayout: horizontal({ align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL' as const,
          children: [
            text('東京 → 新大阪｜3月15日（日）', { fontSize: 16, fontWeight: 600, color: dark }),
            text('8件の列車が見つかりました', { fontSize: 13, fontWeight: 400, color: gray }),
          ],
        }),
        trainRow('のぞみ 1号', '06:00', '08:15', '2時間15分', 'のぞみ', jrBlue, '◎'),
        trainRow('のぞみ 5号', '06:33', '08:48', '2時間15分', 'のぞみ', jrBlue, '○'),
        trainRow('ひかり 501号', '06:26', '09:08', '2時間42分', 'ひかり', jrGreen, '◎'),
        trainRow('のぞみ 7号', '07:00', '09:15', '2時間15分', 'のぞみ', jrBlue, '△'),
        trainRow('こだま 701号', '06:36', '10:23', '3時間47分', 'こだま', '#FF6D00', '◎'),
        trainRow('のぞみ 9号', '07:12', '09:27', '2時間15分', 'のぞみ', jrBlue, '×'),
      ],
    }),
    // Info banner
    frame('InfoBanner', {
      autoLayout: horizontal({ padX: 40, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [gradient([{ hex: '#007A33', position: 0 }, { hex: '#00A651', position: 1 }])],
      cornerRadius: 8,
      children: [
        frame('BannerText', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('えきねっとトクだ値', { fontSize: 18, fontWeight: 700, color: white }),
            text('最大50%OFF！インターネット限定のおトクなきっぷ', { fontSize: 13, fontWeight: 400, color: white }),
          ],
        }),
        frame('BannerCTA', {
          autoLayout: horizontal({ padX: 20, padY: 8 }),
          fills: [solid(white)],
          cornerRadius: 4,
          children: [text('詳しく見る', { fontSize: 13, fontWeight: 600, color: jrGreen })],
        }),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 6, padX: 40, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#2C3E50')],
      children: [
        text('東日本旅客鉄道株式会社', { fontSize: 12, fontWeight: 400, color: '#8899aa' }),
        text('© East Japan Railway Company', { fontSize: 11, fontWeight: 400, color: '#667788' }),
      ],
    }),
  ],
});
