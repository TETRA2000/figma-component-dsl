/**
 * Hotel Detail — Image gallery, hotel info, amenities, room types, booking
 * Batch 7, Page 2: Hotel detail view
 * DSL Features: clipContent, rectangle placeholders, nested layouts, FILL sizing
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('TravelHotel', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('Wanderly', { fontSize: 22, fontWeight: 700, color: '#ea580c' }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
          children: [
            text('Explore', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Flights', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Hotels', { fontSize: 14, fontWeight: 500, color: '#0369a1' }),
            text('Deals', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
          ],
        }),
      ],
    }),

    // Image Gallery Placeholder
    frame('ImageGallery', {
      autoLayout: horizontal({ spacing: 8, padX: 80, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      clipContent: true,
      children: [
        rectangle('MainPhoto', {
          size: { x: 640, y: 400 },
          fills: [solid('#c4a882')],
          cornerRadius: 12,
        }),
        frame('SidePhotos', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            frame('SideRow1', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                rectangle('Photo2', { size: { x: 196, y: 196 }, fills: [solid('#b8ccd8')], cornerRadius: 12 }),
                rectangle('Photo3', { size: { x: 196, y: 196 }, fills: [solid('#d4bfa0')], cornerRadius: 12 }),
              ],
            }),
            frame('SideRow2', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                rectangle('Photo4', { size: { x: 196, y: 196 }, fills: [solid('#a8b8a0')], cornerRadius: 12 }),
                frame('MorePhotos', {
                  size: { x: 196, y: 196 },
                  fills: [solid('#8899aa')],
                  cornerRadius: 12,
                  autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
                  children: [
                    text('+12 Photos', { fontSize: 18, fontWeight: 600, color: '#ffffff' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Hotel Info + Booking
    frame('ContentArea', {
      autoLayout: horizontal({ spacing: 48, padX: 80, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Hotel Details
        frame('HotelDetails', {
          autoLayout: vertical({ spacing: 28 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Name & Rating
            frame('HotelHeader', {
              autoLayout: vertical({ spacing: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('NameRow', {
                  autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
                  children: [
                    text('The Grand Meridian Resort & Spa', { fontSize: 28, fontWeight: 700, color: '#1e293b' }),
                  ],
                }),
                frame('RatingRow', {
                  autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
                  children: [
                    text('★ ★ ★ ★ ★', { fontSize: 16, fontWeight: 400, color: '#f59e0b' }),
                    text('4.8', { fontSize: 16, fontWeight: 700, color: '#1e293b' }),
                    text('(2,847 reviews)', { fontSize: 14, fontWeight: 400, color: '#64748b' }),
                  ],
                }),
                text('123 Oceanview Drive, Malibu, California', {
                  fontSize: 14, fontWeight: 400, color: '#64748b',
                }),
              ],
            }),

            // Amenities
            frame('Amenities', {
              autoLayout: vertical({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Amenities', { fontSize: 18, fontWeight: 600, color: '#1e293b' }),
                frame('AmenitiesRow', {
                  autoLayout: horizontal({ spacing: 16 }),
                  children: [
                    amenityBadge('Pool'),
                    amenityBadge('Spa'),
                    amenityBadge('WiFi'),
                    amenityBadge('Gym'),
                    amenityBadge('Restaurant'),
                    amenityBadge('Bar'),
                    amenityBadge('Parking'),
                  ],
                }),
              ],
            }),

            // Room Types
            frame('RoomTypes', {
              autoLayout: vertical({ spacing: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Room Types', { fontSize: 18, fontWeight: 600, color: '#1e293b' }),
                roomTypeCard('Deluxe Ocean View', '45 sqm', '$320', true),
                roomTypeCard('Premium Suite', '72 sqm', '$520', false),
                roomTypeCard('Presidential Suite', '120 sqm', '$980', false),
              ],
            }),
          ],
        }),

        // Right: Booking Card
        frame('BookingCard', {
          autoLayout: vertical({ spacing: 20, padX: 28, padY: 28 }),
          size: { x: 360, y: undefined },
          fills: [solid('#ffffff')],
          cornerRadius: 16,
          strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            frame('PriceRow', {
              autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }),
              children: [
                text('$320', { fontSize: 32, fontWeight: 700, color: '#1e293b' }),
                text('/ night', { fontSize: 16, fontWeight: 400, color: '#64748b' }),
              ],
            }),
            frame('CheckIn', {
              autoLayout: vertical({ spacing: 4, padX: 16, padY: 12 }),
              layoutSizingHorizontal: 'FILL',
              cornerRadius: 8,
              strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('CHECK-IN', { fontSize: 11, fontWeight: 600, color: '#94a3b8' }),
                text('Mar 20, 2026', { fontSize: 15, fontWeight: 500, color: '#1e293b' }),
              ],
            }),
            frame('CheckOut', {
              autoLayout: vertical({ spacing: 4, padX: 16, padY: 12 }),
              layoutSizingHorizontal: 'FILL',
              cornerRadius: 8,
              strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('CHECK-OUT', { fontSize: 11, fontWeight: 600, color: '#94a3b8' }),
                text('Mar 25, 2026', { fontSize: 15, fontWeight: 500, color: '#1e293b' }),
              ],
            }),
            frame('Guests', {
              autoLayout: vertical({ spacing: 4, padX: 16, padY: 12 }),
              layoutSizingHorizontal: 'FILL',
              cornerRadius: 8,
              strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('GUESTS', { fontSize: 11, fontWeight: 600, color: '#94a3b8' }),
                text('2 Adults, 1 Child', { fontSize: 15, fontWeight: 500, color: '#1e293b' }),
              ],
            }),
            rectangle('Divider', {
              size: { x: 1, y: 1 },
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#e2e8f0')],
            }),
            frame('PriceSummary', {
              autoLayout: vertical({ spacing: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                priceRow('$320 x 5 nights', '$1,600'),
                priceRow('Taxes & fees', '$192'),
                rectangle('SumDivider', {
                  size: { x: 1, y: 1 },
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid('#e2e8f0')],
                }),
                priceRow('Total', '$1,792'),
              ],
            }),
            frame('BookBtn', {
              autoLayout: horizontal({ padX: 0, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#ea580c')],
              cornerRadius: 10,
              children: [
                text('Book Now', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

function amenityBadge(label: string) {
  return frame(`Amenity: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid('#f0f9ff')],
    cornerRadius: 8,
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: '#0369a1' }),
    ],
  });
}

function roomTypeCard(name: string, size: string, price: string, selected: boolean) {
  return frame(`Room: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 20, padY: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(selected ? '#fff7ed' : '#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: selected ? { r: 0.92, g: 0.35, b: 0.05, a: 1 } : { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: selected ? 2 : 1, align: 'INSIDE' }],
    children: [
      frame('RoomInfo', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 16, fontWeight: 600, color: '#1e293b' }),
          text(size, { fontSize: 13, fontWeight: 400, color: '#64748b' }),
        ],
      }),
      frame('RoomPrice', {
        autoLayout: vertical({ spacing: 0 }),
        children: [
          text(price, { fontSize: 20, fontWeight: 700, color: '#ea580c' }),
          text('/night', { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
        ],
      }),
    ],
  });
}

function priceRow(label: string, value: string) {
  return frame(`Price: ${label}`, {
    autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, {
        fontSize: label === 'Total' ? 16 : 14,
        fontWeight: label === 'Total' ? 700 : 400,
        color: label === 'Total' ? '#1e293b' : '#64748b',
        layoutSizingHorizontal: 'FILL',
      }),
      text(value, {
        fontSize: label === 'Total' ? 16 : 14,
        fontWeight: label === 'Total' ? 700 : 500,
        color: '#1e293b',
      }),
    ],
  });
}
