/**
 * Open Houses — List grouped by date, property thumbnails, RSVP buttons
 * Batch 9, Page 7: Real Estate
 * DSL Features: component(), strokes, section(), helper functions, mixed sizing
 */
import {
  component, frame, rectangle, text, ellipse, section,
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
const lightGreen = '#dcfce7';
const darkGreen = '#166534';
const amber = '#92400e';

export default component('RealEstateOpenHouses', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    /* ---- Header ---- */
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 32, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
      children: [
        frame('TitleArea', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('Upcoming Open Houses', { fontSize: 26, fontWeight: 700, color: dark }),
            text('San Francisco Bay Area', { fontSize: 15, fontWeight: 400, color: gray }),
          ],
        }),
        frame('FilterBtns', {
          autoLayout: horizontal({ spacing: 8 }),
          children: [
            filterBtn('All', true),
            filterBtn('This Weekend', false),
            filterBtn('Houses', false),
            filterBtn('Condos', false),
          ],
        }),
      ],
    }),

    /* ---- Date Group: Saturday ---- */
    dateGroup('Saturday, March 15', [
      {
        address: '742 Evergreen Terrace',
        city: 'San Francisco, CA',
        price: '$895,000',
        beds: '3', baths: '2', sqft: '1,850',
        time: '11:00 AM – 2:00 PM',
        agent: 'Jennifer Martinez',
        rsvps: '12',
      },
      {
        address: '1024 Oak Valley Dr',
        city: 'Palo Alto, CA',
        price: '$1,250,000',
        beds: '4', baths: '3', sqft: '2,400',
        time: '1:00 PM – 4:00 PM',
        agent: 'David Chen',
        rsvps: '8',
      },
      {
        address: '88 Marina Blvd',
        city: 'Sausalito, CA',
        price: '$1,475,000',
        beds: '5', baths: '3.5', sqft: '3,100',
        time: '10:00 AM – 12:00 PM',
        agent: 'Sarah Kim',
        rsvps: '15',
      },
    ]),

    /* ---- Date Group: Sunday ---- */
    dateGroup('Sunday, March 16', [
      {
        address: '315 Sunset Ave',
        city: 'Mill Valley, CA',
        price: '$2,100,000',
        beds: '6', baths: '4', sqft: '4,500',
        time: '12:00 PM – 3:00 PM',
        agent: 'Jennifer Martinez',
        rsvps: '20',
      },
      {
        address: '456 Mission Creek',
        city: 'SoMa, CA',
        price: '$980,000',
        beds: '3', baths: '2.5', sqft: '1,950',
        time: '2:00 PM – 5:00 PM',
        agent: 'David Chen',
        rsvps: '6',
      },
    ]),

    /* ---- Date Group: Next Saturday ---- */
    dateGroup('Saturday, March 22', [
      {
        address: '2200 Pacific Heights',
        city: 'San Francisco, CA',
        price: '$3,250,000',
        beds: '7', baths: '5', sqft: '5,200',
        time: '11:00 AM – 1:00 PM',
        agent: 'Sarah Kim',
        rsvps: '25',
      },
    ]),

    /* ---- Load More ---- */
    frame('LoadMore', {
      autoLayout: horizontal({ padX: 64, padY: 32, align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('LoadMoreBtn', {
          autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 10,
          strokes: [{ color: hex(brown), weight: 2, align: 'INSIDE' }],
          children: [
            text('Load More Open Houses', { fontSize: 15, fontWeight: 600, color: brown }),
          ],
        }),
      ],
    }),
  ],
});

/* ---- helpers ---- */

interface OpenHouseData {
  address: string;
  city: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  time: string;
  agent: string;
  rsvps: string;
}

function dateGroup(date: string, listings: OpenHouseData[]) {
  return frame(`DateGroup: ${date}`, {
    autoLayout: vertical({ spacing: 16, padX: 64, padY: 24 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('DateLabel', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          text(date, { fontSize: 18, fontWeight: 700, color: dark }),
          frame('CountBadge', {
            autoLayout: horizontal({ padX: 10, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(brown)],
            cornerRadius: 999,
            children: [
              text(`${listings.length}`, { fontSize: 12, fontWeight: 600, color: white }),
            ],
          }),
        ],
      }),
      ...listings.map(listing => openHouseCard(listing)),
    ],
  });
}

function openHouseCard(data: OpenHouseData) {
  return frame(`OH: ${data.address}`, {
    autoLayout: horizontal({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 12,
    strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    clipContent: true,
    children: [
      /* Thumbnail */
      rectangle('OHThumb', {
        size: { x: 240, y: 180 },
        fills: [solid('#d6d3d1')],
      }),
      /* Details */
      frame('OHDetails', {
        autoLayout: vertical({ spacing: 8, padX: 24, padY: 20 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(data.price, { fontSize: 22, fontWeight: 700, color: brown }),
              frame('TimeBadge', {
                autoLayout: horizontal({ padX: 12, padY: 6 }),
                fills: [solid(cream)],
                cornerRadius: 6,
                children: [
                  text(data.time, { fontSize: 13, fontWeight: 600, color: amber }),
                ],
              }),
            ],
          }),
          text(data.address, { fontSize: 16, fontWeight: 600, color: dark }),
          text(data.city, { fontSize: 14, fontWeight: 400, color: gray }),
          frame('Stats', {
            autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
            children: [
              text(`${data.beds} beds`, { fontSize: 13, fontWeight: 500, color: gray }),
              text(`${data.baths} baths`, { fontSize: 13, fontWeight: 500, color: gray }),
              text(`${data.sqft} sqft`, { fontSize: 13, fontWeight: 500, color: gray }),
            ],
          }),
          frame('BottomRow', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              frame('AgentInfo', {
                autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
                children: [
                  ellipse('AgentDot', { size: { x: 28, y: 28 }, fills: [solid('#d6d3d1')] }),
                  text(data.agent, { fontSize: 13, fontWeight: 500, color: dark }),
                ],
              }),
              frame('RSVPArea', {
                autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
                children: [
                  text(`${data.rsvps} RSVPs`, { fontSize: 12, fontWeight: 400, color: gray }),
                  frame('RSVPBtn', {
                    autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
                    fills: [solid(green)],
                    cornerRadius: 6,
                    children: [
                      text('RSVP', { fontSize: 13, fontWeight: 600, color: white }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function filterBtn(label: string, active: boolean) {
  return frame(`Filter: ${label}`, {
    autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(active ? brown : white)],
    cornerRadius: 8,
    strokes: active ? [] : [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: active ? white : dark }),
    ],
  });
}
