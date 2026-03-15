/**
 * Education Lesson View — Video Player, Transcript & Navigation
 * Batch 5, Page 2: Lesson view with video player placeholder, lesson title, transcript, nav, sidebar
 * DSL Features: nested auto-layout, FILL sizing, SPACE_BETWEEN alignment
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const BLUE = '#1e40af';
const BG = '#f8fafc';
const CARD_BG = '#ffffff';
const TEXT_PRIMARY = '#1e293b';
const TEXT_SECONDARY = '#64748b';
const BORDER = '#e2e8f0';

function lessonItem(number: number, title: string, duration: string, active: boolean) {
  return frame(`Lesson ${number}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(active ? '#eff6ff' : 'transparent')],
    cornerRadius: 8,
    children: [
      frame('LessonNum', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 28, y: 28 },
        fills: [solid(active ? BLUE : '#e2e8f0')],
        cornerRadius: 14,
        children: [
          text(String(number), { fontSize: 12, fontWeight: 600, color: active ? '#ffffff' : TEXT_SECONDARY }),
        ],
      }),
      frame('LessonInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 13, fontWeight: active ? 600 : 400, color: active ? BLUE : TEXT_PRIMARY }),
          text(duration, { fontSize: 11, fontWeight: 400, color: TEXT_SECONDARY }),
        ],
      }),
    ],
  });
}

export default component('EduLesson', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(BG)],
  children: [
    // Top Bar
    frame('TopBar', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        frame('BreadCrumb', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            text('EduLearn', { fontSize: 16, fontWeight: 700, color: BLUE }),
            text('/', { fontSize: 14, fontWeight: 400, color: TEXT_SECONDARY }),
            text('Python 101', { fontSize: 14, fontWeight: 500, color: TEXT_SECONDARY }),
            text('/', { fontSize: 14, fontWeight: 400, color: TEXT_SECONDARY }),
            text('Lesson 3', { fontSize: 14, fontWeight: 500, color: TEXT_PRIMARY }),
          ],
        }),
        frame('ProgressArea', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('3 / 12 lessons', { fontSize: 13, fontWeight: 500, color: TEXT_SECONDARY }),
            frame('ProgressTrack', {
              size: { x: 120, y: 6 },
              fills: [solid('#e2e8f0')],
              cornerRadius: 3,
              clipContent: true,
              autoLayout: horizontal({ spacing: 0 }),
              children: [
                rectangle('ProgressFill', {
                  size: { x: 30, y: 6 },
                  fills: [solid(BLUE)],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Main Content
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Video + Content
        frame('LessonContent', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Video Player Placeholder
            frame('VideoPlayer', {
              autoLayout: vertical({ spacing: 0, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              size: { x: undefined, y: 540 },
              fills: [solid('#0f172a')],
              children: [
                frame('PlayButton', {
                  autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
                  size: { x: 72, y: 72 },
                  fills: [solid('#ffffff', 0.15)],
                  cornerRadius: 36,
                  children: [
                    text('▶', { fontSize: 28, fontWeight: 400, color: '#ffffff' }),
                  ],
                }),
              ],
            }),

            // Video Controls Bar
            frame('VideoControls', {
              autoLayout: horizontal({ spacing: 0, padX: 24, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              children: [
                text('03:24 / 18:42', { fontSize: 13, fontWeight: 500, color: '#94a3b8' }),
                frame('Controls', {
                  autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
                  children: [
                    text('1x', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
                    text('CC', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
                    text('⛶', { fontSize: 16, fontWeight: 400, color: '#ffffff' }),
                  ],
                }),
              ],
            }),

            // Lesson Info
            frame('LessonInfo', {
              autoLayout: vertical({ spacing: 20, padX: 40, padY: 32 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#ffffff')],
              children: [
                text('Lesson 3: Variables and Data Types', {
                  fontSize: 24, fontWeight: 700, color: TEXT_PRIMARY,
                }),
                frame('LessonMeta', {
                  autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
                  children: [
                    text('18 min', { fontSize: 13, fontWeight: 500, color: TEXT_SECONDARY }),
                    text('·', { fontSize: 13, fontWeight: 400, color: TEXT_SECONDARY }),
                    text('Dr. Sarah Chen', { fontSize: 13, fontWeight: 500, color: BLUE }),
                    text('·', { fontSize: 13, fontWeight: 400, color: TEXT_SECONDARY }),
                    text('Updated Jan 2026', { fontSize: 13, fontWeight: 400, color: TEXT_SECONDARY }),
                  ],
                }),
                rectangle('Divider', {
                  size: { x: 1, y: 1 },
                  fills: [solid(BORDER)],
                  layoutSizingHorizontal: 'FILL',
                }),

                // Transcript Area
                frame('TranscriptArea', {
                  autoLayout: vertical({ spacing: 12 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Transcript', { fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }),
                    text(
                      'In this lesson, we will explore the fundamental building blocks of Python programming: variables and data types. Variables are containers for storing data values. Python has several built-in data types including strings, integers, floats, and booleans.\n\nUnlike many other programming languages, Python does not require you to declare the type of a variable when you create one. The type is inferred from the value you assign.',
                      {
                        fontSize: 14,
                        fontWeight: 400,
                        color: TEXT_SECONDARY,
                        lineHeight: { value: 24, unit: 'PIXELS' },
                        size: { x: 700 },
                        textAutoResize: 'HEIGHT',
                      },
                    ),
                  ],
                }),

                // Navigation
                frame('LessonNav', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    frame('PrevBtn', {
                      autoLayout: horizontal({ padX: 20, padY: 10, spacing: 8, align: 'CENTER', counterAlign: 'CENTER' }),
                      fills: [solid('#f1f5f9')],
                      cornerRadius: 8,
                      children: [
                        text('←', { fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }),
                        text('Previous Lesson', { fontSize: 14, fontWeight: 500, color: TEXT_PRIMARY }),
                      ],
                    }),
                    frame('NextBtn', {
                      autoLayout: horizontal({ padX: 20, padY: 10, spacing: 8, align: 'CENTER', counterAlign: 'CENTER' }),
                      fills: [solid(BLUE)],
                      cornerRadius: 8,
                      children: [
                        text('Next Lesson', { fontSize: 14, fontWeight: 500, color: '#ffffff' }),
                        text('→', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),

        // Right: Lesson Sidebar
        frame('LessonSidebar', {
          autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }),
          size: { x: 320, y: undefined },
          fills: [solid('#ffffff')],
          strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            frame('SidebarHeader', {
              autoLayout: vertical({ spacing: 4, padX: 20, padY: 16 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(BLUE)],
              children: [
                text('Course Content', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
                text('12 Lessons · 3h 45m total', { fontSize: 12, fontWeight: 400, color: '#bfdbfe' }),
              ],
            }),
            frame('LessonList', {
              autoLayout: vertical({ spacing: 2, padX: 8, padY: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                lessonItem(1, 'Getting Started with Python', '12 min', false),
                lessonItem(2, 'Your First Program', '15 min', false),
                lessonItem(3, 'Variables and Data Types', '18 min', true),
                lessonItem(4, 'Operators and Expressions', '14 min', false),
                lessonItem(5, 'Control Flow: If/Else', '20 min', false),
                lessonItem(6, 'Loops: For and While', '22 min', false),
                lessonItem(7, 'Functions', '25 min', false),
                lessonItem(8, 'Lists and Tuples', '18 min', false),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
