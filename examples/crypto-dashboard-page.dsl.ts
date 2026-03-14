import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const bg = '#0b0e11'; const surface = '#161a1e'; const surfaceLight = '#1e2329';
const gold = '#f0b90b'; const green = '#0ecb81'; const red = '#f6465d'; const white = '#eaecef';
const gray = '#848e9c'; const dimGray = '#474d57';

function coinRow(rank: string, name: string, symbol: string, price: string, change: string, isUp: boolean, marketCap: string, volume: string) {
  return frame(`Coin: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.15, g: 0.17, b: 0.2, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('CoinInfo', { autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }), children: [
        text(rank, { fontSize: 13, fontWeight: 400, color: gray }),
        ellipse('CoinIcon', { size: { x: 28, y: 28 }, fills: [solid(gold, 0.3)] }),
        frame('Names', { autoLayout: vertical({ spacing: 0 }), children: [
          text(name, { fontSize: 14, fontWeight: 600, color: white }),
          text(symbol, { fontSize: 12, fontWeight: 400, color: gray }),
        ]}),
      ]}),
      text(price, { fontSize: 14, fontWeight: 500, color: white }),
      text(change, { fontSize: 13, fontWeight: 600, color: isUp ? green : red }),
      text(marketCap, { fontSize: 13, fontWeight: 400, color: gray }),
      text(volume, { fontSize: 13, fontWeight: 400, color: gray }),
    ],
  });
}

function portfolioCard(name: string, symbol: string, value: string, change: string, isUp: boolean) {
  return frame(`Portfolio: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }),
    fills: [solid(surfaceLight)], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.15, g: 0.17, b: 0.2, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('PCoinHeader', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
        ellipse('PCoinIcon', { size: { x: 24, y: 24 }, fills: [solid(gold, 0.3)] }),
        text(name, { fontSize: 14, fontWeight: 500, color: white }),
        text(symbol, { fontSize: 12, fontWeight: 400, color: gray }),
      ]}),
      text(value, { fontSize: 20, fontWeight: 700, color: white }),
      text(change, { fontSize: 13, fontWeight: 600, color: isUp ? green : red }),
    ],
  });
}

