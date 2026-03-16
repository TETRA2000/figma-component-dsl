/**
 * Smart Home — IoT dashboard with device cards, room controls, energy stats, dark theme
 * DSL features: dark fills, gradient stat rings (ellipse strokes), cornerRadius,
 * opacity for inactive devices, FILL layout, SPACE_BETWEEN, clipContent
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function deviceCard(name: string, room: string, status: boolean, iconColor: string, value?: string) {
  return frame(`Device: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }),
    fills: [solid(status ? '#1e293b' : '#0f172a')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    opacity: status ? 1 : 0.6,
    strokes: [{ color: { r: 1, g: 1, b: 1, a: status ? 0.1 : 0.04 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('DeviceTop', {
        autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          ellipse('DeviceIcon', { size: { x: 36, y: 36 }, fills: [solid(status ? iconColor : '#334155')] }),
          frame('DeviceSpacer', { layoutSizingHorizontal: 'FILL', autoLayout: horizontal({ spacing: 0 }), children: [] }),
          frame('StatusDot', {
            size: { x: 10, y: 10 },
            fills: [solid(status ? '#22c55e' : '#64748b')],
            cornerRadius: 5,
            children: [],
          }),
        ],
      }),
      text(name, { fontSize: 14, fontWeight: 600, color: status ? '#f1f5f9' : '#64748b' }),
      frame('DeviceBottom', {
        autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(room, { fontSize: 11, fontWeight: 400, color: '#64748b', layoutSizingHorizontal: 'FILL' }),
          ...(value ? [text(value, { fontSize: 13, fontWeight: 700, color: iconColor })] : []),
        ],
      }),
    ],
  });
}

function energyStat(label: string, value: string, unit: string, color: string) {
  return frame(`Energy: ${label}`, {
    autoLayout: vertical({ spacing: 8, padX: 0, padY: 0, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('Ring', {
        size: { x: 72, y: 72 },
        fills: [],
        strokes: [{ color: { r: 0.15, g: 0.23, b: 0.36, a: 1 }, weight: 6, align: 'INSIDE' as const }],
      }),
      frame('StatValue', {
        autoLayout: horizontal({ spacing: 2, counterAlign: 'MAX' }),
        children: [
          text(value, { fontSize: 22, fontWeight: 800, color: color }),
          text(unit, { fontSize: 12, fontWeight: 500, color: '#64748b' }),
        ],
      }),
      text(label, { fontSize: 11, fontWeight: 500, color: '#94a3b8' }),
    ],
  });
}

function roomTab(room: string, active: boolean) {
  return frame(`Room: ${room}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(active ? '#3b82f6' : '#1e293b')],
    cornerRadius: 8,
    children: [text(room, { fontSize: 13, fontWeight: active ? 600 : 400, color: active ? '#ffffff' : '#94a3b8' })],
  });
}

function sceneButton(name: string, active: boolean, gradFrom: string, gradTo: string) {
  return frame(`Scene: ${name}`, {
    autoLayout: vertical({ spacing: 6, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    fills: active
      ? [gradient([{ hex: gradFrom, position: 0 }, { hex: gradTo, position: 1 }], 135)]
      : [solid('#1e293b')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(name, { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
      text(active ? 'Active' : 'Tap to activate', { fontSize: 10, fontWeight: 400, color: active ? '#ffffffcc' : '#64748b' }),
    ],
  });
}

export default frame('SmartHomePage', {
  size: { x: 900 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0f172a')],
  children: [
    // Top bar
    frame('TopBar', {
      autoLayout: horizontal({ spacing: 0, padX: 24, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('HomeLogo', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            ellipse('HomeIcon', { size: { x: 28, y: 28 }, fills: [solid('#3b82f6')] }),
            text('SmartNest', { fontSize: 18, fontWeight: 700, color: '#f1f5f9' }),
          ],
        }),
        frame('TopSpacer', { layoutSizingHorizontal: 'FILL', autoLayout: horizontal({ spacing: 0 }), children: [] }),
        frame('TopMeta', {
          autoLayout: vertical({ spacing: 2, counterAlign: 'MAX' }),
          children: [
            text('Good evening, Alex', { fontSize: 13, fontWeight: 500, color: '#f1f5f9' }),
            text('72F | Partly cloudy', { fontSize: 11, fontWeight: 400, color: '#64748b' }),
          ],
        }),
      ],
    }),
    // Room tabs
    frame('RoomTabs', {
      autoLayout: horizontal({ spacing: 8, padX: 24, padY: 12 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        roomTab('All Rooms', true),
        roomTab('Living Room', false),
        roomTab('Bedroom', false),
        roomTab('Kitchen', false),
        roomTab('Garage', false),
      ],
    }),
    // Main content
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 20, padX: 24, padY: 8 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Devices + Energy
        frame('LeftColumn', {
          autoLayout: vertical({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Devices grid
            frame('DevicesSection', {
              autoLayout: vertical({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Devices', { fontSize: 18, fontWeight: 700, color: '#f1f5f9' }),
                frame('DeviceRow1', {
                  autoLayout: horizontal({ spacing: 12 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    deviceCard('Living Room Lights', 'Living Room', true, '#fbbf24', '80%'),
                    deviceCard('Thermostat', 'Hallway', true, '#ef4444', '72F'),
                    deviceCard('Front Door Lock', 'Entrance', true, '#22c55e', 'Locked'),
                  ],
                }),
                frame('DeviceRow2', {
                  autoLayout: horizontal({ spacing: 12 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    deviceCard('Bedroom AC', 'Bedroom', false, '#3b82f6'),
                    deviceCard('Kitchen Speaker', 'Kitchen', true, '#8b5cf6', 'Playing'),
                    deviceCard('Garage Door', 'Garage', false, '#f97316'),
                  ],
                }),
              ],
            }),
            // Energy stats
            frame('EnergySection', {
              autoLayout: vertical({ spacing: 16, padX: 20, padY: 20 }),
              fills: [solid('#1e293b')],
              cornerRadius: 14,
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
              children: [
                text('Energy Usage Today', { fontSize: 16, fontWeight: 700, color: '#f1f5f9' }),
                frame('EnergyStats', {
                  autoLayout: horizontal({ spacing: 16 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    energyStat('Power', '2.4', 'kW', '#3b82f6'),
                    energyStat('Solar', '1.8', 'kW', '#fbbf24'),
                    energyStat('Cost', '$3.20', '/day', '#22c55e'),
                  ],
                }),
              ],
            }),
          ],
        }),
        // Scenes sidebar
        frame('ScenesSidebar', {
          size: { x: 220 },
          autoLayout: vertical({ spacing: 12, padX: 0, padY: 0 }),
          children: [
            text('Quick Scenes', { fontSize: 16, fontWeight: 700, color: '#f1f5f9' }),
            sceneButton('Movie Night', true, '#6366f1', '#4f46e5'),
            sceneButton('Good Morning', false, '#f59e0b', '#d97706'),
            sceneButton('Away Mode', false, '#ef4444', '#dc2626'),
            sceneButton('Sleep Time', false, '#8b5cf6', '#7c3aed'),
            sceneButton('Party Mode', false, '#ec4899', '#db2777'),
            // Automation log
            frame('AutoLog', {
              autoLayout: vertical({ spacing: 8, padX: 14, padY: 14 }),
              fills: [solid('#1e293b')],
              cornerRadius: 12,
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
              children: [
                text('Recent Activity', { fontSize: 13, fontWeight: 600, color: '#f1f5f9' }),
                text('7:02 PM - Lights dimmed to 80%', { fontSize: 11, fontWeight: 400, color: '#64748b', lineHeight: { value: 150, unit: 'PERCENT' } }),
                text('6:45 PM - Thermostat set to 72F', { fontSize: 11, fontWeight: 400, color: '#64748b', lineHeight: { value: 150, unit: 'PERCENT' } }),
                text('6:30 PM - Front door locked', { fontSize: 11, fontWeight: 400, color: '#64748b', lineHeight: { value: 150, unit: 'PERCENT' } }),
                text('5:15 PM - Solar peak: 2.1 kW', { fontSize: 11, fontWeight: 400, color: '#64748b', lineHeight: { value: 150, unit: 'PERCENT' } }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
