/**
 * Smart Home — IoT dashboard with device cards, energy stats, room controls (dark)
 * DSL features: dark theme, toggle indicators, energy stat rings, room list with status dots
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function deviceCard(name: string, room: string, icon: string, isOn: boolean, value: string) {
  return frame(`Device: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 14, padY: 14 }),
    fills: [solid(isOn ? '#1e293b' : '#0f172a')],
    cornerRadius: 14, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 1, g: 1, b: 1, a: isOn ? 0.12 : 0.05 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('DeviceTop', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(icon, { fontSize: 24, fontWeight: 400, color: isOn ? '#38bdf8' : '#475569' }),
          frame('Toggle', {
            size: { x: 36, y: 20 }, fills: [solid(isOn ? '#38bdf8' : '#334155')], cornerRadius: 10,
            children: [ellipse('Knob', { size: { x: 16, y: 16 }, fills: [solid('#ffffff')] })],
          }),
        ],
      }),
      text(name, { fontSize: 14, fontWeight: 600, color: isOn ? '#f1f5f9' : '#64748b' }),
      text(room, { fontSize: 11, fontWeight: 400, color: '#64748b' }),
      text(value, { fontSize: 12, fontWeight: 500, color: isOn ? '#38bdf8' : '#475569' }),
    ],
  });
}

function energyStat(label: string, value: string, unit: string, color: string) {
  return frame(`Energy: ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid('#0f172a')], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    children: [
      ellipse(`Ring:${label}`, { size: { x: 48, y: 48 }, fills: [solid(color + '22')] }),
      text(value + unit, { fontSize: 20, fontWeight: 800, color }),
      text(label, { fontSize: 11, fontWeight: 500, color: '#64748b' }),
    ],
  });
}

function roomRow(room: string, devices: number, temp: string, active: boolean) {
  return frame(`Room: ${room}`, {
    autoLayout: horizontal({ spacing: 10, padX: 14, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse('Dot', { size: { x: 8, y: 8 }, fills: [solid(active ? '#22c55e' : '#475569')] }),
      frame('RoomInfo', {
        autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL',
        children: [
          text(room, { fontSize: 14, fontWeight: 600, color: '#f1f5f9' }),
          text(`${devices} devices`, { fontSize: 11, fontWeight: 400, color: '#64748b' }),
        ],
      }),
      text(temp, { fontSize: 13, fontWeight: 500, color: '#38bdf8' }),
    ],
  });
}

export default frame('SmartHomePage', {
  size: { x: 900 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#020617')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 28, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Logo', {
          autoLayout: vertical({ spacing: 2 }),
          children: [
            text('SmartNest', { fontSize: 20, fontWeight: 800, color: '#38bdf8' }),
            text('All systems normal', { fontSize: 11, fontWeight: 400, color: '#22c55e' }),
          ],
        }),
        frame('Temp', {
          autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
          children: [
            text('72°F', { fontSize: 24, fontWeight: 700, color: '#f1f5f9' }),
            text('Indoor', { fontSize: 11, fontWeight: 400, color: '#64748b' }),
          ],
        }),
      ],
    }),
    frame('EnergyRow', {
      autoLayout: horizontal({ spacing: 10, padX: 28, padY: 12 }), layoutSizingHorizontal: 'FILL',
      children: [
        energyStat('Power Now', '2.4', ' kW', '#38bdf8'),
        energyStat('Today', '18.7', ' kWh', '#22c55e'),
        energyStat('Solar', '4.2', ' kW', '#f59e0b'),
        energyStat('Monthly', '$86', '', '#a855f7'),
      ],
    }),
    frame('MainArea', {
      autoLayout: horizontal({ spacing: 16, padX: 28, padY: 12 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('Devices', {
          autoLayout: vertical({ spacing: 10 }), layoutSizingHorizontal: 'FILL',
          children: [
            text('Devices', { fontSize: 16, fontWeight: 700, color: '#f1f5f9' }),
            frame('DeviceGrid1', {
              autoLayout: horizontal({ spacing: 10 }), layoutSizingHorizontal: 'FILL',
              children: [
                deviceCard('Living Room Light', 'Living Room', '💡', true, '80% brightness'),
                deviceCard('Thermostat', 'Hallway', '🌡', true, '72°F'),
              ],
            }),
            frame('DeviceGrid2', {
              autoLayout: horizontal({ spacing: 10 }), layoutSizingHorizontal: 'FILL',
              children: [
                deviceCard('Front Door', 'Entrance', '🔒', true, 'Locked'),
                deviceCard('Garage Door', 'Garage', '🚗', false, 'Closed'),
              ],
            }),
          ],
        }),
        frame('Rooms', {
          size: { x: 240 },
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('Rooms', { fontSize: 16, fontWeight: 700, color: '#f1f5f9' }),
            roomRow('Living Room', 5, '72°F', true),
            roomRow('Bedroom', 3, '68°F', true),
            roomRow('Kitchen', 4, '71°F', true),
            roomRow('Office', 2, '70°F', false),
            roomRow('Garage', 2, '58°F', false),
          ],
        }),
      ],
    }),
  ],
});
