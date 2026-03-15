/**
 * Symptom Checker — Body region selector placeholder, symptom list checkboxes,
 * severity slider area, "Get Assessment" CTA
 * Batch 4, Page 6: Healthcare/Wellness
 * DSL Features: ellipse, strokes, SPACE_BETWEEN, progress bar as slider
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

const blue = '#0284c7';
const lightBlue = '#e0f2fe';
const bg = '#f8fafc';
const white = '#ffffff';
const dark = '#0f172a';
const gray = '#64748b';
const border = '#e2e8f0';
const green = '#16a34a';
const amber = '#f59e0b';
const red = '#dc2626';

export default component('HealthSymptoms', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(bg)],
  children: [
    /* ---- Header ---- */
    frame('Header', {
      autoLayout: vertical({ spacing: 4, padX: 64, padY: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
      children: [
        text('Symptom Checker', { fontSize: 26, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
        text('Select your symptoms and get an AI-powered preliminary assessment', {
          fontSize: 15, fontWeight: 400, color: gray, textAlignHorizontal: 'CENTER',
        }),
      ],
    }),

    /* ---- Progress Steps ---- */
    frame('ProgressSteps', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 20, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        progressStep('1', 'Body Region', 'completed'),
        progressConnector(),
        progressStep('2', 'Symptoms', 'active'),
        progressConnector(),
        progressStep('3', 'Severity', 'pending'),
        progressConnector(),
        progressStep('4', 'Assessment', 'pending'),
      ],
    }),

    /* ---- Main Content ---- */
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 24, padX: 64, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        /* Body Region Selector */
        frame('BodyRegion', {
          autoLayout: vertical({ spacing: 16, padX: 24, padY: 24, counterAlign: 'CENTER' }),
          size: { x: 340, y: undefined },
          fills: [solid(white)],
          cornerRadius: 12,
          strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
          children: [
            text('Select Body Region', { fontSize: 16, fontWeight: 600, color: dark }),
            /* Body placeholder — large ellipse */
            frame('BodyPlaceholder', {
              autoLayout: vertical({ spacing: 0, counterAlign: 'CENTER' }),
              size: { x: 200, y: 320 },
              fills: [solid('#f1f5f9')],
              cornerRadius: 100,
              children: [
                /* Head */
                ellipse('Head', { size: { x: 60, y: 60 }, fills: [solid(lightBlue)], strokes: [{ color: hex(blue), weight: 2, align: 'INSIDE' }] }),
              ],
            }),
            /* Region tags */
            frame('RegionTags', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                regionTag('Head', true),
                regionTag('Chest', false),
                regionTag('Abdomen', false),
                regionTag('Back', false),
              ],
            }),
            frame('RegionTags2', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                regionTag('Arms', false),
                regionTag('Legs', false),
                regionTag('General', false),
              ],
            }),
          ],
        }),

        /* Symptoms & Severity */
        frame('SymptomsPanel', {
          autoLayout: vertical({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            /* Symptom Checklist */
            frame('SymptomChecklist', {
              autoLayout: vertical({ spacing: 0, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 12,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Select Symptoms', { fontSize: 16, fontWeight: 600, color: dark }),
                rectangle('ChecklistDivider', { size: { x: 1, y: 1 }, fills: [solid(border)], layoutSizingHorizontal: 'FILL' }),
                symptomCheckbox('Headache', true),
                symptomCheckbox('Dizziness', true),
                symptomCheckbox('Nausea', false),
                symptomCheckbox('Blurred Vision', false),
                symptomCheckbox('Sensitivity to Light', true),
                symptomCheckbox('Neck Stiffness', false),
                symptomCheckbox('Fatigue', false),
                symptomCheckbox('Fever', false),
              ],
            }),

            /* Severity Slider */
            frame('SeveritySection', {
              autoLayout: vertical({ spacing: 16, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 12,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Symptom Severity', { fontSize: 16, fontWeight: 600, color: dark }),
                text('How would you rate the overall intensity of your symptoms?', {
                  fontSize: 13, fontWeight: 400, color: gray,
                  lineHeight: { value: 20, unit: 'PIXELS' },
                  size: { x: 500 },
                  textAutoResize: 'HEIGHT',
                }),
                /* Slider track */
                frame('SliderArea', {
                  autoLayout: vertical({ spacing: 8 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    frame('SliderTrack', {
                      size: { x: 500, y: 8 },
                      fills: [solid('#e2e8f0')],
                      cornerRadius: 4,
                      clipContent: true,
                      autoLayout: horizontal({ spacing: 0 }),
                      layoutSizingHorizontal: 'FILL',
                      children: [
                        rectangle('SliderFill', { size: { x: 300, y: 8 }, fills: [solid(amber)] }),
                      ],
                    }),
                    /* Slider thumb (ellipse on the track) */
                    frame('SliderLabels', {
                      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
                      layoutSizingHorizontal: 'FILL',
                      children: [
                        text('Mild', { fontSize: 12, fontWeight: 400, color: green }),
                        text('Moderate', { fontSize: 12, fontWeight: 600, color: amber }),
                        text('Severe', { fontSize: 12, fontWeight: 400, color: red }),
                      ],
                    }),
                  ],
                }),

                /* Duration */
                frame('Duration', {
                  autoLayout: horizontal({ spacing: 0, padY: 8, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('How long have you had these symptoms?', { fontSize: 14, fontWeight: 500, color: dark }),
                    frame('DurationSelect', {
                      autoLayout: horizontal({ padX: 12, padY: 6, spacing: 6, counterAlign: 'CENTER' }),
                      fills: [solid(white)],
                      cornerRadius: 6,
                      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
                      children: [
                        text('2-3 days', { fontSize: 13, fontWeight: 500, color: dark }),
                        text('▾', { fontSize: 12, fontWeight: 400, color: gray }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            /* CTA */
            frame('CTARow', {
              autoLayout: horizontal({ spacing: 12, align: 'MAX' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('BackBtn', {
                  autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
                  cornerRadius: 8,
                  strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
                  children: [
                    text('Back', { fontSize: 15, fontWeight: 500, color: gray }),
                  ],
                }),
                frame('AssessBtn', {
                  autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid(blue)],
                  cornerRadius: 8,
                  children: [
                    text('Get Assessment', { fontSize: 15, fontWeight: 600, color: white }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

/* ---- helpers ---- */

function progressStep(num: string, label: string, state: 'completed' | 'active' | 'pending') {
  const bgColor = state === 'completed' ? green : state === 'active' ? blue : '#e2e8f0';
  const textColor = state === 'pending' ? gray : white;
  const labelColor = state === 'active' ? blue : state === 'completed' ? green : gray;
  return frame(`Step: ${label}`, {
    autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
    children: [
      frame('StepCircle', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 28, y: 28 },
        fills: [solid(bgColor)],
        cornerRadius: 14,
        children: [
          text(state === 'completed' ? '✓' : num, { fontSize: 13, fontWeight: 600, color: textColor }),
        ],
      }),
      text(label, { fontSize: 13, fontWeight: state === 'active' ? 600 : 400, color: labelColor }),
    ],
  });
}

function progressConnector() {
  return rectangle('Connector', {
    size: { x: 40, y: 2 },
    fills: [solid('#e2e8f0')],
  });
}

function regionTag(label: string, active: boolean) {
  return frame(`Region: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(active ? blue : white)],
    cornerRadius: 16,
    strokes: active ? [] : [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: active ? white : gray }),
    ],
  });
}

function symptomCheckbox(label: string, checked: boolean) {
  return frame(`Symptom: ${label}`, {
    autoLayout: horizontal({ spacing: 10, padY: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('Checkbox', {
        size: { x: 20, y: 20 },
        fills: [solid(checked ? blue : white)],
        cornerRadius: 4,
        strokes: checked ? [] : [{ color: hex(border), weight: 1.5, align: 'INSIDE' }],
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        children: checked
          ? [text('✓', { fontSize: 12, fontWeight: 700, color: white })]
          : [],
      }),
      text(label, { fontSize: 14, fontWeight: checked ? 500 : 400, color: checked ? dark : gray }),
    ],
  });
}
