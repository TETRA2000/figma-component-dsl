/**
 * Property Listing Grid — Filter bar, property cards with price, beds/baths/sqft, address
 * Batch 9, Page 1: Real Estate
 * DSL Features: component(), helper functions, strokes, mixed sizing
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
const lightBg = '#fafaf9';

export default component('RealEstateListingGrid', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    /* ---- Navbar ---- */
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
      children: [
        text('HomeQuest', { fontSize: 22, fontWeight: 700, color: brown }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
          children: [
            text('Buy', { fontSize: 14, fontWeight: 500, color: dark }),
            text('Rent', { fontSize: 14, fontWeight: 500, color: gray }),
            text('Sell', { fontSize: 14, fontWeight: 500, color: gray }),
            text('Agents', { fontSize: 14, fontWeight: 500, color: gray }),
          ],
        }),
        frame('SignInBtn', {
          autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(brown)],
          cornerRadius: 8,
          children: [
            text('Sign In', { fontSize: 14, fontWeight: 600, color: white }),
          ],
        }),
      ],
    }),

    /* ---- Filter Bar ---- */
    frame('FilterBar', {
      autoLayout: horizontal({ spacing: 16, padX: 64, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
      children: [
        filterChip('Location', 'San Francisco, CA'),
        filterChip('Price', '$500K – $1.5M'),
        filterChip('Beds', '2+'),
        filterChip('Baths', '2+'),
        filterChip('Type', 'House'),
        frame('FilterSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('SearchBtn', {
          autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(green)],
          cornerRadius: 8,
          children: [
            text('Search', { fontSize: 14, fontWeight: 600, color: white }),
          ],
        }),
      ],
    }),

    /* ---- Results Header ---- */
    frame('ResultsHeader', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('248 Properties Found', { fontSize: 18, fontWeight: 600, color: dark }),
        frame('SortRow', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            text('Sort by:', { fontSize: 14, fontWeight: 400, color: gray }),
            text('Price: Low to High', { fontSize: 14, fontWeight: 600, color: dark }),
          ],
        }),
      ],
    }),

    /* ---- Property Grid ---- */
    frame('PropertyGrid', {
      autoLayout: vertical({ spacing: 24, padX: 64, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Row1', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            propertyCard('742 Evergreen Terrace', '$895,000', '3', '2', '1,850', 'San Francisco, CA'),
            propertyCard('1024 Oak Valley Dr', '$1,250,000', '4', '3', '2,400', 'San Francisco, CA'),
            propertyCard('88 Marina Blvd', '$1,475,000', '5', '3.5', '3,100', 'San Francisco, CA'),
          ],
        }),
        frame('Row2', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            propertyCard('315 Sunset Ave', '$725,000', '2', '2', '1,200', 'San Francisco, CA'),
            propertyCard('2200 Pacific Heights', '$2,100,000', '6', '4', '4,500', 'Pacific Heights, CA'),
            propertyCard('456 Mission Creek', '$980,000', '3', '2.5', '1,950', 'SoMa, CA'),
          ],
        }),
      ],
    }),

    /* ---- Pagination ---- */
    frame('Pagination', {
      autoLayout: horizontal({ spacing: 8, padX: 64, padY: 24, align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        pageBtn('←', false),
        pageBtn('1', true),
        pageBtn('2', false),
        pageBtn('3', false),
        pageBtn('...', false),
        pageBtn('25', false),
        pageBtn('→', false),
      ],
    }),
  ],
});

/* ---- helpers ---- */

function filterChip(label: string, value: string) {
  return frame(`Filter: ${label}`, {
    autoLayout: vertical({ spacing: 2 }),
    children: [
      text(label, { fontSize: 11, fontWeight: 500, color: gray }),
      text(value, { fontSize: 14, fontWeight: 600, color: dark }),
    ],
  });
}

function propertyCard(address: string, price: string, beds: string, baths: string, sqft: string, city: string) {
  return frame(`Property: ${address}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 12,
    strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    clipContent: true,
    children: [
      /* Image placeholder */
      rectangle('Photo', {
        size: { x: 400, y: 200 },
        fills: [solid('#d6d3d1')],
      }),
      frame('CardBody', {
        autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(price, { fontSize: 22, fontWeight: 700, color: brown }),
          frame('Stats', {
            autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
            children: [
              statItem(beds, 'beds'),
              statItem(baths, 'baths'),
              statItem(sqft, 'sqft'),
            ],
          }),
          text(address, { fontSize: 14, fontWeight: 600, color: dark }),
          text(city, { fontSize: 13, fontWeight: 400, color: gray }),
        ],
      }),
    ],
  });
}

function statItem(value: string, label: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
    children: [
      text(value, { fontSize: 14, fontWeight: 700, color: dark }),
      text(label, { fontSize: 13, fontWeight: 400, color: gray }),
    ],
  });
}

function pageBtn(label: string, active: boolean) {
  return frame(`Page: ${label}`, {
    autoLayout: horizontal({ padX: 12, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(active ? brown : white)],
    cornerRadius: 6,
    strokes: active ? [] : [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 14, fontWeight: 500, color: active ? white : dark }),
    ],
  });
}
