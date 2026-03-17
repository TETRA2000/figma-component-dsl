# Banner Mode Example: Amazon 初売り (New Year Sale)

A sale campaign banner recreating a real Amazon Japan ad. Demonstrates structured auto-layout sections, badges with strokes and shadows, large Japanese typography, color palette organization, and a product showcase area.

## Key Patterns Demonstrated

1. **Vertical section stacking**: Root frame uses `vertical()` autoLayout to stack a light top section and a red bottom section
2. **Noto Sans JP on all text**: Every text node sets `fontFamily: 'Noto Sans JP'`
3. **Large headline**: "初売り" at 120px with subtle text shadow
4. **Badge with stroke + shadow**: White rounded frame with red border stroke and drop shadow
5. **Color palette as constants**: All colors defined at the top
6. **Product showcase placeholders**: Rectangles representing product images (DSL can't embed photos)
7. **Decorative accent**: Orange line representing the Amazon smile arrow

## Source: `examples/amazon-hatsuuri-banner.dsl.ts`

```ts
import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

import type { FontDeclaration } from '@figma-dsl/core';

// Enable Banner Mode
export const mode = 'banner';

// Font declarations
export const fonts: FontDeclaration[] = [];

// --- Colors ---
const WHITE = '#ffffff';
const LIGHT_BG = '#f5f5f5';
const RED = '#cc0c39';
const RED_DARK = '#a30b2e';
const DARK_TEXT = '#232f3e';
const ORANGE_AMAZON = '#ff9900';

// --- Root Banner ---
export default frame('AmazonHatsuuriBanner', {
  size: { x: 860, y: 860 },
  clipContent: true,
  autoLayout: vertical({ spacing: 0 }),
  children: [

    // ====== Top Section (light gray background) ======
    frame('TopSection', {
      size: { x: 860, y: 520 },
      autoLayout: vertical({
        spacing: 12,
        padX: 40, padY: 40,
        align: 'CENTER', counterAlign: 'CENTER',
        widthSizing: 'FIXED', heightSizing: 'FIXED',
      }),
      fills: [solid(LIGHT_BG)],
      children: [

        // Amazon logo text
        text('amazon', {
          fontSize: 42,
          fontWeight: 700,
          fontFamily: 'Noto Sans JP',
          color: DARK_TEXT,
          textAlignHorizontal: 'CENTER',
          letterSpacing: { value: -2, unit: 'PERCENT' },
        }),

        // Amazon smile/arrow accent line
        rectangle('SmileArrow', {
          size: { x: 80, y: 4 },
          fills: [solid(ORANGE_AMAZON)],
          cornerRadius: 2,
        }),

        // Main title: 初売り (120px, largest text)
        text('初売り', {
          fontSize: 120,
          fontWeight: 900,
          fontFamily: 'Noto Sans JP',
          color: RED,
          textAlignHorizontal: 'CENTER',
          textShadow: {
            color: 'rgba(204,12,57,0.15)',
            offsetX: 3, offsetY: 3, blur: 6,
          },
        }),

        // Badge with border stroke and drop shadow
        frame('SaleBadge', {
          autoLayout: horizontal({
            spacing: 0, padX: 32, padY: 12,
            align: 'CENTER', counterAlign: 'CENTER',
          }),
          fills: [solid(WHITE)],
          cornerRadius: 8,
          strokes: [{ color: { r: 0.8, g: 0.05, b: 0.22, a: 1 }, weight: 2, align: 'INSIDE' as const }],
          effects: [{
            type: 'DROP_SHADOW' as const,
            color: { r: 0, g: 0, b: 0, a: 0.08 },
            offsetX: 0, offsetY: 2, blur: 8,
          }],
          children: [
            text('2020年最初のビッグセール', {
              fontSize: 28,
              fontWeight: 700,
              fontFamily: 'Noto Sans JP',
              color: RED,
              textAlignHorizontal: 'CENTER',
            }),
          ],
        }),

        // Date line
        text('1/3 [金] 9:00スタート', {
          fontSize: 32,
          fontWeight: 700,
          fontFamily: 'Noto Sans JP',
          color: DARK_TEXT,
          textAlignHorizontal: 'CENTER',
        }),

      ],
    }),

    // ====== Bottom Section (red gradient, product showcase) ======
    frame('BottomSection', {
      size: { x: 860, y: 340 },
      autoLayout: horizontal({
        spacing: 20,
        padX: 40, padY: 30,
        align: 'CENTER', counterAlign: 'CENTER',
        widthSizing: 'FIXED', heightSizing: 'FIXED',
      }),
      fills: [
        gradient([
          { hex: RED, position: 0 },
          { hex: RED_DARK, position: 1 },
        ], 180),
      ],
      clipContent: true,
      children: [

        // Product placeholders (rectangles since DSL can't embed photos)
        frame('LeftProducts', {
          autoLayout: vertical({ spacing: 8, align: 'CENTER', counterAlign: 'CENTER' }),
          children: [
            rectangle('GiftBag', {
              size: { x: 100, y: 120 },
              fills: [solid('#d4a017', 0.9)],
              cornerRadius: 4,
            }),
            rectangle('GiftBox', {
              size: { x: 80, y: 60 },
              fills: [solid('#c62828', 0.8)],
              cornerRadius: 4,
              strokes: [{ color: { r: 1, g: 0.84, b: 0, a: 0.6 }, weight: 2, align: 'INSIDE' as const }],
            }),
          ],
        }),

        frame('CenterProduct', {
          autoLayout: vertical({ spacing: 8, align: 'CENTER', counterAlign: 'CENTER' }),
          children: [
            rectangle('MonitorScreen', {
              size: { x: 200, y: 140 },
              fills: [solid('#1a237e')],
              cornerRadius: 4,
              strokes: [{ color: { r: 0.2, g: 0.2, b: 0.2, a: 1 }, weight: 4, align: 'OUTSIDE' as const }],
            }),
            rectangle('MonitorStand', {
              size: { x: 60, y: 20 },
              fills: [solid('#333333')],
              cornerRadius: 2,
            }),
          ],
        }),

        frame('RightProducts', {
          autoLayout: vertical({ spacing: 8, align: 'CENTER', counterAlign: 'CENTER' }),
          children: [
            rectangle('SmartDevice', {
              size: { x: 80, y: 100 },
              fills: [solid('#e0e0e0')],
              cornerRadius: 8,
            }),
            rectangle('Figurine', {
              size: { x: 100, y: 120 },
              fills: [solid('#d4a017', 0.7)],
              cornerRadius: 4,
            }),
          ],
        }),

      ],
    }),

  ],
});
```

## Design Patterns to Reuse

### Two-Section Layout
Stack a light informational section on top and a colored product/visual section below using `vertical({ spacing: 0 })` on the root frame.

### Badge with Stroke + Shadow
A frame with `fills`, `strokes`, `cornerRadius`, and `effects` (DROP_SHADOW) creates a floating badge/label effect.

### Large Japanese Headline
Use 80-120px `fontSize` with `fontWeight: 900` for impactful Japanese headlines. Add a subtle `textShadow` with low opacity for depth.

### Color Palette Constants
Define all colors at the top of the file for easy theming and consistency.

### Product Placeholders
Use colored rectangles with `cornerRadius` and `strokes` to represent product images that the DSL can't embed directly.
