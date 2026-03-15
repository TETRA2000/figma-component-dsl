/**
 * Education Academic Calendar — Month Grid, Event Dots & Sidebar
 * Batch 5, Page 10: Academic calendar with month grid, event dots, sidebar event list, upcoming deadlines
 * DSL Features: grid layout via nested frames, SPACE_BETWEEN, FILL sizing, complex text styles
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const BLUE = '#1e40af';
const BG = '#f8fafc';
const CARD_BG = '#ffffff';
const TEXT_PRIMARY = '#1e293b';
const TEXT_SECONDARY = '#64748b';
const BORDER = '#e2e8f0';
const GREEN = '#16a34a';
const RED = '#dc2626';
const PURPLE = '#7c3aed';
const ORANGE = '#ea580c';

type EventDot = { color: string } | null;

function calendarDay(day: number | null, isToday: boolean, dots: EventDot[]) {
  if (day === null) {
    return frame('EmptyDay', {
      size: { x: 44, y: 44 },
    });
  }
  return frame(`Day ${day}`, {
    autoLayout: vertical({ spacing: 4, padX: 0, padY: 4, counterAlign: 'CENTER' }),
    size: { x: 44, y: 44 },
    fills: isToday ? [solid(BLUE)] : [],
    cornerRadius: 8,
    children: [
      text(String(day), {
        fontSize: 14,
        fontWeight: isToday ? 700 : 400,
        color: isToday ? '#ffffff' : TEXT_PRIMARY,
        textAlignHorizontal: 'CENTER',
      }),
      ...(dots.length > 0 ? [
        frame('Dots', {
          autoLayout: horizontal({ spacing: 3, counterAlign: 'CENTER' }),
          children: dots.filter(Boolean).map((dot, i) =>
            ellipse(`Dot${i}`, {
              size: { x: 5, y: 5 },
              fills: [solid(dot!.color)],
            }),
          ),
        }),
      ] : []),
    ],
  });
}

function calendarWeekRow(days: Array<{ day: number | null; isToday: boolean; dots: EventDot[] }>) {
  return frame('WeekRow', {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    children: days.map(d => calendarDay(d.day, d.isToday, d.dots)),
  });
}

function eventItem(title: string, time: string, course: string, color: string, type: string) {
  return frame(`Event: ${title}`, {
    autoLayout: horizontal({ spacing: 12, padX: 14, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 8,
    strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      rectangle('ColorBar', {
        size: { x: 4, y: 40 },
        fills: [solid(color)],
        cornerRadius: 2,
      }),
      frame('EventInfo', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 13, fontWeight: 600, color: TEXT_PRIMARY }),
          frame('EventMeta', {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              text(time, { fontSize: 11, fontWeight: 400, color: TEXT_SECONDARY }),
              text('·', { fontSize: 11, fontWeight: 400, color: TEXT_SECONDARY }),
              text(course, { fontSize: 11, fontWeight: 500, color }),
            ],
          }),
        ],
      }),
      frame('TypeBadge', {
        autoLayout: horizontal({ padX: 8, padY: 2 }),
        fills: [solid(color + '18')],
        cornerRadius: 4,
        children: [
          text(type, { fontSize: 10, fontWeight: 600, color }),
        ],
      }),
    ],
  });
}

function deadlineItem(title: string, course: string, dueIn: string, urgent: boolean) {
  return frame(`Deadline: ${title}`, {
    autoLayout: horizontal({ spacing: 12, padX: 14, padY: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(urgent ? '#fef2f2' : CARD_BG)],
    cornerRadius: 8,
    strokes: [{ color: urgent
      ? { r: 0.86, g: 0.15, b: 0.15, a: 0.2 }
      : { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('DueIcon', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 32, y: 32 },
        fills: [solid(urgent ? '#fecaca' : '#f1f5f9')],
        cornerRadius: 16,
        children: [
          text(urgent ? '!' : '○', { fontSize: 14, fontWeight: 700, color: urgent ? RED : TEXT_SECONDARY }),
        ],
      }),
      frame('DeadlineInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 13, fontWeight: 600, color: TEXT_PRIMARY }),
          text(course, { fontSize: 11, fontWeight: 400, color: TEXT_SECONDARY }),
        ],
      }),
      text(dueIn, { fontSize: 12, fontWeight: 600, color: urgent ? RED : ORANGE }),
    ],
  });
}

export default component('EduCalendar', {
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
        text('EduLearn', { fontSize: 18, fontWeight: 700, color: BLUE }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
          children: [
            text('Dashboard', { fontSize: 14, fontWeight: 500, color: TEXT_SECONDARY }),
            text('Courses', { fontSize: 14, fontWeight: 500, color: TEXT_SECONDARY }),
            text('Calendar', { fontSize: 14, fontWeight: 600, color: BLUE }),
          ],
        }),
      ],
    }),

    // Main Content
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 28, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Calendar
        frame('CalendarSection', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Calendar Card
            frame('CalendarCard', {
              autoLayout: vertical({ spacing: 20, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(CARD_BG)],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                // Month navigation
                frame('MonthNav', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    frame('PrevBtn', {
                      autoLayout: horizontal({ padX: 10, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
                      cornerRadius: 6,
                      strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
                      children: [text('←', { fontSize: 16, fontWeight: 600, color: TEXT_PRIMARY })],
                    }),
                    text('March 2026', { fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY }),
                    frame('NextBtn', {
                      autoLayout: horizontal({ padX: 10, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
                      cornerRadius: 6,
                      strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
                      children: [text('→', { fontSize: 16, fontWeight: 600, color: TEXT_PRIMARY })],
                    }),
                  ],
                }),

                // Day headers
                frame('DayHeaders', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
                  layoutSizingHorizontal: 'FILL',
                  children: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d =>
                    frame(`Header ${d}`, {
                      size: { x: 44, y: 24 },
                      autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
                      children: [
                        text(d, { fontSize: 12, fontWeight: 600, color: TEXT_SECONDARY, textAlignHorizontal: 'CENTER' }),
                      ],
                    }),
                  ),
                }),

                // Calendar grid (March 2026: starts on Sunday)
                calendarWeekRow([
                  { day: 1, isToday: false, dots: [{ color: BLUE }] },
                  { day: 2, isToday: false, dots: [] },
                  { day: 3, isToday: false, dots: [{ color: GREEN }] },
                  { day: 4, isToday: false, dots: [] },
                  { day: 5, isToday: false, dots: [{ color: RED }] },
                  { day: 6, isToday: false, dots: [] },
                  { day: 7, isToday: false, dots: [] },
                ]),
                calendarWeekRow([
                  { day: 8, isToday: false, dots: [] },
                  { day: 9, isToday: false, dots: [{ color: PURPLE }] },
                  { day: 10, isToday: false, dots: [{ color: BLUE }, { color: GREEN }] },
                  { day: 11, isToday: false, dots: [] },
                  { day: 12, isToday: false, dots: [{ color: ORANGE }] },
                  { day: 13, isToday: false, dots: [] },
                  { day: 14, isToday: false, dots: [] },
                ]),
                calendarWeekRow([
                  { day: 15, isToday: true, dots: [{ color: RED }, { color: BLUE }] },
                  { day: 16, isToday: false, dots: [{ color: GREEN }] },
                  { day: 17, isToday: false, dots: [{ color: RED }] },
                  { day: 18, isToday: false, dots: [] },
                  { day: 19, isToday: false, dots: [{ color: PURPLE }] },
                  { day: 20, isToday: false, dots: [{ color: BLUE }] },
                  { day: 21, isToday: false, dots: [] },
                ]),
                calendarWeekRow([
                  { day: 22, isToday: false, dots: [] },
                  { day: 23, isToday: false, dots: [{ color: ORANGE }] },
                  { day: 24, isToday: false, dots: [{ color: GREEN }] },
                  { day: 25, isToday: false, dots: [] },
                  { day: 26, isToday: false, dots: [{ color: RED }] },
                  { day: 27, isToday: false, dots: [] },
                  { day: 28, isToday: false, dots: [] },
                ]),
                calendarWeekRow([
                  { day: 29, isToday: false, dots: [{ color: BLUE }] },
                  { day: 30, isToday: false, dots: [] },
                  { day: 31, isToday: false, dots: [{ color: PURPLE }] },
                  { day: null, isToday: false, dots: [] },
                  { day: null, isToday: false, dots: [] },
                  { day: null, isToday: false, dots: [] },
                  { day: null, isToday: false, dots: [] },
                ]),

                // Legend
                frame('Legend', {
                  autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
                  children: [
                    frame('LegendAssignment', {
                      autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
                      children: [
                        ellipse('Dot1', { size: { x: 8, y: 8 }, fills: [solid(RED)] }),
                        text('Assignment', { fontSize: 11, fontWeight: 500, color: TEXT_SECONDARY }),
                      ],
                    }),
                    frame('LegendLecture', {
                      autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
                      children: [
                        ellipse('Dot2', { size: { x: 8, y: 8 }, fills: [solid(BLUE)] }),
                        text('Lecture', { fontSize: 11, fontWeight: 500, color: TEXT_SECONDARY }),
                      ],
                    }),
                    frame('LegendExam', {
                      autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
                      children: [
                        ellipse('Dot3', { size: { x: 8, y: 8 }, fills: [solid(PURPLE)] }),
                        text('Exam', { fontSize: 11, fontWeight: 500, color: TEXT_SECONDARY }),
                      ],
                    }),
                    frame('LegendOffice', {
                      autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
                      children: [
                        ellipse('Dot4', { size: { x: 8, y: 8 }, fills: [solid(GREEN)] }),
                        text('Office Hours', { fontSize: 11, fontWeight: 500, color: TEXT_SECONDARY }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),

        // Right: Sidebar
        frame('Sidebar', {
          autoLayout: vertical({ spacing: 24 }),
          size: { x: 360, y: undefined },
          children: [
            // Today's Events
            frame('TodayEvents', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(CARD_BG)],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                frame('TodayHeader', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Today, March 15', { fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }),
                    frame('AddBtn', {
                      autoLayout: horizontal({ padX: 8, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
                      fills: [solid('#eff6ff')],
                      cornerRadius: 6,
                      children: [text('+', { fontSize: 14, fontWeight: 700, color: BLUE })],
                    }),
                  ],
                }),
                eventItem('ML Lecture: Neural Networks', '10:00 AM - 11:30 AM', 'CS 229', BLUE, 'Lecture'),
                eventItem('Assignment 3 Due', '11:59 PM', 'CS 161', RED, 'Due'),
                eventItem('Study Group Meeting', '3:00 PM - 4:30 PM', 'MATH 51', GREEN, 'Group'),
              ],
            }),

            // Upcoming Deadlines
            frame('UpcomingDeadlines', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(CARD_BG)],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Upcoming Deadlines', { fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }),
                deadlineItem('Assignment 4: BST', 'CS 161', 'In 2 days', true),
                deadlineItem('Lab Report 5', 'STATS 101', 'In 4 days', false),
                deadlineItem('Midterm Exam', 'MATH 51', 'In 1 week', false),
                deadlineItem('Research Paper Draft', 'ENGR 40', 'In 10 days', false),
                deadlineItem('Final Project Proposal', 'CS 229', 'In 2 weeks', false),
              ],
            }),

            // This Week Summary
            frame('WeekSummary', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(CARD_BG)],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('This Week', { fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }),
                frame('WeekStats', {
                  autoLayout: horizontal({ spacing: 12 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    frame('WStat1', {
                      autoLayout: vertical({ spacing: 4, padX: 12, padY: 10, counterAlign: 'CENTER' }),
                      layoutSizingHorizontal: 'FILL',
                      fills: [solid('#eff6ff')],
                      cornerRadius: 8,
                      children: [
                        text('8', { fontSize: 20, fontWeight: 700, color: BLUE }),
                        text('Classes', { fontSize: 10, fontWeight: 500, color: TEXT_SECONDARY }),
                      ],
                    }),
                    frame('WStat2', {
                      autoLayout: vertical({ spacing: 4, padX: 12, padY: 10, counterAlign: 'CENTER' }),
                      layoutSizingHorizontal: 'FILL',
                      fills: [solid('#fef2f2')],
                      cornerRadius: 8,
                      children: [
                        text('2', { fontSize: 20, fontWeight: 700, color: RED }),
                        text('Due', { fontSize: 10, fontWeight: 500, color: TEXT_SECONDARY }),
                      ],
                    }),
                    frame('WStat3', {
                      autoLayout: vertical({ spacing: 4, padX: 12, padY: 10, counterAlign: 'CENTER' }),
                      layoutSizingHorizontal: 'FILL',
                      fills: [solid('#faf5ff')],
                      cornerRadius: 8,
                      children: [
                        text('1', { fontSize: 20, fontWeight: 700, color: PURPLE }),
                        text('Exam', { fontSize: 10, fontWeight: 500, color: TEXT_SECONDARY }),
                      ],
                    }),
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
