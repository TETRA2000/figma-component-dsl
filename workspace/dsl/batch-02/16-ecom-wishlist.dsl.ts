/**
 * E-commerce Wishlist — Grid of saved products with heart icons and move-to-cart
 * Batch 2, Page 6: Wishlist view
 * DSL Features: rectangle placeholders, nested layouts, FILL sizing, strokes
 */
import {
  component, frame, rectangle, text,
  solid, horizontal, vertical,
} from '@figma-dsl/core';

export default component('EcomWishlist', {
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
            text('Cart (3)', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
            text('Wishlist', { fontSize: 14, fontWeight: 600, color: '#111827' }),
          ],
        }),
      ],
    }),

    // Page Header
    frame('PageHeader', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 32, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('HeaderLeft', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('My Wishlist', { fontSize: 28, fontWeight: 700, color: '#111827' }),
            text('4 items saved', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
          ],
        }),
      ],
    }),

    // Wishlist Grid
    frame('WishlistGrid', {
      autoLayout: horizontal({ spacing: 24, padX: 80, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        wishlistCard('Classic White Sneakers', '$89.99', true),
        wishlistCard('Leather Crossbody Bag', '$129.00', true),
        wishlistCard('Wool Blend Scarf', '$49.99', true),
        wishlistCard('Running Shoes Pro', '$149.99', true),
      ],
    }),

    // Bottom spacer
    frame('BottomSpacer', {
      size: { x: 1, y: 64 },
      layoutSizingHorizontal: 'FILL',
    }),
  ],
});

function wishlistCard(title: string, price: string, inStock: boolean) {
  return frame(`Wishlist: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    clipContent: true,
    children: [
      // Image with heart overlay
      frame('ImageContainer', {
        autoLayout: horizontal({ spacing: 0, padX: 12, padY: 12, align: 'MAX' }),
        size: { x: 300, y: 240 },
        fills: [solid('#f3f4f6')],
        children: [
          frame('HeartIcon', {
            autoLayout: horizontal({ padX: 8, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
            size: { x: 36, y: 36 },
            fills: [solid('#ffffff')],
            cornerRadius: 18,
            children: [
              text('♥', { fontSize: 16, fontWeight: 400, color: '#ef4444' }),
            ],
          }),
        ],
      }),
      // Info
      frame('CardInfo', {
        autoLayout: vertical({ spacing: 12, padX: 16, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 15, fontWeight: 600, color: '#111827' }),
          text(price, { fontSize: 18, fontWeight: 700, color: '#111827' }),
          text(inStock ? 'In Stock' : 'Out of Stock', {
            fontSize: 13, fontWeight: 500,
            color: inStock ? '#10b981' : '#ef4444',
          }),
          frame('MoveToCartBtn', {
            autoLayout: horizontal({ padX: 0, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            fills: [solid('#111827')],
            cornerRadius: 8,
            children: [
              text('Move to Cart', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
            ],
          }),
        ],
      }),
    ],
  });
}
