import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

import type { FontDeclaration } from '@figma-dsl/core';

// Enable Canvas Mode
export const mode = 'canvas';

// Font declarations
export const fonts: FontDeclaration[] = [];

// --- Colors ---
const WHITE = '#ffffff';
const LIGHT_BG = '#f5f5f5';
const RED = '#cc0c39';
const RED_DARK = '#a30b2e';
const DARK_TEXT = '#232f3e';
const GRAY_TEXT = '#555555';
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
        padX: 40,
        padY: 40,
        align: 'CENTER',
        counterAlign: 'CENTER',
        widthSizing: 'FIXED',
        heightSizing: 'FIXED',
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

        // Amazon smile/arrow accent
        rectangle('SmileArrow', {
          size: { x: 80, y: 4 },
          fills: [solid(ORANGE_AMAZON)],
          cornerRadius: 2,
        }),

        // Main title: 初売り
        text('初売り', {
          fontSize: 120,
          fontWeight: 900,
          fontFamily: 'Noto Sans JP',
          color: RED,
          textAlignHorizontal: 'CENTER',
          textShadow: {
            color: 'rgba(204,12,57,0.15)',
            offsetX: 3,
            offsetY: 3,
            blur: 6,
          },
        }),

        // Badge: 2020年最初のビッグセール
        frame('SaleBadge', {
          autoLayout: horizontal({
            spacing: 0,
            padX: 32,
            padY: 12,
            align: 'CENTER',
            counterAlign: 'CENTER',
          }),
          fills: [solid(WHITE)],
          cornerRadius: 8,
          strokes: [{ color: { r: 0.8, g: 0.05, b: 0.22, a: 1 }, weight: 2, align: 'INSIDE' as const }],
          effects: [{
            type: 'DROP_SHADOW' as const,
            color: { r: 0, g: 0, b: 0, a: 0.08 },
            offsetX: 0,
            offsetY: 2,
            blur: 8,
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

        // Date: 1/3 [金] 9:00スタート
        frame('DateRow', {
          autoLayout: horizontal({
            spacing: 8,
            counterAlign: 'CENTER',
            align: 'CENTER',
          }),
          children: [
            text('1/3 [金] 9:00スタート', {
              fontSize: 32,
              fontWeight: 700,
              fontFamily: 'Noto Sans JP',
              color: DARK_TEXT,
              textAlignHorizontal: 'CENTER',
            }),
          ],
        }),

      ],
    }),

    // ====== Bottom Section (red background with product showcase) ======
    frame('BottomSection', {
      size: { x: 860, y: 340 },
      autoLayout: vertical({
        spacing: 0,
        widthSizing: 'FIXED',
        heightSizing: 'FIXED',
      }),
      fills: [
        gradient([
          { hex: RED, position: 0 },
          { hex: RED_DARK, position: 1 },
        ], 180),
      ],
      clipContent: true,
      children: [

        // Product showcase area (abstract representation)
        frame('ProductShowcase', {
          size: { x: 860, y: 340 },
          autoLayout: horizontal({
            spacing: 20,
            padX: 40,
            padY: 30,
            align: 'CENTER',
            counterAlign: 'CENTER',
            widthSizing: 'FIXED',
            heightSizing: 'FIXED',
          }),
          children: [

            // Left product group (gift bags, decorations)
            frame('LeftProducts', {
              autoLayout: vertical({
                spacing: 8,
                align: 'CENTER',
                counterAlign: 'CENTER',
              }),
              children: [
                rectangle('GiftBag1', {
                  size: { x: 100, y: 120 },
                  fills: [solid('#d4a017', 0.9)],
                  cornerRadius: 4,
                }),
                rectangle('GiftBox1', {
                  size: { x: 80, y: 60 },
                  fills: [solid('#c62828', 0.8)],
                  cornerRadius: 4,
                  strokes: [{ color: { r: 1, g: 0.84, b: 0, a: 0.6 }, weight: 2, align: 'INSIDE' as const }],
                }),
              ],
            }),

            // Center product (monitor/TV)
            frame('CenterProduct', {
              autoLayout: vertical({
                spacing: 8,
                align: 'CENTER',
                counterAlign: 'CENTER',
              }),
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

            // Right products (smart devices, figurines)
            frame('RightProducts', {
              autoLayout: vertical({
                spacing: 8,
                align: 'CENTER',
                counterAlign: 'CENTER',
              }),
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
    }),

  ],
});
