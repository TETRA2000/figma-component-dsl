/**
 * Virtual Tour Page — 360 viewer placeholder, thumbnail strip, room nav sidebar
 * Batch 9, Page 3: Real Estate
 * DSL Features: component(), rectangle placeholders, strokes, mixed sizing
 */
import {
  component, frame, rectangle, text,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

const brown = '#78350f';
const green = '#365314';
const cream = '#f5f0e8';
const white = '#ffffff';
const dark = '#1c1917';
const gray = '#78716c';
const border = '#d6d3d1';
const darkOverlay = '#292524';

export default component('RealEstateVirtualTour', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(dark)],
  children: [
    /* ---- Top Bar ---- */
    frame('TopBar', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(darkOverlay)],
      children: [
        frame('TitleArea', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('← Back', { fontSize: 14, fontWeight: 500, color: '#a8a29e' }),
            rectangle('Sep', { size: { x: 1, y: 20 }, fills: [solid('#57534e')] }),
            text('742 Evergreen Terrace — Virtual Tour', { fontSize: 16, fontWeight: 600, color: white }),
          ],
        }),
        frame('Controls', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            controlBtn('Fullscreen'),
            controlBtn('Share'),
            controlBtn('Photos'),
          ],
        }),
      ],
    }),

    /* ---- Main Area ---- */
    frame('MainArea', {
      autoLayout: horizontal({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        /* 360 Viewer */
        frame('Viewer360', {
          autoLayout: vertical({ spacing: 0, align: 'CENTER', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          size: { x: undefined, y: 640 },
          fills: [solid('#1c1917')],
          children: [
            frame('ViewerPlaceholder', {
              autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER', align: 'CENTER' }),
              size: { x: 400, y: 200 },
              children: [
                text('360°', { fontSize: 48, fontWeight: 700, color: '#57534e' }),
                text('Virtual Tour Viewer', { fontSize: 18, fontWeight: 400, color: '#57534e' }),
                text('Click and drag to look around', { fontSize: 14, fontWeight: 400, color: '#44403c' }),
              ],
            }),
            /* Navigation arrows */
            frame('NavArrows', {
              autoLayout: horizontal({ spacing: 24 }),
              children: [
                frame('ArrowLeft', {
                  autoLayout: horizontal({ padX: 16, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid(white, 0.15)],
                  cornerRadius: 999,
                  children: [
                    text('←', { fontSize: 20, fontWeight: 600, color: white }),
                  ],
                }),
                frame('ArrowRight', {
                  autoLayout: horizontal({ padX: 16, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid(white, 0.15)],
                  cornerRadius: 999,
                  children: [
                    text('→', { fontSize: 20, fontWeight: 600, color: white }),
                  ],
                }),
              ],
            }),
          ],
        }),

        /* Room Nav Sidebar */
        frame('RoomNavSidebar', {
          autoLayout: vertical({ spacing: 0, padY: 0 }),
          size: { x: 280, y: undefined },
          fills: [solid(darkOverlay)],
          children: [
            frame('SidebarTitle', {
              autoLayout: horizontal({ padX: 20, padY: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Rooms', { fontSize: 16, fontWeight: 700, color: white }),
              ],
            }),
            rectangle('NavDivider', {
              size: { x: 280, y: 1 },
              fills: [solid('#44403c')],
              layoutSizingHorizontal: 'FILL',
            }),
            roomNavItem('Living Room', 'Ground Floor', true),
            roomNavItem('Kitchen', 'Ground Floor', false),
            roomNavItem('Dining Room', 'Ground Floor', false),
            roomNavItem('Master Bedroom', 'First Floor', false),
            roomNavItem('Bedroom 2', 'First Floor', false),
            roomNavItem('Bathroom', 'First Floor', false),
            roomNavItem('Backyard', 'Exterior', false),
            roomNavItem('Front Entrance', 'Exterior', false),
          ],
        }),
      ],
    }),

    /* ---- Thumbnail Strip ---- */
    frame('ThumbnailStrip', {
      autoLayout: horizontal({ spacing: 8, padX: 32, padY: 12, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(darkOverlay)],
      children: [
        thumbnail('Living Room', true),
        thumbnail('Kitchen', false),
        thumbnail('Dining', false),
        thumbnail('Master Bed', false),
        thumbnail('Bedroom 2', false),
        thumbnail('Bathroom', false),
        thumbnail('Backyard', false),
        thumbnail('Entrance', false),
      ],
    }),

    /* ---- Info Bar ---- */
    frame('InfoBar', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(darkOverlay)],
      children: [
        frame('PropertyInfo', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
          children: [
            text('$895,000', { fontSize: 20, fontWeight: 700, color: white }),
            text('3 Beds', { fontSize: 14, fontWeight: 400, color: '#a8a29e' }),
            text('2 Baths', { fontSize: 14, fontWeight: 400, color: '#a8a29e' }),
            text('1,850 sqft', { fontSize: 14, fontWeight: 400, color: '#a8a29e' }),
          ],
        }),
        frame('ScheduleBtn', {
          autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(brown)],
          cornerRadius: 8,
          children: [
            text('Schedule Visit', { fontSize: 14, fontWeight: 600, color: white }),
          ],
        }),
      ],
    }),
  ],
});

/* ---- helpers ---- */

function controlBtn(label: string) {
  return frame(`Ctrl: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(white, 0.1)],
    cornerRadius: 6,
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: '#a8a29e' }),
    ],
  });
}

function roomNavItem(name: string, floor: string, active: boolean) {
  return frame(`Nav: ${name}`, {
    autoLayout: horizontal({ spacing: 12, padX: 20, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: active ? [solid(white, 0.08)] : [],
    children: [
      rectangle(`NavThumb: ${name}`, {
        size: { x: 40, y: 30 },
        fills: [solid(active ? '#57534e' : '#44403c')],
        cornerRadius: 4,
      }),
      frame('NavText', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(name, { fontSize: 14, fontWeight: active ? 600 : 400, color: active ? white : '#a8a29e' }),
          text(floor, { fontSize: 11, fontWeight: 400, color: '#78716c' }),
        ],
      }),
    ],
  });
}

function thumbnail(label: string, active: boolean) {
  return frame(`Thumb: ${label}`, {
    autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
    children: [
      rectangle(`ThumbImg: ${label}`, {
        size: { x: 100, y: 64 },
        fills: [solid(active ? '#57534e' : '#44403c')],
        cornerRadius: 6,
      }),
      text(label, { fontSize: 11, fontWeight: 500, color: active ? white : '#78716c' }),
    ],
  });
}
