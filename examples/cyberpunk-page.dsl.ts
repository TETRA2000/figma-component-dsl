/**
 * Cyberpunk — Neon on dark, glitch aesthetics, futuristic UI panels.
 *
 * DSL features stressed: multi-color neon strokes, gradient fills,
 * clipContent, cornerRadii (per-corner), tight spacing, ellipse indicators.
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function cyberPanel(title: string, value: string, status: string, statusColor: string) {
  return frame(`Panel: ${title}`, {
    size: { x: 300, y: undefined },
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
    fills: [solid('#0a0a14')],
    cornerRadii: { topLeft: 2, topRight: 16, bottomLeft: 16, bottomRight: 2 },
    strokes: [{ color: hex('#00ff9980'), weight: 1, align: 'INSIDE' }],
    children: [
      frame('StatusRow', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          ellipse('StatusDot', { size: { x: 8, y: 8 }, fills: [solid(statusColor)] }),
          text(status, { fontSize: 11, fontWeight: 600, color: statusColor, letterSpacing: { value: 1, unit: 'PIXELS' } }),
        ],
      }),
      text(value, { fontSize: 36, fontWeight: 700, color: '#ffffff' }),
      text(title, { fontSize: 13, fontWeight: 400, color: '#666688' }),
    ],
  });
}

export default frame('CyberpunkPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#06060e')],
  children: [
    // Header bar
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a14')],
      strokes: [{ color: hex('#00ff9940'), weight: 1, align: 'INSIDE' }],
      children: [
        text('NEXUS://CORP', { fontSize: 14, fontWeight: 700, color: '#00ff99', letterSpacing: { value: 2, unit: 'PIXELS' } }),
        frame('NavItems', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('DASHBOARD', { fontSize: 11, fontWeight: 500, color: '#4a4a6a', letterSpacing: { value: 1, unit: 'PIXELS' } }),
            text('NETWORK', { fontSize: 11, fontWeight: 500, color: '#4a4a6a', letterSpacing: { value: 1, unit: 'PIXELS' } }),
            text('SYSTEMS', { fontSize: 11, fontWeight: 500, color: '#00ff99', letterSpacing: { value: 1, unit: 'PIXELS' } }),
          ],
        }),
      ],
    }),

    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([
        { hex: '#06060e', position: 0 },
        { hex: '#0f0f2a', position: 0.5 },
        { hex: '#06060e', position: 1 },
      ], 180)],
      children: [
        frame('GlitchBadge', {
          autoLayout: horizontal({ padX: 16, padY: 4 }),
          strokes: [{ color: hex('#ff004080'), weight: 1, align: 'INSIDE' }],
          children: [
            text('SYS.ONLINE', { fontSize: 11, fontWeight: 600, color: '#ff0040', letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        text('NIGHT CITY', {
          fontSize: 80,
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: { value: 4, unit: 'PIXELS' },
        }),
        text('Welcome to the edge of tomorrow', {
          fontSize: 18,
          fontWeight: 400,
          color: '#4a4a6a',
        }),
      ],
    }),

    // Panels
    frame('Panels', {
      autoLayout: horizontal({ spacing: 16, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        cyberPanel('NEURAL LOAD', '87.3%', 'OPTIMAL', '#00ff99'),
        cyberPanel('NETWORK', '2.4TB', 'ACTIVE', '#00ccff'),
        cyberPanel('THREATS', '0', 'SECURE', '#00ff99'),
        cyberPanel('UPTIME', '99.97%', 'WARNING', '#ffaa00'),
      ],
    }),
  ],
});
