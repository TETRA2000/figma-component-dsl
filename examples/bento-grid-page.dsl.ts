import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: 2026 Bento Grid trend — Modular asymmetric grid blocks, varied card sizes
const dark = '#1a1a1a'; const white = '#ffffff'; const accent = '#6366f1'; const bg = '#f4f4f5';
const med = '#71717a'; const light = '#e4e4e7'; const warmAccent = '#f59e0b'; const green = '#10b981';

function bentoCard(name: string, w: number, h: number, fill: string, title: string, sub: string) {
  return frame(name, {
    autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }), size: { x: w, y: h },
    fills: [solid(fill)], cornerRadius: 16, clipContent: true,
    children: [
      text(title, { fontSize: 18, fontWeight: 600, color: fill === dark ? white : dark }),
      text(sub, { fontSize: 12, fontWeight: 400, color: fill === dark ? '#a0a0a8' : med }),
    ],
  });
}

export default frame('BentoGridLayout', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('BENTO', { fontSize: 18, fontWeight: 800, color: dark, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Features', { fontSize: 13, fontWeight: 500, color: dark }),
          text('Pricing', { fontSize: 13, fontWeight: 400, color: med }),
          text('Blog', { fontSize: 13, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('HeroText', {
      autoLayout: vertical({ spacing: 8, padX: 48, padY: 40 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Everything you need,\nbeautifully organized', { fontSize: 40, fontWeight: 700, color: dark, lineHeight: { value: 48, unit: 'PIXELS' as const } }),
        text('A modular approach to building your workflow', { fontSize: 15, fontWeight: 400, color: med }),
      ],
    }),
    frame('BentoGrid', {
      autoLayout: vertical({ spacing: 12, padX: 48, padY: 20 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('Row1', { autoLayout: horizontal({ spacing: 12 }), children: [
          bentoCard('Analytics', 420, 240, dark, 'Analytics', 'Real-time metrics at a glance'),
          bentoCard('Calendar', 420, 240, white, 'Calendar', 'Schedule and plan your day'),
          bentoCard('Notes', 420, 240, accent, 'Quick Notes', 'Capture ideas instantly'),
        ]}),
        frame('Row2', { autoLayout: horizontal({ spacing: 12 }), children: [
          bentoCard('Tasks', 630, 180, white, 'Task Manager', 'Track progress on all your projects'),
          bentoCard('Weather', 210, 180, '#0ea5e9', 'Weather', 'Today: 22°C'),
          bentoCard('Focus', 420, 180, warmAccent, 'Focus Timer', 'Stay productive with Pomodoro'),
        ]}),
        frame('Row3', { autoLayout: horizontal({ spacing: 12 }), children: [
          bentoCard('Files', 210, 160, green, 'Files', '24 items'),
          bentoCard('Messages', 420, 160, white, 'Messages', '3 unread conversations'),
          bentoCard('Goals', 630, 160, dark, 'Goals', '78% of quarterly goals achieved'),
        ]}),
      ],
    }),
  ],
});
