/**
 * Photo Gallery — Hero image, thumbnail grid, image counter, navigation, caption
 * Batch 7, Page 6: Travel photo gallery
 * DSL Features: clipContent, rectangle placeholders, gradient overlays, FILL sizing
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('TravelGallery', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0f172a')],
  children: [
    // Navbar (dark)
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('Wanderly', { fontSize: 22, fontWeight: 700, color: '#ea580c' }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavInfo', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            text('Santorini, Greece', { fontSize: 14, fontWeight: 500, color: '#94a3b8' }),
            frame('CloseBtn', {
              autoLayout: horizontal({ padX: 12, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 6,
              strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.2 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Close', { fontSize: 13, fontWeight: 500, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Hero Image Area
    frame('HeroImageArea', {
      size: { x: 1440, y: 640 },
      autoLayout: horizontal({ spacing: 0, padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
      clipContent: true,
      children: [
        // Left Arrow
        frame('LeftArrow', {
          autoLayout: horizontal({ padX: 16, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          size: { x: 56, y: 56 },
          fills: [solid('#000000', 0.5)],
          cornerRadius: 28,
          children: [
            text('<', { fontSize: 24, fontWeight: 700, color: '#ffffff' }),
          ],
        }),

        // Main Image Placeholder
        frame('MainImage', {
          size: { x: 960, y: 640 },
          fills: [
            solid('#4a7c9e'),
            gradient([
              { hex: '#00000000', position: 0 },
              { hex: '#0f172a66', position: 1 },
            ], 270),
          ],
          clipContent: true,
          autoLayout: vertical({ spacing: 0, padX: 32, padY: 24, align: 'MAX' }),
          children: [
            // Caption overlay
            frame('CaptionOverlay', {
              autoLayout: vertical({ spacing: 4, padX: 16, padY: 12 }),
              fills: [solid('#000000', 0.6)],
              cornerRadius: 10,
              children: [
                text('Blue Domes of Oia at Sunset', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
                text('Taken by Maria G. — October 2025', { fontSize: 13, fontWeight: 400, color: '#ffffffaa' }),
              ],
            }),
          ],
        }),

        // Right Arrow
        frame('RightArrow', {
          autoLayout: horizontal({ padX: 16, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          size: { x: 56, y: 56 },
          fills: [solid('#000000', 0.5)],
          cornerRadius: 28,
          children: [
            text('>', { fontSize: 24, fontWeight: 700, color: '#ffffff' }),
          ],
        }),
      ],
    }),

    // Image Counter & Actions
    frame('CounterBar', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('12 / 248 photos', { fontSize: 14, fontWeight: 500, color: '#94a3b8' }),
        frame('CounterSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('GalleryActions', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            actionButton('Download'),
            actionButton('Share'),
            actionButton('Report'),
          ],
        }),
      ],
    }),

    // Thumbnail Grid
    frame('ThumbnailSection', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('All Photos', { fontSize: 18, fontWeight: 600, color: '#ffffff' }),
        frame('ThumbnailGrid', {
          autoLayout: vertical({ spacing: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('ThumbRow1', {
              autoLayout: horizontal({ spacing: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                thumbnail('#4a7c9e', true),
                thumbnail('#9e7c4a', false),
                thumbnail('#7c9e4a', false),
                thumbnail('#9e4a7c', false),
                thumbnail('#4a9e9e', false),
                thumbnail('#7c4a9e', false),
              ],
            }),
            frame('ThumbRow2', {
              autoLayout: horizontal({ spacing: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                thumbnail('#a0826d', false),
                thumbnail('#6da082', false),
                thumbnail('#826da0', false),
                thumbnail('#a06d82', false),
                thumbnail('#6d826d', false),
                thumbnail('#82a06d', false),
              ],
            }),
            frame('ThumbRow3', {
              autoLayout: horizontal({ spacing: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                thumbnail('#5a8fa5', false),
                thumbnail('#a5845a', false),
                thumbnail('#84a55a', false),
                thumbnail('#a55a84', false),
                thumbnail('#5aa5a5', false),
                thumbnail('#845aa5', false),
              ],
            }),
          ],
        }),
      ],
    }),

    // Caption Area
    frame('CaptionArea', {
      autoLayout: vertical({ spacing: 8, padX: 80, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('About This Photo', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
        text('The iconic blue-domed churches of Oia village, photographed during the golden hour. Santorini is famous for these whitewashed buildings with blue accents, perched on volcanic cliffs overlooking the Aegean Sea.', {
          fontSize: 14, fontWeight: 400, color: '#94a3b8',
          lineHeight: { value: 22, unit: 'PIXELS' },
          size: { x: 800 },
          textAutoResize: 'HEIGHT',
        }),
        frame('PhotoTags', {
          autoLayout: horizontal({ spacing: 8 }),
          children: [
            tagBadge('Sunset'),
            tagBadge('Architecture'),
            tagBadge('Oia'),
            tagBadge('Churches'),
          ],
        }),
      ],
    }),
  ],
});

function actionButton(label: string) {
  return frame(`Action: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
    cornerRadius: 6,
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.2 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: '#94a3b8' }),
    ],
  });
}

function thumbnail(color: string, active: boolean) {
  return frame('Thumb', {
    size: { x: 192, y: 120 },
    fills: [solid(color)],
    cornerRadius: 8,
    clipContent: true,
    strokes: active ? [{ color: { r: 0.92, g: 0.35, b: 0.05, a: 1 }, weight: 3, align: 'INSIDE' }] : [],
  });
}

function tagBadge(label: string) {
  return frame(`Tag: ${label}`, {
    autoLayout: horizontal({ padX: 10, padY: 4 }),
    fills: [solid('#ffffff', 0.1)],
    cornerRadius: 4,
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#94a3b8' }),
    ],
  });
}
