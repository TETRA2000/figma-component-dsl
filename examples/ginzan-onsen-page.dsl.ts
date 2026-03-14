import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Ginzan Onsen — Snow village, warm amber lantern glow, cozy winter
const amber = '#d4a35a'; const snow = '#f8f6f0'; const warmGray = '#4a4038'; const dark = '#2a241e';
const med = '#7a7068'; const cream = '#eee8dd'; const lantern = '#e8b850';

function innCard(name: string, desc: string, feature: string) {
  return frame(`Inn: ${name}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 20 }),
    fills: [solid(snow)], cornerRadius: 4, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.85, g: 0.8, b: 0.72, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(name, { fontSize: 18, fontWeight: 300, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
      text(desc, { fontSize: 12, fontWeight: 300, color: med }),
      rectangle('Sep', { size: { x: 30, y: 1 }, fills: [solid(amber, 0.5)] }),
      text(feature, { fontSize: 11, fontWeight: 400, color: amber }),
    ],
  });
}

export default frame('GinzanOnsen', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(cream)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(snow)],
      children: [
        text('銀山温泉', { fontSize: 22, fontWeight: 300, color: dark, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('History', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Ryokan', { fontSize: 12, fontWeight: 400, color: med }),
          text('Seasons', { fontSize: 12, fontWeight: 400, color: med }),
          text('Access', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('HeroSection', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#2a241e', position: 0 }, { hex: '#3a342a', position: 0.3 }, { hex: '#d4a35a', position: 0.7 }, { hex: '#e8b850', position: 1 }], 180)],
      children: [
        text('A Village Frozen in Time', { fontSize: 44, fontWeight: 200, color: snow, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        text('Nestled in the mountains of Yamagata, where gaslight lanterns illuminate centuries-old wooden ryokan along a steaming river', { fontSize: 14, fontWeight: 300, color: '#d4c4a8', size: { x: 600 }, textAutoResize: 'HEIGHT' as const }),
      ],
    }),
    frame('SceneSection', {
      autoLayout: horizontal({ padX: 80, padY: 48, spacing: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('WinterScene', {
          autoLayout: vertical({ spacing: 0 }), size: { x: 480, y: 360 }, cornerRadius: 4, clipContent: true,
          fills: [gradient([{ hex: '#e8e0d4', position: 0 }, { hex: '#f8f6f0', position: 0.4 }, { hex: '#d4c4a8', position: 0.8 }, { hex: '#a0826d', position: 1 }], 160)],
          children: [
            frame('SnowOverlay', { autoLayout: vertical({ padX: 24, padY: 24, align: 'MAX' }), layoutSizingHorizontal: 'FILL', layoutSizingVertical: 'FILL', children: [
              text('Winter', { fontSize: 13, fontWeight: 300, color: warmGray, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
              text('Snow transforms the village into a fairytale', { fontSize: 15, fontWeight: 300, color: dark }),
            ]}),
          ],
        }),
        frame('SeasonCards', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
          frame('SpringCard', { autoLayout: horizontal({ padX: 20, padY: 16, spacing: 16, counterAlign: 'CENTER' }), fills: [solid(snow)], cornerRadius: 4, layoutSizingHorizontal: 'FILL', children: [
            rectangle('SpringColor', { size: { x: 4, y: 40 }, fills: [solid('#c88ca0')] }),
            frame('SpringText', { autoLayout: vertical({ spacing: 2 }), children: [
              text('Spring', { fontSize: 14, fontWeight: 400, color: dark }),
              text('Cherry blossoms along the river', { fontSize: 12, fontWeight: 300, color: med }),
            ]}),
          ]}),
          frame('SummerCard', { autoLayout: horizontal({ padX: 20, padY: 16, spacing: 16, counterAlign: 'CENTER' }), fills: [solid(snow)], cornerRadius: 4, layoutSizingHorizontal: 'FILL', children: [
            rectangle('SummerColor', { size: { x: 4, y: 40 }, fills: [solid('#6a8a5a')] }),
            frame('SummerText', { autoLayout: vertical({ spacing: 2 }), children: [
              text('Summer', { fontSize: 14, fontWeight: 400, color: dark }),
              text('Lush green mountains and cool breezes', { fontSize: 12, fontWeight: 300, color: med }),
            ]}),
          ]}),
          frame('AutumnCard', { autoLayout: horizontal({ padX: 20, padY: 16, spacing: 16, counterAlign: 'CENTER' }), fills: [solid(snow)], cornerRadius: 4, layoutSizingHorizontal: 'FILL', children: [
            rectangle('AutumnColor', { size: { x: 4, y: 40 }, fills: [solid('#c88040')] }),
            frame('AutumnText', { autoLayout: vertical({ spacing: 2 }), children: [
              text('Autumn', { fontSize: 14, fontWeight: 400, color: dark }),
              text('Crimson and gold foliage reflected in the river', { fontSize: 12, fontWeight: 300, color: med }),
            ]}),
          ]}),
        ]}),
      ],
    }),
    frame('RyokanSection', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('RYOKAN', { fontSize: 11, fontWeight: 400, color: amber, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        text('Historic Inns', { fontSize: 26, fontWeight: 200, color: dark }),
        frame('InnGrid', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
          innCard('Fujiya', 'Redesigned by Kengo Kuma. Hand-blown glass lobby with panoramic windows.', 'Architectural landmark'),
          innCard('Notoya', 'Three-story wooden structure from the Taisho era. Natural cypress baths.', 'Heritage building'),
          innCard('Shiroganeso', 'Riverside location with private outdoor rotenburo. Kaiseki dining.', 'River-facing rooms'),
        ]}),
      ],
    }),
  ],
});
