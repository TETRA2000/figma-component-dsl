/**
 * Stock Trading Platform — Trading dashboard with stock list, portfolio allocation, market stats, dark theme
 * DSL features stressed: dark theme, gradient chart placeholders, SPACE_BETWEEN for data rows,
 * color-coded gain/loss indicators, ellipse allocation dots, progress bars for portfolio %
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function stockRow(symbol: string, name: string, price: string, change: string, changePercent: string, isUp: boolean) {
  return frame(`Stock: ${symbol}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    fills: [solid('#1a1a2e')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('StockInfo', {
        autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
        children: [
          frame('SymbolBadge', {
            size: { x: 40, y: 40 },
            autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#ffffff0a')],
            cornerRadius: 8,
            children: [
              text(symbol.substring(0, 2), { fontSize: 13, fontWeight: 700, color: isUp ? '#22c55e' : '#ef4444' }),
            ],
          }),
          frame('StockName', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(symbol, { fontSize: 14, fontWeight: 700, color: '#f1f5f9' }),
              text(name, { fontSize: 11, fontWeight: 400, color: '#64748b' }),
            ],
          }),
        ],
      }),
      // Mini chart placeholder
      rectangle('MiniChart', {
        size: { x: 80, y: 32 },
        fills: [gradient([{ hex: isUp ? '#22c55e' : '#ef4444', position: 0 }, { hex: '#00000000', position: 1 }], 180)],
        cornerRadius: 4,
        opacity: 0.3,
      }),
      frame('StockPrice', {
        autoLayout: vertical({ spacing: 2, counterAlign: 'MAX' }),
        children: [
          text(price, { fontSize: 14, fontWeight: 600, color: '#f1f5f9', textAlignHorizontal: 'RIGHT' }),
          text(`${isUp ? '+' : ''}${change} (${changePercent})`, { fontSize: 12, fontWeight: 500, color: isUp ? '#22c55e' : '#ef4444', textAlignHorizontal: 'RIGHT' }),
        ],
      }),
    ],
  });
}

function allocationItem(name: string, percent: number, color: string, value: string) {
  return frame(`Alloc: ${name}`, {
    autoLayout: vertical({ spacing: 6 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('AllocHeader', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('AllocLabel', {
            autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
            children: [
              ellipse('Dot', { size: { x: 8, y: 8 }, fills: [solid(color)] }),
              text(name, { fontSize: 13, fontWeight: 500, color: '#cbd5e1' }),
            ],
          }),
          text(`${percent}%  ·  ${value}`, { fontSize: 12, fontWeight: 500, color: '#64748b' }),
        ],
      }),
      frame('AllocBar', {
        size: { x: 1, y: 4 },
        fills: [solid('#ffffff0a')],
        cornerRadius: 2,
        layoutSizingHorizontal: 'FILL',
        clipContent: true,
        children: [
          rectangle('AllocFill', {
            size: { x: Math.round(percent * 3.2), y: 4 },
            fills: [solid(color)],
            cornerRadius: 2,
          }),
        ],
      }),
    ],
  });
}

function marketStat(label: string, value: string, change: string, isUp: boolean) {
  return frame(`MarketStat: ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 16, padY: 14 }),
    fills: [solid('#1a1a2e')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 11, fontWeight: 500, color: '#64748b' }),
      text(value, { fontSize: 20, fontWeight: 700, color: '#f1f5f9' }),
      text(change, { fontSize: 12, fontWeight: 600, color: isUp ? '#22c55e' : '#ef4444' }),
    ],
  });
}

export default frame('StockTradingPage', {
  size: { x: 1200 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0f0f1a')],
  children: [
    // Top bar
    frame('TopBar', {
      autoLayout: horizontal({ spacing: 0, padX: 28, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#1a1a2e')],
      strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('TradeX', { fontSize: 20, fontWeight: 700, color: '#22c55e' }),
        frame('MarketStatus', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            ellipse('StatusDot', { size: { x: 8, y: 8 }, fills: [solid('#22c55e')] }),
            text('Market Open', { fontSize: 13, fontWeight: 500, color: '#22c55e' }),
            text('Closes in 3h 42m', { fontSize: 12, fontWeight: 400, color: '#64748b' }),
          ],
        }),
        frame('AccountInfo', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            frame('BalanceBadge', {
              autoLayout: horizontal({ spacing: 0, padX: 14, padY: 6 }),
              fills: [solid('#22c55e1a')],
              cornerRadius: 8,
              children: [
                text('$124,832.50', { fontSize: 13, fontWeight: 700, color: '#22c55e' }),
              ],
            }),
            ellipse('Avatar', { size: { x: 30, y: 30 }, fills: [solid('#ffffff0d')] }),
          ],
        }),
      ],
    }),

    // Main content
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 20, padX: 28, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Watchlist + stocks
        frame('LeftPanel', {
          autoLayout: vertical({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Market stats
            frame('MarketStats', {
              autoLayout: horizontal({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                marketStat('S&P 500', '5,234.18', '+1.24%', true),
                marketStat('NASDAQ', '16,742.39', '+0.87%', true),
                marketStat('DOW', '39,118.22', '-0.15%', false),
                marketStat('BTC/USD', '$68,432', '+3.42%', true),
              ],
            }),

            // Chart placeholder
            frame('ChartSection', {
              autoLayout: vertical({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('ChartHeader', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Portfolio Performance', { fontSize: 16, fontWeight: 700, color: '#f1f5f9' }),
                    frame('ChartFilters', {
                      autoLayout: horizontal({ spacing: 4 }),
                      children: [
                        frame('Filter1D', { autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }), fills: [solid('#ffffff0a')], cornerRadius: 6, children: [text('1D', { fontSize: 11, fontWeight: 500, color: '#64748b' })] }),
                        frame('Filter1W', { autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }), fills: [solid('#22c55e1a')], cornerRadius: 6, children: [text('1W', { fontSize: 11, fontWeight: 600, color: '#22c55e' })] }),
                        frame('Filter1M', { autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }), fills: [solid('#ffffff0a')], cornerRadius: 6, children: [text('1M', { fontSize: 11, fontWeight: 500, color: '#64748b' })] }),
                        frame('Filter1Y', { autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }), fills: [solid('#ffffff0a')], cornerRadius: 6, children: [text('1Y', { fontSize: 11, fontWeight: 500, color: '#64748b' })] }),
                      ],
                    }),
                  ],
                }),
                rectangle('ChartPlaceholder', {
                  size: { x: 1, y: 180 },
                  fills: [gradient([{ hex: '#22c55e', position: 0 }, { hex: '#22c55e00', position: 1 }], 180)],
                  cornerRadius: 12,
                  layoutSizingHorizontal: 'FILL',
                  opacity: 0.15,
                }),
              ],
            }),

            // Watchlist
            frame('WatchlistSection', {
              autoLayout: vertical({ spacing: 10 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('WatchlistHeader', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Watchlist', { fontSize: 16, fontWeight: 700, color: '#f1f5f9' }),
                    text('+ Add', { fontSize: 13, fontWeight: 600, color: '#22c55e' }),
                  ],
                }),
                stockRow('AAPL', 'Apple Inc.', '$198.42', '+3.18', '+1.63%', true),
                stockRow('MSFT', 'Microsoft Corp.', '$425.80', '+5.22', '+1.24%', true),
                stockRow('TSLA', 'Tesla Inc.', '$178.56', '-4.32', '-2.36%', false),
                stockRow('NVDA', 'NVIDIA Corp.', '$892.14', '+12.56', '+1.43%', true),
                stockRow('AMZN', 'Amazon.com', '$186.23', '-1.05', '-0.56%', false),
              ],
            }),
          ],
        }),

        // Right: Portfolio allocation
        frame('RightPanel', {
          size: { x: 320 },
          autoLayout: vertical({ spacing: 16 }),
          children: [
            // Portfolio value
            frame('PortfolioValue', {
              autoLayout: vertical({ spacing: 6, padX: 20, padY: 20 }),
              fills: [solid('#1a1a2e')],
              cornerRadius: 14,
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
              children: [
                text('Portfolio Value', { fontSize: 12, fontWeight: 500, color: '#64748b' }),
                text('$124,832.50', { fontSize: 28, fontWeight: 700, color: '#f1f5f9' }),
                text('+$8,241.30 (+7.07%) all time', { fontSize: 12, fontWeight: 500, color: '#22c55e' }),
              ],
            }),

            // Allocation breakdown
            frame('AllocationCard', {
              autoLayout: vertical({ spacing: 14, padX: 20, padY: 20 }),
              fills: [solid('#1a1a2e')],
              cornerRadius: 14,
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
              children: [
                text('Allocation', { fontSize: 15, fontWeight: 700, color: '#f1f5f9' }),
                allocationItem('Technology', 42, '#3b82f6', '$52,430'),
                allocationItem('Healthcare', 18, '#22c55e', '$22,470'),
                allocationItem('Finance', 15, '#f59e0b', '$18,725'),
                allocationItem('Energy', 12, '#ef4444', '$14,980'),
                allocationItem('Cash', 13, '#94a3b8', '$16,228'),
              ],
            }),

            // Recent trades
            frame('RecentTrades', {
              autoLayout: vertical({ spacing: 10, padX: 20, padY: 20 }),
              fills: [solid('#1a1a2e')],
              cornerRadius: 14,
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
              children: [
                text('Recent Trades', { fontSize: 15, fontWeight: 700, color: '#f1f5f9' }),
                frame('Trade1', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    frame('TradeInfo', { autoLayout: vertical({ spacing: 2 }), children: [text('BUY AAPL', { fontSize: 13, fontWeight: 600, color: '#22c55e' }), text('10 shares @ $195.24', { fontSize: 11, fontWeight: 400, color: '#64748b' })] }),
                    text('$1,952.40', { fontSize: 13, fontWeight: 600, color: '#f1f5f9' }),
                  ],
                }),
                frame('Trade2', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    frame('TradeInfo2', { autoLayout: vertical({ spacing: 2 }), children: [text('SELL TSLA', { fontSize: 13, fontWeight: 600, color: '#ef4444' }), text('5 shares @ $182.88', { fontSize: 11, fontWeight: 400, color: '#64748b' })] }),
                    text('$914.40', { fontSize: 13, fontWeight: 600, color: '#f1f5f9' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
