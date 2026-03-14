import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const cyan = '#06b6d4'; const cyanBg = '#ecfeff'; const white = '#ffffff'; const bg = '#0f172a';
const dark = '#f8fafc'; const med = '#94a3b8'; const dim = '#475569'; const green = '#22c55e'; const amber = '#eab308';

function deviceCard(name: string, room: string, isOn: boolean, iconColor: string, value?: string) {
  return frame(`Device: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 16, padY: 14 }),
    fills: [solid(isOn ? '#1e293b' : '#0f172a')], cornerRadius: 14,
    strokes: [{ color: { r: 0.2, g: 0.27, b: 0.35, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('DeviceTop', { autoLayout: horizontal({ align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
        frame('DeviceIcon', { size: { x: 40, y: 40 }, fills: [solid(iconColor, 0.15)], cornerRadius: 10,
          autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
          children: [ellipse('Icon', { size: { x: 18, y: 18 }, fills: [solid(iconColor)] })] }),
        ellipse('Toggle', { size: { x: 12, y: 12 }, fills: [solid(isOn ? green : dim)] }),
      ]}),
      text(name, { fontSize: 14, fontWeight: 500, color: dark }),
      text(room, { fontSize: 12, fontWeight: 400, color: med }),
      ...(value ? [text(value, { fontSize: 20, fontWeight: 700, color: iconColor })] : []),
    ],
  });
}

function roomScene(name: string, devices: string, isActive: boolean) {
  return frame(`Scene: ${name}`, {
    autoLayout: horizontal({ padX: 14, padY: 10, spacing: 10, counterAlign: 'CENTER' }),
    fills: [solid(isActive ? cyan : '#1e293b')], cornerRadius: 10,
    children: [
      ellipse('SceneIcon', { size: { x: 32, y: 32 }, fills: [solid(isActive ? white : dim, isActive ? 0.2 : 1)] }),
      frame('SceneText', { autoLayout: vertical({ spacing: 1 }), children: [
        text(name, { fontSize: 13, fontWeight: 500, color: isActive ? white : dark }),
        text(devices, { fontSize: 11, fontWeight: 400, color: isActive ? '#a5f3fc' : med }),
      ]}),
    ],
  });
}

export default frame('SmartHome', {
  size: { x: 1440, y: undefined }, autoLayout: horizontal({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Sidebar', {
      autoLayout: vertical({ spacing: 16, padX: 16, padY: 20 }), size: { x: 240, y: undefined },
      fills: [solid('#0f172a')],
      strokes: [{ color: { r: 0.2, g: 0.27, b: 0.35, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('SmartNest', { fontSize: 20, fontWeight: 700, color: cyan }),
        frame('Scenes', { autoLayout: vertical({ spacing: 6 }), layoutSizingHorizontal: 'FILL', children: [
          text('Scenes', { fontSize: 12, fontWeight: 600, color: med, letterSpacing: { value: 1, unit: 'PIXELS' as const } }),
          roomScene('Morning', '5 devices', true),
          roomScene('Away', '8 devices', false),
          roomScene('Movie Night', '4 devices', false),
          roomScene('Sleep', '6 devices', false),
        ]}),
        frame('Rooms', { autoLayout: vertical({ spacing: 6 }), layoutSizingHorizontal: 'FILL', children: [
          text('Rooms', { fontSize: 12, fontWeight: 600, color: med, letterSpacing: { value: 1, unit: 'PIXELS' as const } }),
          text('Living Room', { fontSize: 13, fontWeight: 500, color: cyan }),
          text('Bedroom', { fontSize: 13, fontWeight: 400, color: med }),
          text('Kitchen', { fontSize: 13, fontWeight: 400, color: med }),
          text('Office', { fontSize: 13, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('MainContent', {
      autoLayout: vertical({ spacing: 20, padX: 32, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('TopBar', { autoLayout: horizontal({ align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
          frame('Greeting', { autoLayout: vertical({ spacing: 2 }), children: [
            text('Good Morning, Alex', { fontSize: 24, fontWeight: 700, color: dark }),
            text('Living Room · 22°C · Sunny', { fontSize: 14, fontWeight: 400, color: med }),
          ]}),
          frame('QuickActions', { autoLayout: horizontal({ spacing: 8 }), children: [
            frame('AllOffBtn', { autoLayout: horizontal({ padX: 14, padY: 8 }), fills: [solid('#1e293b')], cornerRadius: 8,
              strokes: [{ color: { r: 0.2, g: 0.27, b: 0.35, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [text('All Off', { fontSize: 13, fontWeight: 500, color: med })] }),
            frame('AddBtn', { autoLayout: horizontal({ padX: 14, padY: 8 }), fills: [solid(cyan)], cornerRadius: 8,
              children: [text('Add Device', { fontSize: 13, fontWeight: 600, color: white })] }),
          ]}),
        ]}),
        frame('EnergyBanner', {
          autoLayout: horizontal({ padX: 20, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL', fills: [solid('#1e293b')], cornerRadius: 12,
          children: [
            frame('EnergyInfo', { autoLayout: vertical({ spacing: 4 }), children: [
              text('Energy Usage Today', { fontSize: 14, fontWeight: 500, color: dark }),
              text('12.4 kWh', { fontSize: 28, fontWeight: 700, color: green }),
              text('18% less than yesterday', { fontSize: 12, fontWeight: 400, color: green }),
            ]}),
            frame('EnergySummary', { autoLayout: horizontal({ spacing: 16 }), children: [
              frame('ES1', { autoLayout: vertical({ spacing: 2 }), children: [
                text('Lights', { fontSize: 11, fontWeight: 400, color: med }),
                text('3.2 kWh', { fontSize: 14, fontWeight: 600, color: amber }),
              ]}),
              frame('ES2', { autoLayout: vertical({ spacing: 2 }), children: [
                text('Climate', { fontSize: 11, fontWeight: 400, color: med }),
                text('5.8 kWh', { fontSize: 14, fontWeight: 600, color: cyan }),
              ]}),
              frame('ES3', { autoLayout: vertical({ spacing: 2 }), children: [
                text('Other', { fontSize: 11, fontWeight: 400, color: med }),
                text('3.4 kWh', { fontSize: 14, fontWeight: 600, color: med }),
              ]}),
            ]}),
          ],
        }),
        frame('DeviceGrid', {
          autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL',
          children: [
            frame('DevCol1', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              deviceCard('Living Room Lights', 'Living Room', true, amber, '80%'),
              deviceCard('Smart Speaker', 'Living Room', true, cyan),
            ]}),
            frame('DevCol2', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              deviceCard('Thermostat', 'Whole Home', true, green, '22°C'),
              deviceCard('Security Camera', 'Front Door', true, '#ef4444'),
            ]}),
            frame('DevCol3', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              deviceCard('Robot Vacuum', 'Kitchen', false, '#8b5cf6'),
              deviceCard('Smart Blinds', 'Bedroom', false, '#3b82f6', 'Closed'),
            ]}),
          ],
        }),
      ],
    }),
  ],
});
