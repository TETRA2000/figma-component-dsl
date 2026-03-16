/**
 * Dental Clinic — Services, team, and appointment form
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function serviceCard(name: string, desc: string, price: string, color: string) {
  return frame(`Service: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('Icon', { size: { x: 40, y: 40 }, autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }), fills: [solid(color + '15')], cornerRadius: 10, children: [
        text(name.charAt(0), { fontSize: 18, fontWeight: 700, color }),
      ] }),
      text(name, { fontSize: 15, fontWeight: 600, color: '#0f172a' }),
      text(desc, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
      text(`From ${price}`, { fontSize: 14, fontWeight: 700, color }),
    ],
  });
}

function teamMember(name: string, role: string, color: string) {
  return frame(`Team: ${name}`, {
    autoLayout: vertical({ spacing: 6, padX: 16, padY: 16, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('Photo', { size: { x: 56, y: 56 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#06b6d4', position: 1 }], 135)] }),
      text(name, { fontSize: 14, fontWeight: 600, color: '#0f172a', textAlignHorizontal: 'CENTER' }),
      text(role, { fontSize: 12, fontWeight: 400, color: '#64748b', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function formField(label: string, placeholder: string) {
  return frame(`Field: ${label}`, {
    autoLayout: vertical({ spacing: 4 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 600, color: '#334155' }),
      frame('Input', { autoLayout: horizontal({ padX: 12, padY: 10 }), fills: [solid('#f8fafc')], cornerRadius: 8, layoutSizingHorizontal: 'FILL', strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' as const }], children: [
        text(placeholder, { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
      ] }),
    ],
  });
}

export default frame('DentistPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f0fdfa')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 44, padY: 32 }),
      fills: [gradient([{ hex: '#0d4f4f', position: 0 }, { hex: '#0891b2', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('BrightSmile Dental', { fontSize: 26, fontWeight: 800, color: '#ffffff' }),
        text('Modern dentistry with a gentle touch', { fontSize: 14, fontWeight: 400, color: '#a5f3fc' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 44, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Services', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Our Services', { fontSize: 20, fontWeight: 700, color: '#0f172a' }),
            frame('ServiceGrid', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              serviceCard('Cleaning', 'Professional teeth cleaning and polish', '$95', '#0891b2'),
              serviceCard('Whitening', 'In-office laser whitening treatment', '$350', '#8b5cf6'),
              serviceCard('Implants', 'Permanent titanium tooth replacement', '$2,400', '#059669'),
              serviceCard('Orthodontics', 'Clear aligners and traditional braces', '$4,500', '#f59e0b'),
            ] }),
          ],
        }),
        frame('Team', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Meet Our Team', { fontSize: 20, fontWeight: 700, color: '#0f172a' }),
            frame('TeamGrid', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              teamMember('Dr. Sarah Chen', 'General Dentistry', '#0891b2'),
              teamMember('Dr. Mark Rivera', 'Orthodontics', '#8b5cf6'),
              teamMember('Dr. Aisha Patel', 'Cosmetic Dentistry', '#ec4899'),
              teamMember('Lisa Wong', 'Dental Hygienist', '#059669'),
            ] }),
          ],
        }),
        frame('Appointment', {
          autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
          fills: [solid('#ffffff')],
          cornerRadius: 14,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Book an Appointment', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            frame('FormRow', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              formField('Full Name', 'John Doe'),
              formField('Phone', '(555) 000-0000'),
            ] }),
            frame('FormRow2', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              formField('Service', 'Select a service'),
              formField('Preferred Date', 'MM/DD/YYYY'),
            ] }),
            frame('BookBtn', { autoLayout: horizontal({ padX: 28, padY: 12, align: 'CENTER' }), fills: [solid('#0891b2')], cornerRadius: 8, layoutSizingHorizontal: 'FILL', children: [
              text('Request Appointment', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
