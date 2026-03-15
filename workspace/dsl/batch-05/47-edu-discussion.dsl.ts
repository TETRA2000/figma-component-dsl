/**
 * Education Discussion Forum — Thread List, Post Cards & New Post
 * Batch 5, Page 7: Discussion forum with thread list, post cards (author, timestamp, content, replies), new post
 * DSL Features: nested auto-layout, SPACE_BETWEEN, FILL sizing
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
const GREEN = '#16a34a';

function threadItem(title: string, author: string, replies: number, time: string, pinned: boolean) {
  return frame(`Thread: ${title}`, {
    autoLayout: horizontal({ spacing: 16, padX: 20, padY: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(pinned ? '#fffbeb' : CARD_BG)],
    cornerRadius: 8,
    strokes: [{ color: pinned
      ? { r: 0.85, g: 0.65, b: 0.13, a: 0.3 }
      : { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      // Avatar
      rectangle('Avatar', {
        size: { x: 40, y: 40 },
        fills: [gradient([
          { hex: BLUE, position: 0 },
          { hex: '#3b82f6', position: 1 },
        ], 135)],
        cornerRadius: 20,
      }),
      // Thread info
      frame('ThreadInfo', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('TitleRow', {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              ...(pinned ? [frame('PinBadge', {
                autoLayout: horizontal({ padX: 6, padY: 2 }),
                fills: [solid('#fef3c7')],
                cornerRadius: 4,
                children: [text('Pinned', { fontSize: 10, fontWeight: 700, color: '#92400e' })],
              })] : []),
              text(title, { fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }),
            ],
          }),
          frame('Meta', {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              text(author, { fontSize: 12, fontWeight: 500, color: BLUE }),
              text('·', { fontSize: 12, fontWeight: 400, color: TEXT_SECONDARY }),
              text(time, { fontSize: 12, fontWeight: 400, color: TEXT_SECONDARY }),
            ],
          }),
        ],
      }),
      // Reply count
      frame('ReplyCount', {
        autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }),
        children: [
          text(String(replies), { fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY, textAlignHorizontal: 'CENTER' }),
          text('replies', { fontSize: 11, fontWeight: 400, color: TEXT_SECONDARY }),
        ],
      }),
    ],
  });
}

function postCard(author: string, time: string, content: string, likes: number, replyCount: number, isInstructor: boolean) {
  return frame(`Post by ${author}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 16 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(CARD_BG)],
    cornerRadius: 10,
    strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      // Author row
      frame('AuthorRow', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          rectangle('Avatar', {
            size: { x: 36, y: 36 },
            fills: [solid(isInstructor ? GREEN : BLUE)],
            cornerRadius: 18,
          }),
          frame('AuthorInfo', {
            autoLayout: vertical({ spacing: 2 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              frame('NameRow', {
                autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
                children: [
                  text(author, { fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }),
                  ...(isInstructor ? [frame('InstructorBadge', {
                    autoLayout: horizontal({ padX: 8, padY: 2 }),
                    fills: [solid('#f0fdf4')],
                    cornerRadius: 999,
                    children: [text('Instructor', { fontSize: 10, fontWeight: 700, color: GREEN })],
                  })] : []),
                ],
              }),
              text(time, { fontSize: 12, fontWeight: 400, color: TEXT_SECONDARY }),
            ],
          }),
        ],
      }),
      // Content
      text(content, {
        fontSize: 14,
        fontWeight: 400,
        color: TEXT_PRIMARY,
        lineHeight: { value: 22, unit: 'PIXELS' },
        layoutSizingHorizontal: 'FILL',
      }),
      // Actions
      rectangle('PostDivider', {
        size: { x: 1, y: 1 },
        fills: [solid(BORDER)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame('Actions', {
        autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
        children: [
          frame('LikeBtn', {
            autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
            children: [
              text('♥', { fontSize: 14, fontWeight: 400, color: TEXT_SECONDARY }),
              text(String(likes), { fontSize: 13, fontWeight: 500, color: TEXT_SECONDARY }),
            ],
          }),
          frame('ReplyBtn', {
            autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
            children: [
              text('↩', { fontSize: 14, fontWeight: 400, color: TEXT_SECONDARY }),
              text(`${replyCount} replies`, { fontSize: 13, fontWeight: 500, color: TEXT_SECONDARY }),
            ],
          }),
          text('Share', { fontSize: 13, fontWeight: 500, color: TEXT_SECONDARY }),
        ],
      }),
    ],
  });
}

export default component('EduDiscussion', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(BG)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        frame('Breadcrumb', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            text('EduLearn', { fontSize: 18, fontWeight: 700, color: BLUE }),
            text('/', { fontSize: 14, fontWeight: 400, color: TEXT_SECONDARY }),
            text('Python 101', { fontSize: 14, fontWeight: 500, color: TEXT_SECONDARY }),
            text('/', { fontSize: 14, fontWeight: 400, color: TEXT_SECONDARY }),
            text('Discussion', { fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }),
          ],
        }),
        frame('NewPostBtn', {
          autoLayout: horizontal({ padX: 20, padY: 10, spacing: 8, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(BLUE)],
          cornerRadius: 8,
          children: [
            text('+', { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
            text('New Post', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
      ],
    }),

    // Main Content
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 28, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Thread List (Left)
        frame('ThreadList', {
          autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
          size: { x: 360, y: undefined },
          fills: [solid(CARD_BG)],
          cornerRadius: 12,
          strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            text('Threads', { fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }),
            // Search
            frame('ThreadSearch', {
              autoLayout: horizontal({ spacing: 8, padX: 12, padY: 8, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#f1f5f9')],
              cornerRadius: 6,
              children: [
                text('Search threads...', { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
              ],
            }),
            // Filters
            frame('Filters', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                frame('AllFilter', {
                  autoLayout: horizontal({ padX: 12, padY: 4 }),
                  fills: [solid(BLUE)],
                  cornerRadius: 999,
                  children: [text('All', { fontSize: 12, fontWeight: 600, color: '#ffffff' })],
                }),
                frame('UnansweredFilter', {
                  autoLayout: horizontal({ padX: 12, padY: 4 }),
                  fills: [solid('#f1f5f9')],
                  cornerRadius: 999,
                  children: [text('Unanswered', { fontSize: 12, fontWeight: 500, color: TEXT_SECONDARY })],
                }),
                frame('MyPostsFilter', {
                  autoLayout: horizontal({ padX: 12, padY: 4 }),
                  fills: [solid('#f1f5f9')],
                  cornerRadius: 999,
                  children: [text('My Posts', { fontSize: 12, fontWeight: 500, color: TEXT_SECONDARY })],
                }),
              ],
            }),
            // Threads
            threadItem('Welcome & Introductions', 'Dr. Sarah Chen', 24, '2 days ago', true),
            threadItem('Help with list comprehensions', 'Alex K.', 8, '5 hours ago', false),
            threadItem('Best resources for practice?', 'Maria G.', 12, '1 day ago', false),
            threadItem('Assignment 3 clarification', 'James W.', 6, '3 hours ago', false),
            threadItem('Study group for midterm?', 'Lisa P.', 15, '12 hours ago', false),
          ],
        }),

        // Post View (Right)
        frame('PostView', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Thread title
            frame('ThreadTitle', {
              autoLayout: vertical({ spacing: 8, padX: 24, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(CARD_BG)],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Help with list comprehensions', { fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY }),
                frame('ThreadMeta', {
                  autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
                  children: [
                    text('8 replies', { fontSize: 13, fontWeight: 500, color: TEXT_SECONDARY }),
                    text('·', { fontSize: 13, fontWeight: 400, color: TEXT_SECONDARY }),
                    text('5 hours ago', { fontSize: 13, fontWeight: 400, color: TEXT_SECONDARY }),
                    text('·', { fontSize: 13, fontWeight: 400, color: TEXT_SECONDARY }),
                    frame('TopicTag', {
                      autoLayout: horizontal({ padX: 8, padY: 2 }),
                      fills: [solid('#eff6ff')],
                      cornerRadius: 999,
                      children: [text('Python Basics', { fontSize: 11, fontWeight: 600, color: BLUE })],
                    }),
                  ],
                }),
              ],
            }),

            // Posts
            postCard(
              'Alex K.',
              '5 hours ago',
              'I\'m struggling with list comprehensions in Python. Can someone explain how to use conditional expressions in them? For example, how would I filter a list to only include even numbers and then square them?',
              4,
              3,
              false,
            ),
            postCard(
              'Dr. Sarah Chen',
              '4 hours ago',
              'Great question! List comprehensions follow the pattern: [expression for item in iterable if condition]. For your example, you would write:\n\nresult = [x**2 for x in numbers if x % 2 == 0]\n\nThis first filters (if x % 2 == 0) and then applies the expression (x**2).',
              12,
              1,
              true,
            ),
            postCard(
              'Maria G.',
              '3 hours ago',
              'Thanks for the explanation! I was also confused about nested list comprehensions. Is there a good way to think about those? I find the syntax hard to read when there are multiple for loops.',
              2,
              0,
              false,
            ),

            // Reply box
            frame('ReplyBox', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 16 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(CARD_BG)],
              cornerRadius: 10,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Write a reply...', {
                  fontSize: 14, fontWeight: 400, color: '#94a3b8',
                  size: { x: 600 },
                  textAutoResize: 'HEIGHT',
                }),
                frame('ReplyActions', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    frame('FormatBtns', {
                      autoLayout: horizontal({ spacing: 8 }),
                      children: [
                        text('B', { fontSize: 14, fontWeight: 700, color: TEXT_SECONDARY }),
                        text('I', { fontSize: 14, fontWeight: 400, color: TEXT_SECONDARY }),
                        text('< >', { fontSize: 13, fontWeight: 500, color: TEXT_SECONDARY }),
                      ],
                    }),
                    frame('PostReplyBtn', {
                      autoLayout: horizontal({ padX: 20, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
                      fills: [solid(BLUE)],
                      cornerRadius: 6,
                      children: [
                        text('Post Reply', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
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
