/**
 * Investment Portfolio — Total value, gain/loss, holdings list, allocation chart
 * Batch 6, Page 5: Finance/Banking
 * DSL Features: FIXED sizing, strokes, ellipses, data table patterns, number typography
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('FinInvestments', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0f172a')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0b1120')],
      strokes: [{ color: hex('#1e293b'), weight: 1, align: 'INSIDE' }],
      children: [
        text('Investment Portfolio', { fontSize: 22, fontWeight: 700, color: '#f8fafc' }),
        frame('HeaderActions', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            frame('TradeBtn', {
              autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#f59e0b')],
              cornerRadius: 8,
              children: [
                text('+ New Trade', { fontSize: 13, fontWeight: 600, color: '#0f172a' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Portfolio Summary
    frame('PortfolioSummary', {
      autoLayout: horizontal({ spacing: 24, padX: 64, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Total Value Card
        frame('TotalValueCard', {
          autoLayout: vertical({ spacing: 16, padX: 32, padY: 28 }),
          layoutSizingHorizontal: 'FILL',
          fills: [
            gradient([
              { hex: '#1e293b', position: 0 },
              { hex: '#0f172a', position: 1 },
            ], 270),
          ],
          cornerRadius: 16,
          strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
          children: [
            text('Total Portfolio Value', { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
            text('$87,432.56', { fontSize: 40, fontWeight: 700, color: '#f8fafc' }),
            frame('GainLoss', {
              autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
              children: [
                frame('GainBadge', {
                  autoLayout: horizontal({ padX: 12, padY: 6, spacing: 6, counterAlign: 'CENTER' }),
                  fills: [solid('#10b981', 0.15)],
                  cornerRadius: 999,
                  children: [
                    text('▲', { fontSize: 11, fontWeight: 600, color: '#10b981' }),
                    text('+$4,231.89 (5.08%)', { fontSize: 13, fontWeight: 600, color: '#10b981' }),
                  ],
                }),
                text('All Time', { fontSize: 12, fontWeight: 400, color: '#64748b' }),
              ],
            }),
            rectangle('ValDivider', { size: { x: 1, y: 1 }, fills: [solid('#334155')], layoutSizingHorizontal: 'FILL' }),
            frame('QuickStats', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                miniStat('Today', '+$312.45', '#10b981'),
                miniStat('This Week', '+$1,024.30', '#10b981'),
                miniStat('This Month', '+$2,156.78', '#10b981'),
              ],
            }),
          ],
        }),

        // Allocation Chart Card
        frame('AllocationCard', {
          autoLayout: vertical({ spacing: 20, padX: 28, padY: 24, counterAlign: 'CENTER' }),
          size: { x: 380, y: undefined },
          fills: [solid('#1e293b')],
          cornerRadius: 16,
          strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
          children: [
            text('Asset Allocation', { fontSize: 16, fontWeight: 600, color: '#f8fafc' }),
            // Donut chart placeholder
            frame('DonutChart', {
              autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
              size: { x: 180, y: 180 },
              children: [
                ellipse('DonutRing', {
                  size: { x: 180, y: 180 },
                  fills: [],
                  strokes: [{ color: hex('#3b82f6'), weight: 20, align: 'INSIDE' }],
                }),
              ],
            }),
            frame('AllocLegend', {
              autoLayout: vertical({ spacing: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                allocItem('US Stocks', '45%', '$39,344.65', '#3b82f6'),
                allocItem('Int\'l Stocks', '20%', '$17,486.51', '#8b5cf6'),
                allocItem('Bonds', '15%', '$13,114.88', '#10b981'),
                allocItem('Crypto', '12%', '$10,491.91', '#f59e0b'),
                allocItem('Cash', '8%', '$6,994.60', '#94a3b8'),
              ],
            }),
          ],
        }),
      ],
    }),

    // Holdings Table
    frame('HoldingsSection', {
      autoLayout: vertical({ spacing: 16, padX: 64, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('HoldingsCard', {
          autoLayout: vertical({ spacing: 0, padX: 28, padY: 24 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#1e293b')],
          cornerRadius: 16,
          strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
          children: [
            frame('HoldingsHeader', {
              autoLayout: horizontal({ spacing: 0, padY: 8, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Holdings', { fontSize: 16, fontWeight: 600, color: '#f8fafc' }),
                frame('SortFilter', {
                  autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
                  children: [
                    text('Sort by: Value ▾', { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
                  ],
                }),
              ],
            }),

            rectangle('TableDivider', { size: { x: 1, y: 1 }, fills: [solid('#334155')], layoutSizingHorizontal: 'FILL' }),

            // Column Headers
            frame('ColHeaders', {
              autoLayout: horizontal({ spacing: 0, padY: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Asset', { fontSize: 11, fontWeight: 600, color: '#64748b', size: { x: 250 }, textAutoResize: 'HEIGHT' }),
                text('Shares', { fontSize: 11, fontWeight: 600, color: '#64748b', size: { x: 100 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'RIGHT' }),
                text('Price', { fontSize: 11, fontWeight: 600, color: '#64748b', size: { x: 120 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'RIGHT' }),
                text('Change %', { fontSize: 11, fontWeight: 600, color: '#64748b', size: { x: 120 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'RIGHT' }),
                text('Value', { fontSize: 11, fontWeight: 600, color: '#64748b', size: { x: 140 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'RIGHT' }),
                text('Gain/Loss', { fontSize: 11, fontWeight: 600, color: '#64748b', size: { x: 140 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'RIGHT' }),
              ],
            }),

            rectangle('ColDivider', { size: { x: 1, y: 1 }, fills: [solid('#334155')], layoutSizingHorizontal: 'FILL' }),

            holdingRow('AAPL', 'Apple Inc.', '52.3', '$178.42', '+1.23%', '#10b981', '$9,331.37', '+$1,245.30'),
            holdingRow('MSFT', 'Microsoft Corp.', '28.1', '$412.56', '+0.87%', '#10b981', '$11,592.94', '+$2,103.45'),
            holdingRow('GOOGL', 'Alphabet Inc.', '15.0', '$165.23', '-0.45%', '#ef4444', '$2,478.45', '+$312.60'),
            holdingRow('AMZN', 'Amazon.com Inc.', '18.5', '$185.67', '+2.10%', '#10b981', '$3,434.90', '+$567.80'),
            holdingRow('BTC', 'Bitcoin', '0.45', '$67,234.00', '+3.45%', '#10b981', '$30,255.30', '+$4,231.00'),
            holdingRow('VXUS', 'Vanguard Int\'l ETF', '145.0', '$58.12', '-0.32%', '#ef4444', '$8,427.40', '-$234.50'),
            holdingRow('BND', 'Vanguard Bond ETF', '180.0', '$72.86', '+0.12%', '#10b981', '$13,114.80', '+$145.20'),
          ],
        }),
      ],
    }),

    // Bottom Padding
    rectangle('BottomSpacer', { size: { x: 1, y: 40 }, opacity: 0 }),
  ],
});

function miniStat(label: string, value: string, color: string) {
  return frame(`MiniStat: ${label}`, {
    autoLayout: vertical({ spacing: 2 }),
    children: [
      text(label, { fontSize: 11, fontWeight: 400, color: '#64748b' }),
      text(value, { fontSize: 14, fontWeight: 600, color }),
    ],
  });
}

function allocItem(label: string, pct: string, value: string, color: string) {
  return frame(`Alloc: ${label}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('AllocLeft', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          ellipse('AllocDot', { size: { x: 10, y: 10 }, fills: [solid(color)] }),
          text(label, { fontSize: 12, fontWeight: 400, color: '#cbd5e1' }),
        ],
      }),
      frame('AllocRight', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          text(value, { fontSize: 12, fontWeight: 500, color: '#f8fafc' }),
          text(pct, { fontSize: 12, fontWeight: 600, color: '#94a3b8' }),
        ],
      }),
    ],
  });
}

function holdingRow(ticker: string, name: string, shares: string, price: string, change: string, changeColor: string, value: string, gainLoss: string) {
  const glColor = gainLoss.startsWith('+') ? '#10b981' : '#ef4444';
  return frame(`Holding: ${ticker}`, {
    autoLayout: horizontal({ spacing: 0, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#1e293b'), weight: 1, align: 'INSIDE' }],
    children: [
      frame('AssetInfo', {
        autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
        size: { x: 250, y: undefined },
        children: [
          frame('TickerBadge', {
            autoLayout: horizontal({ padX: 8, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#0f172a')],
            cornerRadius: 6,
            children: [
              text(ticker, { fontSize: 12, fontWeight: 700, color: '#f59e0b' }),
            ],
          }),
          text(name, { fontSize: 13, fontWeight: 400, color: '#cbd5e1' }),
        ],
      }),
      text(shares, { fontSize: 13, fontWeight: 400, color: '#cbd5e1', size: { x: 100 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'RIGHT' }),
      text(price, { fontSize: 13, fontWeight: 500, color: '#f8fafc', size: { x: 120 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'RIGHT' }),
      text(change, { fontSize: 13, fontWeight: 600, color: changeColor, size: { x: 120 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'RIGHT' }),
      text(value, { fontSize: 13, fontWeight: 600, color: '#f8fafc', size: { x: 140 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'RIGHT' }),
      text(gainLoss, { fontSize: 13, fontWeight: 600, color: glColor, size: { x: 140 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'RIGHT' }),
    ],
  });
}
