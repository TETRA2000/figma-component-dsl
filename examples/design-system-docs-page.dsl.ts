import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const indigo = '#4f46e5'; const white = '#ffffff'; const bg = '#f8fafc'; const dark = '#0f172a';
const med = '#64748b'; const light = '#94a3b8'; const green = '#059669'; const amber = '#d97706';

function colorSwatch(name: string, hex: string) {
  return frame(`Swatch: ${name}`, {
    autoLayout: vertical({ spacing: 4 }), size: { x: 100, y: undefined },
    children: [
      rectangle('Color', { size: { x: 100, y: 60 }, fills: [solid(hex)], cornerRadius: 8 }),
      text(name, { fontSize: 11, fontWeight: 500, color: dark }),
      text(hex, { fontSize: 10, fontWeight: 400, color: med }),
    ],
  });
}

function componentExample(name: string, desc: string, status: 'Stable' | 'Beta' | 'Deprecated') {
  const statusColor = status === 'Stable' ? green : status === 'Beta' ? amber : '#dc2626';
  return frame(`Comp: ${name}`, {
    autoLayout: horizontal({ padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL', fills: [solid(white)], cornerRadius: 8,
    strokes: [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('CompLeft', { autoLayout: vertical({ spacing: 2 }), children: [
        text(name, { fontSize: 14, fontWeight: 600, color: dark }),
        text(desc, { fontSize: 12, fontWeight: 400, color: med }),
      ]}),
      frame(`Badge: ${status}`, { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(statusColor, 0.1)], cornerRadius: 4,
        children: [text(status, { fontSize: 11, fontWeight: 600, color: statusColor })] }),
    ],
  });
}

function navItem(label: string, isActive: boolean) {
  return frame(`Nav: ${label}`, {
    autoLayout: horizontal({ padX: 12, padY: 6 }), layoutSizingHorizontal: 'FILL',
    fills: isActive ? [solid(indigo, 0.08)] : [], cornerRadius: 6,
    children: [text(label, { fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? indigo : med })],
  });
}

export default frame('DesignSystemDocs', {
  size: { x: 1440, y: undefined }, autoLayout: horizontal({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Sidebar', {
      autoLayout: vertical({ spacing: 16, padX: 16, padY: 20 }), size: { x: 240, y: undefined },
      fills: [solid(white)],
      strokes: [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('Prism DS', { fontSize: 18, fontWeight: 700, color: indigo }),
        text('v2.4.0', { fontSize: 11, fontWeight: 400, color: light }),
        frame('NavGroup1', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
          text('FOUNDATIONS', { fontSize: 10, fontWeight: 700, color: light, letterSpacing: { value: 1, unit: 'PIXELS' as const } }),
          navItem('Colors', true),
          navItem('Typography', false),
          navItem('Spacing', false),
          navItem('Icons', false),
        ]}),
        frame('NavGroup2', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
          text('COMPONENTS', { fontSize: 10, fontWeight: 700, color: light, letterSpacing: { value: 1, unit: 'PIXELS' as const } }),
          navItem('Button', false),
          navItem('Input', false),
          navItem('Card', false),
          navItem('Modal', false),
          navItem('Table', false),
        ]}),
        frame('NavGroup3', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
          text('PATTERNS', { fontSize: 10, fontWeight: 700, color: light, letterSpacing: { value: 1, unit: 'PIXELS' as const } }),
          navItem('Forms', false),
          navItem('Navigation', false),
          navItem('Data Display', false),
        ]}),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 40, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('PageHeader', { autoLayout: vertical({ spacing: 4 }), children: [
          text('Colors', { fontSize: 28, fontWeight: 700, color: dark }),
          text('The color palette defines the visual language of the design system.', { fontSize: 15, fontWeight: 400, color: med }),
        ]}),
        frame('PrimaryColors', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
          text('Primary', { fontSize: 18, fontWeight: 600, color: dark }),
          frame('SwatchRow', { autoLayout: horizontal({ spacing: 12 }), children: [
            colorSwatch('Indigo 50', '#eef2ff'),
            colorSwatch('Indigo 100', '#e0e7ff'),
            colorSwatch('Indigo 200', '#c7d2fe'),
            colorSwatch('Indigo 400', '#818cf8'),
            colorSwatch('Indigo 500', '#6366f1'),
            colorSwatch('Indigo 600', '#4f46e5'),
            colorSwatch('Indigo 700', '#4338ca'),
            colorSwatch('Indigo 800', '#3730a3'),
            colorSwatch('Indigo 900', '#312e81'),
          ]}),
        ]}),
        frame('SemanticColors', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
          text('Semantic', { fontSize: 18, fontWeight: 600, color: dark }),
          frame('SemanticRow', { autoLayout: horizontal({ spacing: 12 }), children: [
            colorSwatch('Success', '#059669'),
            colorSwatch('Warning', '#d97706'),
            colorSwatch('Error', '#dc2626'),
            colorSwatch('Info', '#2563eb'),
          ]}),
        ]}),
        frame('ComponentStatus', { autoLayout: vertical({ spacing: 8 }), layoutSizingHorizontal: 'FILL', children: [
          text('Component Status', { fontSize: 18, fontWeight: 600, color: dark }),
          componentExample('Button', 'Primary, secondary, ghost, and icon variants', 'Stable'),
          componentExample('Input', 'Text, number, password, and textarea', 'Stable'),
          componentExample('DatePicker', 'Calendar popup with range selection', 'Beta'),
          componentExample('DataTable', 'Sortable, filterable data grid', 'Beta'),
          componentExample('Accordion', 'Collapsible content sections', 'Stable'),
          componentExample('Tooltip', 'Legacy tooltip - use Popover instead', 'Deprecated'),
        ]}),
      ],
    }),
  ],
});