export default frame('CryptoDashboard', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 32, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(surface)],
      strokes: [{ color: { r: 0.15, g: 0.17, b: 0.2, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('CryptoVault', { fontSize: 20, fontWeight: 700, color: gold }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Dashboard', { fontSize: 14, fontWeight: 600, color: gold }),
          text('Markets', { fontSize: 14, fontWeight: 400, color: gray }),
          text('Trade', { fontSize: 14, fontWeight: 400, color: gray }),
          text('Wallet', { fontSize: 14, fontWeight: 400, color: gray }),
        ]}),
      ],
    }),
    frame('Main', {
      autoLayout: horizontal({ spacing: 20, padX: 32, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('LeftCol', { autoLayout: vertical({ spacing: 20 }), layoutSizingHorizontal: 'FILL', children: [
          frame('PortfolioSummary', {
            autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
            fills: [gradient([{ hex: '#1a1a2e', position: 0 }, { hex: '#16213e', position: 1 }], 135)],
            cornerRadius: 16, layoutSizingHorizontal: 'FILL',
            children: [
              text('Portfolio Value', { fontSize: 14, fontWeight: 400, color: gray }),
              frame('ValueRow', { autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }), children: [
                text('$48,239.54', { fontSize: 32, fontWeight: 700, color: white }),
                frame('ChangeBadge', {
                  autoLayout: horizontal({ padX: 8, padY: 4 }), fills: [solid(green, 0.15)], cornerRadius: 9999,
                  children: [text('+5.24%', { fontSize: 12, fontWeight: 600, color: green })],
                }),
              ]}),
              frame('PortfolioCards', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
                portfolioCard('Bitcoin', 'BTC', '$28,450.00', '+3.2%', true),
                portfolioCard('Ethereum', 'ETH', '$12,890.54', '+7.8%', true),
                portfolioCard('Solana', 'SOL', '$6,899.00', '-2.1%', false),
              ]}),
            ],
          }),
          frame('MarketTable', {
            autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }), fills: [solid(surface)],
            cornerRadius: 16, clipContent: true, layoutSizingHorizontal: 'FILL',
            children: [
              frame('TableHeader', {
                autoLayout: horizontal({ padX: 16, padY: 10, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL',
                fills: [solid(surfaceLight)],
                children: [
                  text('Top Markets', { fontSize: 16, fontWeight: 600, color: white }),
                  text('24h', { fontSize: 13, fontWeight: 400, color: gray }),
                ],
              }),
              coinRow('1', 'Bitcoin', 'BTC', '$67,234.50', '+2.4%', true, '$1.31T', '$28.4B'),
              coinRow('2', 'Ethereum', 'ETH', '$3,456.78', '+5.1%', true, '$415B', '$12.8B'),
              coinRow('3', 'Solana', 'SOL', '$142.30', '-1.8%', false, '$62B', '$3.2B'),
              coinRow('4', 'Cardano', 'ADA', '$0.62', '+0.8%', true, '$22B', '$890M'),
              coinRow('5', 'Polkadot', 'DOT', '$8.45', '-3.2%', false, '$10B', '$456M'),
            ],
          }),
        ]}),
        frame('RightCol', { autoLayout: vertical({ spacing: 16 }), size: { x: 340, y: undefined }, children: [
          frame('QuickActions', {
            autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }), fills: [solid(surface)],
            cornerRadius: 16, layoutSizingHorizontal: 'FILL',
            children: [
              text('Quick Actions', { fontSize: 16, fontWeight: 600, color: white }),
              frame('BuyBtn', {
                autoLayout: horizontal({ padX: 0, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
                fills: [solid(green)], cornerRadius: 8, layoutSizingHorizontal: 'FILL',
                children: [text('Buy Crypto', { fontSize: 14, fontWeight: 600, color: '#0b0e11' })],
              }),
              frame('SellBtn', {
                autoLayout: horizontal({ padX: 0, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
                fills: [solid(red)], cornerRadius: 8, layoutSizingHorizontal: 'FILL',
                children: [text('Sell Crypto', { fontSize: 14, fontWeight: 600, color: white })],
              }),
              frame('SwapBtn', {
                autoLayout: horizontal({ padX: 0, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
                cornerRadius: 8, layoutSizingHorizontal: 'FILL',
                strokes: [{ color: { r: 0.94, g: 0.73, b: 0.04, a: 1 }, weight: 1, align: 'INSIDE' as const }],
                children: [text('Swap', { fontSize: 14, fontWeight: 600, color: gold })],
              }),
            ],
          }),
          frame('RecentActivity', {
            autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }), fills: [solid(surface)],
            cornerRadius: 16, layoutSizingHorizontal: 'FILL',
            children: [
              text('Recent Activity', { fontSize: 16, fontWeight: 600, color: white }),
              frame('Activity1', { autoLayout: horizontal({ spacing: 8, padY: 8, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
                text('Bought BTC', { fontSize: 13, fontWeight: 500, color: white }),
                text('+0.05 BTC', { fontSize: 13, fontWeight: 500, color: green }),
              ]}),
              frame('Activity2', { autoLayout: horizontal({ spacing: 8, padY: 8, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
                text('Sold ETH', { fontSize: 13, fontWeight: 500, color: white }),
                text('-2.5 ETH', { fontSize: 13, fontWeight: 500, color: red }),
              ]}),
              frame('Activity3', { autoLayout: horizontal({ spacing: 8, padY: 8, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
                text('Received SOL', { fontSize: 13, fontWeight: 500, color: white }),
                text('+15 SOL', { fontSize: 13, fontWeight: 500, color: green }),
              ]}),
            ],
          }),
        ]}),
      ],
    }),
  ],
});
