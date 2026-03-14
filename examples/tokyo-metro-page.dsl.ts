import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: tokyometro.jp — Tokyo Metro subway guide, blue branding, route info
// Features stressed: colored line badges, data-dense layout, CJK, SPACE_BETWEEN, stroke alignment

const metroBlue = '#0079C2';
const dark = '#1a1a1a';
const white = '#ffffff';
const gray = '#777777';
const lightBg = '#f0f4f8';

const lineColors: Record<string, string> = {
  '銀座線': '#FF9500', '丸ノ内線': '#F62E36', '日比谷線': '#B5B5AC',
  '東西線': '#009BBF', '千代田線': '#00BB85', '有楽町線': '#C1A470',
  '半蔵門線': '#8B76D0', '南北線': '#00AC9B', '副都心線': '#9C5E31',
};

function lineBadge(lineName: string) {
  return frame(`Line:${lineName}`, {
    autoLayout: horizontal({ padX: 10, padY: 4 }),
    fills: [solid(lineColors[lineName] || metroBlue)],
    cornerRadius: 4,
    children: [text(lineName, { fontSize: 11, fontWeight: 700, color: white })],
  });
}

function stationRow(station: string, lines: string[], minutes: string) {
  return frame(`Station:${station}`, {
    autoLayout: horizontal({ padX: 16, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL' as const,
    fills: [solid(white)],
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(station, { fontSize: 15, fontWeight: 600, color: dark }),
      frame('Lines', {
        autoLayout: horizontal({ spacing: 4 }),
        children: lines.map(l => lineBadge(l)),
      }),
      text(minutes, { fontSize: 13, fontWeight: 400, color: gray }),
    ],
  });
}

function serviceAlert(line: string, status: string, isOk: boolean) {
  return frame(`Alert:${line}`, {
    autoLayout: horizontal({ padX: 12, padY: 8, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL' as const,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      lineBadge(line),
      text(status, { fontSize: 13, fontWeight: isOk ? 400 : 600, color: isOk ? '#2E7D32' : '#D32F2F' }),
    ],
  });
}

export default frame('TokyoMetroPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(lightBg)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(metroBlue)],
      children: [
        text('Tokyo Metro', { fontSize: 22, fontWeight: 700, color: white }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('路線図', { fontSize: 14, fontWeight: 500, color: white }),
          text('時刻表', { fontSize: 14, fontWeight: 500, color: white }),
          text('運行情報', { fontSize: 14, fontWeight: 500, color: white }),
          text('乗換案内', { fontSize: 14, fontWeight: 500, color: white }),
        ]}),
        frame('LangSwitch', { autoLayout: horizontal({ spacing: 8 }), children: [
          text('日本語', { fontSize: 12, fontWeight: 600, color: white }),
          text('EN', { fontSize: 12, fontWeight: 400, color: white, opacity: 0.7 }),
          text('中文', { fontSize: 12, fontWeight: 400, color: white, opacity: 0.7 }),
          text('한국어', { fontSize: 12, fontWeight: 400, color: white, opacity: 0.7 }),
        ]}),
      ],
    }),
    // Route search
    frame('RouteSearch', {
      autoLayout: vertical({ spacing: 16, padX: 40, padY: 24 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      cornerRadius: 12,
      children: [
        text('乗換案内', { fontSize: 20, fontWeight: 700, color: dark }),
        frame('SearchInputs', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'MAX' }),
          children: [
            frame('From', {
              autoLayout: vertical({ spacing: 4 }), size: { x: 240, y: undefined },
              children: [
                text('出発駅', { fontSize: 12, fontWeight: 500, color: gray }),
                frame('Input', { autoLayout: horizontal({ padX: 14, padY: 10 }), layoutSizingHorizontal: 'FILL' as const, fills: [solid(lightBg)], cornerRadius: 6, children: [text('渋谷', { fontSize: 14, fontWeight: 500, color: dark })] }),
              ],
            }),
            frame('To', {
              autoLayout: vertical({ spacing: 4 }), size: { x: 240, y: undefined },
              children: [
                text('到着駅', { fontSize: 12, fontWeight: 500, color: gray }),
                frame('Input', { autoLayout: horizontal({ padX: 14, padY: 10 }), layoutSizingHorizontal: 'FILL' as const, fills: [solid(lightBg)], cornerRadius: 6, children: [text('浅草', { fontSize: 14, fontWeight: 500, color: dark })] }),
              ],
            }),
            frame('SearchBtn', {
              autoLayout: horizontal({ padX: 32, padY: 12 }),
              fills: [solid(metroBlue)],
              cornerRadius: 6,
              children: [text('検索', { fontSize: 15, fontWeight: 600, color: white })],
            }),
          ],
        }),
      ],
    }),
    // Route result
    frame('RouteResult', {
      autoLayout: vertical({ spacing: 12, padX: 40, padY: 24 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        text('検索結果: 渋谷 → 浅草', { fontSize: 16, fontWeight: 600, color: dark }),
        stationRow('渋谷', ['銀座線', '半蔵門線', '副都心線'], '出発'),
        stationRow('表参道', ['銀座線', '千代田線', '半蔵門線'], '2分'),
        stationRow('赤坂見附', ['銀座線', '丸ノ内線'], '7分'),
        stationRow('銀座', ['銀座線', '丸ノ内線', '日比谷線'], '11分'),
        stationRow('上野', ['銀座線', '日比谷線'], '18分'),
        stationRow('浅草', ['銀座線'], '20分 到着'),
      ],
    }),
    // Service status
    frame('ServiceStatus', {
      autoLayout: vertical({ spacing: 0, padX: 40, padY: 24 }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      cornerRadius: 12,
      clipContent: true,
      children: [
        frame('StatusHeader', {
          autoLayout: horizontal({ padX: 16, padY: 12 }),
          layoutSizingHorizontal: 'FILL' as const,
          fills: [solid(metroBlue)],
          children: [text('運行情報', { fontSize: 16, fontWeight: 700, color: white })],
        }),
        serviceAlert('銀座線', '通常運転', true),
        serviceAlert('丸ノ内線', '通常運転', true),
        serviceAlert('日比谷線', '通常運転', true),
        serviceAlert('東西線', '遅延あり（約5分）', false),
        serviceAlert('千代田線', '通常運転', true),
        serviceAlert('有楽町線', '通常運転', true),
        serviceAlert('半蔵門線', '通常運転', true),
        serviceAlert('南北線', '通常運転', true),
        serviceAlert('副都心線', '通常運転', true),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 6, padX: 40, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#1a3a5c')],
      children: [
        text('東京地下鉄株式会社', { fontSize: 12, fontWeight: 400, color: '#8899aa' }),
        text('© Tokyo Metro Co., Ltd.', { fontSize: 11, fontWeight: 400, color: '#667788' }),
      ],
    }),
  ],
});
