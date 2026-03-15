/**
 * E-commerce Store Locator — Map placeholder with store list
 * Batch 2, Page 10: Store locator with addresses, hours, phone
 * DSL Features: rectangle placeholders, nested layouts, FILL sizing, strokes
 */
import {
  component, frame, rectangle, text,
  solid, horizontal, vertical,
} from '@figma-dsl/core';

export default component('EcomStoreLocator', {
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
        text('ShopFlow', { fontSize: 22, fontWeight: 700, color: '#111827' }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
          children: [
            text('Shop', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
            text('Stores', { fontSize: 14, fontWeight: 600, color: '#111827' }),
            text('Contact', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
          ],
        }),
      ],
    }),

    // Page Header
    frame('PageHeader', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Find a Store', { fontSize: 32, fontWeight: 700, color: '#111827', textAlignHorizontal: 'CENTER' }),
        // Search bar
        frame('LocationSearch', {
          autoLayout: horizontal({ spacing: 12, padX: 20, padY: 12, counterAlign: 'CENTER' }),
          size: { x: 480, y: undefined },
          fills: [solid('#ffffff')],
          cornerRadius: 10,
          strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            text('📍', { fontSize: 16, fontWeight: 400, color: '#6b7280' }),
            text('Enter zip code or city', { fontSize: 14, fontWeight: 400, color: '#9ca3af' }),
            frame('SearchSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
            frame('SearchBtn', {
              autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#111827')],
              cornerRadius: 8,
              children: [
                text('Search', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Main Content: Map + Store List
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Map Placeholder
        frame('MapArea', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            rectangle('MapPlaceholder', {
              size: { x: 800, y: 520 },
              fills: [solid('#e5e7eb')],
              cornerRadius: 12,
            }),
          ],
        }),

        // Store List
        frame('StoreList', {
          autoLayout: vertical({ spacing: 0, padX: 24 }),
          size: { x: 420, y: undefined },
          children: [
            frame('StoreListHeader', {
              autoLayout: horizontal({ spacing: 0, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Nearby Stores', { fontSize: 18, fontWeight: 700, color: '#111827' }),
                text('4 found', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              ],
            }),
            storeCard(
              'ShopFlow Downtown',
              '123 Market Street',
              'San Francisco, CA 94105',
              'Mon–Sat: 10am – 8pm\nSun: 11am – 6pm',
              '(415) 555-0123',
              '0.3 mi',
            ),
            storeCard(
              'ShopFlow Union Square',
              '456 Powell Street',
              'San Francisco, CA 94102',
              'Mon–Sat: 9am – 9pm\nSun: 10am – 7pm',
              '(415) 555-0456',
              '0.8 mi',
            ),
            storeCard(
              'ShopFlow Marina',
              '789 Chestnut Street',
              'San Francisco, CA 94123',
              'Mon–Fri: 10am – 7pm\nSat–Sun: 10am – 6pm',
              '(415) 555-0789',
              '2.1 mi',
            ),
            storeCard(
              'ShopFlow Berkeley',
              '321 University Avenue',
              'Berkeley, CA 94710',
              'Mon–Sat: 10am – 8pm\nSun: 11am – 5pm',
              '(510) 555-0321',
              '4.5 mi',
            ),
          ],
        }),
      ],
    }),
  ],
});

function storeCard(name: string, address1: string, address2: string, hours: string, phone: string, distance: string) {
  return frame(`Store: ${name}`, {
    autoLayout: vertical({ spacing: 10, padY: 16 }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('StoreHeader', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 15, fontWeight: 600, color: '#111827' }),
          frame('DistanceBadge', {
            autoLayout: horizontal({ padX: 10, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#f3f4f6')],
            cornerRadius: 12,
            children: [
              text(distance, { fontSize: 12, fontWeight: 500, color: '#6b7280' }),
            ],
          }),
        ],
      }),
      frame('Address', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(address1, { fontSize: 13, fontWeight: 400, color: '#4b5563' }),
          text(address2, { fontSize: 13, fontWeight: 400, color: '#4b5563' }),
        ],
      }),
      frame('HoursPhone', {
        autoLayout: horizontal({ spacing: 24 }),
        children: [
          frame('Hours', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text('Hours', { fontSize: 12, fontWeight: 600, color: '#6b7280' }),
              text(hours, {
                fontSize: 12, fontWeight: 400, color: '#4b5563',
                lineHeight: { value: 18, unit: 'PIXELS' },
              }),
            ],
          }),
          frame('Phone', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text('Phone', { fontSize: 12, fontWeight: 600, color: '#6b7280' }),
              text(phone, { fontSize: 12, fontWeight: 400, color: '#4b5563' }),
            ],
          }),
        ],
      }),
      frame('DirectionsBtn', {
        autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#ffffff')],
        cornerRadius: 8,
        strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
        children: [
          text('Get Directions', { fontSize: 13, fontWeight: 500, color: '#374151' }),
        ],
      }),
    ],
  });
}
