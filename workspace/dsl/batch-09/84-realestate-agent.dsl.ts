/**
 * Agent Profile — Ellipse photo, credentials, stats, recent sales list, contact CTA
 * Batch 9, Page 4: Real Estate
 * DSL Features: ellipse(), strokes, section(), statBlock pattern, mixed sizing
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
const gold = '#b45309';

export default component('RealEstateAgentProfile', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    /* ---- Banner ---- */
    frame('Banner', {
      size: { x: 1440, y: 180 },
      fills: [solid(brown)],
      autoLayout: vertical({ spacing: 0, widthSizing: 'FIXED', heightSizing: 'FIXED' }),
      layoutSizingHorizontal: 'FILL',
    }),

    /* ---- Profile Section ---- */
    frame('ProfileSection', {
      autoLayout: horizontal({ spacing: 40, padX: 64, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        /* Left: Avatar + Contact Card */
        frame('LeftCol', {
          autoLayout: vertical({ spacing: 20, counterAlign: 'CENTER' }),
          size: { x: 300, y: undefined },
          children: [
            ellipse('AgentPhoto', {
              size: { x: 160, y: 160 },
              fills: [solid('#d6d3d1')],
              strokes: [{ color: hex(white), weight: 4, align: 'OUTSIDE' }],
            }),
            text('Jennifer Martinez', { fontSize: 24, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
            text('Senior Real Estate Agent', { fontSize: 15, fontWeight: 500, color: brown, textAlignHorizontal: 'CENTER' }),

            /* Credentials Card */
            frame('CredentialsCard', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 12,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Credentials', { fontSize: 16, fontWeight: 600, color: dark }),
                credentialRow('License', 'CA DRE #01234567'),
                credentialRow('Experience', '15 years'),
                credentialRow('Speciality', 'Luxury Homes'),
                credentialRow('Languages', 'English, Spanish'),
                credentialRow('Certifications', 'CRS, ABR, SRS'),
              ],
            }),

            /* Contact CTA */
            frame('ContactCTA', {
              autoLayout: vertical({ spacing: 10 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('CallBtn', {
                  autoLayout: horizontal({ padX: 24, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid(brown)],
                  cornerRadius: 10,
                  children: [
                    text('Call (415) 555-0123', { fontSize: 15, fontWeight: 600, color: white }),
                  ],
                }),
                frame('EmailBtn', {
                  autoLayout: horizontal({ padX: 24, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid(white)],
                  cornerRadius: 10,
                  strokes: [{ color: hex(brown), weight: 2, align: 'INSIDE' }],
                  children: [
                    text('Send Email', { fontSize: 15, fontWeight: 600, color: brown }),
                  ],
                }),
              ],
            }),
          ],
        }),

        /* Right: Stats, About, Sales */
        frame('RightCol', {
          autoLayout: vertical({ spacing: 32, padY: 32 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            /* Stats Row */
            section('StatsSection', {
              fills: [solid(white)],
              children: [
                frame('StatsRow', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid(white)],
                  cornerRadius: 12,
                  strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
                  children: [
                    statBlock('$85M+', 'Total Sales Volume'),
                    statBlock('340+', 'Homes Sold'),
                    statBlock('4.9', 'Client Rating'),
                    statBlock('12', 'Avg Days on Market'),
                  ],
                }),
              ],
            }),

            /* About */
            frame('About', {
              autoLayout: vertical({ spacing: 10 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('About Jennifer', { fontSize: 20, fontWeight: 700, color: dark }),
                text(
                  'Jennifer Martinez is a top-producing real estate agent serving the San Francisco Bay Area. With 15 years of experience in luxury residential properties, she has built a reputation for her deep market knowledge, expert negotiation skills, and unwavering commitment to her clients.',
                  {
                    fontSize: 15, fontWeight: 400, color: gray,
                    lineHeight: { value: 24, unit: 'PIXELS' },
                    size: { x: 700 },
                    textAutoResize: 'HEIGHT',
                  },
                ),
              ],
            }),

            /* Recent Sales */
            frame('RecentSales', {
              autoLayout: vertical({ spacing: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Recent Sales', { fontSize: 20, fontWeight: 700, color: dark }),
                saleItem('742 Evergreen Terrace', '$895,000', 'San Francisco, CA', '8 days on market'),
                saleItem('1024 Oak Valley Dr', '$1,250,000', 'Palo Alto, CA', '5 days on market'),
                saleItem('88 Marina Blvd', '$1,475,000', 'Sausalito, CA', '12 days on market'),
                saleItem('315 Sunset Ave', '$2,100,000', 'Mill Valley, CA', '3 days on market'),
                saleItem('2200 Pacific Heights', '$3,250,000', 'San Francisco, CA', '15 days on market'),
              ],
            }),

            /* Testimonials */
            frame('Testimonials', {
              autoLayout: vertical({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Client Testimonials', { fontSize: 20, fontWeight: 700, color: dark }),
                testimonialCard('Robert & Linda Chen', '"Jennifer made our home buying experience seamless. Her expertise in the Bay Area market is unmatched."'),
                testimonialCard('Michael Torres', '"We sold our home in just 5 days above asking price thanks to Jennifer\'s marketing strategy."'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

/* ---- helpers ---- */

function credentialRow(label: string, value: string) {
  return frame(`Cred: ${label}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: gray }),
      text(value, { fontSize: 13, fontWeight: 600, color: dark }),
    ],
  });
}

function statBlock(value: string, label: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 28, padY: 24, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(value, { fontSize: 28, fontWeight: 700, color: brown }),
      text(label, { fontSize: 13, fontWeight: 400, color: gray, textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function saleItem(address: string, price: string, city: string, days: string) {
  return frame(`Sale: ${address}`, {
    autoLayout: horizontal({ spacing: 0, padX: 20, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 10,
    strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      frame('SaleInfo', {
        autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
        children: [
          rectangle('SaleThumb', {
            size: { x: 64, y: 48 },
            fills: [solid('#d6d3d1')],
            cornerRadius: 6,
          }),
          frame('SaleText', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(address, { fontSize: 15, fontWeight: 600, color: dark }),
              text(city, { fontSize: 13, fontWeight: 400, color: gray }),
            ],
          }),
        ],
      }),
      frame('SaleRight', {
        autoLayout: vertical({ spacing: 2, counterAlign: 'MAX' }),
        children: [
          text(price, { fontSize: 16, fontWeight: 700, color: brown }),
          text(days, { fontSize: 12, fontWeight: 400, color: gray }),
        ],
      }),
    ],
  });
}

function testimonialCard(author: string, quote: string) {
  return frame(`Testimonial: ${author}`, {
    autoLayout: vertical({ spacing: 10, padX: 20, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 10,
    strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      text(quote, {
        fontSize: 14, fontWeight: 400, color: gray,
        lineHeight: { value: 22, unit: 'PIXELS' },
        size: { x: 650 },
        textAutoResize: 'HEIGHT',
      }),
      text(`— ${author}`, { fontSize: 13, fontWeight: 600, color: dark }),
    ],
  });
}
