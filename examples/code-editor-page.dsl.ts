import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const accent = '#22d3ee'; const bg = '#1e1e2e'; const surface = '#181825'; const panel = '#11111b';
const white = '#cdd6f4'; const dim = '#6c7086'; const green = '#a6e3a1'; const red = '#f38ba8';
const yellow = '#f9e2af'; const blue = '#89b4fa'; const mauve = '#cba6f7';

function tabItem(name: string, isActive: boolean) {
  return frame(`Tab: ${name}`, {
    autoLayout: horizontal({ padX: 14, padY: 8 }),
    fills: [solid(isActive ? bg : surface)],
    strokes: isActive ? [{ color: { r: 0.13, g: 0.83, b: 0.93, a: 1 }, weight: 2, align: 'INSIDE' as const }] : [],
    children: [text(name, { fontSize: 12, fontWeight: isActive ? 500 : 400, color: isActive ? white : dim })],
  });
}

function codeLine(lineNum: string, tokens: Array<{ text: string; color: string }>) {
  return frame(`Line: ${lineNum}`, {
    autoLayout: horizontal({ spacing: 0, padX: 8, padY: 0, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(lineNum, { fontSize: 12, fontWeight: 400, color: dim, size: { x: 32 } }),
      frame('Tokens', { autoLayout: horizontal({ spacing: 0 }), children:
        tokens.map((t, i) => text(t.text, { fontSize: 12, fontWeight: 400, color: t.color }))
      }),
    ],
  });
}

function fileItem(name: string, indent: number, isFile: boolean, isActive: boolean) {
  return frame(`File: ${name}`, {
    autoLayout: horizontal({ padX: 8 + indent * 12, padY: 4 }), layoutSizingHorizontal: 'FILL',
    fills: isActive ? [solid(accent, 0.1)] : [],
    children: [
      text(isFile ? name : `${name}/`, { fontSize: 12, fontWeight: isActive ? 500 : 400, color: isActive ? accent : isFile ? white : dim }),
    ],
  });
}

export default frame('CodeEditor', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('TitleBar', {
      autoLayout: horizontal({ padX: 12, padY: 6, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(panel)],
      children: [
        frame('TrafficLights', { autoLayout: horizontal({ spacing: 6 }), children: [
          ellipse('Close', { size: { x: 12, y: 12 }, fills: [solid(red)] }),
          ellipse('Min', { size: { x: 12, y: 12 }, fills: [solid(yellow)] }),
          ellipse('Max', { size: { x: 12, y: 12 }, fills: [solid(green)] }),
        ]}),
        text('CodeVault — app.tsx', { fontSize: 12, fontWeight: 400, color: dim }),
        frame('Spacer', { size: { x: 60, y: 12 }, children: [] }),
      ],
    }),
    frame('EditorBody', {
      autoLayout: horizontal({ spacing: 0 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('FileExplorer', {
          autoLayout: vertical({ spacing: 0, padY: 8 }), size: { x: 220, y: undefined },
          fills: [solid(surface)],
          strokes: [{ color: { r: 0.18, g: 0.18, b: 0.24, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            frame('ExplorerHeader', { autoLayout: horizontal({ padX: 12, padY: 6 }), layoutSizingHorizontal: 'FILL',
              children: [text('EXPLORER', { fontSize: 11, fontWeight: 600, color: dim, letterSpacing: { value: 1, unit: 'PIXELS' as const } })] }),
            fileItem('src', 0, false, false),
            fileItem('components', 1, false, false),
            fileItem('Button.tsx', 2, true, false),
            fileItem('Card.tsx', 2, true, false),
            fileItem('app.tsx', 1, true, true),
            fileItem('index.ts', 1, true, false),
            fileItem('styles', 0, false, false),
            fileItem('package.json', 0, true, false),
            fileItem('tsconfig.json', 0, true, false),
          ],
        }),
        frame('EditorArea', {
          autoLayout: vertical({ spacing: 0 }), layoutSizingHorizontal: 'FILL',
          children: [
            frame('Tabs', { autoLayout: horizontal({ spacing: 0 }), layoutSizingHorizontal: 'FILL', fills: [solid(surface)], children: [
              tabItem('app.tsx', true),
              tabItem('Button.tsx', false),
              tabItem('styles.css', false),
            ]}),
            frame('Code', {
              autoLayout: vertical({ spacing: 2, padX: 0, padY: 12 }), layoutSizingHorizontal: 'FILL', fills: [solid(bg)],
              children: [
                codeLine(' 1', [{ text: 'import ', color: mauve }, { text: '{ useState }', color: white }, { text: ' from ', color: mauve }, { text: "'react'", color: green }]),
                codeLine(' 2', [{ text: 'import ', color: mauve }, { text: '{ Button }', color: white }, { text: ' from ', color: mauve }, { text: "'./components/Button'", color: green }]),
                codeLine(' 3', []),
                codeLine(' 4', [{ text: 'interface ', color: mauve }, { text: 'AppProps ', color: yellow }, { text: '{', color: white }]),
                codeLine(' 5', [{ text: '  title', color: blue }, { text: ': ', color: white }, { text: 'string', color: yellow }]),
                codeLine(' 6', [{ text: '  theme', color: blue }, { text: '?: ', color: white }, { text: "'light'", color: green }, { text: ' | ', color: white }, { text: "'dark'", color: green }]),
                codeLine(' 7', [{ text: '}', color: white }]),
                codeLine(' 8', []),
                codeLine(' 9', [{ text: 'export ', color: mauve }, { text: 'function ', color: mauve }, { text: 'App', color: blue }, { text: '(', color: white }, { text: 'props', color: red }, { text: ': AppProps) {', color: white }]),
                codeLine('10', [{ text: '  const ', color: mauve }, { text: '[count, setCount]', color: white }, { text: ' = ', color: mauve }, { text: 'useState', color: blue }, { text: '(0)', color: white }]),
                codeLine('11', []),
                codeLine('12', [{ text: '  return ', color: mauve }, { text: '(', color: white }]),
                codeLine('13', [{ text: '    <', color: white }, { text: 'div', color: blue }, { text: ' className=', color: white }, { text: '"app"', color: green }, { text: '>', color: white }]),
                codeLine('14', [{ text: '      <', color: white }, { text: 'h1', color: blue }, { text: '>{props.title}</', color: white }, { text: 'h1', color: blue }, { text: '>', color: white }]),
                codeLine('15', [{ text: '      <', color: white }, { text: 'Button ', color: yellow }, { text: 'onClick', color: blue }, { text: '={() => setCount(c => c + 1)}>', color: white }]),
                codeLine('16', [{ text: '        Count: {count}', color: white }]),
                codeLine('17', [{ text: '      </', color: white }, { text: 'Button', color: yellow }, { text: '>', color: white }]),
                codeLine('18', [{ text: '    </', color: white }, { text: 'div', color: blue }, { text: '>', color: white }]),
                codeLine('19', [{ text: '  )', color: white }]),
                codeLine('20', [{ text: '}', color: white }]),
              ],
            }),
          ],
        }),
        frame('Terminal', {
          autoLayout: vertical({ spacing: 0 }), size: { x: 360, y: undefined },
          fills: [solid(panel)],
          strokes: [{ color: { r: 0.18, g: 0.18, b: 0.24, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            frame('TermHeader', { autoLayout: horizontal({ padX: 12, padY: 6, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL',
              fills: [solid(surface)],
              children: [
                text('TERMINAL', { fontSize: 11, fontWeight: 600, color: dim, letterSpacing: { value: 1, unit: 'PIXELS' as const } }),
                text('bash', { fontSize: 11, fontWeight: 400, color: dim }),
              ] }),
            frame('TermContent', { autoLayout: vertical({ spacing: 2, padX: 12, padY: 8 }), layoutSizingHorizontal: 'FILL', children: [
              text('$ npm run dev', { fontSize: 12, fontWeight: 400, color: green }),
              text('  VITE v5.4.0  ready in 234 ms', { fontSize: 12, fontWeight: 400, color: white }),
              text('  > Local:   http://localhost:5173/', { fontSize: 12, fontWeight: 400, color: accent }),
              text('  > Network: http://192.168.1.5:5173/', { fontSize: 12, fontWeight: 400, color: dim }),
              rectangle('BlankLine', { size: { x: 1, y: 14 }, fills: [] }),
              text('$ _', { fontSize: 12, fontWeight: 400, color: green }),
            ]}),
          ],
        }),
      ],
    }),
  ],
});
