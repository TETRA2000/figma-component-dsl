/**
 * Online Auction Page — Item cards with bid prices, countdown timer, bid history table
 * DSL features: gradient item images, large price numbers, table rows, strokes, SPACE_BETWEEN
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function itemCard(title: string, currentBid: string, bids: number, colors: [string, string]) {
  return frame(`Item: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 16, padY: 16 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle(`Image:${title}`, {
        size: { x: 260, y: 180 },
        fills: [gradient([{ hex: colors[0], position: 0 }, { hex: colors[1], position: 1 }], 135)],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
      }),
      text(title, { fontSize: 16, fontWeight: 600, color: '#111827' }),
      frame('BidRow', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(currentBid, { fontSize: 28, fontWeight: 700, color: '#7c3aed' }),
          text(`${bids} bids`, { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
        ],
      }),
      frame('BidBtn', {
        autoLayout: horizontal({ spacing: 0, padX: 32, padY: 10, align: 'CENTER' }),
        fills: [solid('#7c3aed')],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
        children: [text('Place Bid', { fontSize: 14, fontWeight: 600, color: '#ffffff' })],
      }),
    ],
  });
}

function bidHistoryRow(bidder: string, amount: string, time: string) {
  return frame(`Bid:${bidder}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(bidder, { fontSize: 13, fontWeight: 500, color: '#374151', size: { x: 160 } }),
      text(amount, { fontSize: 13, fontWeight: 700, color: '#7c3aed', size: { x: 120 } }),
      text(time, { fontSize: 12, fontWeight: 400, color: '#9ca3af', size: { x: 100 } }),
    ],
  });
}

function countdownBlock(label: string, value: string) {
  return frame(`CD:${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    fills: [solid('#f5f3ff')],
    cornerRadius: 8,
    children: [
      text(value, { fontSize: 32, fontWeight: 700, color: '#7c3aed' }),
      text(label, { fontSize: 11, fontWeight: 500, color: '#6b7280' }),
    ],
  });
}

export default frame('AuctionPage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 32, padX: 48, padY: 40 }),
  fills: [solid('#fafafa')],
  children: [
    text('Live Auctions', { fontSize: 32, fontWeight: 700, color: '#111827' }),
    frame('Countdown', {
      autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('Ends in:', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
        countdownBlock('Hours', '02'),
        countdownBlock('Minutes', '47'),
        countdownBlock('Seconds', '13'),
      ],
    }),
    frame('ItemGrid', {
      autoLayout: horizontal({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        itemCard('Vintage Watch 1965', '$2,450', 18, ['#ddd6fe', '#c4b5fd']),
        itemCard('Abstract Oil Painting', '$1,800', 12, ['#fecaca', '#fde68a']),
        itemCard('Rare First Edition Book', '$980', 7, ['#bfdbfe', '#a5f3fc']),
      ],
    }),
    frame('BidHistory', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      cornerRadius: 12,
      strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('TableHeader', {
          autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12, align: 'SPACE_BETWEEN' }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#f9fafb')],
          children: [
            text('Bidder', { fontSize: 12, fontWeight: 600, color: '#6b7280', size: { x: 160 } }),
            text('Amount', { fontSize: 12, fontWeight: 600, color: '#6b7280', size: { x: 120 } }),
            text('Time', { fontSize: 12, fontWeight: 600, color: '#6b7280', size: { x: 100 } }),
          ],
        }),
        bidHistoryRow('collector_99', '$2,450', '2 min ago'),
        bidHistoryRow('art_lover_42', '$2,300', '8 min ago'),
        bidHistoryRow('vintage_finds', '$2,100', '15 min ago'),
        bidHistoryRow('bidmaster_7', '$1,950', '22 min ago'),
      ],
    }),
  ],
});
