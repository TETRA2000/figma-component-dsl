/**
 * Coworking Space — Desk plans, amenity list, and booking section
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function deskPlan(name: string, price: string, features: string[], color: string, popular: boolean) {
  return frame(`Plan: ${name}`, {
    autoLayout: vertical({ spacing: 14, padX: 20, padY: 20 }),
    fills: [solid(popular ? color : '#ffffff')],
    cornerRadius: 14,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      popular
        ? frame('PopularBadge', { autoLayout: horizontal({ padX: 10, padY: 3 }), fills: [solid('#ffffff33')], cornerRadius: 9999, children: [text('Most Popular', { fontSize: 10, fontWeight: 700, color: '#ffffff' })] })
        : rectangle('Spacer', { size: { x: 1, y: 0 }, fills: [] }),
      text(name, { fontSize: 18, fontWeight: 700, color: popular ? '#ffffff' : '#1e293b' }),
      text(price, { fontSize: 28, fontWeight: 800, color: popular ? '#ffffff' : color }),
      text('per month', { fontSize: 12, fontWeight: 400, color: popular ? '#ffffffb3' : '#94a3b8' }),
      ...features.map(f => frame(`Feature: ${f}`, {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          ellipse('Dot', { size: { x: 6, y: 6 }, fills: [solid(popular ? '#ffffff' : color)] }),
          text(f, { fontSize: 13, fontWeight: 400, color: popular ? '#ffffffcc' : '#475569' }),
        ],
      })),
    ],
  });
}

function amenityItem(label: string, icon: string) {
  return frame(`Amenity: ${label}`, {
    autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER', padX: 14, padY: 10 }),
    fills: [solid('#f1f5f9')],
    cornerRadius: 10,
    children: [
      text(icon, { fontSize: 18, fontWeight: 400, color: '#475569' }),
      text(label, { fontSize: 13, fontWeight: 500, color: '#334155' }),
    ],
  });
}

function bookingSlot(time: string, available: boolean) {
  return frame(`Slot: ${time}`, {
    autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER' }),
    fills: [solid(available ? '#ecfdf5' : '#f1f5f9')],
    cornerRadius: 8,
    children: [
      text(time, { fontSize: 12, fontWeight: 600, color: available ? '#059669' : '#94a3b8' }),
    ],
  });
}

export default frame('CoworkingPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 48, padY: 40 }),
      fills: [gradient([{ hex: '#0f172a', position: 0 }, { hex: '#1e3a5f', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('WorkHub Co.', { fontSize: 28, fontWeight: 800, color: '#ffffff' }),
        text('Flexible desks & private offices in downtown', { fontSize: 15, fontWeight: 400, color: '#94a3b8' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 32, padX: 48, padY: 36 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Plans', {
          autoLayout: vertical({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Desk Plans', { fontSize: 20, fontWeight: 700, color: '#0f172a' }),
            frame('PlanGrid', {
              autoLayout: horizontal({ spacing: 14 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                deskPlan('Hot Desk', '$199', ['Shared seating', 'WiFi access', 'Coffee & tea'], '#3b82f6', false),
                deskPlan('Dedicated Desk', '$399', ['Reserved spot', 'Locker included', '24/7 access', 'Meeting credits'], '#6366f1', true),
                deskPlan('Private Office', '$899', ['4-person office', 'Mail handling', 'Phone booth', 'All amenities'], '#0ea5e9', false),
              ],
            }),
          ],
        }),
        frame('Amenities', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Amenities', { fontSize: 20, fontWeight: 700, color: '#0f172a' }),
            frame('AmenityGrid', {
              autoLayout: horizontal({ spacing: 10 }),
              children: [
                amenityItem('High-speed WiFi', '📶'),
                amenityItem('Meeting rooms', '🏢'),
                amenityItem('Phone booths', '📞'),
                amenityItem('Coffee bar', '☕'),
                amenityItem('Parking', '🅿️'),
              ],
            }),
          ],
        }),
        frame('Booking', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Book a Tour', { fontSize: 20, fontWeight: 700, color: '#0f172a' }),
            text('Pick an available time slot below', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
            frame('Slots', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                bookingSlot('9:00 AM', true), bookingSlot('10:30 AM', true),
                bookingSlot('12:00 PM', false), bookingSlot('2:00 PM', true),
                bookingSlot('4:00 PM', false),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
