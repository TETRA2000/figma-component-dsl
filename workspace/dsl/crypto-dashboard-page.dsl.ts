/**
 * Crypto Dashboard — Portfolio value, coin list, price changes
 * DSL features: dark theme, large portfolio number, percentage badges, colored up/down indicators, ellipse coin icons
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function coinRow(name: string, symbol: string, price: string, change: string, up: boolean, holding: string, value: string, color: string) {
  return frame(`Coin: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('CoinInfo', {
        autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          ellipse(`Icon:${symbol}`, { size: { x: 36, y: 36 }, fills: [solid(color)] }),
          frame('CoinName', { autoLayout: vertical({ spacing: 2 }), children: [
            text(name, { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
            text(symbol, { fontSize: 12, fontWeight: 400, color: '#71717a' }),
          ]}),
        ],
      }),
      frame('PriceCol', {
        autoLayout: vertical({ spacing: 2, counterAlign: 'MAX' }),
        children: [
          text(price, { fontSize: 14, fontWeight: 500, color: '#ffffff' }),
          text(change, { fontSize: 12, fontWeight: 600, color: up ? '#22c55e' : '#ef4444' }),
        ],
      }),
      frame('HoldingCol', {
        autoLayout: vertical({ spacing: 2, padX: 24, counterAlign: 'MAX' }),
        children: [
          text(holding, { fontSize: 14, fontWeight: 500, color: '#ffffff' }),
          text(value, { fontSize: 12, fontWeight: 400, color: '#71717a' }),
        ],
      }),
    ],
  });
}

export default frame('CryptoDashboardPage', {
  size: { x: 720 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0a0a0a')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 24, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#141414')],
      children: [
        text('CryptoFolio', { fontSize: 20, fontWeight: 800, color: '#22c55e' }),
        frame('HeaderRight', { autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }), children: [
          text('Portfolio', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
          text('Markets', { fontSize: 13, fontWeight: 400, color: '#71717a' }),
          ellipse('Avatar', { size: { x: 30, y: 30 }, fills: [gradient([{ hex: '#22c55e', position: 0 }, { hex: '#16a34a', position: 1 }], 135)] }),
        ]}),
      ],
    }),
    // Portfolio card
    frame('PortfolioCard', {
      autoLayout: vertical({ spacing: 12, padX: 24, padY: 28 }),
      fills: [gradient([{ hex: '#14532d', position: 0 }, { hex: '#052e16', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Total Portfolio Value', { fontSize: 13, fontWeight: 500, color: '#86efac' }),
        text('$47,832.54', { fontSize: 40, fontWeight: 800, color: '#ffffff' }),
        frame('ChangeRow', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
          frame('ChangeBadge', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid('#22c55e33')], cornerRadius: 6, children: [
            text('+4.32%', { fontSize: 13, fontWeight: 600, color: '#22c55e' }),
          ]}),
          text('+$1,982.41 today', { fontSize: 13, fontWeight: 400, color: '#86efac' }),
        ]}),
      ],
    }),
    // Coin list
    frame('CoinList', {
      autoLayout: vertical({ spacing: 0, padX: 8, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ListHeader', {
          autoLayout: horizontal({ spacing: 0, padX: 16, padY: 8, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Asset', { fontSize: 12, fontWeight: 500, color: '#52525b', layoutSizingHorizontal: 'FILL' }),
            text('Price', { fontSize: 12, fontWeight: 500, color: '#52525b' }),
            text('Holdings', { fontSize: 12, fontWeight: 500, color: '#52525b', textAlignHorizontal: 'RIGHT' }),
          ],
        }),
        coinRow('Bitcoin', 'BTC', '$68,432.10', '+3.24%', true, '0.42 BTC', '$28,741', '#f7931a'),
        coinRow('Ethereum', 'ETH', '$3,845.20', '+5.67%', true, '3.2 ETH', '$12,305', '#627eea'),
        coinRow('Solana', 'SOL', '$142.80', '-1.23%', false, '28 SOL', '$3,998', '#9945ff'),
        coinRow('Cardano', 'ADA', '$0.82', '+2.15%', true, '3,400 ADA', '$2,788', '#0033ad'),
      ],
    }),
  ],
});
