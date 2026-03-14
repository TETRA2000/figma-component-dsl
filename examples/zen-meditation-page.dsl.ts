import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Mindfulness app — Pure white, single accent, extreme minimalism, breathing space
const white = '#ffffff'; const dark = '#1a1a1a'; const accent = '#4a90a0'; const med = '#888888';
const bg = '#fafafa'; const lightAccent = '#d0e8f0';

export default frame('ZenMeditation', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(white)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 120, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('stillness', { fontSize: 18, fontWeight: 200, color: dark }),
        text('Begin', { fontSize: 12, fontWeight: 400, color: accent }),
      ],
    }),
    frame('MainSection', {
      autoLayout: vertical({ spacing: 40, padX: 120, padY: 120, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        ellipse('BreathCircle', { size: { x: 200, y: 200 },
          fills: [gradient([{ hex: '#d0e8f0', position: 0 }, { hex: '#4a90a0', position: 1 }], 135)],
          opacity: 0.3 }),
        text('Breathe', { fontSize: 48, fontWeight: 200, color: dark }),
        text('Find your center', { fontSize: 16, fontWeight: 300, color: med }),
      ],
    }),
    frame('SessionsSection', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 60 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Guided Sessions', { fontSize: 18, fontWeight: 200, color: dark }),
        frame('SessionList', { autoLayout: vertical({ spacing: 10 }), layoutSizingHorizontal: 'FILL', children: [
          frame('Session1', { autoLayout: horizontal({ spacing: 16, padX: 24, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL', fills: [solid(bg)], cornerRadius: 8, children: [
            frame('S1Left', { autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }), children: [
              ellipse('S1Icon', { size: { x: 36, y: 36 }, fills: [solid(accent, 0.1)] }),
              frame('S1Text', { autoLayout: vertical({ spacing: 2 }), children: [
                text('Morning Calm', { fontSize: 15, fontWeight: 400, color: dark }),
                text('10 minutes', { fontSize: 12, fontWeight: 300, color: med }),
              ]}),
            ]}),
            text('Begin', { fontSize: 12, fontWeight: 400, color: accent }),
          ]}),
          frame('Session2', { autoLayout: horizontal({ spacing: 16, padX: 24, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL', fills: [solid(bg)], cornerRadius: 8, children: [
            frame('S2Left', { autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }), children: [
              ellipse('S2Icon', { size: { x: 36, y: 36 }, fills: [solid(accent, 0.1)] }),
              frame('S2Text', { autoLayout: vertical({ spacing: 2 }), children: [
                text('Deep Focus', { fontSize: 15, fontWeight: 400, color: dark }),
                text('20 minutes', { fontSize: 12, fontWeight: 300, color: med }),
              ]}),
            ]}),
            text('Begin', { fontSize: 12, fontWeight: 400, color: accent }),
          ]}),
          frame('Session3', { autoLayout: horizontal({ spacing: 16, padX: 24, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL', fills: [solid(bg)], cornerRadius: 8, children: [
            frame('S3Left', { autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }), children: [
              ellipse('S3Icon', { size: { x: 36, y: 36 }, fills: [solid(accent, 0.1)] }),
              frame('S3Text', { autoLayout: vertical({ spacing: 2 }), children: [
                text('Evening Wind Down', { fontSize: 15, fontWeight: 400, color: dark }),
                text('15 minutes', { fontSize: 12, fontWeight: 300, color: med }),
              ]}),
            ]}),
            text('Begin', { fontSize: 12, fontWeight: 400, color: accent }),
          ]}),
        ]}),
      ],
    }),
  ],
});
