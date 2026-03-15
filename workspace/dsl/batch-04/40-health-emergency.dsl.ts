/**
 * Emergency Info Page — Large emergency number, nearest hospitals, first aid, SOS
 * Batch 4, Page 40: Healthcare (loosen css-modules + no-inline-style)
 * DSL Features: ellipses, strokes, bold typography, SPACE_BETWEEN, red accent
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function hospitalCard(name: string, address: string, distance: string, waitTime: string) {
  return frame(`Hospital: ${name}`, {
    autoLayout: horizontal({ spacing: 16, padX: 20, padY: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      ellipse('LocationDot', {
        size: { x: 40, y: 40 },
        fills: [solid('#fee2e2')],
      }),
      frame('HospitalInfo', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 16, fontWeight: 600, color: '#1e293b' }),
          text(address, { fontSize: 13, fontWeight: 400, color: '#64748b' }),
        ],
      }),
      frame('HospitalMeta', {
        autoLayout: vertical({ spacing: 2, align: 'MAX' }),
        children: [
          text(distance, { fontSize: 14, fontWeight: 600, color: '#0284c7' }),
          text(`~${waitTime} wait`, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
        ],
      }),
    ],
  });
}

function firstAidCard(title: string, steps: string) {
  return frame(`FirstAid: ${title}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#fff7ed')],
    cornerRadius: 10,
    children: [
      text(title, { fontSize: 14, fontWeight: 600, color: '#9a3412' }),
      text(steps, { fontSize: 13, fontWeight: 400, color: '#78350f', lineHeight: { value: 20, unit: 'PIXELS' } }),
    ],
  });
}

export default component('EmergencyInfo', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fef2f2')],
  children: [
    // SOS Banner
    frame('SOSBanner', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 48, align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#dc2626', position: 0 }, { hex: '#991b1b', position: 1 }], 135)],
      children: [
        text('EMERGENCY', { fontSize: 14, fontWeight: 700, color: '#fecaca', letterSpacing: { value: 10, unit: 'PERCENT' } }),
        text('911', { fontSize: 96, fontWeight: 800, color: '#ffffff' }),
        text('Call immediately for life-threatening emergencies', { fontSize: 18, fontWeight: 400, color: '#fecaca', textAlignHorizontal: 'CENTER' }),
        frame('SOSButton', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 40,
          children: [
            text('TAP TO CALL 911', { fontSize: 18, fontWeight: 700, color: '#dc2626' }),
          ],
        }),
      ],
    }),

    // Nearest Hospitals
    frame('NearestHospitals', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        text('Nearest Emergency Rooms', { fontSize: 24, fontWeight: 700, color: '#1e293b' }),
        hospitalCard('City General Hospital', '123 Medical Center Dr', '0.8 mi', '15 min'),
        hospitalCard('St. Mary\'s Medical Center', '456 Healthcare Blvd', '2.1 mi', '25 min'),
        hospitalCard('Regional Trauma Center', '789 Emergency Way', '3.5 mi', '10 min'),
      ],
    }),

    // First Aid Quick Reference
    frame('FirstAid', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('First Aid Quick Reference', { fontSize: 24, fontWeight: 700, color: '#1e293b' }),
        frame('FirstAidGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            firstAidCard('CPR', '1. Call 911\n2. Push hard and fast on center of chest\n3. 30 compressions, 2 breaths\n4. Continue until help arrives'),
            firstAidCard('Choking', '1. Ask "Are you choking?"\n2. Stand behind, wrap arms around waist\n3. Make a fist above navel\n4. Quick upward thrusts'),
            firstAidCard('Bleeding', '1. Apply direct pressure with cloth\n2. Keep pressure for 10+ minutes\n3. Do not remove cloth\n4. Elevate if possible'),
          ],
        }),
      ],
    }),

    // Poison Control
    frame('PoisonControl', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 24, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#fef9c3')],
      children: [
        text('Poison Control: ', { fontSize: 16, fontWeight: 600, color: '#854d0e' }),
        text('1-800-222-1222', { fontSize: 16, fontWeight: 700, color: '#92400e' }),
      ],
    }),
  ],
});
