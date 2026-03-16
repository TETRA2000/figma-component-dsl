/**
 * Healthcare Dashboard — Medical vitals, appointments, medications
 * DSL features: radialGradient (not yet tested), mixed opacity, large numbers
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function vitalCard(label: string, value: string, unit: string, color: string) {
  return frame(`Vital: ${label}`, {
    autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('VitalTop', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          ellipse('StatusDot', { size: { x: 10, y: 10 }, fills: [solid(color)] }),
          text(label, { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
        ],
      }),
      frame('VitalValue', {
        autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }),
        children: [
          text(value, { fontSize: 32, fontWeight: 700, color: '#111827' }),
          text(unit, { fontSize: 14, fontWeight: 500, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}

function appointmentRow(time: string, doctor: string, specialty: string) {
  return frame(`Appt: ${doctor}`, {
    autoLayout: horizontal({ spacing: 16, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.94, g: 0.94, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('TimeSlot', {
        autoLayout: vertical({ spacing: 0, padX: 12, padY: 8, counterAlign: 'CENTER' }),
        fills: [solid('#f0fdfa')],
        cornerRadius: 8,
        children: [
          text(time, { fontSize: 14, fontWeight: 600, color: '#0d9488', textAlignHorizontal: 'CENTER' }),
        ],
      }),
      frame('DoctorInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(doctor, { fontSize: 14, fontWeight: 600, color: '#111827' }),
          text(specialty, { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}

function medicationPill(name: string, dosage: string, time: string) {
  return frame(`Med: ${name}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 10, counterAlign: 'CENTER' }),
    fills: [solid('#f0fdfa')],
    cornerRadius: 9999,
    strokes: [{ color: { r: 0.80, g: 0.94, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      rectangle('PillIcon', { size: { x: 24, y: 24 }, fills: [solid('#0d9488')], cornerRadius: 6 }),
      frame('MedInfo', {
        autoLayout: vertical({ spacing: 0 }),
        children: [
          text(name, { fontSize: 13, fontWeight: 600, color: '#0d9488' }),
          text(`${dosage} - ${time}`, { fontSize: 11, fontWeight: 400, color: '#6b7280' }),
        ],
      }),
    ],
  });
}

export default frame('HealthcarePage', {
  size: { x: 1440 },
  autoLayout: vertical({ spacing: 0, padX: 48, padY: 32 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('HeaderLeft', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('My Health', { fontSize: 28, fontWeight: 700, color: '#111827' }),
            text('Welcome back, Sarah', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
          ],
        }),
        ellipse('ProfileAvatar', { size: { x: 44, y: 44 }, fills: [solid('#0d9488')] }),
      ],
    }),
    frame('Vitals', {
      autoLayout: horizontal({ spacing: 16, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        vitalCard('Heart Rate', '72', 'bpm', '#10b981'),
        vitalCard('Blood Pressure', '120/80', 'mmHg', '#3b82f6'),
        vitalCard('O2 Level', '98', '%', '#10b981'),
        vitalCard('Temperature', '98.6', '\u00B0F', '#10b981'),
      ],
    }),
    frame('TwoColumn', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Appointments', {
          autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Upcoming Appointments', { fontSize: 18, fontWeight: 600, color: '#111827' }),
            appointmentRow('9:00 AM', 'Dr. Williams', 'Cardiology'),
            appointmentRow('2:30 PM', 'Dr. Chen', 'Dermatology'),
            appointmentRow('4:00 PM', 'Dr. Patel', 'General Practice'),
          ],
        }),
        frame('Medications', {
          autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Medications', { fontSize: 18, fontWeight: 600, color: '#111827' }),
            medicationPill('Metformin', '500mg', 'Morning'),
            medicationPill('Lisinopril', '10mg', 'Evening'),
            medicationPill('Vitamin D', '2000 IU', 'Morning'),
            medicationPill('Aspirin', '81mg', 'Night'),
          ],
        }),
      ],
    }),
  ],
});
