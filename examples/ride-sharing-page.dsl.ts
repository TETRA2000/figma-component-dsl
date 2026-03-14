import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const black = '#171717'; const white = '#ffffff'; const bg = '#fafafa'; const dark = '#0a0a0a';
const med = '#737373'; const green = '#16a34a'; const blue = '#2563eb'; const amber = '#d97706';

function rideOption(type: string, desc: string, eta: string, price: string, isSelected: boolean) {
  return frame(`Ride: ${type}`, {
    autoLayout: horizontal({ padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL', fills: [solid(white)], cornerRadius: 10,
    strokes: isSelected ? [{ color: { r: 0.09, g: 0.09, b: 0.09, a: 1 }, weight: 2, align: 'INSIDE' as const }]
      : [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('RideLeft', { autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }), children: [
        rectangle('CarIcon', { size: { x: 48, y: 32 }, fills: [solid(black, 0.08)], cornerRadius: 6 }),
        frame('RideInfo', { autoLayout: vertical({ spacing: 1 }), children: [
          text(type, { fontSize: 15, fontWeight: 600, color: dark }),
          text(desc, { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ]}),
      frame('RideRight', { autoLayout: vertical({ spacing: 1, counterAlign: 'MAX' }), children: [
        text(price, { fontSize: 16, fontWeight: 700, color: dark }),
        text(eta, { fontSize: 12, fontWeight: 400, color: green }),
      ]}),
    ],
  });
}

export default frame('RideSharing', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(black)],
      children: [
        text('GoRide', { fontSize: 22, fontWeight: 700, color: white }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Ride', { fontSize: 14, fontWeight: 600, color: white }),
          text('Delivery', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
          text('Packages', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
        ]}),
      ],
    }),
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 0 }), layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('MapArea', { size: { x: 900, y: 600 },
          fills: [gradient([{ hex: '#d1d5db', position: 0 }, { hex: '#e5e7eb', position: 0.5 }, { hex: '#f3f4f6', position: 1 }], 135)] }),
        frame('BookingPanel', {
          autoLayout: vertical({ spacing: 16, padX: 24, padY: 20 }), layoutSizingHorizontal: 'FILL',
          fills: [solid(white)],
          children: [
            text('Book a Ride', { fontSize: 22, fontWeight: 700, color: dark }),
            frame('LocationInputs', { autoLayout: vertical({ spacing: 0 }), layoutSizingHorizontal: 'FILL', children: [
              frame('Pickup', {
                autoLayout: horizontal({ padX: 14, padY: 12, spacing: 10, counterAlign: 'CENTER' }),
                layoutSizingHorizontal: 'FILL', fills: [solid(bg)], cornerRadius: 10,
                children: [
                  ellipse('PickupDot', { size: { x: 10, y: 10 }, fills: [solid(green)] }),
                  text('123 Market Street, SF', { fontSize: 14, fontWeight: 500, color: dark }),
                ],
              }),
              frame('Connector', { autoLayout: horizontal({ padX: 18 }), children: [
                rectangle('Line', { size: { x: 2, y: 20 }, fills: [solid('#d4d4d4')] }),
              ]}),
              frame('Dropoff', {
                autoLayout: horizontal({ padX: 14, padY: 12, spacing: 10, counterAlign: 'CENTER' }),
                layoutSizingHorizontal: 'FILL', fills: [solid(bg)], cornerRadius: 10,
                children: [
                  ellipse('DropDot', { size: { x: 10, y: 10 }, fills: [solid(blue)] }),
                  text('SFO Airport, Terminal 2', { fontSize: 14, fontWeight: 500, color: dark }),
                ],
              }),
            ]}),
            frame('RideOptions', { autoLayout: vertical({ spacing: 8 }), layoutSizingHorizontal: 'FILL', children: [
              text('Choose a ride', { fontSize: 14, fontWeight: 600, color: dark }),
              rideOption('GoRide X', 'Affordable rides', '3 min', '$24.50', true),
              rideOption('GoRide XL', 'Up to 6 seats', '5 min', '$38.00', false),
              rideOption('GoRide Black', 'Premium sedan', '7 min', '$52.00', false),
              rideOption('GoRide Pool', 'Share your ride', '8 min', '$16.75', false),
            ]}),
            frame('RequestBtn', {
              autoLayout: horizontal({ padX: 0, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(black)], cornerRadius: 10, layoutSizingHorizontal: 'FILL',
              children: [text('Request GoRide X', { fontSize: 15, fontWeight: 600, color: white })],
            }),
          ],
        }),
      ],
    }),
  ],
});
