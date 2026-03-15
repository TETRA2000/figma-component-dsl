/**
 * Neighborhood Guide — Map placeholder, walkability scores, nearby amenities,
 * school ratings
 * Batch 9, Page 6: Real Estate
 * DSL Features: component(), ellipse(), line(), strokes, section(), mixed sizing
 */
import {
  component, frame, rectangle, text, ellipse, line,
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
const blue = '#1e40af';
const lightBlue = '#dbeafe';

export default component('RealEstateNeighborhood', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    /* ---- Header ---- */
    frame('Header', {
      autoLayout: vertical({ spacing: 6, padX: 64, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
      children: [
        text('Neighborhood Guide', { fontSize: 26, fontWeight: 700, color: dark }),
        text('Pacific Heights, San Francisco, CA', { fontSize: 16, fontWeight: 400, color: gray }),
      ],
    }),

    /* ---- Map + Scores ---- */
    frame('MapSection', {
      autoLayout: horizontal({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        /* Map Placeholder */
        frame('MapPlaceholder', {
          autoLayout: vertical({ spacing: 8, align: 'CENTER', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          size: { x: undefined, y: 400 },
          fills: [solid('#e7e5e4')],
          children: [
            text('Interactive Map', { fontSize: 20, fontWeight: 500, color: '#a8a29e' }),
            text('Neighborhood boundaries & points of interest', { fontSize: 14, fontWeight: 400, color: '#a8a29e' }),
          ],
        }),

        /* Walkability Scores Panel */
        frame('ScoresPanel', {
          autoLayout: vertical({ spacing: 0, padY: 0 }),
          size: { x: 360, y: undefined },
          fills: [solid(white)],
          strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
          children: [
            frame('ScoresTitle', {
              autoLayout: horizontal({ padX: 24, padY: 18 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Walkability Scores', { fontSize: 16, fontWeight: 700, color: dark }),
              ],
            }),
            rectangle('ScoreDiv1', { size: { x: 360, y: 1 }, fills: [solid(border)], layoutSizingHorizontal: 'FILL' }),
            scoreRow('Walk Score', '92', 'Walker\'s Paradise', darkGreen),
            scoreRow('Transit Score', '85', 'Excellent Transit', blue),
            scoreRow('Bike Score', '78', 'Very Bikeable', brown),
            scoreRow('Noise Level', 'Low', 'Quiet Area', gray),
            rectangle('ScoreDiv2', { size: { x: 360, y: 1 }, fills: [solid(border)], layoutSizingHorizontal: 'FILL' }),
            frame('MedianInfo', {
              autoLayout: vertical({ spacing: 8, padX: 24, padY: 18 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Median Home Price', { fontSize: 13, fontWeight: 500, color: gray }),
                text('$2,450,000', { fontSize: 24, fontWeight: 700, color: brown }),
                text('+8.2% year over year', { fontSize: 12, fontWeight: 500, color: darkGreen }),
              ],
            }),
          ],
        }),
      ],
    }),

    /* ---- Amenities Grid ---- */
    frame('AmenitiesSection', {
      autoLayout: vertical({ spacing: 24, padX: 64, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Nearby Amenities', { fontSize: 22, fontWeight: 700, color: dark }),
        frame('AmenityGrid', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            amenityCard('Groceries', [
              { name: 'Whole Foods Market', dist: '0.3 mi' },
              { name: 'Trader Joe\'s', dist: '0.5 mi' },
              { name: 'Safeway', dist: '0.8 mi' },
            ]),
            amenityCard('Dining', [
              { name: 'Blue Barn', dist: '0.2 mi' },
              { name: 'Sociale', dist: '0.4 mi' },
              { name: 'Atelier Crenn', dist: '0.6 mi' },
            ]),
            amenityCard('Parks', [
              { name: 'Alta Plaza Park', dist: '0.1 mi' },
              { name: 'Lafayette Park', dist: '0.3 mi' },
              { name: 'Presidio', dist: '0.7 mi' },
            ]),
            amenityCard('Transit', [
              { name: 'Bus Stop — Line 1', dist: '0.1 mi' },
              { name: 'Fillmore Station', dist: '0.4 mi' },
              { name: 'BART Downtown', dist: '1.2 mi' },
            ]),
          ],
        }),
      ],
    }),

    /* ---- School Ratings ---- */
    frame('SchoolsSection', {
      autoLayout: vertical({ spacing: 20, padX: 64, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      children: [
        frame('SchoolsHeader', {
          autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('School Ratings', { fontSize: 22, fontWeight: 700, color: dark }),
            text('GreatSchools ratings', { fontSize: 13, fontWeight: 400, color: gray }),
          ],
        }),
        schoolRow('Pacific Heights Elementary', 'Elementary', '9', 'K–5', '0.3 mi'),
        schoolRow('Marina Middle School', 'Middle', '8', '6–8', '0.6 mi'),
        schoolRow('Galileo Academy', 'High School', '7', '9–12', '1.1 mi'),
        schoolRow('Drew School', 'Private', '10', '9–12', '0.4 mi'),
        schoolRow('Town School for Boys', 'Private', '9', 'K–8', '0.5 mi'),
      ],
    }),

    /* ---- Commute Times ---- */
    frame('CommuteSection', {
      autoLayout: vertical({ spacing: 16, padX: 64, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Commute Times', { fontSize: 22, fontWeight: 700, color: dark }),
        frame('CommuteGrid', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            commuteCard('Downtown SF', '15 min', 'by car'),
            commuteCard('SoMa / FiDi', '20 min', 'by transit'),
            commuteCard('SFO Airport', '25 min', 'by car'),
            commuteCard('Silicon Valley', '40 min', 'by car'),
          ],
        }),
      ],
    }),
  ],
});

/* ---- helpers ---- */

function scoreRow(label: string, score: string, description: string, color: string) {
  return frame(`Score: ${label}`, {
    autoLayout: horizontal({ spacing: 12, padX: 24, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ScoreBadge', {
        autoLayout: horizontal({ padX: 10, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(color)],
        cornerRadius: 6,
        size: { x: 44, y: undefined },
        children: [
          text(score, { fontSize: 16, fontWeight: 700, color: white, textAlignHorizontal: 'CENTER' }),
        ],
      }),
      frame('ScoreText', {
        autoLayout: vertical({ spacing: 1 }),
        children: [
          text(label, { fontSize: 14, fontWeight: 600, color: dark }),
          text(description, { fontSize: 12, fontWeight: 400, color: gray }),
        ],
      }),
    ],
  });
}

function amenityCard(category: string, items: { name: string; dist: string }[]) {
  return frame(`Amenity: ${category}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 12,
    strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      text(category, { fontSize: 16, fontWeight: 600, color: dark }),
      line(`AmenityLine: ${category}`, {
        size: { x: 260 },
        strokes: [{ color: hex(border), weight: 1, align: 'CENTER' }],
        layoutSizingHorizontal: 'FILL',
      }),
      ...items.map(item =>
        frame(`Item: ${item.name}`, {
          autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text(item.name, { fontSize: 13, fontWeight: 400, color: dark }),
            text(item.dist, { fontSize: 13, fontWeight: 500, color: gray }),
          ],
        }),
      ),
    ],
  });
}

function schoolRow(name: string, type: string, rating: string, grades: string, distance: string) {
  return frame(`School: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 20, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(cream)],
    cornerRadius: 10,
    children: [
      frame('SchoolInfo', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          frame('RatingCircle', {
            autoLayout: horizontal({ padX: 10, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
            size: { x: 40, y: 40 },
            fills: [solid(parseInt(rating) >= 8 ? darkGreen : brown)],
            cornerRadius: 20,
            children: [
              text(rating, { fontSize: 16, fontWeight: 700, color: white }),
            ],
          }),
          frame('SchoolText', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, { fontSize: 15, fontWeight: 600, color: dark }),
              text(`${type} · Grades ${grades}`, { fontSize: 12, fontWeight: 400, color: gray }),
            ],
          }),
        ],
      }),
      text(distance, { fontSize: 13, fontWeight: 500, color: gray }),
    ],
  });
}

function commuteCard(destination: string, time: string, method: string) {
  return frame(`Commute: ${destination}`, {
    autoLayout: vertical({ spacing: 6, padX: 20, padY: 20, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 12,
    strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      text(time, { fontSize: 24, fontWeight: 700, color: brown }),
      text(destination, { fontSize: 14, fontWeight: 600, color: dark }),
      text(method, { fontSize: 12, fontWeight: 400, color: gray }),
    ],
  });
}
