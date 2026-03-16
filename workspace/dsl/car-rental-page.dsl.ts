/**
 * Car Rental — Vehicle cards with specs, date picker placeholder, and price comparison
 * DSL features stressed: gradient vehicle image placeholders, spec grids with icons, date picker placeholder,
 * price comparison table, pill category filters, two-column layout, insurance option cards
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function vehicleCard(name: string, category: string, pricePerDay: string, seats: string, transmission: string, fuel: string, imgGrad: [string, string]) {
  return frame(`Vehicle: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    clipContent: true,
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('VehicleImage', {
        size: { x: 1, y: 150 },
        fills: [gradient([{ hex: imgGrad[0], position: 0 }, { hex: imgGrad[1], position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame('VehicleInfo', {
        autoLayout: vertical({ spacing: 10, padX: 14, padY: 14 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('NameRow', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              frame('VehicleName', {
                autoLayout: vertical({ spacing: 2 }),
                children: [
                  text(name, { fontSize: 15, fontWeight: 700, color: '#1e293b' }),
                  frame('CategoryTag', {
                    autoLayout: horizontal({ spacing: 0, padX: 8, padY: 2 }),
                    fills: [solid('#eff6ff')],
                    cornerRadius: 6,
                    children: [
                      text(category, { fontSize: 10, fontWeight: 600, color: '#3b82f6' }),
                    ],
                  }),
                ],
              }),
              frame('PriceTag', {
                autoLayout: vertical({ spacing: 0, counterAlign: 'MAX' }),
                children: [
                  text(pricePerDay, { fontSize: 20, fontWeight: 700, color: '#0ea5e9', textAlignHorizontal: 'RIGHT' }),
                  text('/day', { fontSize: 11, fontWeight: 400, color: '#94a3b8', textAlignHorizontal: 'RIGHT' }),
                ],
              }),
            ],
          }),
          frame('SpecsRow', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              specItem('👤', seats),
              specItem('⚙', transmission),
              specItem('⛽', fuel),
            ],
          }),
          frame('RentBtn', {
            autoLayout: horizontal({ spacing: 0, padY: 10, align: 'CENTER' }),
            fills: [solid('#0ea5e9')],
            cornerRadius: 8,
            layoutSizingHorizontal: 'FILL',
            children: [
              text('Select Vehicle', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function specItem(icon: string, value: string) {
  return frame(`Spec: ${value}`, {
    autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
    children: [
      text(icon, { fontSize: 13, fontWeight: 400, color: '#64748b' }),
      text(value, { fontSize: 12, fontWeight: 500, color: '#475569' }),
    ],
  });
}

function dateField(label: string, value: string) {
  return frame(`DateField: ${label}`, {
    autoLayout: vertical({ spacing: 4 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 11, fontWeight: 600, color: '#64748b' }),
      frame('DateInput', {
        autoLayout: horizontal({ spacing: 0, padX: 14, padY: 10 }),
        fills: [solid('#f8fafc')],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
        strokes: [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
        children: [
          text(value, { fontSize: 13, fontWeight: 500, color: '#1e293b' }),
        ],
      }),
    ],
  });
}

function insuranceOption(name: string, price: string, desc: string, recommended: boolean) {
  return frame(`Insurance: ${name}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid(recommended ? '#f0f9ff' : '#ffffff')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: recommended ? { r: 0.05, g: 0.65, b: 0.91, a: 1 } : { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: recommended ? 1.5 : 1, align: 'INSIDE' as const }],
    children: [
      frame('Radio', {
        size: { x: 18, y: 18 },
        fills: [solid(recommended ? '#0ea5e9' : '#ffffff')],
        cornerRadius: 9999,
        strokes: recommended ? [] : [{ color: { r: 0.78, g: 0.78, b: 0.78, a: 1 }, weight: 1.5, align: 'INSIDE' as const }],
      }),
      frame('InsuranceInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
          text(desc, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
        ],
      }),
      text(price, { fontSize: 14, fontWeight: 700, color: '#0ea5e9' }),
    ],
  });
}

export default frame('CarRentalPage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 36, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('Logo', {
          autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
          children: [
            ellipse('LogoIcon', { size: { x: 28, y: 28 }, fills: [gradient([{ hex: '#0ea5e9', position: 0 }, { hex: '#0284c7', position: 1 }], 135)] }),
            text('DriveEasy', { fontSize: 20, fontWeight: 700, color: '#0ea5e9' }),
          ],
        }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 20 }),
          children: [
            text('Vehicles', { fontSize: 14, fontWeight: 600, color: '#0ea5e9' }),
            text('Locations', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Deals', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Support', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
          ],
        }),
      ],
    }),

    // Search / booking bar
    frame('BookingBar', {
      autoLayout: horizontal({ spacing: 16, padX: 36, padY: 20 }),
      fills: [solid('#ffffff')],
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        dateField('Pick-up Location', 'San Francisco Airport (SFO)'),
        dateField('Pick-up Date', 'Mar 20, 2026'),
        dateField('Return Date', 'Mar 25, 2026'),
        frame('SearchBtn', {
          autoLayout: horizontal({ spacing: 0, padX: 24, padY: 10, align: 'CENTER', counterAlign: 'MAX' }),
          fills: [solid('#0ea5e9')],
          cornerRadius: 8,
          children: [
            text('Search', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
      ],
    }),

    // Main content
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 24, padX: 36, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Vehicle grid
        frame('VehicleSection', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('SectionHeader', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Available Vehicles', { fontSize: 18, fontWeight: 700, color: '#1e293b' }),
                text('24 results', { fontSize: 13, fontWeight: 500, color: '#64748b' }),
              ],
            }),
            // Category filters
            frame('CategoryFilters', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                frame('FilterAll', { autoLayout: horizontal({ spacing: 0, padX: 14, padY: 6 }), fills: [solid('#0ea5e9')], cornerRadius: 9999, children: [text('All', { fontSize: 12, fontWeight: 600, color: '#ffffff' })] }),
                frame('FilterEconomy', { autoLayout: horizontal({ spacing: 0, padX: 14, padY: 6 }), fills: [solid('#f1f5f9')], cornerRadius: 9999, children: [text('Economy', { fontSize: 12, fontWeight: 500, color: '#64748b' })] }),
                frame('FilterSUV', { autoLayout: horizontal({ spacing: 0, padX: 14, padY: 6 }), fills: [solid('#f1f5f9')], cornerRadius: 9999, children: [text('SUV', { fontSize: 12, fontWeight: 500, color: '#64748b' })] }),
                frame('FilterLuxury', { autoLayout: horizontal({ spacing: 0, padX: 14, padY: 6 }), fills: [solid('#f1f5f9')], cornerRadius: 9999, children: [text('Luxury', { fontSize: 12, fontWeight: 500, color: '#64748b' })] }),
                frame('FilterElectric', { autoLayout: horizontal({ spacing: 0, padX: 14, padY: 6 }), fills: [solid('#f1f5f9')], cornerRadius: 9999, children: [text('Electric', { fontSize: 12, fontWeight: 500, color: '#64748b' })] }),
              ],
            }),
            // Vehicle cards
            frame('VehicleRow1', {
              autoLayout: horizontal({ spacing: 14 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                vehicleCard('Toyota Corolla', 'Economy', '$42', '5 seats', 'Auto', 'Gas', ['#94a3b8', '#64748b']),
                vehicleCard('Honda CR-V', 'SUV', '$68', '5 seats', 'Auto', 'Gas', ['#475569', '#1e293b']),
              ],
            }),
            frame('VehicleRow2', {
              autoLayout: horizontal({ spacing: 14 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                vehicleCard('Tesla Model 3', 'Electric', '$89', '5 seats', 'Auto', 'Electric', ['#0ea5e9', '#0284c7']),
                vehicleCard('BMW 5 Series', 'Luxury', '$125', '5 seats', 'Auto', 'Gas', ['#1e293b', '#0f172a']),
              ],
            }),
          ],
        }),

        // Sidebar: price summary + insurance
        frame('Sidebar', {
          size: { x: 300 },
          autoLayout: vertical({ spacing: 16 }),
          children: [
            // Price summary
            frame('PriceSummary', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              fills: [solid('#ffffff')],
              cornerRadius: 14,
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [
                text('Price Comparison', { fontSize: 16, fontWeight: 700, color: '#1e293b' }),
                text('5-day rental, Mar 20-25', { fontSize: 12, fontWeight: 400, color: '#64748b' }),
                frame('PriceRow1', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [text('Economy', { fontSize: 13, fontWeight: 500, color: '#475569' }), text('$210', { fontSize: 13, fontWeight: 600, color: '#1e293b' })],
                }),
                frame('PriceRow2', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [text('SUV', { fontSize: 13, fontWeight: 500, color: '#475569' }), text('$340', { fontSize: 13, fontWeight: 600, color: '#1e293b' })],
                }),
                frame('PriceRow3', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [text('Electric', { fontSize: 13, fontWeight: 500, color: '#475569' }), text('$445', { fontSize: 13, fontWeight: 600, color: '#1e293b' })],
                }),
                frame('PriceRow4', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [text('Luxury', { fontSize: 13, fontWeight: 500, color: '#475569' }), text('$625', { fontSize: 13, fontWeight: 600, color: '#1e293b' })],
                }),
              ],
            }),

            // Insurance options
            frame('InsuranceSection', {
              autoLayout: vertical({ spacing: 10, padX: 20, padY: 20 }),
              fills: [solid('#ffffff')],
              cornerRadius: 14,
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [
                text('Insurance Options', { fontSize: 16, fontWeight: 700, color: '#1e293b' }),
                insuranceOption('Basic Coverage', '+$12/day', 'Collision damage waiver', false),
                insuranceOption('Full Protection', '+$24/day', 'All-inclusive with roadside assist', true),
                insuranceOption('No Insurance', '$0', 'You assume full liability', false),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
