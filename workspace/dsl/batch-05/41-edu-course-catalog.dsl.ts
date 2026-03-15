/**
 * Education Course Catalog — Search, Filters & Course Cards
 * Batch 5, Page 1: Course catalog with search bar, filter sidebar, course cards with progress indicators
 * DSL Features: SPACE_BETWEEN, nested auto-layout, progress bars (FILL sizing), complex text styles
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const BLUE = '#1e40af';
const GOLD = '#fef3c7';
const BG = '#f8fafc';
const CARD_BG = '#ffffff';
const TEXT_PRIMARY = '#1e293b';
const TEXT_SECONDARY = '#64748b';
const BORDER = '#e2e8f0';

function courseCard(
  title: string,
  category: string,
  level: string,
  duration: string,
  progressPct: number,
) {
  return frame(`Course: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 20, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(CARD_BG)],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      // Thumbnail placeholder
      rectangle('Thumbnail', {
        size: { x: 340, y: 160 },
        fills: [gradient([
          { hex: '#1e40af', position: 0 },
          { hex: '#3b82f6', position: 1 },
        ], 135)],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
      }),
      // Category + Level row
      frame('Meta', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('CategoryBadge', {
            autoLayout: horizontal({ padX: 10, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(GOLD)],
            cornerRadius: 999,
            children: [
              text(category, { fontSize: 11, fontWeight: 600, color: '#92400e' }),
            ],
          }),
          frame('LevelBadge', {
            autoLayout: horizontal({ padX: 10, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#eff6ff')],
            cornerRadius: 999,
            children: [
              text(level, { fontSize: 11, fontWeight: 600, color: BLUE }),
            ],
          }),
        ],
      }),
      // Title
      text(title, { fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }),
      // Duration
      text(duration, { fontSize: 13, fontWeight: 400, color: TEXT_SECONDARY }),
      // Progress
      frame('ProgressSection', {
        autoLayout: vertical({ spacing: 6 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('ProgressLabel', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text('Progress', { fontSize: 12, fontWeight: 500, color: TEXT_SECONDARY }),
              text(`${progressPct}%`, { fontSize: 12, fontWeight: 600, color: BLUE }),
            ],
          }),
          frame('ProgressTrack', {
            size: { x: 300, y: 6 },
            fills: [solid('#e2e8f0')],
            cornerRadius: 3,
            clipContent: true,
            autoLayout: horizontal({ spacing: 0 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              rectangle('ProgressFill', {
                size: { x: Math.round(300 * progressPct / 100), y: 6 },
                fills: [solid(BLUE)],
                cornerRadius: 3,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function filterGroup(label: string, options: string[]) {
  return frame(`Filter: ${label}`, {
    autoLayout: vertical({ spacing: 8 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 700, color: TEXT_PRIMARY }),
      ...options.map(opt =>
        frame(`Opt: ${opt}`, {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            rectangle('Checkbox', {
              size: { x: 16, y: 16 },
              fills: [solid('#ffffff')],
              cornerRadius: 3,
              strokes: [{ color: { r: 0.8, g: 0.83, b: 0.87, a: 1 }, weight: 1, align: 'INSIDE' }],
            }),
            text(opt, { fontSize: 13, fontWeight: 400, color: TEXT_SECONDARY }),
          ],
        }),
      ),
    ],
  });
}

export default component('EduCourseCatalog', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(BG)],
  children: [
    // Top Bar
    frame('TopBar', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('EduLearn', { fontSize: 20, fontWeight: 700, color: BLUE }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
          children: [
            text('Catalog', { fontSize: 14, fontWeight: 600, color: BLUE }),
            text('My Courses', { fontSize: 14, fontWeight: 500, color: TEXT_SECONDARY }),
            text('Certificates', { fontSize: 14, fontWeight: 500, color: TEXT_SECONDARY }),
          ],
        }),
        rectangle('Avatar', {
          size: { x: 36, y: 36 },
          fills: [solid(BLUE)],
          cornerRadius: 18,
        }),
      ],
    }),

    // Page Header + Search
    frame('PageHeader', {
      autoLayout: vertical({ spacing: 20, padX: 60, padY: 40, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([
        { hex: '#1e40af', position: 0 },
        { hex: '#2563eb', position: 1 },
      ], 135)],
      children: [
        text('Course Catalog', { fontSize: 32, fontWeight: 700, color: '#ffffff' }),
        text('Explore hundreds of courses across all disciplines', {
          fontSize: 16, fontWeight: 400, color: '#bfdbfe',
        }),
        // Search Bar
        frame('SearchBar', {
          autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12, counterAlign: 'CENTER' }),
          size: { x: 600, y: undefined },
          fills: [solid('#ffffff')],
          cornerRadius: 8,
          children: [
            text('🔍', { fontSize: 16, fontWeight: 400, color: TEXT_SECONDARY }),
            text('Search courses, topics, instructors...', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
          ],
        }),
      ],
    }),

    // Main Content: Sidebar + Grid
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 32, padX: 60, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Filter Sidebar
        frame('FilterSidebar', {
          autoLayout: vertical({ spacing: 24, padX: 20, padY: 24 }),
          size: { x: 240, y: undefined },
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            text('Filters', { fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }),
            rectangle('Divider', {
              size: { x: 200, y: 1 },
              fills: [solid(BORDER)],
              layoutSizingHorizontal: 'FILL',
            }),
            filterGroup('Category', ['Computer Science', 'Mathematics', 'Business', 'Design', 'Languages']),
            rectangle('Divider2', {
              size: { x: 200, y: 1 },
              fills: [solid(BORDER)],
              layoutSizingHorizontal: 'FILL',
            }),
            filterGroup('Level', ['Beginner', 'Intermediate', 'Advanced']),
            rectangle('Divider3', {
              size: { x: 200, y: 1 },
              fills: [solid(BORDER)],
              layoutSizingHorizontal: 'FILL',
            }),
            filterGroup('Duration', ['< 2 hours', '2-5 hours', '5-10 hours', '10+ hours']),
          ],
        }),

        // Course Grid
        frame('CourseGrid', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('GridRow1', {
              autoLayout: horizontal({ spacing: 24 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                courseCard('Introduction to Python', 'Computer Science', 'Beginner', '12 hours · 24 lessons', 65),
                courseCard('Data Structures & Algorithms', 'Computer Science', 'Intermediate', '18 hours · 36 lessons', 30),
                courseCard('UX Design Fundamentals', 'Design', 'Beginner', '8 hours · 16 lessons', 100),
              ],
            }),
            frame('GridRow2', {
              autoLayout: horizontal({ spacing: 24 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                courseCard('Business Analytics', 'Business', 'Advanced', '15 hours · 30 lessons', 10),
                courseCard('Linear Algebra', 'Mathematics', 'Intermediate', '20 hours · 40 lessons', 0),
                courseCard('Spanish for Beginners', 'Languages', 'Beginner', '10 hours · 20 lessons', 45),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
