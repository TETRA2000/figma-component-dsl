/**
 * Budget Overview — Spending categories with bars, monthly comparison, pie chart, alerts
 * Batch 6, Page 4: Finance/Banking
 * DSL Features: progress bars, FIXED sizing, strokes, data layouts
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('FinBudget', {
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
        text('Budget Overview', { fontSize: 22, fontWeight: 700, color: '#f8fafc' }),
        frame('MonthSelector', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('◀', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
            text('March 2026', { fontSize: 15, fontWeight: 600, color: '#f8fafc' }),
            text('▶', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
          ],
        }),
      ],
    }),

    // Content
    frame('Content', {
      autoLayout: horizontal({ spacing: 24, padX: 64, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left Column — Spending Categories
        frame('LeftCol', {
          autoLayout: vertical({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Summary Cards
            frame('SummaryRow', {
              autoLayout: horizontal({ spacing: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                summaryCard('Monthly Budget', '$5,000.00', '#f59e0b'),
                summaryCard('Spent So Far', '$3,412.50', '#ef4444'),
                summaryCard('Remaining', '$1,587.50', '#10b981'),
              ],
            }),

            // Spending Categories
            frame('CategoriesCard', {
              autoLayout: vertical({ spacing: 20, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 16,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                text('Spending by Category', { fontSize: 16, fontWeight: 600, color: '#f8fafc' }),
                budgetBar('Housing', 1500, 1500, '#3b82f6'),
                budgetBar('Food & Dining', 800, 623, '#10b981'),
                budgetBar('Transportation', 400, 312, '#f59e0b'),
                budgetBar('Entertainment', 300, 289, '#8b5cf6'),
                budgetBar('Shopping', 500, 456, '#ec4899'),
                budgetBar('Utilities', 350, 232, '#06b6d4'),
                budgetBar('Health', 200, 0, '#14b8a6'),
              ],
            }),

            // Alerts
            frame('AlertsCard', {
              autoLayout: vertical({ spacing: 12, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 16,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                text('Budget Alerts', { fontSize: 16, fontWeight: 600, color: '#f8fafc' }),
                alertItem('⚠', 'Housing budget fully spent', 'You have reached 100% of your $1,500 housing budget.', '#f59e0b'),
                alertItem('⚠', 'Entertainment nearly at limit', 'You have spent $289 of your $300 entertainment budget (96%).', '#ef4444'),
                alertItem('✓', 'Health budget on track', 'No spending recorded this month. $200 remaining.', '#10b981'),
              ],
            }),
          ],
        }),

        // Right Column — Chart & Monthly Comparison
        frame('RightCol', {
          autoLayout: vertical({ spacing: 20 }),
          size: { x: 400, y: undefined },
          children: [
            // Pie Chart Placeholder
            frame('ChartCard', {
              autoLayout: vertical({ spacing: 20, padX: 28, padY: 24, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 16,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                text('Spending Distribution', { fontSize: 16, fontWeight: 600, color: '#f8fafc' }),
                // Pie chart placeholder using concentric circles
                frame('PieChart', {
                  autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
                  size: { x: 200, y: 200 },
                  children: [
                    ellipse('OuterRing', {
                      size: { x: 200, y: 200 },
                      fills: [],
                      strokes: [{ color: hex('#3b82f6'), weight: 24, align: 'INSIDE' }],
                    }),
                  ],
                }),
                // Legend
                frame('Legend', {
                  autoLayout: vertical({ spacing: 8 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    legendItem('Housing', '44%', '#3b82f6'),
                    legendItem('Food & Dining', '18%', '#10b981'),
                    legendItem('Shopping', '13%', '#ec4899'),
                    legendItem('Transportation', '9%', '#f59e0b'),
                    legendItem('Entertainment', '8%', '#8b5cf6'),
                    legendItem('Utilities', '7%', '#06b6d4'),
                  ],
                }),
              ],
            }),

            // Monthly Comparison
            frame('ComparisonCard', {
              autoLayout: vertical({ spacing: 16, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 16,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                text('Monthly Comparison', { fontSize: 16, fontWeight: 600, color: '#f8fafc' }),
                comparisonRow('January', '$4,231', '$5,000'),
                comparisonRow('February', '$4,567', '$5,000'),
                comparisonRow('March', '$3,412', '$5,000'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

function summaryCard(label: string, value: string, color: string) {
  return frame(`Summary: ${label}`, {
    autoLayout: vertical({ spacing: 6, padX: 24, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#1e293b')],
    cornerRadius: 14,
    strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
      text(value, { fontSize: 24, fontWeight: 700, color }),
    ],
  });
}

function budgetBar(category: string, budget: number, spent: number, color: string) {
  const pct = Math.min(Math.round((spent / budget) * 100), 100);
  const barWidth = Math.round((spent / budget) * 300);
  return frame(`Budget: ${category}`, {
    autoLayout: vertical({ spacing: 8 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('BarLabel', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(category, { fontSize: 13, fontWeight: 500, color: '#cbd5e1' }),
          text(`$${spent.toLocaleString()} / $${budget.toLocaleString()} (${pct}%)`, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
        ],
      }),
      frame('BarTrack', {
        size: { x: 300, y: 8 },
        fills: [solid('#0f172a')],
        cornerRadius: 4,
        clipContent: true,
        autoLayout: horizontal({ spacing: 0 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          rectangle('BarFill', {
            size: { x: barWidth || 2, y: 8 },
            fills: [solid(color)],
            cornerRadius: 4,
          }),
        ],
      }),
    ],
  });
}

function alertItem(icon: string, title: string, description: string, color: string) {
  return frame(`Alert: ${title}`, {
    autoLayout: horizontal({ spacing: 14, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#0f172a')],
    cornerRadius: 10,
    children: [
      frame('AlertIcon', {
        autoLayout: horizontal({ padX: 8, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 32, y: 32 },
        fills: [solid(color, 0.15)],
        cornerRadius: 8,
        children: [
          text(icon, { fontSize: 14, fontWeight: 600, color }),
        ],
      }),
      frame('AlertText', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 13, fontWeight: 600, color: '#f8fafc' }),
          text(description, {
            fontSize: 12, fontWeight: 400, color: '#94a3b8',
            lineHeight: { value: 18, unit: 'PIXELS' },
            layoutSizingHorizontal: 'FILL',
          }),
        ],
      }),
    ],
  });
}

function legendItem(label: string, pct: string, color: string) {
  return frame(`Legend: ${label}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('LegendLeft', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          ellipse('LegDot', { size: { x: 10, y: 10 }, fills: [solid(color)] }),
          text(label, { fontSize: 12, fontWeight: 400, color: '#cbd5e1' }),
        ],
      }),
      text(pct, { fontSize: 12, fontWeight: 600, color: '#f8fafc' }),
    ],
  });
}

function comparisonRow(month: string, spent: string, budget: string) {
  return frame(`Month: ${month}`, {
    autoLayout: horizontal({ spacing: 0, padY: 8, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#1e293b'), weight: 1, align: 'INSIDE' }],
    children: [
      text(month, { fontSize: 13, fontWeight: 500, color: '#cbd5e1' }),
      frame('MonthValues', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          text(spent, { fontSize: 13, fontWeight: 600, color: '#f8fafc' }),
          text('/', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
          text(budget, { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
        ],
      }),
    ],
  });
}
