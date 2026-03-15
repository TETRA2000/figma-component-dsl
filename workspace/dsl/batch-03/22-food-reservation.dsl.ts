/**
 * Restaurant Reservation Page — Date/time, party size, special requests
 * Batch 3, Page 2: Food & Restaurant
 * DSL Features: form layouts, warm palette, cornerRadii, gradients
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const BROWN = '#8B4513';
const TAN = '#D4A574';
const CREAM = '#FFF8F0';
const DARK = '#3E2723';
const MUTED = '#8D6E63';
const BORDER = '#E8D5C4';

function formLabel(label: string) {
  return text(label, { fontSize: 14, fontWeight: 600, color: DARK });
}

function inputField(name: string, placeholder: string, width?: number) {
  return frame(`Input: ${name}`, {
    autoLayout: horizontal({ padX: 16, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: width ? undefined : 'FILL',
    size: width ? { x: width, y: undefined } : undefined,
    fills: [solid('#FFFFFF')],
    cornerRadius: 10,
    strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(placeholder, { fontSize: 15, fontWeight: 400, color: '#B0998A' }),
    ],
  });
}

function dateSlot(day: string, date: string, selected: boolean) {
  return frame(`Date: ${day} ${date}`, {
    autoLayout: vertical({ spacing: 4, padX: 16, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [selected ? solid(BROWN) : solid('#FFFFFF')],
    cornerRadius: 12,
    strokes: selected ? [] : [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(day, { fontSize: 12, fontWeight: 500, color: selected ? TAN : MUTED }),
      text(date, { fontSize: 18, fontWeight: 700, color: selected ? '#FFFFFF' : DARK }),
    ],
  });
}

function timeSlot(time: string, available: boolean, selected: boolean) {
  return frame(`Time: ${time}`, {
    autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [selected ? solid(BROWN) : solid('#FFFFFF')],
    cornerRadius: 8,
    opacity: available ? 1 : 0.4,
    strokes: selected ? [] : [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(time, { fontSize: 14, fontWeight: 500, color: selected ? '#FFFFFF' : DARK }),
    ],
  });
}

function partySizeBtn(count: string, selected: boolean) {
  return frame(`Party: ${count}`, {
    autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
    size: { x: 48, y: 48 },
    fills: [selected ? solid(BROWN) : solid('#FFFFFF')],
    cornerRadius: 24,
    strokes: selected ? [] : [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(count, { fontSize: 16, fontWeight: 600, color: selected ? '#FFFFFF' : DARK }),
    ],
  });
}

export default component('FoodReservation', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(CREAM)],
  children: [
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 8, padX: 80, padY: 56, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#8B4513', position: 0 },
          { hex: '#5D4037', position: 1 },
        ], 270),
      ],
      children: [
        text('Reserve a Table', {
          fontSize: 44, fontWeight: 700, color: '#FFFFFF',
          letterSpacing: { value: -1, unit: 'PIXELS' },
        }),
        text('Join us for an unforgettable dining experience', {
          fontSize: 18, fontWeight: 400, color: TAN,
        }),
      ],
    }),

    // Reservation Form
    frame('FormContainer', {
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Date Selection
        frame('DateSection', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            formLabel('Select Date'),
            frame('DateSlots', {
              autoLayout: horizontal({ spacing: 12 }),
              children: [
                dateSlot('Mon', '17', false),
                dateSlot('Tue', '18', true),
                dateSlot('Wed', '19', false),
                dateSlot('Thu', '20', false),
                dateSlot('Fri', '21', false),
                dateSlot('Sat', '22', false),
                dateSlot('Sun', '23', false),
              ],
            }),
          ],
        }),

        // Time Selection
        frame('TimeSection', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            formLabel('Select Time'),
            frame('TimeSlots', {
              autoLayout: horizontal({ spacing: 10 }),
              children: [
                timeSlot('5:00 PM', true, false),
                timeSlot('5:30 PM', true, false),
                timeSlot('6:00 PM', true, true),
                timeSlot('6:30 PM', true, false),
                timeSlot('7:00 PM', true, false),
                timeSlot('7:30 PM', false, false),
                timeSlot('8:00 PM', true, false),
                timeSlot('8:30 PM', true, false),
              ],
            }),
          ],
        }),

        // Party Size
        frame('PartySizeSection', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            formLabel('Party Size'),
            frame('PartySizes', {
              autoLayout: horizontal({ spacing: 12 }),
              children: [
                partySizeBtn('1', false),
                partySizeBtn('2', true),
                partySizeBtn('3', false),
                partySizeBtn('4', false),
                partySizeBtn('5', false),
                partySizeBtn('6', false),
                partySizeBtn('7+', false),
              ],
            }),
          ],
        }),

        // Contact Info
        frame('ContactSection', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            formLabel('Contact Information'),
            frame('ContactRow', {
              autoLayout: horizontal({ spacing: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                inputField('Name', 'Full Name'),
                inputField('Email', 'Email Address'),
              ],
            }),
            inputField('Phone', 'Phone Number'),
          ],
        }),

        // Special Requests
        frame('RequestsSection', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            formLabel('Special Requests'),
            frame('TextArea', {
              autoLayout: vertical({ padX: 16, padY: 14 }),
              layoutSizingHorizontal: 'FILL',
              size: { x: undefined, y: 120 },
              fills: [solid('#FFFFFF')],
              cornerRadius: 10,
              strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Allergies, dietary restrictions, special occasions...', {
                  fontSize: 15, fontWeight: 400, color: '#B0998A',
                }),
              ],
            }),
          ],
        }),

        // Confirm Button
        frame('ConfirmBtn', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [
            gradient([
              { hex: '#8B4513', position: 0 },
              { hex: '#A0522D', position: 1 },
            ], 0),
          ],
          cornerRadius: 12,
          children: [
            text('Confirm Reservation', { fontSize: 16, fontWeight: 600, color: '#FFFFFF' }),
          ],
        }),
      ],
    }),
  ],
});
