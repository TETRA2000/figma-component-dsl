/**
 * Floor Plan Viewer — Plan placeholder, room labels sidebar, floor selector tabs
 * Batch 9, Page 2: Real Estate
 * DSL Features: line() for annotations, section(), strokes, mixed sizing
 */
import {
  component, frame, rectangle, text, line,
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
const accent = '#92400e';

export default component('RealEstateFloorPlan', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    /* ---- Header ---- */
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
      children: [
        frame('TitleArea', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('742 Evergreen Terrace', { fontSize: 20, fontWeight: 700, color: dark }),
            text('Floor Plans & Layout', { fontSize: 14, fontWeight: 400, color: gray }),
          ],
        }),
        frame('BackBtn', {
          autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 6,
          strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
          children: [
            text('← Back to Listing', { fontSize: 14, fontWeight: 500, color: dark }),
          ],
        }),
      ],
    }),

    /* ---- Floor Tabs ---- */
    frame('FloorTabs', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      children: [
        floorTab('Ground Floor', true),
        floorTab('First Floor', false),
        floorTab('Second Floor', false),
        floorTab('Basement', false),
      ],
    }),

    /* ---- Main Content ---- */
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        /* Plan Viewer */
        frame('PlanViewer', {
          autoLayout: vertical({ spacing: 24, padX: 48, padY: 48, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            /* Floor plan placeholder with annotation lines */
            frame('PlanArea', {
              size: { x: 800, y: 500 },
              fills: [solid(white)],
              cornerRadius: 12,
              strokes: [{ color: hex(border), weight: 2, align: 'INSIDE' }],
              autoLayout: vertical({ spacing: 0, padX: 40, padY: 40, counterAlign: 'CENTER', align: 'CENTER' }),
              children: [
                text('Floor Plan View', { fontSize: 18, fontWeight: 500, color: '#a8a29e' }),
                text('Ground Floor — 1,200 sqft', { fontSize: 14, fontWeight: 400, color: '#a8a29e' }),
              ],
            }),

            /* Annotation lines */
            frame('Annotations', {
              autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
              children: [
                annotationLine('Living Room', 180),
                annotationLine('Kitchen', 120),
                annotationLine('Dining', 100),
                annotationLine('Garage', 140),
              ],
            }),

            /* Dimensions legend */
            frame('DimLegend', {
              autoLayout: horizontal({ spacing: 32 }),
              children: [
                dimensionItem('Total Area', '1,200 sqft'),
                dimensionItem('Living Room', '18 × 22 ft'),
                dimensionItem('Kitchen', '12 × 14 ft'),
                dimensionItem('Master Bed', '14 × 16 ft'),
              ],
            }),
          ],
        }),

        /* Room Labels Sidebar */
        frame('RoomSidebar', {
          autoLayout: vertical({ spacing: 0, padY: 16 }),
          size: { x: 300, y: undefined },
          fills: [solid(white)],
          strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
          children: [
            frame('SidebarHeader', {
              autoLayout: horizontal({ padX: 20, padY: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Rooms', { fontSize: 16, fontWeight: 700, color: dark }),
              ],
            }),
            rectangle('SidebarDivider', {
              size: { x: 300, y: 1 },
              fills: [solid(border)],
              layoutSizingHorizontal: 'FILL',
            }),
            roomItem('Living Room', '18 × 22 ft', '396 sqft', true),
            roomItem('Kitchen', '12 × 14 ft', '168 sqft', false),
            roomItem('Dining Room', '12 × 12 ft', '144 sqft', false),
            roomItem('Master Bedroom', '14 × 16 ft', '224 sqft', false),
            roomItem('Bedroom 2', '12 × 12 ft', '144 sqft', false),
            roomItem('Bathroom', '8 × 10 ft', '80 sqft', false),
            roomItem('Garage', '20 × 22 ft', '440 sqft', false),
            rectangle('SidebarDivider2', {
              size: { x: 300, y: 1 },
              fills: [solid(border)],
              layoutSizingHorizontal: 'FILL',
            }),
            frame('TotalArea', {
              autoLayout: horizontal({ spacing: 0, padX: 20, padY: 16, align: 'SPACE_BETWEEN' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Total Area', { fontSize: 14, fontWeight: 700, color: dark }),
                text('1,200 sqft', { fontSize: 14, fontWeight: 700, color: brown }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

/* ---- helpers ---- */

function floorTab(label: string, active: boolean) {
  return frame(`Tab: ${label}`, {
    autoLayout: horizontal({ padX: 24, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
    strokes: active
      ? [{ color: hex(brown), weight: 2, align: 'INSIDE' }]
      : [],
    children: [
      text(label, { fontSize: 14, fontWeight: active ? 600 : 400, color: active ? brown : gray }),
    ],
  });
}

function annotationLine(label: string, width: number) {
  return frame(`Annotation: ${label}`, {
    autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
    children: [
      line(`Line: ${label}`, {
        size: { x: width },
        strokes: [{ color: hex(accent), weight: 1, align: 'CENTER' }],
      }),
      text(label, { fontSize: 11, fontWeight: 500, color: accent }),
    ],
  });
}

function dimensionItem(label: string, value: string) {
  return frame(`Dim: ${label}`, {
    autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }),
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: gray }),
      text(value, { fontSize: 14, fontWeight: 600, color: dark }),
    ],
  });
}

function roomItem(name: string, dims: string, area: string, active: boolean) {
  return frame(`Room: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 20, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(active ? cream : white)],
    children: [
      frame('RoomInfo', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(name, { fontSize: 14, fontWeight: active ? 600 : 400, color: dark }),
          text(dims, { fontSize: 12, fontWeight: 400, color: gray }),
        ],
      }),
      text(area, { fontSize: 13, fontWeight: 500, color: active ? brown : gray }),
    ],
  });
}
